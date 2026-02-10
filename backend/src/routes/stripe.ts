import { Router, Request, Response } from 'express';
import { stripe } from '../services/stripe.js';
import { prisma } from '../services/prisma.js';
import { generateAccessCode, generateUniqueDisplayName } from '../utils/helpers.js';
import { generateToken, authMiddleware } from '../middleware/auth.js';

const router = Router();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const PRICE_ID = process.env.STRIPE_PRICE_ID;

// Create checkout session
router.post('/create-checkout', async (req: Request, res: Response) => {
  try {
    if (!PRICE_ID) {
      res.status(500).json({ error: 'Stripe price not configured' });
      return;
    }

    const { referralCode } = req.body;

    // Validate referral code if provided
    let referrerId: string | null = null;
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
        select: { id: true },
      });
      if (referrer) {
        referrerId = referrer.id;
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: PRICE_ID,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 1,
      },
      metadata: {
        referrerId: referrerId || '',
      },
      success_url: `${FRONTEND_URL}/register/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/register/cancel`,
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Referral credit amount (1 week in cents at $0.69/week)
const REFERRAL_CREDIT_CENTS = 69;
const REFERRAL_CREDIT_DAYS = 7;

// Complete registration after successful checkout
router.post('/complete-registration', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      res.status(400).json({ error: 'Session ID required' });
      return;
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid' && session.status !== 'complete') {
      res.status(400).json({ error: 'Payment not completed' });
      return;
    }

    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;
    const referrerId = session.metadata?.referrerId || null;

    // Check if user already exists for this customer
    const existingUser = await prisma.user.findUnique({
      where: { stripeCustomerId: customerId },
    });

    if (existingUser) {
      const token = generateToken({ userId: existingUser.id, type: 'user' });
      res.json({
        accessCode: existingUser.accessCode,
        token,
        user: {
          id: existingUser.id,
          currentStreak: existingUser.currentStreak,
          totalDaysWon: existingUser.totalDaysWon,
          colorTheme: existingUser.colorTheme,
          referralCode: existingUser.referralCode,
          desensitizationPoints: existingUser.desensitizationPoints,
        },
      });
      return;
    }

    // Generate unique access code
    let accessCode: string;
    let attempts = 0;
    do {
      accessCode = generateAccessCode();
      const existing = await prisma.user.findUnique({ where: { accessCode } });
      if (!existing) break;
      attempts++;
    } while (attempts < 10);

    if (attempts >= 10) {
      res.status(500).json({ error: 'Failed to generate unique access code' });
      return;
    }

    // Generate a unique display name (without number if possible)
    const displayName = await generateUniqueDisplayName(async (name) => {
      const existing = await prisma.user.findFirst({
        where: { displayName: name },
      });
      return !!existing;
    });

    // Create user with referral link if applicable
    const user = await prisma.user.create({
      data: {
        accessCode,
        displayName,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        subscriptionStatus: 'trialing',
        referredById: referrerId || undefined,
      },
    });

    // Process referral rewards if user was referred
    let referralApplied = false;
    if (referrerId) {
      try {
        const referrer = await prisma.user.findUnique({
          where: { id: referrerId },
          select: { stripeCustomerId: true },
        });

        if (referrer) {
          // Create referral reward record
          await prisma.referralReward.create({
            data: {
              referrerId,
              referredId: user.id,
              creditDays: REFERRAL_CREDIT_DAYS,
              stripeApplied: true,
            },
          });

          // Apply credit to referrer
          if (referrer.stripeCustomerId) {
            await stripe.customers.createBalanceTransaction(referrer.stripeCustomerId, {
              amount: -REFERRAL_CREDIT_CENTS,
              currency: 'usd',
              description: 'Referral reward - you referred a new member',
            });
          }

          // Apply credit to new user
          await stripe.customers.createBalanceTransaction(customerId, {
            amount: -REFERRAL_CREDIT_CENTS,
            currency: 'usd',
            description: 'Referral reward - signed up with referral link',
          });

          referralApplied = true;
        }
      } catch (error) {
        console.error('Failed to apply referral credits:', error);
      }
    }

    const token = generateToken({ userId: user.id, type: 'user' });

    res.status(201).json({
      accessCode: user.accessCode,
      token,
      user: {
        id: user.id,
        currentStreak: user.currentStreak,
        totalDaysWon: user.totalDaysWon,
        colorTheme: user.colorTheme,
        referralCode: user.referralCode,
        desensitizationPoints: user.desensitizationPoints,
      },
      referralApplied,
    });
  } catch (error) {
    console.error('Complete registration error:', error);
    res.status(500).json({ error: 'Failed to complete registration' });
  }
});

// Stripe webhook handler
router.post(
  '/webhook',
  async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !webhookSecret) {
      res.status(400).json({ error: 'Missing signature or webhook secret' });
      return;
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        webhookSecret
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      res.status(400).json({ error: 'Invalid signature' });
      return;
    }

    try {
      // IMPORTANT: Auto-cancellation is based on achieving a 365-day unbroken streak.
      // Users who reset their streak stay subscribed until they complete a full
      // 365-day streak without resetting.
      switch (event.type) {
        case 'customer.subscription.updated': {
          const subscription = event.data.object;
          const customerId = subscription.customer as string;

          const user = await prisma.user.findUnique({
            where: { stripeCustomerId: customerId },
          });

          if (user) {
            // Never overwrite 'completed' status from 365-day streak achievement
            if (user.completedAt || user.subscriptionStatus === 'completed') {
              break;
            }

            let status = 'active';
            if (subscription.status === 'trialing') status = 'trialing';
            else if (subscription.status === 'canceled') {
              // If user achieved 365-day streak, mark as completed
              if (user.currentStreak >= 365) {
                await prisma.user.update({
                  where: { id: user.id },
                  data: {
                    subscriptionStatus: 'completed',
                    completedAt: new Date(),
                  },
                });
                break;
              }
              status = 'canceled';
            }
            else if (subscription.status === 'active') status = 'active';

            await prisma.user.update({
              where: { id: user.id },
              data: { subscriptionStatus: status },
            });
          }
          break;
        }

        case 'customer.subscription.deleted': {
          const subscription = event.data.object;
          const customerId = subscription.customer as string;

          const user = await prisma.user.findUnique({
            where: { stripeCustomerId: customerId },
          });

          if (user) {
            // Never overwrite 'completed' status
            if (user.completedAt || user.subscriptionStatus === 'completed') {
              break;
            }

            // If user achieved 365-day streak, mark as completed (not canceled)
            if (user.currentStreak >= 365) {
              await prisma.user.update({
                where: { id: user.id },
                data: {
                  subscriptionStatus: 'completed',
                  completedAt: new Date(),
                },
              });
            } else {
              await prisma.user.update({
                where: { id: user.id },
                data: { subscriptionStatus: 'canceled' },
              });
            }
          }
          break;
        }

        case 'invoice.payment_failed': {
          const invoice = event.data.object;
          const customerId = invoice.customer as string;

          const user = await prisma.user.findUnique({
            where: { stripeCustomerId: customerId },
          });

          if (user) {
            console.log(`Payment failed for user ${user.id}`);
          }
          break;
        }
      }

      res.json({ received: true });
    } catch (error) {
      console.error('Webhook processing error:', error);
      res.status(500).json({ error: 'Webhook processing failed' });
    }
  }
);

// Cancel subscription (user-initiated only; 365-day completion is handled in check-in/missed-days routes)
router.post('/cancel', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.stripeSubscriptionId) {
      res.status(404).json({ error: 'User or subscription not found' });
      return;
    }

    await stripe.subscriptions.cancel(user.stripeSubscriptionId);

    await prisma.user.update({
      where: { id: user.id },
      data: { subscriptionStatus: 'canceled' },
    });

    res.json({ message: 'Subscription canceled' });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

// Create lifetime membership checkout ($20 one-time payment)
router.post('/lifetime-checkout', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (!user.completedAt) {
      res.status(400).json({ error: 'Must complete the 365-day challenge first' });
      return;
    }

    if (user.lifetimeAccess) {
      res.status(400).json({ error: 'Already have lifetime access' });
      return;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Reclaim - Lifetime Membership',
              description: 'Hall of Fame lifetime access for 365-day warriors',
            },
            unit_amount: 2000, // $20.00
          },
          quantity: 1,
        },
      ],
      customer: user.stripeCustomerId || undefined,
      metadata: {
        type: 'lifetime',
        userId: user.id,
      },
      success_url: `${FRONTEND_URL}/lifetime/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/celebration`,
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Lifetime checkout error:', error);
    res.status(500).json({ error: 'Failed to create lifetime checkout' });
  }
});

// Complete lifetime membership after payment
router.post('/complete-lifetime', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;
    const userId = req.user!.userId;

    if (!sessionId) {
      res.status(400).json({ error: 'Session ID required' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Idempotent — already lifetime
    if (user.lifetimeAccess) {
      res.json({ message: 'Lifetime access already granted', lifetimeAccess: true });
      return;
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      res.status(400).json({ error: 'Payment not completed' });
      return;
    }

    if (session.metadata?.type !== 'lifetime' || session.metadata?.userId !== userId) {
      res.status(400).json({ error: 'Invalid session' });
      return;
    }

    // Grant lifetime access — cancel recurring subscription if still active
    if (user.stripeSubscriptionId) {
      try {
        await stripe.subscriptions.cancel(user.stripeSubscriptionId);
      } catch (e) {
        console.error('Failed to cancel subscription for lifetime access:', e);
      }
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        lifetimeAccess: true,
        subscriptionStatus: 'completed',
      },
    });

    res.json({ message: 'Welcome to the Hall of Fame!', lifetimeAccess: true });
  } catch (error) {
    console.error('Complete lifetime error:', error);
    res.status(500).json({ error: 'Failed to complete lifetime membership' });
  }
});

export default router;

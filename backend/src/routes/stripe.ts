import { Router, Request, Response } from 'express';
import { stripe } from '../services/stripe.js';
import { prisma } from '../services/prisma.js';
import { generateAccessCode } from '../utils/helpers.js';
import { generateToken } from '../middleware/auth.js';

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
      success_url: `${FRONTEND_URL}/register/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/register/cancel`,
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

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

    const user = await prisma.user.create({
      data: {
        accessCode,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        subscriptionStatus: 'trialing',
      },
    });

    const token = generateToken({ userId: user.id, type: 'user' });

    res.status(201).json({
      accessCode: user.accessCode,
      token,
      user: {
        id: user.id,
        currentStreak: user.currentStreak,
        totalDaysWon: user.totalDaysWon,
        colorTheme: user.colorTheme,
      },
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
      switch (event.type) {
        case 'customer.subscription.updated': {
          const subscription = event.data.object;
          const customerId = subscription.customer as string;

          const user = await prisma.user.findUnique({
            where: { stripeCustomerId: customerId },
          });

          if (user) {
            let status = 'active';
            if (subscription.status === 'trialing') status = 'trialing';
            else if (subscription.status === 'canceled') status = 'canceled';
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

          if (user && !user.completedAt) {
            await prisma.user.update({
              where: { id: user.id },
              data: { subscriptionStatus: 'canceled' },
            });
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

// Cancel subscription (for 365-day completion or user request)
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

export default router;

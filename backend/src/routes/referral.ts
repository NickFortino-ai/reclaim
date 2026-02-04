import { Router, Request, Response } from 'express';
import { prisma } from '../services/prisma.js';
import { stripe } from '../services/stripe.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Credit amount for referrals (1 week in cents at $0.69/week)
const REFERRAL_CREDIT_CENTS = 69;
const REFERRAL_CREDIT_DAYS = 7;
const LIFETIME_ACCESS_REFERRAL_COUNT = 3;

// Public endpoint - validate a referral code (no auth required)
router.get('/validate/:code', async (req: Request, res: Response) => {
  try {
    const { code } = req.params;

    const referrer = await prisma.user.findUnique({
      where: { referralCode: code },
      select: { id: true },
    });

    res.json({ valid: !!referrer });
  } catch (error) {
    console.error('Validate referral code error:', error);
    res.status(500).json({ error: 'Failed to validate referral code' });
  }
});

// All routes below require authentication
router.use(authMiddleware);

// Get referral stats for current user
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        referralCode: true,
        lifetimeAccess: true,
        completedAt: true,
        referrals: {
          select: {
            id: true,
            createdAt: true,
            currentStreak: true,
            totalDaysWon: true,
          },
          orderBy: { createdAt: 'desc' },
        },
        referralRewardsGiven: {
          select: {
            id: true,
            creditDays: true,
            appliedAt: true,
            stripeApplied: true,
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const referralCount = user.referrals.length;
    const totalCreditDays = user.referralRewardsGiven.reduce((sum, r) => sum + r.creditDays, 0);
    const canGetLifetimeAccess = user.completedAt && referralCount >= LIFETIME_ACCESS_REFERRAL_COUNT;

    res.json({
      referralCode: user.referralCode,
      referralLink: `${process.env.FRONTEND_URL || 'https://reclaim365app.com'}/register?ref=${user.referralCode}`,
      referralCount,
      referrals: user.referrals.map((r, i) => ({
        number: i + 1,
        joinedAt: r.createdAt,
        currentStreak: r.currentStreak,
        totalDaysWon: r.totalDaysWon,
      })),
      totalCreditDays,
      lifetimeAccess: user.lifetimeAccess,
      canGetLifetimeAccess,
      referralsNeededForLifetime: Math.max(0, LIFETIME_ACCESS_REFERRAL_COUNT - referralCount),
    });
  } catch (error) {
    console.error('Get referral stats error:', error);
    res.status(500).json({ error: 'Failed to get referral stats' });
  }
});

// Claim lifetime access (for Day 365 completers with 3+ referrals)
router.post('/claim-lifetime', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        referrals: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (!user.completedAt) {
      res.status(400).json({ error: 'Must complete 365 days first' });
      return;
    }

    if (user.lifetimeAccess) {
      res.json({ message: 'Already have lifetime access', alreadyClaimed: true });
      return;
    }

    if (user.referrals.length < LIFETIME_ACCESS_REFERRAL_COUNT) {
      res.status(400).json({
        error: `Need ${LIFETIME_ACCESS_REFERRAL_COUNT} referrals for lifetime access`,
        current: user.referrals.length,
        needed: LIFETIME_ACCESS_REFERRAL_COUNT - user.referrals.length,
      });
      return;
    }

    await grantLifetimeAccess(userId);

    res.json({ message: 'Lifetime access granted!', lifetimeAccess: true });
  } catch (error) {
    console.error('Claim lifetime access error:', error);
    res.status(500).json({ error: 'Failed to claim lifetime access' });
  }
});

// Helper: Grant lifetime access
async function grantLifetimeAccess(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { stripeSubscriptionId: true },
  });

  // Cancel their Stripe subscription (they get free access now)
  if (user?.stripeSubscriptionId) {
    try {
      await stripe.subscriptions.cancel(user.stripeSubscriptionId);
    } catch (error) {
      console.error('Failed to cancel subscription for lifetime access:', error);
    }
  }

  // Grant lifetime access in database
  await prisma.user.update({
    where: { id: userId },
    data: {
      lifetimeAccess: true,
      subscriptionStatus: 'completed',
    },
  });
}

export default router;

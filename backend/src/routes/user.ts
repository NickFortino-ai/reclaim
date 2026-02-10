import { Router, Request, Response } from 'express';
import { prisma } from '../services/prisma.js';
import { stripe } from '../services/stripe.js';
import { authMiddleware } from '../middleware/auth.js';
import { differenceInDays, isSameDay, getRandomQuote } from '../utils/helpers.js';

const router = Router();

router.use(authMiddleware);

// Get current user data + today's affirmation
router.get('/me', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      include: {
        supportReceived: {
          where: {
            createdAt: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
            },
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Get today's affirmation based on totalDaysWon
    // If already checked in today, totalDaysWon was already incremented, so use it directly.
    // If not yet checked in, totalDaysWon reflects yesterday, so add 1.
    const checkedInToday = user.lastCheckIn ? isSameDay(new Date(), user.lastCheckIn) : false;
    const dayNum = Math.min(checkedInToday ? user.totalDaysWon : user.totalDaysWon + 1, 365);
    const affirmation = await prisma.affirmation.findUnique({
      where: { dayNum },
    });

    // Calculate missed days if applicable
    let missedDays = 0;
    let needsMissedDaysCheck = false;
    if (user.lastCheckIn) {
      const daysSinceCheckIn = differenceInDays(new Date(), user.lastCheckIn);
      if (daysSinceCheckIn > 1) {
        missedDays = daysSinceCheckIn - 1;
        needsMissedDaysCheck = true;
      }
    }

    res.json({
      user: {
        id: user.id,
        displayName: user.displayName,
        currentStreak: user.currentStreak,
        totalDaysWon: user.totalDaysWon,
        lastCheckIn: user.lastCheckIn,
        colorTheme: user.colorTheme,
        subscriptionStatus: user.subscriptionStatus,
        completedAt: user.completedAt,
        desensitizationPoints: user.desensitizationPoints,
        supportReceivedToday: user.supportReceived.length,
      },
      affirmation: affirmation?.text || null,
      dayNum,
      checkedInToday,
      missedDays,
      needsMissedDaysCheck,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user data' });
  }
});

// Daily check-in
router.post('/checkin', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Check if already checked in today
    if (user.lastCheckIn && isSameDay(new Date(), user.lastCheckIn)) {
      res.status(400).json({ error: 'Already checked in today' });
      return;
    }

    // Update user
    const newStreak = user.currentStreak + 1;
    const newTotalDaysWon = user.totalDaysWon + 1;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        currentStreak: newStreak,
        totalDaysWon: newTotalDaysWon,
        lastCheckIn: new Date(),
      },
    });

    // Create check-in record
    await prisma.checkIn.create({
      data: {
        userId: user.id,
        stayedStrong: true,
        daysAdded: 1,
      },
    });

    // Check for 365-day streak completion
    let completed = false;
    if (newStreak >= 365 && !user.completedAt) {
      // Auto-cancel subscription — user achieved 365-day unbroken streak
      if (user.stripeSubscriptionId) {
        try {
          await stripe.subscriptions.cancel(user.stripeSubscriptionId);
        } catch (e) {
          console.error('Failed to cancel subscription:', e);
        }
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          completedAt: new Date(),
          subscriptionStatus: 'completed',
        },
      });

      completed = true;
    }

    res.json({
      currentStreak: updatedUser.currentStreak,
      totalDaysWon: updatedUser.totalDaysWon,
      completed,
    });
  } catch (error) {
    console.error('Check-in error:', error);
    res.status(500).json({ error: 'Check-in failed' });
  }
});

// Handle missed days
router.post('/missed-days', async (req: Request, res: Response) => {
  try {
    const { stayedStrong, missedDays } = req.body;

    if (typeof stayedStrong !== 'boolean' || typeof missedDays !== 'number') {
      res.status(400).json({ error: 'Invalid request body' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (stayedStrong) {
      // Add missed days to streak and total
      const newStreak = user.currentStreak + missedDays;
      const newTotalDaysWon = user.totalDaysWon + missedDays;

      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          currentStreak: newStreak,
          totalDaysWon: newTotalDaysWon,
          lastCheckIn: new Date(),
        },
      });

      // Create check-in record for missed days
      await prisma.checkIn.create({
        data: {
          userId: user.id,
          stayedStrong: true,
          daysAdded: missedDays,
        },
      });

      // Check for 365-day streak completion
      let completed = false;
      if (newStreak >= 365 && !user.completedAt) {
        if (user.stripeSubscriptionId) {
          try {
            await stripe.subscriptions.cancel(user.stripeSubscriptionId);
          } catch (e) {
            console.error('Failed to cancel subscription:', e);
          }
        }

        await prisma.user.update({
          where: { id: user.id },
          data: {
            completedAt: new Date(),
            subscriptionStatus: 'completed',
          },
        });

        completed = true;
      }

      res.json({
        currentStreak: updatedUser.currentStreak,
        totalDaysWon: updatedUser.totalDaysWon,
        completed,
      });
    } else {
      // Reset streak
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          currentStreak: 0,
          lastCheckIn: new Date(),
        },
      });

      await prisma.checkIn.create({
        data: {
          userId: user.id,
          stayedStrong: false,
          daysAdded: 0,
        },
      });

      res.json({
        currentStreak: updatedUser.currentStreak,
        totalDaysWon: updatedUser.totalDaysWon,
        quote: getRandomQuote(),
      });
    }
  } catch (error) {
    console.error('Missed days error:', error);
    res.status(500).json({ error: 'Failed to process missed days' });
  }
});

// Reset streak (user admits relapse)
router.post('/reset', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        currentStreak: 0,
        lastCheckIn: new Date(),
      },
    });

    await prisma.checkIn.create({
      data: {
        userId: user.id,
        stayedStrong: false,
        daysAdded: 0,
      },
    });

    res.json({
      message: 'Streak reset. Every day is a new beginning.',
      quote: getRandomQuote(),
    });
  } catch (error) {
    console.error('Reset error:', error);
    res.status(500).json({ error: 'Reset failed' });
  }
});

// Update color theme
router.patch('/theme', async (req: Request, res: Response) => {
  try {
    const { theme } = req.body;

    const validThemes = [
      'slate', 'navy', 'charcoal', 'gunmetal', 'forest', 'olive', 'burgundy', 'leather'
    ];

    if (!theme || !validThemes.includes(theme)) {
      res.status(400).json({ error: 'Invalid theme' });
      return;
    }

    await prisma.user.update({
      where: { id: req.user!.userId },
      data: { colorTheme: theme },
    });

    res.json({ theme });
  } catch (error) {
    console.error('Theme update error:', error);
    res.status(500).json({ error: 'Failed to update theme' });
  }
});

// Export all user data
router.get('/export', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const [user, checkIns, journalEntries, bookmarks, desensLogs, urgeSurfEvents] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          displayName: true,
          currentStreak: true,
          totalDaysWon: true,
          desensitizationPoints: true,
          colorTheme: true,
          subscriptionStatus: true,
          createdAt: true,
          completedAt: true,
        },
      }),
      prisma.checkIn.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        select: { date: true, stayedStrong: true, daysAdded: true },
      }),
      prisma.journalEntry.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: { content: true, mood: true, createdAt: true },
      }),
      prisma.bookmark.findMany({
        where: { userId },
        include: { resource: { select: { title: true, category: true, week: true } } },
      }),
      prisma.desensitizationLog.findMany({
        where: { userId },
        orderBy: { completedAt: 'desc' },
        select: { pointsEarned: true, completedAt: true },
      }),
      prisma.urgeSurfEvent.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: { sessionDay: true, completedBreathing: true, resumedExercise: true, createdAt: true },
      }),
    ]);

    res.json({
      exportedAt: new Date().toISOString(),
      profile: user,
      checkIns,
      journalEntries,
      bookmarks: bookmarks.map(b => ({
        resourceTitle: b.resource.title,
        category: b.resource.category,
        week: b.resource.week,
        bookmarkedAt: b.createdAt,
      })),
      desensitizationLogs: desensLogs,
      urgeSurfEvents,
    });
  } catch (error) {
    console.error('Export data error:', error);
    res.status(500).json({ error: 'Failed to export data' });
  }
});

// Delete account
router.delete('/account', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Cancel Stripe subscription
    if (user.stripeSubscriptionId) {
      try {
        await stripe.subscriptions.cancel(user.stripeSubscriptionId);
      } catch (e) {
        console.error('Failed to cancel subscription during account deletion:', e);
      }
    }

    // Delete Stripe customer
    if (user.stripeCustomerId) {
      try {
        await stripe.customers.del(user.stripeCustomerId);
      } catch (e) {
        console.error('Failed to delete Stripe customer during account deletion:', e);
      }
    }

    // Delete all related records, then the user
    await prisma.$transaction([
      prisma.journalEntry.deleteMany({ where: { userId } }),
      prisma.desensitizationLog.deleteMany({ where: { userId } }),
      prisma.urgeSurfEvent.deleteMany({ where: { userId } }),
      prisma.bookmark.deleteMany({ where: { userId } }),
      prisma.support.deleteMany({ where: { OR: [{ supporterId: userId }, { receiverId: userId }] } }),
      prisma.checkIn.deleteMany({ where: { userId } }),
      prisma.referralReward.deleteMany({ where: { OR: [{ referrerId: userId }, { referredId: userId }] } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);

    res.json({ message: 'Account deleted' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

export default router;

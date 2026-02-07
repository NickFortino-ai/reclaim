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
    const dayNum = Math.min(user.totalDaysWon + 1, 365);
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

    // Check if already checked in today
    const checkedInToday = user.lastCheckIn ? isSameDay(new Date(), user.lastCheckIn) : false;

    res.json({
      user: {
        id: user.id,
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

    // Check for 365-day completion (Total Days Won, not calendar days)
    let completed = false;
    if (newTotalDaysWon >= 365 && !user.completedAt) {
      // Auto-cancel subscription — user earned 365 Total Days Won
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
      const newTotalDaysWon = Math.min(user.totalDaysWon + missedDays, 365);

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

      // Check for 365-day completion (Total Days Won, not calendar days)
      let completed = false;
      if (newTotalDaysWon >= 365 && !user.completedAt) {
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

export default router;

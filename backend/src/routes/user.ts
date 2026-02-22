import { Router, Request, Response } from 'express';
import { prisma } from '../services/prisma.js';
import { stripe } from '../services/stripe.js';
import { authMiddleware } from '../middleware/auth.js';
import { differenceInDays, isSameDay, getRandomQuote, differenceInDaysInTimezone, isSameDayInTimezone, startOfDayInTimezone, generateAccessCode, ADJECTIVES, NOUNS } from '../utils/helpers.js';
import { getUserTimezone } from '../utils/timezone.js';
import { computeRecoveryScore } from '../utils/recoveryScore.js';

const router = Router();

router.use(authMiddleware);

// Get warrior name options (adjectives + nouns)
router.get('/warrior-name-options', (_req: Request, res: Response) => {
  res.json({ adjectives: ADJECTIVES, nouns: NOUNS });
});

// Get current user data + today's affirmation
router.get('/me', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Sync subscription status with Stripe if stuck on 'trialing'
    if (user.subscriptionStatus === 'trialing' && user.stripeSubscriptionId) {
      try {
        const sub = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
        const stripeStatus = sub.status === 'active' ? 'active'
          : sub.status === 'trialing' ? 'trialing'
          : sub.status === 'canceled' ? 'canceled'
          : user.subscriptionStatus;
        if (stripeStatus !== user.subscriptionStatus) {
          await prisma.user.update({
            where: { id: user.id },
            data: { subscriptionStatus: stripeStatus },
          });
          user.subscriptionStatus = stripeStatus;
        }
      } catch (e) {
        console.error('Failed to sync subscription status:', e);
      }
    }

    const tz = getUserTimezone(req, user.timezone);
    const todayStart = startOfDayInTimezone(new Date(), tz);

    // Count support received today in user's timezone
    const supportReceivedToday = await prisma.support.count({
      where: {
        receiverId: user.id,
        createdAt: { gte: todayStart },
      },
    });

    // Get today's affirmation based on currentStreak (resets with the user)
    // Always synced with streak — only advances when the user checks in
    const checkedInToday = user.lastCheckIn ? isSameDayInTimezone(new Date(), user.lastCheckIn, tz) : false;
    const dayNum = Math.min(Math.max(user.currentStreak, 1), 365);
    const affirmation = await prisma.affirmation.findUnique({
      where: { dayNum },
    });

    // Calculate missed days if applicable
    let missedDays = 0;
    let needsMissedDaysCheck = false;
    if (user.lastCheckIn) {
      const daysSinceCheckIn = differenceInDaysInTimezone(new Date(), user.lastCheckIn, tz);
      if (daysSinceCheckIn > 1) {
        missedDays = daysSinceCheckIn - 1;
        needsMissedDaysCheck = true;
      }
    }

    // Check if intimacy check-in is due (every 10 days won)
    let intimacyCheckInDue = false;
    if (user.totalDaysWon >= 10) {
      const currentMilestone = Math.floor(user.totalDaysWon / 10) * 10;
      const existing = await prisma.intimacyCheckIn.findUnique({
        where: { userId_dayNumber: { userId: user.id, dayNumber: currentMilestone } },
      });
      if (!existing) {
        intimacyCheckInDue = true;
      }
    }

    // Check if PPCS assessment is due
    let assessmentDue = false;
    const assessmentScores = await prisma.assessmentScore.findMany({
      where: { userId: user.id },
      select: { milestone: true },
    });
    const completedMilestones = new Set(assessmentScores.map(s => s.milestone));
    if (!completedMilestones.has('baseline')) {
      assessmentDue = true;
    } else {
      const milestoneThresholds = [
        { days: 30, milestone: 'day30' },
        { days: 90, milestone: 'day90' },
        { days: 180, milestone: 'day180' },
        { days: 365, milestone: 'day365' },
      ];
      for (const { days, milestone } of milestoneThresholds) {
        if (user.totalDaysWon >= days && !completedMilestones.has(milestone)) {
          assessmentDue = true;
          break;
        }
      }
    }

    // Compute recovery score
    const [urgeSurfCount, journalCount, allCheckIns] = await Promise.all([
      prisma.urgeSurfEvent.count({ where: { userId: user.id } }),
      prisma.journalEntry.count({ where: { userId: user.id } }),
      prisma.checkIn.findMany({
        where: { userId: user.id },
        orderBy: { date: 'asc' },
        select: { stayedStrong: true, daysAdded: true },
      }),
    ]);

    // Build streak history from check-ins
    const streakHistory: number[] = [];
    let runningStreak = 0;
    for (const c of allCheckIns) {
      if (c.stayedStrong) {
        runningStreak += c.daysAdded;
      } else {
        if (runningStreak > 0) streakHistory.push(runningStreak);
        runningStreak = 0;
      }
    }
    if (runningStreak > 0) streakHistory.push(runningStreak);

    const daysSinceStart = Math.max(1, Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)));
    const recoveryScore = computeRecoveryScore({
      totalDaysWon: user.totalDaysWon,
      daysSinceStart,
      streakHistory,
      urgeSurfCount,
      journalCount,
      desensitizationPoints: user.desensitizationPoints,
    });

    // Grace period enforcement: 7 days after completion, auto-cancel if not lifetime
    let gracePeriodDaysRemaining: number | null = null;
    if (user.completedAt && !user.lifetimeAccess) {
      const daysSinceCompletion = differenceInDaysInTimezone(new Date(), user.completedAt, tz);
      if (daysSinceCompletion <= 7) {
        gracePeriodDaysRemaining = 7 - daysSinceCompletion;
      } else if (user.subscriptionStatus !== 'canceled') {
        // Grace period expired — auto-cancel subscription
        if (user.stripeSubscriptionId) {
          try {
            await stripe.subscriptions.cancel(user.stripeSubscriptionId);
          } catch (e) {
            console.error('Failed to cancel subscription after grace period:', e);
          }
        }
        await prisma.user.update({
          where: { id: user.id },
          data: { subscriptionStatus: 'canceled' },
        });
      }
    }

    // Partner info
    let partnerInfo: {
      id: string;
      displayName: string;
      currentStreak: number;
      lastCheckIn: Date | null;
      colorTheme: string;
      checkedInToday: boolean;
    } | null = null;
    let unreadPartnerMessages = 0;

    try {
      const activePartnership = await prisma.partnership.findFirst({
        where: {
          status: 'active',
          OR: [{ user1Id: user.id }, { user2Id: user.id }],
        },
        include: {
          user1: { select: { id: true, displayName: true, currentStreak: true, lastCheckIn: true, colorTheme: true, timezone: true } },
          user2: { select: { id: true, displayName: true, currentStreak: true, lastCheckIn: true, colorTheme: true, timezone: true } },
        },
      });

      if (activePartnership) {
        const partner = activePartnership.user1Id === user.id ? activePartnership.user2 : activePartnership.user1;
        const partnerTz = partner.timezone || 'UTC';
        const partnerCheckedInToday = partner.lastCheckIn
          ? isSameDayInTimezone(new Date(), partner.lastCheckIn, partnerTz)
          : false;

        partnerInfo = {
          id: partner.id,
          displayName: partner.displayName,
          currentStreak: partner.currentStreak,
          lastCheckIn: partner.lastCheckIn,
          colorTheme: partner.colorTheme,
          checkedInToday: partnerCheckedInToday,
        };

        unreadPartnerMessages = await prisma.partnerMessage.count({
          where: {
            partnershipId: activePartnership.id,
            senderId: { not: user.id },
            readAt: null,
          },
        });
      }
    } catch {
      // Partnership tables may not exist yet — gracefully skip
    }

    res.json({
      user: {
        id: user.id,
        displayName: user.displayName,
        currentStreak: user.currentStreak,
        totalDaysWon: user.totalDaysWon,
        highestStreak: user.highestStreak,
        lastCheckIn: user.lastCheckIn,
        colorTheme: user.colorTheme,
        subscriptionStatus: user.subscriptionStatus,
        completedAt: user.completedAt,
        desensitizationPoints: user.desensitizationPoints,
        supportReceivedToday,
        lifetimeAccess: user.lifetimeAccess,
        reminderTime: user.reminderTime,
        hideFromLeaderboard: user.hideFromLeaderboard,
        displayNameChangedAt: user.displayNameChangedAt,
        accessCode: user.accessCode,
        hasCompletedOnboarding: user.hasCompletedOnboarding,
      },
      affirmation: affirmation?.text || null,
      dayNum,
      checkedInToday,
      missedDays,
      needsMissedDaysCheck,
      gracePeriodDaysRemaining,
      intimacyCheckInDue,
      assessmentDue,
      recoveryScore,
      partnerInfo,
      unreadPartnerMessages,
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

    // Check if already checked in today (in user's timezone)
    const tz = getUserTimezone(req, user.timezone);
    if (user.lastCheckIn && isSameDayInTimezone(new Date(), user.lastCheckIn, tz)) {
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
        highestStreak: Math.max(user.highestStreak, newStreak),
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
          highestStreak: Math.max(user.highestStreak, newStreak),
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

    const previousStreak = user.currentStreak;

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

    // Compute post-reset recovery score
    const [resetUrgeSurfCount, resetJournalCount, resetAllCheckIns] = await Promise.all([
      prisma.urgeSurfEvent.count({ where: { userId: user.id } }),
      prisma.journalEntry.count({ where: { userId: user.id } }),
      prisma.checkIn.findMany({
        where: { userId: user.id },
        orderBy: { date: 'asc' },
        select: { stayedStrong: true, daysAdded: true },
      }),
    ]);

    const resetStreakHistory: number[] = [];
    let resetRunning = 0;
    for (const c of resetAllCheckIns) {
      if (c.stayedStrong) {
        resetRunning += c.daysAdded;
      } else {
        if (resetRunning > 0) resetStreakHistory.push(resetRunning);
        resetRunning = 0;
      }
    }
    if (resetRunning > 0) resetStreakHistory.push(resetRunning);

    const resetDaysSinceStart = Math.max(1, Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)));
    const consistencyRate = Math.min(Math.round((user.totalDaysWon / resetDaysSinceStart) * 100), 100);
    const postResetScore = computeRecoveryScore({
      totalDaysWon: user.totalDaysWon,
      daysSinceStart: resetDaysSinceStart,
      streakHistory: resetStreakHistory,
      urgeSurfCount: resetUrgeSurfCount,
      journalCount: resetJournalCount,
      desensitizationPoints: user.desensitizationPoints,
    });

    res.json({
      message: 'Streak reset. Every day is a new beginning.',
      quote: getRandomQuote(),
      previousStreak,
      totalDaysWon: user.totalDaysWon,
      highestStreak: user.highestStreak,
      consistencyRate,
      recoveryScore: postResetScore,
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

    const [user, checkIns, journalEntries, bookmarks, desensLogs, urgeSurfEvents, intimacyCheckIns, intimacyLogs, exportAssessmentScores] = await Promise.all([
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
        select: { content: true, mood: true, trigger: true, createdAt: true },
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
      prisma.intimacyCheckIn.findMany({
        where: { userId },
        orderBy: { dayNumber: 'asc' },
        select: { dayNumber: true, confidence: true, realAttraction: true, emotionalConnection: true, createdAt: true },
      }),
      prisma.intimacyLog.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        select: { date: true, erectionQuality: true, stayingPower: true, presence: true, enjoyment: true, connection: true, notes: true, createdAt: true },
      }),
      prisma.assessmentScore.findMany({
        where: { userId },
        orderBy: { takenAt: 'asc' },
        select: { milestone: true, totalScore: true, takenAt: true },
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
      intimacyCheckIns,
      intimacyLogs,
      assessmentScores: exportAssessmentScores,
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

    // Delete partner messages from all partnerships involving this user
    const userPartnerships = await prisma.partnership.findMany({
      where: { OR: [{ user1Id: userId }, { user2Id: userId }] },
      select: { id: true },
    });
    const partnershipIds = userPartnerships.map(p => p.id);

    // Delete all related records, then the user
    await prisma.$transaction([
      ...(partnershipIds.length > 0
        ? [prisma.partnerMessage.deleteMany({ where: { partnershipId: { in: partnershipIds } } })]
        : []),
      prisma.partnership.deleteMany({ where: { OR: [{ user1Id: userId }, { user2Id: userId }] } }),
      prisma.partnerQueue.deleteMany({ where: { userId } }),
      prisma.intimacyLog.deleteMany({ where: { userId } }),
      prisma.assessmentScore.deleteMany({ where: { userId } }),
      prisma.journalEntry.deleteMany({ where: { userId } }),
      prisma.desensitizationLog.deleteMany({ where: { userId } }),
      prisma.urgeSurfEvent.deleteMany({ where: { userId } }),
      prisma.intimacyCheckIn.deleteMany({ where: { userId } }),
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

// Submit intimacy check-in
router.post('/intimacy-checkin', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { confidence, realAttraction, emotionalConnection } = req.body;

    // Validate ratings
    for (const [name, val] of Object.entries({ confidence, realAttraction, emotionalConnection })) {
      if (typeof val !== 'number' || val < 1 || val > 10 || !Number.isInteger(val)) {
        res.status(400).json({ error: `${name} must be an integer from 1 to 10` });
        return;
      }
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { totalDaysWon: true },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (user.totalDaysWon < 10) {
      res.status(400).json({ error: 'Intimacy check-in available after 10 days won' });
      return;
    }

    const dayNumber = Math.floor(user.totalDaysWon / 10) * 10;

    // Check if already submitted for this milestone
    const existing = await prisma.intimacyCheckIn.findUnique({
      where: { userId_dayNumber: { userId, dayNumber } },
    });

    if (existing) {
      res.status(400).json({ error: 'Already submitted for this milestone' });
      return;
    }

    const checkIn = await prisma.intimacyCheckIn.create({
      data: { userId, dayNumber, confidence, realAttraction, emotionalConnection },
    });

    res.status(201).json(checkIn);
  } catch (error) {
    console.error('Intimacy check-in error:', error);
    res.status(500).json({ error: 'Failed to save intimacy check-in' });
  }
});

// Get pattern insights
router.get('/patterns', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const [user, checkIns, journalEntries, urgeSurfEvents, desensLogs, intimacyCheckIns, patternsAssessmentScores] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          currentStreak: true,
          totalDaysWon: true,
          highestStreak: true,
          desensitizationPoints: true,
          createdAt: true,
        },
      }),
      prisma.checkIn.findMany({
        where: { userId },
        orderBy: { date: 'asc' },
        select: { stayedStrong: true, daysAdded: true, date: true },
      }),
      prisma.journalEntry.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' },
        select: { mood: true, trigger: true, createdAt: true },
      }),
      prisma.urgeSurfEvent.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' },
        select: { completedBreathing: true, resumedExercise: true, createdAt: true },
      }),
      prisma.desensitizationLog.findMany({
        where: { userId },
        orderBy: { completedAt: 'asc' },
        select: { pointsEarned: true, completedAt: true },
      }),
      prisma.intimacyCheckIn.findMany({
        where: { userId },
        orderBy: { dayNumber: 'asc' },
        select: { dayNumber: true, confidence: true, realAttraction: true, emotionalConnection: true },
      }),
      prisma.assessmentScore.findMany({
        where: { userId },
        orderBy: { takenAt: 'asc' },
        select: { milestone: true, totalScore: true, takenAt: true },
      }),
    ]);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // --- Journey ---
    const daysSinceStart = Math.max(1, Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)));
    const totalResets = checkIns.filter(c => !c.stayedStrong).length;

    // Calculate average streak before reset
    let avgStreakBeforeReset = 0;
    if (totalResets > 0) {
      let streakSum = 0;
      let runningStreak = 0;
      for (const c of checkIns) {
        if (c.stayedStrong) {
          runningStreak += c.daysAdded;
        } else {
          streakSum += runningStreak;
          runningStreak = 0;
        }
      }
      avgStreakBeforeReset = Math.round(streakSum / totalResets);
    }

    const consistencyRate = Math.round((user.totalDaysWon / daysSinceStart) * 100);

    // --- Triggers ---
    const triggerCounts: Record<string, number> = {};
    const triggerByDayOfWeek: Record<string, Record<string, number>> = {};
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (const entry of journalEntries) {
      if (entry.trigger) {
        triggerCounts[entry.trigger] = (triggerCounts[entry.trigger] || 0) + 1;
        const day = dayNames[new Date(entry.createdAt).getDay()];
        if (!triggerByDayOfWeek[day]) triggerByDayOfWeek[day] = {};
        triggerByDayOfWeek[day][entry.trigger] = (triggerByDayOfWeek[day][entry.trigger] || 0) + 1;
      }
    }

    const topTriggers = Object.entries(triggerCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({ value, count }));

    // --- Moods ---
    const moodCounts: Record<string, number> = {};
    for (const entry of journalEntries) {
      if (entry.mood) {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
      }
    }

    const topMoods = Object.entries(moodCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({ value, count }));

    const recentMoodEntries = journalEntries
      .filter(e => e.mood)
      .slice(-14);
    const recentTrend = recentMoodEntries.map(e => e.mood!);

    // --- Timing ---
    const journalHourCounts: Record<number, number> = {};
    const journalDayCounts: Record<string, number> = {};
    for (const entry of journalEntries) {
      const d = new Date(entry.createdAt);
      const hour = d.getHours();
      journalHourCounts[hour] = (journalHourCounts[hour] || 0) + 1;
      const day = dayNames[d.getDay()];
      journalDayCounts[day] = (journalDayCounts[day] || 0) + 1;
    }

    const peakJournalHour = Object.keys(journalHourCounts).length > 0
      ? Number(Object.entries(journalHourCounts).sort((a, b) => b[1] - a[1])[0][0])
      : null;

    const urgeSurfHourCounts: Record<number, number> = {};
    const urgeSurfDayCounts: Record<string, number> = {};
    for (const event of urgeSurfEvents) {
      const d = new Date(event.createdAt);
      const hour = d.getHours();
      urgeSurfHourCounts[hour] = (urgeSurfHourCounts[hour] || 0) + 1;
      const day = dayNames[d.getDay()];
      urgeSurfDayCounts[day] = (urgeSurfDayCounts[day] || 0) + 1;
    }

    const peakUrgeSurfHour = Object.keys(urgeSurfHourCounts).length > 0
      ? Number(Object.entries(urgeSurfHourCounts).sort((a, b) => b[1] - a[1])[0][0])
      : null;

    const riskiestDayOfWeek = Object.keys(urgeSurfDayCounts).length > 0
      ? Object.entries(urgeSurfDayCounts).sort((a, b) => b[1] - a[1])[0][0]
      : null;

    // --- Urge Surfing ---
    const totalUrgeSessions = urgeSurfEvents.length;
    const breathingCompleted = urgeSurfEvents.filter(e => e.completedBreathing).length;
    const resumedExercise = urgeSurfEvents.filter(e => e.resumedExercise).length;

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
    const last30 = urgeSurfEvents.filter(e => new Date(e.createdAt) >= thirtyDaysAgo).length;
    const prior30 = urgeSurfEvents.filter(e => {
      const d = new Date(e.createdAt);
      return d >= sixtyDaysAgo && d < thirtyDaysAgo;
    }).length;

    let urgeTrend: 'increasing' | 'decreasing' | 'stable' | null = null;
    if (totalUrgeSessions >= 2) {
      if (last30 > prior30 * 1.25) urgeTrend = 'increasing';
      else if (last30 < prior30 * 0.75) urgeTrend = 'decreasing';
      else urgeTrend = 'stable';
    }

    // --- Desensitization ---
    const totalDesensSessions = desensLogs.length;
    const totalDesensPoints = desensLogs.reduce((sum, l) => sum + l.pointsEarned, 0);
    const avgPointsPerSession = totalDesensSessions > 0
      ? Math.round((totalDesensPoints / totalDesensSessions) * 10) / 10
      : 0;

    // --- Journal Stats ---
    const totalEntries = journalEntries.length;
    const entriesLast30 = journalEntries.filter(e => new Date(e.createdAt) >= thirtyDaysAgo).length;
    const weeksActive = Math.max(1, daysSinceStart / 7);
    const avgEntriesPerWeek = Math.round((totalEntries / weeksActive) * 10) / 10;

    res.json({
      journey: {
        daysSinceStart,
        totalDaysWon: user.totalDaysWon,
        currentStreak: user.currentStreak,
        highestStreak: user.highestStreak,
        totalResets,
        avgStreakBeforeReset,
        consistencyRate: Math.min(consistencyRate, 100),
      },
      triggers: {
        top: topTriggers,
        byDayOfWeek: triggerByDayOfWeek,
      },
      moods: {
        top: topMoods,
        recentTrend,
      },
      timing: {
        peakJournalHour,
        peakUrgeSurfHour,
        riskiestDayOfWeek,
        journalByDayOfWeek: journalDayCounts,
      },
      urgeSurfing: {
        totalSessions: totalUrgeSessions,
        breathingCompletionRate: totalUrgeSessions > 0
          ? Math.round((breathingCompleted / totalUrgeSessions) * 100)
          : 0,
        resumedExerciseRate: totalUrgeSessions > 0
          ? Math.round((resumedExercise / totalUrgeSessions) * 100)
          : 0,
        last30DaysCount: last30,
        trend: urgeTrend,
      },
      desensitization: {
        totalPoints: user.desensitizationPoints,
        maxPoints: 300,
        totalSessions: totalDesensSessions,
        avgPointsPerSession,
      },
      journalStats: {
        totalEntries,
        entriesLast30Days: entriesLast30,
        avgEntriesPerWeek,
      },
      intimacy: {
        checkIns: intimacyCheckIns,
        latestVsFirst: intimacyCheckIns.length >= 2
          ? {
              confidence: intimacyCheckIns[intimacyCheckIns.length - 1].confidence - intimacyCheckIns[0].confidence,
              realAttraction: intimacyCheckIns[intimacyCheckIns.length - 1].realAttraction - intimacyCheckIns[0].realAttraction,
              emotionalConnection: intimacyCheckIns[intimacyCheckIns.length - 1].emotionalConnection - intimacyCheckIns[0].emotionalConnection,
            }
          : null,
      },
      ppcs: {
        scores: patternsAssessmentScores.map(s => ({
          milestone: s.milestone,
          totalScore: s.totalScore,
          takenAt: s.takenAt,
        })),
      },
    });
  } catch (error) {
    console.error('Get patterns error:', error);
    res.status(500).json({ error: 'Failed to get patterns' });
  }
});

// Update reminder time
router.patch('/reminder-time', async (req: Request, res: Response) => {
  try {
    const { reminderTime } = req.body;

    // Allow null to clear, or validate HH:MM format
    if (reminderTime !== null) {
      if (typeof reminderTime !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(reminderTime)) {
        res.status(400).json({ error: 'Invalid time format. Use HH:MM (24-hour)' });
        return;
      }
    }

    await prisma.user.update({
      where: { id: req.user!.userId },
      data: { reminderTime },
    });

    res.json({ reminderTime });
  } catch (error) {
    console.error('Update reminder time error:', error);
    res.status(500).json({ error: 'Failed to update reminder time' });
  }
});

// Toggle leaderboard visibility
router.patch('/leaderboard-visibility', async (req: Request, res: Response) => {
  try {
    const { hide } = req.body;

    if (typeof hide !== 'boolean') {
      res.status(400).json({ error: 'hide must be a boolean' });
      return;
    }

    await prisma.user.update({
      where: { id: req.user!.userId },
      data: { hideFromLeaderboard: hide },
    });

    res.json({ hideFromLeaderboard: hide });
  } catch (error) {
    console.error('Update leaderboard visibility error:', error);
    res.status(500).json({ error: 'Failed to update leaderboard visibility' });
  }
});

// Change display name (warrior name) — once every 30 days
router.patch('/display-name', async (req: Request, res: Response) => {
  try {
    const { displayName } = req.body;

    if (!displayName || typeof displayName !== 'string') {
      res.status(400).json({ error: 'Display name is required' });
      return;
    }

    // Validate name is a valid Adjective + Noun combo
    const parts = displayName.trim().split(' ');
    if (parts.length !== 2 || !ADJECTIVES.includes(parts[0]) || !NOUNS.includes(parts[1])) {
      res.status(400).json({ error: 'Please choose a valid warrior name from the available options' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Check 30-day cooldown
    if (user.displayNameChangedAt) {
      const daysSinceChange = Math.floor(
        (Date.now() - user.displayNameChangedAt.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceChange < 30) {
        const daysRemaining = 30 - daysSinceChange;
        res.status(400).json({
          error: `You can change your name again in ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}`,
        });
        return;
      }
    }

    // Check uniqueness
    const existing = await prisma.user.findFirst({
      where: { displayName: displayName.trim(), id: { not: user.id } },
    });

    if (existing) {
      res.status(400).json({ error: 'That warrior name is already taken' });
      return;
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        displayName: displayName.trim(),
        displayNameChangedAt: new Date(),
      },
    });

    res.json({ displayName: updated.displayName, displayNameChangedAt: updated.displayNameChangedAt });
  } catch (error) {
    console.error('Update display name error:', error);
    res.status(500).json({ error: 'Failed to update display name' });
  }
});

// Change access code
router.patch('/access-code', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    // Generate a new unique access code
    let newCode: string;
    let attempts = 0;
    do {
      newCode = generateAccessCode();
      const existing = await prisma.user.findUnique({ where: { accessCode: newCode } });
      if (!existing) break;
      attempts++;
    } while (attempts < 10);

    if (attempts >= 10) {
      res.status(500).json({ error: 'Failed to generate unique access code. Try again.' });
      return;
    }

    await prisma.user.update({
      where: { id: userId },
      data: { accessCode: newCode },
    });

    res.json({ accessCode: newCode });
  } catch (error) {
    console.error('Change access code error:', error);
    res.status(500).json({ error: 'Failed to change access code' });
  }
});

// Complete onboarding
router.post('/complete-onboarding', async (req: Request, res: Response) => {
  try {
    await prisma.user.update({
      where: { id: req.user!.userId },
      data: { hasCompletedOnboarding: true },
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Complete onboarding error:', error);
    res.status(500).json({ error: 'Failed to complete onboarding' });
  }
});

export default router;

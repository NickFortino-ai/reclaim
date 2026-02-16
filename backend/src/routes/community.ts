import { Router, Request, Response } from 'express';
import { prisma } from '../services/prisma.js';
import { authMiddleware } from '../middleware/auth.js';
import { startOfDayInTimezone } from '../utils/helpers.js';
import { getUserTimezone } from '../utils/timezone.js';

const router = Router();

router.use(authMiddleware);

// Get anonymous community feed
router.get('/', async (req: Request, res: Response) => {
  try {
    const currentUserId = req.user!.userId;
    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserId },
      select: { timezone: true },
    });
    const tz = getUserTimezone(req, currentUser?.timezone);
    const today = startOfDayInTimezone(new Date(), tz);

    const users = await prisma.user.findMany({
      where: {
        subscriptionStatus: { in: ['trialing', 'active', 'completed'] },
        hideFromLeaderboard: false,
      },
      select: {
        id: true,
        displayName: true,
        currentStreak: true,
        totalDaysWon: true,
        highestStreak: true,
        colorTheme: true,
        completedAt: true,
        lifetimeAccess: true,
        createdAt: true,
        _count: {
          select: {
            supportReceived: {
              where: {
                createdAt: { gte: today },
              },
            },
          },
        },
      },
      orderBy: [
        { currentStreak: 'desc' },
        { totalDaysWon: 'desc' },
      ],
    });

    // Get list of users the current user has supported today
    const supportedToday = await prisma.support.findMany({
      where: {
        supporterId: currentUserId,
        createdAt: { gte: today },
      },
      select: { receiverId: true },
    });
    const supportedIds = new Set(supportedToday.map((s) => s.receiverId));

    // Split into Hall of Fame (completed + lifetime) and regular members
    const hallOfFame = users
      .filter((u) => u.completedAt && u.lifetimeAccess)
      .sort((a, b) => b.highestStreak - a.highestStreak)
      .map((user) => ({
        id: user.id,
        displayName: user.displayName,
        currentStreak: user.currentStreak,
        totalDaysWon: user.totalDaysWon,
        highestStreak: user.highestStreak,
        colorTheme: user.colorTheme,
        isCompleted: true,
        lifetimeAccess: true,
        supportReceivedToday: user._count.supportReceived,
        alreadySupported: supportedIds.has(user.id),
      }));

    const hallOfFameIds = new Set(hallOfFame.map((u) => u.id));
    const communityMembers = users
      .filter((u) => !hallOfFameIds.has(u.id))
      .map((user, index) => ({
        id: user.id,
        displayName: user.displayName || `Warrior #${index + 1}`,
        currentStreak: user.currentStreak,
        totalDaysWon: user.totalDaysWon,
        highestStreak: user.highestStreak,
        colorTheme: user.colorTheme,
        isCompleted: !!user.completedAt,
        lifetimeAccess: user.lifetimeAccess,
        supportReceivedToday: user._count.supportReceived,
        alreadySupported: supportedIds.has(user.id),
      }));

    res.json({ members: communityMembers, hallOfFame });
  } catch (error) {
    console.error('Community fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch community' });
  }
});

// Send support to another user
router.post('/support/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const supporterId = req.user!.userId;

    if (userId === supporterId) {
      res.status(400).json({ error: 'Cannot support yourself' });
      return;
    }

    // Check if receiver exists
    const receiver = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!receiver) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Check if already supported today (in supporter's timezone)
    const supporter = await prisma.user.findUnique({
      where: { id: supporterId },
      select: { timezone: true },
    });
    const tz = getUserTimezone(req, supporter?.timezone);
    const todayStart = startOfDayInTimezone(new Date(), tz);

    const existingSupport = await prisma.support.findFirst({
      where: {
        supporterId,
        receiverId: userId,
        createdAt: { gte: todayStart },
      },
    });

    if (existingSupport) {
      res.status(400).json({ error: 'Already sent support today' });
      return;
    }

    await prisma.support.create({
      data: {
        supporterId,
        receiverId: userId,
      },
    });

    res.json({ message: 'Support sent!' });
  } catch (error) {
    console.error('Support error:', error);
    res.status(500).json({ error: 'Failed to send support' });
  }
});

export default router;

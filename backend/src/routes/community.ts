import { Router, Request, Response } from 'express';
import { prisma } from '../services/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

// Get anonymous community feed
router.get('/', async (req: Request, res: Response) => {
  try {
    const currentUserId = req.user!.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const users = await prisma.user.findMany({
      where: {
        subscriptionStatus: { in: ['trialing', 'active', 'completed'] },
      },
      select: {
        id: true,
        displayName: true,
        currentStreak: true,
        totalDaysWon: true,
        colorTheme: true,
        completedAt: true,
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
      // Fetch all users so rankings are accurate
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

    // Map to anonymous format
    const communityMembers = users.map((user, index) => ({
      id: user.id,
      displayName: user.displayName || `Warrior #${index + 1}`,
      currentStreak: user.currentStreak,
      totalDaysWon: user.totalDaysWon,
      colorTheme: user.colorTheme,
      isCompleted: !!user.completedAt,
      supportReceivedToday: user._count.supportReceived,
      alreadySupported: supportedIds.has(user.id),
    }));

    res.json({ members: communityMembers });
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

    // Check if already supported today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingSupport = await prisma.support.findFirst({
      where: {
        supporterId,
        receiverId: userId,
        createdAt: { gte: today },
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

import { Router, Request, Response } from 'express';
import { prisma } from '../services/prisma.js';
import { authMiddleware } from '../middleware/auth.js';
import { isSameDayInTimezone, startOfDayInTimezone } from '../utils/helpers.js';
import { getUserTimezone } from '../utils/timezone.js';

const router = Router();

router.use(authMiddleware);

// Find a partner or join the queue
router.post('/find', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    // Check no active partnership
    const existingPartnership = await prisma.partnership.findFirst({
      where: {
        status: 'active',
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
    });

    if (existingPartnership) {
      res.status(400).json({ error: 'You already have an active partner' });
      return;
    }

    // Check not already in queue
    const existingQueue = await prisma.partnerQueue.findUnique({
      where: { userId },
    });

    if (existingQueue) {
      res.status(400).json({ error: 'You are already in the partner queue' });
      return;
    }

    // Get user for matching
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { totalDaysWon: true },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Look for compatible match in queue (totalDaysWon +-30)
    const match = await prisma.partnerQueue.findFirst({
      where: {
        userId: { not: userId },
        user: {
          totalDaysWon: {
            gte: user.totalDaysWon - 30,
            lte: user.totalDaysWon + 30,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
      include: { user: { select: { id: true } } },
    });

    if (match) {
      // Create partnership and remove from queue
      const [partnership] = await prisma.$transaction([
        prisma.partnership.create({
          data: {
            user1Id: match.userId,
            user2Id: userId,
          },
        }),
        prisma.partnerQueue.delete({
          where: { id: match.id },
        }),
      ]);

      res.json({ status: 'matched', partnershipId: partnership.id });
    } else {
      // Add to queue
      await prisma.partnerQueue.create({
        data: { userId },
      });

      res.json({ status: 'queued' });
    }
  } catch (error) {
    console.error('Find partner error:', error);
    res.status(500).json({ error: 'Failed to find partner' });
  }
});

// Get current partnership
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const partnership = await prisma.partnership.findFirst({
      where: {
        status: 'active',
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: {
        user1: {
          select: { id: true, displayName: true, currentStreak: true, lastCheckIn: true, colorTheme: true },
        },
        user2: {
          select: { id: true, displayName: true, currentStreak: true, lastCheckIn: true, colorTheme: true },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 50,
          select: {
            id: true,
            senderId: true,
            type: true,
            content: true,
            readAt: true,
            createdAt: true,
          },
        },
      },
    });

    if (!partnership) {
      // Check if in queue
      const queueEntry = await prisma.partnerQueue.findUnique({
        where: { userId },
      });

      res.json({ partnership: null, inQueue: !!queueEntry });
      return;
    }

    const partner = partnership.user1Id === userId ? partnership.user2 : partnership.user1;

    const unreadCount = await prisma.partnerMessage.count({
      where: {
        partnershipId: partnership.id,
        senderId: { not: userId },
        readAt: null,
      },
    });

    res.json({
      partnership: {
        id: partnership.id,
        createdAt: partnership.createdAt,
        partner: {
          id: partner.id,
          displayName: partner.displayName,
          currentStreak: partner.currentStreak,
          lastCheckIn: partner.lastCheckIn,
          colorTheme: partner.colorTheme,
        },
        messages: partnership.messages.reverse(),
        unreadCount,
      },
      inQueue: false,
    });
  } catch (error) {
    console.error('Get partnership error:', error);
    res.status(500).json({ error: 'Failed to get partnership' });
  }
});

// Send a message
router.post('/message', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { content } = req.body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      res.status(400).json({ error: 'Message content is required' });
      return;
    }

    if (content.length > 500) {
      res.status(400).json({ error: 'Message too long (max 500 characters)' });
      return;
    }

    const partnership = await prisma.partnership.findFirst({
      where: {
        status: 'active',
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
    });

    if (!partnership) {
      res.status(404).json({ error: 'No active partnership' });
      return;
    }

    // Rate limit: 10 messages per day
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayCount = await prisma.partnerMessage.count({
      where: {
        senderId: userId,
        partnershipId: partnership.id,
        createdAt: { gte: todayStart },
      },
    });

    if (todayCount >= 10) {
      res.status(429).json({ error: 'Message limit reached (10 per day)' });
      return;
    }

    const message = await prisma.partnerMessage.create({
      data: {
        partnershipId: partnership.id,
        senderId: userId,
        type: 'message',
        content: content.trim(),
      },
    });

    res.status(201).json(message);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Send a nudge
router.post('/nudge', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const partnership = await prisma.partnership.findFirst({
      where: {
        status: 'active',
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: {
        user1: { select: { id: true, lastCheckIn: true, timezone: true } },
        user2: { select: { id: true, lastCheckIn: true, timezone: true } },
      },
    });

    if (!partnership) {
      res.status(404).json({ error: 'No active partnership' });
      return;
    }

    const partner = partnership.user1Id === userId ? partnership.user2 : partnership.user1;
    const tz = getUserTimezone(req, partner.timezone);

    // Only allow nudge if partner hasn't checked in today
    if (partner.lastCheckIn && isSameDayInTimezone(new Date(), partner.lastCheckIn, tz)) {
      res.status(400).json({ error: 'Your partner already checked in today' });
      return;
    }

    // One nudge per day
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const existingNudge = await prisma.partnerMessage.findFirst({
      where: {
        partnershipId: partnership.id,
        senderId: userId,
        type: 'nudge',
        createdAt: { gte: todayStart },
      },
    });

    if (existingNudge) {
      res.status(400).json({ error: 'You already sent a nudge today' });
      return;
    }

    const message = await prisma.partnerMessage.create({
      data: {
        partnershipId: partnership.id,
        senderId: userId,
        type: 'nudge',
        content: 'Hey, have you checked in today? I believe in you.',
      },
    });

    res.status(201).json(message);
  } catch (error) {
    console.error('Send nudge error:', error);
    res.status(500).json({ error: 'Failed to send nudge' });
  }
});

// Dissolve partnership
router.post('/dissolve', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const partnership = await prisma.partnership.findFirst({
      where: {
        status: 'active',
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
    });

    if (!partnership) {
      res.status(404).json({ error: 'No active partnership' });
      return;
    }

    await prisma.partnership.update({
      where: { id: partnership.id },
      data: { status: 'dissolved', dissolvedAt: new Date() },
    });

    res.json({ message: 'Partnership dissolved' });
  } catch (error) {
    console.error('Dissolve partnership error:', error);
    res.status(500).json({ error: 'Failed to dissolve partnership' });
  }
});

// Mark messages as read
router.post('/messages/read', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const partnership = await prisma.partnership.findFirst({
      where: {
        status: 'active',
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
    });

    if (!partnership) {
      res.status(404).json({ error: 'No active partnership' });
      return;
    }

    await prisma.partnerMessage.updateMany({
      where: {
        partnershipId: partnership.id,
        senderId: { not: userId },
        readAt: null,
      },
      data: { readAt: new Date() },
    });

    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    console.error('Mark messages read error:', error);
    res.status(500).json({ error: 'Failed to mark messages as read' });
  }
});

export default router;

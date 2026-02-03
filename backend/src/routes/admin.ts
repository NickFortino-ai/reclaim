import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../services/prisma.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = Router();

// All admin routes require auth + admin role
router.use(authMiddleware);
router.use(adminMiddleware);

// Get all affirmations
router.get('/affirmations', async (_req: Request, res: Response) => {
  try {
    const affirmations = await prisma.affirmation.findMany({
      orderBy: { dayNum: 'asc' },
    });
    res.json(affirmations);
  } catch (error) {
    console.error('Get affirmations error:', error);
    res.status(500).json({ error: 'Failed to fetch affirmations' });
  }
});

// Create or update affirmation
router.post('/affirmations', async (req: Request, res: Response) => {
  try {
    const { dayNum, text } = req.body;

    if (!dayNum || !text || dayNum < 1 || dayNum > 365) {
      res.status(400).json({ error: 'Invalid day number or text' });
      return;
    }

    const affirmation = await prisma.affirmation.upsert({
      where: { dayNum },
      update: { text },
      create: { dayNum, text },
    });

    res.json(affirmation);
  } catch (error) {
    console.error('Create affirmation error:', error);
    res.status(500).json({ error: 'Failed to save affirmation' });
  }
});

// Delete affirmation
router.delete('/affirmations/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.affirmation.delete({
      where: { id },
    });

    res.json({ message: 'Affirmation deleted' });
  } catch (error) {
    console.error('Delete affirmation error:', error);
    res.status(500).json({ error: 'Failed to delete affirmation' });
  }
});

// Get all desensitization images
router.get('/images', async (_req: Request, res: Response) => {
  try {
    const images = await prisma.desensImage.findMany({
      orderBy: { dayNum: 'asc' },
    });
    res.json(images);
  } catch (error) {
    console.error('Get images error:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Create or update desensitization image
router.post('/images', async (req: Request, res: Response) => {
  try {
    const { dayNum, imageUrl, overlayText } = req.body;

    if (!dayNum || !imageUrl || !overlayText || dayNum < 1 || dayNum > 365) {
      res.status(400).json({ error: 'Invalid day number, image URL, or overlay text' });
      return;
    }

    const image = await prisma.desensImage.upsert({
      where: { dayNum },
      update: { imageUrl, overlayText },
      create: { dayNum, imageUrl, overlayText },
    });

    res.json(image);
  } catch (error) {
    console.error('Create image error:', error);
    res.status(500).json({ error: 'Failed to save image' });
  }
});

// Delete desensitization image
router.delete('/images/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.desensImage.delete({
      where: { id },
    });

    res.json({ message: 'Image deleted' });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// Get admin stats dashboard
router.get('/stats', async (_req: Request, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();
    const activeUsers = await prisma.user.count({
      where: {
        subscriptionStatus: { in: ['trialing', 'active'] },
      },
    });
    const completedUsers = await prisma.user.count({
      where: { completedAt: { not: null } },
    });

    const avgStreak = await prisma.user.aggregate({
      _avg: { currentStreak: true },
    });

    const avgTotalDays = await prisma.user.aggregate({
      _avg: { totalDaysWon: true },
    });

    // Users by streak ranges
    const streak0 = await prisma.user.count({ where: { currentStreak: 0 } });
    const streak1to7 = await prisma.user.count({
      where: { currentStreak: { gte: 1, lte: 7 } },
    });
    const streak8to30 = await prisma.user.count({
      where: { currentStreak: { gte: 8, lte: 30 } },
    });
    const streak31to90 = await prisma.user.count({
      where: { currentStreak: { gte: 31, lte: 90 } },
    });
    const streak91plus = await prisma.user.count({
      where: { currentStreak: { gte: 91 } },
    });

    // Check-ins today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkInsToday = await prisma.checkIn.count({
      where: { date: { gte: today } },
    });

    // Affirmation and image coverage
    const affirmationCount = await prisma.affirmation.count();
    const imageCount = await prisma.desensImage.count();

    res.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        completed: completedUsers,
      },
      streaks: {
        average: Math.round((avgStreak._avg.currentStreak || 0) * 10) / 10,
        distribution: {
          zero: streak0,
          '1-7': streak1to7,
          '8-30': streak8to30,
          '31-90': streak31to90,
          '91+': streak91plus,
        },
      },
      totalDaysAverage: Math.round((avgTotalDays._avg.totalDaysWon || 0) * 10) / 10,
      checkInsToday,
      content: {
        affirmations: affirmationCount,
        images: imageCount,
        affirmationCoverage: `${Math.round((affirmationCount / 365) * 100)}%`,
        imageCoverage: `${Math.round((imageCount / 365) * 100)}%`,
      },
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Create admin (one-time setup, protect in production)
router.post('/create-admin', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: 'Username and password required' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: { username, passwordHash },
    });

    res.status(201).json({ id: admin.id, username: admin.username });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ error: 'Failed to create admin' });
  }
});

export default router;

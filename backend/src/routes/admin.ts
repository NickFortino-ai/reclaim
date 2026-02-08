import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import multer from 'multer';
import { prisma } from '../services/prisma.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';
import { uploadImage, deleteImage } from '../services/supabase.js';
import { isValidCategory } from '../utils/week.js';

const router = Router();

// Configure multer for memory storage (we'll upload to Supabase)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'));
    }
  },
});

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

// Create or update desensitization image (with file upload or URL)
router.post('/images', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { dayNum, overlayText, difficulty = '2', imageUrl: providedUrl } = req.body;
    const file = req.file;

    const dayNumInt = parseInt(dayNum);
    const difficultyInt = parseInt(difficulty);

    if (!dayNumInt || dayNumInt < 1 || dayNumInt > 365) {
      res.status(400).json({ error: 'Invalid day number (must be 1-365)' });
      return;
    }

    if (!overlayText) {
      res.status(400).json({ error: 'Overlay text is required' });
      return;
    }

    if (isNaN(difficultyInt) || difficultyInt < 1 || difficultyInt > 3) {
      res.status(400).json({ error: 'Invalid difficulty level (must be 1, 2, or 3)' });
      return;
    }

    // Check if image for this day already exists
    const existingImage = await prisma.desensImage.findUnique({
      where: { dayNum: dayNumInt },
    });

    let imageUrl: string;

    if (file) {
      // Upload new file to Supabase
      imageUrl = await uploadImage(file.buffer, file.originalname, file.mimetype);

      // Delete old image from storage if replacing
      if (existingImage && existingImage.imageUrl.includes('supabase')) {
        await deleteImage(existingImage.imageUrl);
      }
    } else if (providedUrl) {
      // Use provided URL directly
      imageUrl = providedUrl;

      // Delete old Supabase image if replacing with URL
      if (existingImage && existingImage.imageUrl.includes('supabase')) {
        await deleteImage(existingImage.imageUrl);
      }
    } else if (existingImage) {
      // No new file or URL, keep existing URL
      imageUrl = existingImage.imageUrl;
    } else {
      res.status(400).json({ error: 'Image file or URL is required for new entries' });
      return;
    }

    const image = await prisma.desensImage.upsert({
      where: { dayNum: dayNumInt },
      update: { imageUrl, overlayText, difficulty: difficultyInt },
      create: { dayNum: dayNumInt, imageUrl, overlayText, difficulty: difficultyInt },
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

    // Get image to find storage URL
    const image = await prisma.desensImage.findUnique({
      where: { id },
    });

    if (image && image.imageUrl.includes('supabase')) {
      // Delete from Supabase storage
      await deleteImage(image.imageUrl);
    }

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
    const resourceCount = await prisma.resource.count();
    const resourceWeeksCovered = await prisma.resource.groupBy({
      by: ['week'],
      _count: { id: true },
    });

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
        resources: resourceCount,
        resourceWeeksCovered: `${resourceWeeksCovered.length}/52`,
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

// Get resources (optionally filtered by week)
router.get('/resources', async (req: Request, res: Response) => {
  try {
    const week = req.query.week ? parseInt(req.query.week as string) : undefined;
    const where = week ? { week } : {};

    const resources = await prisma.resource.findMany({
      where,
      orderBy: [{ week: 'asc' }, { category: 'asc' }],
    });

    const weekCounts = await prisma.resource.groupBy({
      by: ['week'],
      _count: { id: true },
      orderBy: { week: 'asc' },
    });

    res.json({ resources, weekCounts });
  } catch (error) {
    console.error('Admin get resources error:', error);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

// Create or update a resource
router.post('/resources', async (req: Request, res: Response) => {
  try {
    const { id, week, category, title, source, summary, link } = req.body;

    if (!week || week < 1 || week > 52) {
      res.status(400).json({ error: 'Week must be between 1 and 52' });
      return;
    }
    if (!category || !isValidCategory(category)) {
      res.status(400).json({ error: 'Invalid category' });
      return;
    }
    if (!title || !summary) {
      res.status(400).json({ error: 'Title and summary are required' });
      return;
    }

    let resource;
    if (id) {
      resource = await prisma.resource.update({
        where: { id },
        data: { week, category, title, source: source || null, summary, link: link || null },
      });
    } else {
      resource = await prisma.resource.create({
        data: { week, category, title, source: source || null, summary, link: link || null },
      });
    }

    res.json(resource);
  } catch (error) {
    console.error('Admin save resource error:', error);
    res.status(500).json({ error: 'Failed to save resource' });
  }
});

// Delete a resource
router.delete('/resources/:id', async (req: Request, res: Response) => {
  try {
    await prisma.resource.delete({ where: { id: req.params.id } });
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    console.error('Admin delete resource error:', error);
    res.status(500).json({ error: 'Failed to delete resource' });
  }
});

// Move a resource to a different week
router.patch('/resources/:id/move', async (req: Request, res: Response) => {
  try {
    const { week } = req.body;

    if (!week || week < 1 || week > 52) {
      res.status(400).json({ error: 'Week must be between 1 and 52' });
      return;
    }

    const resource = await prisma.resource.update({
      where: { id: req.params.id },
      data: { week },
    });

    res.json(resource);
  } catch (error) {
    console.error('Admin move resource error:', error);
    res.status(500).json({ error: 'Failed to move resource' });
  }
});

export default router;

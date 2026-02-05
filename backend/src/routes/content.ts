import { Router, Request, Response } from 'express';
import { prisma } from '../services/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

// Get affirmation for specific day
router.get('/affirmation/:day', async (req: Request, res: Response) => {
  try {
    const dayNum = parseInt(req.params.day);

    if (isNaN(dayNum) || dayNum < 1 || dayNum > 365) {
      res.status(400).json({ error: 'Invalid day number' });
      return;
    }

    const affirmation = await prisma.affirmation.findUnique({
      where: { dayNum },
    });

    if (!affirmation) {
      res.status(404).json({ error: 'Affirmation not found for this day' });
      return;
    }

    res.json(affirmation);
  } catch (error) {
    console.error('Get affirmation error:', error);
    res.status(500).json({ error: 'Failed to get affirmation' });
  }
});

// Get desensitization image for specific day (based on difficulty tier)
router.get('/desens/:day', async (req: Request, res: Response) => {
  try {
    const dayNum = parseInt(req.params.day);

    if (isNaN(dayNum) || dayNum < 1 || dayNum > 365) {
      res.status(400).json({ error: 'Invalid day number' });
      return;
    }

    // Determine difficulty tier based on user's day
    let difficulty: string;
    if (dayNum <= 30) {
      difficulty = 'beginner';
    } else if (dayNum <= 90) {
      difficulty = 'intermediate';
    } else if (dayNum <= 180) {
      difficulty = 'advanced';
    } else {
      difficulty = 'mixed';
    }

    let image;

    if (difficulty === 'mixed') {
      // For mixed (days 181-365): select random image from any difficulty
      const images = await prisma.desensImage.findMany();
      if (images.length > 0) {
        image = images[Math.floor(Math.random() * images.length)];
      }
    } else {
      // Select random image from the appropriate difficulty tier
      const images = await prisma.desensImage.findMany({
        where: { difficulty },
      });

      if (images.length > 0) {
        image = images[Math.floor(Math.random() * images.length)];
      } else {
        // Fallback: try to find any image if tier is empty
        image = await prisma.desensImage.findFirst();
      }
    }

    if (!image) {
      res.status(404).json({ error: 'No images available' });
      return;
    }

    res.json(image);
  } catch (error) {
    console.error('Get desens image error:', error);
    res.status(500).json({ error: 'Failed to get image' });
  }
});

// Log urge surf event for analytics
router.post('/urge-surf', async (req: Request, res: Response) => {
  try {
    const { sessionDay, completedBreathing, resumedExercise } = req.body;
    const userId = req.user!.userId;

    const event = await prisma.urgeSurfEvent.create({
      data: {
        userId,
        sessionDay: sessionDay || 0,
        completedBreathing: completedBreathing ?? false,
        resumedExercise: resumedExercise ?? false,
      },
    });

    res.json({ success: true, eventId: event.id });
  } catch (error) {
    console.error('Log urge surf event error:', error);
    res.status(500).json({ error: 'Failed to log event' });
  }
});

export default router;

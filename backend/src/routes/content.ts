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

// Get desensitization image for specific day (weighted random by difficulty)
router.get('/desens/:day', async (req: Request, res: Response) => {
  try {
    const dayNum = parseInt(req.params.day);

    if (isNaN(dayNum) || dayNum < 1 || dayNum > 365) {
      res.status(400).json({ error: 'Invalid day number' });
      return;
    }

    // Weighted difficulty selection based on day progression
    let weights: { difficulty: number; weight: number }[];
    if (dayNum <= 30) {
      weights = [{ difficulty: 1, weight: 1 }];
    } else if (dayNum <= 90) {
      weights = [
        { difficulty: 1, weight: 0.3 },
        { difficulty: 2, weight: 0.7 },
      ];
    } else if (dayNum <= 180) {
      weights = [
        { difficulty: 2, weight: 0.3 },
        { difficulty: 3, weight: 0.7 },
      ];
    } else {
      weights = [
        { difficulty: 1, weight: 0.2 },
        { difficulty: 2, weight: 0.4 },
        { difficulty: 3, weight: 0.4 },
      ];
    }

    // Pick a difficulty tier via weighted random
    const rand = Math.random();
    let cumulative = 0;
    let selectedDifficulty = weights[0].difficulty;
    for (const w of weights) {
      cumulative += w.weight;
      if (rand <= cumulative) {
        selectedDifficulty = w.difficulty;
        break;
      }
    }

    let image;
    let images = await prisma.desensImage.findMany({
      where: { difficulty: selectedDifficulty },
    });

    // Fallback: try other tiers in weight order
    if (images.length === 0) {
      for (const w of weights) {
        if (w.difficulty === selectedDifficulty) continue;
        images = await prisma.desensImage.findMany({
          where: { difficulty: w.difficulty },
        });
        if (images.length > 0) break;
      }
    }

    // Final fallback: any image
    if (images.length === 0) {
      image = await prisma.desensImage.findFirst();
    } else {
      image = images[Math.floor(Math.random() * images.length)];
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

// Complete desensitization exercise, award points
router.post('/desens/complete', async (req: Request, res: Response) => {
  try {
    const { imageId } = req.body;
    const userId = req.user!.userId;

    if (!imageId || typeof imageId !== 'string') {
      res.status(400).json({ error: 'Image ID is required' });
      return;
    }

    const image = await prisma.desensImage.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const pointsEarned = image.difficulty; // 1, 2, or 3
    const newTotal = Math.min(user.desensitizationPoints + pointsEarned, 300);
    const actualPointsEarned = newTotal - user.desensitizationPoints;

    const [updatedUser] = await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { desensitizationPoints: newTotal },
      }),
      prisma.desensitizationLog.create({
        data: {
          userId,
          imageId: image.id,
          pointsEarned: actualPointsEarned,
        },
      }),
    ]);

    res.json({
      pointsEarned: actualPointsEarned,
      totalPoints: updatedUser.desensitizationPoints,
      maxPoints: 300,
      isComplete: updatedUser.desensitizationPoints >= 300,
    });
  } catch (error) {
    console.error('Desens complete error:', error);
    res.status(500).json({ error: 'Failed to record completion' });
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

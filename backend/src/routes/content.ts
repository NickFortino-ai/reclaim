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

// Get desensitization image for specific day
router.get('/desens/:day', async (req: Request, res: Response) => {
  try {
    const dayNum = parseInt(req.params.day);

    if (isNaN(dayNum) || dayNum < 1 || dayNum > 365) {
      res.status(400).json({ error: 'Invalid day number' });
      return;
    }

    const image = await prisma.desensImage.findUnique({
      where: { dayNum },
    });

    if (!image) {
      res.status(404).json({ error: 'Image not found for this day' });
      return;
    }

    res.json(image);
  } catch (error) {
    console.error('Get desens image error:', error);
    res.status(500).json({ error: 'Failed to get image' });
  }
});

export default router;

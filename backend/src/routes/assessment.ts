import { Router, Request, Response } from 'express';
import { prisma } from '../services/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

const VALID_MILESTONES = ['baseline', 'day30', 'day90', 'day180', 'day365'];

// Get all assessment scores for the current user
router.get('/', async (req: Request, res: Response) => {
  try {
    const scores = await prisma.assessmentScore.findMany({
      where: { userId: req.user!.userId },
      orderBy: { takenAt: 'asc' },
    });

    res.json({ scores });
  } catch (error) {
    console.error('Get assessment scores error:', error);
    res.status(500).json({ error: 'Failed to get assessment scores' });
  }
});

// Submit a new assessment
router.post('/', async (req: Request, res: Response) => {
  try {
    const { responses, milestone } = req.body;

    if (!VALID_MILESTONES.includes(milestone)) {
      res.status(400).json({ error: 'Invalid milestone value' });
      return;
    }

    if (!Array.isArray(responses) || responses.length !== 5) {
      res.status(400).json({ error: 'Responses must be an array of exactly 5 items' });
      return;
    }

    for (let i = 0; i < responses.length; i++) {
      const r = responses[i];
      if (typeof r !== 'number' || !Number.isInteger(r) || r < 0 || r > 2) {
        res.status(400).json({ error: `Response ${i + 1} must be an integer from 0 to 2` });
        return;
      }
    }

    // Prevent duplicate milestone
    const existing = await prisma.assessmentScore.findFirst({
      where: { userId: req.user!.userId, milestone },
    });

    if (existing) {
      res.status(400).json({ error: 'Assessment already submitted for this milestone' });
      return;
    }

    const totalScore = responses.reduce((sum: number, r: number) => sum + r, 0);

    const score = await prisma.assessmentScore.create({
      data: {
        userId: req.user!.userId,
        responses,
        totalScore,
        milestone,
      },
    });

    res.status(201).json(score);
  } catch (error) {
    console.error('Submit assessment error:', error);
    res.status(500).json({ error: 'Failed to submit assessment' });
  }
});

export default router;

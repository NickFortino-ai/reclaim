import { Router, Request, Response } from 'express';
import { prisma } from '../services/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

// Get all journal entries for the current user
router.get('/', async (req: Request, res: Response) => {
  try {
    const entries = await prisma.journalEntry.findMany({
      where: { userId: req.user!.userId },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    res.json({ entries });
  } catch (error) {
    console.error('Get journal entries error:', error);
    res.status(500).json({ error: 'Failed to get journal entries' });
  }
});

// Create a new journal entry
router.post('/', async (req: Request, res: Response) => {
  try {
    const { content, mood, trigger } = req.body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      res.status(400).json({ error: 'Content is required' });
      return;
    }

    if (content.length > 10000) {
      res.status(400).json({ error: 'Content too long (max 10,000 characters)' });
      return;
    }

    const entry = await prisma.journalEntry.create({
      data: {
        userId: req.user!.userId,
        content: content.trim(),
        mood: mood || null,
        trigger: trigger || null,
      },
    });

    res.status(201).json(entry);
  } catch (error) {
    console.error('Create journal entry error:', error);
    res.status(500).json({ error: 'Failed to create journal entry' });
  }
});

// Update a journal entry
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content, mood, trigger } = req.body;

    // Verify ownership
    const existing = await prisma.journalEntry.findUnique({ where: { id } });
    if (!existing || existing.userId !== req.user!.userId) {
      res.status(404).json({ error: 'Entry not found' });
      return;
    }

    if (content && content.length > 10000) {
      res.status(400).json({ error: 'Content too long (max 10,000 characters)' });
      return;
    }

    const entry = await prisma.journalEntry.update({
      where: { id },
      data: {
        ...(content !== undefined && { content: content.trim() }),
        ...(mood !== undefined && { mood: mood || null }),
        ...(trigger !== undefined && { trigger: trigger || null }),
      },
    });

    res.json(entry);
  } catch (error) {
    console.error('Update journal entry error:', error);
    res.status(500).json({ error: 'Failed to update journal entry' });
  }
});

// Delete a journal entry
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const existing = await prisma.journalEntry.findUnique({ where: { id } });
    if (!existing || existing.userId !== req.user!.userId) {
      res.status(404).json({ error: 'Entry not found' });
      return;
    }

    await prisma.journalEntry.delete({ where: { id } });

    res.json({ message: 'Entry deleted' });
  } catch (error) {
    console.error('Delete journal entry error:', error);
    res.status(500).json({ error: 'Failed to delete journal entry' });
  }
});

export default router;

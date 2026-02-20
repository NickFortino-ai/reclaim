import { Router, Request, Response } from 'express';
import { prisma } from '../services/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

const VALID_STAYING_POWER = ['less-than-1min', '1-5min', '5-15min', '15-30min', '30-plus'];

function validateRating(val: unknown, name: string): string | null {
  if (typeof val !== 'number' || !Number.isInteger(val) || val < 1 || val > 5) {
    return `${name} must be an integer from 1 to 5`;
  }
  return null;
}

// Get all intimacy logs for the current user
router.get('/', async (req: Request, res: Response) => {
  try {
    const logs = await prisma.intimacyLog.findMany({
      where: { userId: req.user!.userId },
      orderBy: { date: 'desc' },
    });

    res.json({ logs });
  } catch (error) {
    console.error('Get intimacy logs error:', error);
    res.status(500).json({ error: 'Failed to get intimacy logs' });
  }
});

// Create a new intimacy log
router.post('/', async (req: Request, res: Response) => {
  try {
    const { date, erectionQuality, stayingPower, presence, enjoyment, connection, notes } = req.body;

    if (!date) {
      res.status(400).json({ error: 'Date is required' });
      return;
    }

    for (const [name, val] of Object.entries({ erectionQuality, presence, enjoyment, connection })) {
      const err = validateRating(val, name);
      if (err) {
        res.status(400).json({ error: err });
        return;
      }
    }

    if (!VALID_STAYING_POWER.includes(stayingPower)) {
      res.status(400).json({ error: 'Invalid stayingPower value' });
      return;
    }

    if (notes !== undefined && notes !== null) {
      if (typeof notes !== 'string' || notes.length > 2000) {
        res.status(400).json({ error: 'Notes must be a string of max 2000 characters' });
        return;
      }
    }

    const log = await prisma.intimacyLog.create({
      data: {
        userId: req.user!.userId,
        date: new Date(date),
        erectionQuality,
        stayingPower,
        presence,
        enjoyment,
        connection,
        notes: notes || null,
      },
    });

    res.status(201).json(log);
  } catch (error) {
    console.error('Create intimacy log error:', error);
    res.status(500).json({ error: 'Failed to create intimacy log' });
  }
});

// Update an intimacy log
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { date, erectionQuality, stayingPower, presence, enjoyment, connection, notes } = req.body;

    const existing = await prisma.intimacyLog.findUnique({ where: { id } });
    if (!existing || existing.userId !== req.user!.userId) {
      res.status(404).json({ error: 'Log not found' });
      return;
    }

    if (erectionQuality !== undefined) {
      const err = validateRating(erectionQuality, 'erectionQuality');
      if (err) { res.status(400).json({ error: err }); return; }
    }
    if (presence !== undefined) {
      const err = validateRating(presence, 'presence');
      if (err) { res.status(400).json({ error: err }); return; }
    }
    if (enjoyment !== undefined) {
      const err = validateRating(enjoyment, 'enjoyment');
      if (err) { res.status(400).json({ error: err }); return; }
    }
    if (connection !== undefined) {
      const err = validateRating(connection, 'connection');
      if (err) { res.status(400).json({ error: err }); return; }
    }
    if (stayingPower !== undefined && !VALID_STAYING_POWER.includes(stayingPower)) {
      res.status(400).json({ error: 'Invalid stayingPower value' });
      return;
    }
    if (notes !== undefined && notes !== null && (typeof notes !== 'string' || notes.length > 2000)) {
      res.status(400).json({ error: 'Notes must be a string of max 2000 characters' });
      return;
    }

    const log = await prisma.intimacyLog.update({
      where: { id },
      data: {
        ...(date !== undefined && { date: new Date(date) }),
        ...(erectionQuality !== undefined && { erectionQuality }),
        ...(stayingPower !== undefined && { stayingPower }),
        ...(presence !== undefined && { presence }),
        ...(enjoyment !== undefined && { enjoyment }),
        ...(connection !== undefined && { connection }),
        ...(notes !== undefined && { notes: notes || null }),
      },
    });

    res.json(log);
  } catch (error) {
    console.error('Update intimacy log error:', error);
    res.status(500).json({ error: 'Failed to update intimacy log' });
  }
});

// Delete an intimacy log
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.intimacyLog.findUnique({ where: { id } });
    if (!existing || existing.userId !== req.user!.userId) {
      res.status(404).json({ error: 'Log not found' });
      return;
    }

    await prisma.intimacyLog.delete({ where: { id } });

    res.json({ message: 'Log deleted' });
  } catch (error) {
    console.error('Delete intimacy log error:', error);
    res.status(500).json({ error: 'Failed to delete intimacy log' });
  }
});

export default router;

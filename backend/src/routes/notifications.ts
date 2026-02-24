import { Router, Request, Response } from 'express';
import { prisma } from '../services/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

// Register push token
router.post('/register-token', async (req: Request, res: Response) => {
  try {
    const { token, platform } = req.body;

    if (!token || typeof token !== 'string') {
      res.status(400).json({ error: 'Token required' });
      return;
    }

    await prisma.user.update({
      where: { id: req.user!.userId },
      data: {
        pushToken: token,
        pushTokenPlatform: platform || 'ios',
      },
    });

    res.json({ registered: true });
  } catch (error) {
    console.error('Register push token error:', error);
    res.status(500).json({ error: 'Failed to register token' });
  }
});

// Unregister push token
router.post('/unregister-token', async (req: Request, res: Response) => {
  try {
    await prisma.user.update({
      where: { id: req.user!.userId },
      data: {
        pushToken: null,
        pushTokenPlatform: null,
      },
    });

    res.json({ unregistered: true });
  } catch (error) {
    console.error('Unregister push token error:', error);
    res.status(500).json({ error: 'Failed to unregister token' });
  }
});

export default router;

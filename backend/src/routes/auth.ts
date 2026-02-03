import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../services/prisma.js';
import { generateToken } from '../middleware/auth.js';
import { generateAccessCode } from '../utils/helpers.js';

const router = Router();

// Register new user (called after successful Stripe payment)
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { stripeCustomerId, stripeSubscriptionId } = req.body;

    // Generate unique access code
    let accessCode: string;
    let attempts = 0;
    do {
      accessCode = generateAccessCode();
      const existing = await prisma.user.findUnique({ where: { accessCode } });
      if (!existing) break;
      attempts++;
    } while (attempts < 10);

    if (attempts >= 10) {
      res.status(500).json({ error: 'Failed to generate unique access code' });
      return;
    }

    const user = await prisma.user.create({
      data: {
        accessCode,
        stripeCustomerId,
        stripeSubscriptionId,
        subscriptionStatus: 'trialing',
      },
    });

    const token = generateToken({ userId: user.id, type: 'user' });

    res.status(201).json({
      accessCode: user.accessCode,
      token,
      user: {
        id: user.id,
        currentStreak: user.currentStreak,
        totalDaysWon: user.totalDaysWon,
        colorTheme: user.colorTheme,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

// Login with access code
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { accessCode } = req.body;

    if (!accessCode || typeof accessCode !== 'string') {
      res.status(400).json({ error: 'Access code required' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { accessCode: accessCode.toUpperCase() },
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid access code' });
      return;
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const token = generateToken({ userId: user.id, type: 'user' });

    res.json({
      token,
      user: {
        id: user.id,
        currentStreak: user.currentStreak,
        totalDaysWon: user.totalDaysWon,
        lastCheckIn: user.lastCheckIn,
        colorTheme: user.colorTheme,
        subscriptionStatus: user.subscriptionStatus,
        completedAt: user.completedAt,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Admin login
router.post('/admin/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: 'Username and password required' });
      return;
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const validPassword = await bcrypt.compare(password, admin.passwordHash);

    if (!validPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = generateToken({ userId: admin.id, type: 'admin' });

    res.json({ token });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;

import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../services/prisma.js';
import { generateToken } from '../middleware/auth.js';
import { generateAccessCode, generateUniqueDisplayName } from '../utils/helpers.js';
import { getTimezoneFromHeader, isValidTimezone } from '../utils/timezone.js';

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
    const { accessCode, timezone } = req.body;

    if (!accessCode || typeof accessCode !== 'string') {
      res.status(400).json({ error: 'Access code required' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { accessCode: accessCode.trim() },
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid access code' });
      return;
    }

    // Resolve timezone: prefer body, then header, then keep existing
    const resolvedTimezone = (timezone && isValidTimezone(timezone))
      ? timezone
      : getTimezoneFromHeader(req);

    // Update last login and timezone
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
        timezone: resolvedTimezone !== 'UTC' ? resolvedTimezone : user.timezone,
      },
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
        desensitizationPoints: user.desensitizationPoints,
        hasCompletedOnboarding: user.hasCompletedOnboarding,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Register for native app (iOS) — no Stripe payment at registration
router.post('/register-native', async (req: Request, res: Response) => {
  try {
    const { referralCode, ageVerifiedAt } = req.body;

    if (!ageVerifiedAt) {
      res.status(400).json({ error: 'Age verification required' });
      return;
    }

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

    // Generate a unique display name
    const displayName = await generateUniqueDisplayName(async (name) => {
      const existing = await prisma.user.findFirst({
        where: { displayName: name },
      });
      return !!existing;
    });

    // Resolve referral
    let referredById: string | undefined;
    if (referralCode && typeof referralCode === 'string') {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
        select: { id: true },
      });
      if (referrer) referredById = referrer.id;
    }

    const user = await prisma.user.create({
      data: {
        accessCode,
        displayName,
        subscriptionStatus: 'pending_iap',
        registrationPlatform: 'ios',
        referredById,
        timezone: getTimezoneFromHeader(req),
        ageVerifiedAt: new Date(ageVerifiedAt),
      },
    });

    // Create referral reward record (without Stripe credit)
    if (referredById) {
      try {
        await prisma.referralReward.create({
          data: {
            referrerId: referredById,
            referredId: user.id,
            creditDays: 7,
            stripeApplied: false,
          },
        });
      } catch {
        // Referral reward already exists or other error — non-critical
      }
    }

    const token = generateToken({ userId: user.id, type: 'user' });

    res.status(201).json({
      accessCode: user.accessCode,
      token,
      user: {
        id: user.id,
        currentStreak: user.currentStreak,
        totalDaysWon: user.totalDaysWon,
        colorTheme: user.colorTheme,
        referralCode: user.referralCode,
        desensitizationPoints: user.desensitizationPoints,
        hasCompletedOnboarding: false,
        subscriptionStatus: user.subscriptionStatus,
      },
      referralApplied: !!referredById,
    });
  } catch (error) {
    console.error('Native registration error:', error);
    res.status(500).json({ error: 'Failed to create account' });
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

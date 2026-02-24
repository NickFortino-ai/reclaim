import { Router, Request, Response } from 'express';
import { prisma } from '../services/prisma.js';

const router = Router();

const RC_WEBHOOK_AUTH_KEY = process.env.REVENUECAT_WEBHOOK_AUTH_KEY;

// RevenueCat webhook handler — receives subscription status changes from RevenueCat
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    // Verify webhook auth header
    if (RC_WEBHOOK_AUTH_KEY) {
      const authHeader = req.headers['authorization'];
      if (authHeader !== `Bearer ${RC_WEBHOOK_AUTH_KEY}`) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
    }

    const event = req.body;
    const rcAppUserId = event.app_user_id;
    const eventType = event.type;

    if (!rcAppUserId || !eventType) {
      res.json({ received: true });
      return;
    }

    // Find user by RevenueCat ID
    const user = await prisma.user.findUnique({
      where: { revenuecatId: rcAppUserId },
    });

    if (!user) {
      console.warn(`RevenueCat webhook: no user found for RC ID ${rcAppUserId}`);
      res.json({ received: true });
      return;
    }

    // Never overwrite 'completed' status
    if (user.completedAt || user.subscriptionStatus === 'completed') {
      res.json({ received: true });
      return;
    }

    switch (eventType) {
      case 'INITIAL_PURCHASE':
      case 'RENEWAL':
      case 'UNCANCELLATION':
        await prisma.user.update({
          where: { id: user.id },
          data: { subscriptionStatus: 'active' },
        });
        break;

      case 'CANCELLATION':
      case 'EXPIRATION': {
        // If user completed 365 days, mark as completed instead of canceled
        const newStatus = user.currentStreak >= 365 ? 'completed' : 'canceled';
        await prisma.user.update({
          where: { id: user.id },
          data: {
            subscriptionStatus: newStatus,
            ...(newStatus === 'completed' ? { completedAt: new Date() } : {}),
          },
        });
        break;
      }

      case 'BILLING_ISSUE':
        console.log(`RevenueCat billing issue for user ${user.id}`);
        break;

      case 'NON_RENEWING_PURCHASE':
        // Lifetime purchase
        if (event.product_id === 'reclaim_lifetime') {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              lifetimeAccess: true,
              subscriptionStatus: 'completed',
            },
          });
        }
        break;
    }

    res.json({ received: true });
  } catch (error) {
    console.error('RevenueCat webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;

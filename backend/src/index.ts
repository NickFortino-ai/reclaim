import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import communityRoutes from './routes/community.js';
import contentRoutes from './routes/content.js';
import stripeRoutes from './routes/stripe.js';
import adminRoutes from './routes/admin.js';
import referralRoutes from './routes/referral.js';
import journalRoutes from './routes/journal.js';
import intimacyRoutes from './routes/intimacy.js';
import assessmentRoutes from './routes/assessment.js';
import partnershipRoutes from './routes/partnership.js';
import revenuecatRoutes from './routes/revenuecat.js';
import notificationRoutes from './routes/notifications.js';
import rateLimit from 'express-rate-limit';
import { sendDailyReminders } from './jobs/sendReminders.js';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS - allow multiple origins
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'https://reclaim365app.vercel.app',
  'https://reclaim365.app',
  'https://www.reclaim365.app',
  'https://frontend-seven-pi-10.vercel.app',
  'capacitor://localhost',
  'ionic://localhost',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Timezone'],
}));

// Stripe webhook needs raw body
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));

// JSON parsing for all other routes
app.use(express.json());

// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // Critical: only 10,000 possible 4-digit codes
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts, please try again in 15 minutes' },
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: 'Too many registration attempts, please try again later' },
});

app.use('/api', generalLimiter);
app.use('/api/auth/login', loginLimiter);
app.use('/api/auth/register-native', registerLimiter);
app.use('/api/stripe/create-checkout', registerLimiter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/referral', referralRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/intimacy', intimacyRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/partnership', partnershipRoutes);
app.use('/api/revenuecat', revenuecatRoutes);
app.use('/api/notifications', notificationRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Run daily reminders every 15 minutes
  setInterval(sendDailyReminders, 15 * 60 * 1000);
});

export default app;

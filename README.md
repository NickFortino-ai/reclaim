# Reclaim

Accountability platform for men recovering from porn addiction. Anonymous authentication, Stripe billing ($2.76/month, first day free), auto-cancellation when user reaches 365 Total Days Won (not calendar days).

## Architecture

```
reclaim/
├── backend/                 # Express.js API
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── src/
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Auth, error handling
│   │   ├── services/        # Prisma, Stripe clients
│   │   ├── utils/           # Helpers
│   │   └── index.ts         # Entry point
│   └── package.json
├── frontend/                # React + Vite
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Route pages
│   │   ├── hooks/           # Custom hooks
│   │   ├── context/         # Auth, theme providers
│   │   ├── api/             # API client
│   │   └── main.tsx
│   └── package.json
└── README.md
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Express.js + TypeScript |
| Database | PostgreSQL + Prisma |
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind CSS |
| Auth | Custom JWT + access codes |
| Payments | Stripe Checkout + Webhooks |
| State | React Query + Context |

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure environment variables:
# - DATABASE_URL: PostgreSQL connection string
# - JWT_SECRET: Random secret for JWT signing
# - STRIPE_SECRET_KEY: From Stripe dashboard
# - STRIPE_WEBHOOK_SECRET: From Stripe webhook settings
# - STRIPE_PRICE_ID: Create a recurring price in Stripe ($2.76/month)
# - FRONTEND_URL: http://localhost:5173 for development

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure environment variables:
# - VITE_API_URL: http://localhost:3000 for development
# - VITE_STRIPE_PUBLIC_KEY: From Stripe dashboard

# Start development server
npm run dev
```

### Create Admin User

After the backend is running, create an admin user via the API or database:

```bash
# Via Prisma Studio
cd backend
npm run db:studio

# Or via API (requires existing admin token - bootstrap manually)
```

To bootstrap the first admin:

```sql
-- Run in PostgreSQL
INSERT INTO "Admin" (id, username, "passwordHash")
VALUES (
  'admin-id',
  'admin',
  '$2b$10$...' -- bcrypt hash of your password
);
```

## Environment Variables

### Backend (.env)

```
DATABASE_URL=postgresql://user:password@localhost:5432/reclaim
JWT_SECRET=your-super-secret-jwt-key-change-in-production
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...
FRONTEND_URL=http://localhost:5173
PORT=3000
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

## Stripe Setup

1. Create a Stripe account at stripe.com
2. Create a Product for "Reclaim Subscription"
3. Create a recurring Price of $2.76/month
4. Copy the Price ID to `STRIPE_PRICE_ID`
5. Set up a webhook endpoint pointing to `/api/stripe/webhook`
6. Subscribe to events: `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
7. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## Deployment

### Backend (Railway)

1. Create a new Railway project
2. Add PostgreSQL database
3. Deploy from GitHub or CLI
4. Set environment variables
5. Update `FRONTEND_URL` to your Vercel domain

### Frontend (Vercel)

1. Import project from GitHub
2. Set root directory to `frontend`
3. Set environment variables
4. Deploy

## API Endpoints

### Auth
- `POST /api/auth/login` - Login with access code
- `POST /api/auth/admin/login` - Admin login

### User
- `GET /api/user/me` - Get current user data
- `POST /api/user/checkin` - Daily check-in
- `POST /api/user/reset` - Reset streak
- `PATCH /api/user/theme` - Update color theme
- `POST /api/user/missed-days` - Handle missed days

### Community
- `GET /api/community` - Get community members
- `POST /api/community/support/:userId` - Send support

### Content
- `GET /api/content/affirmation/:day` - Get affirmation
- `GET /api/content/desens/:day` - Get desensitization image

### Admin
- `GET /api/admin/stats` - Dashboard stats
- `GET/POST/DELETE /api/admin/affirmations` - Manage affirmations
- `GET/POST/DELETE /api/admin/images` - Manage images

### Stripe
- `POST /api/stripe/create-checkout` - Create checkout session
- `POST /api/stripe/complete-registration` - Complete registration after payment
- `POST /api/stripe/webhook` - Handle Stripe events

## Features

- **Anonymous Auth**: Users identified only by 8-character access codes
- **Streak Tracking**: Current streak and total days won
- **Missed Days Detection**: Prompts users who haven't checked in
- **365-Day Completion**: Auto-cancels subscription when Total Days Won reaches 365 (resets don't count — users stay subscribed until they earn all 365 days)
- **12 Color Themes**: Personalize your experience
- **Community Support**: Anonymous encouragement between users
- **Desensitization Exercises**: Daily exposure therapy content
- **Daily Affirmations**: 365 unique affirmations
- **Admin Panel**: Manage content and view stats

## License

Private - All rights reserved

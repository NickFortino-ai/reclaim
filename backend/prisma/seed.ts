import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create test user with access code TEST123
  const testUser = await prisma.user.upsert({
    where: { accessCode: 'TEST123' },
    update: {},
    create: {
      accessCode: 'TEST123',
      currentStreak: 0,
      totalDaysWon: 0,
      subscriptionStatus: 'active',
      colorTheme: 'blue',
    },
  });

  console.log('Created test user:', testUser);
  console.log('\nYou can now login with access code: TEST123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

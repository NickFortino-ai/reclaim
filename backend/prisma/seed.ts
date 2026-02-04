import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Sample affirmations including real intimacy and connection themes
const sampleAffirmations = [
  { dayNum: 1, text: "Today is Day 1. Every journey begins with a single step. You've already taken it." },
  { dayNum: 2, text: "You're not giving something up—you're getting your life back." },
  { dayNum: 3, text: "The urge is temporary. Your resolve is permanent." },
  { dayNum: 7, text: "One week strong. Your brain is already beginning to rewire." },
  { dayNum: 14, text: "Two weeks of freedom. You're proving to yourself what you're capable of." },
  { dayNum: 21, text: "Three weeks. Old neural pathways are weakening. New ones are forming." },
  { dayNum: 30, text: "One month. You've shown discipline most men never will." },
  // Real intimacy and connection themed affirmations
  { dayNum: 35, text: "Real connection requires presence. Every day clean, you're preparing for genuine intimacy." },
  { dayNum: 42, text: "Your capacity for real love grows stronger as artificial stimulation fades." },
  { dayNum: 50, text: "You're rewiring your brain to respond to real women, real touch, real connection." },
  { dayNum: 60, text: "Two months. Many men report their attraction to real partners intensifying now." },
  { dayNum: 75, text: "True intimacy is about emotional vulnerability, not performance. You're learning this." },
  { dayNum: 90, text: "90 days. Your brain has made significant progress recalibrating to natural rewards." },
  { dayNum: 100, text: "You're becoming the man who can offer a woman your full presence and attention." },
  { dayNum: 120, text: "Real touch, real connection, real love—these are what you're preparing for." },
  { dayNum: 150, text: "Halfway there. The man you're becoming is capable of deep, meaningful relationships." },
  { dayNum: 180, text: "Six months of freedom. Your capacity for genuine intimacy has transformed." },
  { dayNum: 200, text: "You've proven you can delay gratification for something real and meaningful." },
  { dayNum: 250, text: "The discipline you've built here will strengthen every relationship in your life." },
  { dayNum: 270, text: "Nine months. You're not the same man who started this journey." },
  { dayNum: 300, text: "300 days. You've rewired your brain for real connection over artificial stimulation." },
  { dayNum: 330, text: "You're ready to give a real partner your undivided attention and genuine presence." },
  { dayNum: 350, text: "15 days to go. You've built something most men never will—true self-mastery." },
  { dayNum: 365, text: "365 days. You've reclaimed your manhood. You're ready for real intimacy, real connection, real life." },
];

async function main() {
  // Create test user with access code TEST1234
  const testUser = await prisma.user.upsert({
    where: { accessCode: 'TEST1234' },
    update: {},
    create: {
      accessCode: 'TEST1234',
      currentStreak: 0,
      totalDaysWon: 0,
      subscriptionStatus: 'active',
      colorTheme: 'slate',
    },
  });

  console.log('Created test user:', testUser);
  console.log('\nYou can login with access code: TEST1234');

  // Seed sample affirmations
  console.log('\nSeeding sample affirmations...');
  for (const affirmation of sampleAffirmations) {
    await prisma.affirmation.upsert({
      where: { dayNum: affirmation.dayNum },
      update: { text: affirmation.text },
      create: affirmation,
    });
  }
  console.log(`Seeded ${sampleAffirmations.length} affirmations`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

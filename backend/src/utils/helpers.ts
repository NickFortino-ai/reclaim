import crypto from 'crypto';

export function generateAccessCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(crypto.randomInt(0, chars.length));
  }
  return code;
}

export function differenceInDays(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.round((d1.getTime() - d2.getTime()) / oneDay);
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export const motivationalQuotes = [
  "Every day is a new beginning. Take a deep breath and start again.",
  "You are not your mistakes. You are not your struggles. You are so much more.",
  "The comeback is always stronger than the setback.",
  "Fall seven times, stand up eight.",
  "Progress, not perfection, is what matters.",
  "Your past does not define your future.",
  "Every step forward, no matter how small, is still progress.",
  "Strength grows in the moments when you think you can't go on but you keep going anyway.",
  "You have survived 100% of your worst days. You're doing great.",
  "It's not about being perfect. It's about effort. And when you bring that effort every single day, that's where transformation happens.",
  "The only impossible journey is the one you never begin.",
  "You are braver than you believe, stronger than you seem, and smarter than you think.",
  "Don't let a stumble in the road be the end of your journey.",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
  "The secret of getting ahead is getting started."
];

export function getRandomQuote(): string {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
}

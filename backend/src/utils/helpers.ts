import crypto from 'crypto';

// Masculine, powerful adjectives for warrior names
const ADJECTIVES = [
  'Silent', 'Iron', 'Swift', 'Steel', 'Stone', 'Shadow', 'Thunder', 'Storm',
  'Wild', 'Ancient', 'Bold', 'Fierce', 'Lone', 'Mighty', 'Noble', 'Rogue',
  'Dark', 'Crimson', 'Silver', 'Ghost', 'Frost', 'Ember', 'Blaze', 'Grim',
  'Savage', 'Primal', 'Alpha', 'Apex', 'Relentless', 'Fearless', 'Steadfast',
  'Resolute', 'Unyielding', 'Vigilant', 'Valiant', 'Stoic', 'Rugged', 'Granite',
  'Obsidian', 'Onyx', 'Bronze', 'Copper', 'Titanium', 'Cobalt', 'Midnight',
  'Crimson', 'Scarlet', 'Azure', 'Ashen', 'Golden'
];

// Powerful, masculine nouns for warrior names
const NOUNS = [
  'Wolf', 'Bear', 'Hawk', 'Lion', 'Tiger', 'Eagle', 'Stallion', 'Spartan',
  'Guardian', 'Sentinel', 'Warrior', 'Knight', 'Ranger', 'Titan', 'Viking',
  'Phoenix', 'Dragon', 'Cobra', 'Panther', 'Viper', 'Falcon', 'Raven',
  'Wolverine', 'Grizzly', 'Maverick', 'Hunter', 'Gladiator', 'Centurion',
  'Warden', 'Crusader', 'Paladin', 'Champion', 'Conqueror', 'Defender',
  'Protector', 'Vanguard', 'Ronin', 'Samurai', 'Templar', 'Legion',
  'Enforcer', 'Reaper', 'Phantom', 'Specter', 'Wraith', 'Blade', 'Shield',
  'Hammer', 'Forge', 'Anvil'
];

export function generateDisplayName(): string {
  const adjective = ADJECTIVES[crypto.randomInt(0, ADJECTIVES.length)];
  const noun = NOUNS[crypto.randomInt(0, NOUNS.length)];
  const number = crypto.randomInt(100, 999);
  return `${adjective} ${noun} ${number}`;
}

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

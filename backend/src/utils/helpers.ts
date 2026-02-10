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

// Generate a random warrior name base (without number)
export function generateWarriorNameBase(): string {
  const adjective = ADJECTIVES[crypto.randomInt(0, ADJECTIVES.length)];
  const noun = NOUNS[crypto.randomInt(0, NOUNS.length)];
  return `${adjective} ${noun}`;
}

// Check if a display name exists and find the next available number if needed
export async function generateUniqueDisplayName(
  checkExists: (name: string) => Promise<boolean>
): Promise<string> {
  // Try up to 10 different name combinations
  for (let attempt = 0; attempt < 10; attempt++) {
    const baseName = generateWarriorNameBase();

    // Check if the base name is available
    const baseExists = await checkExists(baseName);
    if (!baseExists) {
      return baseName;
    }

    // Base name exists, find the smallest available number
    for (let num = 2; num <= 100; num++) {
      const numberedName = `${baseName} ${num}`;
      const numberedExists = await checkExists(numberedName);
      if (!numberedExists) {
        return numberedName;
      }
    }
  }

  // Fallback: generate with random number (very unlikely to reach here)
  const baseName = generateWarriorNameBase();
  return `${baseName} ${crypto.randomInt(100, 999)}`;
}

// Legacy function for backwards compatibility (generates with number)
export function generateDisplayName(): string {
  const adjective = ADJECTIVES[crypto.randomInt(0, ADJECTIVES.length)];
  const noun = NOUNS[crypto.randomInt(0, NOUNS.length)];
  const number = crypto.randomInt(100, 999);
  return `${adjective} ${noun} ${number}`;
}

export function generateAccessCode(): string {
  return String(crypto.randomInt(0, 10000)).padStart(4, '0');
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

// --- Timezone-aware date helpers ---

function getDatePartsInTimezone(date: Date, timezone: string): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  return {
    year: parseInt(parts.find(p => p.type === 'year')!.value),
    month: parseInt(parts.find(p => p.type === 'month')!.value),
    day: parseInt(parts.find(p => p.type === 'day')!.value),
  };
}

function getTimezoneOffsetMs(date: Date, timezone: string): number {
  const localParts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const y = parseInt(localParts.find(p => p.type === 'year')!.value);
  const m = parseInt(localParts.find(p => p.type === 'month')!.value) - 1;
  const d = parseInt(localParts.find(p => p.type === 'day')!.value);
  const h = parseInt(localParts.find(p => p.type === 'hour')!.value);
  const min = parseInt(localParts.find(p => p.type === 'minute')!.value);
  const s = parseInt(localParts.find(p => p.type === 'second')!.value);

  const localAsUtcMs = Date.UTC(y, m, d, h, min, s);
  return localAsUtcMs - date.getTime();
}

export function isSameDayInTimezone(date1: Date, date2: Date, timezone: string): boolean {
  const d1 = getDatePartsInTimezone(date1, timezone);
  const d2 = getDatePartsInTimezone(date2, timezone);
  return d1.year === d2.year && d1.month === d2.month && d1.day === d2.day;
}

export function differenceInDaysInTimezone(date1: Date, date2: Date, timezone: string): number {
  const d1 = getDatePartsInTimezone(date1, timezone);
  const d2 = getDatePartsInTimezone(date2, timezone);
  const utc1 = Date.UTC(d1.year, d1.month - 1, d1.day);
  const utc2 = Date.UTC(d2.year, d2.month - 1, d2.day);
  return Math.round((utc1 - utc2) / (24 * 60 * 60 * 1000));
}

export function startOfDayInTimezone(date: Date, timezone: string): Date {
  const parts = getDatePartsInTimezone(date, timezone);
  const midnightUtcGuess = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
  const offsetMs = getTimezoneOffsetMs(midnightUtcGuess, timezone);
  const result = new Date(midnightUtcGuess.getTime() - offsetMs);
  // Verify: offset might differ at the result time (DST transition edge case)
  const verifyOffset = getTimezoneOffsetMs(result, timezone);
  if (verifyOffset !== offsetMs) {
    return new Date(midnightUtcGuess.getTime() - verifyOffset);
  }
  return result;
}

export function endOfDayInTimezone(date: Date, timezone: string): Date {
  const start = startOfDayInTimezone(date, timezone);
  return new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);
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

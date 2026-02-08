export function getCurrentWeek(): number {
  const epoch = new Date('2026-01-01T00:00:00Z');
  const now = new Date();
  const diffMs = now.getTime() - epoch.getTime();
  const diffWeeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
  return (diffWeeks % 52) + 1;
}

export const VALID_CATEGORIES = ['studies', 'drive', 'intimacy', 'wisdom'] as const;
export type ResourceCategory = (typeof VALID_CATEGORIES)[number];

export function isValidCategory(category: string): category is ResourceCategory {
  return (VALID_CATEGORIES as readonly string[]).includes(category);
}

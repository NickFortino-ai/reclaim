/** Returns the user's personal week (1-52) based on their signup date. Cycles after 52. */
export function getUserWeek(createdAt: Date): number {
  const now = new Date();
  const diffMs = now.getTime() - createdAt.getTime();
  const diffWeeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
  return (diffWeeks % 52) + 1;
}

export const VALID_CATEGORIES = ['studies', 'drive', 'intimacy', 'wisdom'] as const;
export type ResourceCategory = (typeof VALID_CATEGORIES)[number];

export function isValidCategory(category: string): category is ResourceCategory {
  return (VALID_CATEGORIES as readonly string[]).includes(category);
}

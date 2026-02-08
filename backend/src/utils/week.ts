/** Returns the user's resource week (1-52) based on totalDaysWon. Cycles after 52. */
export function getUserWeek(totalDaysWon: number): number {
  return (Math.floor(totalDaysWon / 7) % 52) + 1;
}

export const VALID_CATEGORIES = ['studies', 'drive', 'intimacy', 'wisdom'] as const;
export type ResourceCategory = (typeof VALID_CATEGORIES)[number];

export function isValidCategory(category: string): category is ResourceCategory {
  return (VALID_CATEGORIES as readonly string[]).includes(category);
}

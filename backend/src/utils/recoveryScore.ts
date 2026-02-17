interface RecoveryScoreInput {
  totalDaysWon: number;
  daysSinceStart: number;
  streakHistory: number[]; // array of streak lengths from check-in history
  urgeSurfCount: number;
  journalCount: number;
  desensitizationPoints: number;
}

export function computeRecoveryScore(input: RecoveryScoreInput): number {
  const {
    totalDaysWon,
    daysSinceStart,
    streakHistory,
    urgeSurfCount,
    journalCount,
    desensitizationPoints,
  } = input;

  const safeDaysSinceStart = Math.max(daysSinceStart, 1);

  // 1. Consistency (30pts): ratio of days won to days since start
  const consistency = (totalDaysWon / safeDaysSinceStart) * 30;

  // 2. Streak trend (20pts): ratio of recent streak avg vs overall avg
  //    Full points if user has never reset (single streak or no resets)
  let streakTrend = 20;
  if (streakHistory.length >= 2) {
    const overallAvg = streakHistory.reduce((a, b) => a + b, 0) / streakHistory.length;
    const recentCount = Math.max(1, Math.floor(streakHistory.length / 2));
    const recentStreaks = streakHistory.slice(-recentCount);
    const recentAvg = recentStreaks.reduce((a, b) => a + b, 0) / recentStreaks.length;
    if (overallAvg > 0) {
      streakTrend = Math.min(recentAvg / overallAvg, 1) * 20;
    }
  }

  // 3. Tool engagement (25pts)
  //    - Urge surf sessions (8pts, saturates at 20)
  const urgePts = Math.min(urgeSurfCount / 20, 1) * 8;
  //    - Journal entries (9pts, saturates at 30)
  const journalPts = Math.min(journalCount / 30, 1) * 9;
  //    - Desensitization points (8pts, saturates at 150)
  const desensPts = Math.min(desensitizationPoints / 150, 1) * 8;
  const toolEngagement = urgePts + journalPts + desensPts;

  // 4. Longevity (15pts): ramps to full at 90 days
  const longevity = Math.min(safeDaysSinceStart / 90, 1) * 15;

  // 5. Floor bonus (10pts): always present if totalDaysWon >= 1, 5pts if 0
  const floorBonus = totalDaysWon >= 1 ? 10 : 5;

  const raw = consistency + streakTrend + toolEngagement + longevity + floorBonus;
  return Math.round(Math.min(Math.max(raw, 0), 100));
}

interface StreakDisplayProps {
  currentStreak: number;
  totalDaysWon: number;
  recoveryScore: number;
}

function getScoreColor(score: number): string {
  if (score <= 25) return 'text-red-600';
  if (score <= 50) return 'text-amber-600';
  if (score <= 75) return 'text-green-600';
  return 'text-emerald-600';
}

export function StreakDisplay({ currentStreak, totalDaysWon, recoveryScore }: StreakDisplayProps) {
  const progress = Math.min((currentStreak / 365) * 100, 100);

  return (
    <div className="card">
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div>
          <h2 className="text-3xl font-bold text-primary-600">{currentStreak}</h2>
          <p className="text-gray-600 text-sm">Current Streak</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{totalDaysWon}</h2>
          <p className="text-gray-600 text-sm">Total Days Won</p>
        </div>
        <div>
          <h2 className={`text-3xl font-bold ${getScoreColor(recoveryScore)}`}>{recoveryScore}</h2>
          <p className="text-gray-600 text-sm">Recovery Score</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress to Freedom</span>
          <span className="font-medium text-primary-600">{currentStreak}/365 days</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 text-center">
          {365 - currentStreak} more streak days — subscription auto-cancels at 365-day streak
        </p>
      </div>
    </div>
  );
}

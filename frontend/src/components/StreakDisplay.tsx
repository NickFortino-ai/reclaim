interface StreakDisplayProps {
  currentStreak: number;
  totalDaysWon: number;
}

export function StreakDisplay({ currentStreak, totalDaysWon }: StreakDisplayProps) {
  const progress = Math.min((totalDaysWon / 365) * 100, 100);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-primary-600">{currentStreak}</h2>
          <p className="text-gray-600">Current Streak</p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold text-gray-900">{totalDaysWon}</h2>
          <p className="text-gray-600">Total Days Won</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress to Freedom</span>
          <span className="font-medium text-primary-600">{totalDaysWon}/365 days</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 text-center">
          {365 - totalDaysWon} days remaining
        </p>
      </div>
    </div>
  );
}

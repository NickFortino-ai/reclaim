import { useState } from 'react';

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
  const [showTooltip, setShowTooltip] = useState(false);

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
        <div className="relative">
          <h2 className={`text-3xl font-bold ${getScoreColor(recoveryScore)}`}>{recoveryScore}</h2>
          <p className="text-gray-600 text-sm inline-flex items-center gap-1">
            Recovery Score
            <button
              onClick={() => setShowTooltip(!showTooltip)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
              </svg>
            </button>
          </p>
          {showTooltip && (
            <div className="absolute z-10 bottom-full right-0 mb-2 w-56 bg-gray-800 text-white text-xs rounded-lg p-3 shadow-lg">
              Your overall recovery health based on consistency, streak trends, tool usage, and time in the program. Unlike your streak, this score barely drops on a bad day.
              <div className="absolute bottom-0 right-4 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
            </div>
          )}
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
      </div>
    </div>
  );
}

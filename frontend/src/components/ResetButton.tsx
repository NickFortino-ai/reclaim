import { useState } from 'react';
import { useReset } from '../hooks/useApi';
import { ResetResponse } from '../api/client';

function getScoreColor(score: number): string {
  if (score <= 25) return 'text-red-600';
  if (score <= 50) return 'text-amber-600';
  if (score <= 75) return 'text-green-600';
  return 'text-emerald-600';
}

export function ResetButton() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [resetData, setResetData] = useState<ResetResponse | null>(null);
  const reset = useReset();

  const handleReset = async () => {
    try {
      const result = await reset.mutateAsync();
      setResetData(result);
      setShowConfirm(false);
    } catch (error) {
      console.error('Reset failed:', error);
    }
  };

  if (resetData) {
    return (
      <div className="card bg-amber-50 border-amber-200">
        <h3 className="text-lg font-semibold text-amber-800 mb-3 text-center">
          You just went {resetData.previousStreak} day{resetData.previousStreak !== 1 ? 's' : ''} strong
        </h3>

        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{resetData.totalDaysWon}</div>
            <div className="text-xs text-gray-600">Total Days Won</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{resetData.highestStreak}</div>
            <div className="text-xs text-gray-600">Highest Streak</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{resetData.consistencyRate}%</div>
            <div className="text-xs text-gray-600">Consistency</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 mb-4 text-center">
          <div className={`text-3xl font-bold ${getScoreColor(resetData.recoveryScore)}`}>
            {resetData.recoveryScore}
          </div>
          <div className="text-sm text-gray-600">Recovery Score</div>
          <p className="text-sm text-gray-700 mt-1">
            This barely moved. One day doesn't erase {resetData.totalDaysWon} day{resetData.totalDaysWon !== 1 ? 's' : ''} of growth.
          </p>
        </div>

        <p className="text-amber-700 text-center italic mb-4">"{resetData.quote}"</p>
        <button
          onClick={() => setResetData(null)}
          className="w-full btn bg-amber-600 text-white hover:bg-amber-700"
        >
          Continue Forward
        </button>
      </div>
    );
  }

  if (showConfirm) {
    return (
      <div className="card border-red-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
          Reset your streak?
        </h3>
        <p className="text-gray-600 text-center text-sm mb-4">
          This will set your current streak to 0. Your total days won will remain.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleReset}
            disabled={reset.isPending}
            className="flex-1 btn bg-red-600 text-white hover:bg-red-700"
          >
            {reset.isPending ? 'Resetting...' : 'Yes, Reset'}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="flex-1 btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="text-sm text-gray-500 hover:text-red-600 underline py-2"
    >
      I need to reset my streak
    </button>
  );
}

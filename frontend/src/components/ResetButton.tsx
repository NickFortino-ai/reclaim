import { useState } from 'react';
import { useReset } from '../hooks/useApi';

export function ResetButton() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [quote, setQuote] = useState<string | null>(null);
  const reset = useReset();

  const handleReset = async () => {
    try {
      const result = await reset.mutateAsync();
      setQuote(result.quote);
      setShowConfirm(false);
    } catch (error) {
      console.error('Reset failed:', error);
    }
  };

  if (quote) {
    return (
      <div className="card bg-amber-50 border-amber-200">
        <h3 className="text-lg font-semibold text-amber-800 mb-2 text-center">
          A New Beginning
        </h3>
        <p className="text-amber-700 text-center italic mb-4">"{quote}"</p>
        <button
          onClick={() => setQuote(null)}
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

import { useState } from 'react';
import { useHandleMissedDays } from '../hooks/useApi';

interface MissedDaysModalProps {
  missedDays: number;
  onClose: () => void;
}

export function MissedDaysModal({ missedDays, onClose }: MissedDaysModalProps) {
  const [quote, setQuote] = useState<string | null>(null);
  const handleMissedDays = useHandleMissedDays();

  const handleResponse = async (stayedStrong: boolean) => {
    try {
      const result = await handleMissedDays.mutateAsync({ stayedStrong, missedDays });
      if (!stayedStrong && result.quote) {
        setQuote(result.quote);
      } else {
        onClose();
      }
    } catch (error) {
      console.error('Failed to handle missed days:', error);
    }
  };

  if (quote) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="card max-w-md w-full">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Every day is a new beginning
          </h3>
          <p className="text-gray-600 text-center italic mb-6">"{quote}"</p>
          <button onClick={onClose} className="w-full btn btn-primary">
            Start Fresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="card max-w-md w-full">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
          Welcome Back
        </h3>
        <p className="text-gray-600 text-center mb-6">
          You were away for {missedDays} day{missedDays > 1 ? 's' : ''}.<br />
          Did you stay strong during that time?
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => handleResponse(true)}
            disabled={handleMissedDays.isPending}
            className="flex-1 btn btn-primary py-3"
          >
            Yes, I did!
          </button>
          <button
            onClick={() => handleResponse(false)}
            disabled={handleMissedDays.isPending}
            className="flex-1 btn btn-secondary py-3"
          >
            No, I slipped
          </button>
        </div>
      </div>
    </div>
  );
}

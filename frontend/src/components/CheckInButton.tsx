import { useState } from 'react';
import { useCheckIn } from '../hooks/useApi';

interface CheckInButtonProps {
  checkedInToday: boolean;
  onComplete?: (completed: boolean) => void;
  onCheckInSuccess?: (currentStreak: number) => void;
}

export function CheckInButton({ checkedInToday, onComplete, onCheckInSuccess }: CheckInButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const checkIn = useCheckIn();

  const handleCheckIn = async () => {
    try {
      const result = await checkIn.mutateAsync();
      setShowConfirm(false);
      onCheckInSuccess?.(result.currentStreak);
      if (result.completed) {
        onComplete?.(true);
      }
    } catch (error) {
      console.error('Check-in failed:', error);
    }
  };

  if (checkedInToday) {
    return (
      <div className="card bg-primary-50 border-primary-200">
        <div className="text-center">
          <div className="text-4xl mb-2">✓</div>
          <h3 className="text-lg font-semibold text-primary-700">You checked in today!</h3>
          <p className="text-primary-600">Keep going strong. See you tomorrow.</p>
        </div>
      </div>
    );
  }

  if (showConfirm) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Are you still going strong?
        </h3>
        <div className="flex gap-4">
          <button
            onClick={handleCheckIn}
            disabled={checkIn.isPending}
            className="flex-1 btn btn-primary py-3"
          >
            {checkIn.isPending ? 'Checking in...' : 'Yes, I am!'}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="flex-1 btn btn-secondary py-3"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Daily Check-In
      </h3>
      <button
        onClick={() => setShowConfirm(true)}
        className="w-full btn btn-primary py-4 text-lg"
      >
        I'm Still Going Strong
      </button>
    </div>
  );
}

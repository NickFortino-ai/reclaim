import { useState } from 'react';

interface AgeGateProps {
  onVerified: (timestamp: string) => void;
}

export function AgeGate({ onVerified }: AgeGateProps) {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    onVerified(new Date().toISOString());
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="card max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Age Verification</h2>
        <p className="text-gray-600 mb-6">
          Reclaim contains content related to adult recovery topics. You must be 18 years or older to use this app.
        </p>

        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer mb-6">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-gray-800 text-left">
            I confirm that I am 18 years of age or older.
          </span>
        </label>

        <button
          onClick={handleConfirm}
          disabled={!confirmed}
          className="w-full btn btn-primary py-3 disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

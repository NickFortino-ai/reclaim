import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCompleteLifetime } from '../hooks/useApi';

export function LifetimeSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const completeLifetime = useCompleteLifetime();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (sessionId && !completed) {
      completeLifetime.mutate(sessionId, {
        onSuccess: () => setCompleted(true),
      });
    }
  }, [sessionId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (completeLifetime.isPending) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (completeLifetime.isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-8">
        <div className="max-w-md w-full px-4 text-center">
          <div className="card">
            <p className="text-red-600 mb-4">Something went wrong completing your lifetime membership.</p>
            <Link to="/celebration" className="btn btn-primary">
              Back to Celebration
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-8">
      <div className="max-w-lg w-full space-y-6 px-4">
        <div className="card text-center">
          <div className="text-6xl mb-6">🏆</div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to the Hall of Fame
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            You're now a lifetime member of Reclaim. Your legacy lives on.
          </p>

          <div className="bg-amber-50 rounded-lg p-6 mb-6">
            <p className="text-amber-800 font-medium">
              Your name will appear in the Hall of Fame — inspiring every warrior
              who comes after you.
            </p>
          </div>

          <div className="space-y-4">
            <Link to="/dashboard" className="block btn btn-primary py-3">
              Go to Dashboard
            </Link>
            <Link to="/community" className="block btn btn-outline py-3">
              View the Hall of Fame
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserData } from '../hooks/useApi';
import { StreakDisplay } from '../components/StreakDisplay';
import { CheckInButton } from '../components/CheckInButton';
import { MissedDaysModal } from '../components/MissedDaysModal';
import { ResetButton } from '../components/ResetButton';

export function Dashboard() {
  const { data, isLoading, error } = useUserData();
  const [showMissedDays, setShowMissedDays] = useState(true);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load dashboard. Please try again.</p>
      </div>
    );
  }

  const handleComplete = (completed: boolean) => {
    if (completed) {
      navigate('/celebration');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {data.needsMissedDaysCheck && showMissedDays && (
        <MissedDaysModal
          missedDays={data.missedDays}
          onClose={() => setShowMissedDays(false)}
        />
      )}

      <StreakDisplay
        currentStreak={data.user.currentStreak}
        totalDaysWon={data.user.totalDaysWon}
      />

      <CheckInButton
        checkedInToday={data.checkedInToday}
        onComplete={handleComplete}
      />

      <div className="text-center">
        <ResetButton />
      </div>

      {data.affirmation && (
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Day {data.dayNum} Affirmation
          </h3>
          <p className="text-lg text-gray-900 italic">"{data.affirmation}"</p>
        </div>
      )}

      {data.user.supportReceivedToday > 0 && (
        <div className="card bg-green-50 border border-green-200">
          <div className="flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {Array.from({ length: Math.min(data.user.supportReceivedToday, 5) }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-green-500 border-2 border-green-50 flex items-center justify-center"
                >
                  <span className="text-white text-xs">♥</span>
                </div>
              ))}
              {data.user.supportReceivedToday > 5 && (
                <div className="w-8 h-8 rounded-full bg-green-600 border-2 border-green-50 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">+{data.user.supportReceivedToday - 5}</span>
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="text-green-800 font-semibold">
                {data.user.supportReceivedToday} Brother{data.user.supportReceivedToday > 1 ? 's' : ''} Supporting You
              </p>
              <p className="text-green-600 text-sm">You're not fighting alone today</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Access Tools */}
      <div className="grid grid-cols-3 gap-4">
        <Link to="/desensitize" className="card hover:shadow-md transition-shadow">
          <div className="text-center">
            <div className="text-3xl mb-2">🛡️</div>
            <h3 className="font-semibold text-gray-900">Desensitization</h3>
            <p className="text-sm text-gray-600 mt-1">Build resistance through controlled exposure</p>
          </div>
        </Link>
        <Link to="/resources" className="card hover:shadow-md transition-shadow">
          <div className="text-center">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="font-semibold text-gray-900">Resources</h3>
            <p className="text-sm text-gray-600 mt-1">Studies, science, and community wisdom</p>
          </div>
        </Link>
        <Link to="/community" className="card hover:shadow-md transition-shadow">
          <div className="text-center">
            <div className="text-3xl mb-2">👊</div>
            <h3 className="font-semibold text-gray-900">Community</h3>
            <p className="text-sm text-gray-600 mt-1">Brotherhood leaderboard and support</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

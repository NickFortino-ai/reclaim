import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserData, useHandleMissedDays } from '../hooks/useApi';
import { StreakDisplay } from '../components/StreakDisplay';
import { CheckInButton } from '../components/CheckInButton';
import { MissedDaysModal } from '../components/MissedDaysModal';
import { ResetButton } from '../components/ResetButton';
import { StrugglingFlow } from '../components/StrugglingFlow';
import { PartnerCard } from '../components/PartnerCard';

const MILESTONES: Record<number, { title: string; message: string }> = {
  7: { title: '1 Week Strong', message: 'You\'ve made it a full week. The first week is the hardest — you proved you can do this.' },
  30: { title: '30 Days — One Month', message: 'A full month of freedom. Your brain is already rewiring. The old patterns are losing their grip.' },
  60: { title: '60 Days — Two Months', message: 'Two months in. You\'re building something real. The man you\'re becoming would thank you.' },
  90: { title: '90 Days — The Reboot', message: 'The legendary 90-day mark. Neuroplasticity research shows real neural pathway changes by now. You\'re a different man.' },
  180: { title: '180 Days — Half Year', message: 'Six months of discipline and freedom. You\'ve proven this isn\'t a phase — it\'s who you are.' },
  365: { title: '365 Days — You Made It', message: 'One full year. You\'ve reclaimed your life. You are free.' },
};

export function Dashboard() {
  const { data, isLoading, error } = useUserData();
  const handleMissedDays = useHandleMissedDays();
  const [showMissedDays, setShowMissedDays] = useState(true);
  const [milestone, setMilestone] = useState<{ title: string; message: string } | null>(null);
  const [showStrugglingFlow, setShowStrugglingFlow] = useState(false);
  const navigate = useNavigate();

  // Auto-handle missed days for lifetime members (skip the modal)
  useEffect(() => {
    if (data?.user.lifetimeAccess && data.needsMissedDaysCheck && data.missedDays > 0) {
      handleMissedDays.mutate({ stayedStrong: true, missedDays: data.missedDays });
    }
  }, [data?.user.lifetimeAccess, data?.needsMissedDaysCheck]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleCheckInSuccess = (currentStreak: number) => {
    const m = MILESTONES[currentStreak];
    if (m) {
      setMilestone(m);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {showStrugglingFlow && (
        <StrugglingFlow onClose={() => setShowStrugglingFlow(false)} />
      )}

      {data.needsMissedDaysCheck && showMissedDays && !data.user.lifetimeAccess && (
        <MissedDaysModal
          missedDays={data.missedDays}
          onClose={() => setShowMissedDays(false)}
        />
      )}

      {data.gracePeriodDaysRemaining !== null && data.gracePeriodDaysRemaining > 0 && (
        <div className="card bg-amber-50 border border-amber-200">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🏆</div>
            <div className="flex-1">
              <p className="font-semibold text-amber-800">
                You've completed the 365-day challenge!
              </p>
              <p className="text-sm text-amber-700">
                {data.gracePeriodDaysRemaining} day{data.gracePeriodDaysRemaining !== 1 ? 's' : ''} remaining to claim lifetime access.
              </p>
            </div>
            <Link to="/celebration" className="btn bg-amber-600 hover:bg-amber-700 text-white text-sm px-4">
              Claim
            </Link>
          </div>
        </div>
      )}

      {data.user.displayName && (
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          {data.user.displayName}
        </h1>
      )}

      {data.affirmation && (
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Streak Day {data.dayNum} Affirmation
          </h3>
          <p className="text-lg text-gray-900 italic">"{data.affirmation}"</p>
        </div>
      )}

      <StreakDisplay
        currentStreak={data.user.currentStreak}
        totalDaysWon={data.user.totalDaysWon}
        recoveryScore={data.recoveryScore}
      />

      {data.partnerInfo && (
        <PartnerCard
          partner={data.partnerInfo}
          unreadCount={data.unreadPartnerMessages}
        />
      )}

      <CheckInButton
        checkedInToday={data.checkedInToday}
        onComplete={handleComplete}
        onCheckInSuccess={handleCheckInSuccess}
      />

      <div className="text-center">
        <ResetButton />
      </div>

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

      {/* I'm Struggling Button */}
      <button
        onClick={() => setShowStrugglingFlow(true)}
        className="w-full card bg-blue-50 border-2 border-blue-300 hover:bg-blue-100 hover:border-blue-400 transition-colors"
      >
        <div className="flex items-center justify-center gap-3 py-1">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="font-semibold text-blue-700 text-lg">I'm Struggling Right Now</span>
        </div>
      </button>

      {/* Quick Access Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/urge-surf" className="card hover:shadow-md transition-shadow">
          <div className="text-center">
            <div className="text-3xl mb-2">🌊</div>
            <h3 className="font-semibold text-gray-900">Urge Surf</h3>
            <p className="text-sm text-gray-600 mt-1">Breathing exercise to ride out urges</p>
          </div>
        </Link>
        <Link to="/journal" className="card hover:shadow-md transition-shadow">
          <div className="text-center">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="font-semibold text-gray-900">Journal</h3>
            <p className="text-sm text-gray-600 mt-1">Track your thoughts and victories</p>
          </div>
        </Link>
        <Link to="/patterns" className="card hover:shadow-md transition-shadow">
          <div className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">My Patterns</h3>
            <p className="text-sm text-gray-600 mt-1">Insights from your behavioral data</p>
          </div>
        </Link>
      </div>

      {/* Milestone Celebration Modal */}
      {milestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-5 sm:p-8 text-center">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{milestone.title}</h2>
            <p className="text-gray-600 mb-6">{milestone.message}</p>
            <button
              onClick={() => setMilestone(null)}
              className="btn btn-primary px-8 py-3"
            >
              Keep Going
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

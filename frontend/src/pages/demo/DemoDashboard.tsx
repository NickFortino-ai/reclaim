import { Link } from 'react-router-dom';
import { LockedOverlay, LockedFeatureButton } from '../../components/LockedOverlay';

export function DemoDashboard() {
  const currentStreak = 7;
  const totalDaysWon = 42;
  const progress = Math.min((currentStreak / 365) * 100, 100);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Demo Display Name */}
      <h1 className="text-2xl font-bold text-gray-900 text-center">
        Shadow Phoenix
      </h1>

      {/* Demo Affirmation */}
      <div className="card">
        <h3 className="text-sm font-medium text-gray-500 mb-2">
          Streak Day 7 Affirmation
        </h3>
        <p className="text-lg text-gray-900 italic">
          "Every day you resist, you become stronger. The urge is a test—pass it, and you level up."
        </p>
      </div>

      {/* Demo Streak Display — matches real StreakDisplay component */}
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
            <span className="font-medium text-primary-600">{currentStreak}/365 days</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 text-center">
            {365 - currentStreak} more streak days — subscription auto-cancels at 365-day streak
          </p>
        </div>
      </div>

      {/* Locked Check-In Button — matches real CheckInButton component */}
      <LockedOverlay message="Sign up to check in">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Daily Check-In
          </h3>
          <button
            disabled
            className="w-full btn btn-primary py-4 text-lg"
          >
            I'm Still Going Strong
          </button>
        </div>
      </LockedOverlay>

      {/* Demo Reset Button — matches real ResetButton */}
      <div className="text-center">
        <span className="text-sm text-gray-500 underline">
          I need to reset my streak
        </span>
      </div>

      {/* Demo Support Notification */}
      <div className="card bg-green-50 border border-green-200">
        <div className="flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-green-500 border-2 border-green-50 flex items-center justify-center"
              >
                <span className="text-white text-xs">♥</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-green-800 font-semibold">
              3 Brothers Supporting You
            </p>
            <p className="text-green-600 text-sm">You're not fighting alone today</p>
          </div>
        </div>
      </div>

      {/* Quick Access Tools - Row 1: 3 boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <LockedFeatureButton>
          <div className="card hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="font-semibold text-gray-900">Desensitization</h3>
              <p className="text-sm text-gray-600 mt-1">Resensitize to real attraction</p>
            </div>
          </div>
        </LockedFeatureButton>
        <Link to="/demo/resources" className="card hover:shadow-md transition-shadow">
          <div className="text-center">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="font-semibold text-gray-900">Resources</h3>
            <p className="text-sm text-gray-600 mt-1">Studies, science, and community wisdom</p>
          </div>
        </Link>
        <Link to="/demo/community" className="card hover:shadow-md transition-shadow">
          <div className="text-center">
            <div className="text-3xl mb-2">👊</div>
            <h3 className="font-semibold text-gray-900">Community</h3>
            <p className="text-sm text-gray-600 mt-1">Brotherhood leaderboard and support</p>
          </div>
        </Link>
      </div>

      {/* Quick Access Tools - Row 2: 3 boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/demo/urge-surf" className="card hover:shadow-md transition-shadow">
          <div className="text-center">
            <div className="text-3xl mb-2">🌊</div>
            <h3 className="font-semibold text-gray-900">Urge Surf</h3>
            <p className="text-sm text-gray-600 mt-1">Breathing exercise to ride out urges</p>
          </div>
        </Link>
        <Link to="/demo/journal" className="card hover:shadow-md transition-shadow">
          <div className="text-center">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="font-semibold text-gray-900">Journal</h3>
            <p className="text-sm text-gray-600 mt-1">Track your thoughts and victories</p>
          </div>
        </Link>
        <Link to="/demo/patterns" className="card hover:shadow-md transition-shadow">
          <div className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Patterns</h3>
            <p className="text-sm text-gray-600 mt-1">Insights from your recovery data</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

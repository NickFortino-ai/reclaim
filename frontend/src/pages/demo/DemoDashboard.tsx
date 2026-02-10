import { Link } from 'react-router-dom';
import { LockedOverlay, LockedFeatureButton } from '../../components/LockedOverlay';

export function DemoDashboard() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Demo Display Name */}
      <h1 className="text-2xl font-bold text-gray-900 text-center">
        Shadow Phoenix
      </h1>

      {/* Demo Affirmation */}
      <div className="card">
        <h3 className="text-sm font-medium text-gray-500 mb-2">
          Day 7 Affirmation
        </h3>
        <p className="text-lg text-gray-900 italic">
          "Every day you resist, you become stronger. The urge is a test—pass it, and you level up."
        </p>
      </div>

      {/* Demo Streak Display */}
      <div className="card text-center">
        <div className="mb-4">
          <div className="text-6xl font-bold text-primary-600">7</div>
          <div className="text-gray-600 mt-1">Day Streak</div>
        </div>
        <div className="flex justify-center gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">42</div>
            <div className="text-sm text-gray-500">Total Days Won</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">323</div>
            <div className="text-sm text-gray-500">Days to Go</div>
          </div>
        </div>
      </div>

      {/* Locked Check-In Button */}
      <LockedOverlay message="Sign up to check in">
        <div className="card">
          <button
            disabled
            className="w-full py-4 bg-primary-600 text-white font-bold rounded-lg text-lg"
          >
            Check In for Day 8
          </button>
        </div>
      </LockedOverlay>

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
              <p className="text-sm text-gray-600 mt-1">Build resistance through controlled exposure</p>
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

      {/* Quick Access Tools - Row 2: 2 boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/demo/urge-surf" className="card hover:shadow-md transition-shadow">
          <div className="text-center">
            <div className="text-3xl mb-2">🌊</div>
            <h3 className="font-semibold text-gray-900">Urge Surf</h3>
            <p className="text-sm text-gray-600 mt-1">Breathing exercise to ride out urges</p>
          </div>
        </Link>
        <LockedFeatureButton>
          <div className="card hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="text-3xl mb-2">📝</div>
              <h3 className="font-semibold text-gray-900">Journal</h3>
              <p className="text-sm text-gray-600 mt-1">Track your thoughts and victories</p>
            </div>
          </div>
        </LockedFeatureButton>
      </div>
    </div>
  );
}

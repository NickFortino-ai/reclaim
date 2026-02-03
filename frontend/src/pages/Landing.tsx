import { Link } from 'react-router-dom';

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Reclaim Your Life
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A private, anonymous platform for men committed to breaking free from porn addiction.
            365 days to freedom.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold mb-2">365-Day Goal</h3>
            <p className="text-gray-600 text-sm">
              Track your progress toward a full year of freedom. Automatic cancellation when you reach your goal.
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-lg font-semibold mb-2">Anonymous Community</h3>
            <p className="text-gray-600 text-sm">
              See others on the same journey. Send and receive support without revealing your identity.
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-lg font-semibold mb-2">Daily Accountability</h3>
            <p className="text-gray-600 text-sm">
              Check in daily, receive affirmations, and build the habits that lead to lasting change.
            </p>
          </div>
        </div>

        <div className="card max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-primary-600">$0.69/week</div>
            <p className="text-gray-600">Billed monthly • First day free • Cancel anytime</p>
          </div>

          <div className="space-y-4">
            <Link to="/register" className="block w-full btn btn-primary py-3 text-center text-lg">
              Start Your Journey
            </Link>
            <Link to="/login" className="block w-full btn btn-outline py-3 text-center">
              I have an access code
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6 text-left max-w-3xl mx-auto">
            <div>
              <div className="text-primary-600 font-bold mb-1">1. Subscribe</div>
              <p className="text-sm text-gray-600">Quick, secure payment. Your first day is free.</p>
            </div>
            <div>
              <div className="text-primary-600 font-bold mb-1">2. Get Your Code</div>
              <p className="text-sm text-gray-600">Receive a unique access code. Save it securely.</p>
            </div>
            <div>
              <div className="text-primary-600 font-bold mb-1">3. Check In Daily</div>
              <p className="text-sm text-gray-600">Confirm you're staying strong. Build your streak.</p>
            </div>
            <div>
              <div className="text-primary-600 font-bold mb-1">4. Reach 365</div>
              <p className="text-sm text-gray-600">Complete your journey. Subscription auto-cancels.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

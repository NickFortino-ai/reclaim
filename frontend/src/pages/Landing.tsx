import { Link, useNavigate } from 'react-router-dom';
import { usePreview } from '../context/PreviewContext';

export function Landing() {
  const navigate = useNavigate();
  const { startDemo } = usePreview();

  const handleTryDemo = () => {
    startDemo();
    navigate('/demo/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-5xl mx-auto px-4 pt-20 pb-24 relative">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <span className="inline-block text-slate-400 text-sm font-semibold tracking-widest uppercase">
              The 365-Day System
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6 leading-tight">
            Reclaim Your Manhood<br />
            <span className="text-blue-400">in 365 Days</span>
          </h1>

          <p className="text-xl text-slate-300 text-center max-w-2xl mx-auto mb-12">
            A private, no-BS accountability system for men ready to break free from porn addiction.
            Track your progress. Join the brotherhood. Become who you were meant to be.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-start mb-16">
            <button
              onClick={handleTryDemo}
              className="w-full sm:w-auto px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all border border-slate-600 hover:border-slate-500"
            >
              Try Demo
            </button>
            <div className="flex flex-col items-center">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 text-center"
              >
                Start Your Journey — $0.69/week
              </Link>
              <span className="text-slate-400 text-sm mt-2">Billed monthly</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              100% Anonymous
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Cancel Anytime
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Auto-Cancel at 365
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Everything You Need to Win
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Built by men who've been there. Simple tools that actually work.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Daily Accountability */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Daily Accountability</h3>
              <p className="text-slate-400">
                One check-in per day. Build your streak. Watch the days stack up. Simple, consistent, powerful.
              </p>
            </div>

            {/* Community Support */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Brotherhood Support</h3>
              <p className="text-slate-400">
                You're not alone. See the leaderboard. Send encouragement. Get support from men on the same mission.
              </p>
            </div>

            {/* Proven System */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Science-Backed Resources</h3>
              <p className="text-slate-400">
                Studies, strategies, and hard-won wisdom. Understand the science. Apply what works.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                1
              </div>
              <h3 className="text-white font-semibold mb-2">Subscribe</h3>
              <p className="text-slate-400 text-sm">
                Quick secure payment. First day free to try.
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                2
              </div>
              <h3 className="text-white font-semibold mb-2">Get Your Code</h3>
              <p className="text-slate-400 text-sm">
                Receive your unique 8-character access code. No email required.
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                3
              </div>
              <h3 className="text-white font-semibold mb-2">Check In Daily</h3>
              <p className="text-slate-400 text-sm">
                Confirm you stayed strong. Build your streak.
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                4
              </div>
              <h3 className="text-white font-semibold mb-2">Reach 365</h3>
              <p className="text-slate-400 text-sm">
                Complete your year. Subscription auto-cancels. You're free.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing CTA */}
      <div className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
            <div className="text-4xl font-bold text-white mb-2">$0.69<span className="text-xl text-slate-400">/week</span></div>
            <p className="text-slate-400 mb-6">Billed monthly • First day free</p>

            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center gap-3 text-slate-300">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Daily check-ins & streak tracking
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Anonymous community leaderboard
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Daily affirmations & resources
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Desensitization training tool
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Auto-cancel at 365 days
              </li>
            </ul>

            <div className="space-y-3">
              <Link
                to="/register"
                className="block w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all"
              >
                Start Your Journey
              </Link>
              <button
                onClick={handleTryDemo}
                className="block w-full py-3 text-slate-400 hover:text-white transition-colors"
              >
                or try the demo first
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            Already have an access code?{' '}
            <Link to="/login" className="text-slate-400 hover:text-white">
              Login here
            </Link>
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/faq" className="text-slate-400 hover:text-white">
              FAQ
            </Link>
            <Link to="/privacy" className="text-slate-400 hover:text-white">
              Privacy
            </Link>
            <Link to="/terms" className="text-slate-400 hover:text-white">
              Terms
            </Link>
            <span className="text-slate-600">Reclaim — Built for men, by men.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

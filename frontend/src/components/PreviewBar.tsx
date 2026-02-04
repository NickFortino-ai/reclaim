import { Link } from 'react-router-dom';
import { usePreview } from '../context/PreviewContext';

export function PreviewBar() {
  const { isDemo, formattedTime, timeRemaining } = usePreview();

  if (!isDemo) return null;

  const isLowTime = timeRemaining < 60;

  return (
    <>
      {/* Timer Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 ${isLowTime ? 'bg-red-600' : 'bg-blue-600'}`}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 ${isLowTime ? 'animate-pulse' : ''}`}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white font-semibold">
                {formattedTime} remaining in demo
              </span>
            </div>
          </div>
          <Link
            to="/register"
            className="px-4 py-1.5 bg-white text-blue-600 font-semibold rounded-lg text-sm hover:bg-gray-100 transition-colors"
          >
            Start Your Journey
          </Link>
        </div>
      </div>

      {/* Spacer to prevent content from going under the bar */}
      <div className="h-12" />

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700 p-4 sm:hidden">
        <Link
          to="/register"
          className="block w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-center transition-colors"
        >
          Start Your Journey — $0.69/week
        </Link>
      </div>
    </>
  );
}

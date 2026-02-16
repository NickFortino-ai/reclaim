import { Link } from 'react-router-dom';
import { usePreview } from '../context/PreviewContext';

export function PreviewBar() {
  const { isDemo } = usePreview();

  if (!isDemo) return null;

  return (
    <>
      {/* Top bar - desktop */}
      <div className="hidden sm:block fixed top-0 left-0 right-0 z-50 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <span className="text-sm text-slate-300">
            You're exploring the demo — see what Reclaim can do for you.
          </span>
          <Link
            to="/register"
            className="px-5 py-1.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-lg text-sm transition-colors"
          >
            Start Your Journey — $0.69/week
          </Link>
        </div>
      </div>
      <div className="hidden sm:block h-11" />

      {/* Bottom bar - mobile (above bottom nav) */}
      <div className="sm:hidden fixed bottom-14 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700 p-3">
        <Link
          to="/register"
          className="block w-full py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-lg text-center transition-colors"
        >
          Start Your Journey — $0.69/week
        </Link>
      </div>
    </>
  );
}

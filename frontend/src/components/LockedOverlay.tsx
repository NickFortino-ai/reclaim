import { Link, useNavigate } from 'react-router-dom';
import { usePreview } from '../context/PreviewContext';
import { ReactNode } from 'react';

interface LockedOverlayProps {
  children: ReactNode;
  message?: string;
  blur?: boolean;
}

export function LockedOverlay({ children, message = 'Sign up to unlock', blur = true }: LockedOverlayProps) {
  const { isDemo } = usePreview();

  if (!isDemo) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className={blur ? 'filter blur-sm pointer-events-none select-none' : 'pointer-events-none select-none'}>
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 rounded-xl">
        <div className="text-center p-6">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-white font-semibold mb-3">{message}</p>
          <Link
            to="/register"
            className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors text-sm"
          >
            Unlock Full Access
          </Link>
        </div>
      </div>
    </div>
  );
}

interface LockedFeatureButtonProps {
  children: ReactNode;
  className?: string;
}

export function LockedFeatureButton({ children, className = '' }: LockedFeatureButtonProps) {
  const { isDemo } = usePreview();
  const navigate = useNavigate();

  const handleClick = () => {
    if (isDemo) {
      navigate('/register', { state: { fromDemo: true, featureLocked: true } });
    }
  };

  if (!isDemo) {
    return <>{children}</>;
  }

  return (
    <button
      onClick={handleClick}
      className={`relative ${className}`}
    >
      <div className="filter blur-[2px] pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 rounded-lg">
        <span className="bg-slate-800 px-3 py-1 rounded-full text-xs text-slate-300 font-medium flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Locked
        </span>
      </div>
    </button>
  );
}

import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePreview } from '../context/PreviewContext';
import { PreviewBar } from './PreviewBar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, isAdmin, logout } = useAuth();
  const { isDemo, endDemo } = usePreview();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleExitDemo = () => {
    endDemo();
    navigate('/');
  };

  // Demo mode layout
  if (isDemo && location.pathname.startsWith('/demo')) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PreviewBar />
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/demo/dashboard" className="text-xl font-bold text-primary-600">
                  Reclaim
                </Link>
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  DEMO
                </span>
                <div className="ml-8 flex space-x-4">
                  <NavLink to="/demo/dashboard" current={location.pathname === '/demo/dashboard'}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/demo/resources" current={location.pathname === '/demo/resources'}>
                    Resources
                  </NavLink>
                  <NavLink to="/demo/community" current={location.pathname === '/demo/community'}>
                    Community
                  </NavLink>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleExitDemo} className="btn btn-secondary text-sm">
                  Exit Demo
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 sm:pb-8">
          {children}
        </main>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/admin" className="text-xl font-bold text-primary-600">
                  Reclaim Admin
                </Link>
                <div className="ml-10 flex space-x-4">
                  <NavLink to="/admin" current={location.pathname === '/admin'}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/admin/affirmations" current={location.pathname === '/admin/affirmations'}>
                    Affirmations
                  </NavLink>
                  <NavLink to="/admin/images" current={location.pathname === '/admin/images'}>
                    Images
                  </NavLink>
                </div>
              </div>
              <div className="flex items-center">
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/dashboard" className="text-xl font-bold text-primary-600">
                  Reclaim
                </Link>
                <div className="ml-10 flex space-x-4">
                  <NavLink to="/dashboard" current={location.pathname === '/dashboard'}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/desensitize" current={location.pathname === '/desensitize'}>
                    Desensitize
                  </NavLink>
                  <NavLink to="/resources" current={location.pathname === '/resources'}>
                    Resources
                  </NavLink>
                  <NavLink to="/community" current={location.pathname === '/community'}>
                    Community
                  </NavLink>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 hidden sm:block">
                  Day {user.totalDaysWon + 1} of 365
                </span>
                <Link
                  to="/settings"
                  className={`p-2 rounded-lg transition-colors ${
                    location.pathname === '/settings'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  title="Settings"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </Link>
                <button onClick={handleLogout} className="btn btn-secondary text-sm">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    );
  }

  return <>{children}</>;
}

function NavLink({ to, current, children }: { to: string; current: boolean; children: ReactNode }) {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        current
          ? 'bg-primary-100 text-primary-700'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
}

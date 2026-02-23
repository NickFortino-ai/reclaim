import { ReactNode, useState, useRef, useEffect } from 'react';
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

  // Full-screen immersive pages — no layout chrome
  if (location.pathname === '/onboarding' || location.pathname === '/demo/onboarding') {
    return <>{children}</>;
  }

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
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <PreviewBar />
        {/* Desktop nav */}
        <nav className="hidden sm:block bg-white shadow-sm border-b border-gray-200">
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
                  <NavLink to="/demo/urge-surf" current={location.pathname === '/demo/urge-surf'}>
                    Urge Surf
                  </NavLink>
                  <NavLink to="/demo/journal" current={location.pathname === '/demo/journal'}>
                    Journal
                  </NavLink>
                  <NavLink to="/demo/patterns" current={location.pathname === '/demo/patterns'}>
                    Patterns
                  </NavLink>
                  <NavLink to="/demo/intimacy" current={location.pathname === '/demo/intimacy'}>
                    Intimacy
                  </NavLink>
                  <NavLink to="/demo/faq" current={location.pathname === '/demo/faq'}>
                    FAQ
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
        {/* Mobile top bar */}
        <nav className="sm:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/demo/dashboard" className="text-lg font-bold text-primary-600">
                Reclaim
              </Link>
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                DEMO
              </span>
            </div>
            <button onClick={handleExitDemo} className="text-sm text-gray-600 font-medium">
              Exit
            </button>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-36 sm:pb-8">
          {children}
        </main>
        <Footer />
        {/* Mobile bottom nav */}
        <DemoMobileBottomNav currentPath={location.pathname} />
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
                  <NavLink to="/admin/resources" current={location.pathname === '/admin/resources'}>
                    Resources
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
        <Footer />
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Desktop nav */}
        <nav className="hidden sm:block bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/dashboard" className="text-xl font-bold text-primary-600">
                  Reclaim
                </Link>
                <div className="ml-10 flex space-x-4">
                  <NavLink to="/dashboard" current={location.pathname === '/dashboard'}>
                    Home
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
                  <NavLink to="/urge-surf" current={location.pathname === '/urge-surf'}>
                    Urge Surf
                  </NavLink>
                  <NavLink to="/journal" current={location.pathname === '/journal'}>
                    Journal
                  </NavLink>
                  <NavLink to="/patterns" current={location.pathname === '/patterns'}>
                    Patterns
                  </NavLink>
                  <NavLink to="/intimacy" current={location.pathname === '/intimacy'}>
                    Intimacy
                  </NavLink>
                </div>
              </div>
              <div className="flex items-center">
                <HamburgerMenu onLogout={handleLogout} />
              </div>
            </div>
          </div>
        </nav>
        {/* Mobile top bar */}
        <nav className="sm:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="px-4 py-3 flex items-center justify-between">
            <Link to="/dashboard" className="text-lg font-bold text-primary-600">
              Reclaim
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Day {user.currentStreak}
              </span>
              <HamburgerMenu onLogout={handleLogout} />
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 sm:pb-8">
          {children}
        </main>
        <Footer />
        {/* Mobile bottom nav */}
        <MobileBottomNav currentPath={location.pathname} />
      </div>
    );
  }

  return <>{children}</>;
}

function HamburgerMenu({ onLogout }: { onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleShare = async () => {
    const shareData = {
      title: 'Reclaim - 365 Days to Freedom',
      text: 'A private accountability platform for men committed to breaking free.',
      url: 'https://reclaim365.app/',
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(shareData.url);
    }
    setOpen(false);
  };

  const itemClass = 'w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors';

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
          <Link to="/settings" onClick={() => setOpen(false)} className={itemClass}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Link>
          <button onClick={handleShare} className={itemClass}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share Reclaim
          </button>
          <Link to="/faq" onClick={() => setOpen(false)} className={itemClass}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            FAQ
          </Link>
          <div className="border-t border-gray-100 my-1" />
          <button onClick={() => { onLogout(); setOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      )}
    </div>
  );
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

function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-xs text-gray-400">
        <span>Reclaim 365</span>
        <div className="flex items-center gap-4">
          <Link to="/privacy" className="hover:text-gray-600">Privacy</Link>
          <Link to="/terms" className="hover:text-gray-600">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

function DemoMobileBottomNav({ currentPath }: { currentPath: string }) {
  const items = [
    {
      to: '/demo/dashboard',
      label: 'Home',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      to: '/demo/community',
      label: 'Community',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      to: '/demo/patterns',
      label: 'Patterns',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      to: '/demo/journal',
      label: 'Journal',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around">
        {items.map((item) => {
          const active = currentPath === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center py-2.5 px-1 min-w-0 flex-1 ${
                active ? 'text-primary-600' : 'text-gray-400'
              }`}
            >
              {item.icon}
              <span className="text-[11px] mt-0.5 truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function MobileBottomNav({ currentPath }: { currentPath: string }) {
  const items = [
    {
      to: '/dashboard',
      label: 'Home',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      to: '/community',
      label: 'Community',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      to: '/patterns',
      label: 'Patterns',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      to: '/urge-surf',
      label: 'Urge Surf',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      to: '/journal',
      label: 'Journal',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around">
        {items.map((item) => {
          const active = currentPath === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center py-2.5 px-1 min-w-0 flex-1 ${
                active ? 'text-primary-600' : 'text-gray-400'
              }`}
            >
              {item.icon}
              <span className="text-[11px] mt-0.5 truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

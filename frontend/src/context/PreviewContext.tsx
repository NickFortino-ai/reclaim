import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const DEMO_DURATION_MS = 5 * 60 * 1000; // 5 minutes
const STORAGE_KEY = 'reclaim_demo';

interface DemoState {
  startedAt: number;
  expiresAt: number;
}

interface PreviewContextType {
  isDemo: boolean;
  timeRemaining: number; // seconds
  formattedTime: string;
  startDemo: () => void;
  endDemo: () => void;
  isExpired: boolean;
}

const PreviewContext = createContext<PreviewContextType | null>(null);

export function PreviewProvider({ children }: { children: ReactNode }) {
  const [demoState, setDemoState] = useState<DemoState | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as DemoState;
        // Check if still valid
        if (parsed.expiresAt > Date.now()) {
          return parsed;
        }
        // Expired, clear it
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    return null;
  });

  const [timeRemaining, setTimeRemaining] = useState(0);
  const navigate = useNavigate();

  const isDemo = demoState !== null;
  const isExpired = isDemo && demoState.expiresAt <= Date.now();

  // Calculate time remaining
  useEffect(() => {
    if (!demoState) {
      setTimeRemaining(0);
      return;
    }

    const updateTime = () => {
      const remaining = Math.max(0, Math.floor((demoState.expiresAt - Date.now()) / 1000));
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        // Demo expired
        localStorage.removeItem(STORAGE_KEY);
        navigate('/register', { state: { fromDemo: true } });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [demoState, navigate]);

  const startDemo = useCallback(() => {
    const now = Date.now();
    const state: DemoState = {
      startedAt: now,
      expiresAt: now + DEMO_DURATION_MS,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setDemoState(state);
  }, []);

  const endDemo = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setDemoState(null);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <PreviewContext.Provider
      value={{
        isDemo,
        timeRemaining,
        formattedTime: formatTime(timeRemaining),
        startDemo,
        endDemo,
        isExpired,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error('usePreview must be used within a PreviewProvider');
  }
  return context;
}

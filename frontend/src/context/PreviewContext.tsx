import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

const STORAGE_KEY = 'reclaim_demo';

interface PreviewContextType {
  isDemo: boolean;
  startDemo: () => void;
  endDemo: () => void;
}

const PreviewContext = createContext<PreviewContextType | null>(null);

export function PreviewProvider({ children }: { children: ReactNode }) {
  const [isDemo, setIsDemo] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === 'active';
  });

  const startDemo = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'active');
    setIsDemo(true);
  }, []);

  const endDemo = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setIsDemo(false);
  }, []);

  return (
    <PreviewContext.Provider value={{ isDemo, startDemo, endDemo }}>
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

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

const THEMES = [
  'slate', 'navy', 'charcoal', 'gunmetal', 'forest', 'olive', 'burgundy', 'leather'
] as const;

export type Theme = typeof THEMES[number];

interface ThemeContextType {
  theme: Theme;
  themes: readonly Theme[];
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { user, updateUser, token } = useAuth();
  const theme = (user?.colorTheme as Theme) || 'slate';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = async (newTheme: Theme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    updateUser({ colorTheme: newTheme });

    if (token) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/user/theme`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ theme: newTheme }),
        });
        if (!response.ok) {
          console.error('Failed to update theme on server');
        }
      } catch (error) {
        console.error('Failed to update theme:', error);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, themes: THEMES, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

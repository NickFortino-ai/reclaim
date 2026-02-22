import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  currentStreak: number;
  totalDaysWon: number;
  desensitizationPoints: number;
  lastCheckIn: string | null;
  colorTheme: string;
  subscriptionStatus: string;
  completedAt: string | null;
  hasCompletedOnboarding: boolean;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAdmin: boolean;
  login: (token: string, user: User) => void;
  adminLogin: (token: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'reclaim_token';
const USER_KEY = 'reclaim_user';
const ADMIN_KEY = 'reclaim_admin';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(() => localStorage.getItem(ADMIN_KEY) === 'true');

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem(ADMIN_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_KEY);
    }
  }, [isAdmin]);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    setIsAdmin(false);
  };

  const adminLogin = (newToken: string) => {
    setToken(newToken);
    setUser(null);
    setIsAdmin(true);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAdmin(false);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isAdmin, login, adminLogin, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

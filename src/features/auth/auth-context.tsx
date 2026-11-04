import { useSQLiteContext } from 'expo-sqlite';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { checkLogin } from '@/db/repositories/users.repository';
import { clearSession, readSession, writeSession } from '@/features/auth/session';

type AuthContextValue = {
  userId: number | null;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const [userId, setUserId] = useState<number | null>(readSession);

  const signIn = useCallback(
    async (username: string, password: string) => {
      const id = await checkLogin(db, username.trim(), password);
      if (id === null) return false;
      writeSession(id);
      setUserId(id);
      return true;
    },
    [db],
  );

  const signOut = useCallback(() => {
    clearSession();
    setUserId(null);
  }, []);

  const value = useMemo(() => ({ userId, signIn, signOut }), [userId, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

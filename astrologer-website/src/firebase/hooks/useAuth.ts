import { useState, useEffect } from 'react';
import { onAuthChange, loginWithEmail, logoutUser } from '../auth';
import type { User } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const result = await loginWithEmail(email, password);
    return result;
  };

  const logout = async () => {
    const result = await logoutUser();
    return result;
  };

  return { user, loading, login, logout };
};

'use client';
import { checkSession } from '@/lib/api/api';
import { useEffect } from 'react';
import { useAuthStore } from '../../lib/store/authStore';
type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setIsAuth = useAuthStore((state) => state.setIsAuthenticated);
  const clearIsAuth = useAuthStore((state) => state.clearIsAuthenticated);
  useEffect(() => {
    const fetchCheckSession = async () => {
      try {
        const isAuthenticated = await checkSession();
          if (isAuthenticated) {
              setIsAuth(true);
          }
          else {
              clearIsAuth();
        }  
      } catch {clearIsAuth();
      }
    };
    fetchCheckSession();
  }, [setIsAuth, clearIsAuth]);

  return children;
};

export default AuthProvider;
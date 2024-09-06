//context/AuthContext
'use client';

import React, { useContext, useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  username: string;
  role: string;
  email: string;
  namaRekening: string;
  nomorRekening: string;
  namaBank: string;
  nohp: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  isLoading: boolean;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session?.user) {
      const userData: User = {
        id: session.user.id as string,
        username: session.user.name || '',
        role: session.user.role as string || 'user',
        email: session.user.email as string,
        namaRekening: (session.user as any).namaRekening as string || '',
        nomorRekening: (session.user as any).nomorRekening as string || '',
        namaBank: (session.user as any).namaBank as string || '',
        nohp: (session.user as any).nohp as string || '',
      };
      setUser(userData);
    }
  }, [session]);

  const login = async (username: string, password: string) => {
    const result = await signIn('credentials', { username, password, redirect: false });
    if (result?.error) {
      throw new Error(result.error);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (data.success) {
        // Update local user state
        setUser(prevUser => ({ ...prevUser, ...data.user }));
        // Update session
        await updateSession(data.user);
        return data.user;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  };

  const loginWithGoogle = () => signIn('google', { callbackUrl: '/dashboard' });

  const logout = () => signOut({ callbackUrl: '/login' });

  const value = {
    user,
    login,
    loginWithGoogle,
    logout,
    updateUser,
    isLoading: status === 'loading',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
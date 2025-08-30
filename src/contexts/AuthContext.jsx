import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('lumina_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('lumina_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = (userData) => {
    if (userData) {
      localStorage.setItem('lumina_user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('lumina_user');
      localStorage.removeItem('lumina_subscription');
      localStorage.removeItem('lumina_conversations');
    }
    setUser(userData);
  };

  const signInWithMagicLink = useCallback(async (email) => {
    toast({ title: "Magic link sent! ✨", description: "Check your email for the login link (mock)" });
    const mockUser = { id: `user_${Date.now()}`, email, isMock: true };
    updateUser(mockUser);
    return { error: null };
  }, [toast]);

  const signUpWithEmail = useCallback(async (email, password, planIdentifier) => {
    toast({ title: 'Account created!', description: 'You can now sign in (mock).' });
    const mockUser = { id: `user_${Date.now()}`, email, isMock: true };
    updateUser(mockUser);
    
    const [planName] = planIdentifier.split('_');
    const expires_at = new Date(new Date().setDate(new Date().getDate() + 14)).toISOString();
    const subscription = {
        plan: planName,
        status: 'trialing',
        expires_at,
        isActive: true
    };
    localStorage.setItem('lumina_subscription', JSON.stringify(subscription));

    return { user: mockUser, error: null };
  }, [toast]);

  const signInWithEmail = useCallback(async (email, password) => {
    toast({ title: 'Signed in successfully!', description: 'Welcome back (mock).' });
    const mockUser = { id: `user_${Date.now()}`, email, isMock: true };
    updateUser(mockUser);
    return { error: null };
  }, [toast]);

  const signOut = useCallback(async () => {
    updateUser(null);
    toast({ title: "Signed out", description: "You have been successfully signed out." });
    return { error: null };
  }, [toast]);

  const value = useMemo(() => ({
    user,
    session: user ? { user } : null,
    loading,
    signInWithMagicLink,
    signUpWithEmail,
    signInWithEmail,
    signOut,
  }), [user, loading, signInWithMagicLink, signUpWithEmail, signInWithEmail, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
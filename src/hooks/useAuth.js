
import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Return mock auth functions when used outside provider
    return {
      user: null,
      isLoading: false,
      sendMagicLink: async (email) => {
        // Mock implementation - in real app this would integrate with auth service
        console.log('Sending magic link to:', email);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // For demo, automatically "sign in" the user
        localStorage.setItem('lumina_user', JSON.stringify({
          id: '1',
          email: email,
          createdAt: new Date().toISOString()
        }));
        window.location.reload();
      },
      signOut: () => {
        localStorage.removeItem('lumina_user');
        localStorage.removeItem('lumina_subscription');
        window.location.reload();
      }
    };
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('lumina_user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const sendMagicLink = async (email) => {
    // Mock implementation - in real app this would integrate with auth service
    console.log('Sending magic link to:', email);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // For demo, automatically "sign in" the user
    const userData = {
      id: '1',
      email: email,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('lumina_user', JSON.stringify(userData));
    setUser(userData);
  };

  const signOut = () => {
    localStorage.removeItem('lumina_user');
    localStorage.removeItem('lumina_subscription');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    sendMagicLink,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

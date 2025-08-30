import { useState, useEffect, useCallback } from 'react';

export const useSubscription = (user) => {
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkSubscription = useCallback(() => {
    if (!user) {
      setSubscription({ isActive: false, plan: null });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const storedSub = localStorage.getItem('lumina_subscription');
      if (storedSub) {
        const subData = JSON.parse(storedSub);
        const now = new Date();
        const expiryDate = subData.expires_at ? new Date(subData.expires_at) : null;
        
        if ((subData.status === 'active' || subData.status === 'trialing') && (!expiryDate || expiryDate > now)) {
          setSubscription({ ...subData, isActive: true });
        } else {
          setSubscription({ ...subData, isActive: false });
        }
      } else {
        // Default to a 14-day trial if no subscription is found
        const expires_at = new Date(new Date().setDate(new Date().getDate() + 14)).toISOString();
        const trialSub = { plan: 'free', status: 'trialing', expires_at, isActive: true };
        localStorage.setItem('lumina_subscription', JSON.stringify(trialSub));
        setSubscription(trialSub);
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      setSubscription({ isActive: false, plan: null });
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    checkSubscription();
  }, [checkSubscription]);

  return {
    subscription,
    isLoading,
    checkSubscription,
  };
};
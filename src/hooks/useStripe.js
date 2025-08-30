// src/hooks/useStripe.js - Updated with correct function URLs
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/customSupabaseClient';

export const useStripe = () => {
  const { user } = useAuth();

  const createCheckoutSession = async (priceId) => {
    if (!user) {
      toast({ 
        title: "Authentication required", 
        description: "Please sign in to subscribe.", 
        variant: "destructive" 
      });
      return;
    }

    try {
      // Get the session token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No active session');
      }

      // Call the edge function - using your actual function name
      const response = await fetch('https://sdfkxxrfvehkzgfwgqeo.supabase.co/functions/v1/Stripe-Checkout-Session-Edge-Function', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error('Stripe checkout error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initiate payment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const createPortalSession = async () => {
    if (!user) {
      toast({ 
        title: "Authentication required", 
        description: "Please sign in to manage your subscription.", 
        variant: "destructive" 
      });
      return;
    }

    try {
      // Get the session token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No active session');
      }

      // Call the edge function - using your actual function name
      const response = await fetch('https://sdfkxxrfvehkzgfwgqeo.supabase.co/functions/v1/Stripe-Customer-Portal-Edge-Function', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create portal session');
      }

      const { url } = await response.json();
      
      // Redirect to Stripe Customer Portal
      window.location.href = url;
    } catch (error) {
      console.error('Stripe portal error:', error);
      toast({
        title: "Portal Error",
        description: error.message || "Failed to open customer portal. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    createCheckoutSession,
    createPortalSession,
  };
};
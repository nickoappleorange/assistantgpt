import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { plans } from '@/config/plans';

export const useStripe = () => {
  const { user } = useAuth();

  const createCheckoutSession = async (priceId) => {
    toast({
      title: "🚧 Feature In Development",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 5000
    });
    
    // The following is mock logic and should be replaced with actual Stripe integration
    setTimeout(() => {
      if (!user) {
        toast({ title: "Error", description: "You must be logged in to subscribe.", variant: "destructive" });
        return;
      }
      
      const targetPlan = plans.flatMap(p => 
        Object.entries(p.priceId).map(([cycle, pId]) => ({ ...p, cycle, pId }))
      ).find(p => p.pId === priceId);

      if (!targetPlan) {
        toast({ title: "Error", description: "Invalid plan selected.", variant: "destructive" });
        return;
      }

      const isYearly = targetPlan.cycle === 'yearly';
      const expires_at = new Date(Date.now() + (isYearly ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString();

      const newSub = {
        user_id: user.id,
        plan: targetPlan.id,
        status: 'active',
        expires_at: expires_at,
        updated_at: new Date().toISOString(),
        isActive: true,
        tokens: targetPlan.tokens,
      };

      localStorage.setItem('lumina_subscription', JSON.stringify(newSub));

      toast({
        title: "Payment Successful! 🎉",
        description: `Your subscription to ${targetPlan.name} is now active.`
      });
      
      // We'll use a callback instead of reloading the whole window
      // The component calling this will handle the success state update.
      // onSuccess(); 
      // For now, let's keep reload to ensure context updates everywhere
      window.location.reload();
    }, 2000);
  };

  return {
    createCheckoutSession
  };
};
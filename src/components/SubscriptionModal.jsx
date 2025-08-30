
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Crown, Check, Zap, Users, BrainCircuit, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStripe } from '@/hooks/useStripe';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { plans } from '@/config/plans';

const SubscriptionModal = ({ onClose, onSuccess }) => {
  const [selectedPlanId, setSelectedPlanId] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);
  const { createCheckoutSession } = useStripe();

  const handleUpgrade = async () => {
    const selectedPlan = plans.find(p => p.id === selectedPlanId);
    if (!selectedPlan) return;
    
    const priceId = selectedPlan.priceId[billingCycle];
    if (!priceId || selectedPlan.id === 'enterprise') {
        toast({ title: "Contact Sales", description: "Please contact us to get started with the Enterprise plan." });
        return;
    }

    setIsLoading(true);
    try {
      await createCheckoutSession(priceId);
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start checkout. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedPlan = plans.find(p => p.id === selectedPlanId);

  const planIcons = {
    pro: <BrainCircuit className="w-6 h-6 text-blue-400" />,
    creator: <Users className="w-6 h-6 text-purple-400" />,
    power: <Zap className="w-6 h-6 text-green-400" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-effect rounded-3xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Upgrade Your Plan</h2>
              <p className="text-gray-400">Unlock more power and features</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex justify-center mb-8">
            <div className="bg-slate-800 p-1 rounded-full flex items-center">
                <Button onClick={() => setBillingCycle('monthly')} variant={billingCycle === 'monthly' ? 'secondary' : 'ghost'} className="rounded-full">Monthly</Button>
                <Button onClick={() => setBillingCycle('yearly')} variant={billingCycle === 'yearly' ? 'secondary' : 'ghost'} className="rounded-full">Yearly <span className="ml-2 bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">Save</span></Button>
            </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {plans.filter(p => p.id !== 'starter' && p.id !== 'enterprise').map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -5 }}
              className={cn("relative p-6 rounded-2xl border-2 cursor-pointer transition-all h-full flex flex-col",
                selectedPlanId === plan.id ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              )}
              onClick={() => setSelectedPlanId(plan.id)}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</span>
                </div>
              )}
              <div className="text-center mb-4">
                <div className="flex justify-center mb-4">{planIcons[plan.id]}</div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center my-4">
                  <span className="text-4xl font-bold text-white">${billingCycle === 'yearly' && plan.price.yearly ? plan.price.yearly : plan.price.monthly}</span>
                  <span className="text-gray-400 ml-1">/ {billingCycle === 'monthly' ? 'month' : 'year'}</span>
                </div>
              </div>
              <ul className="space-y-3 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
           <motion.div
              whileHover={{ y: -5 }}
              className={cn("relative p-6 rounded-2xl border-2 cursor-pointer transition-all h-full flex flex-col",
                selectedPlanId === 'enterprise' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              )}
              onClick={() => setSelectedPlanId('enterprise')}
            >
              <div className="text-center mb-4">
                <div className="flex justify-center mb-4"><Briefcase className="w-6 h-6 text-teal-400" /></div>
                <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
                <div className="flex items-baseline justify-center my-4">
                  <span className="text-3xl font-bold text-white">Contact Us</span>
                </div>
              </div>
              <ul className="space-y-3 flex-grow">
                {plans.find(p => p.id === 'enterprise').features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
        </div>

        <div className="text-center">
          <Button
            onClick={handleUpgrade}
            disabled={isLoading || !selectedPlan}
            className="h-12 px-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold"
          >
            {isLoading ? 'Processing...' : `Upgrade to ${selectedPlan?.name}`}
          </Button>
          <p className="text-xs text-gray-500 mt-4">Secure payment with Stripe. Cancel anytime.</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SubscriptionModal;
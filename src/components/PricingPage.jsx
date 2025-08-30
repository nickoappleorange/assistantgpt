import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Users, Briefcase, Zap, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { plans } from '@/config/plans';
import { Link, useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const PricingPage = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const location = useLocation();
  const isSignUpFlow = location.pathname === '/signup';
  const { toast } = useToast();

  const icons = {
    starter: <Star className="w-6 h-6 text-yellow-400" />,
    pro: <BrainCircuit className="w-6 h-6 text-blue-400" />,
    creator: <Users className="w-6 h-6 text-purple-400" />,
    power: <Zap className="w-6 h-6 text-green-400" />,
    enterprise: <Briefcase className="w-6 h-6 text-teal-400" />,
  };

  const handleSelect = (plan) => {
    if (isSignUpFlow) {
      if (plan.id === 'enterprise') {
        toast({
          title: "Contact Sales",
          description: "Please contact us to get started with the Enterprise plan.",
        });
        return;
      }
      onSelectPlan(plan.id, billingCycle);
    } else {
      toast({
        title: "Get Started",
        description: "Please sign up to select a plan.",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Choose the plan that's right for you
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Start for free and scale up as you grow. Powerful features for individuals and teams.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="bg-slate-800 p-1 rounded-full flex items-center">
          <Button
            onClick={() => setBillingCycle('monthly')}
            variant={billingCycle === 'monthly' ? 'secondary' : 'ghost'}
            className="rounded-full px-6"
          >
            Monthly
          </Button>
          <Button
            onClick={() => setBillingCycle('yearly')}
            variant={billingCycle === 'yearly' ? 'secondary' : 'ghost'}
            className="rounded-full px-6"
          >
            Yearly
            <span className="ml-2 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
              Save
            </span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className={cn(
              'glass-effect rounded-2xl p-6 flex flex-col',
              plan.recommended ? 'border-2 border-blue-500' : 'border-2 border-transparent'
            )}
          >
            {plan.recommended && (
              <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Recommended
                </span>
              </div>
            )}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800">
                {icons[plan.id]}
              </div>
              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
            </div>
            <p className="text-gray-400 mb-6 min-h-[60px]">{plan.description}</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">{billingCycle === 'yearly' && plan.price.yearly ? plan.price.yearly : plan.price.monthly}</span>
              {plan.price[billingCycle] !== 'Contact Us' && (
                <span className="text-gray-400">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
              )}
            </div>

            <div className="flex-grow mb-6">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Button
              onClick={() => handleSelect(plan)}
              className={cn(
                'w-full h-12 mt-auto font-semibold',
                plan.recommended
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90'
                  : 'bg-slate-700 hover:bg-slate-600'
              )}
            >
              {isSignUpFlow ? 'Get Started' : 'Select Plan'}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
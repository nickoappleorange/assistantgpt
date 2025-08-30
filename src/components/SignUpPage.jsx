
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, UserPlus, Lock, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import PricingPage from '@/components/PricingPage';

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState('free');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const handlePlanSelect = (planId, cycle) => {
    setSelectedPlanId(planId);
    setBillingCycle(cycle);
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: 'All fields are required', variant: 'destructive' });
      return;
    }
    if (password.length < 6) {
      toast({ title: 'Password must be at least 6 characters', variant: 'destructive' });
      return;
    }
    
    setIsLoading(true);
    const planIdentifier = `${selectedPlanId}_${billingCycle}`;
    await signUp(email, password, { data: { plan: planIdentifier } });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="w-full max-w-6xl mx-auto relative z-10"
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <PricingPage onSelectPlan={handlePlanSelect} />
              <div className="mt-8 text-center text-sm text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-blue-400 hover:text-blue-300">
                  Sign In
                </Link>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md mx-auto"
            >
              <div className="glass-effect rounded-3xl p-8 shadow-2xl">
                 <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold gradient-text">Lumina</h1>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Create your account</h2>
                    <p className="text-gray-400">You're signing up for the <span className="font-bold text-white capitalize">{selectedPlanId}</span> plan.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email</label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Password</label>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="6+ characters" required className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"/>
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    {isLoading ? 'Creating Account...' : <><UserPlus className="mr-2 h-4 w-4" /> Sign Up</>}
                  </Button>
                </form>
                
                <Button variant="ghost" onClick={() => setStep(1)} className="w-full mt-4 text-gray-400 hover:text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to plans
                </Button>

                <p className="text-xs text-gray-500 mt-6 text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SignUpPage;

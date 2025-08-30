
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, LogIn, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Link } from 'react-router-dom';

const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md mx-auto relative z-10"
      >
        <div className="glass-effect rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold gradient-text">Lumina</h1>
            </div>
            <p className="text-gray-400">Welcome back to your AI Assistant</p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="magiclink">Magic Link</TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="mt-6">
              <SignInForm />
            </TabsContent>
            <TabsContent value="magiclink" className="mt-6">
              <MagicLinkForm />
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-blue-400 hover:text-blue-300">
              Sign Up Now
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: 'All fields are required', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    await signIn(email, password);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Email</label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Password</label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500" />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
        {isLoading ? 'Signing In...' : <><LogIn className="mr-2 h-4 w-4" /> Sign In</>}
      </Button>
    </form>
  );
};

const MagicLinkForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithMagicLink } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast({ title: 'Email is required', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    await signInWithMagicLink(email);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Email</label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500" />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
        {isLoading ? 'Sending Link...' : <><Mail className="mr-2 h-4 w-4" /> Send Magic Link</>}
      </Button>
    </form>
  );
};

export default AuthPage;


import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import AuthPage from '@/components/AuthPage';
import ChatLayout from '@/components/ChatLayout';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import SignUpPage from '@/components/SignUpPage';
import LandingPage from '@/components/LandingPage';

function App() {
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Lumina AI - Advanced AI Assistant</title>
        <meta name="description" content="Experience the power of advanced AI with Lumina. Get intelligent responses, creative assistance, and productivity tools." />
        <meta property="og:title" content="Lumina AI - Advanced AI Assistant" />
        <meta property="og:description" content="Experience the power of advanced AI with Lumina. Get intelligent responses, creative assistance, and productivity tools." />
      </Helmet>
      
      <Routes>
        <Route path="/welcome" element={!user ? <LandingPage /> : <Navigate to="/chat" />} />
        <Route path="/login" element={!user ? <AuthPage /> : <Navigate to="/chat" />} />
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/chat" />} />
        <Route path="/chat" element={user ? <ChatLayout /> : <Navigate to="/welcome" />} />
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="*" element={<Navigate to={user ? "/chat" : "/welcome"} />} />
      </Routes>
    </>
  );
}

export default App;

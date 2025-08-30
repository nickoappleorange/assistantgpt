
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageSquare, Menu, X, LogOut, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ conversations, activeConversationId, onNewChat, onSelectConversation, onUpgradeClick, subscription }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/welcome');
  };
  
  const sidebarContent = (
    <div className="flex flex-col h-full p-3 bg-slate-900">
      <div className="flex items-center justify-between mb-4 p-2">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold gradient-text">Lumina</h1>
        </div>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(false)}><X className="h-5 w-5"/></Button>
      </div>

      <Button onClick={() => { onNewChat(); setIsOpen(false); }} className="w-full mb-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
        <Plus className="w-5 h-5 mr-2" /> New Chat
      </Button>

      <div className="flex-1 overflow-y-auto scrollbar-hide -mr-2 pr-2">
        <h2 className="text-sm font-semibold text-gray-400 mb-2 px-2">Recent</h2>
        <div className="space-y-1">
          {conversations.map(convo => (
            <button
              key={convo.id}
              onClick={() => {
                  onSelectConversation(convo.id);
                  setIsOpen(false);
                }
              }
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg flex items-center space-x-3 transition-colors",
                activeConversationId === convo.id ? 'bg-blue-500/20 text-white' : 'text-gray-300 hover:bg-slate-800'
              )}
            >
              <MessageSquare className="w-4 h-4 flex-shrink-0" />
              <span className="truncate flex-1">{convo.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-700/50">
        {!subscription?.isActive && (
          <div className="p-3 mb-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-center">
            <h3 className="font-bold text-yellow-400 mb-2">Upgrade to Pro</h3>
            <p className="text-sm text-gray-300 mb-3">Unlock unlimited chats & DALL-E 3!</p>
            <Button size="sm" className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white" onClick={onUpgradeClick}>
              <Crown className="w-4 h-4 mr-2" /> Upgrade
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800">
          <div className="truncate">
            <p className="text-sm font-medium text-white">{user?.email}</p>
            {subscription?.isActive && <p className="text-xs text-yellow-400 capitalize">{subscription.plan} Member</p>}
          </div>
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="w-5 h-5 text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="absolute top-4 left-4 z-20 lg:hidden">
         <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
            <Menu className="h-6 w-6 text-white"/>
         </Button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
      {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 w-80 bg-slate-900 z-50 lg:hidden shadow-2xl"
          >
            {sidebarContent}
          </motion.div>
      )}
      </AnimatePresence>


      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-80 h-screen flex-shrink-0 border-r border-white/10">
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;

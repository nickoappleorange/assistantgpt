
import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import Sidebar from '@/components/Sidebar';
import ChatInterface from '@/components/ChatInterface';
import SubscriptionModal from '@/components/SubscriptionModal';
import { useToast } from '@/components/ui/use-toast';
import { useOpenAI } from '@/hooks/useOpenAI';
import { supabase } from '@/lib/customSupabaseClient';

const ChatLayout = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const { toast } = useToast();
  const { sendMessage } = useOpenAI();

  const checkSubscription = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (error && error.code !== 'PGRST116') { // Ignore "no rows found"
      console.error('Error checking subscription:', error);
    } else if (data) {
      setSubscription({ ...data, isActive: data.status === 'active' || data.status === 'trialing' });
    } else {
      setSubscription({ isActive: false });
    }
  }, [user]);

  const fetchConversations = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) {
      toast({ title: "Error fetching conversations", description: error.message, variant: "destructive" });
    } else {
      setConversations(data);
    }
  }, [user, toast]);

  useEffect(() => {
    checkSubscription();
    fetchConversations();
  }, [checkSubscription, fetchConversations]);

  const handleNewChat = () => {
    setActiveConversationId(null);
  };

  const handleNewMessage = async (firstUserMessageContent) => {
    const prompt = `Generate a very short, concise title (max 5 words) for the following conversation starter: "${firstUserMessageContent}"`;
    let title = firstUserMessageContent.substring(0, 30) + '...';
    try {
        const generatedTitle = await sendMessage(prompt);
        title = generatedTitle.replace(/["']/g, "");
    } catch (e) {
        console.error("Failed to generate title", e);
    }
    
    const { data, error } = await supabase
      .from('conversations')
      .insert({ user_id: user.id, title })
      .select()
      .single();

    if (error) {
      toast({ title: "Failed to create new chat", description: error.message, variant: "destructive" });
      return null;
    }

    fetchConversations();
    setActiveConversationId(data.id);
    return data.id;
  };

  const handleSelectConversation = (id) => {
    setActiveConversationId(id);
  };

  return (
    <div className="h-screen w-full flex bg-slate-900">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        onUpgradeClick={() => setShowSubscriptionModal(true)}
        subscription={subscription}
      />
      <main className="flex-1 h-screen flex flex-col">
        <ChatInterface
          key={activeConversationId}
          conversationId={activeConversationId}
          subscription={subscription}
          onUpgradeClick={() => setShowSubscriptionModal(true)}
          onNewMessage={handleNewMessage}
        />
      </main>
      <AnimatePresence>
        {showSubscriptionModal && (
          <SubscriptionModal
            onClose={() => setShowSubscriptionModal(false)}
            onSuccess={() => {
              setShowSubscriptionModal(false);
              checkSubscription();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatLayout;


import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useOpenAI } from '@/hooks/useOpenAI';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const ChatInterface = ({ conversationId, subscription, onUpgradeClick, onNewMessage }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const { user } = useAuth();
  const { sendMessage, generateImage, isLoading } = useOpenAI();
  const { toast } = useToast();

  const fetchMessages = useCallback(async () => {
    if (!conversationId || !user) {
      setMessages([]);
      return;
    }
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      toast({ title: "Error fetching messages", description: error.message, variant: "destructive" });
    } else {
      setMessages(data);
    }
  }, [user, conversationId, toast]);

  useEffect(() => {
    fetchMessages();
  }, [conversationId, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const WelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6">
            <Sparkles className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold gradient-text mb-2">Lumina</h1>
        <p className="text-xl text-gray-300">How can I help you today?</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
            <button onClick={() => setInputValue("Explain quantum computing in simple terms")} className="p-4 glass-effect rounded-lg text-left hover:bg-slate-700/50 transition-colors">
                <p className="font-semibold text-white">Explain quantum computing</p>
                <p className="text-sm text-gray-400">in simple terms</p>
            </button>
            <button onClick={() => setInputValue("Got any creative ideas for a 10 year old’s birthday?")} className="p-4 glass-effect rounded-lg text-left hover:bg-slate-700/50 transition-colors">
                <p className="font-semibold text-white">Birthday party ideas</p>
                <p className="text-sm text-gray-400">for a 10 year old</p>
            </button>
            <button onClick={() => setInputValue("How do I make an HTTP request in Javascript?")} className="p-4 glass-effect rounded-lg text-left hover:bg-slate-700/50 transition-colors">
                <p className="font-semibold text-white">HTTP request in Javascript</p>
                <p className="text-sm text-gray-400">show me an example</p>
            </button>
            <button onClick={() => setInputValue("/imagine a futuristic city skyline at sunset")} className="p-4 glass-effect rounded-lg text-left hover:bg-slate-700/50 transition-colors">
                <p className="font-semibold text-white">Imagine a futuristic city</p>
                <p className="text-sm text-gray-400">DALL-E 3 prompt</p>
            </button>
        </div>
    </div>
  );

  const saveMessage = async (message) => {
    const { data, error } = await supabase.from('messages').insert(message);
    if (error) {
      toast({ title: "Error saving message", description: error.message, variant: "destructive" });
    }
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    if (!conversationId) {
        const newConvoId = await onNewMessage(inputValue.trim());
        if(newConvoId) {
            handleSend(newConvoId, inputValue.trim());
        }
        return;
    }
    
    handleSend(conversationId, inputValue.trim());
  };

  const handleSend = async (convoId, content) => {
    if (!subscription?.isActive && messages.length >= 10) {
      toast({ title: "Trial limit reached", description: "Upgrade to continue the conversation!", variant: "destructive" });
      onUpgradeClick();
      return;
    }
    
    setInputValue('');

    const userMessageData = {
      conversation_id: convoId,
      user_id: user.id,
      role: 'user',
      content_type: 'text',
      content: content,
    };

    setMessages(prev => [...prev, { ...userMessageData, id: `local_${Date.now()}`, created_at: new Date().toISOString() }]);

    await saveMessage(userMessageData);
    

    try {
      let assistantResponse;
      if (content.startsWith('/imagine ')) {
        const prompt = content.substring('/imagine '.length);
        const imageUrl = await generateImage(prompt);
        assistantResponse = { content_type: 'image', content: imageUrl };
      } else {
        const textResponse = await sendMessage(content, messages.map(m => ({role: m.role, content: m.content})));
        assistantResponse = { content_type: 'text', content: textResponse };
      }

      const assistantMessageData = {
        conversation_id: convoId,
        user_id: user.id,
        role: 'assistant',
        ...assistantResponse,
      };

      await saveMessage(assistantMessageData);
      fetchMessages();

    } catch (error) {
      toast({ title: "Error", description: error.message || "Failed to get response.", variant: "destructive" });
      fetchMessages();
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-800">
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
        {messages.length === 0 && !conversationId ? <WelcomeScreen /> : (
          <div className="max-w-4xl mx-auto space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-3xl ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user' ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-green-500 to-teal-600'}`}>
                      {message.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                    </div>
                    <div className={`message-bubble rounded-2xl p-4 ${message.role === 'user' ? 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 text-white' : 'bg-slate-700/50 text-white'}`}>
                      {message.content_type === 'image' ? (
                        <div className="space-y-2">
                          <img className="rounded-lg max-w-sm" alt="AI generated image" src={message.content} />
                          <p className="text-sm text-gray-400">Image generated based on your prompt.</p>
                        </div>
                      ) : (
                        <p className="text-white whitespace-pre-wrap">{message.content}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">{new Date(message.created_at).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-3xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
                  <div className="rounded-2xl p-4 bg-slate-700/50">
                    <div className="flex space-x-1"><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" /><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" /><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" /></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <div className="border-t border-white/10 p-4 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <div className="relative flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={ "Ask anything or try /imagine <prompt>"}
                className="h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-500 pl-4 pr-10"
                disabled={isLoading}
              />
              <ImageIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <Button type="submit" disabled={isLoading || !inputValue.trim()} className="h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              <Send className="w-5 h-5" />
            </Button>
          </form>
          <p className="text-xs text-center text-gray-500 mt-2">Lumina can make mistakes. Consider checking important information.</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

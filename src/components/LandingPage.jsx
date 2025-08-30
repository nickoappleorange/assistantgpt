
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BrainCircuit, Bot, Image as ImageIcon, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      <header className="absolute top-0 left-0 right-0 z-20 py-4 px-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Lumina</h1>
        </div>
        <div className="space-x-4">
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity">
              Start Chatting <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#8085ff] to-[#3730a3] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>

        <motion.div 
          className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-300 ring-1 ring-white/20 hover:ring-white/30">
                Now featuring DALL-E 3 for stunning image generation. <a href="#features" className="font-semibold text-blue-400"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
              </div>
            </div>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl font-bold tracking-tight text-white sm:text-6xl gradient-text">
            Meet Lumina, Your Personal AI Companion
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-6 text-lg leading-8 text-gray-300">
            Unleash your creativity and productivity. From writing emails to generating stunning images, Lumina is here to help you achieve more, faster.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity text-lg px-8 py-6">
                Get Started For Free
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#4f46e5] to-[#a21caf] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>
      </div>
      
      <section id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl lg:text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-base font-semibold leading-7 text-blue-400">Everything You Need</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A smarter way to work and create
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Lumina integrates powerful AI capabilities into a seamless and intuitive interface, designed to be your go-to tool for any task.
            </p>
          </motion.div>
          <motion.div 
            className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                    <BrainCircuit className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Advanced Conversational AI
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-300">Get intelligent, context-aware answers to complex questions. Perfect for research, brainstorming, and learning.</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                    <Bot className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Content Creation
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-300">Draft emails, write code, create marketing copy, or even compose poetry. Lumina is your creative partner.</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                    <ImageIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  DALL-E 3 Image Generation
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-300">Bring your ideas to life with stunning, high-quality images created from simple text prompts.</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                    <ShieldCheck className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Secure and Private
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-300">Your conversations are private and secure. We are committed to protecting your data and privacy.</dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Lumina AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

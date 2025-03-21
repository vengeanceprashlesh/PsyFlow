import React from 'react';
import Layout from '@/components/layout/Layout';
import ChatInterface from '@/components/chat/ChatInterface';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Brain, Calendar, BookOpen, Sparkles, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

const Chat = () => {
  return (
    <Layout>
      <div className="flex flex-col">
        <div className="mb-6">
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-6 rounded-2xl mb-6">
            <h1 className="heading-lg text-primary mb-3">Your AI Psychology Companion</h1>
            <p className="paragraph text-foreground/70 max-w-3xl">
              I'm here to provide support using evidence-based approaches like CBT, ACT, and positive psychology. 
              Our conversations are private, judgment-free, and designed to help you navigate life's challenges.
            </p>
          </div>
          
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6 bg-background/80 p-1 rounded-xl w-full max-w-md mx-auto">
              <TabsTrigger 
                value="chat" 
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <div className="flex flex-col items-center py-1 space-y-1">
                  <Brain size={18} />
                  <span className="text-xs">Chat</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="resources" 
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <div className="flex flex-col items-center py-1 space-y-1">
                  <BookOpen size={18} />
                  <span className="text-xs">Resources</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="exercises" 
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <div className="flex flex-col items-center py-1 space-y-1">
                  <Heart size={18} />
                  <span className="text-xs">Exercises</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="progress" 
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <div className="flex flex-col items-center py-1 space-y-1">
                  <Calendar size={18} />
                  <span className="text-xs">Progress</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="mt-0">
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 px-4 py-3 border-b flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Mindful Assistant</h3>
                      <div className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                        <span className="text-xs text-foreground/60">Online now</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center cursor-pointer hover:bg-accent/20 transition-colors"
                    >
                      <Smile className="w-4 h-4 text-accent" />
                    </motion.div>
                  </div>
                </div>
                <ChatInterface />
              </Card>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-0">
              <Card className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Helpful Resources</h3>
                <p className="text-foreground/70 mb-4">
                  Curated articles, videos, and tools to support your mental wellbeing journey.
                </p>
                <p className="text-primary text-sm">Coming soon</p>
              </Card>
            </TabsContent>
            
            <TabsContent value="exercises" className="mt-0">
              <Card className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Guided Exercises</h3>
                <p className="text-foreground/70 mb-4">
                  Interactive mindfulness and relaxation exercises to practice during our conversations.
                </p>
                <p className="text-primary text-sm">Coming soon</p>
              </Card>
            </TabsContent>
            
            <TabsContent value="progress" className="mt-0">
              <Card className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Your Journey</h3>
                <p className="text-foreground/70 mb-4">
                  Track your progress and see how far you've come on your mental wellbeing journey.
                </p>
                <p className="text-primary text-sm">Coming soon</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

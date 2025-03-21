import React from 'react';
import Layout from '@/components/layout/Layout';
import BreathingExercise from '@/components/breathing/BreathingExercise';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wind, Flame, Heart, BookOpen, Sparkles } from 'lucide-react';

const BreathingPage = () => {
  return (
    <Layout>
      <div className="flex flex-col">
        <div className="bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-indigo-500/10 p-6 rounded-2xl mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Wind className="h-5 w-5 text-blue-500" />
            </div>
            <h1 className="heading-lg text-primary">Breathing Exercises</h1>
          </div>
          <p className="paragraph text-foreground/70 max-w-3xl">
            Practice guided breathing exercises to reduce stress, calm your mind, and improve your focus. 
            Consistent breathing practice can help regulate your nervous system and create a sense of inner peace.
          </p>
        </div>
        
        <Tabs defaultValue="practice" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-background/80 p-1 rounded-xl w-full max-w-md mx-auto">
            <TabsTrigger 
              value="practice" 
              className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <div className="flex flex-col items-center py-1 space-y-1">
                <Wind size={18} />
                <span className="text-xs">Practice</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="learn" 
              className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <div className="flex flex-col items-center py-1 space-y-1">
                <BookOpen size={18} />
                <span className="text-xs">Learn</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="progress" 
              className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <div className="flex flex-col items-center py-1 space-y-1">
                <Heart size={18} />
                <span className="text-xs">Progress</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="practice" className="mt-0">
            <BreathingExercise />
          </TabsContent>
          
          <TabsContent value="learn" className="mt-0">
            <Card className="p-6 border-0 shadow-lg overflow-hidden">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">The Science of Breathing</h3>
                <p className="text-foreground/70 mb-6 max-w-lg mx-auto">
                  Learn how different breathing techniques affect your body and mind, and discover the science behind their effectiveness.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  <Card className="p-4 border border-blue-100 dark:border-blue-900/20 bg-white/80 dark:bg-gray-800/80">
                    <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Nervous System</h4>
                    <p className="text-xs text-foreground/70">How breathing affects your sympathetic and parasympathetic nervous system</p>
                  </Card>
                  
                  <Card className="p-4 border border-teal-100 dark:border-teal-900/20 bg-white/80 dark:bg-gray-800/80">
                    <h4 className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-1">Stress Response</h4>
                    <p className="text-xs text-foreground/70">How proper breathing can help counter your body's stress reactions</p>
                  </Card>
                  
                  <Card className="p-4 border border-purple-100 dark:border-purple-900/20 bg-white/80 dark:bg-gray-800/80">
                    <h4 className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">Focus & Cognition</h4>
                    <p className="text-xs text-foreground/70">The effects of oxygen levels on brain function and mental clarity</p>
                  </Card>
                  
                  <Card className="p-4 border border-indigo-100 dark:border-indigo-900/20 bg-white/80 dark:bg-gray-800/80">
                    <h4 className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">Sleep Quality</h4>
                    <p className="text-xs text-foreground/70">How breathing exercises can help improve your sleep patterns</p>
                  </Card>
                </div>
                
                <p className="text-primary text-sm mt-6">Coming soon</p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="progress" className="mt-0">
            <Card className="p-6 border-0 shadow-lg overflow-hidden">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-rose-600 dark:text-rose-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Your Breathing Journey</h3>
                <p className="text-foreground/70 mb-6 max-w-lg mx-auto">
                  Track your breathing practice over time and see how it impacts your overall well-being and mental health.
                </p>
                
                <div className="bg-rose-50/50 dark:bg-rose-900/10 rounded-xl p-6 max-w-md mx-auto">
                  <h4 className="text-sm font-medium text-rose-600 dark:text-rose-400 mb-3">Benefits You May Notice</h4>
                  <ul className="text-sm text-left space-y-3">
                    <li className="flex items-start">
                      <span className="text-rose-500 mr-2">•</span>
                      <p>Reduced anxiety and stress levels throughout your day</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-rose-500 mr-2">•</span>
                      <p>Improved ability to focus and stay present in challenging situations</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-rose-500 mr-2">•</span>
                      <p>Better sleep quality and easier time falling asleep</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-rose-500 mr-2">•</span>
                      <p>Increased awareness of your body's stress signals</p>
                    </li>
                  </ul>
                </div>
                
                <p className="text-primary text-sm mt-6">Coming soon</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default BreathingPage;

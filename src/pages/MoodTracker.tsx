import React from 'react';
import Layout from '@/components/layout/Layout';
import MoodTracker from '@/components/mood/MoodTracker';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart2, Calendar, TrendingUp, BookHeart, Sparkles } from 'lucide-react';

const MoodTrackerPage = () => {
  return (
    <Layout>
      <div className="flex flex-col">
        <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-6 rounded-2xl mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-blue-500" />
            </div>
            <h1 className="heading-lg text-primary">Your Mood Journey</h1>
          </div>
          <p className="paragraph text-foreground/70 max-w-3xl">
            Track your emotional well-being over time to discover patterns, triggers, and progress in your mental health journey. 
            Regular tracking helps build self-awareness and can provide valuable insights for your personal growth.
          </p>
        </div>

        <Tabs defaultValue="track" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-background/80 p-1 rounded-xl w-full max-w-md mx-auto">
            <TabsTrigger 
              value="track" 
              className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <div className="flex flex-col items-center py-1 space-y-1">
                <BarChart2 size={18} />
                <span className="text-xs">Track</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <div className="flex flex-col items-center py-1 space-y-1">
                <TrendingUp size={18} />
                <span className="text-xs">Insights</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="journal" 
              className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <div className="flex flex-col items-center py-1 space-y-1">
                <BookHeart size={18} />
                <span className="text-xs">Journal</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="track" className="mt-0">
            <MoodTracker />
          </TabsContent>
          
          <TabsContent value="insights" className="mt-0">
            <Card className="p-6 border-0 shadow-lg overflow-hidden">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Mood Patterns & Insights</h3>
                <p className="text-foreground/70 mb-6 max-w-lg mx-auto">
                  Discover patterns in your emotional well-being with personalized analytics and insights based on your mood tracking data.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  <Card className="p-4 border border-purple-100 dark:border-purple-900/20 bg-white/80 dark:bg-gray-800/80">
                    <h4 className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">Weekly Overview</h4>
                    <p className="text-xs text-foreground/70">Visualize your mood fluctuations over the past 7 days</p>
                  </Card>
                  
                  <Card className="p-4 border border-blue-100 dark:border-blue-900/20 bg-white/80 dark:bg-gray-800/80">
                    <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Mood Correlations</h4>
                    <p className="text-xs text-foreground/70">See how different factors affect your emotional state</p>
                  </Card>
                  
                  <Card className="p-4 border border-green-100 dark:border-green-900/20 bg-white/80 dark:bg-gray-800/80">
                    <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Progress Metrics</h4>
                    <p className="text-xs text-foreground/70">Track improvements in your overall emotional well-being</p>
                  </Card>
                  
                  <Card className="p-4 border border-amber-100 dark:border-amber-900/20 bg-white/80 dark:bg-gray-800/80">
                    <h4 className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-1">Custom Reports</h4>
                    <p className="text-xs text-foreground/70">Generate personalized insights about your mood patterns</p>
                  </Card>
                </div>
                
                <p className="text-primary text-sm mt-6">Coming soon</p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="journal" className="mt-0">
            <Card className="p-6 border-0 shadow-lg overflow-hidden">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mx-auto mb-4">
                  <BookHeart className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Mood Journal</h3>
                <p className="text-foreground/70 mb-6 max-w-lg mx-auto">
                  Connect your mood entries with journal reflections to better understand what affects your emotional well-being.
                </p>
                
                <div className="bg-teal-50/50 dark:bg-teal-900/10 rounded-xl p-6 max-w-md mx-auto">
                  <h4 className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-3">Reflection Prompts</h4>
                  <ul className="text-sm text-left space-y-3">
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      <p>What activities or interactions boosted your mood today?</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      <p>Notice any patterns between your sleep and your emotional state?</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      <p>Which self-care practices have been most effective for you?</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      <p>What are you grateful for in this moment?</p>
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

export default MoodTrackerPage;

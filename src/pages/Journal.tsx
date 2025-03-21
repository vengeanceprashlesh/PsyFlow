import React from 'react';
import Layout from '@/components/layout/Layout';
import JournalEntry from '@/components/journal/JournalEntry';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, BarChart2, PenLine, FileText } from 'lucide-react';

const JournalPage = () => {
  return (
    <Layout>
      <div className="flex flex-col">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <h1 className="heading-lg mb-3 text-primary">Reflective Journal</h1>
          <p className="paragraph text-foreground/70 max-w-2xl mx-auto">
            Document your thoughts, feelings, and experiences to promote self-awareness and emotional processing.
            Track your mood patterns and gain insights into your mental well-being over time.
          </p>
        </div>

        <Card className="p-0 border-0 shadow-lg overflow-hidden bg-gradient-to-r from-background/95 to-background">
          <Tabs defaultValue="entries" className="w-full">
            <div className="px-6 pt-6 border-b">
              <TabsList className="w-full max-w-3xl mx-auto grid grid-cols-4 bg-secondary/30 p-1 rounded-xl">
                <TabsTrigger 
                  value="entries"
                  className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-md"
                >
                  <div className="flex flex-col items-center py-1 space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <FileText size={18} />
                    <span className="text-xs sm:text-sm">Entries</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="calendar"
                  className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-md"
                >
                  <div className="flex flex-col items-center py-1 space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <CalendarIcon size={18} />
                    <span className="text-xs sm:text-sm">Calendar</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="insights"
                  className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-md"
                >
                  <div className="flex flex-col items-center py-1 space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <BarChart2 size={18} />
                    <span className="text-xs sm:text-sm">Insights</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="prompts"
                  className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-md"
                >
                  <div className="flex flex-col items-center py-1 space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <PenLine size={18} />
                    <span className="text-xs sm:text-sm">Prompts</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-6">
              <TabsContent value="entries" className="mt-0">
                <JournalEntry />
              </TabsContent>
              
              <TabsContent value="calendar" className="mt-0">
                <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                    <CalendarIcon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="heading-sm text-accent">Calendar View</h3>
                  <p className="paragraph max-w-md">
                    View your journal entries organized by date to track your journaling consistency and revisit memories from specific days.
                  </p>
                  <Card className="p-4 bg-secondary/20 w-full max-w-md text-center">
                    <p className="text-primary font-medium">Coming Soon</p>
                    <p className="text-sm text-muted-foreground mt-1">This feature is currently in development</p>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="insights" className="mt-0">
                <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                    <BarChart2 className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="heading-sm text-accent">Mood Insights</h3>
                  <p className="paragraph max-w-md">
                    Track patterns in your emotions and mental wellbeing over time with visual charts and data analysis based on your journal entries.
                  </p>
                  <Card className="p-4 bg-secondary/20 w-full max-w-md text-center">
                    <p className="text-primary font-medium">Coming Soon</p>
                    <p className="text-sm text-muted-foreground mt-1">This feature is currently in development</p>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="prompts" className="mt-0">
                <div className="flex flex-col space-y-6">
                  <div className="text-center max-w-2xl mx-auto mb-2">
                    <h3 className="heading-sm text-accent">Journal Prompts</h3>
                    <p className="paragraph">
                      Get inspiration for your journal entries with thoughtful prompts designed to encourage self-reflection and personal growth.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        category: "Gratitude",
                        prompt: "List three things you're grateful for today and explain why they matter to you."
                      },
                      {
                        category: "Self-Reflection",
                        prompt: "What is one challenge you're currently facing, and what strengths can you draw upon to overcome it?"
                      },
                      {
                        category: "Growth",
                        prompt: "Describe a recent situation where you stepped out of your comfort zone. What did you learn?"
                      },
                      {
                        category: "Mindfulness", 
                        prompt: "What sensations, thoughts, and emotions are you experiencing in this present moment?"
                      },
                      {
                        category: "Values",
                        prompt: "Which of your personal values did you honor today? How did your actions reflect these values?"
                      },
                      {
                        category: "Relationships",
                        prompt: "Reflect on a meaningful conversation you had recently. What made it significant?"
                      }
                    ].map((item, index) => (
                      <Card key={index} className="p-5 hover:shadow-md transition-all border-accent/10">
                        <div className="space-y-3">
                          <div className="text-xs font-medium px-2 py-1 bg-accent/10 text-accent rounded-full w-fit">
                            {item.category}
                          </div>
                          <p className="paragraph">{item.prompt}</p>
                          <button 
                            className="text-sm text-primary hover:text-primary/80 font-medium flex items-center"
                            onClick={() => {}} // Would trigger creating a new entry with this prompt
                          >
                            <PenLine size={14} className="mr-1" />
                            Write about this
                          </button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

export default JournalPage;

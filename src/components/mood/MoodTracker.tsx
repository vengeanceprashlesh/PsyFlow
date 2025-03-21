import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import AnimatedTransition from '@/components/shared/AnimatedTransition';
import { Check, Calendar, BookHeart, Sparkles, TrendingUp, AlertCircle, Info } from 'lucide-react';
import { format } from 'date-fns';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MoodEntry {
  id: string;
  date: Date;
  mood: number;
  note: string;
  factors?: string[];
}

// Add factors that might affect mood
const moodFactors = [
  { id: 'sleep', label: 'Sleep', icon: '😴' },
  { id: 'stress', label: 'Stress', icon: '😓' },
  { id: 'exercise', label: 'Exercise', icon: '🏃' },
  { id: 'social', label: 'Social', icon: '👥' },
  { id: 'work', label: 'Work', icon: '💼' },
  { id: 'nutrition', label: 'Nutrition', icon: '🍎' },
];

const moodEmojis = ['😞', '😔', '😐', '🙂', '😊'];
const moodLabels = ['Very Low', 'Low', 'Neutral', 'Good', 'Excellent'];
const moodColors = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#10b981'];

const mockMoodData = [
  { day: 'Mon', date: '10/2', mood: 2, factors: ['sleep', 'stress'] },
  { day: 'Tue', date: '10/3', mood: 3, factors: ['exercise'] },
  { day: 'Wed', date: '10/4', mood: 4, factors: ['social', 'exercise'] },
  { day: 'Thu', date: '10/5', mood: 3, factors: ['work'] },
  { day: 'Fri', date: '10/6', mood: 2, factors: ['stress', 'work'] },
  { day: 'Sat', date: '10/7', mood: 3, factors: ['social', 'nutrition'] },
  { day: 'Sun', date: '10/8', mood: 4, factors: ['sleep', 'exercise'] },
];

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [chartView, setChartView] = useState<'week' | 'month'>('week');

  const handleMoodSelect = (mood: number) => {
    setSelectedMood(mood);
  };

  const toggleFactor = (factorId: string) => {
    if (selectedFactors.includes(factorId)) {
      setSelectedFactors(selectedFactors.filter(id => id !== factorId));
    } else {
      setSelectedFactors([...selectedFactors, factorId]);
    }
  };

  const handleSaveMood = () => {
    if (selectedMood === null) return;
    
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date(),
      mood: selectedMood,
      note: moodNote,
      factors: selectedFactors
    };
    
    setMoodEntries([...moodEntries, newEntry]);
    setShowSuccess(true);
    
    // Reset form after saving
    setTimeout(() => {
      setSelectedMood(null);
      setMoodNote('');
      setSelectedFactors([]);
      setShowSuccess(false);
    }, 2000);
  };

  const getMoodColor = (mood: number) => {
    return moodColors[mood];
  };

  return (
    <div className="flex flex-col space-y-6">
      <Card className="border-0 shadow-lg overflow-hidden">
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <AnimatedTransition variant="scale" key="success">
              <div className="flex flex-col items-center justify-center py-10 px-6 text-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                </motion.div>
                <h4 className="text-xl font-semibold text-green-600 dark:text-green-400">Mood Logged!</h4>
                <p className="text-foreground/70 mt-2 max-w-md">
                  Your mood has been successfully recorded. Each entry helps you build a more complete picture of your emotional well-being.
                </p>
                <div className="flex items-center justify-center mt-4 text-green-600/70 dark:text-green-400/70 text-sm">
                  <Info size={14} className="mr-1" />
                  <span>Tracking consistent patterns helps identify what affects your mood</span>
                </div>
              </div>
            </AnimatedTransition>
          ) : (
            <AnimatedTransition key="form" variant="fadeIn">
              <div className="p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-medium">Track Today's Mood</h3>
                </div>
                
                <p className="text-foreground/70 mb-6">How are you feeling right now? Select the emoji that best represents your current emotional state.</p>
                
                <div className="flex justify-between w-full md:max-w-xl mx-auto mb-8">
                  {moodEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      className={`relative p-3 rounded-full transition-all duration-300 ${
                        selectedMood === index 
                          ? 'bg-primary/15 scale-115 ring-2 ring-primary/30' 
                          : 'hover:bg-secondary/70'
                      }`}
                      onClick={() => handleMoodSelect(index)}
                    >
                      <span className="text-4xl">{emoji}</span>
                      {selectedMood === index && (
                        <motion.div
                          layoutId="moodIndicator"
                          className="absolute -bottom-7 left-0 right-0 mx-auto text-xs font-medium text-primary text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {moodLabels[index]}
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
                
                {selectedMood !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-1">
                      <Info className="h-4 w-4" />
                      What factors may be affecting your mood today?
                    </h4>
                    
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
                      {moodFactors.map(factor => (
                        <button
                          key={factor.id}
                          onClick={() => toggleFactor(factor.id)}
                          className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                            selectedFactors.includes(factor.id)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-background hover:bg-secondary/80'
                          }`}
                        >
                          <span className="text-xl mb-1">{factor.icon}</span>
                          <span className="text-xs font-medium">{factor.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                <div className="w-full">
                  <Textarea
                    value={moodNote}
                    onChange={(e) => setMoodNote(e.target.value)}
                    placeholder="Add notes about why you feel this way... (What happened today? Any specific events that affected your mood?)"
                    className="resize-none mb-4 focus-ring min-h-24"
                  />
                  
                  <Button
                    onClick={handleSaveMood}
                    disabled={selectedMood === null}
                    className="w-full py-6 text-base"
                  >
                    Save Mood Entry
                  </Button>
                </div>
              </div>
            </AnimatedTransition>
          )}
        </AnimatePresence>
      </Card>
      
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-medium">Your Mood Journey</h3>
            </div>
            
            <Tabs 
              value={chartView} 
              onValueChange={(v) => setChartView(v as 'week' | 'month')}
              className="ml-auto"
            >
              <TabsList className="bg-muted/50">
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockMoodData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={[0, 4]} 
                  ticks={[0, 1, 2, 3, 4]} 
                  hide 
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const moodIndex = payload[0].value as number;
                      const entry = payload[0].payload;
                      return (
                        <div className="bg-background/95 dark:bg-background/95 border border-border p-3 rounded-lg shadow-lg text-sm">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-foreground/70">{entry.day}, {entry.date}</span>
                            <span className="text-2xl ml-3">{moodEmojis[moodIndex]}</span>
                          </div>
                          <p className="font-medium" style={{ color: getMoodColor(moodIndex) }}>
                            {moodLabels[moodIndex]}
                          </p>
                          {entry.factors && entry.factors.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-border">
                              <div className="flex flex-wrap gap-1">
                                {entry.factors.map(factorId => {
                                  const factor = moodFactors.find(f => f.id === factorId);
                                  return factor ? (
                                    <div key={factorId} className="flex items-center bg-muted/50 px-2 py-1 rounded-full text-xs">
                                      <span className="mr-1">{factor.icon}</span>
                                      <span>{factor.label}</span>
                                    </div>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  fill="url(#moodGradient)"
                  activeDot={{ 
                    r: 6, 
                    stroke: 'hsl(var(--primary))', 
                    strokeWidth: 2, 
                    fill: 'var(--background)' 
                  }}
                  dot={{ 
                    r: 4, 
                    stroke: 'hsl(var(--primary))', 
                    strokeWidth: 2, 
                    fill: 'var(--background)' 
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-between">
            {moodEmojis.map((emoji, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-xs text-foreground/50">{idx === 0 ? 'Low' : idx === 4 ? 'High' : ''}</span>
                <span className="text-sm">{emoji}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-muted/30 p-4 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-foreground/70">
                <span className="font-medium">Tip:</span> Look for patterns between your activities and mood changes. Identifying these connections can help you make positive adjustments to your daily routine.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MoodTracker;

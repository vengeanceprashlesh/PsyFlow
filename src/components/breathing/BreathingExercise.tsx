import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Info, Clock, MoveHorizontal, Moon, Sun, Heart, Award, Download, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedTransition from '@/components/shared/AnimatedTransition';

interface BreathingPattern {
  id: string;
  name: string;
  icon: React.ReactNode;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  description: string;
  benefits: string[];
  color: string;
  backgroundColor: string;
}

const breathingPatterns: BreathingPattern[] = [
  {
    id: '4-7-8',
    name: '4-7-8 Relaxation',
    icon: <Moon className="h-5 w-5" />,
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    description: 'Calms the nervous system and helps reduce anxiety and stress.',
    benefits: ['Reduces anxiety', 'Helps with sleep', 'Manages stress response'],
    color: 'text-indigo-500 dark:text-indigo-400',
    backgroundColor: 'from-indigo-400/20 to-purple-400/20'
  },
  {
    id: 'box',
    name: 'Box Breathing',
    icon: <MoveHorizontal className="h-5 w-5" />,
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    description: 'Helps regulate the autonomic nervous system and improve concentration.',
    benefits: ['Improves focus', 'Creates mental clarity', 'Reduces stress'],
    color: 'text-blue-500 dark:text-blue-400',
    backgroundColor: 'from-blue-400/20 to-cyan-400/20'
  },
  {
    id: 'resonant',
    name: 'Resonant Breathing',
    icon: <Heart className="h-5 w-5" />,
    inhale: 5.5,
    hold1: 0,
    exhale: 5.5,
    hold2: 0,
    description: 'Can help reduce anxiety and improve heart rate variability.',
    benefits: ['Balances heart rate', 'Improves mood', 'Increases calmness'],
    color: 'text-rose-500 dark:text-rose-400',
    backgroundColor: 'from-rose-400/20 to-orange-400/20'
  },
  {
    id: 'energizing',
    name: 'Energizing Breath',
    icon: <Sun className="h-5 w-5" />,
    inhale: 1,
    hold1: 0,
    exhale: 1,
    hold2: 0,
    description: 'Quick, rhythmic breathing to increase alertness and energy.',
    benefits: ['Increases energy', 'Improves alertness', 'Enhances clarity'],
    color: 'text-amber-500 dark:text-amber-400',
    backgroundColor: 'from-amber-400/20 to-yellow-400/20'
  }
];

const BreathingExercise: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(breathingPatterns[0]);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [timeLeft, setTimeLeft] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [targetCycles, setTargetCycles] = useState(10);
  const [showGuide, setShowGuide] = useState(true);
  const [backgroundSounds, setBackgroundSounds] = useState(false);
  const [breathingTab, setBreathingTab] = useState<'practice' | 'customize'>('practice');
  
  const sessionTimer = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (isActive && startTimeRef.current === null) {
      startTimeRef.current = Date.now();
      
      sessionTimer.current = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
          setSessionDuration(elapsed);
        }
      }, 1000);
    } else if (!isActive && sessionTimer.current) {
      clearInterval(sessionTimer.current);
      sessionTimer.current = null;
    }
    
    return () => {
      if (sessionTimer.current) {
        clearInterval(sessionTimer.current);
      }
    };
  }, [isActive]);
  
  useEffect(() => {
    if (!isActive) return;
    
    const phaseTime = selectedPattern[phase];
    setTimeLeft(phaseTime);
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0.1) {
          // Move to next phase
          if (phase === 'inhale') {
            setPhase(selectedPattern.hold1 > 0 ? 'hold1' : 'exhale');
          } else if (phase === 'hold1') {
            setPhase('exhale');
          } else if (phase === 'exhale') {
            if (selectedPattern.hold2 > 0) {
              setPhase('hold2');
            } else {
              setPhase('inhale');
              setCompletedCycles(prev => prev + 1);
            }
          } else {
            setPhase('inhale');
            setCompletedCycles(prev => {
              const newValue = prev + 1;
              // Auto-stop if we reach the target
              if (newValue >= targetCycles) {
                setIsActive(false);
              }
              return newValue;
            });
          }
          return selectedPattern[phase === 'inhale' ? (selectedPattern.hold1 > 0 ? 'hold1' : 'exhale') : 
                 phase === 'hold1' ? 'exhale' : 
                 phase === 'exhale' ? (selectedPattern.hold2 > 0 ? 'hold2' : 'inhale') : 'inhale'];
        }
        return prevTime - 0.1;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, [isActive, phase, selectedPattern, targetCycles]);
  
  const handleSelectPattern = (patternId: string) => {
    const pattern = breathingPatterns.find(p => p.id === patternId);
    if (pattern) {
      setSelectedPattern(pattern);
      handleReset();
    }
  };
  
  const handlePlayPause = () => {
    setIsActive(!isActive);
    if (!isActive && phase === 'inhale' && timeLeft === 0) {
      setTimeLeft(selectedPattern.inhale);
    }
  };
  
  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(0);
    setCompletedCycles(0);
    setSessionDuration(0);
    startTimeRef.current = null;
  };
  
  // Calculate the progress for the current phase
  const phaseProgress = isActive 
    ? 1 - (timeLeft / selectedPattern[phase])
    : 0;
  
  const getPhaseText = () => {
    if (!isActive) return '';
    switch (phase) {
      case 'inhale': return 'Inhale deeply through your nose';
      case 'hold1': return 'Hold your breath';
      case 'exhale': return 'Exhale slowly through your mouth';
      case 'hold2': return 'Hold your breath';
      default: return '';
    }
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const cycleProgress = (completedCycles / targetCycles) * 100;
  
  return (
    <div className="flex flex-col space-y-6">
      <Tabs 
        value={breathingTab} 
        onValueChange={(v) => setBreathingTab(v as 'practice' | 'customize')}
        className="w-full"
      >
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-6">
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
        </TabsList>
        
        <TabsContent value="practice" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2">
              <Card className={`border-0 shadow-lg overflow-hidden bg-gradient-to-br ${
                selectedPattern.id === '4-7-8' ? 'from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40' :
                selectedPattern.id === 'box' ? 'from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40' :
                selectedPattern.id === 'resonant' ? 'from-rose-50 to-orange-50 dark:from-rose-950/40 dark:to-orange-950/40' :
                'from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40'
              }`}>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className={`w-10 h-10 rounded-full bg-white/80 dark:bg-black/20 flex items-center justify-center ${selectedPattern.color}`}>
                      {selectedPattern.icon}
                    </div>
                    <h3 className={`text-xl font-semibold ${selectedPattern.color}`}>{selectedPattern.name}</h3>
                  </div>
                  
                  <div className="flex justify-center mb-8">
                    <div className="relative h-64 w-64">
                      {/* Outer decorative circles */}
                      <motion.div 
                        className="absolute inset-0 rounded-full border-2 border-blue-200/30 dark:border-blue-300/10"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ 
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      />
                      <motion.div 
                        className="absolute inset-8 rounded-full border-2 border-blue-300/40 dark:border-blue-400/20"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ 
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                      />
                      
                      {/* Background circle */}
                      <div className="absolute inset-16 rounded-full bg-blue-100/20 dark:bg-blue-900/10" />
                      
                      {/* Progress circle */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke={`hsl(var(--${phase === 'inhale' ? 'blue' : phase === 'exhale' ? 'emerald' : 'amber'}))`}
                          strokeWidth="2.5"
                          strokeDasharray="263.89"
                          strokeDashoffset={263.89 * (1 - phaseProgress)}
                          transform="rotate(-90 50 50)"
                          className="transition-all duration-200 ease-linear"
                          strokeLinecap="round"
                        />
                      </svg>
                      
                      {/* Floating toolbar */}
                      <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 flex flex-col gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer shadow-md">
                          <RotateCcw size={18} />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer shadow-md">
                          <span className="text-lg">⋯</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer shadow-md">
                          <div className="w-5 h-5 bg-purple-500 rounded-full"></div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer shadow-md">
                          <MoveHorizontal size={18} />
                        </div>
                      </div>
                      
                      {/* Breathing animation */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{
                            scale: phase === 'inhale' 
                              ? [1, 1.5] 
                              : phase === 'exhale' 
                                ? [1.5, 1] 
                                : undefined,
                          }}
                          transition={{
                            duration: phase === 'inhale' 
                              ? selectedPattern.inhale 
                              : phase === 'exhale' 
                                ? selectedPattern.exhale 
                                : 0,
                            ease: "easeInOut",
                            times: [0, 1],
                          }}
                          className="h-32 w-32 rounded-full flex items-center justify-center bg-blue-100/40 dark:bg-blue-900/30"
                        >
                          <motion.div 
                            className="h-24 w-24 rounded-full flex items-center justify-center bg-blue-200/50 dark:bg-blue-800/50"
                            whileHover={{ scale: 1.05 }}
                          >
                            <motion.div 
                              className={`h-16 w-16 rounded-full flex items-center justify-center ${
                                isActive 
                                  ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800' 
                                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700'
                              } text-white cursor-pointer shadow-md transition-all duration-200 ease-in-out hover:shadow-lg`}
                              onClick={handlePlayPause}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              animate={isActive ? {} : { 
                                scale: [1, 1.05, 1],
                                boxShadow: [
                                  "0 4px 6px rgba(59, 130, 246, 0.2)", 
                                  "0 8px 15px rgba(59, 130, 246, 0.3)", 
                                  "0 4px 6px rgba(59, 130, 246, 0.2)"
                                ]
                              }}
                              transition={{
                                duration: 2,
                                repeat: isActive ? 0 : Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              {isActive ? (
                                <div className="flex items-center justify-center relative">
                                  <div className="absolute w-full h-full flex items-center justify-center">
                                    <Pause size={22} className="opacity-30" />
                                  </div>
                                  <span className="font-medium text-lg">{Math.ceil(timeLeft)}</span>
                                </div>
                              ) : (
                                <Play size={30} className="ml-1" />
                              )}
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </div>
                      
                      {/* Status text */}
                      <div className="absolute inset-x-0 bottom-[-50px] text-center">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={phase}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="text-base font-medium text-blue-700/80 dark:text-blue-300/80"
                          >
                            {getPhaseText()}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-5">
                    {!isActive && completedCycles === 0 && (
                      <div className="text-sm text-blue-500/80 dark:text-blue-400/80 mt-2 mb-4 animate-pulse">
                        Click the circle to begin
                      </div>
                    )}
                    
                    <div className="flex items-center justify-center space-x-4">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-blue-200/50 dark:border-blue-700/50"
                        onClick={handleReset}
                        disabled={!isActive && completedCycles === 0}
                      >
                        <RotateCcw size={20} className="text-blue-500/80" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-blue-200/50 dark:border-blue-700/50"
                        onClick={() => setShowGuide(!showGuide)}
                      >
                        <Info size={20} className="text-blue-500/80" />
                      </Button>
                    </div>
                    
                    {(isActive || completedCycles > 0) && (
                      <AnimatedTransition variant="fadeIn" className="w-full max-w-sm">
                        <div className="flex justify-between items-center text-sm text-foreground/70 mb-1">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>Session: {formatTime(sessionDuration)}</span>
                          </div>
                          <div>
                            <span>Cycles: {completedCycles}/{targetCycles}</span>
                          </div>
                        </div>
                        <div className="w-full bg-white/20 dark:bg-black/20 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${cycleProgress}%` }}
                          />
                        </div>
                      </AnimatedTransition>
                    )}
                  </div>
                  
                  {showGuide && (
                    <AnimatedTransition variant="fadeIn" className="mt-8">
                      <div className="bg-white/40 dark:bg-white/5 rounded-xl p-4">
                        <h4 className="font-medium mb-2 text-blue-700/90 dark:text-blue-300/90">Pattern Guide</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          <div className="bg-white/50 dark:bg-white/10 p-2 rounded-lg text-center">
                            <div className="text-blue-500 dark:text-blue-400 font-medium">Inhale</div>
                            <div className="text-lg">{selectedPattern.inhale}s</div>
                          </div>
                          <div className="bg-white/50 dark:bg-white/10 p-2 rounded-lg text-center">
                            <div className="text-amber-500 dark:text-amber-400 font-medium">Hold</div>
                            <div className="text-lg">{selectedPattern.hold1}s</div>
                          </div>
                          <div className="bg-white/50 dark:bg-white/10 p-2 rounded-lg text-center">
                            <div className="text-emerald-500 dark:text-emerald-400 font-medium">Exhale</div>
                            <div className="text-lg">{selectedPattern.exhale}s</div>
                          </div>
                          <div className="bg-white/50 dark:bg-white/10 p-2 rounded-lg text-center">
                            <div className="text-amber-500 dark:text-amber-400 font-medium">Hold</div>
                            <div className="text-lg">{selectedPattern.hold2}s</div>
                          </div>
                        </div>
                      </div>
                    </AnimatedTransition>
                  )}
                </div>
              </Card>
            </div>
            
            <div className="col-span-1">
              <Card className="border-0 shadow-lg h-full">
                <div className="p-5 flex flex-col h-full">
                  <h3 className="text-lg font-medium mb-4">Breathing Patterns</h3>
                  
                  <div className="space-y-3 flex-grow">
                    {breathingPatterns.map((pattern) => (
                      <button
                        key={pattern.id}
                        onClick={() => handleSelectPattern(pattern.id)}
                        disabled={isActive}
                        className={`w-full flex items-center p-3 rounded-lg transition-all ${
                          selectedPattern.id === pattern.id
                            ? 'bg-blue-50 shadow-sm border-l-4 border-blue-500 dark:bg-blue-900/20 dark:border-blue-400'
                            : 'bg-white hover:bg-gray-50 dark:bg-gray-800/20 dark:hover:bg-gray-800/30'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 shadow-sm ${
                          pattern.id === '4-7-8' ? 'text-indigo-500 dark:text-indigo-400' :
                          pattern.id === 'box' ? 'text-blue-500 dark:text-blue-400' :
                          pattern.id === 'resonant' ? 'text-rose-500 dark:text-rose-400' :
                          'text-amber-500 dark:text-amber-400'
                        }`}>
                          {pattern.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-gray-800 dark:text-gray-200">{pattern.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {pattern.inhale}-{pattern.hold1}-{pattern.exhale}-{pattern.hold2}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Benefits</h4>
                    <ul className="space-y-1.5">
                      {selectedPattern.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm mt-3 text-gray-600 dark:text-gray-400">
                      {selectedPattern.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-400 dark:text-gray-500 flex items-center">
                    <Save size={12} className="mr-1" />
                    <span>Your practice is saved automatically</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="customize" className="mt-0">
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-6">Customize Your Experience</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Target Cycles</h4>
                    <div className="flex items-center">
                      <Slider 
                        value={[targetCycles]} 
                        min={1} 
                        max={30} 
                        step={1} 
                        onValueChange={(value) => setTargetCycles(value[0])}
                        className="flex-grow"
                        disabled={isActive}
                      />
                      <span className="ml-4 w-8 text-center">{targetCycles}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <Info size={16} />
                      </div>
                      <span>Show Pattern Guide</span>
                    </div>
                    <Switch 
                      checked={showGuide} 
                      onCheckedChange={setShowGuide} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <Moon size={16} />
                      </div>
                      <span>Background Sounds</span>
                    </div>
                    <Switch 
                      checked={backgroundSounds} 
                      onCheckedChange={setBackgroundSounds} 
                    />
                  </div>
                </div>
                
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Tips for Effective Practice</h4>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <p>Find a quiet, comfortable position where you can sit or lie down</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <p>Breathe through your nose during inhalation when possible</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <p>Try breathing into your diaphragm (belly) rather than your chest</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <p>Practice at the same time each day to build a healthy habit</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <p>Start with shorter sessions (5 minutes) and gradually increase</p>
                    </li>
                  </ul>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">My Practice Streak</span>
                      <span className="text-primary">3 days</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      {[1, 2, 3, 4, 5, 6, 7].map(day => (
                        <div 
                          key={day} 
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            day <= 3 ? 'bg-primary text-primary-foreground' : 'bg-secondary/50'
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BreathingExercise;

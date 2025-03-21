import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpenText, Play, Pause, RotateCcw, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

interface MindfulnessExercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  instructions: string[];
}

const mindfulnessExercises: MindfulnessExercise[] = [
  {
    id: 'body-scan',
    title: 'Body Scan Meditation',
    description: 'Gradually focus attention on different parts of your body, noticing sensations without judgment.',
    duration: 300, // 5 minutes
    instructions: [
      'Find a comfortable position either sitting or lying down',
      'Take a few deep breaths to center yourself',
      'Begin to focus your attention on your feet, noticing any sensations',
      'Slowly move your attention up through your legs, torso, arms, and head',
      'Notice any areas of tension, discomfort, or relaxation without judgment',
      'If your mind wanders, gently bring it back to your body sensations',
      "When you've completed the scan, take a few deep breaths",
      'Slowly open your eyes and notice how you feel'
    ]
  },
  {
    id: 'mindful-breathing',
    title: 'Mindful Breathing',
    description: 'Focus your attention on your breath, observing it without trying to change it.',
    duration: 180, // 3 minutes
    instructions: [
      'Sit in a comfortable position with your back straight',
      'Close your eyes or maintain a soft gaze',
      'Focus your attention on your breathing',
      'Notice the sensation of air moving in and out of your body',
      'When your mind wanders, gently bring your focus back to your breath',
      'Continue for the duration without judging yourself when distracted',
      'Simply notice thoughts and let them pass like clouds in the sky',
      'Finish by taking a deeper breath and gently opening your eyes'
    ]
  },
  {
    id: 'five-senses',
    title: '5-4-3-2-1 Grounding Exercise',
    description: 'Engage all five senses to anchor yourself in the present moment.',
    duration: 120, // 2 minutes
    instructions: [
      'Look around and name 5 things you can see',
      'Acknowledge 4 things you can touch or feel',
      'Notice 3 things you can hear right now',
      'Identify 2 things you can smell (or like the smell of)',
      'Name 1 thing you can taste (or like the taste of)',
      'Take a deep breath and notice how you feel more grounded',
      'Repeat if needed to feel fully present in the moment'
    ]
  }
];

const MindfulnessExercises: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<MindfulnessExercise>(mindfulnessExercises[0]);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [exerciseComplete, setExerciseComplete] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    setTimeLeft(selectedExercise.duration);
    setCurrentStep(0);
    setExerciseComplete(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setIsActive(false);
    }
  }, [selectedExercise]);
  
  useEffect(() => {
    if (!isActive) return;
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!);
          setIsActive(false);
          setExerciseComplete(true);
          return 0;
        }
        
        // Change instruction step every portion of the total time
        const stepTime = selectedExercise.duration / selectedExercise.instructions.length;
        const newStep = selectedExercise.instructions.length - Math.ceil(prevTime / stepTime);
        if (newStep !== currentStep && newStep < selectedExercise.instructions.length) {
          setCurrentStep(newStep);
        }
        
        return prevTime - 1;
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, selectedExercise, currentStep]);
  
  const handlePlayPause = () => {
    setIsActive(!isActive);
  };
  
  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    setTimeLeft(selectedExercise.duration);
    setCurrentStep(0);
    setExerciseComplete(false);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-4">
        <h3 className="heading-sm text-accent">Mindfulness Exercises</h3>
        <p className="paragraph">
          Mindfulness techniques to help you focus on the present moment, reduce stress, and increase self-awareness.
        </p>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="about">
            <AccordionTrigger className="text-primary">
              <div className="flex items-center">
                <BookOpenText size={18} className="mr-2" />
                About mindfulness
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-4 space-y-3 bg-secondary/30 rounded-md">
                <p className="paragraph text-sm">
                  Mindfulness is the practice of purposely focusing your attention on the present moment and accepting it without judgment.
                </p>
                <p className="paragraph text-sm">
                  Regular mindfulness practice can reduce stress, anxiety, and depression while improving focus, emotional regulation, and overall well-being.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <Card className="p-5 border-accent/20 shadow-md">
        <h4 className="font-medium mb-4 text-lg text-primary">Choose an Exercise</h4>
        <RadioGroup 
          value={selectedExercise.id} 
          onValueChange={(value) => {
            const exercise = mindfulnessExercises.find(ex => ex.id === value);
            if (exercise) setSelectedExercise(exercise);
          }}
          className="space-y-4"
        >
          {mindfulnessExercises.map((exercise) => (
            <div key={exercise.id} className="flex items-start space-x-3 p-3 rounded-lg transition-colors hover:bg-secondary/30">
              <RadioGroupItem value={exercise.id} id={exercise.id} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor={exercise.id} className="text-base font-medium cursor-pointer flex items-center">
                  {exercise.title} 
                  <span className="ml-2 text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {Math.floor(exercise.duration / 60)} min
                  </span>
                </Label>
                <p className="paragraph text-sm mt-1">{exercise.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </Card>
      
      <Card className="p-6 shadow-lg border-0 overflow-hidden bg-gradient-to-br from-background to-secondary/30">
        <div className="flex flex-col items-center">
          {exerciseComplete ? (
            <div className="flex flex-col items-center py-8">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-5 shadow-inner">
                <CheckCheck className="h-10 w-10 text-accent" />
              </div>
              <h4 className="heading-sm text-accent mb-2">Exercise Complete!</h4>
              <p className="paragraph text-center max-w-md mb-8">
                You've completed your mindfulness practice. Take a moment to notice how you feel right now.
              </p>
              <Button onClick={handleReset} variant="outline" className="px-8 py-6 rounded-full border-2">
                <RotateCcw size={18} className="mr-2" />
                Practice Again
              </Button>
            </div>
          ) : (
            <>
              <div className="w-full flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">{selectedExercise.title}</h4>
                    <div className="text-lg font-mono font-semibold">{formatTime(timeLeft)}</div>
                  </div>
                </div>
                <div className="bg-accent/10 text-accent rounded-full px-3 py-1 text-sm font-medium">
                  Step {currentStep + 1} of {selectedExercise.instructions.length}
                </div>
              </div>
              
              <div className="w-full mb-8">
                <Progress value={(1 - timeLeft / selectedExercise.duration) * 100} className="h-3 rounded-full" />
              </div>
              
              <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl mb-8 min-h-[150px] w-full flex items-center justify-center shadow-sm border border-accent/10">
                <p className="paragraph text-center text-lg font-medium">
                  {isActive 
                    ? selectedExercise.instructions[currentStep]
                    : "Press Start to begin the exercise"}
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-6">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-12 h-12 border-2"
                  onClick={handleReset}
                  disabled={!isActive && timeLeft === selectedExercise.duration}
                >
                  <RotateCcw size={20} />
                </Button>
                
                <Button
                  size="lg"
                  className="rounded-full px-10 py-6 bg-accent hover:bg-accent/90 shadow-md"
                  onClick={handlePlayPause}
                  disabled={timeLeft === 0}
                >
                  {isActive ? <Pause size={22} /> : <Play size={22} />}
                  <span className="ml-2 text-lg">{isActive ? 'Pause' : 'Start'}</span>
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MindfulnessExercises; 
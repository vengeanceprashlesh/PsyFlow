import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpenText, Play, Pause, RotateCcw, Heart, TreePine, Waves, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import AnimatedTransition from '@/components/shared/AnimatedTransition';

interface VisualizationScene {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  script: string[];
  duration: number; // seconds
  backgroundImage: string;
}

const visualizations: VisualizationScene[] = [
  {
    id: 'peaceful-place',
    title: 'Safe Peaceful Place',
    description: 'Imagine yourself in a personally meaningful place of comfort and safety.',
    icon: Heart,
    color: 'text-rose-500',
    backgroundImage: 'linear-gradient(to right, #ff9a9e, #fad0c4 99%, #fad0c4 100%)',
    duration: 300, // 5 minutes
    script: [
      "Find a comfortable position and close your eyes. Take a few deep breaths, in through your nose and out through your mouth.",
      "Imagine a place where you feel completely safe, peaceful, and content. This could be a real place you've visited, or somewhere created entirely in your imagination.",
      "Begin to create this place in your mind with as much detail as possible. What does it look like?",
      "Notice the colors, shapes, and light in this peaceful place. Are you indoors or outdoors?",
      "Now, become aware of any sounds in your peaceful place. Perhaps there are birds singing, leaves rustling, or waves gently lapping at a shore.",
      "What can you feel in this place? Is there a gentle breeze against your skin? The warmth of sunshine? The softness of sand beneath your feet?",
      "Are there any pleasant scents in your peaceful place? Maybe the smell of flowers, the ocean, or fresh mountain air.",
      "Take some time to fully experience being in this safe, peaceful place. Know that you can return here anytime you need to feel calm and centered.",
      "This place is always within you, accessible whenever you need its comfort and peace.",
      "When you're ready, slowly bring your awareness back to the room, taking with you the peaceful feelings from your special place."
    ]
  },
  {
    id: 'forest',
    title: 'Forest Meditation',
    description: 'Walk through a lush, vibrant forest to connect with nature and find inner calm.',
    icon: TreePine,
    color: 'text-emerald-500',
    backgroundImage: 'linear-gradient(to right, #00b09b, #96c93d)',
    duration: 360, // 6 minutes
    script: [
      "Make yourself comfortable and close your eyes. Take several deep, cleansing breaths.",
      "Imagine yourself standing at the edge of a beautiful forest. The day is perfect – not too hot or cold.",
      "As you step onto the path leading into the forest, notice how the ground feels beneath your feet. Is it soft with pine needles or leaves? Or perhaps a firm dirt path?",
      "With each step, you move deeper into the forest. The canopy of trees above filters the sunlight, creating patterns of light and shadow on the ground.",
      "Listen to the sounds of the forest – birds calling to each other, leaves rustling in the gentle breeze, perhaps the distant sound of water flowing.",
      "Take a deep breath and smell the rich, earthy scent of the forest. Notice the freshness of the air as it fills your lungs.",
      "As you continue walking, you come across a small clearing bathed in dappled sunlight. In the center is a comfortable place for you to sit and rest.",
      "Sitting down, you feel supported by the earth beneath you. Look around and appreciate the beauty of the trees, plants, and wildlife around you.",
      "Feel a connection growing between you and the forest. With each breath, imagine drawing in the forest's energy, vitality, and peace.",
      "When you're ready to leave, stand up and thank the forest for its gifts of beauty and tranquility.",
      "Begin walking back along the path, knowing you can return to this forest whenever you wish.",
      "Gradually become aware of your surroundings again, bringing with you the peace and renewal of the forest."
    ]
  },
  {
    id: 'beach',
    title: 'Ocean Relaxation',
    description: 'Visit a serene beach and let the rhythm of the waves wash away tension.',
    icon: Waves,
    color: 'text-sky-500',
    backgroundImage: 'linear-gradient(to right, #4facfe, #00f2fe)',
    duration: 300, // 5 minutes
    script: [
      "Close your eyes and settle into a comfortable position. Begin by taking slow, deep breaths.",
      "Imagine yourself walking toward a beautiful, pristine beach. The sky is clear and blue, with just a few soft, white clouds.",
      "As you approach the shoreline, feel the warm sand between your toes. Each step is slow and deliberate, helping you feel more relaxed.",
      "Find the perfect spot and sit or lie down on the warm sand. Feel its gentle support beneath you.",
      "Look out at the ocean – notice its color, the way the light sparkles on the surface of the water.",
      "Listen to the rhythmic sound of the waves as they roll in and out. Each wave that comes to shore brings relaxation, and each wave that recedes takes with it any tension or stress.",
      "Feel the warmth of the sun on your skin, balanced by a refreshing ocean breeze that gently caresses your face.",
      "Breathe in deeply and smell the fresh, salty air. With each inhale, you draw in energy and peace. With each exhale, you release any remaining tension.",
      "Spend some time simply being present on this beach, absorbing its beauty and tranquility.",
      "When you're ready to leave, stand up and take one last look at the endless horizon where sky meets sea.",
      "Begin to bring your awareness back to your surroundings, knowing you can return to this peaceful beach anytime you need to relax and rebalance."
    ]
  },
  {
    id: 'healing-light',
    title: 'Healing Light',
    description: 'Visualize healing energy flowing through your body, promoting wellness and relaxation.',
    icon: Sun,
    color: 'text-amber-500',
    backgroundImage: 'linear-gradient(to right, #f6d365, #fda085)',
    duration: 270, // 4.5 minutes
    script: [
      "Find a comfortable position where you won't be disturbed. Take a few moments to settle in and begin taking slow, deep breaths.",
      "Imagine a sphere of healing light hovering above you. This light can be any color that represents healing and wellbeing to you.",
      "As you continue breathing deeply, imagine this light beginning to descend toward you, growing larger and more radiant.",
      "The sphere of light gently touches the top of your head and begins to melt into you, like warm honey flowing downward.",
      "Feel the healing light flow down through your head, dissolving any tension it encounters. Your mind becomes clear and calm.",
      "The light continues to move down through your neck and shoulders, releasing any tightness or discomfort stored there.",
      "Allow the healing light to flow down your arms, all the way to your fingertips, bringing warmth and relaxation.",
      "The light moves into your chest, surrounding your heart with healing energy. Feel your heart beating steadily and strong.",
      "With each breath, the light expands within your torso, flowing around your organs, bringing balance and vitality.",
      "The healing light streams down through your lower body, hips, legs, and feet, until your entire body is filled with this gentle, healing energy.",
      "Your whole being is now illuminated from within. Feel the light pulsing subtly with each heartbeat, bringing healing wherever it's needed.",
      "Spend a few moments in this state of complete illumination, allowing the healing to take place at every level of your being.",
      "When you're ready to conclude, know that this healing light remains within you, continuing its work even as you return to your normal activities."
    ]
  }
];

const GuidedVisualizations: React.FC = () => {
  const [selectedVisualization, setSelectedVisualization] = useState<VisualizationScene>(visualizations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    handleReset();
  }, [selectedVisualization]);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const lineDuration = selectedVisualization.duration / selectedVisualization.script.length;
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!);
          setIsPlaying(false);
          return 0;
        }
        
        const newCurrentLine = selectedVisualization.script.length - Math.ceil(prevTime / lineDuration);
        if (newCurrentLine !== currentLine && newCurrentLine < selectedVisualization.script.length) {
          setCurrentLine(newCurrentLine);
        }
        
        return prevTime - 1;
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, selectedVisualization, currentLine]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
    setTimeLeft(selectedVisualization.duration);
    setCurrentLine(0);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-4">
        <h3 className="heading-sm text-accent">Guided Visualizations</h3>
        <p className="paragraph">
          Use the power of your imagination to create calming mental images that promote relaxation and healing.
        </p>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="about">
            <AccordionTrigger className="text-primary">
              <div className="flex items-center">
                <BookOpenText size={18} className="mr-2" />
                About guided imagery
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-4 space-y-3 bg-secondary/30 rounded-md">
                <p className="paragraph text-sm">
                  Guided visualization uses sensory-rich imagery to create a positive mental experience that can reduce stress and anxiety.
                </p>
                <p className="paragraph text-sm">
                  Research shows that this technique can lower blood pressure, reduce pain, improve immune function, and enhance overall wellbeing by triggering the relaxation response.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visualizations.map((vis) => {
          const Icon = vis.icon;
          return (
            <Card
              key={vis.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-xl ${
                selectedVisualization.id === vis.id 
                  ? 'border-2 border-primary/50 bg-primary/5' 
                  : 'hover:border-accent/30'
              }`}
              onClick={() => !isPlaying && setSelectedVisualization(vis)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${vis.color} bg-opacity-10 p-2 shadow-sm`}>
                  <Icon size={24} className={vis.color} />
                </div>
                <div>
                  <h4 className="font-medium text-lg">{vis.title}</h4>
                  <p className="paragraph text-xs">{Math.floor(vis.duration / 60)} min</p>
                </div>
              </div>
              <p className="paragraph text-sm mt-3">{vis.description}</p>
            </Card>
          );
        })}
      </div>
      
      <Card className="p-0 overflow-hidden shadow-lg border-0">
        <div 
          className="h-36 bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: selectedVisualization.backgroundImage }}
        >
          <h3 className="heading-md text-white drop-shadow-lg bg-black/20 px-6 py-2 rounded-lg">
            {selectedVisualization.title}
          </h3>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <selectedVisualization.icon className={`${selectedVisualization.color} mr-2`} size={20} />
              <span className="text-sm font-medium">Guided Visualization</span>
            </div>
            <div className="text-lg font-mono font-semibold">{formatTime(timeLeft)}</div>
          </div>
          
          <Progress 
            value={(1 - timeLeft / selectedVisualization.duration) * 100} 
            className="h-2 mb-6" 
          />
          
          <ScrollArea className="h-48 mb-6 rounded-md border p-4 bg-secondary/20">
            {selectedVisualization.script.map((line, index) => (
              <p 
                key={index}
                className={`paragraph mb-3 ${
                  index === currentLine && isPlaying
                    ? 'text-accent font-semibold'
                    : index < currentLine
                      ? 'text-foreground/70'
                      : 'text-foreground/40'
                }`}
              >
                {line}
              </p>
            ))}
          </ScrollArea>
          
          <div className="flex items-center justify-center space-x-6">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-2"
              onClick={handleReset}
              disabled={!isPlaying && timeLeft === selectedVisualization.duration}
            >
              <RotateCcw size={20} />
            </Button>
            
            <Button
              size="lg"
              className="rounded-full px-10 py-6 bg-accent hover:bg-accent/90 shadow-md"
              onClick={handlePlayPause}
              disabled={timeLeft === 0}
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} />}
              <span className="ml-2 text-lg">{isPlaying ? 'Pause' : 'Start'}</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GuidedVisualizations; 
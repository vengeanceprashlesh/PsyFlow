import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedTransition from '@/components/shared/AnimatedTransition';
import CognitiveRestructuring from './CognitiveRestructuring';
import GuidedVisualizations from './GuidedVisualizations';
import MindfulnessExercises from './MindfulnessExercises';
import { 
  Brain, 
  Leaf, 
  HeartPulse, 
  Cloud, 
  Sparkles,
  FlaskConical,
  Zap,
  BookOpen,
  Pencil,
  Clock,
  UserCircle,
  ArrowRight,
  Filter,
  Smile,
  ExternalLink
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const TechniqueCard = ({ title, description, tags, evidence, type, icon, difficulty }) => {
  const getBgColor = () => {
    switch (type) {
      case 'cbt': return 'bg-blue-50 dark:bg-blue-950/30';
      case 'act': return 'bg-purple-50 dark:bg-purple-950/30';
      case 'dbt': return 'bg-teal-50 dark:bg-teal-950/30';
      case 'positive': return 'bg-amber-50 dark:bg-amber-950/30';
      case 'behavioral': return 'bg-indigo-50 dark:bg-indigo-950/30';
      default: return 'bg-gray-50 dark:bg-gray-900/30';
    }
  };
  
  const getTagColor = (tag) => {
    switch (tag) {
      case 'Anxiety': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
      case 'Depression': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300';
      case 'Stress': return 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300';
      case 'Trauma': return 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300';
      case 'Sleep': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300';
      case 'Focus': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300';
      case 'Relationships': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300';
      case 'Self-esteem': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  const getEvidenceColor = () => {
    switch (evidence) {
      case 'Strong': return 'text-emerald-600 dark:text-emerald-400';
      case 'Moderate': return 'text-amber-600 dark:text-amber-400';
      case 'Limited': return 'text-gray-600 dark:text-gray-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };
  
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 dark:text-green-400';
      case 'Intermediate': return 'text-amber-600 dark:text-amber-400';
      case 'Advanced': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };
  
  return (
    <motion.div 
      className={`p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all ${getBgColor()}`}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-lg text-gray-900 dark:text-gray-100">{title}</h4>
          <div className="flex items-center gap-1.5 text-xs mt-1">
            <span className={getEvidenceColor()}>
              <FlaskConical size={12} className="inline mr-1" />
              {evidence} evidence
            </span>
            <span className="text-gray-400">•</span>
            <span className={getDifficultyColor()}>
              {difficulty}
            </span>
          </div>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{description}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags.map(tag => (
          <Badge key={tag} variant="secondary" className={getTagColor(tag)}>
            {tag}
          </Badge>
        ))}
      </div>
      <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80 p-0 h-auto text-sm flex items-center gap-1">
        Learn technique <ArrowRight size={14} />
      </Button>
    </motion.div>
  );
};

const PsychologyTechniques: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cbt');
  const [filter, setFilter] = useState('all');
  
  // Comprehensive list of techniques with detailed information
  const techniques = {
    cbt: [
      {
        title: "Cognitive Restructuring",
        description: "Learn to identify, challenge, and change negative thought patterns that contribute to emotional distress.",
        tags: ["Anxiety", "Depression", "Stress"],
        evidence: "Strong",
        difficulty: "Intermediate",
        icon: <Brain className="h-5 w-5 text-blue-500" />
      },
      {
        title: "Thought Records",
        description: "Document thoughts, emotions, and evidence to evaluate the accuracy of negative thinking patterns.",
        tags: ["Anxiety", "Depression"],
        evidence: "Strong",
        difficulty: "Intermediate",
        icon: <Pencil className="h-5 w-5 text-blue-500" />
      },
      {
        title: "Exposure Therapy",
        description: "Gradually face fears in a controlled way to reduce anxiety and avoidance behaviors.",
        tags: ["Anxiety", "Trauma"],
        evidence: "Strong",
        difficulty: "Advanced",
        icon: <Zap className="h-5 w-5 text-blue-500" />
      },
      {
        title: "Socratic Questioning",
        description: "Use guided questions to explore and test the validity of automatic negative thoughts.",
        tags: ["Depression", "Anxiety"],
        evidence: "Moderate",
        difficulty: "Intermediate",
        icon: <BookOpen className="h-5 w-5 text-blue-500" />
      },
      {
        title: "Behavioral Experiments",
        description: "Test the validity of beliefs through targeted real-world experiences.",
        tags: ["Anxiety", "Depression"],
        evidence: "Strong",
        difficulty: "Intermediate",
        icon: <FlaskConical className="h-5 w-5 text-blue-500" />
      }
    ],
    mindfulness: [
      {
        title: "Body Scan Meditation",
        description: "Focus attention on different parts of your body to increase present moment awareness and reduce tension.",
        tags: ["Stress", "Anxiety", "Sleep"],
        evidence: "Strong",
        difficulty: "Beginner",
        icon: <Leaf className="h-5 w-5 text-green-500" />
      },
      {
        title: "Mindful Breathing",
        description: "Focus on the sensation of breath to anchor yourself in the present moment and calm the mind.",
        tags: ["Anxiety", "Stress", "Focus"],
        evidence: "Strong",
        difficulty: "Beginner",
        icon: <Leaf className="h-5 w-5 text-green-500" />
      },
      {
        title: "Urge Surfing",
        description: "Observe cravings and urges without acting on them, treating them as waves that rise and fall.",
        tags: ["Anxiety", "Behavioral Control"],
        evidence: "Moderate",
        difficulty: "Intermediate",
        icon: <Leaf className="h-5 w-5 text-green-500" />
      },
      {
        title: "R.A.I.N Practice",
        description: "Recognize, Allow, Investigate, and Nurture difficult emotions to process them mindfully.",
        tags: ["Anxiety", "Depression", "Stress"],
        evidence: "Moderate",
        difficulty: "Intermediate",
        icon: <Leaf className="h-5 w-5 text-green-500" />
      },
      {
        title: "Mindful Walking",
        description: "Bring attention to the physical sensations of walking to calm the mind and connect with the body.",
        tags: ["Stress", "Focus"],
        evidence: "Moderate",
        difficulty: "Beginner",
        icon: <Leaf className="h-5 w-5 text-green-500" />
      }
    ],
    stress: [
      {
        title: "Progressive Muscle Relaxation",
        description: "Systematically tense and relax muscle groups to reduce physical tension and stress.",
        tags: ["Anxiety", "Stress", "Sleep"],
        evidence: "Strong",
        difficulty: "Beginner",
        icon: <HeartPulse className="h-5 w-5 text-rose-500" />
      },
      {
        title: "Diaphragmatic Breathing",
        description: "Practice deep belly breathing to activate the parasympathetic nervous system and reduce stress.",
        tags: ["Anxiety", "Stress"],
        evidence: "Strong",
        difficulty: "Beginner",
        icon: <HeartPulse className="h-5 w-5 text-rose-500" />
      },
      {
        title: "Stress Inoculation Training",
        description: "Build resilience by gradually exposing yourself to stressors while employing coping strategies.",
        tags: ["Anxiety", "Stress", "Trauma"],
        evidence: "Strong",
        difficulty: "Advanced",
        icon: <HeartPulse className="h-5 w-5 text-rose-500" />
      },
      {
        title: "Time Management Techniques",
        description: "Structure your day to reduce stress through prioritization and scheduling.",
        tags: ["Stress", "Focus"],
        evidence: "Moderate",
        difficulty: "Intermediate",
        icon: <Clock className="h-5 w-5 text-rose-500" />
      },
      {
        title: "Self-Compassion Practice",
        description: "Treat yourself with the same kindness you would offer to a good friend during difficult times.",
        tags: ["Stress", "Depression", "Self-esteem"],
        evidence: "Strong",
        difficulty: "Intermediate",
        icon: <HeartPulse className="h-5 w-5 text-rose-500" />
      }
    ],
    visualization: [
      {
        title: "Safe Place Visualization",
        description: "Create a detailed mental image of a place where you feel completely safe and at peace.",
        tags: ["Anxiety", "Trauma", "Stress"],
        evidence: "Moderate",
        difficulty: "Beginner",
        icon: <Cloud className="h-5 w-5 text-purple-500" />
      },
      {
        title: "Healing Light Visualization",
        description: "Imagine healing light flowing through your body, restoring and rejuvenating you.",
        tags: ["Depression", "Stress", "Self-esteem"],
        evidence: "Limited",
        difficulty: "Beginner",
        icon: <Sparkles className="h-5 w-5 text-amber-500" />
      },
      {
        title: "Future Success Visualization",
        description: "Mentally rehearse achieving your goals to build confidence and motivation.",
        tags: ["Depression", "Self-esteem", "Focus"],
        evidence: "Moderate",
        difficulty: "Beginner",
        icon: <Cloud className="h-5 w-5 text-purple-500" />
      },
      {
        title: "Graded Exposure in Imagination",
        description: "Mentally face difficult situations in a controlled, gradual way to reduce anxiety.",
        tags: ["Anxiety", "Trauma"],
        evidence: "Strong",
        difficulty: "Advanced",
        icon: <Cloud className="h-5 w-5 text-purple-500" />
      },
      {
        title: "Inner Mentor Dialogue",
        description: "Visualize a wise mentor or future self and engage in an internal dialogue for guidance.",
        tags: ["Depression", "Self-esteem", "Relationships"],
        evidence: "Limited",
        difficulty: "Intermediate",
        icon: <UserCircle className="h-5 w-5 text-purple-500" />
      }
    ],
    act: [
      {
        title: "Values Clarification",
        description: "Identify core personal values to guide meaningful action despite difficult thoughts and feelings.",
        tags: ["Depression", "Focus", "Self-esteem"],
        evidence: "Strong",
        difficulty: "Intermediate",
        icon: <Sparkles className="h-5 w-5 text-indigo-500" />
      },
      {
        title: "Cognitive Delusion",
        description: "Create distance from thoughts by seeing them as mental events rather than literal truths.",
        tags: ["Anxiety", "Depression"],
        evidence: "Strong",
        difficulty: "Intermediate",
        icon: <Brain className="h-5 w-5 text-indigo-500" />
      },
      {
        title: "Acceptance Exercises",
        description: "Practice accepting uncomfortable emotions rather than fighting against them.",
        tags: ["Anxiety", "Depression", "Stress"],
        evidence: "Strong",
        difficulty: "Intermediate",
        icon: <HeartPulse className="h-5 w-5 text-indigo-500" />
      },
      {
        title: "Present Moment Awareness",
        description: "Ground yourself in the here and now to reduce rumination and worry.",
        tags: ["Anxiety", "Stress", "Focus"],
        evidence: "Strong",
        difficulty: "Beginner",
        icon: <Leaf className="h-5 w-5 text-indigo-500" />
      },
      {
        title: "Committed Action",
        description: "Take concrete steps aligned with your values despite internal obstacles.",
        tags: ["Depression", "Self-esteem"],
        evidence: "Moderate",
        difficulty: "Intermediate",
        icon: <Zap className="h-5 w-5 text-indigo-500" />
      }
    ]
  };
  
  const getFilteredTechniques = () => {
    const currentTechniques = techniques[activeTab] || [];
    if (filter === 'all') return currentTechniques;
    return currentTechniques.filter(tech => tech.tags.includes(filter));
  };
  
  const tags = ["All", "Anxiety", "Depression", "Stress", "Trauma", "Sleep", "Focus", "Relationships", "Self-esteem"];
  
  return (
    <AnimatedTransition variant="fadeIn">
      <Card className="p-6 shadow-lg border-0 bg-gradient-to-r from-background via-background/98 to-background/95">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 mb-2">
            Evidence-Based Psychology Techniques
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Explore scientifically validated techniques to support your mental wellbeing and personal growth.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 w-full mb-6 bg-secondary/20 p-1 rounded-xl">
            <TabsTrigger 
              value="cbt" 
              className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-md"
            >
              <div className="flex flex-col items-center py-1 space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2">
                <Brain size={18} />
                <span className="text-xs sm:text-sm">CBT</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="mindfulness" 
              className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-md"
            >
              <div className="flex flex-col items-center py-1 space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2">
                <Leaf size={18} />
                <span className="text-xs sm:text-sm">Mindfulness</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="stress" 
              className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-md"
            >
              <div className="flex flex-col items-center py-1 space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2">
                <HeartPulse size={18} />
                <span className="text-xs sm:text-sm">Stress</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="visualization" 
              className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-md"
            >
              <div className="flex flex-col items-center py-1 space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2">
                <Cloud size={18} />
                <span className="text-xs sm:text-sm">Visualization</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="act" 
              className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-md"
            >
              <div className="flex flex-col items-center py-1 space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2">
                <Sparkles size={18} />
                <span className="text-xs sm:text-sm">ACT</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex flex-wrap gap-2 mb-6 items-center">
            <div className="flex items-center mr-2">
              <Filter size={16} className="mr-2 text-primary" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            {tags.map(tag => (
              <Badge 
                key={tag}
                variant="outline" 
                className={`cursor-pointer hover:bg-secondary transition-colors ${
                  (filter === tag.toLowerCase() || (filter === 'all' && tag === 'All')) 
                    ? 'bg-primary/10 border-primary/30 dark:bg-primary/20' 
                    : ''
                }`}
                onClick={() => setFilter(tag === 'All' ? 'all' : tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {getFilteredTechniques().map((technique, index) => (
              <TechniqueCard 
                key={`${activeTab}-${index}`}
                {...technique}
                type={activeTab}
              />
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 max-w-xl text-center">
              <div className="flex justify-center mb-2">
                <Smile className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                These techniques are most effective when practiced regularly. If you're experiencing severe mental health challenges, please consider consulting with a mental health professional.
              </p>
              <Button variant="link" className="text-blue-600 dark:text-blue-400 text-sm mt-1 inline-flex items-center">
                Find professional help <ExternalLink size={14} className="ml-1" />
              </Button>
            </div>
          </div>
        </Tabs>
      </Card>
    </AnimatedTransition>
  );
};

export default PsychologyTechniques; 
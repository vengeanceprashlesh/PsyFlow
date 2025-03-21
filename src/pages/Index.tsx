import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, BarChart2, Wind, Book, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AnimatedTransition from '@/components/shared/AnimatedTransition';
import ProfileCard from '@/components/profile/ProfileCard';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'AI Psychology Chat',
      description: 'Talk to our AI about your thoughts and feelings, and get guidance based on evidence-based approaches.',
      icon: MessageSquare,
      color: 'bg-blue-500/10 text-blue-500',
      route: '/chat'
    },
    {
      title: 'Mood Tracking',
      description: 'Track your moods over time to identify patterns and gain insights into your emotional wellbeing.',
      icon: BarChart2,
      color: 'bg-purple-500/10 text-purple-500',
      route: '/mood-tracker'
    },
    {
      title: 'Breathing Exercises',
      description: 'Guided breathing techniques to help reduce stress and anxiety in the moment.',
      icon: Wind,
      color: 'bg-green-500/10 text-green-500',
      route: '/breathing'
    },
    {
      title: 'Psychological Techniques',
      description: 'Evidence-based techniques for managing stress, changing negative thought patterns, and building resilience.',
      icon: Lightbulb,
      color: 'bg-yellow-500/10 text-yellow-500',
      route: '/techniques'
    },
    {
      title: 'Reflective Journal',
      description: 'Document your thoughts and feelings to promote self-awareness and emotional processing.',
      icon: Book,
      color: 'bg-amber-500/10 text-amber-500',
      route: '/journal'
    }
  ];

  return (
    <div className="flex flex-col items-center min-h-screen pb-24">
      <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
      
      <div className="w-full max-w-5xl mx-auto px-4 pt-4">
        <AnimatedTransition variant="fadeIn">
          <ProfileCard />
        </AnimatedTransition>
      </div>
      
      <AnimatedTransition variant="fadeIn" className="max-w-3xl mx-auto text-center mb-10 pt-10">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 shadow-sm">
          Psychology Assistant
        </span>
        <h1 className="heading-xl mb-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Mind & Soul</h1>
        <p className="paragraph max-w-2xl mx-auto text-base md:text-lg text-foreground/80 leading-relaxed">
          Your personal AI companion for psychological well-being, providing evidence-based approaches to help you navigate life's challenges.
        </p>
        
        <Button 
          size="lg" 
          className="rounded-full px-8 py-6 mt-8 shadow-md bg-primary hover:bg-primary/90 transition-all"
          onClick={() => navigate('/chat')}
        >
          <MessageSquare size={18} className="mr-2" />
          Talk to your AI assistant
        </Button>
      </AnimatedTransition>

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-16">
        {features.map((feature, i) => (
          <AnimatedTransition 
            key={feature.title} 
            variant="slideUp" 
            delay={i * 0.1}
          >
            <Card className="glass-card p-6 h-full flex flex-col border border-accent/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-5 shadow-sm`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">{feature.title}</h3>
              <p className="paragraph text-foreground/70 flex-grow">{feature.description}</p>
              <Button 
                variant="ghost" 
                className="mt-5 justify-start px-3 py-2 text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg transition-all"
                onClick={() => navigate(feature.route)}
              >
                Get Started <ArrowRight size={16} className="ml-2" />
              </Button>
            </Card>
          </AnimatedTransition>
        ))}
      </div>

      <div className="w-full h-24 bg-gradient-to-t from-background/80 via-background/50 to-transparent fixed bottom-0 pointer-events-none" />
      
      <div className="fixed bottom-6 right-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button 
            size="icon"
            className="rounded-full w-14 h-14 shadow-xl bg-accent hover:bg-accent/90"
            onClick={() => navigate('/chat')}
          >
            <MessageSquare size={24} />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;

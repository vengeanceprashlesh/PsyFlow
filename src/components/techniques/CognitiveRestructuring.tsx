import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, BookOpenText, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ThoughtEntry {
  id: string;
  negativeThought: string;
  evidence: string;
  alternativeThought: string;
}

const CognitiveRestructuring: React.FC = () => {
  const [negativeThought, setNegativeThought] = useState('');
  const [evidence, setEvidence] = useState('');
  const [alternativeThought, setAlternativeThought] = useState('');
  const [entries, setEntries] = useState<ThoughtEntry[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSaveThought();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveThought = () => {
    if (!negativeThought || !evidence || !alternativeThought) return;
    
    setIsSubmitting(true);
    
    // Create a new thought entry
    const newEntry: ThoughtEntry = {
      id: Date.now().toString(),
      negativeThought,
      evidence,
      alternativeThought
    };
    
    // Add to entries list
    setEntries([newEntry, ...entries]);
    
    // Reset form after a brief delay
    setTimeout(() => {
      setNegativeThought('');
      setEvidence('');
      setAlternativeThought('');
      setCurrentStep(1);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-4">
        <h3 className="heading-sm text-accent">Cognitive Restructuring</h3>
        <p className="paragraph">
          This technique helps you identify, challenge, and replace negative thought patterns with more balanced, realistic ones.
        </p>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="about">
            <AccordionTrigger className="text-primary">
              <div className="flex items-center">
                <BookOpenText size={18} className="mr-2" />
                About this technique
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-4 space-y-3 bg-secondary/30 rounded-md">
                <p className="paragraph text-sm">
                  Cognitive restructuring is a core technique from Cognitive Behavioral Therapy (CBT) that helps you identify and challenge distorted thoughts that negatively impact your emotions and behaviors.
                </p>
                <p className="paragraph text-sm">
                  By examining the evidence and creating more balanced alternatives to negative thoughts, you can reduce anxiety, depression, and stress while building psychological resilience.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <Card className="p-6 border-accent/20 shadow-md">
        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-5 shadow-inner">
                <Check className="h-8 w-8 text-accent" />
              </div>
              <h4 className="heading-sm text-accent">Thought Reframed!</h4>
              <p className="paragraph text-center mt-2 max-w-md">Your thought has been restructured and saved.</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-medium text-lg text-primary">Reframe Your Thoughts</h4>
                <div className="bg-accent/10 text-accent rounded-full px-3 py-1 text-sm font-medium">
                  Step {currentStep} of 3
                </div>
              </div>
              
              <div className="mb-6">
                {currentStep === 1 && (
                  <div className="space-y-3">
                    <label className="paragraph text-sm font-medium">
                      What negative thought are you experiencing?
                    </label>
                    <Textarea
                      value={negativeThought}
                      onChange={(e) => setNegativeThought(e.target.value)}
                      placeholder="e.g., I'll never be good enough at this job"
                      className="resize-none focus-ring min-h-[120px] shadow-sm"
                    />
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="space-y-3">
                    <label className="paragraph text-sm font-medium">
                      What evidence contradicts this thought?
                    </label>
                    <Textarea
                      value={evidence}
                      onChange={(e) => setEvidence(e.target.value)}
                      placeholder="e.g., I received positive feedback on my last project"
                      className="resize-none focus-ring min-h-[120px] shadow-sm"
                    />
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div className="space-y-3">
                    <label className="paragraph text-sm font-medium">
                      What's a more balanced alternative thought?
                    </label>
                    <Textarea
                      value={alternativeThought}
                      onChange={(e) => setAlternativeThought(e.target.value)}
                      placeholder="e.g., I'm still learning and have shown improvement in many areas"
                      className="resize-none focus-ring min-h-[120px] shadow-sm"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="px-6 border-2"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={(currentStep === 1 && !negativeThought) || 
                           (currentStep === 2 && !evidence) || 
                           (currentStep === 3 && !alternativeThought)}
                  className="px-6 bg-accent hover:bg-accent/90"
                >
                  {currentStep === 3 ? 'Save' : 'Next'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
      
      {entries.length > 0 && (
        <Card className="p-6 shadow-lg border-0 overflow-hidden bg-gradient-to-br from-background to-secondary/30">
          <h4 className="font-medium mb-5 text-lg text-primary">Your Reframed Thoughts</h4>
          <div className="space-y-5">
            {entries.map((entry) => (
              <Card key={entry.id} className="p-5 border-2 bg-white/50 dark:bg-gray-800/50 shadow-sm">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                      <X size={16} className="text-red-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-red-500">Negative Thought</div>
                      <p className="paragraph text-sm mt-1">{entry.negativeThought}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                      <ArrowLeftRight size={16} className="text-amber-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-amber-500">Evidence</div>
                      <p className="paragraph text-sm mt-1">{entry.evidence}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                      <Check size={16} className="text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-green-500">Alternative Thought</div>
                      <p className="paragraph text-sm mt-1">{entry.alternativeThought}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default CognitiveRestructuring; 
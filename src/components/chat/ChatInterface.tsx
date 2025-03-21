import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Mic, X, ThumbsUp, ThumbsDown, MessageSquare, Paperclip, SmilePlus, Save, RefreshCw, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import AnimatedTransition from '@/components/shared/AnimatedTransition';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  liked?: boolean;
  saved?: boolean;
}

interface SuggestionPrompt {
  text: string;
  icon: React.ReactNode;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your psychological assistant. I'm here to listen and support you using evidence-based approaches. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [recording, setRecording] = useState(false);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [savedMessages, setSavedMessages] = useState<string[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);
    
    // Simulate AI thinking and response
    setTimeout(() => {
      let response = '';
      
      // Simple pattern matching for demonstration
      if (inputValue.toLowerCase().includes('anxious') || inputValue.toLowerCase().includes('anxiety')) {
        response = "I notice you're feeling anxious. This is a common emotion we all experience. One CBT technique we can try is called 'cognitive reframing'. Can you tell me specifically what thoughts are making you feel anxious right now?";
      } else if (inputValue.toLowerCase().includes('sad') || inputValue.toLowerCase().includes('depressed')) {
        response = "I'm sorry to hear you're feeling down. From an ACT perspective, it can help to acknowledge these feelings without judgment. Would you like to try a brief mindfulness exercise to help connect with the present moment?";
      } else if (inputValue.toLowerCase().includes('stress') || inputValue.toLowerCase().includes('overwhelmed')) {
        response = "Being overwhelmed can be really challenging. Let's break things down using a DBT approach. First, let's practice a quick grounding technique: Can you name 5 things you can see around you right now?";
      } else {
        response = "Thank you for sharing that with me. I'm here to support you. Could you tell me more about how this situation is affecting your thoughts and feelings?";
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsThinking(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setRecording(!recording);
    
    // Simulate voice recording and processing
    if (!recording) {
      setTimeout(() => {
        setRecording(false);
        setInputValue("I've been feeling anxious about an upcoming presentation at work.");
      }, 3000);
    }
  };

  const toggleMessageReaction = (id: string, reaction: 'like' | 'save') => {
    setMessages(prev => 
      prev.map(message => {
        if (message.id === id) {
          if (reaction === 'like') {
            return { ...message, liked: !message.liked };
          } else if (reaction === 'save') {
            const newValue = !message.saved;
            if (newValue) {
              setSavedMessages(prev => [...prev, message.id]);
            } else {
              setSavedMessages(prev => prev.filter(msgId => msgId !== message.id));
            }
            return { ...message, saved: newValue };
          }
        }
        return message;
      })
    );
  };

  const startNewConversation = () => {
    if (window.confirm('Are you sure you want to start a new conversation? This will clear your current chat history.')) {
      setMessages([
        {
          id: Date.now().toString(),
          text: "Hello! I'm your psychological assistant. I'm here to listen and support you using evidence-based approaches. How are you feeling today?",
          sender: 'ai',
          timestamp: new Date()
        }
      ]);
    }
  };

  const suggestionPrompts: SuggestionPrompt[] = [
    { 
      text: "I've been feeling overwhelmed with work lately.",
      icon: <Sparkles size={12} className="text-blue-500" />
    },
    { 
      text: "I'm having trouble sleeping at night due to racing thoughts.",
      icon: <Sparkles size={12} className="text-purple-500" /> 
    },
    { 
      text: "I'm feeling anxious about an upcoming event.",
      icon: <Sparkles size={12} className="text-green-500" /> 
    },
    { 
      text: "I'd like some mindfulness techniques to help with stress.",
      icon: <Sparkles size={12} className="text-amber-500" /> 
    }
  ];

  const moods = [
    { emoji: "😌", label: "Calm" },
    { emoji: "😊", label: "Happy" },
    { emoji: "😔", label: "Sad" },
    { emoji: "😰", label: "Anxious" },
    { emoji: "😡", label: "Angry" },
    { emoji: "🥱", label: "Tired" },
    { emoji: "🤔", label: "Confused" },
    { emoji: "😐", label: "Neutral" }
  ];

  const selectMood = (mood: string) => {
    setSelectedMood(mood);
    setShowMoodSelector(false);
    setInputValue(`I'm feeling ${mood.toLowerCase()} today because `);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-15rem)]">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto pb-4 px-4 md:px-6 space-y-4 bg-gradient-to-b from-background to-background/60">
        <AnimatePresence>
          {messages.map((message) => (
            <AnimatedTransition 
              key={message.id} 
              variant={message.sender === 'user' ? 'slideLeft' : 'slideRight'}
              delay={0.1}
            >
              <div 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-1 shrink-0">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                )}
                
                <div 
                  className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-none shadow-sm' 
                      : 'bg-card dark:bg-gray-800/90 rounded-tl-none shadow-sm border border-accent/10'
                  }`}
                >
                  <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">{message.text}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div className={`text-xs ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-foreground/50'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    
                    {message.sender === 'ai' && (
                      <div className="flex space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button 
                                className={`text-foreground/40 hover:text-primary transition-colors ${message.liked ? 'text-primary' : ''}`}
                                onClick={() => toggleMessageReaction(message.id, 'like')}
                              >
                                <ThumbsUp size={12} />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>This was helpful</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button 
                                className={`text-foreground/40 hover:text-amber-500 transition-colors ${message.saved ? 'text-amber-500' : ''}`}
                                onClick={() => toggleMessageReaction(message.id, 'save')}
                              >
                                <Save size={12} />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Save this response</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </div>
                </div>
                
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center ml-2 mt-1 shrink-0">
                    <MessageSquare className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
            </AnimatedTransition>
          ))}
          
          {isThinking && (
            <AnimatedTransition key="thinking" variant="fadeIn">
              <div className="flex justify-start mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-1">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-card dark:bg-gray-800/90 max-w-[80%] px-5 py-3 rounded-2xl rounded-tl-none shadow-sm border border-accent/10">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-foreground/30 animate-pulse" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-foreground/30 animate-pulse" style={{ animationDelay: '300ms' }} />
                    <div className="w-2 h-2 rounded-full bg-foreground/30 animate-pulse" style={{ animationDelay: '600ms' }} />
                  </div>
                </div>
              </div>
            </AnimatedTransition>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      
      {/* Suggestion chips */}
      <div className="bg-blue-50/50 dark:bg-blue-900/10 px-4 py-3 border-t border-accent/10">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-medium text-foreground/60">Suggested prompts</h4>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20"
                  onClick={startNewConversation}
                >
                  <RefreshCw size={12} className="text-foreground/60" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start a new conversation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestionPrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInputValue(prompt.text)}
              className="rounded-full text-xs py-1 h-auto bg-white/80 dark:bg-gray-800/80 border border-accent/20 hover:bg-accent/10"
            >
              {prompt.icon}
              <span className="ml-1">{prompt.text}</span>
            </Button>
          ))}
        </div>
      </div>
      
      {/* Message input */}
      <div className="relative">
        <div className="bg-card dark:bg-gray-800/90 p-3 border-t border-accent/10">
          <div className="relative flex items-end">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="resize-none min-h-[60px] pr-24 focus-ring bg-background dark:bg-gray-900/50 text-base"
              maxRows={4}
            />
            
            <div className="absolute right-2 bottom-2 flex items-center space-x-1.5">
              <AnimatePresence>
                {recording && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -left-24 bottom-0 flex items-center bg-red-500/10 text-red-500 px-2 py-1 rounded-full"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse" />
                    <span className="text-xs font-medium">Recording...</span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent/10"
                        >
                          <SmilePlus size={18} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-2" align="end">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">How are you feeling?</h4>
                          <div className="grid grid-cols-4 gap-2">
                            {moods.map((mood) => (
                              <button
                                key={mood.label}
                                className="flex flex-col items-center p-2 rounded hover:bg-accent/10 transition-colors"
                                onClick={() => selectMood(mood.label)}
                              >
                                <span className="text-xl">{mood.emoji}</span>
                                <span className="text-xs mt-1">{mood.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share how you're feeling</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={toggleRecording}
                      className={`rounded-full h-8 w-8 ${recording ? 'text-red-500' : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'}`}
                    >
                      {recording ? <X size={18} /> : <Mic size={18} />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Voice input</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent/10"
                    >
                      <Paperclip size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Attach file (coming soon)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Button
                size="icon"
                variant="default"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="rounded-full h-8 w-8 bg-primary hover:bg-primary/90"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between mt-2 text-foreground/40 text-xs px-1">
            <div className="flex items-center">
              <HelpCircle size={10} className="mr-1" />
              <span>Ask for help or specific techniques anytime</span>
            </div>
            <span>Confidential & secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

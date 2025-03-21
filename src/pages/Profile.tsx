import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Sparkles, ExternalLink } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import AnimatedTransition from '@/components/shared/AnimatedTransition';
import { useTheme } from '@/components/theme/ThemeProvider';

const ProfilePage = () => {
  const [notifications, setNotifications] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Initialize darkMode state based on current theme
  const [darkMode, setDarkMode] = useState(theme === 'dark');
  
  // Sync darkMode state with theme when the component mounts
  useEffect(() => {
    setDarkMode(theme === 'dark');
  }, [theme]);
  
  // Handle darkMode toggle
  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    setTheme(checked ? 'dark' : 'light');
  };
  
  return (
    <Layout>
      <div className="flex flex-col">
        <h1 className="heading-lg mb-6">Your Profile</h1>
        
        <AnimatedTransition variant="fadeIn" className="mb-6">
          <Card className="p-5">
            <div className="flex items-center">
              <Avatar className="h-20 w-20 border-2 border-primary/20">
                <AvatarImage src="" />
                <AvatarFallback>
                  <User size={30} />
                </AvatarFallback>
              </Avatar>
              
              <div className="ml-5">
                <h2 className="heading-sm">Guest User</h2>
                <p className="paragraph">Welcome to Mind & Soul</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Create Account
                </Button>
              </div>
            </div>
          </Card>
        </AnimatedTransition>
        
        <AnimatedTransition variant="slideUp" delay={0.1}>
          <Card className="p-5 mb-6">
            <h3 className="font-medium text-lg flex items-center mb-4">
              <Bell size={18} className="mr-2 text-primary" />
              Notifications
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Daily Reminders</p>
                  <p className="text-sm text-muted-foreground">Receive daily check-in reminders</p>
                </div>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications} 
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                </div>
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={handleDarkModeToggle} 
                />
              </div>
            </div>
          </Card>
        </AnimatedTransition>
        
        <AnimatedTransition variant="slideUp" delay={0.2}>
          <Card className="p-5 mb-6">
            <h3 className="font-medium text-lg flex items-center mb-4">
              <Shield size={18} className="mr-2 text-primary" />
              Privacy
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Sharing</p>
                  <p className="text-sm text-muted-foreground">Share anonymous data to improve our AI</p>
                </div>
                <Switch 
                  checked={dataSharing} 
                  onCheckedChange={setDataSharing} 
                />
              </div>
              
              <Separator />
              
              <div>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <ExternalLink size={16} className="mr-2" />
                  Privacy Policy
                </Button>
              </div>
            </div>
          </Card>
        </AnimatedTransition>
        
        <AnimatedTransition variant="slideUp" delay={0.3}>
          <Card className="p-5">
            <h3 className="font-medium text-lg flex items-center mb-4">
              <Sparkles size={18} className="mr-2 text-primary" />
              About Mind & Soul
            </h3>
            
            <p className="paragraph mb-4">
              Mind & Soul uses evidence-based psychological approaches combined with artificial intelligence to help you navigate life's challenges. Our app is designed to provide support, but is not a replacement for professional mental health services.
            </p>
            
            <div className="text-xs text-muted-foreground">
              Version 1.0.0
            </div>
          </Card>
        </AnimatedTransition>
      </div>
    </Layout>
  );
};

export default ProfilePage;

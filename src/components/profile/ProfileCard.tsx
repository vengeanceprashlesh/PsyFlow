import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/components/theme/ThemeProvider';
import { useNavigate } from 'react-router-dom';

const ProfileCard = () => {
  const [notifications, setNotifications] = useState(true);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  
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
    <Card className="p-5 mb-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage src="" />
            <AvatarFallback>
              <User size={20} />
            </AvatarFallback>
          </Avatar>
          
          <div className="ml-4">
            <h2 className="font-medium text-lg">Guest User</h2>
            <p className="text-sm text-muted-foreground">Welcome to Mind & Soul</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">Dark Mode</span>
            <Switch 
              checked={darkMode} 
              onCheckedChange={handleDarkModeToggle} 
              className="data-[state=checked]:bg-primary"
            />
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-2"
            onClick={() => navigate('/profile')}
          >
            View Profile
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard; 
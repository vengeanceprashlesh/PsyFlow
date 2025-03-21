import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, BarChart2, Wind, Book, User, Lightbulb } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navigationItems = [
    { path: '/chat', label: 'Chat', icon: MessageSquare },
    { path: '/mood-tracker', label: 'Mood', icon: BarChart2 },
    { path: '/breathing', label: 'Breathe', icon: Wind },
    { path: '/techniques', label: 'Techniques', icon: Lightbulb },
    { path: '/journal', label: 'Journal', icon: Book },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Main content with page transitions */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom navigation */}
      <nav className="sticky bottom-0 w-full max-w-md mx-auto rounded-t-xl glass-card py-2 px-4 mb-0 subtle-shadow">
        <ul className="flex items-center justify-between">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex flex-col items-center justify-center p-2 relative ${
                    isActive ? 'text-primary' : 'text-foreground/60 hover:text-foreground/80'
                  } transition-all duration-200 ease-in-out`}
                >
                  <div className="relative">
                    <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-2 left-0 right-0 h-1 bg-primary rounded-full"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Layout;

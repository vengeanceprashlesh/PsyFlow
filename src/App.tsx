import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import MoodTracker from "./pages/MoodTracker";
import Breathing from "./pages/Breathing";
import Journal from "./pages/Journal";
import Profile from "./pages/Profile";
import Techniques from "./pages/Techniques";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/mood-tracker" element={<MoodTracker />} />
              <Route path="/breathing" element={<Breathing />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/techniques" element={<Techniques />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

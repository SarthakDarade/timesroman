
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';

const DarkModeToggle = () => {
  // Check if user has a dark mode preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check user preference from localStorage
    if (typeof window !== 'undefined') {
      const storedPreference = window.localStorage.getItem('darkMode');
      if (storedPreference !== null) {
        return storedPreference === 'true';
      }
      // If no stored preference, check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class to document
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4 transition-all dark:hidden" />
          <Moon className="hidden h-4 w-4 transition-all dark:block" />
          <Switch 
            checked={isDarkMode} 
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode"
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <span>{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
      </TooltipContent>
    </Tooltip>
  );
};

export default DarkModeToggle;

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from './theme-context';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>(theme);

// Only show the toggle after hydration to avoid UI flicker
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`${className} w-8 h-8`} />;
  }

  // Get the actual theme (accounting for system preference)
  const getEffectiveTheme = () => {
    if (currentTheme !== 'system') return currentTheme;
    
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return 'light'; // Fallback
  };

  const effectiveTheme = getEffectiveTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${
        effectiveTheme === 'dark'
          ? 'bg-gray-800 text-primary hover:bg-gray-700'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      } ${className}`}
      aria-label="Toggle theme"
    >
      {currentTheme === 'dark' && <Moon className="h-5 w-5" />}
      {currentTheme === 'light' && <Sun className="h-5 w-5" />}
      {currentTheme === 'system' && <Monitor className="h-5 w-5" />}
    </button>
  );
}

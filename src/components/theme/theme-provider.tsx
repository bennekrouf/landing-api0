// src/components/theme/theme-provider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

// Theme types
export type Theme = 'light' | 'dark' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

// Create context with a meaningful default to help with type checking
const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => null,
  toggleTheme: () => null,
});

// Export hook for using the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Main theme provider component
export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'api0-theme',
}: ThemeProviderProps) {
  // Initialize theme state safely for SSR
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Only run after hydration to avoid mismatches
  useEffect(() => {
    // Get stored theme on initial mount
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme(defaultTheme);
    }
    setMounted(true);
  }, [defaultTheme, storageKey]);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark');
    
    // Apply theme based on preference
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      root.setAttribute('data-theme', systemTheme);
    } else {
      root.classList.add(theme);
      root.setAttribute('data-theme', theme);
    }
    
    // Store theme
    localStorage.setItem(storageKey, theme);
  }, [theme, mounted, storageKey]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const root = window.document.documentElement;
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
      root.setAttribute('data-theme', systemTheme);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  // Theme toggle function
  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  // Context value
  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  // Render empty div during SSR to avoid hydration mismatch
  if (!mounted) {
    return <div className="fixed inset-0 bg-background" />;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Theme toggle component
interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the toggle after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`${className} w-8 h-8`} />;
  }

  // Get the actual theme (accounting for system preference)
  const getEffectiveTheme = (): 'light' | 'dark' => {
    if (theme !== 'system') return theme as 'light' | 'dark';
    
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
      {theme === 'dark' && <Moon className="h-5 w-5" />}
      {theme === 'light' && <Sun className="h-5 w-5" />}
      {theme === 'system' && <Monitor className="h-5 w-5" />}
    </button>
  );
}

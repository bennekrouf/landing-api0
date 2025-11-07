// src/components/theme/theme-provider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

// Theme types
export type Theme = 'light' | 'dark';

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
  theme: 'light',
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
    if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
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
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);

    // Store theme
    localStorage.setItem(storageKey, theme);
  }, [theme, mounted, storageKey]);

  // Theme toggle function
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
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

  const effectiveTheme = theme;

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${effectiveTheme === 'dark'
        ? 'bg-gray-800 text-primary hover:bg-gray-700'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        } ${className}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  );
}

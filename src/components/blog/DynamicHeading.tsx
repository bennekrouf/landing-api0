'use client';

import { useState, useEffect } from 'react';
import { blogHeadings } from '@/data/blogHeadings';

interface DynamicHeadingProps {
  changeInterval?: number; // Interval in milliseconds
  className?: string;
}

export function DynamicHeading({ 
  changeInterval = 0, // 0 means don't change automatically
  className = "text-4xl font-bold mb-12 text-foreground" 
}: DynamicHeadingProps) {
  // Get an initial random heading
  const getNewHeading = () => {
    const randomIndex = Math.floor(Math.random() * blogHeadings.length);
    return blogHeadings[randomIndex];
  };
  
  const [heading, setHeading] = useState<string>('');
  const [fadeIn, setFadeIn] = useState<boolean>(true);
  
  // Set initial heading
  useEffect(() => {
    setHeading(getNewHeading());
  }, []);
  
  // Set up interval for changing the heading if interval > 0
  useEffect(() => {
    if (!changeInterval) return;
    
    const interval = setInterval(() => {
      // Fade out
      setFadeIn(false);
      
      // Wait for fade out animation, then change heading and fade in
      setTimeout(() => {
        setHeading(getNewHeading());
        setFadeIn(true);
      }, 500);
    }, changeInterval);
    
    return () => clearInterval(interval);
  }, [changeInterval]);
  
  return (
    <h1 
      className={`${className} transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
    >
      {heading}
    </h1>
  );
}
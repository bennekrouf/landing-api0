"use client";

import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from './theme/theme-provider';

const Navigation = () => {
  // Get the current path to highlight active link
  const [currentPath, setCurrentPath] = React.useState<string>('');

  React.useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path === '/blog' && (currentPath === '/blog' || currentPath.startsWith('/blog/'))) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Text logo with styling */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight group">
              api<span className="relative inline-block text-[#FF6B00] font-black transform -rotate-12 transition-transform duration-300 group-hover:rotate-0">
                <span className="relative z-10">0</span>
                <span className="absolute inset-0 flex items-center justify-center z-20">
                  <span className="h-px w-4 bg-white dark:bg-gray-900 transform rotate-45 opacity-90"></span>
                </span>
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {/* <a */}
            {/*   href="https://app.api0.ai" */}
            {/*   target="_blank" */}
            {/*   rel="noopener noreferrer" */}
            {/*   className="text-muted-foreground hover:text-foreground transition-colors" */}
            {/* > */}
            {/*   Dashboard */}
            {/* </a> */}
            <Link
              href="/#integration"
              className={`${isActive('/') ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground transition-colors`}
            >
              How it works
            </Link>
            <Link
              href="/blog"
              className={`${isActive('/blog') ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground transition-colors`}
            >
              Blog
            </Link>
            <ThemeToggle className="mr-2" />
            <a
              href="https://app.api0.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-[#FF6B00] text-white font-medium hover:bg-[#FF6B00]/90 transition-all shadow-lg shadow-orange-500/20"
            >
              Get started
            </a>
          </div>

          {/* Mobile menu button - can be expanded with a dropdown menu implementation */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="https://app.api0.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#FF6B00] text-white text-sm font-medium hover:bg-[#FF6B00]/90 transition-all"
            >
              Dashboard
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

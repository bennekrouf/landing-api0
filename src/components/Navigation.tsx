"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme/theme-provider';
import { copyFor, langOf, localePath, otherLangPath, LANG_COOKIE } from '@/i18n';

const Navigation = () => {
  const currentPath = usePathname() ?? '/';
  const lang = langOf(currentPath);
  const t = copyFor(lang).nav;
  const other = otherLangPath(currentPath);
  const home = localePath(lang, '/');
  const pricing = localePath(lang, '/pricing');

  // The root layout says lang="en"; a French page says so once it runs.
  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  /** A chosen language is kept for a year, so the middleware stops guessing. */
  const remember = (l: string) => {
    document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
  };

  const isActive = (path: string) => {
    if (path === home) return currentPath === home;
    if (path === pricing) return currentPath === pricing;
    if (path === '/blog') return currentPath === '/blog' || currentPath.startsWith('/blog/');
    return false;
  };

  const switchLink = (className: string) =>
    other && (
      <Link href={other.href} onClick={() => remember(other.lang)} aria-label={t.switchLabel} lang={other.lang} className={className}>
        {t.switchTo}
      </Link>
    );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Text logo with styling */}
          <Link href={home} className="flex items-center space-x-2">
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
              href={`${home === '/' ? '' : home}/#integration`}
              className={`${isActive(home) ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground transition-colors`}
            >
              {t.howItWorks}
            </Link>
            <Link
              href={pricing}
              className={`${isActive(pricing) ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground transition-colors`}
            >
              {t.pricing}
            </Link>
            <Link
              href="/blog"
              className={`${isActive('/blog') ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground transition-colors`}
            >
              {t.blog}
            </Link>
            {switchLink('text-sm font-medium text-muted-foreground hover:text-foreground transition-colors')}
            <ThemeToggle className="mr-2" />
            <a
              href="https://app.api0.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-[#FF6B00] text-white font-medium hover:bg-[#FF6B00]/90 transition-all shadow-lg shadow-orange-500/20"
            >
              {t.getStarted}
            </a>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <Link
              href={pricing}
              className={`${isActive(pricing) ? 'text-foreground font-medium' : 'text-muted-foreground'} text-sm hover:text-foreground transition-colors`}
            >
              {t.pricing}
            </Link>
            <Link
              href="/blog"
              className={`${isActive('/blog') ? 'text-foreground font-medium' : 'text-muted-foreground'} text-sm hover:text-foreground transition-colors`}
            >
              {t.blog}
            </Link>
            <a
              href="https://app.api0.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#FF6B00] text-white text-sm font-medium hover:bg-[#FF6B00]/90 transition-all"
            >
              {t.dashboard}
            </a>
            {switchLink('text-sm font-medium text-muted-foreground hover:text-foreground transition-colors')}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

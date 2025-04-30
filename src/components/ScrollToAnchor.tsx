'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Component that handles scrolling to anchor links
export function ScrollToAnchor() {
  const pathname = usePathname();

  useEffect(() => {
    // Function to handle scrolling to anchor
    const handleScroll = () => {
      const hash = window.location.hash;
      
      if (hash) {
        // Handle scrolling to the element
        setTimeout(() => {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            const headerOffset = 80; // Account for fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    };
    
    // Only run when pathname changes
    handleScroll();
    
    // Add event listener for hash changes
    window.addEventListener('hashchange', handleScroll);
    
    return () => {
      window.removeEventListener('hashchange', handleScroll);
    };
  }, [pathname]);

  return null;
}

export default ScrollToAnchor;
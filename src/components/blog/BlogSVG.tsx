'use client';
// src/components/blog/BlogSVG.tsx
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { SVGDisplayOptions } from '@/lib/blog-types';

// Import optional theme utilities properly with dynamic imports
import('next/dynamic');

// Define a proper type for theme context result
// interface ThemeResult {
//   theme: string;
// }

// Default theme function that always returns a light theme
// function getDefaultTheme(): ThemeResult {
//   return { theme: 'light' };
// }

interface BlogSVGProps extends SVGDisplayOptions {
  src: string;
  fallbackImage?: string;
}

/**
 * Component to display blog SVG illustrations with theme awareness
 * Will fall back to normal Image component for non-SVG sources
 */
export function BlogSVG({
  src,
  fallbackImage,
  className = '',
  width = 800,
  height = 400,
  priority = false,
  alt = 'Blog illustration'
}: BlogSVGProps) {
  // Use state to manage theme to avoid conditional hooks
  const [theme, setTheme] = useState<string>('light');
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<boolean>(false);

  const isSvg = src?.endsWith('.svg');

  // Effect to safely get theme once on component mount
  useEffect(() => {
    let isMounted = true;

    // Use an async function to dynamically import the theme
    async function loadTheme() {
      try {
        // Try to dynamically import the theme context
        const themeModule = await import('@/components/theme/theme-context');

        // Only update state if the component is still mounted
        if (isMounted) {
          try {
            // Get the current theme using the imported hook
            const themeContext = themeModule.useTheme();
            setTheme(themeContext.theme || 'light');
          } catch {
            // If useTheme fails, keep using light theme
            setTheme('light');
          }
        }
      } catch {
        // If import fails, keep using light theme
        if (isMounted) {
          setTheme('light');
        }
      }
    }

    // Only try to load theme in browser environment
    if (typeof window !== 'undefined') {
      loadTheme();
    }

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch SVG content for direct embedding if it's an SVG
  useEffect(() => {
    if (!isSvg) return;

    let isMounted = true;

    async function fetchSvg() {
      try {
        const response = await fetch(src);
        if (!response.ok) throw new Error(`Failed to load SVG: ${response.status}`);

        const text = await response.text();
        if (isMounted) {
          setSvgContent(text);
        }
      } catch (err) {
        console.error('Error loading SVG:', err);
        if (isMounted) {
          setLoadError(true);
        }
      }
    }

    fetchSvg();

    return () => {
      isMounted = false;
    };
  }, [src, isSvg]);

  // Handle case where we have no valid source
  if (!src && !fallbackImage) {
    return null;
  }

  // If there was an error loading the SVG or it's not an SVG, fall back to Image
  if ((loadError || !isSvg) && (src || fallbackImage)) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src || fallbackImage || '/svg/blog/placeholder.svg'}
          alt={alt}
          width={typeof width === 'number' ? width : parseInt(width)}
          height={typeof height === 'number' ? height : parseInt(height)}
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  // If we have SVG content, embed it directly for better theme control
  if (svgContent) {
    // Add theme-related classes to allow CSS styling based on theme
    const themedSvgContent = svgContent
      .replace('<svg', `<svg data-theme="${theme}" class="blog-svg ${className}"`)
      // Ensure viewBox is preserved but dimensions are handled by CSS
      .replace(/width="([^"]+)"/, '')
      .replace(/height="([^"]+)"/, '');

    return (
      <div
        className={`svg-container ${className}`}
        style={{
          width: typeof width === 'string' ? width : `${width}px`,
          height: typeof height === 'string' ? height : `${height}px`
        }}
        dangerouslySetInnerHTML={{ __html: themedSvgContent }}
      />
    );
  }

  // Loading state
  return (
    <div
      className={`rounded animate-pulse bg-muted ${className}`}
      style={{
        width: typeof width === 'string' ? width : `${width}px`,
        height: typeof height === 'string' ? height : `${height}px`
      }}
    />
  );
}

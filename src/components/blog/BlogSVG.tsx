// src/components/blog/BlogSVG.tsx
import Image from 'next/image';
import React from 'react';

export interface BlogSVGProps {
  src: string;
  fallbackImage?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean; // Added priority prop
}

export const BlogSVG: React.FC<BlogSVGProps> = ({
  src,
  fallbackImage,
  alt,
  className = '',
  width = 600,
  height = 340,
  priority = false // Default to false
}) => {
  // Check if the source is an SVG
  const isSVG = src?.toLowerCase().endsWith('.svg');
  
  // If it's an SVG, use a div with background or iframe or object
  if (isSVG) {
    return (
      <object
        data={src}
        type="image/svg+xml"
        className={className}
        style={{ width, height }}
        aria-label={alt}
      >
        {/* Fallback to regular image if SVG fails to load or for browsers that don't support object */}
        <Image
          src={fallbackImage || src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
        />
      </object>
    );
  }
  
  // If it's not an SVG, use Next.js Image component
  return (
    <Image
      src={src || fallbackImage || '/images/placeholder.jpg'}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
};

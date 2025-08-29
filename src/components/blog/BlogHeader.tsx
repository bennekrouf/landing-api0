// src/components/blog/BlogHeader.tsx
import React from 'react';
import Image from 'next/image';
// import { BlogSVG } from './BlogSVG';

interface BlogHeaderProps {
  title: string;
  date: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  readingTime?: string;
  svg?: string;           // SVG path field
  image?: string;         // Keep for backward compatibility
}

export function BlogHeader({
  // _title,
  date,
  author,
  tags,
  readingTime,
  // svg,
  // image
}: BlogHeaderProps) {
  // Determine if we should display a visual (SVG or image)
  // const hasVisual = Boolean(svg || image);

  return (
    <header className="mb-12">
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-sm rounded-full bg-[#FF6B00]/10 text-[#FF6B00]">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Removing the title from here to avoid duplication */}
      {/* The title will remain in the markdown content */}

      <div className="flex flex-wrap items-center gap-4 mb-8 text-muted-foreground">
        {author && (
          <div className="flex items-center gap-2">
            {author.avatar && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            )}
            <span>{author.name}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span>
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>

        {readingTime && (
          <div className="flex items-center gap-2">
            <span>{readingTime}</span>
          </div>
        )}
      </div>

      {/* SVG/Image container with explicit height */}
      {/* {hasVisual && ( */}
      {/*   <div className="w-full mb-12 relative" style={{ minHeight: '300px' }}> */}
      {/*     <BlogSVG */}
      {/*       src={svg || image || ''} */}
      {/*       fallbackImage={image} */}
      {/*       className="w-full rounded-xl" */}
      {/*       width={1200} */}
      {/*       height={400} */}
      {/*       priority={true} */}
      {/*       alt={`Illustration for ${title}`} */}
      {/*     /> */}
      {/*   </div> */}
      {/* )} */}
    </header>
  );
}

// src/components/blog/BlogHeader.tsx
import React from 'react';
import Image from 'next/image'; // Add this import

interface BlogHeaderProps {
  title: string;
  date: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  readingTime?: string;
  image?: string;
}

export function BlogHeader({ title, date, author, tags, readingTime, image }: BlogHeaderProps) {
  return (
    <header className="mb-8">
      {tags && tags.length > 0 && (
        <div className="flex gap-3 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-sm rounded-full bg-[#FF6B00]/10 text-[#FF6B00]">
              {tag}
            </span>
          ))}
        </div>
      )}

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 mb-8 text-muted-foreground">
        {author && (
          <div className="flex items-center gap-2">
            {author.avatar && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  className="object-cover"
                  sizes="32px"
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

      {image && (
        <div className="aspect-video w-full overflow-hidden rounded-xl mb-8 relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority  // For hero images, use priority to load faster
          />
        </div>
      )}
    </header>
  );
}

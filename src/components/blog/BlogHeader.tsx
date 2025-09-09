// src/components/blog/BlogHeader.tsx
import React from 'react';
import Image from 'next/image';

interface BlogHeaderProps {
  title: string;
  date: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  readingTime?: string;
  svg?: string | null;           // Changed to match blog types
  image?: string | null;         // Changed to match blog types
}

export function BlogHeader({
  date,
  author,
  tags,
  readingTime,
}: BlogHeaderProps) {
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
    </header>
  );
}

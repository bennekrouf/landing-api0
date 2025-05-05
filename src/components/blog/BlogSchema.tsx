// src/components/blog/BlogSchema.tsx
import React from 'react';
import { Post } from '@/lib/blog-types';

interface BlogSchemaProps {
  post: Post;
  url: string;
}

export function BlogSchema({ post, url }: BlogSchemaProps) {
  // Format the date in ISO format
  const datePublished = new Date(post.date).toISOString();
  const dateModified = datePublished; // We could track modification dates in the future

  // Create the schema object
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt,
    'image': post.svg || post.image || `https://api0.ai/og-image/${post.slug}`,
    'datePublished': datePublished,
    'dateModified': dateModified,
    'author': [
      {
        '@type': 'Person',
        'name': post.author?.name || 'API0 Team',
      },
    ],
    'publisher': {
      '@type': 'Organization',
      'name': 'API0',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://api0.ai/logo.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url,
    },
    // Add article body as the content
    'articleBody': post.content,
    // Add tags as keywords
    'keywords': post.tags?.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// src/app/blog/page.tsx
import React from 'react';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import { BlogSVG } from '@/components/blog/BlogSVG';
// import SEOMetaTags from '@/components/SEOMetaTags';

export const metadata = {
  title: 'Blog | API0',
  description: 'Explore the latest insights, tutorials, and best practices for API routing and management.',
  openGraph: {
    title: 'API0 Blog',
    description: 'Explore the latest insights, tutorials, and best practices for API routing and management.',
    type: 'website',
    url: 'https://api0.ai/blog/',
    images: [
      {
        url: '/images/blog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'API0 Blog',
      },
    ],
  },
};

export default async function BlogPage() {
  // Get all blog posts
  const posts = await getBlogPosts();
  
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">API0 Blog</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Insights, tutorials, and best practices for API routing and management
          </p>
          
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {sortedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="h-full flex flex-col border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <BlogSVG
                      src={post.svg || post.image || ''}
                      fallbackImage={post.image}
                      alt={post.title}
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <time dateTime={new Date(post.date).toISOString()}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      
                      {post.readingTime && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{post.readingTime}</span>
                        </>
                      )}
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {post.tags.slice(0, 3).map(tag => (
                          <span 
                            key={tag}
                            className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

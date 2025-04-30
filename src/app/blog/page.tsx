// src/app/blog/page.tsx
import React from 'react';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import { DynamicHeading } from '@/components/blog/DynamicHeading';
import { BlogSVG } from '@/components/blog/BlogSVG';
import { PostMeta } from '@/lib/blog-types';

export const metadata = {
  title: 'Blog | API0',
  description: 'Latest articles and insights on API management, NLP, and integrations',
};

export default async function BlogPage() {
  const posts: PostMeta[] = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Dynamic heading component - set to 0 to only randomize on page load */}
      <DynamicHeading changeInterval={0} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group"
          >
            <div className="h-full rounded-xl border border-border bg-accent/50 overflow-hidden transition duration-300 hover:shadow-lg flex flex-col">
              {/* Display SVG with priority over image */}
              {(post.svg || post.image) && (
                <div className="aspect-video w-full overflow-hidden relative bg-accent/30">
                  <BlogSVG
                    src={post.svg || post.image || ''}
                    fallbackImage={post.image}
                    width={600}
                    height={340}
                    className="object-cover transition duration-300 group-hover:scale-105"
                    alt={post.title}
                  />
                </div>
              )}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags?.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-[#FF6B00]/10 text-[#FF6B00]">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold mb-3 text-foreground group-hover:text-[#FF6B00] transition duration-200">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="text-[#FF6B00] font-medium">Read more →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

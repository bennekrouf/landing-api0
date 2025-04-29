// src/app/blog/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import { getBlogPosts } from '@/lib/blog';

// Define proper types for blog posts
interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  tags?: string[];
  author?: {
    name: string;
    avatar?: string;
  };
}

export const metadata = {
  title: 'Blog | API0',
  description: 'Latest articles and insights on API management, NLP, and integrations',
};

export default async function BlogPage() {
  const posts: BlogPost[] = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-24 mt-16">
      <h1 className="text-4xl font-bold mb-12 text-foreground">API0 Blog</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group"
          >
            <div className="rounded-xl border border-border bg-accent/50 overflow-hidden transition duration-300 hover:shadow-lg">
              {post.image && (
                <div className="aspect-video w-full overflow-hidden relative">
                  {/* Replace img with Next.js Image */}
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex gap-3 mb-3">
                  {post.tags?.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-[#FF6B00]/10 text-[#FF6B00]">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold mb-3 text-foreground group-hover:text-[#FF6B00] transition duration-200">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
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

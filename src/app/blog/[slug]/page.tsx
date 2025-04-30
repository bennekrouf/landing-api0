// src/app/blog/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { TableOfContents } from '@/components/blog/TableOfContents';

interface BlogParams {
  slug: string;
}

interface MetadataProps {
  params: Promise<BlogParams>;
}

export async function generateMetadata({ params }: MetadataProps) {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Post Not Found | API0',
    };
  }

  return {
    title: `${post.title} | API0 Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPage({ params }: { params: Promise<BlogParams> }) {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <BlogHeader
          title={post.title}
          date={post.date}
          author={post.author}
          tags={post.tags}
          readingTime={post.readingTime}
          image={post.image}
        />

        <div className="flex flex-col md:flex-row gap-8 mt-12">
          <div className="md:w-3/4">
            {/* This is the key part - make sure we're using contentHtml and proper prose classes */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-a:text-[#FF6B00] prose-strong:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-blockquote:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
            />
          </div>

          <div className="md:w-1/4 md:sticky md:top-24 h-fit">
            <TableOfContents headings={post.headings} />
          </div>
        </div>
      </article>
    </div>
  );
}

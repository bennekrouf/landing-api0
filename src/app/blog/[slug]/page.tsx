// src/app/blog/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { TableOfContents } from '@/components/blog/TableOfContents';

// Define both params and searchParams as Promise types
type PageParams = Promise<{ slug: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// Metadata params need to be defined in the same way
type MetadataParams = {
  params: PageParams;
  searchParams?: SearchParams;
};

export async function generateMetadata({ params }: MetadataParams) {
  // Await the params since they're a Promise
  const { slug } = await params;
  const post = await getBlogPost(slug);

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

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Define BlogPageProps using the Promise types for both params
interface BlogPageProps {
  params: PageParams;
  searchParams?: SearchParams;
}

// Remove searchParams from the function parameters if not using it
export default async function BlogPage({ params }: BlogPageProps) {
  // Await the params since they're a Promise
  const { slug } = await params;

  const post = await getBlogPost(slug);

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
          svg={post.svg}
          image={post.image}
        />

        <div className="flex flex-col md:flex-row gap-8 mt-12">
          <div className="md:w-3/4">
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

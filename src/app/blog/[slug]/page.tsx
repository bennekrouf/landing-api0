// src/app/blog/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { BlogSchema } from '@/components/blog/BlogSchema';
import SEOMetaTags from '@/components/SEOMetaTags';

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
      images: [
        {
          url: post.svg || post.image || `/og-image/${slug}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.svg || post.image || `/og-image/${slug}`],
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

  // Create canonical URL
  const canonicalUrl = `https://api0.ai/blog/${slug}/`;

  return (
    <>
      {/* Add SEO Meta Tags */}
      <SEOMetaTags
        title={`${post.title} | API0 Blog`}
        description={post.excerpt}
        canonicalUrl={canonicalUrl}
        ogImage={post.svg || post.image || `/og-image/${slug}`}
        type="article"
        article={{
          publishedTime: new Date(post.date).toISOString(),
          authors: post.author ? [post.author.name] : ['API0 Team'],
          tags: post.tags,
        }}
      />

      {/* Add Structured Data Schema */}
      <BlogSchema post={post} url={canonicalUrl} />

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
    </>
  );
}

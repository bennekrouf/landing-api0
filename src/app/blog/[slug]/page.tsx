import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { BlogSchema } from '@/components/blog/BlogSchema';

// Use Next.js built-in types instead of importing Metadata
import type { Metadata } from "next";

// Type definition for metadata params - using the new Next.js 15 pattern
type MetadataProps = {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: MetadataProps
): Promise<Metadata> {
  const slug = (await params).slug;
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
          url: post.svg || post.image || `/api/og-image/${slug}`,
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
      images: [post.svg || post.image || `/api/og-image/${slug}`],
    },
  };
}

// Static params generation
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Type for page component props - consistent with Next.js 15
type PageProps = {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

// Page component with consistent Promise params
export default async function BlogPage({ params }: PageProps) {
  const slug = (await params).slug;
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }
  
  // Create canonical URL
  const canonicalUrl = `https://api0.ai/blog/${slug}/`;
  
  return (
    <>
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

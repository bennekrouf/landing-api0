This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded

## Additional Info

# Directory Structure
```
public/
  file.svg
  globe.svg
  window.svg
scripts/
  generate-sitemap.js
src/
  app/
    api/
      og-image/
        [slug]/
          route.ts
    blog/
      [slug]/
        page.tsx
    globals.css
    icon.svg
    layout.tsx
    page.tsx
  components/
    blog/
      BlogSchema.tsx
    theme/
      client-theme-provider.tsx
      theme-context.tsx
      theme-provider.tsx
      theme-toggle.tsx
    SEOMetaTags.tsx
  lib/
    sitemap.ts
  types/
    globals.d.ts
.gitignore
color_palette.md
config.yaml
eslint.config.mjs
next.config.ts
package.json
postcss.config.mjs
README.md
robots.txt
tailwind.config.ts
tsconfig.json
```

# Files

## File: public/file.svg
````
<svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clip-rule="evenodd" fill="#666" fill-rule="evenodd"/></svg>
````

## File: public/globe.svg
````
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill="#666"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
````

## File: public/window.svg
````
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" fill="#666"/></svg>
````

## File: scripts/generate-sitemap.js
````javascript
// scripts/generate-sitemap.js
import { writeSitemap } from '../src/lib/sitemap.js';

async function main() {
  console.log('Generating sitemap...');
  await writeSitemap();
}

main().catch(console.error);
````

## File: src/app/api/og-image/[slug]/route.ts
````typescript
// src/app/api/og-image/[slug]/route.ts
import { ImageResponse } from 'next/og';
import { getBlogPost } from '@/lib/blog';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(
  request: NextRequest, 
  { params }: { params: { slug: string } }
) {
  try {
    // Get blog post data
    const post = await getBlogPost(params.slug);
    
    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    // Extract necessary data
    const { title, excerpt, author, tags } = post;
    
    // Create the image
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '1200px',
            height: '630px',
            backgroundColor: '#0f172a',
            backgroundImage: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
            color: 'white',
            fontFamily: 'sans-serif',
            padding: '80px',
            position: 'relative',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>
              api<span style={{ color: '#FF6B00', fontWeight: 900, transform: 'rotate(-12deg)', display: 'inline-block' }}>0</span>
            </span>
          </div>
          
          {/* Title */}
          <h1 style={{ fontSize: '64px', fontWeight: 'bold', maxWidth: '900px', marginBottom: '20px', lineHeight: 1.2 }}>
            {title}
          </h1>
          
          {/* Excerpt */}
          <p style={{ fontSize: '24px', maxWidth: '800px', color: '#e2e8f0', marginBottom: '30px', lineHeight: 1.4 }}>
            {excerpt}
          </p>
          
          {/* Author and tags */}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '18px', color: '#94a3b8' }}>By {author?.name || 'API0 Team'}</span>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {tags?.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      backgroundColor: 'rgba(255, 107, 0, 0.2)',
                      color: '#FF6B00',
                      padding: '6px 12px',
                      borderRadius: '100px',
                      fontSize: '16px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Website URL */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              fontSize: '24px',
              color: '#94a3b8',
            }}
          >
            api0.ai
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
````

## File: src/app/blog/[slug]/page.tsx
````typescript
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
````

## File: src/app/globals.css
````css
@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;
    
    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;
 
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;
 
    --primary: 25 100% 50%; /* #FF6B00 */
    --primary-foreground: 0 0% 100%;
 
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
 
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
 
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
 
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
 
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
 
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
 
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
 
    --primary: 25 100% 50%; /* #FF6B00 */
    --primary-foreground: 222.2 47.4% 11.2%;
 
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
 
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
 
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
 
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
 
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    transition-property: color, background-color, border-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
}
````

## File: src/app/icon.svg
````
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <!-- White background -->
  <rect width="512" height="512" fill="white"/>
  
  <!-- The orange "0" with translation effect -->
  <g transform="translate(256, 256)">
    <!-- Main elliptical "0" with orange outline -->
    <g transform="rotate(-15)">
      <ellipse cx="0" cy="0" rx="140" ry="160" fill="transparent" stroke="#FF6B00" stroke-width="40"/>
    </g>
    
    <!-- Diagonal white line crossing through the "0" with reduced weight -->
    <line x1="-180" y1="-180" x2="180" y2="180" stroke="white" stroke-width="22"/>
  </g>
</svg>
````

## File: src/app/layout.tsx
````typescript
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

export const metadata = {
  title: {
    template: '%s | API0',
    default: 'api0 - Intelligent API Routing', // Used on the homepage
  },
  description: 'api0 - Modern API Routing and Management Platform',
  icons: {
    icon: '/icon.svg', // SVG favicon
    shortcut: '/favicon.ico', // Fallback for browsers that don't support SVG
    apple: '/apple-icon.png', // Optional: for iOS devices
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="api0" />
        {/* Script below provides a quick initial theme application for reduced flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('api0-theme');
                  if (storedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {
                  console.error('Error applying theme:', e);
                }
              })();
            `,
          }}
        />
<script defer data-domain="api0.ai" src="https://plausible.io/js/script.outbound-links.js"></script>
<script 
  dangerouslySetInnerHTML={{
    __html: `
      window.plausible = window.plausible || function() { 
        (window.plausible.q = window.plausible.q || []).push(arguments) 
      }
    `,
  }}
/>

      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="system" storageKey="api0-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
````

## File: src/app/page.tsx
````typescript
"use client";

import React from 'react';
import { MessageSquare, Search, Target } from 'lucide-react';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-provider';
// import Image from 'next/image';

// const Logo = ({ variant = 'color', className = 'h-8 w-auto' }) => {
//   const logoSrc = variant === 'white'
//     ? '/images/white_logo_dark_background.jpg'
//     : '/images/logo_transparent_background.png'
//   return (
//     <Image
//       src={logoSrc}
//       alt="api0"
//       height={100}
//       width={128} // Adjusted based on logo's aspect ratio
//       className={className}
//       priority // Load logo with high priority
//     />
//   );
// };

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Text logo with ninja icon */}
            <div className="flex items-center space-x-2">
              {/* <Sword className="h-6 w-6 text-[#FF6B00]" /> */}
              <span className="text-xl font-bold tracking-tight group">
                api<span className="relative inline-block text-[#FF6B00] font-black transform -rotate-12 transition-transform duration-300 group-hover:rotate-0">
                  <span className="relative z-10">0</span>
                  <span className="absolute inset-0 flex items-center justify-center z-20">
                    <span className="h-px w-4 bg-white dark:bg-gray-900 transform rotate-45 opacity-90"></span>
                  </span>
                </span>
              </span>


            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <ThemeToggle className="mr-2" />
              <a href="https://app.api0.ai"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-[#FF6B00] text-white font-medium hover:bg-[#FF6B00]/90 transition-all shadow-lg shadow-orange-500/20"
              >
                Try Demo
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-accent to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-foreground">
            No More Forms. <span className="text-[#FF6B00]">Just Ask.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            api0 connects users to the right APIs instantly.
          </p>
          <a
            href="https://app.api0.ai"
            className="inline-flex items-center px-8 py-4 rounded-lg bg-[#FF6B00] text-white text-lg font-semibold hover:bg-[#FF6B00]/90 transform transition duration-200 hover:-translate-y-1 shadow-xl shadow-orange-500/20"
          >
            Try the Demo
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-accent/50 border border-border">
              <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
                <MessageSquare size={32} className="text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Natural Language Processing</h3>
              <p className="text-muted-foreground">Transform conversational requests into structured API parameters without complex forms.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-accent/50 border border-border">
              <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
                <Search size={32} className="text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">API Discovery</h3>
              <p className="text-muted-foreground">Automatically identify and surface the most relevant APIs from your ecosystem based on user needs.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-accent/50 border border-border">
              <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
                <Target size={32} className="text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Intent Matching</h3>
              <p className="text-muted-foreground">Advanced contextual analysis to understand user intent and map it to the perfect API endpoints.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo/Brand Section */}
            <div>
              <span className="text-xl font-bold tracking-tight text-white group">
                api<span className="relative inline-block text-[#FF6B00] font-black transform -rotate-12 transition-transform duration-300 group-hover:rotate-0">
                  <span className="relative z-10">0</span>
                  <span className="absolute inset-0 flex items-center justify-center z-20">
                    <span className="h-px w-4 bg-gray-900 transform rotate-45 opacity-90"></span>
                  </span>
                </span>
              </span>
              <p className="text-gray-400 mt-2">The Enterprise AI bridge</p>
            </div>

            {/* Dynamic Footer Links */}
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-white mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                        {section.title === "Connect" ? (
                          <div className="flex items-center gap-2">
                            {link.label === "X" && <Twitter size={18} />}
                            {link.label === "LinkedIn" && <Linkedin size={18} />}
                            {link.label === "GitHub" && <Github size={18} />}
                            <span>{link.label === "X" ? "@mayoranax" : link.label}</span>
                          </div>
                        ) : (
                          link.label
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Mayorana. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main >
  );
};

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Documentation", href: "#" },
      { label: "Pricing", href: "#" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
    ]
  },
  {
    title: "Connect",
    links: [
      { label: "X", href: "https://x.com/mayoranax" },
      { label: "LinkedIn", href: "https://linkedin.com/in/bennekrouf" },
      { label: "GitHub", href: "https://github.com/bennekrouf" }
    ]
  }
];

export default LandingPage;
````

## File: src/components/blog/BlogSchema.tsx
````typescript
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
````

## File: src/components/theme/client-theme-provider.tsx
````typescript
"use client";

import { ThemeProvider } from "./theme-provider";
import { useEffect, useState } from "react";

export function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Ensure we don't render children until after hydration
  // to avoid theme flash and mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Add a minimal loader or return null to avoid hydration issues
    return <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="api0-theme">
      {children}
    </ThemeProvider>
  );
}
````

## File: src/components/theme/theme-context.tsx
````typescript
"use client";

import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
````

## File: src/components/theme/theme-provider.tsx
````typescript
// src/components/theme/theme-provider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

// Theme types
export type Theme = 'light' | 'dark' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

// Create context with a meaningful default to help with type checking
const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => null,
  toggleTheme: () => null,
});

// Export hook for using the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Main theme provider component
export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'api0-theme',
}: ThemeProviderProps) {
  // Initialize theme state safely for SSR
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Only run after hydration to avoid mismatches
  useEffect(() => {
    // Get stored theme on initial mount
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme(defaultTheme);
    }
    setMounted(true);
  }, [defaultTheme, storageKey]);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark');
    
    // Apply theme based on preference
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      root.setAttribute('data-theme', systemTheme);
    } else {
      root.classList.add(theme);
      root.setAttribute('data-theme', theme);
    }
    
    // Store theme
    localStorage.setItem(storageKey, theme);
  }, [theme, mounted, storageKey]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const root = window.document.documentElement;
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
      root.setAttribute('data-theme', systemTheme);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  // Theme toggle function
  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  // Context value
  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  // Render empty div during SSR to avoid hydration mismatch
  if (!mounted) {
    return <div className="fixed inset-0 bg-background" />;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Theme toggle component
interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the toggle after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`${className} w-8 h-8`} />;
  }

  // Get the actual theme (accounting for system preference)
  const getEffectiveTheme = (): 'light' | 'dark' => {
    if (theme !== 'system') return theme as 'light' | 'dark';
    
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return 'light'; // Fallback
  };

  const effectiveTheme = getEffectiveTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${
        effectiveTheme === 'dark'
          ? 'bg-gray-800 text-primary hover:bg-gray-700'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      } ${className}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' && <Moon className="h-5 w-5" />}
      {theme === 'light' && <Sun className="h-5 w-5" />}
      {theme === 'system' && <Monitor className="h-5 w-5" />}
    </button>
  );
}
````

## File: src/components/theme/theme-toggle.tsx
````typescript
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from './theme-context';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme,] = useState<'light' | 'dark' | 'system'>(theme);

  // Only show the toggle after hydration to avoid UI flicker
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`${className} w-8 h-8`} />;
  }

  // Get the actual theme (accounting for system preference)
  const getEffectiveTheme = () => {
    if (currentTheme !== 'system') return currentTheme;

    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    return 'light'; // Fallback
  };

  const effectiveTheme = getEffectiveTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${effectiveTheme === 'dark'
        ? 'bg-gray-800 text-primary hover:bg-gray-700'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        } ${className}`}
      aria-label="Toggle theme"
    >
      {currentTheme === 'dark' && <Moon className="h-5 w-5" />}
      {currentTheme === 'light' && <Sun className="h-5 w-5" />}
      {currentTheme === 'system' && <Monitor className="h-5 w-5" />}
    </button>
  );
}
````

## File: src/components/SEOMetaTags.tsx
````typescript
// src/components/SEOMetaTags.tsx
import React from 'react';
import Head from 'next/head';

interface SEOMetaTagsProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
  structuredData?: object;
}

const SEOMetaTags: React.FC<SEOMetaTagsProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://api0.ai/og-image.jpg', // Default OG image
  type = 'website',
  article,
  structuredData
}) => {
  // Generate full URL for canonical and OG
  const fullCanonicalUrl = canonicalUrl ? `https://api0.ai${canonicalUrl}` : 'https://api0.ai';
  
  // Generate structured data for different page types
  const generateStructuredData = () => {
    // If custom structured data is provided, use that
    if (structuredData) {
      return JSON.stringify(structuredData);
    }

    // Default website structured data
    if (type === 'website') {
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'API0',
        'url': 'https://api0.ai',
        'description': description,
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://api0.ai/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      });
    }

    // Blog article structured data
    if (type === 'article' && article) {
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': title,
        'description': description,
        'image': ogImage,
        'datePublished': article.publishedTime,
        'dateModified': article.modifiedTime || article.publishedTime,
        'author': article.authors?.map(name => ({
          '@type': 'Person',
          'name': name
        })) || [{ '@type': 'Person', 'name': 'API0 Team' }],
        'publisher': {
          '@type': 'Organization',
          'name': 'API0',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://api0.ai/logo.png'
          }
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': fullCanonicalUrl
        },
        'keywords': article.tags?.join(', ')
      });
    }

    return null;
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Article specific meta tags */}
      {type === 'article' && article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Structured Data */}
      {generateStructuredData() && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateStructuredData() || '' }}
        />
      )}
    </Head>
  );
};

export default SEOMetaTags;
````

## File: src/lib/sitemap.ts
````typescript
// src/lib/sitemap.ts
import fs from 'fs';
import path from 'path';
import { getBlogPosts } from './blog';

// Base URL of your website
const BASE_URL = 'https://api0.ai';

/**
 * Generate sitemap.xml content with URLs from the site
 */
export async function generateSitemap() {
  // Get all blog posts for dynamic URLs
  const posts = await getBlogPosts();
  
  // Start XML content
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static pages -->
  <url>
    <loc>${BASE_URL}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;

  // Add all blog posts
  for (const post of posts) {
    const postUrl = `${BASE_URL}/blog/${post.slug}`;
    sitemap += `
  <url>
    <loc>${postUrl}</loc>
    <lastmod>${new Date(post.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }

  // Close XML
  sitemap += `
</urlset>`;

  return sitemap;
}

/**
 * Write the sitemap to the public directory
 */
export async function writeSitemap() {
  try {
    const sitemap = await generateSitemap();
    const publicDir = path.join(process.cwd(), 'public');
    
    // Ensure the public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated successfully!');
    return true;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return false;
  }
}
````

## File: src/types/globals.d.ts
````typescript
export {};

declare global {
  interface Window {
    plausible?: {
      (event: string, options?: { props?: Record<string, string> }): void;
      q?: Array<unknown>;
    };
  }
}
````

## File: .gitignore
````
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
````

## File: color_palette.md
````markdown
I'll document the key style elements from the provided code to create a graphical charter that you can apply to other applications. Let me analyze the styles and create a comprehensive guide.

I've analyzed the provided code and created a comprehensive graphical charter for the API0 website. This style guide will help you apply consistent design elements to your other applications. Here's what I've created:

1. **Detailed Style Guide**: A comprehensive documentation of all visual elements including:
   - Brand colors (with light/dark mode variants)
   - Typography specifications
   - Component styles (buttons, cards, navigation)
   - Layout system
   - Design patterns and visual effects

2. **Color Palette Visualization**: A visual representation of the color scheme used in both light and dark modes.

3. **Logo Design Animation Example**: Shows how the distinctive API0 logo appears in both modes and its hover animation.

4. **Component Examples**: Visual representation of key UI components like buttons, cards, and navigation.

Key design elements that define the API0 visual identity:

1. **Color System**: 
   - Primary orange (#FF6B00) consistently used across light and dark themes
   - Carefully balanced light/dark mode color pairs
   - Semi-transparent backgrounds for depth

2. **Typography**: 
   - Clear hierarchy with bold section headers
   - Clean sans-serif font family
   - Consistent sizing scale

3. **Components**:
   - Rounded corners (rounded-lg, rounded-xl)
   - Subtle shadows for elevation
   - Hover animations for interactivity
   - Icon-led feature cards

4. **Brand Identity**:
   - Distinctive logo with rotated "0" that animates on hover
   - Consistent orange primary color
   - Clean, modern aesthetic

This style guide should serve as an excellent reference for implementing the same visual language across your other applications while maintaining brand consistency.


# API0 Style Guide & Design System

## 1. Brand Identity

### Logo
- Text logo: "api" followed by "0" with a distinctive styling
- The "0" is styled with:
  - Font weight: Black (`font-black`)
  - Color: #FF6B00 (Primary orange)
  - Transformation: Rotated -12 degrees
  - Animated: Rotates to 0 degrees on hover
  - Has a diagonal strike-through line (white on dark backgrounds, dark on light backgrounds)

### Brand Colors
| Color Name | Light Mode | Dark Mode | Usage |
|------------|------------|-----------|-------|
| Primary | #FF6B00 (Orange) | #FF6B00 (Orange) | Accent, CTA buttons, highlights |
| Background | White (hsl(0 0% 100%)) | Dark blue-gray (hsl(222.2 84% 4.9%)) | Page background |
| Foreground | Dark blue-gray (hsl(222.2 47.4% 11.2%)) | Light blue-gray (hsl(210 40% 98%)) | Primary text |
| Secondary | Light blue-gray (hsl(210 40% 96.1%)) | Dark blue-gray (hsl(217.2 32.6% 17.5%)) | Secondary elements |
| Muted | Light blue-gray (hsl(210 40% 96.1%)) | Dark blue-gray (hsl(217.2 32.6% 17.5%)) | Subtle backgrounds, less emphasized content |
| Muted Foreground | Gray (hsl(215.4 16.3% 46.9%)) | Light gray (hsl(215 20.2% 65.1%)) | Secondary text |
| Border | Light gray (hsl(214.3 31.8% 91.4%)) | Dark blue-gray (hsl(217.2 32.6% 17.5%)) | Borders, dividers |

## 2. Typography

### Font Family
- Base: System font stack with `antialiased` rendering
- Uses Tailwind's default font stack (sans-serif)

### Text Sizes
| Element | Size | Weight | Line Height |
|---------|------|--------|------------|
| Hero Heading | 6xl (4xl on mobile) | Bold | - |
| Section Headings | 3xl | Bold | - |
| Feature Headings | xl | Semibold | - |
| Body Text | Base | Regular | - |
| Large Body Text | xl-2xl | Regular | - |
| Nav Links | Base | Medium | - |
| Buttons | lg (large), Base (normal) | Medium/Semibold | - |

## 3. Component Styles

### Buttons
#### Primary Button
- Background: #FF6B00 (Primary orange)
- Text: White
- Padding: px-8 py-4 (large), px-4 py-2 (normal)
- Border radius: rounded-lg
- Hover: Slight opacity change (#FF6B00/90)
- Shadow: shadow-xl shadow-orange-500/20 (large), shadow-lg shadow-orange-500/20 (normal)
- Transition: Transform effect on hover (slides up slightly)

#### Theme Toggle Button
- Light mode: bg-gray-200 text-gray-700, hover:bg-gray-300
- Dark mode: bg-gray-800 text-primary, hover:bg-gray-700
- Border radius: rounded-full
- Focus: focus:ring-2 focus:ring-primary focus:ring-opacity-50

### Cards
- Background: bg-accent/50 (semi-transparent accent)
- Border: border border-border
- Border radius: rounded-xl
- Padding: p-6
- Layout: Flex column with centered items
- Icon container: p-4 bg-[#FF6B00]/10 rounded-full

### Navigation
- Fixed position with blur effect
- Background: bg-background/95 backdrop-blur-sm
- Border bottom: border-b border-border
- Shadow: shadow-sm
- Height: h-16
- Container: Centered with max width

### Feature Icons
- Container: p-4 bg-[#FF6B00]/10 rounded-full
- Icon: size 32px, text-[#FF6B00]

### Footer
- Background: bg-gray-900 (dark)
- Text colors: 
  - Headings: text-white
  - Links: text-gray-400, hover:text-white
  - Copyright: text-gray-400
- Border: border-t border-gray-800 (for dividers)

## 4. Layout System

### Grid
- Container: mx-auto px-4 (centered with padding)
- Feature grid: grid md:grid-cols-3 gap-12
- Footer grid: grid md:grid-cols-4 gap-8

### Spacing
- Section padding: py-24
- Between major elements: mb-12, mb-16
- Between related elements: mb-4, mb-6, mb-8
- Gap between grid items: gap-8, gap-12

### Responsive Behavior
- Mobile-first approach with breakpoints at md (768px)
- Navigation collapses below md breakpoint
- Grid columns adjust based on screen size
- Text sizes adjust (e.g., text-4xl on mobile to text-6xl on desktop)

## 5. Design Patterns

### Page Structure
1. Navigation (fixed at top)
2. Hero section with gradient background
3. Features section with card-based layout
4. Footer with multi-column information

### Visual Effects
- Gradient backgrounds: bg-gradient-to-b from-accent to-background
- Hover animations on interactive elements
- Shadow effects for elevation
- Rounded corners for all containers and interactive elements
- Semi-transparent backgrounds for depth

### Transitions
- Color transitions: transition-colors duration-200
- Transform transitions: transition duration-200 hover:-translate-y-1
- Theme transitions: transition-property: color, background-color, border-color
- Timing function: cubic-bezier(0.4, 0, 0.2, 1)
- Duration: 150ms-300ms

## 6. Implementation Guidelines

### CSS Framework
- Uses Tailwind CSS with custom theme configuration
- Custom properties defined in :root and .dark selectors

### Theme Implementation
- Light/dark mode toggle with system preference detection
- Theme stored in localStorage with 'api0-theme' key
- Quick theme application script to prevent flicker on page load

### Accessibility Considerations
- Color contrast meets accessibility standards
- Interactive elements clearly marked
- Focus states defined for keyboard navigation
- Semantic HTML structure

## 7. Icon System
Uses Lucide React icons:
- Navigation & features: MessageSquare, Search, Target
- Theme toggle: Moon, Sun, Monitor
- Social: Twitter, Linkedin, Github

## 8. Usage Examples

### Creating a Card Component
```jsx
<div className="flex flex-col items-center text-center p-6 rounded-xl bg-accent/50 border border-border">
  <div className="mb-6 p-4 bg-[#FF6B00]/10 rounded-full">
    <IconComponent size={32} className="text-[#FF6B00]" />
  </div>
  <h3 className="text-xl font-semibold mb-4 text-foreground">Title Here</h3>
  <p className="text-muted-foreground">Description text goes here.</p>
</div>
```

### Creating a Primary Button
```jsx
<a href="/destination" 
   className="inline-flex items-center px-8 py-4 rounded-lg bg-[#FF6B00] text-white text-lg font-semibold hover:bg-[#FF6B00]/90 transform transition duration-200 hover:-translate-y-1 shadow-xl shadow-orange-500/20">
  Button Text
</a>
```

### Section Layout
```jsx
<section className="py-24 bg-background">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-16 text-foreground">Section Title</h2>
    <div className="grid md:grid-cols-3 gap-12">
      {/* Content cards go here */}
    </div>
  </div>
</section>
```



<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <!-- Background -->
  <rect width="800" height="500" fill="#f8f9fa" />
  
  <!-- Title -->
  <text x="400" y="50" font-family="sans-serif" font-size="24" font-weight="bold" text-anchor="middle">API0 Color Palette</text>
  
  <!-- Light Mode Colors -->
  <text x="200" y="90" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">Light Mode</text>
  
  <!-- Primary -->
  <rect x="50" y="110" width="300" height="60" rx="5" fill="#FF6B00" />
  <text x="200" y="145" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">Primary: #FF6B00</text>
  
  <!-- Background -->
  <rect x="50" y="180" width="300" height="60" rx="5" fill="#FFFFFF" stroke="#E5E7EB" />
  <text x="200" y="215" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Background: White</text>
  
  <!-- Foreground -->
  <rect x="50" y="250" width="300" height="60" rx="5" fill="#1E293B" />
  <text x="200" y="285" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">Foreground: hsl(222.2 47.4% 11.2%)</text>
  
  <!-- Secondary -->
  <rect x="50" y="320" width="300" height="60" rx="5" fill="#F1F5F9" />
  <text x="200" y="355" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Secondary: hsl(210 40% 96.1%)</text>
  
  <!-- Border -->
  <rect x="50" y="390" width="300" height="60" rx="5" fill="#E2E8F0" />
  <text x="200" y="425" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Border: hsl(214.3 31.8% 91.4%)</text>
  
  <!-- Dark Mode Colors -->
  <text x="600" y="90" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">Dark Mode</text>
  
  <!-- Primary -->
  <rect x="450" y="110" width="300" height="60" rx="5" fill="#FF6B00" />
  <text x="600" y="145" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">Primary: #FF6B00</text>
  
  <!-- Background -->
  <rect x="450" y="180" width="300" height="60" rx="5" fill="#0F172A" />
  <text x="600" y="215" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">Background: hsl(222.2 84% 4.9%)</text>
  
  <!-- Foreground -->
  <rect x="450" y="250" width="300" height="60" rx="5" fill="#F8FAFC" />
  <text x="600" y="285" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Foreground: hsl(210 40% 98%)</text>
  
  <!-- Secondary -->
  <rect x="450" y="320" width="300" height="60" rx="5" fill="#334155" />
  <text x="600" y="355" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">Secondary: hsl(217.2 32.6% 17.5%)</text>
  
  <!-- Border -->
  <rect x="450" y="390" width="300" height="60" rx="5" fill="#334155" />
  <text x="600" y="425" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="white">Border: hsl(217.2 32.6% 17.5%)</text>
</svg>


<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200">
  <!-- Background -->
  <rect width="400" height="200" fill="#ffffff" />
  
  <!-- Dark mode background for comparison -->
  <rect x="200" y="0" width="200" height="200" fill="#0F172A" />
  
  <!-- Logo Light Mode -->
  <g transform="translate(100, 100)">
    <!-- "api" text -->
    <text x="0" y="0" font-family="sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#1E293B">api</text>
    
    <!-- "0" with rotation and strike-through -->
    <g transform="translate(30, 0) rotate(-12)">
      <text x="0" y="0" font-family="sans-serif" font-size="36" font-weight="900" text-anchor="middle" fill="#FF6B00">0</text>
      <line x1="-10" y1="-10" x2="10" y2="10" stroke="#1E293B" stroke-width="2" />
    </g>
    
    <!-- Hover state simulation (at 0 degrees) -->
    <g transform="translate(80, 0)" opacity="0.3">
      <text x="0" y="0" font-family="sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#1E293B">api</text>
      <g transform="translate(30, 0)">
        <text x="0" y="0" font-family="sans-serif" font-size="36" font-weight="900" text-anchor="middle" fill="#FF6B00">0</text>
        <line x1="-10" y1="-10" x2="10" y2="10" stroke="#1E293B" stroke-width="2" />
      </g>
    </g>
  </g>
  
  <!-- Logo Dark Mode -->
  <g transform="translate(300, 100)">
    <!-- "api" text -->
    <text x="0" y="0" font-family="sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#F8FAFC">api</text>
    
    <!-- "0" with rotation and strike-through -->
    <g transform="translate(30, 0) rotate(-12)">
      <text x="0" y="0" font-family="sans-serif" font-size="36" font-weight="900" text-anchor="middle" fill="#FF6B00">0</text>
      <line x1="-10" y1="-10" x2="10" y2="10" stroke="#F8FAFC" stroke-width="2" />
    </g>
    
    <!-- Hover state simulation (at 0 degrees) -->
    <g transform="translate(80, 0)" opacity="0.3">
      <text x="0" y="0" font-family="sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#F8FAFC">api</text>
      <g transform="translate(30, 0)">
        <text x="0" y="0" font-family="sans-serif" font-size="36" font-weight="900" text-anchor="middle" fill="#FF6B00">0</text>
        <line x1="-10" y1="-10" x2="10" y2="10" stroke="#F8FAFC" stroke-width="2" />
      </g>
    </g>
  </g>
  
  <!-- Labels -->
  <text x="100" y="30" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">Light Mode</text>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">Dark Mode</text>
  
  <text x="100" y="170" font-family="sans-serif" font-size="14" text-anchor="middle">Normal State → Hover State</text>
  <text x="300" y="170" font-family="sans-serif" font-size="14" text-anchor="middle" fill="white">Normal State → Hover State</text>
</svg>


<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <!-- Background -->
  <rect width="800" height="600" fill="#F8FAFC" />
  
  <!-- Title -->
  <text x="400" y="50" font-family="sans-serif" font-size="24" font-weight="bold" text-anchor="middle">API0 Component Examples</text>
  
  <!-- Button Examples -->
  <text x="400" y="100" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">Buttons</text>
  
  <!-- Primary Button -->
  <rect x="200" y="120" width="180" height="50" rx="8" fill="#FF6B00" filter="drop-shadow(0 4px 6px rgba(255, 107, 0, 0.2))" />
  <text x="290" y="152" font-family="sans-serif" font-size="16" font-weight="semibold" text-anchor="middle" fill="white">Try the Demo</text>
  <text x="290" y="180" font-family="sans-serif" font-size="14" text-anchor="middle">Primary Button</text>
  
  <!-- Secondary Button (Theme Toggle) -->
  <circle cx="490" cy="145" r="25" fill="#E5E7EB" />
  <path d="M490,133 L490,157 M478,145 L502,145" stroke="#4B5563" stroke-width="2" />
  <text x="490" y="180" font-family="sans-serif" font-size="14" text-anchor="middle">Theme Toggle</text>
  
  <!-- Card Examples -->
  <text x="400" y="230" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">Cards</text>
  
  <!-- Feature Card -->
  <rect x="250" y="250" width="300" height="180" rx="12" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1" />
  <circle cx="400" cy="290" r="25" fill="rgba(255, 107, 0, 0.1)" />
  <path d="M400,280 L400,300 M390,290 L410,290" stroke="#FF6B00" stroke-width="2" />
  <text x="400" y="340" font-family="sans-serif" font-size="16" font-weight="semibold" text-anchor="middle">Feature Heading</text>
  <text x="400" y="370" font-family="sans-serif" font-size="14" text-anchor="middle" width="260">Feature description text goes here.</text>
  <text x="400" y="400" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#6B7280">Feature Card (Light Mode)</text>
  
  <!-- Navigation Example -->
  <text x="400" y="460" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">Navigation</text>
  
  <!-- Nav Bar -->
  <rect x="200" y="480" width="400" height="64" rx="0" fill="rgba(255, 255, 255, 0.95)" stroke="#E2E8F0" stroke-width="1" />
  <text x="240" y="520" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">api<tspan fill="#FF6B00" font-weight="900" transform="rotate(-12, 260, 520)">0</tspan></text>
  <text x="450" y="520" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#6B7280">Features</text>
  <circle cx="520" cy="512" r="18" fill="#E5E7EB" />
  <path d="M520,506 L520,518 M514,512 L526,512" stroke="#4B5563" stroke-width="1.5" />
  <rect x="560" y="496" width="80" height="32" rx="8" fill="#FF6B00" />
  <text x="600" y="516" font-family="sans-serif" font-size="12" font-weight="medium" text-anchor="middle" fill="white">Try Demo</text>
  <text x="400" y="560" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#6B7280">Fixed Navigation Bar with Blur Effect</text>
</svg>
````

## File: config.yaml
````yaml
# Default configuration for sensei-landing
service:
  name: sensei-landing
  version: 1.0.0
````

## File: eslint.config.mjs
````
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
````

## File: next.config.ts
````typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    domains: ['api0.ai'], // Add your domain for image optimization
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Generate OG images at build time to improve performance
  async rewrites() {
    return [
      {
        source: '/og-image/:path*',
        destination: '/api/og-image/:path*',
      },
    ];
  },
  // Add trailing slashes for better SEO
  trailingSlash: true,
};

export default nextConfig;
````

## File: package.json
````json
{
  "name": "gate42-landing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "generate-sitemap": "node ./scripts/generate-sitemap.js"
  },
  "dependencies": {
    "lucide-react": "^0.475.0",
    "next": "15.1.7",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.1.7",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
````

## File: postcss.config.mjs
````
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
````

## File: README.md
````markdown
# api0 Landing Page

A modern, responsive landing page for api0 with dark mode support.

## Features

- 🌓 Dark/Light mode with theme persistence in local storage
- 🎨 Responsive design across all devices
- ⚡ Built with Next.js and Tailwind CSS
- 🔄 Smooth transitions between themes

## Getting Started

First, install the dependencies:

```bash
yarn install
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dark Mode Implementation

The dark mode implementation follows these key principles:

1. **Theme Provider** - A React context provider that manages the theme state
2. **Local Storage Persistence** - User preferences are saved in local storage
3. **CSS Variables** - Theme colors are defined using CSS variables
4. **Smooth Transitions** - CSS transitions for a smooth theme switch

### Usage

To toggle between light and dark mode, click the sun/moon icon in the navbar. The theme preference is automatically saved to local storage.

### Theme Provider

The theme provider is the core of the dark mode implementation. It:
- Initializes the theme based on local storage or default
- Provides theme context to components
- Handles theme toggling
- Persists theme preferences in local storage

```tsx
import { useTheme } from '@/components/theme/theme-provider';

// In your component
const { theme, toggleTheme } = useTheme();
```

## Design Priorities

✅ **Clarity & Simplicity** – A professional, modern aesthetic that prioritizes readability and intuitive navigation.  
✅ **Responsiveness** – Works seamlessly across desktop and mobile.  
✅ **Real-Time Updates** – Instant theme changes with smooth transitions.  
✅ **Modular & Scalable** – Card-based layout to keep information well-structured.  
✅ **Developer-Friendly** – Dark/light mode support, a responsive layout.

## Project Structure

```
src/
  app/
    globals.css           # Global styles, CSS variables for themes
    layout.tsx            # Root layout with ThemeProvider
    page.tsx              # Landing page with theme toggle
  components/
    theme/
      theme-provider.tsx  # ThemeProvider context
      theme-toggle.tsx    # Theme toggle button component
```

## Customization

### Modifying Theme Colors

To change the theme colors, edit the CSS variables in `globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
  /* Add or modify other variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* Add or modify dark mode variables */
}
```

## Configuration

Next.js and Tailwind CSS configurations are in:
- `next.config.ts`
- `tailwind.config.ts`
- `postcss.config.mjs`
````

## File: robots.txt
````
# robots.txt for api0.ai
User-agent: *
Allow: /

# Allow all bots to access the site
# Specify sitemap location
Sitemap: https://api0.ai/sitemap.xml

# Prevent bots from crawling dev/staging areas if they exist
User-agent: *
Disallow: /admin/
Disallow: /dev/
Disallow: /staging/
````

## File: tailwind.config.ts
````typescript
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
````

## File: tsconfig.json
````json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
````

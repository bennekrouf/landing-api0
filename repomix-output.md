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
- Files are sorted by Git change count (files with more changes are at the bottom)

## Additional Info

# Directory Structure
```
content/
  blog/
    sample-blog-post.md
    sample-post2.md
public/
  file.svg
  globe.svg
  window.svg
src/
  app/
    blog/
      [slug]/
        page.tsx
      page.tsx
    globals.css
    icon.svg
    layout.tsx
    page.tsx
  components/
    blog/
      BlogHeader.tsx
      TableOfContents.tsx
    theme/
      client-theme-provider.tsx
      theme-context.tsx
      theme-provider.tsx
      theme-toggle.tsx
  lib/
    blog.ts
.gitignore
color_palette.md
config.yaml
eslint.config.mjs
next.config.ts
package.json
postcss.config.mjs
README.md
tailwind.config.ts
tsconfig.json
```

# Files

## File: config.yaml
````yaml
# Default configuration for sensei-landing
service:
  name: sensei-landing
  version: 1.0.0
````

## File: content/blog/sample-blog-post.md
````markdown
---
title: "Understanding API Routing: A Comprehensive Guide"
date: "2025-04-28"
excerpt: "Learn the fundamentals of API routing, why it matters for your architecture, and how new AI-powered approaches are changing the game."
author:
  name: "Sarah Tech"
  avatar: "/images/authors/sarah.jpg"
tags: ["API", "Architecture", "NLP", "Tutorials"]
image: "/images/blog/api-routing-header.jpg"
---

# Understanding API Routing: A Comprehensive Guide

In today's interconnected digital ecosystem, APIs serve as the critical bridges between services, applications, and data sources. However, as organizations scale and their API ecosystems grow more complex, effective API routing becomes essential for maintaining performance, security, and developer experience.

## What is API Routing?

API routing is the process of directing API requests to the appropriate backend services based on various parameters such as:

- Request path
- HTTP method
- Headers
- Query parameters
- Request body content

A well-designed API routing system acts as an intelligent traffic controller, ensuring requests reach their intended destinations efficiently while enforcing security policies, rate limits, and other governance rules.

## Traditional API Routing Approaches

Historically, API routing has relied on explicit mapping configurations:

```yaml
routes:
  - path: /users
    service: user-service
    methods: [GET, POST]
  - path: /products
    service: product-service
    methods: [GET, POST, PUT, DELETE]
```

While functional, this approach becomes unwieldy as your API ecosystem grows, requiring constant maintenance and updates as new services are added or existing ones evolve.

## The Natural Language Revolution in API Routing

Modern API routing leverages natural language processing to create more intuitive interfaces between humans and APIs. Instead of requiring developers to learn and remember specific endpoint structures, NLP-powered routing can:

1. **Understand intent from conversational requests**
2. **Extract relevant parameters**
3. **Match to appropriate API endpoints**
4. **Handle ambiguity through clarification**

This approach dramatically reduces the cognitive load on developers and end-users alike, making APIs more accessible and easier to use.

## Implementing Intelligent API Routing

To implement intelligent API routing in your organization, consider these key steps:

### 1. API Discovery and Documentation

Before you can route effectively, you need comprehensive visibility into your API ecosystem:

- Document all existing APIs using OpenAPI/Swagger
- Tag APIs with relevant metadata (domain, function, data entities)
- Implement API discovery mechanisms

### 2. Semantic Understanding Layer

Add a semantic layer that can translate between natural language requests and API specifications:

- Develop intent recognition models
- Create entity extraction pipelines
- Build context-aware parameter mapping

### 3. Routing and Orchestration

Implement the core routing logic:

- Design a scoring system for matching requests to APIs
- Develop fallback and disambiguation strategies
- Create orchestration patterns for multi-API workflows

### 4. Continuous Learning

Make your routing system self-improving:

- Track successful and failed routings
- Analyze user interaction patterns
- Implement feedback loops for continuous improvement

## Measuring Success

How do you know if your API routing system is effective? Monitor these key metrics:

- **Routing accuracy**: Percentage of requests correctly routed
- **Resolution time**: Time from request to service identification
- **Developer adoption**: Increase in API consumption
- **Support ticket reduction**: Decrease in routing-related issues

## Conclusion

Intelligent API routing represents a fundamental shift in how we think about API design and consumption. By leveraging natural language processing and intent-based routing, organizations can create more intuitive, accessible, and maintainable API ecosystems.

In the next article, we'll dive deeper into implementing a proof-of-concept NLP-powered API router using open-source tools and frameworks.

## References

1. API Gateway Design Patterns (2023)
2. The Evolution of API Management (2024)
3. Natural Language Processing for Developer Experience (2024)
````

## File: content/blog/sample-post2.md
````markdown
---
title: "Getting Started with API0"
date: "2025-04-29"
excerpt: "Learn how API0 can simplify your API routing and discovery with natural language processing."
author:
  name: "API0 Team"
tags: ["API", "Getting Started", "Tutorial"]
image: "/images/blog/getting-started.jpg"
---

# Getting Started with API0

API0 is a revolutionary approach to API management that uses natural language processing to connect users to the right APIs instantly. This guide will help you get started with API0 and show you how to leverage its powerful features.

## Why API0?

Traditional API management requires developers to:

- Learn specific endpoint structures
- Remember parameter formats
- Navigate complex documentation
- Update integrations when APIs change

API0 eliminates these pain points by allowing developers to use natural language to describe what they want to accomplish.

## Key Features

### 1. Natural Language Processing

API0 understands conversational requests and translates them into structured API calls. For example:

```
"Show me recent orders for customer John Smith"
```

Gets automatically converted into:

```json
{
  "endpoint": "/orders",
  "parameters": {
    "customer": "John Smith",
    "sort": "date",
    "order": "desc"
  }
}
```

### 2. Automatic API Discovery

API0 maintains a semantic understanding of your entire API ecosystem, allowing it to:

- Identify the most relevant APIs for any request
- Understand relationships between APIs
- Map parameters across different services
- Suggest alternatives when exact matches aren't available

### 3. Intent-Based Routing

Rather than requiring exact endpoint matches, API0:

- Understands the intent behind requests
- Maps intents to appropriate services
- Handles ambiguity through clarification
- Learns from usage patterns

## Getting Started

### Step 1: Install the Client

```bash
# Using npm
npm install api0-client

# Using yarn
yarn add api0-client
```

### Step 2: Initialize the Client

```javascript
import { API0Client } from 'api0-client';

const client = new API0Client({
  apiKey: 'your_api_key',
  environment: 'production',
});
```

### Step 3: Make Your First Request

```javascript
// Natural language request
const response = await client.query("Get all products in the electronics category");

// Access the result
console.log(response.data);
```

## Use Cases

API0 excels in scenarios like:

* **Internal Developer Portals** - Simplify access to company APIs
* **Customer-Facing APIs** - Create more intuitive interfaces
* **API Gateway** - Intelligent routing across microservices
* **Data Integration** - Connect disparate data sources with natural language

## Best Practices

For optimal results with API0:

1. **Be descriptive but concise** in your queries
2. **Include relevant parameters** directly in your natural language request
3. **Provide context** when necessary
4. **Review API mappings** periodically to ensure accuracy
5. **Incorporate feedback** to improve matching accuracy

## Conclusion

API0 represents a paradigm shift in how developers interact with APIs. By leveraging natural language processing, it eliminates the cognitive load of learning API specifics and lets developers focus on what they want to accomplish rather than how to format the request.

Ready to experience API0 for yourself? [Try the demo](https://app.api0.ai) today and see how it can transform your API experience.
````

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

## File: src/app/blog/[slug]/page.tsx
````typescript
// src/app/blog/[slug]/page.tsx
// Update this file to correctly handle markdown rendering

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
    <div className="container mx-auto px-4 py-24 mt-16">
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
````

## File: src/app/blog/page.tsx
````typescript
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

## File: src/components/blog/BlogHeader.tsx
````typescript
// src/components/blog/BlogHeader.tsx
import React from 'react';
import Image from 'next/image'; // Add this import

interface BlogHeaderProps {
  title: string;
  date: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  readingTime?: string;
  image?: string;
}

export function BlogHeader({ title, date, author, tags, readingTime, image }: BlogHeaderProps) {
  return (
    <header className="mb-8">
      {tags && tags.length > 0 && (
        <div className="flex gap-3 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-sm rounded-full bg-[#FF6B00]/10 text-[#FF6B00]">
              {tag}
            </span>
          ))}
        </div>
      )}

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 mb-8 text-muted-foreground">
        {author && (
          <div className="flex items-center gap-2">
            {author.avatar && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  className="object-cover"
                  sizes="32px"
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

      {image && (
        <div className="aspect-video w-full overflow-hidden rounded-xl mb-8 relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority  // For hero images, use priority to load faster
          />
        </div>
      )}
    </header>
  );
}
````

## File: src/components/blog/TableOfContents.tsx
````typescript
'use client';
import React, { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  return (
    <nav className="p-4 rounded-xl border border-border bg-accent/50">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Table of Contents</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block py-1 text-sm transition hover:text-[#FF6B00] ${activeId === heading.id
                  ? 'text-[#FF6B00] font-medium'
                  : 'text-muted-foreground'
                }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
````

## File: src/lib/blog.ts
````typescript
// src/lib/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import readingTime from 'reading-time';

interface PostMeta {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  image?: string;
  readingTime?: string;
}

interface Post extends PostMeta {
  content: string;
  contentHtml: string; // Make sure this exists and is populated
  headings: Array<{ id: string; text: string; level: number }>;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

export async function getBlogPosts(): Promise<PostMeta[]> {
  // Check if directory exists, create if not
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled Post',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || '',
        author: data.author,
        tags: data.tags || [],
        image: data.image,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getBlogPost(slug: string): Promise<Post | null> {
  try {
    // Check for both .md and .mdx extensions
    let fullPath = path.join(postsDirectory, `${slug}.mdx`);
    // let isMdx = true;

    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.md`);
      // isMdx = false;

      if (!fs.existsSync(fullPath)) {
        return null;
      }
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Calculate reading time
    const stats = readingTime(content);

    // Process markdown to HTML - THIS IS CRITICAL FOR PROPER RENDERING
    // Use remark-gfm for GitHub Flavored Markdown (tables, strikethrough, etc.)
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false }) // Don't sanitize to allow custom HTML
      .process(content);

    const contentHtml = processedContent.toString();

    // Extract headings for table of contents
    const headings: Array<{ id: string; text: string; level: number }> = [];
    const lines = content.split('\n');

    lines.forEach(line => {
      const headingMatch = line.match(/^(#{2,6})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');

        headings.push({ id, text, level });
      }
    });

    // Add a console.log to debug the HTML output
    console.log(`[DEBUG] Post HTML for ${slug}:`, contentHtml.slice(0, 300) + '...');

    return {
      slug,
      title: data.title || 'Untitled Post',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      content, // Raw markdown
      contentHtml, // Critical: Processed HTML content
      author: data.author,
      tags: data.tags || [],
      image: data.image,
      readingTime: stats.text,
      headings,
    };
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error);
    return null;
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
  /* config options here */
};

export default nextConfig;
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
  defaultTheme = 'system',
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
    "lint": "next lint"
  },
  "dependencies": {
    "gray-matter": "^4.0.3",
    "lucide-react": "^0.475.0",
    "next": "15.1.7",
    "next-mdx-remote": "^5.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "reading-time": "^1.5.0",
    "remark": "^15.0.1",
    "remark-gfm": "^4.0.1",
    "remark-html": "^16.0.1",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/typography": "^0.5.16",
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

## File: tailwind.config.ts
````typescript
// tailwind.config.ts
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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'hsl(var(--foreground))',
            a: {
              color: 'hsl(var(--primary))',
              '&:hover': {
                color: 'hsl(var(--primary) / 0.8)',
              },
            },
            h1: {
              color: 'hsl(var(--foreground))',
            },
            h2: {
              color: 'hsl(var(--foreground))',
            },
            h3: {
              color: 'hsl(var(--foreground))',
            },
            h4: {
              color: 'hsl(var(--foreground))',
            },
            blockquote: {
              color: 'hsl(var(--muted-foreground))',
              borderLeftColor: 'hsl(var(--primary))',
            },
            code: {
              color: 'hsl(var(--foreground))',
              backgroundColor: 'hsl(var(--muted))',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
              '&::before': {
                content: '""',
              },
              '&::after': {
                content: '""',
              },
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
            },
            pre: {
              color: 'hsl(var(--foreground))',
              backgroundColor: 'hsl(var(--muted))',
              borderRadius: '0.5rem',
              padding: '1rem',
              overflowX: 'auto',
            },
            strong: {
              color: 'hsl(var(--foreground))',
            },
            hr: {
              borderColor: 'hsl(var(--border))',
            },
            ul: {
              listStyleType: 'disc',
            },
            li: {
              color: 'hsl(var(--muted-foreground))',
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            p: {
              color: 'hsl(var(--muted-foreground))',
            },
            img: {
              borderRadius: '0.5rem',
            },
            figure: {
              margin: '2rem 0',
            },
            figcaption: {
              color: 'hsl(var(--muted-foreground))',
              fontSize: '0.875rem',
              textAlign: 'center',
              marginTop: '0.5rem',
            },
            table: {
              fontSize: '0.875rem',
            },
            thead: {
              borderBottomColor: 'hsl(var(--border))',
            },
            'thead th': {
              color: 'hsl(var(--foreground))',
            },
            'tbody tr': {
              borderBottomColor: 'hsl(var(--border))',
            },
            'tbody td': {
              padding: '0.75rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'), // This plugin is essential for Markdown styling
  ],
}

export default config
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
                  } else if (storedTheme === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else if (storedTheme === 'system' || !storedTheme) {
                    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    document.documentElement.classList.add(systemTheme);
                    document.documentElement.setAttribute('data-theme', systemTheme);
                  }
                } catch (e) {
                  console.error('Error applying theme:', e);
                }
              })();
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
import Link from 'next/link';
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
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
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

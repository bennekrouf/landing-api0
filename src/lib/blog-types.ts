// src/lib/blog-types.ts

export interface Author {
  name: string;
  image?: string;
  bio?: string;
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface SEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string | null;
}

// Base post metadata - common properties shared across interfaces
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: Author;
  tags: string[];
  readingTime: string;
  image: string | null;
  svg: string | null;
  seo: SEO;
}

// Complete post interface with content and HTML
export interface Post extends PostMeta {
  content: string;
  contentHtml: string;
  headings: Heading[];
}

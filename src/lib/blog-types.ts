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
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
}

// Base post metadata - common properties shared across interfaces
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: Author;
  tags?: string[];
  readingTime?: string;
  image?: string;
  svg?: string;
  seo?: SEO;
}

// Complete post interface with content and HTML
export interface Post extends PostMeta {
  content: string;
  contentHtml: string; // Required in this definition
  headings: Heading[];
}

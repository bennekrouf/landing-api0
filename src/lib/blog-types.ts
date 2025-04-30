// src/lib/blog-types.ts
// This file defines the types used across the blog system

export interface PostMeta {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  svg?: string;      // New: path to SVG illustration
  image?: string;    // Kept for backward compatibility
  readingTime?: string;
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface Post extends PostMeta {
  content: string;
  contentHtml: string;
  headings: Heading[];
}

// SVG display options for different contexts
export interface SVGDisplayOptions {
  className?: string;
  width?: string | number;
  height?: string | number;
  priority?: boolean;
  alt?: string;
}

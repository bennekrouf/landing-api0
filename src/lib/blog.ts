// src/lib/blog.ts
import blogPostsData from '@/data/blog-posts.json';
import type { Post } from './blog-types';

// Type assertion to ensure the imported JSON has the correct structure
const blogPosts = blogPostsData as Post[];

/**
 * Get all blog posts
 */
export async function getBlogPosts(): Promise<Post[]> {
  return blogPosts;
}

/**
 * Get a single blog post by slug
 * @param slug The post slug to retrieve
 */
export async function getBlogPost(slug: string): Promise<Post | null> {
  // Find the post with the matching slug
  const post = blogPosts.find(post => post.slug === slug);
  
  // Return the post or null if not found
  return post || null;
}

/**
 * Search blog posts by query
 * @param query Search query
 */
export async function searchBlogPosts(query: string): Promise<Post[]> {
  if (!query || query.trim() === '') {
    return blogPosts;
  }
  
  const lowerQuery = query.toLowerCase();
  
  return blogPosts.filter(post => {
    // Search in title, excerpt, content, tags
    return (
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  });
}

/**
 * Get blog posts by tag
 * @param tag Tag to filter by
 */
export async function getBlogPostsByTag(tag: string): Promise<Post[]> {
  if (!tag || tag.trim() === '') {
    return blogPosts;
  }
  
  const lowerTag = tag.toLowerCase();
  
  return blogPosts.filter(post => {
    return post.tags?.some(postTag => postTag.toLowerCase() === lowerTag);
  });
}

/**
 * Get all unique tags from blog posts
 */
export async function getAllTags(): Promise<string[]> {
  const tagSet = new Set<string>();
  
  blogPosts.forEach(post => {
    post.tags?.forEach(tag => tagSet.add(tag));
  });
  
  return Array.from(tagSet).sort();
}

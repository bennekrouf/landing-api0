// src/lib/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import readingTime from 'reading-time';
import { Heading, Post, PostMeta } from './blog-types';

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
        svg: data.svg,           // Add support for SVG
        image: data.image,       // Keep for backward compatibility
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getBlogPost(slug: string): Promise<Post | null> {
  try {
    // Check for both .md and .mdx extensions
    let fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.md`);

      if (!fs.existsSync(fullPath)) {
        return null;
      }
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Calculate reading time
    const stats = readingTime(content);

    // Remove the first h1 heading to avoid title duplication
    const processedContent = removeFirstH1Heading(content);

    // Process markdown to HTML
    const remarkResult = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false }) // Don't sanitize to allow custom HTML
      .process(processedContent);

    const contentHtml = remarkResult.toString();

    // Extract headings for table of contents - use original content here
    // to include all headings, but increment the level of the first h1 (if found)
    const headings = extractHeadings(content);

    return {
      slug,
      title: data.title || 'Untitled Post',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      content: processedContent, // Content with first h1 removed
      contentHtml, // Processed HTML content
      author: data.author,
      tags: data.tags || [],
      svg: data.svg,          // Add support for SVG
      image: data.image,      // Keep for backward compatibility
      readingTime: stats.text,
      headings,
    };
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error);
    return null;
  }
}

// Helper function to remove the first h1 heading from markdown content
function removeFirstH1Heading(content: string): string {
  const lines = content.split('\n');

  // Find the first h1 heading
  const h1Index = lines.findIndex(line => /^# (.+)$/.test(line));

  if (h1Index >= 0) {
    // Remove the first h1 heading
    lines.splice(h1Index, 1);
    return lines.join('\n');
  }

  return content;
}

// Helper function to extract headings
function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const lines = content.split('\n');

  // Track if we've processed the first h1 already
  let foundFirstH1 = false;

  lines.forEach(line => {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();

      // Skip the first h1 in the table of contents too since we removed it from content
      if (level === 1 && !foundFirstH1) {
        foundFirstH1 = true;
        return;
      }

      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      headings.push({ id, text, level });
    }
  });

  return headings;
}

// Utility to check if an SVG exists
export function svgExists(svgPath: string): boolean {
  if (!svgPath) return false;

  const fullPath = path.join(process.cwd(), 'public', svgPath);
  return fs.existsSync(fullPath);
}

// Get an SVG as a string (useful for inline embedding)
export function getSvgContent(svgPath: string): string | null {
  try {
    if (!svgPath) return null;

    const fullPath = path.join(process.cwd(), 'public', svgPath);
    if (!fs.existsSync(fullPath)) return null;

    return fs.readFileSync(fullPath, 'utf8');
  } catch (error) {
    console.error(`Error reading SVG file ${svgPath}:`, error);
    return null;
  }
}

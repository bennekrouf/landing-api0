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

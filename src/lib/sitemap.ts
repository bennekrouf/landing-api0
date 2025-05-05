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

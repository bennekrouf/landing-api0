// src/app/api/og-image/[slug]/route.ts
import { NextRequest } from 'next/server';
import { getBlogPost } from '@/lib/blog';
import satori from 'satori';
import sharp from 'sharp';

export const runtime = 'edge';

// Basic HTML template as a string
const generateHtmlTemplate = (title: string, excerpt: string, author: string, tags: string[]) => `
  <div style="display:flex;flex-direction:column;width:1200px;height:630px;background:linear-gradient(to bottom right,#0f172a,#1e293b);padding:80px;color:white;font-family:sans-serif;">
    <div style="display:flex;margin-bottom:40px;">
      <span style="font-size:48px;font-weight:bold;">api<span style="color:#FF6B00;font-weight:900;">0</span></span>
    </div>
    <h1 style="font-size:64px;font-weight:bold;max-width:900px;margin-bottom:20px;line-height:1.2;">${title}</h1>
    <p style="font-size:24px;max-width:800px;color:#e2e8f0;margin-bottom:30px;line-height:1.4;">${excerpt}</p>
    <div style="display:flex;margin-top:auto;">
      <div style="display:flex;flex-direction:column;">
        <span style="font-size:18px;color:#94a3b8;">By ${author}</span>
        <div style="display:flex;gap:10px;margin-top:10px;">
          ${tags.slice(0, 3).map(tag => 
            `<span style="background-color:rgba(255,107,0,0.2);color:#FF6B00;padding:6px 12px;border-radius:100px;font-size:16px;">${tag}</span>`
          ).join('')}
        </div>
      </div>
    </div>
    <div style="position:absolute;bottom:40px;right:40px;font-size:24px;color:#94a3b8;">api0.ai</div>
  </div>
`;

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
    const authorName = author?.name || 'API0 Team';
    const tagList = tags || [];
    
    // Generate SVG using satori
    const svg = await satori(
      generateHtmlTemplate(title, excerpt, authorName, tagList),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: await fetch(new URL('https://rsms.me/inter/font-files/Inter-Regular.woff', import.meta.url)).then(res => res.arrayBuffer()),
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Inter',
            data: await fetch(new URL('https://rsms.me/inter/font-files/Inter-Bold.woff', import.meta.url)).then(res => res.arrayBuffer()),
            weight: 700,
            style: 'normal',
          },
        ],
      }
    );
    
    // Convert SVG to PNG using sharp
    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    
    // Return the PNG image
    return new Response(png, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
    
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}

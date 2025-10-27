import { generateSitemap, generateSitemapXML } from '@/lib/sitemap';

export async function GET() {
  const sitemapData = await generateSitemap();
  const sitemapXML = generateSitemapXML(sitemapData);

  return new Response(sitemapXML, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}

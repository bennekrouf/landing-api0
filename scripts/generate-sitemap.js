// scripts/generate-sitemap.js
//
// Every page the site serves, and nothing that redirects or 404s. This used to
// list only the home page and the blog, so the pricing, use-cases, fit and
// guide pages, and the whole French side, were left for Google to stumble on.
//
// English lives at the root and French under /fr. A page that exists in both
// gets hreflang links to its counterpart. Runs after prebuild, which writes the
// blog and guide data read here.

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://api0.ai';

// Pages at the same path in both languages: '/x' in English is '/fr/x' in
// French ('' is the home page). Keep in step with src/app and src/app/fr.
const BILINGUAL_PAGES = [
  { path: '', changefreq: 'weekly', priority: '1.0' },
  { path: '/pricing', changefreq: 'monthly', priority: '0.9' },
  { path: '/use-cases', changefreq: 'monthly', priority: '0.8' },
  { path: '/fit', changefreq: 'monthly', priority: '0.7' },
  { path: '/guides', changefreq: 'weekly', priority: '0.9' },
];

// English-only pages.
const ENGLISH_PAGES = [
  { path: '/blog', changefreq: 'daily', priority: '0.9' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
];

const enUrl = (p) => `${BASE_URL}${p}`;
const frUrl = (p) => `${BASE_URL}/fr${p}`;

function readJson(file) {
  const full = path.join(process.cwd(), file);
  if (!fs.existsSync(full)) {
    console.warn(`⚠️  ${file} not found, skipping it`);
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(full, 'utf8'));
  } catch (error) {
    console.warn(`⚠️  Could not read ${file}:`, error.message);
    return [];
  }
}

const day = (date) => (date ? String(date).split('T')[0] : undefined);

function urlEntry({ loc, changefreq, priority, lastmod, alternates }) {
  const links = alternates
    ? `
    <xhtml:link rel="alternate" hreflang="en" href="${alternates.en}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${alternates.fr}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${alternates.en}"/>`
    : '';
  return `
  <url>
    <loc>${loc}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${links}
  </url>`;
}

function generateSitemap() {
  const posts = readJson('src/data/blog-posts.json');
  const guides = readJson('src/data/guides.json');
  const entries = [];

  for (const page of BILINGUAL_PAGES) {
    const alternates = { en: enUrl(page.path), fr: frUrl(page.path) };
    entries.push(urlEntry({ ...page, loc: alternates.en, alternates }));
    entries.push(urlEntry({ ...page, loc: alternates.fr, alternates }));
  }

  for (const page of ENGLISH_PAGES) {
    entries.push(urlEntry({ ...page, loc: enUrl(page.path) }));
  }

  // Guides: a guide and its translation share a number (see translationOf in
  // src/lib/guides.ts), and the slugs differ by language.
  const guideUrl = (g) => (g.lang === 'fr' ? frUrl(`/guides/${g.slug}`) : enUrl(`/guides/${g.slug}`));
  for (const guide of guides) {
    const other = guides.find((g) => g.number === guide.number && g.lang !== guide.lang);
    const alternates = other
      ? { [guide.lang]: guideUrl(guide), [other.lang]: guideUrl(other) }
      : undefined;
    entries.push(
      urlEntry({
        loc: guideUrl(guide),
        changefreq: 'monthly',
        priority: '0.8',
        lastmod: day(guide.date),
        alternates,
      }),
    );
  }

  for (const post of posts) {
    entries.push(
      urlEntry({
        loc: enUrl(`/blog/${post.slug}`),
        changefreq: 'monthly',
        priority: '0.8',
        lastmod: day(post.date),
      }),
    );
  }

  console.log(
    `Sitemap: ${BILINGUAL_PAGES.length * 2 + ENGLISH_PAGES.length} pages, ${guides.length} guides, ${posts.length} blog posts`,
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join('')}
</urlset>
`;
}

function writeSitemap() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateSitemap());
    console.log('✅ Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

writeSitemap();

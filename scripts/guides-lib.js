// scripts/guides-lib.js
//
// Shared by the guide scripts: where the guides live, how a file name becomes
// a number and a slug, and how a guide's markdown becomes HTML (headings get
// ids, so the table of contents and #anchors work).
//
//   content/guides/en/05-azure-devops-microsoft-sign-in.md
//   content/guides/fr/05-azure-devops-connexion-microsoft.md
//
// The same number is the same guide in both languages.

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { Marked } = require('marked');
const slugify = require('slugify');
const readingTime = require('reading-time');

const LANGS = ['en', 'fr'];
const CONTENT_DIR = path.join(process.cwd(), 'content/guides');
const PDF_DIR = path.join(process.cwd(), 'public/downloads/guides');
const SITE = 'https://api0.ai';

/** `05-azure-devops-microsoft-sign-in.md` → { number: 5, slug: 'azure-devops-microsoft-sign-in' } */
function parseFileName(fileName) {
  const m = /^(\d+)-(.+)\.md$/.exec(fileName);
  return m ? { number: Number(m[1]), slug: m[2] } : null;
}

function headingId(text) {
  return slugify(text.replace(/[`*_]/g, ''), { lower: true, strict: true });
}

/** Markdown → HTML, every heading with an id; `absolute` turns /links into https://api0.ai/links (for PDFs). */
function render(markdown, { absolute = false } = {}) {
  const marked = new Marked({ gfm: true });
  const seen = new Map();
  marked.use({
    renderer: {
      heading({ tokens, depth, text }) {
        let id = headingId(text);
        const n = seen.get(id) || 0;
        seen.set(id, n + 1);
        if (n) id = `${id}-${n}`;
        return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },
    },
  });
  if (absolute) {
    marked.use({
      walkTokens(token) {
        if (token.type === 'link' && token.href.startsWith('/')) token.href = SITE + token.href;
      },
    });
  }
  return marked.parse(markdown);
}

/** Level-2 and level-3 headings, with the same ids `render` gives them. */
function headings(markdown) {
  const out = [];
  const seen = new Map();
  let inFence = false;
  for (const line of markdown.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    const m = !inFence && /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    let id = headingId(m[2]);
    const n = seen.get(id) || 0;
    seen.set(id, n + 1);
    if (n) id = `${id}-${n}`;
    const level = m[1].length;
    if (level === 2 || level === 3) out.push({ id, text: m[2].replace(/[`*_]/g, ''), level });
  }
  return out;
}

/** The PDF's public path for a guide. */
function pdfPath(lang, number, slug) {
  return `/downloads/guides/${lang}/api0-guide-${String(number).padStart(2, '0')}-${slug}.pdf`;
}

/** Every guide in content/guides, both languages, sorted by number. */
function readGuides() {
  const guides = [];
  for (const lang of LANGS) {
    const dir = path.join(CONTENT_DIR, lang);
    if (!fs.existsSync(dir)) continue;
    for (const fileName of fs.readdirSync(dir).sort()) {
      const parsed = parseFileName(fileName);
      if (!parsed) continue;
      const { data, content } = matter(fs.readFileSync(path.join(dir, fileName), 'utf8'));
      // The H1 repeats the title, which the page and the PDF show themselves.
      const body = content.replace(/^\s*#\s+.+\n/, '');
      guides.push({
        lang,
        number: parsed.number,
        slug: parsed.slug,
        fileName,
        title: data.title,
        date: String(data.date || ''),
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        readingTime: `${Math.max(1, Math.ceil(readingTime(body).minutes))} min`,
        pdf: pdfPath(lang, parsed.number, parsed.slug),
        body,
      });
    }
  }
  return guides.sort((a, b) => a.number - b.number || a.lang.localeCompare(b.lang));
}

module.exports = { LANGS, CONTENT_DIR, PDF_DIR, SITE, parseFileName, render, headings, pdfPath, readGuides };

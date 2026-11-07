// scripts/generate-guide-pdfs.js
//
// One PDF per guide and language, printed by headless Chrome from the same
// markdown as the pages, into public/downloads/guides/{en,fr}/. Run by hand
// (`yarn guides`) on a machine with Chrome: the PDFs are committed, the build
// does not make them. CHROME_PATH overrides where Chrome is.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { readGuides, render, SITE } = require('./guides-lib');

const CHROME =
  process.env.CHROME_PATH ||
  [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].find((p) => fs.existsSync(p));

if (!CHROME) {
  console.error('Chrome not found: set CHROME_PATH.');
  process.exit(1);
}

const LABELS = {
  en: { guide: 'Guide', updated: 'Updated', read: 'Read online:', locale: 'en-GB' },
  fr: { guide: 'Guide', updated: 'Mis à jour le', read: 'Lire en ligne :', locale: 'fr-CH' },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CSS = `
@page {
  size: A4;
  margin: 18mm 18mm 20mm;
  @bottom-left { content: "api0.ai"; font: 8.5pt -apple-system, "Helvetica Neue", Arial, sans-serif; color: #9a9a9a; }
  @bottom-right { content: counter(page) " / " counter(pages); font: 8.5pt -apple-system, "Helvetica Neue", Arial, sans-serif; color: #9a9a9a; }
}
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font: 10.5pt/1.55 -apple-system, "Helvetica Neue", Arial, sans-serif; color: #1d1d1f; }
.brand { font-weight: 800; font-size: 15pt; letter-spacing: -0.02em; }
.brand span { color: #FF6B00; }
.cover { border-bottom: 2px solid #FF6B00; padding-bottom: 14pt; margin-bottom: 18pt; }
.kicker { margin-top: 18pt; font-size: 8.5pt; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #FF6B00; }
h1.title { font-size: 22pt; line-height: 1.2; margin: 6pt 0 10pt; letter-spacing: -0.01em; }
.excerpt { font-size: 11.5pt; color: #4a4a4f; margin: 0 0 10pt; }
.meta { font-size: 8.5pt; color: #8a8a8e; }
.meta a { color: #8a8a8e; }
h2 { font-size: 14.5pt; margin: 20pt 0 6pt; break-after: avoid; }
h3 { font-size: 11.5pt; margin: 14pt 0 4pt; break-after: avoid; }
h4 { font-size: 10.5pt; margin: 12pt 0 4pt; break-after: avoid; }
p, ul, ol { margin: 0 0 7pt; }
li { margin: 2pt 0; }
a { color: #c25200; text-decoration: none; }
strong { color: #000; }
code { font: 8.8pt/1.4 "SF Mono", Menlo, Consolas, monospace; background: #f3f3f5; padding: 0.5pt 3pt; border-radius: 3pt; overflow-wrap: anywhere; }
pre { background: #f6f6f8; border: 1px solid #e6e6ea; border-radius: 5pt; padding: 7pt 9pt; white-space: pre-wrap; overflow-wrap: anywhere; break-inside: avoid; margin: 0 0 8pt; }
pre code { background: none; padding: 0; }
blockquote { margin: 0 0 9pt; padding: 7pt 10pt; border-left: 3px solid #FF6B00; background: #fff6ef; border-radius: 0 5pt 5pt 0; break-inside: avoid; }
blockquote p:last-child, blockquote pre:last-child { margin-bottom: 0; }
table { width: 100%; border-collapse: collapse; margin: 0 0 10pt; font-size: 9.2pt; break-inside: auto; }
tr { break-inside: avoid; }
th, td { text-align: left; vertical-align: top; padding: 4pt 6pt; border-bottom: 1px solid #e3e3e8; overflow-wrap: anywhere; }
th { background: #f6f6f8; font-weight: 600; }
/* In a table, a short placeholder stays whole; only a token wider than its column breaks. */
td code, th code { overflow-wrap: break-word; }
hr { border: 0; border-top: 1px solid #e3e3e8; margin: 16pt 0; }
img { max-width: 100%; }
`;

function html(guide) {
  const t = LABELS[guide.lang];
  const url = `${SITE}${guide.lang === 'fr' ? '/fr' : ''}/guides/${guide.slug}`;
  const date = guide.date
    ? new Date(guide.date + 'T00:00:00Z').toLocaleDateString(t.locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
    : '';
  return `<!doctype html>
<html lang="${guide.lang}"><head><meta charset="utf-8"><title>${esc(guide.title)}</title><style>${CSS}</style></head>
<body>
  <header class="cover">
    <div class="brand">api<span>0</span></div>
    <div class="kicker">${t.guide} ${String(guide.number).padStart(2, '0')}</div>
    <h1 class="title">${esc(guide.title)}</h1>
    <p class="excerpt">${esc(guide.excerpt)}</p>
    <div class="meta">${date ? `${t.updated} ${esc(date)} · ` : ''}${t.read} <a href="${url}">${url.replace('https://', '')}</a></div>
  </header>
  <main>${render(guide.body, { absolute: true })}</main>
</body></html>`;
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'api0-guides-'));
const profile = path.join(tmp, 'profile');
let count = 0;
for (const guide of readGuides()) {
  const htmlFile = path.join(tmp, `${guide.lang}-${guide.slug}.html`);
  fs.writeFileSync(htmlFile, html(guide));
  const out = path.join(process.cwd(), 'public', guide.pdf);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  execFileSync(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profile}`,
    '--no-pdf-header-footer',
    `--print-to-pdf=${out}`,
    `file://${htmlFile}`,
  ], { stdio: 'pipe' });
  console.log(`  ${guide.pdf}`);
  count++;
}
fs.rmSync(tmp, { recursive: true, force: true });

// PDFs of guides that no longer exist.
const wanted = new Set(readGuides().map((g) => path.join(process.cwd(), 'public', g.pdf)));
for (const lang of ['en', 'fr']) {
  const dir = path.join(process.cwd(), 'public/downloads/guides', lang);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (f.endsWith('.pdf') && !wanted.has(p)) fs.unlinkSync(p);
  }
}
console.log(`✅ ${count} PDFs written`);

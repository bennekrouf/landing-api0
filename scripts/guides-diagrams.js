// scripts/guides-diagrams.js
//
// Mermaid diagrams in the guides, drawn once as SVG and put in the page and the
// PDF as they are: no JavaScript in the reader's browser, nothing for the PDF
// printer to wait for.
//
// `yarn guides` (sync-guides.js) calls renderDiagrams(): every ```mermaid
// block in content/guides is drawn by headless Chrome with Mermaid and saved as
// content/guides/diagrams/<hash>.svg, named after its source, so an unchanged
// diagram is never redrawn and an edited one gets a new file. The SVGs are
// committed: the site build (generate-guides-data.js) only reads them, and runs
// where there may be no Chrome.
//
// Drawing needs network once per new diagram: Mermaid is loaded from jsDelivr.

const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const CONTENT_DIR = path.join(process.cwd(), 'content/guides');
const DIAGRAM_DIR = path.join(CONTENT_DIR, 'diagrams');
const MERMAID = 'https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js';

const FENCE = /^```mermaid[ \t]*\n([\s\S]*?)\n```[ \t]*$/gm;

function findChrome() {
  return (
    process.env.CHROME_PATH ||
    [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      '/usr/bin/google-chrome',
      '/usr/bin/chromium',
    ].find((p) => fs.existsSync(p))
  );
}

/** The file name of a diagram: its source's hash, so FR and EN share one when they match. */
function diagramId(code) {
  return crypto.createHash('sha256').update(code.trim()).digest('hex').slice(0, 16);
}

const svgPath = (id) => path.join(DIAGRAM_DIR, `${id}.svg`);

/** Every mermaid block in content/guides. */
function collect() {
  const blocks = new Map();
  for (const lang of ['en', 'fr']) {
    const dir = path.join(CONTENT_DIR, lang);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      const text = fs.readFileSync(path.join(dir, f), 'utf8');
      for (const m of text.matchAll(FENCE)) blocks.set(diagramId(m[1]), { code: m[1], from: `${lang}/${f}` });
    }
  }
  return blocks;
}

const unescape = (s) =>
  s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');

/** Draws the diagrams that have no SVG yet, and removes SVGs no guide uses any more. */
function renderDiagrams() {
  const blocks = collect();
  fs.mkdirSync(DIAGRAM_DIR, { recursive: true });

  const missing = [...blocks].filter(([id]) => !fs.existsSync(svgPath(id)));
  if (missing.length) {
    const chrome = findChrome();
    if (!chrome) {
      console.error('Chrome not found (set CHROME_PATH): diagrams not drawn.');
      process.exit(1);
    }
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'api0-diagrams-'));
    const page = path.join(tmp, 'draw.html');
    const input = missing.map(([id, b]) => ({ id, code: b.code }));
    fs.writeFileSync(
      page,
      `<!doctype html><html><head><meta charset="utf-8"><script src="${MERMAID}"></script></head><body>
<pre id="out">pending</pre>
<script>
mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'strict', fontFamily: 'Helvetica Neue, Arial, sans-serif', flowchart: { htmlLabels: false } });
(async () => {
  const out = [];
  for (const d of ${JSON.stringify(input)}) {
    try { out.push({ id: d.id, svg: (await mermaid.render('diagram-' + d.id, d.code)).svg }); }
    catch (e) { out.push({ id: d.id, error: String(e && e.message || e) }); }
  }
  document.getElementById('out').textContent = JSON.stringify(out);
})();
</script></body></html>`
    );
    const dom = execFileSync(
      chrome,
      ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', `--user-data-dir=${path.join(tmp, 'profile')}`, '--virtual-time-budget=30000', '--dump-dom', `file://${page}`],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024 }
    );
    fs.rmSync(tmp, { recursive: true, force: true });

    const m = /<pre id="out">([\s\S]*?)<\/pre>/.exec(dom);
    let drawn;
    try {
      drawn = JSON.parse(unescape(m ? m[1] : ''));
    } catch {
      console.error('Mermaid did not finish drawing (is jsDelivr reachable?). Nothing written.');
      process.exit(1);
    }
    let failed = 0;
    for (const d of drawn) {
      if (d.svg) {
        fs.writeFileSync(svgPath(d.id), d.svg);
        console.log(`  diagram ${d.id} drawn (${blocks.get(d.id).from})`);
      } else {
        console.error(`  ✗ diagram in ${blocks.get(d.id).from}: ${d.error}`);
        failed++;
      }
    }
    if (failed) process.exit(1);
  }

  for (const f of fs.readdirSync(DIAGRAM_DIR)) {
    if (f.endsWith('.svg') && !blocks.has(f.slice(0, -4))) {
      fs.unlinkSync(path.join(DIAGRAM_DIR, f));
      console.log(`  removed unused diagram ${f}`);
    }
  }
  console.log(`✅ ${blocks.size} diagram(s) ready`);
}

/**
 * The HTML that replaces a ```mermaid block: the SVG on a white card, styled
 * inline so it reads the same on the site, light or dark, and in the PDF.
 * `null` when the diagram has not been drawn: the block then stays code.
 */
function diagramHtml(code) {
  const file = svgPath(diagramId(code));
  if (!fs.existsSync(file)) {
    console.warn(`  ⚠ a mermaid diagram has no SVG yet: run \`yarn guides\` (kept as code)`);
    return null;
  }
  const svg = fs.readFileSync(file, 'utf8');
  return `<figure class="diagram" style="margin:1.5em 0;padding:12px;background:#fff;border:1px solid #e6e6ea;border-radius:8px;text-align:center;overflow-x:auto;break-inside:avoid">${svg}</figure>\n`;
}

module.exports = { renderDiagrams, diagramHtml, diagramId, DIAGRAM_DIR };

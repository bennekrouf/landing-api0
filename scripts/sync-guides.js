// scripts/sync-guides.js
//
// Copies the guides from the marketing folder (where they are written) into
// content/guides/, ready to publish. Run by hand after editing a guide:
//
//   yarn guides            # sync, regenerate the data, rebuild the PDFs
//
// The marketing drafts keep their placeholders; the copies here get them
// filled:
// - `date: "[YYYY-MM-DD]"` / `"[AAAA-MM-JJ]"` → the date the copy already had,
//   or today for a new guide;
// - `[text](#)` links → the guide they name, the POC contact address, or
//   plain text when there is nothing to link to yet (printed as a warning).
//
// Then every ```mermaid diagram is drawn as SVG (scripts/guides-diagrams.js).
//
// Source: GUIDES_SRC, default ../marketing/guides (French at the top level,
// English in en/).

const fs = require('fs');
const path = require('path');
const { CONTENT_DIR, parseFileName } = require('./guides-lib');

const SRC = path.resolve(process.env.GUIDES_SRC || path.join(process.cwd(), '../marketing/guides'));
const CONTACT = 'mailto:mb@mayorana.ch?subject=api0%20POC';
const TODAY = new Date().toISOString().slice(0, 10);

/** Link texts that name another guide, by language, lower case. */
const GUIDE_LINKS = {
  fr: {
    'guide principal': 1,
    'mettre ton produit dans teams sans développer de bot': 2,
    "lis l'architecture détaillée": 4,
  },
  en: {
    'main guide': 1,
    'put your product in teams without building a bot': 2,
    'read the detailed architecture': 4,
  },
};

/** Link texts that mean "talk to us". */
const CONTACT_TEXT = /écris-nous|get in touch|poc/i;

if (!fs.existsSync(SRC)) {
  console.error(`Guides not found at ${SRC}. Set GUIDES_SRC to the marketing guides folder.`);
  process.exit(1);
}

const sources = {
  fr: SRC,
  en: path.join(SRC, 'en'),
};

// number → slug, per language, so a link to "guide 4" becomes /guides/<slug>.
const slugs = { en: {}, fr: {} };
for (const [lang, dir] of Object.entries(sources)) {
  for (const f of fs.readdirSync(dir)) {
    const p = parseFileName(f);
    if (p) slugs[lang][p.number] = p.slug;
  }
}

const guidePath = (lang, number) => `${lang === 'fr' ? '/fr' : ''}/guides/${slugs[lang][number]}`;

let warnings = 0;
for (const [lang, dir] of Object.entries(sources)) {
  const outDir = path.join(CONTENT_DIR, lang);
  fs.mkdirSync(outDir, { recursive: true });
  const kept = new Set();

  for (const fileName of fs.readdirSync(dir).sort()) {
    if (!parseFileName(fileName)) continue;
    let text = fs.readFileSync(path.join(dir, fileName), 'utf8');
    const outFile = path.join(outDir, fileName);

    // The date: keep the one already published, or today for a new guide.
    const previous = fs.existsSync(outFile) && /^date:\s*"(\d{4}-\d{2}-\d{2})"/m.exec(fs.readFileSync(outFile, 'utf8'));
    text = text.replace(/^date:\s*"\[[A-Z-]+\]"/m, `date: "${previous ? previous[1] : TODAY}"`);

    // The (#) links.
    text = text.replace(/\[([^\]]+)\]\(#\)/g, (_, label) => {
      const key = label.toLowerCase().replace(/[’]/g, "'");
      const number = GUIDE_LINKS[lang][key];
      if (number && slugs[lang][number]) return `[${label}](${guidePath(lang, number)})`;
      if (CONTACT_TEXT.test(label)) return `[${label}](${CONTACT})`;
      console.warn(`  ⚠ ${lang}/${fileName}: no target for "[${label}](#)", kept as plain text`);
      warnings++;
      return label;
    });

    fs.writeFileSync(outFile, text);
    kept.add(fileName);
  }

  // A guide removed from the marketing folder leaves the site too.
  for (const f of fs.readdirSync(outDir)) {
    if (f.endsWith('.md') && !kept.has(f)) {
      fs.unlinkSync(path.join(outDir, f));
      console.log(`  removed ${lang}/${f}`);
    }
  }
  console.log(`✅ ${lang}: ${kept.size} guides synced from ${dir}`);
}
// Mermaid diagrams, drawn once as SVG for the pages and the PDFs.
require('./guides-diagrams').renderDiagrams();

if (warnings) console.log(`${warnings} link(s) left as plain text: give them a target in scripts/sync-guides.js or in the guide.`);

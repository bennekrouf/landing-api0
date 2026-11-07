// scripts/generate-guides-data.js
//
// content/guides/{en,fr}/*.md → src/data/guides.json (the pages read it) and
// src/data/guide-pairs.json (number → slug per language, small enough for the
// navigation's language switch). Runs before dev, build and start.

const fs = require('fs');
const path = require('path');
const { readGuides, render, headings } = require('./guides-lib');

const dataDir = path.join(process.cwd(), 'src/data');
fs.mkdirSync(dataDir, { recursive: true });

const guides = readGuides().map(({ body, fileName, ...g }) => ({
  ...g,
  contentHtml: render(body),
  headings: headings(body),
}));

const pairs = {};
for (const g of guides) (pairs[g.number] ||= {})[g.lang] = g.slug;

fs.writeFileSync(path.join(dataDir, 'guides.json'), JSON.stringify(guides, null, 2));
fs.writeFileSync(path.join(dataDir, 'guide-pairs.json'), JSON.stringify(Object.values(pairs), null, 2));
console.log(`✅ Generated guide data: ${guides.length} guides`);

// scripts/generate-sitemap.js
import { writeSitemap } from '../src/lib/sitemap.js';

async function main() {
  console.log('Generating sitemap...');
  await writeSitemap();
}

main().catch(console.error);

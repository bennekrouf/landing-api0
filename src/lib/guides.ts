// src/lib/guides.ts
//
// The guides, generated from content/guides/{en,fr}/ by
// scripts/generate-guides-data.js. Each one has a PDF in
// public/downloads/guides/ (scripts/generate-guide-pdfs.js).

import guidesData from '@/data/guides.json';
import type { Lang } from '@/i18n';

export interface Guide {
  lang: Lang;
  number: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  pdf: string;
  contentHtml: string;
  headings: { id: string; text: string; level: number }[];
}

const guides = guidesData as Guide[];

export function getGuides(lang: Lang): Guide[] {
  return guides.filter((g) => g.lang === lang).sort((a, b) => a.number - b.number);
}

export function getGuide(lang: Lang, slug: string): Guide | null {
  return guides.find((g) => g.lang === lang && g.slug === slug) ?? null;
}

/** The same guide in the other language, if it exists. */
export function translationOf(guide: Guide): Guide | null {
  return guides.find((g) => g.number === guide.number && g.lang !== guide.lang) ?? null;
}

export function guideHref(guide: Pick<Guide, 'lang' | 'slug'>): string {
  return `${guide.lang === 'fr' ? '/fr' : ''}/guides/${guide.slug}`;
}

export function guidesIndexHref(lang: Lang): string {
  return lang === 'fr' ? '/fr/guides' : '/guides';
}

export function formatGuideDate(date: string, locale: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

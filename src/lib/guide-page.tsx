// src/lib/guide-page.tsx
//
// What /guides/[slug] and /fr/guides/[slug] share: static params, metadata
// (with the other language as an alternate) and the page itself.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GuideArticle } from '@/components/guides/GuideArticle';
import type { Lang } from '@/i18n';
import { getGuide, getGuides, guideHref, translationOf } from '@/lib/guides';

type Params = { params: Promise<{ slug: string }> };

export function guideStaticParams(lang: Lang) {
  return getGuides(lang).map((g) => ({ slug: g.slug }));
}

export async function guideMetadata(lang: Lang, { params }: Params): Promise<Metadata> {
  const guide = getGuide(lang, (await params).slug);
  if (!guide) return { title: 'Guide not found' };
  const other = translationOf(guide);
  const languages: Record<string, string> = { [lang]: guideHref(guide) };
  if (other) languages[other.lang] = guideHref(other);
  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: guideHref(guide), languages },
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: 'article',
      url: guideHref(guide),
      publishedTime: guide.date,
      tags: guide.tags,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: guide.title }],
    },
    twitter: { card: 'summary_large_image', title: guide.title, description: guide.excerpt, images: ['/og.png'] },
  };
}

export async function GuidePage(lang: Lang, { params }: Params) {
  const guide = getGuide(lang, (await params).slug);
  if (!guide) notFound();
  return <GuideArticle guide={guide} />;
}

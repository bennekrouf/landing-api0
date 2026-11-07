// src/components/guides/GuideList.tsx
//
// The guides index, in English (/guides) and French (/fr/guides): every
// guide with a link to read it and its PDF.

import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import { copyFor, type Lang } from '@/i18n';
import { formatGuideDate, getGuides, guideHref } from '@/lib/guides';

export function GuideList({ lang = 'en' }: { lang?: Lang }) {
  const t = copyFor(lang).guides;
  const guides = getGuides(lang);
  return (
    <main className="pt-28 pb-24">
      <section className="container mx-auto px-4 max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6B00]">{t.kicker}</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-foreground">{t.title}</h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-3xl">{t.lead}</p>
      </section>

      <ol className="container mx-auto px-4 max-w-5xl mt-12 grid gap-6 md:grid-cols-2">
        {guides.map((g) => (
          <li key={g.slug} className="flex flex-col rounded-xl border border-border p-6 hover:border-[#FF6B00]/60 transition-colors">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#FF6B00]">
              {t.guide} {String(g.number).padStart(2, '0')}
            </p>
            <h2 className="mt-2 text-xl font-bold text-foreground">
              <Link href={guideHref(g)} className="hover:text-[#FF6B00] transition-colors">
                {g.title}
              </Link>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground flex-1">{g.excerpt}</p>
            <p className="mt-4 text-xs text-muted-foreground">
              {t.updated} {formatGuideDate(g.date, t.dateLocale)} · {g.readingTime}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={guideHref(g)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#FF6B00] px-4 py-2 text-sm font-medium text-white hover:bg-[#FF6B00]/90 transition-colors"
              >
                {t.read} <ArrowRight size={16} />
              </Link>
              <a
                href={g.pdf}
                download
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-[#FF6B00] transition-colors"
              >
                <Download size={16} /> {t.download}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}

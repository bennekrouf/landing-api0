// src/components/guides/GuideArticle.tsx
//
// One guide, in either language, with its PDF and a table of contents.

import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { copyFor } from '@/i18n';
import { formatGuideDate, guideHref, guidesIndexHref, translationOf, type Guide } from '@/lib/guides';

export function GuideArticle({ guide }: { guide: Guide }) {
  const t = copyFor(guide.lang).guides;
  const other = translationOf(guide);
  const pdfButton = (
    <a
      href={guide.pdf}
      download
      className="inline-flex items-center gap-1.5 rounded-lg bg-[#FF6B00] px-4 py-2 text-sm font-medium text-white hover:bg-[#FF6B00]/90 transition-colors"
    >
      <Download size={16} /> {t.download}
    </a>
  );

  return (
    <main className="pt-28 pb-24">
      <article className="container mx-auto px-4 max-w-5xl">
        <Link href={guidesIndexHref(guide.lang)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> {t.all}
        </Link>

        <header className="mt-6 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6B00]">
            {t.guide} {String(guide.number).padStart(2, '0')}
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-foreground">{guide.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{guide.excerpt}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            {t.updated} {formatGuideDate(guide.date, t.dateLocale)} · {guide.readingTime}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {pdfButton}
            {other && (
              <Link href={guideHref(other)} lang={other.lang} className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
                {t.otherLang}
              </Link>
            )}
          </div>
        </header>

        <div className="mt-12 flex flex-col md:flex-row gap-10">
          <div
            className="md:w-3/4 min-w-0 prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-headings:scroll-mt-24 prose-a:text-[#FF6B00] prose-strong:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-blockquote:text-muted-foreground prose-blockquote:not-italic prose-pre:whitespace-pre-wrap prose-td:align-top prose-code:before:content-none prose-code:after:content-none [&_table]:block [&_table]:overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
          />
          {guide.headings.length > 0 && (
            // Sticky, and never taller than the screen: a long guide's contents
            // would otherwise run past the bottom, out of reach until the end of
            // the article. It scrolls on its own instead, without moving the page.
            <nav className="md:w-1/4 md:sticky md:top-24 h-fit md:max-h-[calc(100vh-7rem)] md:overflow-y-auto md:overscroll-contain rounded-xl border border-border bg-accent/50 p-4 text-sm">
              <p className="mb-3 font-semibold text-foreground">{t.contents}</p>
              <ul className="space-y-1.5">
                {guide.headings.map((h) => (
                  <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 12}px` }}>
                    <a href={`#${h.id}`} className="text-muted-foreground hover:text-[#FF6B00] transition-colors">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <div className="mt-16 border-t border-border pt-8">{pdfButton}</div>
      </article>
    </main>
  );
}

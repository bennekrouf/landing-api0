// src/components/UseCases.tsx
//
// The use-cases page, in English (/use-cases) and French (/fr/use-cases).
// Copy lives in i18n/{en,fr}.ts under `useCases`. The conversations are
// labelled as examples; only the "running on api0 today" case is real.

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { copyFor, localePath, type Lang } from '@/i18n';

const APP_URL = 'https://app.api0.ai';
const CONTACT = 'mailto:mb@mayorana.ch?subject=api0%20POC';

export function UseCases({ lang = 'en' }: { lang?: Lang }) {
  const t = copyFor(lang).useCases;
  return (
    <main className="pt-28 pb-24">
      <section className="container mx-auto px-4 max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6B00]">{t.kicker}</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-foreground">{t.title}</h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-3xl">{t.lead}</p>
        <nav className="mt-8 flex flex-wrap gap-2">
          {t.cases.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground hover:text-foreground hover:border-[#FF6B00] transition-colors">
              {c.tag}
            </a>
          ))}
        </nav>
      </section>

      <div className="container mx-auto px-4 max-w-5xl mt-14 space-y-16">
        {t.cases.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-24 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6B00]">{c.tag}</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold text-foreground">{c.title}</h2>
              <p className="mt-4 text-muted-foreground">{c.problem}</p>
              <h3 className="mt-6 text-sm font-semibold text-foreground">{t.setupLabel}</h3>
              <ul className="mt-2 space-y-2">
                {c.setup.map((s) => (
                  <li key={s} className="flex gap-2 text-muted-foreground">
                    <Check className="w-4 h-4 mt-1 shrink-0 text-[#FF6B00]" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{t.channelsLabel} </span>
                {c.channels}
              </p>
            </div>
            <figure className="rounded-2xl border border-border bg-muted/40 p-5">
              <figcaption className="text-xs uppercase tracking-wide text-muted-foreground mb-4">{t.exampleLabel}</figcaption>
              <ol className="space-y-3">
                {c.chat.map((m, i) => {
                  const mine = i % 2 === 0;
                  return (
                    <li key={i} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${mine ? 'bg-[#FF6B00] text-white' : 'bg-background border border-border text-foreground'}`}>
                        <div className={`text-xs mb-0.5 ${mine ? 'text-white/80' : 'text-muted-foreground'}`}>{m.who}</div>
                        {m.text}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </figure>
          </section>
        ))}
      </div>

      <section className="container mx-auto px-4 max-w-5xl mt-20 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border p-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6B00]">{t.liveKicker}</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground">{t.liveTitle}</h2>
          <p className="mt-3 text-muted-foreground">{t.liveBody}</p>
          <ul className="mt-4 space-y-1.5">
            {t.liveFacts.map((f) => (
              <li key={f} className="flex gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#FF6B00]" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-[#10151f] text-[#f6f4ef] p-6 flex flex-col">
          <h2 className="text-2xl font-bold">{t.yoursTitle}</h2>
          <p className="mt-3 text-[#c5ccd8]">{t.yoursBody}</p>
          <div className="mt-auto pt-6 flex flex-wrap gap-3">
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF6B00] text-white font-medium hover:bg-[#FF6B00]/90 transition-all">
              {t.yoursCta} <ArrowRight className="w-4 h-4" />
            </a>
            <Link href={CONTACT} className="inline-flex items-center px-4 py-2 rounded-lg border border-white/30 text-white font-medium hover:bg-white/10 transition-all">
              {t.contactCta}
            </Link>
            <Link href={localePath(lang, '/fit')} className="inline-flex items-center px-4 py-2 rounded-lg text-white/80 font-medium hover:text-white transition-all">
              {t.fitCta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

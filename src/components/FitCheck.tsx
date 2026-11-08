// src/components/FitCheck.tsx
//
// The fit check, in English (/fit) and French (/fr/fit): an intro, one
// question per screen with Back and Next, then a score out of 100 with
// strengths, gaps and a next step. Questions and scoring are in
// lib/fit-score.ts; the copy is in i18n/{en,fr}.ts under `fit`. Answers stay in
// the browser: the only way they leave is the visitor's own email app.

'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, AlertTriangle, RotateCcw, Mail } from 'lucide-react';
import { copyFor, localePath, type Lang } from '@/i18n';
import { scoreFit, toggle, visibleQuestions, type Answers, type QuestionId, type Tier } from '@/lib/fit-score';

type QuestionCopy = { title: string; hint?: string; options: Record<string, string>; otherPlaceholder?: string };

const APP_URL = 'https://app.api0.ai';
const CONTACT_EMAIL = 'mb@mayorana.ch';

const TIER_COLOR: Record<Tier, string> = {
  strong: 'text-emerald-600 dark:text-emerald-400',
  good: 'text-[#FF6B00]',
  early: 'text-amber-600 dark:text-amber-400',
  notYet: 'text-muted-foreground',
};

const TIER_STROKE: Record<Tier, string> = {
  strong: 'stroke-emerald-500',
  good: 'stroke-[#FF6B00]',
  early: 'stroke-amber-500',
  notYet: 'stroke-muted-foreground',
};

export function FitCheck({ lang = 'en' }: { lang?: Lang }) {
  const t = copyFor(lang).fit;
  const [answers, setAnswers] = useState<Answers>({});
  // What the visitor typed for a free-text option ("Other"), per question.
  const [details, setDetails] = useState<Partial<Record<QuestionId, string>>>({});
  // -1: the intro; 0..n-1: a question; n: the result.
  const [step, setStep] = useState(-1);

  const questions = useMemo(() => visibleQuestions(answers), [answers]);
  const total = questions.length;
  const q = step >= 0 && step < total ? questions[step] : null;
  const qt = q ? (t.questions[q.id] as QuestionCopy) : null;
  const picked = q ? answers[q.id] ?? [] : [];
  const askDetail = !!q && q.options.some((o) => o.freeText && picked.includes(o.id));
  const detail = q ? details[q.id] ?? '' : '';

  const pick = (optionId: string) => {
    if (!q) return;
    setAnswers((a) => ({ ...a, [q.id]: toggle(q, a[q.id] ?? [], optionId) }));
  };

  const restart = () => {
    setAnswers({});
    setDetails({});
    setStep(-1);
  };

  if (step === -1) {
    return (
      <Shell>
        <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6B00]">{t.kicker}</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-foreground">{t.title}</h1>
        <p className="mt-5 text-lg text-muted-foreground">{t.lead}</p>
        <button
          type="button"
          onClick={() => setStep(0)}
          className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#FF6B00] text-white font-medium hover:bg-[#FF6B00]/90 transition-all shadow-lg shadow-orange-500/20"
        >
          {t.start} <ArrowRight className="w-4 h-4" />
        </button>
      </Shell>
    );
  }

  if (q && qt) {
    const last = step === total - 1;
    return (
      <Shell>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{t.step(step + 1, total)}</span>
          <span>{q.multi ? t.pickMany : t.pickOne}</span>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden" aria-hidden>
          <div className="h-full bg-[#FF6B00] transition-all duration-300" style={{ width: `${((step + 1) / total) * 100}%` }} />
        </div>

        <h1 className="mt-8 text-2xl md:text-3xl font-bold tracking-tight text-foreground">{qt.title}</h1>
        {qt.hint && <p className="mt-3 text-muted-foreground">{qt.hint}</p>}

        <div role={q.multi ? 'group' : 'radiogroup'} aria-label={qt.title} className="mt-6 space-y-3">
          {q.options.map((o) => {
            const on = picked.includes(o.id);
            return (
              <button
                key={o.id}
                type="button"
                role={q.multi ? 'checkbox' : 'radio'}
                aria-checked={on}
                onClick={() => pick(o.id)}
                className={`w-full flex items-center gap-3 text-left rounded-xl border px-4 py-3.5 transition-colors ${
                  on ? 'border-[#FF6B00] bg-[#FF6B00]/10 text-foreground' : 'border-border hover:border-[#FF6B00]/60 text-foreground'
                }`}
              >
                <span
                  className={`flex items-center justify-center w-5 h-5 shrink-0 border ${q.multi ? 'rounded-md' : 'rounded-full'} ${
                    on ? 'bg-[#FF6B00] border-[#FF6B00] text-white' : 'border-muted-foreground/50'
                  }`}
                >
                  {on && <Check className="w-3.5 h-3.5" />}
                </span>
                {qt.options[o.id]}
              </button>
            );
          })}
        </div>

        {askDetail && (
          <div className="mt-4">
            <label htmlFor={`fit-detail-${q.id}`} className="block text-sm font-medium text-foreground">
              {t.otherLabel}
            </label>
            <textarea
              id={`fit-detail-${q.id}`}
              value={detail}
              onChange={(e) => setDetails((d) => ({ ...d, [q.id]: e.target.value }))}
              placeholder={qt.otherPlaceholder}
              rows={3}
              maxLength={500}
              autoFocus
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/30"
            />
            <p className="mt-1.5 text-sm text-muted-foreground">{t.otherNote}</p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t.back}
          </button>
          <button
            type="button"
            disabled={picked.length === 0 || (askDetail && !detail.trim())}
            onClick={() => setStep(step + 1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF6B00] text-white font-medium hover:bg-[#FF6B00]/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {last ? t.seeResult : t.next} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Shell>
    );
  }

  const result = scoreFit(answers);
  const tier = t.tiers[result.tier];
  const mailBody = [
    t.mailIntro,
    '',
    ...questions.map((qq) => {
      const c = t.questions[qq.id] as QuestionCopy;
      const text = details[qq.id]?.trim();
      const label = (id: string) =>
        qq.options.find((o) => o.id === id)?.freeText && text ? `${c.options[id]}: ${text}` : c.options[id];
      return `${c.title}\n→ ${(answers[qq.id] ?? []).map(label).join(', ')}`;
    }),
    '',
    `${t.scoreLabel}: ${result.score}/100 (${tier.title})`,
  ].join('\n');
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.mailSubject(result.score))}&body=${encodeURIComponent(mailBody)}`;

  return (
    <Shell>
      <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6B00]">{t.kicker}</p>
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-6">
        <ScoreRing score={result.score} tier={result.tier} label={t.scoreLabel} />
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${TIER_COLOR[result.tier]}`}>{tier.title}</h1>
          <p className="mt-2 text-muted-foreground">{tier.body}</p>
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {result.strengths.length > 0 && (
          <List title={t.strengthsTitle} items={result.strengths.map((k) => t.strengths[k as keyof typeof t.strengths])} icon="ok" />
        )}
        {result.gaps.length > 0 && <List title={t.gapsTitle} items={result.gaps.map((k) => t.gaps[k as keyof typeof t.gaps])} icon="gap" />}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {(result.tier === 'strong' || result.tier === 'good') && (
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF6B00] text-white font-medium hover:bg-[#FF6B00]/90 transition-all shadow-lg shadow-orange-500/20"
          >
            {t.ctaPoc} <ArrowRight className="w-4 h-4" />
          </a>
        )}
        <a
          href={mailto}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
        >
          <Mail className="w-4 h-4" /> {t.ctaTalk}
        </a>
        {(result.tier === 'early' || result.tier === 'notYet') && (
          <Link
            href={localePath(lang, '/guides')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
          >
            {t.ctaGuides}
          </Link>
        )}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{t.talkNote}</p>

      <div className="mt-10 flex flex-wrap gap-3 border-t border-border pt-6">
        <button
          type="button"
          onClick={() => setStep(total - 1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </button>
        <button
          type="button"
          onClick={restart}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> {t.restart}
        </button>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="pt-28 pb-24">
      <section className="container mx-auto px-4 max-w-2xl">{children}</section>
    </main>
  );
}

function ScoreRing({ score, tier, label }: { score: number; tier: Tier; label: string }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative w-36 h-36 shrink-0" role="img" aria-label={`${label}: ${score}/100`}>
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" strokeWidth="10" className="stroke-muted" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - score / 100)}
          className={`${TIER_STROKE[tier]} transition-all duration-700`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-foreground">{score}</span>
        <span className="text-xs text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
}

function List({ title, items, icon }: { title: string; items: string[]; icon: 'ok' | 'gap' }) {
  return (
    <div className="rounded-2xl border border-border p-5">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <ul className="mt-3 space-y-2.5">
        {items.map((s) => (
          <li key={s} className="flex gap-2 text-sm text-muted-foreground">
            {icon === 'ok' ? (
              <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
            ) : (
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
            )}
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

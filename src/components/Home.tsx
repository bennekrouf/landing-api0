// src/components/Home.tsx — the homepage, in English (/) or French (/fr).

import Link from 'next/link';
import { copyFor, type Lang } from '@/i18n';
import { Upload, Plug, ShieldCheck, ArrowRight, Cpu, Fingerprint, Coins, Workflow, Check, X, Building2, Wrench } from 'lucide-react';

const APP_URL = 'https://app.api0.ai';

const stepIcons = [Upload, Plug, ShieldCheck];
const useCaseIcons = [Building2, Wrench];
const differentiatorIcons = [Workflow, Fingerprint, Cpu, Coins];

// Product names: the same in every language.
const competitors = ['Microsoft Copilot Studio', 'Cloudflare MCP Server Portals', 'agentgateway', 'Composio'];

const proxyExamples = [
  { call: 'tools/call: search\n{"dept": "eng"}', http: 'GET /users/search?dept=eng' },
  { call: 'tools/call: create_invoice\n{"customer_id": "acme"}', http: 'POST /api/invoices {"customer_id": "acme"}' },
  { call: 'tools/call: update\n{"id": "1", "em": "x@y.z"}', http: 'PUT /users/1/update {"em": "x@y.z"}' },
];

/**
 * The homepage, in `lang`. The comparison rows (in the copy files) list only
 * where api0 is strong; a competitor cell is true (does it too), false
 * (doesn't) or a short note. Checked against each product's docs in October
 * 2026; update compareNote when this changes.
 */
export function Home({ lang }: { lang: Lang }) {
  const t = copyFor(lang).home;
  const steps = t.steps.map((s, i) => ({ ...s, icon: stepIcons[i] }));
  const useCases = t.useCases.map((u, i) => ({ ...u, icon: useCaseIcons[i] }));
  const differentiators = t.differentiators.map((d, i) => ({ ...d, icon: differentiatorIcons[i] }));
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-24 bg-gradient-to-b from-accent to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="eyebrow text-[#FF6B00] mb-4">{t.eyebrow}</div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-foreground leading-[1.1]">
            {t.titleBefore}<span className="chip-highlight">{t.titleHighlight}</span>
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-foreground mb-6 max-w-2xl mx-auto">
            {t.tagline}
          </p>
          <p className="lead-marketing text-muted-foreground mb-4 max-w-2xl mx-auto sm:text-lg">
            {t.lead}
          </p>
          <p className="text-foreground font-medium mb-12 max-w-2xl mx-auto">
            {t.promise}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cap inline-flex items-center px-6 py-3 rounded-lg bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90 transform transition duration-200 hover:-translate-y-1 shadow-xl shadow-orange-500/20"
            >
              {t.ctaImport}
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
            <Link
              href="#auth"
              className="btn-cap-light inline-flex items-center px-6 py-3 rounded-lg border border-border text-foreground hover:border-[#FF6B00] hover:text-[#FF6B00] transition duration-200"
            >
              {t.ctaAuth}
            </Link>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section id="use-cases" className="py-24 bg-accent/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">{t.useCasesTitle}</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t.useCasesLead}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((u) => (
              <div key={u.who} className="flex flex-col p-6 rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-[#FF6B00]/10 rounded-full">
                    <u.icon size={24} className="text-[#FF6B00]" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full border border-border text-muted-foreground">
                    {u.channel}
                  </span>
                </div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#FF6B00] mb-2">{u.who}</p>
                <h3 className="text-lg font-semibold mb-3 text-foreground">{u.action}</h3>
                <p className="text-sm text-muted-foreground">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 steps */}
      <section id="integration" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">{t.stepsTitle}</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            {t.stepsLead}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="flex flex-col p-6 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#FF6B00]/10 rounded-full">
                    <step.icon size={24} className="text-[#FF6B00]" />
                  </div>
                  <div className="bg-[#FF6B00] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {t.step} {i + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground mb-6">{step.body}</p>
                <div className="mt-auto bg-muted rounded-lg p-4 w-full overflow-x-auto">
                  <pre className="text-xs sm:text-sm text-left">
                    <code className="text-muted-foreground">{step.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-12">
            <Link href="/blog/connect-claude-to-your-backend-in-5-minutes-with-api0" className="inline-flex items-center text-[#FF6B00] font-medium hover:underline">
              {t.quickstart}
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* Auth */}
      <section id="auth" className="py-24 bg-accent/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">{t.authTitle}</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            {t.authLead}
          </p>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {t.backendAuth.map((mode) => (
                <div key={mode.title} className="p-5 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold mb-2 text-foreground">{mode.title}</h3>
                  <p className="text-sm text-muted-foreground">{mode.body}</p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl border-2 border-[#FF6B00]/40 bg-card self-start">
              <h3 className="font-semibold mb-4 text-foreground">{t.callersTitle}</h3>
              <ul className="space-y-3 mb-6">
                {t.callers.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0 text-[#FF6B00]" />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">
                {t.connectionTest}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">{t.whyTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((d) => (
              <div key={d.title} className="p-6 rounded-xl border border-border bg-card">
                <d.icon size={24} className="text-[#FF6B00] mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">{d.title}</h3>
                <p className="text-sm text-muted-foreground">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" className="py-24 bg-accent/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">{t.compareTitle}</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t.compareLead}
          </p>

          {/* Scrolls inside its box at phone width rather than squeezing four columns. */}
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[860px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="sticky left-0 z-[1] bg-card p-4 text-left font-medium text-muted-foreground">
                    {t.feature}
                  </th>
                  <th scope="col" className="p-4 text-center font-bold text-[#FF6B00] bg-[#FF6B00]/10">
                    api0
                  </th>
                  {competitors.map((c) => (
                    <th key={c} scope="col" className="p-4 text-center font-medium text-muted-foreground">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-border last:border-b-0">
                    <th
                      scope="row"
                      className="sticky left-0 z-[1] bg-card p-4 text-left font-medium text-foreground max-w-[14rem] md:max-w-none"
                    >
                      {row.feature}
                    </th>
                    <td className="p-4 text-center bg-[#FF6B00]/10">
                      <Check className="inline w-5 h-5 text-green-600 dark:text-green-400" aria-label={t.yes} />
                    </td>
                    {row.them.map((v, i) => (
                      <td key={i} className="p-4 text-center">
                        {v === true ? (
                          <Check className="inline w-4 h-4 text-muted-foreground" aria-label={t.yes} />
                        ) : v === false ? (
                          <X className="inline w-4 h-4 text-red-500/80" aria-label={t.no} />
                        ) : (
                          <span className="inline-block max-w-[11rem] text-xs leading-snug text-amber-700 dark:text-amber-300">
                            {v}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            {t.compareNote}
          </p>
        </div>
      </section>

      {/* Proxying proof */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">{t.proxyTitle}</h2>

          <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-8">
            <div className="space-y-6">
              {proxyExamples.map((ex) => (
                <div
                  key={ex.http}
                  className="flex items-center gap-4 p-4 bg-muted rounded-lg flex-col sm:flex-row text-center sm:text-left"
                >
                  <div className="text-foreground font-mono text-xs sm:text-sm flex-1 break-all whitespace-pre-line">
                    {ex.call}
                  </div>
                  <div className="text-[#FF6B00] font-bold text-xl my-2 sm:my-0">→</div>
                  <div className="text-muted-foreground font-mono text-xs sm:text-sm flex-1 break-all">{ex.http}</div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm sm:text-base text-muted-foreground">
              {t.proxyNote}
            </p>
          </div>

          <p className="text-center mt-12">
            <Link href="/blog/how-api0-works" className="inline-flex items-center text-[#FF6B00] font-medium hover:underline">
              {t.architecture}
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">{t.finalTitle}</h2>
          <p className="lead-marketing text-muted-foreground mb-10">
            {t.finalLead}
          </p>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cap inline-flex items-center px-6 py-3 rounded-lg bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90 transform transition duration-200 hover:-translate-y-1 shadow-xl shadow-orange-500/20"
          >
            {t.finalCta}
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}

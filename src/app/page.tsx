import React from 'react';
import Link from 'next/link';
import { Upload, Plug, ShieldCheck, ArrowRight, Cpu, Fingerprint, Coins, Workflow } from 'lucide-react';

const APP_URL = 'https://app.api0.ai';

const steps = [
  {
    icon: Upload,
    title: 'Import your endpoints',
    body: 'Paste an OpenAPI spec, or describe endpoints in plain English. api0 turns each one into an MCP tool, and a built-in test calls it before it counts as configured.',
    code: `POST /api/invoices
  creates an invoice
  required:
    customer_id, amount`,
  },
  {
    icon: Plug,
    title: 'Send your team one link',
    body: 'Your workspace gets its own Get started page. Each person signs in once, then adds it to Claude or links their Telegram or WhatsApp to your own bot.',
    code: `app.api0.ai/link/acme

  ✓ Claude connector
  ✓ @acme_bot on Telegram
  ✓ WhatsApp`,
  },
  {
    icon: ShieldCheck,
    title: 'Govern execution',
    body: 'Every call passes the gateway: it checks who is calling, attaches the credential your backend expects, deducts credits, and logs the call.',
    code: `tools/call create_invoice
  ✓ caller: jane@acme.com
  ✓ credential attached
  ✓ credits checked
  → POST /api/invoices`,
  },
];

// The credential modes a workspace can pick for its backends. Same list as the
// "What your backend receives" section of the how-api0-works post.
const backendAuth = [
  { title: 'Google identity token', body: 'Proves the call came from api0. Verify it like any service-account OIDC token.' },
  { title: 'Fixed bearer token or headers', body: 'A static token or custom API-key header, stored in api0. Claude never sees it.' },
  { title: 'OAuth client credentials', body: 'api0 fetches and refreshes a token from your identity provider.' },
  { title: 'Per-user secret', body: 'Each person stores their own key, and their calls carry it.' },
  { title: 'Per-user OAuth account', body: 'Each person connects their own account once, and acts as themselves.' },
];

const callers = [
  'OAuth 2.1 with PKCE for Claude connectors',
  'API keys for the SDK, CLI and CI jobs',
  'Your own identity provider: Entra ID or any OIDC',
];

const differentiators = [
  {
    icon: Workflow,
    title: 'Where your team already is',
    body: 'Claude on web, desktop and mobile, your own Telegram and WhatsApp bots, and any MCP-compatible client. No SDK to embed, no model to host.',
  },
  {
    icon: Fingerprint,
    title: 'One place for identity',
    body: 'Who is calling, what they may do and which credential your backend gets are decided at one gateway, whichever client they came from.',
  },
  {
    icon: Cpu,
    title: 'Built in Rust',
    body: 'The gateway and every backend service are written in Rust, for predictable latency and a small attack surface.',
  },
  {
    icon: Coins,
    title: 'Usage-based credits',
    body: 'Paid tool calls spend credits bought in the dashboard. No enterprise sales call to get started.',
  },
];

const proxyExamples = [
  { call: 'tools/call: search\n{"dept": "eng"}', http: 'GET /users/search?dept=eng' },
  { call: 'tools/call: create_invoice\n{"customer_id": "acme"}', http: 'POST /api/invoices {"customer_id": "acme"}' },
  { call: 'tools/call: update\n{"id": "1", "em": "x@y.z"}', http: 'PUT /users/1/update {"em": "x@y.z"}' },
];

const HomePage = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-24 bg-gradient-to-b from-accent to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="eyebrow text-[#FF6B00] mb-4">Intelligence on demand · In the cloud</div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-foreground leading-[1.1]">
            Add an intelligent interface to <span className="chip-highlight">any backend</span>
          </h1>
          <p className="lead-marketing text-muted-foreground mb-4 max-w-2xl mx-auto sm:text-lg">
            Your backend already does the work. api0 lets people talk to it: import your API, and your team
            uses it from Claude, Telegram or WhatsApp, in plain language. Every action runs as the person asking.
          </p>
          <p className="text-foreground font-medium mb-12 max-w-2xl mx-auto">
            No rewrite, no new frontend, nothing to host. Live in under five minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cap inline-flex items-center px-6 py-3 rounded-lg bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90 transform transition duration-200 hover:-translate-y-1 shadow-xl shadow-orange-500/20"
            >
              Import your API
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
            <Link
              href="/#auth"
              className="btn-cap-light inline-flex items-center px-6 py-3 rounded-lg border border-border text-foreground hover:border-[#FF6B00] hover:text-[#FF6B00] transition duration-200"
            >
              See how auth works
            </Link>
          </div>
        </div>
      </section>

      {/* 3 steps */}
      <section id="integration" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">Three steps to your first agent call</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Import your API → send your team one link → every call governed, attributed and metered.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="flex flex-col p-6 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#FF6B00]/10 rounded-full">
                    <step.icon size={24} className="text-[#FF6B00]" />
                  </div>
                  <div className="bg-[#FF6B00] text-white text-xs font-bold px-3 py-1 rounded-full">
                    STEP {i + 1}
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
              Follow the five-minute quickstart
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* Auth */}
      <section id="auth" className="py-24 bg-accent/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">What your backend receives</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            You choose how api0 authenticates to your backend. The credential lives in api0 and is attached on
            every call, along with who the call is for.
          </p>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {backendAuth.map((mode) => (
                <div key={mode.title} className="p-5 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold mb-2 text-foreground">{mode.title}</h3>
                  <p className="text-sm text-muted-foreground">{mode.body}</p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl border-2 border-[#FF6B00]/40 bg-card self-start">
              <h3 className="font-semibold mb-4 text-foreground">Who is calling</h3>
              <ul className="space-y-3 mb-6">
                {callers.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0 text-[#FF6B00]" />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">
                The connection test in the dashboard runs the same logic as a real call, so a passing test means a
                working setup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">Why api0</h2>
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

      {/* Proxying proof */}
      <section className="py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">From tool call to real API call</h2>

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
              The gateway injects parameters into URLs and bodies with the right HTTP verb, then returns the result
              to the model.
            </p>
          </div>

          <p className="text-center mt-12">
            <Link href="/blog/how-api0-works" className="inline-flex items-center text-[#FF6B00] font-medium hover:underline">
              See the whole architecture on one page
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Make your backend intelligent this week</h2>
          <p className="lead-marketing text-muted-foreground mb-10">
            Sign in with Google, import your API, and send your team one link. Usage-based credits, no sales call.
          </p>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cap inline-flex items-center px-6 py-3 rounded-lg bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90 transform transition duration-200 hover:-translate-y-1 shadow-xl shadow-orange-500/20"
          >
            Get started
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
};

export default HomePage;

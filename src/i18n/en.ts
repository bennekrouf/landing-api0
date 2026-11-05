// src/i18n/en.ts — the landing page's English copy. fr.ts has the same shape.

export const en = {
  meta: {
    title: 'API0 - Intelligence on demand for any backend',
    description:
      'Add an intelligent interface to any backend. Import your API and your team uses it from Teams, WhatsApp, Telegram or Claude, in plain language. No rewrite, fully in the cloud.',
    pricingTitle: 'Pricing',
    pricingDescription:
      'api0 plans per workspace: seats and credits included, your API in Telegram, WhatsApp and Teams. Billed in CHF, Swiss-made.',
  },
  nav: {
    howItWorks: 'How it works',
    pricing: 'Pricing',
    blog: 'Blog',
    getStarted: 'Get started',
    dashboard: 'Dashboard',
    switchTo: 'FR',
    switchLabel: 'Version française',
  },
  footer: {
    tagline: 'The Enterprise AI bridge',
    product: 'Product',
    legal: 'Legal',
    connect: 'Connect',
    privacy: 'Privacy',
    terms: 'Terms',
    rights: 'All rights reserved.',
  },
  home: {
    eyebrow: 'Intelligence on demand · In the cloud',
    titleBefore: 'Add an intelligent interface to ',
    titleHighlight: 'any backend',
    tagline: 'Your software, in the chat your team already uses.',
    lead:
      'Your backend already does the work. api0 lets people talk to it: import your API, and your team uses it from Teams, WhatsApp, Telegram or Claude, in plain language. Every action runs as the person asking.',
    promise: 'No rewrite, no new frontend, nothing to host. Live in under five minutes.',
    ctaImport: 'Import your API',
    ctaAuth: 'See how auth works',

    useCasesTitle: 'What people do with it',
    useCasesLead: 'One API, imported once. Each team uses it from the chat it already lives in.',
    useCases: [
      {
        who: 'Software vendors',
        channel: 'Teams',
        action: 'Your customers use your product from Teams, as your own app.',
        body: "Put your product in your customers' Microsoft Teams chat without building a chatbot. Each user signs in once and acts with their own permissions.",
      },
      {
        who: 'Field service',
        channel: 'WhatsApp',
        action: 'Technicians close jobs from WhatsApp.',
        body: 'No new app to roll out. A technician writes “job 4711 done” and the job is closed in your field-service system, recorded as done by them.',
      },
    ],

    stepsTitle: 'Three steps to your first agent call',
    stepsLead: 'Import your API → send your team one link → every call governed, attributed and metered.',
    step: 'STEP',
    steps: [
      {
        title: 'Import your endpoints',
        body: 'Paste an OpenAPI spec, or describe endpoints in plain English. api0 turns each one into an MCP tool, and a built-in test calls it before it counts as configured.',
        code: `POST /api/invoices
  creates an invoice
  required:
    customer_id, amount`,
      },
      {
        title: 'Send your team one link',
        body: 'Your workspace gets its own Get started page. Each person signs in once, then adds it to Claude or Teams, or links their WhatsApp or Telegram to your own bot.',
        code: `app.api0.ai/link/acme

  ✓ Claude connector
  ✓ Acme in Teams chat
  ✓ WhatsApp
  ✓ @acme_bot on Telegram`,
      },
      {
        title: 'Govern execution',
        body: 'Every call passes the gateway: it checks who is calling, attaches the credential your backend expects, deducts credits, and logs the call.',
        code: `tools/call create_invoice
  ✓ caller: jane@acme.com
  ✓ credential attached
  ✓ credits checked
  → POST /api/invoices`,
      },
    ],
    quickstart: 'Follow the five-minute quickstart',

    authTitle: 'What your backend receives',
    authLead:
      'You choose how api0 authenticates to your backend. The credential lives in api0 and is attached on every call, along with who the call is for.',
    backendAuth: [
      { title: 'Google identity token', body: 'Proves the call came from api0. Verify it like any service-account OIDC token.' },
      { title: 'Fixed bearer token or headers', body: 'A static token or custom API-key header, stored in api0. Claude never sees it.' },
      { title: 'OAuth client credentials', body: 'api0 fetches and refreshes a token from your identity provider.' },
      { title: 'Per-user secret', body: 'Each person stores their own key, and their calls carry it.' },
      { title: 'Per-user OAuth account', body: 'Each person connects their own account once, and acts as themselves.' },
    ],
    callersTitle: 'Who is calling',
    callers: [
      'OAuth 2.1 with PKCE for Claude connectors',
      'API keys for the SDK, CLI and CI jobs',
      'Your own identity provider: Entra ID or any OIDC',
    ],
    connectionTest:
      'The connection test in the dashboard runs the same logic as a real call, so a passing test means a working setup.',

    whyTitle: 'Why api0',
    differentiators: [
      {
        title: 'Where your team already is',
        body: 'Microsoft Teams chat, your own WhatsApp and Telegram bots, Claude on web, desktop and mobile, and any MCP-compatible client. No SDK to embed, no model to host.',
      },
      {
        title: 'One place for identity',
        body: 'Who is calling, what they may do and which credential your backend gets are decided at one gateway, whichever client they came from.',
      },
      {
        title: 'Built in Rust',
        body: 'The gateway and every backend service are written in Rust, for predictable latency and a small attack surface.',
      },
      {
        title: 'A plan per workspace',
        body: 'Seats and credits included, extra members per seat, overage on the next invoice. No enterprise sales call to get started.',
      },
    ],

    compareTitle: 'How api0 compares',
    compareLead:
      "Only the things api0 is strong at are listed. The others do plenty it doesn't — this is why you would pick it.",
    feature: 'Feature',
    yes: 'Yes',
    no: 'No',
    comparison: [
      {
        feature: 'Your own REST API as MCP tools, from an OpenAPI spec or plain English',
        them: ['OpenAPI spec; REST API tools in preview', 'Fronts MCP servers you already run', 'OpenAPI spec in YAML config', 'Your API as code, or an MCP server you host'],
      },
      {
        feature: 'The same tools in Teams, WhatsApp, your own Telegram bot and Claude',
        them: ['Teams and WhatsApp; Telegram needs code', 'MCP clients only', 'MCP and A2A clients only', 'Through your own app or MCP clients'],
      },
      {
        feature: 'One Get started link per workspace: sign in once, connect Claude or a bot',
        them: ['Teams install link; WhatsApp QR code', 'Portal URL behind Access', false, 'Auth links per connected app'],
      },
      {
        feature: 'Five backend credential modes, per-user secrets and per-user OAuth included',
        them: ['None, a user-entered API key, or per-user OAuth', 'Left to each MCP server', 'Policies you configure', 'For catalogue apps; your API via code'],
      },
      {
        feature: 'Nothing to host or operate',
        them: ['Hosted; WhatsApp needs your own Azure resource', true, 'You run it', true],
      },
    ] as { feature: string; them: (boolean | string)[] }[],
    compareNote: "Compared in October 2026 from each product's public documentation.",

    proxyTitle: 'From tool call to real API call',
    proxyNote:
      'The gateway injects parameters into URLs and bodies with the right HTTP verb, then returns the result to the model.',
    architecture: 'See the whole architecture on one page',

    finalTitle: 'Make your backend intelligent this week',
    finalLead: 'Sign in with Google, import your API, and send your team one link. A plan per workspace, no sales call.',
    finalCta: 'Get started',
  },
  pricing: {
    title: 'Pricing per workspace',
    lead: 'Seats and credits included. Extra members per seat; credits past the allowance on the next invoice.',
    perMonth: '/ month',
    channelsLabel: 'Your API in',
    seatsIncluded: (n: number) => `${n} seats included`,
    perExtraSeat: (price: string) => `${price} per extra seat`,
    creditsPerMonth: (n: string) => `${n} credits / month`,
    overage: (price: string) => `${price} per 1,000 extra credits`,
    start: 'Start',
    enterprise: 'Enterprise',
    custom: 'Custom',
    enterpriseBody: 'More seats and credits, invoice instead of card, a contract and data processing agreement.',
    contact: 'Contact us',
    billedIn: (currency: string) => `Billed in ${currency}, VAT included.`,
    indicative: ' Prices in other currencies are indicative.',
    numberLocale: 'en-US',
  },
};

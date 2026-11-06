// src/i18n/en.ts — the landing page's English copy. fr.ts has the same shape.

export const en = {
  meta: {
    title: 'API0 - Intelligence on demand for any application',
    description:
      'Add an intelligent interface to any application. Import your API and your team uses it from Teams, WhatsApp, Telegram or Claude, in plain language. No rewrite, fully in the cloud.',
    useCasesTitle: 'Use cases',
    useCasesDescription: 'How teams use api0: field service from WhatsApp, software vendors in Teams, internal tools in Claude Enterprise.',
    pricingTitle: 'Pricing',
    pricingDescription:
      'api0 plans per workspace: seats and credits included, your API in Telegram, WhatsApp and Teams. Billed in CHF, Swiss-made.',
  },
  nav: {
    useCases: 'Use cases',
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
    titleHighlight: 'any application',
    tagline: 'Your software, in the chat your team already uses.',
    lead:
      'Your application already does the work. api0 lets people talk to it: import your API, and your team uses it from Teams, WhatsApp, Telegram or Claude, in plain language. Every action runs as the person asking.',
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
        body: 'Every call passes the gateway: it checks who is calling, attaches the credential your application expects, deducts credits, and logs the call.',
        code: `tools/call create_invoice
  ✓ caller: jane@acme.com
  ✓ credential attached
  ✓ credits checked
  → POST /api/invoices`,
      },
    ],
    quickstart: 'Follow the five-minute quickstart',

    authTitle: 'What your application receives',
    authLead:
      'You choose how api0 authenticates to your application. The credential lives in api0 and is attached on every call, along with who the call is for.',
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
        body: 'Who is calling, what they may do and which credential your application gets are decided at one gateway, whichever client they came from.',
      },
      {
        title: 'Built in Rust',
        body: 'The gateway and every api0 service are written in Rust, for predictable latency and a small attack surface.',
      },
      {
        title: 'A plan per workspace',
        body: 'Seats and credits included, extra members per seat, overage on the next invoice. No enterprise sales call to get started.',
      },
    ],

    compareTitle: 'How api0 compares',
    compareLead:
      'Where api0 stands out.',
    feature: 'Feature',
    yes: 'Yes',
    no: 'No',
    comparison: [
      {
        feature: 'Your REST API as MCP tools',
        them: ['In preview', 'Your MCP servers only', 'YAML config', 'Code or your own server'],
      },
      {
        feature: 'Chat in Teams, signed in',
        them: [true, false, false, 'Agent actions only'],
      },
      {
        feature: 'Chat in WhatsApp',
        them: ['Closed since Oct 2026', false, false, 'Agent actions only'],
      },
      {
        feature: 'Chat in your own Telegram bot',
        them: ['Via Azure, with code', false, false, 'Agent actions only'],
      },
      {
        feature: 'One onboarding link per workspace',
        them: ['Per channel', 'Portal URL', false, 'One per app'],
      },
      {
        feature: 'Five credential modes, per-user OAuth included',
        them: ['Three modes', 'Up to each server', 'Policies to write', 'Catalogue apps only'],
      },
      {
        feature: 'Nothing to host',
        them: [true, true, 'Self-hosted', true],
      },
    ] as { feature: string; them: (boolean | string)[] }[],
    compareNote: 'Public docs, November 2026.',

    proxyTitle: 'From tool call to real API call',
    proxyNote:
      'The gateway injects parameters into URLs and bodies with the right HTTP verb, then returns the result to the model.',
    architecture: 'See the whole architecture on one page',

    finalTitle: 'Make your application intelligent this week',
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
  useCases: {
    kicker: 'Use cases',
    title: 'One API, imported once. Used where people already work.',
    lead: 'Three ways teams put api0 to work, and one product running on it today. Every action runs as the person asking, with their own permissions.',
    exampleLabel: 'Example conversation',
    setupLabel: 'What gets set up',
    channelsLabel: 'Channels:',
    cases: [
      {
        id: 'field-service',
        tag: 'Field service',
        title: 'Technicians run their jobs from WhatsApp',
        problem: 'On site, the field-service app is slow on a phone. Reports get typed in the evening, from memory, and dispatch spends the day calling for status.',
        chat: [
          { who: 'Technician', text: "What's my day?" },
          { who: 'Assistant', text: '3 visits. 1) 08:30 Lausanne, boiler X200, access code on file…' },
          { who: 'Technician', text: 'Done at Lausanne, replaced the filter, 2 FX-200 parts. Close it.' },
          { who: 'Assistant', text: 'Close job 1182 with that report and 2 × FX-200? (yes/no)' },
        ],
        setup: ['Your field-service API: schedule, work orders, parts stock', 'Each technician links their account once', 'A WhatsApp Business number connected to api0'],
        channels: 'WhatsApp, Telegram, Teams',
      },
      {
        id: 'software-vendor',
        tag: 'Software vendors',
        title: "Your product in your customers' Teams",
        problem: 'Customers ask for "AI in your product". Building an assistant and a Teams bot takes a team and months, and it must respect each user\'s rights.',
        chat: [
          { who: 'Customer user', text: 'What are my urgent open tickets?' },
          { who: 'Assistant', text: '4 urgent tickets. #2291 Export failing, open for 2 days…' },
          { who: 'Customer user', text: 'Assign #2291 to Paul and add a note: chasing the supplier.' },
          { who: 'Assistant', text: 'Done. Assigned to Paul, internal note added.' },
        ],
        setup: ['Your public API, imported from its OpenAPI spec', 'One api0 workspace per customer: tools, users, credits, log', 'A Teams app package generated by api0'],
        channels: 'Teams, Claude, WhatsApp, Telegram',
      },
      {
        id: 'internal-tools',
        tag: 'Internal tools',
        title: 'Internal systems in Claude Enterprise, securely',
        problem: "Claude doesn't know your ERP, CRM or HR tools, so people copy and paste. Security wants per-person rights, no secrets in the AI and an audit log.",
        chat: [
          { who: 'Employee', text: 'How many days off do I have left? Book me the 22nd to the 26th.' },
          { who: 'Assistant', text: '12 days left. Request 5 days, 22–26 Dec, and send it to Claire? (yes/no)' },
          { who: 'Manager', text: "Who's off next week on my team?" },
          { who: 'Assistant', text: 'Two people: Paul (Mon–Wed), Inès (Fri).' },
        ],
        setup: ['Your internal APIs as tools, reads first', 'Sign-in through Entra ID or your OIDC provider', 'Per-person credentials, so each system applies its own rights'],
        channels: 'Claude, Teams',
      },
    ],
    liveKicker: 'Running on api0 today',
    liveTitle: 'A CV-building SaaS',
    liveBody: 'A SaaS that builds CVs imported its API into api0: 17 endpoints. Its users read their profiles, generate PDF CVs, translate them, tailor them to a job and write cover letters, from Claude and from messaging apps. Each call reaches the application with a Google identity token, so the application keeps no api0 secret.',
    liveFacts: ['17 endpoints, imported once', 'Claude plus messaging channels', 'No secret stored by the application'],
    yoursTitle: 'Your API next',
    yoursBody: 'A 14-day POC on your own API: at the end, your team or customers use it for real, or we stop.',
    yoursCta: 'Start with your API',
    contactCta: 'Talk to us',
  },
};

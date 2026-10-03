---
title: "How api0 Works, End to End"
slug: "how-api0-works"
date: "2026-10-03"
excerpt: "One diagram of the whole platform: who calls api0, what the gateway decides on every request, and what your backend receives. Then the seven flows that run through it."
author: { name: "Engineering Team" }
tags: ["Architecture", "MCP", "OAuth", "Security", "api0"]
image: "https://api0.ai/images/blog/how-api0-works.png"
---

# How api0 Works, End to End

When Claude calls one of your APIs through api0, what actually happens between the question and the answer?

api0 is a gateway between AI assistants and your systems. You register an API, and it becomes a set of MCP tools. People reach those tools from Claude, from our SDK and CLI, or straight from WhatsApp and Telegram. Every one of those calls passes through the same gateway, which settles three things before your backend sees anything: who is calling, which credential your backend should receive, and what the call costs.

Here is the whole platform on one page.

## The map

<div class="svg-container" style="margin:2rem 0;overflow-x:auto;">
<svg class="a0map" viewBox="0 0 800 530" width="100%" style="height:auto;min-width:600px;max-width:800px;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="api0 architecture. Messaging users reach the WhatsApp bridge, which calls the gateway as the user and uses Claude as its model. MCP clients and the dashboard call the gateway directly, and Stripe sends payment webhooks to it. The gateway sends API specs to a formatter backed by a language model, keeps its state in an internal store, calls your backends with the right credential, and signs people in through identity providers.">
  <style>
    .a0map{--box:#ffffff;--core:#fff6ef;--tx:#1e293b;--mut:#64748b;--ln:#94a3b8;--bd:#cbd5e1;--ac:#FF6B00}
    :root.dark .a0map,[data-theme="dark"] .a0map{--box:#1e293b;--core:#2a1a0e;--tx:#f8fafc;--mut:#94a3b8;--ln:#64748b;--bd:#475569}
    .a0map .box{fill:var(--box);stroke:var(--bd);stroke-width:1.3}
    .a0map .ext{fill:var(--box);stroke:var(--bd);stroke-width:1.3;stroke-dasharray:4 3}
    .a0map .core{fill:var(--core);stroke:var(--ac);stroke-width:2}
    .a0map .t{fill:var(--tx);font-family:ui-sans-serif,system-ui,sans-serif;font-size:14px;font-weight:600}
    .a0map .th{fill:var(--tx);font-family:ui-sans-serif,system-ui,sans-serif;font-size:16px;font-weight:700}
    .a0map .m{fill:var(--mut);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px}
    .a0map .l{fill:var(--mut);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10.5px}
    .a0map .ln{stroke:var(--ln);stroke-width:1.5;fill:none}
    .a0map .hd{fill:var(--ln)}
  </style>
  <defs>
    <marker id="a0map-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="hd" d="M0,0 L10,5 L0,10 z"/></marker>
  </defs>
  <path class="ln" d="M95,80 L95,166" marker-end="url(#a0map-arrow)"/>
  <text class="l" x="103" y="128">webhooks</text>
  <path class="ln" d="M340,80 L340,156" marker-end="url(#a0map-arrow)"/>
  <text class="l" x="348" y="122">MCP · API key or OAuth</text>
  <path class="ln" d="M535,80 L505,156" marker-end="url(#a0map-arrow)"/>
  <text class="l" x="528" y="122">REST</text>
  <path class="ln" d="M715,80 L554,172" marker-end="url(#a0map-arrow)"/>
  <text class="l" x="652" y="136">payments</text>
  <path class="ln" d="M190,218 L246,218" marker-end="url(#a0map-arrow)"/>
  <text class="l" x="194" y="208">as user</text>
  <path class="ln" d="M80,270 L80,306" marker-end="url(#a0map-arrow)"/>
  <text class="l" x="88" y="292">model</text>
  <path class="ln" d="M170,270 L170,460 L246,460" marker-end="url(#a0map-arrow)"/>
  <text class="l" x="177" y="446">sessions</text>
  <path class="ln" d="M550,218 L606,218" marker-end="url(#a0map-arrow)"/>
  <text class="l" x="556" y="208">specs</text>
  <path class="ln" d="M720,270 L720,306" marker-end="url(#a0map-arrow)"/>
  <path class="ln" d="M355,280 L355,416" marker-end="url(#a0map-arrow)"/>
  <text class="l" x="363" y="352">internal</text>
  <path class="ln" d="M470,280 L548,416" marker-end="url(#a0map-arrow)"/>
  <text class="l" x="516" y="346">tool calls +</text>
  <text class="l" x="516" y="360">credential</text>
  <path class="ln" d="M530,280 L716,416" marker-end="url(#a0map-arrow)"/>
  <text class="l" x="578" y="300">OIDC · OAuth</text>
  <rect class="ext" x="10" y="20" width="170" height="60" rx="8"/>
  <text class="t" x="24" y="45">Messaging users</text>
  <text class="m" x="24" y="65">WhatsApp · Telegram</text>
  <rect class="ext" x="200" y="20" width="230" height="60" rx="8"/>
  <text class="t" x="214" y="45">MCP clients</text>
  <text class="m" x="214" y="65">Claude · Claude Code · SDK/CLI</text>
  <rect class="box" x="450" y="20" width="170" height="60" rx="8"/>
  <text class="t" x="464" y="45">Dashboard</text>
  <text class="m" x="464" y="65">web · desktop console</text>
  <rect class="ext" x="640" y="20" width="150" height="60" rx="8"/>
  <text class="t" x="654" y="45">Stripe</text>
  <text class="m" x="654" y="65">credits · licenses</text>
  <rect class="box" x="10" y="170" width="180" height="100" rx="8"/>
  <text class="t" x="24" y="196">Messaging bridge</text>
  <text class="m" x="24" y="218">one loop, every channel</text>
  <text class="m" x="24" y="236">account linking</text>
  <text class="m" x="24" y="254">conversation memory</text>
  <rect class="core" x="250" y="160" width="300" height="120" rx="10"/>
  <text class="th" x="266" y="188">Gateway</text>
  <text class="m" x="266" y="210">the only public entry</text>
  <text class="m" x="266" y="228">MCP · REST · OAuth 2.1</text>
  <text class="m" x="266" y="246">identity · credits · routing</text>
  <text class="m" x="266" y="264">picks the backend's credential</text>
  <rect class="box" x="610" y="170" width="180" height="100" rx="8"/>
  <text class="t" x="624" y="196">Spec formatter</text>
  <text class="m" x="624" y="218">API spec → tools</text>
  <rect class="ext" x="10" y="310" width="140" height="52" rx="8"/>
  <text class="t" x="24" y="333">Claude</text>
  <text class="m" x="24" y="351">the bridge's model</text>
  <rect class="ext" x="650" y="310" width="140" height="52" rx="8"/>
  <text class="t" x="664" y="333">Language model</text>
  <text class="m" x="664" y="351">spec formatting</text>
  <rect class="box" x="250" y="420" width="210" height="90" rx="8"/>
  <text class="t" x="264" y="446">Store</text>
  <text class="m" x="264" y="466">internal service</text>
  <text class="m" x="264" y="484">Postgres, row-level security</text>
  <text class="m" x="264" y="500">workspaces · keys · tools</text>
  <rect class="ext" x="480" y="420" width="150" height="90" rx="8"/>
  <text class="t" x="494" y="446">Your backends</text>
  <text class="m" x="494" y="466">any REST API</text>
  <text class="m" x="494" y="484">or MCP server</text>
  <rect class="ext" x="650" y="420" width="140" height="90" rx="8"/>
  <text class="t" x="664" y="446">Identity</text>
  <text class="m" x="664" y="466">Google · Entra</text>
  <text class="m" x="664" y="484">any OIDC</text>
</svg>
</div>

Solid boxes are api0. Dashed boxes are someone else: your users' clients, your backends, Stripe, the identity providers and the models. The orange one is the gateway, and everything your backends receive passes through it.

## 1. The MCP tool call

This is the product. A client speaks JSON-RPC to a single MCP endpoint.

1. `initialize` returns your workspace's instructions for the model.
2. `tools/list` returns the tools of the caller's workspace, or of the provider whose connector they came through.
3. `tools/call` looks the tool up by name.
4. The gateway picks the credential your backend expects (flow 3).
5. For a paid tool, it checks the balance first. If the balance can't be read, the call does not run.
6. It forwards the request with who it is for and your backend's credential, deducts credits on success, and logs the call.

## 2. Who is calling

Every way in ends with a known person in a known workspace.

- **API keys** for the SDK, the CLI, CI jobs and the messaging bridge.
- **Consumer keys** for products built on api0: the provider names the end user, and credits come from that person.
- **Google sign-in** for the dashboard and the desktop console.
- **OAuth 2.1 for MCP connectors** such as Claude. PKCE (S256) is required, each authorization code is tied to the client, redirect and challenge it was issued for, and a code works once.
- **Your own identity provider**, such as Entra ID or any OIDC provider, for teams that already sign in there.

## 3. What your backend receives

Each workspace chooses how its backends are called. The connection test in the dashboard runs the same logic as a real call, so a passing test means a working setup.

- No credential, a fixed bearer token, or custom headers
- A Google identity token that proves the call came from api0
- OAuth client credentials
- Each person's own secret
- Each person's own account, connected once through OAuth

## 4. Registering tools

1. Upload an API spec from the dashboard.
2. The spec formatter normalizes it with a language model.
3. The result is stored as endpoint groups and MCP tools.
4. Or define and edit tools by hand.
5. A built-in test calls each tool before it counts as configured.

## 5. WhatsApp and Telegram

The bridge is just another MCP client, with Claude as its model. Both channels share one conversation loop. A new sender links their account once with a short code from the dashboard. From then on, Claude runs each turn and calls your tools through the gateway as that person, with that person's permissions.

## 6. Credits and licenses

Credits are bought in the dashboard and spent by paid tool calls. Licenses for the desktop app are settled by Stripe's webhook. A provider that bills on its own side can skip api0 credits entirely.

## 7. Workspaces

A workspace owner names the workspace, invites members and sets their roles, creates and revokes API keys, reads usage and call logs, writes instructions for the model, configures backend credentials and sign-in, and connects WhatsApp or Telegram.

## The takeaway

The useful property of this shape is that there is exactly one place where identity, credentials and billing are decided. Claude, the CLI and a WhatsApp message all arrive at the same gateway, and your backend gets the same answer to "who is this, and what may they do" whichever door they used. If you are connecting AI assistants to internal systems, that single decision point is the thing to look for.

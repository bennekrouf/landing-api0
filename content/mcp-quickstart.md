---
title: "Connect Claude to Your Backend in 5 Minutes with api0"
date: "2026-04-25"
excerpt: "Expose your existing APIs as MCP tools Claude can call—with built-in auth, identity propagation, and access control. Here's the whole flow in two diagrams."
author: { name: "API0 Team" }
tags: ["MCP", "Tutorial", "Claude", "Quick Start", "Integration"]
---

# Connect Claude to Your Backend in 5 Minutes with api0

Got a backend with HTTP endpoints? Claude can call them as native MCP tools in under five minutes — no SDK, no model hosting, no rebuilt auth layer.

Here's the entire setup, start to finish:

<div class="svg-container" style="margin:2rem 0;">
<svg class="qs-flow" viewBox="0 0 820 130" width="100%" style="height:auto;max-width:800px;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Five setup steps: sign in, import your spec, set downstream auth, connect Claude via OAuth, test.">
  <style>
    .qs-flow{--box:#ffffff;--tx:#1e293b;--mut:#64748b;--ln:#cbd5e1;--ac:#FF6B00}
    :root.dark .qs-flow,[data-theme="dark"] .qs-flow{--box:#1e293b;--tx:#f8fafc;--mut:#94a3b8;--ln:#475569}
    .qs-flow .box{fill:var(--box);stroke:var(--ln);stroke-width:1.5}
    .qs-flow .n{fill:var(--ac);font:700 12px ui-sans-serif,system-ui,sans-serif}
    .qs-flow .t{fill:var(--tx);font:600 12.5px ui-sans-serif,system-ui,sans-serif}
    .qs-flow .m{fill:var(--mut);font:10.5px ui-sans-serif,system-ui,sans-serif}
    .qs-flow .ln{stroke:var(--ln);stroke-width:1.5;fill:none}
  </style>
  <defs><marker id="qsa" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0,0 L5,3 L0,6 Z" fill="var(--ln)"/></marker></defs>
  <g>
    <rect class="box" x="6"   y="28" width="140" height="58" rx="9"/>
    <text class="n" x="20" y="50">1</text><text class="t" x="20" y="68">Sign in</text>
    <rect class="box" x="172" y="28" width="140" height="58" rx="9"/>
    <text class="n" x="186" y="50">2</text><text class="t" x="186" y="68">Import spec</text>
    <rect class="box" x="338" y="28" width="140" height="58" rx="9"/>
    <text class="n" x="352" y="50">3</text><text class="t" x="352" y="68">Downstream auth</text>
    <rect class="box" x="504" y="28" width="140" height="58" rx="9"/>
    <text class="n" x="518" y="50">4</text><text class="t" x="518" y="68">Connect Claude</text>
    <rect class="box" x="670" y="28" width="140" height="58" rx="9"/>
    <text class="n" x="684" y="50">5</text><text class="t" x="684" y="68">Test</text>
    <path class="ln" d="M146,57 L170,57" marker-end="url(#qsa)"/>
    <path class="ln" d="M312,57 L336,57" marker-end="url(#qsa)"/>
    <path class="ln" d="M478,57 L502,57" marker-end="url(#qsa)"/>
    <path class="ln" d="M644,57 L668,57" marker-end="url(#qsa)"/>
    <text class="m" x="20"  y="104">app.api0.ai</text>
    <text class="m" x="186" y="104">OpenAPI or plain text</text>
    <text class="m" x="352" y="104">how api0 calls you</text>
    <text class="m" x="518" y="104">one-time OAuth</text>
    <text class="m" x="684" y="104">a natural command</text>
  </g>
</svg>
</div>

**Prerequisites:** a backend with at least one HTTP endpoint, an OpenAPI spec (or a plain-English description — api0 parses both), and a Google account.

## The five steps

1. **Sign in** at [app.api0.ai](https://app.api0.ai) with Google.
2. **Import your spec** under **My Endpoints → Import**. Paste OpenAPI, or just describe endpoints in English (`POST /api/invoices — creates an invoice; required: customer_id, amount, currency`). api0 turns them into MCP tools.
3. **Set downstream auth** under the **Security** tab — how api0 authenticates to *your* backend: Google Service Account (OIDC), a static bearer token, or an API-key header. This lives in api0; Claude never sees it.
4. **Connect Claude** — under **Connectors → MCP**, register a Client ID (e.g. `myapp-mcp`). Your users add your MCP server in Claude, approve once via OAuth, and Claude holds a key tied to their identity.
5. **Test** — in Claude: *"Create an invoice for customer ACME for $1,200 USD."*

## What happens on every call

Once connected, each tool call runs this path in milliseconds — your backend just sees a clean, authenticated HTTP request:

<div class="svg-container" style="margin:2rem 0;">
<svg class="qs-run" viewBox="0 0 800 300" width="100%" style="height:auto;max-width:760px;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Runtime call sequence: Claude sends an API key to the api0 gateway, which validates identity, mints an OIDC token, checks credits and injects identity headers, then proxies to your backend and returns the result while logging and metering.">
  <style>
    .qs-run{--box:#ffffff;--tx:#1e293b;--mut:#64748b;--ln:#cbd5e1;--ac:#FF6B00}
    :root.dark .qs-run,[data-theme="dark"] .qs-run{--box:#1e293b;--tx:#f8fafc;--mut:#94a3b8;--ln:#475569}
    .qs-run .box{fill:var(--box);stroke:var(--ln);stroke-width:1.5}
    .qs-run .acc{fill:var(--box);stroke:var(--ac);stroke-width:2}
    .qs-run .th{fill:var(--tx);font:700 14px ui-sans-serif,system-ui,sans-serif}
    .qs-run .t{fill:var(--tx);font:600 12.5px ui-sans-serif,system-ui,sans-serif}
    .qs-run .m{fill:var(--mut);font:11px ui-sans-serif,system-ui,sans-serif}
    .qs-run .ac{fill:var(--ac);font:700 11px ui-sans-serif,system-ui,sans-serif}
    .qs-run .ln{stroke:var(--ln);stroke-width:1.5;fill:none}
    .qs-run .lnac{stroke:var(--ac);stroke-width:1.6;fill:none}
  </style>
  <defs>
    <marker id="qra" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ln)"/></marker>
    <marker id="qraac" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ac)"/></marker>
  </defs>

  <!-- Claude -->
  <rect class="box" x="24" y="112" width="150" height="70" rx="10"/>
  <text class="th" x="99" y="142" text-anchor="middle">Claude</text>
  <text class="m" x="99" y="164" text-anchor="middle">MCP client</text>

  <!-- Gateway -->
  <rect class="acc" x="290" y="42" width="220" height="216" rx="12"/>
  <text class="th" x="400" y="70" text-anchor="middle">api0 Gateway</text>
  <text class="m" x="312" y="100">1 · validate API key → user</text>
  <text class="m" x="312" y="126">2 · mint OIDC token</text>
  <text class="m" x="312" y="152">3 · check credit balance</text>
  <text class="m" x="312" y="178">4 · inject identity headers</text>
  <text class="ac" x="312" y="230">↺ logs call · deducts credits</text>

  <!-- Backend -->
  <rect class="box" x="626" y="112" width="150" height="70" rx="10"/>
  <text class="th" x="701" y="138" text-anchor="middle">Your backend</text>
  <text class="m" x="701" y="160" text-anchor="middle">verifies OIDC · runs</text>

  <!-- arrows -->
  <path class="ln"   d="M174,140 L286,140" marker-end="url(#qra)"/>
  <text class="ac" x="230" y="130" text-anchor="middle">API key</text>
  <path class="lnac" d="M510,140 L622,140" marker-end="url(#qraac)"/>
  <text class="ac" x="566" y="130" text-anchor="middle">+ X-User-Email</text>
  <path class="ln"   d="M622,166 L512,166" marker-end="url(#qra)"/>
  <text class="m" x="567" y="184" text-anchor="middle">result</text>
  <path class="ln"   d="M286,170 L176,170" marker-end="url(#qra)"/>
  <text class="m" x="231" y="188" text-anchor="middle">result</text>
</svg>
</div>

Your backend receives `X-User-Email` and `X-Tenant-Id` headers already verified by the gateway — no MCP awareness required on your side. Credentials never leave api0, every call is metered, and you get a full audit log.

## That's it

Five minutes, zero infrastructure changes, and Claude has governed access to your backend. Head to [app.api0.ai](https://app.api0.ai) to start.

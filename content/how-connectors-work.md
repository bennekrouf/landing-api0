---
title: "One Registry, Two Doors: How api0 Connectors Actually Work"
date: "2026-07-22"
excerpt: "MCP, WhatsApp, Telegram — api0 connectors all expose the same endpoints, but only one of them speaks MCP. Here's the architecture, in diagrams."
author: { name: "Engineering Team" }
tags: ["Architecture", "MCP", "Connectors", "WhatsApp"]
---

# One Registry, Two Doors: How api0 Connectors Actually Work

If your endpoints are reachable from **Claude** *and* from **WhatsApp**, does that mean WhatsApp is also talking MCP under the hood?

Short answer: no. And the difference matters if you're reasoning about auth, latency, or where a request actually goes. api0 has one shared thing — your **tool registry** — and several very different **doors** into it. MCP is one of those doors, not the shared layer. Here's the whole picture in one diagram.

## The shared core, and the two paths

<div class="svg-container" style="margin:2rem 0;">
<svg class="api0-arch" viewBox="0 0 800 470" width="100%" style="height:auto;max-width:760px;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="api0 connector architecture: uploaded specs feed a shared tool registry, exposed through an MCP door and a WhatsApp door, both of which call your backend APIs.">
  <style>
    .api0-arch{--bg:#f8fafc;--box:#ffffff;--tx:#1e293b;--mut:#64748b;--ln:#cbd5e1;--ac:#FF6B00}
    :root.dark .api0-arch,[data-theme="dark"] .api0-arch{--bg:#0f172a;--box:#1e293b;--tx:#f8fafc;--mut:#94a3b8;--ln:#475569}
    .api0-arch .bg{fill:var(--bg)}
    .api0-arch .box{fill:var(--box);stroke:var(--ln);stroke-width:1.5;rx:10}
    .api0-arch .acc{fill:var(--box);stroke:var(--ac);stroke-width:2}
    .api0-arch .t{fill:var(--tx);font-family:ui-sans-serif,system-ui,sans-serif;font-size:14px;font-weight:600}
    .api0-arch .th{fill:var(--tx);font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;font-weight:700}
    .api0-arch .m{fill:var(--mut);font-family:ui-sans-serif,system-ui,sans-serif;font-size:11.5px}
    .api0-arch .ac{fill:var(--ac);font-family:ui-sans-serif,system-ui,sans-serif;font-size:13px;font-weight:700}
    .api0-arch .ln{stroke:var(--ln);stroke-width:1.5;fill:none}
    .api0-arch .lnac{stroke:var(--ac);stroke-width:1.8;fill:none}
  </style>
  <defs>
    <marker id="ah" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ln)"/></marker>
    <marker id="ahac" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ac)"/></marker>
  </defs>

  <rect class="bg" x="0" y="0" width="800" height="470" rx="12"/>

  <!-- 1. Upload -->
  <rect class="box" x="300" y="18" width="200" height="44" rx="10"/>
  <text class="t" x="400" y="45" text-anchor="middle">① You upload your API specs</text>
  <path class="ln" d="M400,62 L400,88" marker-end="url(#ah)"/>

  <!-- 2. Registry (shared) -->
  <rect class="acc" x="250" y="90" width="300" height="66" rx="10"/>
  <text class="ac" x="400" y="116" text-anchor="middle">api0 Tool Registry</text>
  <text class="m" x="400" y="138" text-anchor="middle">one per tenant · tool_name · backend_url · http_verb</text>

  <!-- split -->
  <path class="ln" d="M400,156 L400,180 L180,180 L180,204" marker-end="url(#ah)"/>
  <path class="ln" d="M400,156 L400,180 L620,180 L620,204" marker-end="url(#ah)"/>

  <!-- 3a. MCP door -->
  <rect class="box" x="48" y="206" width="264" height="128" rx="10"/>
  <text class="th" x="180" y="230" text-anchor="middle">MCP door</text>
  <text class="m" x="70" y="256">• gateway <tspan style="font-family:ui-monospace,monospace">/mcp</tspan> endpoint</text>
  <text class="m" x="70" y="276">• speaks the <tspan fill="var(--ac)" font-weight="700">MCP protocol</tspan></text>
  <text class="m" x="70" y="296">• clients: Claude.ai · Desktop · Cursor</text>
  <text class="m" x="70" y="316">• auth: API key <tspan font-style="italic">or</tspan> OAuth Client ID</text>

  <!-- 3b. WhatsApp door -->
  <rect class="box" x="488" y="206" width="264" height="128" rx="10"/>
  <text class="th" x="620" y="230" text-anchor="middle">WhatsApp door</text>
  <text class="m" x="510" y="256">• separate whatsapp-bridge service</text>
  <text class="m" x="510" y="276">• runs its <tspan font-weight="700" fill="var(--tx)">own Claude agent</tspan></text>
  <text class="m" x="510" y="296">• trigger: Meta webhook</text>
  <text class="m" x="510" y="316">• auth: Meta phone-number + token</text>

  <!-- converge to backend -->
  <path class="lnac" d="M180,334 L180,392 L392,392" marker-end="url(#ahac)"/>
  <path class="lnac" d="M620,334 L620,392 L508,392" marker-end="url(#ahac)"/>
  <text class="ac" x="400" y="372" text-anchor="middle" font-size="11">both call backend_url</text>

  <!-- 4. Backend -->
  <rect class="acc" x="300" y="404" width="200" height="46" rx="10"/>
  <text class="t" x="400" y="432" text-anchor="middle">Your backend APIs</text>
</svg>
</div>

Everything starts the same way: you **upload an API spec**, and api0 turns each endpoint into a tool — `tool_name`, `backend_url`, `http_verb` — in your tenant's **registry**. Every connector reads from that one registry. Add an endpoint once, and it lights up everywhere.

What differs is the *door*.

## Why "MCP" and "WhatsApp" aren't the same kind of thing

The two doors don't just look different in the UI — they're different runtimes with different trust models. The comparison below is the part worth internalizing:

| | **MCP door** | **WhatsApp door** |
|---|---|---|
| **Transport** | MCP protocol over the gateway `/mcp` endpoint | Meta webhook → `whatsapp-bridge` service |
| **Who runs the AI** | The *client* (Claude.ai, Claude Desktop, Cursor) | api0's bridge runs **its own** Claude agent |
| **How a tool is called** | Client asks over MCP → gateway proxies to `backend_url` | Bridge calls `backend_url` **directly** — no MCP |
| **Auth** | API key (Bearer) **or** OAuth Client ID | Meta Phone Number ID + permanent token |
| **What the end-user installs** | An MCP integration in their AI client | Nothing — they just message your number |

Read the middle two rows again: **the MCP protocol only exists on the left**. The WhatsApp bridge fetches the same tool list, but then drives Claude itself through the Anthropic Messages API and hits your backends directly. It reuses the *registry*, not the *protocol*.

That's why a setting like the **OAuth Client ID** lives only under the MCP door — it configures how someone connects an MCP client via "Add integration". WhatsApp never sees it; it authenticates to Meta instead.

## The mental model

Stop thinking "MCP is how api0 works." Think:

> **api0 = one tool registry + many doors. MCP is one door.**

Telegram, when it lands, will be a third door — its own bridge, reading the same registry. None of that changes your endpoints; you keep uploading specs, and each door decides how the outside world walks in.

## Takeaway

When you reason about an api0 request, ask two questions in order: *which door did it come through?* (that fixes the transport and auth), and *which tool in the registry does it map to?* (that fixes where it ultimately lands — always your `backend_url`). Keep the registry and the doors separate in your head, and the whole system — MCP today, WhatsApp today, Telegram tomorrow — stays simple.

---
title: "Welcome to the api0 MCP Gateway Ecosystem"
date: "2026-04-21"
excerpt: "api0 is a secure MCP gateway that bridges Claude and other AI agents to your backend APIs—without exposing credentials or rebuilding your infrastructure."
author: { name: "Mayo" }
tags: ["MCP", "API Gateway", "Architecture", "Claude"]
svg: "/svg/blog/api0-ecosystem.svg"
---

# Welcome to the api0 MCP Gateway Ecosystem

Most AI tools today generate text. api0 is about *execution*—secure, governed, multi-tenant execution.

The Model Context Protocol (MCP) is becoming the standard for connecting AI agents like Claude to real tools and APIs. But MCP itself is just a protocol. It doesn't handle authentication, billing, multi-tenancy, or access control. That's the gap api0 fills.

api0 is an **MCP gateway**: the secure infrastructure layer that sits between Claude and your backend services. The whole ecosystem is three phases — set up once, connect per user, govern every call:

<div class="svg-container" style="margin:2rem 0;">
<svg class="eco-life" viewBox="0 0 800 300" width="100%" style="height:auto;max-width:780px;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three phases: admin setup once, user OAuth per user, and governed tool execution per call, which reaches your backend as a clean authenticated HTTP request.">
  <style>
    .eco-life{--bg:#f8fafc;--box:#ffffff;--tx:#1e293b;--mut:#64748b;--ln:#cbd5e1;--ac:#FF6B00}
    :root.dark .eco-life,[data-theme="dark"] .eco-life{--bg:#0f172a;--box:#1e293b;--tx:#f8fafc;--mut:#94a3b8;--ln:#475569}
    .eco-life .bg{fill:var(--bg)}
    .eco-life .box{fill:var(--box);stroke:var(--ln);stroke-width:1.5}
    .eco-life .acc{fill:var(--box);stroke:var(--ac);stroke-width:2}
    .eco-life .th{fill:var(--tx);font:700 13.5px ui-sans-serif,system-ui,sans-serif}
    .eco-life .ac{fill:var(--ac);font:700 10.5px ui-sans-serif,system-ui,sans-serif}
    .eco-life .m{fill:var(--mut);font:10.5px ui-sans-serif,system-ui,sans-serif}
    .eco-life .t{fill:var(--tx);font:600 12px ui-sans-serif,system-ui,sans-serif}
    .eco-life .ln{stroke:var(--ln);stroke-width:1.5;fill:none}
    .eco-life .lnac{stroke:var(--ac);stroke-width:1.8;fill:none}
  </style>
  <defs>
    <marker id="eca" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ln)"/></marker>
    <marker id="ecaac" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ac)"/></marker>
  </defs>
  <rect class="bg" x="0" y="0" width="800" height="300" rx="12"/>

  <!-- Phase 1 -->
  <rect class="box" x="8" y="34" width="236" height="150" rx="11"/>
  <text class="th" x="24" y="64">① Admin Setup</text>
  <text class="ac" x="24" y="84">one-time</text>
  <text class="m" x="24" y="114">Upload OpenAPI → MCP tools</text>
  <text class="m" x="24" y="136">Set downstream auth</text>
  <text class="m" x="24" y="158">Register a Client ID</text>

  <!-- Phase 2 -->
  <rect class="box" x="282" y="34" width="236" height="150" rx="11"/>
  <text class="th" x="298" y="64">② User OAuth</text>
  <text class="ac" x="298" y="84">per user</text>
  <text class="m" x="298" y="114">/oauth/authorize</text>
  <text class="m" x="298" y="136">user approves once</text>
  <text class="m" x="298" y="158">API key: user + backend</text>

  <!-- Phase 3 -->
  <rect class="acc" x="556" y="34" width="236" height="150" rx="11"/>
  <text class="th" x="572" y="64">③ Tool Execution</text>
  <text class="ac" x="572" y="84">per call</text>
  <text class="m" x="572" y="114">validate key → identity</text>
  <text class="m" x="572" y="136">mint OIDC · inject headers</text>
  <text class="m" x="572" y="158">check credits · log</text>

  <!-- phase arrows -->
  <path class="ln" d="M244,109 L280,109" marker-end="url(#eca)"/>
  <path class="ln" d="M518,109 L554,109" marker-end="url(#eca)"/>

  <!-- to backend -->
  <path class="lnac" d="M674,184 L674,229" marker-end="url(#ecaac)"/>
  <rect class="acc" x="576" y="232" width="196" height="46" rx="10"/>
  <text class="t" x="674" y="260" text-anchor="middle">Your backend — clean HTTP</text>
</svg>
</div>

## Three Pillars of the Ecosystem

### 1. Admin Setup — Define Your Tools Once

From the api0 Dashboard, backend admins configure everything in one place:

- **Upload an OpenAPI spec** and api0 automatically converts your endpoints into MCP tools Claude can call.
- **Configure downstream auth**: choose between Google Service Account (OIDC), bearer tokens, or API keys. api0 handles minting and caching credentials at call time.
- **Register a Client ID** that Claude uses to initiate the OAuth flow on behalf of your users.

You define it once. Every user who connects through Claude inherits the same security model automatically.

### 2. User OAuth Flow — Claude Connects Securely

When an end-user wants Claude to access their account, a standard OAuth 2.0 flow kicks in:

1. Claude hits the api0 `/oauth/authorize` endpoint.
2. The user approves in the api0 Dashboard (already authenticated via Google).
3. api0 issues a live API key tied to that specific user and backend provider.
4. Claude holds that key and uses it for all subsequent tool calls.

Your users never share passwords. Your backend never sees raw LLM requests. The key inherently encodes both user identity and backend context.

### 3. Real-Time Tool Execution — Governed at Every Step

When Claude calls a tool through the gateway:

- api0 validates the API key and resolves the user + backend context in one lookup.
- It mints a fresh OIDC token (cached for 55 minutes for performance) to authenticate against your backend.
- It injects `X-User-Email` and `X-Tenant-Id` headers so your backend always knows who is acting.
- It checks the user's credit balance before proxying.
- It logs the call and deducts credits after execution.

Your backend receives a clean, authenticated HTTP request. It never needs to know anything about MCP, Claude, or the gateway.

## Not Another AI Middleware

This isn't about wrapping your API in a chatbot. It's about giving Claude governed access to tools your backend already exposes.

Your endpoints stay yours. Your auth stays yours. Your access control stays yours.

api0 just handles the plumbing that would otherwise take months to build correctly: OAuth, OIDC minting, multi-tenant isolation, credit metering, and MCP protocol compliance.

The result: Claude can act on your users' behalf—safely, auditably, at scale.

That's the api0 ecosystem.

---
title: "api0 Architecture: How a Request Travels"
date: "2026-11-11"
excerpt: "The technical guide: how a request travels through api0, from Claude, Teams, WhatsApp or Telegram to your application, what each component does, how secrets are protected, and the domains involved."
author: { name: "API0 Team" }
tags: ["Technical Guide", "Architecture", "MCP", "Security"]
---

# api0 Architecture: How a Request Travels

This guide is for technical and security teams evaluating api0. It describes the path of a request and what each component does. The two authentication questions each have their own guide: **who is calling api0**, in [inbound authentication](/guides/inbound-authentication) (guide 10), and **which credential api0 uses to call your application**, in [outbound authentication](/guides/outbound-authentication) (guide 11).

## Overview

<svg class="g04-arch" viewBox="0 0 800 450" width="100%" style="height:auto;max-width:780px;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="api0 architecture: Claude and MCP clients call the gateway over MCP, Teams, WhatsApp and Telegram go through the messaging bridge, and the gateway, the only way in, calls your application with the right credential.">
<style>
.g04-arch{--bg:#f8fafc;--box:#ffffff;--tx:#1e293b;--mut:#64748b;--ln:#cbd5e1;--ac:#FF6B00}
:root.dark .g04-arch,[data-theme="dark"] .g04-arch{--bg:#0f172a;--box:#1e293b;--tx:#f8fafc;--mut:#94a3b8;--ln:#475569}
.g04-arch text{font-family:ui-sans-serif,system-ui,sans-serif;fill:var(--tx)}
.g04-arch .title{font-size:14px;font-weight:700}
.g04-arch .body{font-size:12px;font-weight:600}
.g04-arch .cap{font-size:11px;fill:var(--mut)}
.g04-arch .box{fill:var(--box);stroke:var(--ln);stroke-width:1.5}
.g04-arch .acbox{fill:var(--ac);stroke:var(--ac)}
.g04-arch .ln{stroke:var(--ln);stroke-width:1.5;fill:none}
.g04-arch .on{fill:#ffffff}
</style>
<defs>
<marker id="g04-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M0,0 L10,5 L0,10 z" fill="var(--ln)"></path>
</marker>
</defs>
<!-- callers -->
<rect class="box" x="40" y="20" width="300" height="56" rx="8"></rect>
<text x="190" y="44" text-anchor="middle" class="title">Claude · Cursor</text>
<text x="190" y="62" text-anchor="middle" class="cap">and any MCP client</text>
<rect class="box" x="460" y="20" width="300" height="56" rx="8"></rect>
<text x="610" y="44" text-anchor="middle" class="title">Teams · WhatsApp · Telegram</text>
<text x="610" y="62" text-anchor="middle" class="cap">and their bots</text>
<!-- messaging bridge -->
<path class="ln" d="M610,76 L610,112" marker-end="url(#g04-arrow)"></path>
<text x="620" y="99" class="cap">webhooks</text>
<rect class="box" x="460" y="114" width="300" height="56" rx="8"></rect>
<text x="610" y="138" text-anchor="middle" class="title">Messaging bridge</text>
<text x="610" y="156" text-anchor="middle" class="cap">runs api0's assistant</text>
<!-- into the gateway -->
<path class="ln" d="M190,76 L190,206" marker-end="url(#g04-arrow)"></path>
<text x="200" y="145" class="cap">MCP (HTTP)</text>
<path class="ln" d="M610,170 L610,206" marker-end="url(#g04-arrow)"></path>
<text x="620" y="193" class="cap">the same tools</text>
<!-- gateway -->
<rect class="acbox" x="100" y="208" width="600" height="112" rx="8"></rect>
<text x="400" y="236" text-anchor="middle" class="title on">api0 gateway</text>
<text x="140" y="264" class="body on">1. authenticates the caller</text>
<text x="140" y="284" class="body on">2. resolves the tenant and the tool</text>
<text x="140" y="304" class="body on">3. checks credits</text>
<text x="430" y="264" class="body on">4. injects the credential</text>
<text x="430" y="284" class="body on">5. calls the application</text>
<text x="430" y="304" class="body on">6. logs and meters</text>
<!-- behind the gateway -->
<path class="ln" d="M230,320 L230,362" marker-start="url(#g04-arrow)" marker-end="url(#g04-arrow)"></path>
<path class="ln" d="M570,320 L570,362" marker-end="url(#g04-arrow)"></path>
<text x="580" y="345" class="cap">with the right credential</text>
<rect class="box" x="100" y="364" width="260" height="56" rx="8"></rect>
<text x="230" y="388" text-anchor="middle" class="title">Store (Postgres)</text>
<text x="230" y="406" text-anchor="middle" class="cap">tools · tenants · sealed secrets</text>
<rect class="box" x="440" y="364" width="260" height="56" rx="8"></rect>
<text x="570" y="388" text-anchor="middle" class="title">Your application</text>
<text x="570" y="406" text-anchor="middle" class="cap">or a third-party API</text>
<!-- caption -->
<text x="400" y="442" text-anchor="middle" class="cap">The gateway is the only way through to your systems.</text>
</svg>

Three components, written in **Rust**:

- **The gateway** receives every call, authenticates it, routes it and logs it. It's the only path to your systems.
- **The store** holds the tool registry, tenants, credentials (encrypted) and the usage ledger.
- **The messaging bridge** receives webhooks from Teams, WhatsApp and Telegram and runs the assistant, which calls the same tools through the gateway.

## The MCP gateway

`/mcp` is a standard **Model Context Protocol** server over HTTP (Streamable HTTP). Nothing proprietary at the protocol level: any MCP client works.

| Method | Behaviour |
|---|---|
| `initialize` | Negotiates the protocol version, advertises tools, returns the tenant's instructions |
| `tools/list` | The caller's tenant's tools, and only those |
| `tools/call` | Routes to the application, meters, returns the result |
| `ping` | Empty result |

Supported protocol versions: `2025-06-18`, `2025-03-26`, `2024-11-05`.

**Tenant instructions.** `initialize` returns a text (4,000 characters max) that the client places in front of the model: shared usage rules (load a tool before calling it, take IDs from a listing tool rather than guessing…), the tenant's own text (2,000 characters max) and, for each tool group, its starting tools.

**Errors.** A refusal from your application comes back as a **result** flagged `isError`, with your application's own message: the model reads it and can correct. JSON-RPC errors are reserved for api0's own refusals (unknown tool, invalid parameters, no credits). **A failed call is never billed.**

## What a tool is

A tool is an entry in the registry, scoped to one tenant:

| Field | Role |
|---|---|
| name, description, input schema | What the model sees |
| application URL | Target, with `{parameters}` substituted |
| HTTP verb | Set → REST call. Empty → the application speaks MCP natively |
| content type, body template | For APIs whose body isn't the arguments object (JSON Patch…) |
| static headers | The tool's own constants |
| identity forwarding | Whether to send the user's email and tenant |
| cost, timeout | Metering and patience |

Importing an OpenAPI spec creates these entries automatically. **Body templates** cover the hard cases without code: an optional field that wasn't supplied disappears from the body (a whole JSON Patch operation in an array, a single key in an object). **Parameter names** MCP clients reject (`$filter`, `page[size]`) are exposed under a safe name and sent to the application under their real name.

### Header order

Applied in this order, last wins:
1. **api0 identity** (`X-User-Email`, `X-Tenant-Id`) — only if identity forwarding is on;
2. the tool's **static headers**;
3. **outbound authentication** — always wins a name collision;
4. `Content-Type`.

The gateway never sends an internal secret to an application.

## Protecting secrets

- **AES-256-GCM** encryption, sealed to the tenant and the secret's purpose: a secret copied into another context won't open.
- Secrets are never returned to the MCP client, the model or the dashboard (metadata only).
- With no encryption key configured, the store **refuses** to save a credential rather than keep it in plain text.

## Personal data

Identity forwarding (`X-User-Email`, `X-Tenant-Id`) is a **per-tool** setting. It says who the call is for, not that it came from api0: an application that needs to know that verifies the outbound credential (the signed token). **Turn it off for any tool pointed at a third party**: your users' emails stay inside the platform.

## Usage, credits and logs

- Every call is logged: tool, user, tenant, status, latency.
- Every successful call uses credits; a failure is never billed.
- Billing mode per tenant: **the tenant pays**, or **each person pays** on their own plan.

## Domains

For a firewall rule or a security review, these are the addresses involved. Microsoft's only matter for tenants that use Microsoft (Entra ID) sign-in or Teams.

| Domain | System | Role |
|---|---|---|
| `app.api0.ai` | api0 dashboard | Setup, **Channels**, **Settings → My access tokens** (Connect) |
| `gateway.api0.ai` | api0 gateway | Receives every call, picks the credential, calls the application |
| `gateway.api0.ai/mcp` | api0 gateway | The connector URL you add in Claude |
| `gateway.api0.ai/oauth/downstream/callback` | api0 gateway | Where people come back after **Connect**, when each person connects their account with OAuth |
| `gateway.api0.ai/oauth/idp/callback` | api0 gateway | Where people come back after signing in to api0 with the tenant's identity provider |
| Messaging endpoint and webhooks (shown in **Channels**) | api0 messaging bridge | Where Teams, WhatsApp and Telegram deliver messages |
| `api0.ai` | api0 website | Privacy policy and terms the Teams app links to |
| `login.microsoftonline.com/<tenant-id>` | Entra ID | Sign-in and consent; issues and renews each person's token |
| `login.botframework.com`, `smba.trafficmanager.net` | Microsoft Bot Framework | Signs Teams messages, and carries the replies |
| `entra.microsoft.com`, `portal.azure.com`, `admin.microsoft.com`, `admin.teams.microsoft.com` | Microsoft consoles | Setup only: Entra app, Azure Bot, licences, approving the Teams app |

## Authentication

Two questions, two guides:

- **Who is calling api0?** OAuth 2.1 for Claude and MCP clients, Google or the company's identity provider for people, API keys for servers, account linking for messaging apps: [inbound authentication](/guides/inbound-authentication) (guide 10).
- **Which credential does api0 use to call your application?** The identity token signed by api0, a service key, or each person's own credential: [outbound authentication](/guides/outbound-authentication) (guide 11).

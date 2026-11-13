---
title: "Inbound Authentication: Who Is Calling api0?"
date: "2026-11-11"
excerpt: "How api0 knows who is calling, before every tool: OAuth 2.1 for Claude and MCP clients, Google or the company's identity provider for people, API keys for servers, and account linking for Teams, WhatsApp and Telegram."
author: { name: "API0 Team" }
tags: ["Technical Guide", "Authentication", "OAuth", "OIDC", "Security"]
---

# Inbound Authentication: Who Is Calling api0?

Before calling a tool, the gateway always knows **who is calling, and for which tenant**. That's what lets it show only that tenant's tools, meter credits, log the call, then pick the credential to send to your application.

This guide describes every way to identify yourself to api0. What api0 then sends to your application is covered in [outbound authentication](/guides/outbound-authentication) (guide 11). The full path of a request is in [the detailed architecture](/guides/architecture) (guide 04).

## The actors

<svg class="g10-auth g10-auth-wide" viewBox="0 0 800 430" width="100%" style="height:auto;max-width:780px;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Inbound authentication: a person in Claude or another MCP client signs in with Google, Entra ID or an OIDC provider and gets an OAuth 2.1 token; a server or script uses an API key, optionally on behalf of a named user; a person in Teams, WhatsApp or Telegram is recognised through their linked api0 account. The gateway then knows who is calling and for which tenant.">
<style>
.g10-auth{display:block;--bg:#f8fafc;--box:#ffffff;--tx:#1e293b;--mut:#64748b;--ln:#cbd5e1;--ac:#FF6B00}
:root.dark .g10-auth,[data-theme="dark"] .g10-auth{--bg:#0f172a;--box:#1e293b;--tx:#f8fafc;--mut:#94a3b8;--ln:#475569}
.g10-auth text{font-family:ui-sans-serif,system-ui,sans-serif;fill:var(--tx)}
.g10-auth .title{font-size:14px;font-weight:700}
.g10-auth .body{font-size:12px;font-weight:600}
.g10-auth .cap{font-size:11px;fill:var(--mut)}
.g10-auth .box{fill:var(--box);stroke:var(--ln);stroke-width:1.5}
.g10-auth .cred{fill:var(--box);stroke:var(--ac);stroke-width:1.5}
.g10-auth .acbox{fill:var(--ac);stroke:var(--ac)}
.g10-auth .ln{stroke:var(--ln);stroke-width:1.5;fill:none}
.g10-auth .on{fill:#ffffff}
.g10-auth .oncap{font-size:11px;fill:#ffffff;opacity:.9}
</style>
<defs>
<marker id="g10-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M0,0 L10,5 L0,10 z" fill="var(--ln)"></path>
</marker>
</defs>
<!-- callers -->
<rect class="box" x="20" y="20" width="230" height="56" rx="8"></rect>
<text x="135" y="45" text-anchor="middle" class="title">Claude · Cursor</text>
<text x="135" y="62" text-anchor="middle" class="cap">a person, in an MCP client</text>
<rect class="box" x="285" y="20" width="230" height="56" rx="8"></rect>
<text x="400" y="45" text-anchor="middle" class="title">Your server or script</text>
<text x="400" y="62" text-anchor="middle" class="cap">server to server</text>
<rect class="box" x="550" y="20" width="230" height="56" rx="8"></rect>
<text x="665" y="45" text-anchor="middle" class="title">Teams · WhatsApp · Telegram</text>
<text x="665" y="62" text-anchor="middle" class="cap">a person, in a messaging app</text>
<!-- how each one proves who it is -->
<path class="ln" d="M135,76 L135,126" marker-end="url(#g10-arrow)"></path>
<text x="145" y="106" class="cap">signs in</text>
<rect class="box" x="20" y="128" width="230" height="56" rx="8"></rect>
<text x="135" y="153" text-anchor="middle" class="title">Identity provider</text>
<text x="135" y="170" text-anchor="middle" class="cap">Google · Entra ID · any OIDC</text>
<path class="ln" d="M135,184 L135,238" marker-end="url(#g10-arrow)"></path>
<text x="145" y="216" class="cap">OAuth 2.1 token (PKCE)</text>
<path class="ln" d="M400,76 L400,112"></path>
<text x="400" y="130" text-anchor="middle" class="body">API key</text>
<text x="400" y="148" text-anchor="middle" class="cap">tenant or consumer key</text>
<text x="400" y="166" text-anchor="middle" class="cap">+ optional named user</text>
<path class="ln" d="M400,180 L400,238" marker-end="url(#g10-arrow)"></path>
<path class="ln" d="M665,76 L665,126" marker-end="url(#g10-arrow)"></path>
<text x="655" y="106" text-anchor="end" class="cap">messaging ID</text>
<rect class="box" x="550" y="128" width="230" height="56" rx="8"></rect>
<text x="665" y="153" text-anchor="middle" class="title">Account link</text>
<text x="665" y="170" text-anchor="middle" class="cap">once per person and channel</text>
<path class="ln" d="M665,184 L665,238" marker-end="url(#g10-arrow)"></path>
<text x="655" y="216" text-anchor="end" class="cap">linked api0 account</text>
<!-- gateway -->
<rect class="acbox" x="20" y="240" width="760" height="92" rx="8"></rect>
<text x="400" y="266" text-anchor="middle" class="title on">api0 gateway</text>
<text x="400" y="290" text-anchor="middle" class="body on">knows who is calling, and for which tenant</text>
<text x="400" y="312" text-anchor="middle" class="oncap">only that tenant's tools · credits metered · call logged</text>
<path class="ln" d="M400,332 L400,370" marker-end="url(#g10-arrow)"></path>
<rect class="box" x="280" y="372" width="240" height="50" rx="8"></rect>
<text x="400" y="394" text-anchor="middle" class="title">Outbound credential</text>
<text x="400" y="411" text-anchor="middle" class="cap">guide 11</text>
</svg>
<svg class="g10-auth g10-auth-tall" viewBox="-2 -2 384 380" width="100%" style="height:auto;max-width:400px;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Inbound authentication: a person in Claude or another MCP client signs in with Google, Entra ID or an OIDC provider and gets an OAuth 2.1 token; a server or script uses an API key, optionally on behalf of a named user; a person in Teams, WhatsApp or Telegram is recognised through their linked api0 account. The gateway then knows who is calling and for which tenant.">
<style>
.g10-auth-tall{display:none}
@media (max-width:600px){svg.g10-auth-wide{display:none!important}svg.g10-auth-tall{display:block!important}}
</style>
<defs>
<marker id="g10t-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M0,0 L10,5 L0,10 z" fill="var(--ln)"></path>
</marker>
</defs>
<rect class="box" x="0" y="0" width="170" height="50" rx="8"></rect>
<text x="85" y="22" text-anchor="middle" class="title">Claude · Cursor</text>
<text x="85" y="39" text-anchor="middle" class="cap">MCP client</text>
<path class="ln" d="M170,25 L188,25" marker-end="url(#g10t-arrow)"></path>
<rect class="box" x="190" y="0" width="164" height="50" rx="8"></rect>
<text x="272" y="22" text-anchor="middle" class="title">OAuth 2.1 token</text>
<text x="272" y="39" text-anchor="middle" class="cap">Google · Entra ID · OIDC</text>
<path class="ln" d="M354,25 L368,25"></path>
<rect class="box" x="0" y="66" width="170" height="50" rx="8"></rect>
<text x="85" y="88" text-anchor="middle" class="title">Server, script</text>
<text x="85" y="105" text-anchor="middle" class="cap">server to server</text>
<path class="ln" d="M170,91 L188,91" marker-end="url(#g10t-arrow)"></path>
<rect class="box" x="190" y="66" width="164" height="50" rx="8"></rect>
<text x="272" y="88" text-anchor="middle" class="title">API key</text>
<text x="272" y="105" text-anchor="middle" class="cap">+ optional named user</text>
<path class="ln" d="M354,91 L368,91"></path>
<rect class="box" x="0" y="132" width="170" height="50" rx="8"></rect>
<text x="85" y="154" text-anchor="middle" class="title">Messaging apps</text>
<text x="85" y="171" text-anchor="middle" class="cap">Teams · WhatsApp · Telegram</text>
<path class="ln" d="M170,157 L188,157" marker-end="url(#g10t-arrow)"></path>
<rect class="box" x="190" y="132" width="164" height="50" rx="8"></rect>
<text x="272" y="154" text-anchor="middle" class="title">Linked account</text>
<text x="272" y="171" text-anchor="middle" class="cap">once per channel</text>
<path class="ln" d="M354,157 L368,157"></path>
<path class="ln" d="M368,25 L368,200"></path>
<path class="ln" d="M368,200 L368,212" marker-end="url(#g10t-arrow)"></path>
<rect class="acbox" x="0" y="214" width="380" height="86" rx="8"></rect>
<text x="190" y="238" text-anchor="middle" class="title on">api0 gateway</text>
<text x="190" y="262" text-anchor="middle" class="body on">who is calling, which tenant</text>
<text x="190" y="282" text-anchor="middle" class="oncap">tenant's tools · credits · log</text>
<path class="ln" d="M190,300 L190,326" marker-end="url(#g10t-arrow)"></path>
<rect class="box" x="100" y="328" width="180" height="46" rx="8"></rect>
<text x="190" y="348" text-anchor="middle" class="title">Outbound credential</text>
<text x="190" y="365" text-anchor="middle" class="cap">guide 11</text>
</svg>

## The models

| Model | Used by | Detail |
|---|---|---|
| **OAuth 2.1 + PKCE** | Claude and MCP clients | The client registers with the tenant's Client ID; the user signs in; the gateway issues a token bound to that user and that tenant |
| **Google sign-in** | Default | For the dashboard and user sign-in |
| **Your identity provider (OIDC)** | Enterprises | Entra ID or any OIDC IdP configured per tenant: your employees sign in with their account, multi-factor and conditional access included |
| **API key** | Server-to-server integrations | One key per tenant or per consumer |
| **Messaging account linking** | Teams, WhatsApp, Telegram | Each person links their messaging account to their api0 account once |

## Claude and MCP clients: OAuth 2.1

`/mcp` follows the MCP protocol's standard authorization: OAuth 2.1 with PKCE. In Claude, you add a custom connector with the tenant's MCP server URL and its **Client ID**, no secret; the person signs in, and the gateway issues a token bound to them and to that tenant. The step-by-step is in the [main guide](/guides/your-api-in-claude).

Cursor, Claude Desktop and other MCP clients connect the same way. The token is only valid for that tenant: it opens no other.

## People: Google or your identity provider

By default, people sign in to api0 with Google, for the dashboard and for Claude's OAuth sign-in alike.

A company can plug in its own identity provider, per tenant: **Entra ID** or any **OIDC** provider. Its employees then sign in with their usual account, and its rules apply: multi-factor, conditional access, leavers. The provider's client secret is encrypted in api0. After sign-in, the provider sends people back to `https://gateway.api0.ai/oauth/idp/callback`.

For Entra ID, api0's setup wizard offers it on its first screen (*Microsoft 365 (Entra ID)*). The same Entra app can handle signing in to api0 and calling a Microsoft API: see guide 05, "Variants".

## Servers: API keys

A server-to-server integration authenticates with an **API key**: a tenant key, or one key per consumer.

### Acting for an end user

An application can call the gateway with its key **on behalf of one of its users**, by naming them. The gateway checks this is allowed before any call: the key's owner, always; a consumer key, never for anyone else; a tenant key, only for someone who joined that tenant themselves (through OAuth consent or their own key). Being added as a member is not enough. Otherwise: `403`.

## Messaging apps: account linking

Teams, WhatsApp and Telegram only know a messaging identifier. So each person links it **once** to their api0 account, with a single-use code sent to the bot, or the channel's **Link my…** button on app.api0.ai. After that, every message is handled as coming from their api0 account, with their access.

Until a person is linked, the bot explains how, without answering their question and without calling any tool. The details are in each channel's guide: [the Teams guide](/guides/your-api-in-teams), [the WhatsApp guide](/guides/your-api-in-whatsapp), [the Telegram guide](/guides/your-api-in-telegram).

## Which one for whom

| Who is calling | Model |
|---|---|
| A person in Claude or another MCP client | OAuth 2.1, with Google or the company's identity provider |
| A company that already manages its accounts in Entra ID or an OIDC provider | Its identity provider, so its rules apply |
| A server, an application, a script | An API key; on behalf of a user, by naming them |
| A person in Teams, WhatsApp or Telegram | Account linking, once per channel |

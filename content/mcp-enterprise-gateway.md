---
title: "MCP Is the New API Standard for AI Agents—And Your Backend Needs a Gateway"
date: "2026-04-22"
excerpt: "MCP is becoming the standard way AI agents talk to tools—but it's a protocol, not a security system. Here's the gap, and the gateway that fills it, in one diagram."
author: { name: "Mayo" }
tags: ["MCP", "Architecture", "Enterprise", "Security", "API Gateway"]
---

# MCP Is the New API Standard for AI Agents—And Your Backend Needs a Gateway

Model Context Protocol (MCP) is winning. Claude supports it natively, Cursor runs on it, and enterprise tools are shipping MCP servers by the week. It's becoming *the* interface between AI agents and the tools they call.

But here's the part most guides skip: **MCP is a protocol, not a security system.** It defines *how* an agent calls a tool. It says nothing about *who* is allowed to call it, where credentials live, or which user triggered which action.

## The how vs. the who

MCP solves fragmentation elegantly — publish one server, and any compliant agent can discover and call your tools. No bespoke connector per AI. That part is genuinely great.

What it leaves entirely to you:

| MCP covers | You still need |
|---|---|
| Tool discovery | User identity propagation |
| Tool invocation | Credential isolation (keys can't live in the model's context) |
| A standard schema | Multi-tenant routing |
| Transport | Access control, metering, credit limits |
| — | Audit trails per user action |

None of that is in the spec. In multi-tenant production, it's the whole ballgame.

## Two options

- **Build it yourself:** OAuth 2.0, OIDC token minting, tenant routing, metering, and an audit log on top of your MCP server. Budget 2–3 months, then ongoing upkeep as the spec evolves.
- **Put a gateway in front.** Purpose-built infrastructure handles the layer MCP omits, and your backend stays clean.

## What a gateway actually does

A gateway sits between the agent and your backend and owns everything the protocol doesn't:

<div class="svg-container" style="margin:2rem 0;">
<svg class="gw-arch" viewBox="0 0 800 350" width="100%" style="height:auto;max-width:780px;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AI agents connect over the MCP protocol to the api0 gateway, which handles OAuth and identity, credential isolation, multi-tenant routing, access control and metering, and audit logging, then forwards a clean authenticated HTTP request to your backend.">
  <style>
    .gw-arch{--bg:#f8fafc;--box:#ffffff;--tx:#1e293b;--mut:#64748b;--ln:#cbd5e1;--ac:#FF6B00}
    :root.dark .gw-arch,[data-theme="dark"] .gw-arch{--bg:#0f172a;--box:#1e293b;--tx:#f8fafc;--mut:#94a3b8;--ln:#475569}
    .gw-arch .bg{fill:var(--bg)}
    .gw-arch .box{fill:var(--box);stroke:var(--ln);stroke-width:1.5}
    .gw-arch .acc{fill:var(--box);stroke:var(--ac);stroke-width:2}
    .gw-arch .row{fill:var(--bg);stroke:var(--ln);stroke-width:1}
    .gw-arch .th{fill:var(--tx);font:700 14px ui-sans-serif,system-ui,sans-serif}
    .gw-arch .t{fill:var(--tx);font:600 12.5px ui-sans-serif,system-ui,sans-serif}
    .gw-arch .m{fill:var(--mut);font:11px ui-sans-serif,system-ui,sans-serif}
    .gw-arch .ac{fill:var(--ac);font:700 11px ui-sans-serif,system-ui,sans-serif}
    .gw-arch .ln{stroke:var(--ln);stroke-width:1.5;fill:none}
    .gw-arch .lnac{stroke:var(--ac);stroke-width:1.8;fill:none}
  </style>
  <defs>
    <marker id="gwa" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ln)"/></marker>
    <marker id="gwaac" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ac)"/></marker>
  </defs>
  <rect class="bg" x="0" y="0" width="800" height="350" rx="12"/>

  <!-- Agents -->
  <rect class="box" x="20" y="132" width="150" height="86" rx="10"/>
  <text class="th" x="95" y="168" text-anchor="middle">AI agents</text>
  <text class="m" x="95" y="190" text-anchor="middle">Claude · Cursor · …</text>

  <!-- Gateway -->
  <rect class="acc" x="290" y="26" width="250" height="298" rx="12"/>
  <text class="th" x="415" y="54" text-anchor="middle">api0 Gateway</text>
  <rect class="row" x="308" y="70"  width="214" height="34" rx="7"/><text class="t" x="320" y="92">OAuth + user identity</text>
  <rect class="row" x="308" y="112" width="214" height="34" rx="7"/><text class="t" x="320" y="134">Credential isolation</text>
  <rect class="row" x="308" y="154" width="214" height="34" rx="7"/><text class="t" x="320" y="176">Multi-tenant routing</text>
  <rect class="row" x="308" y="196" width="214" height="34" rx="7"/><text class="t" x="320" y="218">Access control + metering</text>
  <rect class="row" x="308" y="238" width="214" height="34" rx="7"/><text class="t" x="320" y="260">Audit log</text>
  <text class="ac" x="415" y="300" text-anchor="middle">handles what MCP omits</text>

  <!-- Backend -->
  <rect class="box" x="630" y="132" width="150" height="86" rx="10"/>
  <text class="th" x="705" y="162" text-anchor="middle">Your backend</text>
  <text class="m" x="705" y="184" text-anchor="middle">stays clean</text>
  <text class="m" x="705" y="200" text-anchor="middle">plain HTTP</text>

  <!-- arrows -->
  <path class="ln"   d="M170,175 L286,175" marker-end="url(#gwa)"/>
  <text class="ac" x="228" y="165" text-anchor="middle">MCP protocol</text>
  <path class="lnac" d="M540,175 L626,175" marker-end="url(#gwaac)"/>
  <text class="ac" x="583" y="165" text-anchor="middle">HTTP + OIDC</text>
</svg>
</div>

The entry arrow speaks **MCP**; the exit arrow is a **clean, authenticated HTTP request** with the verified user's `X-User-Email` and `X-Tenant-Id` already attached. Your backend verifies a standard OIDC token and runs — it never learns MCP exists. Credentials stay in the gateway; every call is metered and logged.

## The broader point

MCP is solving the right problem — the industry needed a standard for AI-to-tool communication, and this is it. But protocols define *interfaces*, not *security boundaries*. The history of web APIs is full of good protocols deployed insecurely because auth was left "as an exercise for the reader."

The protocol is settled. The infrastructure layer — identity, isolation, tenancy, control, audit — is the differentiator. Adopt MCP with a gateway from day one, or retrofit security onto it later.

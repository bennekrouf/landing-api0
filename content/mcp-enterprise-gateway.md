---
title: "MCP Is the New API Standard for AI Agents—And Your Backend Needs a Gateway"
date: "2026-04-22"
excerpt: "The Model Context Protocol is quickly becoming the standard way AI agents talk to tools. But MCP alone doesn't solve auth, multi-tenancy, or access control. Here's why you need a gateway."
author: { name: "Mayo" }
tags: ["MCP", "Architecture", "Enterprise", "Security", "API Gateway"]
svg: "/svg/blog/ai-revolution-emails.svg"
---

# MCP Is the New API Standard for AI Agents—And Your Backend Needs a Gateway

If you've been paying attention to the AI ecosystem in 2025, you've noticed something: Model Context Protocol (MCP) is winning.

Claude supports it natively. Cursor runs on it. A growing list of enterprise tools are publishing MCP servers. The protocol is becoming the standard interface between AI agents and the tools they call.

But here's what most MCP guides don't mention: **MCP is a protocol, not a security system.** It defines how agents talk to tools. It says nothing about who is allowed to call what, how credentials are managed, or how you track which user triggered which action.

If you're building for production—especially multi-tenant production—you have a problem.

## What MCP Gets Right

MCP solves a real problem elegantly: it gives AI agents a standard way to discover and call tools without bespoke integration work for every new service.

Instead of writing a custom connector for every API, you publish an MCP server. Any compliant AI agent—Claude, Cursor, whatever comes next—can connect to it and call your tools.

That's powerful. The fragmentation problem of "which AI supports which integration" goes away.

## What MCP Leaves Unsolved

The protocol handles the *how* of tool calls. It doesn't handle the *who* or the *whether*.

In a real enterprise deployment:

- **User identity matters.** Which employee triggered this action? Which customer account does this affect? MCP has no built-in concept of user-level identity propagation.
- **Credentials are sensitive.** Your backend APIs require authentication. Those credentials cannot live inside Claude's context window.
- **Multi-tenancy is the norm.** A single backend might serve hundreds of customer tenants. The gateway needs to know which tenant the user belongs to before proxying any request.
- **Access control is non-negotiable.** Not every user should be able to call every tool. Credit limits, role-based access, and usage metering need to happen before the request reaches your backend.
- **Audit trails are required.** In regulated industries, every API call needs to be traceable to a specific user action.

None of this is in the MCP spec. It's your problem to solve.

## The Options

**Option 1: Build it yourself.** Implement OAuth 2.0, OIDC token minting, multi-tenant routing, credit metering, and an audit log on top of your MCP server. Plan for 2-3 months of infrastructure work, then ongoing maintenance as the MCP spec evolves.

**Option 2: Use an MCP gateway.** Let infrastructure purpose-built for this problem handle it, and focus on your actual product.

## What an MCP Gateway Actually Does

An MCP gateway sits between Claude and your backend. It handles the infrastructure layer so your backend stays clean:

**OAuth flow management.** When a user wants Claude to access their account, the gateway runs the OAuth dance. Claude gets a session token. The gateway knows exactly who that token belongs to.

**Credential isolation.** Your downstream auth credentials (OIDC service accounts, API keys, bearer tokens) live in the gateway's secure config. Claude never sees them. The gateway mints fresh auth tokens at call time.

**Identity injection.** Every proxied request carries the verified user's email and tenant ID as headers. Your backend always knows who is acting, without implementing its own token verification logic.

**Access control and metering.** The gateway checks balances, enforces limits, and logs every call before and after proxying. Your backend just executes.

**Protocol compliance.** As MCP evolves, the gateway handles spec changes. Your backend stays on stable HTTP.

## The Architecture in Practice

Here's the flow when Claude calls one of your tools through api0:

```
Claude → POST /mcp (with API key)
         ↓
     api0 gateway
     - validates API key → resolves user + backend
     - mints OIDC token for your backend
     - checks credit balance
     - injects X-User-Email, X-Tenant-Id
         ↓
     Your backend (receives clean HTTP request)
     - verifies OIDC token (standard Google middleware)
     - processes request
     - returns result
         ↓
     api0 gateway
     - logs call, deducts credits
         ↓
     Claude (gets the result)
```

Your backend sees a normal authenticated HTTP request. It doesn't need to know MCP exists.

## The Broader Point

MCP is solving the right problem. The industry needed a standard protocol for AI-to-tool communication, and MCP is becoming that standard.

But protocols define interfaces, not security boundaries. The history of web APIs is littered with examples of good protocols deployed insecurely because the auth and access control were left as an exercise for the reader.

Enterprises that get this right will adopt MCP with a proper gateway layer from day one. Those that don't will spend the next year retrofitting security onto deployments that were built too fast.

The protocol is settled. The infrastructure layer is the differentiator.

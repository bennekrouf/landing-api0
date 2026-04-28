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

api0 is an **MCP gateway**: the secure infrastructure layer that sits between Claude and your backend services.

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

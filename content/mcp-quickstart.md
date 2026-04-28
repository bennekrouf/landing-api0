---
title: "Connect Claude to Your Backend in 5 Minutes with api0"
date: "2026-04-25"
excerpt: "A step-by-step guide to exposing your existing APIs as MCP tools that Claude can call—with built-in auth, identity propagation, and access control."
author: { name: "API0 Team" }
tags: ["MCP", "Tutorial", "Claude", "Quick Start", "Integration"]
svg: "/svg/blog/simple-tutorial.svg"
---

# Connect Claude to Your Backend in 5 Minutes with api0

If you have an existing backend with APIs, you can have Claude calling them as native MCP tools in under five minutes. No SDK to install. No model hosting. No rebuilding your auth layer.

Here's exactly how.

## What You'll End Up With

Claude will be able to call your backend endpoints on behalf of your users. Every call will carry the user's verified identity, your backend's auth credentials will never leave your infrastructure, and every tool call will be metered and logged.

## Prerequisites

- An existing backend with at least one HTTP endpoint.
- An OpenAPI spec for it (or just a plain text description—api0 accepts both).
- A Google account for admin login.

## Step 1: Sign In and Create a Client ID

Go to [app.api0.ai](https://app.api0.ai) and sign in with Google.

Navigate to the **Security** tab and register a **Client ID**. This is the identifier Claude will use to initiate the OAuth flow for your users. Pick something descriptive—`myapp-mcp` works fine.

## Step 2: Upload Your OpenAPI Spec

Go to the **Endpoints** section and click **Import**.

Paste your OpenAPI spec, or describe your endpoints in plain English—api0 parses both. For example:

```
POST /api/invoices
Creates an invoice. Required: customer_id, amount, currency.

GET /api/invoices/{id}
Returns invoice details.
```

api0 converts these into MCP tool definitions that Claude understands natively.

## Step 3: Configure Downstream Auth

Go to **Security → Downstream Auth** and choose how api0 should authenticate against your backend:

- **Google Service Account (OIDC)** — paste your service account JSON and target audience. api0 mints fresh OIDC tokens at call time (cached 55 min for performance). Your backend verifies them with standard Google middleware.
- **Bearer token** — api0 injects a static bearer token you control.
- **API key header** — api0 injects a key into a header you specify.

This config lives in api0, not in Claude. Claude never sees your credentials.

## Step 4: Let Claude Connect via OAuth

When a user wants Claude to access their account, they go through a one-time OAuth flow:

1. In Claude, they add your MCP server using the Client ID from Step 1.
2. Claude redirects to the api0 Dashboard for approval.
3. The user approves. api0 issues a live API key tied to that user.
4. Claude holds the key. Every tool call from that point carries the user's identity automatically.

Your backend receives requests with `X-User-Email` and `X-Tenant-Id` headers injected by the gateway—no extra work on your side.

## Step 5: Test It

In Claude, try a natural command that maps to one of your endpoints:

> "Create an invoice for customer ACME for $1,200 USD."

Claude identifies the right tool, api0 verifies the user, mints auth, and proxies the request to your backend. Your backend executes and returns the result.

## What Happens Under the Hood

Every tool call goes through this sequence in milliseconds:

1. api0 validates Claude's API key → resolves user identity + backend context.
2. Mints (or retrieves cached) OIDC token for your backend.
3. Checks the user's credit balance.
4. Proxies the request with auth headers injected.
5. Returns the result to Claude, logs the call, deducts credits.

Your backend just sees a clean authenticated HTTP request. It doesn't need to know anything about MCP or Claude.

## That's It

Five minutes, no infrastructure changes, and Claude has governed access to your backend. The user's identity travels with every call. Your credentials never leave api0. And you have a full audit log of every tool invocation.

Head to [app.api0.ai](https://app.api0.ai) to get started.

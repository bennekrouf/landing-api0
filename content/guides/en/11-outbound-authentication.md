---
title: "Outbound Authentication: Which Credential api0 Uses to Call Your Application"
date: "2026-11-11"
excerpt: "Every mode api0 uses to call your application or a third-party API: the identity token signed by api0, service keys and tokens, each person's own credential, named connections, and the decision tree for choosing."
author: { name: "API0 Team" }
tags: ["Technical Guide", "Authentication", "OAuth", "Security"]
---

# Outbound Authentication: Which Credential api0 Uses to Call Your Application

Once the caller is identified ([inbound authentication](/guides/inbound-authentication), guide 10), the gateway calls your application or a third-party API. This guide describes **which credential** it uses: a token api0 signs itself, a service key, or each person's own credential.

In every case, the credential stays in api0. The AI model never sees it, and it is never sent back to the dashboard.

## The actors

<svg class="g11-auth g11-auth-wide" viewBox="0 0 800 452" width="100%" style="height:auto;max-width:780px;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Outbound authentication: once the caller is identified, the api0 gateway reads the tool&#x27;s credential from its secret store and calls the target with it: an identity token signed by api0 for your own application, a service credential for a third-party API, or each person&#x27;s own credential for systems such as Azure DevOps or Microsoft Graph. The AI model never sees the credential.">
<style>
.g11-auth{display:block;--bg:#f8fafc;--box:#ffffff;--tx:#1e293b;--mut:#64748b;--ln:#cbd5e1;--ac:#FF6B00}
:root.dark .g11-auth,[data-theme="dark"] .g11-auth{--bg:#0f172a;--box:#1e293b;--tx:#f8fafc;--mut:#94a3b8;--ln:#475569}
.g11-auth text{font-family:ui-sans-serif,system-ui,sans-serif;fill:var(--tx)}
.g11-auth .title{font-size:14px;font-weight:700}
.g11-auth .body{font-size:12px;font-weight:600}
.g11-auth .cap{font-size:11px;fill:var(--mut)}
.g11-auth .box{fill:var(--box);stroke:var(--ln);stroke-width:1.5}
.g11-auth .cred{fill:var(--box);stroke:var(--ac);stroke-width:1.5}
.g11-auth .acbox{fill:var(--ac);stroke:var(--ac)}
.g11-auth .ln{stroke:var(--ln);stroke-width:1.5;fill:none}
.g11-auth .on{fill:#ffffff}
.g11-auth .oncap{font-size:11px;fill:#ffffff;opacity:.9}
</style>
<defs>
<marker id="g11-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M0,0 L10,5 L0,10 z" fill="var(--ln)"></path>
</marker>
</defs>
<rect class="box" x="20" y="20" width="360" height="56" rx="8"></rect>
<text x="200" y="45" text-anchor="middle" class="title">Identified caller</text>
<text x="200" y="62" text-anchor="middle" class="cap">a person and a tenant (guide 10)</text>
<rect class="box" x="420" y="20" width="360" height="56" rx="8"></rect>
<text x="600" y="45" text-anchor="middle" class="title">Secret store</text>
<text x="600" y="62" text-anchor="middle" class="cap">sealed per tenant and per person</text>
<path class="ln" d="M200,76 L200,118" marker-end="url(#g11-arrow)"></path>
<path class="ln" d="M600,76 L600,118" marker-start="url(#g11-arrow)" marker-end="url(#g11-arrow)"></path>
<text x="610" y="101" class="cap">decrypted for the call only</text>
<rect class="acbox" x="20" y="120" width="760" height="72" rx="8"></rect>
<text x="400" y="148" text-anchor="middle" class="title on">api0 gateway</text>
<text x="400" y="172" text-anchor="middle" class="body on">picks the tool's connection (default or named) and injects its credential</text>
<path class="ln" d="M140,192 L140,238" marker-end="url(#g11-arrow)"></path>
<rect class="cred" x="20" y="240" width="240" height="60" rx="8"></rect>
<text x="140" y="267" text-anchor="middle" class="title">api0 identity token</text>
<text x="140" y="284" text-anchor="middle" class="cap">signed by api0, nothing stored</text>
<path class="ln" d="M140,300 L140,346" marker-end="url(#g11-arrow)"></path>
<rect class="box" x="20" y="348" width="240" height="60" rx="8"></rect>
<text x="140" y="375" text-anchor="middle" class="title">Your application</text>
<text x="140" y="392" text-anchor="middle" class="cap">checks aud and signer</text>
<path class="ln" d="M400,192 L400,238" marker-end="url(#g11-arrow)"></path>
<rect class="cred" x="280" y="240" width="240" height="60" rx="8"></rect>
<text x="400" y="267" text-anchor="middle" class="title">Service credential</text>
<text x="400" y="284" text-anchor="middle" class="cap">bearer · headers · client credentials</text>
<path class="ln" d="M400,300 L400,346" marker-end="url(#g11-arrow)"></path>
<rect class="box" x="280" y="348" width="240" height="60" rx="8"></rect>
<text x="400" y="375" text-anchor="middle" class="title">Third-party API</text>
<text x="400" y="392" text-anchor="middle" class="cap">sees one service identity</text>
<path class="ln" d="M660,192 L660,238" marker-end="url(#g11-arrow)"></path>
<rect class="cred" x="540" y="240" width="240" height="60" rx="8"></rect>
<text x="660" y="267" text-anchor="middle" class="title">Each person's credential</text>
<text x="660" y="284" text-anchor="middle" class="cap">personal secret or OAuth, renewed</text>
<path class="ln" d="M660,300 L660,346" marker-end="url(#g11-arrow)"></path>
<rect class="box" x="540" y="348" width="240" height="60" rx="8"></rect>
<text x="660" y="375" text-anchor="middle" class="title">Azure DevOps · Graph…</text>
<text x="660" y="392" text-anchor="middle" class="cap">sees the real person</text>
<text x="400" y="440" text-anchor="middle" class="cap">The credential stays in api0: the AI model never sees it.</text>
</svg>
<svg class="g11-auth g11-auth-tall" viewBox="-2 -2 384 390" width="100%" style="height:auto;max-width:400px;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Outbound authentication: once the caller is identified, the api0 gateway reads the tool&#x27;s credential from its secret store and calls the target with it: an identity token signed by api0 for your own application, a service credential for a third-party API, or each person&#x27;s own credential for systems such as Azure DevOps or Microsoft Graph. The AI model never sees the credential.">
<style>
.g11-auth-tall{display:none}
@media (max-width:600px){svg.g11-auth-wide{display:none!important}svg.g11-auth-tall{display:block!important}}
</style>
<defs>
<marker id="g11t-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M0,0 L10,5 L0,10 z" fill="var(--ln)"></path>
</marker>
</defs>
<rect class="box" x="0" y="0" width="180" height="50" rx="8"></rect>
<text x="90" y="22" text-anchor="middle" class="title">Identified caller</text>
<text x="90" y="39" text-anchor="middle" class="cap">person + tenant</text>
<rect class="box" x="200" y="0" width="180" height="50" rx="8"></rect>
<text x="290" y="22" text-anchor="middle" class="title">Secret store</text>
<text x="290" y="39" text-anchor="middle" class="cap">sealed</text>
<path class="ln" d="M90,50 L90,78" marker-end="url(#g11t-arrow)"></path>
<path class="ln" d="M290,50 L290,78" marker-start="url(#g11t-arrow)" marker-end="url(#g11t-arrow)"></path>
<rect class="acbox" x="0" y="80" width="380" height="56" rx="8"></rect>
<text x="190" y="103" text-anchor="middle" class="title on">api0 gateway</text>
<text x="190" y="124" text-anchor="middle" class="body on">injects the tool's credential</text>
<path class="ln" d="M6,136 L6,327"></path>
<path class="ln" d="M6,185 L16,185" marker-end="url(#g11t-arrow)"></path>
<rect class="cred" x="18" y="160" width="172" height="50" rx="8"></rect>
<text x="104" y="182" text-anchor="middle" class="title">Identity token</text>
<text x="104" y="199" text-anchor="middle" class="cap">signed by api0</text>
<path class="ln" d="M190,185 L206,185" marker-end="url(#g11t-arrow)"></path>
<rect class="box" x="208" y="160" width="172" height="50" rx="8"></rect>
<text x="294" y="182" text-anchor="middle" class="title">Your application</text>
<text x="294" y="199" text-anchor="middle" class="cap">checks aud + signer</text>
<path class="ln" d="M6,251 L16,251" marker-end="url(#g11t-arrow)"></path>
<rect class="cred" x="18" y="226" width="172" height="50" rx="8"></rect>
<text x="104" y="248" text-anchor="middle" class="title">Service credential</text>
<text x="104" y="265" text-anchor="middle" class="cap">key · headers · OAuth</text>
<path class="ln" d="M190,251 L206,251" marker-end="url(#g11t-arrow)"></path>
<rect class="box" x="208" y="226" width="172" height="50" rx="8"></rect>
<text x="294" y="248" text-anchor="middle" class="title">Third-party API</text>
<text x="294" y="265" text-anchor="middle" class="cap">one service identity</text>
<path class="ln" d="M6,317 L16,317" marker-end="url(#g11t-arrow)"></path>
<rect class="cred" x="18" y="292" width="172" height="50" rx="8"></rect>
<text x="104" y="314" text-anchor="middle" class="title">Person's credential</text>
<text x="104" y="331" text-anchor="middle" class="cap">secret or OAuth</text>
<path class="ln" d="M190,317 L206,317" marker-end="url(#g11t-arrow)"></path>
<rect class="box" x="208" y="292" width="172" height="50" rx="8"></rect>
<text x="294" y="314" text-anchor="middle" class="title">Azure DevOps · Graph</text>
<text x="294" y="331" text-anchor="middle" class="cap">sees the real person</text>
<text x="190" y="378" text-anchor="middle" class="cap">The AI model never sees the credential.</text>
</svg>

## The modes

| Mode | What the application receives | When to choose it |
|---|---|---|
| `none` | Nothing | Public API |
| **api0 identity token** (`google_sa`, no key) | A Google identity token signed by api0's service account | **Your own applications.** No secret to store |
| `google_sa` with your key | An identity token signed by **your** service account | Google Cloud applications (Cloud Run…) with your own IAM |
| `static_bearer` | `Authorization: Bearer <token>` | Third-party API with a single key |
| `header_injection` | The headers you define | APIs with proprietary headers |
| `client_credentials` | A token obtained via OAuth client credentials | APIs that issue service tokens |
| `per_user` — personal secret | **Each** user's own credential: `Basic` (Azure DevOps PAT), `Bearer`, or a raw header | Per-person attribution and permissions |
| `per_user` — OAuth | **Each** user's OAuth token, renewed by api0 | Systems with OAuth sign-in (e.g. Microsoft) |

The authentication header always wins over a fixed tool header with the same name (see the header order in guide 04).

## Default and named connections

Each tenant has a **default connection**, and can add **named** ones when some tools target a service that needs a different sign-in. For example: Azure DevOps on the default connection, Microsoft Graph on a `graph` connection, a reporting database on a service identity.

On app.api0.ai, the **Connections** card on the **API** page creates and edits connections, and **Which connection each tool uses** sets which one each tool uses. A tool that names none uses `default`.

With Microsoft, you need one connection per **audience**: a token for Microsoft Graph is refused by Azure DevOps, and the other way round (guide 06, section 3).

## The api0 identity token in detail

For an application you run, the simplest option is often to store **no** secret at all: the gateway signs every call with api0's service account.

One signer for every tenant means the **audience** is what separates them, and the tenant doesn't choose it. The gateway builds it from the application URL's origin and the calling tenant's ID:

```
https://api.example.com/orders  →  aud = https://api.example.com/api0/tenant/<tenant id>
```

Only the origin is kept: no path or query can spell out another tenant's audience. Your application checks two values, once:

| Check | Value |
|---|---|
| `aud` | `https://<your origin>/api0/tenant/<your tenant>` |
| `email` (signer) | api0's service account |

Pinning the signer is mandatory: any Google service account can mint a token for any audience.

## Per-person credentials

This is the model to prefer whenever attribution matters.

- **Personal secret.** The user adds their token once (an Azure DevOps PAT, for example). It's encrypted and **can't be read back**, only replaced. An optional verification URL can check who the token belongs to.
- **OAuth.** The user connects their account once (**Settings → My access tokens → Connect**). api0 keeps the refresh token encrypted and renews access. The OAuth flow's `state` value is single-use and short-lived (CSRF protection).
- **No credential yet**: the user gets a tool result explaining how to add one. **Never** a call made as someone else.

Result: the target system sees the real person, applies their permissions and attributes the action to them.

Step-by-step examples with Microsoft: Azure DevOps with [each person's Microsoft sign-in](/guides/azure-devops-microsoft-sign-in) (guide 05), then SharePoint, Azure SQL and Logic Apps in guide 06.

## Choosing a mode: the decision tree

1. **Is the application yours?** → api0 identity token. Nothing to store.
2. **Must actions be attributed to the person, or their permissions applied?** → `per_user` (OAuth if the system supports it, otherwise a personal secret).
3. **Third-party API with a service key?** → `static_bearer`, `header_injection` or `client_credentials`, with identity forwarding off.
4. **Tools targeting different services?** → one named connection per service.

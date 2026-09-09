---
title: "Azure DevOps from Claude, Part 2: Microsoft Sign-In with Entra ID"
slug: "azure-devops-entra-sign-in"
date: "2026-09-09"
excerpt: "One app registration, and your team signs in as themselves. How OIDC discovery, PKCE and a single-use verifier replace the personal Google accounts — and what stays exactly the same."
author: { name: "Engineering Team" }
tags: ["Azure DevOps", "Entra ID", "OIDC", "MCP", "Identity", "api0"]
svg: "/svg/blog/api0-ecosystem.svg"
---

# Azure DevOps from Claude, Part 2: Microsoft Sign-In with Entra ID

[Part 1](/blog/azure-devops-personal-tokens) connected Azure DevOps to Claude
without anyone's permission: people sign in to api0 with a Google account and
paste their own Azure DevOps token. It works, and for a company that lives on
Microsoft it has one awkward edge — the Google account is not their work
identity. It is a personal Gmail, created to get past a sign-in screen.

This post replaces that, and nothing else.

## What changes, and what does not

<div class="svg-container" style="margin:2rem 0;">
<svg class="swap" viewBox="0 0 800 280" width="100%" style="height:auto;max-width:780px;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparison: the inbound sign-in changes from a Google account to Microsoft Entra ID, while the outbound per-user personal access token stays identical.">
  <style>
    .swap{--bg:#f8fafc;--box:#ffffff;--tx:#1e293b;--mut:#64748b;--ln:#cbd5e1;--ac:#FF6B00;--dim:#94a3b8}
    :root.dark .swap,[data-theme="dark"] .swap{--bg:#0f172a;--box:#1e293b;--tx:#f8fafc;--mut:#94a3b8;--ln:#475569;--dim:#64748b}
    .swap .bg{fill:var(--bg)}
    .swap .box{fill:var(--box);stroke:var(--ln);stroke-width:1.5}
    .swap .hot{fill:var(--box);stroke:var(--ac);stroke-width:2}
    .swap .th{fill:var(--tx);font:700 12.5px ui-sans-serif,system-ui,sans-serif}
    .swap .m{fill:var(--mut);font:10.5px ui-sans-serif,system-ui,sans-serif}
    .swap .ac{fill:var(--ac);font:700 11px ui-sans-serif,system-ui,sans-serif}
    .swap .ln{stroke:var(--ln);stroke-width:1.5;fill:none}
    .swap .lnac{stroke:var(--ac);stroke-width:2;fill:none}
    .swap .sep{stroke:var(--ln);stroke-width:1;stroke-dasharray:4 4}
  </style>
  <defs>
    <marker id="sr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ln)"/></marker>
    <marker id="sac" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ac)"/></marker>
  </defs>
  <rect class="bg" x="0" y="0" width="800" height="280" rx="12"/>

  <text class="m" x="40" y="34">PART 1</text>
  <rect class="box" x="120" y="16" width="150" height="40" rx="9"/>
  <text class="th" x="195" y="41" text-anchor="middle">Google account</text>
  <path class="ln" d="M272,36 L358,36" marker-end="url(#sr)"/>
  <rect class="box" x="360" y="16" width="110" height="40" rx="9"/>
  <text class="th" x="415" y="41" text-anchor="middle">api0</text>
  <path class="ln" d="M472,36 L558,36" marker-end="url(#sr)"/>
  <rect class="box" x="560" y="16" width="200" height="40" rx="9"/>
  <text class="th" x="660" y="35" text-anchor="middle">that person's own PAT</text>
  <text class="m"  x="660" y="49" text-anchor="middle">→ Azure DevOps</text>

  <line class="sep" x1="40" y1="86" x2="760" y2="86"/>

  <text class="ac" x="40" y="134">PART 2</text>
  <rect class="hot" x="120" y="116" width="150" height="40" rx="9"/>
  <text class="th" x="195" y="135" text-anchor="middle">Entra ID</text>
  <text class="m"  x="195" y="149" text-anchor="middle">toto@cgi.com</text>
  <path class="lnac" d="M272,136 L358,136" marker-end="url(#sac)"/>
  <rect class="box" x="360" y="116" width="110" height="40" rx="9"/>
  <text class="th" x="415" y="141" text-anchor="middle">api0</text>
  <path class="ln" d="M472,136 L558,136" marker-end="url(#sr)"/>
  <rect class="box" x="560" y="116" width="200" height="40" rx="9"/>
  <text class="th" x="660" y="135" text-anchor="middle">that person's own PAT</text>
  <text class="m"  x="660" y="149" text-anchor="middle">→ Azure DevOps</text>

  <rect class="box" x="120" y="190" width="150" height="54" rx="9"/>
  <text class="ac" x="195" y="212" text-anchor="middle">this half changes</text>
  <text class="m"  x="195" y="230" text-anchor="middle">one app registration</text>

  <rect class="box" x="560" y="190" width="200" height="54" rx="9"/>
  <text class="th" x="660" y="212" text-anchor="middle">this half is untouched</text>
  <text class="m"  x="660" y="230" text-anchor="middle">same tokens, same attribution</text>
</svg>
</div>

Everything about Azure DevOps stays as it was: each person still adds their own
personal access token, work items are still attributed to whoever owns it, and
Conditional Access still never sees those calls. What changes is who they are
when they arrive.

That separation is deliberate. It means switching sign-in method later is a
configuration change, not a migration — and it means you can start on Part 1
today and move when the app registration is ready.

## The flow

api0 becomes an OIDC relying party against your directory. Nothing in the
gateway knows what Entra is: give it an issuer and discovery does the rest, so
Okta or Auth0 would be the same two values.

<div class="svg-container" style="margin:2rem 0;">
<svg class="oidc-seq" viewBox="0 0 800 430" width="100%" style="height:auto;max-width:780px;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="OIDC sequence: Claude requests authorization, api0 discovers the issuer and redirects to Entra with a PKCE challenge, the user signs in, Entra returns a code, api0 exchanges it with the verifier and validates the id_token, then issues its own short-lived code to Claude.">
  <style>
    .oidc-seq{--bg:#f8fafc;--box:#ffffff;--tx:#1e293b;--mut:#64748b;--ln:#cbd5e1;--ac:#FF6B00}
    :root.dark .oidc-seq,[data-theme="dark"] .oidc-seq{--bg:#0f172a;--box:#1e293b;--tx:#f8fafc;--mut:#94a3b8;--ln:#475569}
    .oidc-seq .bg{fill:var(--bg)}
    .oidc-seq .box{fill:var(--box);stroke:var(--ln);stroke-width:1.5}
    .oidc-seq .th{fill:var(--tx);font:700 12.5px ui-sans-serif,system-ui,sans-serif}
    .oidc-seq .m{fill:var(--mut);font:10px ui-sans-serif,system-ui,sans-serif}
    .oidc-seq .ac{fill:var(--ac);font:700 10px ui-sans-serif,system-ui,sans-serif}
    .oidc-seq .life{stroke:var(--ln);stroke-width:1.5;stroke-dasharray:4 4}
    .oidc-seq .ln{stroke:var(--ln);stroke-width:1.5;fill:none}
    .oidc-seq .lnac{stroke:var(--ac);stroke-width:1.8;fill:none}
    .oidc-seq .num{fill:var(--ac);font:700 11px ui-sans-serif,system-ui,sans-serif}
  </style>
  <defs>
    <marker id="or" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ln)"/></marker>
    <marker id="ol" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ln)"/></marker>
    <marker id="oac" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ac)"/></marker>
  </defs>
  <rect class="bg" x="0" y="0" width="800" height="430" rx="12"/>

  <rect class="box" x="45"  y="14" width="120" height="38" rx="9"/><text class="th" x="105" y="38" text-anchor="middle">Claude</text>
  <rect class="box" x="340" y="14" width="120" height="38" rx="9"/><text class="th" x="400" y="38" text-anchor="middle">api0</text>
  <rect class="box" x="635" y="14" width="120" height="38" rx="9"/><text class="th" x="695" y="38" text-anchor="middle">Entra ID</text>
  <line class="life" x1="105" y1="54" x2="105" y2="414"/>
  <line class="life" x1="400" y1="54" x2="400" y2="414"/>
  <line class="life" x1="695" y1="54" x2="695" y2="414"/>

  <text class="num" x="28" y="82">1</text>
  <text class="m" x="252" y="78" text-anchor="middle">GET /authorize · client_id</text>
  <path class="ln" d="M105,86 L398,86" marker-end="url(#or)"/>

  <text class="num" x="28" y="118">2</text>
  <text class="m" x="547" y="114" text-anchor="middle">discovery · /.well-known/openid-configuration</text>
  <path class="ln" d="M400,122 L693,122" marker-end="url(#or)"/>

  <text class="num" x="28" y="158">3</text>
  <text class="m" x="547" y="154" text-anchor="middle">302 · code_challenge (S256) + signed state</text>
  <path class="lnac" d="M400,162 L693,162" marker-end="url(#oac)"/>

  <text class="num" x="28" y="200">4</text>
  <rect class="box" x="618" y="180" width="154" height="26" rx="7"/>
  <text class="ac" x="695" y="197" text-anchor="middle">signs in as toto@cgi.com</text>

  <text class="num" x="28" y="240">5</text>
  <text class="m" x="547" y="236" text-anchor="middle">callback · code + state</text>
  <path class="ln" d="M693,244 L402,244" marker-end="url(#ol)"/>

  <text class="num" x="28" y="280">6</text>
  <text class="m" x="547" y="276" text-anchor="middle">exchange · code + verifier + client secret</text>
  <path class="ln" d="M400,284 L693,284" marker-end="url(#or)"/>

  <text class="num" x="28" y="320">7</text>
  <text class="ac" x="547" y="316" text-anchor="middle">id_token · verified against JWKS</text>
  <path class="lnac" d="M693,324 L402,324" marker-end="url(#oac)"/>

  <text class="num" x="28" y="362">8</text>
  <text class="m" x="252" y="358" text-anchor="middle">api0 code → exchanged for a key</text>
  <path class="ln" d="M398,366 L107,366" marker-end="url(#ol)"/>

  <text class="m" x="400" y="402" text-anchor="middle">from here the flow is identical to every other sign-in — same code, same key, same tools</text>
</svg>
</div>

Three details in there are load-bearing, and each exists because the obvious
alternative fails quietly.

**The PKCE verifier never travels in the state.** Step 3 sends only a hash of it
through the browser; the verifier itself is written to the database and read
back at step 6. Putting it in the round trip would defeat the point of PKCE
entirely.

**That database row is single use.** It is deleted when consumed, so a replayed
callback finds nothing. Storing it in memory instead would work today and start
failing on a fraction of sign-ins the day the gateway runs more than one
process — intermittently, looking like the identity provider's fault.

**The email claim has fallbacks.** Entra puts a work account's address in
`preferred_username`, and only sometimes in `email`. Reading `email`, then
`preferred_username`, then `upn` avoids the classic bug that works against Google
and fails against Microsoft.

## What you register, and what you do not

One application in Entra ID. Single tenant, platform Web, one redirect URI:

```
https://gateway.api0.ai/oauth/idp/callback
```

Its permissions are `openid`, `email` and `profile` — sign-in scopes, delegated,
usually consentable by the user themselves.

**No Azure DevOps permission is involved.** This registration proves identity and
nothing else; the work items are still reached with each person's own token. That
is a materially smaller request to put to an administrator than a delegated
Azure DevOps grant, and it is why we split the two halves apart in the first
place.

api0 needs three values from that registration — the directory ID, the
application ID, and a client secret. The secret is sealed with AES-256-GCM before
it reaches the database and is never returned by any route, to anyone.

## Choosing between the two

| | Part 1 — tokens | Part 2 — Microsoft sign-in |
|---|---|---|
| Time to first work item | an afternoon | after one app registration |
| Needs an administrator | no | probably not, but possibly |
| People sign in as | a Google account | themselves |
| Azure DevOps credential | their own PAT | their own PAT |
| Attribution in Azure | correct | correct |
| Affected by Conditional Access | no | no |
| Offboarding | remove the PAT and the api0 account | remove them from the directory |

The honest recommendation: **start with Part 1 even if you intend to end at Part
2.** It proves the tools, the permissions and the attribution with nothing to
negotiate, and the day the app registration exists you change where people sign
in — and nothing else moves.


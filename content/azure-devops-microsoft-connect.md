---
title: "Azure DevOps from Claude, Part 3: No Tokens, One Connect Button"
slug: "azure-devops-microsoft-connect"
date: "2026-11-06"
excerpt: "Each person clicks Connect once and signs in with Microsoft. No personal access token to create, paste or rotate. How delegated OAuth replaces the PAT, what an administrator grants, and what it costs you in return."
author: { name: "Engineering Team" }
tags: ["Azure DevOps", "Entra ID", "OAuth", "MCP", "Identity", "api0"]
svg: "/svg/blog/api0-ecosystem.svg"
---

# Azure DevOps from Claude, Part 3: No Tokens, One Connect Button

[Part 1](/blog/azure-devops-personal-tokens) had each person paste a personal
access token. [Part 2](/blog/azure-devops-entra-sign-in) changed how people sign
in to api0 and left that token alone. This post removes the token.

Each person clicks **Connect** once, signs in with their Microsoft account, and
approves access. From then on api0 holds a refresh token for them and gets a
fresh access token whenever a tool call needs one. Nobody creates a PAT, nobody
pastes one, and nobody gets an email in three months saying it expired.

## The other door

Part 1 described two independent authentications: how a person proves who they
are **to api0**, and the credential api0 presents **to Azure DevOps**. Part 2
changed the first. Part 3 changes the second.

<div class="svg-container" style="margin:2rem 0;">
<svg class="p3" viewBox="0 0 800 200" width="100%" style="height:auto;max-width:780px;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparison: in Part 2 the outbound credential is each person's pasted personal access token; in Part 3 it is an access token issued by Entra ID for that person through delegated OAuth, renewed by api0.">
  <style>
    .p3{--bg:#f8fafc;--box:#ffffff;--tx:#1e293b;--mut:#64748b;--ln:#cbd5e1;--ac:#FF6B00}
    :root.dark .p3,[data-theme="dark"] .p3{--bg:#0f172a;--box:#1e293b;--tx:#f8fafc;--mut:#94a3b8;--ln:#475569}
    .p3 .bg{fill:var(--bg)}
    .p3 .box{fill:var(--box);stroke:var(--ln);stroke-width:1.5}
    .p3 .hot{fill:var(--box);stroke:var(--ac);stroke-width:2}
    .p3 .th{fill:var(--tx);font:700 12.5px ui-sans-serif,system-ui,sans-serif}
    .p3 .m{fill:var(--mut);font:10.5px ui-sans-serif,system-ui,sans-serif}
    .p3 .ac{fill:var(--ac);font:700 11px ui-sans-serif,system-ui,sans-serif}
    .p3 .ln{stroke:var(--ln);stroke-width:1.5;fill:none}
    .p3 .lnac{stroke:var(--ac);stroke-width:2;fill:none}
    .p3 .sep{stroke:var(--ln);stroke-width:1;stroke-dasharray:4 4}
  </style>
  <defs>
    <marker id="p3r" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ln)"/></marker>
    <marker id="p3ac" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ac)"/></marker>
  </defs>
  <rect class="bg" x="0" y="0" width="800" height="200" rx="12"/>
  <text class="m" x="40" y="44">PART 2</text>
  <rect class="box" x="120" y="24" width="150" height="40" rx="9"/>
  <text class="th" x="195" y="49" text-anchor="middle">Entra ID</text>
  <path class="ln" d="M272,44 L358,44" marker-end="url(#p3r)"/>
  <rect class="box" x="360" y="24" width="110" height="40" rx="9"/>
  <text class="th" x="415" y="49" text-anchor="middle">api0</text>
  <path class="ln" d="M472,44 L558,44" marker-end="url(#p3r)"/>
  <rect class="box" x="560" y="24" width="200" height="40" rx="9"/>
  <text class="th" x="660" y="43" text-anchor="middle">a pasted PAT</text>
  <text class="m"  x="660" y="57" text-anchor="middle">created and rotated by hand</text>
  <line class="sep" x1="40" y1="96" x2="760" y2="96"/>
  <text class="ac" x="40" y="148">PART 3</text>
  <rect class="box" x="120" y="128" width="150" height="40" rx="9"/>
  <text class="th" x="195" y="153" text-anchor="middle">either sign-in</text>
  <path class="ln" d="M272,148 L358,148" marker-end="url(#p3r)"/>
  <rect class="box" x="360" y="128" width="110" height="40" rx="9"/>
  <text class="th" x="415" y="153" text-anchor="middle">api0</text>
  <path class="lnac" d="M472,148 L558,148" marker-end="url(#p3ac)"/>
  <rect class="hot" x="560" y="128" width="200" height="40" rx="9"/>
  <text class="th" x="660" y="147" text-anchor="middle">an Entra access token</text>
  <text class="m"  x="660" y="161" text-anchor="middle">issued for that person, renewed by api0</text>
</svg>
</div>

The two halves are still independent. You can keep api0 sign-in on a Google or
api0 account and use Connect for Azure DevOps, or combine it with Part 2 so that
both halves are Microsoft. A single Entra app registration can serve both, with
one redirect URI for each.

What does not change is attribution. The access token is issued **for that
person**, so work items still show their name in *Created By*, and they can
only do what their own Azure DevOps permissions allow.

## The flow

Connect is a standard authorization-code flow, with PKCE, against your directory.

1. The person clicks **Connect**. api0 creates a one-time state and a PKCE
   verifier and stores both server-side. Only a hash of the verifier goes into
   the URL.
2. Microsoft asks them to sign in and approve access to Azure DevOps.
3. Microsoft sends a code back to api0, which redeems it with the stored
   verifier and the app's client secret. The stored state is deleted on use, so
   a replayed callback finds nothing.
4. api0 seals the refresh token and the access token with AES-256-GCM, under
   that person and that workspace, and sends them back to the dashboard with
   *Your account is connected*.

On a tool call, api0 uses the access token while it is valid and spends the
refresh token when it is not. If Microsoft refuses the refresh, the person sees
"connect your account" rather than a cryptic 401, because that is the only fix.

Two details are deliberate.

**A connection without a refresh token is refused.** Without one, the access
token dies within the hour and the connection looks fine until somebody's first
request after lunch. api0 rejects it during Connect instead, while the person is
still looking at the screen. On Entra, that means the scope must include
`offline_access`.

**The scope is required.** Microsoft's identity platform rejects an authorize
request without one (`AADSTS900144`). For Azure DevOps it is:

```
499b84ac-1321-427f-aa17-267ca6975798/user_impersonation offline_access
```

`499b84ac-…` is Azure DevOps' resource ID, and it is the same in every tenant.

## What you register

One application in Entra ID:

- platform **Web**, redirect URI `https://gateway.api0.ai/oauth/downstream/callback`;
- a client secret;
- the delegated permission **Azure DevOps → `user_impersonation`**.

This is a bigger request than Part 2. Part 2 only proved identity; this
registration lets api0 act in Azure DevOps on behalf of whoever connects. Many
directories require an administrator to grant that once for everyone, with
**Grant admin consent**. A directory created for something else may also lack
the local entry for Azure DevOps, which `az ad sp create --id
499b84ac-1321-427f-aa17-267ca6975798` adds.

In api0, the workspace setup asks for the authorization and token endpoints,
the client ID, the secret and the scope. When people also sign in through
Entra, it fills these in from the directory you already entered. The step-by-step
setup, with every error we hit along the way, is in our Azure DevOps guide.

## What it costs you

Removing the token is not free. Two things from Part 1 move.

**Conditional Access now applies.** Part 1's PATs never saw your sign-in
frequency policy. These tokens are issued by Entra, so they do. If your
directory forces a sign-in every few hours, people will be asked to Connect
again on that rhythm. Without such a policy, a connection lasts as long as it
keeps being used.

**An unused connection eventually expires.** Refresh tokens renew with use. A
person who does not use the tools for a long stretch will be asked to Connect
again. That is one click, not a new token to create in Azure DevOps.

In return, offboarding works as you expect. Disable someone in Entra and their
refresh token stops working on the next renewal. There is no PAT left behind,
still valid for months.

## Choosing between the three

| | Part 1: tokens | Part 2: Microsoft sign-in | Part 3: Connect |
|---|---|---|---|
| People sign in to api0 as | a Google or api0 account | themselves | either |
| Azure DevOps credential | their own PAT | their own PAT | an Entra token for them |
| Anyone pastes a token | yes | yes | no |
| Needs an administrator | no | probably not | usually, once |
| Attribution in Azure | correct | correct | correct |
| Affected by Conditional Access | no | no | yes |
| Rotation | by hand, at PAT expiry | by hand, at PAT expiry | automatic |
| Offboarding | revoke the PAT | revoke the PAT | disable them in Entra |

The recommendation from Part 1 still holds: **start with tokens** if you have
no administrator at hand today. Once an administrator can grant
`user_impersonation`, Part 3 removes the only recurring chore, and switching is
a configuration change. Tools and attribution do not change.

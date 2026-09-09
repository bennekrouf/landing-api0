---
title: "Azure DevOps from Claude, Part 1: Personal Access Tokens"
slug: "azure-devops-personal-tokens"
date: "2026-09-09"
excerpt: "The setup that needs nobody's permission. How per-user PATs give correct attribution in Azure DevOps, why Conditional Access never sees them, and where the approach runs out."
author: { name: "Engineering Team" }
tags: ["Azure DevOps", "MCP", "Security", "Identity", "api0"]
svg: "/svg/blog/api0-ecosystem.svg"
---

# Azure DevOps from Claude, Part 1: Personal Access Tokens

There are two ways to connect a team's Azure DevOps to Claude through api0. This
post covers the one you can finish this afternoon, without opening a ticket with
anyone. [Part 2](/blog/azure-devops-entra-sign-in) covers the one where people
sign in with their work identity.

The question that separates them is narrow, and it is not "which is more
secure". Both end up sending the same credential to Azure DevOps. The question
is **how a person proves who they are to api0** — and whether that is a problem
you can solve alone.

## Two doors, not one

Almost every confusion in this area comes from collapsing two different
authentications into one idea. They are independent, and only one of them
Azure ever sees.

<div class="svg-container" style="margin:2rem 0;">
<svg class="doors" viewBox="0 0 800 250" width="100%" style="height:auto;max-width:780px;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two independent authentication boundaries: inbound, where a person proves who they are to api0, and outbound, where api0 presents a credential to Azure DevOps.">
  <style>
    .doors{--bg:#f8fafc;--box:#ffffff;--tx:#1e293b;--mut:#64748b;--ln:#cbd5e1;--ac:#FF6B00}
    :root.dark .doors,[data-theme="dark"] .doors{--bg:#0f172a;--box:#1e293b;--tx:#f8fafc;--mut:#94a3b8;--ln:#475569}
    .doors .bg{fill:var(--bg)}
    .doors .box{fill:var(--box);stroke:var(--ln);stroke-width:1.5}
    .doors .th{fill:var(--tx);font:700 13px ui-sans-serif,system-ui,sans-serif}
    .doors .m{fill:var(--mut);font:11px ui-sans-serif,system-ui,sans-serif}
    .doors .ac{fill:var(--ac);font:700 11px ui-sans-serif,system-ui,sans-serif}
    .doors .ln{stroke:var(--ln);stroke-width:1.5;fill:none}
    .doors .lnac{stroke:var(--ac);stroke-width:2;fill:none}
    .doors .dash{stroke:var(--ln);stroke-width:1.5;stroke-dasharray:5 5;fill:none}
  </style>
  <defs>
    <marker id="dr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ln)"/></marker>
    <marker id="drac" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ac)"/></marker>
  </defs>
  <rect class="bg" x="0" y="0" width="800" height="250" rx="12"/>

  <rect class="box" x="40"  y="90" width="130" height="52" rx="9"/>
  <text class="th" x="105" y="112" text-anchor="middle">toto</text>
  <text class="m"  x="105" y="130" text-anchor="middle">in Claude</text>

  <rect class="box" x="335" y="90" width="130" height="52" rx="9"/>
  <text class="th" x="400" y="112" text-anchor="middle">api0</text>
  <text class="m"  x="400" y="130" text-anchor="middle">gateway</text>

  <rect class="box" x="630" y="90" width="130" height="52" rx="9"/>
  <text class="th" x="695" y="112" text-anchor="middle">Azure DevOps</text>
  <text class="m"  x="695" y="130" text-anchor="middle">dev.azure.com</text>

  <path class="ln"   d="M172,116 L332,116" marker-end="url(#dr)"/>
  <path class="lnac" d="M467,116 L627,116" marker-end="url(#drac)"/>

  <text class="th" x="252" y="58"  text-anchor="middle">INBOUND</text>
  <text class="m"  x="252" y="76"  text-anchor="middle">who are you, to api0?</text>
  <text class="m"  x="252" y="160" text-anchor="middle">a Google account</text>
  <text class="m"  x="252" y="176" text-anchor="middle">(this post)</text>

  <text class="ac" x="547" y="58"  text-anchor="middle">OUTBOUND</text>
  <text class="m"  x="547" y="76"  text-anchor="middle">what do we send Azure?</text>
  <text class="ac" x="547" y="160" text-anchor="middle">that person's own PAT</text>
  <text class="m"  x="547" y="176" text-anchor="middle">identical in both posts</text>

  <path class="dash" d="M105,196 L695,196"/>
  <text class="m" x="400" y="216" text-anchor="middle">Azure sees only the right-hand door. Whoever owns the token is who created the work item.</text>
</svg>
</div>

Only the left door changes between Part 1 and Part 2. The right door — the
credential Azure actually receives — is the same either way.

## What the setup looks like

Four steps, and only one of them involves an administrator of anything: none.

<div class="svg-container" style="margin:2rem 0;">
<svg class="pat-seq" viewBox="0 0 800 400" width="100%" style="height:auto;max-width:780px;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Setup sequence: add the connector in Claude, approve on api0 with a Google account, create a personal access token in Azure DevOps, paste it into api0, then make tool calls.">
  <style>
    .pat-seq{--bg:#f8fafc;--box:#ffffff;--tx:#1e293b;--mut:#64748b;--ln:#cbd5e1;--ac:#FF6B00}
    :root.dark .pat-seq,[data-theme="dark"] .pat-seq{--bg:#0f172a;--box:#1e293b;--tx:#f8fafc;--mut:#94a3b8;--ln:#475569}
    .pat-seq .bg{fill:var(--bg)}
    .pat-seq .box{fill:var(--box);stroke:var(--ln);stroke-width:1.5}
    .pat-seq .th{fill:var(--tx);font:700 12.5px ui-sans-serif,system-ui,sans-serif}
    .pat-seq .m{fill:var(--mut);font:10px ui-sans-serif,system-ui,sans-serif}
    .pat-seq .ac{fill:var(--ac);font:700 10px ui-sans-serif,system-ui,sans-serif}
    .pat-seq .life{stroke:var(--ln);stroke-width:1.5;stroke-dasharray:4 4}
    .pat-seq .ln{stroke:var(--ln);stroke-width:1.5;fill:none}
    .pat-seq .lnac{stroke:var(--ac);stroke-width:1.8;fill:none}
    .pat-seq .num{fill:var(--ac);font:700 11px ui-sans-serif,system-ui,sans-serif}
  </style>
  <defs>
    <marker id="pr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ln)"/></marker>
    <marker id="pl" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ln)"/></marker>
    <marker id="pac" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ac)"/></marker>
  </defs>
  <rect class="bg" x="0" y="0" width="800" height="400" rx="12"/>

  <rect class="box" x="45"  y="14" width="120" height="38" rx="9"/><text class="th" x="105" y="38" text-anchor="middle">Claude</text>
  <rect class="box" x="340" y="14" width="120" height="38" rx="9"/><text class="th" x="400" y="38" text-anchor="middle">api0</text>
  <rect class="box" x="635" y="14" width="120" height="38" rx="9"/><text class="th" x="695" y="38" text-anchor="middle">Azure DevOps</text>
  <line class="life" x1="105" y1="54" x2="105" y2="384"/>
  <line class="life" x1="400" y1="54" x2="400" y2="384"/>
  <line class="life" x1="695" y1="54" x2="695" y2="384"/>

  <text class="num" x="30" y="86">1</text>
  <text class="m" x="252" y="82" text-anchor="middle">add connector · client_id</text>
  <path class="ln" d="M105,90 L398,90" marker-end="url(#pr)"/>

  <text class="num" x="30" y="128">2</text>
  <rect class="box" x="342" y="106" width="116" height="26" rx="7"/>
  <text class="ac" x="400" y="123" text-anchor="middle">approve · Google</text>
  <text class="m" x="252" y="150" text-anchor="middle">api0 key, scoped to the workspace</text>
  <path class="ln" d="M398,158 L107,158" marker-end="url(#pl)"/>

  <text class="num" x="30" y="200">3</text>
  <rect class="box" x="637" y="180" width="116" height="26" rx="7"/>
  <text class="ac" x="695" y="197" text-anchor="middle">create a PAT</text>
  <text class="m" x="695" y="222" text-anchor="middle">in the Azure DevOps UI,</text>
  <text class="m" x="695" y="236" text-anchor="middle">signed in as toto@cgi.com</text>

  <text class="num" x="30" y="272">4</text>
  <text class="m" x="252" y="268" text-anchor="middle">paste the token into api0</text>
  <path class="ln" d="M105,276 L398,276" marker-end="url(#pr)"/>
  <text class="m" x="547" y="296" text-anchor="middle">who is this token?</text>
  <path class="ln" d="M400,304 L693,304" marker-end="url(#pr)"/>
  <text class="ac" x="547" y="324" text-anchor="middle">toto@cgi.com</text>
  <path class="lnac" d="M695,332 L402,332" marker-end="url(#pac)"/>

  <text class="m" x="400" y="368" text-anchor="middle">every later tool call runs on toto's token — Azure records toto</text>
</svg>
</div>

Step 4 does something worth pausing on. When the token is stored, api0 asks
Azure DevOps who it belongs to and records the answer. A bearer token *is* its
owner: nothing about the act of pasting proves whose it is. Verifying turns an
assumption into a line on screen — **"Acts as toto@cgi.com"** — and rejects a
token that does not authenticate at all, at paste time rather than at somebody's
first request.

## Why Conditional Access never interferes

Teams on Microsoft tenants often live with an hourly `az login`. That is a
Conditional Access sign-in frequency policy, and it applies to *interactive*
Entra sessions.

A personal access token is a different class of credential. It carries no
session state and triggers no re-authentication. Whatever your directory's
sign-in frequency is set to, it does not reach these calls.

This is the strongest practical argument for Part 1, and it is why we recommend
starting here even for teams who intend to end up in Part 2.

## What Azure sees

One thing, and only one: the owner of the token that made the call.

| Identity | Decides | Visible to Azure |
|---|---|---|
| Claude account | nothing downstream | no |
| api0 account | which stored token is used | no |
| **PAT owner** | **the Azure identity** | **yes — "Created By"** |

Two people, two tokens, two names on the work items. api0 looks up the token by
`(workspace, api0 account)`, so each person's calls carry their own credential
and their own Azure DevOps permissions. Someone without project access gets a
403 from Azure, correctly — api0 grants nothing, it relays what a person already
has.

`Assigned To` is just a field, so a task can be created by one person and
assigned to another. Only authorship is fixed by the credential.

## Where this approach runs out

Three places, and they are worth knowing before you roll it out widely.

**People sign in to api0 with a Google account.** If yours is a Microsoft shop,
that account is probably not their work identity — it is a personal Gmail. The
mapping between "some Gmail" and "toto in Azure" then lives only in the verified
identity we record at paste time. It works, and it is not a directory.

**Tokens expire, and someone must rotate them.** Organisation policy caps the
lifetime — often 30, 90 or 365 days. Every expiry is a small interruption for
each person.

**Leaving the company does not revoke access.** Removing someone from your Entra
directory does not invalidate a PAT they already minted, and it does not remove
their api0 account. Both are separate acts of housekeeping.

If none of those bite, Part 1 is the whole answer. If the first one bites — and
for a company on Microsoft it usually does —
[Part 2](/blog/azure-devops-entra-sign-in) replaces the left-hand door without
touching the right.

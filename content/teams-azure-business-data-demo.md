---
title: "From a Teams Chat to Azure SQL, SharePoint and Logic Apps in Four Prompts"
slug: "teams-azure-business-data-demo"
date: "2026-11-10"
excerpt: "A fictional finance team chases overdue invoices, checks a contract and approves a credit note without leaving Teams. The Azure architecture, the api0 configuration and the exact prompts."
author: { name: "Engineering Team" }
tags: ["Microsoft Teams", "Azure", "SharePoint", "Logic Apps", "MCP", "api0"]
svg: "/svg/blog/api0-ecosystem.svg"
---

# From a Teams Chat to Azure SQL, SharePoint and Logic Apps in Four Prompts

What would it take for someone in finance to chase an overdue invoice, check the
contract and approve a credit note, all from one Teams conversation?

Not a new application, and not a copy of the data in a vector database. Those
three things already have APIs. So we built a small demo around a fictional
distributor, Helvora Industrial Supplies, and connected its data, documents and
approval process to Teams through api0, using nothing but HTTP endpoints.

## The architecture

Read it from the top down: a question starts in Teams, api0 turns each API endpoint
into a tool, and each tool reaches one Microsoft service.

<div class="svg-container" style="margin:2rem 0;">
<svg class="hv" viewBox="0 0 800 575" width="100%" style="height:auto;max-width:780px;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Architecture: Teams calls the api0 tenant, which exposes four tool groups. Finance Data reaches Azure SQL through a Container App running Data API builder. SharePoint Content reaches a SharePoint site through Microsoft Graph. Credit Approval calls a Logic App, which records requests in SharePoint with its managed identity. Azure DevOps tools reach Azure DevOps. Microsoft Entra ID issues the tokens.">
  <style>
    .hv{--bg:#f8fafc;--box:#ffffff;--tx:#1e293b;--mut:#64748b;--ln:#cbd5e1;--ac:#FF6B00}
    :root.dark .hv,[data-theme="dark"] .hv{--bg:#0f172a;--box:#1e293b;--tx:#f8fafc;--mut:#94a3b8;--ln:#475569}
    .hv .bg{fill:var(--bg)}
    .hv .zone{fill:none;stroke:var(--ln);stroke-width:1.5;stroke-dasharray:5 4}
    .hv .api0{fill:none;stroke:var(--ac);stroke-width:2}
    .hv .box{fill:var(--box);stroke:var(--ln);stroke-width:1.5}
    .hv .th{fill:var(--tx);font:700 12.5px ui-sans-serif,system-ui,sans-serif}
    .hv .m{fill:var(--mut);font:10.5px ui-sans-serif,system-ui,sans-serif}
    .hv .ac{fill:var(--ac);font:700 12.5px ui-sans-serif,system-ui,sans-serif}
    .hv .ln{stroke:var(--mut);stroke-width:1.5;fill:none}
  </style>
  <defs>
    <marker id="hvr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--mut)"/></marker>
  </defs>
  <rect class="bg" x="0" y="0" width="800" height="575" rx="12"/>
  <rect class="box" x="300" y="16" width="200" height="46" rx="9"/>
  <text class="th" x="400" y="35" text-anchor="middle">Teams and an AI agent</text>
  <text class="m" x="400" y="51" text-anchor="middle">a question in plain language</text>
  <path class="ln" d="M400,62 L400,88" marker-end="url(#hvr)"/>
  <rect class="api0" x="16" y="90" width="768" height="146" rx="12"/>
  <text class="ac" x="400" y="111" text-anchor="middle">api0 tenant: one tool per API endpoint</text>
  <rect class="box" x="30" y="124" width="170" height="98" rx="9"/>
  <text class="th" x="115" y="145" text-anchor="middle">Finance Data</text>
  <text class="m" x="115" y="166" text-anchor="middle">REST OData, read only</text>
  <text class="m" x="115" y="184" text-anchor="middle">4 tools</text>
  <text class="m" x="115" y="202" text-anchor="middle">app-only OAuth connection</text>
  <rect class="box" x="220" y="124" width="170" height="98" rx="9"/>
  <text class="th" x="305" y="145" text-anchor="middle">SharePoint Content</text>
  <text class="m" x="305" y="166" text-anchor="middle">Microsoft Graph REST</text>
  <text class="m" x="305" y="184" text-anchor="middle">5 tools</text>
  <text class="m" x="305" y="202" text-anchor="middle">app-only Graph connection</text>
  <rect class="box" x="410" y="124" width="170" height="98" rx="9"/>
  <text class="th" x="495" y="145" text-anchor="middle">Credit Approval</text>
  <text class="m" x="495" y="166" text-anchor="middle">POST that starts a process</text>
  <text class="m" x="495" y="184" text-anchor="middle">1 tool</text>
  <text class="m" x="495" y="202" text-anchor="middle">app-only OAuth connection</text>
  <rect class="box" x="600" y="124" width="170" height="98" rx="9"/>
  <text class="th" x="685" y="145" text-anchor="middle">Azure DevOps</text>
  <text class="m" x="685" y="166" text-anchor="middle">REST</text>
  <text class="m" x="685" y="184" text-anchor="middle">13 tools</text>
  <text class="m" x="685" y="202" text-anchor="middle">its own connection</text>
  <rect class="zone" x="16" y="262" width="768" height="298" rx="12"/>
  <path class="ln" d="M115,222 L115,278" marker-end="url(#hvr)"/>
  <path class="ln" d="M305,222 L305,278" marker-end="url(#hvr)"/>
  <path class="ln" d="M495,222 L495,278" marker-end="url(#hvr)"/>
  <path class="ln" d="M685,222 L685,278" marker-end="url(#hvr)"/>
  <rect class="box" x="30" y="280" width="170" height="66" rx="9"/>
  <text class="th" x="115" y="303" text-anchor="middle">Azure Container App</text>
  <text class="m" x="115" y="323" text-anchor="middle">Data API builder</text>
  <rect class="box" x="220" y="280" width="170" height="66" rx="9"/>
  <text class="th" x="305" y="303" text-anchor="middle">Microsoft Graph</text>
  <text class="m" x="305" y="323" text-anchor="middle">SharePoint REST API</text>
  <rect class="box" x="410" y="280" width="170" height="66" rx="9"/>
  <text class="th" x="495" y="303" text-anchor="middle">Azure Logic App</text>
  <text class="m" x="495" y="323" text-anchor="middle">Consumption, OAuth trigger</text>
  <rect class="box" x="600" y="280" width="170" height="66" rx="9"/>
  <text class="th" x="685" y="303" text-anchor="middle">Azure DevOps</text>
  <text class="m" x="685" y="323" text-anchor="middle">work items and sprints</text>
  <path class="ln" d="M115,346 L115,380" marker-end="url(#hvr)"/>
  <path class="ln" d="M305,346 L305,380" marker-end="url(#hvr)"/>
  <path class="ln" d="M495,346 L495,415 L393,415" marker-end="url(#hvr)"/>
  <text class="m" x="507" y="405">logs each request with</text>
  <text class="m" x="507" y="420">its managed identity</text>
  <rect class="box" x="30" y="382" width="170" height="66" rx="9"/>
  <text class="th" x="115" y="405" text-anchor="middle">Azure SQL</text>
  <text class="m" x="115" y="425" text-anchor="middle">customers and invoices</text>
  <rect class="box" x="220" y="382" width="170" height="66" rx="9"/>
  <text class="th" x="305" y="405" text-anchor="middle">SharePoint site</text>
  <text class="m" x="305" y="425" text-anchor="middle">2 lists, 3 policy documents</text>
  <rect class="box" x="30" y="468" width="740" height="46" rx="9"/>
  <text class="th" x="400" y="487" text-anchor="middle">Microsoft Entra ID</text>
  <text class="m" x="400" y="503" text-anchor="middle">issues the access tokens used by the api0 connections</text>
  <text class="th" x="400" y="542" text-anchor="middle">Microsoft services</text>
</svg>
</div>

Each service plays a different role. Azure SQL holds **business data**, exposed
read only through Data API builder. SharePoint holds **content**: contracts in a
list and policies as documents. The Logic App is a **process**: it applies a rule
and records the outcome.

What api0 stores is short: the endpoints, with their parameters, and two named
connections. Each connection is an OAuth client credentials setup, so api0 fetches
and renews its token. The data stays where it is, and each answer comes from a live
API call.

## The four prompts

We ran these in a real Teams conversation, in French, and translated them here. The
company and the people are invented; the calls were not.

**1. Find the problem. Azure SQL.**

> Which invoices over 10,000 EUR are more than 60 days overdue?

The agent filtered the overdue invoices and returned exactly four, totalling
65,700 EUR, across two customers: Brennhof Logistik and Castellan Foods. One of them,
INV-24006, is in dispute.

**2. Bring in the rules. SharePoint.**

> Check the Brennhof Logistik contract and the credit note policy. What is the most
> we can grant on disputed invoice INV-24006?

The answer needed two sources. The contract allows up to 40% on disputed invoices.
The policy sets the same 40% limit and requires Finance approval above 5,000 EUR. The
agent computed **5,060 EUR**, and pointed out that it needs approval.

**3. Start the process. Logic App.**

> Submit a 5,060 EUR credit note request on INV-24006, reason commercial settlement.
> The requester is Lena Duarte.

The Logic App applied the threshold and logged the request as **Pending approval**.
A request of 5,000 EUR or less would have been approved automatically.

**4. Decide. SharePoint again.**

> Show the pending requests, then approve request 3 on behalf of Marc Lenoir, Finance.
> Note: settlement complies with the dispute clause of contract CTR-1003.

The list item moved to **Approved**, with the decision maker and the note recorded.

## What keeps this honest

A demo should show its edges, and this one has three.

- **One service identity.** These connections act as an application, so SharePoint
  shows that identity behind the changes. The approver's name is data the agent
  wrote. A production approval should use each person's own Microsoft sign-in, as
  [Part 3 of our Azure DevOps series](/blog/azure-devops-microsoft-connect) describes,
  so the service itself enforces who may decide.
- **The agent decides what to call.** Finance Data is read only by configuration,
  but `decide credit request` can write. It belongs behind a real permission check.
- **Free tiers sleep.** The Azure SQL free offer and a Container App scaled to zero
  both go idle, so the first call of the day can be slow.

## The takeaway

You do not need one integration project for data, another for documents and a third
for workflows. If it has an API, it can be a tool: **list the endpoints, name the
connection that signs them, and ask the question where people already work.**

Start with one read-only endpoint on an application you already run, and
[try it on api0](/guides).

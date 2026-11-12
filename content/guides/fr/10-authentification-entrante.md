---
title: "Authentification entrante : qui appelle api0 ?"
date: "2026-11-11"
excerpt: "Comment api0 sait qui appelle, avant chaque outil : OAuth 2.1 pour Claude et les clients MCP, Google ou le fournisseur d'identité de l'entreprise pour les personnes, les clés API pour les serveurs, et la liaison de compte pour Teams, WhatsApp et Telegram."
author: { name: "API0 Team" }
tags: ["Guide technique", "Authentification", "OAuth", "OIDC", "Sécurité"]
---

# Authentification entrante : qui appelle api0 ?

Avant d'appeler un outil, la passerelle sait toujours **qui appelle, et pour quel tenant**. C'est ce qui lui permet de ne montrer que les outils de ce tenant, de décompter les crédits, de journaliser l'appel, puis de choisir l'identifiant à envoyer à ton application.

Ce guide décrit chaque façon de s'identifier auprès d'api0. Ce qu'api0 envoie ensuite à ton application est l'objet de [l'authentification sortante](/fr/guides/authentification-sortante) (guide 11). Le chemin complet d'une requête est dans [l'architecture détaillée](/fr/guides/architecture) (guide 04).

## Les acteurs

<svg class="g10-auth g10-auth-wide" viewBox="0 0 800 430" width="100%" style="height:auto;max-width:780px;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Authentification entrante : une personne dans Claude ou un autre client MCP se connecte avec Google, Entra ID ou un fournisseur OIDC et obtient un jeton OAuth 2.1 ; un serveur ou un script utilise une clé API, en option au nom d&#x27;un utilisateur nommé ; une personne dans Teams, WhatsApp ou Telegram est reconnue grâce à son compte api0 lié. La passerelle sait alors qui appelle et pour quel tenant.">
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
<text x="135" y="62" text-anchor="middle" class="cap">une personne, dans un client MCP</text>
<rect class="box" x="285" y="20" width="230" height="56" rx="8"></rect>
<text x="400" y="45" text-anchor="middle" class="title">Ton serveur ou script</text>
<text x="400" y="62" text-anchor="middle" class="cap">serveur à serveur</text>
<rect class="box" x="550" y="20" width="230" height="56" rx="8"></rect>
<text x="665" y="45" text-anchor="middle" class="title">Teams · WhatsApp · Telegram</text>
<text x="665" y="62" text-anchor="middle" class="cap">une personne, dans une messagerie</text>
<!-- how each one proves who it is -->
<path class="ln" d="M135,76 L135,126" marker-end="url(#g10-arrow)"></path>
<text x="145" y="106" class="cap">se connecte</text>
<rect class="box" x="20" y="128" width="230" height="56" rx="8"></rect>
<text x="135" y="153" text-anchor="middle" class="title">Fournisseur d'identité</text>
<text x="135" y="170" text-anchor="middle" class="cap">Google · Entra ID · tout OIDC</text>
<path class="ln" d="M135,184 L135,238" marker-end="url(#g10-arrow)"></path>
<text x="145" y="216" class="cap">jeton OAuth 2.1 (PKCE)</text>
<path class="ln" d="M400,76 L400,112"></path>
<text x="400" y="130" text-anchor="middle" class="body">clé API</text>
<text x="400" y="148" text-anchor="middle" class="cap">de tenant ou de consommateur</text>
<text x="400" y="166" text-anchor="middle" class="cap">+ utilisateur nommé, en option</text>
<path class="ln" d="M400,180 L400,238" marker-end="url(#g10-arrow)"></path>
<path class="ln" d="M665,76 L665,126" marker-end="url(#g10-arrow)"></path>
<text x="655" y="106" text-anchor="end" class="cap">identifiant messagerie</text>
<rect class="box" x="550" y="128" width="230" height="56" rx="8"></rect>
<text x="665" y="153" text-anchor="middle" class="title">Liaison de compte</text>
<text x="665" y="170" text-anchor="middle" class="cap">une fois par personne et canal</text>
<path class="ln" d="M665,184 L665,238" marker-end="url(#g10-arrow)"></path>
<text x="655" y="216" text-anchor="end" class="cap">compte api0 lié</text>
<!-- gateway -->
<rect class="acbox" x="20" y="240" width="760" height="92" rx="8"></rect>
<text x="400" y="266" text-anchor="middle" class="title on">Passerelle api0</text>
<text x="400" y="290" text-anchor="middle" class="body on">sait qui appelle, et pour quel tenant</text>
<text x="400" y="312" text-anchor="middle" class="oncap">seuls les outils du tenant · crédits décomptés · appel journalisé</text>
<path class="ln" d="M400,332 L400,370" marker-end="url(#g10-arrow)"></path>
<rect class="box" x="280" y="372" width="240" height="50" rx="8"></rect>
<text x="400" y="394" text-anchor="middle" class="title">Identifiant sortant</text>
<text x="400" y="411" text-anchor="middle" class="cap">guide 11</text>
</svg>
<svg class="g10-auth g10-auth-tall" viewBox="-2 -2 384 380" width="100%" style="height:auto;max-width:400px;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Authentification entrante : une personne dans Claude ou un autre client MCP se connecte avec Google, Entra ID ou un fournisseur OIDC et obtient un jeton OAuth 2.1 ; un serveur ou un script utilise une clé API, en option au nom d&#x27;un utilisateur nommé ; une personne dans Teams, WhatsApp ou Telegram est reconnue grâce à son compte api0 lié. La passerelle sait alors qui appelle et pour quel tenant.">
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
<text x="85" y="39" text-anchor="middle" class="cap">client MCP</text>
<path class="ln" d="M170,25 L188,25" marker-end="url(#g10t-arrow)"></path>
<rect class="box" x="190" y="0" width="164" height="50" rx="8"></rect>
<text x="272" y="22" text-anchor="middle" class="title">Jeton OAuth 2.1</text>
<text x="272" y="39" text-anchor="middle" class="cap">Google · Entra ID · OIDC</text>
<path class="ln" d="M354,25 L368,25"></path>
<rect class="box" x="0" y="66" width="170" height="50" rx="8"></rect>
<text x="85" y="88" text-anchor="middle" class="title">Serveur, script</text>
<text x="85" y="105" text-anchor="middle" class="cap">serveur à serveur</text>
<path class="ln" d="M170,91 L188,91" marker-end="url(#g10t-arrow)"></path>
<rect class="box" x="190" y="66" width="164" height="50" rx="8"></rect>
<text x="272" y="88" text-anchor="middle" class="title">Clé API</text>
<text x="272" y="105" text-anchor="middle" class="cap">+ utilisateur nommé</text>
<path class="ln" d="M354,91 L368,91"></path>
<rect class="box" x="0" y="132" width="170" height="50" rx="8"></rect>
<text x="85" y="154" text-anchor="middle" class="title">Messageries</text>
<text x="85" y="171" text-anchor="middle" class="cap">Teams · WhatsApp · Telegram</text>
<path class="ln" d="M170,157 L188,157" marker-end="url(#g10t-arrow)"></path>
<rect class="box" x="190" y="132" width="164" height="50" rx="8"></rect>
<text x="272" y="154" text-anchor="middle" class="title">Compte lié</text>
<text x="272" y="171" text-anchor="middle" class="cap">une fois par canal</text>
<path class="ln" d="M354,157 L368,157"></path>
<path class="ln" d="M368,25 L368,200"></path>
<path class="ln" d="M368,200 L368,212" marker-end="url(#g10t-arrow)"></path>
<rect class="acbox" x="0" y="214" width="380" height="86" rx="8"></rect>
<text x="190" y="238" text-anchor="middle" class="title on">Passerelle api0</text>
<text x="190" y="262" text-anchor="middle" class="body on">qui appelle, quel tenant</text>
<text x="190" y="282" text-anchor="middle" class="oncap">outils du tenant · crédits · journal</text>
<path class="ln" d="M190,300 L190,326" marker-end="url(#g10t-arrow)"></path>
<rect class="box" x="100" y="328" width="180" height="46" rx="8"></rect>
<text x="190" y="348" text-anchor="middle" class="title">Identifiant sortant</text>
<text x="190" y="365" text-anchor="middle" class="cap">guide 11</text>
</svg>

## Les modèles

| Modèle | Utilisé par | Détail |
|---|---|---|
| **OAuth 2.1 + PKCE** | Claude et les clients MCP | Le client s'enregistre avec le Client ID du tenant ; l'utilisateur se connecte ; la passerelle émet un jeton lié à cet utilisateur et à ce tenant |
| **Connexion Google** | Par défaut | Pour le tableau de bord et la connexion des utilisateurs |
| **Ton fournisseur d'identité (OIDC)** | Entreprises | Entra ID ou tout fournisseur OIDC configuré par tenant : tes employés se connectent avec leur compte, authentification multifacteur et accès conditionnel compris |
| **Clé API** | Intégrations serveur à serveur | Une clé par tenant ou par consommateur |
| **Liaison de compte messagerie** | Teams, WhatsApp, Telegram | Chaque personne relie une fois son compte de messagerie à son compte api0 |

## Claude et les clients MCP : OAuth 2.1

`/mcp` suit l'autorisation standard du protocole MCP : OAuth 2.1 avec PKCE. Dans Claude, on ajoute un connecteur personnalisé avec l'URL du serveur MCP du tenant et son **Client ID**, sans secret ; la personne se connecte, et la passerelle émet un jeton lié à elle et à ce tenant. Le pas-à-pas est dans le [guide principal](/fr/guides/ton-api-dans-claude).

Cursor, Claude Desktop et les autres clients MCP se connectent de la même façon. Le jeton ne vaut que pour ce tenant : il ne donne accès à aucun autre.

## Les personnes : Google ou ton fournisseur d'identité

Par défaut, les gens se connectent à api0 avec Google, pour le tableau de bord comme pour la connexion OAuth de Claude.

Une entreprise peut brancher son propre fournisseur d'identité, par tenant : **Entra ID** ou tout fournisseur **OIDC**. Ses employés se connectent alors avec leur compte habituel, et ses règles s'appliquent : authentification multifacteur, accès conditionnel, départs. Le secret client du fournisseur est chiffré dans api0. Après la connexion, le fournisseur renvoie les personnes vers `https://gateway.api0.ai/oauth/idp/callback`.

Pour Entra ID, l'assistant de configuration d'api0 le propose dès son premier écran (*Microsoft 365 (Entra ID)*). La même application Entra peut servir à la connexion à api0 et à l'appel d'une API Microsoft : voir le guide 05, section « Variantes ».

## Les serveurs : les clés API

Une intégration serveur à serveur s'authentifie avec une **clé API** : une clé du tenant, ou une clé par consommateur.

### Agir pour un utilisateur final

Une application peut appeler la passerelle avec sa clé **pour le compte d'un de ses utilisateurs**, en le nommant. La passerelle vérifie avant tout appel que c'est permis : le propriétaire de la clé, toujours ; une clé de consommateur, jamais pour quelqu'un d'autre ; une clé du tenant, seulement pour une personne qui a elle-même rejoint ce tenant (par le consentement OAuth ou sa propre clé). Être ajouté comme membre ne suffit pas. Sinon : `403`.

## Les messageries : la liaison de compte

Teams, WhatsApp et Telegram ne connaissent qu'un identifiant de messagerie. Chaque personne le relie donc **une fois** à son compte api0, avec un code à usage unique envoyé au bot, ou le bouton **Link my…** du canal sur app.api0.ai. Ensuite, chaque message est traité comme venant de son compte api0, avec ses accès.

Tant qu'une personne n'est pas liée, le bot lui explique comment faire, sans répondre à sa question et sans appeler d'outil. Le détail est dans le guide de chaque canal : [le guide Teams](/fr/guides/ton-api-dans-teams), [le guide WhatsApp](/fr/guides/ton-api-dans-whatsapp), [le guide Telegram](/fr/guides/ton-api-dans-telegram).

## Lequel pour qui

| Qui appelle | Modèle |
|---|---|
| Une personne dans Claude ou un autre client MCP | OAuth 2.1, avec Google ou le fournisseur d'identité de l'entreprise |
| Une entreprise qui gère déjà ses comptes dans Entra ID ou un fournisseur OIDC | Son fournisseur d'identité, pour que ses règles s'appliquent |
| Un serveur, une application, un script | Une clé API ; pour le compte d'un utilisateur, en le nommant |
| Une personne dans Teams, WhatsApp ou Telegram | La liaison de compte, une fois par canal |

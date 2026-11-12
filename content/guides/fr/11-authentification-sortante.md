---
title: "Authentification sortante : avec quel identifiant api0 appelle ton application"
date: "2026-11-11"
excerpt: "Chaque mode qu'api0 utilise pour appeler ton application ou une API tierce : le jeton d'identité signé par api0, les clés et jetons de service, l'identifiant de chaque personne, les connexions nommées, et l'arbre de décision pour choisir."
author: { name: "API0 Team" }
tags: ["Guide technique", "Authentification", "OAuth", "Sécurité"]
---

# Authentification sortante : avec quel identifiant api0 appelle ton application

Une fois l'appelant identifié ([l'authentification entrante](/fr/guides/authentification-entrante), guide 10), la passerelle appelle ton application ou une API tierce. Ce guide décrit **avec quel identifiant** : un jeton qu'api0 signe lui-même, une clé de service, ou l'identifiant de chaque personne.

Dans tous les cas, l'identifiant reste dans api0. Le modèle d'IA ne le voit jamais, et il n'est jamais renvoyé au tableau de bord.

## Les acteurs

<svg class="g11-auth g11-auth-wide" viewBox="0 0 800 452" width="100%" style="height:auto;max-width:780px;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Authentification sortante : une fois l&#x27;appelant identifié, la passerelle api0 lit l&#x27;identifiant de l&#x27;outil dans son coffre à secrets et appelle la cible avec : un jeton d&#x27;identité signé par api0 pour ta propre application, un identifiant de service pour une API tierce, ou l&#x27;identifiant de chaque personne pour des systèmes comme Azure DevOps ou Microsoft Graph. Le modèle d&#x27;IA ne voit jamais l&#x27;identifiant.">
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
<text x="200" y="45" text-anchor="middle" class="title">Appelant identifié</text>
<text x="200" y="62" text-anchor="middle" class="cap">une personne et un tenant (guide 10)</text>
<rect class="box" x="420" y="20" width="360" height="56" rx="8"></rect>
<text x="600" y="45" text-anchor="middle" class="title">Coffre à secrets</text>
<text x="600" y="62" text-anchor="middle" class="cap">chiffrés par tenant et par personne</text>
<path class="ln" d="M200,76 L200,118" marker-end="url(#g11-arrow)"></path>
<path class="ln" d="M600,76 L600,118" marker-start="url(#g11-arrow)" marker-end="url(#g11-arrow)"></path>
<text x="610" y="101" class="cap">déchiffré pour l'appel seulement</text>
<rect class="acbox" x="20" y="120" width="760" height="72" rx="8"></rect>
<text x="400" y="148" text-anchor="middle" class="title on">Passerelle api0</text>
<text x="400" y="172" text-anchor="middle" class="body on">choisit la connexion de l'outil (par défaut ou nommée) et injecte son identifiant</text>
<path class="ln" d="M140,192 L140,238" marker-end="url(#g11-arrow)"></path>
<rect class="cred" x="20" y="240" width="240" height="60" rx="8"></rect>
<text x="140" y="267" text-anchor="middle" class="title">Jeton d'identité api0</text>
<text x="140" y="284" text-anchor="middle" class="cap">signé par api0, rien à stocker</text>
<path class="ln" d="M140,300 L140,346" marker-end="url(#g11-arrow)"></path>
<rect class="box" x="20" y="348" width="240" height="60" rx="8"></rect>
<text x="140" y="375" text-anchor="middle" class="title">Ton application</text>
<text x="140" y="392" text-anchor="middle" class="cap">vérifie aud et le signataire</text>
<path class="ln" d="M400,192 L400,238" marker-end="url(#g11-arrow)"></path>
<rect class="cred" x="280" y="240" width="240" height="60" rx="8"></rect>
<text x="400" y="267" text-anchor="middle" class="title">Identifiant de service</text>
<text x="400" y="284" text-anchor="middle" class="cap">bearer · en-têtes · client credentials</text>
<path class="ln" d="M400,300 L400,346" marker-end="url(#g11-arrow)"></path>
<rect class="box" x="280" y="348" width="240" height="60" rx="8"></rect>
<text x="400" y="375" text-anchor="middle" class="title">API tierce</text>
<text x="400" y="392" text-anchor="middle" class="cap">voit une identité de service</text>
<path class="ln" d="M660,192 L660,238" marker-end="url(#g11-arrow)"></path>
<rect class="cred" x="540" y="240" width="240" height="60" rx="8"></rect>
<text x="660" y="267" text-anchor="middle" class="title">Identifiant personnel</text>
<text x="660" y="284" text-anchor="middle" class="cap">secret personnel ou OAuth, renouvelé</text>
<path class="ln" d="M660,300 L660,346" marker-end="url(#g11-arrow)"></path>
<rect class="box" x="540" y="348" width="240" height="60" rx="8"></rect>
<text x="660" y="375" text-anchor="middle" class="title">Azure DevOps · Graph…</text>
<text x="660" y="392" text-anchor="middle" class="cap">voit la vraie personne</text>
<text x="400" y="440" text-anchor="middle" class="cap">L'identifiant reste dans api0 : le modèle d'IA ne le voit jamais.</text>
</svg>
<svg class="g11-auth g11-auth-tall" viewBox="-2 -2 384 390" width="100%" style="height:auto;max-width:400px;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Authentification sortante : une fois l&#x27;appelant identifié, la passerelle api0 lit l&#x27;identifiant de l&#x27;outil dans son coffre à secrets et appelle la cible avec : un jeton d&#x27;identité signé par api0 pour ta propre application, un identifiant de service pour une API tierce, ou l&#x27;identifiant de chaque personne pour des systèmes comme Azure DevOps ou Microsoft Graph. Le modèle d&#x27;IA ne voit jamais l&#x27;identifiant.">
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
<text x="90" y="22" text-anchor="middle" class="title">Appelant identifié</text>
<text x="90" y="39" text-anchor="middle" class="cap">personne + tenant</text>
<rect class="box" x="200" y="0" width="180" height="50" rx="8"></rect>
<text x="290" y="22" text-anchor="middle" class="title">Coffre à secrets</text>
<text x="290" y="39" text-anchor="middle" class="cap">chiffrés</text>
<path class="ln" d="M90,50 L90,78" marker-end="url(#g11t-arrow)"></path>
<path class="ln" d="M290,50 L290,78" marker-start="url(#g11t-arrow)" marker-end="url(#g11t-arrow)"></path>
<rect class="acbox" x="0" y="80" width="380" height="56" rx="8"></rect>
<text x="190" y="103" text-anchor="middle" class="title on">Passerelle api0</text>
<text x="190" y="124" text-anchor="middle" class="body on">injecte l'identifiant de l'outil</text>
<path class="ln" d="M6,136 L6,327"></path>
<path class="ln" d="M6,185 L16,185" marker-end="url(#g11t-arrow)"></path>
<rect class="cred" x="18" y="160" width="172" height="50" rx="8"></rect>
<text x="104" y="182" text-anchor="middle" class="title">Jeton d'identité</text>
<text x="104" y="199" text-anchor="middle" class="cap">signé par api0</text>
<path class="ln" d="M190,185 L206,185" marker-end="url(#g11t-arrow)"></path>
<rect class="box" x="208" y="160" width="172" height="50" rx="8"></rect>
<text x="294" y="182" text-anchor="middle" class="title">Ton application</text>
<text x="294" y="199" text-anchor="middle" class="cap">vérifie aud + signataire</text>
<path class="ln" d="M6,251 L16,251" marker-end="url(#g11t-arrow)"></path>
<rect class="cred" x="18" y="226" width="172" height="50" rx="8"></rect>
<text x="104" y="248" text-anchor="middle" class="title">Clé de service</text>
<text x="104" y="265" text-anchor="middle" class="cap">clé · en-têtes · OAuth</text>
<path class="ln" d="M190,251 L206,251" marker-end="url(#g11t-arrow)"></path>
<rect class="box" x="208" y="226" width="172" height="50" rx="8"></rect>
<text x="294" y="248" text-anchor="middle" class="title">API tierce</text>
<text x="294" y="265" text-anchor="middle" class="cap">une identité de service</text>
<path class="ln" d="M6,317 L16,317" marker-end="url(#g11t-arrow)"></path>
<rect class="cred" x="18" y="292" width="172" height="50" rx="8"></rect>
<text x="104" y="314" text-anchor="middle" class="title">Identifiant personnel</text>
<text x="104" y="331" text-anchor="middle" class="cap">secret ou OAuth</text>
<path class="ln" d="M190,317 L206,317" marker-end="url(#g11t-arrow)"></path>
<rect class="box" x="208" y="292" width="172" height="50" rx="8"></rect>
<text x="294" y="314" text-anchor="middle" class="title">Azure DevOps · Graph</text>
<text x="294" y="331" text-anchor="middle" class="cap">voit la vraie personne</text>
<text x="190" y="378" text-anchor="middle" class="cap">Le modèle d'IA ne voit jamais l'identifiant.</text>
</svg>

## Les modes

| Mode | Ce que reçoit l'application | Quand le choisir |
|---|---|---|
| `none` | Rien | API publique |
| **Jeton d'identité api0** (`google_sa`, sans clé) | Un jeton d'identité Google signé par le compte de service d'api0 | **Tes propres applications.** Aucun secret à stocker |
| `google_sa` avec ta clé | Un jeton d'identité signé par **ton** compte de service | Applications Google Cloud (Cloud Run…) avec ton propre IAM |
| `static_bearer` | `Authorization: Bearer <jeton>` | API tierce à clé unique |
| `header_injection` | Les en-têtes que tu définis | APIs à en-têtes propriétaires |
| `client_credentials` | Un jeton obtenu par OAuth client credentials | APIs qui délivrent des jetons de service |
| `per_user` — secret personnel | L'identifiant de **chaque** utilisateur : `Basic` (PAT Azure DevOps), `Bearer`, ou en-tête brut | Attribution et droits par personne |
| `per_user` — OAuth | Le jeton OAuth de **chaque** utilisateur, renouvelé par api0 | Systèmes à connexion OAuth (ex. Microsoft) |

L'en-tête d'authentification gagne toujours sur un en-tête fixe de l'outil qui porterait le même nom (voir l'ordre des en-têtes dans le guide 04).

## Connexion par défaut et connexions nommées

Chaque tenant a une **connexion par défaut**, et peut en ajouter d'autres, **nommées**, quand certains outils visent un service qui demande une autre authentification. Par exemple : Azure DevOps sur la connexion par défaut, Microsoft Graph sur une connexion `graph`, une base de reporting sur une identité de service.

Sur app.api0.ai, la carte **Connections** de la page **API** crée et modifie les connexions, et **Which connection each tool uses** dit laquelle chaque outil utilise. Un outil qui n'en désigne aucune utilise `default`.

Avec Microsoft, il faut une connexion par **audience** : un jeton pour Microsoft Graph est refusé par Azure DevOps, et inversement (guide 06, section 3).

## Le jeton d'identité api0 en détail

Pour une application que tu opères, le plus simple est souvent de ne stocker **aucun** secret : la passerelle signe chaque appel avec le compte de service d'api0.

Un seul signataire pour tous les tenants : c'est donc l'**audience** qui les sépare, et le tenant ne la choisit pas. La passerelle la construit à partir de l'origine de l'URL de l'application et de l'identifiant du tenant appelant :

```
https://api.exemple.com/orders  →  aud = https://api.exemple.com/api0/tenant/<id du tenant>
```

Seule l'origine est gardée : aucun chemin, aucune requête ne peut fabriquer l'audience d'un autre tenant. Ton application vérifie deux valeurs, une fois pour toutes :

| Vérification | Valeur |
|---|---|
| `aud` | `https://<ton origine>/api0/tenant/<ton tenant>` |
| `email` (signataire) | le compte de service d'api0 |

Épingler le signataire est obligatoire : n'importe quel compte de service Google peut émettre un jeton pour n'importe quelle audience.

## Identifiants par personne

C'est le modèle à préférer dès que l'attribution compte.

- **Secret personnel.** L'utilisateur ajoute une fois son jeton (par exemple un PAT Azure DevOps). Il est chiffré et **ne peut plus être relu**, seulement remplacé. Une URL de vérification optionnelle permet de contrôler à qui appartient le jeton.
- **OAuth.** L'utilisateur connecte une fois son compte (**Settings → My access tokens → Connect**). api0 garde le jeton de rafraîchissement chiffré et renouvelle l'accès. Le paramètre `state` du flux OAuth est à usage unique et court (protection CSRF).
- **Sans identifiant** : l'utilisateur reçoit un résultat d'outil qui lui explique comment l'ajouter. **Jamais** d'appel fait au nom de quelqu'un d'autre.

Résultat : le système cible voit la vraie personne, applique ses droits et lui attribue l'action.

Exemples pas à pas avec Microsoft : Azure DevOps avec la [connexion Microsoft de chacun](/fr/guides/azure-devops-connexion-microsoft) (guide 05), puis SharePoint, Azure SQL et Logic Apps dans le guide 06.

## Choisir son mode : l'arbre de décision

1. **L'application est à toi ?** → jeton d'identité api0. Rien à stocker.
2. **Les actions doivent être attribuées à la personne, ou ses droits appliqués ?** → `per_user` (OAuth si le système le permet, sinon secret personnel).
3. **API tierce avec une clé de service ?** → `static_bearer`, `header_injection` ou `client_credentials`, et transmission d'identité désactivée.
4. **Des outils visent des services différents ?** → une connexion nommée par service.

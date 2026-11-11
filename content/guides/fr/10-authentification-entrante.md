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

---
title: "Ton API dans WhatsApp, avec ton numéro WhatsApp Business"
date: "2026-11-11"
excerpt: "Le pas-à-pas pour mettre les outils d'un tenant api0 dans WhatsApp : l'app Meta, le Phone Number ID, le token permanent, l'App Secret, le webhook et la liaison du numéro de chacun, avec ce que le test d'api0 vérifie et comment corriger ce qu'il signale."
author: { name: "API0 Team" }
tags: ["Guide pratique", "WhatsApp", "Meta", "Messagerie"]
---

# Ton API dans WhatsApp, avec ton numéro WhatsApp Business

À la fin de ce guide, chacun écrit à ton numéro WhatsApp Business, et l'assistant d'api0 répond en appelant les outils du tenant **au nom de cette personne**, avec ses droits. Les outils et les accès sont ceux que tu as déjà configurés dans api0, les mêmes que dans Claude.

Compte une demi-heure.

Avant de commencer :

- **Une API qui marche déjà dans api0** : voir le [guide principal](/fr/guides/ton-api-dans-claude).
- **Un compte Meta Business** (un *Business portfolio*) et un accès à `developers.facebook.com`.
- **Un numéro pour WhatsApp Business** : Meta en fournit un de test dans l'app, pour commencer.

## Comment un message circule

```
Personne sur WhatsApp ──► Meta (WhatsApp Cloud API) ──► webhook api0 ──► assistant ──► ton API
                                                        vérifie la signature
```

Meta signe chaque message avec l'**App Secret** de ton app ; api0 refuse ce qui ne vient pas de Meta. L'assistant appelle ensuite les outils pour la personne liée à ce numéro, et répond par la même conversation avec ton **token permanent**.

## 1. Une app Meta avec WhatsApp

Sur [developers.facebook.com/apps](https://developers.facebook.com/apps) : **Create App** → un nom → le cas d'usage **« Connect with customers through WhatsApp »** → ton **Business portfolio** → **Create app**.

## 2. Le Phone Number ID

Après la création, tu arrives sur **Customize use case → Connect on WhatsApp → Quickstart**. Clique **Start using the API** pour ouvrir la page **API Setup**, et copie le **Phone Number ID** (un long nombre du type `10654035…`).

Ce n'est **pas** le numéro de téléphone : c'est l'identifiant interne de Meta. Le numéro lui-même est affiché juste à côté ; c'est à lui que les gens écriront.

## 3. Le token permanent et l'App Secret

1. Ouvre [Business Settings → System Users](https://business.facebook.com/settings/system-users), crée un *system user*, et assigne-lui ton app WhatsApp avec **full control**.
2. **Generate Token**, avec les permissions `whatsapp_business_messaging` et `whatsapp_business_management`. Garde-le : il ne sera plus affiché.
3. Dans ton app Meta, **App settings → Basic** → **App secret** → *Show*, et copie-le.

**N'utilise pas le token temporaire de la page API Setup** : il expire au bout de 24 heures, et le bot se tait le lendemain.

## 4. Brancher WhatsApp dans api0

Sur [app.api0.ai → **Channels → WhatsApp**](https://app.api0.ai/?tab=channels&channel=whatsapp) :

| Champ | Valeur |
|---|---|
| Phone Number ID | celui de l'étape 2 |
| Permanent Token | celui de l'étape 3 |
| Verify Token | une chaîne secrète **de ton choix** : tu la recolleras dans Meta à l'étape 5 |
| App Secret | celui de l'étape 3. Facultatif dans le formulaire, mais recommandé : sans lui, les messages ne sont pas vérifiés, ou sont refusés selon le serveur |
| Assistant persona | facultatif : comment l'assistant se présente et se comporte (ton, longueur des réponses, confirmation avant une action) |

Clique **Connect WhatsApp**. Le bloc affiche alors ta **Webhook URL**, propre à ton tenant.

Les secrets ne sont jamais réaffichés. Pour changer de token plus tard, colle le nouveau et clique **Update channel** ; laisse l'App Secret vide pour garder celui qui est enregistré.

## 5. Le webhook dans Meta

Dans ton app Meta : **WhatsApp → Configuration → Webhook → Edit** :

- **Callback URL** : la Webhook URL affichée par api0 ;
- **Verify token** : exactement la même chaîne qu'à l'étape 4.

Clique **Verify and Save**, puis abonne-toi au champ **messages**. Sans cet abonnement, Meta ne transmet rien.

## 6. Lier son numéro et essayer

Chaque personne le fait une fois, de préférence sur son téléphone :

1. Dans api0, le bloc WhatsApp affiche **Link my WhatsApp**. Touche-le, puis **Open** : la conversation s'ouvre avec un code déjà tapé.
2. Envoie ce message. L'encadré passe au vert quand le numéro est lié.
3. Écris une vraie demande au numéro WhatsApp Business. L'assistant répond avec les outils d'api0, en ton nom.

Une personne pas encore liée reçoit une réponse qui explique comment se lier, pas une réponse à sa question. Chacun lie donc son propre numéro.

Si l'accès du tenant passe par l'identifiant de chaque personne, elle doit aussi l'avoir ajouté dans api0 (**Settings → My access tokens**) avant que les outils marchent pour elle.

## 7. Vérifier avec le test

Clique **Test** dans le bloc WhatsApp. Il vérifie chaque étape, y compris qu'un message est vraiment arrivé à api0, ce qui prouve que Meta appelle le webhook :

- Meta accepte le token, et pour quel numéro ;
- le token n'expire pas bientôt et a les deux permissions WhatsApp ;
- l'App Secret appartient bien à l'app qui a émis le token ;
- le webhook répond avec ton verify token ;
- ton propre numéro est lié, et le dernier message est bien arrivé.

## Récapitulatif des erreurs

| Message | Cause | Correctif |
|---|---|---|
| `The token expires in …h — this looks like a temporary token.` | Le token vient de la page API Setup | Générer un token permanent depuis un System User (étape 3) et l'enregistrer |
| `The token has expired.` ou `Meta reports the token as no longer valid.` | Token temporaire expiré, ou révoqué | Nouveau token permanent, puis **Update channel** |
| `The token cannot send WhatsApp messages.` | Il manque une permission au token | Le régénérer avec `whatsapp_business_messaging` et `whatsapp_business_management` |
| `Meta rejected the stored token` | Token mal copié, ou d'une autre app | Le recopier depuis Business Settings → System Users |
| `The App Secret does not belong to the app that issued the token.` | App Secret d'une autre app Meta | App settings → Basic de l'app qui porte WhatsApp |
| `The bridge requires a signature, but this tenant has no App Secret.` | App Secret pas renseigné | L'ajouter à l'étape 4 |
| `The bridge rejected this tenant's verify token.` | Verify token différent entre api0 et Meta | Saisir la même chaîne des deux côtés |
| Meta refuse **Verify and Save** | Callback URL ou verify token mal collés | Recopier la Webhook URL d'api0 et le verify token exact |
| `No message has reached the bridge yet.` | Le webhook n'est pas enregistré, ou pas abonné à **messages** | Étape 5 |
| `Your own WhatsApp number is not linked yet.` | Pas encore de liaison pour ton numéro | **Link my WhatsApp** (étape 6) |
| `Quality rating is …` | Meta limite le nombre de personnes que ce numéro peut contacter | Voir la qualité du numéro dans WhatsApp Manager |
| Le bot répond seulement comment se lier | La personne n'a pas lié son numéro | Elle fait l'étape 6 |

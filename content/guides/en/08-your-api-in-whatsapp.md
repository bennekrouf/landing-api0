---
title: "Your API in WhatsApp, With Your WhatsApp Business Number"
date: "2026-11-11"
excerpt: "The step-by-step setup for putting an api0 tenant's tools in WhatsApp: the Meta app, the Phone Number ID, the permanent token, the App Secret, the webhook and linking each person's number, with what api0's test checks and how to fix what it reports."
author: { name: "API0 Team" }
tags: ["How-to Guide", "WhatsApp", "Meta", "Messaging"]
---

# Your API in WhatsApp, With Your WhatsApp Business Number

By the end of this guide, people message your WhatsApp Business number, and api0's assistant answers by calling the tenant's tools **on that person's behalf**, with their permissions. The tools and the access are the ones you've already set up in api0, the same as in Claude.

Allow half an hour.

Before you start:

- **An API that already works in api0**: see the [main guide](/guides/your-api-in-claude).
- **A Meta Business account** (a *Business portfolio*) and access to `developers.facebook.com`.
- **A number for WhatsApp Business**: Meta provides a test one in the app, to start with.

## How a message travels

```
Person on WhatsApp ──► Meta (WhatsApp Cloud API) ──► api0 webhook ──► assistant ──► your API
                                                     checks the signature
```

Meta signs every message with your app's **App Secret**; api0 refuses anything that didn't come from Meta. The assistant then calls the tools for the person linked to that number, and replies in the same chat with your **permanent token**.

## 1. A Meta app with WhatsApp

On [developers.facebook.com/apps](https://developers.facebook.com/apps): **Create App** → a name → the use case **"Connect with customers through WhatsApp"** → your **Business portfolio** → **Create app**.

## 2. The Phone Number ID

After creation you land on **Customize use case → Connect on WhatsApp → Quickstart**. Click **Start using the API** to reach the **API Setup** page, and copy the **Phone Number ID** (a long number like `10654035…`).

It is **not** the phone number: it's Meta's internal identifier. The number itself is shown right next to it; that's the one people will message.

## 3. The permanent token and the App Secret

1. Open [Business Settings → System Users](https://business.facebook.com/settings/system-users), create a *system user*, and assign it your WhatsApp app with **full control**.
2. **Generate Token**, with the permissions `whatsapp_business_messaging` and `whatsapp_business_management`. Keep it: it won't be shown again.
3. In your Meta app, **App settings → Basic** → **App secret** → *Show*, and copy it.

**Don't use the temporary token from the API Setup page**: it expires after 24 hours, and the bot goes quiet the next day.

## 4. Connect WhatsApp in api0

On [app.api0.ai → **Channels → WhatsApp**](https://app.api0.ai/?tab=channels&channel=whatsapp):

| Field | Value |
|---|---|
| Phone Number ID | the one from step 2 |
| Permanent Token | the one from step 3 |
| Verify Token | a secret string **you choose**: you'll paste it in Meta in step 5 |
| App Secret | the one from step 3. Optional in the form, but recommended: without it, messages are either unchecked or refused, depending on the server |
| Assistant persona | optional: how the assistant introduces itself and behaves (tone, reply length, confirming before an action) |

Click **Connect WhatsApp**. The block then shows your **Webhook URL**, specific to your tenant.

Secrets are never shown back. To change the token later, paste the new one and click **Update channel**; leave the App Secret empty to keep the stored one.

## 5. The webhook in Meta

In your Meta app: **WhatsApp → Configuration → Webhook → Edit**:

- **Callback URL**: the Webhook URL api0 shows;
- **Verify token**: exactly the same string as in step 4.

Click **Verify and Save**, then subscribe to the **messages** field. Without that subscription, Meta forwards nothing.

## 6. Link your number and try it

Each person does this once, best on their phone:

1. In api0, the WhatsApp block shows **Link my WhatsApp**. Tap it, then **Open**: the chat opens with a code already typed in.
2. Send that message. The box turns green when the number is linked.
3. Message the WhatsApp Business number with a real request. The assistant answers with api0's tools, as you.

Someone who isn't linked yet gets a reply explaining how to link, not an answer to their question. So each person links their own number.

If the tenant's access uses each person's own credential, they must also have added it in api0 (**Settings → My access tokens**) before the tools work for them.

## 7. Check with the test

Click **Test** in the WhatsApp block. It checks every step, including that a message actually reached api0, which proves Meta is calling the webhook:

- Meta accepts the token, and for which number;
- the token doesn't expire soon and has both WhatsApp permissions;
- the App Secret belongs to the app that issued the token;
- the webhook answers with your verify token;
- your own number is linked, and the last message arrived.

## Error recap

| Message | Cause | Fix |
|---|---|---|
| `The token expires in …h — this looks like a temporary token.` | The token comes from the API Setup page | Generate a permanent token from a System User (step 3) and save it |
| `The token has expired.` or `Meta reports the token as no longer valid.` | Expired temporary token, or revoked | New permanent token, then **Update channel** |
| `The token cannot send WhatsApp messages.` | The token lacks a permission | Regenerate it with `whatsapp_business_messaging` and `whatsapp_business_management` |
| `Meta rejected the stored token` | Token miscopied, or from another app | Copy it again from Business Settings → System Users |
| `The App Secret does not belong to the app that issued the token.` | App Secret from another Meta app | App settings → Basic of the app that carries WhatsApp |
| `The bridge requires a signature, but this tenant has no App Secret.` | App Secret not entered | Add it in step 4 |
| `The bridge rejected this tenant's verify token.` | Different verify token in api0 and in Meta | Enter the same string on both sides |
| Meta refuses **Verify and Save** | Callback URL or verify token miscopied | Copy api0's Webhook URL and the exact verify token again |
| `No message has reached the bridge yet.` | The webhook isn't saved, or not subscribed to **messages** | Step 5 |
| `Your own WhatsApp number is not linked yet.` | Your number isn't linked yet | **Link my WhatsApp** (step 6) |
| `Quality rating is …` | Meta is limiting how many people this number can message | Check the number's quality in WhatsApp Manager |
| The bot only explains how to link | The person hasn't linked their number | They do step 6 |

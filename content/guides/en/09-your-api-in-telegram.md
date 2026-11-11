---
title: "Your API in Telegram, With a Bot Made in Two Minutes"
date: "2026-11-11"
excerpt: "The step-by-step setup for putting an api0 tenant's tools in Telegram: the bot from @BotFather, its token, connecting it in api0, linking each person's account and sharing it with the team, with what api0's test checks."
author: { name: "API0 Team" }
tags: ["How-to Guide", "Telegram", "Messaging"]
---

# Your API in Telegram, With a Bot Made in Two Minutes

By the end of this guide, your team messages a Telegram bot, and api0's assistant answers by calling the tenant's tools **on each person's behalf**, with their permissions. The tools and the access are the ones you've already set up in api0, the same as in Claude.

Allow ten minutes. Unlike WhatsApp or Teams, there's nothing to paste back anywhere: api0 sets up the webhook itself.

Before you start:

- **An API that already works in api0**: see the [main guide](/guides/your-api-in-claude).
- **Telegram**, on your phone or computer.

## How a message travels

```
Person on Telegram ──► Telegram ──► api0 webhook ──► assistant ──► your API
```

When you connect, api0 checks the token with Telegram and tells it where to deliver the bot's messages. The assistant then calls the tools for the person linked to that Telegram account.

## 1. Create the bot with @BotFather

In Telegram, open [@BotFather](https://t.me/BotFather) and send `/newbot`:

1. a **display name**, for example *Acme Assistant*;
2. a **username**, which must end in `bot`, for example `acme_assistant_bot`.

Usernames are unique across Telegram: if BotFather refuses one, try another. It becomes the bot's link (`t.me/acme_assistant_bot`) and can't be changed later. api0's Telegram page suggests names based on your tenant's name.

**Use a bot made for this.** Connecting points the bot at api0: a bot already wired to another service stops receiving messages there.

## 2. Copy the token

BotFather replies with a token like `123456789:AAH…`. Treat it like a password: anyone holding it controls the bot.

Lost or leaked? In BotFather: `/mybots` → your bot → **API Token** → **Revoke current token**, then connect again with the new one.

Optional, still in BotFather: `/setuserpic` for a profile photo, `/setdescription` for what people see before they start a chat, `/setabouttext` for its profile.

## 3. Connect the bot in api0

On [app.api0.ai → **Channels → Telegram**](https://app.api0.ai/?tab=channels&channel=telegram), paste the token, optionally add instructions for the bot (tone, reply length, confirming before an action), and click **Connect**.

api0 checks the token with Telegram and registers the webhook before saving anything: a block that says "connected" is connected. The token is stored encrypted.

## 4. Link your account and try it

Each person does this once, best on the phone they use Telegram on:

1. In api0, the Telegram block shows **Link my Telegram**. Tap it, then **Open**: the bot opens.
2. Press **Start**. The box turns green when the account is linked.
3. Send the bot a real request. It answers with api0's tools, as you.

Someone who isn't linked yet gets a reply explaining how to link, not an answer to their question.

## 5. Share it with the team

The Telegram block shows the **bot link**. Send it to your team: each person opens it and links their own account as in step 4.

What each person can do follows the tenant's access setting. If access uses each person's own credential, they must also have added it in api0 (**Settings → My access tokens**) before the tools work for them.

## 6. Check with the test

Click **Test connection** in the Telegram block. It checks that Telegram accepts the token, that it delivers the bot's messages to api0, that your own account is linked, and that the last message arrived.

## Error recap

| Message | Cause | Fix |
|---|---|---|
| BotFather refuses the username | Already taken, or doesn't end in `bot` | Try another one ending in `bot` |
| `Telegram rejected the stored bot token.` | Token revoked or miscopied | `/mybots` → **API Token**, then connect again with the new token |
| `Telegram has no webhook registered for this bot.` | The webhook was removed | Reconnect the bot (**Disconnect**, then **Connect** with the same token) |
| `Telegram delivers this bot's messages to …, not to api0.` | Another service took over the bot | Use a dedicated bot, or reconnect this one to api0 |
| `Telegram cannot deliver — … update(s) waiting.` | Telegram can't deliver messages to api0 | The test shows Telegram's last error: pass it on to api0 if it persists |
| `Your own Telegram account is not linked yet.` | Your account isn't linked yet | **Link my Telegram**, then **Start** (step 4) |
| The bot only explains how to link | The person hasn't linked their account | They do step 4 |

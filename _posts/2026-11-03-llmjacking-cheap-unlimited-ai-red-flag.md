---
description: "LLMjacking is the theft of paid AI access with stolen keys. How to spot cheap unlimited AI deals, and how teams protect their AI API keys."
layout: post
title: "LLMjacking: Why Cheap Unlimited AI Is a Red Flag (2026)"
slug: llmjacking-cheap-unlimited-ai-red-flag
category: "Threats"
tags: ["LLMjacking", "API Key Security", "AI Subscriptions"]
author: Marc
excerpt: "Google's threat intelligence team found criminals running up AI bills of more than $100,000 in a single day on stolen company keys, then reselling the access. One resale service offers an unlimited plan for about $60 a month, and Google believes it runs on stolen keys. Here is how to spot the same warning sign in cheap AI deals, and how teams keep their own keys from paying for someone else's."
image: "/assets/img/posts/llmjacking-cheap-unlimited-ai-red-flag.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-11-03
faq:
  - question: "What is LLMjacking?"
    answer: "LLMjacking is when criminals take over an organization's paid access to large language models, the AI systems behind chatbots and coding assistants, and use it without permission. Per <a href=\"https://cloud.google.com/blog/topics/threat-intelligence/llmjacking-monetizing-compromised-cloud-models\">Google Threat Intelligence Group</a>, they do it mostly with stolen cloud credentials or AI API keys, then use or resell the access while the victim pays the bill."
  - question: "How much has LLMjacking cost victims?"
    answer: "In incidents Mandiant handled in 2026, <a href=\"https://cloud.google.com/blog/topics/threat-intelligence/llmjacking-monetizing-compromised-cloud-models\">Google reports</a> fraudulent charges above $100,000 in a single day, and cumulative charges at some organizations reaching $1 million before access was cut off. In one case, the Jet Night resale service passed nearly one million dollars in token costs to a single victim organization."
  - question: "Are cheap unlimited AI subscriptions on Reddit legit?"
    answer: "Treat them as a red flag. There is no evidence we know of tying any specific Reddit offer to Jet Night or to Google's report. The warning sign is the price. <a href=\"https://cloud.google.com/blog/topics/threat-intelligence/llmjacking-monetizing-compromised-cloud-models\">Google says</a> Jet Night's prices sit so far below market rates it believes the service runs on stolen keys. A deal far below the provider's own price deserves the same doubt."
  - question: "Do budget alerts stop a runaway AI bill?"
    answer: "No. Alerts tell you about spending. They do not block it. <a href=\"https://cloud.google.com/billing/docs/how-to/budgets\">Google Cloud's documentation</a> says alerts-only budgets do not cap usage, and <a href=\"https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety\">OpenAI's key safety guide</a> says spend alerts alone do not stop API traffic. Pair alerts with a hard spending limit wherever your provider offers one."
  - question: "What should I do if my AI API key leaks?"
    answer: "Revoke or rotate the key right away, then check your usage and billing pages for activity you do not recognize. <a href=\"https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning\">GitHub's secret scanning docs</a> advise rotating a leaked credential immediately, since deleting it from code history alone leaves the key working. Then look for new keys, accounts, or AI services you did not create."
---

Some AI deals look too good to be true because someone else is paying the bill.

**TL;DR:** LLMjacking is the theft of an organization's paid AI access, usually with stolen keys. [Google Threat Intelligence Group](https://cloud.google.com/blog/topics/threat-intelligence/llmjacking-monetizing-compromised-cloud-models) reports victims hit with more than $100,000 in fraudulent charges in a single day, and some reaching $1 million in total before the access was cut off. Criminals also resell the stolen access. One service, Jet Night, offers an unlimited plan for about $60 a month, and Google believes it runs on stolen keys. For everyday users: a premium AI deal priced far below what the provider charges is a red flag. For teams: treat AI API keys like credit cards.

---

**Jump to a section:**

- [What is LLMjacking?](#what-is-llmjacking)
- [What did Google find?](#what-google-found)
- [How do criminals get the keys?](#how-keys-get-stolen)
- [What is an LLM Mixer, and where does Jet Night fit?](#jet-night)
- [Are cheap unlimited AI deals on Reddit safe?](#reddit-deals)
- [How do you spot a too-good-to-be-true AI deal?](#red-flags)
- [How should teams protect AI API keys?](#protect-api-keys)
- [Do budget alerts stop a runaway AI bill?](#budget-alerts)
- [What should you do if a key leaks?](#key-leaked)

I've seen a lot of Reddit threads offering "unlimited premium AI" for around $20 a month. The price struck me as suspicious. A new report from Google explains why a price like this deserves a second look. Below, I cover what Google found, how the stolen access gets resold, the red flags to watch for, and what builders should do with their own keys.

## What is LLMjacking? {#what-is-llmjacking}

> LLMjacking is the hijacking of someone else's paid AI access. Criminals use stolen credentials to run AI models on a victim's account, for their own use or for resale, and the victim gets the bill.

A large language model, or LLM, is the kind of AI behind chatbots and coding assistants. Companies pay for LLM access by usage. Each request costs money, measured in tokens, the small chunks of text a model reads and writes.

Programs reach these models with an API key. An API key is a long secret string a program sends with each request. It tells the provider which account to bill. Anyone holding the key spends on the account. A credit card number works the same way, which is why I treat the two alike.

LLMjacking, per [Google Threat Intelligence Group (GTIG)](https://cloud.google.com/blog/topics/threat-intelligence/llmjacking-monetizing-compromised-cloud-models), is threat actors hijacking enterprise access to these models. Think of a stranger copying your company card to run a business. They sell the goods. You pay the statement.

## What did Google find? {#what-google-found}

> Mandiant, Google's incident response team, handled multiple LLMjacking cases in 2026 across four industries and three regions. Fraudulent charges topped $100,000 in a single day, and some victims reached $1 million in total.

In its [November 2, 2026 report](https://cloud.google.com/blog/topics/threat-intelligence/llmjacking-monetizing-compromised-cloud-models), GTIG says Mandiant responded to multiple incidents in 2026 where attackers hijacked enterprise LLM access. The victims were in financial services, retail, technology, and transportation, across North America, South America, and Asia Pacific. The cases spanned a variety of cloud and AI providers.

The money moves fast. Google compares LLMjacking to cryptojacking, where attackers secretly run cryptocurrency mining on a victim's computers. Cryptojacking drains resources slowly. LLMjacking "can generate large spikes in fraudulent cloud charges in a matter of hours," per the report. Google observed charges exceeding $100,000 in a single day, with cumulative charges at some organizations reaching $1 million before access was revoked.

One more detail stands out. In multiple incidents, the victim had not turned on the AI service at all. Per GTIG, the attackers used stolen access keys to switch on services such as Bedrock or the Gemini API, then ran up the bill in "minutes or hours." Not using AI does not mean your cloud account is safe from LLMjacking.

[The Register's coverage](https://www.theregister.com/security/2026/11/02/token-thieves-costing-companies-100k-per-day-in-illicit-llm-charges/5306967) quotes John Hultquist, chief analyst at GTIG: "Locking down these resources will not only protect organizations from runaway costs, but also protect the broader community from a deluge of cheap, autonomous attacks."

## How do criminals get the keys? {#how-keys-get-stolen}

> Mostly through stolen or exposed cloud credentials, including keys left in public code. Attackers also scan public GitHub repositories for AI API keys and test each one with tiny, quiet requests.

Per [GTIG](https://cloud.google.com/blog/topics/threat-intelligence/llmjacking-monetizing-compromised-cloud-models), the most common way in was exposed or stolen cloud identity credentials. These include cloud account keys, service account keys (credentials for software, not people), GitHub personal access tokens, and active login sessions.

The report describes several paths:

1. **Keys in public code.** One group harvested corporate AI API keys from public GitHub repositories.
2. **Quiet testing.** The same group checked each stolen key with requests asking for a single token of output. Google says the sweeps went unnoticed by the victim's detection tools.
3. **Misconfigured cloud accounts.** A group Google tracks as UNC6993 got in through a misconfigured service account key, then granted itself access to an AI API.
4. **Fake portals.** UNC6993 also ran a page posing as a portal to join a group of AI users. It tricked people into pasting a raw token from the real AI service, which let the attackers bypass passwords and multifactor authentication.

Once inside, attackers searched code, logs, and databases for more credentials, and created their own accounts and keys to keep access. I covered this pattern in [credential theft as the new normal in cyber attacks](/2026/04/12/credential-theft-new-normal-cyber-attacks/). Attackers log in. They do not break in.

## What is an LLM Mixer, and where does Jet Night fit? {#jet-night}

> An LLM Mixer is a resale service. It pools stolen AI access and sells it to subscribers. One such service, Jet Night, sells an unlimited plan for about $60 a month, and Google believes it runs on stolen keys.

GTIG describes a division of labor. One set of criminals breaks in and steals access. Another runs "LLM Mixers." Google defines these as illicit routing gateways, which "proxy, aggregate, and resell unauthorized LLM access to underground subscribers." The operators pool stolen keys, meter usage, and hide where the requests come from.

Jet Night is the clearest example in the [report](https://cloud.google.com/blog/topics/threat-intelligence/llmjacking-monetizing-compromised-cloud-models). Per GTIG:

- One threat actor made more than 500,000 AI API calls in less than eight hours, using stolen third-party keys to power the token routing service jet-night.com.
- Jet Night passed nearly one million dollars in token costs to the victim organization.
- Jet Night offers an unlimited token plan for about $60 a month with alleged access to frontier models. Google says a comparable consumer service level typically runs between $100 and $250 a month.
- Google writes: "Given Jet Night's per-token costs to users are so far below typical market rates GTIG believes the service relies on stolen keys to operate profitably."
- Jet Night has posted about multiple outages on its public Telegram channel. Google says these are "likely due to stolen keys being revoked as victims discover their respective compromises."

Read the last point from a customer's view. Google reads each outage as a likely sign a victim found the theft and shut off a key. The service you paid for runs only as long as someone else fails to notice.

## Are cheap unlimited AI deals on Reddit safe? {#reddit-deals}

> Treat them as a red flag. I have no evidence tying the Reddit offers I've seen to Jet Night or Google's report. They share the same warning sign: premium AI priced far below what providers charge.

To be clear about the evidence: I have no information linking any Reddit offer to Jet Night, to the groups in Google's report, or to any specific crime. I'm not claiming a link.

What they share is the economics. Google's case about Jet Night rests mostly on one thing: the price it charges compared with what the access costs. A plan priced far below what the access costs to provide does not add up unless someone else pays the difference. Google puts the comparable consumer tier at $100 to $250 a month. An "unlimited premium" plan at around $20 sits even further below the range than Jet Night's $60.

Here is what you risk by buying one:

1. **You might be funding crime.** If the access comes from stolen keys, your subscription pays the people who stole them, and a company somewhere pays the AI bill.
2. **A stranger sits in the middle.** A reseller routes your requests through its own system to reach the model. Whoever runs the system is in a position to read your prompts, your files, and the answers. GTIG notes the mixers it tracked meter usage and hide the origin of requests. You have no idea who runs them, and no privacy policy worth trusting. If you care about what AI companies do with your prompts, as covered in [how your prompts shape ChatGPT ads](/2026/10/15/chatgpt-ads-targeting-prompts-email-phone/), an unknown middleman is a bigger concern.
3. **Your access might vanish.** Jet Night's outages show what happens when victims revoke keys. There is no refund desk for a service built on stolen access.
4. **You might break the provider's rules.** [OpenAI's API key safety guide](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety) states sharing API keys is against its Terms of Use.

## How do you spot a too-good-to-be-true AI deal? {#red-flags}

> Compare the price to the provider's own price for the same tier. Be wary of "unlimited" claims, sellers in DMs or chat channels, shared logins or keys, and no named company behind the offer.

These red flags come from how the services in Google's report worked, plus common sense about any deal priced well below retail:

- **The price is a fraction of the official one.** Check the provider's own pricing page for the tier being offered. A large gap is the clearest signal Google points to.
- **"Unlimited" access to top models.** Running frontier models costs real money per request. Google flagged this exact offer.
- **You get a key, a shared login, or a custom app instead of your own account.** If you never sign up with the AI provider itself, you are using someone else's access.
- **The seller works out of DMs, Telegram, or Discord.** Jet Night announced its outages on a Telegram channel.
- **No company name, terms, or support.** A real business names itself.
- **Frequent "maintenance" or outages.** Google links Jet Night's outages to victims revoking stolen keys.

The same instinct protects you on shopping sites. My guide to [spotting fake products on Amazon](/2026/07/09/amazon-fake-products-2026-spot-avoid/) makes a similar point: when the price is far below everyone else's, ask who is paying the difference. The safer path is to buy directly from the AI provider or use its free tier.

## How should teams protect AI API keys? {#protect-api-keys}

> Treat every AI API key like a credit card. Keep it out of code, repos, and config files. Store it in a secrets manager, give it the narrowest access possible, rotate it on a schedule, and scan code for leaks.

If you build with AI, your keys are the product LLM Mixers sell. These habits come from [GTIG's mitigation guidance](https://cloud.google.com/blog/topics/threat-intelligence/llmjacking-monetizing-compromised-cloud-models) and the providers' own documentation.

1. **Keep keys out of code and config files.** [OpenAI's guide](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety) says never commit a key to a repository, and recommends environment variables, values set on the computer outside your code. It also says never to put a key in a browser or mobile app, where anyone is able to pull it out. Route requests through your own server instead.
2. **Use a secrets manager.** GTIG recommends a centralized secrets management platform to control and rotate keys. A secrets manager is a locked vault for credentials, with access logs.
3. **Rotate keys and set expiration dates.** OpenAI recommends keys with an expiration date and a regular rotation process. Short-lived keys limit the damage of a leak. GTIG notes automation shortens the life of a leaked credential.
4. **Turn on secret scanning.** [GitHub secret scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning) checks your entire Git history on all branches for keys and tokens. It runs free on public repositories. Private organization repositories need GitHub Secret Protection. GTIG also recommends automated secret scanning across every codebase you own, on GitHub, GitLab, or elsewhere.
5. **Scope keys narrowly.** GTIG recommends limiting each key to specific models, environments, and usage limits, so a stolen key for a basic model is useless for expensive frontier models. Give each person and service only the permissions it needs, a principle I covered in [why your AI agent shouldn't have your permissions](/2026/09/03/your-ai-agent-shouldnt-have-your-permissions/).
6. **Watch for AI services switching on.** GTIG says defenders should treat any unauthorized enablement of an AI service as a critical security event. If you don't use a cloud AI service, deny access to it.
7. **Watch for tiny test requests.** GTIG recommends monitoring for odd low-volume requests, such as ones asking for a single token. Attackers use these to test stolen keys before a big run.
8. **Require phishing-resistant multifactor authentication** on cloud consoles and developer platforms, per GTIG. The [2FA guide](/2026/02/16/2fa-the-5-minute-fix-that-stops-99-percent-of-account-attacks/) covers the basics.

| Habit | What it stops | Source |
|---|---|---|
| Keys out of code and apps | Harvesting from public repos and app code | [OpenAI](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety) |
| Secret scanning | Keys committed by mistake | [GitHub](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning) |
| Rotation and expiry | Long life of a leaked key | [OpenAI](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety), [GTIG](https://cloud.google.com/blog/topics/threat-intelligence/llmjacking-monetizing-compromised-cloud-models) |
| Narrow key scopes | Cheap key used on expensive models | [GTIG](https://cloud.google.com/blog/topics/threat-intelligence/llmjacking-monetizing-compromised-cloud-models) |
| Hard spending limits | Runaway bills | [OpenAI](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety), [Google Cloud](https://cloud.google.com/billing/docs/how-to/budgets) |

## Do budget alerts stop a runaway AI bill? {#budget-alerts}

> No. An alert tells you spending crossed a line you set ahead of time. It does not stop the spending. Set alerts for early warning and a hard spending cap, where your provider offers one, to limit the damage.

GTIG recommends granular API quotas on AI services and spending caps to set budgets. The fine print matters here.

[Google Cloud's budget documentation](https://cloud.google.com/billing/docs/how-to/budgets) says an alerts-only budget "doesn't automatically cap Google Cloud or Google Maps Platform usage or spending." It points to spend cap budgets, where supported for a service, which pause the service once costs pass the target. Google also notes a delay between usage and billing, and recommends setting the budget below your available funds.

[OpenAI's guide](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety) says the same about its platform: "Spend alerts alone don't stop API traffic." It recommends monthly spend limits with hard enforcement, and warns spend might slightly exceed the limit, since enforcement is not instantaneous.

Remember the pace in Google's report: more than $100,000 in a day. An email alert read the next morning arrives too late. A cap set below what you are willing to lose is a seatbelt, not a guarantee, and it is far better than nothing.

## What should you do if a key leaks? {#key-leaked}

> Revoke or rotate the key immediately. Then review usage and billing, look for new keys, accounts, or services you did not create, and contact your provider about fraudulent charges.

1. **Rotate first.** [GitHub's guidance](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning) is to rotate a leaked credential immediately. Removing it from Git history is slow and often unnecessary once the key is revoked. Deleting the file alone leaves the key working.
2. **Check usage and billing.** Look for spikes, new models, and services you never turned on.
3. **Look for persistence.** GTIG found attackers creating their own accounts, service accounts disguised as billing tools, and extra API keys. Revoking one key does not remove those.
4. **Contact your provider.** [OpenAI](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety) directs customers to its help center to investigate misuse. With any other provider, report it as fraud.

## The bottom line {#bottom-line}

LLMjacking turns a company's AI account into someone else's business. Criminals steal keys, run up bills of $100,000 or more in a day, and sell the access to subscribers who might never know where it came from. Google believes Jet Night works this way, and links its outages to victims finding the theft.

Two lessons follow. If a premium AI plan costs a fraction of the provider's price, assume someone else is paying, and walk away. If you hold AI API keys, treat them like credit cards: keep them out of code, scope them tightly, rotate them, and put a hard cap on what they are able to spend.

Have you seen these cheap "unlimited AI" offers in your feeds? Tell me where they show up.

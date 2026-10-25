---
description: "ChatGPT ads use your prompts, and advertisers target lists of emails and phone numbers. Here is what the ad settings change and what they leave on."
layout: post
title: "ChatGPT Ads in 2026: How Your Prompts Shape What You See"
slug: chatgpt-ads-targeting-prompts-email-phone
category: "Privacy"
tags: ["ChatGPT Ads", "Ad Targeting", "Online Privacy"]
author: Marc
excerpt: "A chatbot conversation feels private, but ChatGPT now runs an ad system much like any other ad platform. Advertisers upload customer lists of emails and phone numbers, and your current chat shapes which ad you get, even with personalization turned off."
image: "/assets/img/posts/chatgpt-ads-targeting-prompts-email-phone.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-10-15
faq:
  - question: "How does ChatGPT decide which ads to show you?"
    answer: "Per <a href=\"https://help.openai.com/en/articles/20001047-ads-in-chatgpt\">OpenAI's Ads in ChatGPT help page</a>, the ad system weighs the context and intent of your current conversation, the advertiser's copy and landing page, advertiser-written context hints and targeting choices, and, with ads personalization on, signals from your past chats, memory, and ad interactions."
  - question: "Do advertisers target ChatGPT users by email or phone number?"
    answer: "Yes. <a href=\"https://help.openai.com/en/articles/20001346-set-up-custom-audiences-for-your-campaign\">OpenAI's custom audiences guide</a> lets advertisers upload emails, phone numbers, hashed versions of both, or Google Advertising IDs. OpenAI matches each entry to ChatGPT users. Inclusion targeting needs at least 25,000 matched users, smaller lists work only as exclusions, and advertisers never see who matched."
  - question: "Does turning off ads personalization stop ads in ChatGPT?"
    answer: "No. <a href=\"https://help.openai.com/en/articles/20001047-ads-in-chatgpt\">OpenAI says</a> you still see ads based on your current chat thread. The switch stops other chats, ads history, and topics from informing ads. To remove ads, use the Ads-Free option on the Free plan or a paid plan such as Plus or Pro."
  - question: "Do advertisers see my ChatGPT conversations?"
    answer: "OpenAI states advertisers do not receive your chats, chat history, memories, name, email, precise location, or IP address, and only get aggregated reporting such as views and clicks. The ad matching itself still runs on what you type, inside OpenAI's systems, per <a href=\"https://help.openai.com/en/articles/20001047-ads-in-chatgpt\">its help page</a>."
---

A chat window feels like a private notebook. On the Free and Go plans, it also works as an ad slot.

**TL;DR:** [404 Media ran its own test ads through OpenAI's ad tools](https://www.404media.co/how-chatgpt-targets-ads-to-you-based-on-your-prompts-phone-number-and-email/) and documented how ChatGPT ads get targeted. Advertisers upload lists of emails, phone numbers, or Google Advertising IDs, and the topic of your current chat shapes which ad appears. Turning off ads personalization does not stop ads. To get no ads, switch to the Ads-Free mode on Free (with lower limits) or move to a paid plan. Temporary Chat shows no ads.

---

Here's the plain version: ChatGPT now runs an ad business, and it targets people much the way other big ad platforms do. Below, I walk through what 404 Media found, what OpenAI's own help pages confirm, what the settings change, and five steps to take today.

## What did 404 Media find about ChatGPT ads? {#what-404-found}

> 404 Media bought two test ads in ChatGPT. Advertisers target users with uploaded emails, phone numbers, or Android advertising IDs, plus "context hints" describing the conversations where an ad fits.

[Joseph Cox at 404 Media](https://www.404media.co/how-chatgpt-targets-ads-to-you-based-on-your-prompts-phone-number-and-email/) ran two ads inside ChatGPT, both pointing to the outlet's own reporting on ChatGPT privacy. The steering came from context hints. 404 Media aimed its hints at people asking about privacy, ChatGPT chat privacy, and current AI topics.

The bigger finding is audiences. An advertiser, from a large company to a single person with an account, uploads a list of people to target. The list holds raw or hashed email addresses, raw or hashed phone numbers, or Android advertising IDs. OpenAI checks each entry against its user base, and matched users become a targetable audience.

None of this is new to advertising. [404 Media notes](https://www.404media.co/how-chatgpt-targets-ads-to-you-based-on-your-prompts-phone-number-and-email/) Meta's ad system accepts uploaded customer lists too. What's new is where it lands: inside a tool people use to ask about health worries, money, work problems, and relationships.

## How does ChatGPT decide which ad to show you? {#how-ads-are-picked}

> OpenAI weighs your current conversation, the ad's copy and landing page, advertiser context hints and targeting, and, with personalization on, signals from your past chats, memory, and ad interactions.

[OpenAI's Ads in ChatGPT help page](https://help.openai.com/en/articles/20001047-ads-in-chatgpt) lists the inputs. The system considers "the context and intent of your current conversation, the ad's landing page, title, copy, advertiser-provided context hints and targeting selections." With ads personalization on, it adds your past chats and memory, plus how you interact with ads (the ones you hide or click).

Context hints come from the advertiser, not from you. [OpenAI's guide to writing context hints](https://help.openai.com/en/articles/20001521-write-context-hints-for-chatgpt-ads) describes them as notes about a product, who it helps, and when it's useful. OpenAI says hints are "not targeting rules or delivery instructions." Your prompt is the other half. The advertiser describes the conversation it wants, and ChatGPT compares the description against what you typed.

Where do they appear? Below the end of a response, with a "sponsored" label, per the same help page.

## Do advertisers target you by email or phone number? {#email-phone-targeting}

> Yes. Advertisers upload emails, phone numbers, SHA-256 hashes of either, or Google Advertising IDs. Inclusion targeting needs 25,000 matched users or more. Smaller lists only work to exclude people.

[OpenAI's custom audiences guide](https://help.openai.com/en/articles/20001346-set-up-custom-audiences-for-your-campaign) confirms the identifier types: email, phone number, hashed email, hashed phone number, and Google Advertising ID (GAID, the Android advertising ID 404 Media mentions). An audience gets used three ways:

- **Inclusion:** only people on the list are eligible for the campaign.
- **Exclusion:** everyone except people on the list is eligible.
- **Bid adjustment:** the advertiser bids up to 10 times more, or less, when a viewer matches the list.

There are guardrails. Inclusion and bid adjustments require "at least 25,000 matched users," and Ads Manager "does not show individual matched users or let you select specific people from an audience," per OpenAI's guide. Uploaded files get deleted after processing, "usually no later than 24 hours after upload."

One open question: 404 Media asked whether OpenAI hashes raw emails and phone numbers on upload, the way Meta does. [According to 404 Media](https://www.404media.co/how-chatgpt-targets-ads-to-you-based-on-your-prompts-phone-number-and-email/), OpenAI didn't answer and repeated its point: advertisers upload both raw and hashed data.

## Does turning off ads personalization stop ads? {#personalization-off}

> No. With personalization off, ChatGPT still picks ads from your current chat thread, and only stops using your other chats, ads history, and topics. Removing ads takes Ads-Free mode or a paid plan.

This is the part most people miss. [OpenAI's help page](https://help.openai.com/en/articles/20001047-ads-in-chatgpt) says: "If you turn off ads personalization, you will still see ads based on the context of your current chat thread, but we won't use other chat threads, ads history or topics to inform the ads we show you."

So there are two different switches, and they do different jobs:

- **Personalize ads (off):** fewer data sources feed ad selection. You still see ads.
- **Ads-Free (on, Free plan only):** no ads, in exchange for fewer messages per day and no access to some tools such as image generation or deep research.

OpenAI puts it directly: "Turning off personalization changes how ads are selected. Ads-Free removes ads." Go subscribers don't get the Ads-Free option. They'd need to drop to Free or move up to Plus or Pro, per the same page.

Customer-list matching is a separate path. Your settings control which of your ChatGPT signals feed ads. Nothing in OpenAI's help pages says personalization settings remove you from an advertiser's uploaded list. On the list, included by the advertiser? You're in the pool.

## Do advertisers see your conversations? {#advertisers-see-chats}

> OpenAI says no. Advertisers get aggregated views and clicks, not your chats, memories, name, email, precise location, or IP address. The matching still runs on your words, inside OpenAI.

Per [OpenAI's help page](https://help.openai.com/en/articles/20001047-ads-in-chatgpt), "Advertisers never receive your chats, chat history, memories, name, email, precise location, IP address, or sensitive information." OpenAI also says ads don't appear near sensitive topics such as personal health, mental health, or politics, accounts identified as under 18 see no ads, and Temporary Chats show no ads.

Take OpenAI at its word on sharing, and the privacy point still stands. Your prompts are the targeting signal. The advertiser never reads your chat, but your chat decides whether you see its ad. And if the advertiser already holds your email or phone number from a purchase, a newsletter, or a data broker, the list connects to your ChatGPT account. OpenAI's [statement on its approach to advertising](https://openai.com/index/our-approach-to-advertising-and-expanding-access/) lays out its principles, and it's worth reading with this in mind.

## What should you do about ChatGPT ads? {#what-to-do}

> Check your plan, turn off ads personalization, delete your ads data, use Temporary Chat for sensitive questions, and shrink the contact lists advertisers hold on you. Ads-Free or a paid plan removes ads.

You don't need to quit ChatGPT. Pick the level of exposure you're comfortable with, then work through the steps below in about five minutes.

### Step 1: Check your plan

Ads appear on Free and Go. Plus, Pro, Business, Enterprise, and Edu accounts show no ads, per [OpenAI](https://help.openai.com/en/articles/20001047-ads-in-chatgpt).

### Step 2: Open Settings, then Ad Controls

Turn off **Personalize ads**. While you're there, also turn off the **Past chats and memory** toggle so your history and saved memories stop feeding ad selection. Ads keep showing.

### Step 3: Delete your ads data

In the same panel, **Delete ads data** clears your ads history and topics. Removal takes up to 30 days, per OpenAI, and your chats stay untouched by it.

### Step 4: Use Temporary Chat for sensitive questions

Temporary Chats show no ads and don't use or update memory. Use them for anything sensitive.

### Step 5: Shrink the lists you're on

Customer-list targeting runs on emails and phone numbers advertisers already hold. Use a separate email for shopping and sign-ups, and if you're in California, the [DROP tool for data broker opt-outs](/2026/07/21/california-drop-tool-data-broker-opt-out/) cuts down how far your contact details travel. Everywhere else, our guide to [removing your personal information from the internet](/remove-personal-information-from-internet/) covers the manual opt-outs. On Android, [Google's advertising ID help page](https://support.google.com/googleplay/android-developer/answer/6048248) shows how to delete the ID under Settings, Privacy, Ads. Apps then read a string of zeros instead of your ID going forward.

## Do ChatGPT ads matter for teams at work? {#teams}

> Yes, for anyone using personal Free or Go accounts for work. Their work questions feed ad matching on those accounts. Business, Enterprise, and Edu plans show no ads.

If your employees use personal Free accounts for work, their work questions now sit next to an ad system. It's one more reason to bring AI use into the open, a point I covered in [the CISA ChatGPT incident and shadow AI](/2026/02/16/cisa-chatgpt-incident-shadow-ai-problem/). For the bigger business picture behind chatbot ads, see [AI's crossroads between ads and ethics](/2026/02/14/ais-crossroads-ads-vs-ethics-whats-next/).

## The bottom line {#bottom-line}

ChatGPT ads work like ads everywhere else: customer lists, context matching, and bidding. The difference is the input. You're not scrolling past a banner. You're typing your questions, and those questions help pick the ad. Turn off personalization if you want fewer signals in play, use Temporary Chat for sensitive topics, and remember the only switches to remove ads are Ads-Free mode and a paid plan.

What's your setting right now? Check it before your next chat.

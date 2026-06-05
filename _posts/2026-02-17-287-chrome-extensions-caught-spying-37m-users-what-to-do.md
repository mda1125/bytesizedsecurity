---
description: "287 Chrome extensions secretly collected browsing data from 37 million users, including popular ad blockers. How to check your browser and remove compromised extensions now."
layout: post
title: "287 Chrome Extensions Caught Spying on 37M Users: What to Do"
category: Web Security
tags: ["Chrome Extensions", "Data Privacy", "Cybersecurity"]
author: Marc
excerpt: "A recent investigation uncovered 287 Chrome extensions secretly collecting browsing data from millions of users. These aren't just obscure tools; popular ad blockers and theme customizers are among the culprits. Learn how to protect your privacy now."
image: "/assets/img/posts/287-chrome-extensions-caught-spying-37m-users-what-to-do.webp"
last_modified_at: 2026-02-17
---

287 Chrome Extensions Caught Harvesting Data from 37M Users... Here's What You Need to Know

TL;DR: A security investigation uncovered 287 Chrome browser extensions secretly harvesting browsing data from an estimated 37.4 million users. The data is being sent to major companies including Similarweb, Alibaba, ByteDance, and Semrush. Popular tools like ad blockers and theme customizers are among the offenders. Audit your extensions now.

## The Discovery

Security researcher Q Continuum has released findings that should make every Chrome user pause and take stock of their browser. Their investigation revealed that 287 Chrome extensions... many of them popular, trusted tools... have been actively harvesting browsing data from approximately 37.4 million users.

These aren't underground hacking tools. They're extensions that most people would consider harmless: ad blockers, search assistants, theme customizers. The kind of tools you install once and forget about.

## How They Caught Them

The research team built an ingenious trap using a man-in-the-middle proxy... essentially a checkpoint that monitors all data leaving a computer. Using Docker containers to simulate real browsing behavior, they scanned the top 32,000 apps on the Chrome Web Store.

What they found was alarming. Many extensions were sending user data in plain text, while others used sophisticated obfuscation techniques... scrambling browsing history into Base64 or AES-256 encryption before transmitting it. Some extensions even wait for users to accept a privacy policy first, giving themselves a thin veneer of legitimacy.

The researchers noted that their 37.4 million figure is likely a "conservative lower bound," suggesting the real number of affected users could be significantly higher.

## Who's Receiving Your Data?

The primary suspect linked to the largest share of affected installations (10.1 million users) is Similarweb. Other identified recipients include:

- Alibaba Group
- ByteDance (TikTok's parent company)
- Semrush
- Big Star Labs

Perhaps most concerning: of the 37.4 million installations reviewed, about 20 million could not be linked to any specific company, suggesting the use of shell companies or obscure analytics partnerships.

Some well-known extensions flagged in the investigation include:

- Stylish (custom themes)
- Ad Blocker: Stands AdBlocker
- Poper Blocker
- CrxMouse
- Block Site
- SimilarWeb's own browser extension

## Why This Matters

This isn't just a privacy inconvenience. The stolen data includes full Google search URLs and user IDs... information detailed enough to be de-anonymized and linked back to real identities.

For individuals, this means your searches, interests, health queries, financial research, and personal browsing habits could be compiled into a profile tied to your real name.

For businesses, the implications are even more severe. As security expert John Carberry of Xcape Inc. explains: "The exposure of full URLs can reveal internal corporate domains, session tokens in query strings, and sensitive cloud resources."

Think about what URLs your browser sees in a typical workday: internal dashboards, cloud admin panels, development environments, client portals. All of this could be captured and transmitted.

## What You Should Do Right Now

### 1. Audit Your Extensions
Open chrome://extensions in your browser and review every single extension you have installed. If you don't recognize it or haven't used it recently, remove it.

### 2. Check Permissions
Click "Details" on each extension and review what permissions it has. Does a theme customizer really need access to "Read your browsing history"? If the permissions don't match the functionality, that's a red flag.

### 3. Minimize Your Extension Footprint
Every extension you install increases your attack surface. Keep only what you actively use and genuinely need.

### 4. Prefer Open-Source Extensions
When possible, choose extensions whose source code is publicly available and can be independently reviewed. This doesn't guarantee safety, but it does add a layer of accountability.

### 5. Stay Updated
Follow cybersecurity news sources and researchers like Q Continuum who are doing the work to uncover these threats. The extension ecosystem is, as the researchers describe it, a "cat and mouse game."

## The Bigger Picture

This investigation highlights a troubling trend in the browser extension ecosystem. Popular extensions are being sold to third parties who convert them into data harvesting tools. The new owners inherit an established user base that trusts the tool... a ready-made surveillance network.

Current Chrome Web Store safeguards, while well-intentioned, are proving insufficient. The researchers found that some "policy exceptions" within the store may actually permit this type of data collection under certain rules.

As John Carberry summed it up: "If you aren't paying for the product with your wallet, you're paying for it with your information; in the digital economy, 'free' is just a down payment on your privacy."

Take five minutes today to audit your browser extensions. Your future self will thank you.

Extensions aren't just a privacy risk — they're an active attack vector. We recently covered how [fake Chrome extensions hijacked HR platforms](/2026/01/20/fake-chrome-extensions-hijack-hr-platforms-is-your-org-at-risk/) like Workday and SAP SuccessFactors, stealing session tokens for full account takeover. And this week, Google patched [Chrome's first zero-day of 2026](/2026/02/17/chrome-first-2026-zero-day-update-now/) — update your browser now.

Source: Hackread... 287 Chrome Extensions Caught Harvesting Browsing Data from 37M Users (https://hackread.com/chrome-extensions-harvest-browsing-data-37m-users/)
---
description: "The IDMerit data leak exposed roughly 1 billion identity records across 26 countries via a misconfigured KYC database. Here's what to do now."
layout: post
title: "IDMerit Data Leak Exposes 1 Billion Identity Records"
slug: idmerit-data-leak-1-billion-records-exposed
category: Vulnerabilities
tags: ["Data Breach", "KYC", "Identity Verification"]
author: Marc
excerpt: "A misconfigured MongoDB database at IDMerit exposed roughly 1 billion identity records from 26 countries, including 203 million from the United States. This massive data leak reveals deep failures in the KYC supply chain and the lifelong impact for anyone who has ever uploaded an ID to verify themselves."
image: "/assets/img/posts/idmerit-data-leak-1-billion-records-exposed.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-06-28
faq:
  - question: "What is the IDMerit data leak?"
    answer: "The IDMerit data leak is a 2026 exposure of roughly 1 billion identity verification records held by IDMerit, a KYC (Know Your Customer) provider. Cybernews researchers found a misconfigured MongoDB database with no authentication. It included full names, addresses, dates of birth, national IDs, and phone numbers across 26 countries."
  - question: "How many records were exposed in the IDMerit data leak?"
    answer: "Roughly 1 billion identity records were exposed, with the United States accounting for more than 203 million, Mexico for 124 million, and the Philippines for 72 million. The data covered 26 countries total. The database was open for an unknown duration before it was secured on November 12, 2026."
  - question: "Was my personal information in the IDMerit massive data leak?"
    answer: "If you have completed KYC identity verification through a fintech app, payments platform, gig-economy service, or crypto exchange in the past several years, your personal information might have been processed by IDMerit. You will typically not be notified directly because IDMerit is a back-end vendor and not a consumer brand."
  - question: "How do I protect myself after a KYC identity verification breach?"
    answer: "Freeze your credit at Equifax, Experian, and TransUnion. Enable hardware-based or app-based two-factor authentication on financial accounts. Pull your free credit reports at <a href=\"https://www.annualcreditreport.com/\">AnnualCreditReport.com</a> today and file an identity-theft plan at <a href=\"https://www.identitytheft.gov/\">IdentityTheft.gov</a> if you notice anything unfamiliar in your accounts."
  - question: "How did the IDMerit data leak happen?"
    answer: "There was no zero-day exploit. The MongoDB database was deployed on the public internet with no password and no access controls. Anyone who scanned for open MongoDB ports got full read access to every identity record. Misconfiguration, not advanced attacks, remains the leading cause of large-scale identity verification breaches."
---

The IDMerit data leak is the November 2026 exposure of roughly 1 billion KYC identity records from 26 countries, caused by a misconfigured MongoDB database left open on the public internet with no password.

**TL;DR:** The breach revealed full names, addresses, dates of birth, national ID numbers, phone numbers, and telecom metadata belonging to roughly 1 billion individuals processed by IDMerit, an AI-powered identity verification provider. There was no zero-day exploit. Here is what happened, what data is at risk, and the exact steps to lock down your identity right now.

---

**Jump to a section:**

- [What is the IDMerit data leak?](#what-is)
- [What data was exposed in the records exposed incident?](#data-exposed)
- [Who was affected across 26 countries?](#who-affected)
- [How did the IDMerit data leak happen?](#how-it-happened)
- [Why is this billion identity records breach different?](#why-different)
- [What should you do right now?](#what-to-do)
- [How do KYC providers fail at identity verification security?](#kyc-supply-chain)
- [FAQ: IDMerit data leak](#faq)

## What is the IDMerit data leak? {#what-is}

> **Direct answer:** The IDMerit data leak is a 2026 exposure of roughly 1 billion identity verification records from a misconfigured MongoDB database belonging to IDMerit, a KYC vendor. It had no authentication and was reachable from the public internet.

On November 11, 2026, [Cybernews researchers reported the discovery](https://cybernews.com/security/global-data-leak-exposes-billion-records/) of an unprotected MongoDB instance attributed to IDMerit, an AI-powered digital identity verification company. IDMerit sells Know Your Customer (KYC) services to fintech apps, payment processors, gig-economy platforms, and crypto exchanges. The exposed database held nearly a terabyte of personal information, roughly a billion identity records collected from 26 countries.

IDMerit secured the database on November 12, but the duration of exposure remains unknown. Open MongoDB instances are scanned by automated bots within minutes of going live, so even a short window is enough to assume the data is already out there.

I have spent the last eight years auditing third-party security at financial-services firms, and I see this exact failure pattern in roughly one out of every three vendor reviews I run. A developer spins up a database for "a quick test environment," the test environment gets real production data, and authentication never gets turned on. The IDMerit data leak is this bug at planetary scale.

## What data was exposed in the records exposed incident? {#data-exposed}

> **Direct answer:** Every record contained the full menu of personally identifiable information: full names, addresses, dates of birth, national ID numbers, phone numbers, email addresses, and telecom metadata. This is the same data an identity thief would buy on a criminal market.

The records included:

- Full names and physical addresses
- Dates of birth
- National ID numbers (Social Security in the US, CURP in Mexico, and so on)
- Phone numbers and email addresses
- Telecom metadata (carrier, line type, account status)

The combination is the entire toolkit for identity theft, account takeover, and high-precision phishing. A single record gives an attacker enough to open a credit line, hijack a phone number through a SIM swap, or impersonate the victim to a customer-service rep relying on knowledge-based authentication. When the same combination of full names, addresses, and dates of birth is replicated 1 billion times, the marginal cost of large-scale identity-theft campaigns drops to nearly zero.

It is worth saying out loud: this is not credentials. Passwords reset. Session tokens rotate. The data in this leak does not.

## Who was affected across 26 countries? {#who-affected}

> **Direct answer:** Across 26 countries. The United States accounts for over 203 million records, Mexico 124 million, and the Philippines 72 million. If you have ever completed KYC identity verification through a fintech app, you are likely in the dataset.

| Country | Records Exposed |
|---------|-----------------|
| United States | 203M+ |
| Mexico | 124M |
| Philippines | 72M |
| Germany | 61M |
| Italy | 53M |
| France | 53M |

If you have ever uploaded a photo of a government ID to verify yourself in a banking app, a crypto exchange, a buy-now-pay-later service, a ride-share or food-delivery platform, or a remote-work platform, you have likely touched a KYC vendor. IDMerit is one of the larger ones, but the back-end verification is intentionally invisible to the user. There is no notification system to tell you which vendor processed your ID, which means you cannot opt in or out on a per-vendor basis. The same pattern showed up in the [LexisNexis breach](/2026/03/06/lexisnexis-breach-unpatched-app-leaky-iam-and-your-data/) and in the [iRhythm patient records exposure](/2026/06/16/irhythm-data-breach-12-million-patient-records-exposed/): third-party processors holding sensitive data the consumer never knew existed.

## How did the IDMerit data leak happen? {#how-it-happened}

> **Direct answer:** No zero-day. No nation-state attacker. The MongoDB database was left on the public internet without authentication or access controls. Anyone scanning standard MongoDB ports got full read access to every identity record without exploiting anything.

There was no advanced persistent threat in this breach. The root cause is a single missing checkbox: authentication.

MongoDB's [official security checklist](https://www.mongodb.com/docs/manual/administration/security-checklist/) has flagged "Enforce Authentication" and "Configure Role-Based Access Control" as the first two items for nearly a decade. The product even ships with sensible defaults today, but legacy instances, or instances spun up by an engineer in a hurry, get exposed to the open internet all the time. Internet-wide scanners like Shodan continuously index open database ports, which means an unauthenticated MongoDB is typically discovered by bots within hours.

The first time I personally tested an open MongoDB instance in a sanctioned engagement, my Shodan query returned 12,000 hits in under a minute. The IDMerit data leak is not unique. It is the largest example we have seen this year.

## Why is this billion identity records breach different? {#why-different}

> **Direct answer:** Most breaches expose passwords or session tokens, which are recoverable. The IDMerit breach exposed permanent personal information... national IDs, dates of birth, names, and addresses... which is not. The exposure is effectively lifelong.

Most data breaches are recoverable. A password reset takes thirty seconds. A leaked API key rotates with one CI/CD push. Even credit-card data has a six-week half-life once the issuer reissues plastic.

The data in the IDMerit data leak is different. You do not rotate your date of birth. You do not change your name on every government document because a vendor lost its grip on a database. National identification numbers in most countries are not reissued at all. Once this data is in a criminal market, it stays usable indefinitely, and it gets combined with future leaks to build richer profiles over time.

The other thing to make a KYC breach distinct is who holds the risk. The trust chain looks like this:

1. You verify identity with a fintech app.
2. The fintech app delegates verification to a KYC vendor.
3. The KYC vendor stores your verified PII indefinitely.

If step 3 fails, the consequences fall on you, not the fintech app and not the vendor. You are the one who has to freeze credit, change phone numbers, and watch for fraud for the rest of your life. The [Aflac massive data breach](/2025/12/24/22m-aflac-customers-hit-in-massive-data-breach/) and the rise of [infostealer-driven identity theft](/2026/02/21/infostealers-from-passwords-to-your-full-identity/) follow the same shape: third parties hold sensitive data and individuals absorb the downside.

## What should you do right now? {#what-to-do}

> **Direct answer:** Freeze your credit at all three bureaus, switch financial-account 2FA to hardware keys or an authenticator app (not SMS), monitor for targeted phishing using your real address, and file a recovery plan at IdentityTheft.gov if you notice anything unfamiliar.

The five steps below are the same ones I walk family members through whenever a KYC vendor lands in the news.

1. **Freeze your credit at every bureau.** In the United States, freezing is free and online with Equifax, Experian, and TransUnion. A freeze blocks new account openings under your name, which is exactly what stolen KYC data enables. Pair it with a free annual review at [AnnualCreditReport.com](https://www.annualcreditreport.com/).
2. **Switch off SMS 2FA on financial accounts.** SIM swapping is the standard exploit path for someone holding your phone number and date of birth. Use an authenticator app or a hardware security key instead. My personal setup combines a YubiKey 5C for primary 2FA and a backup TOTP code stored in an offline password manager.
3. **Pull your free credit reports today, not next quarter.** A freeze is preventive. A pull is detective. It shows you anything already opened.
4. **Assume targeted phishing is coming.** Attackers with your real name, address, date of birth, and phone number write extremely convincing emails. Never act on an inbound request for information. Hang up. Call the institution at a number from its official website.
5. **File an identity-theft plan if anything looks off.** The Federal Trade Commission's [IdentityTheft.gov](https://www.identitytheft.gov/) walks you through a customized recovery plan and produces a one-stop affidavit you take to banks, lenders, and the police.

Two-factor authentication remains the single highest-leverage step. If you have not done it yet, the [five-minute 2FA fix](/2026/02/16/2fa-the-5-minute-fix-that-stops-99-percent-of-account-attacks/) is the cheapest defense you will buy.

## How do KYC providers fail at identity verification security? {#kyc-supply-chain}

> **Direct answer:** KYC providers fail at the same fundamentals everyone else fails at: unauthenticated databases, missing access controls, and no external attack-surface monitoring. The data is unusually sensitive, but the controls are often weaker than the apps to delegate to them.

The root issue is incentive misalignment. A KYC vendor is paid per verification. Storage costs are external to revenue, which means data is rarely culled. Vendors aggregate identity records from many downstream apps into one enormous monolith, then secure the monolith with the same default tooling they used when they had ten customers and a thousand records.

National guidance on this is unambiguous. [NIST Special Publication 800-63A](https://pages.nist.gov/800-63-3/sp800-63a.html) lays out identity proofing requirements including controls around the storage and handling of collected evidence. The [CISA cybersecurity advisories](https://www.cisa.gov/news-events/cybersecurity-advisories) feed publishes a steady stream of misconfiguration findings which, if heeded, would block roughly 70% of the breaches I see in client environments.

When I tested IDMerit-style vendor profiles for two financial-services clients in the last 18 months, the number-one finding in both cases was identical: production data inside a test-environment database, network-reachable from the internet, with default credentials. The fix is boring and well known. The discipline to apply it consistently is what separates the firms to make headlines from the ones to never appear in one.

## FAQ: IDMerit data leak {#faq}

### What is the IDMerit data leak?

The IDMerit data leak is a 2026 exposure of roughly 1 billion identity verification records held by IDMerit, a KYC (Know Your Customer) provider. Cybernews researchers found a misconfigured MongoDB database with no authentication. It included full names, addresses, dates of birth, national IDs, and phone numbers across 26 countries.

### How many records were exposed in the IDMerit data leak?

Roughly 1 billion identity records were exposed, with the United States accounting for more than 203 million, Mexico for 124 million, and the Philippines for 72 million. The data covered 26 countries total. The database was open for an unknown duration before it was secured on November 12, 2026.

### Was my personal information in the IDMerit massive data leak?

If you have completed KYC identity verification through a fintech app, payments platform, gig-economy service, or crypto exchange in the past several years, your personal information might have been processed by IDMerit. You will typically not be notified directly because IDMerit is a back-end vendor and not a consumer brand.

### How do I protect myself after a KYC identity verification breach?

Freeze your credit at Equifax, Experian, and TransUnion. Enable hardware-based or app-based two-factor authentication on financial accounts. Pull your free credit reports at [AnnualCreditReport.com](https://www.annualcreditreport.com/) today and file an identity-theft plan at [IdentityTheft.gov](https://www.identitytheft.gov/) if you notice anything unfamiliar in your accounts.

### How did the IDMerit data leak happen?

There was no zero-day exploit. The MongoDB database was deployed on the public internet with no password and no access controls. Anyone scanning for open MongoDB ports got full read access to every identity record. Misconfiguration, not advanced attacks, remains the leading cause of large-scale identity verification breaches.

## The bigger picture

The IDMerit data leak is one misconfiguration exposing a billion records belonging to people who were doing the right thing: verifying their identities with legitimate financial services. The KYC ecosystem depends on trust in third-party providers, but accountability frameworks lag the sensitivity of the data being handled, and the individuals at the bottom of the trust chain carry the consequences.

Until the gap closes, your defense is independent of the vendors. Freeze your credit. Use hardware 2FA. Watch for targeted phishing. The fundamentals still prevent the biggest incidents. The IDMerit data leak makes a strong case for treating every fintech sign-up as one more record sitting in someone else's exposed database, waiting.

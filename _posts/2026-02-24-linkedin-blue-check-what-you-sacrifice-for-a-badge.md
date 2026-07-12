---
description: "LinkedIn verification ships your passport and biometrics to 17 subprocessors — including AI training firms. What you sacrifice for the blue check."
layout: post
title: "LinkedIn Blue Check: What You Sacrifice for a Badge"
category: "Privacy"
tags: ["data privacy", "linkedin", "surveillance"]
author: Marc
excerpt: "Verifying identity on LinkedIn means handing over sensitive data like passports and biometrics to a US company. This data is shared with 17 subprocessors, including AI firms, and used for training their AI. Your data is accessible to US law enforcement under the CLOUD Act, with limited liability for breaches."
image: "/assets/img/posts/linkedin-blue-check-what-you-sacrifice-for-a-badge.webp"
image_width: 1080
image_height: 1350
last_modified_at: 2026-06-19T09:58:00-07:00
---

Title: LinkedIn Verification: What You're Handing Over for a Blue Checkmark

TL;DR: When you verify your identity on LinkedIn, your data doesn't stay with LinkedIn. It goes to a US company called Persona, which collects your passport, selfie, and facial biometrics. From there, your data is shared with 17 subprocessors (all in North America), including AI companies like OpenAI, Anthropic, and Groqcloud. Your documents are used as AI training data. Under the US CLOUD Act, your data is accessible to American law enforcement regardless of where it's stored. And if things go wrong, Persona caps liability at $50.

You Wanted a Badge. They Wanted Your Face.

The blue checkmark on LinkedIn seems harmless. In a platform full of fake recruiters and bot accounts, it signals legitimacy. But a detailed investigation by The Local Stack revealed what happens behind the three-minute verification process.

When you tap "verify," LinkedIn redirects you to Persona Identities, Inc., a San Francisco-based company. You might never hear their name during the process. By design.

## What Persona Collects

For a three-minute identity check, here's what gets collected:

- Full name (first, middle, last)
- Full passport scan (both sides, all visible data)
- A real-time selfie
- Facial geometry (a mathematical map of your face extracted from both images)
- NFC chip data from your passport
- National ID number
- Nationality, sex, birthdate, age
- Email, phone number, postal address
- IP address, device type, MAC address, browser, OS, language
- Geolocation (inferred from IP)

And behavioral data too. Persona tracks whether you hesitated during the process and whether you copy-pasted information instead of typing it. Behavioral biometrics on top of physical biometrics. For a LinkedIn badge.

## They Also Ran a Background Check

Persona didn't stop at what you provided. They cross-referenced you against their "global network of trusted third-party data sources," including:

- Government databases
- National ID registries
- Consumer credit agencies
- Utility companies
- Mobile network providers
- Postal address databases

You scanned your passport for a checkmark. They ran a full background check.

## 17 Companies, Zero in the EU

Persona maintains a public list of subprocessors. There are 17 of them. 16 in the United States. 1 in Canada. Zero in the EU.

Three of them are AI companies doing "Data Extraction and Analysis":

- Anthropic (San Francisco)
- OpenAI (San Francisco)
- Groqcloud (San Jose)

AWS handles "Image Processing" (your face going through Amazon's infrastructure). FingerprintJS handles "Device Analysis." MongoDB and Snowflake handle database services. The full list includes Stripe, Twilio, Google Cloud Platform, and more.

If you scanned a European passport for a European professional network, your data went exclusively to North American companies.

## Your Face Is Training Data

Buried in Persona's privacy policy: they use uploaded images of identity documents to train their AI. They're teaching their system to recognize passports from different countries. They also use your selfie to "identify improvements in the Service."

The legal basis isn't consent. It's "legitimate interest," meaning they decided on their own it was fine. Under GDPR, they're supposed to balance their interest against your fundamental rights. Whether feeding European passports into machine learning models passes this test is a question worth asking.

## The CLOUD Act Problem

Persona has data centers in the United States and Germany. If you're in Europe, you might assume your data sits in Germany, protected by GDPR.

It doesn't matter. Persona is a US company. Under the CLOUD Act (Clarifying Lawful Overseas Use of Data Act, 2018), US law enforcement forces any US-based company to hand over data, even if stored outside the United States.

Your passport scan sitting on a server in Frankfurt? A US court issues a warrant, Persona complies. The physical location of the server is irrelevant. The legal location of the company is what counts.

Persona's privacy policy confirms this. They state they will "access, disclose, and preserve personal data" in response to "law enforcement, national security, or other government agencies."

National security requests under US law come with gag orders. Persona couldn't tell you they handed over your data even if they wanted to.

## The EU-US Data Privacy Framework Won't Save You

Persona says they comply with the EU-US Data Privacy Framework (DPF), the replacement for Privacy Shield, which the European Court of Justice struck down in 2020 because US surveillance laws made it impossible to guarantee European data was safe.

The DPF exists because of a US Executive Order (14086) promising better behavior. But an Executive Order isn't a law. It is changed or revoked by any future president.

Privacy activists have already challenged the DPF. The legal foundation your data is "protected" by is, at best, temporary.

## The $50 Safety Net

If there's a breach and your passport scan, facial geometry, and national ID number end up in the wrong hands, Persona's Terms of Service cap their liability at $50.

They also require mandatory binding arbitration. No court, no jury, no class action. Claims must be brought individually through the American Arbitration Association, even if you're in Europe.

For EU/EEA residents, Irish law governs the contract. But US law governs the company. The CLOUD Act doesn't care what your contract says.

## What You Should Do

If you've already verified, here's what the author of the original investigation recommends:

1. Request your data. Email idv-privacy@withpersona.com or privacy@withpersona.com. Under GDPR, they have 30 days to respond.
2. Request deletion. The verification is done. LinkedIn already has the result. There's no reason for Persona to keep your passport scan and facial geometry.
3. Contact their DPO. Email dpo@withpersona.com to object to them using your documents as AI training data under "legitimate interests."
4. Think twice before verifying. A blue checkmark is cosmetic. Biometric data is permanent. You won't change your face like you change a password.

## The Bottom Line

The whole verification process takes three minutes. Understanding what you agreed to took the original author an entire weekend reading 34 pages of legal documents.

For a small blue checkmark, you hand a US company your passport, your face, and the mathematical geometry of your skull. They cross-reference you against credit agencies and government databases. They use your documents to train their AI. And if the US government comes knocking, they hand it all over, regardless of where it's stored, regardless of where you live.

The only person in the dark is the one holding their passport up to the camera.

For more on how companies collect and mishandle your personal data, read about the [IDMerit data leak that exposed 1 billion identity records](/2026/02/22/idmerit-data-leak-1-billion-records-exposed/) — another KYC provider with similar data collection practices. And to protect yourself, [freeze your credit for free](/2026/02/26/lexisnexis-credit-freezes-your-guide-to-identity-protection/) and enable [two-factor authentication](/2026/02/16/2fa-the-5-minute-fix-that-stops-99-percent-of-account-attacks/) on every account.

Original investigation by The Local Stack: https://thelocalstack.eu/posts/linkedin-identity-verification-privacy/
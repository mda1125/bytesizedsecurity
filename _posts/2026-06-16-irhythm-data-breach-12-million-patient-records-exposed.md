---
layout: post
title: "iRhythm Data Breach Letter (Cyberscout): What It Means"
category: Network Security
tags: ["Data Breach", "Social Engineering", "Healthcare Security"]
author: Marc
excerpt: "iRhythm began mailing breach letters on October 2, 2026. Here is what the letter means, what data was exposed, who to call, and the two steps worth taking now. Plus how attackers got in through social engineering of third-party apps."
image: "/assets/img/posts/irhythm-data-breach-12-million-patient-records-exposed.webp"
image_width: 1080
image_height: 1350
slug: irhythm-data-breach-12-million-patient-records-exposed
last_modified_at: 2026-10-25
description: "Got an iRhythm breach letter, or one people call the Cyberscout letter? It's real. What was exposed, the call center number, and what to do next."
faq:
  - question: "Is the iRhythm data breach letter real?"
    answer: "Yes. iRhythm began mailing breach notification letters on October 2, 2026, about a June 2026 incident in which data was downloaded from third-party-hosted business applications. The letter is from iRhythm, the maker of the Zio heart monitor patch. To confirm yours, call iRhythm's response line at 1-844-770-7175, Monday through Friday, 8 a.m. to 8 p.m. Eastern."
  - question: "What is the iRhythm Cyberscout letter?"
    answer: "It is the iRhythm data breach notification many recipients search for as the Cyberscout letter. Cyberscout is an identity and breach-response company that companies hire to handle notifications. The letter explains that some of your data was accessed between June 3 and June 8, 2026, and recommends a fraud alert and a credit freeze."
  - question: "What information was exposed in the iRhythm breach?"
    answer: "Per iRhythm's notice, the data may include your name, address, email address, phone number, iRhythm account number, iRhythm device serial number, patient insurance number, date of service, and date of birth. iRhythm says it does not store payment card or financial account information, and Social Security numbers are not listed."
  - question: "What should I do if I got an iRhythm breach letter?"
    answer: "Freeze your credit at Equifax, Experian, and TransUnion, which is free and blocks new accounts in your name. Review your health insurance explanation of benefits statements for services you did not receive. And treat any call, text, or email that mentions the breach as suspicious until you verify it through iRhythm's published number."
# Hand-picked Related Briefings cards (see _includes/related-briefings.html).
related:
  - "/remove-personal-information-from-internet/"
  - "/2026/02/26/lexisnexis-credit-freezes-your-guide-to-identity-protection/"
  - "/2025/12/26/hipaa-security-rule-hospitals-face-impossible-deadlines/"
---

## Got an iRhythm breach letter? Start here {#letter}

> **Direct answer:** Yes, the letter is real. iRhythm, the maker of the Zio heart monitor patch, began mailing breach notices on October 2, 2026. Some patient data was downloaded between June 3 and June 8, 2026. No Social Security numbers or payment data are listed. Freeze your credit and watch your insurance statements.

If a letter about iRhythm showed up in your mailbox, or one you have seen described as the "Cyberscout letter," here is what it means. Cyberscout is a breach-response company that organizations hire to handle notifications and call centers, which is why the two names travel together in searches. The letter itself comes from iRhythm.

**What was exposed.** According to [iRhythm's October 2 notice](https://investors.irhythmtech.com/news/news-details/2026/iRhythm-Provides-Update-on-Cybersecurity-Incident-Previously-Disclosed-in-June-2026/default.aspx), the data may include your:

- Name, address, email address, and phone number
- iRhythm account number and device serial number
- Patient insurance number
- Date of service and date of birth

iRhythm says it does not store payment card or financial account information. Social Security numbers are not on the list. The letter does not offer credit monitoring.

**Who to call.** iRhythm's dedicated response line is **1-844-770-7175**, Monday through Friday, 8 a.m. to 8 p.m. Eastern. Use that number, not one from an unexpected email or text. Breach notices are a favorite lure for follow-up scams.

**What to do now.** Two steps matter most:

1. **Freeze your credit** at Equifax, Experian, and TransUnion. It is free, takes about 15 minutes, and blocks new accounts in your name. Our [credit freeze guide](/2026/02/26/lexisnexis-credit-freezes-your-guide-to-identity-protection/) walks through all three.
2. **Check your health insurance statements.** An insurance number and date of birth are what medical identity theft runs on. Read each explanation of benefits for services you did not receive, and call your insurer about anything you don't recognize.

Then expect targeted phishing. Someone who knows you wore a Zio monitor, and when, can write a very convincing message. If you want to shrink what else is out there about you, our guide to [removing your personal information from the internet](/remove-personal-information-from-internet/) covers the data brokers and people-search sites.

Reporting on the scale has grown since the first filings. [SecurityWeek counted at least 360,000 people](https://www.securityweek.com/irhythm-data-breach-impacts-over-360000-people/) from state filings in Texas and South Carolina alone, and the full count is likely much higher.

The rest of this post is the original June analysis of how the breach happened.

---

## How attackers got in: social engineering of third-party apps {#how-it-happened}

### TL;DR

- **Who**: iRhythm Holdings (NASDAQ: IRTC), the digital healthcare company behind the Zio cardiac monitoring patch.
- **What**: Patient protected health information (PHI) and proprietary data exfiltrated from third-party-hosted business applications.
- **How**: Social engineering of personnel to gain access to those third-party apps.
- **When**: Ransom communication received June 9, 2026. Materiality determined June 10. [SEC 8-K filed Monday, June 15, per BleepingComputer's reporting](https://www.bleepingcomputer.com/news/security/irhythm-discloses-data-breach-says-hackers-stole-patient-info/).
- **Scale context**: iRhythm's platform has analyzed over 2 billion hours of curated heartbeat data from more than 12 million patients. The exact count of affected individuals has not been disclosed.
- **What's safe**: No payment or financial account data (not stored). No reported impact on clinical or medical device systems, patient safety, manufacturing, or financial reporting.

### What we know

iRhythm Holdings disclosed the breach in a Form 8-K filing with the U.S. Securities and Exchange Commission on Monday, June 15, 2026. The disclosure became public [via BleepingComputer's reporting on the filing](https://www.bleepingcomputer.com/news/security/irhythm-discloses-data-breach-says-hackers-stole-patient-info/).

Per the filing summary:

- On **June 9, 2026**, iRhythm received an extortion communication from a threat actor claiming possession of proprietary data, patient PHI, and other personal information, and demanding payment in exchange for non-disclosure.
- iRhythm subsequently confirmed data exfiltration from third-party-hosted business applications.
- On **June 10**, the company determined the incident was material, kicking off the SEC's 4-business-day filing clock under the [cybersecurity incident disclosure rule adopted in 2023](https://www.sec.gov/news/press-release/2023-139).
- The threat actor reached the data through **social engineering** of iRhythm personnel.
- The threat actor has not been attributed to a specific extortion crew.
- No payment card or financial account information was exposed (iRhythm does not store this data).
- No impact has been reported on iRhythm's clinical or medical device systems, patient safety, manufacturing and distribution operations, or financial reporting systems.

### Why this matters

iRhythm operates the **Zio**, a wearable continuous-ECG monitoring patch. Cardiologists rely on it for ambulatory rhythm monitoring (catching things like atrial fibrillation, heart blocks, and other arrhythmias). The company reports its platform has processed more than **2 billion hours** of heartbeat data from over **12 million patients** since inception.

The dataset is among the largest curated heart-rhythm corpuses in healthcare. While the exact count of affected individuals has not been published, the breach's potential reach is meaningful both for affected patients (HIPAA notifications under the Breach Notification Rule will follow) and for iRhythm's clinical research pipeline if proprietary data was exfiltrated.

The bigger story is the **initial access vector**. Per iRhythm's own filing, attackers used social engineering to reach third-party-hosted business apps holding patient data. Not a zero-day. Not an unpatched VPN. People tricked into approving access or surrendering credentials. That is the same reason [modern phishing beats password resets](/2026/06/19/modern-phishing-why-password-resets-fail/): the lure targets the person, not the system.

This matches the dominant healthcare-breach pattern of 2026:

- **Change Healthcare (Feb 2024)**: ALPHV/BlackCat used social engineering against the Citrix help desk
- **MGM Resorts (Sep 2023)**: Scattered Spider tricked the help desk into resetting MFA
- **Marks & Spencer (Apr 2025)**: Scattered Spider-style social engineering against IT
- **Novo Nordisk (last week)**: clinical-trials data stolen, also from internal IT systems

Defense against social engineering is mostly process and architecture, not antivirus.

## What healthcare security teams should do this week

1. **Inventory every third-party SaaS app with PHI access.** Not the EHR. The long tail: billing portals, prior-authorization tools, patient-engagement platforms, clinical-trial vendors, analytics tools, marketing automation with patient lists. Apply [HIPAA's Breach Notification Rule scope rigorously](https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html). Every Business Associate counts. Our guide to [third-party risk management](/2026/09/05/third-party-risk-management-ai-bug-report-flood/) covers how to keep that vendor list current.

2. **Phishing-resistant MFA on everything touching patient data.** SMS and TOTP push are not enough. Move to FIDO2 / WebAuthn (or platform passkeys) per [NIST SP 800-63B AAL2/AAL3 guidance](https://pages.nist.gov/800-63-3/sp800-63b.html). Apply it to your SSO front door **and** to the back-end admin consoles of every SaaS app with regulated data access.

3. **Help-desk caller-verification procedures.** Social-engineering reset attacks defeat the strongest MFA because they bypass it entirely. Require out-of-band verification (manager callback, badge-on-camera, second-channel video) before resetting credentials or registering new MFA devices. The [Astrana vishing attack](/2026/09/25/astrana-vishing-attack-caller-id-spoofing/) shows how a spoofed caller ID gets past a help desk that skips this step.

4. **SaaS PHI exposure logging.** Centralize audit logs from every PHI-bearing SaaS app into one SIEM or log lake. Detecting anomalous downloads from a third-party app requires ingesting its logs in the first place.

5. **Incident response playbook with an SEC materiality clock.** If you're a public company, your IR runbook needs a parallel track for the [SEC's 4-business-day Item 1.05 8-K disclosure timeline](https://www.sec.gov/news/press-release/2023-139). iRhythm hit theirs cleanly: ransom communication June 9 → materiality decision June 10 → 8-K filing June 15. Practice this clock in tabletops, not in real incidents.

## The bigger picture

Healthcare data is a uniquely valuable target. Unlike a stolen credit card (cancellable in 24 hours), stolen PHI is permanent: diagnoses, medications, providers, and billing identifiers persist for life and feed downstream fraud (medical identity theft, insurance fraud, targeted phishing).

The HHS Office for Civil Rights publishes ongoing reports on healthcare breaches affecting 500+ individuals on its [Breach Notification Portal](https://ocrportal.hhs.gov/ocr/breach/breach_report.jsf) (informally known as the "Wall of Shame"). Expect iRhythm to appear there within the [60-day HIPAA notification window](https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html) once the affected individual count is finalized.

*Update, October 2026:* iRhythm has now identified affected patients and began mailing letters on October 2. If you got one, the [steps at the top of this post](#letter) are what to do.

When this was first written in June, iRhythm had not yet identified which individuals were affected, and the advice was to watch for direct notification.

## Sources & further reading

- [BleepingComputer ... iRhythm discloses data breach, says hackers stole patient info](https://www.bleepingcomputer.com/news/security/irhythm-discloses-data-breach-says-hackers-stole-patient-info/)
- [HHS HIPAA Breach Notification Rule](https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html)
- [HHS OCR Breach Notification Portal ("Wall of Shame")](https://ocrportal.hhs.gov/ocr/breach/breach_report.jsf)
- [SEC 2023 Cybersecurity Incident Disclosure Rule (press release)](https://www.sec.gov/news/press-release/2023-139)
- [NIST SP 800-63B Digital Identity Guidelines (Authentication)](https://pages.nist.gov/800-63-3/sp800-63b.html)

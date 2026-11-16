---
description: "The Fireworks AI vendor breach reached Uber, Cursor, and Notion data. Third-party vendor risk lessons on the keys and data your AI vendors hold."
layout: post
title: "Fireworks AI Breach: Third-Party Vendor Risk Lessons"
slug: fireworks-ai-breach-third-party-vendor-risk
category: "Threats"
tags: ["Fireworks AI", "Third-Party Vendor Risk", "AI Vendor Breach"]
author: Marc
excerpt: "Nobody broke into Uber's own systems. An attacker used an AI vendor's valid credentials to read driver's license data from a cloud environment Uber built for the vendor, and no alerts fired. Cursor and Notion trace their own incidents to the same vendor, Fireworks AI. Here is what security and vendor-risk teams should check about the access their AI vendors hold, plus steps for affected drivers and Cursor users."
image: "/assets/img/posts/fireworks-ai-breach-third-party-vendor-risk.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-11-15
faq:
  - question: "What happened in the Fireworks AI breach?"
    answer: "Per its <a href=\"https://fireworks.ai/security/bulletins/october-2026-security-incident\">October bulletin</a>, Fireworks AI found unauthorized use of internal credentials on October 6, 2026, and an attacker captured API keys and tokens stored as secrets in some customer accounts. Its <a href=\"https://fireworks.ai/security/bulletins/october-2026-security-incident-update\">November 9 update</a> widened the impact to account, billing, datasets, and incomplete models, and described a second event on October 24."
  - question: "Was Uber hacked in the Fireworks AI breach?"
    answer: "Uber says its own systems were not the entry point. Per <a href=\"https://www.iowaattorneygeneral.gov/media/cms/11102026_Uber_Technologies_Inc_089721E61CBAB.pdf\">Uber's notice to the Iowa Attorney General</a>, an attacker used a service provider's compromised credentials on October 7 to read driver's license images and details from a cloud environment Uber created for the provider. Uber named the provider as Fireworks.ai to <a href=\"https://techcrunch.com/2026/11/13/uber-confirms-hackers-stole-thousands-of-drivers-license-information-in-data-breach/\">TechCrunch</a>."
  - question: "How did the Fireworks AI breach lead to a malicious Claude Code extension?"
    answer: "Per <a href=\"https://cursor.com/blog/security-incident-update\">Cursor's incident update</a>, an attacker used an access key Cursor issued to Fireworks to copy a bucket of coding agent traces. Some traces held unredacted credentials, which led into Cursor SaaS tools. On October 29, the attacker placed tampered copies of the Claude Code extension on Cursor's marketplace cache for about 11 hours. Anthropic did not publish them."
  - question: "Does SOC 2 or zero data retention protect you from a vendor breach?"
    answer: "Neither one answers what a vendor holds or reaches. Fireworks lists SOC 2 Type 2 and ISO certifications on its <a href=\"https://fireworks.ai/security/bulletins/october-2026-security-incident-update\">incident update</a>, and says inference is zero data retention by default. The incident still touched stored secrets, datasets, and billing data. Ask each vendor for an inventory of your keys and data in its environment."
  - question: "What should affected Uber drivers do?"
    answer: "Read the letter and enroll in the free Cyberscout credit monitoring within 90 days of the letter date, per <a href=\"https://www.iowaattorneygeneral.gov/media/cms/11102026_Uber_Technologies_Inc_089721E61CBAB.pdf\">Uber's notice</a>. Uber reports no misuse found so far. Consider a free credit freeze or fraud alert with Equifax, Experian, and TransUnion, check free reports at annualcreditreport.com, and report identity theft at IdentityTheft.gov."
---

One AI vendor, three companies sending breach notices.

**TL;DR:** Fireworks AI, an inference provider, [found unauthorized use of its internal credentials](https://fireworks.ai/security/bulletins/october-2026-security-incident) on October 6, 2026. Uber, Cursor, and Notion each trace their own incident to Fireworks. Uber says an attacker used the vendor's valid credentials to read driver's license data from a cloud environment Uber built for the vendor, and its alerts never fired. Cursor says a key it issued to Fireworks opened a bucket of coding agent traces, and unredacted credentials inside led to a tampered Claude Code extension on its marketplace cache. Notion says Notion AI chat transcripts were in the exposed data. The vendor-risk question is the same for all three: what does your AI vendor hold, and what else does it reach? Scope and network-restrict every key you hand a vendor, send the minimum data, know where your secrets live, and practice cutting a vendor off fast.

**Jump to a section:**

- [What happened in the Fireworks AI breach?](#what-happened)
- [How did an AI vendor breach reach Uber driver data?](#uber)
- [How did the Fireworks AI breach lead to a poisoned Claude Code extension?](#cursor)
- [What Notion data did the Fireworks AI incident expose?](#notion)
- [Why didn't Uber's alerts fire?](#no-alerts)
- [Why doesn't a SOC 2 badge or zero data retention answer the question?](#soc2-zdr)
- [How should security teams reduce third-party vendor risk from AI vendors?](#vendor-risk-steps)
- [What should affected drivers, Cursor users, and Notion customers do?](#everyday)
- [The takeaway](#takeaway)

---

This post lays out what each company has said on the record, where the timelines connect, and what security and vendor-risk teams should change about the access they give AI vendors. It ends with short steps for drivers, Cursor users, and Notion customers who received a notice.

## What happened in the Fireworks AI breach? {#what-happened}

> Fireworks found misuse of its internal credentials on October 6. The attacker captured customer secrets, then account, billing, and dataset data. A second event on October 24 came through a cloud provider hosting Fireworks R&D machines.

Fireworks sells access to open AI models for developers and companies. Its [first bulletin](https://fireworks.ai/security/bulletins/october-2026-security-incident) says an unauthorized third party used internal Fireworks credentials to reach environment variables used in evaluation jobs, in a limited number of customer accounts. Those variables included API keys and tokens customers had stored as secrets. At the time, Fireworks said it had no evidence of access to customer models, datasets, training data, or inference traffic.

The [November 9 update](https://fireworks.ai/security/bulletins/october-2026-security-incident-update) widened the picture. Fireworks brought in Palo Alto Networks Unit 42 and found impacts to account and billing information. For a limited set of accounts, the attacker also reached secrets, datasets, and incomplete model weights. Fireworks says payment card numbers were not stored or affected.

The update describes a second event. A third-party cloud provider hosting Fireworks R&D machines had a security incident on October 23. On October 24, the attacker used it to reach Fireworks development machines and run an unauthorized workload, which led to more customer data impact. Fireworks links the activity to a financially motivated group selling stolen access to large language models, a practice known as LLMjacking. We covered how the resale market works in [LLMjacking: Why Cheap Unlimited AI Is a Red Flag](/2026/11/03/llmjacking-cheap-unlimited-ai-red-flag/).

Fireworks has not said how its internal credentials were first compromised. Its investigation is ongoing.

Here is how the public timelines line up. All dates are 2026.

| Date | Event | Source |
|---|---|---|
| Oct 6 | Fireworks finds unauthorized use of internal credentials and starts containment | [Fireworks bulletin](https://fireworks.ai/security/bulletins/october-2026-security-incident) |
| Oct 7 | Compromised credentials used to access Uber data | [Uber notice (Iowa AG)](https://www.iowaattorneygeneral.gov/media/cms/11102026_Uber_Technologies_Inc_089721E61CBAB.pdf), [California AG listing](https://oag.ca.gov/ecrime/databreach/reports/sb24-632751) |
| Oct 9 | The provider notifies Uber, and Uber severs data connections | [Uber notice (Iowa AG)](https://www.iowaattorneygeneral.gov/media/cms/11102026_Uber_Technologies_Inc_089721E61CBAB.pdf) |
| Oct 24 | Second event through a cloud provider hosting Fireworks R&D machines | [Fireworks update](https://fireworks.ai/security/bulletins/october-2026-security-incident-update) |
| Oct 29 | Tampered Claude Code extension served from Cursor's marketplace cache for about 11 hours | [Cursor security notice](https://cursor.com/blog/claude-code-extension-security-notice) |
| Nov 2 | Fireworks notifies Notion | [Notion advisory](https://www.notion.com/security/advisories/security-incident-involving-a-third-party-ai-vendor) |
| Nov 10 | Uber files notices with state attorneys general | [Uber notice (Iowa AG)](https://www.iowaattorneygeneral.gov/media/cms/11102026_Uber_Technologies_Inc_089721E61CBAB.pdf) |

The three downstream incidents follow the Fireworks credential incident in time, and each company points to Fireworks. None of the public statements confirm a single intrusion behind all three.

## How did an AI vendor breach reach Uber driver data? {#uber}

> Through the vendor's own credentials. The attacker read a cloud storage environment Uber created for the vendor's work, holding driver's license images and details. Uber says the credentials reached no other Uber systems.

Uber's [notice to the Iowa Attorney General](https://www.iowaattorneygeneral.gov/media/cms/11102026_Uber_Technologies_Inc_089721E61CBAB.pdf), dated November 10, gives the clearest account. On October 9, a service provider told Uber an unauthorized third party had compromised the provider's internal credentials and used them to access Uber's account with the provider. Uber severed data connections and opened an investigation. On October 13, the investigation found the credentials had been used on October 7 to access Uber data connected to the provider. The [California Attorney General listing](https://oag.ca.gov/ecrime/databreach/reports/sb24-632751) gives October 7 as the breach date.

The data included images of driver's licenses and extracted text: name, address, date of birth, and driver's license number. It sat in a cloud storage environment Uber created to enable the provider's work, under Uber's own cloud security processes. Uber says the provider's credentials did not reach other Uber systems, and the investigation remains ongoing. Uber deleted or rotated credentials tied to the provider.

The state letters do not name the vendor. An Uber spokesperson [told TechCrunch](https://techcrunch.com/2026/11/13/uber-confirms-hackers-stole-thousands-of-drivers-license-information-in-data-breach/) the notices relate to "a security incident impacting one of our third-party vendors, Fireworks.ai, which had access to some Uber data."

Official state filings so far cover more than 9,000 drivers: [3,430 in South Carolina](https://www.consumer.sc.gov/identity-theft-unit/security-breach-notices), about [2,999 in Iowa](https://www.iowaattorneygeneral.gov/media/cms/11102026_Uber_Technologies_Inc_089721E61CBAB.pdf), about 1,873 in Rhode Island per [Uber's notice letter](https://www.iowaattorneygeneral.gov/media/cms/11102026_Uber_Technologies_Inc_089721E61CBAB.pdf), and [1,071 in Vermont](https://ago.vermont.gov/categories/security-breach-notices). [TechCrunch](https://techcrunch.com/2026/11/13/uber-confirms-hackers-stole-thousands-of-drivers-license-information-in-data-breach/) also reported 2,567 in Massachusetts from notices it reviewed. Uber has not given a total, and more filings are likely.

## How did the Fireworks AI breach lead to a poisoned Claude Code extension? {#cursor}

> A key Cursor issued to Fireworks opened a read-only bucket of coding agent traces. Unredacted credentials in those traces led into Cursor's SaaS tools, and a stolen credential let the attacker plant a tampered extension.

[Cursor's incident update](https://cursor.com/blog/security-incident-update) opens with "It started at Fireworks." An attacker obtained an access key Cursor had issued to Fireworks, which Cursor says Fireworks exposed. The attacker used it to copy data from a read-only storage bucket Cursor used to share data with Fireworks. The bucket held coding agent traces, mostly from 2025, from sessions not in Privacy Mode and permitted for model training.

A read-only key still handed over whatever sat in the bucket. A small number of traces held credentials nobody had redacted. Cursor says fewer than 0.05% of users had traces exposed and fewer than 0.01% of customers had API credentials exposed. Starting from those credentials, the attacker reached select SaaS tools Cursor uses, including archived non-production source code repositories, limited customer support data, product usage metrics, and some credentials users had sent to Cursor support.

On October 29, using a credential stolen from the exposed data, the attacker placed tampered copies of Anthropic's Claude Code extension, versions 2.1.312 and 2.1.313, on the cache serving Cursor's VS Code extension marketplace. Anthropic did not publish them. Cursor says the upstream Open VSX source never had the malware, and at most 5,000 users who requested those cached versions might have received the malicious build. It was live for about 11 hours, from about 2:27 a.m. to 1:35 p.m. PT, per Cursor's [security notice](https://cursor.com/blog/claude-code-extension-security-notice).

[Microsoft's analysis](https://www.microsoft.com/en-us/security/blog/2026/10/30/inside-malicious-claude-code-branded-cursor-extension-persistent-ssh-backdoor/) of the injected code shows a loader trying to add an attacker SSH key, enable the local SSH service, open a reverse SSH tunnel, and set up persistence. It reports environment variable names, not their values. Cursor says errors in the code and missing admin rights blocked the tunnel on most macOS and Windows hosts, while the key, persistence, and host details still went through. Microsoft confirmed the copies never appeared on the Visual Studio Marketplace or npm. Cursor says the last attacker activity it saw was on November 1, and it was blocked.

Cursor's own summary is the vendor-risk lesson in one line: "This incident involved data we stored and shared, credentials we issued, and systems we operate."

## What Notion data did the Fireworks AI incident expose? {#notion}

> Notion AI chat transcripts used for its Insights feature, mostly unattributable, in under 1% of workspaces. Fireworks first described the data as synthetic test data, then confirmed customer transcripts.

Per [Notion's advisory](https://www.notion.com/security/advisories/security-incident-involving-a-third-party-ai-vendor), Fireworks notified Notion on November 2 and described the accessed data as Notion AI synthetic testing data. Notion disconnected from Fireworks by the morning of November 3 and deleted its data in the Fireworks system on November 4. On November 6, Fireworks told Notion the attacker might have accessed customer data. On November 8, Fireworks confirmed the final dataset.

The dataset included Notion AI chat transcripts used for the Insights feature. Notion says most were unattributable, with no labels for author or workspace and no tool call results, and the impact covers fewer than 1% of workspaces. Notion used Fireworks for classification jobs behind Insights and as an inference provider for open-weight models. It has disabled Insights and stopped serving models through Fireworks. On November 11, it revoked exposed Notion API keys found in affected messages. On November 12, it reported exposed third-party keys to the vendors who issued them.

Two details stand out for vendor risk. The first description of the data turned out incomplete. And deleting your data from a vendor after a breach protects nothing already copied.

## Why didn't Uber's alerts fire? {#no-alerts}

> The attacker used valid credentials and the same data flows the vendor used every day. To the monitoring, the reads looked authorized.

Uber's letter is direct about it: "The environment had alerting enabled, but because the unauthorized third party used valid credentials and data flows enabled by the compromise on the service provider's system, no alerts were triggered."

Most alerting looks for something wrong: a failed login, an unknown identity, a blocked request. A stolen vendor credential produces none of those. The identity is real, the permissions are real, and the bucket is the one the vendor reads anyway. Uber learned of the compromise from the vendor two days later, not from its own tools.

Assume breach for every vendor integration. Design each share so a stolen vendor key reaches as little as possible, and so misuse of a valid key still looks different from normal work. A bullet resistant setup expects the vendor to get hit and limits what the attacker walks away with.

## Why doesn't a SOC 2 badge or zero data retention answer the question? {#soc2-zdr}

> Both describe the vendor's program, not your exposure. Fireworks holds SOC 2 Type 2 and ISO certifications and runs inference with zero data retention, and the incident still reached stored secrets, datasets, and billing data.

Both Fireworks bulletins list SOC 2 Type 2, ISO 27001, ISO 27701, and ISO 42001 at the bottom of the page. A SOC 2 report attests to the design and operation of a vendor's controls over a review period. It does not tell you which of your keys sit in the vendor's platform, which of your buckets the vendor reaches, or how far an attacker gets with the vendor's own credentials.

Zero data retention has the same limit. Fireworks says inference, its Training SDK, and Nexus are zero data retention by default. The incident hit other places: secrets stored for evaluation jobs, datasets, incomplete model weights, and account and billing records. Per Uber, the license data sat in an Uber-created environment the vendor's credentials reached.

Treat a badge and a retention claim as a starting point. The vendor-risk question is an inventory: what do they hold, what do we let them reach, and how fast do we shut it off?

## How should security teams reduce third-party vendor risk from AI vendors? {#vendor-risk-steps}

> Inventory every key and dataset your AI vendors hold or reach. Send less data, strip secrets, scope and network-restrict vendor keys, rotate at the issuer, and rehearse a fast cutoff.

None of these steps needs a new product. They need an owner. For a broader view of vendor programs, see [Third-Party Risk Management in 2026: The AI Bug Report Flood](/2026/09/05/third-party-risk-management-ai-bug-report-flood/).

**1. Build a reach inventory for each AI vendor.** List three things: data you send them, keys you issued them into your environment, and your secrets stored on their platform. Uber's exposure came from the second, Cursor's from the first and second, and Fireworks' first customer impact from the third.

**2. Minimize every share.** Send the fields the job needs and nothing more. Ask whether the vendor needs the raw image, the extracted text, or both. Set a deletion date. Shared data should leave the vendor when the job ends, on a schedule you control and verify, not in a cleanup after an incident. Notion deleted its data in the Fireworks system after the access had already happened.

**3. Strip secrets before data leaves.** Cursor's traces held credentials nobody had redacted, and those credentials turned a data leak into an intrusion. Run secret scanning on logs, traces, and datasets before you share them. Cursor added scanning to internal data sources after the incident.

**4. Scope and network-restrict vendor keys.** Give each vendor key read access to one location, with an expiry. Where your cloud supports it, bind the key to the vendor's network or a private connection, so a stolen copy fails from anywhere else. Cursor's [update](https://cursor.com/blog/security-incident-update) says it expanded network access restrictions across its service providers for this reason.

**5. Know where your keys live on their platform, and rotate at the source.** Fireworks' first bulletin warns, "Removing a stored secret alone does not invalidate the underlying credential." Track every secret you store with a vendor, and revoke it with the service issuing it.

**6. Baseline normal vendor access.** Valid-credential misuse needs behavior-based detection: read volume, source networks, time of day, and objects touched compared with the vendor's normal pattern. A bulk read of every object in a share at an odd hour deserves an alert, even with a valid key.

**7. Rehearse the cutoff.** Uber says it severed data connections immediately after the vendor's notice. Notion disconnected by the next morning. Write a per-vendor runbook covering which keys to revoke, which connections to cut, and who approves it, then test it.

**8. Expect the scope to grow.** Fireworks' first bulletin reported no evidence of dataset access. A month later, datasets were in scope. Notion's first notice described synthetic data. Keep your internal incident open until the vendor closes its investigation.

**9. Lock down developer tooling.** [Microsoft recommends](https://www.microsoft.com/en-us/security/blog/2026/10/30/inside-malicious-claude-code-branded-cursor-extension-persistent-ssh-backdoor/) restricting extensions to approved publishers and setting an install cooldown for new versions. Pair it with the scoped-identity approach in [Your AI Agent Shouldn't Have Your Permissions](/2026/09/03/your-ai-agent-shouldnt-have-your-permissions/).

**Questions for your next AI vendor review:**

- Where do our credentials and datasets sit in your platform today?
- Which of your internal credentials reach our data, how are they stored, and who reviews their use?
- Which of your vendors touch our data?
- How fast do you notify us, and how do you tell us when the scope changes?

## What should affected drivers, Cursor users, and Notion customers do? {#everyday}

> Drivers: enroll in the free monitoring and consider a credit freeze. Cursor users: check for the svc-telemetry SSH key if you installed the affected versions. Notion customers: rotate any secrets pasted into Notion AI.

**Uber drivers who received a letter.** Uber is offering free credit monitoring and fraud help through Cyberscout. Per [Uber's notice](https://www.iowaattorneygeneral.gov/media/cms/11102026_Uber_Technologies_Inc_089721E61CBAB.pdf), you need to enroll within 90 days of the letter date using the code in your letter. Uber says it has found no misuse so far. Consider a free credit freeze or a fraud alert with Equifax, Experian, and TransUnion. Pull free reports at annualcreditreport.com, and report identity theft at IdentityTheft.gov. Ignore unexpected calls or texts about the breach. If you have questions, use the phone number printed in Uber's letter.

**Cursor users.** If you installed or updated to Anthropic.claude-code 2.1.312 or 2.1.313 from the Cursor marketplace on macOS or Windows between about 2:27 a.m. and 1:35 p.m. PT on October 29, follow Cursor's [security notice](https://cursor.com/blog/claude-code-extension-security-notice). It gives a one-line check for the attacker key labeled svc-telemetry in your SSH authorized keys file, plus remediation scripts. Per [Microsoft](https://www.microsoft.com/en-us/security/blog/2026/10/30/inside-malicious-claude-code-branded-cursor-extension-persistent-ssh-backdoor/), removing the extension does not remove the files and startup entries it wrote outside its own folder. Rotate credentials reachable from the machine, from a trusted device. If Cursor did not notify you about exposed traces, Cursor says your data was not in them.

**Notion customers.** If Notion notified your workspace, review the affected data inside your workspace using the emailed instructions. Notion recommends treating it as exposed and rotating any passwords, API keys, or other credentials pasted into Notion AI during the incident window.

## The takeaway {#takeaway}

The attacker did not start inside Uber, Cursor, or Notion. Each path began with access the company had granted a vendor, or data it had shared with one.

Vendor risk reviews often stop at the badge and the questionnaire. The better question is narrower and harder: if this vendor's credentials leak tomorrow, what does an attacker read, and how fast do we shut it off? Answer it for your top AI vendors this quarter, starting with the one holding the most of your data.

Which AI vendor in your stack would you check first?

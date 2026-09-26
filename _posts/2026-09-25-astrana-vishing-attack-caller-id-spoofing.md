---
description: "Attackers spoofed Astrana Health's own phone number and called its employees. What this vishing attack teaches about caller ID and how to stop it."
layout: post
title: "Astrana Vishing Attack: Why Caller ID Isn't Identity"
category: Threats
tags: ["Vishing", "Social Engineering", "Healthcare Security"]
author: Marc
excerpt: "The calls came from Astrana Health's main corporate number. The callers were not Astrana staff. A vishing attack on one of the largest healthcare companies in the US ended in stolen data and an SEC filing, and the lesson reaches every organization with a phone system: caller ID was never built to prove who is on the line."
image: "/assets/img/posts/astrana-vishing-attack-caller-id-spoofing.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-09-25
slug: astrana-vishing-attack-caller-id-spoofing
faq:
  - question: "What happened in the Astrana Health vishing attack?"
    answer: "Attackers impersonated Astrana Health staff, spoofed the company's main corporate phone number, and called employees to get access to company systems. Astrana says private or confidential information was accessed or taken from its servers, and it declared the incident material in an <a href=\"https://www.sec.gov/Archives/edgar/data/1083446/000110465926109813/asth-20260922x8k.htm\">SEC Form 8-K filed September 22, 2026</a>."
  - question: "What is a vishing attack?"
    answer: "A vishing attack is voice phishing: a scammer uses a phone call or voice message to trick someone into handing over credentials, approving access, or installing software. MITRE ATT&CK tracks it as <a href=\"https://attack.mitre.org/techniques/T1566/004/\">Spearphishing Voice (T1566.004)</a>. Attackers often pose as IT support, a coworker, or a trusted company to create urgency."
  - question: "How do attackers spoof a company's real phone number?"
    answer: "Yes. The <a href=\"https://www.fcc.gov/spoofing\">FCC defines spoofing</a> as deliberately falsifying the information sent to your caller ID display, and notes scammers often spoof numbers from companies you already trust. Some spoofing is legal, such as a doctor displaying the office number from a personal phone, so carriers do not block every mismatched call."
  - question: "How do you verify a caller who says they work for your company?"
    answer: "Hang up and call back using a number from your own trusted directory, never one the caller gives you. For help desk resets, <a href=\"https://www.hhs.gov/sites/default/files/help-desk-social-engineering-sector-alert-tlpclear.pdf\">HHS recommends</a> calling back the number on record, confirming with the employee's supervisor, or requiring an in-person visit before resetting passwords or enrolling a new MFA device."
  - question: "Does security awareness training stop vishing attacks?"
    answer: "Training helps employees spot pressure tactics, but it is not a control on its own. Vishing crews rehearse their scripts and arrive with stolen personal details. The stronger fix is a process where a phone call alone never resets a password, enrolls an MFA device, or launches a remote access session, no matter how convincing the caller sounds."
---

The call came from the company's own number. The person on the line did not work there.

**TL;DR:** Attackers spoofed Astrana Health's main corporate phone number, posed as company staff, and called employees until they got access to company systems. Astrana told the SEC on September 22 the attackers accessed or took private and confidential data, and it restricted remote access tools and rebuilt systems from backups. This vishing attack follows a pattern CISA, HHS, Microsoft, and Google have all documented. The fix is not more suspicion from employees. It is a rule where no phone call on its own is enough to grant access, in either direction.

---

**Jump to a section:**

- [What happened in the Astrana Health vishing attack?](#what-happened)
- [What is a vishing attack?](#what-is-vishing)
- [How does caller ID spoofing fool trained employees?](#caller-id-spoofing)
- [Why do vishing attacks keep working against companies?](#why-it-works)
- [Is more security awareness training the answer?](#training)
- [How do you stop a vishing attack at your organization?](#how-to-stop)
- [What does Astrana's SEC filing tell healthcare security teams?](#sec-disclosure)
- [Which frameworks cover vishing defense?](#framework-mapping)

---

Astrana Health is not a small target. The company says it supports [more than 20,000 providers and about 1.5 million patients](https://ir.astranahealth.com/news-events/press-releases/detail/281/astrana-health-inc-reports-second-quarter-2026-results) in value-based care arrangements, and it reported $972.5 million in revenue last quarter. The attackers did not need a zero-day to get in. They needed a phone and the company's own number.

Here's what Astrana disclosed, how vishing works, why companies keep falling for it, and the process changes to take the phone out of the attack path.

## What happened in the Astrana Health vishing attack? {#what-happened}

> Attackers impersonated Astrana personnel, spoofed the company's main corporate number, and called employees to get system access. Astrana confirmed private or confidential data was accessed or taken and declared the incident material on September 22.

Astrana disclosed the incident in a [Form 8-K filed with the SEC](https://www.sec.gov/Archives/edgar/data/1083446/000110465926109813/asth-20260922x8k.htm) under Item 1.05, the section for material cybersecurity incidents. The filing says its subsidiary, Astrana Health Management, detected unusual activity. The company describes "a series of social engineering attempts in which threat actors, impersonating Company personnel and spoofing the Company's main corporate telephone number, contacted certain employees in an effort to obtain unauthorized access to Company systems."

The attempts worked. Astrana says it "believes that certain private and/or confidential information maintained on the Company's servers has been accessed and/or acquired without authorization." It is still assessing whether patient, employee, credentialed provider, business, financial, or intellectual property data was involved.

The response steps in the filing are worth reading closely:

- Resetting affected credentials
- **Restricting remote access tools**
- Restoring certain systems from clean backups
- Enhancing monitoring, logging, and detection

Astrana notified law enforcement, state and federal regulators, and its payer partners. [The Record reported](https://therecord.media/astrana-cyberattack-sec-ransomware) no group had claimed the attack and the company did not answer whether ransomware was involved. [SecurityWeek](https://www.securityweek.com/astrana-health-data-breach-impacts-private-confidential-information/) also found no known extortion group claiming responsibility.

The filing does not say what the callers asked employees to do. The remote access restriction stands out, though, because it matches a well-documented playbook where a fake IT caller talks an employee into opening a remote session. Treat this as a pattern consistent with the filing, not a confirmed detail.

## What is a vishing attack? {#what-is-vishing}

> Vishing is voice phishing. An attacker uses a phone call to trick someone into giving up credentials, approving access, or installing software, usually by posing as IT support, a coworker, or a trusted company.

The term blends "voice" and "phishing." [MITRE ATT&CK tracks it](https://attack.mitre.org/techniques/T1566/004/) as Spearphishing Voice, technique T1566.004. Email phishing asks you to click. Vishing asks you to act while a person is on the line, which adds two things email lacks: real-time pressure and a human voice answering your doubts as you raise them.

A typical corporate vishing call follows a short script:

1. **The pretext.** "Hi, this is Dan from the IT service desk. We're seeing a problem with your account."
2. **The credibility.** The caller knows your name, your manager, and your system names. Caller ID shows your company.
3. **The urgency.** "Your access gets locked in ten minutes unless we fix this now."
4. **The ask.** Read me the code on your phone. Approve the prompt. Open this remote support tool so I'll take a look.

The ask is the attack. Everything before it exists to make the ask feel routine.

## How does caller ID spoofing fool trained employees? {#caller-id-spoofing}

> Caller ID displays whatever number the calling system sends. Attackers send a trusted number, and employees read it as proof of identity. It proves nothing about who is calling.

The [FCC defines spoofing](https://www.fcc.gov/spoofing) as when "a caller deliberately falsifies the information transmitted to your caller ID display to disguise their identity." The agency warns scammers spoof "a number from a company or a government agency that you may already know and trust."

Here's the part most people miss: spoofing is not always illegal. The FCC notes a doctor calling a patient from a personal mobile phone and showing the office number is a legitimate use. Businesses display toll-free callback numbers the same way. Because the phone network supports this on purpose, carriers do not block every call where the displayed number differs from the true origin.

Now look at it from the employee's side. Security teams tell staff to distrust unknown callers. A call showing your own employer's main number does not register as unknown. It registers as internal. The spoof turns the company's reputation into the attacker's credential.

A phone number is an address, not an identity. It tells you where a call claims to come from, and nothing at all about the person holding the handset or whether they work for you.

## Why do vishing attacks keep working against companies? {#why-it-works}

> Phone calls trigger actions with no second check. Help desks reset passwords and employees open remote sessions based on a voice, and attackers arrive prepared with stolen personal details to pass verification questions.

Astrana is one case in a long line. The same move shows up in government and vendor threat reports going back years, in both directions: attackers call employees pretending to be IT, and attackers call IT pretending to be employees.

| Case | Who the attacker pretended to be | Who they called | What they got | Source |
|---|---|---|---|---|
| Astrana Health (2026) | Company personnel, on the spoofed main number | Employees | Access to servers, data accessed or taken | [Astrana 8-K](https://www.sec.gov/Archives/edgar/data/1083446/000110465926109813/asth-20260922x8k.htm) |
| Health sector help desks (2024) | Employees in revenue cycle and finance roles, from local area codes | IT help desks | New MFA device enrolled, payer payments diverted | [HHS HC3 Sector Alert](https://www.hhs.gov/sites/default/files/help-desk-social-engineering-sector-alert-tlpclear.pdf) |
| Scattered Spider (2023 to 2025) | IT and help desk staff, and employees | Both employees and help desks | Credentials, remote access tool installs, MFA transfers | [CISA Advisory AA23-320A](https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-320a) |
| Storm-1811 (2024) | IT or help desk personnel | Employees | Quick Assist remote sessions leading to Black Basta ransomware | [Microsoft Threat Intelligence](https://www.microsoft.com/en-us/security/blog/2024/05/15/threat-actors-misusing-quick-assist-in-social-engineering-attacks-leading-to-ransomware/) |
| UNC6040 (2025) | IT support personnel | Employees | Malicious Salesforce app approvals and bulk data theft | [Google Threat Intelligence Group](https://cloud.google.com/blog/topics/threat-intelligence/voice-phishing-data-extortion) |

The HHS case is the closest match for a healthcare reader. According to the [HC3 alert from April 2024](https://www.hhs.gov/sites/default/files/help-desk-social-engineering-sector-alert-tlpclear.pdf), callers phoned hospital help desks from local area codes and passed identity checks with the last four digits of the employee's Social Security number and a corporate ID. They claimed a broken phone and got a new MFA device enrolled. The verification questions were the weak point, because the answers were already in breach data and on professional networking sites.

Google's report on UNC6040 makes the same point from the other side: "In all observed cases, attackers relied on manipulating end users, not exploiting any vulnerability." No patch fixes a process built on trusting a voice.

## Is more security awareness training the answer? {#training}

> Training helps people spot pressure, but it is not a control. Professional callers rehearse their scripts, arrive with stolen personal details, and sound like your own IT team. Fix the process so no phone call alone grants access.

After a social engineering breach, the default response is another training module, usually assigned to everyone and completed in a hurry before the quarter ends. I'd push back on leaning on training alone here, for three reasons.

First, the attackers are practiced. CISA notes Scattered Spider runs social engineering "over several calls," first learning the reset process, then collecting the target's details, then making the real request. A careful employee is facing a rehearsed script.

Second, the caller had the one signal training tells people to check. "Verify the caller" is the standard advice, and caller ID showed the company.

Third, blaming the person who took the call backfires. As I covered in [the Binance fired-for-failing-a-phishing-test post](/2026/07/26/fired-for-failing-phishing-test-binance/), blame-only cultures don't produce fewer mistakes. They produce fewer reports, and an unreported vishing call is how a five-minute cleanup becomes a five-month incident. When one person's judgment is the last line of defense, fix the process around them.

Keep the training. Teach staff to hang up and call back without apology. Then build a process where the callback is required, not optional.

## How do you stop a vishing attack at your organization? {#how-to-stop}

> Map every action a phone call triggers, require a callback through a trusted directory, tighten help desk recovery, restrict remote access tools, move to phishing-resistant MFA, and alert on every recovery event.

These six steps work whether the attacker calls your employees or your help desk.

### Step 1: Inventory every action a phone call triggers

List each process where a call leads to a password reset, an MFA device change, a remote support session, a payment change, or disclosure of sensitive data. Include vendors who run your help desk. You cannot protect a path you have not mapped.

### Step 2: Make "hang up and call back" the rule

Any unexpected call asking for access, codes, or a remote session ends with the employee hanging up and calling back through a number from the company directory or ticketing system. Never use a number the caller supplies. Put the rule in writing so employees never feel rude for following it.

### Step 3: Harden help desk identity verification

Stop using static facts like SSN digits, employee ID, or date of birth as proof. The [HHS alert recommends](https://www.hhs.gov/sites/default/files/help-desk-social-engineering-sector-alert-tlpclear.pdf) calling back the number on record, contacting the employee's supervisor, or requiring an in-person visit before resetting a password or enrolling a new device. It also warns attackers often claim to be "too busy to take a phone call" back. Treat this answer as a red flag.

[NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html) names the problem directly: "To the extent that authenticator recovery is human-assisted, social engineering attacks also pose risks." Design recovery as a high-risk event, not a courtesy.

### Step 4: Restrict remote access tools

Astrana listed this in its own response. Allow one approved remote support tool, block the rest, and require IT to start sessions from a ticket rather than from a phone request. Microsoft recommends [blocking or uninstalling Quick Assist](https://learn.microsoft.com/windows/client-management/client-tools/quick-assist) where it is not in use, noting it ships by default on Windows 11.

### Step 5: Move to phishing-resistant MFA

An employee cannot read a code aloud if there is no code to read. Passkeys and FIDO2 security keys bind login to the real site, so a caller has nothing to collect. For the full account-takeover picture after a phish succeeds, see [why password resets alone fail against modern phishing](/2026/06/19/modern-phishing-why-password-resets-fail/).

### Step 6: Alert on every recovery event

Password resets, MFA re-enrollments, and new remote sessions are rare, high-signal events. Notify the account owner through a separate channel each time, which NIST requires for account recovery, and route them to your SOC for review.

## What does Astrana's SEC filing tell healthcare security teams? {#sec-disclosure}

> Material does not mean financially devastating. Astrana called the breach material because of the data involved while expecting no material financial effect, and its notification obligations to patients and partners are only starting.

Two lines in the 8-K pull in opposite directions. Astrana determined the incident material "due to the potential confidential and sensitive nature of the data." It also says it "currently does not expect that it will have a material effect on the Company's financial condition and results of operations."

For security leaders, the takeaway is the trigger. The [SEC's 2023 cybersecurity disclosure rules](https://www.sec.gov/newsroom/press-releases/2023-139) require public companies to report a material incident within four business days of determining it is material. Astrana made the call based on the data at risk, not on downtime or dollars. If your incident response plan only escalates on outages, a quiet data theft slips past your materiality review.

The notification work is ahead. Astrana says it intends to notify impacted patients once its investigation defines the scope. Patient notices are where breach response often fails the people it's meant to serve, as the [data breach notification 184,914 people can't use](/2026/08/12/data-breach-notification-184914-homeless/) showed.

And because Astrana notified its payer partners, every organization connected to it now has a third-party risk question to answer. If you are one of them, ask for the scope findings in writing and check what data your contract lets them hold. The broader playbook is in [third-party risk management when AI floods the queue](/2026/09/05/third-party-risk-management-ai-bug-report-flood/).

## Which frameworks cover vishing defense? {#framework-mapping}

> Vishing controls map to identity proofing and authentication in NIST CSF 2.0, HIPAA authentication and training requirements, SOC 2 access criteria, NIST SP 800-63B-4 account recovery, and MITRE ATT&CK.

You don't need a new framework. You need to apply the identity controls you already own to the phone.

| Framework | Relevant controls | What it asks for against vishing |
|---|---|---|
| [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework) | PR.AA-02, PR.AA-03, PR.AT-01, DE.CM | Identities are proofed before credentials are issued, users are authenticated, staff are trained, and activity is monitored |
| [HIPAA Security Rule (45 CFR Part 164, Subpart C)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-C) | 164.308(a)(5), 164.312(d) | Security awareness training and person or entity authentication before access to ePHI |
| [AICPA SOC 2 Trust Services Criteria](https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022) | CC6.1, CC6.2 | Logical access is restricted, and credentials are issued or reissued only after authorization |
| [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html) | Account recovery, phishing resistance | Recovery treated as a high-risk event with subscriber notification, and phishing-resistant authenticators available |
| [MITRE ATT&CK](https://attack.mitre.org/techniques/T1566/004/) | T1566.004, [M1017](https://attack.mitre.org/mitigations/M1017/) | Detect and train against spearphishing voice as a named initial access technique |

An auditor who asks "how did you confirm the identity of the person you reset?" deserves a better answer than "the caller ID looked right."

## The bottom line {#bottom-line}

The attackers behind the Astrana vishing attack did not beat a firewall. They borrowed a phone number and a voice, and a process somewhere accepted both as identity.

Nobody stops attackers from spoofing your number. You decide whether any call, from any number, is enough on its own to reset a password, enroll a device, or open a remote session.

If someone called your help desk right now from your CEO's number, what would they need to say to get in?

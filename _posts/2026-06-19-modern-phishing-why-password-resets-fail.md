---
description: "AI and Phishing-as-a-Service exposed employee data at 86% of Fortune 100 firms. Why password resets alone won't close a modern phishing breach."
layout: post
title: "Modern Phishing: Why Password Resets Fail in 2026"
category: Threats
tags: ["Phishing", "Identity Security", "Incident Response"]
author: Marc
excerpt: "Phishing exposed employee data at 86% of Fortune 100 firms in the last year, and most playbooks still stop at a password reset. The attackers already have your session cookies and refresh tokens, and they don't care about your new password."
image: "/assets/img/posts/modern-phishing-why-password-resets-fail.webp"
image_width: 1200
image_height: 1200
faq:
  - question: "Does changing your password stop a phishing attack?"
    answer: "Not anymore. Modern adversary-in-the-middle phishing kits steal the session cookie that's issued <em>after</em> you log in and complete MFA. That cookie remains valid until the session expires or is explicitly revoked, so a password reset alone leaves the attacker authenticated. You also need to revoke active sessions and refresh tokens."
  - question: "What is device code phishing?"
    answer: "Device code phishing abuses Microsoft's legitimate device code OAuth flow. The attacker generates a real device code and tricks the victim into entering it on a real Microsoft page, which hands the attacker access and refresh tokens for the victim's account. <a href=\"https://www.microsoft.com/en-us/security/blog/2025/02/13/storm-2372-conducts-device-code-phishing-campaign/\">Microsoft tracks this as Storm-2372</a> and assesses the actor as Russia-aligned."
  - question: "How do attackers bypass MFA in 2026?"
    answer: "Mostly through adversary-in-the-middle (AiTM) phishing. A reverse-proxy phishing site relays the victim's real login and MFA challenge to the legitimate service, then captures the resulting session cookie. The attacker replays that cookie from their own browser and is in. No password, no MFA prompt, no anomaly."
  - question: "How long does it take to respond to a phishing breach?"
    answer: "Too long. According to <a href=\"https://spycloud.com/resource/report/phishing-pulse-report-2026/\">SpyCloud's 2026 Phishing Pulse Report</a>, 68% of organizations need four hours or more to identify and remediate confirmed phishing-related exposures, and only 38% are very confident they can detect and respond to credential theft within 24 hours."
  - question: "What is phishing-resistant MFA, and why does it stop AiTM?"
    answer: "Phishing-resistant MFA uses FIDO2 hardware keys or passkeys that are cryptographically bound to the legitimate origin domain. When an AiTM proxy presents an attacker-controlled domain, the authenticator's signature won't validate, so no session cookie is ever issued. Push-based and SMS MFA do not have this property."
last_modified_at: 2026-06-19T15:21:03-07:00
---

Your phishing response playbook is fighting last decade's attack.

**TL;DR:** A new SpyCloud report found that phishing exposed employee data at **86% of Fortune 100 companies** in the last 12 months, and that most enterprises still can't tell which credentials and tokens were stolen *after* a successful phish. AI-generated lures and Phishing-as-a-Service kits like Tycoon 2FA capture session cookies and refresh tokens, not just passwords, so resetting a password leaves the attacker authenticated. Here's what a modern post-phishing response actually has to do.

---

For two decades, the standard response to a phished employee has been the same three steps: reset the password, force MFA, and call it done. That playbook was built for an attacker whose only prize was a credential pair. The attacker in 2026 isn't after your password. They're after the *session* the password produced.

This week, SpyCloud released its [2026 Phishing Pulse Report](https://spycloud.com/resource/report/phishing-pulse-report-2026/), and the numbers reframe the problem. Phishing volume is up. AI-generated phishing is harder to detect. Phishing-as-a-Service has industrialized the attack chain. And the real story isn't the volume. It's the visibility gap between "we got phished" and "we know what was actually exposed."

## What did SpyCloud's 2026 Phishing Pulse Report find?

> **Direct answer:** Phishing now exposes employee data at 86% of Fortune 100 companies, 78% of organizations saw volume rise year-over-year, and only 38% are confident they can detect and respond to credential theft within 24 hours.

The full report, [summarized in a press release covered by Hackread](https://hackread.com/spycloud-report-finds-phishing-attacks-surge-as-employee-data-is-exposed-at-86-of-fortune-100-companies/) and [published via GlobeNewswire](https://www.globenewswire.com/news-release/2026/06/17/3313247/0/en/phishing-attacks-surge-as-employee-data-is-exposed-at-nearly-half-of-ftse-100-companies.html), surveyed security professionals at organizations with 1,000+ employees. The headline numbers paint a clear picture of where the gap actually lives:

| Finding | Share of orgs |
|---|---|
| Saw phishing volume increase in last 12 months | [78%](https://spycloud.com/resource/report/phishing-pulse-report-2026/) |
| Say AI-generated phishing is more prevalent or harder to defend against | [84%](https://spycloud.com/resource/report/phishing-pulse-report-2026/) |
| Very confident they can detect and respond to credential theft within 24 hours | [38%](https://spycloud.com/resource/report/phishing-pulse-report-2026/) |
| Struggle to identify which credentials or session tokens were exposed after a phish | [58%](https://spycloud.com/resource/report/phishing-pulse-report-2026/) |
| Struggle to remediate exposed users at scale | [42%](https://spycloud.com/resource/report/phishing-pulse-report-2026/) |
| Need 4+ hours to identify and remediate phishing exposures | [68%](https://spycloud.com/resource/report/phishing-pulse-report-2026/) |
| Have fully integrated phishing detection with identity response workflows | [30%](https://spycloud.com/resource/report/phishing-pulse-report-2026/) |

SpyCloud's analysis of recaptured Phishing-as-a-Service data also found that approximately **half of PhaaS-sourced records are tied to enterprise identities**, compared to just **11% of malware-sourced records**, meaning a phished credential is roughly five times more likely to be a corporate one than a malware infection's haul. For the [Tycoon 2FA kit specifically, ~80% of captured credentials belonged to corporate email accounts](https://spycloud.com/resource/report/phishing-pulse-report-2026/) before the [coordinated takedown of the platform earlier this year](https://www.trendmicro.com/en_us/research/26/c/tycoon2fa-takedown.html).

This isn't a "users are getting tricked" report. It's a "we don't know what we lost" report.

## Why aren't password resets stopping these attacks?

> **Direct answer:** Because modern kits don't stop at the password. They proxy the login through their own server, capture the session cookie issued after MFA succeeds, and replay it from the attacker's browser, making the stolen session live until explicitly revoked.

The technique is called **adversary-in-the-middle (AiTM) phishing**, and Microsoft has been documenting its enterprise impact for years. Their 2022 research on the technique [traced a single AiTM phishing campaign that hit more than 10,000 organizations since September 2021](https://www.microsoft.com/en-us/security/blog/2022/07/12/from-cookie-theft-to-bec-attackers-use-aitm-phishing-sites-as-entry-point-to-further-financial-fraud/), with attackers launching follow-on payment fraud as little as five minutes after the cookie was stolen. As Microsoft put it bluntly in that write-up:

> "This is not a vulnerability in MFA; since AiTM phishing steals the session cookie, the attacker gets authenticated to a session on the user's behalf, regardless of the sign-in method the latter uses."

A [follow-up Microsoft analysis in 2023](https://www.microsoft.com/en-us/security/blog/2023/06/08/detecting-and-mitigating-a-multi-stage-aitm-phishing-and-bec-campaign/) showed the technique evolving into multi-stage campaigns that used the stolen cookie to update MFA methods *without* an MFA challenge, then pivoted into 16,000+ second-stage phishes against the victim's contacts. By the time the original user reset their password, the attacker had already added their own MFA device, established mailbox rules, and started a new wave of attacks from a trusted internal account.

That's why the password reset is the security equivalent of changing the locks after the burglar is already in the living room.

## What is device code phishing, and why is it so effective?

> **Direct answer:** It abuses Microsoft's legitimate device-code OAuth flow. The attacker generates a real device code, tricks the victim into entering it on a real Microsoft sign-in page, and walks away with access and refresh tokens. No password required.

This is the technique that earned its own name in the SpyCloud report and got top billing as "the post-phishing playbook organizations don't have." Microsoft Threat Intelligence first documented an active campaign by a group it tracks as Storm-2372 in early 2025; their write-up, [Storm-2372 conducts device code phishing campaign](https://www.microsoft.com/en-us/security/blog/2025/02/13/storm-2372-conducts-device-code-phishing-campaign/), describes how the attacker:

1. Generates a legitimate device code via Microsoft's authentication endpoint.
2. Sends the victim a lure (fake Teams meeting invite, Signal/WhatsApp message, etc.) prompting them to authenticate.
3. Has the victim enter the attacker's device code on the real `microsoft.com` device-login page.
4. Receives the resulting access and refresh tokens, and, in updates Microsoft logged within 24 hours of the original post, escalates to the **Microsoft Authentication Broker** client ID to register an attacker-controlled device in the victim's Entra ID tenant and harvest a Primary Refresh Token (PRT).

That last step is the part that breaks every legacy response playbook. With a PRT and a registered device, the attacker has a foothold that survives password resets, MFA changes, and routine session expiration. Microsoft's recommended response includes **revoking refresh tokens via `revokeSignInSessions`**, forcing re-authentication via Conditional Access, and auditing for newly-registered devices. None of which happen in a "reset password and move on" workflow.

## How are AI and Phishing-as-a-Service changing the threat landscape?

> **Direct answer:** Together they let unskilled actors run enterprise-grade phishing at scale. AI generates convincing, multilingual, contextual lures in seconds, and PhaaS kits like Tycoon 2FA hand attackers a turnkey AiTM infrastructure for as little as $120 per template.

Tycoon 2FA was the canonical example. Even though [Europol, Microsoft, and a coalition of partners (including SpyCloud) seized 300+ domains in a March 2026 takedown](https://www.trendmicro.com/en_us/research/26/c/tycoon2fa-takedown.html), the underlying playbook hasn't gone anywhere. Tycoon 2FA was first dissected by [Sekoia's Threat Detection & Research team in early 2024](https://www.infosecurity-magazine.com/news/new-tycoon-2fa-phishing-kit/) and at peak operated 1,100+ domains targeting Microsoft 365 and Gmail. The kit's six-stage AiTM flow (Cloudflare Turnstile gating, anti-analysis filtering, reverse-proxy credential capture, real-time MFA relay, and session-cookie exfiltration) became the template every modern PhaaS clone copies from.

Layer AI on top and the labor cost of *operating* a campaign collapses too. AI-generated lures match a target's writing style, cite real internal projects, and ship in any language the target speaks. The attacker no longer needs the technical skill to weaponize the kit *or* the social skill to write a convincing pretext. Both are commoditized.

This is the same pattern we covered in [the credential-theft economy is industrializing](/2026/04/12/credential-theft-new-normal-cyber-attacks/). The supply side of stolen identity data is professionalized, the deployment side is automated, and the defender's traditional advantage of "the attacker has to be skilled" is gone.

## What does a modern post-phishing response playbook look like?

> **Direct answer:** It assumes session cookies and refresh tokens were stolen by default, revokes them immediately, audits for newly-registered devices and mailbox rules, and treats every confirmed phish like a malware detection, not a help-desk ticket.

Here's what the playbook should actually do, in order, the moment a phishing exposure is confirmed.

1. **Revoke the session, not just the password.**
   Reset the password, yes, but the same automation must call `revokeSignInSessions` (or your IdP's equivalent) to invalidate every active access token and refresh token issued to the user. In Microsoft Entra ID this is a single Graph API call. If you skip it, the attacker's stolen cookie keeps working.

2. **Audit for newly-registered devices and MFA methods.**
   Per [Microsoft's Storm-2372 guidance](https://www.microsoft.com/en-us/security/blog/2025/02/13/storm-2372-conducts-device-code-phishing-campaign/), the modern attack adds a new device to the victim's tenant so it can mint Primary Refresh Tokens going forward. Pull a 30-day audit of newly-registered devices and MFA methods on every confirmed phished account, and remove anything the user can't explicitly identify.

3. **Block device code flow where you can.**
   Use a Conditional Access policy to scope device code authentication to only the legacy clients (CLI tools, IoT, etc.) that genuinely need it. The default-allow stance is what made Storm-2372 viable. This is a one-time configuration change with a huge marginal payoff.

4. **Move toward phishing-resistant MFA.**
   Push-based MFA and SMS codes are AiTM-defeated. FIDO2 hardware keys and passkeys are not. The cryptographic challenge-response is bound to the legitimate origin domain, so a proxy phishing site never gets a valid response back. If you haven't rolled out MFA at all yet, our [2FA implementation guide](/2026/02/16/2fa-the-5-minute-fix-that-stops-99-percent-of-account-attacks/) is the starting point. If you have, the 2026 priority is migrating high-value identities (admins, finance, executives, IT) to phishing-resistant factors first.

5. **Monitor recaptured darknet data continuously, not quarterly.**
   The visibility gap SpyCloud's report keeps surfacing (*we don't know what was stolen*) gets closed by a continuous identity-exposure feed that ties recaptured credentials, cookies, and tokens back to your workforce identities and triggers automated remediation. The frequency that matters is "minutes after the underground listing appears," not "next month's report."

6. **Hunt for the second-stage attack.**
   Modern AiTM campaigns don't stop at the first user. They use the compromised mailbox to launch internal phishing against contacts. Audit sent items, mailbox rules (auto-forwarding, hidden folders), and outbound email volume on every phished account for the prior 14 days before you close the ticket.

7. **Treat infostealer hits the same way.**
   Phishing isn't the only path into modern identity theft. [Infostealer malware reconstructs entire identities from a single infected device](/2026/02/21/infostealers-from-passwords-to-your-full-identity/), including session cookies, browser-saved passwords, and crypto wallet seeds. The response playbook is identical: revoke sessions, audit devices, treat the user as compromised across every service, not just the one you noticed.

The connective tissue across all seven steps is the same shift in mental model: **a phishing alert is an identity compromise, not a credential compromise.** The credential is the key the attacker grabbed on the way in. The identity is the building they're now inside.

## The bottom line

The SpyCloud data isn't telling us phishing is getting *more common*. We knew that. It's telling us most organizations don't have a credible answer to "what was stolen?" once a phish lands. As long as that gap exists, attackers will keep gravitating toward whichever technique gives them the most reliable post-authentication access. Today that's AiTM and device code phishing; tomorrow it'll be whatever the next PhaaS kit standardizes.

Prevention will keep getting better. Phishing-resistant MFA, AI-assisted lure detection, browser-level token binding, and conditional access maturity will all keep raising the bar. But the people defending real organizations should plan for the inevitable: at some point, a user is going to get phished. The question is whether your response playbook still ends at "reset the password," or whether it ends with "every session, token, device, and downstream action that user touched in the last 30 days is accounted for."

The 86% of the Fortune 100 that got hit in the last year are about to find out which one they have.

---
description: "The Utah VPN law (SB 73) is the first US law regulating VPN use. What it does, why it fails, and what it means for privacy in 2026."
layout: post
title: "Utah VPN Law (SB 73): The 2026 Threat to Internet Privacy"
slug: utahs-vpn-law-a-threat-to-internet-privacy
category: "Network Security"
tags: ["Utah VPN Law", "Internet Privacy", "VPN", "Censorship"]
author: Marc
excerpt: "The Utah VPN law (Senate Bill 73) took effect May 6, 2026, making Utah the first US state to regulate VPN use at the platform level. Here is what SB 73 actually does, why blocking VPN traffic is technically impossible, and how this precedent threatens internet privacy far beyond Utah's borders."
image: "/assets/img/posts/utahs-vpn-law-a-threat-to-internet-privacy.webp"
image_width: 1200
image_height: 1200
last_modified_at: 2026-07-01
faq:
  - question: "What is the Utah VPN law?"
    answer: "The Utah VPN law is <a href=\"https://le.utah.gov/~2026/bills/static/SB0073.html\">Senate Bill 73 (Online Age Verification Amendments)</a>, signed by Governor Spencer Cox on March 19, 2026. It makes Utah the first US state to explicitly regulate VPN use at the platform level. The VPN-related provisions took effect May 6, 2026, and a separate 2% tax on online adult content revenue starts in October."
  - question: "Is it illegal to use a VPN in Utah?"
    answer: "No. The Utah VPN law does not make it illegal for individuals to use a VPN, proxy, or any other privacy tool in Utah. SB 73 places obligations on websites and commercial platforms hosting content deemed harmful to minors, not on the people using VPN software. Utah residents can still legally install and run any commercial or self-hosted VPN."
  - question: "When did the Utah VPN law take effect?"
    answer: "The VPN provisions of Utah SB 73 took effect on May 6, 2026, roughly seven weeks after Governor Cox signed the bill on March 19, 2026. The bill's separate 2% tax on adult content revenue does not kick in until October 2026. The May 6 effective date is what triggered the current wave of legal and technical analysis of the law."
  - question: "Does the Utah VPN law ban VPNs entirely?"
    answer: "No. The Utah VPN law does not ban VPNs, block VPN providers, or criminalize VPN use. It does two narrower things: it treats anyone physically in Utah as accessing sites from Utah regardless of VPN use, and it prohibits certain covered platforms from sharing information about VPNs. Commercial VPN services remain fully legal in Utah."
  - question: "Who is affected by the Utah VPN law?"
    answer: "Directly, the Utah VPN law affects commercial platforms hosting a substantial portion of material deemed harmful to minors. Indirectly, it affects any VPN user in Utah whose traffic gets blocked as collateral damage, plus journalists, abuse survivors, remote workers, and privacy-conscious residents who rely on VPNs for safety. It also sets a precedent other US states and international regulators are already watching."
---

The Utah VPN law is the first US statute to write VPN use directly into a state's regulatory playbook, and it is a warning sign for internet privacy everywhere.

**TL;DR:** Starting May 6, 2026, Utah became the first US state to target VPN usage in law. The Utah VPN law (Senate Bill 73) holds websites liable for verifying the age of anyone physically in the state regardless of VPN use, and bans certain platforms from sharing information about VPNs. The Utah VPN law is technically unenforceable, raises First Amendment concerns, and sets a dangerous precedent for digital privacy rights that regulators in the UK and France are already citing.

---

Utah is small, but SB 73 is not. The law rewrites the compliance surface for any website that might have a Utah visitor, and it does it in a way that treats a VPN as evidence of intent to evade rather than as ordinary privacy hygiene. This post walks through what the Utah VPN law actually does, why it fails on its own technical terms, who it hurts, and why the fight is very much not confined to Utah.

## What is the Utah VPN law (SB 73)?

> **Direct answer:** The Utah VPN law is Senate Bill 73, signed by Governor Spencer Cox on March 19, 2026. Its VPN provisions took effect May 6, 2026, making Utah the first US state to legislate VPN use at the platform layer.

The bill text is public at the [Utah Legislature's SB0073 page](https://le.utah.gov/~2026/bills/static/SB0073.html). Most of SB 73 deals with a 2% tax on online adult content revenue that kicks in in October. The section that concerns us is the one that treats VPN use as a compliance problem for websites rather than a legitimate privacy choice for users.

Utah's approach is important because it is a first. Wisconsin considered a similar bill but stripped the VPN provisions after industry and civil-liberties pushback. Utah left them in and shipped.

## What does the Utah VPN law actually do?

> **Direct answer:** SB 73 does two things. It treats anyone physically in Utah as a Utah visitor regardless of VPN use, and it bans covered platforms from sharing VPN information. Both provisions push websites toward blocking VPN traffic or over-verifying every visitor.

**1. Location-based liability regardless of VPN use.**

Under the Utah VPN law, if you are physically in Utah, you are considered to be accessing a website from Utah. Period. It does not matter if you are using a VPN, proxy server, or any other tool to mask your location.

Websites hosting content deemed "harmful to minors" are responsible for verifying the age of anyone in Utah, even if they have no way of knowing the user is in Utah.

**2. A ban on sharing VPN information.**

Commercial entities hosting "a substantial portion of material harmful to minors" are prohibited from:

- Facilitating or encouraging VPN use to bypass age checks
- Providing instructions on how to use a VPN
- Providing the means to circumvent geofencing

That second provision is the one civil-liberties groups are most alarmed by. It is a direct restriction on truthful speech about legal tools, and it applies whether the platform is in Utah or not — as long as the platform is deemed to be reaching Utah users.

## Why is the Utah VPN law technically unenforceable?

> **Direct answer:** No comprehensive VPN blocklist exists, and any list is stale within hours. VPN providers rotate IPs constantly, and users who lose commercial VPNs move to cloud tunnels, residential proxies, and self-hosted setups indistinguishable from ordinary home traffic.

I have spent years watching IP reputation and geolocation feeds try to keep up with the actual internet, and the pattern is always the same: the block list is a snapshot of yesterday's traffic and the attackers (or in this case, ordinary privacy-conscious users) are already on tomorrow's infrastructure. In my day job I have seen a "known VPN IP" list go from useful to essentially noise inside a single quarter. That is with a full-time team feeding it. A state-mandated compliance regime that leans on the same underlying data is going to be worse, not better.

If commercial VPNs get restricted, users will move to:

- Private tunnels through cloud services (AWS, Azure, GCP)
- Non-commercial proxies
- Residential proxies that look identical to standard home internet traffic

These alternatives emerge within hours of any new restriction. The Utah VPN law does not stop that behavior. It just pushes it toward tools that are harder to see and harder to reason about, which is the opposite of what a regulator claims to want.

The liability trap this creates for websites is real. If a site is legally required to verify the age of all users physically in Utah, but it has no reliable way to determine who is using a VPN from Utah, the only "safe" options are:

- Block all known VPN IP addresses (punishing millions of legitimate VPN users worldwide)
- Mandate age verification for every visitor globally

Both options are terrible for users, and both are the predictable outcome of the Utah VPN law.

## Who does the Utah VPN law actually hurt?

> **Direct answer:** Not the determined teenager the bill was framed around. The Utah VPN law hits journalists, abuse survivors, remote workers, and ordinary privacy-conscious residents — anyone whose reason for using a VPN has nothing to do with age-gated content.

The Utah VPN law will not stop a determined teenager with basic technical knowledge. Any halfway-motivated 15-year-old can spin up a Tailscale tunnel through a friend's home network in an afternoon. What the Utah VPN law will impact:

- **Journalists** who rely on VPNs to protect sources
- **Abuse survivors** who use VPNs to prevent stalkers from tracking their location
- **Remote workers** who use VPNs for corporate security
- **Regular residents** who use VPNs to keep their browsing data away from advertisers and data brokers

That is a first-order harm, not a slippery-slope one. It is happening to the same people the state ostensibly wants to protect.

## Is using a VPN in Utah still legal?

> **Direct answer:** Yes. The Utah VPN law does not ban VPN use by individuals. It creates liability for certain websites and prohibits some platforms from sharing information about VPNs, but it does not criminalize running a VPN as a Utah resident.

This matters because coverage of the Utah VPN law has been confusing enough that some readers have assumed the state banned VPNs outright. It did not. VPN clients remain fully legal to install and use in Utah. What changed is the compliance obligation on platforms that might be reached by a Utah VPN user, plus a narrow but constitutionally significant speech restriction on those platforms.

There is also a de facto "don't ask, don't tell" enforcement style in the law: websites likely only have a clear obligation to verify age if they learn a user is in Utah and using a VPN. If they never learn, their obligation remains legally ambiguous. That ambiguity is itself a design flaw.

## What does the Utah VPN law mean beyond Utah?

> **Direct answer:** Everything. The Utah VPN law is already being cited by regulators in the UK and France and by US state legislatures drafting age-verification bills. The precedent gives ammunition to any government that treats privacy tools as loopholes rather than infrastructure.

Utah's approach follows a predictable cycle: governments pass age-verification mandates, VPN usage spikes in response, and instead of reconsidering the failed approach, lawmakers target the privacy tools themselves.

This isn't staying within Utah's borders. [As the EFF documents](https://www.eff.org/deeplinks/2026/04/utahs-new-law-regulating-vpns-goes-effect-next-week), the UK Children's Commissioner has called VPNs a "loophole that needs closing," and France's Minister for AI and Digital Affairs has said VPNs are "the next topic on my list." Both statements were made in the weeks after Utah's bill was signed. The precedent Utah sets here gives ammunition to regulators worldwide who view privacy tools as obstacles rather than essential infrastructure.

The EFF's summary of the pattern is worth quoting directly: "Lawmakers who can't distinguish between a security tool and a 'loophole' are now writing the rules for one of the most complex infrastructures on Earth."

Utah's law is part of a global pattern of governments targeting privacy tools. For more on how encryption is under threat worldwide, read our breakdown of [Canada's Bill C-22 and why encryption backdoors endanger everyone](/2026/05/13/encryption-backdoors-canada-bill-c22-threatens-global-security/). And for practical steps to reduce your digital exposure right now, see our guide to [boosting your privacy with small daily actions](/2025/12/24/boost-your-privacy-small-steps-big-impact/).

## What you should know before the Utah VPN law reshapes your access

- VPNs remain legal to use in Utah. The Utah VPN law does not ban individuals from using them.
- The law targets websites, not users directly. It creates liability for platforms, not for people running VPN software.
- The "don't ask, don't tell" enforcement style means websites likely only have an obligation to verify age if they learn a user is in Utah and using a VPN. If they don't know, their obligation remains unclear.
- This is the first law of its kind in the US. Wisconsin proposed something similar but removed the VPN provisions after pushback. Utah did not.
- Expect follow-on bills in other US states within the next legislative cycle. The Utah VPN law is now the template that legislative staff will start from, not a one-off.

If you are a website operator, this is the moment to review how your platform detects Utah traffic and how you would respond to a compliance inquiry. If you are a Utah resident who relies on a VPN for real safety reasons, nothing has changed for you personally yet — but the infrastructure you depend on is now the political target, and that is worth paying attention to.

---
description: "How to detect North Korean IT workers in remote hiring: laptop farm signals, interview red flags, and the post-hire controls that actually catch them."
layout: post
title: "How to Detect North Korean IT Workers (2026 Playbook)"
slug: how-to-detect-north-korean-it-workers
category: "Threats"
tags: ["DPRK", "Insider Threat", "Remote Work", "Threat Intelligence"]
author: Marc
excerpt: "North Korea has quietly placed thousands of operators inside US companies as remote engineers, using stolen identities, US-based laptop farms, and off-the-shelf remote access tools. This playbook walks through how the scheme works and the detection signals that catch DPRK hires across the application, interview, onboarding, and post-hire phases."
image: "/assets/img/posts/how-to-detect-north-korean-it-workers.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-06-28
faq:
  - question: "What is a North Korean laptop farm?"
    answer: "A laptop farm is a US-based residence where a paid facilitator hosts company-issued laptops on behalf of overseas DPRK operators. The facilitator installs remote access software so the operators in China or Russia can log in and appear to be working from inside the United States. The FBI has searched at least 29 such farms across 16 states."
  - question: "How do North Korean IT workers get hired by US companies?"
    answer: "DPRK operators apply for fully remote technical roles using stolen or fabricated US identities, fake GitHub portfolios, and AI-edited interview photos. Once hired, they ship the work laptop to a laptop farm address \u2014 not the home on their application \u2014 and remotely access it from overseas via tools like AnyDesk, TeamViewer, or Chrome Remote Desktop."
  - question: "What are the warning signs of a DPRK fake remote employee?"
    answer: "Last-minute changes to laptop shipping addresses, VoIP-only phone numbers, day-one installs of remote access software, Astrill VPN traffic, persistent camera-off interviews, voice patterns that do not match the resume background, working hours that align with Asian time zones, and resistance to in-person or live-video identity verification."
  - question: "Is hiring a North Korean IT worker illegal?"
    answer: "Yes. Knowingly employing a DPRK national violates US sanctions enforced by Treasury's OFAC and can carry IEEPA penalties. Even unwitting employers may face civil exposure. The May 16, 2022 joint advisory from the Departments of State, Treasury, and Justice spells out the obligations and red flags."
  - question: "How can my company stop DPRK insider threats?"
    answer: "Mandate live video for every interview round, verify ID against the live face, validate that legal name matches SSN and tax records, geofence corporate devices to the employee's stated work region, alert on employee-installed remote access tools, and watch for sudden IP shifts after onboarding. Treat any laptop ship-to mismatch as a hard stop."
  - question: "What should I do if I suspect a DPRK hire?"
    answer: "Do not terminate before consulting counsel and the FBI \u2014 terminating without preserving evidence can give the operator time to exfiltrate code or trigger an extortion play. Preserve endpoint logs, freeze the user's access in stages, and report the suspected scheme to the FBI's Internet Crime Complaint Center (IC3) and your local FBI field office."
---

Your next great remote hire might already be on a Pyongyang payroll. Here's how to catch them before they ship code.

**TL;DR:** Knowing how to detect North Korean IT workers is now a baseline security control for any company hiring remote engineers. To catch them, verify identity behavior across four phases — application, interview, onboarding, and post-hire. Since at least 2018, DPRK operators have used stolen US identities, US-based "laptop farms," and off-the-shelf remote access tools to slip into Western payrolls as remote IT workers. The US Justice Department has indicted 14 DPRK nationals and sentenced multiple US-based facilitators to 8+ years in federal prison, while Google's Mandiant team now classifies the North Korean IT worker insider threat as 5% of all initial infection vectors it responds to. This playbook walks through the detection signals at each phase and the FBI/DOJ reporting paths if you find one already inside.

---

After eight years working insider-threat investigations and security operations, the case I find most operationally dangerous in 2026 isn't a sophisticated zero-day — it's a polite, technically competent remote hire who passes every existing control. In July 2025, an Arizona woman named Christina Chapman was sentenced to 102 months in federal prison for running a "laptop farm" out of her home — hosting corporate laptops for over 300 US companies while remote North Korean operators logged into them and drew real American salaries. According to the [Justice Department's announcement](https://www.justice.gov/opa/pr/arizona-woman-sentenced-17m-information-technology-worker-fraud-scheme-generated-revenue), the scheme funneled more than $17 million to the DPRK government to fund its weapons programs. Chapman's case is not unusual. The FBI has since [searched 29 laptop farms across 16 states](https://www.justice.gov/opa/pr/justice-department-announces-coordinated-nationwide-actions-combat-north-korean-remote) and seized roughly 137 laptops in a single coordinated sweep. The question is no longer whether a Korean remote IT worker has applied to your company. The question is whether you will catch them before they leave with your source code.

## What is a North Korean laptop farm scheme? {#what-is-it}

> **Direct answer:** It is a fraud operation where a US-based facilitator hosts company-issued laptops in their home while overseas DPRK operators remotely log in and pose as US-based employees, generating salary revenue for the North Korean regime.

The scheme has four moving parts. First, the DPRK government trains operators in software engineering and IT work — primarily basing them in China and Russia per [Mandiant's UNC5267 tracking](https://cloud.google.com/blog/topics/threat-intelligence/mitigating-dprk-it-worker-threat). Second, the operators apply for fully remote tech jobs using stolen US identities, fabricated GitHub profiles, and AI-edited resume photos. Third, a US-based accomplice — paid monthly per laptop — receives the work hardware at their residence and installs remote access tools like AnyDesk, Chrome Remote Desktop, or TeamViewer. Fourth, the operator logs in from overseas, performs the work, and the wages flow back through layered cryptocurrency conversion to Pyongyang.

Microsoft's threat intel team, which tracks the activity as [Jasper Sleet](https://www.microsoft.com/en-us/security/blog/2025/06/30/jasper-sleet-north-korean-remote-it-workers-evolving-tactics-to-infiltrate-organizations/), notes that operators have evolved to use IP-based KVM devices like PiKVM and TinyPilot — physical hardware that allows remote control without any software footprint on the laptop itself. The detection problem keeps getting harder.

## How do DPRK IT workers actually get hired? {#how-they-get-hired}

> **Direct answer:** They apply to fully-remote technical roles with stolen US identities, AI-generated portfolios, and rehearsed interview answers — then redirect the work laptop to a laptop-farm address after the offer letter is signed.

The application phase is shockingly polished. Mandiant has documented operators with fabricated LinkedIn profiles, fake-but-functional GitHub repos, and resumes that mirror the exact keyword salad in your job posting. The [DOJ indictment of 14 DPRK nationals](https://www.justice.gov/archives/opa/pr/fourteen-north-korean-nationals-indicted-carrying-out-multi-year-fraudulent-information) describes operators working through DPRK-controlled front companies like Yanbian Silverstar in China and Volasys Silverstar in Russia — these aren't lone individuals, they're staffed agencies with hiring funnels of their own.

The pattern that keeps holding across every public case: the operator never sets foot in the country listed on their employment paperwork. The address on the W-4 is real (it belongs to the stolen identity or to the laptop-farm accomplice), but the human typing on the keyboard is sitting in Shenyang or Vladivostok.

This is where stolen identities matter so much. If you read our breakdown of [how infostealers have evolved from passwords to your full identity](/2026/02/21/infostealers-from-passwords-to-your-full-identity/), the connective tissue clicks into place: every Social Security number, scanned driver's license, and tax document that gets exfiltrated through an infostealer is potential raw material for the next fake remote engineer.

## How do you detect North Korean IT workers across the hiring funnel? {#detect-hiring-funnel}

> **Direct answer:** Watch for the canonical red flags: a change in laptop shipping address after the offer, VoIP-only phone numbers, day-one installs of remote access software, Astrill VPN traffic, persistent camera-off interviews, and a voice that does not match the resume's claimed background.

The red flags for a Korean remote IT worker fall cleanly into four buckets, mapped to the four phases of the hiring funnel. Here's what to watch for at each stage:

| Stage | Signal | Why it matters |
|---|---|---|
| Application | GitHub repos with copy-pasted code, single recent commit burst | Fabricated portfolio under a stolen name |
| Application | VoIP / Google Voice number on the resume | Avoids the carrier verification a real cell would require |
| Interview | Camera consistently off, audio issues, lip-sync delays | Avoids face-to-identity comparison or AI-overlay artifacts |
| Interview | Voice tone / accent inconsistent with stated US background | Operator reading from a script while a coach assists off-mic |
| Onboarding | Last-minute change to laptop shipping address | Laptop is being redirected to a farm address |
| Onboarding | Mismatch between W-4 address and shipping address | The stolen identity's address and the farm address are different states |
| Post-hire | AnyDesk, TeamViewer, or Chrome Remote Desktop installed by employee | Per [Mandiant's investigation](https://cloud.google.com/blog/topics/threat-intelligence/mitigating-dprk-it-worker-threat), these are the operator's preferred tools |
| Post-hire | Astrill VPN traffic or IPs from PRC/Russia ranges | A primary OPSEC tool for DPRK operators |
| Post-hire | Working hours align with Asian time zones, not US | Operator is in China or Russia, not the East Coast |

Per the May 2022 [joint advisory from the Departments of State, Treasury, and Justice](https://home.treasury.gov/policy-issues/financial-sanctions/recent-actions/20220516), any one of these signals should trigger heightened verification. Two or more should pause the hire entirely.

## How do you verify identity for remote technical hires? {#verify-identity}

> **Direct answer:** Require multiple live-video interview rounds with the camera on, match the live face to a government-issued ID, validate the legal name against SSN and tax records, and verify the candidate's voice and accent in unscripted technical conversation.

In my experience interviewing engineering candidates over the last decade, the single most effective control is a live, on-camera technical interview with at least one experienced engineer who is allowed to go off-script. North Korean IT worker operators can coach scripted answers, but unscripted system-design conversation — "walk me through how you'd debug this in real time" — exposes the gap fast. CrowdStrike's counter-adversary team [told RSA Conference attendees](https://www.techtarget.com/searchsecurity/feature/How-to-spot-and-expose-fraudulent-North-Korean-IT-workers) that they have confirmed DPRK insider activity at more than 150 customer organizations, with data theft in roughly half of those cases.

Match every candidate's interview face against the government-issued ID photo. If the ID can't be produced live on-camera, treat that as a hard stop. The [Treasury Department's most recent sanctions action](https://home.treasury.gov/news/press-releases/sb0416) attributed nearly $800 million in 2024 revenue to DPRK IT-worker schemes — the entire economic model depends on you skipping this step.

For senior hires, layered controls work best. Some companies that we've talked to are pairing the verification above with the same [account-takeover controls that 2FA prevents 99% of](/2026/02/16/2fa-the-5-minute-fix-that-stops-99-percent-of-account-attacks/) — hardware-key-only authentication for any account a new hire can touch — to limit blast radius if the verification fails.

## What controls should security teams add after onboarding? {#post-hire-controls}

> **Direct answer:** Geofence corporate devices to the employee's stated work region, alert on any employee-installed remote-access software, monitor for IP shifts immediately post-onboarding, and continuously cross-reference network location against time-sheet activity.

The post-hire controls are where most companies have the biggest gap. Three concrete actions worth implementing this quarter:

1. **Endpoint geofencing.** If a Tampa-based hire's laptop authenticates from a Shenyang IP — or even from a US IP that doesn't match their stated city — your EDR should fire immediately. Microsoft notes that [authentication from "foreign — most commonly Chinese or Russian — IP addresses"](https://www.microsoft.com/en-us/security/blog/2025/06/30/jasper-sleet-north-korean-remote-it-workers-evolving-tactics-to-infiltrate-organizations/) is one of the strongest behavioral signals.
2. **RMM tool detection.** Alert on installation of AnyDesk, TeamViewer, Chrome Remote Desktop, ScreenConnect, and similar from any user account other than IT. The same kind of layered EDR detection that catches [HR-targeted fake Chrome extensions](/2026/01/20/fake-chrome-extensions-hijack-hr-platforms-is-your-org-at-risk/) catches this trivially.
3. **Hardware-level KVM detection.** Microsoft has confirmed operators are now using PiKVM and TinyPilot to bypass software-based detection. Your asset inventory should include serial-number registration for corporate laptops, and your physical security team should ask why a remote engineer needed a hardware KVM shipped to them.

## What should you do if you suspect a DPRK hire? {#what-to-do}

> **Direct answer:** Do not terminate immediately — preserve evidence, consult counsel, and report to the FBI before you act. Premature termination often triggers data theft and extortion.

The instinct is to fire the suspect and move on. Don't. Mandiant has documented multiple cases where DPRK operators stole proprietary data and [extorted the employer for ransom](https://services.google.com/fh/files/misc/m-trends-2025-en.pdf) once they realized termination was coming. The right sequence is:

1. **Preserve endpoint logs** — sign-in history, RMM tool installation, file access, code repository activity.
2. **Loop in counsel and HR** before terminating. The sanctions exposure under [Treasury's OFAC framework](https://home.treasury.gov/policy-issues/financial-sanctions/recent-actions/20220516) is real.
3. **Stage the access removal** — revoke the riskiest permissions (production, code repos, key vault) first, then everything else.
4. **Report to the FBI** via your local field office or the Internet Crime Complaint Center at [ic3.gov](https://www.ic3.gov/). Reference the May 2022 IT Worker Advisory.
5. **Notify affected partners** if customer data, source code, or third-party credentials were within reach.

DPRK operators are persistent and patient. If you find one, assume there are more — and treat the discovery as the starting point of an investigation, not the end of one. If I were standing up an insider-threat program from scratch in 2026, I would treat "how to detect North Korean IT workers" as the canonical test case for every identity-verification, geofencing, and RMM-detection control I built. The North Korean IT worker problem is the cleanest stress test of an organization's behavioral identity stack we have seen in years — and the companies that solve it will incidentally close the gap on the entire next generation of remote-worker insider threats.

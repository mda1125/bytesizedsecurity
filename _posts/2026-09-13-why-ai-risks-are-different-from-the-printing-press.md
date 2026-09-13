---
description: "AI risk is not like the printing press or nuclear weapons: a monthly subscription now buys skills once locked behind years of training."
layout: post
title: "Why AI Risks Are Different From the Printing Press"
category: "Threats"
tags: ["AI Risks", "AI Guardrails", "AI Regulation", "Cybersecurity"]
author: Marc
excerpt: "A conversation about AI safety kept circling back to the same comparisons: the printing press, the internet, nuclear weapons. Those comparisons miss what makes AI different, and a threat intelligence report Anthropic published this week proves the point with real numbers."
image: "/assets/img/posts/why-ai-risks-are-different-from-the-printing-press.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-09-13
slug: why-ai-risks-are-different-from-the-printing-press
faq:
  - question: "Is AI more dangerous than the printing press or the internet?"
    answer: "Not more dangerous in the abstract, but the mechanism differs. The printing press and the internet reshaped how information spreads, over decades, giving institutions time to adapt. AI compresses this disruption into months and changes who acts on dangerous information, not only who reads about it. This combination is why the historical comparison breaks down."
  - question: "Does using AI make someone an expert in cybersecurity, chemistry, or biology?"
    answer: "No. AI is fallible, lacks context, and is often confidently wrong, so it does not manufacture real expertise. What it does is let someone with limited training perform tasks whose consequences used to require years of experience to trigger, which is a narrower claim but still a serious one."
  - question: "What did Anthropic's September 2026 threat intelligence report find?"
    answer: "The report documented state-linked and criminal operations using Claude to automate reconnaissance, credential theft, and vulnerability research at a scale once reserved for entire skilled teams. One case went from a single stolen developer token to full administrative control of a victim's cloud environment in about three hours."
  - question: "What guardrails are people proposing for AI?"
    answer: "Four categories come up most often: mandatory pre-release testing for dangerous capabilities, enforceable government standards instead of voluntary pledges, international coordination since AI does not stop at national borders, and access controls scaled to how much autonomy and risk a given AI system carries."
  - question: "Should AI development be slowed down or banned to manage these risks?"
    answer: "No. The argument here is not for restricting or banning AI outright. It is about closing the gap: institutional response, testing, regulation, and international agreements need to catch up to the speed of AI's capability gains before the gap becomes unmanageable."
---

Every major new technology gets the same defense. Someone always points to the printing press, or the internet, or nuclear weapons, and says people panicked about those too, and society adapted every time.

**TL;DR:** AI is not another "new technology causes fear" moment. The printing press and the internet took decades to reshape institutions, and nuclear weapons required rare materials, huge budgets, and specialized expertise only states were able to assemble. AI compresses all of it. A consumer subscription now hands someone with almost no training the ability to do real damage, and a [threat intelligence report Anthropic published this week](https://www.anthropic.com/threat-intelligence-report-september-2026) documents exactly this happening in cybercrime, espionage, and fraud. The problem is not AI being scary. It is the technology improving faster than governments, companies, and international agreements are able to build the guardrails to manage it.

---

I had this argument a few days ago. Someone argued AI panic is nothing new, and every major technology, the printing press, the internet, nuclear power, caused the same kind of fear and confusion when it arrived, with society adapting every time. It is a fair point on the surface. But the more I sat with it, the more I thought the comparison misses something important: AI does not only spread information faster. It collapses the distance between knowing about something dangerous and being able to do it.

## Why doesn't the printing press comparison hold up for AI? {#printing-press}

> The printing press and the internet reshaped how information spread, over decades. AI compresses this same disruption into months, and it changes who acts on dangerous information, not only who reads about it.

The printing press took roughly a century to grow from Gutenberg's press into a continent-wide information system. The internet took decades to go from a research network into the platform which reorganized commerce, media, and politics. In both cases, governments, courts, and industries had time, measured in generations, to build the institutions which eventually managed the disruption: copyright law, libel law, antitrust enforcement, content moderation.

AI capability is not moving on this timeline. A model released this year is measurably more capable than one released 18 months earlier, and the gap between a research demo and something millions of people use daily has shrunk from years to months. Regulatory processes, corporate risk reviews, and international treaties were not built to keep pace with a technology changing meaningfully every few product cycles.

## What's different about AI versus nuclear weapons? {#nuclear-comparison}

> Nuclear weapons required rare materials, expensive infrastructure, and institutional access only a handful of states were able to assemble. AI risk lives in information and software, which is far easier to access, copy, and distribute than centrifuges and enriched uranium.

The nuclear comparison is the one I find most useful, and also the one which breaks down fastest. Building a nuclear weapon has never been primarily a knowledge problem. It requires specialized scientific training, enormous capital, controlled materials, and an organization large enough to run all of it in secret. This is exactly why the guardrails around nuclear weapons work as well as they do: treaties, export controls on fissile material, and physical inspections all target a small number of hard-to-bypass chokepoints.

AI risk does not have those chokepoints. The dangerous part is not a rare material, it is a skill: how to write working exploit code, how to structure a convincing phishing campaign, how to research a specific class of vulnerability. These are exactly the kinds of tasks a capable model accelerates, and they travel over the internet in seconds. No one puts a fence around a skill the way a government puts a fence around a uranium enrichment facility. The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) exists precisely because trustworthiness for AI has to be engineered into the system itself, not only controlled at the border.

## What does the evidence say about AI lowering the bar for attackers? {#evidence}

> Yes, and it is not theoretical. Anthropic's own September 2026 threat intelligence report documents state-linked and criminal groups using Claude to automate reconnaissance, credential theft, and vulnerability research at a scale once reserved for entire skilled teams.

This part of the argument used to be speculative. Now it has real data behind it. [Anthropic's threat intelligence report for September 2026](https://www.anthropic.com/threat-intelligence-report-september-2026) documents disrupted operations across seven categories, including cyber operations, surveillance, and biological misuse. Some of the specifics are worth sitting with:

- A Russian-linked espionage campaign, tracked as GTG-20006, used AI-automated workflows for reconnaissance, malware modification, and data exfiltration against more than 20 organizations, stealing over 300,000 national identity records from a North African government in the process.
- A credential-harvesting operation, GTG-50014, affiliated with the ShinyHunters group, used AI to help process 1.8 million Android applications for hardcoded secrets. One resulting breach went from a single stolen developer token to full administrative control of a victim's cloud environment in roughly three hours.
- A Chinese-linked vulnerability research operation, GTG-10007, used AI-assisted analysis against a major security product and, in one month, surfaced more than a dozen possible zero-day findings.

Anthropic's own conclusion from the report is close to a word-for-word statement of the argument I was making a few nights ago. AI "has collapsed the labor and tooling gap that used to separate well-resourced, state-sponsored operations from individual operators." This is not a hypothetical about some future superintelligent model. This is a description of what a widely available product is doing right now.

## Does AI turn everyone into an expert overnight? {#expert-reframe}

> No, and the distinction matters. AI is fallible, lacks context, and is often confidently wrong. What it does is let someone with limited training perform tasks whose consequences used to require years of expertise to trigger.

It is tempting to describe this as "anyone with a $200 subscription becomes an expert in anything," and I said something close to it in the original conversation. But it overstates the case in a way easily dismissed. AI does not manufacture expertise. It gets facts wrong, misses context a real expert would catch, and delivers bad guidance with the same confident tone as good guidance.

The more defensible version of the claim is narrower and, honestly, more concerning: AI lowers the cost of performing tasks whose consequences exceed the operator's training. A novice does not need to become a security researcher to run a convincing phishing campaign, and a small operation does not need a security team to automate reconnaissance across dozens of targets. The skill required to point the tool has gone down. The consequences of a bad outcome have not.

## In cybersecurity, who's winning the AI arms race, attackers or defenders? {#cyber-angle}

> Both sides are getting faster, but attackers have historically needed less specialized skill to begin with, so the barrier AI removes for them is proportionally larger. Whether defenders close the gap depends on how fast they adopt the same tools.

Before AI, an attacker still had to develop real skills, research a target, write working code, and coordinate an operation. AI does not eliminate any of those steps, it shortens them. Anthropic's report describes attackers using AI to handle reconnaissance, malware modification, and exfiltration in a single automated workflow, work which used to require a team with distinct specialties.

Defenders are not standing still. The same models which help an attacker write exploit code also help a defender triage alerts, hunt for anomalies, and patch faster. But this is where I think [the broader case for AI as a cybersecurity career multiplier](/2026/05/26/ai-fuels-cybersecurity-boom-your-career-guide/) and the argument for urgency reinforce each other rather than contradict: the field is growing because both attack and defense capability are accelerating at the same time, and the organizations which lag on adopting AI-assisted defense are the ones absorbing more of the risk AI creates for attackers.

## What should real AI guardrails look like? {#guardrails}

> Four things: mandatory pre-release testing for dangerous capabilities, enforceable government standards instead of voluntary pledges, international coordination since AI does not stop at borders, and access controls scaled to how much risk and autonomy a system carries.

Saying "we need guardrails" is easy. Saying what they should be is the part which makes the argument useful.

**Companies need to test for dangerous capabilities before and after release.** Pre-release evaluation for cyber, biological, and autonomous-behavior risk should be standard practice, not a one-time checkbox. Anthropic's own threat intelligence reporting is itself an example of this working: publishing what gets disrupted creates a paper trail other labs, researchers, and regulators use.

**Governments need enforceable standards, not voluntary pledges.** The NIST AI Risk Management Framework gives organizations a structure for managing AI risk, but a framework only changes behavior when there is a real cost to ignoring it. Testing requirements, incident reporting obligations, and rules for high-risk deployments need teeth.

**Countries need to coordinate, because AI capability does not stop at a border.** The [EU AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) is the clearest example of a government trying to build a risk-tiered rulebook for AI, but a rulebook only one bloc enforces shifts the highest-risk development to jurisdictions with fewer rules. International cooperation matters most for the narrow set of capabilities, autonomous cyberattack tools, biological research assistance, which create risk regardless of where they were built.

**Access should scale with risk, not with price.** A general-purpose chatbot helping someone draft a resume does not need the same controls as a system capable of autonomously executing a multi-step cyberattack. I made a version of this argument recently writing about [why an AI agent shouldn't inherit your permissions](/2026/09/03/your-ai-agent-shouldnt-have-your-permissions/): the more autonomy and reach a system has, the stronger the controls around it need to be, and this principle applies as much to who gets access to a capability as to what an agent is allowed to do once it has the access.

## The bottom line {#bottom-line}

My original framing, a $200 subscription turning anyone into a dangerous expert, was too strong. AI does not manufacture expertise, and treating it like it does is easy to argue against. But the sharper version of the argument holds up, and now there is a report with case numbers behind it, not only intuition: AI is lowering the cost of performing tasks whose consequences used to require real training to trigger, and it is doing so faster than governments, companies, and international agreements are able to build the guardrails to manage it.

This is not an argument to stop building AI. It is an argument for responsible development, enforceable safeguards, and international cooperation to close the gap between what the technology allows and what our institutions are prepared to manage, before the gap gets too wide to close.

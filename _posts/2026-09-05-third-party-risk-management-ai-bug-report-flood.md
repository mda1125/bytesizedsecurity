---
description: "Third-party risk management rarely measures whether a vendor can triage vulnerability reports at AI scale. Here is what to ask before you renew."
layout: post
title: "Third-Party Risk Management in 2026: The AI Bug Report Flood"
category: DevSecOps
tags: ["Third-Party Risk", "Vulnerability Management", "AI Security", "Compliance"]
author: Marc
excerpt: "AI-assisted research is finding vulnerabilities faster than vendors can validate them. Your vendor questionnaire asks whether suppliers scan for vulnerabilities. It almost never asks whether they are staffed to survive the results. That gap is now a third-party risk problem you inherit."
image: "/assets/img/posts/third-party-risk-management-ai-bug-report-flood.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-09-05
slug: third-party-risk-management-ai-bug-report-flood
faq:
  - question: "What is third-party risk management?"
    answer: "Third-party risk management is the practice of identifying and controlling the risk your organization inherits from vendors, suppliers, and service providers. It usually covers security questionnaires, contractual obligations, audit evidence, and ongoing monitoring. Most programs measure whether a vendor has security controls in place, not whether the vendor has the operational capacity to act on what those controls find."
  - question: "Does AI find real software vulnerabilities?"
    answer: "Yes. AI-assisted analysis has moved from theory to working practice, and researchers now use it to surface genuine flaws in real codebases. The curl project notes it makes no difference to their assessment whether a human or an AI pointed out the issue. What matters is whether the report is reproducible and clearly written."
  - question: "What is a vulnerability disclosure program?"
    answer: "A vulnerability disclosure program is a published process telling researchers how to report security flaws to an organization, and committing that organization to receive and act on those reports. It defines intake channels, scope, safe-harbour terms, and response expectations. A program without staffing behind it becomes a mailbox nobody reads."
  - question: "How long does a vendor have to fix a reported vulnerability?"
    answer: "There is no single deadline, but coordinated disclosure sets practical limits. CISA states it may publicly disclose a vulnerability as early as 45 days after reporting when a vendor is unresponsive or will not commit to a reasonable remediation timeframe. That clock runs whether or not the vendor has capacity to triage the report."
  - question: "What should a vendor security assessment ask about vulnerability response?"
    answer: "Ask for median time to triage and median time to remediate, broken out by severity. Ask for current backlog volume, how duplicate reports are detected, how reporters are authenticated, and what the contractual escalation path looks like when a critical flaw affects you. Request evidence, not policy documents."
---

Your vendor questionnaire asks whether suppliers scan for vulnerabilities. It almost never asks whether they are staffed to survive the results.

**TL;DR:** AI-assisted vulnerability research is producing more bug reports than many software vendors can validate, prioritize, and fix. The bottleneck has moved. It used to sit at discovery, where finding a flaw was the hard part. It now sits at vendor intake and remediation, where a small team has to authenticate reporters, spot duplicates, prove exploitability, and ship a patch. Third-party risk management still measures the wrong half of this. Most vendor reviews confirm a supplier runs scans and publishes a disclosure policy, without ever asking how fast that supplier clears its queue. You inherit the queue.

---

For two decades, the scarce resource in software security was attention. Finding a memory-safety bug buried in a large C codebase took real skill, sustained hours, and the motivation to keep going when the first hundred attempts turned up nothing. That scarcity shaped everything downstream. It set how vendors staffed product security, because reports arriving a few dozen times a year need only a couple of engineers to keep pace.

AI-assisted analysis changed the supply side of that equation. It did not make every finding valid, and it did not make triage easier. It made submission cheap.

## What is changing about vulnerability discovery? {#what-changed}

> Discovery is no longer the constraint. Vendors now receive more candidate findings than they have engineers to validate, so the limiting factor has shifted from finding flaws to confirming and fixing them.

The change is not that AI finds bugs humans never could. It is that the cost of generating a plausible-looking report collapsed, while the cost of evaluating one stayed flat. A maintainer still has to read the report, reproduce the issue, decide whether it is exploitable, check whether it duplicates something already in the queue, and then write and ship a fix.

The [curl project](https://daniel.haxx.se/blog/2026/06/29/do-excellent-vulnerability-reports/), which has handled well over one thousand vulnerability reports across its history, is direct about where the pressure lands. Daniel Stenberg notes the project "only has a limited small number of overloaded maintainers that take care of the reports," and asks reporters to "be helpful and respect that you add a load to a small team that probably consists of volunteers."

Notably, curl does not treat AI involvement as disqualifying. Stenberg writes that whether you found the flaw by accident, by reading every line of source, "or if an AI pointed it out to you, it has little relevance to the security team." The project's ask is about report quality, not tooling: lead with a human-written explanation, supply a standalone reproducer, name the affected versions, and stay available.

That distinction matters for how you assess vendors. The problem is not AI. The problem is volume meeting a team sized for a slower era.

## Why does third-party risk management miss vendor response capacity? {#tprm-blind-spot}

> Vendor questionnaires were built to verify that controls exist. Response capacity is a throughput question, so it needs different evidence: queue depth, median triage time, and remediation rates by severity.

Open a standard vendor security assessment and you will find questions shaped like checkboxes. Do you perform vulnerability scanning? Do you run a vulnerability disclosure program? Do you patch critical vulnerabilities? Every one of those has a yes answer available to a vendor whose product security queue is nine months deep.

The reason is structural. A third-party risk assessment verifies the presence of a control. Response capacity is not a control, it is a rate. A vendor with an excellent policy and two overloaded engineers passes the questionnaire and still leaves your critical finding unaddressed for two quarters.

This is the same failure pattern behind breaches where the control existed on paper and the operational follow-through did not. LexisNexis confirmed its second breach in two years after an [unpatched application and an over-permissioned IAM role](/2026/03/06/lexisnexis-breach-unpatched-app-leaky-iam-and-your-data/) gave an attacker far more reach than the application needed. Nobody lacked a patching policy. The gap was between the policy and the queue.

## What does a disclosure bottleneck cost you as a customer? {#customer-cost}

> You absorb the exposure window. A vendor's unvalidated backlog is your unpatched attack surface, and coordinated disclosure timelines run on the reporter's clock, not on your vendor's staffing level.

Three costs land on you, and none of them appear on the vendor's side of the contract.

The first is a longer exposure window. A vulnerability sitting unvalidated in a vendor's inbox is still present in the software you run. The report existing does not reduce your risk. Only the fix does.

The second is disclosure timing you do not control. CISA's [coordinated vulnerability disclosure process](https://www.cisa.gov/coordinated-vulnerability-disclosure-process) states that where "a vendor is unresponsive or will not establish a reasonable timeframe for remediation, CISA may disclose vulnerabilities as early as 45 days." Read that from your seat rather than the vendor's. A supplier too swamped to commit to a remediation date is a supplier whose flaw becomes public knowledge on someone else's schedule, while you are still waiting for a patch.

The third is signal loss. This is the one most likely to hurt and least likely to be measured. When intake volume climbs and triage capacity does not, the genuinely critical report does not get rejected. It gets buried. A product security team working through an undifferentiated queue is a team more likely to miss the one finding that mattered.

That last point is why breach response speed and disclosure capacity belong in the same conversation. The [notification failures I wrote about in the BHCHP breach](/2026/08/12/data-breach-notification-184914-homeless/) came from response operations that were never designed for the population they had to reach. Vulnerability intake fails the same way when design assumptions stop matching volume.

## Which frameworks already require vendor vulnerability response? {#framework-mapping}

> Every major framework you already report against covers this. Supplier oversight and vulnerability response are existing control families, so asking about capacity requires no new compliance language.

You do not need a new standard to justify these questions. The obligations exist across the frameworks most security and compliance teams already track.

| Framework | Control | What it expects |
|---|---|---|
| [NIST CSF 2.0](https://www.nist.gov/cyberframework) | GV.SC-07, ID.RA-01 | Supplier risk is assessed and monitored over time, and vulnerabilities in assets are identified and recorded |
| [AICPA SOC 2](https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022) | CC7.1, CC9.2 | Monitoring detects vulnerabilities, and vendor and business partner risk is assessed and managed |
| [ISO/IEC 27001:2022](https://www.iso.org/standard/27001.html) | Annex A 8.8 | Technical vulnerabilities are identified, evaluated, and acted on in a timely manner |
| [NIST SSDF, SP 800-218](https://csrc.nist.gov/Projects/ssdf) | RV.1, RV.2 | Producers identify residual vulnerabilities in releases, confirm them, and respond appropriately |

The SSDF framing is the useful one to quote in a vendor conversation. Its Respond to Vulnerabilities group exists to "identify residual vulnerabilities in software releases and respond appropriately to address those vulnerabilities and prevent similar vulnerabilities from occurring in the future." Confirming and responding are named activities, not implied ones. A vendor claiming SSDF alignment has already accepted that intake and remediation are part of the deal.

## What should you add to vendor reviews this week? {#vendor-review-checklist}

> Request throughput evidence for your critical vendors: median triage and remediation time by severity, current backlog depth, duplicate handling, reporter authentication, and the contractual escalation path for a flaw affecting you.

Start with the vendors whose failure would hurt most, not with your whole supplier list. For each one, ask for the following, and ask for evidence rather than assurances.

1. **Median time to triage, by severity.** Not the vulnerability triage target written in the policy. The observed median over the last two quarters.
2. **Median time to remediate, by severity.** Same standard. A vendor tracking this already will produce it quickly. A vendor who has never measured it will tell you something about their operation by struggling.
3. **Current backlog depth.** How many reports are open and unvalidated right now, and how has that number moved over six months. Direction matters more than the absolute figure.
4. **Duplicate and deduplication handling.** At machine-scale submission, duplicate detection is what protects the queue. Ask how it works.
5. **Reporter authentication and intake channels.** Who can submit, how they are verified, and what stops the channel from being trivially flooded.
6. **Contractual escalation path.** When a critical vulnerability affects your deployment specifically, who do you call, and what timeline are they bound to. Get this into the contract, not the relationship.

If a vendor treats these as unreasonable, that is your answer. The questions describe work they already claim to do.

## Does more vulnerability reporting make software safer? {#contrarian}

> Not automatically. Without stronger intake and remediation capacity, higher report volume creates denial-of-service conditions for small product security teams and makes genuinely critical findings harder to see.

The optimistic reading of AI-assisted research says more eyes on more code produces safer software. That holds only if the receiving end scales with the sending end.

It has not. Reporting got cheaper. Validating, patching, regression-testing, and publishing an advisory did not. When a system's input rate rises and its service rate stays fixed, the queue grows without limit. This is basic queueing behaviour, and it does not care how good anyone's intentions are.

So the honest framing is narrower than the headline. AI is not ending the era of hidden vulnerabilities. It is exposing how few vendors are staffed to receive them. A flaw reported and unread is still hidden in every way that matters to you as the customer running the software.

The parallel to autonomous systems is close, and worth noting. In writing about [why AI agents should not inherit your permissions](/2026/09/03/your-ai-agent-shouldnt-have-your-permissions/), the failure was giving an automated system authority nobody had sized the controls for. Vulnerability intake is the same shape from the other direction: automation raising volume through a channel nobody resized to match.

Third-party risk management has a straightforward job here. Stop asking whether your vendors look for problems. Start asking what happens after they find them, and get the answer in writing before renewal.

What does your current vendor assessment ask about remediation throughput? For most programs I have looked at, the honest answer is nothing at all.

---
description: "FOIA records show Medicare's WISeR AI prior authorization model produced 83-day waits, 20,000+ denials, and vendor software shipped untested."
layout: post
title: "Medicare AI Prior Authorization: 83-Day Waits in 2026"
category: "Privacy"
tags: ["Medicare", "AI Prior Authorization", "Algorithmic Accountability", "Healthcare"]
author: Marc
excerpt: "EFF sued CMS and won roughly 1,000 pages of records about WISeR, the AI prior authorization model now running in six states. The documents show weeks-long waits, vendors paid a share of the care they refuse, and software one vendor admitted was not fully tested before launch. Here is what the records say, and what patients and caregivers should do about it."
image: "/assets/img/posts/medicare-ai-prior-authorization-wiser-foia.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-09-11
slug: medicare-ai-prior-authorization-wiser-foia
faq:
  - question: "What is the WISeR model in Medicare?"
    answer: "WISeR stands for Wasteful and Inappropriate Service Reduction. It is a <a href=\"https://www.cms.gov/priorities/innovation/innovation-models/wiser\">CMS innovation model</a> running from January 2026 through December 2031 in New Jersey, Ohio, Oklahoma, Texas, Arizona, and Washington. Private vendors use AI and machine learning, plus human clinical review, to decide prior authorization requests for a set of traditional Medicare services."
  - question: "Does a human review AI prior authorization denials under WISeR?"
    answer: "CMS says a qualified human clinician reviews every denial. The concern is influence, not absence. A 2025 review in AI &amp; Society, <a href=\"https://doi.org/10.1007/s00146-025-02422-7\">Exploring automation bias in human-AI collaboration</a>, finds people frequently defer to an algorithmic recommendation instead of independently re-deciding, so a human signature does not by itself prove independent judgment happened."
  - question: "How do I appeal a Medicare prior authorization denial?"
    answer: "Ask your provider for the written denial and the specific coverage criteria cited, then file through the <a href=\"https://www.medicare.gov/claims-appeals/how-do-i-file-an-appeal\">Medicare appeals process</a>. Appeals are worth filing: KFF found <a href=\"https://www.kff.org/medicare/issue-brief/nearly-50-million-prior-authorization-requests-were-sent-to-medicare-advantage-insurers-in-2023/\">80.7% of appealed Medicare Advantage denials were overturned in 2024</a>, yet only 11.5% were appealed at all."
  - question: "Are WISeR vendors paid more when they deny care?"
    answer: "Yes. Vendors receive a share of averted expenditures, so refusing a request generates revenue, though not for denials reversed on appeal. CMS ties payment rates to quality scores as a safeguard, but the WISeR Data Reporting Guide obtained by EFF shows low quality scores reduce payment by only 5% to 10%."
  - question: "What services does Medicare's WISeR program cover?"
    answer: "Year one covers 13 services including steroid injections for pain, cervical fusion, arthroscopic knee surgery, and certain skin substitutes. A June 2025 CMS planning document in the released records floats adding air ambulance transport, cancer treatment, MRI scans, and medications, which would push AI review onto urgent care."
---

The target was 72 hours. One request sat for 83 days.

**TL;DR:** EFF sued CMS and obtained roughly 1,000 pages of records about WISeR, the AI prior authorization model launched in six states in January 2026. The documents show vendors missing the 72-hour response deadline at scale, one request unanswered for 83 days, more than 20,000 denials from two vendors in three months, and a vendor telling CMS a month before launch its software was not fully tested. Vendors earn a share of the spending they avert, and a planning document floats expanding the program to cancer treatment and air ambulance transport.

---

Prior authorization is the step where your doctor asks permission before treating you. For most of traditional Medicare's history, the step did not exist for the services now covered by WISeR. In January 2026 it did, and the decision-maker changed too. Private companies now evaluate those requests using AI, and the [Electronic Frontier Foundation went to court](https://www.eff.org/press/releases/eff-sues-answers-about-medicares-ai-experiment) to find out how.

The records came back on September 8. They describe a program failing at the basics.

This is an accountability story as much as a healthcare one. WISeR is an automated decision system with real consequences for real people, incentives pointing at one answer, and almost no visibility from outside. We argue against exactly those conditions everywhere else.

**Jump to a section:**

- [What is Medicare's WISeR model, and who does it affect?](#what-is-wiser)
- [What do the FOIA records show about WISeR delays?](#delays)
- [Why do WISeR vendors profit when they deny care?](#financial-incentive)
- [How many prior authorization requests has WISeR denied?](#denial-volume)
- [Did WISeR vendors go live with untested software?](#rushed-rollout)
- [Which medical services are on WISeR's expansion list?](#expansion)
- [Why does an AI prior authorization program matter beyond healthcare?](#accountability)
- [What should patients and caregivers do right now?](#patient-checklist)

## What is Medicare's WISeR model, and who does it affect? {#what-is-wiser}

> WISeR is a six-year CMS pilot running from January 2026 to December 2031 in New Jersey, Ohio, Oklahoma, Texas, Arizona, and Washington. Private vendors use AI to review prior authorization requests for 13 traditional Medicare services.

WISeR stands for Wasteful and Inappropriate Service Reduction. [CMS describes the model](https://www.cms.gov/priorities/innovation/innovation-models/wiser) as a way to protect taxpayers by combining AI and machine learning with human clinical review, targeting services vulnerable to fraud, waste, and abuse. The agency points to research finding waste accounts for up to a quarter of US health care spending.

The mechanics matter more than the framing. Six states. Six performance years. Thirteen services in year one, including steroid injections for pain management, cervical fusion, arthroscopic knee surgery, and certain skin and tissue substitutes, [per the CMS non-compliance notice reported by KUOW](https://www.kuow.org/2026-06-25/feds-reprimand-private-company-using-ai-to-review-wa-medicare-claims-over-delayed-processing).

The population is the part worth sitting with. Washington state alone has more than 1.5 million Medicare enrollees, roughly half in traditional Medicare. Until 2026, those people did not need prior authorization for most services. Now some of them do, and an algorithm has a say.

## What do the FOIA records show about WISeR delays? {#delays}

> CMS publicly commits vendors to a 72-hour response window. Internal status reports from the program's first months show vendors missing it for a significant share of requests, including one prior authorization request left unanswered for 83 days.

The 72-hour figure comes from [CMS's own WISeR FAQ](https://www.cms.gov/priorities/innovation/files/document/wiser-model-frequently-asked-questions). The internal reality, per the [records EFF published](https://www.eff.org/deeplinks/2026/09/new-records-reveal-problems-medicares-ai-prior-authorization-experiment), looks different. January 2026 timeliness data for two vendors shows a meaningful volume of requests blowing past the deadline. One request sat for 83 days.

Eighty-three days is not a rounding error on a three-day target. It is a different category of failure.

Provider feedback in the released records puts faces on the delay data. EFF published [March 2026 responses to a feedback form](https://www.eff.org/document/wiser-foia-response-feedback-survey-1) about Innovaccer, the vendor handling Ohio. Three comments stand out:

> "We have patients calling our offices crying in pain because their procedures are being delayed while awaiting approvals or guidance tied to this model. A 3-4 day delay for necessary pain procedures is already difficult for vulnerable patients, but when providers cannot obtain answers for weeks, the situation becomes unacceptable."

> "I HAVE HAD TO WATCH 3 PATIENTS CRY AT BEDSIDE FOR NOT HEARING BACK ON THEIR PRIOR AUTH FOR KYPHOPLASTY/VERTABRAL AUGMENTIATION PROCEDURE. THESE PATIENTS ARE IN DEEP PAIN."

> "I have had cases submitted and waiting over 1 1/2 months for a UTN to be generated… In the meantime patients are having to be cancelled for surgeries they need. This is not acceptable they are severely hindering patient care."

Those are providers writing to the government, in a government feedback form, in capital letters. The [Seattle Times documented the same pattern](https://www.seattletimes.com/business/new-medicare-program-in-wa-leaves-patients-in-pain-awaiting-approvals/) in Washington, and [KFF Health News](https://kffhealthnews.org/medicare/medicare-ai-prior-authorization-wiser-delays-errors/) reported delays and errors across the program.

Delay functions as denial here. A surgery cancelled because approval never arrived is care the patient did not receive, whether or not anyone typed the word "no."

## Why do WISeR vendors profit when they deny care? {#financial-incentive}

> Vendors receive a share of averted expenditures, so denials generate revenue. Reversals on appeal do not pay. CMS ties rates to quality scores, but the released Data Reporting Guide shows low scores cut payment only 5% to 10%.

This is the finding to carry with you.

The payment design pays vendors for the care they refuse. EFF's records confirm the structure: vendors are compensated on averted spending, minus anything overturned on appeal. Refusing a request is the revenue event.

CMS's public answer is quality scores. Tie a vendor's payment rate to the timeliness and accuracy of its decisions and the incentive supposedly balances out. The *WISeR Data Reporting Guide* in the released records sets the size of the correction: low quality scores reduce payment rates by 5% to 10%.

Run the arithmetic from the vendor's side. Denials pay in full. Bad decisions cost a tenth of the rate, at most. A control has to be larger than the behavior it is meant to counteract, and a 5% to 10% haircut against 100% of denial revenue is not.

Add the appeals data and the incentive gets worse. KFF's analysis of Medicare Advantage prior authorization found [only 11.5% of denied requests were appealed in 2024, while 80.7% of appeals were overturned](https://www.kff.org/medicare/issue-brief/nearly-50-million-prior-authorization-requests-were-sent-to-medicare-advantage-insurers-in-2023/). Unappealed denials pay out permanently. A system where most wrongful refusals are never contested rewards refusing.

Representative Suzan DelBene, who has pushed to repeal the program, [put the transparency problem plainly](https://delbene.house.gov/news/documentsingle.aspx?DocumentID=4426): "This program is one big black box right now."

## How many prior authorization requests has WISeR denied? {#denial-volume}

> Two vendors denied more than 20,000 prior authorization requests in the program's first three months. One, Virtix Health, denied more than it approved during the period, and CMS later required a Corrective Action Plan.

A March 30, 2026 status report in the released records carries the decision data. Two companies, 20,000-plus denials, one quarter.

Virtix is the outlier worth naming, having refused more requests than it granted over the period. For context on what a normal denial rate looks like, KFF found Medicare Advantage insurers denied 7.7% of requests in 2024, and traditional Medicare denied 22.9%. A vendor denying more than half is operating well outside both.

CMS found Virtix out of compliance on 72-hour turnaround times and [required a Corrective Action Plan](https://delbene.house.gov/news/documentsingle.aspx?DocumentID=4426), auditing the company across clinical determinations, communications, portal functionality, customer service, and timeliness. Federal officials moved to biweekly performance meetings with the vendor.

Note what triggered the enforcement. Virtix was cited for being slow, not for the denial rate. CMS reported turnaround times improving to 1.7 days. Speed got measured and fixed. Whether the decisions were correct is a separate question the public still cannot answer, which is DelBene's point about the black box.

## Did WISeR vendors go live with untested software? {#rushed-rollout}

> A month before launch, Innovaccer told CMS its software lacked full functionality and had not completed end-to-end testing. It said it would auto-approve all requests until it finished building, because CMS declined to delay the start date.

CMS launched WISeR six months after [announcing the model](https://www.cms.gov/newsroom/press-releases/cms-launches-new-model-target-wasteful-inappropriate-services-original-medicare). Both [hospitals](https://www.aha.org/lettercomment/2025-10-23-aha-comments-cms-wiser-model) and at least one vendor warned the timeline was too short. CMS held the date.

About a month before go-live, Innovaccer notified CMS it intended to launch a version of its software without full functionality and without complete end-to-end testing. The barriers it cited read like a familiar postmortem: changing requirements, unclear governance, and no time to test with the provider community. Its stated workaround was to auto-affirm every prior authorization request until the real functionality existed, because, in the vendor's words, "Given CMS's decision not to delay the model start date, auto-affirming is the only path available."

Be precise about what auto-affirm means, because it cuts against the easy reading. Auto-affirming approves requests. Nobody was denied by untested code. The failure is different and still serious: a program justified as reducing waste spent its opening period not evaluating anything, while providers absorbed the administrative burden of a review process producing no review.

By an April 2026 status report, Innovaccer had still not finished developing and testing some features. Weekly status reports across the released records show the technical problems were not one vendor's.

Ship-it-and-fix-it-later is a decision with a known cost profile. Applied to a checkout flow, the cost is a bad quarter. Applied to whether a Medicare patient gets a spine procedure, the cost lands on people with no visibility into the system and no say in it.

## Which medical services are on WISeR's expansion list? {#expansion}

> A June 2025 CMS planning document in the released records lists possible additions, including services needing authorization on a "more urgent or emergent basis": air ambulance transport, cancer treatment, MRI scans, and medications.

Year one's 13 services are largely elective procedures, painful to wait for and rarely fatal to wait for.

The planning document in EFF's records considers a different tier. Air ambulance transport. Cancer treatment. MRI scans. Medications without publicly available coverage criteria. CMS's own language acknowledges these would require authorization decisions on a "more urgent or emergent basis."

Apply the measured performance to those services. A program leaving one request unanswered for 83 days, with vendors missing a three-day deadline at scale, is under consideration for decisions where the timeline is hours. The 83-day request becomes a fundamentally different event when the service is an air ambulance.

CMS is still producing records under the lawsuit, and expansion remains a planning idea rather than a decision. Planning documents are also how programs get built.

## Why does an AI prior authorization program matter beyond healthcare? {#accountability}

> WISeR is an automated decision system with financial incentives pointing the wrong way, human review positioned as the only meaningful control, and no external audit trail. Every one of those is a failure pattern security teams already know.

Strip out the healthcare specifics and look at the control design.

**The human-in-the-loop carries more weight than it should.** CMS's central safeguard is a qualified clinician reviewing all denials. The research EFF cites undercuts how much protection a signature provides. *Cognitive Research: Principles and Implications* published [The impact of AI errors in a human-in-the-loop process](https://doi.org/10.1186/s41235-023-00529-3) in 2024, and a 2025 review in *AI & Society*, [Exploring automation bias in human-AI collaboration](https://doi.org/10.1007/s00146-025-02422-7), surveys the same effect: people routinely defer to algorithmic recommendations rather than re-deciding independently. A reviewer handed a recommendation and a queue is not the same as a reviewer forming a judgment. This is the same argument I made about [AI agents inheriting human permissions](/2026/09/03/your-ai-agent-shouldnt-have-your-permissions/): an approval gate is a backstop, not an access-control strategy. Approval steps degrade under volume. Controls need to survive a tired human clicking through.

**The incentives point at the failure mode.** Any threat model starts with who benefits. Here the answer is documented: the party deciding whether you get care earns money by refusing. You would not accept a penetration test where the tester got paid per finding they declined to verify.

**No one outside the program has an audit trail to inspect.** EFF's FOIA request specifically sought tests for accuracy, bias, and hallucination in vendor technology, along with any audits or evaluations. After roughly 1,000 pages, the public still does not know what models these vendors run or how they were validated. No model documentation. No published error rates. No bias testing available for review. Procurement would stop this posture for any system inside your own environment.

**The people affected have the least visibility.** A patient sees a delay, not a decision. They are rarely told an algorithm was involved, which criteria applied, or how often appeals succeed. The gap between a process technically functioning and the people it serves being able to use it is the same failure as [a breach notification the affected people cannot act on](/2026/08/12/data-breach-notification-184914-homeless/), and the same absent accountability trail as [license plate readers queried without meaningful oversight](/2026/08/21/cop-license-plate-reader-stalking/).

We got the details here because a civil liberties organization sued. This is not a scalable transparency mechanism.

## What should patients and caregivers do right now? {#patient-checklist}

> Ask whether your service needs WISeR authorization, get the submission date in writing, track the 72-hour clock, request the written denial and the criteria cited, ask whether a human clinician reviewed it, and appeal. Most appeals succeed.

If you or someone you care for is on traditional Medicare in New Jersey, Ohio, Oklahoma, Texas, Arizona, or Washington, this applies to you.

1. **Ask directly whether prior authorization is required.** Name it: "Does this service need WISeR authorization?" Providers in these six states know the term.
2. **Get the submission date in writing.** The 72-hour clock cannot be tracked without a start time. Ask for the unique tracking number, referred to as a UTN, when one is issued.
3. **Follow up at 72 hours.** Not at two weeks. CMS's public commitment is three days, and the records show the deadline gets missed quietly.
4. **Document every delay.** Dates, names, what you were told. Provider complaints in the released records are why any of this is public, and constituent stories drove [the congressional letters requesting denial and appeal data](https://delbene.house.gov/news/documentsingle.aspx?DocumentID=4426).
5. **Demand the written denial and the specific criteria.** A denial without the coverage criteria it applied cannot be argued against. Ask for both.
6. **Ask whether a human clinician reviewed the denial.** CMS says one must. Asking on the record turns policy into practice.
7. **Appeal. Then appeal again if needed.** This is the highest-leverage step on the list. [Medicare's appeals process](https://www.medicare.gov/claims-appeals/how-do-i-file-an-appeal) has multiple levels, and the odds are good: 80.7% of appealed Medicare Advantage denials were overturned in 2024, while under 12% of denials were ever appealed. Unappealed denials are also the ones vendors keep getting paid for.
8. **Get free help.** Every state runs a [State Health Insurance Assistance Program](https://www.shiphelp.org/) offering free Medicare counseling, including appeals support.

For providers: the feedback forms work. The quotes in EFF's records came from a routine vendor feedback survey and are now public evidence in a policy fight.

## The bottom line {#bottom-line}

WISeR is a live experiment on roughly six states' worth of Medicare patients, and the first substantial look inside it came from a lawsuit rather than from disclosure.

What the records establish: vendors missing a three-day deadline badly enough to leave a request open for 83 days, more than 20,000 denials from two companies in a quarter, one vendor denying more than it approved, a payment design rewarding refusal with a 5% to 10% penalty as the counterweight, and software shipped before testing finished. What they do not establish is anything about the models themselves, because the information has not been released.

The pattern generalizes past Medicare. Automated decisions land on people who never see the system, incentives quietly favor one answer, human review carries a load it was not built for, and nobody outside audits any of it. Prior authorization is where this argument is happening in 2026. It will not be the last place.

Appeal your denials. Four out of five get overturned, and the ones nobody contests are the ones the system is built to produce.

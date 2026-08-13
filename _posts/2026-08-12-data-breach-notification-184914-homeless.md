---
description: "A homeless health program's data breach notification took 280 days, arrived by mail to 184,914 people with no address, and still isn't on the HHS portal."
layout: post
title: "The Data Breach Notification 184,914 People Can't Use"
category: "Privacy"
tags: ["Data Breach Notification", "Healthcare Data Breach", "HIPAA", "Privacy"]
author: Marc
excerpt: "Boston Health Care for the Homeless mailed breach letters to 184,914 patients — people whose defining circumstance is not having a mailing address — then gave them 90 days, an internet connection, and an email to enroll in credit monitoring. Here is what the notification got wrong, and the three questions every breach-response owner should ask before it happens to them."
image: "/assets/img/posts/data-breach-notification-184914-homeless.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-08-12
slug: data-breach-notification-184914-homeless
faq:
  - question: "How long do companies have to notify you of a data breach?"
    answer: "It depends on the law. <a href=\"https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html\">HIPAA's Breach Notification Rule</a> gives covered entities up to 60 days from discovery to notify individuals, and state laws vary from 30 to 90 days. But the clock starts at discovery, not at the breach — so a months-long forensic investigation can legally sit between the intrusion and your letter."
  - question: "What is a data breach notification letter?"
    answer: "It is the formal notice an organization sends after your personal data may have been exposed. It should name what data was involved, when the breach happened, and what protection is offered — usually credit monitoring. Many are filed publicly with state attorneys general, so you can often read the exact letter even if yours never arrived."
  - question: "Does HIPAA require reporting a breach to the government?"
    answer: "Yes. Under the <a href=\"https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html\">HITECH Act</a>, breaches of protected health information affecting 500 or more people must be reported to HHS and are posted on the Office for Civil Rights public breach portal. Smaller breaches are reported annually. The public list is how anyone can verify a health data breach independently."
  - question: "Should you use credit monitoring or a credit freeze after a breach?"
    answer: "A credit freeze is stronger and free. Monitoring only alerts you after someone opens credit in your name; a freeze <a href=\"https://consumer.ftc.gov/articles/what-know-about-credit-freezes-fraud-alerts\">blocks new accounts from being opened at all</a>. You place it directly with each of the three bureaus, it never expires, and it does not require enrolling in a vendor's portal within a deadline."
---

They gave people who don't have a mailing address ninety days, an internet connection, and an email account as the price of finding out if someone is opening credit in their name.

**TL;DR:** Boston Health Care for the Homeless Program suffered a network intrusion that exposed Social Security numbers, medical records, and driver's license data for **184,914 people**. It took **280 days** to disclose. The remedy — credit monitoring — requires internet, email, and a 90-day deadline; the notification itself was a mailed letter to a population defined by not having a stable address. Five days after the letters went out, the breach still wasn't on the federal HIPAA registry, and the only people writing about it were law firms whose victim counts disagree by a factor of a thousand.

---

This is not a story about a clever hacker. It is a story about what the standard breach-response playbook produces when nobody asks who the notification is actually going to. The forensics, the credit-monitoring offer, the letter — every step was by the book. The book just never accounted for the patients this program serves.

## What actually went wrong with this breach notification? {#what-went-wrong}

> **Direct answer:** A first-class letter, mailed to 184,914 people whose defining circumstance is not having a stable address, offering credit monitoring that requires internet, an email account, and a 90-day deadline to enroll.

On August 7, 2026, Boston Health Care for the Homeless Program mailed a letter telling recipients their Social Security number, medical records, and driver's license information may have been taken in a network intrusion. It offered twelve months of single-bureau credit monitoring through Cyberscout, and it included this instruction:

> "you must enroll within 90 days from the date of this letter. The enrollment requires an internet connection and e-mail account"

Read that against the population it was mailed to. The remedy assumes a laptop. The notification assumes a mailbox. Neither assumption holds for someone sleeping in a shelter, and both were baked into a template that was almost certainly never reviewed against the question of who receives it.

## Why does a mailed letter fail 184,914 homeless patients? {#why-a-letter-fails}

> **Direct answer:** A mailed letter assumes a stable address these patients often lack, and the 90-day enrollment clock starts on the letter's printed date — not the day anyone reads it, if it arrives at all.

The enrollment isn't even the first thing that breaks. The letter is. It is mailed, first class, to people whose defining circumstance is not having a fixed place to receive mail.

And the ninety-day clock starts on the date printed at the top, not the day anyone opens the envelope. If your mail routes to a shelter, a clinic front desk, a relative, or a general-delivery window you reach every few weeks, the clock is already running down while the letter sits there. If you moved between the breach and the mailing — not exactly rare in this population — it never arrives at all.

So the question to put to the program is not "why did you offer credit monitoring." It's: **what address did you have for these people, how many letters came back undeliverable, and what did you do for those patients instead?** That answer is the difference between a notification and a compliance artifact.

## How long did the breach take to disclose? {#timeline}

> **Direct answer:** 280 days. The breach dates to October 31, 2025; letters were dated August 7, 2026. Seven of those months sit between knowing the network was hit and knowing whose data was in it.

Everything below comes from the program's own notice letter, filed with the California Attorney General and public at [the California AG breach reporting portal](https://oag.ca.gov/ecrime/databreach/reports/sb24-627990).

| Date | What happened |
|---|---|
| Oct 31, 2025 | Breach date, per the California AG filing |
| Nov 11, 2025 | Network disruption first learned of |
| Jun 8, 2026 | Discovered that personal information was potentially impacted |
| Aug 7, 2026 | Notice letters dated and mailed |

Two hundred and eighty days from breach to notification. Anyone who has run incident response knows the seven-month gap between "our network was hit" and "here's whose data was in it" is where the forensics live, and that it is rarely fast. It is still 280 days during which 184,914 people didn't know. This is the same pattern I wrote about with the [iRhythm breach that exposed 12 million patient records](/2026/06/16/irhythm-data-breach-12-million-patient-records-exposed/): in healthcare, the disclosure lag is the story as much as the intrusion.

## Where is this breach in the federal HIPAA registry? {#hhs-portal}

> **Direct answer:** As of August 12, 2026 — five days after the letters went out — the breach did not appear on the HHS Office for Civil Rights portal, though the HITECH Act requires posting breaches affecting 500 or more people.

The authoritative number isn't from a press release. It's breach 2026-1319 in the Massachusetts OCABR [2026 Data Breach Notification Report](https://www.mass.gov/lists/data-breach-notification-reports): **Boston Healthcare for the Homeless Program, 184,914 Massachusetts residents, with Social Security numbers, medical records, and driver's licenses all breached.** For scale, that one breach is roughly ten percent of every affected resident in the entire state this year.

Under the [HITECH Act's breach notification rule](https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html), HHS must post a public list of health data breaches affecting 500 or more people. 184,914 is 370 times that threshold. Yet when I searched the [HHS Office for Civil Rights breach portal](https://ocrportal.hhs.gov/ocr/breach/breach_report.jsf) on August 12 — by covered-entity name and by the word "Homeless" — both returned *No records found*, on a portal that was otherwise returning results normally.

The honest reading is that OCR posts in batches and this will likely appear. But that's the point: the federal registry built so the public can learn about health data breaches was, five days in, silent about one affecting 184,914 people — while Massachusetts already had it published with the specific data types listed. If you want to know what happened to your medical records in this country, the state currently has better data than the federal government.

## Who is actually reporting on the breach? {#who-is-reporting}

> **Direct answer:** Almost no one. The entire first page of Google is law firms and claims aggregators recruiting plaintiffs, plus one automated scraper — and their victim counts disagree by a factor of a thousand.

Here is the first page of Google results for this breach, checked August 12: classaction.org, a personal-injury firm, a claims aggregator, the program's own privacy page, Levi & Korsinsky, an automated scraper, and Class Action U. Five are law firms or claims mills recruiting plaintiffs. One is a bot. None is journalism.

And because nobody is checking, the numbers are wrong. Some pages say 184,914, matching the state record. One first-page result says **169** — off by a factor of a thousand. I only know which is right because I downloaded a 134-page state PDF and read the row. Nobody affected by this breach is going to do that. They'll read whatever ranks — which is exactly why knowing how to [remove your personal information from the internet](/2026/07/09/remove-personal-information-from-internet/) and lock down your own exposure matters more than any single letter.

## What should breach-response teams learn from this? {#practitioner-takeaway}

> **Direct answer:** Ask three questions before an incident, not during: can your notification physically reach the people it names, can they act on it once it does, and who tells your victims what happened if you don't?

If you own breach response, three questions come out of this:

1. **Can your notification physically reach the people it names, and can they act on it once it does?** Those are two separate failures and this breach has both. A mailed letter assumes an address; credit-monitoring enrollment assumes internet, email, and a deadline. If you serve a population lacking any of those, your undeliverable-mail rate is a security metric whether or not anyone treats it as one. Ask this before the incident — you won't have the composure to ask during one.
2. **How long is your gap between "network event" and "identified individuals"?** This one was about seven months. Whatever yours is, it's longer than you think, and it's the number regulators and reporters will use to characterize you.
3. **Who tells your victims what happened, if you don't?** Here the answer was six law-firm landing pages and a scraper, with a victim count that varied by three orders of magnitude. That vacuum gets filled whether or not you fill it.

And whatever the letter offers, the stronger move for anyone affected is almost never the vendor's monitoring portal — it's a free credit freeze placed directly with the bureaus, the same playbook from my [guide to credit freezes and identity protection](/2026/02/26/lexisnexis-credit-freezes-your-guide-to-identity-protection/). Monitoring tells you after someone opens credit in your name. A freeze stops them.

One last detail, and I'm not sure whether it's funny or grim. The Massachusetts report I pulled these numbers from — the authoritative public record of every breach in the state this year — is a PDF whose embedded document title is still `TEST Breach Report Tracker - Masterlist 2024.xlsx`.

That's the system we're relying on.

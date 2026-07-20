---
description: "A solo-built index logs material breaches from SEC 8-K filings and refuses to total the losses. Here is what its data shows about cybercrime in 2026."
layout: post
title: "Cybercrime Losses in 2026: The Index With No Grand Total"
category: "Threats"
tags: ["Cybercrime Losses", "Data Breach Costs", "SEC Disclosure"]
author: Marc
excerpt: "A longtime security executive built a public breach ledger from SEC 8-K filings and graded every entry by evidence. Its most radical design choice is a refusal: it will never sum the losses into one headline number. The data underneath tells a sharper story than any total delivers."
image: "/assets/img/posts/cybercrime-losses-2026-hacker-in-a-hoodie-index.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-07-20
slug: cybercrime-losses-2026-hacker-in-a-hoodie-index
faq:
  - question: "How much does a data breach cost in 2026?"
    answer: "The most cited figure is IBM's Cost of a Data Breach report, which puts the global average near <a href=\"https://www.ibm.com/reports/data-breach\">$4.44 million per incident</a> in 2025, down about 9% from the year before. It measures one breach at a typical organization, not a national total, so it should never be added to aggregate loss figures."
  - question: "What is the Hacker in a Hoodie Index?"
    answer: "It is a public ledger of disclosed material breaches, built and run by security executive Richard Bird. One side pulls from SEC 8-K filings; the other from company statements and news reports. Every entry is graded Verified, Attested, or Inferred, so a reader knows how much weight the record carries before trusting it."
  - question: "Why does the index refuse to add up total losses?"
    answer: "Because the entries measure different things: verified SEC dollar figures, company estimates, and news-sourced approximations, across different victims and crime types. Summing them would produce a precise-looking headline backed by nothing. The project treats a single grand total as a forecast, not a statistic, and leaves each source standing on its own."
  - question: "Is the $10.5 trillion cybercrime figure real?"
    answer: "It is a forecast, not a measurement. The widely quoted $10.5 trillion projection comes from Cybersecurity Ventures, compounded from a 2015 base whose method was never published. Because it is assumed rather than counted, the index excludes it and warns against repeating it as though it were <a href=\"https://www.securityweek.com/new-index-tracks-material-breaches-and-refuses-to-add-up-the-losses/\">verified data</a>."
---

Cybersecurity finally has a public breach ledger. Its most radical feature is a number it will never show you.

**TL;DR:** Security executive Richard Bird built [The Hacker in a Hoodie Index](https://hackerinahoodie.com/index.html), a live ledger of disclosed material breaches drawn from SEC 8-K filings and news reports, with every entry graded Verified, Attested, or Inferred. It deliberately refuses to sum the losses into one headline figure, because adding a verified dollar amount to a news-sourced guess produces a number backed by nothing. The data it does show is sharper than any total: over the last decade, reported cybercrime losses grew about 5.3x faster than the S&P 500, while the cost of a single breach barely moved.

---

For a field obsessed with numbers, cybersecurity has never had an honest scoreboard. We quote a $10.5 trillion global cybercrime figure in keynotes and board decks, yet no one points to where it was measured. There is no official, citable, source-graded record of what breaches have cost. A new project, built and maintained by one person, sets out to fill the gap, and the way it handles the missing total is the most interesting part.

**Jump to a section:**

- [What is the Hacker in a Hoodie Index?](#what-is-it)
- [How much does a data breach cost in 2026?](#cost-per-breach)
- [How fast are cybercrime losses growing?](#growth)
- [Why won't the index add up the losses?](#why-no-total)
- [Is the $10.5 trillion cybercrime number real?](#trillion-myth)
- [What this means for how we measure security](#what-it-means)

## What is the Hacker in a Hoodie Index? {#what-is-it}

> **Direct answer:** It is a public, daily-updated ledger of disclosed material breaches, built by security executive Richard Bird. It pulls from SEC 8-K filings and news reports and grades every entry Verified, Attested, or Inferred.

The index is the work of [Richard Bird](https://www.securityweek.com/new-index-tracks-material-breaches-and-refuses-to-add-up-the-losses/), a longtime security leader and author, released ahead of his book *Built Wrong*. It runs on two ledgers he keeps current with scrapers he wrote himself, and it draws a direct line to Troy Hunt's Have I Been Pwned: a resource nobody else was building, started small because there was nowhere else to look.

The first ledger reads from SEC EDGAR, tracking the 8-K disclosures public companies must file when they hit a material cyber incident, a [requirement in force only since 2023](https://www.sec.gov/rules-regulations/2023/07/s7-09-22). The second ledger covers incidents surfaced in company statements and news coverage. At the time of writing, the ledgers hold well over a hundred incidents, from a Coca-Cola subsidiary to a healthcare lab breach affecting more than half a million people, the kind of health-data exposure I wrote about in the [iRhythm patient-records breach](/2026/06/16/irhythm-data-breach-12-million-patient-records-exposed/).

The grading is the part worth stealing. A primary SEC filing counts as *Verified*, a company's own statement as *Attested*, and a news report as *Inferred*. One glance tells you how much a given entry carries.

## How much does a data breach cost in 2026? {#cost-per-breach}

> **Direct answer:** IBM's widely cited report puts the global average near $4.44 million per breach in 2025, down about 9% from the prior year. It is a per-incident average, not a national total.

The reference figure most people reach for is IBM's Cost of a Data Breach report, which lands at roughly [$4.44 million per breach](https://www.ibm.com/reports/data-breach) in its latest edition. It is a modeled average across hundreds of organizations, and it answers a narrow question: what does one breach cost a typical company?

Here is the detail the headlines skip. The per-breach cost has been close to flat for a decade, rising around 2% a year and then slipping in the latest reading. If the price of a single event is holding steady while total reported losses climb fast, the growth is not coming from breaches getting more expensive. It is coming from more of them, against a wider attack surface.

## How fast are cybercrime losses growing? {#growth}

> **Direct answer:** Reported losses to the FBI's IC3 reached about $20.9 billion in 2025 and have compounded near 35% a year for a decade, roughly 5.3x the total return of the S&P 500 over the same window.

The clearest signal comes from the FBI's [Internet Crime Complaint Center](https://www.ic3.gov/annualreport/reports), whose reported losses reached about $20.9 billion in 2025. By the FBI's own account it is an undercount, since most victims never file a complaint. Even so, the trend is steep: losses have compounded at roughly 35% a year, about 5.3 times the total return of the S&P 500 across the same decade.

The three sources the index leans on measure sharply different slices of the problem, which is exactly why it keeps them apart:

| Source | What it counts | Latest (2025) | Growth |
|---|---|---|---|
| [FBI IC3](https://www.ic3.gov/annualreport/reports) | Reported losses from US victim complaints | ~$20.9B | ~35%/yr over the decade |
| [Chainalysis](https://www.chainalysis.com/reports/) | On-chain ransom payments to attackers | ~$0.82B | Volatile; peaked in 2023 |
| [IBM / Ponemon](https://www.ibm.com/reports/data-breach) | Modeled average cost of one breach | ~$4.44M | ~2%/yr, then fell in 2025 |

Read the columns, not a sum. One is a national reported total, one is a traced crypto figure, one is a per-event average. They overlap in places and are blind to each other in others.

## Why won't the index add up the losses? {#why-no-total}

> **Direct answer:** Because the entries count different things across different evidence tiers. Adding a verified SEC figure to an inferred news estimate creates a precise-looking headline with nothing solid behind it.

Most entries in the ledger are marked "not yet quantified," and the ones carrying a figure come from different evidence tiers. A verified dollar loss in an SEC filing is not the same kind of fact as an estimate lifted from a news story. Treating them as interchangeable and adding them together yields a precise-looking number resting on air.

Bird's own framing is blunt: summing the numbers turns data into a prediction, and the underreporting is severe enough to turn any headline total into a new myth with more citations attached. So the sources stay side by side, each labeled for what it counts, and the arithmetic stays honest. The index also refuses the opposite temptation, estimating the unmeasured and calling the result the real number. What no one measured has no figure, only its absence.

## Is the $10.5 trillion cybercrime number real? {#trillion-myth}

> **Direct answer:** No. The $10.5 trillion figure is a forecast from Cybersecurity Ventures, compounded from a 2015 base whose method was never published. The index excludes it as an assumption, not a measurement.

The industry's favorite scare stat, the $10.5 trillion global cybercrime projection, is exactly the kind of number this project is built to avoid producing. It is a forecast from Cybersecurity Ventures, compounded from a 2015 base whose methodology was never disclosed, and it keeps circulating partly because AI systems trained on the open web repeat it back as fact.

The index leaves it off the chart and off the ledger on purpose. A figure claiming to cover the whole is not a bigger version of a real measurement; it is a projection wearing a statistic's clothes. This is the same dynamic behind so much [credential-theft and attack-volume reporting](/2026/04/12/credential-theft-new-normal-cyber-attacks/): the scary aggregate travels farther than the grounded, boring, verifiable detail.

## What this means for how we measure security {#what-it-means}

The sharpest line in the whole project is not a statistic. As Bird [told SecurityWeek](https://www.securityweek.com/new-index-tracks-material-breaches-and-refuses-to-add-up-the-losses/): "We built cybersecurity as a tax, not a value-added business function."

Business keeps score in dollars. Governments keep score in dollars. Consumers keep score in dollars. Cybersecurity is the one corporate function measured by activity instead of outcomes, treated as a cost of doing business rather than a tracked result. An index like this will not fix the problem overnight. What it offers is smaller and more useful: a citable, source-graded reference to check a claim against, the moment someone waves a trillion-dollar number at you.

The next time a vendor deck opens with a giant aggregate, ask the two questions this ledger is built on. Where was it measured, and what evidence grade does it carry? If the answer is a forecast, treat it like one.

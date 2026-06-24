---
description: "Niantic spun off 30 billion Pokemon Go scans into a 3D map now feeding U.S. military drone navigation. A privacy-policy line is not consent."
layout: post
title: "Pokemon Go Trained Military Drone Tech: A Consent Failure"
category: "Privacy"
tags: ["Privacy", "Data Ethics", "AI", "Consent"]
author: Marc
excerpt: "Pokemon Go's 30 billion player scans now power a 3D map a U.S. defense contractor is integrating into drone navigation for GPS-denied combat zones. The pipeline is technically disclosed and meaningfully unconsented. Here's why security and privacy teams should treat it as the template for the next decade of opt-in telemetry abuse."
image: "/assets/img/posts/pokemon-go-military-drones-consent-laundering.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-06-21
faq:
  - question: "Did Niantic actually sell Pokemon Go scans to a defense contractor?"
    answer: "Not directly. Niantic spun off Niantic Spatial in May 2025, which retained the AR scan dataset. Niantic Spatial then partnered with defense firm Vantor in December 2025 on a navigation system, and the scans trained an early version of Niantic Spatial's underlying model per the company's own statement."
  - question: "Is the Pokemon Go data inside the current Vantor military model?"
    answer: "Vantor declined to confirm or deny when Trouw asked directly, while saying it would not use the game's data going forward. Niantic Spatial confirmed the scans trained an early version of the model but has not publicly clarified what is in the current Vantor-bound version."
  - question: "Why is this called consent laundering instead of a privacy violation?"
    answer: "Each step was disclosed somewhere and arguably legal. Consent laundering describes the chain: a narrow consent for a game feature gets repackaged via corporate spin-off and model-training pipelines into a fundamentally different downstream use like defense-grade navigation. Legal compliance hides the meaningful breach of expectation."
  - question: "What can a former Pokemon Go player do now?"
    answer: "Realistically very little about the scans already collected. Going forward you can revoke AR scan permissions in the app, delete your Pokemon Go account through Scopely's process, and use the moment as a prompt to audit which other apps have similar opt-in data-collection features running on your phone right now."
  - question: "How does this affect me as a security or privacy professional?"
    answer: "If your organization collects opt-in telemetry, you are one acquisition, spin-off, or model-improvement partnership away from a similar story. Tag every dataset with its collection consent string, require re-consent on material use changes, and log which models trained on which datasets so future questions have answers."
---

Niantic Spatial says the scans trained an "early version" of the model. The defense contractor planning to deploy it won't say what's inside the current one.

**TL;DR:** Pokemon Go players spent years filming streets, parks, and storefronts for in-game rewards. Those roughly 30 billion scans now power a 3D map that a U.S. defense contractor is integrating into drone and ground-robot navigation for GPS-denied combat zones. A line buried in a privacy policy is not informed consent for that, and the same data-lifecycle pattern is rehearsing inside every "opt-in" AI feature your organization ships. This post breaks down what happened, why it's called consent laundering, and what security and privacy teams should do about it.

---

The pipeline from "fun mobile game" to "defense-grade navigation model" is shorter than most players ever imagined. This month the Dutch newspaper Trouw connected the dots between Niantic's Pokemon Go scans, the spun-off geospatial AI company that now owns them, and a U.S. defense contractor preparing to integrate the resulting model into drones operating in GPS-denied combat zones. Almost every step was technically disclosed. Almost none of it was meaningfully understood. That gap, between disclosed and understood, is the cybersecurity story.

## What does the Niantic Spatial and Vantor partnership actually do?

> **Direct answer:** It fuses Niantic Spatial's ground-based Visual Positioning System, trained partly on Pokemon Go scans, with Vantor's aerial Raptor navigation software so drones and ground robots can locate themselves by sight when GPS is jammed or unavailable.

Since 2021, Pokemon Go has paid players in-game rewards to film short videos of PokeStops, including streets, statues, storefronts, and park benches, from multiple angles and in different lighting conditions. According to [Ars Technica's reporting on the Trouw investigation](https://arstechnica.com/ai/2026/06/pokemon-go-players-unwittingly-contributed-to-tech-with-military-drone-uses/), roughly 30 billion of those scans are now owned by Niantic Spatial, the geospatial AI company Niantic spun off in May 2025 before selling its gaming titles, including Pokemon Go, to Scopely.

Niantic Spatial used those scans to build what it calls a Large Geospatial Model, a high-fidelity 3D representation of the physical world built primarily from geolocated images. On top of that model sits a Visual Positioning System (VPS) that can pinpoint a camera's location using as few as two recognizable visual reference points, even when those points occupy only a handful of pixels in the camera frame.

In December 2025, Vantor (the defense and intelligence firm formerly known as Maxar Intelligence) and Niantic Spatial [announced a formal partnership](https://spacenews.com/vantor-partners-with-niantic-spatial-on-gps-free-navigation-for-defense-market/) to integrate that ground-based VPS with Vantor's aerial Raptor navigation stack. The joint capability is explicitly built for "GPS unavailability, spoofing, interference, and jamming," which is defense parlance for the electronic-warfare environments where modern drones operate.

Vantor's defense pedigree is hard to dismiss as incidental. Per the same Ars Technica coverage, the company holds active contracts with the National Geospatial-Intelligence Agency, multiple U.S. military branches, and the Department of Homeland Security.

## Did Pokemon Go players consent to military training data?

> **Direct answer:** No. They consented to a game's AR scan feature under its in-app ToS. Niantic Spatial says scans were submitted "voluntarily" by opted-in players and confirms the data trained an "early version" of the model now headed toward defense use.

Niantic Spatial's official position, [per a statement provided to Game Developer](https://www.gamedeveloper.com/business/report-pokemon-go-area-scans-sold-to-military-drone-technology-company), is that "AR Scans collected through Pokemon Go were submitted voluntarily by players who opted into the feature and were subject to the applicable Terms of Service and Privacy Policy at the time," and that under Scopely "Pokemon Go data is not shared with Niantic Spatial." Both statements can be technically true and still miss the point.

When Trouw asked Vantor directly whether the deployed military-bound system relies on Pokemon Go imagery, [as Ars Technica recounts](https://arstechnica.com/ai/2026/06/pokemon-go-players-unwittingly-contributed-to-tech-with-military-drone-uses/), Vantor said it "would not use the game's data." Vantor then declined to say whether the model it plans to deploy was trained on those scans in the past. Niantic Spatial confirmed only that the scans trained an "early version" of the model.

Jeroen van den Hoven, professor of ethics and technology at TU Delft, told Trouw: "Without the large number of scans from all those gamers, the development of this system would never have progressed so quickly. The players have indirectly, in a perhaps minimal but still effective way, made a contribution to military applications."

That contribution was never the product the player was promised.

## What is consent laundering, and why does it matter here?

> **Direct answer:** Consent laundering is when data collected under a narrow low-stakes consent, like a game feature or a loyalty toggle, gets repackaged via spin-off, acquisition, or model-training pipelines for high-stakes uses the original user would never have agreed to.

The Pokemon Go pipeline is a textbook case. The scan feature was framed as a small in-game contribution in exchange for a small in-game reward. The corporate vehicle that ended up holding the data, Niantic Spatial, was created by spin-off, separating the dataset from the consumer-facing game brand. The downstream use, feeding a defense-industry visual navigation model, was never on the table when the player tapped "scan."

Each step was, in isolation, legally defensible. Aggregated, the chain converts a "fun game data" consent into "battlefield navigation training data" output. That conversion is the laundering, and it is the same pattern security and privacy professionals see again and again, from [browser extensions that quietly turned into surveillance pipes](/2026/02/15/browser-extensions-are-they-spying-on-you/) to the [287 Chrome extensions caught spying on 37 million users](/2026/02/17/287-chrome-extensions-caught-spying-37m-users-what-to-do/) earlier this year.

## What should security and privacy teams take from this?

This is not only a "big tech behaving badly" story. The same dynamics show up inside enterprise software whenever a vendor changes ownership, spins off a product line, or quietly updates a Terms of Service to authorize "model training" on existing telemetry. If you store user data, your roadmap will contain a Niantic-Spatial-shaped moment at some point. The question is whether your data-lifecycle controls force a re-consent at that moment or quietly carry the old consent forward.

A few patterns that would have blunted this one if they had been the default:

- **Purpose-limited data**, with the purpose written in plain language at the point of collection, not buried in section 14.2 of a 10,000-word policy.
- **Spin-off and acquisition triggers** that force renewed, granular consent before any successor entity can repurpose a dataset for a materially different use.
- **Downstream-use logs** that record what models were trained on which datasets, so "we used an early version" does not translate into "and we will not tell you what is in the current version."
- **A data-minimization default**, collecting only what the product needs to function, not what the platform might monetize later.

If any of that sounds aspirational, it is because the legal floor in the U.S. is currently far lower. Until that changes, the burden of resisting consent laundering falls on the engineers, security architects, and privacy leads inside companies that collect this data.

## How do you protect your own organization from this pattern?

> **Direct answer:** Treat every opt-in feature as a future spin-off candidate. Tag datasets with their collection-time consent string, force re-consent on material use changes, and audit downstream model training as a regulated data flow, because eventually it will be one.

If you are a security or privacy lead, three pragmatic moves:

1. **Inventory your opt-in data.** Every feature that collects telemetry "to improve the product" should have a row in a register that includes the consent text, the storage location, and the named downstream consumers. If you cannot fill out that row today, that is the gap.

2. **Bake re-consent triggers into your data-retention policy.** Acquisitions, divestitures, new model-training partnerships, and material privacy-policy changes should all trigger a documented decision: re-consent, delete, or accept the residual risk. The decision matters less than the fact that someone was forced to make it.

3. **Educate your users on what they are trading.** ByteSizedSecurity has covered the broader pattern of [taking back your digital footprint](/2025/12/24/shocked-by-your-digital-footprint-take-it-back-now/) and the personal calculus of [what you sacrifice for a free feature like a verified badge](/2026/02/24/linkedin-blue-check-what-you-sacrifice-for-a-badge/). The Pokemon Go case is the same arithmetic at planetary scale: a small in-game perk traded for a 3D map of the world, now flowing toward weapons-adjacent applications. The trade was unrecoverable the moment the data was collected.

The Pokemon Go community will not be made whole. The 30 billion scans already exist, the model already exists, and the defense contract already exists. What is still in play is whether the next telemetry pipeline you ship, at your company, does the same thing to the next set of users.

That part is on us.

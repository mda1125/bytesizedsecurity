---
description: "WeTransfer was acquired, laid off 75% of staff, and briefly tried to license user files for AI. Nine privacy-first WeTransfer alternatives for 2026."
layout: post
title: "9 Best WeTransfer Alternatives in 2026 (Ranked by Privacy)"
slug: wetransfer-alternatives-2026-privacy-first
category: "Privacy"
tags: ["WeTransfer Alternative", "File Sharing Privacy", "Bending Spoons", "Data Protection"]
author: Marc
excerpt: "WeTransfer was acquired by Bending Spoons in 2024, then lost 75% of its staff and briefly rewrote its terms to allow AI training on user files. Here are the nine best privacy-first WeTransfer alternatives for 2026 — including one that never uploads your files to a server at all."
image: "/assets/img/posts/wetransfer-alternatives-2026-privacy-first.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-07-09
faq:
  - question: "Is WeTransfer still safe to use in 2026?"
    answer: "WeTransfer is still functional and has walked back its <a href=\"https://wetransfer.com/blog/story/wetransfer-terms-of-service-changes-july-2025\">controversial July 2025 Terms of Service change</a> that mentioned training machine learning models on user files. The company now states it does not use AI on customer content. Trust with the creative community was damaged, and the acquisition context matters for anyone weighing privacy risk."
  - question: "Why did people stop trusting WeTransfer?"
    answer: "In July 2025, WeTransfer added a clause granting itself a license to use user-uploaded content to improve machine learning models for content moderation. <a href=\"https://www.bbc.com/news/articles/cp8mp79gyz1o\">The BBC reported the backlash</a>. The company removed the language within days, but many users had already migrated to alternatives. The 2024 Bending Spoons acquisition and subsequent layoffs added to the concern."
  - question: "What is the best WeTransfer alternative with no signup?"
    answer: "For no-signup transfers up to a few gigabytes, <a href=\"https://www.swisstransfer.com/\">SwissTransfer</a> and <a href=\"https://www.transfernow.net/\">TransferNow</a> both work without an account. For zero-server sharing where files never touch a third party at all, <a href=\"https://giraffile.pages.dev/\">Giraffile</a> keeps everything in the browser via IndexedDB storage. Choice depends on file size and privacy priorities."
  - question: "Can any WeTransfer alternative send files without uploading to a server?"
    answer: "Yes. <a href=\"https://giraffile.pages.dev/\">Giraffile</a> stores the file in your browser's local IndexedDB storage and generates a link that expires in 2, 5, or 10 minutes. The file never leaves your device unless the recipient opens the link in the same window session. It is the only option in this list that avoids server upload entirely."
  - question: "Does WeTransfer train AI on my files?"
    answer: "WeTransfer states publicly that it does not train AI models on customer content and does not sell customer data. This is the company's position after removing machine learning references from its terms in July 2025. Verification is limited to the company's word, which is a common problem for any cloud-based file transfer service where the file physically resides on someone else's server."
---

WeTransfer stopped being a boring utility the moment its parent company started editing the fine print on your files.

**TL;DR:** In July 2024, Italian app conglomerate Bending Spoons acquired WeTransfer, then laid off roughly 75% of its Amsterdam staff. In July 2025, the platform quietly updated its Terms of Service with language that granted a license to use uploaded content to train machine learning models. Public backlash forced a rollback within days, but the trust damage was done. Nine privacy-first WeTransfer alternatives for 2026 are compared below, ranked by the privacy signal that matters most for casual file sharing.

---

WeTransfer was, for years, the reference-standard casual file transfer service. Drag a file, get a link, send it, forget it. The 2024 acquisition and 2025 ToS scare turned that same drag-and-drop workflow into a privacy decision. This post walks through what changed at WeTransfer, what a genuinely private file transfer service should look like, and the nine services worth switching to in 2026. Giraffile, an open-source zero-server option, gets a full section because its architecture solves the problem the other eight try to mitigate.

**Jump to a section:**

- [Why look for a WeTransfer alternative in 2026?](#why-alternative)
- [What actually changed with WeTransfer?](#what-changed)
- [What should a privacy-first WeTransfer alternative do differently?](#privacy-criteria)
- [Comparison of the 9 best WeTransfer alternatives](#comparison-table)
- [Which are the 9 best WeTransfer alternatives in 2026?](#the-nine)
- [How do you share files securely without any of these services?](#how-to-share-securely)
- [Is WeTransfer still safe to use?](#still-safe)
- [Which WeTransfer alternative has no signup?](#no-signup)

## Why look for a WeTransfer alternative in 2026? {#why-alternative}

> **Direct answer:** WeTransfer's parent company already tried once to license user content for AI training, the free tier keeps shrinking, and every transfer uploads your file to a corporate server that has no obligation to keep the deal it made yesterday.

The reasons cluster into three groups: the ownership change, the terms-of-service scare, and the shrinking free tier. Any one of these on its own is survivable. Together they make WeTransfer a poor default for anyone who thinks about privacy at all.

WeTransfer's user base is heavily skewed toward creative professionals — filmmakers, designers, photographers, sound engineers. The [Post Sound Mixers group on Facebook](https://www.facebook.com/groups/774808419197163/) is one of many communities that pushed back openly against the ToS change, and Reddit threads on [r/editors](https://www.reddit.com/r/editors/) and [r/graphic_design](https://www.reddit.com/r/graphic_design/) have been full of "what should I use instead" questions for months. The people who trusted WeTransfer most are the people leaving fastest.

## What actually changed with WeTransfer? {#what-changed}

> **Direct answer:** Bending Spoons acquired WeTransfer on July 31, 2024, laid off 75% of staff by September, then in July 2025 briefly added ToS language granting a license to train machine learning models on uploaded content before rolling it back after backlash.

The story runs across three separate events, and each one damaged trust independently.

**The acquisition.** On July 31, 2024, Italian app developer Bending Spoons closed the acquisition of WeTransfer. [Reuters covered the deal](https://www.reuters.com/markets/deals/italys-bending-spoons-buys-file-sharing-service-wetransfer-2024-07-31/) and noted that Bending Spoons had already raised $155 million earlier that year at a $2.55 billion valuation. Bending Spoons also owns Evernote, Meetup, Filmic Pro, and Remini. Its playbook across those brands has been consistent: acquire, cut headcount, change pricing.

**The layoffs.** Six weeks after the acquisition closed, [TechCrunch reported](https://techcrunch.com/2024/09/08/bending-spoons-plans-to-lay-off-75-of-wetransfer-staff-after-acquisition/) that Bending Spoons was planning to lay off approximately 75% of WeTransfer's roughly 350 staff. The pattern matches earlier Bending Spoons acquisitions — Evernote saw similar cuts after its 2023 acquisition. Users noticed. Support quality changed. Product velocity slowed.

**The ToS change.** In July 2025, WeTransfer updated Section 6.3 of its Terms of Service, effective August 8, 2025. The problematic passage read, per [The Register's coverage](https://www.theregister.com/2025/07/18/llm_products_terms_of_service/):

> "You hereby grant us a perpetual, worldwide, non-exclusive, royalty-free, transferable, sub-licensable license to use your Content for the purposes of operating, developing, commercializing, and improving the Service or new technologies or services, including to improve performance of machine learning models that enhance our content moderation process."

Users noticed the "improve performance of machine learning models" phrase and reacted. [The BBC reported the story](https://www.bbc.com/news/articles/cp8mp79gyz1o) within days. WeTransfer walked the language back in [its own blog post](https://wetransfer.com/blog/story/wetransfer-terms-of-service-changes-july-2025), stating it does not train AI on user content, does not sell user data, and had only been "considering" a moderation feature that was never built.

The clarification was clear. The problem is that the same corporate entity that wrote the original language is the one asking to be trusted about the revised language. And the file physically sits on their server either way.

**The free-tier squeeze.** In parallel, WeTransfer's free tier tightened. Free users saw new caps on the number of transfers per week and more aggressive advertising. Multiple [Reddit threads](https://www.reddit.com/r/editors/comments/1hhegqg/wetransfer_kinda_sucks_now_any_alternatives/) documented the shift with side-by-side screenshots.

The three events combined produced the current SEO signal: monthly search volume for "wetransfer alternative" spiked in 2025 and stayed elevated through 2026.

## What should a privacy-first WeTransfer alternative do differently? {#privacy-criteria}

> **Direct answer:** A privacy-first file transfer service should minimize how much of your file leaves your device, encrypt in transit and at rest, expire content automatically, work without an account, and be inspectable through open source or strong-jurisdiction hosting.

Six criteria to weigh:

1. **Where does the file physically live during transfer?** A local browser-to-browser handoff is stronger than an upload to a European server, which is stronger than an upload to a US server, which is stronger than an upload to an ad-supported service.
2. **Is the transport encrypted end-to-end, or only in transit?** End-to-end means the server operator cannot read the file even if compelled by a subpoena or breached by an attacker.
3. **Does the file expire automatically?** Files that live forever are files that leak eventually. Expiration timers of hours or days are better than "we'll delete it when we feel like it."
4. **Does the service require an account?** Every account is a data broker relationship waiting to happen. No-signup services minimize the metadata they hold about you.
5. **What's the jurisdiction?** Swiss and EU providers operate under GDPR and Swiss privacy law; US providers operate under whatever the current administration decides.
6. **Is the code inspectable?** Open source lets researchers verify the privacy claims. Closed source means you take the vendor's word.

The nine alternatives below are scored against these criteria.

## Comparison of the 9 best WeTransfer alternatives {#comparison-table}

| Service | Free size limit | Storage | Account required | End-to-end encryption | Jurisdiction | Open source |
|---|---|---|---|---|---|---|
| [SwissTransfer](https://www.swisstransfer.com/) | 50 GB | 30 days | No | No (transit only) | Switzerland | No |
| [Giraffile](https://giraffile.pages.dev/) | 1.5 GB | 2–10 minutes | No | Yes (browser-only) | N/A (client-side) | Yes |
| [TransferNow](https://www.transfernow.net/) | 5 GB | 7 days | No | No (transit only) | France | No |
| [Smash](https://fromsmash.com/) | Unlimited (queued) | 14 days | No | No (transit only) | France | No |
| [SendAnywhere](https://send-anywhere.com/) | 10 GB (direct mode) | Direct or 48h link | No | Direct mode: yes | South Korea | Partial |
| [Internxt Send](https://send.internxt.com/) | 5 GB | 15 days | No | Yes (client-side) | Spain / EU | Yes |
| [pCloud Transfer](https://transfer.pcloud.com/) | 5 GB | 7 days | No | Optional (Crypto) | Switzerland | No |
| [Filemail](https://www.filemail.com/) | 5 GB | 7 days | No | No (transit only) | Norway | No |
| [Dropbox Transfer](https://www.dropbox.com/transfer) | 100 MB (free plan) | 7 days | Yes | No (transit only) | United States | No |

## Which are the 9 best WeTransfer alternatives in 2026? {#the-nine}

> **Direct answer:** SwissTransfer for Swiss privacy, Giraffile for zero-server sharing, TransferNow for a one-to-one swap, Smash for unlimited size, SendAnywhere for direct transfers, Internxt Send for open source, plus pCloud, Filemail, and Dropbox Transfer.

### 1. SwissTransfer — Best for large-file privacy under Swiss law {#swisstransfer}

[SwissTransfer](https://www.swisstransfer.com/) is operated by Infomaniak, a long-standing Swiss hosting provider. Free transfers go up to 50 GB per package. No account is required. Files are stored for up to 30 days, password protection is available, and the service runs on 100% renewable-energy infrastructure in Swiss data centers.

Swiss privacy law is the strongest single legal advantage on this list. Files are encrypted in transit and at rest, though not end-to-end — Infomaniak holds the keys. For anyone whose threat model is "I don't want a US or Bending Spoons-owned company holding my files," SwissTransfer is the most complete replacement for WeTransfer.

The one caveat: SwissTransfer is not open source, so the privacy claims rest on Swiss law and Infomaniak's track record rather than inspectable code.

### 2. Giraffile — Best for zero-server sharing where the file never leaves your device {#giraffile}

[Giraffile](https://giraffile.pages.dev/) is the only entry on this list that solves the problem architecturally rather than legally. The file is stored in your browser's [IndexedDB storage](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) and never uploaded to any server. When you generate a link, the recipient's browser retrieves the file directly from your session. The link expires in 2, 5, or 10 minutes, at which point the browser wipes the local copy.

This is a fundamentally different privacy model. The other eight services on this list ask you to trust the operator's promise not to look at your file. Giraffile removes the operator entirely.

The tradeoffs are real. The file size cap is 1.5 GB, both sender and recipient realistically need to be online at the same time, and the very short expiration windows make it unsuitable for "leave the link up for a week" workflows. It is engineered for quick, one-shot handoffs. It is also fully [open source on GitHub](https://github.com/coffeetron832/Giraffile) and MIT licensed, so the privacy claim is verifiable by reading the code.

If your threat model treats "a third party physically holds my file" as unacceptable, this is the only service on the list that answers.

### 3. TransferNow — Best free tier with EU jurisdiction {#transfernow}

[TransferNow](https://www.transfernow.net/) is French, operates under GDPR, and offers 5 GB free transfers with no account required. Files last 7 days. The service supports password protection, custom download pages, and a choice of where the file is geographically hosted (a nice feature for compliance-conscious teams).

TransferNow is the closest one-to-one replacement for the WeTransfer workflow. Same drag-and-drop UX, same "grab a link" simplicity, better free tier, and a European legal framework.

### 4. Smash — Best for unlimited file size {#smash}

[Smash](https://fromsmash.com/) is the answer when you need to send a video project, a raw photo set, or anything the other services would cap. Free transfers have no file size limit, though very large transfers are queued for slower processing. Files last 14 days by default.

Smash is a French company, so it operates under GDPR. Encryption is TLS in transit and AES at rest, but not end-to-end. Password protection is available. The main tradeoff is that you're trading privacy simplicity for file-size flexibility — this is a "solve the big-file problem" tool, not a "solve the trust problem" tool.

### 5. SendAnywhere — Best for cross-device direct transfers {#sendanywhere}

[SendAnywhere](https://send-anywhere.com/) has a mode that most of the other services don't: a peer-to-peer direct transfer using a 6-digit code, with the file streaming device-to-device rather than through a server. That direct mode is end-to-end encrypted and works up to 10 GB.

The service also offers a traditional link-based mode that does upload to their servers for 48 hours. For privacy purposes, use only the direct mode with the 6-digit code. It's the closest analog to Firefox Send's original zero-knowledge design.

Parts of the SendAnywhere client are open source, though not the full stack.

### 6. Internxt Send — Best open-source encrypted option {#internxt}

[Internxt Send](https://send.internxt.com/) is the spiritual successor to Firefox Send. It's open source, offers client-side encryption (the server never sees the plaintext), supports up to 5 GB free with no signup, and is operated out of Spain under GDPR.

Internxt is a full-stack privacy provider that also offers encrypted cloud storage, an email service, and a password manager. The file transfer product benefits from that broader architecture — the encryption keys are generated in your browser and never sent to Internxt's servers. For anyone who wants a modern, actively maintained replacement for Firefox Send, this is the tightest match.

### 7. pCloud Transfer — Best with client-side crypto option {#pcloud}

[pCloud Transfer](https://transfer.pcloud.com/) offers 5 GB free transfers with 7-day expiration and no account requirement. pCloud is a Swiss company (headquartered in Switzerland after moving from the US), and its paid Crypto add-on provides true zero-knowledge client-side encryption where even pCloud cannot read the files.

The catch: the client-side encryption is a paid feature, not the default for free transfers. Free transfers are TLS in transit and encrypted at rest, but pCloud holds the keys. For occasional casual sharing, pCloud Transfer is a solid WeTransfer replacement. For serious privacy, the Crypto tier is worth the price.

### 8. Filemail — Best for professional and enterprise transfers {#filemail}

[Filemail](https://www.filemail.com/) is a Norwegian file transfer service oriented toward professional users. Free transfers go up to 5 GB with 7-day expiration, no account required. Paid plans support unlimited file sizes, custom branding, and API integration.

Norway is not in the EU but adopts GDPR-equivalent data protection under the EEA. Filemail's professional focus shows up in reliability metrics and delivery guarantees rather than in stronger encryption. For teams that need dependable large-file handoff to clients, Filemail is worth evaluating.

### 9. Dropbox Transfer — Best if you already live in Dropbox {#dropbox-transfer}

[Dropbox Transfer](https://www.dropbox.com/transfer) is worth mentioning only for one audience: people who already have a Dropbox account and want to send files without granting shared-folder access. Free plan transfers are capped at 100 MB, which is not useful for most WeTransfer use cases. Paid Dropbox plans raise the cap to 100 GB per transfer.

Dropbox has its own AI-training-on-user-files controversy from [December 2023](https://www.theverge.com/2023/12/13/24000864/dropbox-ai-training-opt-out-privacy-terms), which it also walked back after public backlash. The pattern is instructive — every US-headquartered cloud service is one product-marketing decision away from repeating it.

## How do you share files securely without any of these services? {#how-to-share-securely}

> **Direct answer:** For a truly private one-off file transfer, encrypt the file locally with 7-Zip or age, then send the encrypted archive over any transport at all. The transport becomes irrelevant when the file is already sealed.

The most reliable path is the oldest one: encrypt the file before it leaves your machine. [7-Zip](https://www.7-zip.org/) with an AES-256 password produces an archive that even a compromised cloud service cannot read. [age](https://github.com/FiloSottile/age) is a modern alternative designed for exactly this workflow. Either one turns any file transfer service into a dumb pipe.

Send the encrypted file over anything — WeTransfer, email, a USB drive, whatever is convenient. Send the password out-of-band through a different channel: a signal message, a phone call, a piece of paper. This is old-school and slow, but it defeats every threat model in the comparison table above. It also defeats subpoenas, warrants, and rogue employees, which no cloud service on this list will.

Combining this pattern with [Giraffile](https://giraffile.pages.dev/) or SendAnywhere direct mode is the strongest practical setup for occasional privacy-critical transfers. Combining it with a US-based service like Dropbox Transfer is the pragmatic setup for everyone else.

For readers who want to reduce their broader digital exposure the same way, our post on [why password resets alone don't stop phishing](/2026/06/19/phishing-response-2026-password-resets-arent-enough/) covers adjacent hardening. And for a look at how governments are targeting the same privacy tools you'd use to protect these transfers, see our breakdown of [the Utah VPN law and why it matters beyond Utah](/2026/05/05/utahs-vpn-law-a-threat-to-internet-privacy/).

## Is WeTransfer still safe to use? {#still-safe}

> **Direct answer:** WeTransfer is functional, GDPR-compliant, and states it does not train AI on user content. The trust problem is structural — the same entity edited the terms once, reserves the right to do it again, and physically holds your file.

The July 2025 ToS episode ended with WeTransfer removing the machine learning language and publishing a clear denial. That closes the immediate concern. It does not close the meta-concern that a Bending Spoons subsidiary has commercial incentives that may not align with the creative community's preferences, and that the next ToS edit could go the same way.

For low-sensitivity transfers — a wedding video to your family, a portfolio PDF to a hiring manager — WeTransfer is still a functional service. For anything that would be embarrassing or damaging if it leaked or was quietly ingested into a training corpus, the case for moving is straightforward. The [IDmerit data leak of over 1 billion records](/2026/02/22/idmerit-data-leak-1-billion-records-exposed/) is a reminder that even data brokers with explicit privacy obligations lose data at scale. Consumer file transfer services are not held to a higher bar.

## Which WeTransfer alternative has no signup? {#no-signup}

> **Direct answer:** SwissTransfer, TransferNow, Smash, SendAnywhere, Internxt Send, pCloud Transfer, Filemail, and Giraffile all work without an account. Giraffile is the only one that also does not upload the file to any server at all.

The no-signup requirement rules out only one service on this list: Dropbox Transfer requires a Dropbox account. Every other option accepts an anonymous drag-and-drop.

The nuance is what "no signup" actually protects. On the seven upload-based services, no signup means the operator does not have your email, but they do have your file until expiration. On Giraffile, no signup means neither — the operator has nothing at all, because Giraffile is client-side software running in your browser.

## The verdict {#verdict}

There is no single best WeTransfer alternative because there is no single WeTransfer use case. The right pick depends on which of the six privacy criteria matters most for the specific transfer.

For most casual sharing at any size, [SwissTransfer](https://www.swisstransfer.com/) is the strongest all-around replacement — 50 GB free, Swiss privacy law, no ads, no account, generous storage duration. For sharing files that never touch a third-party server, [Giraffile](https://giraffile.pages.dev/) is the only option that works architecturally rather than legally. For teams already inside a workflow, [TransferNow](https://www.transfernow.net/) is the closest one-to-one swap. For files large enough that WeTransfer would have refused them, [Smash](https://fromsmash.com/) handles them.

Every service on this list is better than continuing to route files through a platform whose parent company already changed the deal once. The correct next step is picking one and switching before the next ToS update tests whether you would have.

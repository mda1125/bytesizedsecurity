---
description: "The FBI's FaceStealer video call scam replays stolen webcam clips on fake Zoom and Teams calls, then pushes a fake fix to install malware."
layout: post
title: "Don't Trust a Familiar Face in a Video Call Scam"
slug: video-call-scam-facestealer-webcam
category: "Threats"
tags: ["Video Call Scam", "FaceStealer", "Fake Zoom Link"]
author: Marc
excerpt: "The FBI has named a North Korean scheme FaceStealer. Actors hijack accounts on Telegram, LinkedIn, Slack, or Discord, invite contacts to a Zoom or Teams call, and play secretly recorded webcam clips of earlier victims. A familiar face is not proof of who is on the call. Never run a command or install an update because someone on a call asks. Confirm the meeting on a separate channel first."
image: "/assets/img/posts/video-call-scam-facestealer-webcam.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-11-13
faq:
  - question: "What is the FaceStealer video call scam?"
    answer: "Per the <a href=\"https://www.ic3.gov/CSA/2026/261112.pdf\">FBI FLASH alert</a> dated 12 November 2026, FaceStealer is a North Korean social engineering scheme. Actors send meeting invites from hijacked accounts, play prerecorded webcam videos of earlier victims on fake Zoom or Teams calls, then push a fake fix or update. The so-called fix installs malware. The FBI says the actors have stolen more than $400 million in cryptocurrency over the past 18 months."
  - question: "How does a FaceStealer fake Zoom call work?"
    answer: "Per the <a href=\"https://www.ic3.gov/CSA/2026/261112.pdf\">FBI FLASH</a>, a hijacked Telegram, LinkedIn, Slack, or Discord account sends the invite, often after a Calendly scheduling message. A typo-squatted Zoom or Teams link then opens a copycat meeting page. Once you join, the actors play stored webcam video of people you know, claim your audio is broken, and tell you to click an update, run a script, or paste code into a terminal. Following those steps installs malware."
  - question: "Why doesn't a familiar face prove who is on the call?"
    answer: "The <a href=\"https://www.ic3.gov/CSA/2026/261112.pdf\">FBI</a> says it has identified and seized over 900 victim webcam videos used to impersonate those people in later calls. The actors record a new target as soon as the fake meeting link is opened, then reuse the clip against the next contacts. In some cases they also add AI deepfakes of well-known cryptocurrency figures. The scheme still relies, above all, on genuine stolen video."
  - question: "Should you run an update or command during a video call?"
    answer: "No. The <a href=\"https://www.ic3.gov/CSA/2026/261112.pdf\">FBI recommends</a> you refuse to run scripts or paste code into a terminal to update a meeting app. Update Zoom or Teams on your own, or join with the official app and an invite code. Confirm the meeting through a second channel, for example a phone call or text, if the first invite arrived on Telegram or LinkedIn."
  - question: "What should you do if you already ran the fix or joined a fake call?"
    answer: "Move cryptocurrency to a new wallet, with new seed phrases, on a device you did not use to talk with the suspected actors. The <a href=\"https://www.ic3.gov/CSA/2026/261112.pdf\">FBI</a> says theft has occurred months or more than a year later. Then change passwords, sign out of every session, and turn on multifactor authentication for messaging and developer accounts. Warn your contacts and, if a work device was involved, your employer. Report it at <a href=\"https://www.ic3.gov\">IC3.gov</a> with the keyword FaceStealer."
---

A familiar face on a video call is not proof of who is talking to you.

**TL;DR:** The FBI has published a [FLASH alert](https://www.ic3.gov/CSA/2026/261112.pdf) on a North Korean scheme it calls FaceStealer. Actors hijack Telegram, LinkedIn, Slack, or Discord accounts belonging to people you already know, invite you to a Zoom or Teams meeting, and play secretly recorded webcam clips of earlier victims. They claim your audio is broken, then push an "update" or a command they present as a fix. The fix installs malware. The FBI says the actors have stolen more than $400 million in cryptocurrency over the past 18 months, and they have also gone after open-source maintainers. Join through the official app with an invite code. Keep your camera off until you see, hear, and talk with the person who invited you. Never run a command or install an update because someone on a call asks. Confirm the meeting on a separate channel first.

**Jump to a section:**

- [What is the FaceStealer video call scam?](#what-is-facestealer)
- [How does a FaceStealer fake Zoom call work?](#how-it-works)
- [Why doesn't a familiar face prove who is on the call?](#familiar-face)
- [What does the fake update or fix do?](#fake-fix)
- [Who is being targeted, including open-source maintainers?](#who-is-targeted)
- [How do you avoid a video call scam like FaceStealer?](#how-to-avoid)
- [What should developers and open-source maintainers do?](#developers)
- [What should you do if you already joined or ran the fix?](#already-compromised)
- [The takeaway](#takeaway)

---

This post walks through how the FaceStealer video call scam works, why a trusted face on screen is not enough, what the fake fix does, and what everyday users, developers, and open-source maintainers should do before, during, and after a suspicious call.

## What is the FaceStealer video call scam? {#what-is-facestealer}

> The FBI names FaceStealer as a North Korean scheme. Actors lure targets into fake Zoom or Teams calls, play stolen webcam video, and push a fake fix. They have stolen more than $400 million in 18 months.

On 12 November 2026, the FBI released [FLASH number AC-111226-MS](https://www.ic3.gov/CSA/2026/261112.pdf) to warn the cryptocurrency and web3 industry, plus open-source software maintainers, about FaceStealer. The Bureau attributes the activity to North Korean state-sponsored actors also known publicly as Sapphire Sleet, UNC1069, Dangerous Password, CryptoCore, APT38, BlueNoroff, and Stardust Chollima.

The FLASH says those actors have stolen more than $400 million in cryptocurrency over the past 18 months and have tried to break into the open-source software supply chain. The lure is an imposter version of a popular meeting tool: Zoom, Microsoft Teams, or Google Meet.

[The Record reported](https://therecord.media/stolen-binance-crypto-recovered-doj-facestealer-disrupted) the same week: the FBI and the Justice Department also disrupted cloud infrastructure used in the scheme.

A related, separate action in The Record's report: the Justice Department obtained court authorization to seize or restrain more than $1.2 billion from the $6.3 billion stolen in the Binance theft, part of $2.7 billion frozen across platforms. An FBI agent told The Record it is unclear whether FaceStealer was one of the methods used in the Binance breach. Do not treat those two cases as the same event.

## How does a FaceStealer fake Zoom call work? {#how-it-works}

> A hijacked account invites you. A look-alike Zoom or Teams link opens a fake meeting. Stolen webcam video plays. A fake audio problem is used to push malware.

The FBI lays the scheme out in six stages.

It starts with a person already compromised, "Victim A." The actors scan the device for cryptocurrency wallets and seed phrases (the secret recovery words for a wallet), lock the person out of Telegram or another encrypted messaging app, copy contact lists and chat histories, and secretly record the person waiting for a video chat to start.

Next, they use Victim A's account to message contacts and propose a Zoom or Teams meeting. The usual pretext is to "catch up," "discuss collaboration," or "talk about investment opportunities." Because they have the chat history, they tailor notes to high-value contacts. The FBI also says the actors have created new accounts, and hijacked established ones, on Telegram, LinkedIn, Slack, and Discord.

A yes is followed by a Calendly invite, or another calendar hold, to lock in the time. Shortly before the start, Victim A's account sends a look-alike Zoom or Teams link. It is not. The FBI calls this typo-squatting, also known as URL hijacking or domain mimicry: a misspelled, altered, or hyphenated domain registered to impersonate a real site. Two examples of typo-squatted domains the FBI lists as North Korean-controlled are `uu01webzoom.us` and `teams.livemeet.us`. The FLASH also notes the actors often leave the meeting link out of the calendar invite and send it later, closer to the start time, to hide their infrastructure for longer.

Clicking the fake Zoom link (or the Teams look-alike) takes you to a server the actors control, hosting a copycat meeting page designed to look like the real product. You appear to sit in a lobby, waiting to be admitted. The FBI says recording of your webcam starts when you click the imposter link, not later.

Once you are admitted, the actors play Victim A's stored webcam video. They often play extra clips so the call looks like a group meeting with people you recognize.

A direct message then arrives inside the fake session, from someone appearing to be Victim A. Your audio is broken, they say, or there is some other technical issue, and nobody in the room hears you. Extra fake participants add pressure to "correct" a problem only you seem to have. The same person then tells you to click an "update" prompt or link, run a script, or copy and paste code into a command line or terminal.

Follow those instructions and you download malware. Per the FLASH, the payload later installs a browser cookie harvester, keyloggers, screen capturers, and a backdoor (hidden remote access). You have now become the next victim. The cycle repeats with your contacts, your video, and your accounts.

This is a more elaborate form of [modern phishing](/2026/06/19/modern-phishing-why-password-resets-fail/), built around a face you already trust rather than a password-reset email alone.

## Why doesn't a familiar face prove who is on the call? {#familiar-face}

> The FBI has seized over 900 stolen webcam videos used to impersonate victims. A face you recognize is often a replay, not a live person.

The FBI says it has identified and seized over 900 victim webcam videos the actors have used to impersonate those people in follow-on attacks. The FLASH title describes the collection as a library of 900+ tech workers.

The clip looks right because it is a real person, recorded in an earlier fake meeting. It is not live. A short, slightly awkward, or one-sided conversation fits a replay better than it fits a friend in a live exchange.

The FLASH also warns of a newer twist. The actors have begun using what the FBI calls "super intelligence (SI)" to generate deepfake videos of well-known people in cryptocurrency and web3, built from public photos or video. The quality only has to pass as webcam footage. Those clips are used instead of, or alongside, real victim video. The FBI still says FaceStealer overwhelmingly relies on genuine stolen videos, not deepfakes. The practical test is the same either way: do not treat a face on screen as identity.

## What does the fake update or fix do? {#fake-fix}

> The "fix" is the infection step. It is an update prompt, a link, a script, or code pasted into a terminal. It installs stealers and a backdoor.

Nothing about the so-called fix repairs your audio. It is the handoff from a convincing call to code running on your computer.

The FBI says the malware eventually installs:

- a browser cookie harvester, used to steal session cookies and sign in as you
- keyloggers, which record keystrokes
- screen capturers
- a backdoor, which leaves remote access open

Those tools match the pattern we covered in [Infostealers: From Passwords to Your Full Identity](/2026/02/21/infostealers-from-passwords-to-your-full-identity/). With the device compromised, the actors steal accessible cryptocurrency or use the victim's access to an employer's network or to an open-source maintainer account.

In several cases reported to the FBI, the theft and the account hijacking arrived months to more than a year after the first infection. The actors copied wallet recovery phrases, watched balances, and rebuilt the wallet after a large transfer. A quiet week after a strange call is not a clear sign you are safe.

The FBI points to three industry write-ups for longer indicator-of-compromise lists: [Arctic Wolf on BlueNoroff](https://arcticwolf.com/resources/blog/still-in-the-meeting-bluenoroff-six-months-on/), [Jumpsec's look at a BlueNoroff ClickFix kit](https://www.jumpsec.com/guides/inside-a-dprk-bluenoroff-clickfix-kit/), and [Microsoft Threat Intelligence on a Sapphire Sleet macOS intrusion](https://www.microsoft.com/en-us/security/blog/2026/04/16/dissecting-sapphire-sleets-macos-intrusion-from-lure-to-compromise). Use those reports for technical detections. Use the FLASH for the scheme, the figures, and the advice below.

## Who is being targeted, including open-source maintainers? {#who-is-targeted}

> The main aim has been cryptocurrency theft. The same video call scam has also been used against software developers and maintainers in an attempt to poison the supply chain.

The FBI says FaceStealer has been used mainly against people and companies from which the actors steal cryptocurrency. The same technique has also been aimed at supply-chain software developers and maintainers, in order to reach their devices and the repository accounts they control. The FLASH warns a single infected maintainer is a path to millions of downstream victims if the attackers poison a widely used library.

Earlier this year, the actors came close. Per the FLASH, they used multiple interactions to lure a maintainer of a significant open-source JavaScript library into a fake Teams video chat. At least one apparent participant was someone the maintainer recognized. A message claimed something was wrong on his system. He followed the recommended "corrective" measures and, as the FLASH describes, infected his computer with the actors' malware. The actors then used his access to create malicious dependencies bundled with legitimate library downloads. The library receives tens of millions of downloads per week. Quick detection and response stopped a large-scale incident.

The FBI says it is aware of several other attempts against developers, maintainers, and libraries with significant download volume. Multiple attempts have been directed at maintainers with repositories on npm, the JavaScript package registry, and more recently against maintainers of Rust crates.

The FBI did not name the library.

## How do you avoid a video call scam like FaceStealer? {#how-to-avoid}

> Use the official app and an invite code, not a chat link. Leave your camera off until you see, hear, and talk with the host. Never run a fix from the call. Confirm the meeting on a second channel.

The FBI's recommendations are direct, and they apply to everyday users as well as to people in crypto.

**Join with the real app and an invite code.** Prefer the official Zoom or Teams application. Use an invite code instead of clicking links to in-browser versions of the apps, especially for infrequent or new contacts. This is one of the better defenses against a fake Zoom link.

**Leave your camera off at first.** When you join a call you were invited to, do not turn on your webcam until you see, hear, and communicate with the person who invited you. You get a chance to inspect the other side before you hand over a new recording.

**Refuse in-call updates and commands.** If a prompt asks you to update the meeting app, do not run scripts or paste code into a terminal. Update the official application yourself, or join through the official web service with the invite code.

**Read the calendar invite.** Check Calendly and other calendar invites for a meeting link. A scheduling email with no link, followed by a last-minute Zoom or Teams URL in chat, matches the pattern the FBI describes.

**Confirm on a second channel.** When possible, confirm the meeting with the person who invited you through a different method from the one used to reach you. If the invite arrived on Telegram, confirm by text or phone.

**Lock down messaging apps.** Add multifactor authentication to Telegram, WhatsApp, Slack, and other communication apps, turn on login alerts, and use expiring messages. Multifactor authentication means a second proof of identity after the password, such as an app prompt or a hardware key. Our guide to [two-factor authentication](/2026/02/16/2fa-the-5-minute-fix-that-stops-99-percent-of-account-attacks/) walks through setup. The FBI says the actors hijack accounts by signing in from a new device, changing the recovery phone number, and closing your sessions.

**Protect cryptocurrency balances.** Keep only low-dollar amounts in browser extension wallets. Keep larger balances on a separate physical ledger not connected to the device, or deposited with an exchange. Do not store secret recovery phrases or private keys anywhere on your devices.

## What should developers and open-source maintainers do? {#developers}

> Treat a surprise Teams or Zoom "fix" as hostile. Protect repository accounts with multifactor authentication, and plan how you would revoke a maintainer login in a hurry.

Everything in the previous section applies here, with more at stake. A stolen meeting recording is bad. A stolen npm or Rust crate registry login is worse, because the next victims are everyone who installs the package.

Before you accept a last-minute video chat from a contact, confirm it on a separate channel, the same way you would confirm a production change. Join with the official app and an invite code. Keep the camera off until live two-way conversation is obvious. If anyone in the call asks you to run a command, paste a snippet, or click an update to "fix" your audio, stop. Ask real collaborators to wait while you update the official app yourself or reschedule on a channel you started.

Tighten maintainer accounts now, not after a strange call. The FBI's advice after a suspected compromise is to change passwords, sign out of all active sessions, and add multifactor authentication on developer accounts. Do the last of those before you need it. If you lose access to a messaging app or a developer account, contact the platform and ask for the account to be shut down or restored to you.

If a work device, or work files on a personal device, might have been involved, tell your employer. The FBI is blunt: silence puts contacts and coworkers at risk and helps the scheme continue.

## What should you do if you already joined or ran the fix? {#already-compromised}

> Move cryptocurrency to a new wallet on a clean device first. Then lock down accounts, warn your contacts, and file a report at IC3.gov with the keyword FaceStealer.

If you clicked the look-alike link, turned on your camera, or followed the "fix," treat the device and the accounts on it as untrusted.

1. **Move cryptocurrency first, on a different device.** The FBI says to create a new wallet, with new seed phrases, on a device you did not use to communicate with the suspected actors, then transfer the assets. It also repeats the delayed-theft warning: actors have stolen funds months and years later by copying seed phrases, watching balances, and reconstituting the wallet when the balance rose.
2. **Secure messaging and developer accounts.** Change passwords, end every session, and add multifactor authentication, including on Telegram, WhatsApp, and developer logins.
3. **Warn people in your address book.** Tell friends and contacts the actors have hijacked your accounts and will try to impersonate you with prerecorded Zoom or Teams webcam video. If a work device or work files were in play, tell your employer.
4. **Change all passwords.**
5. **Ask the platform for help if you are locked out.** Request a shutdown or a restore of messaging or developer accounts you no longer control.
6. **File a report.** Submit a complaint at [IC3.gov](https://www.ic3.gov) with the keyword "FaceStealer." The FBI also points people to their [local FBI field office](https://www.fbi.gov/contact-us/field-offices).

## The takeaway {#takeaway}

A familiar face is easy to steal and easy to replay. The FaceStealer video call scam works because the invite comes from a real account and the person on screen looks like someone you know.

The countermeasures are ordinary habits, practiced every time, not only when a call feels off. Open Zoom or Teams yourself. Keep the camera off until the conversation is clearly live. Confirm the meeting on a second channel. Never run a command or install an update because a face on a call asked you to, even if the face looks familiar.

If you hold crypto or you maintain a package other people install, those habits matter even more. A recording of your face gets reused against your contacts, and access to your repository gets reused against your users.

Which meeting habit will you change first?

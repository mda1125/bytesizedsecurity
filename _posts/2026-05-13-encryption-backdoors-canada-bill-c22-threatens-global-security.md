---
layout: post
title: "Encryption Backdoors: Canada's Bill C-22 Threatens Global Security"
category: Network Security
tags: ["encryption", "privacy", "cybersecurity"]
author: Marc
excerpt: "Canada's Bill C-22 mandates encryption backdoors, user data retention, and sharing with foreign governments. This creates systemic vulnerabilities, as seen in the Salt Typhoon hack. History shows that mandating backdoors compromises security for everyone."
image: "/assets/img/posts/encryption-backdoors-canada-bill-c22-threatens-global-security.webp"
last_modified_at: 2026-05-13
---

## Canada's Bill C-22: Why Encryption Backdoors Are a Threat to Everyone

TL;DR: Canada's Bill C-22, the Lawful Access Act, would force tech companies to retain user metadata for a year, share it with foreign governments, and build backdoors into encrypted services on demand. The government claims this won't create systemic vulnerabilities. History proves otherwise. The 2024 Salt Typhoon hack exploited exactly this kind of lawful access infrastructure, and when the UK tried a similar mandate, Apple pulled its encryption feature from the country entirely.

---

## What is Bill C-22?

Canada's government introduced Bill C-22, officially called the Lawful Access Act, in the spring of 2026. It's a sequel to last year's Bill C-2, which attracted so much backlash from the privacy community that it never even reached committee. Bill C-22 makes minor tweaks but keeps the same core problems.

The bill does four things:

1. Forces digital services (telecoms, messaging apps, and more) to record and retain user metadata for 12 months
2. Gives the Minister of Public Safety the authority to order companies to build backdoors into their products for law enforcement access
3. Bans companies from publicly disclosing the existence of these orders
4. Expands information sharing with foreign governments, including the United States

The term "digital services" is broad. It could apply to operating systems, messaging apps, email providers, and cloud platforms. The bill's definitions leave enough room for the government to extend its reach well beyond traditional telecoms.

---

"No Systemic Vulnerabilities" ... That's Not How Encryption Works

Bill C-22 includes a clause stating that backdoor mandates must not introduce a "systemic vulnerability." Canadian officials have said publicly that they believe it's possible to add surveillance access without weakening security.

This is the core flaw in the bill's logic.

Encryption is binary. A system is either end-to-end encrypted, meaning only the sender and receiver can read the content, or it's not. There is no middle ground where law enforcement gets access but attackers don't. If a mechanism exists to decrypt data for one party, that mechanism becomes an attack surface for every other party.

Think of it this way: you can't install a door that only opens for people with good intentions. A door is a door. If it exists, someone will find a way through it.

The bill also leaves the definitions of "systemic vulnerability" and "encryption" vague. This gives the government room to argue that certain forms of access don't count as breaking encryption, even when they functionally do.

---

## We Already Have Proof: Salt Typhoon

This isn't a theoretical debate. We have a case study.

In 2024, a Chinese state-sponsored hacking group known as Salt Typhoon compromised U.S. Internet Service Providers by exploiting lawful access infrastructure. ISPs had built systems to give law enforcement access to user data, as required by U.S. law. Salt Typhoon found those systems and used them.

The attackers accessed call records, metadata, and in some cases, the content of communications. The exact type of infrastructure that Bill C-22 would mandate in Canada was the attack vector.

This is the pattern: governments require companies to build access points. Those access points become targets. Sophisticated attackers find them. The infrastructure designed for law enforcement becomes a tool for espionage.

Salt Typhoon wasn't a failure of implementation. It was a failure of the concept itself. When you build surveillance infrastructure into communication systems, you create attack surfaces that skilled adversaries will find.

---

## The UK Precedent: What Happened When Apple Was Asked

The United Kingdom tried a similar approach in 2025. Under the Investigatory Powers Act, the UK government demanded that Apple build a backdoor into its Advanced Data Protection (ADP) feature, which provides end-to-end encryption for data stored in iCloud.

Apple refused to comply. Instead of weakening encryption for all users, Apple removed the ADP feature from the UK entirely. British users lost access to a security feature that protects photos, notes, backups, and other personal data stored in iCloud.

As of May 2026, UK users still do not have access to Advanced Data Protection. They are less secure than users in other countries because their government tried to make them more "accessible" to law enforcement.

This is the real-world consequence of backdoor mandates. Companies don't build the backdoor. They pull the feature. Users lose protection.

Bill C-22 would give Canada similar authority. If history repeats, Canadians could lose access to encryption features that the rest of the world takes for granted.

---

## Who's Pushing Back and Why

Opposition to Bill C-22 is broad and growing.

Apple and Meta have both publicly come out against the bill, citing concerns about encryption integrity and user security. These aren't companies known for aligning on policy positions, which makes their shared opposition notable.

The U.S. House Judiciary and Foreign Affairs committees sent a joint letter to Canada's Minister of Public Safety. The letter highlighted concerns that mandated backdoors in Canadian systems could compromise the security of American users and government communications that pass through Canadian infrastructure.

The Canadian Civil Liberties Association published a detailed statement outlining the bill's threats to privacy rights. OpenMedia, a Canadian digital rights organization, has been tracking the bill and mobilizing public opposition.

The Electronic Frontier Foundation (EFF), which originally reported on Bill C-2 last year, has published analysis of C-22 calling it a "repackaged version of last year's surveillance nightmare."

The privacy and security community is aligned: this bill would make Canadians less safe, not more.

---

## Why This Matters Beyond Canada

Bill C-22 isn't an isolated proposal. It's part of a global pattern.

Australia passed the Assistance and Access Act in 2018, giving authorities the power to compel companies to build capabilities for intercepting encrypted communications. The EU's Chat Control proposal spent years trying to mandate scanning of encrypted messages before the European Parliament blocked the most extreme provisions in 2026. The UK's Investigatory Powers Act led to the Apple ADP situation described above.

Each country that passes or attempts this kind of legislation normalizes the concept. It creates a template for the next government to follow. And it puts pressure on companies to either fragment their security features by region or lower the bar globally.

If Canada mandates backdoors and companies comply, every Five Eyes partner will have a precedent to cite. If companies refuse and pull features, Canadians join UK users in having weaker protection than the rest of the world.

Neither outcome is good for security.

---

## What You Can Do

If you're in Canada:
- Follow Bill C-22's progress through Parliament
- Contact your MP and express your concerns about encryption backdoors
- Support organizations fighting the bill, including the Canadian Civil Liberties Association and OpenMedia

If you're anywhere:
- Understand the encryption tools you use and why they matter
- Support the EFF's "Encrypt It Already" campaign, which pushes companies to implement stronger encryption by default
- Stay informed about backdoor mandates in your own country. The same arguments are being made everywhere.

Encryption protects your messages, your photos, your financial data, and your medical records. It's not a criminal tool. It's a safety tool. When governments weaken it, everyone pays the price.

This is part of a growing pattern of governments targeting privacy tools. [Utah just became the first U.S. state to regulate VPN usage](/2026/05/05/utahs-vpn-law-a-threat-to-internet-privacy/) — and the precedent is spreading internationally.

---

Sources and Further Reading:
- EFF: Canada's Bill C-22 Is a Repackaged Version of Last Year's Surveillance Nightmare (https://www.eff.org/deeplinks/2026/05/canadas-bill-c-22-repackaged-version-last-years-surveillance-nightmare)
- Full text of Bill C-22 (https://www.parl.ca/legisinfo/en/bill/45-1/c-22)
- Canadian Civil Liberties Association statement on C-22
- OpenMedia blog on C-22
- EFF: Encrypt It Already campaign (https://www.eff.org/encrypt-it-already)
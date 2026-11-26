---
description: "1Password says a hijacked employee GitHub account led to a backend breach. Vaults were not reached. Here is what leaked, why, and what to do."
layout: post
title: "1Password Breach: Why Zero-Knowledge Protected Vaults"
slug: 1password-breach-github-zero-knowledge
category: "Threats"
tags: ["1Password Breach", "Zero-Knowledge Encryption", "GitHub Supply Chain"]
author: Marc
excerpt: "An attacker took over one 1Password employee's GitHub account, copied private source code, and pushed malicious code to backend services. Customer vaults and vault keys were not reached, but names, emails, account records, and some invitation and recovery tokens were copied. Here is what zero-knowledge design did and did not protect, how to spot the phishing this breach invites, and what teams should learn about developer accounts."
image: "/assets/img/posts/1password-breach-github-zero-knowledge.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-11-26
faq:
  - question: "What happened in the 1Password breach?"
    answer: "1Password began investigating on Nov. 19, 2026, after an attacker gained access to an employee's corporate GitHub account. Per <a href=\"https://1password.com/blog/update-on-nov-2026-security-incident\">1Password's incident update</a>, the attacker used it to copy source code, push malicious code to backend services, and download account records for a subset of customers. 1Password disclosed the incident on Nov. 25."
  - question: "Were 1Password vaults accessed in the breach?"
    answer: "No, according to 1Password. Its update says customer vault contents were never accessed by or available to the attacker. The keys protecting vaults, account recovery keys, and the 1Password apps and browser extensions were also not affected. This is 1Password's own statement, and the company has brought in independent experts to validate its response."
  - question: "Is 1Password safe to use after the breach?"
    answer: "Based on 1Password's statement, vault contents were not reached, and the company says customers do not need to update anything in their accounts. We cannot verify this ourselves, and the company has not said how many customers were affected. We see no reason in the statement to drop a password manager. Stay alert for phishing."
  - question: "Is an email about a 1Password invitation or account recovery real?"
    answer: "Treat any invitation or recovery email you did not start as phishing. <a href=\"https://1password.com/blog/update-on-nov-2026-security-incident\">1Password's update</a> warns about exactly this and says the company never asks for your account password or Secret Key. Do not click the link. Open the 1Password app or type the address yourself, and report the message to support@1password.com."
  - question: "What is zero-knowledge encryption?"
    answer: "Zero-knowledge design means a service stores your data but cannot read it. Your device encrypts the data with keys the company never holds. 1Password's <a href=\"https://support.1password.com/secret-key-security/\">Secret Key explainer</a> says your account password and Secret Key combine to form the key, and the company never has the Secret Key."
---

A password manager exists for the day a server gets hacked. This week, it happened to 1Password.

**TL;DR:** 1Password says an attacker took over one employee's GitHub account, copied private source code, and pushed malicious code to backend services, per [1Password's incident update](https://1password.com/blog/update-on-nov-2026-security-incident). The attacker downloaded names, email addresses, and account records for a subset of customers, plus some invitation and recovery tokens. Customer vaults and the keys protecting them were not reached. Zero-knowledge design explains why. It does not cover metadata, so expect phishing. Treat unexpected 1Password invitation or recovery emails as fake, and follow the steps 1Password lists.

---

**Jump to a section:**

- [What happened in the 1Password breach?](#what-happened)
- [What data did the 1Password breach expose?](#data-exposed)
- [What did the 1Password breach not reach?](#not-affected)
- [How does zero-knowledge encryption protect your vault?](#zero-knowledge)
- [Is 1Password safe after the breach?](#is-1password-safe)
- [How do you spot 1Password breach phishing?](#phishing)
- [Should you turn on MFA for 1Password?](#mfa)
- [What supply chain lesson does the 1Password breach teach?](#supply-chain)
- [What should you do now?](#checklist)

Disclosure: Marc uses 1Password himself. This post is not sponsored, and 1Password did not review it.

This is an active incident. We link 1Password's own statement first and use news coverage only to cross-check it. We note below what 1Password has not said.

## What happened in the 1Password breach? {#what-happened}

> 1Password began investigating on Nov. 19, 2026, after an attacker reached an employee's corporate GitHub account. The attacker pushed malicious code to backend services, which downloaded customer account records. The company disclosed the incident on Nov. 25.

According to [1Password's incident update](https://1password.com/blog/update-on-nov-2026-security-incident), published Nov. 25, the company "began investigating indications that an attacker gained access to an employee's corporate GitHub account." The attacker used the account to access source code and push malicious code to backend services. The code then downloaded administrative data about customers.

GitHub is a service where companies store and share their source code. A single hijacked developer login gave the attacker a path into the code and into the systems built from it.

The attacker also copied source code from private repositories and gained access to 1Password's CI/CD system. CI/CD stands for continuous integration and continuous delivery, the automated pipeline for building and shipping software. 1Password says the system holds infrastructure secrets. The company has rotated every credential with possible exposure.

Independent coverage matches this account. [The Hacker News](https://thehackernews.com/2026/11/1password-hacked-customer-data-and.html) and [Infosecurity Magazine](https://www.infosecurity-magazine.com/news/1password-github-account-backend/) both report the same sequence from the same statement.

1Password says it has disabled the GitHub account, revoked the stolen token, and removed the access the attacker created. It also says it restored clean versions of the affected service, tightened GitHub, CI/CD, and endpoint controls, added new detections, and brought in independent cybersecurity experts to check its work. It says apps and services are working normally.

## What data did the 1Password breach expose? {#data-exposed}

> The attacker downloaded account records for a subset of customers, including names, email addresses, identifiers, sign-in times, and some emailed invitation and recovery tokens. 1Password has not said how many customers were affected.

1Password lists these items in the account records the attacker downloaded:

- Names and email addresses
- Account and user identifiers, plus account creation and last sign-in times
- Public keys, which are shared by design. 1Password says they pose no risk to users.
- Secure Remote Password (SRP) parameters. Your device uses these values to prove it knows your password without sending it. 1Password says they cannot be used to access your account.
- Tokens in certain emailed links for invitations, provisioning, and account recovery
- Other non-secret account metadata about 1Password's internal architecture, such as version and file numbers

The token item deserves a closer look. A token is a one-time value inside an emailed link. 1Password says a token completes an invitation or recovery only when paired with an SSO sign-in or a six-digit code sent to your registered email address. It says a token cannot reach an account by itself.

A small number of users had an invitation or recovery in progress during the incident, and 1Password says it notified them directly. It also says it found no internal evidence of account takeovers using the exposed tokens. As a precaution, it lengthened the invitation and recovery codes from six digits to ten alphanumeric characters.

Two facts are still unknown. 1Password has not said how many customers were affected, and it has not said how the attacker got into the employee's GitHub account.

## What did the 1Password breach not reach? {#not-affected}

> 1Password says vault contents, the items in them, the keys protecting them, account recovery keys, and its apps and browser extensions were not affected. It also says it never stores your account password or Secret Key.

The company's update puts it in plain terms: "At no time were customer vault contents accessed by, or available to, the attacker." Its "What was not affected" list names:

- Your vaults and the items in them
- The keys protecting your vaults
- Your account password and Secret Key, which 1Password does not store
- Account recovery keys
- 1Password apps and browser extensions

1Password also says its source code "is not customer data, and contains no user secrets." Both the source code and the CI/CD access are real losses for the company, even though neither holds your vault.

## How does zero-knowledge encryption protect your vault? {#zero-knowledge}

> Zero-knowledge means a service stores your data but cannot read it. Your device encrypts everything with keys the company never holds, so a stolen server copy is unreadable without them.

Zero-knowledge design is the main reason this breach stopped short of the vaults. Think of a safe deposit box where the bank holds the box but only you hold the key. A burglar who takes over the bank still faces a locked box.

1Password's [Secret Key explainer](https://support.1password.com/secret-key-security/) describes how this works. Your account password and a Secret Key of 34 letters and numbers combine to create the full encryption key. The Secret Key is created on your device, and 1Password says it has no record of it. The page says someone who attempts a brute-force attack on 1Password's servers "won't be able to decrypt your data without your Secret Key, which we never have."

The incident update repeats the point: "Your vault secrets are encrypted with keys that only you hold, so we can't access them, and neither can an attacker who gets into our servers."

Two ideas from this blog apply here. First, we say bullet resistant, never bulletproof. A bullet resistant system stops most of the damage and admits some shots will land. Second, assume a breach mentality means you design defenses to work after the attacker already has your data. Zero-knowledge fits both ideas. Per 1Password, the attacker got into backend systems and still failed to read the vaults.

The same design has limits. Zero-knowledge protects what sits inside your vault, not the details around it. The attacker still left with names, email addresses, identifiers, sign-in times, tokens, and source code. Our [Fireworks AI breach post](/2026/11/15/fireworks-ai-breach-third-party-vendor-risk/) makes a similar point about vendors. Limit what a stolen key reaches, because some key will eventually get stolen.

## Is 1Password safe after the breach? {#is-1password-safe}

> Based on 1Password's statement, vault contents were not reached and customers need not update anything. We cannot verify this ourselves, and the company has not published its experts' findings. Stay alert for phishing.

1Password's short summary says: "You do not need to update anything in your 1Password account." The company also says it saw no internal evidence of account takeovers through the exposed tokens.

We rely on this statement, and so does every news report. No independent party has yet published a review. 1Password says outside experts are validating its containment and cleanup, and it says it will keep its post current if anything changes. Check the [incident update](https://1password.com/blog/update-on-nov-2026-security-incident) again before you decide anything.

Nothing in the statement tells customers to stop using a password manager. A manager still beats reused passwords, and this breach did not reach the vaults. The honest risk today is phishing, not stolen passwords.

## How do you spot 1Password breach phishing? {#phishing}

> Treat any unexpected email, text, or call about 1Password invitations or account recovery as fake. Never click its link. Open the 1Password app or type the address yourself. 1Password never asks for your password or Secret Key.

Phishing means a fake message built to trick you into giving up information. A leaked list of names and email addresses hands scammers a list of known 1Password users. Expect lures like "Verify your 1Password account after the security incident" or "Accept your team invitation."

1Password gives this guidance in its update:

- Be cautious about unexpected emails, texts, or calls mentioning 1Password, invitations, or account recovery attempts.
- "1Password will never contact you to ask for your account password or Secret Key."
- Enter them only in the official app or on the official website, and only after you open the app or type the address yourself.
- Report anything suspicious to support@1password.com.

Add these habits:

- **Check whether you started it.** A recovery email you did not request is a red flag. A team invitation you did not expect is another.
- **Treat any code request as a warning.** The six-digit and ten-character codes protect your account. No real support agent needs them.
- **Do not trust caller ID or a sender name.** Both are easy to fake. Go to the app yourself.

For more on how modern phishing works once an attacker has a target list, read our [modern phishing post](/2026/06/19/modern-phishing-why-password-resets-fail/).

## Should you turn on MFA for 1Password? {#mfa}

> 1Password says you need not change anything. Two-factor authentication is still a sensible extra layer. Per 1Password, it requires a second step when you sign in on a new device. Use an authenticator app or a security key.

MFA (multi-factor authentication) is a second login step, such as a code from an app or a tap on a security key. This is our advice, not a step 1Password asks for in this incident.

1Password's [two-factor guide](https://support.1password.com/two-factor-authentication/) says the second factor is required when you sign in to your account on a new device, in addition to your account password and Secret Key. It also says to store the codes in a different authenticator app, not inside 1Password. Its words: storing them in 1Password "would be like putting the key to a safe inside the safe itself."

MFA does not stop you from typing secrets into a fake page, so it does not replace the phishing habits above. It adds a hurdle for anyone who gets a password or Secret Key some other way. Our post on [two-factor authentication](/2026/02/16/2fa-the-5-minute-fix-that-stops-99-percent-of-account-attacks/) covers which method to pick.

## What supply chain lesson does the 1Password breach teach? {#supply-chain}

> One developer's GitHub account gave an attacker access to source code, a build pipeline, and backend services. Protect developer accounts like production systems, and require review before code reaches them.

A supply chain attack hits the tools and accounts used to build software instead of the software's users directly. Here, the entry point was one employee's corporate GitHub account. The attacker reached private repositories, the CI/CD system, and backend services from there.

1Password has not said how the account was compromised or which protections were in place. This post does not suggest any specific control was missing. These are general practices GitHub documents for any team:

- **Require two-factor authentication for developers.** GitHub's [2FA guide](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/about-two-factor-authentication) explains the options, including hardware security keys.
- **Protect important branches.** GitHub's [branch protection rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) allow you to require pull requests with approving reviews before code merges, so one login is not enough to ship code.
- **Require signed commits.** With [commit signature verification](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification), GitHub marks changes "Verified" when they carry a cryptographic signature from a trusted source.
- **Limit and rotate pipeline secrets.** 1Password says its CI/CD held infrastructure secrets and says it rotated them. Fewer standing secrets means less to rotate on a bad day.
- **Watch for unusual pushes and token use.** 1Password says it added new detections for this kind of attack.

Each control has limits, and none replaces the others. The point is layers. A stolen login should not be enough on its own to change production code.

## What should you do now? {#checklist}

> Read 1Password's update, treat unexpected invitation and recovery emails as fake, never share your password or Secret Key, and add two-factor authentication if you have not. Change nothing in your account unless 1Password later says otherwise.

1. **Read the source.** Start with [1Password's incident update](https://1password.com/blog/update-on-nov-2026-security-incident), which the company promises to keep current.
2. **Do not act on unexpected messages.** Skip any invitation, recovery, or "verify your account" email you did not start. Open the app or type the address yourself.
3. **Keep your Secret Key and password private.** Only enter them in the official app or website.
4. **Report suspicious messages.** Send them to support@1password.com.
5. **Turn on two-factor authentication.** Choose an authenticator app or a security key, and store its codes apart from 1Password.
6. **Guard your Emergency Kit.** It holds your Secret Key. 1Password says it never stores the Secret Key.
7. **Building software? Review your developer accounts.** Check two-factor authentication, branch protection, and who holds long-lived tokens.

## The bottom line

An attacker used one employee's GitHub account to reach 1Password's code and backend, and it copied customer account records. Per 1Password, the vaults were out of reach because the company never holds the keys. This is the assume-a-breach idea working as designed. It is bullet resistant, not bulletproof.

The leaked names, emails, and tokens still matter, because they feed convincing phishing. Ignore unexpected 1Password emails, stay calm, and watch the incident update for changes.

Follow ByteSizedSecurity for updates as 1Password shares more.

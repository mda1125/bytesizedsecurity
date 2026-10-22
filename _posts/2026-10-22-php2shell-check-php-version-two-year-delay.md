---
description: "PHP2Shell lets attackers run code on PHP servers, and its first signs surfaced in 2024. How to check your PHP version and patch today."
layout: post
title: "Check Your PHP Version: The 2024 Bug Behind PHP2Shell"
slug: php2shell-check-php-version-two-year-delay
category: "Vulnerabilities"
tags: ["PHP2Shell", "Check PHP Version", "Open Source Security"]
author: Marc
excerpt: "PHP patched two critical remote code execution flaws on October 21, 2026. The PHP Foundation admits the first signs of one surfaced in 2024 and the fix stalled for months, calling the delay a structural failure. Here is what happened, why it matters for open source, and how to check and update your PHP version."
image: "/assets/img/posts/php2shell-check-php-version-two-year-delay.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-10-22
faq:
  - question: "What is PHP2Shell?"
    answer: "PHP2Shell is the name researchers gave two critical PHP flaws, CVE-2026-109618 and CVE-2026-109619. Both let an attacker with no login run code on a server under the right conditions. Each scores 9.2 out of 10 under CVSS v4.0, per <a href=\"https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w\">PHP's GitHub security advisory</a>. The fixed releases are PHP 8.2.35, 8.3.36, 8.4.27, and 8.5.12."
  - question: "How do I check my PHP version?"
    answer: "Run php -v in a terminal on the server. Your web server might use a different PHP build than the command line, so also check with a temporary phpinfo() page, deleted right after, or your hosting control panel. Compare the result against the fixed versions on <a href=\"https://www.php.net/\">php.net</a>: 8.2.35, 8.3.36, 8.4.27, or 8.5.12."
  - question: "Is PHP2Shell being exploited?"
    answer: "Exploitation attempts are confirmed. <a href=\"https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/\">Amazon Threat Intelligence</a> logged an attempt against its honeypots on October 17, four days before the patch, and now says the flaw is broadly exploited. Rapid7 reports attempts but says public exploits are unreliable and it has not seen successful exploitation. Treat it as urgent either way."
  - question: "Is PHP 8.1 or older fixed?"
    answer: "Not with an official release. Per <a href=\"https://www.php.net/\">php.net</a>, PHP 8.1 and older no longer receive updates from the PHP project. The security team published minimal source backports for PHP 7.4, 8.0, and 8.1, and some Linux distributions and long-term support vendors ship their own fixes. The lasting answer is moving to a supported branch."
  - question: "Why did the PHP fix take so long?"
    answer: "The <a href=\"https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/\">PHP Foundation</a> says a developer spotted the first signs in 2024, but no attack path was known yet. Every candidate fix carried a cost, the security team worked by consensus, and few engineers knew the engine well enough. Work stalled and restarted for months. The Foundation calls the delay a structural failure."
---

A bug spotted in 2024 became an emergency patch in October 2026.

**TL;DR:** On October 21, 2026, PHP shipped [8.5.12, 8.4.27, 8.3.36, and 8.2.35](https://www.php.net/) to fix two critical flaws, together nicknamed PHP2Shell, which let an attacker with no login run code on a web server. [The PHP Foundation says](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/) a developer found the first signs of one of them in 2024, and the fix stalled for months. AI-assisted research in August 2026 proved how bad it was. Exploitation attempts started before the patch. Check your PHP version today, update, and plan your move off any unsupported branch.

---

**Jump to a section:**

- [What is PHP2Shell?](#what-is-php2shell)
- [How did a 2024 bug wait until 2026 for a fix?](#two-year-delay)
- [How did AI-assisted research find it again?](#ai-rediscovery)
- [What went wrong with the disclosure?](#leak)
- [Is PHP2Shell being exploited?](#exploitation)
- [Is this a volunteer problem or a funding problem?](#funding)
- [How do you check your PHP version?](#check-php-version)
- [How do you update to a fixed PHP version?](#update-php)
- [What if you run an unsupported PHP version?](#unsupported-php)

Most security stories are about an attacker. This one is about a queue. A small team saw a warning sign, failed to agree on a safe fix, and did not have enough people to push one through. Below, I walk through what the flaws are, how the delay happened, why it says more about funding than about the people involved, and the steps to take on your own servers.

## What is PHP2Shell? {#what-is-php2shell}

> Two critical PHP flaws, CVE-2026-109618 and CVE-2026-109619, let an attacker with no login run code on servers running PHP. Both score 9.2 under CVSS v4.0. The fixes shipped October 21, 2026.

PHP is the programming language behind a big share of the web. It runs WordPress, Drupal, Joomla, and MediaWiki, the software behind Wikipedia. [W3Techs](https://w3techs.com/technologies/details/pl-php) reports PHP on 69.3% of websites whose server-side language it identifies, as of October 22, 2026.

Each flaw has a CVE, short for Common Vulnerabilities and Exposures, the public ID system for security bugs. Per [PHP's security announcement on php.net](https://www.php.net/), the two are:

- **CVE-2026-109618, "RCE via OOM corruption":** when PHP runs out of its allowed memory (an OOM, or out-of-memory, error) at the wrong moment, it leaves half-built internal data behind and later treats it as valid.
- **CVE-2026-109619, "RCE via stale global state":** a crash at the wrong point leaves internal pointers aimed at memory from a previous request. The next request on the same worker uses the freed memory, a bug class called use-after-free.

RCE stands for remote code execution. It means an attacker sends a request over the network and ends up running their own commands on your server. [PHP's GitHub advisory](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w) rates both flaws critical, with a CVSS v4.0 score of 9.2 out of 10. CVSS is the standard severity scale for vulnerabilities.

Who is at risk? Per php.net, "all PHP installations serving web requests," including PHP-FPM, Apache with mod_php, php-cgi, FrankenPHP, and LiteSpeed. The PHP team rates mod_php as highest risk, because the attack fires before any of your application code runs. Your login page never even sees the request. [Wiz Research](https://www.wiz.io/blog/php2shell-php-rce), one of the teams credited with the discovery, says every PHP version released in the last decade carries at least one of these flaws, back to PHP 5.4.

## How did a 2024 bug wait until 2026 for a fix? {#two-year-delay}

> A PHP Foundation developer found the first signs in 2024, during work tied to an external audit. No attack path was known, every fix carried trade-offs, and a small consensus-driven team stalled for months.

The [PHP Foundation's own account](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/) is candid.

In 2024, PHP went through its first external security audit in years. Germany's Sovereign Tech Agency funded it, OSTIF organized it, and Quarkslab carried it out. While fixing one of the issues Quarkslab reported, a core developer contracted by the PHP Foundation spotted the first signs of the memory problem behind CVE-2026-109618. To be precise, the audit report did not flag this bug. It surfaced during follow-up work.

At the time, a possible exploit was theorized, but no concrete attack path turned up. Other bugs with clear impact took priority.

The security team drafted several fixes. Each one hurt something: one broke backward compatibility, one opened a new denial-of-service risk (a way to crash or freeze the service), and one required changes across third-party extensions the team saw no way to coordinate. The team worked by consensus, feared shipping the wrong choice, and had few engineers with deep knowledge of the PHP engine. The Foundation says the work stalled and restarted repeatedly over months.

The Foundation does not soften it: "We won't pretend otherwise: the delay was a structural failure, caused by both the security team's decision process and its lack of resources."

## How did AI-assisted research find it again? {#ai-rediscovery}

> In August 2026, outside researchers reported the same root cause with working attack paths. Calif reported it on August 11, and OpenAI and Wiz sent their own reports. Wiz says frontier AI models helped it find and exploit the bug.

The PHP Foundation brought PHP into the Patch the Planet program, under which security firm Calif began an audit on July 30, 2026. On August 11, Calif researcher Ryan A reported an unconditional remote code execution with the same root cause as the 2024 memory problem, [per the Foundation](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/). OpenAI independently reported the same root cause and sent more attack paths on September 18. Wiz sent its reports on August 24.

The AI part is clearest in [Wiz's write-up](https://www.wiz.io/blog/php2shell-php-rce). Its timeline says it discovered the first vulnerability on August 19 "using Wiz Atlas, Gemini 4 Argon, and GPT-5.6 Sol," confirmed unauthenticated RCE against Drupal and WordPress within two days, and reported to PHP on August 24. The Foundation's thank-you list credits OpenAI's Codex Security team as well. Calif's own methods are not described in the Foundation's post, so I'm not labeling its finding as AI-driven.

Once these reports landed, the full impact was clear, and fixing the problem became the top priority for everyone at the Foundation working on security. Roughly ten weeks later, patches shipped.

There's a second lesson here. The Foundation says AI tools now flood the team with reports: 15 CVEs published since July 1, plus more than 100 reports which turned out invalid, duplicated, or not reproducible. I covered this pressure from the buyer's side in [the AI bug report flood and third-party risk](/2026/09/05/third-party-risk-management-ai-bug-report-flood/).

## What went wrong with the disclosure? {#leak}

> The CVE IDs leaked on October 20, two days early, with a wrong severity score. PHP moved the release up a day, a researcher's video slipped out, and one distributor published fixed builds before the embargo lifted.

Coordinated disclosure means the people who find a bug, the project, and the companies who package the software agree on a release date, so fixes and details go public together. An embargo is the agreed period of silence before the release date.

The [Foundation's timeline](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/) says the process "worked well until 2 days ahead of the targeted release date." Around 15:00 UTC on October 20, the two CVE IDs started circulating online with a wrong release time and a wrong CVSS score of 10.0. No technical details leaked. PHP moved the release from October 22 to October 21 at 14:00 UTC, a compromise to give Linux distributions time to finish packaging.

Then Calif mistakenly published, and later deleted, a video of its proof of concept, the demonstration exploit, which revealed a few limited details. Copies spread, and the Foundation says the video sped up public exploit development. Separately, at 07:41 UTC on October 21, distributor Chainguard published fixed images more than six hours before the coordinated release, which let anyone study the patch early.

## Is PHP2Shell being exploited? {#exploitation}

> Exploitation attempts are confirmed, some before the patch. Amazon logged one on October 17 and now calls exploitation broad. Rapid7 says the public exploits are unreliable and it has not seen one succeed.

[Amazon Threat Intelligence](https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/) found an exploit attempt against its MadPot honeypots (decoy servers built to attract attacks) dated October 17, 2026, four days before public disclosure. Amazon says it is unclear how the attacker got exploit details so early, or whether the attempt would have worked against a real system. After the release, Amazon wrote: "PHP2Shell is now being broadly exploited in the wild."

Other teams describe a mixed picture. [Rapid7](https://www.rapid7.com/blog/post/etr-cve-2026-109618-and-cve-2026-109619-critical-unauthenticated-remote-code-execution-in-php/) reviewed the public exploits and found each works only against a specific mix of operating system, PHP version, and web server, with none broadly reliable. Rapid7 reports attempts but has not observed successful exploitation. [watchTowr](https://watchtowr.com/intelligence/php-cve-2026-109618-faq/) reports exploitation hitting its honeypots since October 21 and notes CISA had not added either CVE to its Known Exploited Vulnerabilities catalog as of October 22.

My read: unreliable exploits are a window to patch, not a reason to wait. If you run PHP on the internet, Amazon's advice to start any investigation from October 17, not from the disclosure date, is sound. This is the small slice of CVEs worth dropping everything for, the opposite of the long tail I covered in [why most CVEs are never exploited](/2026/09/09/vulnerability-prioritization-cves-never-exploited/).

## Is this a volunteer problem or a funding problem? {#funding}

> Funding. The people involved found the bug and fixed it. Too few paid experts, and a slow consensus process, turned a warning sign into a two-year gap. Companies profiting from PHP carry part of the cost.

It's tempting to read a bug left unfixed since 2024 as negligence. The record points somewhere else. A Foundation-paid developer caught the first signs during audit work. The team tried multiple fixes. When the impact became clear, the Foundation says people worked full time, "through weekends and around the clock," to ship it.

The gap is capacity. In the Foundation's words, "security work on PHP itself still depends on a small group of foundation-funded developers and a little volunteer help." It also explains what AI scanners do not replace: "What tools cannot do is decide on the right fix for a long-standing design decision in the engine, weigh the compatibility trade-offs, and review the patch."

Here's my stance. If PHP runs on roughly seven of every ten websites with a known server language, a handful of engine experts should not be the only thing between a known weakness and a fix. The 2024 audit happened because a public agency paid for it. The 2026 response moved fast because the Foundation had money to pay people to work on it full time. Funding came first both times.

The Foundation is changing its own process too. It says the security team is moving from consensus to majority decisions, and serious stuck fixes will reach leadership sooner. Credit to them for publishing the failure instead of burying it. Honesty like this is rare, and it's useful to everyone who depends on open source.

If your organization builds on PHP, ask who pays for the code under your product. The [PHP Foundation's sponsor page](https://thephp.foundation/sponsor/) is one direct answer.

## How do you check your PHP version? {#check-php-version}

> Run php -v on the server, confirm with a temporary phpinfo() page or your host's control panel, and compare against 8.2.35, 8.3.36, 8.4.27, or 8.5.12.

Start with the command line. Log in to the server and run:

```
php -v
```

The first line shows the version, for example PHP 8.3.36. One catch: the command-line PHP and the PHP your web server runs are sometimes different builds. Check both.

To see what your web server runs, create a file containing `<?php phpinfo();` in your web root, load it once in a browser, note the version at the top, and **delete the file right away**. A phpinfo() page lists your full configuration, and leaving it public hands attackers a map.

On shared hosting, look for a "PHP version" or "PHP settings" section in your control panel. If you don't see one, ask your host which PHP version your site runs and whether it includes the October 21 fixes.

One more wrinkle. Linux distributions often backport security fixes into their own packages without changing the upstream version number. [Per php.net](https://www.php.net/), distributions and long-term support vendors received the patches in advance, so check your distribution's security advisory for the package version carrying the fix.

## How do you update to a fixed PHP version? {#update-php}

> Update to PHP 8.2.35, 8.3.36, 8.4.27, or 8.5.12 through your package manager, host, or source build, then restart PHP and your web server. Configuration tweaks reduce risk but do not fix it.

Find your branch, then the fixed release:

| Your branch | Fixed release | Security support ends |
|---|---|---|
| PHP 8.5 | 8.5.12 | 31 Dec 2029 |
| PHP 8.4 | 8.4.27 | 31 Dec 2028 |
| PHP 8.3 | 8.3.36 | 31 Dec 2027 |
| PHP 8.2 | 8.2.35 | 31 Dec 2026 |
| PHP 8.1 and older | No official release | Already ended |

Fixed releases come from [php.net](https://www.php.net/). Support dates come from [PHP's supported versions page](https://www.php.net/supported-versions.php).

Install the update through your package manager or host, then restart PHP-FPM or Apache so every worker loads the new code. A long-running worker keeps the old code in memory until it restarts.

If patching today isn't possible, php.net lists stopgaps, such as disabling session upload progress, and is blunt about their limits: "There are no complete mitigations, updating is the only safe choice." If you manage patching across many servers, [automating vulnerability management](/2025/12/25/stop-patching-manually-automate-vulnerability-management/) is how you get this done in hours next time, not weeks.

## What if you run an unsupported PHP version? {#unsupported-php}

> PHP 8.1 and older get no official fix. Use your distribution's backport or the PHP team's minimal source patches for now, then move to a supported branch. PHP 8.2 support ends December 31, 2026.

End of life (EOL) means a branch no longer gets fixes from the project. Each PHP branch gets two years of active support and two more years of security-only fixes, per [PHP's supported versions page](https://www.php.net/supported-versions.php). After those four years, the branch is on its own.

Because these flaws are so serious, the PHP security team made an exception: minimal source backports for PHP 7.4, 8.0, and 8.1, for people building from source or without a long-term support vendor. Those are a bridge, not a plan.

This is not a niche issue. [W3Techs data](https://w3techs.com/technologies/details/pl-php) from October 22, 2026 shows version 7 on 26.9% of PHP sites it tracks and version 5 on 7.7%. Every one of those major versions is past end of life.

Plan your move this way:

1. **Inventory.** List every server, container image, and hosting account running PHP, and the branch each one uses.
2. **Pick a target.** Choose a supported branch with time left. PHP 8.2 security support ends December 31, 2026, so moving to 8.2 today buys you about ten weeks.
3. **Test.** Use PHP's migration guides, linked from the supported versions page, to find breaking changes, and run your app and plugins against the new branch in staging first.
4. **Set a date.** Put the cutover on a calendar, and add the next end-of-life date to the same calendar so the next one doesn't sneak up on you.

## The bottom line {#bottom-line}

PHP2Shell is not a story about careless volunteers. A small, underfunded team saw a warning sign in 2024, struggled with a hard engineering trade-off, and lost time. Then AI-assisted researchers showed exactly how bad it was, and the fix shipped in about ten weeks once Foundation funding put several people on it full time. The lesson for anyone running PHP is simple: check your version today, update, and get off unsupported branches. The lesson for anyone profiting from open source is harder: fund the people who maintain it, before the next warning sign sits in a queue.

What PHP version is your site running right now? Check before you close this tab.

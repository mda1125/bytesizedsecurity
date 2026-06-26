---
description: "90% of cybersecurity applicants are indistinguishable. Build a detection lab, investigate a real incident, and create proof that puts you in the top 5%."
layout: post
title: "Rise Above the 90%: Build Cyber Proof, Not Just Certs"
category: Blue Team
tags: ["Cybersecurity Careers", "Blue Team", "SOC Analyst"]
author: Marc
excerpt: "Stop collecting cybersecurity certifications and start building undeniable proof of your skills. This guide shows you how to create a detection lab, investigate a real incident, and turn it into portfolio evidence that lands you the job."
image: "/assets/img/posts/rise-above-the-90-build-cyber-proof-not-just-certs.webp"
image_width: 1200
image_height: 670
last_modified_at: 2026-06-19T10:04:02-07:00
---

## Stop Collecting Certifications. Start Building Proof.

**TL;DR:** A cybersecurity hiring manager broke down the five tiers of applicants he sees for every role. 90% of candidates are indistinguishable. The top 5% stand out because they can demonstrate real, hands-on skill. This post walks you through building a detection lab, investigating a realistic incident, and turning it into portfolio evidence you can reference in interviews — all in a single weekend.

---

## The Uncomfortable Truth About How Cybersecurity Hiring Actually Works

A hiring manager who'd recently placed 25 people into SOC analyst, penetration testing, and risk analyst roles laid it out publicly. Every entry-level role he posts gets 75 to 100 applicants. Here's how they break down:

**The bottom 30%** have zero cybersecurity experience, zero certifications, and a cover letter that amounts to "this field pays well, hire me." They get filtered immediately.

**The next 30%** have a degree in cybersecurity and maybe a Security+ certification. But no IT experience and no hands-on security work. They're usually recent graduates.

**Another 30%** are career switchers with 10+ years in management, consulting, or another field. They have Security+ and strong soft skills, but no technical security experience.

**The top 5%** have 3 to 4 years of IT experience as a helpdesk tech, sysadmin, or developer. They have hundreds of hours on platforms like Hack The Box. They've spoken at a local security conference. They have relevant certifications and maybe some cloud experience. Their passion is visible, and they spend their spare time doing security work.

**The final 5%** have everything above, plus someone on the existing team knows them and vouches for them.

That final detail matters more than most people want to admit. As this hiring manager put it: cybersecurity people are trained to reduce risk. Hiring someone your team already trusts after months of interaction is lower risk than hiring a stranger after two one-hour interviews.

This isn't a system you can complain your way out of. But it is a system you can work within once you understand it.

## Why Certifications Alone Leave You in the 90%

There's nothing wrong with certifications. Security+, Network+, and CCNA give you a shared vocabulary and a baseline understanding of concepts. But they don't differentiate you, because almost every other applicant has them too.

When hiring managers talk about the "months before they get useful" problem, they're describing the gap between knowing what a SIEM is and being able to actually write a detection query in one. Between knowing what an IOC is and being able to extract one from obfuscated JavaScript.

Every junior hire costs a senior team member's time. Seniors are already stretched thin, mentoring existing juniors while handling their own caseload. So hiring managers optimize for the candidate who needs the least ramp-up time.

The way to prove you're that candidate isn't another line on your resume. It's demonstrable evidence that you've already done the work.

## The Weekend Detection Lab

What follows is a practical project you can complete in a weekend. When you're done, you'll have a working detection environment, a documented investigation, and a portfolio artifact you can walk through in any SOC analyst interview.

### What You're Building

A local security monitoring environment where you ingest Windows logs into a SIEM, detonate malware in a controlled environment, and write detection rules to identify malicious behavior. Then you'll simulate a realistic incident scenario and document your investigation end to end.

### What You'll Need

**Hardware:** Any machine with at least 16 GB of RAM and 100 GB of free disk space. A modern laptop works fine.

**Software (all free):**
- A hypervisor: VirtualBox or VMware Workstation Player
- Splunk Free (accepts up to 500 MB of logs per day, plenty for a lab)
- A Windows 10 or 11 VM (Microsoft provides free evaluation ISOs)
- Sysmon (free from Microsoft Sysinternals)
- A lightweight malware sample set (more on this below)

### Part 1: Stand Up Your SIEM

Install Splunk Free on your host machine or a dedicated Linux VM. The free tier is more than sufficient for lab work and it's what you'll encounter in a significant percentage of SOC environments.

Configure a receiving port for forwarded logs. Install the Splunk Universal Forwarder on your Windows VM and point it at your Splunk instance. Verify logs are flowing by running a basic search.

At this point, you have a functional log pipeline. That alone puts you ahead of candidates who've only read about SIEMs.

### Part 2: Instrument Your Windows VM

Install Sysmon with a community configuration like SwiftOnSecurity's sysmon-config or Olaf Hartong's sysmon-modular. These configurations are tuned to capture the process creation events, network connections, file modifications, and registry changes that matter most for detection.

Configure your Splunk forwarder to ingest Sysmon logs in addition to standard Windows Event Logs. Verify both log sources appear in Splunk.

Now you have visibility into endpoint behavior at a level that most production environments aspire to. You can see every process that spawns, every network connection it makes, and every file it touches.

### Part 3: Detonate and Detect

**Snapshot your VM first.** This is your clean restore point.

Download malware samples from curated repositories. TheZoo on GitHub and MalwareBazaar from abuse.ch both provide labeled samples for research purposes. Start with something well-documented, like an Emotet dropper or a commodity RAT. You want malware with known behaviors so you can verify your detections against established IOCs.

Run the sample in your VM. Watch what happens in Splunk. You should see process creation events, network callback attempts, persistence mechanisms being written to the registry, and potentially lateral movement attempts.

Write Splunk queries to identify each stage of the kill chain you observe:
- Initial execution (parent-child process relationships that look suspicious)
- Network callbacks (connections to known C2 infrastructure or unusual destinations)
- Persistence (registry run keys, scheduled tasks, startup folder modifications)
- Defense evasion (process injection, AMSI bypasses, event log clearing)

Save these as alerts. Give each one a descriptive name, a severity rating, and document why the behavior is suspicious. You're building a detection library.

Revert your VM to the clean snapshot when you're done.

### Part 4: Simulate the Interview Scenario

This is the exercise that mirrors what hiring managers actually ask in technical interviews. The scenario: an executive received a phishing email with an HTML attachment. They opened it.

Create the scenario yourself:
1. Write a simple HTML file that contains obfuscated JavaScript (base64-encoded redirect, a fake login page, or a script that downloads a payload). You don't need actual malicious infrastructure — the point is practicing the investigation workflow.
2. "Open" the file in your Windows VM's browser.
3. Now investigate as if this were a real alert.

**Your investigation should cover:**

**Triage the alert.** What triggered it? What does the initial telemetry tell you? Document your first observations.

**Examine the attachment.** Open the HTML in a text editor. Deobfuscate the JavaScript. What is it trying to do? What domains, IPs, or URLs are embedded? These are your IOCs.

**Pivot on the IOCs.** Check them against VirusTotal, URLhaus, or AbuseIPDB. Document what you find. Are these known malicious? When were they first seen?

**Check for lateral spread.** In a production environment, you'd search all mailboxes for the same email. In your lab, document the query you would run in Exchange Online or through a mail gateway. Write the Splunk query that would identify other users who received the same attachment hash.

**Assess blast radius.** Check your Splunk logs for any additional activity from the VM after the file was opened. Did any processes spawn? Were any network connections established? Document what you find.

**Contain and remediate.** Document the containment steps you'd take: isolate the endpoint, block the IOCs in your security tools, remove the email from other mailboxes, reset credentials if needed.

**Write it up.** Create a one-page incident report with timeline, scope, IOCs, impact assessment, and remediation steps.

## How to Turn This Into a Portfolio

The lab itself isn't the deliverable. The documentation is.

Write a blog post or a detailed README that walks through your setup, your detection queries, and your investigation. Include screenshots of your Splunk dashboards, your detection alerts firing, and your incident timeline. Host it on GitHub or a personal blog.

This gives you three things in an interview:

**Something concrete to discuss.** When an interviewer asks about your experience with SIEMs, you don't have to speak theoretically. You can walk them through a specific detection you built and explain why you chose those specific log fields.

**Evidence of independent problem-solving.** You didn't follow a guided tutorial. You set up infrastructure, made decisions about what to monitor, and investigated an incident using your own judgment. That's exactly the kind of initiative that moves you from the 90% pile to the top 5%.

**A public artifact that builds reputation.** Share it on LinkedIn, present it at a local security meetup, or discuss it in cybersecurity Discord communities. This is how you start becoming a known quantity in the field — which is how you eventually get into that final 5% where someone on the team vouches for you.

## The Networking Layer

The hiring manager was blunt about this: good people know good people. If your team is good, hiring people they think are good is a win.

This feels unfair if you're on the outside. But the mechanism isn't a conspiracy. It's just trust built through repeated interaction. You can build that trust deliberately:

**Show up consistently.** Join a local DEFCON group, BSides chapter, or OWASP meetup. Go regularly, not once. Ask questions. Help someone with a CTF challenge.

**Share your work publicly.** The lab you just built is content. Blog about what you learned. Post your detection queries. Share what surprised you. People in this field respect practitioners who teach.

**Be useful in online communities.** Answer questions in cybersecurity subreddits, Discord servers, or Slack groups. Not to build clout, but because helpfulness creates relationships. Over months, people start to know your name and associate it with competence.

None of this is fast. But it's the same process that every person in that top 5% followed, whether they realized it or not.

## The Real Bar

If there's one thing to take away from how cybersecurity hiring actually works, it's this: the bar isn't knowledge. It's capability.

Can you, given a real alert, figure out what happened, determine the scope, extract the indicators, and take action? Not perfectly. Not without Googling some syntax. But independently enough that a senior doesn't have to sit next to you for every step.

A weekend lab won't make you a senior analyst. But it will give you a genuine answer to the question every interviewer is really asking: "Can this person do the work?"

Build the lab. Document the investigation. Share it publicly. Then walk into the interview and talk about what you actually did — not what you memorized for a certification exam.

That's the difference between the 90% and the top 5%.

#ByteSizedSecurity #CyberSecurity #InfoSec #SOCAnalyst #CyberCareers #SecurityJobs #BlueTeam #ThreatDetection #Splunk #SIEM #CareerAdvice
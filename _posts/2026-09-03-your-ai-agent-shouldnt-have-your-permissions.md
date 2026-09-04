---
description: "Agents inherit your access, not your judgment. Why AI agent authorization needs scoped identities and transaction controls, not human approval alone."
layout: post
title: "Your AI Agent Shouldn't Have Your Permissions (2026)"
category: DevSecOps
tags: ["AI Agents", "Identity and Access Management", "AI Governance"]
author: Marc
excerpt: "A new tool called OpenLeash pauses risky AI agent actions and asks a human before they happen. This is useful, but it treats approval as the safety net instead of the missing piece: agents with no built-in ceiling on their permissions to begin with. Here's the framework security teams need before they hand an agent the keys."
image: "/assets/img/posts/your-ai-agent-shouldnt-have-your-permissions.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-09-03
slug: your-ai-agent-shouldnt-have-your-permissions
faq:
  - question: "What is OpenLeash?"
    answer: "OpenLeash is a runtime authorization layer built by Max Brin that runs alongside an AI agent. According to <a href=\"https://openleash.com/\">OpenLeash's own site</a>, it intercepts an agent's intended actions, blocks the clearly dangerous ones, and asks a human to approve or deny anything ambiguous or high impact before it executes."
  - question: "Why do AI agents inherit so many permissions?"
    answer: "Most agents run under the login session, API key, or service account of whoever launched them. Its full permission set comes along by default, because building a separate, narrower identity for every agent takes more setup work than most teams do before shipping. The agent gets the access without the judgment normally accompanying it."
  - question: "Is a human-in-the-loop approval prompt the same thing as access control?"
    answer: "No. Access control limits what an agent is allowed to attempt in the first place. A human-in-the-loop prompt only reacts after the agent has already decided to try something risky. It is a useful backstop, but it depends on a person having the context and attention to catch every escalation, which does not scale well."
  - question: "What is a scoped agent identity?"
    answer: "A scoped agent identity is a distinct set of credentials and permissions issued to the agent itself, separate from the human or system that launched it. It is limited to the specific actions, endpoints, and thresholds the agent's task requires, following the same least-privilege logic security teams already apply to service accounts."
  - question: "Which security frameworks cover AI agent permissions?"
    answer: "AI agent authorization maps to controls most security teams already track: SOC 2 CC6.1 and CC6.3 for logical access, NIST CSF 2.0's PR.AA identity function, ISO/IEC 27001:2022 controls A.5.15, A.5.16, and A.5.18 for access and identity management, and NIST AI RMF's GOVERN 1.7 and MANAGE 2.4 for AI-specific risk response."
---

A human approval prompt feels like control. It is not the same thing as authorization.

**TL;DR:** A new tool called OpenLeash intercepts risky AI agent actions and asks a human before letting anything destructive or high-impact go through. It is a real improvement over agents silently deleting databases or shipping data to the wrong endpoint. But a human approval prompt is a backstop, not an access control strategy. The deeper problem: most agents still run under the full permissions of whoever launched them, with no identity of their own and no limits on individual actions. Fix this first, and the approval prompt becomes a rare escalation instead of the only thing standing between your agent and a bad day.

---

Security researcher Max Brin built OpenLeash to sit alongside an AI agent and watch what it is about to do. According to [SecurityWeek's reporting on the launch](https://www.securityweek.com/openleash-adds-a-human-check-to-risky-ai-agent-actions/), the tool intercepts an agent's intended action, decides whether it is clearly risky, clearly fine, or genuinely ambiguous, and only pings a human for the ambiguous one. Brin calls it "an AV for AI," and gives the moment it earns its name: an agent about to silently delete a database, or quietly upload credentials to the wrong site, gets paused instead of executed.

This is a good pattern. On its own, it is not enough.

## Why do AI agents get so much access in the first place? {#agent-permissions}

> Most agents run under the same login, API key, or service account as whoever launched them, so they inherit every permission tied to it, whether the task needs it or not.

As Brin put it to SecurityWeek, "agents tend to inherit the permissions of their user, but they do not inherit any human situational awareness." A person knows, without being told, deleting a production database is different from deleting a test file. An agent only knows what it was authorized to touch, and if the authorization is "everything the launching account reaches," a single bad prompt, a malicious tool call, or a compromised model has the same reach a person would.

This is not a new failure mode. It is the same overly permissive access pattern behind real breaches for years. LexisNexis confirmed its second breach in two years after an [unpatched app and a leaky IAM role](/2026/03/06/lexisnexis-breach-unpatched-app-leaky-iam-and-your-data/) let an attacker reach far more than the app should have needed. Give an agent this kind of blanket access and you have built the identical weakness, with a faster and less predictable operator behind the wheel.

## Is a human-approval prompt the same thing as an authorization system? {#human-in-the-loop}

> No. A prompt asking "should I allow this?" is a fallback for when scoping already failed. It does not shrink what the agent might attempt. It adds a person who has to catch every risky request in real time.

Human-in-the-loop review sounds like control because a person is finally in the decision. But the approver is only as good as the context given in the moment, and approval fatigue is a documented failure pattern in every field relying on it, from change management to insider threat review. An approver staring at a stream of "allow this action?" prompts with no separation of duties, no risk score, and no idea what normal looks like for this agent will start clicking yes. At this point, the human check is not a control. It is a rubber stamp with a paper trail.

This is also why "several hundred personal users and at least four organizations," the current adoption OpenLeash reports per SecurityWeek, is a meaningful but early signal. The pattern works when someone is paying close attention to a small number of agents. It has not been proven at the scale where dozens of agents are asking for approval every hour and the person on the other end is triaging, not evaluating.

## What should replace "ask a human" as the default control? {#scoped-identity}

> Give every agent its own identity and permission set, separate from the human who launched it, and enforce limits at the transaction level, not only the login level.

This is not a theoretical fix. OpenLeash's own configuration already points at it: the tool lets a user cap payments below a set threshold to proceed automatically while anything above it needs sign-off, and it lets acceptable API endpoints and destinations be defined explicitly. This is transaction-level authorization. The gap: it is currently framed as a tuning option inside a human-approval tool, instead of the default architecture every agent gets before it runs.

The security industry has already built this muscle, for a different kind of non-human actor. [Zero Trust architecture](/2024/05/14/understanding-zero-trust-architecture/) is built on the idea nothing, inside or outside the perimeter, gets implicit trust. Apply the same logic to agents: a workload identity distinct from the human's, a permission set scoped to the task, and explicit thresholds for anything irreversible, like deleting data, moving money, or exposing credentials. Human approval still has a place, but as the exception path for the genuinely ambiguous case, not the primary safeguard for everything the agent might attempt.

Shadow AI makes this harder to skip. CISA's own [ChatGPT incident showed how little visibility](/2026/02/16/cisa-chatgpt-incident-shadow-ai-problem/) most organizations have into how employees are already using AI tools day to day. Add autonomous agents with standing access into the same blind spot, and the visibility gap turns into an authorization gap.

## How does this map to frameworks security teams already use? {#framework-mapping}

> It lines up directly with existing access-control and AI-governance controls: SOC 2, NIST CSF 2.0, ISO/IEC 27001:2022, and NIST AI RMF.

None of this requires inventing new compliance language. Agent authorization is a variation on controls most security and compliance teams already track for human and service accounts.

| Framework | Control | What it asks for with AI agents |
|---|---|---|
| [AICPA SOC 2 Trust Services Criteria](https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022) | CC6.1, CC6.3 | Logical access is provisioned and authorized by role, not inherited wholesale from its creating account |
| [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework) | PR.AA | Identities, including non-human ones like agents, are managed, authenticated, and authorized distinctly |
| [ISO/IEC 27001:2022](https://www.iso.org/standard/27001.html) | A.5.15, A.5.16, A.5.18 | Access rights are assigned, reviewed, and revoked per identity, with every identity uniquely accountable |
| [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) | GOVERN 1.7, MANAGE 2.4 | Organizations track an AI system's authority to act and intervene when risk thresholds are crossed |

An auditor asking "who approved this access, and why does this account have it" is asking the same question whether the account belongs to a contractor or an agent. Treat it consistently from the start and the paperwork already exists.

## What should security teams do this week? {#practitioner-checklist}

> Inventory every agent able to change data, move money, expose credentials, or call a third-party system, then give the risky ones a scoped identity and explicit approval thresholds instead of the same access as their human owner.

A short, concrete starting list:

1. **Inventory agent capability, not agent count alone.** Find every agent capable of writing to a database, moving funds, touching credentials, or calling an external API. This is your risk-relevant list, even if it is a fraction of the agents deployed.
2. **Issue a distinct identity per agent.** Stop reusing the launching user's login or a shared service account. Scope credentials to what the task needs.
3. **Set thresholds, not blanket allow or deny.** Define the dollar amount, endpoint list, or data class where automatic approval stops and human review starts, the way OpenLeash already lets you configure.
4. **Log every escalation as audit evidence.** A yes or no click with no context will not hold up in an incident review. Capture what was asked, what the agent intended, and why the decision was made.
5. **Revisit agent permissions on a cadence.** Treat it like any other service account: review, right-size, and revoke access no longer needed.

## Is OpenLeash, or any single tool, the fix? {#not-a-silver-bullet}

> No. A runtime checkpoint catching a bad action is valuable, but it works best behind agents already scoped to narrow, well-defined permissions, not in front of agents still holding everything.

OpenLeash is still under active development, and Brin is upfront: more configuration and control options are still coming. This works for a tool built for what its creator calls the new class of "vibe coders," people with an idea and no security background, using tools like Claude Code or Cursor to build their own agents. For this audience, a guardrail stopping an agent from deleting a database or leaking credentials is a genuine improvement over nothing.

For an organization with a security team, the lesson is different. Build the identity and permission boundary first. Let human review be the exception, not the plan. The biggest risk in agentic AI right now is not the absence of watching. It is agents being handed authority no one ever meant to delegate, and a prompt asking permission after the fact does not undo it.

What does your team's inventory of agent capability look like right now? Most security teams have an answer for every human account. Few have one for every agent.

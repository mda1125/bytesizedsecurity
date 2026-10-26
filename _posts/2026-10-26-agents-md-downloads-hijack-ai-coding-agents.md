---
description: "A planted AGENTS.md in Downloads told an AI coding agent to install malware. What Forever Security found, what is unverified, and how to stay safe."
layout: post
title: "AGENTS.md in Downloads: Keep AI Coding Agents Safe (2026)"
slug: agents-md-downloads-hijack-ai-coding-agents
category: "Threats"
tags: ["AGENTS.md", "AI Agent Security", "Prompt Injection"]
author: Marc
excerpt: "Forever Security reports it caught a planted AGENTS.md file in a customer's Downloads folder telling an AI coding agent to install a malicious npm package. In its own tests, similar files hijacked OpenAI Codex and Claude Code. Here is what the research shows, where the sources disagree, and the habits that shut this path."
image: "/assets/img/posts/agents-md-downloads-hijack-ai-coding-agents.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-10-26
faq:
  - question: "What is AGENTS.md?"
    answer: "AGENTS.md is a plain-text file of instructions that AI coding agents read when they start in a folder. It usually holds project notes, such as how to run tests and which coding conventions to follow. Per <a href=\"https://developers.openai.com/codex/guides/agents-md\">OpenAI's Codex documentation</a>, Codex reads it before doing any work. The file is not a program, but the agent treats its contents as directions."
  - question: "How does an AGENTS.md file get into my Downloads folder?"
    answer: "Forever Security says a web page is able to drop one with no click. <a href=\"https://www.bleepingcomputer.com/news/security/ai-coding-agents-hijacked-using-agentsmd-file-in-downloads-folder/\">BleepingComputer</a> tested the researchers' demo page and received a harmless AGENTS.md. Chrome, Edge, and Firefox save downloads without asking by default, while Brave asked for approval. The attack then needs you to start your agent in that folder."
  - question: "Did OpenAI or Anthropic patch this?"
    answer: "No patch or vendor statement appears in the sources I checked. Forever Security says there is nothing for OpenAI or Anthropic to patch, because an agent that follows the instruction file in its folder is behaving as designed. Neither BleepingComputer nor The Hacker News reports a vendor response. Your protection today is where you start the agent."
  - question: "Which folders are safe to run an AI coding agent in?"
    answer: "Use a project folder you created or fully reviewed, such as a repository you cloned from a source you trust. Avoid Downloads, your home directory, and any folder where files arrive from the web or from other people. Read any AGENTS.md or CLAUDE.md before an agent loads it, and keep approval prompts and sandboxes turned on."
  - question: "What should I do if I find a strange AGENTS.md file?"
    answer: "Do not start an agent near it. Read the file, then check your agent's configuration for entries you did not add, such as an unexpected server block in the Codex config or a base URL in Claude Code settings. Forever Security advises assuming the login token leaked and rotating it."
---

A text file in your Downloads folder was never supposed to give orders to your software.

**TL;DR:** On October 22, 2026, [Forever Security](https://forever.security/blog/hijacking-ai-agents-via-downloads-folder) reported that it found a planted AGENTS.md file in a customer's Downloads folder. The file told an AI coding agent to install `function-color`, a known malicious npm package. Forever says it stopped the agent before any code ran, and it was unable to determine how the file got there. In its own tests, similar files hijacked OpenAI Codex and Claude Code. The lesson is simple: never start an AI agent in Downloads or any folder you do not control, and treat instruction files like code you are about to run.

---

**Jump to a section:**

- [What did Forever Security find?](#what-happened)
- [How does a file in Downloads reach an AI agent?](#how-it-works)
- [What did the Codex attack do?](#codex)
- [What did the Claude Code test show?](#claude-code)
- [Did OpenAI or Anthropic patch this?](#vendor-response)
- [How much should you trust the numbers?](#caveats)
- [Where should you start your AI coding agent?](#where-to-start)
- [How do you check whether this already happened to you?](#check-yourself)
- [What does this say about AI agent permissions?](#permissions)

An AI coding agent is software that reads your code, runs commands, and edits files on your behalf. To do its job, it reads instruction files in the folder where you start it. This story is about what happens when someone else gets to write those instructions. Below, I walk through what the researchers found, where the reporting differs, and the steps worth taking today.

## What did Forever Security find? {#what-happened}

> Forever Security says it caught an AGENTS.md file in a customer's Downloads folder that told a coding agent to install a malicious npm package. It stopped the install, and nobody knows how the file arrived.

AGENTS.md is a plain-text file of project instructions for AI agents, such as which tools to use and how to run tests. [Forever Security](https://forever.security/blog/hijacking-ai-agents-via-downloads-folder), a company that monitors risks from AI agents, says its researchers Gal Weizman and Omer Samet traced an alert to one of these files in the `~/Downloads` folder of a real customer's machine. The file looked like ordinary engineering notes. Buried near the end was a section telling the agent to install `function-color`.

npm is the package registry for JavaScript. A package is a bundle of code you install from it. Per [The Hacker News](https://thehackernews.com/2026/10/malicious-file-in-downloads-folder.html), `function-color` belongs to a malware campaign documented by CloudSEK and Checkmarx, which named it MALFEX. [Checkmarx](https://checkmarx.com/zero-post/malfex-npm-malware-campaign-three-payloads-and-an-adversary-that-signs-their-work/) describes `function-color` as a wrapper around a downloader called `function-flag`. The campaign delivers malware to Windows systems. The malicious versions are gone: on October 26, the [npm registry](https://registry.npmjs.org/function-color) listed only a security placeholder.

Here is the part to hold onto. Forever says it blocked the install before any code ran. It also told [BleepingComputer](https://www.bleepingcomputer.com/news/security/ai-coding-agents-hijacked-using-agentsmd-file-in-downloads-folder/) it was unable to determine how the file landed in Downloads. Forever reproduced the drive-by download route below in a demo, so whether a real attacker used it against this customer is not known.

## How does a file in Downloads reach an AI agent? {#how-it-works}

> A web page is able to save a file into Downloads without a click, and an agent started in that folder reads any AGENTS.md it finds. Forever Security says the two harmless behaviors become dangerous together.

Forever's argument rests on two ordinary behaviors. First, an agent is built to follow the instruction file in the folder it opens. [OpenAI's Codex documentation](https://developers.openai.com/codex/guides/agents-md) says Codex reads these files before doing any work, and if it cannot find a project root, it checks the current directory. Second, a web page has a way to save a file to your machine on its own, choosing the name and the contents. In Forever's words, Downloads is "the one folder the web can write to on its own."

BleepingComputer tested Forever's proof-of-concept page and got an AGENTS.md containing harmless text. It also found browsers differ: Chrome, Edge, and Firefox save to Downloads without prompting by default, though they show a download notification, while Brave asked the user to approve. The attack still needs a final step, which is you launching an agent in that folder. Weizman told BleepingComputer people do this to organize the folder or act on a new download.

How common is that? Forever says about half of its customers run a coding agent inside Downloads, and about a quarter of agent sessions open a real browser. Those are Forever's own numbers, and I was unable to check them independently.

## What did the Codex attack do? {#codex}

> The planted file told Codex to add a tool server to its config file and install the malicious package. Forever says it worked in more than 90% of tests, and the config change would persist across folders.

Forever says it ran the real attacker file, unchanged, inside an isolated virtual machine. The file was a long document titled like routine engineering guidelines, and one section near the end carried the attack. It told Codex to add an entry to `~/.codex/config.toml`, the file where Codex stores its settings. That entry registered a "project tools" server, a small program Codex starts on launch. Behind that entry sat a command that ran `npm install function-color` through `launchctl`, a macOS job launcher, which Forever says kept the install outside Codex's control.

The file also told Codex to start a second Codex session with the flag `--dangerously-bypass-approvals-and-sandbox`, which switches off the prompts and the isolation that normally limit what the agent runs. A sandbox is a restricted environment that keeps a program's actions contained. Forever's summary of why this works: the calm, reasonable tone of the document. As its report puts it, "That framing is the attack."

Forever reports the malware ran in more than 90% of attempts. Most of its testing used a harmless stand-in that opens a calculator, and it ran the real package once, inside the isolated virtual machine. Because the config file is machine-wide, Forever and The Hacker News both note the change would load in later Codex sessions in any folder, not only Downloads.

## What did the Claude Code test show? {#claude-code}

> Forever wrote its own CLAUDE.md that tried to redirect Claude Code's traffic to a server it controlled. That leaked a login token in about half of tests. Forever says Claude was harder to fool than Codex.

This test is different, and it is worth keeping separate from the real incident. The file Forever found in the wild targeted Codex. For Claude Code, Anthropic's coding agent, Forever wrote its own `CLAUDE.md` (Claude's version of the instruction file), inspired by the attacker's file.

The test file asked Claude to save a project settings file that sets `ANTHROPIC_BASE_URL`, the address Claude sends its requests to, to a domain Forever controls. That sends Claude's OAuth token, the stored login credential that proves your account to the service, to the researchers' server. Forever says it replayed a captured token against the real API and was served as the victim, which is account takeover with no code run. Its server also gets to answer as if it were the model and send back commands for Claude to run.

The success rates matter. Forever says Claude followed the file about 50% of the time, because Claude often asks a human to approve a settings write and often refuses one that looks wrong. Running code in the same session worked about a fifth of the time. Forever says the settings write alone sets up code execution the next time Claude starts in that folder.

## Did OpenAI or Anthropic patch this? {#vendor-response}

> No patch or vendor statement appears in the sources I read. Forever Security says agents follow instruction files as designed, so it sees nothing to patch.

Forever's position is blunt: "There is nothing here for OpenAI or Anthropic to patch." It compares the situation to phishing. A browser that renders a fake login page is working as designed, and the attack lives in the page.

I looked for a vendor response in the Forever report, [BleepingComputer](https://www.bleepingcomputer.com/news/security/ai-coding-agents-hijacked-using-agentsmd-file-in-downloads-folder/), and [The Hacker News](https://thehackernews.com/2026/10/malicious-file-in-downloads-folder.html), and in a general search on October 26. None quotes OpenAI or Anthropic, and none reports a fix. BleepingComputer says both companies recommend starting agents in the project directory they are meant to work on. I did not find that exact wording on the two vendor pages I read. What those pages do show: Codex loads instruction files as described above, and [Claude Code's security documentation](https://code.claude.com/docs/en/security) describes a workspace trust dialog for folders you have not trusted and recommends reviewing commands before approving them.

My read: even if vendors add guardrails later, the fix you control today is where you start the agent and which files you let it read.

## How much should you trust the numbers? {#caveats}

> Treat the percentages as results from controlled tests by a vendor with a stake in the topic. The real incident is one file with an unknown delivery route.

This is original research from a company that sells AI agent monitoring, and its advice needs no product, which is to its credit. Still, attribute the claims to Forever and note where the coverage does not line up:

- **Claude results:** BleepingComputer says the Claude test executed code in "roughly 50%" of tests. Forever splits it: about 50% for the settings write and token leak, and about 20% for same-session code execution.
- **How common the risk is:** Forever says about half of its customers run an agent in Downloads, and about a quarter of agent sessions open a browser. BleepingComputer quotes Weizman as saying hundreds of customers do, with more than 1,300 Claude Code sessions from that folder. These are different measures, and neither is independently verified.
- **Delivery route:** Forever's demo shows a page is able to drop the file. How the real file arrived is unknown, per both outlets.
- **Platform mismatch:** Checkmarx says the `function-flag` payloads run on Windows, while the commands in Forever's published file use `launchctl` and `zsh`, which are macOS tools. I did not find an explanation in the sources I read. The lesson holds either way, because the file picks the package, and a different package would change the damage.

## Where should you start your AI coding agent? {#where-to-start}

> Start agents only in a project folder you created or reviewed, never in Downloads. Read any instruction file first, and keep approval prompts and sandboxes on.

These steps come from Forever's report, as repeated by The Hacker News and BleepingComputer:

1. **Do not start Codex, Claude Code, or any agent in `~/Downloads`.** It is the one folder a web page writes to without asking you.
2. **Read instruction files you did not write.** A stray `AGENTS.md` or `CLAUDE.md`, in Downloads or in a repository you freshly cloned, is the whole attack. Read it before an agent loads it.
3. **Keep approvals and sandboxes on.** Be suspicious of any instruction telling the agent to bypass them.
4. **Say no at trust prompts for folders you do not control.** Claude Code's documentation describes a trust dialog for untrusted folders. Forever says Codex obeys an AGENTS.md only in a trusted project, and that one earlier session in Downloads is enough to qualify.

These are standard practice, not claims from the research:

1. **Use a dedicated working folder.** Give each project its own directory, and move a downloaded file there only after you inspect it, so an agent never works from a mixed pile of files.
2. **Ask your browser to prompt for each download.** Chrome, Edge, and Firefox have a setting for choosing where each file saves. Brave's default prompt is the behavior BleepingComputer observed.
3. **Isolate when in doubt.** [Anthropic's documentation](https://code.claude.com/docs/en/security) recommends using virtual machines to run scripts and make tool calls, especially when interacting with external web services, and development containers are another option. Test unfamiliar code there, not on your main machine.
4. **For teams, manage agent settings centrally.** Claude Code's documentation says managed settings enforce organizational standards, and hooks audit changes to settings.

## How do you check whether this already happened to you? {#check-yourself}

> Look for AGENTS.md or CLAUDE.md files you did not create, unexpected agent config entries, and the function-color package. If you find any, assume your agent's login token leaked and rotate it.

Forever's report lists most of these checks:

1. **Search Downloads and recent clones for instruction files.** Look for any `AGENTS.md` or `CLAUDE.md` you did not write.
2. **Review the Codex config.** In `~/.codex/config.toml`, look for an `[mcp_servers.*]` block you did not add, or a changed `chatgpt_base_url`. MCP means Model Context Protocol, a way to plug tools into an agent.
3. **Review Claude Code settings.** In each project's `.claude/settings.json`, look for `ANTHROPIC_BASE_URL`, a proxy, or any API address you did not set.
4. **Look for the known package.** Search lockfiles and install logs for `function-color`, and for `function-flag`, the package Checkmarx says it pulls in. The file Forever published also created a `/tmp/ptools` folder and a `launchctl` job labeled `com.ptools.setup`, so those names are worth searching for on a Mac.
5. **If you find any of it, rotate.** Forever advises assuming the login token leaked. For a machine that installed the package, [OSV's advisory for `function-color`](https://osv.dev/vulnerability/MAL-2026-17647) says to treat it as fully compromised and rotate secrets from a different computer.

## What does this say about AI agent permissions? {#permissions}

> An agent inherits your access and obeys whatever instructions it reads. Narrow its folder, its credentials, and its approvals, so a planted file has little to work with.

This is a permissions story with a twist. In [why your AI agent should not have your permissions](/2026/09/03/your-ai-agent-shouldnt-have-your-permissions/), I wrote that most agents run with the full access of whoever launched them. Here that access meets untrusted instructions. The agent is able to write to your config, install software, and hold your login token, so anything that steers it gets those abilities too.

The same pattern showed up in [the AI agent governance lessons from OpenAI's Australia incident](/2026/09/24/ai-agent-governance-openai-australia-breach/), where an agent kept going after being told no. In both cases, the controls that help are old ones: least privilege, a narrow scope, logging, and approvals that mean something. Scope the folder the agent starts in, scope the credentials it holds, and keep the prompts that make it stop and ask.

## The bottom line {#bottom-line}

A planted instruction file turned an agent's built-in trust into the weak point. Forever Security says it caught one in the wild and stopped it, reproduced the idea on Codex and Claude Code, and reports no vendor fix. Some details remain open, including how the file arrived and why a Windows-targeted package was paired with macOS commands. The habits are not open: start agents in folders you control, read instruction files like code you are about to run, and keep the brakes on.

Where do you start your AI coding agent today? If the answer is Downloads or your home folder, change that before your next session.

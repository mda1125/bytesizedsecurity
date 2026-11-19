---
description: "An AI debt collection platform exposed 6.6 million accounts and 315,000 call recordings through two old bugs. Here is what to check first."
layout: post
title: "AI Debt Collection Flaws: New Agents, Old Bugs"
slug: ai-debt-collection-flaws-credit-nirvana
category: "DevSecOps"
tags: ["AI Debt Collection", "Hardcoded Secrets", "Broken Authentication"]
author: Marc
excerpt: "Researcher Eaton Zveare found two flaws in Credit Nirvana, an AI debt collection platform in India. A secret key sat in the web page code of its AI call center, and its main platform never checked login tokens. Together they exposed 315,000 call recordings and 6.6 million borrower accounts. Both were fixed in June. Here is how the bugs worked, what borrowers should do, and what to check before you trust an autonomous platform."
image: "/assets/img/posts/ai-debt-collection-flaws-credit-nirvana.webp"
image_width: 1200
image_height: 630
last_modified_at: 2026-11-19
faq:
  - question: "What happened with the Credit Nirvana AI debt collection platform?"
    answer: "Researcher Eaton Zveare found two flaws in Credit Nirvana, an AI debt collection platform in India owned by Perfios. Per <a href=\"https://eaton-works.com/2026/11/18/credit-nirvana-hack/\">his write-up</a>, a hardcoded API key exposed 315,000 call recordings from its AI call center, and an authentication flaw exposed 6.6 million accounts across three lenders. He reported both through CERT-In, and both were fixed on June 2, 2026."
  - question: "What is a hardcoded API key?"
    answer: "An API key is a secret string a program sends to prove it has permission to use a service. Hardcoded means the key is written directly into the code. When the code ships to a web browser, anyone who opens the page receives the key. In Credit Nirvana's case, <a href=\"https://www.cve.org/CVERecord?id=CVE-2026-110474\">CVE-2026-110474</a> describes a static key in client-side JavaScript."
  - question: "Was borrower data stolen in the Credit Nirvana exposure?"
    answer: "Neither the researcher's write-up nor <a href=\"https://www.wired.com/story/ai-debt-collection-service-exposed-66-million-accounts-and-315000-call-recordings/\">WIRED's report</a> says anyone else used the flaws. Neither says whether logs were reviewed for earlier access either. Zveare told WIRED the bugs were potentially present for years. Treat the data as exposed, not confirmed stolen, and stay alert for scam calls about your loan."
  - question: "What should borrowers do after an AI debt collection data exposure?"
    answer: "Stay calm and stay skeptical. Verify any collection call or message by contacting your lender through the number in its official app or statement. Do not pay through links sent by text. Review your credit report for accounts or credit checks you do not recognize, and ask your lender whether your account sat on the affected platform."
  - question: "How do you check an AI platform's basic security before trusting it?"
    answer: "Ask the vendor three plain questions. Does any secret ship in your web or mobile code? Does every API check the login token on the server, on every request? Which data and actions does each AI agent reach? Ask for recent penetration test results and a security contact. A vendor unable to answer is a warning sign."
---

The AI was new. The bugs were not.

**TL;DR:** Researcher Eaton Zveare found two flaws in Credit Nirvana, an AI debt collection platform in India, per [his write-up](https://eaton-works.com/2026/11/18/credit-nirvana-hack/). A secret key sat in the web page code of its AI call center and opened 315,000 call recordings. Its main platform trusted a username sent by the browser and never checked the login token, which exposed 6.6 million accounts, some holding ID cards and full credit reports. Both flaws were fixed on June 2, 2026, the day the company learned of them. Neither source reports anyone else using them. The lesson: AI agents end up holding a company's most sensitive data, so check the basic security of any "autonomous" platform before you trust it.

---

**Jump to a section:**

- [What happened at the Credit Nirvana AI debt collection platform?](#what-happened)
- [How did a hardcoded API key expose 315,000 call recordings?](#hardcoded-api-key)
- [How did the login flaw expose 6.6 million accounts?](#broken-authentication)
- [Why do AI agents hold so much sensitive data?](#agent-access)
- [Was borrower data stolen?](#was-data-stolen)
- [What does the AI debt collection exposure mean for borrowers?](#borrowers)
- [What should you check before trusting an autonomous platform?](#vendor-checklist)
- [The takeaway](#takeaway)

Agentic AI has moved into debt collection, per Zveare. Lenders now hand phone calls, payment reminders, and the choice of next steps to AI agents built for collections. Those agents need data: account histories, call recordings, credit reports. This post covers what Zveare found, how two old bugs exposed it, what borrowers should do, and what to check before you trust a platform like this.

## What happened at the Credit Nirvana AI debt collection platform? {#what-happened}

> Two flaws in an AI debt collection platform exposed 315,000 call recordings and 6.6 million accounts. A researcher reported them through India's CERT-In, and both were fixed the same day CERT-In confirmed them.

Credit Nirvana, a [Perfios company](https://eaton-works.com/2026/11/18/credit-nirvana-hack/), runs digital debt collection for lenders in India. It sells two products relevant here. One is an Agentic AI Call Center, where AI agents call borrowers about overdue loans. The other is its main collections platform, called CollectionWorkz in one lender's deployment.

Independent researcher Eaton Zveare found a separate flaw in each. India's Computer Emergency Response Team (CERT-In) published [vulnerability note CIVN-2026-0523](https://www.cert-in.org.in/s2cMainServlet?pageid=PUBVLNOTES01&VLCODE=CIVN-2026-0523) and assigned two CVE IDs:

| CVE | Product | Flaw | CVSS v4.0 | Fixed in |
|---|---|---|---|---|
| [CVE-2026-110474](https://www.cve.org/CVERecord?id=CVE-2026-110474) | Agentic AI Call Centre | Hardcoded API key in client-side JavaScript | 8.7 High | 2.0.0 |
| [CVE-2026-110475](https://www.cve.org/CVERecord?id=CVE-2026-110475) | Collections Platform (CollectionWorkz) | Improper authentication at the login service | 9.3 Critical | 4.8.2 |

The timeline, per [Zveare's write-up](https://eaton-works.com/2026/11/18/credit-nirvana-hack/):

- **May 30, 2026:** Zveare reports the flaws through CERT-In.
- **June 1:** CERT-In asks for a proof-of-concept video, a recording showing the flaws in action, and he sends one.
- **June 2:** CERT-In confirms it will act. Both flaws are fixed later the same day.
- **October 26:** CERT-In issues the vulnerability note and both CVEs, almost five months after the fix.
- **November 18:** Zveare publishes his findings, and [WIRED covers them](https://www.wired.com/story/ai-debt-collection-service-exposed-66-million-accounts-and-315000-call-recordings/).

Zveare praised the response. "Credit Nirvana / Perfios fixed the vulnerabilities the same day they became aware of them," he wrote. Per WIRED, CreditNirvana and Perfios did not return requests for comment.

## How did a hardcoded API key expose 315,000 call recordings? {#hardcoded-api-key}

> The AI call center's web page carried a static API key in its JavaScript. Anyone who downloaded the page code got the key and a direct line to the API, so the login screen protected nothing.

An API key is a secret string a program sends to prove it has permission to use a service. Hardcoded means the key sits inside the code itself. Code running in a web browser is public, because every visitor's browser downloads a full copy of it to run the page. The key goes along for the ride.

CERT-In's description of [CVE-2026-110474](https://www.cve.org/CVERecord?id=CVE-2026-110474) is direct. An unauthenticated attacker downloads the client-side JavaScript files, extracts the key, and makes arbitrary API calls to retrieve call transcripts and recordings. The weakness class is [CWE-321, use of a hard-coded cryptographic key](https://cwe.mitre.org/data/definitions/321.html).

The call center used Amazon Cognito, an Amazon service for user sign-in. Per Zveare, the sign-in token "was not used at all." The hardcoded key did the real work, so after a few edits to the page code, he skipped the login step entirely. The dashboards behind it held:

- **315,000 recorded calls,** transcribed and analyzed, for Aditya Birla Capital Finance customers.
- **Post-call action recommendations,** the AI's suggested next step for each borrower.
- **Campaign tools** for AI calling.
- **An AI agent registry** for browsing and managing every agent on the platform, the closest thing to an org chart for the bots.

Per [WIRED](https://www.wired.com/story/ai-debt-collection-service-exposed-66-million-accounts-and-315000-call-recordings/), the flaw also opened the door for an attacker to manage AI agents and direct their own agentic campaigns. Reading data is one risk. Pointing a debt collection agent at borrowers is another.

## How did the login flaw expose 6.6 million accounts? {#broken-authentication}

> The main platform checked who you said you were, not who you proved you were. It trusted a username in the request and ignored the login token, so a crafted request opened any account, admins included.

Broken authentication means a system fails to confirm a user's identity properly. The [OWASP API Security Top 10](https://api-security.owasp.org/editions/2023/en/0xa2-broken-authentication/) ranks it second. Its list of warning signs includes an API failing to validate the authenticity of tokens.

Here is the chain Zveare describes in [his write-up](https://eaton-works.com/2026/11/18/credit-nirvana-hack/):

1. **A user list with no login.** One API endpoint returned more than 10,000 platform users to an unauthenticated request.
2. **Fake tokens.** The platform used Keycloak, an open source identity system, for sign-in. Placeholder tokens and a few edits to the page code kept the app from sending him back to the login page.
3. **A chosen username.** He swapped in a real username with a high-level role from the user list.
4. **No token check.** The platform's login API relied on the userName in the request body. It never checked the Keycloak token in the header. Zveare names this as the flaw: "they did not check it!"

Every API behind the login had the same gap. CERT-In's [vulnerability note](https://www.cert-in.org.in/s2cMainServlet?pageid=PUBVLNOTES01&VLCODE=CIVN-2026-0523) sums up the impact: "Successful exploitation of this vulnerability could allow the attacker to enumerate platform users, establish sessions as arbitrary users including administrative users, access and modify sensitive information with the privileges of the impersonated user." The weakness class is [CWE-1390, weak authentication](https://cwe.mitre.org/data/definitions/1390.html).

What sat behind admin access, per Zveare:

- **6.6 million accounts** across three lenders: more than 3.4 million at Aditya Birla Capital Finance, plus 3.2 million at BharatPe and International Asset Reconstruction Company (IARC).
- **Account records** with contact details, payment receipts, and an activity log of emails and texts sent.
- **More than 161,000 settlements,** with documents such as ID cards and full TransUnion CIBIL credit reports. One report ran 26 pages.
- **Legal notices and case management,** including a feature to request legal action on an account.
- **Location tracking** of human debt collection agents in the field.
- **Admin access to SlashRTC,** a third-party contact center platform.

Not every account held every document. ID cards and credit reports appeared in settlement cases, per the write-up.

## Why do AI agents hold so much sensitive data? {#agent-access}

> An agent built to act on a borrower's whole history needs the whole history. One platform ends up with every borrower's records, so a single flaw exposes all of them at once.

Per WIRED, the platform is built to "read a borrower's full context, decide the next best action, and execute it autonomously, continuously, and within policy." Full context means credit reports, call recordings, legal history, and payment records in one place.

A borrower logging in sees one account. The agent platform sees millions. This gap is the theme of [MCP Security Best Practices After the Mittwald Breach](/2026/11/09/mcp-security-best-practices-mittwald-breach/). There, an attacker started as an ordinary user and, through an AI connector, reached access no ordinary user has. Credit Nirvana shows the same pattern from the data side. The AI layer concentrated access, and two flaws opened it.

Zveare made the point to [WIRED](https://www.wired.com/story/ai-debt-collection-service-exposed-66-million-accounts-and-315000-call-recordings/): "They fixed it in one day, which was great, but this is really a pretty significant case." He called it "an important example of an AI-powered service having a very sensitive data exposure."

## Was borrower data stolen? {#was-data-stolen}

> No source says so. The researcher viewed the data to document the flaws, and neither his write-up nor WIRED reports anyone else using them.

Precision matters here. "Exposed" means reachable by anyone who found the flaws. It does not mean stolen. Neither [Zveare's write-up](https://eaton-works.com/2026/11/18/credit-nirvana-hack/) nor [WIRED's report](https://www.wired.com/story/ai-debt-collection-service-exposed-66-million-accounts-and-315000-call-recordings/) says anyone else used the flaws. Nor does either say whether Credit Nirvana checked its logs. Zveare told WIRED the bugs were potentially present in the company's systems for years.

Both flaws are patched. The open question is the window before June 2.

## What does the AI debt collection exposure mean for borrowers? {#borrowers}

> No source reports misuse, so stay calm and alert. Verify any collection call through your lender's official channels, never pay through a texted link, and check your credit report for anything unfamiliar.

The affected lenders, per Zveare, are Aditya Birla Capital Finance, BharatPe, and IARC. If you hold a loan with one of them, here are calm, practical steps:

1. **Verify every collection contact.** Detailed loan data is useful to scammers posing as collectors. If someone calls about a debt, hang up and call your lender using the number in its official app or on your statement.
2. **Pay only through official channels.** Do not pay through a link in a text, email, or WhatsApp message. Open your lender's app or website yourself.
3. **Check your credit report.** Look for loans or credit checks you do not recognize.
4. **Ask your lender.** You are entitled to ask whether your account sat on the affected platform and what the lender is doing about it.
5. **Remember an AI might call you.** Zveare points out the next collections agent to call you might be an AI agent. The same rules apply: verify, then pay.

If you borrow from a different lender, the lesson still holds. Your collection records might sit with a vendor you have never heard of.

## What should you check before trusting an autonomous platform? {#vendor-checklist}

> Start with the basics. Ask whether secrets ship in client code, whether every API verifies tokens on the server, and what each agent reaches. Old bugs, not exotic AI attacks, exposed this data.

Neither flaw involved prompt injection or a model going rogue. Both are long-known mistakes. If you buy, build, or approve an AI platform, check these first:

**For teams evaluating a vendor:**

1. **Secrets in front-end code.** Ask whether any API key or credential ships in web or mobile code. The answer should be no. Anything sent to a browser is public.
2. **Server-side token checks.** Ask whether every API verifies the session token on the server, on every request. Identity should come from a verified token, never from a username field the client sends.
3. **Agent reach.** Ask which data and actions each AI agent reaches. An agent placing reminder calls has no need for full credit reports or legal case tools.
4. **Tenant separation.** Ask how one client's data stays apart from another's. Here, the same flaw worked across three lenders' separate instances, so one bug became three exposures.
5. **Testing and disclosure.** Ask for recent penetration test results and a security contact. Here, the fix came fast.

**For teams building one:**

- **Keep keys on the server.** The browser calls your backend, and your backend calls the service. The [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) covers storage, rotation, and auditing.
- **Validate tokens, then derive identity from them.** Check each token's authenticity and expiry on the server for every request, per the [OWASP guidance on broken authentication](https://api-security.owasp.org/editions/2023/en/0xa2-broken-authentication/).
- **Scope your agents.** Give each agent its own identity with the least access its job needs. For the longer case, read [Your AI Agent Shouldn't Have Your Permissions](/2026/09/03/your-ai-agent-shouldnt-have-your-permissions/).
- **Scan for leaked keys.** Check build output, not only source code, for keys before every release. [LLMjacking: Why Cheap Unlimited AI Is a Red Flag](/2026/11/03/llmjacking-cheap-unlimited-ai-red-flag/) shows what happens to keys once thieves find them, and what the bill looks like.

## The takeaway {#takeaway}

AI debt collection platforms gather some of the most sensitive records a person has. Credit Nirvana's AI call center and collections platform held them in one place, and two familiar bugs opened them. The company fixed both in a day once told. Better still is catching bugs like these before launch. Both sat where a routine security review looks first: the page code and the login flow.

Before you trust an autonomous platform, ask the boring questions first. Where do the secrets live? Who checks the token on each request, and where? What does each agent reach?

What is the first question you ask an AI vendor about security, and has a vendor ever failed it?

## Sources {#sources}

- Eaton Zveare, [The AI Repo Man: Exploiting Agentic AI Debt Collection Platforms](https://eaton-works.com/2026/11/18/credit-nirvana-hack/), 18 November 2026.
- CERT-In, [Vulnerability Note CIVN-2026-0523: Multiple Vulnerabilities in CreditNirvana Products](https://www.cert-in.org.in/s2cMainServlet?pageid=PUBVLNOTES01&VLCODE=CIVN-2026-0523), 26 October 2026.
- CVE Program, [CVE-2026-110474](https://www.cve.org/CVERecord?id=CVE-2026-110474) and [CVE-2026-110475](https://www.cve.org/CVERecord?id=CVE-2026-110475).
- WIRED (Lily Hay Newman), [An AI Debt Collection Service Exposed 6.6 Million Accounts and 315,000 Call Recordings](https://www.wired.com/story/ai-debt-collection-service-exposed-66-million-accounts-and-315000-call-recordings/), 18 November 2026.
- OWASP API Security Top 10, [API2:2023 Broken Authentication](https://api-security.owasp.org/editions/2023/en/0xa2-broken-authentication/).
- OWASP Cheat Sheet Series, [Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html).
- MITRE CWE entries: [CWE-321](https://cwe.mitre.org/data/definitions/321.html) (use of hard-coded cryptographic key) and [CWE-1390](https://cwe.mitre.org/data/definitions/1390.html) (weak authentication).

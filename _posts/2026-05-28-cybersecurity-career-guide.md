---
description: "How to start a career in cybersecurity: a 4-step playbook for any background. Honest pay data, real cert advice, and a 90-day action plan."
layout: post
title: "How to Start a Career in Cybersecurity (2026 Guide)"
category: DevSecOps
tags: ["cybersecurity careers", "career guide", "job market", "hiring"]
author: Marc
excerpt: "Everyone says break into security. Almost nobody tells you the truth about how the path works now, or how to walk it anyway. This is the honest guide on how to start a career in cybersecurity — from someone who spent 19 years being told he lacked cyber experience."
image: "/assets/img/posts/cybersecurity-career-guide.png"
image_width: 1024
image_height: 576
permalink: /cybersecurity-career-guide/
faq:
  - question: "Is there really a cybersecurity talent shortage?"
    answer: "Not exactly. The industry has a trust problem, a pipeline problem, and a mentorship problem — not a talent shortage. Entry-level postings demand years of experience while companies stopped growing junior talent. Thousands of qualified graduates cannot land interviews while organizations insist nobody good is available."
  - question: "How much do cybersecurity professionals make in 2026?"
    answer: "US cybersecurity salaries in 2026 range from roughly $75K for entry-level SOC analysts to $250K+ base for CISOs, with top CISO total-comp packages reaching $7–8M at major tech employers. Cloud security and application security engineers at the mid-senior level earn the steepest comp growth ($145K–$210K), per Robert Half's 2026 Tech Salary Guide and Levels.fyi data."
  - question: "Do I need a degree to work in cybersecurity?"
    answer: "No. Companies hire people who solve problems, not degrees. A self-taught applicant who patched a vulnerability and documented how they did it will beat a graduating senior who cannot explain what DNS does. A degree may help pass keyword filters, but demonstrable skills and a portfolio of real work land offers."
  - question: "What certifications should I get for cybersecurity?"
    answer: "Use a data-driven method: pull 50 real job descriptions for your target role and note which certifications appear repeatedly, then check LinkedIn profiles of people in that role to see what they actually hold. Buy only the certifications the data points to. Treat certs as a foot in the door, not proof you can do the job."
  - question: "How do I start a career in cybersecurity with no experience?"
    answer: "Start in any IT role that puts you near real systems (help desk, sysadmin, developer, cloud support). Become the security person in your current job by patching, hardening, and reading logs. Build a home lab with Active Directory and a SIEM, document it on GitHub, pick one specialty (cloud, appsec, or IR), and network with one person already doing your target role."
  - question: "What is the best cybersecurity career path?"
    answer: "There is no single best path, but the most effective sequence is: (1) get into IT anywhere, (2) own security tasks in your current role, (3) build visible proof through a home lab and public write-ups, and (4) specialize in one area with unmet demand — cloud security, application security, or incident response — rather than staying a generalist."
last_modified_at: 2026-06-26
---

Everyone wants to know how to start a career in cybersecurity right now, and the field keeps telling them to come in while quietly bolting the door behind it.

**TL;DR:** The cybersecurity career path most people are sold is broken. This guide on how to start a career in cybersecurity covers why the "talent shortage" is really a hiring and mentorship failure, why portfolios beat degrees, a 4-step playbook for breaking in from any background, how to choose certifications with data, how to get past automated hiring filters, and a concrete 90-day checklist you can start today.

**Jump to a section:**

- [Is there really a talent shortage?](#talent-shortage)
- [How much do cybersecurity professionals make in 2026?](#salaries)
- [Do you need a degree?](#degree-required)
- [How to start a career in cybersecurity when the ladder is missing rungs](#how-to-break-in)
- [How the path changes based on your starting point](#match-your-path)
- [Which certifications are actually worth getting?](#certifications)
- [How do you get past automated hiring filters?](#ats-filters)
- [The honest reality of the work](#reality-of-work)
- [When are you actually ready to apply?](#when-ready)
- [Your first 90 days: a plan you can start today](#ninety-day-plan)

Enrollments in security programs doubled over the last two years. Schools keep printing degrees. And most graduates walking across the stage will send out a hundred applications before a single human replies. If you read one honest line today, read this one: the field is worth pursuing, the path most people sell you is broken, and you need a sharper strategy than the one your college handed you.

I am not here to sell you hope. I spent 19 years in IT at an architect level and still heard "you lack cyber experience" in interview after interview. I built enterprise infrastructure. I designed networks. I managed complex systems, all the foundation work the internet tells you to get before you apply to security roles. Every interview ended the same way. One hiring manager finally took a chance on me, and that single decision is the only reason I work in security today.

So when someone tells you to "cut your teeth in IT first," I believe them. I also know they leave out the hard part. Where do you cut your teeth? For how long? What counts as enough? Nobody answers those questions, so this guide will. Read it like a map, not a pep talk.

## Is there really a cybersecurity talent shortage? {#talent-shortage}

> **Direct answer:** No. The industry has a trust problem, a pipeline problem, and a mentorship problem, not a talent shortage. Entry-level postings demand years of experience while companies stopped growing junior talent, so thousands of qualified graduates cannot land interviews.

You have heard a hundred times the industry faces a cybersecurity talent shortage. It does not. It faces a trust problem, a pipeline problem, and a mentorship problem. Once you see the difference, your whole strategy changes.

Every week I see entry-level postings demanding five years of experience or a [CISSP](https://www.isc2.org/certifications/cissp), a certification you are not allowed to earn without five years in the field. Read those two requirements together and the absurdity becomes obvious. The industry tells new people they need experience to get experience. Thousands of qualified graduates cannot land a single interview while companies insist nobody good is available.

The entry point turned into a pay-to-play game. People spend thousands of dollars on certifications and still get ghosted by HR. Meanwhile the organizations doing the rejecting stopped growing talent. Instead of building analysts from the ground up, they expect candidates to arrive fully formed, or they outsource the junior pipeline entirely. A shortage looks like empty desks and no applicants. This looks like a flood of applicants and a leadership failure to develop them.

> Cybersecurity does not have a talent shortage. It has a trust problem, a pipeline problem, and a mentorship problem. You fix all three by starting where you already stand.

Here is the part nobody wants to say out loud. The traditional first rung of the ladder is disappearing. Junior IT roles, the help desk seats and support desks where a generation learned the trade, keep vanishing. Companies outsource support. Cloud platforms swallow the sysadmin work. Entry-level job postings [dropped more than 50 percent since 2019](https://www.cyberseek.org/heatmap.html). Even roles labeled "junior" now ask for two to four years of experience.

And a second wall went up on top of the first. The UK reported a [46 percent drop in tech graduate hiring](https://www.instituteofcoding.org/) as companies hand junior developer, analyst, and support work to automation. Those are the exact jobs that used to train the next wave of defenders. Saving money on entry-level labor today feels efficient. Ask one question and the logic falls apart: if nobody gets entry-level experience, who becomes your senior engineer five years from now? Tools do not replace defenders. They amplify the ones who already understand the systems they protect.

We covered this dynamic in detail: [America is already short 40% of its cyber defenders](/2026/01/03/americas-cybersecurity-crisis-40-percent-defender-shortage/), and the brain drain is accelerating.

None of this is meant to discourage you. The opposite. If you have been grinding, learning, and wondering why the door feels locked, you are not imagining it and you are not the problem. You are trying to walk a path that barely exists anymore. The good news is you do not need that old path. You need a new one, and the rest of this guide lays it out.

## How much do cybersecurity professionals make in 2026? {#salaries}

> **Direct answer:** US cybersecurity salaries in 2026 run from roughly $75K for entry SOC analysts to $250K+ base for CISOs, with top CISO packages at $7–8M total comp. Your specialty and cert choice shape pay more than years of experience.

Pay varies wildly by role, level, region, and industry, so any single "average" number lies to you. The table below shows realistic US ranges for the most common security roles in 2026, the cert most associated with each, and what the work actually looks like day to day. Total compensation at major tech companies sits at the top of each range; non-tech and regulated industries (healthcare, government, mid-market) sit lower.

| Role | Typical Level | Median US Salary 2026 | Primary Cert | Day-to-Day Work |
|---|---|---|---|---|
| SOC Analyst (Tier 1) | Entry | $75K – $95K ([CyberSeek](https://www.cyberseek.org/pathway.html), [BLS OEWS 15-1212](https://www.bls.gov/oes/current/oes151212.htm)) | CompTIA Security+ | Triage SIEM alerts, investigate first-line incidents, escalate to senior analysts |
| Security Engineer | Mid | $115K – $155K ([Robert Half 2026 Tech Salary Guide](https://www.roberthalf.com/us/en/insights/salary-guide/technology)) | CySA+ / SSCP | Build detection logic, harden infrastructure, run vulnerability management programs |
| Penetration Tester | Mid – Senior | $120K – $170K ([Robert Half 2026](https://www.roberthalf.com/us/en/insights/salary-guide/technology)) | OSCP | Run engagements, write exploit chains, deliver findings and remediation to clients |
| Cloud Security Engineer | Mid – Senior | $145K – $200K ([Levels.fyi composite, 2026](https://www.levels.fyi/t/security-engineer)) | AWS / Azure Security Specialty | Architect IAM, secure cloud workloads, automate guardrails and policy-as-code |
| Application Security Engineer | Mid – Senior | $150K – $210K ([Levels.fyi composite, 2026](https://www.levels.fyi/t/security-engineer)) | (no single required cert — portfolio matters more) | SDLC reviews, threat modeling, secure-code training, SAST/DAST tooling ownership |
| CISO / Director of Security | Executive | $250K – $500K+ base; top packages $7M – $8M ([NYT, 5/24/2026](https://www.nytimes.com/2026/05/24/technology/ai-cybersecurity-jobs.html)) | CISSP / CISM | Set security strategy, manage budget, brief the board, lead breach response |

A few honest caveats on those numbers. CyberSeek and BLS lump many roles together under one occupation code, so the entry-level range understates what you can earn at a major tech company and overstates what you might be offered at a regional bank. Robert Half's guide is widely cited but skews toward roles their recruiters actually place — meaning Fortune 1000 and mid-market employers. Levels.fyi covers total comp (base + equity + bonus) at primarily tech-sector employers, which is why those numbers run higher. Use the table as a reality check on offers and counters, not as a single source of truth.

What this table tells you about strategy: the steepest comp curve sits in cloud security and application security at the mid-senior level, which is exactly the [niching advice in the breaking-in playbook](#how-to-break-in). The generalist SOC analyst path tops out earlier than the specialist paths do, and the gap widens every year.

## Do you need a degree to work in cybersecurity? {#degree-required}

> **Direct answer:** No. Companies hire people who solve problems, not degrees. A self-taught applicant who patched a vulnerability and documented it will beat a graduating senior who cannot explain DNS. A degree may help pass ATS filters; demonstrable skills land offers.

Start with the truth at the center of every hiring decision. Companies do not hire degrees. They hire people who solve problems. The diploma gets you past a keyword filter at best. The skill gets you the offer.

One junior I know about landed a 130,000 dollar role and skipped the help desk entirely. He did not get hired for his GPA. He got hired because he understood input validation. While his classmates memorized framework names for an exam, he learned to secure real code. That single, demonstrable, useful skill outweighed a transcript full of A grades. The lesson scales to every specialty. Pick a real problem the field has, learn to solve it for real, and show your work.

This reframes everything about how you spend your time. Stop collecting credentials as if quantity convinces anyone. Start collecting evidence you do the work. New survey data confirms this shift: [portfolios now trump pedigree](/2026/02/16/cybersecurity-hiring-portfolios-trump-pedigree-now/) as the #1 hiring signal among engineering leaders, with side projects and GitHub beating degrees and certifications by a wide margin.

A graduating senior who cannot explain what DNS does will lose to a self-taught applicant who patched a vulnerability and wrote about how they did it. Hiring managers have seen too many polished resumes attached to people who freeze the moment a real system breaks. Be the second kind of candidate, and make it impossible to miss.

## How to start a career in cybersecurity when the ladder is missing rungs {#how-to-break-in}

> **Direct answer:** Get into any IT or developer job, own security tasks inside it, build a public home lab on GitHub, then niche into cloud, appsec, or incident response before you apply for the security role you actually want.

If you want to know how to start a career in cybersecurity in 2026, accept the most important truth first: cybersecurity is not a first job for most people, and pretending otherwise sets you up to fail. It sits as a skill set on top of IT, networking, and development, not as a separate door you knock on with no background. So the strategy is not "apply harder." The strategy is "build a foundation, then layer security onto it where you already are." Here is the sequence I recommend to anyone asking me how to get in today.

### Step 1: Get into IT anywhere you can land it

Help desk, sysadmin, developer, cloud support, QA, any of it counts. You need exposure to real systems, real infrastructure, and real problems. You will not secure a network well if you have never reset a password on one. This is the rung most people skip, and skipping it is why their security applications go nowhere. Touch the technology before you try to defend it.

### Step 2: Become the security person in the job you already hold

You do not need the title to start behaving like a defender. Patch the things nobody else patches. Flag the bad configurations. Learn how to harden the environment around you. Read the logs. Watch the traffic. Ask how the work you do every day might break under attack. Owning security inside your current role builds credibility from the inside out, and it gives you stories no certification provides.

### Step 3: Build visible proof you do the work

Stand up a home lab. Run Active Directory. Wire in a SIEM. Run attack simulations against your own setup and watch what the defenses catch. Then document all of it on GitHub. A live link to a lab you built and explained is worth more on your resume than your GPA. Add capture-the-flag write-ups, a short blog, a walkthrough of a vulnerability you found. The goal is simple: make it obvious you know what you are doing and show how you think through a problem.

### Step 4: Niche down before you drown

The generalists are drowning in a sea of identical resumes. The specialists are fielding six-figure offers. Pick a lane and go deep: cloud security, application security, or incident response are three with real, unmet demand at the mid level. Mid-level and senior roles in those areas sit empty while everyone with a Security+ fights over the same Tier 1 SOC seat. Depth in one area beats a thin layer across ten.

For structured paths by specialty, [Okurrrr is a free career roadmap](/2026/03/18/okurrrr-ultimate-free-cybersecurity-career-roadmap/) with 627 certifications and 759 free resources organized by level, vendor, and NICE category.

Notice what this sequence does. It stops treating cybersecurity as a single locked entrance and treats it as a skill you grow on top of work you are already allowed to do. You stop waiting for permission. You start acting like a security pro before anyone hands you the badge, and by the time a security role opens, you walk in with proof instead of promises.

## How does the cybersecurity career path change based on your starting point? {#match-your-path}

> **Direct answer:** The four steps stay the same, but the fastest version depends on where you stand. Developers go straight to appsec. Ops and support staff layer on incident response. Network engineers move into detection. Career-changers start in IT first, then specialize.

The four steps stay the same, but the fastest version of them depends on your starting point. Use the door closest to you.

### If you already write code

Get obsessed with secure coding. Input validation, authentication flows, dependency risks, the mistakes that turn a feature into a breach. Application security is one of the most underserved specialties in the field, and developers who understand it are rare and well paid. You already speak the language. Aim it at security.

### If you work in support or operations

Learn incident response basics and ask to shadow the security team during a real event. Volunteer to help with a security process nobody owns. Operations people who understand how incidents unfold make strong analysts because they already know how systems behave when things go wrong.

### If you live in networking

Focus on segmentation, firewall best practices, and detection. You already understand how traffic moves. Layer on how attackers abuse that movement and how defenders spot it. Network knowledge is the backbone of detection engineering and a hard skill to fake, which makes it valuable.

### If you are switching careers from outside tech

Computer science gives you a more versatile foundation than a narrow security degree, and starting in an IT role before pivoting is the path most successful security pros took. Learn how the systems work first. Learn to secure them second. The order matters more than the speed. If you want a structured, low-cost on-ramp before committing to a degree or bootcamp, see my honest [review of the Google Cybersecurity Certificate](/2026/06/25/google-cybersecurity-certification-review/) — including two paths that make it free.

## Which cybersecurity certifications are actually worth getting? {#certifications}

> **Direct answer:** Pull 50 real job descriptions for your target role, note the certs that appear repeatedly, then verify on LinkedIn that practitioners hold them. Buy only those. Treat certs as a foot in the door, never as proof of skill.

Certifications confuse more newcomers than almost any other topic, partly because the field argues with itself about them. Plenty of working professionals call certs overrated revenue generators and insist passing a test does not make anyone good at the job. They are not wrong. And the same people will tell you the sole purpose of a cert is to pass the hiring filter, so you need a few anyway. Both things are true at once. The trick is buying the right ones instead of collecting random badges.

Do not pad a resume with ten certifications that mean nothing to the people hiring for your target role. Use a repeatable, two-step method to find the few worth your money and months.

**Step one.** Pull up 50 real job descriptions for the exact role you want. Read them for the certifications and skills appearing again and again. Repetition is your signal. Companies tell you precisely what they want if you read enough of their postings side by side.

**Step two.** Open LinkedIn and study people already doing that job. If 70 percent of them hold a specific certification, you have found what practitioners value and what opened doors for them in practice.

This works because you stop guessing and start using evidence. The job descriptions show you the front-door requirement. The practitioner profiles show you what survived contact with reality. Treat a certification as your foot in the door, never as proof you do the job. It signals you take the craft seriously enough to study it. The interview is where you win, and you only win it by knowing how to do the work.

If you skipped the data-driven method and just want a quick reality check on the certs that keep coming up, here is how the most-cited ones compare in 2026. Costs are vendor exam fees (or course-plus-exam where the course is required), pulled from each vendor's pricing page; "time to prepare" is a typical full-time-equivalent estimate for someone who already has the relevant foundational experience.

| Cert | Level | Cost (2026) | Time to Prepare | Who It Is For | Employer Demand |
|---|---|---|---|---|---|
| [CompTIA Security+](https://www.comptia.org/certifications/security) | Entry | $404 | 6 – 10 weeks | Career-changers, SOC L1 applicants, DoD 8570 roles | Very high (ATS keyword everywhere) |
| [ISC2 SSCP](https://www.isc2.org/certifications/sscp) | Entry – Mid | $249 | 8 – 12 weeks | Sysadmins moving into security operations | Moderate |
| [ISC2 CISSP](https://www.isc2.org/certifications/cissp) | Senior | $749 | 4 – 6 months (requires 5+ years experience) | Architects, managers, senior ICs | Very high (most-requested cert for senior roles) |
| [Offensive Security OSCP](https://www.offsec.com/courses/pen-200/) | Mid | $1,749 (course + exam) | 3 – 6 months hands-on | Aspiring penetration testers and red teamers | High in offensive roles |
| [AWS Certified Security – Specialty](https://aws.amazon.com/certification/certified-security-specialty/) | Mid – Senior | $300 | 6 – 10 weeks (assumes prior AWS experience) | Cloud security engineers | High and growing |
| [ISACA CISM](https://www.isaca.org/credentialing/cism) | Senior | $760 non-member / $575 member | 3 – 4 months | Audit, GRC, security management, regulated industries | High in finance and healthcare |

Two things to read off this table before you spend money. First, the cost of the exam is the smallest line item in your real total — study guides, lab time, and the months of focused work after-hours add up to far more than the voucher. Plan for the full investment, not the sticker price. Second, demand is contextual. Security+ is mandatory for many DoD-adjacent roles and useless for many tech-startup roles. CISSP is gatekeeping for senior corporate roles and gets eye-rolled by some practitioner communities. Always run the [two-step method](#certifications) on real postings for *your* target role before you buy.

## How do you get past automated cybersecurity hiring systems? {#ats-filters}

> **Direct answer:** Stop sending one generic resume everywhere. Mirror the exact skill terms from each posting in your resume, put a GitHub link to a real home lab near the top, and route around the filter with a referral whenever you can.

You will send applications into what feels like a void. Two hundred submissions, zero replies, no feedback. The silence is not a verdict on you. Swipe culture infected hiring, and an algorithm now decides whether a human ever sees your resume. Understanding the machine is your first step to getting past it.

We've written extensively about this problem. [The cybersecurity job market is fundamentally broken](/2026/02/18/navigating-the-broken-cybersecurity-job-market/) — AI filters reject qualified candidates while letting buzzword-stuffed fake resumes through. The hiring managers in that thread were clear: referrals bypass the filter entirely.

Most companies run an applicant tracking system. It scans your resume for keywords before a person reads a word of it. Miss the terms a role asks for and you vanish, no matter how qualified you are. So stop firing one generic resume at fifty openings. Read each job description, find the exact language it uses for skills and tools, and mirror those words honestly where they fit your real experience. You are not lying. You are translating your background into the language the filter recognizes.

A method I lean on works like this. Find a job you want and save it. Pull the specific responsibilities and required skills out of the posting. Then rewrite the top third of your resume to speak directly to those points, using the same nouns the company used. Repeat for each serious application. The work takes longer than blasting one file everywhere, and it lands far more interviews because the machine finally lets you through.

Lead with proof inside the application itself. A resume listing duties reads like everyone else's. A resume linking to a lab you built, a write-up you published, or a problem you solved gives a hiring manager a reason to pause. Put the GitHub link near the top. Name the specialty you chose. Reference the real systems you touched. You want the human who finally reads your file to see a practitioner, not a list of responsibilities copied from a template.

One move matters even more than any keyword trick. Bridge the gap before anyone agrees you have closed it. When the field told me I lacked cyber experience, I stopped waiting for permission. I did security work inside the IT role I already held, then listed the work as the experience it was. Framing real, relevant work you have already done as the qualification it represents is not dishonest. It is a refusal to let an arbitrary label erase what you did.

Then route around the filter whenever the option exists. A referral from one person inside a company beats a hundred cold applications. Most defenders remember how brutal the entry was, and a surprising number will answer a thoughtful message. A viral Reddit thread confirmed this: [every person who found a job got hired through their network](/2026/05/17/cybersecurity-job-market-broken-network-dont-apply/), not through applications. Do not ask a stranger to hand you a job. Ask one specific question about their work, their team, or the skill they wish more juniors had. Real relationships open more doors than any portal.

## The honest reality of the work itself {#reality-of-work}

If you only hear the highlight reel, you will burn out fast and wonder what went wrong. So here is the unfiltered version, drawn from what working professionals say when nobody markets to them.

Much of security work is repetitive. A large share of the job is stopping people from doing risky things, not chasing hooded figures through a terminal. One veteran put it bluntly: roughly 90 percent of securing a system is keeping humans from making the same predictable mistakes. The glamorous version sells courses. The real version pays the mortgage and looks a lot like patient, careful, unglamorous diligence.

Burnout is real, and the healthiest professionals set boundaries early. You do not owe an employer your unpaid evenings to sharpen skills they benefit from. A reasonable position sounds like this: I give my 40 hours and stay sharp on the clock, and growth that serves the company belongs on the company's time and budget. Protect your energy. A long career beats a brilliant 18 months followed by a flameout.

Tools and rules age badly too, so keep your judgment current. Forcing password changes every three months is a tired practice the field moved past. The point is not the specific example. The point is that staying employable means questioning received wisdom and following where the evidence leads, the same way you chose your certifications with data instead of folklore.

> Do not confuse reality with rejection. The field is hard. You are not being pushed out. You are being prepared for the real game.

## When are you actually ready to apply for cybersecurity jobs? {#when-ready}

> **Direct answer:** Readiness is a set of behaviors, not a feeling or a year count. The candidate who gets the call is the one already acting like a defender today — patching, documenting in public, asking gap-exposing questions — before the title arrives.

People wait to feel ready before they apply, before they call themselves a security person, before they claim the work. Readiness is not a feeling, and it does not arrive on a schedule. Readiness is how you show up where you stand right now.

The candidate who gets the call is rarely the one with the most years logged. It is the one acting like a defender today. Picture two people with the same job title. One files tickets and goes home. The other notices the open port nobody flagged, reads about why it matters, fixes it, and writes a short note explaining the risk to the team. Five years later those two hold wildly different careers, and the gap started with a choice unrelated to permission.

So treat readiness as a set of behaviors you adopt immediately. Get curious about how the things around you break. Volunteer for the security-adjacent task nobody wants. Document what you learn in public so the next person finds it. Ask the question exposing your gap instead of hiding it. None of these require a title, a budget, or anyone's approval. They require a decision to behave like a professional before the industry agrees to call you one.

This matters more now than ever, because the automation reshaping the field rewards this exact kind of judgment. Machines handle repetitive work well. They do not decide what matters, weigh a messy trade-off, or earn a colleague's trust during a crisis. Those are human skills, grown through reps and reflection, and they keep you employable as tools absorb the routine tasks. The good news: [AI is creating more cybersecurity jobs, not fewer](/2026/05/26/ai-fuels-cybersecurity-boom-your-career-guide/). [Job postings are up 11% year-over-year](https://www.cyberseek.org/heatmap.html) and pay is spiking. Build judgment, mentorship, and decision-making, and you become the person automation amplifies rather than the role it erases.

The difficulty of the path says nothing about your potential. The door feels heavy because someone propped a system against it, not because you lack the strength to push through. So push.

## Your first 90 days: a plan you can start today {#ninety-day-plan}

Strategy means nothing without a first move, so here is a concrete starting plan. Work through it in order. Each item builds proof, sharpens a skill, or opens a relationship, and every one of them sits inside your control regardless of who is or is not hiring this quarter.

**The 90-day breaking-in checklist:**

- Land or keep any role that puts you near real systems. Help desk, support, ops, or dev all qualify. Proximity to live infrastructure is the foundation everything else rests on.
- Stand up a home lab with Active Directory and a SIEM. Break it, defend it, and write down what you learned each week.
- Create a GitHub repository and publish your lab notes, configs, and one detailed vulnerability walkthrough. Make the link easy to find on your resume and profile.
- Pick one specialty: cloud security, application security, or incident response. Commit to it for the full 90 days instead of sampling all three.
- Run the 2-step certification method on 50 job descriptions and 20 LinkedIn profiles. Buy only the cert the data points to.
- Own one security task in your current job. Patch something neglected, fix a misconfiguration, or document a risk nobody tracked. Keep the receipts.
- Find one person doing your target job and ask one thoughtful question. Mentorship beats gatekeeping, and most defenders remember being new.

Do all seven and you separate yourself from the 99 percent who hold a degree and nothing else. You will have evidence, a specialty, a credential chosen on purpose, and a story about a real security problem you solved. That combination beats a wall of unfocused certifications every time.

## One last thing, from someone who got stuck at the gate {#closing}

The honest answer to how to start a career in cybersecurity is this: the system I described only works when someone decides to break the rules. A hiring manager broke them for me after 19 years of being told I was somehow too junior. I cannot promise you a manager like that. I can promise you the candidate who shows up with a documented lab, a clear specialty, and proof of real problems solved gives that manager every reason to say yes.

The field needs you. Not a fully formed expert who materialized from nowhere, but a person who started where they stood, took ownership before anyone granted the title, and built the muscle before the badge arrived. The door feels locked because the old path collapsed. You do not need the old path. You need a strategy, the patience to work it, and the refusal to let a broken hiring process convince you the problem is you.

Start where you are. Show you care. Build your proof. Then keep showing up until the people guarding the gate run out of reasons to keep it shut.

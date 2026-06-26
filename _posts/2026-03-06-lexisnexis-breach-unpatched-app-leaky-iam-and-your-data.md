---
description: "LexisNexis confirms its second breach in two years: an unpatched React app and overly permissive IAM exposed 2 GB of sensitive data."
layout: post
title: "LexisNexis Breach: Unpatched App, Leaky IAM, and Your Data"
category: Vulnerabilities
tags: ["Data Breach", "Cloud Security", "IAM"]
author: Marc
excerpt: "LexisNexis confirms a data breach involving 2GB of sensitive data due to an unpatched React app and overly permissive IAM. Learn what happened and how to protect yourself now. This is their second breach in two years."
image: "/assets/img/posts/lexisnexis-breach-unpatched-app-leaky-iam-and-your-data.webp"
image_width: 1080
image_height: 1350
---

Title: LexisNexis Confirms Data Breach: What Happened, How It Happened, and What You Should Do Right Now

TL;DR: LexisNexis has confirmed hackers breached their AWS infrastructure and exfiltrated 2GB of data including 3.9M database records and 400K user profiles. The attacker exploited an unpatched React app and leveraged an overly permissive IAM role. If you haven't already, request your free LexisNexis Consumer Disclosure Report and freeze your credit at all three bureaus. This is the company's second breach in two years.

Last week we published an article about why everyone should [request their free LexisNexis Consumer Disclosure Report and freeze their credit](/2026/02/26/lexisnexis-credit-freezes-your-guide-to-identity-protection/) at all three major bureaus. The timing of what happened next is hard to ignore.

On March 3, 2026, LexisNexis Legal and Professional confirmed to BleepingComputer hackers breached their servers and accessed customer and business information. A threat actor named FulcrumSec leaked 2GB of stolen files on underground forums.

This is the same company holding consumer data on nearly every adult in the United States.

## What Was Stolen

According to both LexisNexis and the threat actor's public disclosure, the breach exposed:

- 3.9 million database records
- 21,042 customer accounts
- Roughly 400,000 cloud user profiles (names, emails, phone numbers, job functions)
- 118 users with .gov email addresses including federal judges, DOJ attorneys, and SEC staff
- 45 employee password hashes
- 53 AWS Secrets Manager secrets in plaintext
- 5,582 attorney survey respondents
- Complete VPC infrastructure mapping

LexisNexis says the data was "mostly legacy, deprecated data from prior to 2020" and did not include Social Security numbers, financial information, or active passwords. They say products and services were not affected.

But legacy data is still your data. Old addresses, old business contacts, old account identifiers. Identity thieves piece together profiles from exactly this kind of information — as we explained in our piece on [how infostealers reconstruct full identities from fragmented data](/2026/02/21/infostealers-from-passwords-to-your-full-identity/).

## How the Breach Happened

For the technically minded, this breach is a case study in what goes wrong when basic cloud security practices are skipped.

## Step 1: The Initial Entry Point

FulcrumSec exploited a vulnerability known as React2Shell in an unpatched React frontend application. This gave them code execution inside an AWS container (ECS task).

The lesson: Public-facing applications are your perimeter. If you're running unpatched containers with known vulnerabilities, you're leaving the front door open. Patch management for containerized apps is not optional.

## Step 2: Lateral Movement via Overly Permissive IAM

Once inside the container, the attacker found the ECS task role had read access to every secret in the AWS Secrets Manager account. This included the production Redshift master credential.

This is a textbook violation of the principle of least privilege. A single container, running a frontend web application, should never have permissions to read every secret in production. IAM roles should be scoped to the absolute minimum required for the workload.

## Step 3: Data Exfiltration

With the Redshift master credential in hand, the attacker accessed 536 Redshift tables and 430+ VPC database tables. They exfiltrated 2GB of structured data.

No alerts. No containment. The attacker had time to map the entire VPC infrastructure, enumerate secrets, query databases, and exfiltrate everything.

## Lessons for Security Teams

1. Patch your public-facing applications. A known vulnerability in a React frontend gave the attacker their foothold. Container images need regular scanning and patching cycles.

2. Scope your IAM roles. Every ECS task, Lambda function, and EC2 instance should have the minimum permissions it needs. If a frontend container needs to read one secret, give it access to one secret. Not all 53.

3. Rotate your secrets. If a Redshift master credential has been sitting unchanged in Secrets Manager for years, a single compromised role gives an attacker persistent access to your entire data warehouse.

4. Monitor for anomalous access patterns. Exfiltrating 2GB of data from Redshift should trigger alerts. If your cloud environment doesn't have detection rules for mass data reads, you need to build them.

5. Segment your VPC. If a frontend container has network access to your production databases, your network architecture is too flat. Use security groups and network ACLs to isolate workloads.

## What You Should Do Right Now

Whether you're a security professional reading this for the technical breakdown or someone wanting to protect their personal data, the action steps are the same as last week but more urgent:

1. Request your free LexisNexis Consumer Disclosure Report at https://consumer.risk.lexisnexis.com/consumer. Under the FCRA, you're entitled to a free copy. You have three options: online, by mail (P.O. Box 105108, Atlanta, GA 30348-5108), or by phone (1-866-897-8126).

2. Review your report carefully. Look for addresses you've never lived at, property transactions you didn't make, liens or judgments you don't recognize, and professional licenses not belonging to you. If something looks wrong, dispute it directly with LexisNexis.

3. Freeze your credit at all three bureaus:
   - Equifax: equifax.com/personal/credit-report-services/credit-freeze
   - Experian: experian.com/freeze/center.html
   - TransUnion: transunion.com/credit-freeze

Each freeze is free, done online, and takes about five minutes. A freeze blocks lenders from pulling your credit, which stops most new account fraud before it starts.

4. If you have children, freeze their credit too. Children are prime targets because no one monitors their credit. The fraud often goes undetected until they turn 18.

This is the company's second breach in two years. The previous one in 2025 compromised data for 364,000 customers. The pattern should tell you everything you need to know about taking your data protection into your own hands.

Don't wait for breach number three.

Source: https://www.bleepingcomputer.com/news/security/lexisnexis-confirms-data-breach-as-hackers-leak-stolen-files/
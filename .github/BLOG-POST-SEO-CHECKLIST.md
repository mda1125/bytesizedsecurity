# ByteSizedSecurity Blog Post SEO Standards

> **Purpose**: This is the definitive checklist for what a blog post must look like to ship to `blog.bytesizedsecurity.show` SEO-clean from day one. It codifies every standard established in the 2026-06-19 SEO audit remediation (PRs 1–7a).
>
> **Audience**: Any agent or human that authors blog posts for ByteSizedSecurity. Specifically intended to be added to the `ai-social-media-manager` project's quality-check framework so the blog-variant of a post is validated against these rules *before* it gets submitted to the repo.
>
> **Authority**: All rules below either map to an audit finding (referenced in brackets like `[H1]`, `[M4]`, `[C1]`) or to a template behavior already wired into `_layouts/post.html`, `_includes/head.html`, or `_includes/schema-*.html`. Don't violate them — the repo's templates assume these rules hold.

---

## 0. Pre-flight: decide what kind of post this is

Before writing a single line, classify the post into one of three buckets. The rules below differ slightly per bucket.

| Bucket | Definition | Word-count floor | Index? |
|---|---|---|---|
| **Regular post** | News, opinion, explainer, how-to | ≥1,000 words | Yes |
| **Pillar / evergreen guide** | Comprehensive reference, expected to rank | ≥3,000 words, with tables + TOC | Yes |
| **Thin / cross-post** | LinkedIn imports, short reactions, microposts | <1,000 words | **No** — must ship with `noindex: true` + `sitemap: false` |

**Cannibalization check (mandatory)**: before publishing, search `_posts/` for an existing post within ±7 days that covers the same primary keyword. If one exists, either expand this post into a strict superset and plan to delete the older one, or skip the post. Same-day duplicates on the same topic *will* get deleted in the next audit. [C1]

---

## 1. Front matter — REQUIRED fields

Every post MUST have all of these. Copy this template and fill it in:

```yaml
---
description: "One sentence, ≤155 characters, no truncation. This is the SERP snippet — write it for click-through."
layout: post
title: "Title with the primary keyword + a hook. ≤60 characters optimal."
category: "DevSecOps"   # or one category from the existing set
tags: ["Primary Keyword", "Secondary Keyword", "Topical Bucket"]
author: Marc
excerpt: "Two-to-three sentence summary, longer than description. Used as social-card preview fallback and as the JSON-LD BlogPosting description fallback."
image: "/assets/img/posts/post-slug.webp"
image_width: 1200
image_height: 1200
last_modified_at: 2026-06-19
---
```

### Field rules

| Field | Rule | Why |
|---|---|---|
| `description` | **≤155 characters**, no trailing ellipsis, written as a complete sentence | `head.html` trusts this verbatim (no truncate) so SERP snippets never get cut mid-word [H1] |
| `title` | ≤60 chars soft target. **Include the year for time-sensitive content** (e.g., "in 2026"). Include the primary keyword. | Sets `<title>`, `og:title`, `twitter:title`, JSON-LD `headline` [H3] |
| `excerpt` | 2–3 sentences. Longer + more emotional than description. | Falls back to a 155-char-truncated form if description is missing [H1] |
| `image` | Path starting with `/assets/img/posts/`. **WebP preferred**, PNG fallback. | Sets `og:image`, `twitter:image`, JSON-LD `image.url`, and auto-fires an LCP preload [M5] |
| `image_width` + `image_height` | **Actual pixel dimensions of the file** | Prevents Cumulative Layout Shift; emitted as `<img width height>` AND into JSON-LD `image.width`/`image.height` [M6, M4] |
| `last_modified_at` | Set to today's date on publish. **Update whenever the body changes meaningfully.** | Emitted as `article:modified_time` and JSON-LD `dateModified`; signals freshness to Google |
| `layout` | Always `post` for blog posts | Triggers all the SEO/schema includes |
| `category` | One value from the existing set (DevSecOps, Privacy, Threats, Career, etc.) | Drives BreadcrumbList second-tier |
| `tags` | 2–4 tags, capitalized as proper nouns | Used by archive page; also surfaced in BreadcrumbList as fallback |
| `author` | `Marc` (the canonical site author) | Drives JSON-LD `author.name` |

---

## 2. Front matter — OPTIONAL fields

Use these only when their condition applies.

### `permalink:` (optional — pillars only)

For pillar/evergreen content that needs a clean URL not based on the date:

```yaml
permalink: /cybersecurity-career-guide/
```

When absent, the default permalink is `/:year/:month/:day/:title/` per `_config.yml`. **The IndexNow workflow correctly handles both cases** — custom permalinks get reported as-is, dated permalinks get computed from the filename.

### `faq:` (recommended for posts targeting PAA)

When the post answers questions people search for, declare them in front matter and they auto-emit as `FAQPage` JSON-LD via `_includes/schema-faq.html`:

```yaml
faq:
  - question: "Does 2FA really stop 99% of attacks?"
    answer: "Yes. <a href=\"https://www.microsoft.com/...\">Microsoft's research...</a> found that 2FA blocks over 99.9% of automated account compromise attacks."
  - question: "What is the best type of 2FA?"
    answer: "Hardware security keys (like YubiKey or Google Titan) are the gold standard..."
```

Rules for FAQ entries:
- **3–6 questions per post**, ideally mirroring real People-Also-Asked phrasing for the post's primary keyword
- Answers should be **40–80 words**, complete sentences, no markdown
- **HTML `<a href>` tags ARE allowed in answers** (Google's FAQPage spec supports them) but you must escape quotes: `<a href=\"...\">link</a>`
- Each question should also exist as a section in the post body, ideally as an H2 with the question as its text — this is the cleanest signal alignment

### `noindex: true` + `sitemap: false` (mandatory for thin/duplicate)

If the post is <1,000 words, a cross-post from LinkedIn, or otherwise not unique enough to deserve a SERP slot:

```yaml
noindex: true
sitemap: false
```

`head.html` will emit `<meta name="robots" content="noindex,follow">` and the post will be excluded from `sitemap.xml`. `follow` is intentional — internal link equity still flows through. [C1]

---

## 3. Front matter — FORBIDDEN fields

These will fail the audit. Do not use them:

| Forbidden field | Why | Use instead |
|---|---|---|
| `howto:` | Google deprecated `HowTo` rich results for non-medical content in late 2023; `_includes/schema-howto.html` was removed in PR 2 | Just write the steps as ordered prose with H3 step headings |
| Manually embedded `<script type="application/ld+json">` in body | Will conflict with auto-emitted schema from `_includes/schema-*.html` and produce duplicate JSON-LD warnings in Rich Results | Use `faq:` front matter for FAQPage; let the templates handle the rest |
| `seo:` block from jekyll-seo-tag | Plugin was removed in PR 2 in favor of the custom block in `head.html` | Just use `description:`, `title:`, `image:` directly |

---

## 4. Body structure — REQUIRED

### 4.1 NO in-body `<h1>` headings

`_layouts/post.html` already wraps `page.title` in an `<h1>`. The body must start at `<h2>` (Markdown `##`) at most. A second `<h1>` (Markdown `#`) anywhere in the body is a fail — it produces a double-h1 which Google treats as ambiguous. [H6]

### 4.2 Standard intro structure

The first ~150 words of every post should follow this pattern:

```markdown
[Subtitle-like opening line, 1 sentence, reframes the title with emotional hook]

**TL;DR:** [3–5 sentence summary that delivers the answer up front. Should stand alone as a Twitter-length value prop.]

---

[Lead paragraph that hooks the reader and previews the structure of the post.]
```

The horizontal rule (`---`) after TL;DR is conventional and helps the eye separate "summary" from "body."

### 4.3 H2 headings should be questions when reasonable

For posts that target informational queries: phrase H2s as the question the reader would type. This dramatically improves People-Also-Asked and featured-snippet eligibility. [M10]

**Good**:
- `## How do you get past automated cybersecurity hiring systems?`
- `## Does 2FA really stop 99% of attacks?`

**Acceptable when the section is narrative or action-plan**:
- `## The honest reality of the work itself`
- `## Your first 90 days: a plan you can start today`

**Aim for ≥75% of H2s to be questions on informational posts.**

### 4.4 "Direct answer:" callouts after question H2s

Every question-format H2 should be followed immediately by a blockquote callout that answers the question in **≤40 words**. Pattern:

```markdown
## How do you get past automated cybersecurity hiring systems? {#ats-filters}

> **Direct answer:** Stop sending one generic resume everywhere. Mirror the exact skill terms from each posting in your resume, put a GitHub link to a real home lab near the top, and route around the filter with a referral whenever you can.

You will send applications into what feels like a void...
```

Rules:
- **Hard limit: 40 words.** Count them before publishing.
- **Format exactly** as `> **Direct answer:** [answer]` — the format is the snippet-eligibility signal
- The detailed answer immediately follows in the body

### 4.5 Stable H2 anchor IDs (required for pillars, recommended for long posts)

For posts ≥1,500 words, add kramdown explicit IDs to every H2 so jump links don't break when text gets edited:

```markdown
## Which cybersecurity certifications are actually worth getting? {#certifications}
```

The ID becomes the URL fragment (`/pillar-url/#certifications`).

### 4.6 Jump-link TOC (required for pillars, recommended for posts ≥2,000 words)

Place immediately after TL;DR:

```markdown
**Jump to a section:**

- [Is there really a talent shortage?](#talent-shortage)
- [How much do cybersecurity professionals make in 2026?](#salaries)
- [Do you need a degree?](#degree-required)
```

Every anchor in the TOC must match an `{#slug}` on an H2 in the body.

### 4.7 Tables for comparative data

When the post compares 3+ options across 3+ dimensions (e.g., role-by-salary, cert-by-cost, tool-by-feature), use a Markdown table. **Every numeric cell that comes from an external source must link to that source inline.** Example:

```markdown
| Cert | Level | Cost (2026) |
|---|---|---|
| [CompTIA Security+](https://www.comptia.org/certifications/security) | Entry | $404 |
```

---

## 5. Citations & YMYL — REQUIRED for posts with statistics

ByteSizedSecurity is a YMYL (Your Money or Your Life) site — security/privacy advice that affects readers' safety. Google holds YMYL sites to a higher trust standard. [H4]

### Rule: every named source must be a primary-source hyperlink

If the post says any of the following without a link, it fails the audit:

- "Microsoft's research found..." → must link to the Microsoft research
- "According to the NYT..." → must link to the actual NYT article
- "Per Glassdoor data..." → link to Glassdoor (or to the article that cited Glassdoor)
- "BLS reports..." → link to bls.gov
- "CISA published..." → link to cisa.gov
- "NIST guidance says..." → link to nist.gov

**Anchor text discipline**: anchor the link on the *article title or organization name*, not the stat. Don't over-link — if you cite the same source three times in three lines, link it once (on the title) and let the other two stand as references to "the article."

### When you don't have a primary URL handy

If the source genuinely isn't online (e.g., a paywalled report, a podcast interview), state it as a citation but acknowledge the absence: *"according to a 2026 internal IBM report (not publicly available)"*. **Do not fabricate URLs.** Better to be honest about the limitation than to ship a broken link.

### FAQ answers can include HTML links

The FAQ JSON-LD spec accepts `<a href>` inside answers. Use this when the FAQ answer makes a YMYL claim:

```yaml
faq:
  - question: "Does 2FA really stop 99% of attacks?"
    answer: "Yes. <a href=\"https://www.microsoft.com/...\">Microsoft's research</a> found that 2FA blocks over 99.9% of automated account compromise attacks."
```

Note the escaped quotes: `\"` not `"`.

---

## 6. Images — REQUIRED if `image:` is set

### 6.1 Format

- **WebP preferred** (smaller filesize, same quality)
- PNG acceptable for screenshots or images with text
- JPEG acceptable for photographic content only
- **No GIFs** for hero images (large filesize, no semantic value over WebP)

### 6.2 Dimensions

- **Hero image target: 1200×1200 (square) or 1200×630 (16:9)**. Both work for OG/Twitter cards.
- Pillar hero: 1024×576 also acceptable
- **MUST set actual `image_width:` and `image_height:` in front matter** matching the actual file dimensions. Mismatched dimensions cause CLS AND Google suppresses rich-result thumbnails site-wide if the schema reports wrong dimensions. [M4]

### 6.3 Path convention

- Hero image at `/assets/img/posts/[post-slug].webp` (or `.png`)
- Inline body images at `/assets/img/posts/[descriptive-name].webp`

### 6.4 What happens automatically (do not duplicate)

- `head.html` auto-emits `<link rel="preload" as="image">` for the hero image of every post with `image:` set [M5]
- `schema-blogposting.html` auto-emits `image.url`, `image.width`, `image.height` in BlogPosting JSON-LD using the front matter dimensions
- Default fallback image (`/assets/img/default-og.png`, 1536×1024) is auto-used if no `image:` is set

---

## 7. Internal linking — RECOMMENDED

### Targets per post

- **≥2 contextual links to related existing posts** — improves topic-cluster signals
- Use **relative URLs** matching the permalink pattern: `/2026/05/26/ai-fuels-cybersecurity-boom-your-career-guide/` (with trailing slash) or `/cybersecurity-career-guide/` for permalink'd posts
- **Never link to a post with `noindex: true`** — that wastes link equity on a deindexed target. Run a quick grep for the target's `noindex:` field before linking.

### Anchor text discipline

- Use descriptive anchor text matching the target post's topic, not generic phrases
- ❌ "Click here for more"
- ❌ "Read this post"
- ✅ "AI is creating more cybersecurity jobs, not fewer"
- ✅ "the CISA ChatGPT incident and shadow AI"

---

## 8. Schema — AUTO-EMITTED, do not manually add

The following JSON-LD blocks are auto-emitted by includes. **You don't write any of them**; they're generated from front matter:

| Schema type | Emitted by | Triggered when |
|---|---|---|
| `BlogPosting` | `_includes/schema-blogposting.html` | `layout: post` |
| `BreadcrumbList` | `_includes/schema-breadcrumb.html` | `layout: post` (uses `category` or first tag) |
| `FAQPage` | `_includes/schema-faq.html` | `faq:` front matter exists |
| `WebSite` + `Organization` | `_includes/head.html` (in `@graph`) | homepage only |

**Adding your own `<script type="application/ld+json">` in the post body will create duplicates.** This was a major finding in the audit and is enforced by template — don't reintroduce it.

---

## 9. `llms.txt` and `llms-full.txt` — update on new posts

### `llms-full.txt` (always update for new published posts)

Add a single line for the new post under the appropriate section. Format mirrors the existing entries — see the file's current state for the exact format. Don't add `noindex:true` posts to this file.

### `llms.txt` "Key Pages" section (update only for evergreen guides)

Only add an entry here if the new post is:
- A foundational/comprehensive guide (≥3,000 words, pillar-quality)
- Expected to be cited frequently by AI assistants (ChatGPT, Perplexity, Claude)

If yes, add an entry with a 1-sentence descriptive blurb after the colon, matching the existing format.

---

## 10. IndexNow + deploy workflow — AUTO-HANDLED

You don't need to do anything for IndexNow. The deploy workflow at `.github/workflows/deploy.yml` automatically:

1. Detects which `_posts/*.md` files changed in the push
2. Computes each post's public URL (respecting custom `permalink:` front matter)
3. POSTs the URL list to `api.indexnow.org/IndexNow` after the GitHub Pages deploy succeeds

The IndexNow key file at the repo root must remain present and unmodified.

---

## 11. Forbidden patterns — audit findings to never reintroduce

Each of these was a finding in the 2026-06-19 audit. Don't ship a post that does any of them:

| ❌ Pattern | Why it fails | Fix |
|---|---|---|
| `description` >155 chars OR with `truncate: 155` Liquid filter | Truncation cuts mid-word in SERPs | Write it tight to start [H1] |
| `description` not set (relying on excerpt) | Loses CTR vs explicit description | Always set explicitly [H1] |
| In-body `# Heading` (H1) | Double-h1 confuses Google | Use `## Heading` (H2) [H6] |
| `howto:` front matter | Schema deprecated by Google | Plain prose with ordered list [M2] |
| Image without `image_width:` and `image_height:` | Causes CLS + breaks rich-result thumbnails | Always include actual dims [M4, M6] |
| Linking to a `noindex: true` post | Wastes link equity | Check target's front matter first |
| YMYL stat without primary-source hyperlink | Fails E-E-A-T trust signal | Always link the source [H4] |
| Thin post (<1,000 words) without `noindex: true` | Cannibalizes pillar; damages site quality score | Either expand or noindex [C1] |
| Same-day duplicate-topic posts | Pure cannibalization | Pick one canonical version, delete the other [C1] |

---

## 12. Final verification checklist (run before publishing)

Mechanical pass/fail checks. The social-media-manager's quality framework can implement these as discrete validators:

### Front matter validators

- [ ] `description:` is set, ≤155 chars, doesn't end with "..."
- [ ] `title:` is set, ≤60 chars (soft warn if over)
- [ ] `excerpt:` is set, longer than description
- [ ] `image:` is set and the file exists at that path
- [ ] `image_width:` and `image_height:` are set and match actual file dimensions
- [ ] `last_modified_at:` matches today's date
- [ ] `layout: post` is set
- [ ] `category:` is one of the existing set
- [ ] `tags:` is an array of 2–4 strings
- [ ] `author: Marc` is set
- [ ] **NO** `howto:` field
- [ ] If word count <1,000 → `noindex: true` AND `sitemap: false` are set
- [ ] If `faq:` is set → 3–6 entries, each answer 40–80 words

### Body validators

- [ ] **No `^# ` lines** (no body H1)
- [ ] Body opens with subtitle line + `**TL;DR:**` paragraph + `---` horizontal rule + lead paragraph
- [ ] **≥75% of H2s are questions** (informational posts only)
- [ ] **Every question-format H2 is followed by `> **Direct answer:**` callout ≤40 words**
- [ ] If post ≥1,500 words → every H2 has explicit `{#slug}` ID
- [ ] If post ≥2,000 words → jump-link TOC present after TL;DR
- [ ] If post has comparative data across 3+ options × 3+ dimensions → table is used
- [ ] **Every named source has a primary-source hyperlink** (grep for NYT, BLS, NIST, CISA, Microsoft, Google, Verizon, ISC2, Reuters, Bloomberg, etc. — each occurrence should be adjacent to or inside a markdown link)
- [ ] **No `<script type="application/ld+json">` tag in body** (schema is auto-emitted)
- [ ] ≥2 internal links to related published posts (not to noindex'd posts)
- [ ] All internal links use relative URLs with trailing slashes

### Cross-file validators

- [ ] New post added to `llms-full.txt` under appropriate section
- [ ] If pillar/evergreen → added to `llms.txt` Key Pages section
- [ ] No other `_posts/*.md` from the same day covers the same primary keyword

### Build validators (run after Jekyll build)

- [ ] Post's rendered HTML has exactly one `<h1>` (the page title)
- [ ] Post's rendered HTML has `<meta name="description">` matching front matter
- [ ] If `faq:` was set → rendered HTML contains one `<script type="application/ld+json">` block with `"@type": "FAQPage"`
- [ ] Rendered post URL passes Google's Rich Results Test for `BlogPosting` + `BreadcrumbList` (+ `FAQPage` if applicable) with no errors

---

## 13. The model post — what "perfect" looks like

Reference these three posts as templates depending on which bucket you're authoring:

| Bucket | Reference post | Why it's the model |
|---|---|---|
| **Regular post** | `_posts/2026-05-26-ai-fuels-cybersecurity-boom-your-career-guide.md` | Tight description, NYT primary-source hyperlink on article title, clean front matter, no double-h1 |
| **Pillar / evergreen** | `_posts/2026-05-28-cybersecurity-career-guide.md` | Custom permalink, TOC, 6-row salary table with inline citations, 6-row cert comparison table, 8 "Direct answer:" callouts, FAQPage with 6 entries, jump-link IDs on every H2 |
| **YMYL with FAQ + HTML link in answer** | `_posts/2026-02-16-2fa-the-5-minute-fix-that-stops-99-percent-of-account-attacks.md` | FAQ answer with escaped `<a href>` to Microsoft research, body citations to Microsoft + Google research, clean structure |

When in doubt, open the bucket-matching reference post and mirror its structure.

---

## Change log

- **2026-06-19**: Initial version. Codifies the standards established in PRs 1–7a of the 2026-06-19 SEO audit remediation. Sources: `_includes/head.html`, `_includes/schema-*.html`, `_layouts/post.html`, `.github/workflows/deploy.yml`, and the three reference posts cited in §13.

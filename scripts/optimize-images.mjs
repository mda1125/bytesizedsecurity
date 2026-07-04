import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs';
import { join, basename, extname } from 'path';

/*
 * Post-image pipeline.
 *
 * Two responsibilities, run in one pass:
 *
 * 1. INGEST — for any _posts/*.md whose front-matter `image:` points at a
 *    Blotato Supabase storage URL, download it once and write a 1200w WebP
 *    master to assets/img/posts/<slug>.webp. Idempotent; skips if the
 *    master already exists.
 *
 * 2. VARIANTS — for every master WebP in assets/img/posts/, emit
 *    responsive variants at 400w and 800w (skipping if the master is
 *    already narrower than the target). These feed the responsive-image
 *    include's srcset for local files so mobile viewports stop
 *    downloading the 1200w master to render a ~390px hero (PSI mobile
 *    2026-07-03 audit: ~73 KiB wasted on the hero alone).
 *
 * Naming: <slug>-400.webp / <slug>-800.webp alongside <slug>.webp.
 * `-1200` isn't emitted separately; the unsuffixed master IS the 1200w
 * entry in the srcset.
 */

const POSTS_DIR = '_posts';
const OUTPUT_DIR = 'assets/img/posts';
const VARIANT_WIDTHS = [400, 800];
const MASTER_WIDTH = 1200;
const WEBP_QUALITY = 80;

mkdirSync(OUTPUT_DIR, { recursive: true });

async function ingestBlotatoMasters() {
  const posts = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  const results = [];

  for (const filename of posts) {
    const content = readFileSync(join(POSTS_DIR, filename), 'utf-8');
    const imageMatch = content.match(/^image:\s*"(https:\/\/database\.blotato\.io[^"]+)"/m);
    if (!imageMatch) continue;

    const url = imageMatch[1];
    const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
    const outputPath = join(OUTPUT_DIR, `${slug}.webp`);

    if (existsSync(outputPath)) {
      // Master already exists — variant pass below will handle it.
      continue;
    }

    console.log(`[ingest] ${slug}`);
    console.log(`  fetch: ${url}`);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log(`  ERROR: HTTP ${response.status}`);
        continue;
      }
      const buffer = Buffer.from(await response.arrayBuffer());
      const origKB = Math.round(buffer.length / 1024);
      await sharp(buffer)
        .resize({ width: MASTER_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);
      const newKB = Math.round(statSync(outputPath).size / 1024);
      console.log(`  ${origKB} KB -> ${newKB} KB master`);
      results.push({ filename, slug, outputPath, origKB, newKB });
    } catch (err) {
      console.log(`  ERROR: ${err.message}`);
    }
  }
  return results;
}

// Match only OUR known variant width suffixes. A naive /-(\d+)\.webp$/
// falsely flagged post images with year-in-slug endings (e.g.
// `...-2026.webp`) as variants and skipped them from the variant pass.
const VARIANT_SUFFIX_RE = new RegExp(
  `-(${VARIANT_WIDTHS.join('|')})\\.webp$`
);
function isVariant(name) {
  return VARIANT_SUFFIX_RE.test(name);
}

async function generateVariants() {
  const files = readdirSync(OUTPUT_DIR).filter(
    (f) => f.endsWith('.webp') && !isVariant(f)
  );
  const summary = [];

  for (const file of files) {
    const base = file.replace(/\.webp$/, '');
    const src = join(OUTPUT_DIR, file);
    const meta = await sharp(src).metadata();
    if (!meta.width) {
      console.log(`[variant] ${file}: unreadable, skipping`);
      continue;
    }

    for (const w of VARIANT_WIDTHS) {
      // Don't upscale — if the master is narrower than the variant target,
      // skip. Browsers will pick the master (1200w max) from the srcset.
      if (meta.width < w) continue;
      const outPath = join(OUTPUT_DIR, `${base}-${w}.webp`);
      if (existsSync(outPath)) {
        // Refresh only if master is newer than variant.
        if (statSync(src).mtimeMs <= statSync(outPath).mtimeMs) continue;
      }
      await sharp(src)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outPath);
      const kb = Math.round(statSync(outPath).size / 1024);
      summary.push({ file, w, kb });
      console.log(`[variant] ${file} -> ${base}-${w}.webp (${kb} KB)`);
    }
  }
  return summary;
}

const ingested = await ingestBlotatoMasters();
const variants = await generateVariants();

console.log('');
console.log(`Ingested ${ingested.length} new master(s).`);
console.log(`Wrote ${variants.length} responsive variant(s).`);

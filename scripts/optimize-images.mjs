import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, basename } from 'path';

const POSTS_DIR = '_posts';
const OUTPUT_DIR = 'assets/img/posts';

mkdirSync(OUTPUT_DIR, { recursive: true });

const posts = readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
const results = [];

for (const filename of posts) {
  const content = readFileSync(join(POSTS_DIR, filename), 'utf-8');
  const imageMatch = content.match(/^image:\s*"(https:\/\/database\.blotato\.io[^"]+)"/m);
  if (!imageMatch) continue;

  const url = imageMatch[1];
  const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
  const outputPath = join(OUTPUT_DIR, `${slug}.webp`);

  console.log(`Processing: ${slug}`);
  console.log(`  Downloading: ${url}`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`  ERROR: HTTP ${response.status}`);
      continue;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const origKB = Math.round(buffer.length / 1024);
    console.log(`  Original: ${origKB} KB`);

    await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);

    const { size } = await sharp(outputPath).metadata().then(() =>
      import('fs').then(fs => fs.statSync(outputPath))
    );
    const newKB = Math.round(size / 1024);
    console.log(`  WebP: ${newKB} KB`);
    console.log(`  Savings: ${Math.round((1 - size / buffer.length) * 100)}%`);

    results.push({ filename, slug, outputPath, origKB, newKB });
  } catch (err) {
    console.log(`  ERROR: ${err.message}`);
  }
  console.log('');
}

console.log(`\nDone! Processed ${results.length} images.`);
console.log(`Total savings: ${results.reduce((a, r) => a + r.origKB, 0)} KB → ${results.reduce((a, r) => a + r.newKB, 0)} KB`);

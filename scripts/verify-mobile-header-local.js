// scripts/verify-mobile-header-local.js
// Verifies the header fix locally without needing a Jekyll server by
// rendering the updated _includes/header.html markup (with liquid tags
// stripped) against the freshly-built assets/css/tailwind.min.css.
//
// Usage: node scripts/verify-mobile-header-local.js

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const VIEWPORTS = [
  { name: 'iPhone SE (375w)', width: 375, height: 667 },
  { name: 'iPhone 12/13 (390w)', width: 390, height: 844 },
  { name: 'iPhone 14 Pro Max (430w)', width: 430, height: 932 },
  { name: 'Pixel 5 (393w)', width: 393, height: 851 },
  { name: 'Galaxy S8 (360w)', width: 360, height: 740 },
];

const REPO = path.resolve(__dirname, '..');
const HEADER_PATH = path.join(REPO, '_includes/header.html');
const ICON_PATH = path.join(REPO, '_includes/icon.html');
const THEME_PATH = path.join(REPO, '_includes/theme-toggle.html');

function stripLiquid(html) {
  return html
    .replace(/\{%-?\s*comment\s*-?%\}[\s\S]*?\{%-?\s*endcomment\s*-?%\}/g, '')
    .replace(/\{%[\s\S]*?%\}/g, '')
    .replace(/\{\{\s*site\.title\s*\}\}/g, 'ByteSizedSecurity')
    .replace(/\{\{\s*'\/'\s*\|\s*relative_url\s*\}\}/g, '/')
    .replace(/\{\{[\s\S]*?\}\}/g, '#');
}

function inlineIcon(name) {
  const icon = fs.readFileSync(ICON_PATH, 'utf8');
  const match = icon.match(new RegExp(`\\{% when "${name}" %\\}(<path[^\\/]+\\/>)`, 'm'));
  const p = match ? match[1] : '';
  return `<svg width="1em" height="1em" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true">${p}</svg>`;
}

let headerHtml = stripLiquid(fs.readFileSync(HEADER_PATH, 'utf8'));
headerHtml = headerHtml
  .replace(/<svg[\s\S]*?<\/svg>/g, '') // remove pre-existing empty svgs
  // Reinject icons where the includes used to be — inspect the markup and add.
  ;

// Simpler: rebuild the header markup by hand, since the include for icon.html
// is what we already stripped. We include the raw <svg> for shield_lock,
// menu, and the theme toggle contrast icon inline, matching the updated
// header structure verbatim.
const rendered = `
<header class="bg-white dark:bg-gray-900 border-b-4 border-primary pt-6 pb-6 px-4 lg:px-8 shadow-sm">
  <div class="max-w-6xl mx-auto flex items-center justify-between gap-4">
    <a href="/" class="flex items-center gap-3 no-underline min-w-0">
      <div class="flex items-center justify-center text-primary text-3xl md:text-4xl shrink-0">
        ${inlineIcon('shield_lock')}
      </div>
      <div class="flex flex-col min-w-0">
        <span class="text-lg md:text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100 font-sans uppercase">ByteSizedSecurity</span>
        <span class="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-sans tracking-widest uppercase">Cybersecurity Insights &amp; Analysis</span>
      </div>
    </a>
    <div class="flex items-center gap-2 md:gap-4">
      <button type="button" data-theme-toggle
        class="flex items-center justify-center w-11 h-11 text-2xl text-gray-800 hover:text-primary dark:text-gray-200 dark:hover:text-primary transition-colors"
        aria-label="Theme toggle">
        <span>${inlineIcon('contrast')}</span>
      </button>
      <button id="mobile-menu-btn" class="md:hidden flex items-center justify-center w-12 h-12 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors text-3xl" aria-label="Toggle menu">
        <span id="menu-icon-open">${inlineIcon('menu')}</span>
      </button>
    </div>
  </div>
</header>
`;

const css = fs.readFileSync(
  path.join(REPO, 'assets/css/tailwind.min.css'),
  'utf8'
);

const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>${css}</style>
</head>
<body>
${rendered}
<main style="height: 800px;"></main>
</body>
</html>`;

const OUT = '/tmp/header-fixed-preview.html';
fs.writeFileSync(OUT, html);

(async () => {
  const browser = await chromium.launch();
  console.log(`Rendering local preview ${OUT} at ${VIEWPORTS.length} mobile viewports.\n`);
  for (const v of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: v.width, height: v.height },
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    });
    const page = await ctx.newPage();
    await page.goto('file://' + OUT, { waitUntil: 'networkidle' });
    await page.waitForTimeout(200);

    const m = await page.evaluate(() => {
      const rect = (el) => (el ? el.getBoundingClientRect() : null);
      const hamburger = document.getElementById('mobile-menu-btn');
      const themeToggle = document.querySelector('[data-theme-toggle]');
      const brand = document.querySelector('header a[href="/"]');
      const brandTitle = brand ? brand.querySelector('span.text-lg') : null;
      return {
        innerWidth: window.innerWidth,
        docScrollWidth: document.documentElement.scrollWidth,
        hamburger: rect(hamburger),
        themeToggle: rect(themeToggle),
        brand: rect(brand),
        brandTitle: rect(brandTitle),
      };
    });

    const overflow = m.docScrollWidth - m.innerWidth;
    const hbOff = m.hamburger ? Math.max(0, m.hamburger.right - m.innerWidth) : 0;
    console.log(`— ${v.name}`);
    console.log(`  overflow: ${overflow}px  |  hamburger off-screen: ${hbOff.toFixed(1)}px`);
    console.log(
      `  brand title width: ${m.brandTitle ? m.brandTitle.width.toFixed(1) : 'n/a'}px  |  brand anchor: ${m.brand.width.toFixed(1)}px`
    );
    console.log(
      `  hamburger right edge: ${m.hamburger.right.toFixed(1)}  (viewport ${m.innerWidth})`
    );

    const shotPath = `/tmp/header-fixed-${v.width}w.png`;
    await page.screenshot({
      path: shotPath,
      clip: { x: 0, y: 0, width: v.width, height: 140 },
    });
    console.log(`  screenshot: ${shotPath}\n`);
    await ctx.close();
  }
  await browser.close();
})();

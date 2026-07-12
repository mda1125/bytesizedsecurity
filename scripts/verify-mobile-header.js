// scripts/verify-mobile-header.js
// One-shot measurement of the live blog header at various mobile widths
// to verify the SEO auditor's "hamburger 51px off-screen" claim.
//
// Usage: node scripts/verify-mobile-header.js

const { chromium, devices } = require('playwright');

const VIEWPORTS = [
  { name: 'iPhone SE (375w)', width: 375, height: 667, dpr: 2 },
  { name: 'iPhone 12/13 (390w)', width: 390, height: 844, dpr: 3 },
  { name: 'iPhone 14 Pro Max (430w)', width: 430, height: 932, dpr: 3 },
  { name: 'Pixel 5 (393w)', width: 393, height: 851, dpr: 2.75 },
  { name: 'Galaxy S8 (360w)', width: 360, height: 740, dpr: 3 },
];

const URL = 'https://blog.bytesizedsecurity.show/';

(async () => {
  const browser = await chromium.launch();
  console.log(`Fetching ${URL} at ${VIEWPORTS.length} mobile viewports...\n`);
  for (const v of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: v.width, height: v.height },
      deviceScaleFactor: v.dpr,
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'networkidle' });

    const measurements = await page.evaluate(() => {
      const html = document.documentElement;
      const body = document.body;
      const header = document.querySelector('header');
      const hamburger = document.getElementById('mobile-menu-btn');
      const themeToggle = document.querySelector('[data-theme-toggle]');
      const brand = document.querySelector('header a[href="/"]');
      const brandTitle = brand ? brand.querySelector('span.text-2xl, span.md\\:text-3xl') : null;

      const rect = (el) => (el ? el.getBoundingClientRect() : null);
      const cs = (el, prop) =>
        el ? window.getComputedStyle(el).getPropertyValue(prop) : null;

      return {
        innerWidth: window.innerWidth,
        docScrollWidth: html.scrollWidth,
        docClientWidth: html.clientWidth,
        bodyScrollWidth: body.scrollWidth,
        headerRect: rect(header),
        hamburgerRect: rect(hamburger),
        hamburgerVisible: hamburger ? !hamburger.offsetParent === false : null,
        hamburgerDisplay: cs(hamburger, 'display'),
        themeToggleRect: rect(themeToggle),
        brandRect: rect(brand),
        brandTitleText: brandTitle ? brandTitle.textContent.trim() : null,
        brandTitleRect: rect(brandTitle),
        brandTitleFontSize: cs(brandTitle, 'font-size'),
      };
    });

    const overflow = measurements.docScrollWidth - measurements.innerWidth;
    const hb = measurements.hamburgerRect;
    const hamburgerOffscreen = hb ? Math.max(0, hb.right - measurements.innerWidth) : null;

    console.log(`— ${v.name} (viewport ${v.width}w)`);
    console.log(`  innerWidth: ${measurements.innerWidth}`);
    console.log(
      `  document.scrollWidth: ${measurements.docScrollWidth} (overflow: ${overflow}px)`
    );
    console.log(`  body.scrollWidth: ${measurements.bodyScrollWidth}`);
    if (hb) {
      console.log(
        `  hamburger: left=${hb.left.toFixed(1)} right=${hb.right.toFixed(
          1
        )} width=${hb.width.toFixed(1)} display=${measurements.hamburgerDisplay}`
      );
      console.log(
        `  hamburger off-screen to the right: ${hamburgerOffscreen.toFixed(1)}px`
      );
    } else {
      console.log('  hamburger: NOT FOUND');
    }
    const tt = measurements.themeToggleRect;
    if (tt) {
      console.log(
        `  theme-toggle: left=${tt.left.toFixed(1)} right=${tt.right.toFixed(
          1
        )} width=${tt.width.toFixed(1)}`
      );
    }
    const br = measurements.brandRect;
    if (br) {
      console.log(
        `  brand anchor: left=${br.left.toFixed(1)} right=${br.right.toFixed(
          1
        )} width=${br.width.toFixed(1)}`
      );
    }
    const bt = measurements.brandTitleRect;
    if (bt) {
      console.log(
        `  brand title "${measurements.brandTitleText}": width=${bt.width.toFixed(
          1
        )} font-size=${measurements.brandTitleFontSize}`
      );
    }

    // Save a screenshot for visual confirmation.
    const shotPath = `/tmp/header-${v.width}w.png`;
    await page.screenshot({
      path: shotPath,
      clip: { x: 0, y: 0, width: v.width, height: 200 },
    });
    console.log(`  screenshot: ${shotPath}\n`);

    await ctx.close();
  }
  await browser.close();
})();

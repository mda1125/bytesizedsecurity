// One-shot desktop sanity check to confirm md:text-3xl / md:text-4xl still kick in.
const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  for (const [w, h] of [[768, 900], [1024, 900], [1440, 900]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await page.goto('file:///tmp/header-fixed-preview.html', { waitUntil: 'networkidle' });
    const m = await page.evaluate(() => {
      const cs = (sel, prop) => window.getComputedStyle(document.querySelector(sel)).getPropertyValue(prop);
      return {
        titleFontSize: cs('header a[href="/"] span.text-lg', 'font-size'),
        iconWrapperFontSize: cs('header a[href="/"] div.text-primary', 'font-size'),
      };
    });
    console.log(`viewport ${w}w — title font-size: ${m.titleFontSize}, icon wrapper font-size: ${m.iconWrapperFontSize}`);
    await ctx.close();
  }
  await browser.close();
})();

// scripts/verify-a11y-skip-menu.js
// Keyboard skip link and mobile menu aria-expanded, against two local
// Jekyll builds (before = unfocused pixel baseline, after = this change).
//
// Usage:
//   node scripts/verify-a11y-skip-menu.js \
//     --before /tmp/bss-before --after /tmp/bss-after

const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'post', path: '/2026/11/19/ai-debt-collection-flaws-credit-nirvana/' },
];

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'desktop', width: 1440, height: 900 },
];

const ARTIFACTS = process.env.A11Y_ARTIFACTS
  || (fs.existsSync('/opt/cursor/artifacts') ? '/opt/cursor/artifacts' : path.join('/tmp', 'bss-a11y-artifacts'));

function arg(name) {
  const i = process.argv.indexOf(name);
  if (i === -1 || !process.argv[i + 1]) {
    throw new Error('Missing ' + name);
  }
  return path.resolve(process.argv[i + 1]);
}

function serve(root) {
  const rootResolved = path.resolve(root);
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let urlPath = decodeURIComponent(req.url.split('?')[0]);
      if (urlPath.endsWith('/')) urlPath += 'index.html';
      const file = path.resolve(rootResolved, '.' + urlPath);
      if (!file.startsWith(rootResolved + path.sep) && file !== rootResolved) {
        res.writeHead(403);
        res.end();
        return;
      }
      fs.readFile(file, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('not found');
          return;
        }
        const types = {
          '.html': 'text/html; charset=utf-8',
          '.css': 'text/css; charset=utf-8',
          '.js': 'text/javascript',
          '.png': 'image/png',
          '.webp': 'image/webp',
          '.svg': 'image/svg+xml',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.woff2': 'font/woff2',
          '.ico': 'image/x-icon',
          '.xml': 'application/xml',
          '.webmanifest': 'application/manifest+json',
        };
        res.writeHead(200, {
          'Content-Type': types[path.extname(file)] || 'application/octet-stream',
          'Cache-Control': 'no-store',
          'Access-Control-Allow-Origin': '*',
        });
        res.end(data);
      });
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

function contrastRatio(fg, bg) {
  function lin(c) {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  }
  function L(rgb) {
    return 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
  }
  const lighter = Math.max(L(fg), L(bg));
  const darker = Math.min(L(fg), L(bg));
  return (lighter + 0.05) / (darker + 0.05);
}

async function pixelDiff(aPath, bPath) {
  const a = await sharp(aPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const b = await sharp(bPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  if (a.info.width !== b.info.width || a.info.height !== b.info.height) {
    return {
      pixels: -1,
      reason: 'size ' + a.info.width + 'x' + a.info.height + ' vs ' + b.info.width + 'x' + b.info.height,
    };
  }
  let pixels = 0;
  for (let i = 0; i < a.data.length; i += 4) {
    if (
      a.data[i] !== b.data[i] ||
      a.data[i + 1] !== b.data[i + 1] ||
      a.data[i + 2] !== b.data[i + 2] ||
      a.data[i + 3] !== b.data[i + 3]
    ) {
      pixels++;
    }
  }
  return { pixels, total: a.data.length / 4 };
}

async function prepare(page, url) {
  await page.goto(url, { waitUntil: 'load', timeout: 20000 });
  await page.evaluate(async () => {
    const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await Promise.race([document.fonts.ready, timeout(4000)]);
    await Promise.race([
      Promise.all(
        [...document.images].map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
              })
        )
      ),
      timeout(4000),
    ]);
  });
}

async function shot(page, file) {
  await page.screenshot({
    path: file,
    fullPage: false,
    animations: 'disabled',
    caret: 'hide',
  });
}

(async () => {
  const beforeRoot = arg('--before');
  const afterRoot = arg('--after');
  fs.mkdirSync(ARTIFACTS, { recursive: true });
  const lines = [];
  const fail = (msg) => {
    lines.push('FAIL ' + msg);
    console.log('FAIL ' + msg);
  };
  const ok = (msg) => {
    lines.push('OK   ' + msg);
    console.log('OK   ' + msg);
  };

  const beforeServer = await serve(beforeRoot);
  const afterServer = await serve(afterRoot);
  const beforeOrigin = 'http://127.0.0.1:' + beforeServer.address().port;
  const afterOrigin = 'http://127.0.0.1:' + afterServer.address().port;

  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--font-render-hinting=none', '--disable-lcd-text'],
  });

  let failures = 0;
  function check(cond, msg) {
    if (cond) ok(msg);
    else {
      failures++;
      fail(msg);
    }
  }

  try {
    for (const viewport of VIEWPORTS) {
      for (const pageInfo of PAGES) {
        const label = pageInfo.name + ' ' + viewport.name + ' ' + viewport.width + 'x' + viewport.height;
        process.stdout.write('>> ' + label + '\n');
        const contextOpts = {
          viewport: { width: viewport.width, height: viewport.height },
          deviceScaleFactor: 1,
          colorScheme: 'light',
          reducedMotion: 'reduce',
        };
        const beforeCtx = await browser.newContext(contextOpts);
        const afterCtx = await browser.newContext(contextOpts);
        for (const ctx of [beforeCtx, afterCtx]) {
          await ctx.addInitScript(() => {
            try {
              localStorage.setItem('theme', 'light');
            } catch (e) {}
          });
          await ctx.route('**/*', (route) => {
            const url = route.request().url();
            if (url.startsWith('http://127.0.0.1:')) return route.continue();
            return route.abort();
          });
        }

        const beforePage = await beforeCtx.newPage();
        const afterPage = await afterCtx.newPage();
        await prepare(beforePage, beforeOrigin + pageInfo.path);
        await prepare(afterPage, afterOrigin + pageInfo.path);

        const beforeFile = path.join(ARTIFACTS, 'before-' + pageInfo.name + '-' + viewport.name + '.png');
        const afterFile = path.join(ARTIFACTS, 'after-' + pageInfo.name + '-' + viewport.name + '.png');
        await shot(beforePage, beforeFile);
        await shot(afterPage, afterFile);
        const diff = await pixelDiff(beforeFile, afterFile);
        check(diff.pixels === 0, label + ' unfocused pixels identical (' + (diff.pixels === 0 ? '0' : diff.pixels + (diff.reason ? ' ' + diff.reason : '')) + ' differ)');

        const boxes = await Promise.all(
          [beforePage, afterPage].map((p) =>
            p.evaluate(() => {
              const header = document.querySelector('header');
              const main = document.querySelector('main');
              const hr = header.getBoundingClientRect();
              const mr = main.getBoundingClientRect();
              return {
                header: [hr.x, hr.y, hr.width, hr.height],
                main: [mr.x, mr.y, mr.width, mr.height],
                scrollWidth: document.documentElement.scrollWidth,
              };
            })
          )
        );
        check(
          JSON.stringify(boxes[0]) === JSON.stringify(boxes[1]),
          label + ' header/main box unchanged ' + JSON.stringify(boxes[1])
        );

        await afterPage.keyboard.press('Tab');
        const focused = await afterPage.evaluate(() => {
          const el = document.activeElement;
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          const parse = (c) => {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            const ctx = canvas.getContext('2d', { colorSpace: 'srgb' });
            ctx.clearRect(0, 0, 1, 1);
            ctx.fillStyle = c;
            ctx.fillRect(0, 0, 1, 1);
            const px = ctx.getImageData(0, 0, 1, 1).data;
            return [px[0], px[1], px[2]];
          };
          const header = document.querySelector('header').getBoundingClientRect();
          return {
            tag: el.tagName,
            className: el.className,
            text: (el.textContent || '').trim(),
            href: el.getAttribute && el.getAttribute('href'),
            position: cs.position,
            clip: cs.clipPath,
            width: r.width,
            height: r.height,
            top: r.top,
            left: r.left,
            color: parse(cs.color),
            background: parse(cs.backgroundColor),
            outline: cs.outlineStyle,
            display: cs.display,
            visibility: cs.visibility,
            rawBackground: cs.backgroundColor,
            headerTop: header.top,
            headerHeight: header.height,
          };
        });
        check(
          focused.tag === 'A' && String(focused.className).indexOf('skip-link') !== -1,
          label + ' first Tab focuses skip link (got ' + focused.tag + '.' + focused.className + ')'
        );
        check(focused.text === 'Skip to main content', label + ' skip link text');
        check(focused.href === '#main-content', label + ' skip link href ' + focused.href);
        check(focused.position === 'fixed', label + ' focused skip link is position:' + focused.position);
        check(focused.clip === 'none', label + ' focused clip-path ' + focused.clip);
        check(focused.width > 80 && focused.height > 24, label + ' focused box ' + focused.width.toFixed(1) + 'x' + focused.height.toFixed(1));
        check(focused.top >= 0 && focused.left >= 0 && focused.top < 40, label + ' focused at top-left top=' + focused.top.toFixed(1));
        check(focused.visibility === 'visible' && focused.display !== 'none', label + ' focused skip link visible');
        const ratio = focused.color && focused.background ? contrastRatio(focused.color, focused.background) : 0;
        check(
          ratio >= 4.5,
          label + ' text contrast ' + ratio.toFixed(2) + ':1 (fg ' + focused.color + ' bg ' + focused.background + ' raw ' + focused.rawBackground + ')'
        );
        check(
          focused.headerTop === 0 && Math.abs(focused.headerHeight - boxes[1].header[3]) < 0.5,
          label + ' focusing the skip link does not move the header (height ' + focused.headerHeight + ')'
        );

        if (pageInfo.name === 'home' && viewport.name === 'desktop') {
          const focusedShot = path.join(ARTIFACTS, 'skip-link-focused.png');
          await shot(afterPage, focusedShot);
          ok('saved focused skip link screenshot ' + focusedShot);
        }
        if (pageInfo.name === 'home' && viewport.name === 'mobile') {
          const focusedShot = path.join(ARTIFACTS, 'skip-link-focused-mobile.png');
          await shot(afterPage, focusedShot);
          ok('saved mobile focused skip link screenshot ' + focusedShot);
        }

        await afterPage.keyboard.press('Enter');
        const landed = await afterPage.evaluate(() => {
          const el = document.activeElement;
          return { id: el && el.id, tag: el && el.tagName, tabindex: el && el.getAttribute('tabindex') };
        });
        check(
          landed.id === 'main-content' && landed.tag === 'MAIN' && landed.tabindex === '-1',
          label + ' Enter moves focus to main (got ' + landed.tag + '#' + landed.id + ' tabindex=' + landed.tabindex + ')'
        );

        if (viewport.name === 'mobile') {
          await afterPage.keyboard.press('Escape');
          await afterPage.evaluate(() => {
            if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
          });
          const menu = await afterPage.evaluate(() => {
            const btn = document.getElementById('mobile-menu-btn');
            const id = btn.getAttribute('aria-controls');
            const target = document.getElementById(id);
            const before = btn.getAttribute('aria-expanded');
            btn.click();
            const opened = btn.getAttribute('aria-expanded');
            const openHidden = target.classList.contains('hidden');
            btn.click();
            const closed = btn.getAttribute('aria-expanded');
            const closedHidden = target.classList.contains('hidden');
            return {
              id: id,
              exists: !!target,
              tag: target && target.tagName,
              before: before,
              opened: opened,
              openHidden: openHidden,
              closed: closed,
              closedHidden: closedHidden,
              label: btn.getAttribute('aria-label'),
            };
          });
          check(menu.before === 'false', label + ' aria-expanded before click is ' + menu.before);
          check(menu.opened === 'true' && menu.openHidden === false, label + ' aria-expanded after open is ' + menu.opened + ' hidden=' + menu.openHidden);
          check(menu.closed === 'false' && menu.closedHidden === true, label + ' aria-expanded after close is ' + menu.closed + ' hidden=' + menu.closedHidden);
          check(menu.id === 'mobile-menu' && menu.exists && menu.tag === 'NAV', label + ' aria-controls="' + menu.id + '" points at ' + menu.tag);
          check(menu.label === 'Toggle menu', label + ' aria-label preserved');
        }

        await beforeCtx.close();
        await afterCtx.close();
      }
    }

    const darkCtx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      colorScheme: 'dark',
    });
    await darkCtx.addInitScript(() => {
      try { localStorage.setItem('theme', 'dark'); } catch (e) {}
    });
    await darkCtx.route('**/*', (route) => {
      const url = route.request().url();
      if (url.startsWith('http://127.0.0.1:')) return route.continue();
      return route.abort();
    });
    const darkPage = await darkCtx.newPage();
    await prepare(darkPage, afterOrigin + '/');
    await darkPage.keyboard.press('Tab');
    const darkFocused = await darkPage.evaluate(() => {
      const el = document.activeElement;
      const cs = getComputedStyle(el);
      const ctx = document.createElement('canvas').getContext('2d');
      const parse = (c) => {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const c2 = canvas.getContext('2d', { colorSpace: 'srgb' });
        c2.fillStyle = c;
        c2.fillRect(0, 0, 1, 1);
        const px = c2.getImageData(0, 0, 1, 1).data;
        return [px[0], px[1], px[2]];
      };
      return {
        className: document.documentElement.className,
        color: parse(cs.color),
        background: parse(cs.backgroundColor),
        rawBackground: cs.backgroundColor,
        rawColor: cs.color,
      };
    });
    const darkRatio = darkFocused.color && darkFocused.background ? contrastRatio(darkFocused.color, darkFocused.background) : 0;
    check(
      String(darkFocused.className).indexOf('dark') !== -1 && darkRatio >= 4.5,
      'dark mode skip link contrast ' + darkRatio.toFixed(2) + ':1 (fg ' + darkFocused.color + ' bg ' + darkFocused.background + ' raw ' + darkFocused.rawColor + ' on ' + darkFocused.rawBackground + ')'
    );
    const darkShot = path.join(ARTIFACTS, 'skip-link-focused-dark.png');
    await shot(darkPage, darkShot);
    ok('saved dark focused skip link screenshot ' + darkShot);
    await darkCtx.close();

    const htmlFiles = [];
    function walk(dir) {
      for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) walk(p);
        else if (ent.name.endsWith('.html')) htmlFiles.push(p);
      }
    }
    walk(afterRoot);
    let missingSkip = 0;
    let missingMain = 0;
    let pagesWithMain = 0;
    for (const file of htmlFiles) {
      const html = fs.readFileSync(file, 'utf8');
      if (!html.includes('<main')) continue;
      pagesWithMain++;
      if (!html.includes('class="skip-link sr-only" href="#main-content"')) missingSkip++;
      if (!html.includes('id="main-content" tabindex="-1"')) missingMain++;
      if (!html.includes('aria-controls="mobile-menu"') || !html.includes('aria-expanded="false"')) {
        missingMain++;
      }
    }
    check(pagesWithMain >= 28, 'built pages with <main>: ' + pagesWithMain);
    check(missingSkip === 0 && missingMain === 0, 'every page has skip link, focusable main, and menu aria (' + missingSkip + ' / ' + missingMain + ' missing)');
    check(!fs.existsSync(path.join(afterRoot, '404.html')), 'no 404.html in this build (no 404 layout in the theme)');
  } finally {
    await browser.close();
    beforeServer.close();
    afterServer.close();
    fs.writeFileSync(path.join(ARTIFACTS, 'a11y-verify.log'), lines.join('\n') + '\n');
  }

  if (failures) {
    console.log('\n' + failures + ' check(s) failed');
    process.exit(1);
  }
  console.log('\nAll checks passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});

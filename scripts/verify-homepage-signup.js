/* Checks the homepage Security Briefing form on a built site.
   Build first: bundle exec jekyll build
   Nothing is posted to SendFox. The signup URL is stubbed. Every other
   request whose host is sendfox.com or cdn.sendfox.com is aborted.
   The block is hidden at the lg breakpoint, so the wide shot is 1000px,
   the last width where the input and button are still on screen. */
const { chromium } = require('playwright');
const fs = require('fs');
const http = require('http');
const path = require('path');

const root = path.join(__dirname, '..');
const site = path.join(root, '_site');
const artifacts = '/opt/cursor/artifacts';
const failures = [];

function check(cond, msg) {
  if (cond) {
    console.log('ok  ' + msg);
    return;
  }
  failures.push(msg);
  console.error('FAIL ' + msg);
}

const SENDFOX_SIGNUP_HOST = 'sendfox.com';
const SENDFOX_SIGNUP_PATH = '/form/3z6ooe/1ydnre';
const SENDFOX_SCRIPT_HOST = 'cdn.sendfox.com';

function parsedUrl(raw) {
  try {
    return new URL(raw);
  } catch (err) {
    return null;
  }
}

function isExactHttps(raw, hostname, pathname) {
  const parsed = parsedUrl(raw);
  return !!(parsed &&
    parsed.protocol === 'https:' &&
    parsed.hostname === hostname &&
    parsed.pathname === pathname &&
    parsed.search === '' &&
    parsed.username === '' &&
    parsed.password === '');
}

function isSendFoxSignupUrl(raw) {
  return isExactHttps(raw, SENDFOX_SIGNUP_HOST, SENDFOX_SIGNUP_PATH);
}

function sendFoxGate(raw) {
  const parsed = parsedUrl(raw);
  if (!parsed) return 'other';
  const knownHost = parsed.hostname === SENDFOX_SIGNUP_HOST || parsed.hostname === SENDFOX_SCRIPT_HOST;
  if (!knownHost) return 'other';
  if (isSendFoxSignupUrl(raw)) return 'signup';
  return 'blocked';
}

function parseBody(raw) {
  const keys = [];
  const values = {};
  const re = /name="([^"]+)"\r\n\r\n([\s\S]*?)\r\n/g;
  let match;
  while ((match = re.exec(raw || ''))) {
    keys.push(match[1]);
    values[match[1]] = match[2];
  }
  return {
    keys,
    email: Object.prototype.hasOwnProperty.call(values, 'email') ? values.email : null,
    password: Object.prototype.hasOwnProperty.call(values, 'a_password') ? values.a_password : null,
    website: Object.prototype.hasOwnProperty.call(values, 'company_website') ? values.company_website : null
  };
}

function startServer(port) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1');
    let rel = decodeURIComponent(url.pathname);
    const candidates = [rel, path.join(rel, 'index.html'), rel + '.html'];
    let file = null;
    for (const candidate of candidates) {
      const abs = path.join(site, candidate);
      if (abs.startsWith(site) && fs.existsSync(abs) && fs.statSync(abs).isFile()) {
        file = abs;
        break;
      }
    }
    if (!file) {
      res.writeHead(404);
      res.end('missing ' + rel);
      return;
    }
    const ext = path.extname(file);
    const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
    res.writeHead(200, { 'content-type': types[ext] || 'application/octet-stream' });
    res.end(fs.readFileSync(file));
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)));
}

function duplicateIds(html) {
  const ids = [];
  const idRe = /\sid="([^"]+)"/g;
  let idMatch;
  while ((idMatch = idRe.exec(html))) ids.push(idMatch[1]);
  return ids.filter((id, index) => ids.indexOf(id) !== index);
}

async function main() {
  const builtHome = path.join(site, 'index.html');
  if (!fs.existsSync(builtHome)) {
    console.error('Missing Jekyll build. Run: bundle exec jekyll build');
    process.exit(1);
  }
  fs.mkdirSync(artifacts, { recursive: true });

  const home = fs.readFileSync(path.join(root, '_layouts/home.html'), 'utf8');
  const sidebar = fs.readFileSync(path.join(root, '_includes/sidebar.html'), 'utf8');
  const guard = fs.readFileSync(path.join(root, '_includes/newsletter-form.js'), 'utf8');
  check(home.includes('action="https://sendfox.com/form/3z6ooe/1ydnre"'), 'homepage action stays on the SendFox form');
  check(home.includes('data-newsletter-placement="home"'), 'homepage placement attribute');
  check(home.includes('data-newsletter-src="home"'), 'homepage src attribute');
  check(home.includes('id="home-company-website"'), 'homepage honeypot id');
  check(home.includes('>Get it free</button>'), 'homepage button text');
  check(home.includes('<label for="home_briefing_email" class="sr-only">Email address</label>'), 'homepage label for matches the input id');
  check(home.includes('id="home_briefing_email" name="email" required autocomplete="email" inputmode="email"'), 'homepage email autofill attributes');
  check(home.includes('text-base'), 'homepage input uses text-base');
  check(home.includes('w-full min-w-0 sm:w-48'), 'homepage input is full width when stacked and fixed width in a row');
  check(sidebar.includes('id="sendfox_form_email"'), 'sidebar email id stays unique from the homepage id');
  check(guard.includes('var MIN_MS = 3000;'), 'shared guard still waits 3 seconds');
  check(guard.includes("window.gtag('event', 'newsletter_signup'"), 'shared guard still fires newsletter_signup');

  const homeHtml = fs.readFileSync(builtHome, 'utf8');
  check(duplicateIds(homeHtml).length === 0, 'built homepage has unique ids (' + duplicateIds(homeHtml).join(',') + ')');
  check((homeHtml.match(/id="home_briefing_email"/g) || []).length === 1, 'homepage email id appears once');
  check((homeHtml.match(/id="sendfox_form_email"/g) || []).length === 1, 'sidebar email id still appears once on the homepage');
  check(homeHtml.includes('for="home_briefing_email"'), 'built homepage ties the label to the input');

  const port = 8769;
  const server = await startServer(port);
  const browser = await chromium.launch();
  const hits = [];
  const sendfoxUrls = [];
  let subscribedNavs = 0;

  try {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await page.clock.install({ time: new Date('2026-11-19T12:00:00Z') });
    await page.route('**/*', async (route) => {
      const url = route.request().url();
      const gate = sendFoxGate(url);
      if (gate === 'signup') {
        sendfoxUrls.push(url);
        hits.push({
          url,
          method: route.request().method(),
          body: route.request().postData() || ''
        });
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: '{}'
        });
        return;
      }
      if (gate === 'blocked') {
        sendfoxUrls.push(url);
        await route.abort();
        return;
      }
      const parsed = parsedUrl(url);
      if (!parsed || parsed.hostname !== '127.0.0.1') {
        await route.abort();
        return;
      }
      await route.continue();
    });
    page.on('dialog', async (dialog) => {
      page._dialogs = page._dialogs || [];
      page._dialogs.push(dialog.message());
      await dialog.accept();
    });
    page.on('framenavigated', (frame) => {
      if (frame === page.mainFrame() && frame.url().includes('/subscribed')) subscribedNavs += 1;
    });
    await page.addInitScript(() => {
      try { localStorage.setItem('theme', 'light'); } catch (err) {}
      window.dataLayer = [];
      const record = (entry) => {
        const args = Array.from(entry);
        const serial = JSON.parse(JSON.stringify(args, (key, value) => (
          typeof value === 'function' ? '__fn__' : value
        )));
        const prev = JSON.parse(sessionStorage.getItem('gtag-events') || '[]');
        prev.push(serial);
        sessionStorage.setItem('gtag-events', JSON.stringify(prev));
        const params = args[2];
        if (params && typeof params.event_callback === 'function') params.event_callback();
      };
      window.dataLayer.push = function () {
        for (let i = 0; i < arguments.length; i++) record(arguments[i]);
        return window.dataLayer.length;
      };
    });

    async function openHome() {
      hits.length = 0;
      subscribedNavs = 0;
      page._dialogs = [];
      await page.goto('http://127.0.0.1:' + port + '/', { waitUntil: 'networkidle' });
      await page.evaluate(() => sessionStorage.removeItem('gtag-events'));
    }

    async function measure() {
      return page.evaluate(() => {
        const form = document.getElementById('home-briefing-form');
        const input = form.querySelector('input[name="email"]');
        const button = form.querySelector('button[type="submit"]');
        const label = form.querySelector('label[for="' + input.id + '"]');
        const card = form.parentElement;
        const ir = input.getBoundingClientRect();
        const br = button.getBoundingClientRect();
        const cr = card.getBoundingClientRect();
        const labelRect = label.getBoundingClientRect();
        const ids = Array.from(document.querySelectorAll('[id]')).map((el) => el.id);
        return {
          fontSize: getComputedStyle(input).fontSize,
          height: getComputedStyle(input).height,
          type: input.getAttribute('type'),
          name: input.getAttribute('name'),
          autocomplete: input.getAttribute('autocomplete'),
          inputmode: input.getAttribute('inputmode'),
          required: input.required,
          id: input.id,
          labelFor: label.htmlFor,
          labelText: label.textContent,
          labelW: labelRect.width,
          labelH: labelRect.height,
          accCount: input.labels ? input.labels.length : 0,
          accName: input.labels && input.labels[0] ? input.labels[0].textContent : '',
          cardDisplay: getComputedStyle(card).display,
          inputW: Math.round(ir.width),
          buttonW: Math.round(br.width),
          sameRow: Math.abs(ir.top - br.top) < 8,
          stacked: br.top >= ir.bottom - 2 && Math.abs(ir.left - br.left) < 4,
          gap: Math.round(br.left - ir.right),
          stackGap: Math.round(br.top - ir.bottom),
          buttonInside: br.right <= cr.right + 1 && br.left >= cr.left - 1,
          cardOverflow: card.scrollWidth - card.clientWidth,
          docOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          button: button.textContent.trim(),
          action: form.getAttribute('action'),
          placement: form.getAttribute('data-newsletter-placement'),
          src: form.getAttribute('data-newsletter-src'),
          dupes: ids.filter((id, index) => ids.indexOf(id) !== index)
        };
      });
    }

    async function shot(name) {
      const card = page.locator('#home-briefing-form').locator('xpath=..');
      await card.scrollIntoViewIfNeeded();
      await card.screenshot({ path: path.join(artifacts, name) });
    }

    await openHome();
    const at375 = await measure();
    console.log('375 ' + JSON.stringify(at375));
    check(at375.fontSize === '16px', '375px input computes to 16px (' + at375.fontSize + ')');
    check(parseFloat(at375.fontSize) >= 16, '375px input is at least 16px');
    check(at375.height === '40px', '375px input keeps the 40px height (' + at375.height + ')');
    check(at375.type === 'email' && at375.name === 'email', 'input type and name');
    check(at375.autocomplete === 'email', 'autocomplete is email');
    check(at375.inputmode === 'email', 'inputmode is email');
    check(at375.required === true, 'input is required');
    check(at375.id === 'home_briefing_email', 'input id is home_briefing_email');
    check(at375.labelFor === 'home_briefing_email' && at375.labelText === 'Email address', 'label text and for');
    check(at375.accCount === 1 && at375.accName === 'Email address', 'accessible name comes from the label');
    check(at375.labelW <= 1 && at375.labelH <= 1, 'label is screen-reader only (' + at375.labelW + 'x' + at375.labelH + ')');
    check(at375.stacked, '375px input sits above the button');
    check(at375.stackGap >= 4 && at375.stackGap <= 12, '375px stack gap stays tight (' + at375.stackGap + ')');
    check(at375.inputW >= 220, '375px input is wide enough for the placeholder (' + at375.inputW + ')');
    check(Math.abs(at375.buttonW - at375.inputW) <= 4, '375px button matches the input width (' + at375.buttonW + '/' + at375.inputW + ')');
    check(at375.buttonInside, '375px button stays inside the card');
    check(at375.button === 'Get it free', 'button text');
    check(at375.action === 'https://sendfox.com/form/3z6ooe/1ydnre', 'form action');
    check(at375.placement === 'home' && at375.src === 'home', 'placement and src stay home');
    check(at375.docOverflow <= 1, '375px page does not overflow (' + at375.docOverflow + ')');
    check(at375.cardOverflow <= 1, '375px card does not overflow (' + at375.cardOverflow + ')');
    check(at375.dupes.length === 0, 'no duplicate ids on the live homepage');
    await shot('homepage_signup_after_375.png');

    await page.setViewportSize({ width: 320, height: 700 });
    const at320 = await measure();
    console.log('320 ' + JSON.stringify(at320));
    check(at320.fontSize === '16px', '320px input stays 16px (' + at320.fontSize + ')');
    check(at320.stacked, '320px input sits above the button');
    check(at320.inputW >= 200, '320px input is wide enough for the placeholder (' + at320.inputW + ')');
    check(at320.buttonInside, '320px button stays inside the card');
    check(at320.docOverflow <= 1, '320px page does not overflow (' + at320.docOverflow + ')');
    check(at320.cardOverflow <= 1, '320px card does not overflow (' + at320.cardOverflow + ')');

    await page.setViewportSize({ width: 1000, height: 900 });
    const wide = await measure();
    console.log('1000 ' + JSON.stringify(wide));
    check(wide.fontSize === '16px', 'wide input stays 16px (' + wide.fontSize + ')');
    check(wide.cardDisplay !== 'none', 'form is on screen below the lg breakpoint');
    check(wide.sameRow, 'wide layout keeps the input beside the button');
    check(wide.inputW >= 160 && wide.inputW <= 220, 'wide input keeps the 192px field width (' + wide.inputW + ')');
    check(wide.buttonInside, 'wide button stays inside the card');
    check(wide.docOverflow <= 1 && wide.cardOverflow <= 1, 'wide layout does not overflow (' + wide.docOverflow + '/' + wide.cardOverflow + ')');
    await shot('homepage_signup_after_desktop.png');

    await page.setViewportSize({ width: 1280, height: 900 });
    const desktop = await measure();
    console.log('1280 ' + JSON.stringify(desktop));
    check(desktop.fontSize === '16px', '1280px input still computes to 16px (' + desktop.fontSize + ')');
    check(desktop.cardDisplay === 'none', 'homepage block stays hidden at 1280px');
    check(desktop.docOverflow <= 1, '1280px page does not overflow (' + desktop.docOverflow + ')');

    const side = await page.evaluate(() => {
      const input = document.getElementById('1ydnre').querySelector('input[name="email"]');
      return {
        fontSize: getComputedStyle(input).fontSize,
        autocomplete: input.getAttribute('autocomplete'),
        id: input.id
      };
    });
    check(side.fontSize === '16px' && side.id === 'sendfox_form_email' && side.autocomplete === 'email', 'sidebar field on the homepage is unchanged (' + JSON.stringify(side) + ')');

    await page.setViewportSize({ width: 375, height: 812 });
    await openHome();
    await page.locator('#home-briefing-form input[name="email"]').fill('reader@example.com');
    await page.locator('#home-briefing-form button[type="submit"]').click();
    const fast = await page.locator('#home-briefing-form').evaluate((form) => {
      const btn = form.querySelector('button[type="submit"]');
      return { button: btn.textContent, dropped: form.dataset.newsletterDropped || '' };
    });
    check(hits.length === 0, 'fast homepage submit does not call SendFox');
    check(fast.button === 'Check email' && fast.dropped === '1', 'fast submit still uses the shared guard (' + JSON.stringify(fast) + ')');
    check(page.url() === 'http://127.0.0.1:' + port + '/' || page.url().endsWith(':8769/'), 'fast submit stays on the homepage (' + page.url() + ')');

    await openHome();
    await page.clock.fastForward(4000);
    await page.locator('#home-briefing-form input[name="email"]').fill('reader@example.com');
    const click = page.locator('#home-briefing-form button[type="submit"]').click();
    await page.waitForURL((url) => url.pathname.replace(/\/$/, '').endsWith('/subscribed') && url.searchParams.get('src') === 'home');
    await click;
    await page.clock.fastForward(1000);
    check(hits.length === 1, 'homepage posts exactly once (' + hits.length + ')');
    const parsed = parseBody(hits[0].body);
    check(parsed.email === 'reader@example.com', 'homepage posts the email');
    check(parsed.password === '', 'homepage posts an empty a_password');
    check(parsed.website === null, 'homepage does not post company_website');
    check(hits[0].method === 'POST', 'homepage uses POST');
    check(isSendFoxSignupUrl(hits[0].url), 'homepage posts to the exact SendFox URL');
    const events = await page.evaluate(() => JSON.parse(sessionStorage.getItem('gtag-events') || '[]'));
    const signups = events.filter((event) => event[1] === 'newsletter_signup');
    check(signups.length === 1, 'homepage fires newsletter_signup once (' + JSON.stringify(signups) + ')');
    check(signups[0] && signups[0][2] && signups[0][2].placement === 'home', 'GA placement is home');
    check(subscribedNavs === 1, 'homepage redirects once (' + subscribedNavs + ')');
    check(page.url().includes('/subscribed?src=home'), 'redirect URL keeps src=home (' + page.url() + ')');
    check((page._dialogs || []).length === 0, 'success shows no alert');

    const leaked = sendfoxUrls.filter((url) => sendFoxGate(url) === 'other');
    check(leaked.length === 0, 'no sendfox host request escaped the stub (' + leaked.join(',') + ')');
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  if (failures.length) {
    console.error('\n' + failures.length + ' check(s) failed');
    process.exit(1);
  }
  console.log('\nAll homepage signup checks passed');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

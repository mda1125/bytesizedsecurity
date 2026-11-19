/* Checks the Amazon fake-products mid-post signup against a built site.
   Build first: bundle exec jekyll build
   Nothing is posted to SendFox. The signup URL is stubbed. Every other
   request whose host is sendfox.com or cdn.sendfox.com is aborted. */
const { chromium } = require('playwright');
const fs = require('fs');
const http = require('http');
const path = require('path');

const root = path.join(__dirname, '..');
const site = path.join(root, '_site');
const artifacts = '/opt/cursor/artifacts';
const postPath = '/2026/07/09/amazon-fake-products-2026-spot-avoid/';
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

function assertBuiltHtml() {
  const htmlPath = path.join(site, '2026/07/09/amazon-fake-products-2026-spot-avoid/index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const first = html.indexOf('<strong>Direct answer:</strong>');
  const afterQuote = html.indexOf('</blockquote>', first);
  const box = html.indexOf('id="mid-briefing-form"');
  const second = html.indexOf('<strong>Direct answer:</strong>', first + 1);
  check(first !== -1 && afterQuote !== -1 && box > afterQuote && second !== -1 && box < second, 'mid-post box sits after the first Direct answer and before the next one');
  check(html.includes('Get one scam breakdown a week, free. Unsubscribe in one click.'), 'mid-post copy');
  check(html.includes('data-newsletter-placement="mid_post"'), 'mid-post placement attribute');
  check(html.includes('data-newsletter-src="mid-post"'), 'mid-post src attribute');
  check(html.includes('action="https://sendfox.com/form/3z6ooe/1ydnre"'), 'SendFox action kept');
  check((html.match(/data-newsletter-placement="post_end"/g) || []).length === 1, 'end-of-post form still present once');
  check((html.match(/data-newsletter-placement="sidebar"/g) || []).length === 1, 'sidebar form still present once');
  check(!html.includes('data-newsletter-placement="home"'), 'homepage form is not on the post');
  check(!html.includes('g-recaptcha') && !html.includes('recaptcha-token'), 'no reCAPTCHA token field');

  const ids = [];
  const idRe = /\sid="([^"]+)"/g;
  let idMatch;
  while ((idMatch = idRe.exec(html))) ids.push(idMatch[1]);
  const dupes = ids.filter((id, index) => ids.indexOf(id) !== index);
  check(dupes.length === 0, 'built page has unique ids (' + dupes.join(',') + ')');
}

async function main() {
  if (!fs.existsSync(path.join(site, '2026/07/09/amazon-fake-products-2026-spot-avoid/index.html'))) {
    console.error('Missing Jekyll build. Run: bundle exec jekyll build');
    process.exit(1);
  }
  fs.mkdirSync(artifacts, { recursive: true });
  assertBuiltHtml();

  const port = 8766;
  const server = await startServer(port);
  const browser = await chromium.launch();
  const hits = [];
  const sendfoxUrls = [];

  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
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
    await page.addInitScript(() => {
      // The page installs its own gtag stub on first click, which only
      // pushes onto dataLayer. Record those pushes and run event_callback
      // the way gtag.js does once the library has loaded.
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

    async function openPost() {
      hits.length = 0;
      page._dialogs = [];
      await page.goto('http://127.0.0.1:' + port + postPath, { waitUntil: 'networkidle' });
      await page.evaluate(() => sessionStorage.removeItem('gtag-events'));
    }

    function formLoc(id) {
      return page.locator('[id="' + id + '"]');
    }

    async function shot(name) {
      await page.evaluate(() => {
        const box = document.querySelector('.newsletter-signup');
        const top = box.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, Math.max(0, top - 160));
      });
      await page.screenshot({ path: path.join(artifacts, name) });
    }

    await openPost();

    const layout = await page.evaluate(() => {
      const form = document.getElementById('mid-briefing-form');
      const input = form.querySelector('input[type="email"]');
      const label = form.querySelector('label[for="' + input.id + '"]');
      const heading = document.getElementById('mid-briefing-heading');
      const button = form.querySelector('button[type="submit"]');
      const labelRect = label.getBoundingClientRect();
      const ids = Array.from(document.querySelectorAll('[id]')).map((el) => el.id);
      const dupes = ids.filter((id, index) => ids.indexOf(id) !== index);
      const honeypot = form.querySelector('input[name="company_website"]');
      const honeyRect = honeypot.getBoundingClientRect();
      return {
        action: form.getAttribute('action'),
        placement: form.getAttribute('data-newsletter-placement'),
        src: form.getAttribute('data-newsletter-src'),
        subscribed: form.getAttribute('data-newsletter-subscribed'),
        recaptcha: form.getAttribute('data-recaptcha'),
        bound: form.dataset.newsletterBound || '',
        copy: form.parentElement.querySelector('p').textContent,
        heading: heading.textContent,
        headingFont: getComputedStyle(heading).fontSize,
        headingMarginTop: getComputedStyle(heading).marginTop,
        button: button.textContent,
        inputFont: getComputedStyle(input).fontSize,
        autocomplete: input.getAttribute('autocomplete'),
        label: label.textContent,
        labelW: labelRect.width,
        labelH: labelRect.height,
        honeyLeft: honeyRect.left,
        dupes,
        placements: Array.from(document.querySelectorAll('form[data-newsletter-placement]')).map((el) => el.getAttribute('data-newsletter-placement'))
      };
    });

    check(layout.action === 'https://sendfox.com/form/3z6ooe/1ydnre', 'form posts to the SendFox form (' + layout.action + ')');
    check(layout.placement === 'mid_post', 'placement is mid_post');
    check(layout.src === 'mid-post', 'src is mid-post');
    check(layout.subscribed === '/subscribed', 'redirect base is /subscribed (' + layout.subscribed + ')');
    check(layout.recaptcha === 'false', 'reCAPTCHA flag stays false');
    check(layout.bound === '1', 'shared handler bound the mid-post form');
    check(layout.copy === 'Get one scam breakdown a week, free. Unsubscribe in one click.', 'visible copy');
    check(layout.heading === 'Security Briefing', 'heading matches the other boxes');
    check(layout.button === 'Get it free', 'button text');
    check(layout.inputFont === '16px', 'email input is 16px (' + layout.inputFont + ')');
    check(layout.autocomplete === 'email', 'autocomplete=email');
    check(layout.label === 'Email address', 'screen-reader label');
    check(layout.labelW <= 1 && layout.labelH <= 1, 'label is screen-reader only');
    check(layout.headingFont === '14px', 'heading stays text-sm inside prose (' + layout.headingFont + ')');
    check(layout.headingMarginTop === '0px', 'heading is not pushed down by prose margins');
    check(layout.honeyLeft < -1000, 'honeypot is off-screen');
    check(layout.dupes.length === 0, 'no duplicate ids on the live page');
    check(layout.placements.join(',') === 'mid_post,post_end,sidebar', 'post still has mid, end, and sidebar forms (' + layout.placements.join(',') + ')');

    await shot('mid_post_signup_desktop.png');

    await page.setViewportSize({ width: 375, height: 812 });
    await shot('mid_post_signup_mobile.png');
    const at375 = await page.evaluate(() => ({
      doc: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      box: document.getElementById('mid-briefing-form').scrollWidth - document.getElementById('mid-briefing-form').clientWidth
    }));
    check(at375.doc <= 1 && at375.box <= 1, 'no horizontal overflow at 375px (' + JSON.stringify(at375) + ')');

    await page.setViewportSize({ width: 320, height: 700 });
    await shot('mid_post_signup_mobile_320.png');
    const at320 = await page.evaluate(() => {
      const form = document.getElementById('mid-briefing-form');
      const input = form.querySelector('input[type="email"]');
      return {
        doc: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        box: form.scrollWidth - form.clientWidth,
        inputFont: getComputedStyle(input).fontSize
      };
    });
    check(at320.doc <= 1 && at320.box <= 1, 'no horizontal overflow at 320px (' + JSON.stringify(at320) + ')');
    check(at320.inputFont === '16px', 'input stays 16px at 320px');
    await page.setViewportSize({ width: 1280, height: 900 });

    await formLoc('mid-briefing-form').locator('input[type="email"]').fill('reader@example.com');
    await formLoc('mid-briefing-form').locator('button').click();
    const fast = await formLoc('mid-briefing-form').evaluate((form) => {
      const btn = form.querySelector('button[type="submit"]');
      return { button: btn.textContent, dropped: form.dataset.newsletterDropped || '' };
    });
    check(hits.length === 0, 'fast mid-post submit does not call SendFox');
    check(fast.button === 'Check email' && fast.dropped === '1', 'fast submit uses the shared guard (' + JSON.stringify(fast) + ')');
    check(page.url().includes(postPath), 'fast submit stays on the post');

    await openPost();
    await page.clock.fastForward(4000);
    await formLoc('mid-briefing-form').locator('input[name="company_website"]').evaluate((el) => { el.value = 'https://spam.example'; });
    await formLoc('mid-briefing-form').locator('input[type="email"]').fill('reader@example.com');
    await formLoc('mid-briefing-form').locator('button').click();
    check(hits.length === 0, 'filled honeypot does not call SendFox');
    check(page.url().includes(postPath), 'honeypot submit stays on the post');

    async function expectSignup(formId, placement, src) {
      await openPost();
      await page.clock.fastForward(4000);
      await page.evaluate((id) => {
        sessionStorage.removeItem('bubble-submits');
        const form = document.getElementById(id);
        form.addEventListener('submit', () => {
          const prev = Number(sessionStorage.getItem('bubble-submits') || '0');
          sessionStorage.setItem('bubble-submits', String(prev + 1));
        });
      }, formId);
      await formLoc(formId).locator('input[type="email"]').fill('reader@example.com');
      const click = formLoc(formId).locator('button').click();
      await page.waitForURL((url) => url.pathname.replace(/\/$/, '').endsWith('/subscribed') && url.searchParams.get('src') === src);
      await click;
      check(hits.length === 1, placement + ' posts exactly once (' + hits.length + ')');
      const parsed = parseBody(hits[0].body);
      check(parsed.email === 'reader@example.com', placement + ' posts the email');
      check(parsed.password === '', placement + ' posts an empty a_password');
      check(parsed.website === null, placement + ' does not post company_website');
      check(hits[0].method === 'POST', placement + ' uses POST');
      check(isSendFoxSignupUrl(hits[0].url), placement + ' posts to the exact SendFox URL');
      const events = await page.evaluate(() => JSON.parse(sessionStorage.getItem('gtag-events') || '[]'));
      const signups = events.filter((event) => event[1] === 'newsletter_signup');
      check(signups.length === 1, placement + ' fires newsletter_signup once (' + JSON.stringify(signups) + ')');
      check(signups[0] && signups[0][2] && signups[0][2].placement === placement, placement + ' GA placement is ' + placement);
      check((await page.evaluate(() => Number(sessionStorage.getItem('bubble-submits') || '0'))) === 0, placement + ' capture handler stops a second submit listener');
      check((page._dialogs || []).length === 0, placement + ' success shows no alert');
    }

    await expectSignup('mid-briefing-form', 'mid_post', 'mid-post');
    await expectSignup('1ydnre', 'sidebar', 'sidebar');

    await page.setViewportSize({ width: 375, height: 812 });
    await expectSignup('inline-briefing-form', 'post_end', 'post-end');

    const leaked = sendfoxUrls.filter((url) => sendFoxGate(url) === 'other');
    check(leaked.length === 0, 'no sendfox host request escaped the stub (' + leaked.join(',') + ')');
    check(sendfoxUrls.every((url) => sendFoxGate(url) !== 'other'), 'every sendfox request was stubbed or aborted');
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  if (failures.length) {
    console.error('\n' + failures.length + ' check(s) failed');
    process.exit(1);
  }
  console.log('\nAll mid-post signup checks passed');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

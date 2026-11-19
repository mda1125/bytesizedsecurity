/* Checks the sidebar Security Briefing form on a built post page.
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

function assertSources() {
  const sidebar = fs.readFileSync(path.join(root, '_includes/sidebar.html'), 'utf8');
  const inline = fs.readFileSync(path.join(root, '_includes/newsletter-inline.html'), 'utf8');
  const signup = fs.readFileSync(path.join(root, '_includes/newsletter-signup.html'), 'utf8');
  const home = fs.readFileSync(path.join(root, '_layouts/home.html'), 'utf8');
  const guard = fs.readFileSync(path.join(root, '_includes/newsletter-form.js'), 'utf8');

  check(sidebar.includes('action="https://sendfox.com/form/3z6ooe/1ydnre"'), 'sidebar action stays on the SendFox form');
  check(sidebar.includes('data-newsletter-placement="sidebar"'), 'sidebar placement attribute');
  check(sidebar.includes('data-newsletter-src="sidebar"'), 'sidebar src attribute');
  check(sidebar.includes('name="email"'), 'sidebar email field name');
  check(sidebar.includes('id="sidebar-company-website"'), 'sidebar honeypot id');
  check(sidebar.includes('>Get it free</button>'), 'sidebar button text');
  check(sidebar.includes('<label for="sendfox_form_email" class="sr-only">Email address</label>'), 'sidebar label for matches the input id');
  check(sidebar.includes('type="email"'), 'sidebar input type');
  check(sidebar.includes('autocomplete="email"'), 'sidebar autocomplete');
  check(sidebar.includes('inputmode="email"'), 'sidebar inputmode');
  check(sidebar.includes('required'), 'sidebar required');
  check(sidebar.includes('text-base'), 'sidebar input uses text-base');

  check(inline.includes('class="h-11 bg-white dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-700 text-base px-3 focus:ring-1 focus:ring-primary focus:border-primary w-full"'), 'end-of-post input classes unchanged');
  check(inline.includes('aria-label="Email address"'), 'end-of-post accessible name unchanged');
  check(!inline.includes('inputmode="email"'), 'end-of-post inputmode left alone');
  check(signup.includes('class="h-11 bg-white dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-700 text-base px-3 focus:ring-1 focus:ring-primary focus:border-primary w-full"'), 'mid-post input classes unchanged');
  check(signup.includes('class="sr-only">Email address</label>'), 'mid-post screen-reader label unchanged');
  check(!signup.includes('inputmode="email"'), 'mid-post inputmode left alone');
  check(home.includes('class="h-10 bg-white dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-700 text-sm px-3 focus:ring-1 focus:ring-primary focus:border-primary flex-1 max-[375px]:min-w-0 sm:w-48"'), 'homepage input classes unchanged');

  check(guard.includes('var MIN_MS = 3000;'), 'shared guard still waits 3 seconds');
  check(guard.includes("window.gtag('event', 'newsletter_signup'"), 'shared guard still fires newsletter_signup');
  check(guard.includes("'?src='"), 'shared guard still redirects with src');
}

function duplicateIds(html) {
  const ids = [];
  const idRe = /\sid="([^"]+)"/g;
  let idMatch;
  while ((idMatch = idRe.exec(html))) ids.push(idMatch[1]);
  return ids.filter((id, index) => ids.indexOf(id) !== index);
}

async function main() {
  const builtPost = path.join(site, '2026/07/09/amazon-fake-products-2026-spot-avoid/index.html');
  if (!fs.existsSync(builtPost)) {
    console.error('Missing Jekyll build. Run: bundle exec jekyll build');
    process.exit(1);
  }
  fs.mkdirSync(artifacts, { recursive: true });
  assertSources();

  const postHtml = fs.readFileSync(builtPost, 'utf8');
  check(duplicateIds(postHtml).length === 0, 'built post has unique ids (' + duplicateIds(postHtml).join(',') + ')');
  check((postHtml.match(/id="sendfox_form_email"/g) || []).length === 1, 'sidebar email id appears once on the post');
  check(postHtml.includes('for="sendfox_form_email"'), 'built post ties the label to the sidebar input');
  check(postHtml.includes('data-newsletter-placement="sidebar"'), 'built post keeps the sidebar placement');
  const homeHtml = fs.readFileSync(path.join(site, 'index.html'), 'utf8');
  check(duplicateIds(homeHtml).length === 0, 'built homepage has unique ids (' + duplicateIds(homeHtml).join(',') + ')');
  check((homeHtml.match(/id="sendfox_form_email"/g) || []).length === 1, 'homepage sidebar email id appears once');

  const port = 8767;
  const server = await startServer(port);
  const browser = await chromium.launch();
  const hits = [];
  const sendfoxUrls = [];
  let subscribedNavs = 0;

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

    async function openPost() {
      hits.length = 0;
      subscribedNavs = 0;
      page._dialogs = [];
      await page.goto('http://127.0.0.1:' + port + postPath, { waitUntil: 'networkidle' });
      await page.evaluate(() => sessionStorage.removeItem('gtag-events'));
    }

    async function measureSidebar() {
      return page.evaluate(() => {
        const form = document.getElementById('1ydnre');
        const input = form.querySelector('input[name="email"]');
        const label = form.querySelector('label[for="' + input.id + '"]');
        const labelRect = label.getBoundingClientRect();
        const copy = form.parentElement.querySelector('p');
        const button = form.querySelector('button[type="submit"]');
        const ids = Array.from(document.querySelectorAll('[id]')).map((el) => el.id);
        const dupes = ids.filter((id, index) => ids.indexOf(id) !== index);
        const card = form.parentElement;
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
          gap: input.getBoundingClientRect().top - copy.getBoundingClientRect().bottom,
          button: button.textContent.trim(),
          action: form.getAttribute('action'),
          placement: form.getAttribute('data-newsletter-placement'),
          src: form.getAttribute('data-newsletter-src'),
          cardOverflow: card.scrollWidth - card.clientWidth,
          dupes
        };
      });
    }

    async function shot(name) {
      const card = page.locator('[id="1ydnre"]').locator('xpath=..');
      await card.scrollIntoViewIfNeeded();
      await card.screenshot({ path: path.join(artifacts, name) });
    }

    await openPost();
    const desktop = await measureSidebar();
    console.log('desktop ' + JSON.stringify(desktop));
    check(parseFloat(desktop.fontSize) >= 16, 'desktop input font-size is at least 16px (' + desktop.fontSize + ')');
    check(desktop.fontSize === '16px', 'desktop input computes to 16px (' + desktop.fontSize + ')');
    check(desktop.height === '44px', 'desktop input keeps the 44px height (' + desktop.height + ')');
    check(desktop.type === 'email', 'input type is email');
    check(desktop.name === 'email', 'input name stays email');
    check(desktop.autocomplete === 'email', 'autocomplete is email');
    check(desktop.inputmode === 'email', 'inputmode is email');
    check(desktop.required === true, 'input is required');
    check(desktop.id === 'sendfox_form_email', 'input id stays sendfox_form_email');
    check(desktop.labelFor === 'sendfox_form_email', 'label for matches the input id');
    check(desktop.labelText === 'Email address', 'label text');
    check(desktop.accCount === 1 && desktop.accName === 'Email address', 'accessible name comes from the label (' + desktop.accName + ')');
    check(desktop.labelW <= 1 && desktop.labelH <= 1, 'label is screen-reader only (' + desktop.labelW + 'x' + desktop.labelH + ')');
    check(desktop.gap >= 8 && desktop.gap <= 16, 'hidden label does not push the input down (' + desktop.gap + 'px)');
    check(desktop.button === 'Get it free', 'button text');
    check(desktop.action === 'https://sendfox.com/form/3z6ooe/1ydnre', 'form action');
    check(desktop.placement === 'sidebar', 'placement is sidebar');
    check(desktop.src === 'sidebar', 'src is sidebar');
    check(desktop.dupes.length === 0, 'no duplicate ids on the live post');
    check(desktop.cardOverflow <= 1, 'sidebar card does not overflow at desktop (' + desktop.cardOverflow + ')');
    await shot('sidebar_signup_after_desktop.png');

    const others = await page.evaluate(() => {
      function read(id) {
        const form = document.getElementById(id);
        const input = form.querySelector('input[type="email"]');
        return {
          fontSize: getComputedStyle(input).fontSize,
          autocomplete: input.getAttribute('autocomplete'),
          inputmode: input.getAttribute('inputmode'),
          className: input.className
        };
      }
      return { mid: read('mid-briefing-form'), inline: read('inline-briefing-form') };
    });
    check(others.mid.fontSize === '16px' && others.mid.className.includes('text-base') && others.mid.inputmode === null, 'mid-post input still renders at 16px (' + JSON.stringify(others.mid) + ')');
    check(others.inline.fontSize === '16px' && others.inline.className.includes('text-base') && others.inline.inputmode === null, 'end-of-post input still renders at 16px (' + JSON.stringify(others.inline) + ')');

    await page.setViewportSize({ width: 375, height: 812 });
    const mobile = await measureSidebar();
    console.log('375 ' + JSON.stringify(mobile));
    check(parseFloat(mobile.fontSize) >= 16, '375px input font-size is at least 16px (' + mobile.fontSize + ')');
    check(mobile.fontSize === '16px', '375px input computes to 16px (' + mobile.fontSize + ')');
    check(mobile.height === '44px', '375px input keeps the 44px height');
    check(mobile.autocomplete === 'email' && mobile.inputmode === 'email', '375px keeps email autofill attributes');
    check(mobile.accName === 'Email address', '375px accessible name');
    check(mobile.labelW <= 1 && mobile.labelH <= 1, '375px label stays screen-reader only');
    check(mobile.cardOverflow <= 1, 'sidebar card does not overflow at 375px (' + mobile.cardOverflow + ')');
    await shot('sidebar_signup_after_375.png');

    await page.setViewportSize({ width: 320, height: 700 });
    const narrow = await measureSidebar();
    check(narrow.fontSize === '16px', '320px input stays 16px (' + narrow.fontSize + ')');
    check(narrow.cardOverflow <= 1, 'sidebar card does not overflow at 320px (' + narrow.cardOverflow + ')');

    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://127.0.0.1:' + port + '/', { waitUntil: 'networkidle' });
    const home = await page.evaluate(() => {
      const homeInput = document.querySelector('#home-briefing-form input[name="email"]');
      const sideInput = document.getElementById('1ydnre').querySelector('input[name="email"]');
      return {
        homeFont: getComputedStyle(homeInput).fontSize,
        homeClass: homeInput.className,
        sideFont: getComputedStyle(sideInput).fontSize
      };
    });
    check(home.homeFont === '14px' && home.homeClass.includes('text-sm'), 'homepage input still renders at 14px (' + home.homeFont + ')');
    check(home.sideFont === '16px', 'homepage sidebar input is 16px (' + home.sideFont + ')');

    await page.setViewportSize({ width: 1280, height: 900 });
    await openPost();
    await page.locator('[id="1ydnre"] input[name="email"]').fill('reader@example.com');
    await page.locator('[id="1ydnre"] button[type="submit"]').click();
    const fast = await page.locator('[id="1ydnre"]').evaluate((form) => {
      const btn = form.querySelector('button[type="submit"]');
      return { button: btn.textContent, dropped: form.dataset.newsletterDropped || '' };
    });
    check(hits.length === 0, 'fast sidebar submit does not call SendFox');
    check(fast.button === 'Check email' && fast.dropped === '1', 'fast submit still uses the shared guard (' + JSON.stringify(fast) + ')');
    check(page.url().includes(postPath), 'fast submit stays on the post');

    await openPost();
    await page.clock.fastForward(4000);
    await page.locator('[id="1ydnre"] input[name="email"]').fill('reader@example.com');
    const click = page.locator('[id="1ydnre"] button[type="submit"]').click();
    await page.waitForURL((url) => url.pathname.replace(/\/$/, '').endsWith('/subscribed') && url.searchParams.get('src') === 'sidebar');
    await click;
    await page.clock.fastForward(1000);
    check(hits.length === 1, 'sidebar posts exactly once (' + hits.length + ')');
    const parsed = parseBody(hits[0].body);
    check(parsed.email === 'reader@example.com', 'sidebar posts the email');
    check(parsed.password === '', 'sidebar posts an empty a_password');
    check(parsed.website === null, 'sidebar does not post company_website');
    check(hits[0].method === 'POST', 'sidebar uses POST');
    check(isSendFoxSignupUrl(hits[0].url), 'sidebar posts to the exact SendFox URL');
    const events = await page.evaluate(() => JSON.parse(sessionStorage.getItem('gtag-events') || '[]'));
    const signups = events.filter((event) => event[1] === 'newsletter_signup');
    check(signups.length === 1, 'sidebar fires newsletter_signup once (' + JSON.stringify(signups) + ')');
    check(signups[0] && signups[0][2] && signups[0][2].placement === 'sidebar', 'GA placement is sidebar');
    check(subscribedNavs === 1, 'sidebar redirects once (' + subscribedNavs + ')');
    check(page.url().includes('/subscribed?src=sidebar'), 'redirect URL keeps src=sidebar (' + page.url() + ')');
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
  console.log('\nAll sidebar signup checks passed');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

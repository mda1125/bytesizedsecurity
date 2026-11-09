/* Local check for the newsletter bot filter.
   Sends nothing to SendFox. The route stub parses each URL and only
   fulfills https://sendfox.com/form/3z6ooe/1ydnre. Any other request
   whose host is exactly sendfox.com or cdn.sendfox.com is aborted. */
const { chromium } = require('playwright');
const fs = require('fs');
const http = require('http');
const path = require('path');

const root = path.join(__dirname, '..');
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

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

// Hosts are compared after URL parsing. A substring check would also
// match sendfox.com.evil.example and https://evil.example/?q=sendfox.com.
const SENDFOX_SIGNUP_HOST = 'sendfox.com';
const SENDFOX_SIGNUP_PATH = '/form/3z6ooe/1ydnre';
const SENDFOX_SCRIPT_HOST = 'cdn.sendfox.com';
const SENDFOX_SCRIPT_PATH = '/js/form.js';

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

function isSendFoxFormScript(raw) {
  return isExactHttps(raw, SENDFOX_SCRIPT_HOST, SENDFOX_SCRIPT_PATH);
}

// signup: stub the newsletter POST. blocked: do not let any other
// request for these hosts reach the network. other: leave it alone.
function sendFoxGate(raw) {
  const parsed = parsedUrl(raw);
  if (!parsed) return 'other';
  const knownHost = parsed.hostname === SENDFOX_SIGNUP_HOST || parsed.hostname === SENDFOX_SCRIPT_HOST;
  if (!knownHost) return 'other';
  if (isSendFoxSignupUrl(raw)) return 'signup';
  return 'blocked';
}

function attributeValues(html, attrName) {
  const marker = attrName + '="';
  const values = [];
  let from = 0;
  while (from < html.length) {
    const start = html.indexOf(marker, from);
    if (start === -1) break;
    const valueStart = start + marker.length;
    const end = html.indexOf('"', valueStart);
    if (end === -1) break;
    values.push(html.slice(valueStart, end));
    from = end + 1;
  }
  return values;
}

function assertUrlGate() {
  check(isSendFoxSignupUrl('https://sendfox.com/form/3z6ooe/1ydnre'), 'exact signup URL is allowed');
  check(isSendFoxFormScript('https://cdn.sendfox.com/js/form.js'), 'exact form.js URL is recognized');
  [
    'http://sendfox.com/form/3z6ooe/1ydnre',
    'https://sendfox.com.evil.example/form/3z6ooe/1ydnre',
    'https://evil.example/form/3z6ooe/1ydnre?x=sendfox.com',
    'https://evil.example/?next=https://sendfox.com/form/3z6ooe/1ydnre',
    'https://notsendfox.com/form/3z6ooe/1ydnre',
    'https://user:pass@sendfox.com/form/3z6ooe/1ydnre',
    'https://sendfox.com/form/other',
    'https://sendfox.com/form/3z6ooe/1ydnre/extra',
    'https://sendfox.com/form/3z6ooe/1ydnre?src=1',
    'https://cdn.sendfox.com/js/form.js',
    'https://sendfox.com/js/form.js'
  ].forEach(function (raw) {
    check(!isSendFoxSignupUrl(raw), 'signup gate rejects ' + raw);
  });
  check(!isSendFoxFormScript('https://cdn.sendfox.com.evil.example/js/form.js'), 'form.js gate rejects a lookalike host');
  check(sendFoxGate('https://sendfox.com/form/3z6ooe/1ydnre') === 'signup', 'signup URL is stubbed');
  check(sendFoxGate('https://sendfox.com/privacy') === 'blocked', 'other sendfox.com URLs are not fetched');
  check(sendFoxGate('https://cdn.sendfox.com/js/form.js') === 'blocked', 'form.js CDN is not fetched by the stub');
  check(sendFoxGate('https://evil.example/?q=sendfox.com') === 'other', 'unrelated hosts are not treated as SendFox');
}

function assertSource() {
  const home = read('_layouts/home.html');
  const sidebar = read('_includes/sidebar.html');
  const inline = read('_includes/newsletter-inline.html');
  const guard = read('_includes/newsletter-form.js');
  const hp = read('_includes/newsletter-honeypot.html');
  const layout = read('_layouts/default.html');

  check(home.includes('max-[375px]:min-w-0'), 'homepage keeps max-[375px]:min-w-0');
  check(home.includes('class="h-10 bg-white dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-700 text-sm px-3 focus:ring-1 focus:ring-primary focus:border-primary flex-1 max-[375px]:min-w-0 sm:w-48"'), 'homepage email input classes unchanged');
  check(home.includes('>Get it free</button>'), 'homepage button text');
  check(home.includes('data-newsletter-placement="home"'), 'homepage placement');
  check(home.includes('data-newsletter-src="home"'), 'homepage src');
  check(home.includes("data-newsletter-subscribed=\"{{ '/subscribed' | relative_url }}\""), 'homepage redirect base');
  check(!home.includes('name="a_password"'), 'homepage does not post a visible a_password field');
  check(!home.includes('newsletter_signup'), 'homepage no longer inlines the GA handler');

  check(sidebar.includes('id="sendfox_form_email" name="email" required placeholder="email@domain.com" class="h-11 bg-white dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-700 text-sm px-3 focus:ring-1 focus:ring-primary focus:border-primary w-full"'), 'sidebar email field styling unchanged');
  check(sidebar.includes('data-newsletter-placement="sidebar"') && sidebar.includes('data-newsletter-src="sidebar"'), 'sidebar placement and src');
  check(attributeValues(sidebar, 'src').some(isSendFoxFormScript), 'sidebar still loads form.js');
  check(!sidebar.includes('newsletter_signup'), 'sidebar no longer inlines the GA handler');

  check(inline.includes('data-newsletter-placement="post_end"'), 'end-of-post placement');
  check(inline.includes('data-newsletter-src="post-end"'), 'end-of-post src keeps the hyphen');
  check(inline.includes('autocomplete="email"'), 'end-of-post email autocomplete kept');
  check(inline.includes('>Get it free</button>'), 'end-of-post button text');

  for (const file of [home, sidebar, inline]) {
    check(file.includes('newsletter-honeypot.html'), 'form includes the shared honeypot');
    check(attributeValues(file, 'action').some(isSendFoxSignupUrl), 'SendFox action kept');
    check(file.includes('if(!this.dataset.newsletterBound){event.preventDefault();event.stopImmediatePropagation();}'), 'early submit shield');
  }

  check(hp.includes('name="company_website"'), 'honeypot name');
  check(hp.includes('autocomplete="off"'), 'honeypot autocomplete off');
  check(hp.includes('tabindex="-1"'), 'honeypot not tabbable');
  check(hp.includes('aria-hidden="true"'), 'honeypot hidden from assistive tech');
  check(hp.includes('left: -5000px'), 'honeypot off-screen');
  check(hp.includes('Company website'), 'honeypot label is a plausible field');

  check(layout.includes('{% include newsletter-form.js %}'), 'guard script included once from the default layout');
  check(guard.includes('var MIN_MS = 3000;'), 'three second floor');
  check(guard.includes('body.delete(HONEYPOT)'), 'honeypot stripped before post');
  check(guard.includes("body.append('a_password', '')"), 'empty a_password preserves the known-good body');
  check(guard.includes("btn.textContent = 'Get it free'"), 'error path restores the button label');
  check(guard.includes("btn.textContent = 'Check email'"), 'dropped submit pretends success in place');
  check(guard.includes('addEventListener(\'submit\', onSubmit, true)'), 'capture listener blocks form.js');
  check(!guard.includes('\u2014'), 'guard script has no em dash');
  check(!hp.includes('\u2014'), 'honeypot markup has no em dash');
}

function honeypot(id) {
  return read('_includes/newsletter-honeypot.html')
    .replace(/\{%- comment -%\}[\s\S]*?\{%- endcomment -%\}/, '')
    .replaceAll('{{ include.id }}', id);
}

function formHtml(opts) {
  return [
    '<form method="post" action="https://sendfox.com/form/3z6ooe/1ydnre"',
    ' class="' + opts.className + '" id="' + opts.id + '"',
    ' data-async="true" data-recaptcha="false"',
    ' data-newsletter-placement="' + opts.placement + '"',
    ' data-newsletter-src="' + opts.src + '"',
    ' data-newsletter-subscribed="/scripts/fixtures/subscribed-stub.html"',
    ' onsubmit="if(!this.dataset.newsletterBound){event.preventDefault();event.stopImmediatePropagation();}">',
    opts.email,
    honeypot(opts.honeypotId),
    '<button type="submit" class="' + opts.buttonClass + '">Get it free</button>',
    '</form>'
  ].join('');
}

function fixtureHtml() {
  const homeEmail = '<input type="email" name="email" required placeholder="email@domain.com" class="h-10 bg-white dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-700 text-sm px-3 focus:ring-1 focus:ring-primary focus:border-primary flex-1 max-[375px]:min-w-0 sm:w-48">';
  const stackEmail = '<input type="email" name="email" required placeholder="email@domain.com" class="h-11 bg-white border border-gray-300 text-sm px-3 w-full">';
  const button = 'h-10 px-4 bg-gray-900 text-white text-sm font-bold uppercase tracking-wide whitespace-nowrap';
  return '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<link rel="stylesheet" href="/assets/css/tailwind.min.css"></head><body class="bg-white p-4">' +
    '<h1 class="text-lg font-bold mb-4">Security Briefing forms</h1>' +
    '<section id="home-wrap" class="mb-8 border p-4 max-w-xl">' +
    '<h2 class="text-sm font-bold mb-2">Homepage</h2>' +
    formHtml({
      id: 'home-briefing-form',
      className: 'sendfox-form flex gap-2 w-full',
      placement: 'home',
      src: 'home',
      honeypotId: 'home-company-website',
      email: homeEmail,
      buttonClass: button
    }) +
    '</section>' +
    '<section id="inline-wrap" class="mb-8 border p-4 max-w-sm">' +
    '<h2 class="text-sm font-bold mb-2">End of post</h2>' +
    formHtml({
      id: 'inline-briefing-form',
      className: 'flex flex-col gap-3',
      placement: 'post_end',
      src: 'post-end',
      honeypotId: 'inline-company-website',
      email: stackEmail,
      buttonClass: button + ' h-11'
    }) +
    '</section>' +
    '<section id="sidebar-wrap" class="mb-8 border p-4 max-w-xs">' +
    '<h2 class="text-sm font-bold mb-2">Sidebar</h2>' +
    formHtml({
      id: '1ydnre',
      className: 'sendfox-form flex flex-col gap-3',
      placement: 'sidebar',
      src: 'sidebar',
      honeypotId: 'sidebar-company-website',
      email: stackEmail.replace('type="email"', 'type="email" id="sendfox_form_email"'),
      buttonClass: button + ' h-11 w-full'
    }) +
    '</section>' +
    '<script defer src="/scripts/fixtures/fake-form.js"></script>' +
    '<script>' + read('_includes/newsletter-form.js') + '</script>' +
    '</body></html>';
}

function startServer(port) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1');
    let rel = decodeURIComponent(url.pathname);
    if (rel === '/') rel = '/scripts/fixtures/newsletter-guard.html';
    const file = path.join(root, rel);
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404);
      res.end('missing');
      return;
    }
    const ext = path.extname(file);
    const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
    res.writeHead(200, { 'content-type': types[ext] || 'application/octet-stream' });
    res.end(fs.readFileSync(file));
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)));
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

async function main() {
  assertSource();
  assertUrlGate();
  fs.mkdirSync(path.join(root, 'scripts/fixtures'), { recursive: true });
  fs.writeFileSync(path.join(root, 'scripts/fixtures/newsletter-guard.html'), fixtureHtml());

  const port = 8765;
  const server = await startServer(port);
  const browser = await chromium.launch();
  const hits = [];
  let nextStatus = 200;
  let nextBody = '{}';
  let fulfillDelayMs = 0;

  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.clock.install({ time: new Date('2026-11-09T12:00:00Z') });
    await page.route('**/*', async (route) => {
      const url = route.request().url();
      const gate = sendFoxGate(url);
      if (gate === 'signup') {
        hits.push({
          url,
          method: route.request().method(),
          body: route.request().postData() || ''
        });
        if (fulfillDelayMs) await new Promise((resolve) => setTimeout(resolve, fulfillDelayMs));
        await route.fulfill({
          status: nextStatus,
          contentType: 'application/json',
          body: nextBody
        });
        return;
      }
      if (gate === 'blocked') {
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

    const gtagCallsBack = () => {
      window.gtag = function () {
        const args = Array.from(arguments);
        const serial = JSON.parse(JSON.stringify(args, (key, value) => (
          typeof value === 'function' ? '__fn__' : value
        )));
        const prev = JSON.parse(sessionStorage.getItem('gtag-events') || '[]');
        prev.push(serial);
        sessionStorage.setItem('gtag-events', JSON.stringify(prev));
        const params = args[2];
        if (params && typeof params.event_callback === 'function') params.event_callback();
      };
    };
    await page.addInitScript(gtagCallsBack);

    async function openFixture() {
      hits.length = 0;
      page._dialogs = [];
      nextStatus = 200;
      nextBody = '{}';
      fulfillDelayMs = 0;
      await page.goto('http://127.0.0.1:' + port + '/scripts/fixtures/newsletter-guard.html', { waitUntil: 'load' });
      await page.evaluate(() => sessionStorage.removeItem('gtag-events'));
    }

    function formLoc(id) {
      return page.locator('[id="' + id + '"]');
    }

    async function state(id) {
      return formLoc(id).evaluate((form) => {
        const btn = form.querySelector('button[type="submit"]');
        const email = form.querySelector('input[type="email"]');
        return {
          button: btn.textContent,
          disabled: btn.disabled,
          readOnly: email.readOnly,
          dropped: form.dataset.newsletterDropped || '',
          bound: form.dataset.newsletterBound || ''
        };
      });
    }

    await openFixture();

    const hidden = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('input[name="company_website"]')).map((el) => {
        const rect = el.getBoundingClientRect();
        const wrap = el.closest('[aria-hidden]');
        return {
          id: el.id,
          left: rect.left,
          tab: el.tabIndex,
          autocomplete: el.getAttribute('autocomplete'),
          aria: wrap ? wrap.getAttribute('aria-hidden') : null,
          label: document.querySelector('label[for="' + el.id + '"]').textContent
        };
      });
    });
    check(hidden.length === 3, 'three honeypot fields rendered');
    hidden.forEach((field) => {
      check(field.left < -1000, field.id + ' is off-screen (' + field.left + ')');
      check(field.tab === -1, field.id + ' tabindex -1');
      check(field.autocomplete === 'off', field.id + ' autocomplete off');
      check(field.aria === 'true', field.id + ' aria-hidden');
      check(field.label === 'Company website', field.id + ' plausible label');
    });

    const labelBoxes = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('label')).filter((label) => label.textContent === 'Company website').map((label) => {
        const rect = label.getBoundingClientRect();
        return { left: rect.left, width: rect.width };
      });
    });
    check(labelBoxes.length === 3 && labelBoxes.every((box) => box.left + box.width < 0), 'honeypot labels sit fully off-screen (' + JSON.stringify(labelBoxes) + ')');
    check(await page.locator('button[type="submit"]').count() === 3, 'three Get it free buttons');
    const buttonLabels = await page.locator('button[type="submit"]').allTextContents();
    check(buttonLabels.every((label) => label === 'Get it free'), 'every submit button reads Get it free (' + JSON.stringify(buttonLabels) + ')');

    await page.screenshot({ path: path.join(artifacts, 'newsletter-forms-initial.png'), fullPage: true });

    await page.setViewportSize({ width: 320, height: 700 });
    const narrow = await page.evaluate(() => {
      const form = document.getElementById('home-briefing-form');
      const input = form.querySelector('input[type="email"]');
      return {
        minWidth: getComputedStyle(input).minWidth,
        formOverflow: form.scrollWidth - form.clientWidth,
        docOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
      };
    });
    check(narrow.minWidth === '0px', 'homepage input min-width is 0 at 320px (' + narrow.minWidth + ')');
    check(narrow.formOverflow <= 1, 'homepage form does not overflow at 320px (' + narrow.formOverflow + ')');
    check(narrow.docOverflow <= 1, 'page does not overflow at 320px (' + narrow.docOverflow + ')');
    await page.screenshot({ path: path.join(artifacts, 'newsletter-home-320.png') });
    await page.setViewportSize({ width: 1280, height: 900 });

    await formLoc('1ydnre').locator('input[type="email"]').fill('reader@example.com');
    await formLoc('1ydnre').locator('button').click();
    const fast = await state('1ydnre');
    check(hits.length === 0, 'fast sidebar submit does not call SendFox');
    check(fast.button === 'Check email' && fast.disabled && fast.dropped === '1', 'fast submit pretends success (' + JSON.stringify(fast) + ')');
    check(page.url().includes('newsletter-guard.html'), 'fast submit stays on the page');
    const gtagAfterFast = await page.evaluate(() => JSON.parse(sessionStorage.getItem('gtag-events') || '[]'));
    check(gtagAfterFast.length === 0, 'fast submit does not fire newsletter_signup');
    const formJsAfterFast = await page.evaluate(() => window.__formJsPosts || 0);
    check(formJsAfterFast === 0, 'form.js does not also submit the fast attempt');
    await page.screenshot({ path: path.join(artifacts, 'newsletter-fast-drop.png'), fullPage: true });

    await page.clock.fastForward(4000);
    await formLoc('1ydnre').evaluate((form) => {
      form.querySelector('input[type="email"]').value = 'reader-later@example.com';
      form.requestSubmit();
    }).catch(() => {});
    await formLoc('1ydnre').evaluate((form) => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
    check(hits.length === 0, 'latched form stays dropped after the timer elapses');

    await openFixture();
    await page.clock.fastForward(4000);
    await formLoc('home-briefing-form').locator('input[name="company_website"]').evaluate((el) => { el.value = 'https://spam.example'; });
    await formLoc('home-briefing-form').locator('input[type="email"]').fill('reader@example.com');
    await formLoc('home-briefing-form').locator('button').click();
    check(hits.length === 0, 'filled honeypot does not call SendFox');
    const honey = await state('home-briefing-form');
    check(honey.button === 'Check email' && honey.dropped === '1', 'honeypot pretends success');
    check((await page.evaluate(() => JSON.parse(sessionStorage.getItem('gtag-events') || '[]'))).length === 0, 'honeypot does not fire newsletter_signup');
    check(page.url().includes('newsletter-guard.html'), 'honeypot submit stays on the page');
    await page.screenshot({ path: path.join(artifacts, 'newsletter-honeypot-drop.png'), fullPage: true });

    await openFixture();
    await page.clock.fastForward(4000);
    await formLoc('inline-briefing-form').locator('input[name="company_website"]').evaluate((el) => { el.value = '   '; });
    await formLoc('inline-briefing-form').locator('input[type="email"]').fill('reader@example.com');
    await formLoc('inline-briefing-form').locator('button').click();
    check(hits.length === 0, 'whitespace honeypot is treated as filled');

    async function expectSignup(formId, placement, src) {
      await openFixture();
      await page.clock.fastForward(4000);
      await formLoc(formId).locator('input[type="email"]').fill('reader@example.com');
      const click = formLoc(formId).locator('button').click();
      await page.waitForURL((url) => url.pathname.endsWith('/subscribed-stub.html') && url.searchParams.get('src') === src);
      await click;
      check(hits.length === 1, placement + ' posts exactly once');
      const parsed = parseBody(hits[0].body);
      check(parsed.email === 'reader@example.com', placement + ' posts the email');
      check(parsed.password === '', placement + ' posts an empty a_password');
      check(parsed.website === null, placement + ' does not post company_website');
      check(parsed.keys.indexOf('company_website') === -1, placement + ' body keys omit the honeypot (' + parsed.keys.join(',') + ')');
      check(hits[0].method === 'POST', placement + ' uses POST');
      check(isSendFoxSignupUrl(hits[0].url), placement + ' posts to the exact SendFox form URL (' + hits[0].url + ')');
      const events = await page.evaluate(() => JSON.parse(sessionStorage.getItem('gtag-events') || '[]'));
      check(events.length === 1 && events[0][0] === 'event' && events[0][1] === 'newsletter_signup', placement + ' fires newsletter_signup (' + JSON.stringify(events) + ')');
      check(events[0] && events[0][2] && events[0][2].placement === placement, placement + ' GA placement is ' + placement);
      check((await page.evaluate(() => window.__formJsPosts || 0)) === 0, placement + ' does not double-submit via form.js');
    }

    await openFixture();
    await page.clock.fastForward(4000);
    fulfillDelayMs = 300;
    await formLoc('1ydnre').locator('input[type="email"]').fill('reader@example.com');
    const pendingClick = formLoc('1ydnre').locator('button').click();
    const subscribing = await page.waitForFunction(() => {
      const btn = document.querySelector('[id="1ydnre"] button');
      return btn && btn.textContent === 'Subscribing...' && btn.disabled === true;
    }).then(() => true).catch(() => false);
    check(subscribing, 'in-flight submit sets the button to Subscribing...');
    await pendingClick;
    fulfillDelayMs = 0;

    await expectSignup('1ydnre', 'sidebar', 'sidebar');
    await page.screenshot({ path: path.join(artifacts, 'newsletter-sidebar-success.png') });
    await expectSignup('home-briefing-form', 'home', 'home');
    await expectSignup('inline-briefing-form', 'post_end', 'post-end');

    async function waitForDialog(snippet) {
      const start = Date.now();
      while (Date.now() - start < 3000) {
        if ((page._dialogs || []).some((message) => message.indexOf(snippet) !== -1)) return;
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
      check(false, 'timed out waiting for dialog containing ' + snippet + ' (saw ' + JSON.stringify(page._dialogs) + ')');
    }

    await openFixture();
    await page.clock.fastForward(4000);
    nextStatus = 422;
    nextBody = JSON.stringify({ errors: ['Email is invalid'] });
    await formLoc('1ydnre').locator('input[type="email"]').fill('reader@example.com');
    await formLoc('1ydnre').locator('button').click();
    await waitForDialog('Email is invalid');
    const afterError = await state('1ydnre');
    check(afterError.button === 'Get it free' && afterError.disabled === false, '422 restores Get it free (' + JSON.stringify(afterError) + ')');
    check(page.url().includes('newsletter-guard.html'), '422 does not redirect');

    await openFixture();
    await page.clock.fastForward(4000);
    nextStatus = 500;
    nextBody = 'nope';
    await formLoc('home-briefing-form').locator('input[type="email"]').fill('reader@example.com');
    await formLoc('home-briefing-form').locator('button').click();
    await waitForDialog('Network error');
    check((await state('home-briefing-form')).button === 'Get it free', 'non-JSON error restores the label');

    await page.addInitScript(() => { window.gtag = undefined; });
    await openFixture();
    await page.evaluate(() => { window.gtag = undefined; });
    await page.clock.fastForward(4000);
    await formLoc('inline-briefing-form').locator('input[type="email"]').fill('reader@example.com');
    await formLoc('inline-briefing-form').locator('button').click();
    await page.waitForURL((url) => url.searchParams.get('src') === 'post-end');
    check(hits.length === 1, 'missing gtag still posts once and redirects');

    await page.screenshot({ path: path.join(artifacts, 'newsletter-redirect-stub.png') });
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
    fs.unlinkSync(path.join(root, 'scripts/fixtures/newsletter-guard.html'));
  }

  if (failures.length) {
    console.error('\n' + failures.length + ' check(s) failed');
    process.exit(1);
  }
  console.log('\nAll newsletter guard checks passed');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/* Shared submit handler for the three Security Briefing forms
   (sidebar, homepage, end of post).

   Bots that fill the on-page forms were creating unconfirmed SendFox
   subscribers. Two local checks run before anything is posted:

   1. Honeypot. The company_website field is off-screen. A person never
      sees it or fills it. If it has a value, the submit is dropped.
   2. Minimum fill time. The clock starts when this script runs, at the
      end of the body, once every form on the page has been parsed.
      Submits in the first 3 seconds after that are dropped.

   The clock is not the first keystroke. A keystroke clock would reject
   the normal reader who finishes an article and then pastes an address
   and submits within a second. Bots that set the email and submit as
   soon as the document is parsed still fall inside the 3 second floor.
   Download time does not count: a bot that waits out a slow page and
   then submits immediately is still dropped.

   A dropped submit pretends it worked without leaving the page: the
   button reads "Check email" and stays disabled, and further
   submits on that form stay dropped. Nothing is posted to SendFox, the
   newsletter_signup event is not sent, and the browser does not go to
   /subscribed (that pageview would show up in GA4). Reloading clears it.

   A real submit posts only the email plus an empty a_password field.
   SendFox's own form markup has always sent that empty honeypot, so the
   request stays the shape that already works. company_website is removed
   and never reaches SendFox.

   The listener is capture-phase and stops propagation so SendFox's
   form.js (loaded on the sidebar) cannot post the same submit again.

   This does not see requests that go straight to the SendFox endpoint
   without using these forms. */
(function () {
  var MIN_MS = 3000;
  var HONEYPOT = 'company_website';
  var armedAt = (typeof performance !== 'undefined' && typeof performance.now === 'function')
    ? performance.now()
    : Date.now();

  function tooSoon() {
    var now = (typeof performance !== 'undefined' && typeof performance.now === 'function')
      ? performance.now()
      : Date.now();
    return (now - armedAt) < MIN_MS;
  }

  function honeypotFilled(form) {
    var field = form.querySelector('input[name="' + HONEYPOT + '"]');
    return !!(field && field.value !== '');
  }

  function resetButton(btn) {
    if (!btn) return;
    btn.disabled = false;
    btn.textContent = 'Get it free';
  }

  function pretendSuccess(form) {
    form.dataset.newsletterDropped = '1';
    var btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Check email';
    }
    var email = form.querySelector('input[type="email"]');
    if (email) email.readOnly = true;
  }

  function redirectAfterSignup(form) {
    var done = false;
    var src = form.getAttribute('data-newsletter-src') || '';
    var base = form.getAttribute('data-newsletter-subscribed') || '/subscribed';
    var go = function () {
      if (done) return;
      done = true;
      window.location.href = base + '?src=' + encodeURIComponent(src);
    };
    if (window.gtag) {
      window.gtag('event', 'newsletter_signup', {
        placement: form.getAttribute('data-newsletter-placement') || '',
        event_callback: go
      });
      setTimeout(go, 500);
    } else {
      go();
    }
  }

  function onSubmit(e) {
    var form = e.currentTarget;
    e.preventDefault();
    e.stopImmediatePropagation();

    if (form.dataset.newsletterDropped === '1' || honeypotFilled(form) || tooSoon()) {
      pretendSuccess(form);
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Subscribing...';
    }

    var body = new FormData(form);
    body.delete(HONEYPOT);
    body.append('a_password', '');

    fetch(form.action, {
      method: 'POST',
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      body: body
    }).then(function (res) {
      if (res.ok) {
        redirectAfterSignup(form);
        return;
      }
      return res.json().then(function (data) {
        if (data.errors) alert(data.errors[0]);
        else alert('Something went wrong. Please try again.');
        resetButton(btn);
      });
    }).catch(function () {
      alert('Network error. Please try again.');
      resetButton(btn);
    });
  }

  function bind(form) {
    if (!form || form.dataset.newsletterBound === '1') return;
    form.dataset.newsletterBound = '1';
    form.addEventListener('submit', onSubmit, true);
  }

  function bindAll() {
    var forms = document.querySelectorAll('form[data-newsletter-placement]');
    for (var i = 0; i < forms.length; i++) bind(forms[i]);
  }

  bindAll();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindAll);
  }
})();

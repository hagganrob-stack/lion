// Small, dependency-free script: UTM capture, consent, tracking, click events, enquiry form.

const body = document.body;
const PIXEL_ID = body.dataset.metaPixel || '';
const GA4_ID = body.dataset.ga4 || '';
const CONSENT_KEY = 'bm_consent';

/* ---------- Consent and tracking ---------- */

function getConsent() {
  try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
}
function setConsent(value) {
  try { localStorage.setItem(CONSENT_KEY, value); } catch { /* private mode: fine */ }
}

let trackersLoaded = false;
function loadTrackers() {
  if (trackersLoaded) return;
  trackersLoaded = true;

  if (GA4_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID);
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID);
    document.head.appendChild(s);
  }

  if (PIXEL_ID && !window.fbq) {
    const n = (window.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!window._fbq) window._fbq = n;
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(s);
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }
}

const banner = document.getElementById('consent');
function showBanner() { if (banner) { banner.hidden = false; } }
function hideBanner() { if (banner) { banner.hidden = true; } }

if (GA4_ID || PIXEL_ID) {
  const stored = getConsent();
  if (stored === 'granted') loadTrackers();
  else if (!stored) showBanner();
}

document.addEventListener('click', (e) => {
  const el = e.target instanceof Element ? e.target : null;
  if (!el) return;

  const choice = el.closest('[data-consent]');
  if (choice) {
    const value = choice.getAttribute('data-consent');
    const before = getConsent();
    setConsent(value);
    hideBanner();
    if (value === 'granted') loadTrackers();
    else if (before === 'granted') location.reload(); // stop trackers that are already running
    return;
  }

  if (el.closest('[data-cookie-settings]')) { showBanner(); banner && banner.querySelector('button')?.focus(); return; }

  const plan = el.closest('a[data-plan]');
  if (plan) {
    const field = document.querySelector('input[name="plan"]');
    if (field) field.value = plan.getAttribute('data-plan') || '';
  }

  // GA4 click events for the call and email links, and the booking button.
  const link = el.closest('a');
  if (link && typeof window.gtag === 'function') {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('tel:')) window.gtag('event', 'click_call', { link_url: href });
    else if (href.startsWith('mailto:')) window.gtag('event', 'click_email', { link_url: href });
    else if (link.hasAttribute('data-book')) window.gtag('event', 'click_book_call', { link_url: href });
  }
});

/* ---------- Enquiry form ---------- */

const form = document.getElementById('enquiry-form');
if (form) {
  const params = new URLSearchParams(location.search);
  const setHidden = (name, value) => {
    const f = form.elements.namedItem(name);
    if (f) f.value = value || '';
  };
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'].forEach((k) =>
    setHidden(k, (params.get(k) || '').slice(0, 200)),
  );
  setHidden('landing_page', location.origin + location.pathname);
  setHidden('referrer', (document.referrer || '').slice(0, 300));
  setHidden('ft', String(Date.now()));

  const status = document.getElementById('form-status');
  const submit = form.querySelector('button[type="submit"]');
  const messages = {
    name: 'Please tell me your name.',
    pub: 'Please tell me the name of your pub.',
    town: 'Please tell me the town.',
    phone: 'Please add a phone number I can ring.',
    email: 'Please add an email address I can reply to.',
    pubs: 'Please choose how many pubs you run.',
  };

  const showError = (name, text) => {
    const input = form.elements.namedItem(name);
    const err = document.getElementById('e-' + name);
    if (!input || !err) return;
    if (text) {
      err.textContent = text;
      err.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', err.id);
    } else {
      err.hidden = true;
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  };

  const validate = () => {
    let first = null;
    for (const name of Object.keys(messages)) {
      const input = form.elements.namedItem(name);
      const value = (input.value || '').trim();
      let bad = !value;
      if (!bad && name === 'email') bad = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
      if (!bad && name === 'phone') bad = value.replace(/\D/g, '').length < 7;
      showError(name, bad ? messages[name] : '');
      if (bad && !first) first = input;
    }
    return first;
  };

  form.addEventListener('input', (e) => {
    const t = e.target;
    if (t && t.name && messages[t.name] && t.getAttribute('aria-invalid')) showError(t.name, '');
  });

  const cookie = (name) => {
    const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    status.classList.remove('is-error');

    const firstBad = validate();
    if (firstBad) { firstBad.focus(); return; }

    const data = Object.fromEntries(new FormData(form).entries());
    const consent = getConsent() === 'granted';
    const eventId = (crypto.randomUUID && crypto.randomUUID()) || String(Date.now()) + Math.random();
    const payload = { ...data, consent, event_id: eventId, fbp: consent ? cookie('_fbp') : '', fbc: consent ? cookie('_fbc') : '' };

    submit.disabled = true;
    const label = submit.textContent;
    submit.textContent = 'Sending…';

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error('send failed');

      // Lead events, only if the visitor accepted cookies (the scripts only exist then).
      if (consent) {
        if (typeof window.fbq === 'function') window.fbq('track', 'Lead', {}, { eventID: eventId });
        if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { event_id: eventId });
      }

      form.hidden = true;
      const thanks = document.getElementById('thanks');
      thanks.hidden = false;
      thanks.focus();
    } catch {
      status.classList.add('is-error');
      status.textContent = 'Sorry, that didn’t send. Please try again, or email me directly.';
      submit.disabled = false;
      submit.textContent = label;
    }
  });
}

// Small, dependency-free script: UTM capture, consent, tracking, click events, enquiry form.

const body = document.body;
const PIXEL_ID = body.dataset.metaPixel || '';
const GA4_ID = body.dataset.ga4 || '';
const CONSENT_KEY = 'bm_consent';

/* ---------- Header: transparent over the hero, solid once scrolled ---------- */

const header = document.querySelector('.site-header');
if (header && !header.classList.contains('is-solid')) {
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

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

/* ---------- Live demo: add an event, see it on the pub site ---------- */

const demoForm = document.getElementById('demo-form');
const demoList = document.getElementById('demo-list');
if (demoForm && demoList) {
  const status = document.getElementById('demo-status');
  const startOfDay = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
  const today = startOfDay(new Date());
  const nextDow = (dow) => { const d = new Date(today); d.setDate(d.getDate() + (((dow - d.getDay()) + 7) % 7 || 7)); return d; };
  const timeLabel = (t) => {
    const [h, m] = t.split(':').map(Number);
    const hh = h % 12 || 12;
    return `${hh}${m ? ':' + String(m).padStart(2, '0') : ''}${h >= 12 ? 'pm' : 'am'}`;
  };
  const fmt = (d, o) => d.toLocaleDateString('en-GB', o);
  const MAX = 5;

  const make = (ev, cls) => {
    const li = document.createElement('li');
    if (cls) li.className = cls;
    li.dataset.ts = String(ev.date.getTime());
    const chip = document.createElement('span');
    chip.className = 'date-chip';
    chip.setAttribute('aria-hidden', 'true');
    const b = document.createElement('b');
    b.textContent = String(ev.date.getDate());
    chip.append(b, fmt(ev.date, { weekday: 'short' }));
    const text = document.createElement('span');
    text.className = 'event-text';
    const strong = document.createElement('strong');
    strong.textContent = ev.name;
    const meta = document.createElement('span');
    meta.textContent = `${ev.time}.${ev.about ? ' ' + ev.about : ''}`;
    text.append(strong, meta);
    li.append(chip, text);
    return li;
  };

  // Seed with dates that are always upcoming, plus one event that has just passed.
  const past = new Date(today); past.setDate(past.getDate() - 1);
  const seed = [
    { date: past, name: 'Karaoke night', time: '9pm', about: 'Finished. Drops off by itself.' },
    { date: nextDow(2), name: 'Quiz night', time: '8pm', about: 'Teams of up to six. Bring a pen.' },
    { date: nextDow(5), name: 'Live music', time: '9pm', about: 'Local band on stage.' },
    { date: nextDow(0), name: 'Sunday roast', time: 'Till 5pm', about: 'Booking advised.' },
  ].sort((a, b) => a.date - b.date);
  demoList.replaceChildren(...seed.map((ev) => make(ev, ev.date < today ? 'is-past' : '')));

  // Default the form to the next Thursday, and stop dates in the past.
  const dateInput = demoForm.elements.namedItem('date');
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  dateInput.value = iso(nextDow(4));
  dateInput.min = iso(today);

  // When the list scrolls into view, the past event drops off on its own.
  const pastItem = demoList.querySelector('.is-past');
  if (pastItem && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      setTimeout(() => {
        pastItem.classList.add('is-gone');
        setTimeout(() => pastItem.remove(), 700);
      }, 1600);
    }, { threshold: 0.6 });
    io.observe(demoList);
  } else if (pastItem) pastItem.remove();

  demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = demoForm.elements;
    const name = (f.name.value || '').trim();
    if (!name || !f.date.value || !f.time.value) {
      status.textContent = 'Add a name, date and time, then press the button.';
      return;
    }
    const [y, m, d] = f.date.value.split('-').map(Number);
    const ev = { date: new Date(y, m - 1, d), name, time: timeLabel(f.time.value), about: (f.about.value || '').trim() };
    const li = make(ev, 'is-new');
    const ts = ev.date.getTime();
    const before = [...demoList.children].find((c) => Number(c.dataset.ts) > ts);
    demoList.insertBefore(li, before || null);
    while (demoList.children.length > MAX) demoList.lastElementChild.remove();
    status.textContent = `Added. “${name}” is on the website now.`;
    f.name.value = '';
    f.about.value = '';
    f.name.focus();
  });
}

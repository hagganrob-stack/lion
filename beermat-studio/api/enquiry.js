// Vercel serverless function: POST /api/enquiry
// Emails the enquiry via Resend and (optionally, with consent) sends a Lead event to Meta's Conversions API.
import { createHash } from 'node:crypto';

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

const clean = (value, max = 200) =>
  String(value ?? '')
    .replace(/[\u0000-\u001f\u007f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);

const sha256 = (value) => createHash('sha256').update(value).digest('hex');

function normalisePhone(raw) {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  else if (digits.startsWith('0')) digits = '44' + digits.slice(1);
  return digits;
}

async function sendLeadToMeta({ lead, eventId, consent, request }) {
  const pixelId = process.env.PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!consent || !pixelId || !token) return;

  const version = process.env.META_GRAPH_VERSION || 'v23.0';
  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  const userData = {
    em: [sha256(lead.email.toLowerCase())],
    ph: [sha256(normalisePhone(lead.phone))],
    ct: [sha256(lead.town.toLowerCase().replace(/[^a-z]/g, ''))],
    country: [sha256('gb')],
    client_user_agent: request.headers.get('user-agent') || undefined,
    client_ip_address: ip || undefined,
    fbp: lead.fbp || undefined,
    fbc: lead.fbc || undefined,
  };
  const payload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: 'website',
        event_source_url: lead.landing_page || undefined,
        user_data: userData,
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  const res = await fetch(
    `https://graph.facebook.com/${version}/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(token)}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) },
  );
  if (!res.ok) console.error('Meta CAPI failed', res.status, await res.text().catch(() => ''));
}

export async function POST(request) {
  const text = await request.text();
  if (text.length > 20_000) return json(413, { ok: false });

  let raw;
  try {
    raw = JSON.parse(text);
  } catch {
    return json(400, { ok: false });
  }

  // Spam traps. Pretend it worked so bots don't learn anything.
  const filledTooFast = Date.now() - Number(raw.ft || 0) < 1500;
  if (clean(raw.website) || filledTooFast) return json(200, { ok: true });

  const lead = {
    name: clean(raw.name, 100),
    pub: clean(raw.pub, 120),
    town: clean(raw.town, 100),
    phone: clean(raw.phone, 30),
    email: clean(raw.email, 160),
    pubs: clean(raw.pubs, 20),
    plan: clean(raw.plan, 40),
    utm_source: clean(raw.utm_source),
    utm_medium: clean(raw.utm_medium),
    utm_campaign: clean(raw.utm_campaign),
    utm_content: clean(raw.utm_content),
    utm_term: clean(raw.utm_term),
    gclid: clean(raw.gclid),
    fbclid: clean(raw.fbclid),
    landing_page: clean(raw.landing_page, 300),
    referrer: clean(raw.referrer, 300),
    fbp: clean(raw.fbp, 100),
    fbc: clean(raw.fbc, 200),
  };

  const valid =
    lead.name &&
    lead.pub &&
    lead.town &&
    lead.pubs &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email) &&
    lead.phone.replace(/\D/g, '').length >= 7;
  if (!valid) return json(400, { ok: false, error: 'invalid' });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !to || !from) {
    console.error('Enquiry function is missing RESEND_API_KEY, LEAD_TO_EMAIL or RESEND_FROM');
    return json(500, { ok: false });
  }

  const lines = [
    `Name: ${lead.name}`,
    `Pub: ${lead.pub}`,
    `Town: ${lead.town}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Number of pubs: ${lead.pubs}`,
    lead.plan ? `Plan they clicked: ${lead.plan}` : null,
    '',
    'Where they came from',
    `utm_source: ${lead.utm_source || '-'}`,
    `utm_medium: ${lead.utm_medium || '-'}`,
    `utm_campaign: ${lead.utm_campaign || '-'}`,
    `utm_content: ${lead.utm_content || '-'}`,
    `utm_term: ${lead.utm_term || '-'}`,
    `gclid: ${lead.gclid || '-'}`,
    `fbclid: ${lead.fbclid || '-'}`,
    `Landing page: ${lead.landing_page || '-'}`,
    `Referrer: ${lead.referrer || '-'}`,
  ].filter((l) => l !== null);

  const source = lead.utm_source ? ` [${lead.utm_source}${lead.utm_campaign ? ' / ' + lead.utm_campaign : ''}]` : '';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: `New pub enquiry: ${lead.pub}, ${lead.town}${source}`,
      text: lines.join('\n'),
    }),
  });
  if (!res.ok) {
    console.error('Resend failed', res.status, await res.text().catch(() => ''));
    return json(502, { ok: false });
  }

  try {
    await sendLeadToMeta({ lead, eventId: clean(raw.event_id, 80) || undefined, consent: raw.consent === true, request });
  } catch (err) {
    console.error('Meta CAPI error', err);
  }

  return json(200, { ok: true });
}

export function GET() {
  return json(405, { ok: false });
}

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";

export const runtime = "nodejs";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const clean = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

async function verifyTurnstile(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured (dev) — honeypot still applies
  if (!token) return false;
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token }),
  });
  const j = (await r.json()) as { success?: boolean };
  return !!j.success;
}

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots move on.
  if (clean(raw.company_website)) return NextResponse.json({ ok: true });

  const lead = {
    name: clean(raw.name, 120),
    business: clean(raw.business, 160),
    trade: clean(raw.trade, 60),
    town: clean(raw.town, 80),
    phone: clean(raw.phone, 40),
    email: clean(raw.email, 160),
    website: clean(raw.website, 200),
    message: clean(raw.message, 1500),
    source: clean(raw.source, 40),
  };

  if (!lead.name || !lead.phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ error: "Please fill in your name, phone and a valid email." }, { status: 422 });
  }

  if (!(await verifyTurnstile(clean(raw.turnstile, 4000)))) {
    return NextResponse.json({ error: "Couldn't verify you're human. Please try again." }, { status: 400 });
  }

  const rows = Object.entries(lead)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${esc(k)}</td><td style="padding:4px 0"><b>${esc(v)}</b></td></tr>`)
    .join("");
  const html = `<h2>New Local Lion lead</h2><table>${rows}</table>`;

  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL || site.email;
  const from = process.env.RESEND_FROM || `Local Lion <${site.email}>`;

  try {
    if (key) {
      const resend = new Resend(key);
      const notify = await resend.emails.send({
        from, to, replyTo: lead.email,
        subject: `New lead: ${lead.business || lead.name} (${lead.trade || "trade n/a"}, ${lead.town || "town n/a"})`,
        html,
      });
      if (notify.error) throw new Error(notify.error.message);
      // Autoresponder to the lead. Best-effort: a failure here shouldn't lose the lead.
      await resend.emails.send({
        from, to: lead.email,
        subject: "Got your free audit request — Local Lion",
        html: `<p>Hi ${esc(lead.name.split(" ")[0])},</p><p>Thanks for asking for a free audit. Rob will look at your Google ranking, Google Business Profile and website speed, and get back to you within 2 working days.</p><p>If anything's urgent, just reply to this email.</p><p>— Rob, Local Lion</p><p style="color:#888;font-size:12px">Local Lion is a trading name of ${esc(site.legalName)}, company no. ${site.companyNumber}.</p>`,
      }).catch(() => undefined);
    } else if (process.env.FORMSPREE_ENDPOINT) {
      const r = await fetch(process.env.FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(lead),
      });
      if (!r.ok) throw new Error("Formspree failed");
    } else if (process.env.NODE_ENV !== "production") {
      console.log("[lead:dev — no email provider configured]", lead);
    } else {
      console.error("Lead received but no RESEND_API_KEY or FORMSPREE_ENDPOINT configured");
      return NextResponse.json({ error: "Our form is having a moment. Please email us directly." }, { status: 503 });
    }
  } catch (e) {
    console.error("lead send failed", e);
    return NextResponse.json({ error: "Couldn't send that. Please try again or email us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

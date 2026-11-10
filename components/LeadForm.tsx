"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Icon } from "./Icons";
import { trackLeadConversion } from "@/lib/consent";
import { trades } from "@/content/site";

const SITEKEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type State = "idle" | "sending" | "done" | "error";

export function LeadForm({ compact = false, source = "free-audit" }: { compact?: boolean; source?: string }) {
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");
  const tokenRef = useRef("");

  useEffect(() => {
    (window as unknown as { onTurnstile?: (t: string) => void }).onTurnstile = (t: string) => {
      tokenRef.current = t;
    };
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setMsg("");
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, source, turnstile: tokenRef.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      trackLeadConversion();
      setState("done");
    } catch (err) {
      setState("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (state === "done") {
    return (
      <div role="status" className="card border-cyan p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-cyan text-cyan"><Icon name="check" size={28} /></span>
        <h3 className="display h-md mt-4">Cheers. Got it<span className="o">.</span></h3>
        <p className="mt-3">We'll get back to you within 2 working days with your audit. Check your inbox — we've sent a confirmation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card grid gap-4 p-6 md:p-8" noValidate={false} aria-describedby={msg ? "form-msg" : undefined}>
      {/* Honeypot: real people never see or fill this. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Leave this empty<input type="text" name="company_website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className={`grid gap-4 ${compact ? "sm:grid-cols-2" : "md:grid-cols-2"}`}>
        <div className="field"><label htmlFor={`name-${source}`}>Your name</label><input id={`name-${source}`} name="name" required autoComplete="name" /></div>
        <div className="field"><label htmlFor={`biz-${source}`}>Business name</label><input id={`biz-${source}`} name="business" required autoComplete="organization" /></div>
        <div className="field">
          <label htmlFor={`trade-${source}`}>Your trade</label>
          <select id={`trade-${source}`} name="trade" required defaultValue="">
            <option value="" disabled>Choose…</option>
            {trades.map((t) => <option key={t.slug} value={t.label}>{t.label}</option>)}
            <option value="Other">Other trade</option>
          </select>
        </div>
        <div className="field"><label htmlFor={`town-${source}`}>Town</label><input id={`town-${source}`} name="town" required autoComplete="address-level2" /></div>
        <div className="field"><label htmlFor={`phone-${source}`}>Phone</label><input id={`phone-${source}`} name="phone" type="tel" required autoComplete="tel" inputMode="tel" /></div>
        <div className="field"><label htmlFor={`email-${source}`}>Email</label><input id={`email-${source}`} name="email" type="email" required autoComplete="email" /></div>
      </div>
      {!compact && (
        <>
          <div className="field"><label htmlFor={`web-${source}`}>Website <span className="font-normal text-muted">(optional)</span></label><input id={`web-${source}`} name="website" inputMode="url" autoComplete="url" placeholder="yourbusiness.co.uk" /></div>
          <div className="field"><label htmlFor={`want-${source}`}>What do you want more of? <span className="font-normal text-muted">(optional)</span></label><textarea id={`want-${source}`} name="message" rows={3} placeholder="e.g. more EV charger jobs, fewer tyre-kickers" /></div>
        </>
      )}
      {SITEKEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey={SITEKEY} data-callback="onTurnstile" data-theme="dark" />
        </>
      )}
      <button type="submit" className="btn btn-primary w-full" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Get my free audit"} <Icon name="arrow" size={18} className="arr" />
      </button>
      <p id="form-msg" role="alert" className={`text-sm ${state === "error" ? "o" : "sr-only"}`}>{msg}</p>
      <p className="text-xs">We'll only use your details to send your audit and chat about your options. See our <Link className="c underline" href="/privacy">privacy policy</Link>.</p>
    </form>
  );
}

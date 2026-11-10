export type Consent = "granted" | "denied" | null;
const KEY = "ll-consent";

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(v: "granted" | "denied") {
  try {
    localStorage.setItem(KEY, v);
  } catch {}
  window.dispatchEvent(new CustomEvent("ll-consent-change", { detail: v }));
}

export function openConsentBanner() {
  window.dispatchEvent(new CustomEvent("ll-consent-open"));
}

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/** Fires the Google Ads lead conversion — only if consent has been granted and tags are configured. */
export function trackLeadConversion() {
  if (getConsent() !== "granted" || !window.gtag) return;
  const adsId = process.env.NEXT_PUBLIC_ADS_ID;
  const label = process.env.NEXT_PUBLIC_ADS_LEAD_LABEL;
  if (adsId && label) window.gtag("event", "conversion", { send_to: `${adsId}/${label}` });
  window.gtag("event", "generate_lead");
}

"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { getConsent, setConsent, type Consent } from "@/lib/consent";

const GA = process.env.NEXT_PUBLIC_GA4_ID;
const ADS = process.env.NEXT_PUBLIC_ADS_ID;

/** Cookie banner (UK GDPR / PECR). Tracking tags load ONLY after "Accept". */
export function ConsentManager() {
  const [consent, setState] = useState<Consent>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Reading localStorage is only possible after mount, so this one-off sync is intentional.
    const c = getConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(c);
    setOpen(c === null);
    const onChange = (e: Event) => setState((e as CustomEvent).detail);
    const onOpen = () => setOpen(true);
    window.addEventListener("ll-consent-change", onChange);
    window.addEventListener("ll-consent-open", onOpen);
    return () => {
      window.removeEventListener("ll-consent-change", onChange);
      window.removeEventListener("ll-consent-open", onOpen);
    };
  }, []);

  useEffect(() => {
    if (consent && window.gtag) {
      const v = consent === "granted" ? "granted" : "denied";
      window.gtag("consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
    }
  }, [consent]);

  const firstId = GA ?? ADS;
  const choose = (v: "granted" | "denied") => {
    setConsent(v);
    setOpen(false);
  };

  return (
    <>
      {consent === "granted" && firstId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${firstId}`} strategy="afterInteractive" />
          <Script id="gtag-config" strategy="afterInteractive">
            {`gtag('js', new Date());${GA ? `gtag('config','${GA}');` : ""}${ADS ? `gtag('config','${ADS}');` : ""}`}
          </Script>
        </>
      )}
      {open && (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed inset-x-3 bottom-[4.75rem] z-[60] mx-auto max-w-2xl rounded-2xl border border-line bg-surface p-5 md:bottom-5"
        >
          <p className="text-sm text-ink">
            We use cookies to measure how the site performs and which ads bring in enquiries. Nothing non-essential runs unless you say yes.{" "}
            <Link href="/cookies" className="c underline underline-offset-2">
              Cookie policy
            </Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => choose("granted")} className="btn btn-primary !min-h-11 !py-2">
              Accept
            </button>
            <button type="button" onClick={() => choose("denied")} className="btn btn-ghost !min-h-11 !py-2">
              Reject
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function ConsentDefaults() {
  // Google Consent Mode v2: everything denied until the visitor opts in.
  const js = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});try{if(localStorage.getItem('ll-consent')==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'})}}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new CustomEvent("ll-consent-open"))}>
      Cookie settings
    </button>
  );
}

# Outstanding items for Rob

## Needs real content (TODO_*)
- **TODO_PROOF** `content/work.ts` — CDH Roofing challenge / what we did / result / live URL. The /work page shows a neutral "write-up on its way" line until these are real.
- **TODO_PRICE** `content/pricing.ts` — Google Ads management price (page currently says "Ask about Google Ads").
- **TODO_PHONE** `content/site.ts` — business phone number (enables tap-to-call in the mobile bar, footer, contact).
- **TODO_CALENDLY** `content/site.ts` — booking URL (enables the lazy-loaded embed on /contact).
- **TODO_SOCIAL** `content/site.ts` — real profile URLs (hidden until set).
- **TODO_CONFIRM** `content/site.ts` — confirm `hello@locallion.co.uk` exists.
- **TODO_PHOTO** `app/(site)/about/page.tsx` — real photo of Rob; rewrite the About copy in your own words.
- **TODO_ASSET** — `public/brand/lion-hero.webp` (+ PNG/AVIF), final `logo.svg` and `logo-mark.svg`. Placeholder lion/logo in use. Trade-prop variants later.

## Needs review (TODO_REVIEW)
- Plumbers, Roofers, Builders pages (`content/trades/*.ts`, `needsReview: true`). Electricians is final copy.
- Legal pages (`app/(legal)/*`) are templates — get them checked; dates are `TODO_DATE`. A review banner shows on previews only (hidden when `VERCEL_ENV=production`).
- Pricing figures and the Pay monthly contract wording.

## Set up before launch
- Env vars (see `.env.example`): Resend (or Formspree), Turnstile, GA4 + Ads IDs and conversion label.
- Verify the sending domain in Resend, then test the form end to end (email to you, autoresponder, conversion only after consent).
- Add `locallion.co.uk` in Vercel and point DNS.
- `reviews.ts` is empty on purpose.
- Demo sites on /work and trade pages are wireframe previews labelled "Demo" — replace with real demo screenshots if you build them.

## Measured so far (local, mobile Lighthouse)
Home 97/100/96/100 · Electricians 96/100/96/100 · LCP 0.9s · CLS 0. Re-run on the deployed URL (best-practices dips locally only because Vercel's analytics scripts 404 off-platform).

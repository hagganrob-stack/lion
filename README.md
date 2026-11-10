# Local Lion

Marketing site for Local Lion (Websites, local SEO and Google Ads for UK trades). Built to `BRIEF.md`.

Next.js (App Router) · TypeScript strict · Tailwind v4 · static generation · Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Editing copy and prices
All copy lives in `/content` — one file per concern, one file per trade (`content/trades/*.ts`).
Prices: `content/pricing.ts`. Site-wide settings (email, phone, Calendly, socials): `content/site.ts`.
Real reviews: `content/reviews.ts` (the reviews section stays hidden while it's empty).

## Environment variables
Copy `.env.example` to `.env.local`. See that file; none are needed to build.

## Brand assets
Logo is a wordmark (`components/Logo.tsx`). Replace `public/brand/logo.svg` and `logo-mark.svg` with final art when ready.

See `TODO_REPORT.md` for everything still needed from Rob.

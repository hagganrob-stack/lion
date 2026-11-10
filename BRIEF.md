# Local Lion — Website Build Brief (for Claude Code)

> Paste this file into the root of a new repo as `BRIEF.md` and tell Claude Code:
> "Read BRIEF.md and build the site exactly to this brief, phase by phase. Ask me before deviating."

---

## 0. The one-line goal

Build the best-looking, fastest trades marketing site in the UK. **This site is the shop window for people buying shop windows** — every pixel, interaction and load time is the sales pitch. If a tradesperson lands on it and thinks "I want *that*", we've won.

---

## 1. Business context

- **Brand:** Local Lion — a trading name of Peak SEO Agency Limited (company no. 16387592, registered in England & Wales).
- **What we sell:** Websites, local SEO and Google Ads for UK trades businesses.
- **Who it's for:** Owner-operators and small firms — electricians, plumbers, roofers, builders. Busy, practical, sceptical of agencies and allergic to waffle. Mostly browsing on a phone, often in the van.
- **The promise:** Get found. Get more jobs.
- **Tone of voice:** Confident, plain-spoken, a bit cheeky. Short sentences. No jargon, no AI hype, no "synergy". Talk about jobs, phone calls and quiet weeks — not "digital presence".
- **Honesty rule (non-negotiable):** No invented stats, ratings, rankings, client counts, logos or testimonials. No "#1", "500+ clients", "4.9/5" etc. until they are real and evidenced. Use the honest proof points in §6. Anything that needs a real figure later = a clearly marked `TODO_PROOF` in the content file, never a fake number on the live site.

---

## 2. Tech stack

- **Next.js** (latest, App Router) + **TypeScript** (strict)
- **Tailwind CSS** with the design tokens in §3 defined in `tailwind.config` / CSS variables
- **Framer Motion** only where CSS can't do it; prefer CSS animations
- **next/font** (self-hosted fonts, no layout shift), **next/image** (AVIF/WebP)
- **Static generation** for every page; no client-side data fetching for content
- **Content:** typed TS files in `/content` (no CMS for v1) — one file per trade page so copy is easy to edit
- **Forms:** Next.js route handler → email via **Resend** (fallback: Formspree). Honeypot + Cloudflare Turnstile.
- **Hosting:** GitHub → **Vercel**. Vercel Analytics + Speed Insights.
- **Tracking:** Google Ads conversion tag + GA4, loaded **only after consent** (Google Consent Mode v2). Lightweight consent banner, UK GDPR/PECR compliant.

---

## 3. Brand & visual design

The look: **dark, neon, bold.** Think night-time city glow meets workwear. Cyan and orange light, a lion mascot in lightning-bolt shades, chunky condensed headlines. Premium and energetic — never cheap or cartoony.

### Colour tokens
| Token | Hex | Use |
| --- | --- | --- |
| `--bg` | `#070B14` | Page background (near-black navy) |
| `--surface` | `#0E1626` | Cards, panels, nav on scroll |
| `--surface-2` | `#15203A` | Raised elements, inputs |
| `--line` | `#22304D` | Borders, dividers |
| `--cyan` | `#22D3EE` | Primary neon accent, links, icons, focus rings |
| `--orange` | `#FF7A1A` | CTAs, highlight words, second neon |
| `--white` | `#F5F7FA` | Headings |
| `--muted` | `#9AA6B8` | Body copy on dark |

- Headline highlight pattern: key words coloured — e.g. "GET **MORE** (cyan) **JOBS.** (orange)". Full stops in orange.
- **Glow:** use layered `text-shadow` / `box-shadow` / radial-gradient blooms in cyan and orange behind the mascot and on primary buttons. Subtle, not tacky.
- **Lightning motif:** angular cyan/orange bolt shapes (SVG) in hero backgrounds and as section dividers.
- **Texture:** faint smoke/particle/ember layer behind the hero (CSS or a tiny static WebP — not a heavy video).
- Primary button text must be dark (`--bg`) on orange for contrast.

### Typography
- **Headings:** Barlow Condensed 800 (or Bebas Neue if it renders better) — UPPERCASE, tight leading (0.9–0.95), big.
- **Body / UI:** Inter 400/500/600.
- **Eyebrows:** Inter 600, uppercase, letter-spacing 0.2em, small, with a short cyan rule after.
- Fluid type with `clamp()` — the hero H1 should be enormous on desktop and still punchy at 360px wide.

### Mascot
- The Local Lion: a lion's head with a full fiery mane, wearing dark shades with **cyan lightning in the left lens and orange in the right**, lit with cyan rim light on one side and orange on the other.
- **Assets (Rob supplies):** `/public/brand/lion-hero.webp` (+ transparent PNG/AVIF), `/public/brand/logo.svg` (crowned lion-head shield + wordmark), `/public/brand/logo-mark.svg` (head only, for favicon/avatars). Until supplied, use a tasteful placeholder silhouette — never a stock lion.
- **Trade variants (later):** same lion, one prop per trade page — lightning (electricians), wrench (plumbers), hard hat (roofers & builders).
- **Logo:** "Local" in white, "Lion" in orange, lion-head mark to the left. Must read clearly at 32px — provide a simplified mark for small sizes.

### Motion (premium, never gimmicky)
- Hero: mascot fades/scales in (0.6s), slow ambient glow pulse on the mane rim light, occasional subtle "flicker" on the lightning lenses (every ~6s).
- Light parallax on the mascot and bolts on desktop pointer move (max 8px). None on mobile.
- Sections: elements rise 16px + fade on scroll into view, staggered 60ms.
- Buttons: glow intensifies on hover, arrow nudges right 4px.
- **Respect `prefers-reduced-motion`** — disable all non-essential motion.

---

## 4. Sitemap & SEO targets

| Route | Purpose | Primary keyword (UK) |
| --- | --- | --- |
| `/` | Trades hub homepage | tradesman website / website for tradesmen (390/mo) |
| `/electricians` | Trade page | website for electricians (320) · electrician website design (320) |
| `/plumbers` | Trade page | plumber website design (480) |
| `/roofers` | Trade page | roofing website design (170) |
| `/builders` | Trade page | builder website design (110) |
| `/pricing` | Packages | — |
| `/how-it-works` | Process | — |
| `/work` | Case studies (starts with CDH Roofing) | — |
| `/about` | Rob, the story, why trades | — |
| `/free-audit` | Lead magnet + form | — |
| `/contact` | Contact + booking link | — |
| `/privacy`, `/cookies`, `/terms` | Legal | — |

Blog (`/guides/[slug]`) is phase 2 — scaffold the route and template only.

---

## 5. Page specs

### 5.1 Homepage `/`

1. **Nav** (sticky, transparent → `--surface` with blur on scroll): logo · Trades (dropdown: Electricians, Plumbers, Roofers, Builders) · Pricing · Work · About · **"Get a free audit →"** orange button. Mobile: hamburger + a persistent tap-to-call/audit bar at the bottom.
2. **Hero** (split layout, mascot right, copy left; mascot behind/under copy on mobile):
   - Eyebrow: `WEBSITES / SEO / GOOGLE ADS` — `FOR TRADES BUSINESSES`
   - H1: **GET FOUND. GET MORE JOBS.**
   - Sub: "Websites, local SEO and Google Ads for electricians, plumbers, roofers and builders who want their phone ringing — not their weekends spent on marketing."
   - Buttons: **Get a free audit →** (primary) · **See how it works** (secondary, cyan outline). *(Only add "Watch video" when a real video exists.)*
   - Three icon features under the buttons: **Rank higher in your area** · **Websites that win jobs** · **Ads that fill the diary**
3. **Proof strip** (glass panel, 4 items, honest): ⚡ **Live in 7 days** · 💷 **From £99/month** · 📍 **Built by a local SEO specialist** · 🤝 **No waffle. No lock-in games.** *(Icons as line SVGs, not emoji.)*
4. **Pick your trade:** four big neon cards (Electricians, Plumbers, Roofers, Builders), each with icon, one-line promise and arrow → trade page. This is the core internal-linking block.
5. **The problem:** "Word of mouth is great. Until it goes quiet." Short paragraph: when someone searches "electrician near me" or "emergency plumber [town]", the jobs go to whoever Google shows first.
6. **What we do** — three columns: **Websites** (fast, mobile-first, built to convert) · **Local SEO** (Google Maps, service-area pages, reviews) · **Google Ads** (pay for calls, not clicks you can't see).
7. **How it works** — 3 steps with big neon numerals: **15-minute call** → **Built in 7 days** → **Go live & get found**.
8. **Pricing preview** — 3 cards pulled from `/content/pricing.ts`, middle one highlighted "Most popular", link to `/pricing`.
9. **Work** — CDH Roofing case study card (real), plus clearly-labelled demo sites. No fake logos.
10. **FAQ** — 6 questions (accordion) with FAQPage schema.
11. **Final CTA** — full-width neon panel, lion peeking in from the edge: "Ready to be the name everyone calls locally?" + free-audit form inline.
12. **Footer** — logo, trade links, pages, contact, social, "Local Lion is a trading name of Peak SEO Agency Limited, company no. 16387592, registered in England & Wales."

### 5.2 Trade page template `/[trade]`

One shared template, **distinct content per trade** from `/content/trades/{trade}.ts`. Never just swap the trade name — each page must earn its ranking.

Sections:
1. Hero — trade-specific H1 (e.g. "WEBSITES THAT WIN ELECTRICIANS MORE WORK."), trade eyebrow, mascot with the trade prop, primary CTA.
2. Proof strip (same component).
3. "What your customers check before they call" — trade-specific trust signals.
4. "Built for [trade]" — features grid tailored to the trade.
5. Services we build pages for — chips list of that trade's money services.
6. Demo site preview — screenshot in a device frame, labelled **Demo**.
7. How it works (shared component).
8. Pricing preview (shared).
9. Trade-specific FAQ (5–6 Qs, FAQPage schema).
10. Final CTA.

**Per-trade data:**

| Trade | Trust signals to showcase | Money services | Prop / accent |
| --- | --- | --- | --- |
| Electricians | NICEIC, NAPIT, Part P, reviews | EICRs, rewires, consumer units, EV chargers, fault finding, landlord certificates | Lightning · cyan |
| Plumbers | Gas Safe, WaterSafe, CIPHE, 24/7 | Emergency call-outs, boiler repairs & installs, bathrooms, leaks, unblocking | Wrench · cyan/orange |
| Roofers | NFRC, CompetentRoofer, guarantees, before/after | Roof repairs, flat roofs, new roofs, guttering, chimneys, fascias | Hard hat · orange |
| Builders | TrustMark, FMB, project galleries, insurance | Extensions, loft conversions, renovations, garage conversions, groundworks | Hard hat · orange |

Write full, unique copy for **Electricians** first (it's the launch trade); scaffold the other three with distinct, correct trade content clearly marked `TODO_REVIEW` for Rob.

### 5.3 Pricing `/pricing`
Content from `/content/pricing.ts` (Rob will confirm figures — treat as editable):
- **Launch** — £1,200 one-off + £185/year hosting. Up to 7 pages, service pages, quote form, Google Business Profile setup, live in 7 days.
- **Pay monthly** — £99/month, 12-month minimum. Everything in Launch + hosting, updates, small edits. *Most popular.*
- **Growth** — £249/month. Pay monthly + local SEO: service-area pages, GBP posts, review requests, monthly report.
- **Google Ads management** — `TODO_PRICE` (add-on).
Plus a comparison table and pricing FAQ.

### 5.4 Free audit `/free-audit`
- Headline: "Find out why you're not getting the calls."
- What they get: a short personalised video or PDF covering their Google ranking, Google Business Profile and website speed — within 2 working days.
- Form: name, business name, trade (select), town, phone, email, website (optional), "What do you want more of?" (optional).
- On submit: success state + Google Ads conversion (post-consent), email to Rob, autoresponder to the lead.

### 5.5 About, How it works, Work, Contact, legal
- **About:** Rob — local SEO specialist based in Warwick, why trades, how he works. Real photo slot (`TODO_PHOTO`). Plain, human.
- **Work:** case-study template (challenge → what we did → result). CDH Roofing first (website build). Demo sites labelled.
- **Contact:** form, email, Calendly embed (lazy-loaded), no fake address.
- **Legal:** privacy, cookies, terms — sensible UK templates marked `TODO_REVIEW`.

---

## 6. Honest proof points (use these instead of stats)
- Live in 7 days
- From £99/month
- Built by a local SEO specialist
- Websites, SEO and Google Ads under one roof
- You deal with the person doing the work
- Real reviews only — the reviews section stays hidden until `content/reviews.ts` has entries

---

## 7. SEO & technical requirements
- Unique `<title>` and meta description per page (e.g. "Websites for Electricians UK | Local Lion").
- One H1 per page, logical H2/H3 hierarchy.
- JSON-LD: `Organization`, `ProfessionalService`, `Service` (per trade page), `FAQPage`, `BreadcrumbList`.
- `sitemap.xml`, `robots.txt`, canonical URLs, `en-GB`.
- **Dynamic OG images** with `next/og` in the brand style (dark bg, neon headline, lion mark) for every page.
- Internal links: every trade page links to the other trades, pricing and free audit; homepage trade cards link down.
- Descriptive alt text; no text baked into images.
- 404 page in brand style ("This page has wandered off the patch").

---

## 8. Performance & accessibility budget (must pass before launch)
- **Lighthouse mobile: 95+ in all four categories.**
- LCP < 1.8s on 4G, CLS < 0.05, INP < 200ms.
- Hero image: `priority`, correctly sized `sizes`, AVIF/WebP, < 150KB at mobile size.
- Total JS on the homepage kept minimal — no heavy animation libraries in the critical path.
- WCAG 2.2 AA: contrast checked on all text over neon/dark, visible focus states (cyan ring), full keyboard nav, labelled form fields, reduced-motion support.
- Test at 360px, 390px, 768px, 1280px, 1440px+.

---

## 9. Project structure
```
/app
  /(site)/page.tsx
  /(site)/[trade]/page.tsx
  /(site)/pricing, /how-it-works, /work, /about, /free-audit, /contact
  /(legal)/privacy, /cookies, /terms
  /api/lead/route.ts
/components   (Nav, Hero, ProofStrip, TradeCards, Steps, PricingCards, FAQ, CTA, Footer, Glow, Bolt…)
/content      (site.ts, pricing.ts, faqs.ts, reviews.ts, trades/electricians.ts, plumbers.ts, roofers.ts, builders.ts)
/public/brand (logo.svg, logo-mark.svg, lion-hero.webp)
```

---

## 10. Build phases
1. **Foundations:** repo, Next.js + Tailwind, tokens, fonts, layout, Nav, Footer, Glow/Bolt components.
2. **Homepage** — fully finished and polished before anything else. Show Rob.
3. **Trade template + Electricians page** (full copy).
4. Plumbers, Roofers, Builders pages (scaffolded content, `TODO_REVIEW`).
5. Pricing, How it works, Free audit (+ form, email, conversion), Contact.
6. About, Work, legal pages, 404.
7. SEO pass (schema, OG images, sitemap), consent + tracking.
8. Performance & accessibility pass to the §8 budget. Deploy to Vercel on `locallion.co.uk`.

## 11. Definition of done
- Looks and feels like the mock-up direction: dark, neon cyan/orange, condensed headlines, lion mascot — and *better* than it.
- Every page passes the §8 budget.
- No fake proof anywhere; all `TODO_*` markers listed in a final report for Rob.
- Form tested end to end (email received, autoresponder sent, conversion fires only after consent).
- Rob can change any copy or price by editing one file in `/content`.

# Beermat Studio

One-page landing page for Beermat Studio (beermat.studio): websites for UK pubs. Built for ad traffic on phones.

Astro 7, static output, almost no client JS. One small script handles the cookie banner, tracking, UTM capture and the enquiry form. The form posts to a Vercel serverless function (`api/enquiry.js`) that emails you through Resend.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site into dist/
npm run preview  # serve the build
```

Needs Node 22.23 or newer.

The form's API only exists on Vercel (or with `vercel dev`). With plain `npm run dev` the page works but sending the form will show the error message.

## Deploy

1. Push this folder to GitHub. If it sits inside another repo, push it as its own repo, or set **Root Directory** to `beermat-studio` in the Vercel project.
2. Import the repo into Vercel. The framework is detected as Astro, no settings to change.
3. Add the environment variables below, then redeploy.
4. Add `beermat.studio` under Project Settings > Domains.

`vercel.json` sets long cache headers for `/_astro/*` (hashed assets) and `/fonts/*`, plus a few basic security headers.

## Environment variables

Copy `.env.example` to `.env` for local use. On Vercel, add them under Project Settings > Environment Variables.

| Variable | Where used | What it is |
| --- | --- | --- |
| `RESEND_API_KEY` | server | Resend API key. |
| `LEAD_TO_EMAIL` | server | Where enquiries are emailed (you). |
| `RESEND_FROM` | server | Sender, on a domain verified in Resend, e.g. `Beermat Studio <enquiries@beermat.studio>`. |
| `PUBLIC_META_PIXEL_ID` | build + server | Meta Pixel ID. Also used by the server-side Lead event. |
| `PUBLIC_GA4_ID` | build | GA4 measurement ID, e.g. `G-XXXXXXXXXX`. |
| `META_CAPI_TOKEN` | server, optional | Conversions API access token. Leave blank to skip the server-side event. |
| `META_GRAPH_VERSION` | server, optional | Defaults to `v23.0`. Change if Meta retires that version. |
| `META_TEST_EVENT_CODE` | server, optional | Events Manager test code. Remove after testing. |

`PUBLIC_*` values are baked in at build time, so redeploy after changing them. If both `PUBLIC_` IDs are blank the cookie banner is not shown, because nothing needs consent.

## Things to fill in before launch

Everything is in `src/data/site.ts` (search for `TODO`):

- **Email**: set to `hello@beermat.studio`. Make sure that mailbox exists.
- **Phone**: empty. While empty it is hidden everywhere. Add it and it appears in the footer, the enquiry section and the structured data.
- **Booking link** (`bookingUrl`): your Calendly or similar. While empty, every "Book a call" button jumps to the enquiry form and the "Pick a time" button is hidden.
- **Legal line** (`legalLine`): trading entity for the footer and privacy page. Hidden while empty.
- **Keep Calm & Beer It**: screenshots, and confirmation that you have permission to name the pubs.
- **Privacy policy** (`src/pages/privacy.astro`): a plain-English draft that matches what the site does. Have it checked before you rely on it.

Copy and prices live in `src/data/content.ts`.

## Swapping in the Keep Calm & Beer It screenshots

The case study has three slots. Drop image files into `src/assets/case-study/` with exactly these names (png, jpg, webp or avif):

| File name | Slot |
| --- | --- |
| `desktop-home.png` | Wide desktop screenshot |
| `mobile-home.png` | Phone screenshot |
| `mobile-events.png` | Phone screenshot |

Astro resizes them to AVIF/WebP with explicit width and height, so there is no layout shift. Use roughly 1400px wide for the desktop shot and 600px wide for phones. Slots with no file show a "Screenshot to come" placeholder. To change the names, count or alt text, edit `caseStudy.slots` in `src/data/content.ts`.

## How the form and tracking work

- **Enquiry form**: validated in the browser and again in `api/enquiry.js`. It has a honeypot field and a "filled in too fast" check. Both fake a success so bots learn nothing. The thank-you state replaces the form. No alerts.
- **UTMs**: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid` and `fbclid` are read from the URL into hidden fields, along with the landing page and referrer. They appear in the email, and the subject line shows the source and campaign.
- **Consent**: nothing from Google or Meta loads until the visitor clicks Accept. "No thanks" is just as prominent. The choice is saved in `localStorage` and can be reopened from "Cookie settings" in the footer.
- **After consent**: Meta Pixel `PageView`, GA4 page view. On a successful submit, Pixel `Lead` and GA4 `generate_lead` fire with a shared event ID. Clicks on `tel:`, `mailto:` and "Book a call" links send GA4 `click_call`, `click_email` and `click_book_call`.
- **Conversions API**: if `META_CAPI_TOKEN` and `PUBLIC_META_PIXEL_ID` are set and the visitor accepted cookies, the function also sends a server-side `Lead` with the same event ID, so Meta can de-duplicate it. Email and phone are SHA-256 hashed first.

## Look and feel

Dark, photo-led. Warm near-black backgrounds, brass and amber accents, pump-clip red for the "Most popular" tag, and the bottle-green beermat as a small illustrated accent in the hero. Colours are tokens at the top of `src/styles/global.css`.

Each big photo header is the `Band` component (`src/components/Band.astro`): an image with a dark gradient and the text laid over it. The photos live in `src/assets/photos/` and are used like this:

| Photo | Where |
| --- | --- |
| `pint-pour.jpg` | Hero (loaded eagerly, high priority) and the social card |
| `beer-macro.jpg` | "Most pub websites are out of date" header |
| `garden-pint.jpg` | "What every pub website includes" header |
| `pints-table.jpg` | Case study header (a Birra Moretti glass is partly visible, so swap it if that matters) |

To change a header photo, replace the file or change the import and `position` (the focal point, as a CSS `object-position`) where `<Band>` is used. Check you have the right to use the photos commercially.

## Brand images

`public/og.png` (social card) and `public/apple-touch-icon.png` are generated from `scripts/brand/*.html`. To regenerate after a change, install Playwright and run `node scripts/brand/make-brand-images.mjs`. `public/favicon.svg` is the mat.

## Lighthouse

Mobile, Lighthouse 13 default settings (simulated slow 4G), against the production build served locally with gzip and the same cache headers. Four runs, no tracking IDs set:

| Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- |
| 100 | 100 | 100 | 100 | 1.3 s | 0 | 20 to 50 ms |

Re-run it on the deployed URL once it is live.

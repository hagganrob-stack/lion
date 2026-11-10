# Beermat Studio

One-page landing page for Beermat Studio (beermat.studio): websites for UK pubs. Built for ad traffic on phones.

Astro 7, static output, almost no client JS. Styled as a sibling of the Keep Calm & Beer It site. One small script handles the cookie banner, tracking, UTM capture and the enquiry form. The form posts to a Vercel serverless function (`api/enquiry.js`) that emails you through Resend.

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
- **Keep Calm & Beer It**: swap in final screenshots and confirm Cavan has given permission for the case study.
- **Privacy policy** (`src/pages/privacy.astro`): a plain-English draft that matches what the site does. Have it checked before you rely on it.

Copy and prices live in `src/data/content.ts`.

## Look and feel

Beermat Studio is a sibling of the Keep Calm & Beer It site, using its "Taproom" design tokens:

- **Colour:** near-black `#0B0907`, surfaces `#16120E` and `#211B15`, warm ink `#F0E8D8`, gold `#C8902F` for accents. Tokens are at the top of `src/styles/global.css`. The cream "paper" tone appears only inside the form and website mock-ups.
- **Type:** Oswald (uppercase headings), Montserrat (tracked labels and buttons), Source Serif 4 (body). All self-hosted Latin subsets in `public/fonts/`. Only Oswald 700 and Source Serif 400 are preloaded.
- **Details:** square corners, 2px-radius buttons, a gold hairline section label, one gold button per view, and a dark scrim only where text sits on a photo.
- **Festoon glow:** the Keep Calm site dropped its festoon-light graphics, so here they are only a few soft, slowly pulsing bulbs in `Glow.astro` over the hero and final photo. Delete `<Glow />` from `Hero.astro` and `Enquiry.astro` to remove them.
- **Motion:** a slow zoom on the hero photo, a gentle fade-up on the hero text and the bulb glow. All of it stops under `prefers-reduced-motion`.

## Images

Photos live in `src/assets/images/` and go through Astro's image pipeline (AVIF and WebP, `srcset`, width and height, lazy loading, hero preloaded). They are in `src/assets/` rather than `public/images/` so that processing works. Swap a photo by replacing the file with the same name (JPG, 2000px or wider, 3:2 landscape is ideal).

The photos currently there are **stand-ins** from the images supplied with the brief (I could not source Unsplash or Pexels shots in this environment). Check commercial use before launch, and note that `quiz-night.jpg` has a beer brand visible. Replace them with real pub photography, then record any credits here.

| File | Where it is used | Suggested shot |
| --- | --- | --- |
| `hero-bar.jpg` | Full-screen hero | Warm bar interior or a pint being poured. Leave the left half calm and dark for the headline. |
| `quiz-night.jpg` | Problem split (left half on desktop) | A busy quiz night: tables, pens, answer sheets, people laughing. |
| `sunday-roast.jpg` | Tile 2 (menu), tile 7 | A Sunday roast on a pub table, shot from above. |
| `behind-the-bar.jpg` | Tile 3 (book a table) | A landlord or bar staff behind the bar, pulling a pint. |
| `live-music.jpg` | Tile 4 (hours and map) | A band or solo act in warm stage light, crowd in the foreground. |
| `beer-garden.jpg` | Tile 6 and the final call-to-action (shown mirrored) | A beer garden at dusk with festoon lights and people. Keep the left third calm. |

The "what's included" tiles are listed in `includes` in `src/data/content.ts`. Each has an `image` (file name without extension), `alt` text and a `position` (the focal point). To give every tile its own photo, add files such as `menu-board.jpg`, `table-booking.jpg` and `pub-exterior.jpg` and point the tiles at them. Every photo needs descriptive alt text.

## Keep Calm & Beer It case study

The two device frames use screenshots taken from the Keep Calm & Beer It repo's `review/` folder (cropped to the top of the home page). Replace them with fresh, launch-quality shots by overwriting these files (png, jpg, webp or avif):

| File in `src/assets/case-study/` | Slot |
| --- | --- |
| `desktop-home.png` | Desktop frame, about 1440 x 900 |
| `mobile-home.png` | Phone frame, about 780 x 1330 (2x) is ideal |

Slots, file names and alt text are in `caseStudy.slots` in `src/data/content.ts`. Add `caseStudyUrl` in `src/data/site.ts` and a "See the live site" link appears. Get Cavan's permission before launch.

## How the form and tracking work

- **Enquiry form**: validated in the browser and again in `api/enquiry.js`. It has a honeypot field and a "filled in too fast" check. Both fake a success so bots learn nothing. The thank-you state replaces the form. No alerts.
- **UTMs**: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid` and `fbclid` are read from the URL into hidden fields, along with the landing page and referrer. They appear in the email, and the subject line shows the source and campaign.
- **Consent**: nothing from Google or Meta loads until the visitor clicks Accept. "No thanks" is just as prominent. The choice is saved in `localStorage` and can be reopened from "Cookie settings" in the footer.
- **After consent**: Meta Pixel `PageView`, GA4 page view. On a successful submit, Pixel `Lead` and GA4 `generate_lead` fire with a shared event ID. Clicks on `tel:`, `mailto:` and "Book a call" links send GA4 `click_call`, `click_email` and `click_book_call`.
- **Conversions API**: if `META_CAPI_TOKEN` and `PUBLIC_META_PIXEL_ID` are set and the visitor accepted cookies, the function also sends a server-side `Lead` with the same event ID, so Meta can de-duplicate it. Email and phone are SHA-256 hashed first.

## Brand images

`public/og.png` (social card) and `public/apple-touch-icon.png` are generated from `scripts/brand/*.html`. To regenerate after a change, install Playwright and run `node scripts/brand/make-brand-images.mjs`. `public/favicon.svg` is the mat.

## Showpiece features

- **Live demo** (How it works): a working "add an event" form. Visitors add an event and it appears, in date order, on a mock pub site; a just-passed event drops off by itself. Nothing is saved or sent. The code is the last block of `src/scripts/main.js`, the markup is `HowItWorks.astro`.
- **Hero phone**: a pub site on a phone where a new event pops in. Decorative, CSS only (`Hero.astro`).
- **Ticker band**: the big scrolling list of events (`Ticker.astro`). Edit the `items` array.
- **Stale-site mock** (problem section): an out-of-date pub site (`Problem.astro`). It is an illustration, not a real pub.
- **Scroll reveals and parallax**: CSS scroll-driven animations at the bottom of `global.css`. Browsers without support just show everything. All motion stops under `prefers-reduced-motion`.

## Lighthouse

Mobile, Lighthouse 13 default settings (simulated slow 4G), against the production build served locally with gzip and the same cache headers. Four runs, no tracking IDs set:

| Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- |
| 97 to 99 | 100 | 100 | 100 | 0.8 s | 0 | 100 to 180 ms |

Re-run it on the deployed URL once it is live.

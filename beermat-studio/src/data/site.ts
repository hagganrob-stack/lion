/**
 * Everything you need to fill in before launch lives here.
 * Search for "TODO" to find each placeholder.
 */
export const site = {
  name: 'Beermat Studio',
  url: 'https://beermat.studio',

  // TODO: confirm this mailbox exists.
  email: 'hello@beermat.studio',
  // TODO: add your phone number, e.g. '01926 000000'. Leave empty to hide it everywhere.
  phone: '',
  // TODO: add your Calendly (or similar) link. While it's empty, "Book a call" jumps to the enquiry form.
  bookingUrl: '',
  // TODO: trading entity for the footer, e.g. 'Beermat Studio is a trading name of Example Ltd (company no. 00000000).'
  legalLine: '',

  // TODO: add the live Keep Calm & Beer It address once it has launched. While empty, the "See the live site" link is hidden.
  caseStudyUrl: '',

  founder: 'Rob Haggan',
  town: 'Warwick',

  // Public IDs come from env vars at build time (see .env.example).
  metaPixelId: import.meta.env.PUBLIC_META_PIXEL_ID ?? '',
  ga4Id: import.meta.env.PUBLIC_GA4_ID ?? '',
};

export const phoneHref = site.phone ? `tel:${site.phone.replace(/[^\d+]/g, '')}` : '';
export const bookHref = site.bookingUrl || '#enquire';
export const bookIsExternal = Boolean(site.bookingUrl);
export const hasTracking = Boolean(site.metaPixelId || site.ga4Id);

/**
 * Site-wide settings. Edit here — everything else reads from this file.
 * Anything marked TODO_* needs a real value from Rob before it goes live.
 */
export const site = {
  name: "Local Lion",
  legalName: "Peak SEO Agency Limited",
  companyNumber: "16387592",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://locallion.co.uk",
  tagline: "Get found. Get more jobs.",
  description:
    "Websites, local SEO and Google Ads for UK electricians, plumbers, roofers and builders. Get found. Get more jobs.",
  // TODO_CONFIRM: check this mailbox exists before launch
  email: "hello@locallion.co.uk",
  // TODO_PHONE: add Rob's business number (e.g. "01926 000000"). Empty = call button hidden.
  phone: "" as string,
  // TODO_CALENDLY: paste the booking link, e.g. "https://calendly.com/yourname/15min". Empty = embed hidden.
  calendlyUrl: "" as string,
  // TODO_SOCIAL: add real profile URLs. Empty ones are hidden.
  social: { facebook: "" as string, instagram: "" as string, linkedin: "" as string, youtube: "" as string },
  location: "Warwick, England",
  nav: [
    { label: "Pricing", href: "/pricing" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
  ],
} as const;

export const trades = [
  { slug: "electricians", label: "Electricians", promise: "Fill the diary with EICRs, rewires and EV chargers." },
  { slug: "plumbers", label: "Plumbers", promise: "Be the name they find when the boiler packs in." },
  { slug: "roofers", label: "Roofers", promise: "Turn a storm-week search into booked roof jobs." },
  { slug: "builders", label: "Builders", promise: "Show off the work and win bigger projects." },
] as const;

export type TradeSlug = (typeof trades)[number]["slug"];

export const proofPoints = [
  { icon: "bolt", title: "Live in 7 days", text: "From first call to live site." },
  { icon: "pound", title: "From £99/month", text: "Clear prices, no surprises." },
  { icon: "pin", title: "Built by a local SEO specialist", text: "Made to be found on Google." },
  { icon: "handshake", title: "No waffle. No lock-in games.", text: "Plain terms, in plain English." },
] as const;

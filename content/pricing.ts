/**
 * Pricing — Rob to confirm figures. Edit freely; the homepage, /pricing and trade pages all read this file.
 */
export type Plan = {
  id: string;
  name: string;
  price: string;
  per: string;
  note?: string;
  blurb: string;
  features: string[];
  popular?: boolean;
  cta: string;
};

export const plans: Plan[] = [
  {
    id: "launch",
    name: "Launch",
    price: "£1,200",
    per: "one-off",
    note: "+ £185/year hosting",
    blurb: "Own your site outright. Live in 7 days.",
    features: [
      "Up to 7 pages",
      "Service pages for what you actually sell",
      "Quote request form",
      "Google Business Profile setup",
      "Mobile-first and fast",
      "Live in 7 days",
    ],
    cta: "Start with Launch",
  },
  {
    id: "monthly",
    name: "Pay monthly",
    price: "£99",
    per: "per month",
    note: "12-month minimum",
    blurb: "Everything in Launch, spread out, with us looking after it.",
    features: [
      "Everything in Launch",
      "Hosting included",
      "Updates and small edits",
      "Google Business Profile setup",
      "Live in 7 days",
    ],
    popular: true,
    cta: "Get a free audit",
  },
  {
    id: "growth",
    name: "Growth",
    price: "£249",
    per: "per month",
    note: "Pay monthly + local SEO",
    blurb: "For firms that want to climb Google Maps and own their area.",
    features: [
      "Everything in Pay monthly",
      "Service-area pages",
      "Google Business Profile posts",
      "Review requests",
      "Monthly report",
    ],
    cta: "Get a free audit",
  },
];

export const adsAddon = {
  name: "Google Ads management",
  // TODO_PRICE: Rob to set the Google Ads management price
  price: "TODO_PRICE",
  blurb: "An add-on to any plan. Pay for calls, not clicks you can't see.",
};

export const comparison: { row: string; values: (boolean | string)[] }[] = [
  { row: "Up to 7 pages", values: [true, true, true] },
  { row: "Service pages", values: [true, true, true] },
  { row: "Quote request form", values: [true, true, true] },
  { row: "Google Business Profile setup", values: [true, true, true] },
  { row: "Live in 7 days", values: [true, true, true] },
  { row: "Hosting", values: ["£185/year", "Included", "Included"] },
  { row: "Updates and small edits", values: [false, true, true] },
  { row: "Service-area pages", values: [false, false, true] },
  { row: "Google Business Profile posts", values: [false, false, true] },
  { row: "Review requests", values: [false, false, true] },
  { row: "Monthly report", values: [false, false, true] },
];

export const pricingFaqs = [
  { q: "Is there a contract?", a: "Launch is a one-off payment with no contract. Pay monthly has a 12-month minimum, and we say so up front. No small print." },
  { q: "What does hosting cover?", a: "Fast, secure hosting for your site. On Launch it's £185 a year. On the monthly plans it's already included." },
  { q: "Do I own my website?", a: "On Launch, yes. It's yours. On the monthly plans we run it for you for as long as you're with us. Ask us for the details on a call." },
  { q: "What about Google Ads?", a: "It's an add-on to any plan. We set up and manage the campaigns so you pay for calls you can actually track. Ask about it on your free audit." },
  { q: "Can I switch plans later?", a: "Yes. Plenty of people start on Pay monthly and move up to Growth once the phone starts ringing." },
  { q: "Are there any hidden fees?", a: "No. The prices on this page are the prices. Ad spend goes straight to Google and is separate from our fee." },
];

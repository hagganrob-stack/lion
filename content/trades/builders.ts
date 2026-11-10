import type { TradeContent } from "./types";

// TODO_REVIEW: scaffolded copy — Rob to review every line before launch.
export const builders: TradeContent = {
  slug: "builders",
  name: "Builders",
  singular: "builder",
  accent: "orange",
  prop: "hardhat",
  needsReview: true,
  seo: {
    title: "Builder Website Design UK | Websites for Builders | Local Lion",
    description:
      "Websites, local SEO and Google Ads for UK builders. Win extensions, loft conversions and renovations with a site that shows your best projects. Live in 7 days, from £99/month.",
  },
  hero: {
    eyebrow: "Websites for builders",
    h1: ["Websites that build", "builders", "bigger jobs."],
    sub: "Big projects need big trust. Show your best work, your credentials and your process, and win the jobs worth winning.",
  },
  trust: {
    heading: "What your customers check before they call",
    intro: "People are handing over a lot of money and a lot of trust. Give them reasons to pick you.",
    items: [
      { title: "TrustMark and FMB", text: "Scheme membership shown clearly, where you hold it." },
      { title: "Project galleries", text: "Finished extensions, lofts and renovations, shown big and fast." },
      { title: "Insurance and warranties", text: "What's covered, in plain words." },
      { title: "Your process", text: "From quote to handover, so customers know what to expect." },
      { title: "Real reviews", text: "Genuine Google reviews only." },
      { title: "A named person", text: "Who they'll deal with, and how to reach them." },
    ],
  },
  features: {
    heading: "Built for builders",
    intro: "Designed to win considered, high-value projects.",
    items: [
      { title: "Project showcase pages", text: "One page per project with photos, scope and the story behind it." },
      { title: "Page per project type", text: "Extensions, lofts, renovations and garage conversions, each able to rank." },
      { title: "Local pages", text: "Cover the towns you build in." },
      { title: "Enquiry form built for big jobs", text: "Collects scope, budget range and timing so you only chase good leads." },
      { title: "Process explained", text: "Reduces the fear of builders turning up late or going quiet." },
      { title: "Google Business Profile done right", text: "Photos and services set up properly." },
    ],
  },
  services: {
    heading: "Pages we build for your money jobs",
    intro: "Each one is a page that can rank and bring in enquiries.",
    items: ["Extensions", "Loft conversions", "Renovations", "Garage conversions", "Groundworks", "Kitchen and bathroom fit-outs", "New builds", "Structural alterations"],
  },
  demo: { title: "See how it looks", caption: "Demo builder site — a concept built to show the style, not a real client." },
  faqs: [
    { q: "Can you show my TrustMark or FMB membership?", a: "Yes, if you hold it. We only show accreditations that are genuinely yours." },
    { q: "Can I show lots of project photos?", a: "Yes. Galleries are built to load fast even with plenty of images." },
    { q: "Will I attract bigger jobs?", a: "A site that shows quality work and a clear process helps. We can't promise outcomes, but we build to attract the right enquiries." },
    { q: "Do you build a page per project?", a: "Yes. Project pages are great for showing real work and for ranking locally." },
    { q: "Can you run Google Ads for me?", a: "Yes, as an add-on. Worth it for high-value jobs like extensions and lofts." },
    { q: "How long until I'm live?", a: "Seven days from your 15-minute call, once we have your photos and details." },
  ],
  closing: "Ready to be the builder everyone calls?",
};

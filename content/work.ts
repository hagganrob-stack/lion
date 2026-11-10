export type CaseStudy = {
  slug: string;
  client: string;
  trade: string;
  service: string;
  summary: string;
  challenge: string;
  whatWeDid: string;
  result: string;
  url?: string;
  isDemo?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "cdh-roofing",
    client: "CDH Roofing",
    trade: "Roofer",
    service: "Website build",
    summary: "A fast, mobile-first website for a working roofing firm.",
    // TODO_PROOF: Rob to write the real challenge, what was built and the result. No numbers until they're evidenced.
    challenge: "TODO_PROOF: what CDH Roofing needed (e.g. no site, old site, not showing on Google).",
    whatWeDid: "TODO_PROOF: what we built — pages, service areas, quote form, Google Business Profile.",
    result: "TODO_PROOF: real, evidenced outcome only (enquiries, rankings, calls). Leave out until true.",
    url: "", // TODO_PROOF: live site URL
  },
];

/** Clearly-labelled demo sites. Never present these as client work. */
export const demos = [
  { trade: "Electricians", title: "Demo: Spark & Co Electrical", note: "Concept site built to show what we can do." },
  { trade: "Plumbers", title: "Demo: Northside Plumbing", note: "Concept site built to show what we can do." },
];

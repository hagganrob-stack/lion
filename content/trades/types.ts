import type { Faq } from "../faqs";

export type TradeContent = {
  slug: string;
  name: string; // "Electricians"
  singular: string; // "electrician"
  accent: "cyan" | "orange";
  prop: "lightning" | "wrench" | "hardhat";
  /** TODO_REVIEW marker: true = scaffolded copy Rob must review before launch */
  needsReview: boolean;
  seo: { title: string; description: string };
  hero: { eyebrow: string; h1: [string, string, string?]; sub: string };
  trust: { heading: string; intro: string; items: { title: string; text: string }[] };
  features: { heading: string; intro: string; items: { title: string; text: string }[] };
  services: { heading: string; intro: string; items: string[] };
  demo: { title: string; caption: string };
  faqs: Faq[];
  closing: string;
};

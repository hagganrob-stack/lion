import type { Metadata } from "next";
import { site } from "@/content/site";

export function pageMeta(opts: { title: string; description: string; path: string }): Metadata {
  return {
    title: { absolute: opts.title },
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: { title: opts.title, description: opts.description, url: opts.path, siteName: site.name, locale: "en_GB", type: "website" },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description },
  };
}

export const orgLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#org`,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      logo: `${site.url}/brand/logo-mark.svg`,
      identifier: site.companyNumber,
      email: site.email,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: site.name,
      url: site.url,
      description: site.description,
      parentOrganization: { "@id": `${site.url}/#org` },
      areaServed: { "@type": "Country", name: "United Kingdom" },
      address: { "@type": "PostalAddress", addressLocality: "Warwick", addressCountry: "GB" },
      priceRange: "££",
    },
  ],
};

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${site.url}${it.path}`,
  })),
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

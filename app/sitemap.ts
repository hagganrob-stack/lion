import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes = ["", "electricians", "plumbers", "roofers", "builders", "pricing", "how-it-works", "work", "about", "free-audit", "contact", "privacy", "cookies", "terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: r ? `${site.url}/${r}` : site.url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: r === "" ? 1 : ["electricians", "plumbers", "roofers", "builders", "pricing"].includes(r) ? 0.9 : 0.6,
  }));
}

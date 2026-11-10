import Link from "next/link";
import { Hero } from "./Hero";
import { ProofStrip } from "./ProofStrip";
import { SectionHead } from "./SectionHead";
import { Icon } from "./Icons";
import { DeviceFrame } from "./DeviceFrame";
import { Steps } from "./Steps";
import { PricingCards } from "./PricingCards";
import { FAQ } from "./FAQ";
import { CTA } from "./CTA";
import { TradeCards } from "./TradeCards";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";
import { site } from "@/content/site";
import type { TradeContent } from "@/content/trades/types";

export function TradePage({ t }: { t: TradeContent }) {
  const hot = t.accent === "cyan" ? "c" : "o";
  const [l1, l2, l3] = t.hero.h1;
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Websites, local SEO and Google Ads for ${t.name.toLowerCase()}`,
            serviceType: `${t.singular} website design`,
            provider: { "@id": `${site.url}/#org` },
            areaServed: { "@type": "Country", name: "United Kingdom" },
            description: t.seo.description,
            url: `${site.url}/${t.slug}`,
          },
          breadcrumbLd([{ name: "Home", path: "/" }, { name: t.name, path: `/${t.slug}` }]),
        ]}
      />
      <Hero
        eyebrow={t.hero.eyebrow}
        h1Class="h-trade"
        h1={<>{l1}<br /><span className={hot}>{l2}</span><br /><span className="o">{l3}</span></>}
        sub={t.hero.sub}
        accent={t.accent}
        features={[
          { icon: "search", label: "Rank higher in your area" },
          { icon: "globe", label: "Websites that win jobs" },
          { icon: "megaphone", label: "Ads that fill the diary" },
        ]}
      />
      <ProofStrip />

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Trust" title={t.trust.heading} intro={t.trust.intro} />
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {t.trust.items.map((it, i) => (
              <li key={it.title} className="reveal card flex gap-4 p-6" style={{ ["--i" as string]: i % 3 }}>
                <span className="mt-0.5 grid h-10 w-10 flex-none place-items-center rounded-lg border border-line bg-surface-2 text-cyan"><Icon name="shield" size={22} /></span>
                <div><h3 className="font-bold text-ink">{it.title}</h3><p className="mt-1.5 text-[0.95rem]">{it.text}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Features" title={<>{t.features.heading.replace(/\.$/, "")}<span className="o">.</span></>} intro={t.features.intro} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {t.features.items.map((it, i) => (
              <div key={it.title} className="reveal card p-6" style={{ ["--i" as string]: i % 3 }}>
                <p className={`display text-4xl ${i % 2 ? "o" : "c"}`}>{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-lg font-bold text-ink">{it.title}</h3>
                <p className="mt-2 text-[0.95rem]">{it.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Services" title={t.services.heading} intro={t.services.intro} />
          <ul className="reveal flex flex-wrap gap-3">
            {t.services.items.map((s) => (
              <li key={s} className="rounded-full border border-line bg-surface px-5 py-2.5 font-semibold text-ink transition-colors hover:border-cyan hover:text-cyan">{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Demo" title={t.demo.title} intro={t.demo.caption} center />
          <div className="reveal pb-8"><DeviceFrame label="Demo" accent={t.accent} /></div>
        </div>
      </section>

      <Steps />
      <PricingCards preview />
      <FAQ faqs={t.faqs} title={`${t.name} FAQ`} />
      <TradeCards current={t.slug} />
      <CTA title={<>{t.closing.replace(/\?$/, "")}<span className="o">?</span></>} />
      <p className="wrap pb-10 text-sm">
        See also <Link href="/pricing" className="c underline">pricing</Link> and the <Link href="/free-audit" className="c underline">free audit</Link>.
      </p>
    </>
  );
}

import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { TradeCards } from "@/components/TradeCards";
import { SectionHead } from "@/components/SectionHead";
import { Steps } from "@/components/Steps";
import { PricingCards } from "@/components/PricingCards";
import { WorkTeaser } from "@/components/WorkTeaser";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Icon } from "@/components/Icons";
import { homeFaqs } from "@/content/faqs";
import { reviews } from "@/content/reviews";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Websites for Tradesmen UK | Local SEO & Google Ads | Local Lion",
  description:
    "Get found. Get more jobs. Websites, local SEO and Google Ads for UK electricians, plumbers, roofers and builders. Live in 7 days, from £99/month.",
  path: "/",
});

const what = [
  { icon: "globe", title: "Websites", text: "Fast, mobile-first and built to convert. Made for people searching from the van or the sofa, with one job: get them to call you." },
  { icon: "pin", title: "Local SEO", text: "Google Maps, service-area pages and reviews. We get you in front of people searching for your trade in your town." },
  { icon: "megaphone", title: "Google Ads", text: "Pay for calls, not clicks you can't see. We set up and manage the campaigns, and you see what comes in." },
] as const;

export default function Home() {
  return (
    <>
      <Hero
        eyebrow={<>Websites / SEO / Google Ads <span className="hidden text-muted sm:inline">—</span> for trades businesses</>}
        h1={<>Get found.<br />Get <span className="c">more</span> <span className="o">jobs.</span></>}
        sub="Websites, local SEO and Google Ads for electricians, plumbers, roofers and builders who want their phone ringing — not their weekends spent on marketing."
      />
      <ProofStrip />
      <TradeCards />

      <section className="section">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <SectionHead eyebrow="The problem" title={<>Word of mouth is great. Until it goes <span className="o">quiet.</span></>} />
          <div className="reveal space-y-5 text-lg text-ink/80">
            <p>Someone's boiler packs in. They grab their phone and search "emergency plumber near me". They ring the first few names Google shows them. Not the best plumber. The first one.</p>
            <p>If that isn't you, the job goes to someone else. Nobody tells you. The phone just stays quiet.</p>
            <p className="font-bold text-ink">We fix that. <span className="c">So the jobs come to you.</span></p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="What we do" title={<>Three things. <span className="c">One</span> team<span className="o">.</span></>} />
          <div className="grid gap-5 md:grid-cols-3">
            {what.map((w, i) => (
              <div key={w.title} className="reveal card p-7" style={{ ["--i" as string]: i }}>
                <span className={`grid h-14 w-14 place-items-center rounded-xl border border-line bg-surface-2 ${i === 1 ? "o" : "c"}`}><Icon name={w.icon} size={28} /></span>
                <h3 className="display h-md mt-5">{w.title}</h3>
                <p className="mt-3">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Steps />
      <PricingCards preview />
      <WorkTeaser />

      {reviews.length > 0 && (
        <section className="section">
          <div className="wrap">
            <SectionHead eyebrow="Reviews" title={<>What customers say<span className="o">.</span></>} />
            <div className="grid gap-5 md:grid-cols-3">
              {reviews.map((r) => (
                <figure key={r.name} className="reveal card p-7">
                  <blockquote className="text-ink">"{r.quote}"</blockquote>
                  <figcaption className="mt-4 text-sm">{r.name}, {r.business}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQ faqs={homeFaqs} />
      <CTA />
    </>
  );
}

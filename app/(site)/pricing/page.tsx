import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PricingCards } from "@/components/PricingCards";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Icon } from "@/components/Icons";
import { SectionHead } from "@/components/SectionHead";
import { adsAddon, comparison, plans, pricingFaqs } from "@/content/pricing";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Website Pricing for Trades | From £99/month | Local Lion",
  description: "Clear pricing for trades websites. Launch £1,200 one-off, Pay monthly £99/month or Growth £249/month with local SEO. Live in 7 days.",
  path: "/pricing",
});

const cell = (v: boolean | string) =>
  v === true ? <Icon name="check" size={20} className="mx-auto text-cyan" aria-label="Included" /> : v === false ? <span className="text-muted/50" aria-label="Not included">—</span> : <span className="text-ink">{v}</span>;

export default function Pricing() {
  const isTodo = adsAddon.price.startsWith("TODO");
  return (
    <>
      <PageHeader eyebrow="Pricing" crumb="Pricing" path="/pricing" title={<>Clear prices<span className="o">.</span> <span className="c">No surprises</span><span className="o">.</span></>} intro="Pick a plan, get a site in 7 days. Switch plans whenever it suits you." />
      <PricingCards />
      <section className="section !pt-0">
        <div className="wrap">
          <div className="reveal card flex flex-col items-start justify-between gap-5 p-7 md:flex-row md:items-center">
            <div>
              <h2 className="display h-md">{adsAddon.name} <span className="o">add-on</span></h2>
              <p className="mt-2">{adsAddon.blurb}</p>
            </div>
            <Link href="/free-audit" className="btn btn-ghost flex-none">{isTodo ? "Ask about Google Ads" : `${adsAddon.price} — ask us`} <Icon name="arrow" size={18} className="arr" /></Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Compare" title={<>Side by <span className="c">side</span><span className="o">.</span></>} />
          <div className="reveal overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">Comparison of Local Lion plans</caption>
              <thead>
                <tr className="bg-surface-2">
                  <th scope="col" className="p-4 text-sm font-semibold text-muted">What you get</th>
                  {plans.map((p) => <th key={p.id} scope="col" className={`p-4 text-center display text-xl ${p.popular ? "o" : "text-ink"}`}>{p.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {comparison.map((r) => (
                  <tr key={r.row} className="border-t border-line">
                    <th scope="row" className="p-4 text-[0.95rem] font-medium text-ink/90">{r.row}</th>
                    {r.values.map((v, i) => <td key={i} className="p-4 text-center text-sm">{cell(v)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <FAQ faqs={pricingFaqs} title="Pricing questions" />
      <CTA />
    </>
  );
}

import Link from "next/link";
import { plans } from "@/content/pricing";
import { Icon } from "./Icons";
import { SectionHead } from "./SectionHead";

export function PricingCards({ preview = false }: { preview?: boolean }) {
  return (
    <section className="section">
      <div className="wrap">
        {preview && (
          <SectionHead eyebrow="Pricing" title={<>Clear prices. <span className="c">No surprises</span><span className="o">.</span></>} intro="Pick the plan that fits. Switch whenever it suits you." />
        )}
        <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {plans.map((p, i) => (
            <div
              key={p.id}
              className={`reveal card relative flex flex-col p-7 ${p.popular ? "border-orange shadow-[0_0_60px_-10px_rgb(255_122_26/0.5)] lg:-my-3 lg:py-10" : ""}`}
              style={{ ["--i" as string]: i }}
            >
              {p.popular && (
                <span className="absolute -top-3.5 left-7 rounded-full bg-orange px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-bg">Most popular</span>
              )}
              <h3 className="display h-md">{p.name}</h3>
              <p className="mt-4 flex items-baseline gap-2">
                <span className={`display text-6xl ${p.popular ? "o glow-text-o" : "text-ink"}`}>{p.price}</span>
                <span className="text-sm">{p.per}</span>
              </p>
              {p.note && <p className="mt-1 text-sm font-semibold text-ink/80">{p.note}</p>}
              <p className="mt-4">{p.blurb}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 text-ink/90">
                    <Icon name="check" size={20} className="mt-0.5 flex-none text-cyan" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/free-audit" className={`btn mt-8 ${p.popular ? "btn-primary" : "btn-ghost"}`}>
                {p.cta} <Icon name="arrow" size={18} className="arr" />
              </Link>
            </div>
          ))}
        </div>
        {preview && (
          <p className="mt-8 text-center">
            <Link href="/pricing" className="c font-bold underline underline-offset-4">See everything that's included →</Link>
          </p>
        )}
      </div>
    </section>
  );
}

import Link from "next/link";
import { Icon, type IconName } from "./Icons";
import { trades } from "@/content/site";
import { SectionHead } from "./SectionHead";

const icons: Record<string, IconName> = { electricians: "bolt", plumbers: "wrench", roofers: "roof", builders: "hardhat" };

export function TradeCards({ current }: { current?: string }) {
  const list = current ? trades.filter((t) => t.slug !== current) : trades;
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          eyebrow={current ? "Other trades" : "Pick your trade"}
          title={current ? <>Not your trade? <span className="o">Pick yours.</span></> : <>Built for <span className="c">your</span> trade<span className="o">.</span></>}
          intro={current ? undefined : "Each trade gets its own site, built around what its customers actually search for and check."}
        />
        <ul className={`grid gap-5 sm:grid-cols-2 ${current ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
          {list.map((t, i) => {
            const orange = i % 2 === 1;
            return (
              <li key={t.slug} className="reveal" style={{ ["--i" as string]: i }}>
                <Link
                  href={`/${t.slug}`}
                  className={`group card relative flex h-full flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 ${
                    orange ? "hover:border-orange hover:shadow-[0_0_40px_-6px_rgb(255_122_26/0.5)]" : "hover:border-cyan hover:shadow-[0_0_40px_-6px_rgb(34_211_238/0.5)]"
                  }`}
                >
                  <span className={`grid h-14 w-14 place-items-center rounded-xl border border-line bg-surface-2 ${orange ? "o" : "c"}`}>
                    <Icon name={icons[t.slug]} size={30} />
                  </span>
                  <h3 className="display h-md mt-5">{t.label}</h3>
                  <p className="mt-2 flex-1 text-[0.95rem]">{t.promise}</p>
                  <span className={`mt-5 inline-flex items-center gap-2 font-bold ${orange ? "o" : "c"}`}>
                    See the site <Icon name="arrow" size={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

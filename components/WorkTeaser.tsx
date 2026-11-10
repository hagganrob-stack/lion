import Link from "next/link";
import { SectionHead } from "./SectionHead";
import { Icon } from "./Icons";
import { caseStudies, demos } from "@/content/work";

export function WorkTeaser() {
  const cdh = caseStudies[0];
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead eyebrow="Work" title={<>Real work. <span className="c">No fake logos</span><span className="o">.</span></>} intro="Here's what we've built, and what's clearly just a demo." />
        <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr_1fr]">
          <Link href="/work" className="reveal card group flex flex-col p-7 transition-all hover:border-cyan">
            <span className="w-fit rounded-full border border-cyan/50 bg-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan">Case study</span>
            <h3 className="display h-lg mt-5">{cdh.client}</h3>
            <p className="mt-1 text-sm font-semibold text-ink/80">{cdh.trade} · {cdh.service}</p>
            <p className="mt-4 flex-1">{cdh.summary}</p>
            <span className="c mt-6 inline-flex items-center gap-2 font-bold">Read the story <Icon name="arrow" size={18} className="transition-transform group-hover:translate-x-1" /></span>
          </Link>
          {demos.map((d, i) => (
            <div key={d.title} className="reveal card flex flex-col p-7" style={{ ["--i" as string]: i + 1 }}>
              <span className="w-fit rounded-full border border-orange/50 bg-orange/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange">Demo</span>
              <h3 className="display h-md mt-5">{d.title.replace("Demo: ", "")}</h3>
              <p className="mt-1 text-sm font-semibold text-ink/80">{d.trade}</p>
              <p className="mt-4">{d.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { SectionHead } from "@/components/SectionHead";
import { DeviceFrame } from "@/components/DeviceFrame";
import { caseStudies, demos } from "@/content/work";
import { isTodo } from "@/lib/todo";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Work | Trades Website Case Studies | Local Lion",
  description: "See what Local Lion has built for trades businesses, starting with CDH Roofing. Demo sites are clearly labelled.",
  path: "/work",
});

export default function Work() {
  return (
    <>
      <PageHeader eyebrow="Work" crumb="Work" path="/work" title={<>Real work<span className="o">.</span> <span className="c">Clearly labelled</span><span className="o">.</span></>} intro="Case studies are real. Demo sites are labelled as demos. We don't dress one up as the other." />
      {caseStudies.map((c) => (
        <section key={c.slug} className="section !pt-4">
          <div className="wrap">
            <article className="reveal card p-6 md:p-10">
              <span className="rounded-full border border-cyan/50 bg-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan">Case study</span>
              <h2 className="display h-xl mt-5">{c.client}</h2>
              <p className="mt-2 font-semibold text-ink/80">{c.trade} · {c.service}</p>
              {isTodo(c.challenge) || isTodo(c.whatWeDid) || isTodo(c.result) ? (
                <p className="mt-8 max-w-2xl text-lg">{c.summary} The full write-up is on its way. We only publish results we can back up.</p>
              ) : (
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  {[["The challenge", c.challenge], ["What we did", c.whatWeDid], ["The result", c.result]].map(([h, t]) => (
                    <div key={h}><h3 className="display h-md o">{h}</h3><p className="mt-3">{t}</p></div>
                  ))}
                </div>
              )}
              {c.url && <p className="mt-8"><a href={c.url} className="btn btn-ghost" rel="noopener noreferrer" target="_blank">Visit the live site</a></p>}
            </article>
          </div>
        </section>
      ))}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Demos" title={<>Demo sites<span className="o">.</span></>} intro="Concepts we built to show what's possible. They are not client work." />
          <div className="grid gap-12 md:grid-cols-2">
            {demos.map((d, i) => (
              <div key={d.title} className="reveal pb-6">
                <DeviceFrame label="Demo" accent={i % 2 ? "orange" : "cyan"} />
                <h3 className="display h-md mt-10">{d.title}</h3>
                <p className="mt-1">{d.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

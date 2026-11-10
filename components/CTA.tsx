import { LeadForm } from "./LeadForm";
import { Lion } from "./Lion";
import { Glow } from "./Glow";

export function CTA({ title, prop = "none", id = "audit" }: { title?: React.ReactNode; prop?: "none" | "lightning" | "wrench" | "hardhat"; id?: string }) {
  return (
    <section id={id} className="section">
      <div className="wrap">
        <div className="relative isolate overflow-hidden rounded-3xl border border-cyan/40 bg-[linear-gradient(135deg,#0e1626,#15203a)] p-6 shadow-[0_0_80px_-20px_rgb(34_211_238/0.5),0_0_120px_-40px_rgb(255_122_26/0.5)] md:p-12">
          <Glow color="cyan" className="-left-24 -top-24 -z-10" size={460} />
          <Glow color="orange" className="-bottom-32 -right-24 -z-10" size={460} />
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <div className="relative">
              <p className="eyebrow">Free audit</p>
              <h2 className="display h-xl mt-4">
                {title ?? (<>Ready to be the name everyone <span className="o glow-text-o">calls</span> locally?</>)}
              </h2>
              <p className="mt-5 max-w-md text-lg text-ink/80">
                Tell us a bit about you. Within 2 working days you'll get a short, personal audit of your Google ranking, Google Business Profile and website speed. Free, no strings.
              </p>
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 hidden w-52 opacity-90 lg:block">
                <Lion prop={prop} className="h-auto w-full" />
              </div>
            </div>
            <LeadForm compact source="cta" />
          </div>
        </div>
      </div>
    </section>
  );
}

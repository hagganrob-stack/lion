import { SectionHead } from "./SectionHead";

export const steps = [
  { n: "01", title: "15-minute call", text: "Tell us what you do, where you work and what jobs you want more of. No jargon, no hard sell." },
  { n: "02", title: "Built in 7 days", text: "We write it, build it and set up your Google Business Profile. You approve it. That's it." },
  { n: "03", title: "Go live & get found", text: "Your site goes live, built to rank locally and turn searches into phone calls." },
];

export function Steps({ heading = true }: { heading?: boolean }) {
  return (
    <section className="section">
      <div className="wrap">
        {heading && <SectionHead eyebrow="How it works" title={<>Three steps. <span className="o">No faff.</span></>} />}
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.n} className="reveal card relative overflow-hidden p-7" style={{ ["--i" as string]: i }}>
              <span aria-hidden="true" className={`display absolute -right-2 -top-4 select-none text-[8rem] leading-none opacity-20 ${i === 1 ? "o" : "c"}`}>{s.n}</span>
              <span className={`display text-6xl ${i === 1 ? "o glow-text-o" : "c glow-text-c"}`}>{s.n}</span>
              <h3 className="display h-md mt-3">{s.title}</h3>
              <p className="mt-3">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

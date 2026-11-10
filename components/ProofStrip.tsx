import { Icon } from "./Icons";
import { proofPoints } from "@/content/site";

export function ProofStrip() {
  return (
    <section aria-label="Why Local Lion" className="relative z-10 -mt-4 pb-4">
      <div className="wrap">
        <ul className="glass grid gap-px overflow-hidden p-0 sm:grid-cols-2 lg:grid-cols-4">
          {proofPoints.map((p, i) => (
            <li key={p.title} className="reveal flex items-start gap-4 p-5 md:p-6" style={{ ["--i" as string]: i }}>
              <span className={`grid h-11 w-11 flex-none place-items-center rounded-xl border border-line bg-surface-2 ${i % 2 ? "o" : "c"}`}>
                <Icon name={p.icon} size={22} />
              </span>
              <div>
                <p className="font-bold leading-snug text-ink">{p.title}</p>
                <p className="mt-0.5 text-sm">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

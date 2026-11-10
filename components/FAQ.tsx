import { SectionHead } from "./SectionHead";
import { JsonLd } from "./JsonLd";
import { faqLd } from "@/lib/seo";
import type { Faq } from "@/content/faqs";

export function FAQ({ faqs, title = "Straight answers" }: { faqs: Faq[]; title?: string }) {
  return (
    <section className="section">
      <JsonLd data={faqLd(faqs)} />
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHead eyebrow="FAQ" title={<>{title}<span className="o">.</span></>} />
        <div className="faq reveal border-t border-line">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <svg className="plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
              </summary>
              <p className="ans">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

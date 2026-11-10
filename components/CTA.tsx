import { LeadForm } from "./LeadForm";

export function CTA({ title, id = "audit" }: { title?: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="section">
      <div className="wrap">
        <div className="theme-dark rounded-3xl p-6 md:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">Free audit</p>
              <h2 className="display h-xl mt-4">
                {title ?? (<>Ready to be the name everyone <span className="o">calls</span> locally?</>)}
              </h2>
              <p className="mt-5 max-w-md text-lg text-ink/80">
                Tell us a bit about you. Within 2 working days you'll get a short, personal audit of your Google ranking, Google Business Profile and website speed. Free, no strings.
              </p>
            </div>
            <LeadForm compact source="cta" />
          </div>
        </div>
      </div>
    </section>
  );
}

import { PageHeader } from "@/components/PageHeader";
import { LeadForm } from "@/components/LeadForm";
import { Icon, type IconName } from "@/components/Icons";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Free Website & Google Audit for Trades | Local Lion",
  description: "Find out why you're not getting the calls. A free, personal audit of your Google ranking, Google Business Profile and website speed, within 2 working days.",
  path: "/free-audit",
});

const gets: { icon: IconName; t: string; d: string }[] = [
  { icon: "search", t: "Your Google ranking", d: "Where you show up when customers search for your trade in your area." },
  { icon: "pin", t: "Your Google Business Profile", d: "What's missing or wrong on the listing that drives most 'near me' calls." },
  { icon: "clock", t: "Your website speed", d: "How quickly your site loads on a phone, because slow sites lose jobs." },
];

export default function FreeAudit() {
  return (
    <>
      <PageHeader eyebrow="Free audit" crumb="Free audit" path="/free-audit" title={<>Find out why you're not getting the <span className="o">calls.</span></>} intro="A short, personal video or PDF covering your Google ranking, Google Business Profile and website speed. Yours within 2 working days." />
      <section className="section !pt-4">
        <div className="wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="display h-lg">What you <span className="c">get</span></h2>
            <ul className="mt-6 space-y-5">
              {gets.map((g) => (
                <li key={g.t} className="reveal flex gap-4">
                  <span className="grid h-12 w-12 flex-none place-items-center rounded-xl border border-line bg-surface-2 text-cyan"><Icon name={g.icon} size={24} /></span>
                  <div><h3 className="font-bold text-ink">{g.t}</h3><p className="mt-1">{g.d}</p></div>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-l-2 border-orange pl-4 text-ink/80">No strings. No hard sell. If we can help, we'll say how. If we can't, you still keep the audit.</p>
          </div>
          <LeadForm source="free-audit" />
        </div>
      </section>
    </>
  );
}

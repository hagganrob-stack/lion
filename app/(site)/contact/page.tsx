import { PageHeader } from "@/components/PageHeader";
import { LeadForm } from "@/components/LeadForm";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { Icon } from "@/components/Icons";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Local Lion | Book a 15-Minute Call",
  description: "Talk to Rob about a website, local SEO or Google Ads for your trades business. Book a free 15-minute call or send a message.",
  path: "/contact",
});

export default function Contact() {
  return (
    <>
      <PageHeader eyebrow="Contact" crumb="Contact" path="/contact" title={<>Let's have a <span className="c">chat</span><span className="o">.</span></>} intro="Fifteen minutes, no jargon. Book a slot, drop us a line or ask for a free audit." />
      <section className="section !pt-4">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <div>
            <ul className="space-y-4">
              <li><a href={`mailto:${site.email}`} className="card flex items-center gap-4 p-5 hover:border-cyan"><Icon name="mail" className="text-cyan" /><span className="font-semibold text-ink">{site.email}</span></a></li>
              {site.phone && <li><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="card flex items-center gap-4 p-5 hover:border-cyan"><Icon name="phone" className="text-cyan" /><span className="font-semibold text-ink">{site.phone}</span></a></li>}
            </ul>
            <p className="mt-6">Based in {site.location}. Working with trades businesses across the UK.</p>
            <div className="mt-8">
              {site.calendlyUrl ? <CalendlyEmbed url={site.calendlyUrl} /> : <p className="card p-6">Booking calendar coming soon — use the form or email us and we'll fix a time.</p>}
            </div>
          </div>
          <LeadForm source="contact" />
        </div>
      </section>
    </>
  );
}

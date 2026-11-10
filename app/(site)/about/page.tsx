import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { SectionHead } from "@/components/SectionHead";
import { Icon } from "@/components/Icons";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Rob | Local SEO for Trades in Warwick | Local Lion",
  description: "Local Lion is run by Rob, a local SEO specialist in Warwick, building websites and getting trades businesses found on Google.",
  path: "/about",
});

const principles = [
  "You deal with the person doing the work.",
  "Websites, SEO and Google Ads under one roof.",
  "Plain English. No waffle, no lock-in games.",
  "Real reviews only. If we can't prove it, we don't say it.",
];

export default function About() {
  return (
    <>
      <PageHeader eyebrow="About" crumb="About" path="/about" title={<>Hi, I'm <span className="c">Rob</span><span className="o">.</span></>} intro={`I'm a local SEO specialist based in ${site.location}. I build websites and get trades businesses found on Google.`} />
      <section className="section !pt-4">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* TODO_PHOTO: replace with a real photo of Rob (next/image, with alt text). */}
          <div className="reveal card grid aspect-[4/5] place-items-center border-dashed p-6 text-center" role="img" aria-label="Photo of Rob coming soon">
            <div><Icon name="camera" size={40} className="mx-auto text-cyan" /><p className="mt-3 font-semibold text-ink">Photo coming soon</p></div>
          </div>
          <div className="reveal space-y-5 text-lg text-ink/80">
            {/* TODO_REVIEW: Rob to rewrite this in his own words. */}
            <p>I work in local SEO. Most of my day is figuring out why one business shows up on Google and another doesn't.</p>
            <p>Trades are where it matters most. You're brilliant at the job, and your customers are searching on their phones at the exact moment they need you. If you're not there, someone else gets the call.</p>
            <p>So Local Lion does one thing: help trades businesses get found and get more jobs, with a website that's fast, honest and built to be found.</p>
            <p>You'll deal with me. No account managers, no scripts.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="How I work" title={<>The rules<span className="o">.</span></>} />
          <ul className="grid gap-5 md:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p} className="reveal card flex items-center gap-4 p-6" style={{ ["--i" as string]: i % 2 }}>
                <Icon name="check" className="flex-none text-cyan" />
                <span className="text-lg font-semibold text-ink">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTA />
    </>
  );
}

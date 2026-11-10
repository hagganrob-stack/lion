import { PageHeader } from "@/components/PageHeader";
import { Steps } from "@/components/Steps";
import { SectionHead } from "@/components/SectionHead";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { homeFaqs } from "@/content/faqs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "How It Works | Website Live in 7 Days | Local Lion",
  description: "A 15-minute call, a site built in 7 days, then you go live and get found. Here's exactly how Local Lion works for trades businesses.",
  path: "/how-it-works",
});

const details = [
  { t: "What we need from you", d: "Your logo, a few photos of your work, the jobs you want more of and the areas you cover. If you haven't got photos, we'll tell you what to snap." },
  { t: "What we do", d: "Write the copy in plain English, build the pages, set up your Google Business Profile and make sure the site is quick on a phone." },
  { t: "What you do", d: "Check it, tell us what to tweak and give us the nod. We don't go live until you're happy." },
  { t: "After it goes live", d: "On the monthly plans we look after hosting, updates and small edits. On Growth we also work on your local SEO every month." },
];

export default function HowItWorks() {
  return (
    <>
      <PageHeader eyebrow="How it works" crumb="How it works" path="/how-it-works" title={<>Three steps. <span className="o">No faff.</span></>} intro="You're busy. We keep it quick, simple and in plain English." />
      <Steps heading={false} />
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="The detail" title={<>Who does <span className="c">what</span><span className="o">.</span></>} />
          <dl className="grid gap-5 md:grid-cols-2">
            {details.map((x, i) => (
              <div key={x.t} className="reveal card p-7" style={{ ["--i" as string]: i % 2 }}>
                <dt className="display h-md">{x.t}</dt>
                <dd className="mt-3">{x.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <FAQ faqs={homeFaqs} />
      <CTA />
    </>
  );
}

import Link from "next/link";
import { Icon } from "@/components/Icons";

export const metadata = { title: "Page not found | Local Lion", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="pt-32 pb-24 md:pt-44">
      <div className="wrap">
        <p className="eyebrow">Error 404</p>
        <h1 className="display h-hero mt-4 max-w-4xl">This page has <span className="o">wandered</span> off the patch<span className="o">.</span></h1>
        <p className="mt-6 max-w-md text-lg text-ink/80">Can't find what you were after. Try the homepage, or ask for a free audit and we'll sort you out.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">Back to the homepage <Icon name="arrow" size={18} className="arr" /></Link>
          <Link href="/free-audit" className="btn btn-ghost">Get a free audit</Link>
        </div>
      </div>
    </section>
  );
}

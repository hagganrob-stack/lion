import Link from "next/link";
import { Lion } from "@/components/Lion";
import { Glow } from "@/components/Glow";
import { Icon } from "@/components/Icons";

export const metadata = { title: "Page not found | Local Lion", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20 md:pt-44">
      <Glow color="cyan" className="-left-20 top-10 -z-10" size={500} pulse />
      <div className="wrap grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Error 404</p>
          <h1 className="display h-hero mt-4">This page has <span className="o glow-text-o">wandered</span> off the patch<span className="o">.</span></h1>
          <p className="mt-6 max-w-md text-lg text-ink/80">Can't find what you were after. Try the homepage, or ask for a free audit and we'll sort you out.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn btn-primary">Back to the homepage <Icon name="arrow" size={18} className="arr" /></Link>
            <Link href="/free-audit" className="btn btn-ghost">Get a free audit</Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm"><Lion className="h-auto w-full" /></div>
      </div>
    </section>
  );
}

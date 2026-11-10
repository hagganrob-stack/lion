import { JsonLd } from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";

export function PageHeader({ eyebrow, title, intro, crumb, path }: { eyebrow: string; title: React.ReactNode; intro?: string; crumb: string; path: string }) {
  return (
    <header className="relative isolate overflow-hidden pt-32 pb-12 md:pt-44 md:pb-16">
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: crumb, path }])} />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#eee9df_0%,#faf8f4_100%)]" aria-hidden="true" />
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display h-xl mt-4 max-w-4xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-ink/80 md:text-xl">{intro}</p>}
      </div>
    </header>
  );
}

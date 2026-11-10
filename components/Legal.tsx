import { PageHeader } from "./PageHeader";
import { showReviewNotes } from "@/lib/todo";

export function Legal({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHeader eyebrow="Legal" crumb={title} path={path} title={<>{title}<span className="o">.</span></>} />
      <section className="pb-24">
        <div className="wrap">
          <div className="max-w-3xl space-y-4 [&_h2]:display [&_h2]:h-md [&_h2]:mt-10 [&_h2]:mb-2 [&_li]:ml-5 [&_li]:list-disc [&_a]:text-cyan [&_a]:underline">
            {showReviewNotes && <p className="rounded-lg border border-orange/50 bg-orange/10 p-4 text-sm text-ink">TODO_REVIEW (preview only): this is a sensible template. Have it checked by a solicitor or your data protection adviser before launch. Last updated {updated}.</p>}
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

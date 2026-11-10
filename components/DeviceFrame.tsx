import { Icon } from "./Icons";

/** Wireframe preview of a demo site in a browser + phone frame. No text baked into images. */
export function DeviceFrame({ label = "Demo", accent = "cyan" }: { label?: string; accent?: "cyan" | "orange" }) {
  const a = accent === "cyan" ? "var(--cyan)" : "var(--orange)";
  return (
    <div className="relative mx-auto max-w-4xl" role="img" aria-label={`${label} website preview: a laptop and phone showing a trades website with a hero, call button and service cards`}>
      <span className="absolute -top-3 left-4 z-10 rounded-full bg-orange px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-bg">{label}</span>
      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
          <i className="h-3 w-3 rounded-full bg-[#ff5f57]" /><i className="h-3 w-3 rounded-full bg-[#febc2e]" /><i className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 h-6 flex-1 rounded-md bg-bg/70" />
        </div>
        <div className="grid gap-6 p-6 md:grid-cols-[1.2fr_1fr] md:p-10" style={{ background: `radial-gradient(ellipse at 80% 0%, color-mix(in srgb, ${a} 22%, transparent), transparent 60%), var(--bg)` }}>
          <div>
            <div className="h-3 w-24 rounded-full" style={{ background: a }} />
            <div className="mt-5 h-8 w-11/12 rounded bg-ink/90" /><div className="mt-2.5 h-8 w-8/12 rounded bg-ink/90" />
            <div className="mt-5 h-3 w-10/12 rounded bg-muted/50" /><div className="mt-2 h-3 w-7/12 rounded bg-muted/50" />
            <div className="mt-6 flex gap-3"><span className="inline-flex h-10 w-32 items-center justify-center rounded-lg bg-orange text-bg"><Icon name="phone" size={18} /></span><span className="h-10 w-28 rounded-lg border" style={{ borderColor: a }} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-line bg-surface-2 p-3.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: "color-mix(in srgb, " + a + " 18%, transparent)", color: a }}><Icon name="check" size={16} /></span>
                <div className="mt-3 h-2.5 w-10/12 rounded bg-ink/70" /><div className="mt-2 h-2 w-7/12 rounded bg-muted/40" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-6 -right-2 hidden w-28 overflow-hidden rounded-[1.4rem] border-4 border-surface-2 bg-bg sm:block md:w-36">
        <div className="space-y-2 p-3 pt-5">
          <div className="h-2 w-8 rounded-full" style={{ background: a }} />
          <div className="h-4 w-full rounded bg-ink/90" /><div className="h-4 w-8/12 rounded bg-ink/90" />
          <div className="h-8 w-full rounded-md bg-orange" />
          <div className="h-10 rounded-md border border-line bg-surface-2" /><div className="h-10 rounded-md border border-line bg-surface-2" />
        </div>
      </div>
    </div>
  );
}

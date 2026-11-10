/** Angular lightning shapes for hero backgrounds. Pure SVG, no JS. */
export function Bolt({ className = "", color = "cyan" }: { className?: string; color?: "cyan" | "orange" }) {
  const c = color === "cyan" ? "var(--cyan)" : "var(--orange)";
  return (
    <svg className={className} viewBox="0 0 120 400" fill="none" aria-hidden="true">
      <defs>
        <filter id={`bg-${color}`} x="-50%" y="-20%" width="200%" height="140%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d="M78 4 24 190h38L34 396 100 150H60L78 4Z" fill={c} fillOpacity="0.12" stroke={c} strokeWidth="2" strokeLinejoin="round" filter={`url(#bg-${color})`} />
    </svg>
  );
}

/** Thin zig-zag section divider, cyan → orange. */
export function BoltDivider({ className = "" }: { className?: string }) {
  return (
    <svg className={`bolt-divider ${className}`} viewBox="0 0 1200 28" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="bd-g" x1="0" x2="1">
          <stop offset="0" stopColor="var(--cyan)" stopOpacity="0" />
          <stop offset="0.3" stopColor="var(--cyan)" />
          <stop offset="0.7" stopColor="var(--orange)" />
          <stop offset="1" stopColor="var(--orange)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 14h470l16-12 22 24 22-24 22 24 16-12h632" stroke="url(#bd-g)" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

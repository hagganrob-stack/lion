import Link from "next/link";

/** Simplified lion-head shield mark. Reads at 32px. Swap for /public/brand/logo-mark.svg when final art arrives. */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="lm-rim" x1="0" x2="1">
          <stop offset="0" stopColor="var(--cyan)" />
          <stop offset="1" stopColor="var(--orange)" />
        </linearGradient>
      </defs>
      <path d="M32 3 55 11v22c0 12-9 21-23 28C18 54 9 45 9 33V11L32 3Z" fill="#0e1626" stroke="url(#lm-rim)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M32 14 22 10l-3 9-8 4 5 5-2 8 8-2 4 6 6-2 6 2 4-6 8 2-2-8 5-5-8-4-3-9-10 4Z" fill="#ff7a1a" opacity="0.9" />
      <path d="M21 25h9l-1 7q-1 3-4 3t-4-3l0-7Zm13 0h9l0 7q-1 3-4 3t-4-3l-1-7Z" fill="#070b14" />
      <path d="m26 26-3 6h3l-1 3 4-6h-3l1-3h-1Z" fill="var(--cyan)" />
      <path d="M32 38l-3 3 3 3 3-3-3-3Z" fill="#f5f7fa" opacity="0.9" />
    </svg>
  );
}

export function Logo({ className = "", href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Local Lion — home">
      <LogoMark />
      <span className="display text-[1.7rem] leading-none tracking-wide">
        Local <span className="o">Lion</span>
      </span>
    </Link>
  );
}

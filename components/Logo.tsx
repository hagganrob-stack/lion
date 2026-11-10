import Link from "next/link";

/** Layered "L" mark: copper top, blue-grey middle, charcoal base. Base adapts on dark panels. */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M7 3.5 22 2v14L7 17.5Z" fill="#d97706" />
      <path d="M7 19.5 22 18v13L7 32.5Z" fill="#64748b" />
      <path d="M7 34.5 22 33l22-2.5V45H7Z" style={{ fill: "var(--white)" }} />
    </svg>
  );
}

export function Logo({ className = "", href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={`inline-flex items-center gap-2.5 ${className}`} aria-label="LocalLion home">
      <LogoMark />
      <span className="display text-[1.45rem] leading-none">
        Local<span className="o">Lion</span>
      </span>
    </Link>
  );
}

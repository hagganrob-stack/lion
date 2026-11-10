import Link from "next/link";

/** Wordmark: "Local" white, "Lion" orange. */
export function Logo({ className = "", href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={`inline-flex items-center gap-2 ${className}`} aria-label="Local Lion — home">
      <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-md bg-orange display text-xl leading-none text-bg">L</span>
      <span className="display text-[1.6rem] leading-none tracking-wide">
        Local <span className="o">Lion</span>
      </span>
    </Link>
  );
}

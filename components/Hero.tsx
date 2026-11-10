import Link from "next/link";
import { DeviceFrame } from "./DeviceFrame";
import { Icon, type IconName } from "./Icons";

type Feature = { icon: IconName; label: string };

const defaultFeatures: Feature[] = [
  { icon: "search", label: "Rank higher in your area" },
  { icon: "globe", label: "Websites that win jobs" },
  { icon: "megaphone", label: "Ads that fill the diary" },
];

export function Hero({
  eyebrow,
  h1,
  sub,
  features = defaultFeatures,
  primary = { href: "/free-audit", label: "Get a free audit" },
  secondary = { href: "/how-it-works", label: "See how it works" },
  accent = "cyan",
  h1Class = "h-hero",
}: {
  eyebrow: React.ReactNode;
  /** Wrap highlight words with <span className="c"> / <span className="o">. */
  h1: React.ReactNode;
  sub: string;
  features?: Feature[];
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  accent?: "cyan" | "orange";
  h1Class?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#0e1626_0%,#070b14_70%)]" aria-hidden="true" />
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className={`display ${h1Class} mt-5`}>{h1}</h1>
          <p className="mt-6 max-w-xl text-lg text-ink/80 md:text-xl">{sub}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={primary.href} className="btn btn-primary">
              {primary.label} <Icon name="arrow" size={20} className="arr" />
            </Link>
            <Link href={secondary.href} className="btn btn-ghost">{secondary.label}</Link>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {features.map((f) => (
              <li key={f.label} className="flex items-center gap-3 text-sm font-semibold text-ink">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-lg border border-line bg-surface-2 text-cyan">
                  <Icon name={f.icon} size={20} />
                </span>
                {f.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:block">
          <DeviceFrame label="Demo" accent={accent} />
        </div>
      </div>
    </section>
  );
}

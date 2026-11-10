import Link from "next/link";
import { Lion } from "./Lion";
import { Glow } from "./Glow";
import { Bolt } from "./Bolt";
import { Embers } from "./Embers";
import { HeroStage } from "./HeroStage";
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
  prop = "none",
  features = defaultFeatures,
  primary = { href: "/free-audit", label: "Get a free audit" },
  secondary = { href: "/how-it-works", label: "See how it works" },
  accent = "cyan",
  h1Class = "h-hero",
}: {
  eyebrow: React.ReactNode;
  /** Lines of the H1. Wrap highlight words with <span className="c"> / <span className="o">. */
  h1: React.ReactNode;
  sub: string;
  prop?: "none" | "lightning" | "wrench" | "hardhat";
  features?: Feature[];
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  accent?: "cyan" | "orange";
  h1Class?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_20%,#15203a_0%,#070b14_62%)]" aria-hidden="true" />
      <Embers />
      <Bolt className="absolute -left-4 top-24 -z-10 hidden h-[26rem] opacity-60 md:block" color="cyan" />
      <Bolt className="absolute right-[44%] bottom-0 -z-10 hidden h-72 opacity-40 lg:block" color="orange" />
      <HeroStage className="wrap relative grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative z-10">
          <p className="eyebrow reveal in">{eyebrow}</p>
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
                <span className="grid h-10 w-10 flex-none place-items-center rounded-lg border border-line bg-surface-2 text-cyan shadow-[0_0_18px_-4px_rgb(34_211_238/0.6)]">
                  <Icon name={f.icon} size={20} />
                </span>
                {f.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-[-18%] z-0 flex w-[92%] items-center opacity-30 sm:right-[-8%] sm:w-[70%] lg:pointer-events-auto lg:static lg:w-auto lg:opacity-100">
          <div className="relative mx-auto w-full max-w-[34rem]">
            <Glow color={accent === "cyan" ? "cyan" : "orange"} className="-left-10 top-4" size={420} pulse />
            <Glow color={accent === "cyan" ? "orange" : "cyan"} className="-right-10 bottom-0" size={420} pulse />
            <div
              className="lion-in relative"
              style={{ transform: "translate3d(calc(var(--px) * 8px), calc(var(--py) * 6px), 0)", transition: "transform 0.25s ease-out" }}
            >
              <Lion prop={prop} priority className="relative h-auto w-full drop-shadow-[0_0_40px_rgba(255,122,26,0.25)]" />
            </div>
          </div>
        </div>
      </HeroStage>
    </section>
  );
}

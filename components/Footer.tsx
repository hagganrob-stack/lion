import Link from "next/link";
import { Logo } from "./Logo";
import { CookieSettingsButton } from "./Consent";
import { site, trades } from "@/content/site";

const socials = [
  ["Facebook", site.social.facebook],
  ["Instagram", site.social.instagram],
  ["LinkedIn", site.social.linkedin],
  ["YouTube", site.social.youtube],
].filter(([, u]) => u);

export function Footer() {
  const h = "eyebrow !tracking-[0.2em] mb-4 !text-ink after:hidden";
  const a = "block py-1.5 text-muted hover:text-cyan transition-colors";
  return (
    <footer className="theme-dark">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm">Websites, local SEO and Google Ads for UK trades businesses. Get found. Get more jobs.</p>
        </div>
        <div>
          <p className={h}>Trades</p>
          {trades.map((t) => (
            <Link key={t.slug} href={`/${t.slug}`} className={a}>
              Websites for {t.label.toLowerCase()}
            </Link>
          ))}
        </div>
        <div>
          <p className={h}>Pages</p>
          <Link href="/pricing" className={a}>Pricing</Link>
          <Link href="/how-it-works" className={a}>How it works</Link>
          <Link href="/work" className={a}>Work</Link>
          <Link href="/about" className={a}>About</Link>
          <Link href="/free-audit" className={a}>Free audit</Link>
        </div>
        <div>
          <p className={h}>Contact</p>
          <a href={`mailto:${site.email}`} className={a}>{site.email}</a>
          {site.phone && <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={a}>{site.phone}</a>}
          <Link href="/contact" className={a}>Book a 15-minute call</Link>
          {socials.map(([n, u]) => (
            <a key={n} href={u} className={a} rel="noopener noreferrer" target="_blank">{n}</a>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-3 py-6 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Local Lion is a trading name of {site.legalName}, company no. {site.companyNumber}, registered in England &amp; Wales.
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/privacy" className="hover:text-cyan">Privacy</Link>
            <Link href="/cookies" className="hover:text-cyan">Cookies</Link>
            <Link href="/terms" className="hover:text-cyan">Terms</Link>
            <CookieSettingsButton className="hover:text-cyan" />
          </p>
        </div>
      </div>
    </footer>
  );
}

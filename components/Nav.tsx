"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Icon } from "./Icons";
import { site, trades } from "@/content/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // Store the path each panel was opened on, so navigating away closes it without an effect.
  const [menuAt, setMenuAt] = useState<string | null>(null);
  const [ddAt, setDdAt] = useState<string | null>(null);
  const menu = menuAt === pathname;
  const dd = ddAt === pathname;
  const setMenu = (v: boolean | ((p: boolean) => boolean)) => setMenuAt((cur) => ((typeof v === "function" ? v(cur === pathname) : v) ? pathname : null));
  const setDd = (v: boolean | ((p: boolean) => boolean)) => setDdAt((cur) => ((typeof v === "function" ? v(cur === pathname) : v) ? pathname : null));
  const ddRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDdAt(null);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDdAt(null);
        setMenuAt(null);
      }
    };
    document.addEventListener("click", click);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("click", click);
      document.removeEventListener("keydown", key);
    };
  }, []);

  const link = "px-3 py-2 text-[0.95rem] font-semibold text-ink/90 hover:text-cyan transition-colors";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-300 ${
        scrolled || menu ? "border-b border-line bg-surface/85 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="wrap flex h-16 items-center justify-between md:h-[4.5rem]">
        <Logo />
        <div className="hidden items-center gap-1 md:flex">
          <div className="relative" ref={ddRef}>
            <button
              type="button"
              className={`${link} inline-flex items-center gap-1`}
              aria-expanded={dd}
              aria-haspopup="true"
              onClick={() => setDd((v) => !v)}
            >
              Trades <Icon name="chevron" size={16} className={`transition-transform ${dd ? "rotate-180" : ""}`} />
            </button>
            {dd && (
              <div className="absolute left-0 top-full mt-2 w-60 rounded-xl border border-line bg-surface p-2 shadow-[0_20px_50px_-10px_rgba(0,0,0,.9)]">
                {trades.map((t) => (
                  <Link key={t.slug} href={`/${t.slug}`} className="block rounded-lg px-3 py-2.5 font-semibold text-ink hover:bg-surface-2 hover:text-cyan">
                    {t.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} className={link} aria-current={pathname === n.href ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
          <Link href="/free-audit" className="btn btn-primary ml-3 !min-h-11 !py-2">
            Get a free audit <Icon name="arrow" size={18} className="arr" />
          </Link>
        </div>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-lg border border-line text-ink md:hidden"
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
          aria-controls="mobile-menu"
          onClick={() => setMenu((v) => !v)}
        >
          <Icon name={menu ? "cross" : "menu"} />
        </button>
      </nav>
      {menu && (
        <div id="mobile-menu" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-surface md:hidden">
          <div className="wrap flex flex-col py-4">
            <p className="eyebrow mb-2 mt-1">Trades</p>
            {trades.map((t) => (
              <Link key={t.slug} href={`/${t.slug}`} className="display h-md border-b border-line py-3">
                {t.label}
              </Link>
            ))}
            {site.nav.map((n) => (
              <Link key={n.href} href={n.href} className="display h-md border-b border-line py-3">
                {n.label}
              </Link>
            ))}
            <Link href="/free-audit" className="btn btn-primary mt-5">
              Get a free audit <Icon name="arrow" size={18} className="arr" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

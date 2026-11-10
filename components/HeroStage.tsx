"use client";

import { useEffect, useRef } from "react";

/** Pointer parallax (desktop, fine pointer only, max 8px). Sets --px/--py in [-1,1]. */
export function HeroStage({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--px", String(((e.clientX - r.left) / r.width - 0.5) * 2));
        el.style.setProperty("--py", String(((e.clientY - r.top) / r.height - 0.5) * 2));
      });
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, []);
  return (
    <div ref={ref} className={className} style={{ ["--px" as string]: 0, ["--py" as string]: 0 }}>
      {children}
    </div>
  );
}

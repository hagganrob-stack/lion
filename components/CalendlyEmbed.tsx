"use client";

import { useEffect, useRef, useState } from "react";

/** Lazy-loads the Calendly widget only when scrolled into view. */
export function CalendlyEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShow(true), io.disconnect()), { rootMargin: "300px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="card min-h-[40rem] overflow-hidden">
      {show ? (
        <iframe src={`${url}?hide_gdpr_banner=1&background_color=0e1626&text_color=f5f7fa&primary_color=ff7a1a`} title="Book a 15-minute call" loading="lazy" className="h-[44rem] w-full border-0" />
      ) : (
        <p className="p-8">Loading calendar…</p>
      )}
    </div>
  );
}

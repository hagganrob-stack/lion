import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Brand-style Open Graph image: dark bg, neon headline, lion mark. */
export async function ogImage({ eyebrow, lines }: { eyebrow: string; lines: [string, string?, string?] }) {
  const font = await fs.readFile(path.join(process.cwd(), "lib/fonts/BarlowCondensed-ExtraBold.ttf"));
  const [a, b, c] = lines;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#070B14", fontFamily: "Barlow", color: "#F5F7FA" }}>
        <div style={{ position: "absolute", left: -120, top: -160, width: 640, height: 640, borderRadius: 999, background: "radial-gradient(circle, rgba(34,211,238,0.35), transparent 70%)", display: "flex" }} />
        <div style={{ position: "absolute", right: -140, bottom: -200, width: 720, height: 720, borderRadius: 999, background: "radial-gradient(circle, rgba(255,122,26,0.4), transparent 70%)", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%", height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="64" height="64" viewBox="0 0 64 64"><path d="M32 3 55 11v22c0 12-9 21-23 28C18 54 9 45 9 33V11L32 3Z" fill="#0e1626" stroke="#22d3ee" strokeWidth="3" /><path d="M32 14 22 10l-3 9-8 4 5 5-2 8 8-2 4 6 6-2 6 2 4-6 8 2-2-8 5-5-8-4-3-9-10 4Z" fill="#ff7a1a" /><path d="M21 25h9l-1 7q-1 3-4 3t-4-3l0-7Zm13 0h9l0 7q-1 3-4 3t-4-3l-1-7Z" fill="#070b14" /></svg>
            <div style={{ display: "flex", fontSize: 48, letterSpacing: 2, textTransform: "uppercase" }}>Local&nbsp;<span style={{ color: "#FF7A1A" }}>Lion</span></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, textTransform: "uppercase", color: "#22D3EE", marginBottom: 18 }}>{eyebrow}</div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 128, lineHeight: 0.92, textTransform: "uppercase" }}>
              <div style={{ display: "flex" }}>{a}</div>
              {b && <div style={{ display: "flex", color: "#22D3EE" }}>{b}</div>}
              {c && <div style={{ display: "flex", color: "#FF7A1A" }}>{c}</div>}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Barlow", data: font, weight: 800, style: "normal" }] },
  );
}

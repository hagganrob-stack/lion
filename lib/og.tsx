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
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%", height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", width: 56, height: 56, borderRadius: 10, background: "#FF7A1A", color: "#070B14", fontSize: 44, alignItems: "center", justifyContent: "center" }}>L</div>
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

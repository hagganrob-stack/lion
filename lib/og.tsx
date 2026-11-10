import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Brand-style Open Graph image: warm off-white, charcoal headline, copper accent. */
export async function ogImage({ eyebrow, lines }: { eyebrow: string; lines: [string, string?, string?] }) {
  const font = await fs.readFile(path.join(process.cwd(), "lib/fonts/Montserrat-ExtraBold.ttf"));
  const [a, b, c] = lines;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FAF8F4", fontFamily: "Montserrat", color: "#1F2933" }}>
        <div style={{ display: "flex", width: 24, height: "100%", flexDirection: "column" }}>
          <div style={{ display: "flex", flex: 1, background: "#D97706" }} />
          <div style={{ display: "flex", flex: 1, background: "#64748B" }} />
          <div style={{ display: "flex", flex: 2, background: "#1F2933" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 40, letterSpacing: -1 }}>
            Local<span style={{ color: "#B45309" }}>Lion</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 24, letterSpacing: 5, textTransform: "uppercase", color: "#64748B", marginBottom: 22 }}>{eyebrow}</div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1.04, letterSpacing: -3 }}>
              <div style={{ display: "flex" }}>{a}</div>
              {b && <div style={{ display: "flex", color: "#64748B" }}>{b}</div>}
              {c && <div style={{ display: "flex", color: "#B45309" }}>{c}</div>}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Montserrat", data: font, weight: 800, style: "normal" }] },
  );
}

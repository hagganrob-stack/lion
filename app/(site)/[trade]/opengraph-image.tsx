import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { tradeContent } from "@/content/trades";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Local Lion websites for trades";

export function generateStaticParams() {
  return Object.keys(tradeContent).map((trade) => ({ trade }));
}

export default async function Image({ params }: { params: Promise<{ trade: string }> }) {
  const { trade } = await params;
  const t = tradeContent[trade];
  const [a, b, c] = t.hero.h1;
  return ogImage({ eyebrow: t.hero.eyebrow, lines: [a, b, c] });
}

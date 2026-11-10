import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TradePage } from "@/components/TradePage";
import { tradeContent } from "@/content/trades";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(tradeContent).map((trade) => ({ trade }));
}

export async function generateMetadata({ params }: { params: Promise<{ trade: string }> }): Promise<Metadata> {
  const { trade } = await params;
  const t = tradeContent[trade];
  if (!t) return {};
  return pageMeta({ title: t.seo.title, description: t.seo.description, path: `/${t.slug}` });
}

export default async function Page({ params }: { params: Promise<{ trade: string }> }) {
  const { trade } = await params;
  const t = tradeContent[trade];
  if (!t) notFound();
  return <TradePage t={t} />;
}

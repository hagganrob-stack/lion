import { electricians } from "./electricians";
import { plumbers } from "./plumbers";
import { roofers } from "./roofers";
import { builders } from "./builders";
import type { TradeContent } from "./types";

export const tradeContent: Record<string, TradeContent> = { electricians, plumbers, roofers, builders };
export type { TradeContent };

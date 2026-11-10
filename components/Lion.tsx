import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

type Prop = "none" | "lightning" | "wrench" | "hardhat";

const hasRealArt = fs.existsSync(path.join(process.cwd(), "public/brand/lion-hero.webp"));

function maneSpikes(cx: number, cy: number, n: number, rOuter: number, rInner: number, rot = 0) {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI * 2 * i) / (n * 2) + rot;
    const r = i % 2 === 0 ? rOuter + (i % 4 === 0 ? 0 : -18) : rInner;
    pts.push(`${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`);
  }
  return pts.join(" ");
}

/**
 * The Local Lion. If /public/brand/lion-hero.webp exists it is used (next/image, priority).
 * Otherwise a tasteful placeholder SVG: stylised lion in lightning shades. TODO_ASSET: supply final art.
 */
export function Lion({
  prop = "none",
  priority = false,
  className = "",
}: {
  prop?: Prop;
  priority?: boolean;
  className?: string;
}) {
  if (hasRealArt) {
    return (
      <Image
        src="/brand/lion-hero.webp"
        alt="The Local Lion mascot: a lion in sunglasses with cyan and orange lightning in the lenses"
        width={900}
        height={900}
        priority={priority}
        sizes="(max-width: 1024px) 90vw, 560px"
        className={className}
      />
    );
  }
  return (
    <svg
      viewBox="0 0 400 440"
      className={className}
      role="img"
      aria-label="The Local Lion mascot: a lion in sunglasses with cyan and orange lightning in the lenses"
    >
      <defs>
        <radialGradient id="mane" cx="50%" cy="50%" r="55%">
          <stop offset="0.35" stopColor="#ff7a1a" />
          <stop offset="0.75" stopColor="#c2410c" />
          <stop offset="1" stopColor="#7c2d12" />
        </radialGradient>
        <linearGradient id="rim" x1="0" x2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="0.5" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ff7a1a" stopOpacity="0" />
          <stop offset="1" stopColor="#ff7a1a" />
        </linearGradient>
        <linearGradient id="face" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#25324d" />
          <stop offset="1" stopColor="#141c30" />
        </linearGradient>
        <linearGradient id="lensR" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#ff9a4d" />
          <stop offset="1" stopColor="#ff7a1a" />
        </linearGradient>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* mane */}
      <g filter="url(#glow)" opacity="0.95">
        <polygon points={maneSpikes(200, 235, 14, 205, 140, 0.1)} fill="#7c2d12" />
        <polygon points={maneSpikes(200, 235, 14, 190, 130, 0.35)} fill="url(#mane)" />
      </g>
      {/* ears */}
      <path d="M104 150c-6-22 4-40 24-46 8 14 8 30 2 46Z" fill="#1c2640" stroke="#22d3ee" strokeWidth="2" strokeOpacity="0.8" />
      <path d="M296 150c6-22-4-40-24-46-8 14-8 30-2 46Z" fill="#1c2640" stroke="#ff7a1a" strokeWidth="2" strokeOpacity="0.8" />
      {/* face */}
      <path d="M200 120C140 120 112 172 117 232c4 58 36 96 83 112 47-16 79-54 83-112 5-60-23-112-83-112Z" fill="url(#face)" />
      <path d="M200 120C140 120 112 172 117 232c4 58 36 96 83 112 47-16 79-54 83-112 5-60-23-112-83-112Z" fill="none" stroke="url(#rim)" strokeWidth="3.5" filter="url(#glow)" />
      {/* brow */}
      <path d="M130 188c20-10 40-12 62-8M270 188c-20-10-40-12-62-8" stroke="#0b1020" strokeWidth="6" strokeLinecap="round" />
      {/* shades */}
      <rect x="186" y="204" width="28" height="6" rx="3" fill="#0b1020" />
      <path d="M118 200h72l-4 38q-3 18-24 18-30 0-40-20-5-12-4-36Z" fill="#070b14" stroke="#22d3ee" strokeWidth="2.5" />
      <path d="M282 200h-72l4 38q3 18 24 18 30 0 40-20 5-12 4-36Z" fill="url(#lensR)" stroke="#ff7a1a" strokeWidth="2.5" />
      <g className="lens-flicker">
        <path d="m166 207-22 28h14l-9 21 28-33h-15l8-16Z" fill="#22d3ee" filter="url(#glow)" />
        <path d="m258 207-22 28h14l-9 21 28-33h-15l8-16Z" fill="#fff4e8" opacity="0.9" />
      </g>
      {/* muzzle */}
      <ellipse cx="172" cy="296" rx="32" ry="24" fill="#2a3a5c" />
      <ellipse cx="228" cy="296" rx="32" ry="24" fill="#2a3a5c" />
      <path d="M200 252c-18 0-30 6-30 16l30 16 30-16c0-10-12-16-30-16Z" fill="#0b1020" />
      <path d="M130 250c-14 4-24 14-28 28M270 250c14 4 24 14 28 28" stroke="#ff7a1a" strokeOpacity="0.5" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M150 340c20 20 80 20 100 0l-14 36q-36 18-72 0Z" fill="#c2410c" />
            <path d="M200 286v14M200 300c-10 12-24 10-28 0M200 300c10 12 24 10 28 0" stroke="#0b1020" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M160 296c-12-2-22 2-30 10M240 296c12-2 22 2 30 10" stroke="#3a4a6b" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* trade prop */}
      {prop === "hardhat" && (
        <g>
          <path d="M120 128c4-46 40-70 80-70s76 24 80 70Z" fill="#ff7a1a" stroke="#ffb27a" strokeWidth="2" filter="url(#glow)" />
          <rect x="102" y="124" width="196" height="14" rx="7" fill="#e65f00" />
          <rect x="184" y="60" width="32" height="68" rx="6" fill="#ffa05a" opacity="0.8" />
        </g>
      )}
      {prop === "lightning" && (
        <path d="m330 40-44 76h28l-18 62 62-84h-30l16-54h-14Z" fill="#22d3ee" fillOpacity="0.9" filter="url(#glow)" transform="translate(0,10)" />
      )}
      {prop === "wrench" && (
        <g transform="translate(300 330) rotate(-35)" filter="url(#glow)">
          <rect x="-8" y="-70" width="16" height="140" rx="8" fill="#c8d3e6" />
          <path d="M-26 -78a26 26 0 1 1 52 0l-14 0v-14h-24v14Z" fill="#22d3ee" />
        </g>
      )}
    </svg>
  );
}

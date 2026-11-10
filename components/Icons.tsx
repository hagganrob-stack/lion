import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const paths = {
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  pound: (<><path d="M17 7a4 4 0 0 0-7.5-1.5C9 7 9 8.5 9.5 11H15" /><path d="M7 20h11M9.5 11c.5 3-.5 6.5-2.5 9" /><path d="M7 11h2.5" /></>),
  pin: (<><path d="M12 22s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12Z" /><circle cx="12" cy="10" r="2.6" /></>),
  handshake: (<><path d="m11 17 2 2a1.5 1.5 0 0 0 2.1-2.1" /><path d="m14 14 2.5 2.5a1.5 1.5 0 0 0 2.1-2.1l-3.6-3.6a2 2 0 0 0-2.8 0L9 13.5a1.5 1.5 0 0 0 2.1 2.1" /><path d="m21 14-1.5-1.5" /><path d="M3 14l1.5-1.5" /><path d="m3 9 5.5-3.5 3 1.5 3.5-1.5L21 9v5" /><path d="M3 9v5" /></>),
  wrench: <path d="M14.7 6.3a4 4 0 0 0 5 5L21 12.6 12.6 21 3 11.4l8.4-8.4 1.3 1.3-1.4 2a4 4 0 0 0 3.4 0Z" transform="rotate(0)" />,
  hardhat: (<><path d="M3 18h18v2H3z" /><path d="M5 18a7 7 0 0 1 14 0" /><path d="M12 6v6M9.5 7.5c-.5 1-.8 2.4-.8 4.5M14.5 7.5c.5 1 .8 2.4.8 4.5" /></>),
  roof: (<><path d="m3 12 9-8 9 8" /><path d="M5 10.5V20h14v-9.5" /><path d="M9 20v-6h6v6" /></>),
  home: (<><path d="M4 21V9l8-6 8 6v12" /><path d="M9 21v-7h6v7" /><path d="M2 21h20" /></>),
  search: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>),
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>),
  megaphone: (<><path d="M3 11v3a1 1 0 0 0 1 1h2l8 4V6L6 10H4a1 1 0 0 0-1 1Z" /><path d="M18 9a4 4 0 0 1 0 6" /><path d="M7 15l1 5h2.5" /></>),
  phone: <path d="M5 4h3.5l1.5 4.5-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2L20 15v3.5A1.5 1.5 0 0 1 18.5 20 15.5 15.5 0 0 1 4 5.5 1.5 1.5 0 0 1 5.5 4" />,
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  cross: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  star: <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3Z" />,
  shield: (<><path d="M12 3 5 6v6c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6l-7-3Z" /><path d="m9 12 2.2 2.2L15.5 10" /></>),
  camera: (<><path d="M4 8h3l1.5-2h7L17 8h3v11H4Z" /><circle cx="12" cy="13" r="3.5" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>),
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 24, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      {paths[name]}
    </svg>
  );
}

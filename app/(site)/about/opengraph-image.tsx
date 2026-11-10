import { ogImage, ogSize, ogContentType } from "@/lib/og";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "About Local Lion";
export default function Image() {
  return ogImage({ eyebrow: "About", lines: ["Hi, I am", "Rob."] });
}

import { ogImage, ogSize, ogContentType } from "@/lib/og";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Free audit from Local Lion";
export default function Image() {
  return ogImage({ eyebrow: "Free audit", lines: ["Why no calls?", "Find out."] });
}

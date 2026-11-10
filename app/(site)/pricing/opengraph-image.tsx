import { ogImage, ogSize, ogContentType } from "@/lib/og";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Local Lion pricing";
export default function Image() {
  return ogImage({ eyebrow: "Pricing", lines: ["Clear prices.", "No surprises."] });
}

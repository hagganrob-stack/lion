import { ogImage, ogSize, ogContentType } from "@/lib/og";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Local Lion work";
export default function Image() {
  return ogImage({ eyebrow: "Work", lines: ["Real work.", "Clearly labelled."] });
}

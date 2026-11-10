import { ogImage, ogSize, ogContentType } from "@/lib/og";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "How Local Lion works";
export default function Image() {
  return ogImage({ eyebrow: "How it works", lines: ["Three steps.", "No faff."] });
}

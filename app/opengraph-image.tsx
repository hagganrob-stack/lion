import { ogImage, ogSize, ogContentType } from "@/lib/og";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Local Lion: Get found. Get more jobs.";
export default function Image() {
  return ogImage({ eyebrow: "Websites / SEO / Google Ads", lines: ["Get found.", "Get more", "jobs."] });
}

import Link from "next/link";
import { Icon } from "./Icons";
import { site } from "@/content/site";

/** Persistent tap-to-call / audit bar on phones. */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 p-2.5 backdrop-blur-xl md:hidden" style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}>
      <div className="flex gap-2.5">
        {site.phone ? (
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="btn btn-ghost flex-1 !min-h-12 !px-3 whitespace-nowrap">
            <Icon name="phone" size={18} /> Call
          </a>
        ) : (
          <Link href="/contact" className="btn btn-ghost flex-1 !min-h-12 !px-3 whitespace-nowrap">
            <Icon name="phone" size={18} /> Book a call
          </Link>
        )}
        <Link href="/free-audit" className="btn btn-primary flex-[1.4] !min-h-12 !px-3 whitespace-nowrap">
          Free audit <Icon name="arrow" size={18} className="arr" />
        </Link>
      </div>
    </div>
  );
}

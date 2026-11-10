import { Legal } from "@/components/Legal";
import { CookieSettingsButton } from "@/components/Consent";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Cookie Policy | Local Lion", description: "The cookies Local Lion uses and how to control them.", path: "/cookies" });

export default function Cookies() {
  return (
    <Legal title="Cookie policy" path="/cookies" updated="TODO_DATE">
      <p>Cookies are small files stored on your device. We only set non-essential cookies if you choose to accept them. Your choice is remembered in your browser and you can change it any time.</p>
      <p><CookieSettingsButton className="btn btn-ghost !min-h-11" /></p>
      <h2>Essential</h2>
      <ul>
        <li>Your cookie preference (stored in your browser's local storage).</li>
        <li>Cloudflare Turnstile, used on forms to stop spam bots, if enabled.</li>
      </ul>
      <h2>Analytics and advertising (only if you accept)</h2>
      <ul>
        <li>Google Analytics 4: measures how people use the site.</li>
        <li>Google Ads conversion tracking: tells us which ads lead to enquiries.</li>
      </ul>
      <p>Vercel Analytics and Speed Insights measure page performance without using cookies.</p>
    </Legal>
  );
}

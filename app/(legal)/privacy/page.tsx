import Link from "next/link";
import { Legal } from "@/components/Legal";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Privacy Policy | Local Lion", description: "How Local Lion collects, uses and protects your personal data.", path: "/privacy" });

export default function Privacy() {
  return (
    <Legal title="Privacy policy" path="/privacy" updated="TODO_DATE">
      <p>Local Lion is a trading name of {site.legalName}, company number {site.companyNumber}, registered in England &amp; Wales ("we", "us"). We are the data controller for personal data collected through this website.</p>
      <h2>What we collect</h2>
      <ul>
        <li>Details you give us in our forms: name, business name, trade, town, phone, email, website and your message.</li>
        <li>With your consent, analytics and advertising data via cookies (see our <Link href="/cookies">cookie policy</Link>).</li>
        <li>Basic technical data (IP address, browser) in server logs and security tools.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To prepare and send your free audit and respond to your enquiry (legitimate interests / steps at your request).</li>
        <li>To run and improve our website and advertising (consent).</li>
        <li>To meet legal and accounting obligations.</li>
      </ul>
      <h2>Who we share it with</h2>
      <p>Service providers who help us run the site and email (for example hosting, form delivery, email and analytics providers). We do not sell your data. Some providers may process data outside the UK under appropriate safeguards.</p>
      <h2>How long we keep it</h2>
      <p>Enquiry details are kept for as long as needed to deal with your enquiry and any resulting relationship, then deleted.</p>
      <h2>Your rights</h2>
      <p>You can ask to access, correct, delete or restrict your data, object to its use, or withdraw consent at any time. Email <a href={`mailto:${site.email}`}>{site.email}</a>. You can also complain to the Information Commissioner's Office at ico.org.uk.</p>
    </Legal>
  );
}

import { Legal } from "@/components/Legal";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Terms of Use | Local Lion", description: "Terms for using the Local Lion website.", path: "/terms" });

export default function Terms() {
  return (
    <Legal title="Terms" path="/terms" updated="TODO_DATE">
      <p>This website is operated by {site.legalName} (company number {site.companyNumber}, registered in England &amp; Wales) trading as Local Lion.</p>
      <h2>Using this site</h2>
      <p>The content is provided for general information. We try to keep it accurate, but prices and details may change. Nothing here is a guarantee of rankings, enquiries or results.</p>
      <h2>Our services</h2>
      <p>Websites, local SEO and Google Ads are provided under a separate written agreement or order, which sets out price, term and cancellation.</p>
      <h2>Intellectual property</h2>
      <p>The content and design of this site belong to us or our licensors. Please don't copy it without permission.</p>
      <h2>Liability</h2>
      <p>Nothing limits liability that cannot be limited by law. Otherwise, we're not liable for indirect or consequential loss from using this site.</p>
      <h2>Law</h2>
      <p>These terms are governed by the laws of England and Wales.</p>
    </Legal>
  );
}

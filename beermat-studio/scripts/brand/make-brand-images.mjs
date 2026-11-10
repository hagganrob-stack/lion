// Regenerates public/og.png and public/apple-touch-icon.png from the HTML files next to this script.
// Needs Playwright with Chromium installed: `npm i -D playwright && npx playwright install chromium`.
// Run: node scripts/brand/make-brand-images.mjs
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, '../../public');
const browser = await chromium.launch();

async function shoot(file, width, height, target) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(path.join(here, file)).href);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(out, target) });
  await page.close();
}

await shoot('og.html', 1200, 630, 'og.png');
await shoot('icon.html', 180, 180, 'apple-touch-icon.png');
await browser.close();

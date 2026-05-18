import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateSitemapXml } from "../src/lib/sitemap";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function main() {
  const xml = await generateSitemapXml();
  const publicPath = path.join(root, "public", "sitemap.xml");
  fs.writeFileSync(publicPath, xml, "utf-8");
  console.log(`[sitemap] Wrote ${publicPath}`);
}

main().catch((err) => {
  console.error("[sitemap] Failed to generate sitemap:", err);
  process.exit(1);
});

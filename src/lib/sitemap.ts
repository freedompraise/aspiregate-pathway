import { sanityClient, isSanityConfigured } from "@/lib/sanityClient";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { sitemapCategoriesQuery, sitemapPostsQuery } from "@/lib/sanityQueries";

type Changefreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export type SitemapEntry = {
  path: string;
  changefreq?: Changefreq;
  priority?: number;
  lastmod?: string;
};

const STATIC_ENTRIES: SitemapEntry[] = [
  { path: "", changefreq: "weekly", priority: 1 },
  { path: "services", changefreq: "monthly", priority: 0.9 },
  { path: "destinations", changefreq: "monthly", priority: 0.9 },
  { path: "contact", changefreq: "monthly", priority: 0.8 },
  { path: "blog", changefreq: "weekly", priority: 0.9 },
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function toAbsoluteUrl(path: string): string {
  const base = SITE_CONFIG.baseURL.replace(/\/$/, "");
  if (!path) return `${base}/`;
  return `${base}/${path.replace(/^\//, "")}`;
}

function formatLastmod(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString().slice(0, 10);
}

async function fetchBlogEntries(): Promise<SitemapEntry[]> {
  if (!isSanityConfigured()) return [];

  try {
    const [posts, categories] = await Promise.all([
      sanityClient.fetch<Array<{ slug: string | null; lastmod?: string }>>(sitemapPostsQuery),
      sanityClient.fetch<Array<{ slug: string | null }>>(sitemapCategoriesQuery),
    ]);

    const categoryEntries: SitemapEntry[] = categories
      .map((row) => row.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({
        path: `blog/category/${slug}`,
        changefreq: "weekly" as const,
        priority: 0.7,
      }));

    const postEntries: SitemapEntry[] = posts
      .filter((row): row is { slug: string; lastmod?: string } => Boolean(row.slug))
      .map((row) => ({
        path: `blog/${row.slug}`,
        changefreq: "monthly" as const,
        priority: 0.8,
        lastmod: formatLastmod(row.lastmod),
      }));

    return [...categoryEntries, ...postEntries];
  } catch {
    return [];
  }
}

export async function collectSitemapEntries(): Promise<SitemapEntry[]> {
  const blogEntries = await fetchBlogEntries();
  return [...STATIC_ENTRIES, ...blogEntries];
}

export function buildSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map((entry) => {
      const loc = escapeXml(toAbsoluteUrl(entry.path));
      const lastmod = entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : "";
      const changefreq = entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : "";
      const priority =
        entry.priority !== undefined ? `<priority>${entry.priority.toFixed(1)}</priority>` : "";
      return `  <url>\n    <loc>${loc}</loc>${lastmod ? `\n    ${lastmod}` : ""}${changefreq ? `\n    ${changefreq}` : ""}${priority ? `\n    ${priority}` : ""}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export async function generateSitemapXml(): Promise<string> {
  const entries = await collectSitemapEntries();
  return buildSitemapXml(entries);
}

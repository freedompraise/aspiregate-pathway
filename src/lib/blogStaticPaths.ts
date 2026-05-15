import { sanityClient } from "@/lib/sanityClient";
import { isSanityConfigured } from "@/lib/sanityEnv";
import { allCategorySlugPathsQuery, allPublishedPostSlugPathsQuery } from "@/lib/sanityQueries";

/** Relative paths under `/` for vite-react-ssg `getStaticPaths` (e.g. `blog/my-post`). */
export async function getBlogPostStaticPaths(): Promise<string[]> {
  if (!isSanityConfigured()) return [];
  try {
    const rows = await sanityClient.fetch<Array<{ slug: string | null }>>(allPublishedPostSlugPathsQuery);
    return rows
      .map((r) => r.slug)
      .filter((s): s is string => Boolean(s))
      .map((slug) => `blog/${slug}`);
  } catch {
    return [];
  }
}

/** Relative paths under `/` for category pages. */
export async function getBlogCategoryStaticPaths(): Promise<string[]> {
  if (!isSanityConfigured()) return [];
  try {
    const rows = await sanityClient.fetch<Array<{ slug: string | null }>>(allCategorySlugPathsQuery);
    return rows
      .map((r) => r.slug)
      .filter((s): s is string => Boolean(s))
      .map((slug) => `blog/category/${slug}`);
  } catch {
    return [];
  }
}

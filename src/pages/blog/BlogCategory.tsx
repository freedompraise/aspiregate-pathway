import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/site/Layout";
import SectionHeading from "@/components/site/SectionHeading";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogCategoryPills } from "@/components/blog/BlogCategoryPills";
import { BlogSeo } from "@/components/blog/BlogSeo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { blogMsgs } from "@/lib/blogUserMessages";
import { categoryBySlugQuery, allCategoriesQuery, postsByCategorySlugQuery } from "@/lib/sanityQueries";
import { sanityClient, isSanityConfigured } from "@/lib/sanityClient";
import type { BlogCategoryRef, BlogPostCard } from "@/types/blog";

const BlogCategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const configured = isSanityConfigured();

  const categoriesQuery = useQuery({
    queryKey: ["blog", "categories"],
    queryFn: () => sanityClient.fetch<BlogCategoryRef[]>(allCategoriesQuery),
    enabled: configured,
  });

  const categoryQuery = useQuery({
    queryKey: ["blog", "category", categorySlug],
    queryFn: () =>
      sanityClient.fetch<{ title?: string; description?: string | null; slug?: string | null } | null>(categoryBySlugQuery, {
        categorySlug,
      }),
    enabled: configured && Boolean(categorySlug),
  });

  const postsQuery = useQuery({
    queryKey: ["blog", "category-posts", categorySlug],
    queryFn: () => sanityClient.fetch<BlogPostCard[]>(postsByCategorySlugQuery, { categorySlug }),
    enabled: configured && Boolean(categorySlug) && Boolean(categoryQuery.data),
  });

  const category = categoryQuery.data;
  const posts = postsQuery.data ?? [];

  const titleBase = category?.title || "Category";
  const seoTitle = `${titleBase} | AspireGate Blog`;
  const seoDescription =
    category?.description?.trim() || `Study abroad articles in ${titleBase} — for Nigerian students and families.`;

  if (!configured) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <p className="text-muted-foreground">{blogMsgs.categoryUnavailableBody}</p>
          <Button asChild className="mt-6" variant="cta">
            <Link to="/blog">Back to blog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <BlogSeo title={seoTitle} description={seoDescription} path={`/blog/category/${categorySlug ?? ""}`} />

      <section className="bg-gradient-soft border-b border-border/40 py-14 md:py-16">
        <div className="container max-w-4xl">
          <Link to="/blog" className="text-sm font-medium text-accent hover:underline">
            ← All articles
          </Link>
          {categoryQuery.isLoading ? (
            <div className="mt-6 space-y-4">
              <Skeleton className="h-10 w-2/3 rounded-lg" />
              <Skeleton className="h-5 w-full rounded-lg" />
            </div>
          ) : !category ? (
            <div className="mt-8">
              <h1 className="text-3xl font-bold text-primary">Category not found</h1>
              <p className="mt-3 text-muted-foreground">This topic does not exist or was renamed.</p>
              <Button asChild className="mt-8" variant="cta">
                <Link to="/blog">Browse all articles</Link>
              </Button>
            </div>
          ) : (
            <>
              <h1 className="mt-6 text-3xl md:text-5xl font-bold text-primary tracking-tight">{category.title}</h1>
              {category.description ? (
                <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-3xl">{category.description}</p>
              ) : null}
            </>
          )}
        </div>
      </section>

      <section className="container py-12 md:py-16">
        {categoriesQuery.data?.length ? (
          <BlogCategoryPills categories={categoriesQuery.data} activeSlug={categorySlug} className="mb-12" />
        ) : null}

        {categoryQuery.isLoading || postsQuery.isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-2xl" />
            ))}
          </div>
        ) : postsQuery.isError ? (
          <Alert variant="destructive" className="max-w-2xl rounded-2xl">
            <AlertTitle>Could not load posts</AlertTitle>
            <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span>{blogMsgs.categoryLoadError}</span>
              <Button type="button" variant="outline" size="sm" onClick={() => postsQuery.refetch()}>
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        ) : !category ? null : posts.length === 0 ? (
          <div className="mx-auto max-w-lg text-center rounded-3xl border border-dashed border-border/80 bg-muted/20 px-8 py-14">
            <h2 className="text-xl font-bold text-primary">No articles in this category yet</h2>
            <p className="mt-3 text-muted-foreground">{blogMsgs.emptyCategoryBody}</p>
          </div>
        ) : (
          <>
            <SectionHeading eyebrow="Articles" title={`Posts in ${category.title}`} align="left" />
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default BlogCategoryPage;

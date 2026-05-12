import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/site/Layout";
import SectionHeading from "@/components/site/SectionHeading";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogCategoryPills } from "@/components/blog/BlogCategoryPills";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogSeo } from "@/components/blog/BlogSeo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { blogMsgs } from "@/lib/blogUserMessages";
import { allCategoriesQuery, allPublishedPostsQuery } from "@/lib/sanityQueries";
import { sanityClient, isSanityConfigured } from "@/lib/sanityClient";
import { SITE_CONFIG } from "@/lib/siteConfig";
import type { BlogCategoryRef, BlogPostCard } from "@/types/blog";

const BlogIndex = () => {
  const configured = isSanityConfigured();

  const postsQuery = useQuery({
    queryKey: ["blog", "posts"],
    queryFn: () => sanityClient.fetch<BlogPostCard[]>(allPublishedPostsQuery),
    enabled: configured,
  });

  const categoriesQuery = useQuery({
    queryKey: ["blog", "categories"],
    queryFn: () => sanityClient.fetch<BlogCategoryRef[]>(allCategoriesQuery),
    enabled: configured,
  });

  const posts = postsQuery.data ?? [];
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <Layout>
      <BlogSeo
        title="Resources for Study Abroad for Nigeria | AspireGate Blog"
        description="Guides on admission, visa preparation, scholarships, documents, and student life abroad — written for Nigerian students."
        path="/blog"
        ogType="website"
      />

      <BlogHero
        title="Study Abroad Resources for Nigerian Students"
        description="Articles on admission planning, visa preparation, scholarships and funding, documents, and everyday student life abroad."
      />

      <section className="container py-12 md:py-16">
        {!configured ? (
          <Alert className="max-w-2xl mx-auto rounded-2xl border-border/80">
            <AlertTitle>{blogMsgs.articlesUnavailableTitle}</AlertTitle>
            <AlertDescription>{blogMsgs.articlesUnavailableBody}</AlertDescription>
          </Alert>
        ) : postsQuery.isError ? (
          <Alert variant="destructive" className="max-w-2xl mx-auto rounded-2xl">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span>{blogMsgs.listLoadError}</span>
              <Button type="button" variant="outline" size="sm" onClick={() => postsQuery.refetch()}>
                Try again
              </Button>
            </AlertDescription>
          </Alert>
        ) : postsQuery.isLoading ? (
          <div className="space-y-10">
            <div className="space-y-4">
              <Skeleton className="h-10 w-64 mx-auto rounded-lg" />
              <Skeleton className="h-12 w-full max-w-3xl mx-auto rounded-2xl" />
            </div>
            <Skeleton className="h-72 w-full rounded-3xl" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-2xl" />
              ))}
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="mx-auto max-w-lg text-center rounded-3xl border border-dashed border-border/80 bg-muted/20 px-8 py-14">
            <h2 className="text-xl font-bold text-primary">No articles yet</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">{blogMsgs.emptyListBody}</p>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <SectionHeading
                eyebrow="Topics"
                title="Browse by category"
                description="Jump to a topic or scroll through the latest articles."
                align="left"
              />
              {categoriesQuery.data?.length ? (
                <BlogCategoryPills categories={categoriesQuery.data} className="mt-8 justify-start" />
              ) : null}
            </div>

            {featured ? (
              <div className="mb-14">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">Latest</p>
                <BlogCard post={featured} featured />
              </div>
            ) : null}

            {rest.length > 0 ? (
              <>
                <SectionHeading eyebrow="Recent" title="More articles" align="left" />
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <BlogCard key={post._id} post={post} />
                  ))}
                </div>
              </>
            ) : null}

            <div className="mt-16">
              <BlogCTA
                title="Prefer to talk it through?"
                text="Book a free consultation with AspireGate to discuss your goals, timeline, and realistic next steps."
                buttonText="Book a Free Consultation"
                buttonHref={SITE_CONFIG.calendlyUrl}
                variant="hero"
              />
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default BlogIndex;

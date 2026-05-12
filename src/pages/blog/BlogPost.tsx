import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import Layout from "@/components/site/Layout";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { BlogPortableText } from "@/components/blog/PortableTextComponents";
import { BlogSeo } from "@/components/blog/BlogSeo";
import { BlogTableOfContents } from "@/components/blog/BlogTableOfContents";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { estimateReadingMinutes, extractTocFromPortableText, splitBodyForMidCta } from "@/lib/blogUtils";
import { urlFor } from "@/lib/sanityImage";
import { blogMsgs } from "@/lib/blogUserMessages";
import { postBySlugQuery, relatedPostsQuery } from "@/lib/sanityQueries";
import { sanityClient, isSanityConfigured } from "@/lib/sanityClient";
import type { BlogPostCard, BlogPostDetail } from "@/types/blog";

function formatBlogDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  try {
    return format(parseISO(iso), "d MMMM yyyy");
  } catch {
    return null;
  }
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const configured = isSanityConfigured();

  const postQuery = useQuery({
    queryKey: ["blog", "post", slug],
    queryFn: () => sanityClient.fetch<BlogPostDetail | null>(postBySlugQuery, { slug }),
    enabled: configured && Boolean(slug),
  });

  const post = postQuery.data;

  const relatedQuery = useQuery({
    queryKey: ["blog", "related", slug, post?.categoryRef],
    queryFn: () =>
      sanityClient.fetch<BlogPostCard[]>(relatedPostsQuery, {
        slug,
        categoryRef: post!.categoryRef,
      }),
    enabled: Boolean(configured && slug && post?.categoryRef && post.slug),
  });

  const seoTitle = post?.seoTitle?.trim() || (post?.title ? `${post.title} | AspireGate Blog` : "AspireGate Blog");
  const seoDescription = post?.seoDescription?.trim() || post?.excerpt?.trim() || "";

  const heroImageUrl =
    post?.featuredImage && urlFor(post.featuredImage)?.width(1200).height(630).auto("format").quality(88).url();

  const toc = extractTocFromPortableText(post?.body as unknown[] | undefined);

  const [firstBlocks, restBlocks] = splitBodyForMidCta(post?.body ?? undefined);
  const showMidCta = restBlocks.length > 0;

  if (!configured) {
    return (
      <Layout>
        <div className="container py-24 text-center max-w-md mx-auto space-y-6">
          <p className="text-muted-foreground">{blogMsgs.articleUnavailableBody}</p>
          <Button asChild variant="cta">
            <Link to="/blog">Back to blog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  if (postQuery.isLoading) {
    return (
      <Layout>
        <div className="container py-12 max-w-3xl space-y-6">
          <Skeleton className="h-8 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-3xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </Layout>
    );
  }

  if (postQuery.isError) {
    return (
      <Layout>
        <div className="container py-16 max-w-xl mx-auto">
          <Alert variant="destructive" className="rounded-2xl">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span>{blogMsgs.articleLoadError}</span>
              <Button type="button" variant="outline" size="sm" onClick={() => postQuery.refetch()}>
                Try again
              </Button>
            </AlertDescription>
          </Alert>
          <div className="mt-8 text-center">
            <Button asChild variant="cta">
              <Link to="/blog">Back to blog</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post || !post.slug) {
    return (
      <Layout>
        <div className="container py-24 text-center max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-primary">Article not found</h1>
          <p className="mt-3 text-muted-foreground">This post may be unpublished or the link is incorrect.</p>
          <Button asChild className="mt-8" variant="cta">
            <Link to="/blog">View all articles</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const readTime = estimateReadingMinutes(post.body as unknown[] | undefined);
  const publishedLabel = formatBlogDate(post.publishedAt);
  const updatedLabel = formatBlogDate(post.updatedAt);
  const authorInitial = post.author?.name?.slice(0, 1)?.toUpperCase() ?? "A";
  const authorImg = post.author?.image ? urlFor(post.author.image)?.width(96).height(96).auto("format").url() : null;

  return (
    <Layout>
      <BlogSeo
        title={seoTitle}
        description={seoDescription || post.excerpt || post.title || ""}
        path={`/blog/${post.slug}`}
        ogImageUrl={heroImageUrl}
        ogType="article"
      />

      <article className="pb-20">
        <header className="border-b border-border/60 bg-muted/20">
          <div className="container max-w-3xl py-12 md:py-16">
            {post.category?.slug ? (
              <Link
                to={`/blog/category/${post.category.slug}`}
                className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent hover:border-accent/50 transition-smooth"
              >
                {post.category.title}
              </Link>
            ) : null}
            <h1 className="mt-5 text-3xl md:text-5xl font-bold tracking-tight text-primary leading-tight">{post.title}</h1>
            {post.excerpt ? <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p> : null}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {publishedLabel ? (
                <span>
                  Published <time dateTime={post.publishedAt ?? undefined}>{publishedLabel}</time>
                </span>
              ) : null}
              {updatedLabel ? (
                <span>
                  Updated <time dateTime={post.updatedAt ?? undefined}>{updatedLabel}</time>
                </span>
              ) : null}
              <span>{readTime} min read</span>
            </div>
            {post.author?.name ? (
              <div className="mt-6 flex items-center gap-3">
                <Avatar className="h-11 w-11 border border-border/60">
                  {authorImg ? <AvatarImage src={authorImg} alt={post.author?.name ?? ""} /> : null}
                  <AvatarFallback>{authorInitial}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-primary text-sm">{post.author.name}</p>
                  {post.author.role ? <p className="text-xs text-muted-foreground">{post.author.role}</p> : null}
                </div>
              </div>
            ) : null}
          </div>
        </header>

        {heroImageUrl ? (
          <div className="container max-w-4xl -mt-4 md:-mt-6 px-4">
            <figure className="overflow-hidden rounded-3xl border border-border/60 shadow-card bg-muted">
              <img
                src={heroImageUrl}
                alt={post.featuredImageAlt || post.title || "Featured image"}
                className="w-full object-cover max-h-[420px]"
              />
            </figure>
          </div>
        ) : null}

        <div className="container mt-12 lg:mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
          <div className="min-w-0 max-w-3xl mx-auto lg:mx-0 lg:max-w-none">
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-primary prose-a:text-accent prose-li:marker:text-accent dark:prose-invert">
              {showMidCta ? (
                <>
                  <BlogPortableText value={firstBlocks} />
                  <div className="not-prose my-12">
                    <BlogCTA
                      title={post.ctaTitle}
                      text={post.ctaText}
                      buttonText={post.ctaButtonText}
                      buttonHref={post.ctaButtonLink}
                    />
                  </div>
                  <BlogPortableText value={restBlocks} />
                </>
              ) : (
                <BlogPortableText value={post.body ?? undefined} />
              )}
            </div>

            <div className="not-prose mt-14">
              <BlogCTA variant="hero" title={post.ctaTitle} text={post.ctaText} buttonText={post.ctaButtonText} buttonHref={post.ctaButtonLink} />
            </div>

            <RelatedPosts posts={relatedQuery.data ?? []} />
          </div>

          <aside className="max-w-3xl mx-auto lg:mx-0 w-full">
            <BlogTableOfContents entries={toc} />
          </aside>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPostPage;

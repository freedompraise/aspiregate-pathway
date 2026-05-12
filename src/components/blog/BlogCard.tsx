import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { Card } from "@/components/ui/card";
import { urlFor } from "@/lib/sanityImage";
import type { BlogPostCard } from "@/types/blog";

function safeFormatDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  try {
    return format(parseISO(iso), "d MMM yyyy");
  } catch {
    return null;
  }
}

interface BlogCardProps {
  post: BlogPostCard;
  featured?: boolean;
}

export function BlogCard({ post, featured }: BlogCardProps) {
  const slug = post.slug;
  if (!slug) return null;

  const imgUrl = post.featuredImage ? urlFor(post.featuredImage)?.width(featured ? 900 : 600).height(featured ? 480 : 360).auto("format").quality(85).url() : null;
  const dateLabel = safeFormatDate(post.publishedAt);

  return (
    <Card className={`group overflow-hidden border-border/60 shadow-card transition-smooth hover:shadow-lg hover:border-primary/25 rounded-2xl ${featured ? "md:flex md:flex-row" : ""}`}>
      <Link to={`/blog/${slug}`} className={featured ? "contents" : "flex flex-col h-full"}>
        <div className={`relative bg-muted/40 overflow-hidden ${featured ? "md:w-3/5 aspect-[16/10] md:aspect-auto md:min-h-[280px]" : "aspect-[16/10]"}`}>
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={post.featuredImageAlt || post.title || "Blog post image"}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-gradient-soft flex items-center justify-center text-muted-foreground text-sm font-medium">AspireGate</div>
          )}
          {post.category?.title ? (
            <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm border border-border/60">
              {post.category.title}
            </span>
          ) : null}
        </div>
        <div className={`flex flex-col flex-1 p-6 ${featured ? "md:w-2/5 md:justify-center" : ""}`}>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground uppercase tracking-wide font-semibold">
            {dateLabel ? <time dateTime={post.publishedAt ?? undefined}>{dateLabel}</time> : null}
            {post.author?.name ? <span>{post.author.name}</span> : null}
          </div>
          <h2 className={`mt-3 font-bold text-primary leading-snug group-hover:text-accent transition-smooth ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
            {post.title}
          </h2>
          {post.excerpt ? <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p> : null}
          <span className="mt-4 text-sm font-semibold text-accent inline-flex items-center gap-1">
            Read article <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </Card>
  );
}

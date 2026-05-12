import type { BlogPostCard } from "@/types/blog";
import { BlogCard } from "./BlogCard";

interface RelatedPostsProps {
  posts: BlogPostCard[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  const valid = posts.filter((p) => p.slug);
  if (!valid.length) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border/60">
      <span className="text-xs font-semibold uppercase tracking-wider text-accent">Read next</span>
      <h2 className="mt-2 text-2xl md:text-3xl font-bold text-primary">Related articles</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {valid.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}

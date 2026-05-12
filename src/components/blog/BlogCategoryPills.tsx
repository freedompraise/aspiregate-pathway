import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { BlogCategoryRef } from "@/types/blog";

interface BlogCategoryPillsProps {
  categories: BlogCategoryRef[];
  activeSlug?: string | null;
  className?: string;
}

export function BlogCategoryPills({ categories, activeSlug, className }: BlogCategoryPillsProps) {
  const filtered = categories.filter((c) => c.slug);

  return (
    <nav aria-label="Blog categories" className={cn("flex flex-wrap gap-2 justify-center md:justify-start", className)}>
      <Link
        to="/blog"
        className={cn(
          "rounded-full border px-4 py-1.5 text-sm font-medium transition-smooth",
          !activeSlug ? "border-primary bg-primary/10 text-primary" : "border-border/80 bg-background text-muted-foreground hover:border-primary/40 hover:text-primary",
        )}
      >
        All
      </Link>
      {filtered.map((cat) => (
        <Link
          key={cat.slug}
          to={`/blog/category/${cat.slug}`}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-smooth",
            activeSlug === cat.slug ? "border-primary bg-primary/10 text-primary" : "border-border/80 bg-background text-muted-foreground hover:border-primary/40 hover:text-primary",
          )}
        >
          {cat.title}
        </Link>
      ))}
    </nav>
  );
}

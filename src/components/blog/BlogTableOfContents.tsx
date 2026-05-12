import type { TocEntry } from "@/lib/blogUtils";
import { Card } from "@/components/ui/card";

interface BlogTableOfContentsProps {
  entries: TocEntry[];
}

export function BlogTableOfContents({ entries }: BlogTableOfContentsProps) {
  if (entries.length < 2) return null;

  return (
    <Card className="hidden lg:block lg:sticky lg:top-24 h-fit p-5 border-border/60 shadow-card rounded-2xl bg-muted/20">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">On this page</p>
      <ul className="space-y-2 text-sm">
        {entries.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
            <a href={`#${item.id}`} className="text-muted-foreground hover:text-primary transition-smooth leading-snug">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
}

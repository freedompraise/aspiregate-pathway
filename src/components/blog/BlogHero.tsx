import type { ReactNode } from "react";

interface BlogHeroProps {
  title: string;
  description?: string;
  eyebrow?: string;
  children?: ReactNode;
}

export function BlogHero({ title, description, eyebrow = "Blog", children }: BlogHeroProps) {
  return (
    <section className="bg-gradient-hero py-16 md:py-20 border-b border-border/40">
      <div className="container max-w-4xl text-primary-foreground text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent-glow mb-3">{eyebrow}</span>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">{title}</h1>
        {description ? (
          <p className="mt-5 text-lg text-primary-foreground/85 leading-relaxed max-w-3xl mx-auto">{description}</p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

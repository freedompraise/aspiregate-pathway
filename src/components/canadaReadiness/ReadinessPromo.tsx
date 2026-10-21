import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CountryFlag } from "@/components/site/CountryFlag";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

export function ReadinessPromo({
  tone = "card",
  className,
}: {
  tone?: "card" | "banner" | "compact";
  className?: string;
}) {
  if (tone === "compact") {
    return (
      <Link
        to={SITE_CONFIG.canadaReadinessPath}
        className={cn(
          "group flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card px-4 py-3 text-sm shadow-card transition-smooth hover:border-primary/40",
          className,
        )}
      >
        <span className="flex items-center gap-3">
          <CountryFlag code="CA" className="h-5 w-auto" title="Canada" />
          <span className="font-medium text-primary">Heading to Canada? Check your permit file first.</span>
        </span>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
      </Link>
    );
  }

  if (tone === "banner") {
    return (
      <div className={cn("rounded-3xl bg-primary px-6 py-7 text-primary-foreground md:px-8 md:py-8", className)}>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-glow">Free Canada check</p>
            <h2 className="mt-2 text-2xl font-bold leading-tight md:text-3xl">See if your study-permit file is ready</h2>
            <p className="mt-3 text-sm text-primary-foreground/80 md:text-base">
              A short check of school, funds, purpose, and papers — before you spend the filing fee.
            </p>
          </div>
          <Button asChild variant="cta" size="lg" className="shrink-0">
            <Link to={SITE_CONFIG.canadaReadinessPath}>
              Start the check <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-3xl border border-border/60 bg-card p-6 shadow-card md:p-8", className)}>
      <CountryFlag code="CA" className="h-8 w-auto" title="Canada" />
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent">Canada study permit</p>
      <h2 className="mt-2 text-2xl font-bold text-primary">How ready is your Canada file?</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        A short check of school, funds, purpose, and papers. You leave with a score and a list of what still needs work.
      </p>
      <Button asChild variant="cta" className="mt-5">
        <Link to={SITE_CONFIG.canadaReadinessPath}>
          Check my Canada readiness <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

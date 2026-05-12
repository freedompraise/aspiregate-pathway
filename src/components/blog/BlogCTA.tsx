import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/siteConfig";

interface BlogCTAProps {
  title?: string | null;
  text?: string | null;
  buttonText?: string | null;
  buttonHref?: string | null;
  variant?: "soft" | "hero";
}

const DEFAULT_TITLE = "Need help with your study abroad application?";
const DEFAULT_TEXT =
  "AspireGate can help you understand your options and prepare your next step.";
const DEFAULT_BUTTON = "Book a Free Consultation";

export function BlogCTA({
  title = DEFAULT_TITLE,
  text = DEFAULT_TEXT,
  buttonText = DEFAULT_BUTTON,
  buttonHref = SITE_CONFIG.calendlyUrl,
  variant = "soft",
}: BlogCTAProps) {
  const href = buttonHref?.trim() || SITE_CONFIG.calendlyUrl;

  return (
    <Card
      className={
        variant === "hero"
          ? "relative overflow-hidden border-accent/30 bg-gradient-to-br from-primary/95 via-primary to-primary/90 p-8 md:p-10 text-primary-foreground shadow-card rounded-3xl"
          : "border-border/60 bg-muted/30 p-8 md:p-10 shadow-card rounded-3xl"
      }
    >
      <div className="relative max-w-2xl">
        <h2 className={`text-xl md:text-2xl font-bold ${variant === "hero" ? "" : "text-primary"}`}>{title}</h2>
        <p className={`mt-3 text-base leading-relaxed ${variant === "hero" ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
          {text}
        </p>
        <Button asChild className="mt-6" variant={variant === "hero" ? "secondary" : "cta"} size="lg">
          <a href={href} target="_blank" rel="noreferrer">
            {buttonText}
          </a>
        </Button>
      </div>
    </Card>
  );
}

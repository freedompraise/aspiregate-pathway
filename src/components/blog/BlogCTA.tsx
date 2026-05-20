import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ApplyNowLink } from "@/components/site/ApplyNowLink";
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
const DEFAULT_TEXT = "Share your details and AspireGate will review your options and get back to you.";
const DEFAULT_BUTTON = "Apply Now";

function CtaButton({ href, children, variant }: { href: string; children: ReactNode; variant: "soft" | "hero" }) {
  const isInternal = href.startsWith("/");

  if (isInternal) {
    return (
      <Button asChild className="mt-6" variant={variant === "hero" ? "secondary" : "cta"} size="lg">
        <Link to={href}>{children}</Link>
      </Button>
    );
  }

  return (
    <Button asChild className="mt-6" variant={variant === "hero" ? "secondary" : "cta"} size="lg">
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    </Button>
  );
}

export function BlogCTA({
  title = DEFAULT_TITLE,
  text = DEFAULT_TEXT,
  buttonText = DEFAULT_BUTTON,
  buttonHref = SITE_CONFIG.applyNowPath,
  variant = "soft",
}: BlogCTAProps) {
  const href = buttonHref?.trim() || SITE_CONFIG.applyNowPath;

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
        {href === SITE_CONFIG.applyNowPath ? (
          <Button asChild className="mt-6" variant={variant === "hero" ? "secondary" : "cta"} size="lg">
            <ApplyNowLink>{buttonText}</ApplyNowLink>
          </Button>
        ) : (
          <CtaButton href={href} variant={variant}>
            {buttonText}
          </CtaButton>
        )}
      </div>
    </Card>
  );
}

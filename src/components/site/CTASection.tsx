import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

const CTASection = ({
  title = "Ready to Start Your Study Abroad Journey?",
  subtitle = "Your first step does not have to be complicated. Book a free consultation with AspireGate and get clear guidance on your best route to studying abroad.",
}: { title?: string; subtitle?: string }) => (
  <section className="container py-20">
    <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 md:p-16 text-center shadow-elegant">
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl" />
      <div className="relative">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground max-w-2xl mx-auto leading-tight">
          {title}
        </h2>
        <p className="mt-4 text-primary-foreground/85 max-w-2xl mx-auto text-lg">{subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button asChild variant="hero" size="xl">
            <a href="https://calendly.com/aspiregateconsultingservices/consultation" target="_blank" rel="noreferrer">
              Book a Free Consultation <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="heroOutline" size="xl">
            <a href="mailto:admin@aspiregateservices.com">
              <Mail className="mr-1 h-4 w-4" /> Email AspireGate
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
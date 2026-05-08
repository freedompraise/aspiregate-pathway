import Layout from "@/components/site/Layout";
import SectionHeading from "@/components/site/SectionHeading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/siteConfig";

const destinations = [
  "United Kingdom",
  "Canada",
  "United States",
  "Ireland",
  "Germany",
  "Australia",
  "France",
  "United Arab Emirates",
];

const Destinations = () => (
  <Layout>
    <section className="bg-gradient-hero py-20 md:py-24">
      <div className="container max-w-4xl text-primary-foreground text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent-glow mb-3">Study Destinations</span>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">Find the Right Country for Your Study Abroad Plan</h1>
        <p className="mt-5 text-lg text-primary-foreground/85">
          The right destination depends on your profile, budget, course choice, and long-term goals. AspireGate helps you compare options before you apply.
        </p>
      </div>
    </section>

    <section className="container py-20">
      <SectionHeading
        eyebrow="Countries We Cover"
        title="Popular Options for Nigerian Students"
        description="We guide applications and preparation for these destinations."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {destinations.map((name) => (
          <Card key={name} className="p-6 border-border/60 shadow-card">
            <h3 className="font-semibold text-primary">{name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Compare tuition, entry requirements, intakes, document expectations, and visa preparation path.
            </p>
          </Card>
        ))}
      </div>
    </section>

    <section className="bg-gradient-soft py-20">
      <div className="container max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">Not Sure Which Country Fits You?</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Book a destination consultation and get a practical recommendation based on your own profile.
        </p>
        <Button asChild variant="cta" size="xl" className="mt-8">
          <a href={SITE_CONFIG.calendlyUrl} target="_blank" rel="noreferrer">
            Compare My Options <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  </Layout>
);

export default Destinations;

import Layout from "@/components/site/Layout";
import { ApplyNowForm } from "@/components/site/ApplyNowForm";
import { SITE_CONFIG } from "@/lib/siteConfig";

const ApplyNow = () => (
  <Layout>
    <section className="bg-gradient-hero py-16 md:py-20">
      <div className="container max-w-3xl text-primary-foreground text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent-glow mb-3">
          Apply Now
        </span>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">Request a free consultation</h1>
        <p className="mt-4 text-lg text-primary-foreground/85 leading-relaxed">
          Tell us a little about your plans. We&apos;ll review your details and get back to you with next steps.
        </p>
      </div>
    </section>

    <section className="container py-12 md:py-16">
      <div className="mx-auto max-w-2xl">
        <ApplyNowForm />

        <div className="mt-12 rounded-xl border border-border/60 bg-muted/30 p-6 md:p-8">
          <h2 className="text-lg font-semibold text-primary">What happens next?</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            An AspireGate adviser will review your details and contact you by email or WhatsApp to discuss suitable options,
            eligibility, timelines, and documents. For a quicker reply, you can also{" "}
            <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">
              message us on WhatsApp
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  </Layout>
);

export default ApplyNow;

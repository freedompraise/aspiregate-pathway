import { CanadaReadinessCalculator } from "@/components/canadaReadiness/CanadaReadinessCalculator";
import Layout from "@/components/site/Layout";

const CanadaReadiness = () => (
  <Layout>
    <section className="bg-gradient-hero py-16 md:py-20">
      <div className="container max-w-3xl text-center text-primary-foreground">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent-glow mb-3">
          Canada study permit
        </span>
        <h1 className="text-3xl font-bold leading-tight md:text-5xl">See where your Canada file stands</h1>
        <p className="mt-4 text-lg text-primary-foreground/85">
          Thirteen short questions. You leave with a score and a clear list of what still needs work.
        </p>
      </div>
    </section>
    <section className="container py-12 md:py-16">
      <CanadaReadinessCalculator />
    </section>
  </Layout>
);

export default CanadaReadiness;

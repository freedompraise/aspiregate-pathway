import Layout from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BUDGET_CURRENCIES,
  DOCUMENT_STATUS_OPTIONS,
  DOCUMENTS_ON_HAND,
  HIGHEST_QUALIFICATIONS,
  PASSPORT_STATUS_OPTIONS,
  PREFERRED_COUNTRIES,
} from "@/lib/applyNowFormOptions";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

const FORMSPREE_ACTION = "https://formspree.io/f/xbdbdpqq";

const selectClassName = cn(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
);

const nativeCheckboxClassName =
  "mt-0.5 h-4 w-4 shrink-0 rounded border border-primary text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2";

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
        <Card className="p-6 md:p-8 border-border/60 shadow-card">
          <form action={FORMSPREE_ACTION} method="POST" className="space-y-6">
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <input type="hidden" name="form_type" value="apply_now" />
            <input type="hidden" name="_subject" value="New Apply Now request — AspireGate" />

            <div className="space-y-2">
              <Label htmlFor="apply-name">Full name</Label>
              <Input id="apply-name" name="name" type="text" required autoComplete="name" placeholder="Chidi Bolu" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apply-email">Email address</Label>
              <Input id="apply-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apply-whatsapp">WhatsApp number</Label>
              <Input
                id="apply-whatsapp"
                name="whatsapp"
                type="tel"
                required
                autoComplete="tel"
                placeholder="+234 800 000 0000"
              />
              <p className="text-xs text-muted-foreground">Include your country code (e.g. +234 for Nigeria).</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apply-country">Preferred country</Label>
              <select id="apply-country" name="preferred_country" required className={selectClassName} defaultValue="">
                <option value="" disabled>
                  Select your preferred country…
                </option>
                {PREFERRED_COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apply-qualification">Highest qualification</Label>
              <select id="apply-qualification" name="highest_qualification" required className={selectClassName} defaultValue="">
                <option value="" disabled>
                  Select your highest qualification…
                </option>
                {HIGHEST_QUALIFICATIONS.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium leading-none">My passport is:</legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {PASSPORT_STATUS_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-input px-3 py-2.5 text-sm has-[:checked]:border-primary has-[:checked]:bg-muted/50"
                  >
                    <input
                      type="radio"
                      name="passport_status"
                      value={option.value}
                      required
                      className="h-4 w-4 border-input text-primary focus:ring-primary"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="apply-budget-currency">Budget currency</Label>
                <select id="apply-budget-currency" name="budget_currency" required className={selectClassName} defaultValue="">
                  <option value="" disabled>
                    Currency…
                  </option>
                  {BUDGET_CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="apply-budget-amount">Estimated budget</Label>
                <Input id="apply-budget-amount" name="budget_amount" type="number" min={0} step={1} required placeholder="e.g. 2500000" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground -mt-2">
              Your estimated total budget for tuition and living costs, in the currency you selected.
            </p>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium leading-none">Documents I already have (optional)</legend>
              <p className="text-xs text-muted-foreground">Tick any that apply — helps us advise you faster.</p>
              <div className="space-y-2">
                {DOCUMENTS_ON_HAND.map((doc) => (
                  <label key={doc} className="flex items-start gap-3 text-sm leading-snug cursor-pointer">
                    <input type="checkbox" name="documents_on_hand" value={doc} className={nativeCheckboxClassName} />
                    <span>{doc}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="space-y-2">
              <Label htmlFor="apply-document-status">Document status</Label>
              <select id="apply-document-status" name="document_status" required className={selectClassName} defaultValue="">
                <option value="" disabled>
                  How ready are your documents?…
                </option>
                {DOCUMENT_STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-start gap-3 text-sm leading-snug cursor-pointer">
              <input type="checkbox" name="details_confirmed" value="yes" required className={nativeCheckboxClassName} />
              <span>
                I confirm the information above is accurate. I understand AspireGate will contact me about study abroad
                options.
              </span>
            </label>

            <Button type="submit" variant="cta" size="lg" className="w-full sm:w-auto">
              Submit application
            </Button>
          </form>
        </Card>

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

import Layout from "@/components/site/Layout";
import SectionHeading from "@/components/site/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Mail, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { SITE_CONFIG } from "@/lib/siteConfig";

const FORMSPREE_ACTION = "https://formspree.io/f/xqenyyvn";

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "What services does AspireGate offer?",
    a: (
      <p>
        AspireGate provides personalised education counselling for students who want to study abroad, especially in the UK. Our services include university selection,
        course matching, admissions guidance, application support, document review, offer evaluation, and enrolment assistance.
      </p>
    ),
  },
  {
    q: "Which countries can AspireGate help me study in?",
    a: (
      <>
        <p>We support students applying to:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>United Kingdom (our strongest network and most school options)</li>
          <li>Canada</li>
          <li>United States</li>
          <li>Australia</li>
          <li>Ireland</li>
          <li>Germany</li>
          <li>United Arab Emirates (UAE)</li>
          <li>France</li>
        </ul>
      </>
    ),
  },
  {
    q: "Do you charge consultation fees?",
    a: (
      <p>
        We offer an initial consultation to understand your academic background, goals, and budget. Some advanced services may attract professional service fees depending on
        the support required.
      </p>
    ),
  },
  {
    q: "What study levels do you support?",
    a: (
      <>
        <p>We assist with applications for:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Foundation / Pathway programmes</li>
          <li>Undergraduate degrees</li>
          <li>Postgraduate / Master&apos;s degrees</li>
          <li>MBA programmes</li>
          <li>Some doctoral / research opportunities</li>
          <li>Professional and diploma programmes</li>
        </ul>
      </>
    ),
  },
  {
    q: "Can you help me choose the right university?",
    a: (
      <p>
        Yes. We assess your academic profile, budget, preferred location, career goals, and course interests to recommend suitable universities and pathway institutions.
      </p>
    ),
  },
  {
    q: "Do you guarantee admission?",
    a: (
      <p>
        No ethical consultant can guarantee admission. Final admission decisions are made solely by universities based on their criteria. We improve your chances through proper
        guidance and strong applications.
      </p>
    ),
  },
  {
    q: "Can AspireGate guarantee a student visa?",
    a: (
      <p>
        No. Visa decisions are made by immigration authorities. AspireGate helps you understand requirements, prepare documents, and avoid common mistakes—we do not guarantee
        visa outcomes.
      </p>
    ),
  },
  {
    q: "Can AspireGate help with scholarships?",
    a: <p>Yes. We help identify scholarships, bursaries, tuition discounts, and merit-based funding opportunities where available.</p>,
  },
  {
    q: "What documents do I need to apply?",
    a: (
      <>
        <p className="mb-3">Typical documents may include:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>International passport</li>
          <li>Academic transcripts/certificates</li>
          <li>Personal statement</li>
          <li>CV/Resume</li>
          <li>Reference letters</li>
          <li>English test results (IELTS/PTE/TOEFL if required)</li>
          <li>Proof of funds (for visa stage)</li>
        </ul>
        <p className="mt-3">Requirements vary by institution and country.</p>
      </>
    ),
  },
  {
    q: "Can you help with personal statements and SOPs?",
    a: (
      <p>
        Yes. We guide students on structuring compelling personal statements, statements of purpose, and motivation letters while ensuring authenticity.
      </p>
    ),
  },
  {
    q: "Can I apply without IELTS?",
    a: (
      <p>
        In many cases, yes. Some schools accept WAEC English, previous study in English, interviews, or internal assessments, depending on the country and institution.
      </p>
    ),
  },
  {
    q: "How do I get started?",
    a: (
      <p>
        Book a free consultation, share your academic background and goals, and AspireGate will help you understand your best next step.
      </p>
    ),
  },
];

const Contact = () => (
  <Layout>
    <section className="bg-gradient-hero py-20 md:py-24">
      <div className="container max-w-4xl text-primary-foreground text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent-glow mb-3">FAQs & Contact</span>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">Speak With AspireGate About Studying Abroad</h1>
        <p className="mt-5 text-lg text-primary-foreground/85">
          Reach out for guidance on course selection, admission support, visa preparation, and next steps.
        </p>
      </div>
    </section>

    <section className="container py-20">
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 border-border/60 shadow-card">
          <Mail className="h-6 w-6 text-accent" />
          <h3 className="mt-3 font-semibold text-primary">General Enquiries</h3>
          <a href={`mailto:${SITE_CONFIG.primaryEmail}`} className="text-sm text-muted-foreground hover:text-primary">
            {SITE_CONFIG.primaryEmail}
          </a>
        </Card>
        <Card className="p-6 border-border/60 shadow-card">
          <Phone className="h-6 w-6 text-accent" />
          <h3 className="mt-3 font-semibold text-primary">Phone</h3>
          <p className="text-sm text-muted-foreground">{SITE_CONFIG.phoneNumber}</p>
        </Card>
        <Card className="p-6 border-border/60 shadow-card">
          <MessageCircle className="h-6 w-6 text-accent" />
          <h3 className="mt-3 font-semibold text-primary">WhatsApp</h3>
          <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary">
            Chat on WhatsApp
          </a>
        </Card>
      </div>

      <div className="mt-14 max-w-2xl mx-auto">
        <SectionHeading
          eyebrow="Message"
          title="Send us a message"
          description="Tell us how we can help. We read every enquiry and reply as soon as we can."
        />
        <Card className="mt-8 p-6 md:p-8 border-border/60 shadow-card">
          <form action={FORMSPREE_ACTION} method="POST" className="space-y-5">
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div className="space-y-2">
              <Label htmlFor="contact-name">Full name</Label>
              <Input id="contact-name" name="name" type="text" required placeholder="Your name" autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input id="contact-email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-lead-type">I am reaching out as</Label>
              <select
                id="contact-lead-type"
                name="lead_type"
                required
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                )}
              >
                <option value="">Select one…</option>
                <option value="prospective_student">A prospective student planning to study abroad</option>
                <option value="parent_guardian">A parent or guardian</option>
                <option value="school_partner">A school or institutional partner</option>
                <option value="exploring_options">Exploring options / not sure yet</option>
              </select>
              <p className="text-xs text-muted-foreground">Helps us route your message to the right adviser.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">How can we help?</Label>
              <Textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="Your goals, destination interests, timeline, or questions…"
              />
            </div>
            <Button type="submit" variant="cta" size="lg" className="w-full sm:w-auto">
              Send message
            </Button>
          </form>
        </Card>
      </div>
    </section>

    <section className="bg-gradient-soft py-20">
      <div className="container">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
        <Card className="mx-auto mt-10 max-w-3xl border-border/60 shadow-card px-2 md:px-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, index) => (
              <AccordionItem key={item.q} value={`faq-${index}`} className="border-border/60">
                <AccordionTrigger className="text-left font-semibold text-primary hover:no-underline [&[data-state=open]]:text-accent py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
        <div className="mt-10 text-center">
          <Button asChild variant="cta" size="xl">
            <a href={SITE_CONFIG.calendlyUrl} target="_blank" rel="noreferrer">
              Book a Free Consultation
            </a>
          </Button>
        </div>
      </div>
    </section>
  </Layout>
);

export default Contact;

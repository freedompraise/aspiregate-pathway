import Layout from "@/components/site/Layout";
import SectionHeading from "@/components/site/SectionHeading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/siteConfig";

const faqs = [
  {
    q: "Is AspireGate free for students?",
    a: "AspireGate provides core study abroad guidance at no cost to students.",
  },
  {
    q: "Can AspireGate guarantee admission or visa?",
    a: "No. Decisions are made by universities and immigration authorities. We provide structured preparation and guidance.",
  },
  {
    q: "Can I apply without IELTS?",
    a: "In some cases yes, depending on country, institution, and programme requirements.",
  },
  {
    q: "How do I get started?",
    a: "Book a free consultation, share your background and goals, and we guide your best next step.",
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
    </section>

    <section className="bg-gradient-soft py-20">
      <div className="container">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className="grid md:grid-cols-2 gap-5">
          {faqs.map((item) => (
            <Card key={item.q} className="p-6 border-border/60 shadow-card">
              <h3 className="font-semibold text-primary">{item.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="cta" size="xl">
            <a href={SITE_CONFIG.calendlyUrl} target="_blank" rel="noreferrer">Book a Free Consultation</a>
          </Button>
        </div>
      </div>
    </section>
  </Layout>
);

export default Contact;

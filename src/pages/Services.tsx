import Layout from "@/components/site/Layout";
import SectionHeading from "@/components/site/SectionHeading";
import CTASection from "@/components/site/CTASection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  Compass,
  GraduationCap,
  FileText,
  Award,
  ShieldCheck,
  Plane,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/siteConfig";

const sections = [
  {
    icon: Calendar,
    title: "Free Study Abroad Consultation",
    lead: "Your journey starts with a conversation. We listen to your goals, academic background, country preference, budget, and timeline — then help you understand suitable options.",
    items: [
      "Your current qualification",
      "Your preferred course and country",
      "Your budget range and intended intake",
      "Your academic documents and passport status",
      "Whether you need English language testing",
      "Possible next steps",
    ],
  },
  {
    icon: Compass,
    title: "Course and Country Selection",
    lead: `The best destination for you depends on your course, budget, academic background, visa requirements, work goals, and long-term plans.`,
    items: [
      "Tuition expectations and entry requirements",
      "Available intakes and study duration",
      "Work rules for students",
      "Scholarship or discount opportunities",
      "Post-study possibilities where applicable",
      "Accommodation and living cost considerations",
    ],
  },
  {
    icon: GraduationCap,
    title: "University Admission Support",
    lead: "Once your route is clear, we help you prepare and submit your university applications.",
    items: [
      "University shortlisting and programme selection",
      "Entry requirement review",
      "Application form guidance",
      "Document checklist and submission support",
      "Application tracking and offer follow-up",
      "Offer review and next-step guidance",
    ],
  },
  {
    icon: FileText,
    title: "Document Preparation",
    lead: "Your documents tell your academic and professional story. Missing or weak documents can slow your application or reduce your chances.",
    items: [
      "International passport and academic transcripts",
      "Certificates and CV / résumé",
      "Personal statement and SOP",
      "Reference letters and motivation letter",
      "English language documents",
      "Proof of funds for the visa stage",
    ],
  },
  {
    icon: Award,
    title: "Scholarship and Funding Guidance",
    lead: "Scholarships are competitive and depend on country, university, course, intake, and applicant profile.",
    items: [
      "Identify possible scholarships and bursaries",
      "Explore tuition discounts and funding options",
      "Understand eligibility criteria",
      "We do not guarantee scholarships — only honest guidance",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Student Visa Document Guidance",
    lead: "After admission, the visa stage is one of the most important parts of your journey.",
    items: [
      "Visa document checklists",
      "Financial document and proof-of-funds preparation",
      "Credibility interview preparation",
      "Supporting evidence and timeline planning",
      "Country-specific visa requirements",
      "Visa decisions are made by immigration authorities — we help you prepare carefully",
    ],
  },
  {
    icon: Plane,
    title: "Pre-Departure Support",
    lead: "Getting admission and visa approval are not the final steps. You still need to prepare for travel, arrival, and enrolment.",
    items: [
      "Accommodation search and flight planning",
      "Travel checklist and important documents",
      "Tuition deposit and school registration",
      "Packing basics and arrival expectations",
      "Communication with the institution",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Post-Arrival Guidance",
    lead: "AspireGate continues to support students with general guidance after arrival.",
    items: [
      "Arrival checklist and school registration reminders",
      "Accommodation guidance",
      "Basic settlement advice",
      "Understanding next steps after enrolment",
      "Staying connected for future support",
    ],
  },
];

const fullProcess = [
  ["01", "Consultation", "You book a free consultation and share your goals."],
  ["02", "Profile Assessment", "We review your education, documents, budget, destination, and career goals."],
  ["03", "Route Planning", "We suggest possible countries, courses, and institutions for your profile."],
  ["04", "Document Preparation", "We guide you on what to prepare and how to organise your documents."],
  ["05", "Application Submission", "We support submissions and help you track progress."],
  ["06", "Offer Review", "When an offer arrives, we help you understand conditions and deadlines."],
  ["07", "Deposit & Enrolment", "Where required, we guide you on deposit, CAS, COE, or enrolment steps."],
  ["08", "Visa Preparation", "We help you understand documentation and preparation requirements."],
  ["09", "Travel Planning", "Pre-departure preparation, accommodation, and arrival planning."],
  ["10", "Arrival Support", "General guidance as you settle into your new academic environment."],
];

const Services = () => (
  <Layout>
    <section className="bg-gradient-hero py-20 md:py-24">
      <div className="container text-center text-primary-foreground max-w-3xl">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent-glow mb-3">Services</span>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Study Abroad Services That Guide You From Application to Arrival
        </h1>
        <p className="mt-5 text-lg text-primary-foreground/85">
          Structured study abroad support for Nigerian students and professionals applying to international universities — designed to reduce confusion, improve preparation, and help you avoid common mistakes.
        </p>
        <div className="mt-8">
          <Button asChild variant="cta" size="xl">
            <a href={SITE_CONFIG.calendlyUrl} target="_blank" rel="noreferrer">
              Book a Free Consultation <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>

    <section className="container py-20 space-y-10">
      {sections.map((s, i) => (
        <Card key={s.title} className="p-8 md:p-10 border-border/60 shadow-card">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="h-14 w-14 rounded-2xl bg-gradient-cta flex items-center justify-center mb-4">
                <s.icon className="h-7 w-7 text-accent-foreground" />
              </div>
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">Service 0{i + 1}</span>
              <h2 className="mt-2 text-2xl font-bold text-primary leading-tight">{s.title}</h2>
            </div>
            <div className="md:col-span-2">
              <p className="text-muted-foreground leading-relaxed">{s.lead}</p>
              <ul className="mt-5 grid sm:grid-cols-2 gap-2.5">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      ))}
    </section>

    <section className="bg-gradient-soft py-20">
      <div className="container">
        <SectionHeading
          eyebrow="The Full Process"
          title="How the AspireGate Process Works"
          description="A structured pathway from your first conversation to your first day on campus."
        />
        <div className="grid md:grid-cols-2 gap-4">
          {fullProcess.map(([n, t, d]) => (
            <div key={n} className="flex gap-4 p-5 rounded-2xl bg-card shadow-card border border-border/60">
              <div className="h-12 w-12 shrink-0 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
                {n}
              </div>
              <div>
                <h3 className="font-semibold text-primary">{t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <CTASection
      title="Get a Clear Plan Before You Apply"
      subtitle="Do not waste time applying blindly. Speak with AspireGate and understand your best next step."
    />
  </Layout>
);

export default Services;
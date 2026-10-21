import { Link } from "react-router-dom";
import { ApplyNowLink } from "@/components/site/ApplyNowLink";
import Layout from "@/components/site/Layout";
import SectionHeading from "@/components/site/SectionHeading";
import CTASection from "@/components/site/CTASection";
import { TestVoucherOffers } from "@/components/site/TestVoucherOffers";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/siteConfig";
import servicesHero from "@/assets/services-hero.jpg";
import {
  ArrowRight,
  Calendar,
  ClipboardCheck,
  Compass,
  GraduationCap,
  FileText,
  Award,
  ShieldCheck,
  Plane,
  HeartHandshake,
  CheckCircle2,
  Ticket,
} from "lucide-react";
const sections = [
  {
    icon: Calendar,
    title: "Free Study Abroad Consultation",
    lead: "Your journey starts when you apply. Share your goals, academic background, country preference, budget, and timeline — we review your details and get back to you with suitable options.",
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
  ["01", "Apply", "You submit the Apply Now form with your background and goals."],
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
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="container grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div className="text-primary-foreground">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-glow">
            AspireGate services
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
            Book a test. Check a Canada file. Talk to us.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-primary-foreground/85">
            Start with what you need today — a discounted English test, a Canada permit check, or full study-abroad guidance.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Link
              to={SITE_CONFIG.canadaReadinessPath}
              className="rounded-2xl border border-white/20 bg-white/10 p-4 text-left backdrop-blur transition-smooth hover:bg-white/15"
            >
              <ClipboardCheck className="h-6 w-6 text-accent-glow" />
              <p className="mt-3 font-semibold">Canada check</p>
              <p className="mt-1 text-xs text-primary-foreground/75">See what’s strong and what’s thin.</p>
            </Link>
            <a
              href="#tests"
              className="rounded-2xl border border-white/20 bg-white/10 p-4 text-left backdrop-blur transition-smooth hover:bg-white/15"
            >
              <Ticket className="h-6 w-6 text-accent-glow" />
              <p className="mt-3 font-semibold">Test vouchers</p>
              <p className="mt-1 text-xs text-primary-foreground/75">Today's price. We buy it.</p>
            </a>
            <a
              href="#guidance"
              className="rounded-2xl border border-white/20 bg-white/10 p-4 text-left backdrop-blur transition-smooth hover:bg-white/15"
            >
              <GraduationCap className="h-6 w-6 text-accent-glow" />
              <p className="mt-3 font-semibold">Full guidance</p>
              <p className="mt-1 text-xs text-primary-foreground/75">From apply to arrival.</p>
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-full bg-accent/20 blur-3xl" />
          <img
            src={servicesHero}
            alt="Student preparing a study-abroad application at a desk"
            className="relative w-full rounded-[2rem] object-cover shadow-elegant"
          />
        </div>
      </div>
    </section>

    <section id="tests" className="bg-gradient-soft py-16 md:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Pick one"
          title="Which test are you sitting?"
          description="Choose the test, leave your name and WhatsApp, pay, and we buy the voucher for you."
        />
        <TestVoucherOffers />
      </div>
    </section>

    <section id="guidance" className="container py-16 md:py-24">
      <SectionHeading
        eyebrow="Need more than a test?"
        title="We still walk with you, from application to arrival"
        description="From the first conversation to the day you land. Have a look."
      />
      <div className="relative mx-auto max-w-5xl">
        {sections.map((s, index) => (
          <article key={s.title} className="sticky top-20 mb-6 motion-reduce:static" style={{ zIndex: index + 1 }}>
            <div className="grid overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elegant md:grid-cols-[220px_minmax(0,1fr)]">
              <div className="flex min-h-[160px] items-center justify-center bg-gradient-cta">
                <s.icon className="h-14 w-14 text-accent-foreground" />
              </div>
              <div className="px-6 py-7 md:px-8 md:py-8">
                <h3 className="text-xl font-bold text-primary md:text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{s.lead}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
        <article className="sticky top-20 motion-reduce:static" style={{ zIndex: sections.length + 1 }}>
          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-elegant md:p-8">
            <h3 className="text-xl font-bold text-primary md:text-2xl">How it actually happens</h3>
            <ol className="mt-5 grid gap-3 md:grid-cols-2">
              {fullProcess.map(([n, title, desc]) => (
                <li key={n} className="flex gap-3 text-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                    {n}
                  </span>
                  <span>
                    <span className="font-semibold text-primary">{title}.</span>{" "}
                    <span className="text-muted-foreground">{desc}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </article>
      </div>
      <div className="mt-10 text-center">
        <Button asChild variant="outline">
          <ApplyNowLink>
            Talk to us about your plans <ArrowRight className="h-4 w-4" />
          </ApplyNowLink>
        </Button>
      </div>
    </section>

    <CTASection
      title="Not sure which test fits?"
      subtitle="Tell us where you're applying. We'll point you to the test that actually matches the plan."
    />
  </Layout>
);

export default Services;
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  GraduationCap,
  FileCheck,
  Plane,
  ShieldCheck,
  Globe2,
  Compass,
  FileText,
  Award,
  MessageCircle,
  Sparkles,
  Users,
  HeartHandshake,
} from "lucide-react";
import Layout from "@/components/site/Layout";
import SectionHeading from "@/components/site/SectionHeading";
import CTASection from "@/components/site/CTASection";
import heroImg from "@/assets/hero-student.jpg";

const trust = [
  { icon: HeartHandshake, title: "Free Guidance", desc: "Get started without paying unnecessary service fees." },
  { icon: FileCheck, title: "Application Support", desc: "Understand what to submit and when to submit it." },
  { icon: ShieldCheck, title: "Visa Preparation", desc: "Get help organising documents and preparing properly." },
  { icon: Plane, title: "Arrival Support", desc: "Receive practical guidance before and after you travel." },
];

const benefits = [
  { icon: Sparkles, title: "Guidance at No Cost to You", desc: "AspireGate helps students access study abroad support without paying unnecessary consultation or service fees." },
  { icon: Compass, title: "End-to-End Support", desc: "From consultation and applications to visa documents, pre-departure planning, and arrival support." },
  { icon: Users, title: "Personalised Recommendations", desc: "Options based on your academic profile, budget, career plans, destination, and timeline." },
  { icon: MessageCircle, title: "Clear Communication", desc: "Know what stage you are in, what documents are required, and what action to take next." },
  { icon: ShieldCheck, title: "Honest Guidance", desc: "We do not promise guaranteed admission or visas. We help you prepare carefully and avoid mistakes." },
  { icon: Award, title: "Support Beyond Admission", desc: "Offer acceptance, deposit steps, CAS/COE guidance, visa prep, travel and arrival." },
];

const services = [
  { icon: GraduationCap, title: "Admission Support", desc: "Choose suitable universities, prepare your application, and follow it through." },
  { icon: Globe2, title: "Course & Country Selection", desc: "Compare destinations and programmes against your profile, budget, and goals." },
  { icon: FileText, title: "Document Preparation", desc: "Transcripts, CV, references, personal statements, SOPs, and checklists." },
  { icon: ShieldCheck, title: "Visa Document Guidance", desc: "Understand required documents and how to prepare for the visa stage." },
  { icon: Plane, title: "Pre-Departure Support", desc: "Accommodation, travel preparation, school registration, and arrival planning." },
  { icon: HeartHandshake, title: "Post-Arrival Guidance", desc: "Continued support with practical next steps after you arrive." },
];

const destinations = [
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "United States", flag: "🇺🇸" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "France", flag: "🇫🇷" },
  { name: "United Arab Emirates", flag: "🇦🇪" },
];

const steps = [
  { n: "01", title: "Book a Free Consultation", desc: "Tell us about your background, goals, preferred destination, and timeline." },
  { n: "02", title: "Get Your Profile Reviewed", desc: "We assess your qualifications, documents, budget, and study goals." },
  { n: "03", title: "Choose Your Best Options", desc: "We recommend suitable countries, courses, and universities." },
  { n: "04", title: "Prepare and Submit Applications", desc: "We guide your documents, applications, and follow-up." },
  { n: "05", title: "Prepare for Admission, Visa, and Travel", desc: "We help you understand what comes next after an offer." },
];

const audiences = [
  { title: "Secondary School Leavers", desc: "Foundation, pathway, diploma, or undergraduate programmes — we help you understand your routes." },
  { title: "University Graduates", desc: "Master's, MBA, postgraduate diploma, or professional programmes." },
  { title: "Working Professionals", desc: "Upgrade your career through internationally recognised education." },
  { title: "Students With Lower Grades", desc: "Pathway, foundation, pre-master's, and flexible-entry institutions." },
  { title: "Parents and Guardians", desc: "Understand the process, documents, timelines, and key decisions." },
];

const Index = () => (
  <Layout>
    {/* HERO */}
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/30 blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary-glow/40 blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="container relative grid md:grid-cols-2 gap-12 items-center py-24 md:py-32">
        <div className="animate-fade-up text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-xs font-semibold border border-white/20">
            <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" /> Free Study Abroad Guidance
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.1]">
            Study Abroad from Nigeria — at <span className="text-accent-glow">No Cost</span> to You
          </h1>
          <p className="mt-5 text-lg text-primary-foreground/85 leading-relaxed max-w-xl">
            Honest, end-to-end guidance from your first consultation to your arrival abroad.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl" className="hover:scale-105 transition-transform">
              <a href="https://calendly.com/aspiregateconsultingservices/consultation" target="_blank" rel="noreferrer">
                Book a Free Consultation <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <a href="#whatsapp">
                <MessageCircle className="mr-1 h-4 w-4" /> Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
        <div className="relative animate-fade-up hidden md:block" style={{ animationDelay: "0.2s" }}>
          <div className="absolute -inset-4 bg-accent/30 blur-3xl rounded-full animate-pulse" />
          <img
            src={heroImg}
            alt="Nigerian student preparing to study abroad with passport and laptop"
            width={1280}
            height={1024}
            className="relative rounded-3xl shadow-elegant hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </div>
    </section>

    {/* TRUST STRIP */}
    <section className="container -mt-10 relative z-10 mb-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trust.map((t) => (
          <Card key={t.title} className="p-5 shadow-card border-border/60 hover:shadow-elegant transition-smooth">
            <t.icon className="h-7 w-7 text-accent" />
            <h3 className="mt-3 font-semibold text-primary">{t.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
          </Card>
        ))}
      </div>
    </section>

    {/* PROBLEM */}
    <section className="container py-16">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">The Challenge</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-primary leading-tight">
            The Study Abroad Process Can Feel Overwhelming
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Many students want to study abroad but get stuck because they are unsure where to begin. A wrong step can waste time, money, and opportunities. AspireGate helps you move with a clear plan.
          </p>
        </div>
        <div className="space-y-3">
          {[
            "Which country is best for my course?",
            "Which universities can accept my results?",
            "Can I apply without IELTS?",
            "What documents do I need?",
            "How much money should I prepare?",
            "What happens after I get admission?",
            "How do I avoid mistakes during the visa stage?",
          ].map((q) => (
            <div key={q} className="flex items-start gap-3 p-4 rounded-xl bg-soft-blue/50" style={{ background: "hsl(var(--soft-blue))" }}>
              <span className="h-2 w-2 mt-2 rounded-full bg-accent shrink-0" />
              <p className="text-foreground">{q}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* BENEFITS */}
    <section className="bg-gradient-soft py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Why AspireGate"
          title="Why Students Choose AspireGate"
          description="Studying abroad is a major decision. You need a guide who can help you understand what applies to your own situation."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <Card key={b.title} className="p-6 hover:-translate-y-1 hover:shadow-elegant transition-smooth border-border/60">
              <div className="h-12 w-12 rounded-xl bg-gradient-cta flex items-center justify-center mb-4">
                <b.icon className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-lg text-primary">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* AUDIENCE */}
    <section className="container py-20">
      <SectionHeading eyebrow="Who We Help" title="Who AspireGate Is For" description="Built for students and professionals who want clear guidance toward studying abroad." />
      <div className="grid md:grid-cols-3 gap-5">
        {audiences.map((a, i) => (
          <Card key={a.title} className={`p-6 border-border/60 ${i === 0 ? "md:col-span-2" : ""}`}>
            <h3 className="font-semibold text-primary text-lg">{a.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
          </Card>
        ))}
      </div>
    </section>

    {/* SERVICES PREVIEW */}
    <section className="bg-gradient-soft py-20">
      <div className="container">
        <SectionHeading
          eyebrow="What We Do"
          title="Everything You Need to Start Your Study Abroad Journey"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Card key={s.title} className="p-6 group hover:shadow-elegant transition-smooth border-border/60">
              <s.icon className="h-8 w-8 text-accent group-hover:scale-110 transition-smooth" />
              <h3 className="mt-4 font-semibold text-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="cta" size="lg">
            <Link to="/services">See Our Services <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>

    {/* DESTINATIONS PREVIEW */}
    <section className="container py-20">
      <SectionHeading
        eyebrow="Study Destinations"
        title="Where Can You Study?"
        description="The right country depends on your course, budget, academic background, visa eligibility, career goals, and long-term plans."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {destinations.map((d) => (
          <Card key={d.name} className="p-5 text-center hover:-translate-y-1 hover:shadow-elegant transition-smooth border-border/60 group">
            <div className="text-4xl mx-auto group-hover:scale-110 transition-transform" aria-hidden>{d.flag}</div>
            <p className="mt-3 font-semibold text-primary">{d.name}</p>
          </Card>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button asChild variant="outline" size="lg">
          <Link to="/destinations">Compare Study Destinations <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    </section>

    {/* PROCESS */}
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent-glow mb-3">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">From First Conversation to Arrival</h2>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute left-0 right-0 top-8 h-px bg-primary-foreground/20" />
          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-cta flex items-center justify-center text-accent-foreground font-bold text-lg mb-4 relative z-10">
                  {s.n}
                </div>
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/75">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="cta" size="lg">
            <a href="https://calendly.com/aspiregateconsultingservices/consultation" target="_blank" rel="noreferrer">
              Start Your Application Journey <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>

    <CTASection />
  </Layout>
);

export default Index;

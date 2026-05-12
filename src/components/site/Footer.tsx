import { Link } from "react-router-dom";
import { GraduationCap, Mail, MessageCircle, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/siteConfig";

const Footer = () => (
  <footer className="border-t border-border bg-muted/40 mt-16">
    <div className="container py-14 grid gap-10 md:grid-cols-4">
      <div className="md:col-span-1">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-primary">AspireGate</span>
        </Link>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Clear, honest study abroad guidance for Nigerian students and professionals — from application to arrival.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-3 text-sm">Explore</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/" className="hover:text-primary transition-smooth">Home</Link></li>
          <li><Link to="/services" className="hover:text-primary transition-smooth">Services & Process</Link></li>
          <li><Link to="/destinations" className="hover:text-primary transition-smooth">Study Destinations</Link></li>
          <li><Link to="/blog" className="hover:text-primary transition-smooth">Blog</Link></li>
          <li><Link to="/contact" className="hover:text-primary transition-smooth">FAQs & Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-3 text-sm">Destinations</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>United Kingdom · Canada</li>
          <li>USA · Ireland · Germany</li>
          <li>Australia · France · UAE</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-3 text-sm">Contact</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> <a href={`mailto:${SITE_CONFIG.primaryEmail}`} className="hover:text-primary">{SITE_CONFIG.primaryEmail}</a></li>
          <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> <a href={`mailto:${SITE_CONFIG.consultationEmail}`} className="hover:text-primary">{SITE_CONFIG.consultationEmail}</a></li>
          <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> <a href={`mailto:${SITE_CONFIG.partnershipEmail}`} className="hover:text-primary">{SITE_CONFIG.partnershipEmail}</a></li>
          <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> {SITE_CONFIG.phoneNumber}</li>
          <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-primary">Chat on WhatsApp</a></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border">
      <div className="container py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AspireGate Services Limited. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
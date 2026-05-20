import { Link, NavLink } from "react-router-dom";
import { ApplyNowLink } from "@/components/site/ApplyNowLink";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { SITE_CONFIG } from "@/lib/siteConfig";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/destinations", label: "Study Destinations" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "FAQs & Contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-card">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-primary">AspireGate</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-smooth hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:block">
          <div className="flex items-center gap-2">
            <Button asChild variant="cta" size="sm">
              <ApplyNowLink>Apply Now</ApplyNowLink>
            </Button>
          </div>
        </div>
        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col gap-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium py-2 ${isActive ? "text-primary" : "text-muted-foreground"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button asChild variant="cta" onClick={() => setOpen(false)}>
              <ApplyNowLink>Apply Now</ApplyNowLink>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
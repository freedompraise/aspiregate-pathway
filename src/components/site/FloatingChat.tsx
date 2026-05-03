import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const FloatingChat = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.6;
      if (scrolled > threshold) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-scale-in flex items-end gap-2">
      <div className="hidden sm:block bg-card text-card-foreground rounded-2xl shadow-elegant px-4 py-3 max-w-xs border border-border/60 animate-fade-in">
        <p className="text-sm font-semibold text-primary">Need quick guidance?</p>
        <p className="text-xs text-muted-foreground">Chat with an advisor on WhatsApp.</p>
      </div>
      <div className="relative">
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background border border-border shadow-card flex items-center justify-center text-muted-foreground hover:text-primary"
        >
          <X className="h-3 w-3" />
        </button>
        <a
          href="https://wa.me/2348000000000"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="h-14 w-14 rounded-full bg-gradient-cta text-accent-foreground shadow-glow flex items-center justify-center hover:scale-110 transition-transform"
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent/60 animate-ping opacity-60" />
          <MessageCircle className="h-7 w-7 relative" />
        </a>
      </div>
    </div>
  );
};

export default FloatingChat;
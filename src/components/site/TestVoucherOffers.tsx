import { useEffect, useId, useState, type FormEvent } from "react";
import { ArrowRight, Clock3, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ENGLISH_TESTS, formatNgn, formatUsd, type EnglishTest } from "@/data/englishTests";
import { getUsdToNgnRate, usdToNaira, usdToNgnKobo } from "@/lib/exchangeRate";
import { FORMS, submitForm } from "@/lib/formspree";
import { SITE_CONFIG } from "@/lib/siteConfig";

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY?.trim() ?? "";

const PAYMENT_ISSUES = [
  "My card was declined",
  "The payment page did not open",
  "I can't pay with a card",
  "The amount looks wrong",
  "Something else",
] as const;

type PaystackResponse = { reference?: string };

type PaystackPopApi = {
  setup: (options: Record<string, unknown>) => { openIframe: () => void };
};

declare global {
  interface Window {
    PaystackPop?: PaystackPopApi;
  }
}

function loadPaystack(): Promise<PaystackPopApi> {
  if (window.PaystackPop) return Promise.resolve(window.PaystackPop);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://js.paystack.co/v1/inline.js"]');
    const finish = () => {
      if (window.PaystackPop) resolve(window.PaystackPop);
      else reject(new Error("Paystack did not load"));
    };
    if (existing) {
      existing.addEventListener("load", finish, { once: true });
      existing.addEventListener("error", () => reject(new Error("Paystack failed to load")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = finish;
    script.onerror = () => reject(new Error("Paystack failed to load"));
    document.body.appendChild(script);
  });
}

function paymentHelpWhatsappUrl(input: {
  testTitle: string;
  name: string;
  email: string;
  phone: string;
  priceUsd: number;
  naira: number | null;
  issue: string;
  note: string;
  bookingNotes: string;
}): string {
  const { bank, accountName, accountNumber } = SITE_CONFIG.voucherAccount;
  const lines = [
    "Hi AspireGate, I need help paying for a test voucher.",
    "",
    `Test: ${input.testTitle}`,
    `Price: ${formatUsd(input.priceUsd)}`,
  ];
  if (input.naira != null) lines.push(`Transfer amount: ${formatNgn(input.naira)}`);
  lines.push(
    `Name: ${input.name.trim()}`,
    `Email: ${input.email.trim()}`,
    `My WhatsApp: ${input.phone.trim()}`,
    `What happened: ${input.issue}`,
  );
  if (input.bookingNotes.trim()) lines.push(`Where and when: ${input.bookingNotes.trim()}`);
  if (input.note.trim()) lines.push(`Note: ${input.note.trim()}`);
  lines.push("", `I'll transfer to ${accountName}, ${bank}, ${accountNumber}.`);
  return `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function TransferDetails({ amountUsd }: { amountUsd: number }) {
  const { bank, accountName, accountNumber } = SITE_CONFIG.voucherAccount;
  const [copied, setCopied] = useState(false);

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-muted/40 p-4 text-sm">
      <p className="font-medium text-foreground">Pay {formatUsd(amountUsd)} into this account</p>
      <dl className="mt-3 space-y-2">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Account name</dt>
          <dd className="text-right font-medium text-foreground">{accountName}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Bank</dt>
          <dd className="text-right font-medium text-foreground">{bank}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Account number</dt>
          <dd className="font-medium tracking-wide text-foreground">{accountNumber}</dd>
        </div>
      </dl>
      <Button type="button" variant="outline" size="sm" className="mt-3" onClick={() => void copyAccount()}>
        {copied ? "Copied" : "Copy account number"}
      </Button>
    </div>
  );
}

function contactError(name: string, mail: string, phone: string): string | null {
  if (name.length < 3) return "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return "Enter a valid email address.";
  if (phone.replace(/\D/g, "").length < 10) return "Enter a WhatsApp number with your country code.";
  return null;
}

function TestPhoto({ test }: { test: EnglishTest }) {
  return (
    <div className="relative min-h-[220px] overflow-hidden md:min-h-[280px]">
      <img src={test.image} alt={test.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r" />
      <p className="absolute bottom-4 left-5 text-sm font-semibold text-white">{test.vendor}</p>
    </div>
  );
}

function ContactFields({
  formId,
  fullName,
  email,
  whatsapp,
  bookingNotes,
  onName,
  onEmail,
  onWhatsapp,
  onBookingNotes,
}: {
  formId: string;
  fullName: string;
  email: string;
  whatsapp: string;
  bookingNotes: string;
  onName: (value: string) => void;
  onEmail: (value: string) => void;
  onWhatsapp: (value: string) => void;
  onBookingNotes: (value: string) => void;
}) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-name`}>Full name</Label>
        <Input
          id={`${formId}-name`}
          value={fullName}
          onChange={(event) => onName(event.target.value)}
          autoComplete="name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-email`}>Email</Label>
        <Input
          id={`${formId}-email`}
          type="email"
          value={email}
          onChange={(event) => onEmail(event.target.value)}
          autoComplete="email"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-whatsapp`}>WhatsApp number</Label>
        <Input
          id={`${formId}-whatsapp`}
          type="tel"
          value={whatsapp}
          onChange={(event) => onWhatsapp(event.target.value)}
          autoComplete="tel"
          placeholder="+234 800 000 0000"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-notes`}>City or month you’d like to sit the test (optional)</Label>
        <Textarea
          id={`${formId}-notes`}
          value={bookingNotes}
          onChange={(event) => onBookingNotes(event.target.value)}
          placeholder="For example, Lagos in November"
          rows={2}
        />
      </div>
    </>
  );
}

export function TestVoucherOffers() {
  const formId = useId();
  const [selected, setSelected] = useState<EnglishTest | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paidReference, setPaidReference] = useState<string | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [rateError, setRateError] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpIssue, setHelpIssue] = useState("");
  const [helpNote, setHelpNote] = useState("");
  const [helpSent, setHelpSent] = useState(false);
  const [bookingNotes, setBookingNotes] = useState("");

  useEffect(() => {
    let cancelled = false;
    getUsdToNgnRate()
      .then((next) => {
        if (!cancelled) setRate(next);
      })
      .catch(() => {
        if (!cancelled) setRateError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const openTest = (test: EnglishTest) => {
    setSelected(test);
    setError(null);
    setPaidReference(null);
    setHelpOpen(false);
    setHelpSent(false);
    setHelpIssue("");
    setHelpNote("");
    setBookingNotes("");
  };

  const closeDialog = (open: boolean) => {
    if (open) return;
    setSelected(null);
    setSubmitting(false);
    setError(null);
    setPaidReference(null);
    setHelpOpen(false);
    setHelpSent(false);
    setHelpIssue("");
    setHelpNote("");
    setBookingNotes("");
  };

  const nairaFor = (test: EnglishTest) => (rate == null ? null : usdToNaira(test.priceUSD, rate));

  const handlePay = async (event: FormEvent) => {
    event.preventDefault();
    if (!selected) return;
    setError(null);

    const name = fullName.trim();
    const mail = email.trim();
    const phone = whatsapp.trim();
    const invalid = contactError(name, mail, phone);
    if (invalid) {
      setError(invalid);
      return;
    }
    if (!PAYSTACK_PUBLIC_KEY) {
      setError("Card payment isn't available right now. Send your details and we'll finish payment with you.");
      setHelpOpen(true);
      return;
    }

    setSubmitting(true);
    let ngnPerUsd: number;
    try {
      ngnPerUsd = await getUsdToNgnRate();
      setRate(ngnPerUsd);
      setRateError(false);
    } catch {
      setSubmitting(false);
      setRateError(true);
      setError("Card payment isn’t available right now. Send your details and we’ll finish payment with you.");
      return;
    }

    const amountKobo = usdToNgnKobo(selected.priceUSD, ngnPerUsd);
    const amountNaira = amountKobo / 100;
    try {
      const paystack = await loadPaystack();
      const reference = `AG-${selected.id}-${Date.now()}`;
      const handler = paystack.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: mail,
        amount: amountKobo,
        currency: "NGN",
        ref: reference,
        metadata: {
          custom_fields: [
            { display_name: "Full name", variable_name: "full_name", value: name },
            { display_name: "WhatsApp", variable_name: "whatsapp", value: phone },
            { display_name: "Test", variable_name: "test", value: selected.title },
            { display_name: "Amount USD", variable_name: "amount_usd", value: String(selected.priceUSD) },
            { display_name: "Amount NGN", variable_name: "amount_ngn", value: String(amountNaira) },
            { display_name: "Booking notes", variable_name: "booking_notes", value: bookingNotes.trim() },
          ],
        },
        callback: (response: PaystackResponse) => {
          const paidRef = response.reference || reference;
          setPaidReference(paidRef);
          setSubmitting(false);
          void submitForm(FORMS.test, {
            form_type: "test_voucher",
            payload_version: 1,
            _subject: `Test voucher paid — ${selected.title}`,
            test: selected.title,
            test_id: selected.id,
            amount_usd: selected.priceUSD,
            amount_ngn: amountNaira,
            currency: "NGN",
            full_name: name,
            email: mail,
            whatsapp: phone,
            booking_notes: bookingNotes.trim(),
            preferred_city: "",
            preferred_month: "",
            id_document_name: "",
            paystack_reference: paidRef,
          });
        },
        onClose: () => {
          setSubmitting(false);
        },
      });
      handler.openIframe();
    } catch {
      setSubmitting(false);
      setError("Payment could not start. Check your connection, or tell us and we'll take payment another way.");
    }
  };

  const helpWhatsappUrl = selected
    ? paymentHelpWhatsappUrl({
        testTitle: selected.title,
        name: fullName,
        email,
        phone: whatsapp,
        priceUsd: selected.priceUSD,
        naira: nairaFor(selected),
        issue: helpIssue || "I need another way to pay",
        note: helpNote,
        bookingNotes,
      })
    : SITE_CONFIG.whatsappUrl;

  const handleHelp = (event: FormEvent) => {
    event.preventDefault();
    if (!selected) return;
    setError(null);

    const name = fullName.trim();
    const mail = email.trim();
    const phone = whatsapp.trim();
    const invalid = contactError(name, mail, phone);
    if (invalid) {
      setError(invalid);
      return;
    }
    if (!helpIssue) {
      setError("Choose what went wrong.");
      return;
    }

    window.open(helpWhatsappUrl, "_blank", "noopener,noreferrer");
    setHelpSent(true);
  };

  return (
    <>
      <div className="mx-auto grid max-w-6xl gap-6">
        {ENGLISH_TESTS.map((test) => (
            <article key={test.id}>
              <div className="grid overflow-hidden rounded-3xl border border-border/60 bg-white shadow-card md:grid-cols-[minmax(240px,38%)_minmax(0,1fr)]">
                <TestPhoto test={test} />
                <div className="flex flex-col justify-center px-6 py-8 sm:px-8 md:px-10 md:py-12">
                  <span
                    className="w-fit rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: test.accent }}
                  >
                    Today's price
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider" style={{ color: test.accent }}>
                    {test.vendor} · {test.category}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold leading-tight text-primary md:text-3xl">{test.title}</h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">{test.description}</p>
                  <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Pay only</p>
                      <p className="text-4xl font-bold tracking-tight" style={{ color: test.accent }}>
                        {formatUsd(test.priceUSD)}
                      </p>
                    </div>
                    <Button type="button" variant="cta" size="lg" className="min-w-44" onClick={() => openTest(test)}>
                      Book this test
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-6 grid gap-2 text-sm text-foreground/80 sm:grid-cols-2">
                    <p className="flex items-start gap-2">
                      <Clock3 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: test.accent }} />
                      This price is for a short window. Grab it while it lasts.
                    </p>
                    <p className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: test.accent }} />
                      Pay us, we buy the voucher, and we send it to you.
                    </p>
                  </div>
                </div>
              </div>
              </article>
        ))}
      </div>

      <Dialog open={Boolean(selected)} onOpenChange={closeDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          {selected && paidReference && (
            <>
              <DialogHeader>
                <DialogTitle>You're in</DialogTitle>
                <DialogDescription>
                  We'll buy your {selected.title} voucher and message you on WhatsApp and email with the next step.
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                Payment reference: <span className="font-semibold text-foreground">{paidReference}</span>
              </p>
              <Button type="button" variant="cta" onClick={() => closeDialog(false)}>
                Done
              </Button>
            </>
          )}

          {selected && !paidReference && helpSent && (
            <>
              <DialogHeader>
                <DialogTitle>Send the WhatsApp message</DialogTitle>
                <DialogDescription>
                  WhatsApp should be open with your {selected.title} details. Send that message, and transfer the amount below
                  so we can match it.
                </DialogDescription>
              </DialogHeader>
              <TransferDetails amountUsd={selected.priceUSD} />
              <Button asChild variant="outline" className="w-full">
                <a href={helpWhatsappUrl} target="_blank" rel="noopener noreferrer">
                  Open WhatsApp again
                </a>
              </Button>
              <Button type="button" variant="cta" onClick={() => closeDialog(false)}>
                Done
              </Button>
            </>
          )}

          {selected && !paidReference && !helpSent && helpOpen && (
            <>
              <DialogHeader>
                <DialogTitle>Let's sort the payment</DialogTitle>
                <DialogDescription>
                  Transfer the amount for {selected.title}, then send your details on WhatsApp so we can match the payment.
                </DialogDescription>
              </DialogHeader>
              <TransferDetails amountUsd={selected.priceUSD} />
              <form className="space-y-4" onSubmit={handleHelp}>
                <ContactFields
                  formId={`${formId}-help`}
                  fullName={fullName}
                  email={email}
                  whatsapp={whatsapp}
                  bookingNotes={bookingNotes}
                  onName={setFullName}
                  onEmail={setEmail}
                  onWhatsapp={setWhatsapp}
                  onBookingNotes={setBookingNotes}
                />
                <div className="space-y-2">
                  <Label htmlFor={`${formId}-issue`}>What went wrong?</Label>
                  <select
                    id={`${formId}-issue`}
                    value={helpIssue}
                    onChange={(event) => setHelpIssue(event.target.value)}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Choose one</option>
                    {PAYMENT_ISSUES.map((issue) => (
                      <option key={issue} value={issue}>
                        {issue}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${formId}-note`}>Anything else? Optional</Label>
                  <Textarea
                    id={`${formId}-note`}
                    value={helpNote}
                    onChange={(event) => setHelpNote(event.target.value)}
                    placeholder="Anything that helps us match your payment."
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" variant="cta" className="w-full">
                  Send on WhatsApp
                </Button>
                <button
                  type="button"
                  className="w-full text-sm font-medium text-primary underline-offset-4 hover:underline"
                  onClick={() => {
                    setHelpOpen(false);
                    setError(null);
                  }}
                >
                  Back to payment
                </button>
              </form>
            </>
          )}

          {selected && !paidReference && !helpSent && !helpOpen && (
            <>
              <DialogHeader>
                <DialogTitle>Let's book your {selected.title}</DialogTitle>
              
              </DialogHeader>
              <form className="space-y-4" onSubmit={handlePay}>
                <ContactFields
                  formId={formId}
                  fullName={fullName}
                  email={email}
                  whatsapp={whatsapp}
                  bookingNotes={bookingNotes}
                  onName={setFullName}
                  onEmail={setEmail}
                  onWhatsapp={setWhatsapp}
                  onBookingNotes={setBookingNotes}
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                {rate == null && rateError ? (
                  <Button
                    type="button"
                    variant="cta"
                    className="w-full"
                    onClick={() => {
                      setHelpOpen(true);
                      setError(null);
                    }}
                  >
                    Tell us and we'll sort payment
                  </Button>
                ) : (
                  <Button type="submit" variant="cta" className="w-full" disabled={submitting}>
                    {submitting ? "Opening payment…" : `Pay ${formatUsd(selected.priceUSD)}`}
                  </Button>
                )}
                <button
                  type="button"
                  className="w-full text-sm font-medium text-primary underline-offset-4 hover:underline"
                  onClick={() => {
                    setHelpOpen(true);
                    setError(null);
                  }}
                >
                  Having trouble paying?
                </button>
                <p className="text-xs text-muted-foreground">
                  Once payment goes through, we buy the voucher and send the details to you.
                </p>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

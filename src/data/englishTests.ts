export type EnglishTest = {
  id: string;
  title: string;
  vendor: string;
  category: "Tests";
  description: string;
  priceUSD: number;
  available: boolean;
  image: string;
  imageAlt: string;
  /** Bright accent for the card, as an HSL-friendly hex. */
  accent: string;
};

export const ENGLISH_TESTS: EnglishTest[] = [
  {
    id: "pte-core",
    title: "Pearson Test of English (PTE) Core",
    vendor: "Pearson",
    category: "Tests",
    description:
      "A computer test schools and visa teams already recognise. Quick to sit, widely accepted, and priced better than the usual fee.",
    priceUSD: 152.5,
    available: true,
    image: "/tests/pte-core.jpg",
    imageAlt: "Student working on a laptop during a computer-based English test",
    accent: "#0b6bcb",
  },
  {
    id: "pte-ukvi",
    title: "Pearson Test of English (PTE) UKVI",
    vendor: "Pearson",
    category: "Tests",
    description:
      "UK plans? This is the Pearson test made for UK visa applications. Same trusted format, a price worth grabbing now.",
    priceUSD: 152.5,
    available: true,
    image: "/tests/pte-ukvi.jpg",
    imageAlt: "Laptop on a desk ready for an online English exam",
    accent: "#5b21b6",
  },
  {
    id: "pte-academic",
    title: "Pearson Test of English (PTE) Academic",
    vendor: "Pearson",
    category: "Tests",
    description:
      "The PTE universities ask for when you apply. Results come back fast, and this voucher price will not last.",
    priceUSD: 152.5,
    available: true,
    image: "/tests/pte-academic.jpg",
    imageAlt: "Person writing notes while preparing for an English exam",
    accent: "#0f766e",
  },
  {
    id: "oxford-ellt",
    title: "Oxford ELLT",
    vendor: "Oxford",
    category: "Tests",
    description:
      "Oxford’s online English test for university offers — listening, reading, language, and speaking, from home.",
    priceUSD: 130.3,
    available: true,
    image: "/tests/oxford-ellt.jpg",
    imageAlt: "Library shelves in a university reading room",
    accent: "#1e3a8a",
  },
  {
    id: "toefl-ibt",
    title: "TOEFL iBT",
    vendor: "ETS",
    category: "Tests",
    description:
      "The English test 11,000+ schools already know by name. If TOEFL is on your checklist, this is the moment to book it.",
    priceUSD: 163.88,
    available: true,
    image: "/tests/toefl-ibt.jpg",
    imageAlt: "Students studying together in a bright classroom",
    accent: "#be123c",
  },
  {
    id: "duolingo-det",
    title: "Duolingo English Test (DET)",
    vendor: "Duolingo",
    category: "Tests",
    description:
      "Take it on your phone, get a score fast, and send it to 4,500+ schools. The easiest test on this page — and the kindest price.",
    priceUSD: 60,
    available: true,
    image: "/tests/duolingo-det.jpg",
    imageAlt: "Hands holding a phone, the way the Duolingo English Test is taken",
    accent: "#15803d",
  },
  {
    id: "ets-gre",
    title: "ETS GRE General Test",
    vendor: "ETS",
    category: "Tests",
    description:
      "Master’s, MBA, or law school ahead? The GRE is still the test they ask for. Lock in this price before you start revising.",
    priceUSD: 240.5,
    available: true,
    image: "/tests/ets-gre.jpg",
    imageAlt: "Graduates celebrating after a university programme",
    accent: "#1d4ed8",
  },
  {
    id: "celpip-general",
    title: "CELPIP General",
    vendor: "Paragon Testing",
    category: "Tests",
    description:
      "Built for life in Canada — work, study, everyday English. IRCC accepts it. If Canada is the plan, book this while the price is kind.",
    priceUSD: 178.34,
    available: true,
    image: "/tests/celpip-general.jpg",
    imageAlt: "Toronto skyline, a reminder of study and work routes in Canada",
    accent: "#c2410c",
  },
];

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function formatNgn(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `₦${formatted}`;
}

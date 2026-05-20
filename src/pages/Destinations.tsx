import { useCallback, useMemo, useRef, useState } from "react";
import Layout from "@/components/site/Layout";
import SectionHeading from "@/components/site/SectionHeading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ChevronLeft, ChevronRight, X, Scale, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  GOAL_SECTIONS,
  PRIORITY_OPTIONS,
  TAG_LABELS,
  destinationBySlug,
  destinations,
  getDestinationsBySlugs,
  getQuizRecommendations,
  getShortlistForPriority,
  type Destination,
  type PriorityId,
  type QuizAnswers,
} from "@/data/destinationsData";
import { ApplyNowLink } from "@/components/site/ApplyNowLink";
import { SITE_CONFIG } from "@/lib/siteConfig"; 

const initialQuiz: QuizAnswers = {
  budget: null,
  pr: null,
  field: null,
  language: null,
  fastMasters: null,
};

function quizComplete(a: QuizAnswers): boolean {
  return !!(a.budget && a.pr && a.field && a.language && a.fastMasters);
}

const Destinations = () => {
  const priorityRef = useRef<HTMLElement>(null);
  const shortlistRef = useRef<HTMLElement>(null);
  const fullComparisonRef = useRef<HTMLElement>(null);

  const [shortlistMode, setShortlistMode] = useState<"priority" | "goal" | null>(null);
  const [priorityId, setPriorityId] = useState<PriorityId | null>(null);
  const [goalSlugs, setGoalSlugs] = useState<string[] | null>(null);
  const [hiddenShortlistSlugs, setHiddenShortlistSlugs] = useState<Set<string>>(new Set());

  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [compareMessage, setCompareMessage] = useState<string | null>(null);
  const [compareOpen, setCompareOpen] = useState(false);

  const [accordionOpen, setAccordionOpen] = useState<string[]>([]);

  const [quizStep, setQuizStep] = useState(0);
  const [quiz, setQuiz] = useState<QuizAnswers>(initialQuiz);
  const [quizFinished, setQuizFinished] = useState(false);

  const scrollTo = (el: HTMLElement | null) => {
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const shortlistDestinations = useMemo(() => {
    let list: Destination[] = [];
    if (shortlistMode === "priority" && priorityId) {
      list = getShortlistForPriority(priorityId);
    } else if (shortlistMode === "goal" && goalSlugs?.length) {
      list = getDestinationsBySlugs(goalSlugs);
    }
    return list.filter((d) => !hiddenShortlistSlugs.has(d.slug));
  }, [shortlistMode, priorityId, goalSlugs, hiddenShortlistSlugs]);

  const compareDestinations = useMemo(() => getDestinationsBySlugs(compareSlugs), [compareSlugs]);

  const quizResults = useMemo(() => {
    if (!quizFinished || !quizComplete(quiz)) return null;
    return getQuizRecommendations(quiz);
  }, [quiz, quizFinished]);

  const openAccordion = useCallback((slug: string) => {
    setAccordionOpen((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
    requestAnimationFrame(() => {
      document.getElementById(`destination-panel-${slug}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }, []);

  const selectPriority = (id: PriorityId) => {
    setShortlistMode("priority");
    setPriorityId(id);
    setGoalSlugs(null);
    setHiddenShortlistSlugs(new Set());
    setTimeout(() => scrollTo(shortlistRef.current), 100);
  };

  const applyGoalShortlist = (slugs: string[]) => {
    setShortlistMode("goal");
    setGoalSlugs(slugs);
    setPriorityId(null);
    setHiddenShortlistSlugs(new Set());
    setTimeout(() => scrollTo(shortlistRef.current), 100);
  };

  const removeFromShortlistDisplay = (slug: string) => {
    setHiddenShortlistSlugs((prev) => new Set(prev).add(slug));
  };

  const addToCompare = (slug: string) => {
    setCompareMessage(null);
    if (compareSlugs.includes(slug)) {
      setCompareSlugs((s) => s.filter((x) => x !== slug));
      return;
    }
    if (compareSlugs.length >= 3) {
      setCompareMessage("You can compare up to 3 destinations at a time.");
      return;
    }
    setCompareSlugs((s) => [...s, slug]);
  };

  const removeFromCompare = (slug: string) => {
    setCompareSlugs((s) => s.filter((x) => x !== slug));
    setCompareMessage(null);
  };

  const clearCompare = () => {
    setCompareSlugs([]);
    setCompareMessage(null);
  };

  const resetQuizFlow = () => {
    setQuiz(initialQuiz);
    setQuizStep(0);
    setQuizFinished(false);
  };

  const updateQuiz = <K extends keyof QuizAnswers>(key: K, value: NonNullable<QuizAnswers[K]>) => {
    setQuiz((q) => ({ ...q, [key]: value }));
    if (quizFinished) setQuizFinished(false);
  };

  const quizQuestionMeta = [
    {
      key: "budget" as const,
      title: "What is your budget?",
      options: [
        { value: "low" as const, label: "Low" },
        { value: "medium" as const, label: "Medium" },
        { value: "high" as const, label: "High" },
      ],
    },
    {
      key: "pr" as const,
      title: "Is permanent residence important?",
      options: [
        { value: "yes" as const, label: "Yes" },
        { value: "no" as const, label: "No" },
      ],
    },
    {
      key: "field" as const,
      title: "What do you want to study?",
      options: [
        { value: "stem" as const, label: "STEM" },
        { value: "business" as const, label: "Business" },
        { value: "healthcare" as const, label: "Healthcare" },
        { value: "arts" as const, label: "Arts" },
        { value: "general" as const, label: "General" },
      ],
    },
    {
      key: "language" as const,
      title: "Do you prefer English-only destinations?",
      options: [
        { value: "yes" as const, label: "Yes" },
        { value: "no" as const, label: "No" },
      ],
    },
    {
      key: "fastMasters" as const,
      title: "Do you want a fast master’s degree?",
      options: [
        { value: "yes" as const, label: "Yes" },
        { value: "no" as const, label: "No" },
      ],
    },
  ];

  const currentQ = quizQuestionMeta[quizStep];
  const currentValue = currentQ ? quiz[currentQ.key] : null;
  const progressValue = quizFinished ? 100 : ((quizStep + 1) / 5) * 100;

  const goNext = () => {
    if (!currentQ || !quiz[currentQ.key]) return;
    if (quizStep < 4) {
      setQuizStep((s) => s + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const goBack = () => {
    setCompareMessage(null);
    if (quizStep > 0) setQuizStep((s) => s - 1);
  };

  return (
    <Layout>
      <div className={cn(compareSlugs.length > 0 && "pb-24 md:pb-28")}>
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container max-w-3xl text-center text-primary-foreground">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-glow">AspireGate Services Limited</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">Compare the Best Countries to Study Abroad</h1>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
            Compare tuition, post-study work opportunities, settlement outlook, and long-term career potential — then
            build a confident shortlist that matches your goals.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button
              type="button"
              variant="hero"
              size="xl"
              onClick={() => scrollTo(priorityRef.current)}
            >
              Find My Best-Fit Countries
            </Button>
            <Button
              type="button"
              variant="heroOutline"
              size="xl"
              className="border-white/80"
              onClick={() => scrollTo(fullComparisonRef.current)}
            >
              Compare All Destinations
            </Button>
          </div>
        </div>
      </section>

      <section ref={priorityRef} id="priority-selector" className="container py-14 md:py-18" aria-labelledby="priority-heading">
        <SectionHeading
          id="priority-heading"
          align="left"
          eyebrow="Step 1"
          title="What matters most to you right now?"
          description="Choose one focus. We will suggest a shortlist you can refine — outcomes always depend on your profile, funding, and current immigration rules."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRIORITY_OPTIONS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => selectPriority(p.id)}
              className={cn(
                "rounded-xl border p-5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                shortlistMode === "priority" && priorityId === p.id
                  ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary/30"
                  : "border-border/80 bg-card shadow-card hover:border-primary/40",
              )}
            >
              <span className="font-semibold text-primary">{p.label}</span>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.helper}</p>
            </button>
          ))}
        </div>
      </section>

      <section ref={shortlistRef} id="smart-shortlist" className="bg-muted/25 py-14 md:py-18" aria-labelledby="shortlist-heading">
        <div className="container">
          <SectionHeading
            id="shortlist-heading"
            align="left"
            eyebrow="Your shortlist"
            title="Smart shortlist"
            description="These destinations reflect the focus or quick goal you chose. Remove any that do not feel right, then add picks to your comparison tray."
          />

          {!shortlistMode && (
            <Card className="mt-8 border-dashed p-8 text-center text-muted-foreground">
              Select a priority above to generate a personalised shortlist of three to four countries.
            </Card>
          )}

          {shortlistMode && shortlistDestinations.length === 0 && (
            <Card className="mt-8 border-border/60 p-8 text-center shadow-card">
              <p className="font-medium text-foreground">
                No destination perfectly matches every preference. Try adjusting your priorities or book a free
                application review.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button type="button" variant="outline" onClick={() => scrollTo(priorityRef.current)}>
                  Change priority
                </Button>
                <Button asChild variant="cta">
                  <ApplyNowLink>
                    Apply Now
                  </ApplyNowLink>
                </Button>
              </div>
            </Card>
          )}

          {shortlistMode && shortlistDestinations.length > 0 && (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {shortlistDestinations.map((d) => (
                <Card key={d.slug} className="flex flex-col border-border/60 p-6 shadow-card">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-semibold text-primary">{d.name}</h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                      aria-label={`Remove ${d.name} from shortlist`}
                      onClick={() => removeFromShortlistDisplay(d.slug)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-2 text-sm font-medium text-foreground">Best for</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.bestFor}</p>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div>
                      <dt className="font-medium text-foreground">Post-study work</dt>
                      <dd className="text-muted-foreground">{d.postStudyStrength}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">Settlement outlook</dt>
                      <dd className="text-muted-foreground">{d.settlementOutlook}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 rounded-md bg-amber-500/10 px-3 py-2 text-xs leading-relaxed text-amber-950 dark:text-amber-100">
                    <span className="font-semibold">Key caution: </span>
                    {d.keyCaution}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => openAccordion(d.slug)}>
                      View Details
                    </Button>
                    <Button type="button" variant="secondary" size="sm" onClick={() => addToCompare(d.slug)}>
                      {compareSlugs.includes(d.slug) ? "Remove from Compare" : "Add to Compare"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {shortlistMode && shortlistDestinations.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild variant="cta" size="lg">
                <ApplyNowLink>
                  Apply Now
                </ApplyNowLink>
              </Button>
            </div>
          )}
        </div>
      </section>

      {compareSlugs.length > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md supports-[backdrop-filter]:bg-background/85"
          role="region"
          aria-label="Comparison tray"
        >
          <div className="container flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
              <Scale className="hidden h-5 w-5 shrink-0 text-primary sm:block" aria-hidden />
              <span className="text-sm font-medium text-foreground">Compare:</span>
              {compareDestinations.map((d) => (
                <Badge key={d.slug} variant="secondary" className="gap-1 pr-1 font-normal">
                  {d.name}
                  <button
                    type="button"
                    className="rounded-full p-0.5 hover:bg-muted"
                    aria-label={`Remove ${d.name}`}
                    onClick={() => removeFromCompare(d.slug)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" onClick={clearCompare}>
                Clear All
              </Button>
              <Button type="button" variant="cta" size="sm" onClick={() => setCompareOpen(true)}>
                Compare Now
              </Button>
            </div>
          </div>
          {compareMessage && (
            <p className="container pt-1 text-center text-sm text-destructive" role="alert">
              {compareMessage}
            </p>
          )}
        </div>
      )}

      <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
        <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Side-by-side comparison</DialogTitle>
            <DialogDescription>
              Trade-offs depend on your profile, programme, and rules at the time you apply. Use this view to decide what
              to explore further with an adviser.
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[140px]">Factor</TableHead>
                  {compareDestinations.map((d) => (
                    <TableHead key={d.slug} className="min-w-[180px]">
                      <div className="flex items-center justify-between gap-2">
                        <span>{d.name}</span>
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFromCompare(d.slug)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { label: "Tuition level", get: (d: Destination) => d.tuitionLevel },
                  { label: "Post-study work", get: (d: Destination) => d.postStudyStrength },
                  { label: "Settlement outlook", get: (d: Destination) => d.settlementOutlook },
                  { label: "Language", get: (d: Destination) => d.languageConsiderations },
                  { label: "Best for", get: (d: Destination) => d.bestFor },
                  { label: "Main caution", get: (d: Destination) => d.keyCaution },
                ].map((row) => (
                  <TableRow key={row.label}>
                    <TableCell className="align-top font-medium">{row.label}</TableCell>
                    {compareDestinations.map((d) => (
                      <TableCell key={d.slug} className="align-top text-sm text-muted-foreground">
                        {row.get(d)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild variant="cta">
              <ApplyNowLink>
                Apply Now
              </ApplyNowLink>
            </Button>
            <Button type="button" variant="outline" onClick={() => setCompareOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <section ref={fullComparisonRef} id="full-comparison" className="container py-14 md:py-18" aria-labelledby="full-heading">
        <SectionHeading
          id="full-heading"
          align="left"
          eyebrow="Full directory"
          title="Compare all destinations"
          description="Every country below includes tuition context, post-study options, settlement outlook, and candid notes on when it may not be the right fit."
        />

        <div className="mt-8 hidden overflow-hidden rounded-xl border border-border/60 bg-card shadow-card lg:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Destination</TableHead>
                <TableHead>Tuition (typical)</TableHead>
                <TableHead>Post-study work</TableHead>
                <TableHead>Settlement</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Best for</TableHead>
                <TableHead>Main caution</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {destinations.map((d) => (
                <TableRow key={d.slug}>
                  <TableCell className="font-semibold text-primary">{d.name}</TableCell>
                  <TableCell className="max-w-[200px] text-sm text-muted-foreground">{d.tuitionLevel}</TableCell>
                  <TableCell className="max-w-[200px] text-sm text-muted-foreground">{d.postStudyStrength}</TableCell>
                  <TableCell className="max-w-[180px] text-sm text-muted-foreground">{d.settlementOutlook}</TableCell>
                  <TableCell className="max-w-[200px] text-sm text-muted-foreground">{d.languageConsiderations}</TableCell>
                  <TableCell className="max-w-[220px] text-sm text-muted-foreground">{d.bestFor}</TableCell>
                  <TableCell className="max-w-[220px] text-sm text-muted-foreground">{d.keyCaution}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col gap-1 sm:flex-row sm:justify-end">
                      <Button type="button" variant="outline" size="sm" onClick={() => openAccordion(d.slug)}>
                        View Details
                      </Button>
                      <Button type="button" variant="secondary" size="sm" onClick={() => addToCompare(d.slug)}>
                        {compareSlugs.includes(d.slug) ? "Remove" : "Add"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 space-y-4 lg:hidden">
          {destinations.map((d) => (
            <Card key={d.slug} className="border-border/60 p-5 shadow-card">
              <h3 className="font-semibold text-primary">{d.name}</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div>
                  <dt className="font-medium">Tuition</dt>
                  <dd className="text-muted-foreground">{d.tuitionLevel}</dd>
                </div>
                <div>
                  <dt className="font-medium">Post-study work</dt>
                  <dd className="text-muted-foreground">{d.postStudyStrength}</dd>
                </div>
                <div>
                  <dt className="font-medium">Settlement</dt>
                  <dd className="text-muted-foreground">{d.settlementOutlook}</dd>
                </div>
                <div>
                  <dt className="font-medium">Language</dt>
                  <dd className="text-muted-foreground">{d.languageConsiderations}</dd>
                </div>
                <div>
                  <dt className="font-medium">Best for</dt>
                  <dd className="text-muted-foreground">{d.bestFor}</dd>
                </div>
                <div>
                  <dt className="font-medium">Main caution</dt>
                  <dd className="text-muted-foreground">{d.keyCaution}</dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => openAccordion(d.slug)}>
                  View Details
                </Button>
                <Button type="button" variant="secondary" size="sm" onClick={() => addToCompare(d.slug)}>
                  {compareSlugs.includes(d.slug) ? "Remove from Compare" : "Add to Compare"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild variant="cta" size="lg">
            <ApplyNowLink>
              Apply Now
            </ApplyNowLink>
          </Button>
        </div>
      </section>

      <section className="bg-gradient-soft py-14 md:py-18" id="destination-details" aria-labelledby="details-heading">
        <div className="container max-w-4xl">
          <SectionHeading
            id="details-heading"
            eyebrow="Deep dive"
            title="Destination details"
            description="Expand any country for strengths, shortfalls, post-study options, settlement context, and when it may not suit you. This is general guidance only — not legal advice."
          />

          <Accordion
            type="multiple"
            className="mt-10 rounded-xl border border-border/60 bg-card px-2 shadow-card sm:px-4"
            value={accordionOpen}
            onValueChange={setAccordionOpen}
          >
            {destinations.map((d) => (
              <AccordionItem key={d.slug} value={d.slug} id={`destination-panel-${d.slug}`} className="border-border/60">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-primary">{d.name}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <DestinationDetailPanel destination={d} onAddCompare={() => addToCompare(d.slug)} inCompare={compareSlugs.includes(d.slug)} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="container py-14 md:py-18" aria-labelledby="goals-heading">
        <SectionHeading
          id="goals-heading"
          eyebrow="Quick paths"
          title="Goal-based recommendations"
          description="Jump straight to a shortlist shaped around a common ambition. You can still adjust your picks afterwards."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {GOAL_SECTIONS.map((goal) => (
            <Card key={goal.title} className="flex flex-col gap-4 border-border/60 p-6 shadow-card">
              <div>
                <h3 className="text-lg font-semibold text-primary">{goal.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{goal.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {goal.slugs.map((slug) => {
                  const d = destinationBySlug(slug);
                  if (!d) return null;
                  return (
                    <Badge key={slug} variant="outline" className="font-normal">
                      {d.name}
                    </Badge>
                  );
                })}
              </div>
              <Button type="button" variant="secondary" className="w-full sm:w-auto" onClick={() => applyGoalShortlist(goal.slugs)}>
                View this shortlist
              </Button>
            </Card>
          ))}
        </div>
      </section>
{/* 
      <section className="bg-muted/30 py-14 md:py-18" aria-labelledby="quiz-heading">
        <div className="container max-w-lg">
          <SectionHeading
            id="quiz-heading"
            eyebrow="Optional"
            title="Destination matcher quiz"
            description="Still deciding? Answer five questions. We will suggest up to three countries to compare — not a guarantee of admission, visas, or PR."
          />

          <Card className="mt-8 border-border/60 p-6 shadow-card sm:p-8">
            {!quizFinished && currentQ && (
              <>
                <div className="mb-6">
                  <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                    <span>
                      Question {quizStep + 1} of 5
                    </span>
                    <span>{Math.round(progressValue)}%</span>
                  </div>
                  <Progress value={progressValue} className="h-2" />
                </div>
                <p className="text-lg font-semibold text-primary">{currentQ.title}</p>
                <RadioGroup
                  className="mt-4 grid gap-3"
                  value={currentValue ?? undefined}
                  onValueChange={(v) => updateQuiz(currentQ.key, v as NonNullable<QuizAnswers[typeof currentQ.key]>)}
                >
                  {currentQ.options.map((opt) => (
                    <Label
                      key={String(opt.value)}
                      htmlFor={`q-${currentQ.key}-${opt.value}`}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm transition-colors hover:bg-muted/40",
                        currentValue === opt.value && "border-primary ring-1 ring-primary/30",
                      )}
                    >
                      <RadioGroupItem id={`q-${currentQ.key}-${opt.value}`} value={opt.value} />
                      {opt.label}
                    </Label>
                  ))}
                </RadioGroup>
                <div className="mt-8 flex justify-between gap-3">
                  <Button type="button" variant="outline" onClick={goBack} disabled={quizStep === 0}>
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <Button type="button" variant="cta" onClick={goNext} disabled={!currentValue}>
                    {quizStep === 4 ? (
                      <>
                        See results
                        <Sparkles className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}

            {quizFinished && quizResults && (
              <div className="space-y-6">
                <p className="text-lg font-semibold text-primary">Your top matches to compare</p>
                <ul className="space-y-4">
                  {quizResults.map(({ destination, reason }) => (
                    <li key={destination.slug}>
                      <Card className="border-border/60 p-4 shadow-sm">
                        <p className="font-semibold text-primary">{destination.name}</p>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          <span className="font-medium text-foreground">Why it may match: </span>
                          {reason}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          <span className="font-medium text-foreground">Key caution: </span>
                          {destination.keyCaution}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button type="button" variant="outline" size="sm" onClick={() => addToCompare(destination.slug)}>
                            {compareSlugs.includes(destination.slug) ? "Remove from Compare" : "Add to Compare"}
                          </Button>
                          <Button asChild variant="secondary" size="sm">
                              <ApplyNowLink>
                              Apply Now
                            </ApplyNowLink>
                          </Button>
                        </div>
                      </Card>
                    </li>
                  ))}
                </ul>
                <p className="text-center text-sm text-muted-foreground leading-relaxed">
                  Several destinations may be suitable depending on your academic profile, funding, and long-term goals.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button asChild variant="cta">
                    <ApplyNowLink>
                      Apply Now
                    </ApplyNowLink>
                  </Button>
                  <Button type="button" variant="outline" onClick={resetQuizFlow}>
                    Retake quiz
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section> */}

      <section className="container py-14 md:py-28">
        <Card className="border-border/60 bg-card p-8 text-center shadow-card md:p-12">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">Ready for guidance tailored to your file?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Bring your transcripts, budget, and timeline. AspireGate Services Limited helps you stress-test this shortlist
            against real visa and admissions requirements — without overpromising outcomes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="cta" size="xl">
              <ApplyNowLink>
                Apply Now <ArrowRight className="h-4 w-4" />
              </ApplyNowLink>
            </Button>
            <Button asChild variant="outline" size="xl">
                <ApplyNowLink>
                Apply Now
              </ApplyNowLink>
            </Button>
          </div>
        </Card>
      </section>
      </div>
    </Layout>
  );
};

function DestinationDetailPanel({
  destination: d,
  onAddCompare,
  inCompare,
}: {
  destination: Destination;
  onAddCompare: () => void;
  inCompare: boolean;
}) {
  return (
    <div className="space-y-6 pb-2">
      <div>
        <h4 className="text-sm font-semibold text-primary">Why this country may be a strong option</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.whyStrongOption}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {d.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="font-normal">
            {TAG_LABELS[tag]}
          </Badge>
        ))}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-primary">Strengths</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {d.strengths.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-primary">Shortfalls</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {d.shortfalls.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-semibold text-primary">Post-study work opportunities</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.postStudyOptions}</p>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-primary">Settlement outlook</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.settlementExplanation}</p>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-primary">Best-fit student profile</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.bestFitStudentProfile}</p>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-primary">When this destination may not be ideal</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.whenNotIdeal}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" size="sm" onClick={onAddCompare}>
          {inCompare ? "Remove from Compare" : "Add to Compare"}
        </Button>
        <Button asChild variant="cta" size="sm">
          <ApplyNowLink>
            Apply Now
          </ApplyNowLink>
        </Button>
      </div>
    </div>
  );
}

export default Destinations;

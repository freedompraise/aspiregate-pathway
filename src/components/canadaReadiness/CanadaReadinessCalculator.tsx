import { useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, CircleAlert, Minus } from "lucide-react";
import { ApplyNowLink } from "@/components/site/ApplyNowLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { SearchableCombobox } from "@/components/ui/searchable-combobox";
import { Choice } from "@/components/canadaReadiness/Choice";
import { assessCanadaReadiness, computeFinancial } from "@/data/canadaReadiness/engine";
import {
  FAMILY_SIZE_OPTIONS,
  PROGRAMME_LEVEL_OPTIONS,
  PROVINCE_OPTIONS,
  hasLongStudyGap,
  isOutOfScope,
  programmeNeedsPal,
  visibleQuestionIds,
  type QuestionId,
} from "@/data/canadaReadiness/flow";
import { DISCLAIMER } from "@/data/canadaReadiness/rules";
import {
  CATEGORY_MAX,
  type AssessmentResult,
  type CanadaAnswers,
  type CategoryKey,
} from "@/data/canadaReadiness/types";
import { FORMS, submitForm } from "@/lib/formspree";

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  financial: "Money",
  study_purpose: "Study purpose",
  academic: "Academic readiness",
  temporary_intent: "Ties outside Canada",
  compliance: "School and paperwork",
  immigration_history: "Immigration history",
  documentation: "Documents",
};

const PROMPTS: Record<QuestionId, { title: string; hint?: string }> = {
  applyFrom: { title: "Where will you apply from?" },
  province: { title: "Which province will you study in?" },
  schoolStatus: { title: "How far along is the school offer?" },
  programmeLevel: { title: "What are you applying to study?" },
  academicFit: { title: "How does this programme sit next to what you have already done?" },
  languageStatus: { title: "Have you met the English or French requirement?" },
  studyWhy: { title: "Why this programme?" },
  lastQualification: { title: "When did you last finish a qualification?" },
  money: { title: "What funds can you show, in Canadian dollars?" },
  fundsTrail: { title: "How clearly can you show where that money comes from?" },
  planAfterStudies: { title: "What is the plan after you finish?" },
  historyIssues: { title: "Anything in your immigration or legal history to flag?" },
  papersReady: { title: "How ready are the supporting papers?" },
};

function cad(amount: number): string {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(amount);
}

function isFilled(id: QuestionId, answers: CanadaAnswers): boolean {
  if (id === "programmeLevel") {
    if (!answers.programmeLevel || !answers.institutionType) return false;
    if (
      (answers.programmeLevel === "master" || answers.programmeLevel === "doctorate") &&
      !answers.degreeGranting
    ) {
      return false;
    }
    if (programmeNeedsPal(answers) && !answers.palStatus) return false;
    return true;
  }
  if (id === "lastQualification") {
    if (!answers.lastQualification) return false;
    if (hasLongStudyGap(answers) && !answers.gapDocumented) return false;
    return true;
  }
  if (id === "money") {
    return answers.familySize !== undefined && answers.firstYearTuition !== undefined && answers.personalSavings !== undefined;
  }
  return Boolean(answers[id]);
}

export function CanadaReadinessCalculator() {
  const [answers, setAnswers] = useState<CanadaAnswers>({ familySize: 1, fundingSources: [], economicTies: [] });
  const [cursor, setCursor] = useState(0);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lead, setLead] = useState({ name: "", email: "", whatsapp: "", country: "Nigeria" });
  const [leadSent, setLeadSent] = useState(false);
  const [leadBusy, setLeadBusy] = useState(false);

  const ids = visibleQuestionIds(answers);
  const questionId = ids[Math.min(cursor, ids.length - 1)];
  const prompt = PROMPTS[questionId];
  const liveFinance = useMemo(() => computeFinancial(answers), [answers]);

  const finish = (nextAnswers: CanadaAnswers) => {
    setResult(assessCanadaReadiness(nextAnswers));
  };

  const advance = (nextAnswers: CanadaAnswers) => {
    if (isOutOfScope(nextAnswers) || cursor >= visibleQuestionIds(nextAnswers).length - 1) {
      finish(nextAnswers);
      return;
    }
    setCursor((current) => current + 1);
  };

  const patch = (partial: Partial<CanadaAnswers>, autoAdvance = false) => {
    setError(null);
    const next = { ...answers, ...partial };
    setAnswers(next);
    if (autoAdvance) {
      window.setTimeout(() => advance(next), 180);
    }
  };

  const goNext = () => {
    if (!isFilled(questionId, answers)) {
      setError("Pick an option to continue.");
      return;
    }
    advance(answers);
  };

  const goBack = () => {
    setError(null);
    if (result) {
      setResult(null);
      return;
    }
    setCursor((current) => Math.max(0, current - 1));
  };

  const sendLead = async (event: FormEvent) => {
    event.preventDefault();
    if (!result) return;
    setLeadBusy(true);
    try {
      await submitForm(FORMS.consult, {
        form_type: "canada_readiness",
        lead_source: "Canada Readiness Calculator",
        _subject: `Canada readiness — ${result.statusLabel}`,
        name: lead.name,
        email: lead.email,
        whatsapp: lead.whatsapp,
        country_of_residence: lead.country,
        readiness_score: result.score,
        readiness_band: result.status,
        programme: answers.programmeLevel,
        risk_flags: result.flags.map((item) => item.code).join(", "),
        required_funds: result.financial?.requiredFunds,
        available_funds: result.financial?.availableFunds,
      });
      setLeadSent(true);
    } finally {
      setLeadBusy(false);
    }
  };

  const progress = result ? 100 : ((cursor + 1) / Math.max(ids.length, 1)) * 100;
  const needsContinue = ["programmeLevel", "lastQualification", "money"].includes(questionId);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <Progress value={progress} className="h-2" />
        <p className="mt-2 text-xs text-muted-foreground">
          {result ? "Your result" : `Question ${cursor + 1} of ${ids.length}`}
        </p>
      </div>

      <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-card md:p-8">
        {result ? (
          <ResultPanel
            result={result}
            lead={lead}
            setLead={setLead}
            leadSent={leadSent}
            leadBusy={leadBusy}
            onLead={sendLead}
            onRestart={() => {
              setAnswers({ familySize: 1, fundingSources: [], economicTies: [] });
              setResult(null);
              setLeadSent(false);
              setCursor(0);
            }}
          />
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold leading-tight text-primary md:text-3xl">{prompt.title}</h2>
              {prompt.hint && <p className="mt-2 text-sm text-muted-foreground">{prompt.hint}</p>}
            </div>

            {questionId === "applyFrom" && (
              <Choice
                legend="Choose one"
                value={answers.applyFrom}
                onChange={(value) => patch({ applyFrom: value as CanadaAnswers["applyFrom"] }, true)}
                options={[
                  { value: "outside", label: "Outside Canada" },
                  { value: "inside", label: "Already in Canada" },
                  { value: "port", label: "At a port of entry" },
                  { value: "unsure", label: "Not sure yet" },
                ]}
              />
            )}
            {questionId === "province" && (
              <SearchableCombobox
                id="province"
                options={PROVINCE_OPTIONS}
                value={answers.province ?? ""}
                onValueChange={(value) => patch({ province: value }, true)}
                placeholder="Search a province…"
                searchPlaceholder="Type a province"
              />
            )}
            {questionId === "schoolStatus" && (
              <Choice
                legend="Choose one"
                value={answers.schoolStatus}
                onChange={(value) => patch({ schoolStatus: value as CanadaAnswers["schoolStatus"] }, true)}
                options={[
                  { value: "loa", label: "I have a letter of acceptance" },
                  { value: "offer", label: "I have an offer, waiting on the letter" },
                  { value: "chosen", label: "I’ve chosen a school, no offer yet" },
                  { value: "none", label: "I haven’t chosen a school yet" },
                ]}
              />
            )}
            {questionId === "programmeLevel" && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="programme-level">Programme level</Label>
                  <SearchableCombobox
                    id="programme-level"
                    options={PROGRAMME_LEVEL_OPTIONS}
                    value={answers.programmeLevel ?? ""}
                    onValueChange={(value) => patch({ programmeLevel: value as CanadaAnswers["programmeLevel"] })}
                    placeholder="Search a level…"
                  />
                </div>
                <Choice
                  legend="Is the school public or private?"
                  value={answers.institutionType}
                  onChange={(value) => patch({ institutionType: value as CanadaAnswers["institutionType"] })}
                  options={[
                    { value: "public", label: "Public" },
                    { value: "private", label: "Private" },
                    { value: "unsure", label: "Not sure" },
                  ]}
                  columns={2}
                />
                {(answers.programmeLevel === "master" || answers.programmeLevel === "doctorate") && (
                  <Choice
                    legend="Is it a full master’s or doctorate degree?"
                    value={answers.degreeGranting}
                    onChange={(value) => patch({ degreeGranting: value as CanadaAnswers["degreeGranting"] })}
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                      { value: "unsure", label: "Not sure" },
                    ]}
                    columns={2}
                  />
                )}
                {programmeNeedsPal(answers) && (
                  <Choice
                    legend="Do you have a provincial attestation letter, if this programme needs one?"
                    value={answers.palStatus}
                    onChange={(value) => patch({ palStatus: value as CanadaAnswers["palStatus"] })}
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "Not yet" },
                      { value: "unsure", label: "I don’t think I need one" },
                    ]}
                  />
                )}
              </div>
            )}
            {questionId === "academicFit" && (
              <Choice
                legend="Choose one"
                value={answers.academicFit}
                onChange={(value) => patch({ academicFit: value as CanadaAnswers["academicFit"] }, true)}
                options={[
                  { value: "higher", label: "A clear step up in the same field" },
                  { value: "related", label: "Same level, more specialised" },
                  { value: "career_change", label: "A planned career change" },
                  { value: "lower_reason", label: "A step down, with a reason" },
                  { value: "lower_none", label: "A step down, without a clear reason" },
                  { value: "unrelated", label: "Not related to what I’ve done" },
                ]}
              />
            )}
            {questionId === "languageStatus" && (
              <Choice
                legend="Choose one"
                value={answers.languageStatus}
                onChange={(value) => patch({ languageStatus: value as CanadaAnswers["languageStatus"] }, true)}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "exempted", label: "The school exempted me" },
                  { value: "pending", label: "Test still pending" },
                  { value: "no", label: "Not yet" },
                  { value: "unsure", label: "Not sure" },
                ]}
              />
            )}
            {questionId === "studyWhy" && (
              <Choice
                legend="Choose one"
                value={answers.studyWhy}
                onChange={(value) => patch({ studyWhy: value as CanadaAnswers["studyWhy"] }, true)}
                options={[
                  { value: "career", label: "A defined career step" },
                  { value: "change", label: "A planned career change" },
                  { value: "general", label: "A stronger qualification" },
                  { value: "live_work", label: "Mainly to live or work in Canada" },
                  { value: "undecided", label: "Still deciding" },
                ]}
              />
            )}
            {questionId === "lastQualification" && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="last-qualification">Month and year</Label>
                  <Input
                    id="last-qualification"
                    type="month"
                    value={answers.lastQualification ?? ""}
                    onChange={(event) => patch({ lastQualification: event.target.value })}
                  />
                </div>
                {hasLongStudyGap(answers) && (
                  <Choice
                    legend="Can you document what you have been doing since then?"
                    value={answers.gapDocumented}
                    onChange={(value) => patch({ gapDocumented: value as CanadaAnswers["gapDocumented"] })}
                    options={[
                      { value: "fully", label: "Yes, fully" },
                      { value: "partly", label: "Partly" },
                      { value: "no", label: "Not yet" },
                    ]}
                    columns={2}
                  />
                )}
              </div>
            )}
            {questionId === "money" && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="family-size">Including you, how many people are travelling?</Label>
                  <SearchableCombobox
                    id="family-size"
                    options={FAMILY_SIZE_OPTIONS}
                    value={String(Math.min(answers.familySize || 1, 10))}
                    onValueChange={(value) => patch({ familySize: Number(value) })}
                    placeholder="Select…"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tuition">First-year tuition</Label>
                    <Input
                      id="tuition"
                      type="number"
                      min={0}
                      inputMode="numeric"
                      value={answers.firstYearTuition ?? ""}
                      onChange={(event) =>
                        patch({ firstYearTuition: event.target.value === "" ? undefined : Number(event.target.value) })
                      }
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paid">Already paid</Label>
                    <Input
                      id="paid"
                      type="number"
                      min={0}
                      inputMode="numeric"
                      value={answers.tuitionPaid ?? ""}
                      onChange={(event) =>
                        patch({ tuitionPaid: event.target.value === "" ? undefined : Number(event.target.value) })
                      }
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="available">Savings, sponsor, scholarship, loan</Label>
                    <Input
                      id="available"
                      type="number"
                      min={0}
                      inputMode="numeric"
                      value={answers.personalSavings ?? ""}
                      onChange={(event) =>
                        patch({ personalSavings: event.target.value === "" ? undefined : Number(event.target.value) })
                      }
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transport">Travel money</Label>
                    <Input
                      id="transport"
                      type="number"
                      min={0}
                      inputMode="numeric"
                      value={answers.transport ?? ""}
                      onChange={(event) =>
                        patch({ transport: event.target.value === "" ? undefined : Number(event.target.value) })
                      }
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="rounded-2xl bg-primary p-4 text-sm text-primary-foreground">
                  <p>
                    You need about {cad(liveFinance.requiredFunds)}. You can show {cad(liveFinance.availableFunds)}.
                  </p>
                </div>
              </div>
            )}
            {questionId === "fundsTrail" && (
              <Choice
                legend="Choose one"
                value={answers.fundsTrail}
                onChange={(value) => patch({ fundsTrail: value as CanadaAnswers["fundsTrail"] }, true)}
                options={[
                  { value: "solid", label: "Clear trail, sitting in accounts for months" },
                  { value: "mostly", label: "Mostly documented, with a few recent transfers I can explain" },
                  { value: "thin", label: "Some of it is documented; some arrived recently" },
                  { value: "unexplained", label: "I cannot show a clear trail yet" },
                ]}
              />
            )}
            {questionId === "planAfterStudies" && (
              <Choice
                legend="Choose one"
                value={answers.planAfterStudies}
                onChange={(value) => patch({ planAfterStudies: value as CanadaAnswers["planAfterStudies"] }, true)}
                options={[
                  { value: "return_specific", label: "Return for a specific career plan" },
                  { value: "return_developing", label: "Return, with the plan still forming" },
                  { value: "unsure", label: "Unsure" },
                  { value: "relocate", label: "The main plan is to stay in Canada" },
                ]}
              />
            )}
            {questionId === "historyIssues" && (
              <Choice
                legend="Choose one"
                value={answers.historyIssues}
                onChange={(value) => patch({ historyIssues: value as CanadaAnswers["historyIssues"] }, true)}
                options={[
                  { value: "clean", label: "Nothing to flag" },
                  { value: "refusal_fixed", label: "A previous Canadian refusal, and I’ve answered those reasons" },
                  { value: "refusal_open", label: "A previous Canadian refusal that still needs answering" },
                  { value: "other_country", label: "A visa refusal from another country that still needs explaining" },
                  { value: "legal", label: "A legal or immigration issue I should discuss privately" },
                ]}
              />
            )}
            {questionId === "papersReady" && (
              <Choice
                legend="Choose one"
                value={answers.papersReady}
                onChange={(value) => patch({ papersReady: value as CanadaAnswers["papersReady"] }, true)}
                options={[
                  { value: "ready", label: "Passport valid, papers ready, dates and figures match" },
                  { value: "almost", label: "Close — a few documents or small mismatches still to fix" },
                  { value: "not_ready", label: "Not ready yet" },
                ]}
              />
            )}

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button type="button" variant="ghost" onClick={goBack} disabled={cursor === 0}>
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              {needsContinue && (
                <Button type="button" variant="cta" onClick={goNext}>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultPanel({
  result,
  lead,
  setLead,
  leadSent,
  leadBusy,
  onLead,
  onRestart,
}: {
  result: AssessmentResult;
  lead: { name: string; email: string; whatsapp: string; country: string };
  setLead: (lead: { name: string; email: string; whatsapp: string; country: string }) => void;
  leadSent: boolean;
  leadBusy: boolean;
  onLead: (event: FormEvent) => void;
  onRestart: () => void;
}) {
  const outOfScope = result.status === "out_of_scope";

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">Your Canada study permit readiness</p>
        {outOfScope ? (
          <>
            <p className="mt-2 text-3xl font-bold text-primary">{result.statusLabel}</p>
            {result.outOfScopeMessage && (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{result.outOfScopeMessage}</p>
            )}
          </>
        ) : (
          <>
            <p className="mt-2 text-5xl font-bold text-primary">{result.score} / 100</p>
            <p className="mt-1 text-lg font-semibold text-primary">{result.statusLabel}</p>
          </>
        )}
      </div>

      {result.coreRequirements.length > 0 && (
        <div>
          <h3 className="font-semibold text-primary">Core requirements</h3>
          <ul className="mt-3 space-y-2">
            {result.coreRequirements.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-sm">
                {item.met ? <CheckCircle2 className="h-4 w-4 text-accent" /> : <Minus className="h-4 w-4 text-destructive" />}
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!outOfScope && (
        <div>
          <h3 className="font-semibold text-primary">How the score breaks down</h3>
          <ul className="mt-3 space-y-3">
            {(Object.keys(CATEGORY_MAX) as CategoryKey[]).map((key) => {
              const value = result.categoryScores[key];
              const max = CATEGORY_MAX[key];
              return (
                <li key={key}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{CATEGORY_LABELS[key]}</span>
                    <span className="text-muted-foreground">
                      {Math.round(value)} / {max}
                    </span>
                  </div>
                  <Progress value={(value / max) * 100} className="h-2" />
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {result.financial && (
        <div className="rounded-2xl bg-muted/50 p-5">
          <h3 className="font-semibold text-primary">Money</h3>
          <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Required</dt>
              <dd className="font-medium">{cad(result.financial.requiredFunds)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Available</dt>
              <dd className="font-medium">{cad(result.financial.availableFunds)}</dd>
            </div>
          </dl>
        </div>
      )}

      {result.recommendations.length > 0 && (
        <div>
          <h3 className="font-semibold text-primary">What to strengthen</h3>
          <ul className="mt-3 space-y-2">
            {result.recommendations.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-2xl border border-border/60 p-5">
        <h3 className="font-semibold text-primary">Want us to read this with you?</h3>
        <p className="mt-2 text-sm text-muted-foreground">Leave a name and WhatsApp. We’ll keep this as a profile and follow up.</p>
        {leadSent ? (
          <p className="mt-4 text-sm font-medium text-primary">Received. We will be in touch.</p>
        ) : (
          <form className="mt-4 space-y-3" onSubmit={onLead}>
            <Input required placeholder="Full name" value={lead.name} onChange={(event) => setLead({ ...lead, name: event.target.value })} />
            <Input required type="email" placeholder="Email" value={lead.email} onChange={(event) => setLead({ ...lead, email: event.target.value })} />
            <Input required type="tel" placeholder="WhatsApp number" value={lead.whatsapp} onChange={(event) => setLead({ ...lead, whatsapp: event.target.value })} />
            <Input required placeholder="Country of residence" value={lead.country} onChange={(event) => setLead({ ...lead, country: event.target.value })} />
            <Button type="submit" variant="cta" className="w-full" disabled={leadBusy}>
              {leadBusy ? "Sending…" : "Book a free profile review"}
            </Button>
          </form>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <ApplyNowLink>Open a full consultation</ApplyNowLink>
        </Button>
        <Button type="button" variant="ghost" onClick={onRestart}>
          Start again
        </Button>
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">{DISCLAIMER}</p>
    </div>
  );
}

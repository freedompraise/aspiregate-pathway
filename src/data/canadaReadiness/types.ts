export const CALCULATOR_VERSION = "1.0";
export const RULES_VERSION = "IRCC-2026-09";

export type AssessmentStatus =
  | "strong_readiness"
  | "good_readiness"
  | "needs_strengthening"
  | "significant_gaps"
  | "not_ready"
  | "professional_review_required"
  | "out_of_scope";

export type FlagSeverity = "critical" | "review_required" | "high" | "medium" | "info";

export type RiskFlag = {
  code: string;
  severity: FlagSeverity;
};

export type CategoryKey =
  | "financial"
  | "study_purpose"
  | "academic"
  | "temporary_intent"
  | "compliance"
  | "immigration_history"
  | "documentation";

export type CategoryScores = Record<CategoryKey, number>;

export type FinancialBreakdown = {
  currency: "CAD";
  familySize: number;
  livingRequirement: number;
  remainingTuition: number;
  transportation: number;
  requiredFunds: number;
  availableFunds: number;
  difference: number;
  coverageRatio: number;
};

export type AssessmentResult = {
  score: number;
  status: AssessmentStatus;
  statusLabel: string;
  categoryScores: CategoryScores;
  flags: RiskFlag[];
  recommendations: string[];
  financial: FinancialBreakdown | null;
  coreRequirements: { label: string; met: boolean }[];
  outOfScopeMessage?: string;
  rulesVersion: string;
  calculatorVersion: string;
};

export type ProgrammeLevel =
  | "secondary"
  | "certificate"
  | "diploma"
  | "advanced_diploma"
  | "bachelor"
  | "pg_cert"
  | "master"
  | "doctorate"
  | "other";

export type CanadaAnswers = {
  applyFrom?: "outside" | "inside" | "port" | "unsure";
  province?: string;
  institutionSelected?: "yes" | "no";
  institutionName?: string;
  dliStatus?: "yes" | "no" | "unknown";
  loaStatus?: "yes" | "no" | "pending";
  programmeLevel?: ProgrammeLevel;
  institutionType?: "public" | "private" | "unsure";
  degreeGranting?: "yes" | "no" | "unsure";
  palStatus?: "yes" | "no" | "unsure";
  documentsReviewed?: "yes" | "partly" | "no";
  highestQualification?: string;
  academicProgression?: "higher" | "same_specialised" | "lower_reason" | "lower_none" | "unsure";
  programmeRelation?: "direct" | "partly" | "logical" | "unrelated";
  languageStatus?: "yes" | "exempted" | "pending" | "no" | "unsure";
  offerConditions?: "met" | "some" | "major";
  workRelation?: "direct" | "partly" | "none" | "unrelated";
  studyWhy?: "career" | "change" | "general" | "live_work" | "undecided";
  canadaWhy?: "academic" | "academic_career" | "family" | "immigration" | "none";
  institutionWhy?: "relevance" | "cost" | "offer" | "none";
  afterStudy?: "home_role" | "general" | "unsure" | "remain";
  lastQualification?: string;
  gapActivity?: string;
  gapDocumented?: "fully" | "partly" | "no";
  familySize?: number;
  firstYearTuition?: number;
  tuitionPaid?: number;
  transport?: number;
  personalSavings?: number;
  sponsorFunds?: number;
  scholarship?: number;
  educationLoan?: number;
  fundingSources?: string[];
  fundsDocumented?: "fully" | "mostly" | "some" | "none";
  financialHistory?: "6plus" | "3to5" | "1to2" | "under1";
  largeDeposits?: "no" | "yes_full" | "yes_part" | "yes_none";
  programmeOver12Months?: "yes" | "no";
  futureFunding?: "documented" | "limited" | "no";
  economicActivity?:
    | "full_time"
    | "business"
    | "part_time"
    | "student"
    | "graduate"
    | "unemployed"
    | "other";
  returnCareer?: "documented" | "general" | "possibly" | "none";
  personalTies?: "strong" | "some" | "limited" | "none";
  economicTies?: string[];
  planAfterStudies?: "return_specific" | "return_developing" | "unsure" | "relocate";
  previousRefusal?: "no" | "yes";
  refusalAddressed?: "yes" | "partly" | "no" | "unknown";
  otherRefusals?: "no" | "explained" | "unexplained";
  statusBreach?: "no" | "yes" | "unsure";
  misrepresentation?: "no" | "yes" | "unsure";
  criminalHistory?: "no" | "yes" | "private";
  medicalExam?: "completed" | "required_open" | "not_required" | "unsure";
  passportValid?: "yes" | "no" | "soon";
  documentsReady?: "most" | "several" | "few";
  documentConsistency?: "yes" | "minor" | "significant" | "unsure";
  schoolStatus?: "loa" | "offer" | "chosen" | "none";
  academicFit?: "higher" | "related" | "career_change" | "lower_reason" | "lower_none" | "unrelated";
  fundsTrail?: "solid" | "mostly" | "thin" | "unexplained";
  historyIssues?: "clean" | "refusal_fixed" | "refusal_open" | "other_country" | "legal";
  papersReady?: "ready" | "almost" | "not_ready";
};

export const CATEGORY_MAX: CategoryScores = {
  financial: 25,
  study_purpose: 20,
  academic: 15,
  temporary_intent: 15,
  compliance: 15,
  immigration_history: 5,
  documentation: 5,
};

export const STATUS_LABELS: Record<AssessmentStatus, string> = {
  strong_readiness: "Strong readiness",
  good_readiness: "Good readiness",
  needs_strengthening: "Needs strengthening",
  significant_gaps: "Significant gaps",
  not_ready: "Not ready to apply yet",
  professional_review_required: "Needs a professional review",
  out_of_scope: "Talk to us about this one",
};

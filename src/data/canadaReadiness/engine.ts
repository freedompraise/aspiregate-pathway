import {
  FLAG_TO_RECOMMENDATION,
  LIVING_FUNDS_BY_FAMILY_SIZE,
  LIVING_FUNDS_EACH_ADDITIONAL,
  RECOMMENDATIONS,
  SEVERITY_RANK,
} from "./rules";
import {
  CALCULATOR_VERSION,
  CATEGORY_MAX,
  RULES_VERSION,
  STATUS_LABELS,
  type AssessmentResult,
  type AssessmentStatus,
  type CanadaAnswers,
  type CategoryScores,
  type FinancialBreakdown,
  type FlagSeverity,
  type RiskFlag,
} from "./types";

export function livingFundsForFamilySize(familySize: number): number {
  const size = Math.max(1, Math.min(20, Math.floor(familySize) || 1));
  if (size <= 7) return LIVING_FUNDS_BY_FAMILY_SIZE[size - 1];
  return LIVING_FUNDS_BY_FAMILY_SIZE[6] + (size - 7) * LIVING_FUNDS_EACH_ADDITIONAL;
}

export function money(value: number | undefined): number {
  if (typeof value !== "number" || Number.isNaN(value) || value < 0) return 0;
  return value;
}

export function palRequired(answers: CanadaAnswers): boolean {
  const masters = answers.programmeLevel === "master" || answers.programmeLevel === "doctorate";
  return !(masters && answers.institutionType === "public" && answers.degreeGranting === "yes");
}

export function monthsSinceQualification(lastQualification: string | undefined): number | null {
  if (!lastQualification) return null;
  const stamp = lastQualification.length === 7 ? `${lastQualification}-01` : lastQualification;
  const date = new Date(stamp);
  if (Number.isNaN(date.getTime())) return null;
  const now = new Date();
  const months = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
  return Math.max(0, months);
}

export function computeFinancial(answers: CanadaAnswers): FinancialBreakdown {
  const familySize = Math.max(1, Math.min(20, Math.floor(answers.familySize || 1)));
  const livingRequirement = livingFundsForFamilySize(familySize);
  const tuition = money(answers.firstYearTuition);
  const tuitionPaid = Math.min(tuition, money(answers.tuitionPaid));
  const remainingTuition = Math.max(0, tuition - tuitionPaid);
  const transportation = money(answers.transport);
  const requiredFunds = remainingTuition + livingRequirement + transportation;
  const availableFunds =
    money(answers.personalSavings) +
    money(answers.sponsorFunds) +
    money(answers.scholarship) +
    money(answers.educationLoan);
  const difference = availableFunds - requiredFunds;
  const coverageRatio = requiredFunds > 0 ? availableFunds / requiredFunds : 1;
  return {
    currency: "CAD",
    familySize,
    livingRequirement,
    remainingTuition,
    transportation,
    requiredFunds,
    availableFunds,
    difference,
    coverageRatio,
  };
}

function flag(code: string, severity: FlagSeverity): RiskFlag {
  return { code, severity };
}

function coveragePoints(ratio: number): { points: number; flags: RiskFlag[] } {
  if (ratio < 1) return { points: 0, flags: [flag("FUNDS_BELOW_MINIMUM", "critical")] };
  if (ratio < 1.1) return { points: 8, flags: [] };
  if (ratio < 1.2) return { points: 10, flags: [] };
  return { points: 12, flags: [] };
}

function bandFromScore(score: number): AssessmentStatus {
  if (score >= 85) return "strong_readiness";
  if (score >= 70) return "good_readiness";
  if (score >= 55) return "needs_strengthening";
  return "significant_gaps";
}

function uniqueRecommendations(flags: RiskFlag[]): string[] {
  const ranked = [...flags]
    .filter((item) => item.severity !== "info")
    .sort((a, b) => (SEVERITY_RANK[b.severity] ?? 0) - (SEVERITY_RANK[a.severity] ?? 0));
  const seen = new Set<string>();
  const texts: string[] = [];
  for (const item of ranked) {
    const recCode = FLAG_TO_RECOMMENDATION[item.code];
    if (!recCode || seen.has(recCode)) continue;
    seen.add(recCode);
    const text = RECOMMENDATIONS[recCode];
    if (text) texts.push(text);
    if (texts.length >= 5) break;
  }
  return texts;
}

export function deriveAnswers(answers: CanadaAnswers): CanadaAnswers {
  const next: CanadaAnswers = { ...answers };

  if (next.schoolStatus === "loa") {
    next.institutionSelected = "yes";
    next.dliStatus = "yes";
    next.loaStatus = "yes";
    next.offerConditions = "met";
  } else if (next.schoolStatus === "offer") {
    next.institutionSelected = "yes";
    next.dliStatus = "yes";
    next.loaStatus = "pending";
    next.offerConditions = "some";
  } else if (next.schoolStatus === "chosen") {
    next.institutionSelected = "yes";
    next.dliStatus = "unknown";
    next.loaStatus = "no";
    next.offerConditions = "major";
  } else if (next.schoolStatus === "none") {
    next.institutionSelected = "no";
    next.loaStatus = "no";
    next.offerConditions = "major";
  }

  if (next.academicFit === "higher") {
    next.academicProgression = "higher";
    next.programmeRelation = "direct";
  } else if (next.academicFit === "related") {
    next.academicProgression = "same_specialised";
    next.programmeRelation = "partly";
  } else if (next.academicFit === "career_change") {
    next.academicProgression = "higher";
    next.programmeRelation = "logical";
  } else if (next.academicFit === "lower_reason") {
    next.academicProgression = "lower_reason";
    next.programmeRelation = "logical";
  } else if (next.academicFit === "lower_none") {
    next.academicProgression = "lower_none";
    next.programmeRelation = "unrelated";
  } else if (next.academicFit === "unrelated") {
    next.academicProgression = "unsure";
    next.programmeRelation = "unrelated";
  }

  if (next.fundsTrail === "solid") {
    next.fundsDocumented = "fully";
    next.financialHistory = "6plus";
    next.largeDeposits = "no";
  } else if (next.fundsTrail === "mostly") {
    next.fundsDocumented = "mostly";
    next.financialHistory = "3to5";
    next.largeDeposits = "yes_full";
  } else if (next.fundsTrail === "thin") {
    next.fundsDocumented = "some";
    next.financialHistory = "1to2";
    next.largeDeposits = "yes_part";
  } else if (next.fundsTrail === "unexplained") {
    next.fundsDocumented = "none";
    next.financialHistory = "under1";
    next.largeDeposits = "yes_none";
  }

  if (next.historyIssues === "clean") {
    next.previousRefusal = "no";
    next.otherRefusals = "no";
    next.statusBreach = "no";
    next.misrepresentation = "no";
    next.criminalHistory = "no";
  } else if (next.historyIssues === "refusal_fixed") {
    next.previousRefusal = "yes";
    next.refusalAddressed = "yes";
    next.otherRefusals = "no";
    next.statusBreach = "no";
    next.misrepresentation = "no";
    next.criminalHistory = "no";
  } else if (next.historyIssues === "refusal_open") {
    next.previousRefusal = "yes";
    next.refusalAddressed = "no";
    next.otherRefusals = "no";
    next.statusBreach = "no";
    next.misrepresentation = "no";
    next.criminalHistory = "no";
  } else if (next.historyIssues === "other_country") {
    next.previousRefusal = "no";
    next.otherRefusals = "unexplained";
    next.statusBreach = "no";
    next.misrepresentation = "no";
    next.criminalHistory = "no";
  } else if (next.historyIssues === "legal") {
    next.previousRefusal = "no";
    next.otherRefusals = "no";
    next.statusBreach = "unsure";
    next.misrepresentation = "unsure";
    next.criminalHistory = "private";
  }

  if (next.papersReady === "ready") {
    next.passportValid = "yes";
    next.documentsReady = "most";
    next.documentConsistency = "yes";
  } else if (next.papersReady === "almost") {
    next.passportValid = "soon";
    next.documentsReady = "several";
    next.documentConsistency = "minor";
  } else if (next.papersReady === "not_ready") {
    next.passportValid = "no";
    next.documentsReady = "few";
    next.documentConsistency = "significant";
  }

  if (!next.programmeOver12Months && next.programmeLevel) {
    next.programmeOver12Months =
      next.programmeLevel === "bachelor" ||
      next.programmeLevel === "master" ||
      next.programmeLevel === "doctorate" ||
      next.programmeLevel === "advanced_diploma"
        ? "yes"
        : "no";
  }

  if (next.studyWhy && !next.canadaWhy) {
    next.canadaWhy =
      next.studyWhy === "career"
        ? "academic_career"
        : next.studyWhy === "change" || next.studyWhy === "general"
          ? "academic"
          : next.studyWhy === "live_work"
            ? "immigration"
            : "none";
  }

  if (next.academicFit && !next.workRelation) {
    next.workRelation =
      next.academicFit === "higher" || next.academicFit === "related"
        ? "direct"
        : next.academicFit === "career_change" || next.academicFit === "lower_reason"
          ? "partly"
          : "unrelated";
  }

  if (next.academicFit && !next.institutionWhy) {
    next.institutionWhy =
      next.academicFit === "higher" || next.academicFit === "related" || next.academicFit === "career_change"
        ? "relevance"
        : next.academicFit === "lower_reason"
          ? "cost"
          : "none";
  }

  if (next.fundsTrail && !next.futureFunding) {
    next.futureFunding =
      next.fundsTrail === "solid" || next.fundsTrail === "mostly"
        ? "documented"
        : next.fundsTrail === "thin"
          ? "limited"
          : "no";
  }

  if (!next.gapDocumented) {
    const gap = monthsSinceQualification(next.lastQualification);
    if (gap !== null && gap < 24) next.gapDocumented = "fully";
  }

  if (next.planAfterStudies && !next.afterStudy) {
    next.afterStudy =
      next.planAfterStudies === "return_specific"
        ? "home_role"
        : next.planAfterStudies === "return_developing"
          ? "general"
          : next.planAfterStudies === "relocate"
            ? "remain"
            : "unsure";
  }

  if (next.planAfterStudies && !next.returnCareer) {
    next.returnCareer =
      next.planAfterStudies === "return_specific"
        ? "documented"
        : next.planAfterStudies === "return_developing"
          ? "general"
          : next.planAfterStudies === "unsure"
            ? "possibly"
            : "none";
  }

  if (next.planAfterStudies && !next.economicActivity) {
    next.economicActivity =
      next.planAfterStudies === "return_specific"
        ? "full_time"
        : next.planAfterStudies === "return_developing"
          ? "part_time"
          : next.planAfterStudies === "unsure"
            ? "graduate"
            : "unemployed";
  }

  if (next.planAfterStudies && !next.personalTies) {
    next.personalTies =
      next.planAfterStudies === "return_specific"
        ? "strong"
        : next.planAfterStudies === "return_developing"
          ? "some"
          : next.planAfterStudies === "unsure"
            ? "limited"
            : "none";
  }

  if (next.planAfterStudies && (!next.economicTies || next.economicTies.length === 0)) {
    next.economicTies =
      next.planAfterStudies === "return_specific" || next.planAfterStudies === "return_developing"
        ? ["employment"]
        : [];
  }

  if (next.documentsReady && !next.documentsReviewed) {
    next.documentsReviewed =
      next.documentsReady === "most" ? "yes" : next.documentsReady === "several" ? "partly" : "no";
  }

  if (next.economicActivity === "full_time" && !next.gapActivity) {
    next.gapActivity = "full_time";
  }

  return next;
}

export function assessCanadaReadiness(raw: CanadaAnswers): AssessmentResult {
  const answers = deriveAnswers(raw);
  if (answers.applyFrom && answers.applyFrom !== "outside") {
    return {
      score: 0,
      status: "out_of_scope",
      statusLabel: STATUS_LABELS.out_of_scope,
      categoryScores: { ...CATEGORY_MAX, financial: 0, study_purpose: 0, academic: 0, temporary_intent: 0, compliance: 0, immigration_history: 0, documentation: 0 },
      flags: [flag("SCOPE_REVIEW", "info")],
      recommendations: [],
      financial: null,
      coreRequirements: [],
      outOfScopeMessage:
        "This check is for applications made from outside Canada. If you are already in Canada, talk to us and we will point you the right way.",
      rulesVersion: RULES_VERSION,
      calculatorVersion: CALCULATOR_VERSION,
    };
  }

  if (answers.province === "quebec") {
    return {
      score: 0,
      status: "out_of_scope",
      statusLabel: STATUS_LABELS.out_of_scope,
      categoryScores: { ...CATEGORY_MAX, financial: 0, study_purpose: 0, academic: 0, temporary_intent: 0, compliance: 0, immigration_history: 0, documentation: 0 },
      flags: [flag("QUEBEC_OUT_OF_SCOPE", "info")],
      recommendations: [],
      financial: null,
      coreRequirements: [],
      outOfScopeMessage:
        "Quebec applications need extra provincial steps, so this check does not score them. Talk to us and we will walk through it with you.",
      rulesVersion: RULES_VERSION,
      calculatorVersion: CALCULATOR_VERSION,
    };
  }

  const flags: RiskFlag[] = [];
  const scores: CategoryScores = {
    financial: 0,
    study_purpose: 0,
    academic: 0,
    temporary_intent: 0,
    compliance: 0,
    immigration_history: 0,
    documentation: 0,
  };

  const institutionSelected = answers.institutionSelected === "yes";
  const dliConfirmed = institutionSelected && answers.dliStatus === "yes";
  const loaValid = institutionSelected && answers.loaStatus === "yes";
  const palNeeded = palRequired(answers);

  if (!institutionSelected) flags.push(flag("NO_INSTITUTION_SELECTED", "high"));
  if (institutionSelected && answers.dliStatus === "no") flags.push(flag("INSTITUTION_NOT_DLI", "critical"));
  if (institutionSelected && answers.dliStatus === "unknown") flags.push(flag("DLI_UNKNOWN", "high"));
  if (!loaValid) flags.push(flag("LOA_MISSING", "critical"));
  if (palNeeded && institutionSelected && answers.palStatus === "no") flags.push(flag("PAL_TAL_MISSING", "critical"));
  if (palNeeded && institutionSelected && answers.palStatus === "unsure") flags.push(flag("PAL_TAL_UNCLEAR", "high"));

  scores.compliance += answers.institutionSelected === "yes" ? 1 : 0;
  scores.compliance += answers.dliStatus === "yes" ? 4 : 0;
  scores.compliance += answers.loaStatus === "yes" ? 5 : 0;
  if (!palNeeded) scores.compliance += 4;
  else if (answers.palStatus === "yes") scores.compliance += 4;
  scores.compliance += answers.documentsReviewed === "yes" ? 1 : answers.documentsReviewed === "partly" ? 0.5 : 0;

  scores.academic +=
    answers.academicProgression === "higher"
      ? 5
      : answers.academicProgression === "same_specialised"
        ? 4
        : answers.academicProgression === "lower_reason"
          ? 2
          : answers.academicProgression === "unsure"
            ? 1
            : 0;
  if (answers.academicProgression === "lower_none") flags.push(flag("ACADEMIC_REGRESSION", "high"));

  scores.academic +=
    answers.programmeRelation === "direct"
      ? 4
      : answers.programmeRelation === "partly"
        ? 3
        : answers.programmeRelation === "logical"
          ? 2
          : 0;
  if (answers.programmeRelation === "unrelated") flags.push(flag("PROGRAMME_RELATIONSHIP_WEAK", "medium"));

  scores.academic +=
    answers.languageStatus === "yes" || answers.languageStatus === "exempted"
      ? 4
      : answers.languageStatus === "pending"
        ? 2
        : answers.languageStatus === "unsure"
          ? 1
          : 0;
  if (answers.languageStatus === "pending") flags.push(flag("LANGUAGE_PENDING", "info"));
  if (answers.languageStatus === "no") flags.push(flag("LANGUAGE_NOT_MET", "high"));

  scores.academic += answers.offerConditions === "met" ? 2 : answers.offerConditions === "some" ? 1 : 0;

  scores.study_purpose +=
    answers.workRelation === "direct" ? 4 : answers.workRelation === "partly" ? 3 : answers.workRelation === "none" ? 2 : 0;
  if (answers.workRelation === "unrelated") flags.push(flag("WORK_PROGRAMME_MISMATCH", "medium"));

  scores.study_purpose +=
    answers.studyWhy === "career"
      ? 5
      : answers.studyWhy === "change"
        ? 4
        : answers.studyWhy === "general"
          ? 2
          : answers.studyWhy === "undecided"
            ? 1
            : 0;
  if (answers.studyWhy === "live_work") flags.push(flag("STUDY_PURPOSE_WEAK", "high"));

  scores.study_purpose += answers.canadaWhy === "academic" || answers.canadaWhy === "academic_career" ? 3 : answers.canadaWhy === "family" ? 1 : 0;
  if (answers.canadaWhy === "immigration" || answers.canadaWhy === "none") flags.push(flag("CANADA_RATIONALE_WEAK", "high"));

  scores.study_purpose +=
    answers.institutionWhy === "relevance" ? 3 : answers.institutionWhy === "cost" ? 2 : answers.institutionWhy === "offer" ? 1 : 0;

  scores.study_purpose +=
    answers.afterStudy === "home_role" ? 5 : answers.afterStudy === "general" ? 3 : answers.afterStudy === "unsure" ? 1 : 0;
  if (answers.afterStudy === "remain" || answers.afterStudy === "unsure") flags.push(flag("POST_STUDY_PLAN_WEAK", "high"));

  const gapMonths = monthsSinceQualification(answers.lastQualification);
  if (gapMonths !== null && gapMonths >= 24) {
    if (answers.gapDocumented === "partly") flags.push(flag("STUDY_GAP_PARTIAL", "medium"));
    if (answers.gapDocumented === "no") flags.push(flag("STUDY_GAP_UNEXPLAINED", "high"));
  }

  const financial = computeFinancial(answers);
  const coverage = coveragePoints(financial.coverageRatio);
  scores.financial += coverage.points;
  flags.push(...coverage.flags);

  scores.financial +=
    answers.fundsDocumented === "fully" ? 4 : answers.fundsDocumented === "mostly" ? 3 : answers.fundsDocumented === "some" ? 1 : 0;
  if (answers.fundsDocumented === "some" || answers.fundsDocumented === "none") flags.push(flag("SOURCE_OF_FUNDS_WEAK", "medium"));

  scores.financial +=
    answers.financialHistory === "6plus" ? 3 : answers.financialHistory === "3to5" ? 2 : answers.financialHistory === "1to2" ? 1 : 0;

  scores.financial += answers.largeDeposits === "no" || answers.largeDeposits === "yes_full" ? 2 : answers.largeDeposits === "yes_part" ? 1 : 0;
  if (answers.largeDeposits === "yes_none") flags.push(flag("UNEXPLAINED_RECENT_DEPOSIT", "high"));

  if (answers.programmeOver12Months === "yes") {
    scores.financial += answers.futureFunding === "documented" ? 4 : answers.futureFunding === "limited" ? 2 : 0;
    if (answers.futureFunding === "limited" || answers.futureFunding === "no") flags.push(flag("FUTURE_FUNDING_WEAK", "medium"));
  } else {
    scores.financial += 4;
  }

  scores.temporary_intent +=
    answers.economicActivity === "full_time" || answers.economicActivity === "business"
      ? 4
      : answers.economicActivity === "part_time" || answers.economicActivity === "student"
        ? 3
        : answers.economicActivity === "graduate"
          ? 2
          : 1;

  scores.temporary_intent +=
    answers.returnCareer === "documented" ? 4 : answers.returnCareer === "general" ? 3 : answers.returnCareer === "possibly" ? 1 : 0;
  if (answers.returnCareer === "none" || answers.returnCareer === "possibly") flags.push(flag("RETURN_CAREER_PLAN_WEAK", "medium"));

  scores.temporary_intent +=
    answers.personalTies === "strong" ? 3 : answers.personalTies === "some" ? 2 : answers.personalTies === "limited" ? 1 : 0;

  const ties = (answers.economicTies ?? []).filter((item) => item !== "none");
  scores.temporary_intent += ties.length >= 3 ? 3 : ties.length === 2 ? 2 : ties.length === 1 ? 1 : 0;

  scores.temporary_intent +=
    answers.planAfterStudies === "return_specific"
      ? 4
      : answers.planAfterStudies === "return_developing"
        ? 3
        : answers.planAfterStudies === "unsure"
          ? 1
          : 0;
  if (answers.planAfterStudies === "relocate" || answers.planAfterStudies === "unsure") {
    flags.push(flag("POST_STUDY_PLAN_WEAK", "high"));
  }
  scores.temporary_intent = Math.min(CATEGORY_MAX.temporary_intent, scores.temporary_intent);

  if (answers.previousRefusal === "no") {
    scores.immigration_history = 5;
  } else if (answers.previousRefusal === "yes") {
    flags.push(flag("PREVIOUS_REFUSAL", "high"));
    scores.immigration_history =
      answers.refusalAddressed === "yes" ? 4 : answers.refusalAddressed === "partly" ? 2 : answers.refusalAddressed === "unknown" ? 1 : 0;
    if (answers.refusalAddressed === "no" || answers.refusalAddressed === "partly") flags.push(flag("REFUSAL_UNRESOLVED", "high"));
  }

  if (answers.otherRefusals === "unexplained") flags.push(flag("OTHER_REFUSAL_REVIEW", "high"));
  if (answers.statusBreach === "yes" || answers.statusBreach === "unsure") {
    flags.push(flag("IMMIGRATION_NONCOMPLIANCE", "high"));
    scores.immigration_history = Math.min(scores.immigration_history, 1);
  }

  if (answers.misrepresentation === "yes" || answers.misrepresentation === "unsure") {
    flags.push(flag("MISREPRESENTATION_HISTORY", "review_required"));
  }
  if (answers.criminalHistory === "yes" || answers.criminalHistory === "private") {
    flags.push(flag("ADMISSIBILITY_REVIEW", "review_required"));
  }
  if (answers.medicalExam === "required_open") flags.push(flag("MEDICAL_PENDING", "info"));
  if (answers.medicalExam === "unsure") flags.push(flag("MEDICAL_STATUS_UNCLEAR", "info"));

  scores.documentation += answers.passportValid === "yes" ? 1 : answers.passportValid === "soon" ? 0.5 : 0;
  if (answers.passportValid === "no" || answers.passportValid === "soon") flags.push(flag("PASSPORT_ISSUE", "medium"));
  scores.documentation += answers.documentsReady === "most" ? 2 : answers.documentsReady === "several" ? 1 : 0;
  scores.documentation +=
    answers.documentConsistency === "yes" ? 2 : answers.documentConsistency === "minor" ? 1 : answers.documentConsistency === "unsure" ? 0.5 : 0;
  if (answers.documentConsistency === "significant" || answers.documentConsistency === "unsure") {
    flags.push(flag("DOCUMENT_INCONSISTENCY", "medium"));
  }

  const rawScore = Math.min(100, Math.max(0, Object.values(scores).reduce((sum, value) => sum + value, 0)));
  const hasReview = flags.some((item) => item.severity === "review_required");
  const hasCritical = flags.some((item) => item.severity === "critical");
  const status: AssessmentStatus = hasReview
    ? "professional_review_required"
    : hasCritical
      ? "not_ready"
      : bandFromScore(rawScore);

  const palSatisfied = !palNeeded || answers.palStatus === "yes";
  const fundsMet = financial.coverageRatio >= 1;

  return {
    score: Math.round(rawScore),
    status,
    statusLabel: STATUS_LABELS[status],
    categoryScores: scores,
    flags,
    recommendations: uniqueRecommendations(flags),
    financial,
    coreRequirements: [
      { label: "Letter of acceptance", met: loaValid },
      { label: "School on Canada’s designated list", met: dliConfirmed },
      { label: "Provincial attestation, if needed", met: palSatisfied },
      { label: "First-year funds in place", met: fundsMet },
    ],
    rulesVersion: RULES_VERSION,
    calculatorVersion: CALCULATOR_VERSION,
  };
}

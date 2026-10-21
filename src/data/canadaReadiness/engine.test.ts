import { describe, expect, it } from "vitest";
import { assessCanadaReadiness, computeFinancial, livingFundsForFamilySize, palRequired } from "./engine";
import type { CanadaAnswers } from "./types";

const readyBase: CanadaAnswers = {
  applyFrom: "outside",
  province: "ontario",
  institutionSelected: "yes",
  dliStatus: "yes",
  loaStatus: "yes",
  programmeLevel: "master",
  institutionType: "public",
  degreeGranting: "yes",
  documentsReviewed: "yes",
  academicProgression: "higher",
  programmeRelation: "direct",
  languageStatus: "yes",
  offerConditions: "met",
  workRelation: "direct",
  studyWhy: "career",
  canadaWhy: "academic",
  institutionWhy: "relevance",
  afterStudy: "home_role",
  familySize: 1,
  firstYearTuition: 20000,
  tuitionPaid: 0,
  transport: 2000,
  personalSavings: 50000,
  sponsorFunds: 0,
  scholarship: 0,
  educationLoan: 0,
  fundsDocumented: "fully",
  financialHistory: "6plus",
  largeDeposits: "no",
  programmeOver12Months: "no",
  economicActivity: "full_time",
  returnCareer: "documented",
  personalTies: "strong",
  economicTies: ["employment", "property"],
  planAfterStudies: "return_specific",
  previousRefusal: "no",
  otherRefusals: "no",
  statusBreach: "no",
  misrepresentation: "no",
  criminalHistory: "no",
  medicalExam: "not_required",
  passportValid: "yes",
  documentsReady: "most",
  documentConsistency: "yes",
};

describe("Canada study permit readiness engine", () => {
  it("uses IRCC 2026 living-fund amounts", () => {
    expect(livingFundsForFamilySize(1)).toBe(23448);
    expect(livingFundsForFamilySize(2)).toBe(29192);
    expect(livingFundsForFamilySize(8)).toBe(62054 + 6318);
  });

  it("calculates remaining tuition and required funds", () => {
    const financial = computeFinancial({
      familySize: 1,
      firstYearTuition: 30000,
      tuitionPaid: 5000,
      transport: 1500,
      personalSavings: 40000,
    });
    expect(financial.remainingTuition).toBe(25000);
    expect(financial.requiredFunds).toBe(25000 + 23448 + 1500);
    expect(financial.availableFunds).toBe(40000);
  });

  it("does not require PAL/TAL for public degree-granting master's", () => {
    expect(palRequired({ programmeLevel: "master", institutionType: "public", degreeGranting: "yes" })).toBe(false);
    expect(palRequired({ programmeLevel: "bachelor", institutionType: "public", degreeGranting: "yes" })).toBe(true);
  });

  it("stops scoring for Quebec without mixing that into what to strengthen", () => {
    const result = assessCanadaReadiness({ applyFrom: "outside", province: "quebec" });
    expect(result.status).toBe("out_of_scope");
    expect(result.flags[0]?.code).toBe("QUEBEC_OUT_OF_SCOPE");
    expect(result.recommendations).toEqual([]);
    expect(result.outOfScopeMessage).toMatch(/Quebec/);
  });

  it("keeps in-Canada files out of the strengthen list", () => {
    const result = assessCanadaReadiness({ applyFrom: "inside" });
    expect(result.status).toBe("out_of_scope");
    expect(result.recommendations).toEqual([]);
    expect(result.outOfScopeMessage).toMatch(/outside Canada/);
  });

  it("turns combined answers into a scored file", () => {
    const result = assessCanadaReadiness({
      applyFrom: "outside",
      province: "ontario",
      schoolStatus: "loa",
      programmeLevel: "master",
      institutionType: "public",
      degreeGranting: "yes",
      academicFit: "higher",
      languageStatus: "yes",
      studyWhy: "career",
      lastQualification: "2025-09",
      familySize: 1,
      firstYearTuition: 20000,
      personalSavings: 50000,
      transport: 2000,
      fundsTrail: "solid",
      planAfterStudies: "return_specific",
      historyIssues: "clean",
      papersReady: "ready",
    });
    expect(result.status).toBe("strong_readiness");
    expect(result.recommendations.every((item) => !/first version|meet us|calculator/i.test(item))).toBe(true);
  });

  it("marks missing LOA as not ready even with a high profile", () => {
    const result = assessCanadaReadiness({ ...readyBase, loaStatus: "no" });
    expect(result.status).toBe("not_ready");
    expect(result.coreRequirements.find((item) => item.label.includes("acceptance"))?.met).toBe(false);
  });

  it("routes disclosed admissibility issues to professional review", () => {
    const result = assessCanadaReadiness({ ...readyBase, criminalHistory: "yes" });
    expect(result.status).toBe("professional_review_required");
  });

  it("fills skipped purpose questions from a later answer", () => {
    const result = assessCanadaReadiness({
      ...readyBase,
      studyWhy: "live_work",
      canadaWhy: undefined,
      planAfterStudies: "relocate",
      afterStudy: undefined,
      returnCareer: undefined,
    });
    expect(result.flags.some((item) => item.code === "STUDY_PURPOSE_WEAK")).toBe(true);
    expect(result.flags.some((item) => item.code === "CANADA_RATIONALE_WEAK")).toBe(true);
    expect(result.flags.some((item) => item.code === "POST_STUDY_PLAN_WEAK")).toBe(true);
  });

  it("returns a strong band when gates are clear and the profile is complete", () => {
    const result = assessCanadaReadiness(readyBase);
    expect(result.status).toBe("strong_readiness");
    expect(result.score).toBeGreaterThanOrEqual(85);
    expect(result.financial?.coverageRatio).toBeGreaterThan(1);
  });
});

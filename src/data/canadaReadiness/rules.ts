/** IRCC living-expense amounts effective 1 September 2026, outside Quebec. */
export const LIVING_FUNDS_BY_FAMILY_SIZE = [23448, 29192, 35888, 43572, 49419, 55736, 62054] as const;
export const LIVING_FUNDS_EACH_ADDITIONAL = 6318;

export const CANADA_PROVINCES = [
  { value: "alberta", label: "Alberta" },
  { value: "british_columbia", label: "British Columbia" },
  { value: "manitoba", label: "Manitoba" },
  { value: "new_brunswick", label: "New Brunswick" },
  { value: "newfoundland", label: "Newfoundland and Labrador" },
  { value: "northwest_territories", label: "Northwest Territories" },
  { value: "nova_scotia", label: "Nova Scotia" },
  { value: "nunavut", label: "Nunavut" },
  { value: "ontario", label: "Ontario" },
  { value: "pei", label: "Prince Edward Island" },
  { value: "quebec", label: "Quebec" },
  { value: "saskatchewan", label: "Saskatchewan" },
  { value: "yukon", label: "Yukon" },
] as const;

export const IRCC_LINKS = {
  eligibility: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/eligibility.html",
  funds: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/financial-support.html",
  dli: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html",
} as const;

export const DISCLAIMER =
  "This check helps you see where a Canada study-permit file is strong or thin. Canada’s immigration department makes the actual decision, and the rules can change.";

export const RECOMMENDATIONS: Record<string, string> = {
  R001: "Get a valid letter of acceptance from an eligible Canadian designated learning institution before you prepare the permit file.",
  R002: "Confirm your school is currently on IRCC’s designated learning institution list.",
  R003: "Check whether a provincial or territorial attestation letter applies to your programme, and get it before you apply if it does.",
  R004: "Your declared funds sit below the first-year amount Canada currently asks for. Increase or document enough money before you apply.",
  R005: "Show where the money came from, who owns it, and that it will still be there when you need it.",
  R006: "Explain any large recent deposits — where they came from and how they relate to you or your sponsor.",
  R007: "Put together a clear plan, with evidence, for how later years of the programme will be paid for.",
  R008: "Spell out why this programme is a logical next step from what you have already studied or done at work.",
  R009: "Write a clear timeline for your study gap, backed by work, business, training, or other evidence.",
  R010: "Tighten why this programme, this school, and Canada specifically belong in your education and career story.",
  R011: "Make it obvious how the Canadian qualification supports a realistic path after graduation.",
  R012: "Strengthen the picture of your work, family, and career connections outside Canada.",
  R013: "Go back to any previous refusal reasons and answer each one with new or stronger evidence.",
  R014: "Line up dates, jobs, money figures, and education history so they match across every form and document.",
};

export const FLAG_TO_RECOMMENDATION: Record<string, string> = {
  LOA_MISSING: "R001",
  INSTITUTION_NOT_DLI: "R002",
  DLI_UNKNOWN: "R002",
  NO_INSTITUTION_SELECTED: "R002",
  PAL_TAL_MISSING: "R003",
  PAL_TAL_UNCLEAR: "R003",
  FUNDS_BELOW_MINIMUM: "R004",
  SOURCE_OF_FUNDS_WEAK: "R005",
  UNEXPLAINED_RECENT_DEPOSIT: "R006",
  FUTURE_FUNDING_WEAK: "R007",
  ACADEMIC_REGRESSION: "R008",
  PROGRAMME_RELATIONSHIP_WEAK: "R008",
  WORK_PROGRAMME_MISMATCH: "R008",
  STUDY_GAP_PARTIAL: "R009",
  STUDY_GAP_UNEXPLAINED: "R009",
  STUDY_PURPOSE_WEAK: "R010",
  CANADA_RATIONALE_WEAK: "R010",
  POST_STUDY_PLAN_WEAK: "R011",
  RETURN_CAREER_PLAN_WEAK: "R012",
  PREVIOUS_REFUSAL: "R013",
  REFUSAL_UNRESOLVED: "R013",
  OTHER_REFUSAL_REVIEW: "R013",
  DOCUMENT_INCONSISTENCY: "R014",
  PASSPORT_ISSUE: "R014",
};

export const SEVERITY_RANK: Record<string, number> = {
  critical: 5,
  review_required: 4,
  high: 3,
  medium: 2,
  info: 1,
};

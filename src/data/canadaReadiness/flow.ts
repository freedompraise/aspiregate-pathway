import { monthsSinceQualification, palRequired } from "./engine";
import { CANADA_PROVINCES } from "./rules";
import type { CanadaAnswers } from "./types";

export type QuestionId =
  | "applyFrom"
  | "province"
  | "schoolStatus"
  | "programmeLevel"
  | "academicFit"
  | "languageStatus"
  | "studyWhy"
  | "lastQualification"
  | "money"
  | "fundsTrail"
  | "planAfterStudies"
  | "historyIssues"
  | "papersReady";

export function isOutOfScope(answers: CanadaAnswers): boolean {
  return Boolean(
    (answers.applyFrom && answers.applyFrom !== "outside") || answers.province === "quebec",
  );
}

export function hasLongStudyGap(answers: CanadaAnswers): boolean {
  const gap = monthsSinceQualification(answers.lastQualification);
  return gap !== null && gap >= 24;
}

export function programmeNeedsPal(answers: CanadaAnswers): boolean {
  return answers.schoolStatus !== "none" && palRequired(answers);
}

export function visibleQuestionIds(answers: CanadaAnswers): QuestionId[] {
  if (answers.applyFrom && answers.applyFrom !== "outside") return ["applyFrom"];
  if (answers.province === "quebec") return ["applyFrom", "province"];

  return [
    "applyFrom",
    "province",
    "schoolStatus",
    "programmeLevel",
    "academicFit",
    "languageStatus",
    "studyWhy",
    "lastQualification",
    "money",
    "fundsTrail",
    "planAfterStudies",
    "historyIssues",
    "papersReady",
  ];
}

export const PROVINCE_OPTIONS = CANADA_PROVINCES.map((item) => ({ value: item.value, label: item.label }));

export const PROGRAMME_LEVEL_OPTIONS = [
  { value: "secondary", label: "Secondary" },
  { value: "certificate", label: "Certificate" },
  { value: "diploma", label: "Diploma" },
  { value: "advanced_diploma", label: "Advanced diploma" },
  { value: "bachelor", label: "Bachelor’s" },
  { value: "pg_cert", label: "PG certificate / diploma" },
  { value: "master", label: "Master’s" },
  { value: "doctorate", label: "Doctorate" },
  { value: "other", label: "Other" },
];

export const FAMILY_SIZE_OPTIONS = Array.from({ length: 10 }, (_, index) => ({
  value: String(index + 1),
  label: index === 9 ? "10 or more" : String(index + 1),
}));

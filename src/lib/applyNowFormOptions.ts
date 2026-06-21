export const PREFERRED_COUNTRIES = [
  "United Kingdom",
  "Canada",
  "United States",
  "Ireland",
  "Germany",
  "Australia",
  "France",
  "United Arab Emirates",
  "Not sure yet",
] as const;

export const HIGHEST_QUALIFICATIONS = [
  "Secondary school (WAEC / SSCE or equivalent)",
  "OND / NCE",
  "HND",
  "Bachelor's degree",
  "Master's degree",
  "Doctorate / PhD",
  "Professional qualification",
  "Other / in progress",
] as const;

export const PASSPORT_STATUS_OPTIONS = [
  { value: "valid", label: "Valid" },
  { value: "expired", label: "Expired" },
  { value: "not_available", label: "Not available" },
] as const;

export const BUDGET_CURRENCIES = ["NGN", "USD", "GBP", "EUR", "CAD", "AUD", "Other"] as const;

export const DOCUMENT_STATUS_OPTIONS = [
  "All key documents ready",
  "Some documents ready",
  "Still gathering documents",
  "Not sure what's required yet",
] as const;

export const COURSE_OPTION_OTHER = "Other" as const;

export const INTENDED_COURSE_SAME_AS_PREVIOUS = "Same as my previous course" as const;

export const INTENDED_COURSE_NOT_SURE = "Not sure yet — I need guidance" as const;

export const PREVIOUS_COURSE_FIELDS = [
  "Accounting & Finance",
  "Business Administration",
  "Economics",
  "Marketing",
  "Computer Science / IT",
  "Data Science / Analytics",
  "Cybersecurity",
  "Engineering",
  "Medicine / Health Sciences",
  "Nursing",
  "Public Health",
  "Law",
  "Education",
  "Mass Communication / Media",
  "International Relations",
  "Social Sciences",
  "Psychology",
  "Arts & Design",
  "Hospitality & Tourism",
  "Agriculture",
  "Science / Laboratory Science",
  COURSE_OPTION_OTHER,
] as const;

export const INTENDED_COURSE_OPTIONS = [
  INTENDED_COURSE_SAME_AS_PREVIOUS,
  INTENDED_COURSE_NOT_SURE,
  "Business / Management",
  "Accounting & Finance",
  "MBA",
  "Data Science / Analytics",
  "Cybersecurity",
  "Computer Science / Software Engineering",
  "Artificial Intelligence",
  "Engineering",
  "Public Health",
  "Nursing / Healthcare",
  "Education",
  "Law",
  "International Relations",
  "Media / Communication",
  "Creative Arts / Design",
  "Hospitality & Tourism",
  "Project Management",
  "Supply Chain / Logistics",
  "Social Work",
  "Psychology",
  COURSE_OPTION_OTHER,
] as const;

/** Documents the applicant may already have (optional checkboxes). */
export const DOCUMENTS_ON_HAND = [
  "Passport copy",
  "Academic transcripts & certificates",
  "CV / resume",
  "English test certificate (IELTS, PTE, etc.)",
  "Personal statement / SOP",
] as const;

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

/** Documents the applicant may already have (optional checkboxes). */
export const DOCUMENTS_ON_HAND = [
  "Passport copy",
  "Academic transcripts & certificates",
  "CV / resume",
  "English test certificate (IELTS, PTE, etc.)",
  "Personal statement / SOP",
] as const;

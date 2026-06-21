import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchableCombobox } from "@/components/ui/searchable-combobox";
import {
  BUDGET_CURRENCIES,
  COURSE_OPTION_OTHER,
  DOCUMENT_STATUS_OPTIONS,
  DOCUMENTS_ON_HAND,
  HIGHEST_QUALIFICATIONS,
  INTENDED_COURSE_OPTIONS,
  INTENDED_COURSE_SAME_AS_PREVIOUS,
  PASSPORT_STATUS_OPTIONS,
  PREFERRED_COUNTRIES,
  PREVIOUS_COURSE_FIELDS,
} from "@/lib/applyNowFormOptions";
import { cn } from "@/lib/utils";

const FORMSPREE_ACTION = "https://formspree.io/f/xykvwkgz";

const selectClassName = cn(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
);

const nativeCheckboxClassName =
  "mt-0.5 h-4 w-4 shrink-0 rounded border border-primary text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2";

type CourseFieldErrors = {
  previousCourse?: string;
  previousCourseOther?: string;
  intendedCourse?: string;
  intendedCourseOther?: string;
};

function resolveIntendedCourseForSubmit(
  selection: string,
  previousCourse: string,
  previousCourseOther: string,
  intendedCourseOther: string,
): { intendedCourse: string; intendedCourseOther: string } {
  if (selection === INTENDED_COURSE_SAME_AS_PREVIOUS) {
    if (previousCourse === COURSE_OPTION_OTHER) {
      return { intendedCourse: COURSE_OPTION_OTHER, intendedCourseOther: previousCourseOther.trim() };
    }
    return { intendedCourse: previousCourse, intendedCourseOther: "" };
  }

  if (selection === COURSE_OPTION_OTHER) {
    return { intendedCourse: COURSE_OPTION_OTHER, intendedCourseOther: intendedCourseOther.trim() };
  }

  return { intendedCourse: selection, intendedCourseOther: "" };
}

function validateCourseFields(
  previousCourse: string,
  previousCourseOther: string,
  intendedCourseSelection: string,
  intendedCourseOther: string,
): CourseFieldErrors {
  const errors: CourseFieldErrors = {};

  if (!previousCourse) {
    errors.previousCourse = "Please select your previous course or field.";
  } else if (previousCourse === COURSE_OPTION_OTHER && !previousCourseOther.trim()) {
    errors.previousCourseOther = "Please specify your course or field.";
  }

  if (!intendedCourseSelection) {
    errors.intendedCourse = "Please select what you would like to study abroad.";
  } else if (intendedCourseSelection === INTENDED_COURSE_SAME_AS_PREVIOUS) {
    if (!previousCourse) {
      errors.intendedCourse = "Select your previous course first, or choose another option.";
    } else if (previousCourse === COURSE_OPTION_OTHER && !previousCourseOther.trim()) {
      errors.intendedCourse = "Specify your previous course first, or choose another option.";
    }
  } else if (intendedCourseSelection === COURSE_OPTION_OTHER && !intendedCourseOther.trim()) {
    errors.intendedCourseOther = "Please specify the course you want to study.";
  }

  return errors;
}

export function ApplyNowForm() {
  const [previousCourse, setPreviousCourse] = useState("");
  const [previousCourseOther, setPreviousCourseOther] = useState("");
  const [intendedCourseSelection, setIntendedCourseSelection] = useState("");
  const [intendedCourseOther, setIntendedCourseOther] = useState("");
  const [courseErrors, setCourseErrors] = useState<CourseFieldErrors>({});

  const submittedIntended = useMemo(
    () =>
      resolveIntendedCourseForSubmit(
        intendedCourseSelection,
        previousCourse,
        previousCourseOther,
        intendedCourseOther,
      ),
    [intendedCourseSelection, previousCourse, previousCourseOther, intendedCourseOther],
  );

  const handlePreviousCourseChange = (value: string) => {
    setPreviousCourse(value);
    if (value !== COURSE_OPTION_OTHER) {
      setPreviousCourseOther("");
    }
    setCourseErrors((current) => ({
      ...current,
      previousCourse: undefined,
      previousCourseOther: undefined,
      intendedCourse:
        intendedCourseSelection === INTENDED_COURSE_SAME_AS_PREVIOUS ? undefined : current.intendedCourse,
    }));
  };

  const handleIntendedCourseChange = (value: string) => {
    setIntendedCourseSelection(value);
    if (value !== COURSE_OPTION_OTHER) {
      setIntendedCourseOther("");
    }
    setCourseErrors((current) => ({
      ...current,
      intendedCourse: undefined,
      intendedCourseOther: undefined,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const errors = validateCourseFields(
      previousCourse,
      previousCourseOther,
      intendedCourseSelection,
      intendedCourseOther,
    );

    if (Object.keys(errors).length > 0) {
      event.preventDefault();
      setCourseErrors(errors);
    }
  };

  return (
    <Card className="p-6 md:p-8 border-border/60 shadow-card">
      <form action={FORMSPREE_ACTION} method="POST" className="space-y-6" onSubmit={handleSubmit} noValidate>
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <input type="hidden" name="form_type" value="apply_now" />
        <input type="hidden" name="_subject" value="New Apply Now request — AspireGate" />

        <div className="space-y-2">
          <Label htmlFor="apply-name">Full name</Label>
          <Input id="apply-name" name="name" type="text" required autoComplete="name" placeholder="Chidi Bolu" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="apply-email">Email address</Label>
          <Input id="apply-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="apply-whatsapp">WhatsApp number</Label>
          <Input
            id="apply-whatsapp"
            name="whatsapp"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+234 800 000 0000"
          />
          <p className="text-xs text-muted-foreground">Include your country code (e.g. +234 for Nigeria).</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="apply-country">Preferred country</Label>
          <select id="apply-country" name="preferred_country" required className={selectClassName} defaultValue="">
            <option value="" disabled>
              Select your preferred country…
            </option>
            {PREFERRED_COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="apply-qualification">Highest qualification</Label>
          <select id="apply-qualification" name="highest_qualification" required className={selectClassName} defaultValue="">
            <option value="" disabled>
              Select your highest qualification…
            </option>
            {HIGHEST_QUALIFICATIONS.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4 rounded-xl border border-border/60 bg-muted/20 p-4 md:p-5">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Select the closest option. If you are unsure, choose &ldquo;Not sure yet&rdquo; and we&apos;ll guide you during
            the consultation.
          </p>

          <div className="space-y-2">
            <Label htmlFor="apply-previous-course">What course or field did you study previously?</Label>
            <SearchableCombobox
              id="apply-previous-course"
              options={PREVIOUS_COURSE_FIELDS}
              value={previousCourse}
              onValueChange={handlePreviousCourseChange}
              placeholder="Search or select your field…"
              searchPlaceholder="Search fields…"
              aria-invalid={Boolean(courseErrors.previousCourse)}
            />
            {courseErrors.previousCourse && (
              <p className="text-xs text-destructive">{courseErrors.previousCourse}</p>
            )}
          </div>

          {previousCourse === COURSE_OPTION_OTHER && (
            <div className="space-y-2">
              <Label htmlFor="apply-previous-course-other">Please specify your course or field</Label>
              <Input
                id="apply-previous-course-other"
                type="text"
                value={previousCourseOther}
                onChange={(event) => {
                  setPreviousCourseOther(event.target.value);
                  setCourseErrors((current) => ({ ...current, previousCourseOther: undefined }));
                }}
                placeholder="e.g. Marine Biology"
                aria-invalid={Boolean(courseErrors.previousCourseOther)}
              />
              {courseErrors.previousCourseOther && (
                <p className="text-xs text-destructive">{courseErrors.previousCourseOther}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="apply-intended-course">What would you like to study abroad?</Label>
            <SearchableCombobox
              id="apply-intended-course"
              options={INTENDED_COURSE_OPTIONS}
              value={intendedCourseSelection}
              onValueChange={handleIntendedCourseChange}
              placeholder="Search or select a course…"
              searchPlaceholder="Search courses…"
              aria-invalid={Boolean(courseErrors.intendedCourse)}
            />
            {intendedCourseSelection === INTENDED_COURSE_SAME_AS_PREVIOUS && previousCourse && (
              <p className="text-xs text-muted-foreground">
                {previousCourse === COURSE_OPTION_OTHER && previousCourseOther.trim()
                  ? `We will use your previous field: ${previousCourseOther.trim()}`
                  : previousCourse !== COURSE_OPTION_OTHER
                    ? `We will use your previous field: ${previousCourse}`
                    : "Specify your previous course above to complete this selection."}
              </p>
            )}
            {courseErrors.intendedCourse && (
              <p className="text-xs text-destructive">{courseErrors.intendedCourse}</p>
            )}
          </div>

          {intendedCourseSelection === COURSE_OPTION_OTHER && (
            <div className="space-y-2">
              <Label htmlFor="apply-intended-course-other">Please specify the course you want to study</Label>
              <Input
                id="apply-intended-course-other"
                type="text"
                value={intendedCourseOther}
                onChange={(event) => {
                  setIntendedCourseOther(event.target.value);
                  setCourseErrors((current) => ({ ...current, intendedCourseOther: undefined }));
                }}
                placeholder="e.g. MSc Renewable Energy"
                aria-invalid={Boolean(courseErrors.intendedCourseOther)}
              />
              {courseErrors.intendedCourseOther && (
                <p className="text-xs text-destructive">{courseErrors.intendedCourseOther}</p>
              )}
            </div>
          )}

          <input type="hidden" name="previousCourse" value={previousCourse} />
          <input
            type="hidden"
            name="previousCourseOther"
            value={previousCourse === COURSE_OPTION_OTHER ? previousCourseOther.trim() : ""}
          />
          <input type="hidden" name="intendedCourse" value={submittedIntended.intendedCourse} />
          <input type="hidden" name="intendedCourseOther" value={submittedIntended.intendedCourseOther} />
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium leading-none">My passport is:</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {PASSPORT_STATUS_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2 rounded-md border border-input px-3 py-2.5 text-sm has-[:checked]:border-primary has-[:checked]:bg-muted/50"
              >
                <input
                  type="radio"
                  name="passport_status"
                  value={option.value}
                  required
                  className="h-4 w-4 border-input text-primary focus:ring-primary"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="apply-budget-currency">Budget currency</Label>
            <select id="apply-budget-currency" name="budget_currency" required className={selectClassName} defaultValue="">
              <option value="" disabled>
                Currency…
              </option>
              {BUDGET_CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="apply-budget-amount">Estimated budget</Label>
            <Input id="apply-budget-amount" name="budget_amount" type="number" min={0} step={1} required placeholder="e.g. 2500000" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground -mt-2">
          Your estimated total budget for tuition and living costs, in the currency you selected.
        </p>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium leading-none">Documents I already have (optional)</legend>
          <p className="text-xs text-muted-foreground">Tick any that apply — helps us advise you faster.</p>
          <div className="space-y-2">
            {DOCUMENTS_ON_HAND.map((doc) => (
              <label key={doc} className="flex items-start gap-3 text-sm leading-snug cursor-pointer">
                <input type="checkbox" name="documents_on_hand" value={doc} className={nativeCheckboxClassName} />
                <span>{doc}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="space-y-2">
          <Label htmlFor="apply-document-status">Document status</Label>
          <select id="apply-document-status" name="document_status" required className={selectClassName} defaultValue="">
            <option value="" disabled>
              How ready are your documents?…
            </option>
            {DOCUMENT_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-start gap-3 text-sm leading-snug cursor-pointer">
          <input type="checkbox" name="details_confirmed" value="yes" required className={nativeCheckboxClassName} />
          <span>
            I confirm the information above is accurate. I understand AspireGate will contact me about study abroad
            options.
          </span>
        </label>

        <Button type="submit" variant="cta" size="lg" className="w-full sm:w-auto">
          Submit application
        </Button>
      </form>
    </Card>
  );
}

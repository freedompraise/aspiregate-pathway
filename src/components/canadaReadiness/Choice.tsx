import { cn } from "@/lib/utils";

type ChoiceOption = { value: string; label: string; hint?: string };

export function Choice({
  legend,
  value,
  onChange,
  options,
  columns = 1,
}: {
  legend: string;
  value?: string;
  onChange: (value: string) => void;
  options: ChoiceOption[];
  columns?: 1 | 2;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="sr-only">{legend}</legend>
      <div className={cn("grid gap-2", columns === 2 && "sm:grid-cols-2")}>
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "cursor-pointer rounded-2xl border px-4 py-3 text-sm transition-smooth",
                selected
                  ? "border-primary bg-primary/5 shadow-card"
                  : "border-border/70 bg-card hover:border-primary/40",
              )}
            >
              <input
                type="radio"
                className="sr-only"
                checked={selected}
                onChange={() => onChange(option.value)}
              />
              <span className="block font-medium text-foreground">{option.label}</span>
              {option.hint && <span className="mt-1 block text-xs text-muted-foreground">{option.hint}</span>}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function MultiChoice({
  legend,
  values,
  onChange,
  options,
}: {
  legend: string;
  values: string[];
  onChange: (values: string[]) => void;
  options: ChoiceOption[];
}) {
  const toggle = (value: string) => {
    if (value === "none") {
      onChange(values.includes("none") ? [] : ["none"]);
      return;
    }
    const withoutNone = values.filter((item) => item !== "none");
    onChange(withoutNone.includes(value) ? withoutNone.filter((item) => item !== value) : [...withoutNone, value]);
  };

  return (
    <fieldset className="space-y-3">
      <legend className="sr-only">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = values.includes(option.value);
          return (
            <label
              key={option.value}
              className={cn(
                "cursor-pointer rounded-2xl border px-4 py-3 text-sm transition-smooth",
                selected
                  ? "border-primary bg-primary/5 shadow-card"
                  : "border-border/70 bg-card hover:border-primary/40",
              )}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={selected}
                onChange={() => toggle(option.value)}
              />
              <span className="font-medium text-foreground">{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

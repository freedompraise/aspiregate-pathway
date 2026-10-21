import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type ComboboxOption = string | { value: string; label: string };

function asOption(option: ComboboxOption): { value: string; label: string } {
  return typeof option === "string" ? { value: option, label: option } : option;
}

type SearchableComboboxProps = {
  id: string;
  options: readonly ComboboxOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  "aria-invalid"?: boolean;
  className?: string;
};

export function SearchableCombobox({
  id,
  options,
  value,
  onValueChange,
  placeholder = "Select an option…",
  searchPlaceholder = "Search…",
  emptyMessage = "No matches found.",
  disabled = false,
  "aria-invalid": ariaInvalid,
  className,
}: SearchableComboboxProps) {
  const [open, setOpen] = useState(false);
  const normalized = options.map(asOption);
  const selectedLabel = normalized.find((option) => option.value === value)?.label ?? value;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-invalid={ariaInvalid}
          disabled={disabled}
          className={cn(
            "h-10 w-full justify-between font-normal",
            !value && "text-muted-foreground",
            ariaInvalid && "border-destructive",
            className,
          )}
        >
          <span className="truncate">{selectedLabel || placeholder}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {normalized.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onValueChange(option.value);
                    setOpen(false);
                  }}
                  className="py-2.5"
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                  <span className="leading-snug">{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

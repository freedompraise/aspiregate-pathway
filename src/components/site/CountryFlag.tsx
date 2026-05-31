import { cn } from "@/lib/utils";
import { AE, AU, CA, DE, FR, GB, IE, US } from "country-flag-icons/react/3x2";
import type { ComponentType, SVGProps } from "react";

const flags = {
  AE,
  AU,
  CA,
  DE,
  FR,
  GB,
  IE,
  US,
} as const satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>;

export type CountryCode = keyof typeof flags;

type CountryFlagProps = {
  code: CountryCode;
  className?: string;
  title?: string;
};

export function CountryFlag({ code, className, title }: CountryFlagProps) {
  const Flag = flags[code];
  return (
    <Flag
      title={title}
      aria-hidden={title ? undefined : true}
      className={cn("rounded-sm shadow-sm", className)}
    />
  );
}

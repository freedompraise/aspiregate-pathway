import { Link, type LinkProps } from "react-router-dom";
import { SITE_CONFIG } from "@/lib/siteConfig";

/** Internal link to the Apply Now consultation form. */
export function ApplyNowLink({ children, ...props }: Omit<LinkProps, "to">) {
  return (
    <Link to={SITE_CONFIG.applyNowPath} {...props}>
      {children}
    </Link>
  );
}

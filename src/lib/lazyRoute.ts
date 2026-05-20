import type { ComponentType } from "react";

/**
 * Wraps a page lazy import so chunk-load failures surface clearly to the route error boundary.
 */
export function lazyPage(importer: () => Promise<{ default: ComponentType<object> }>) {
  return () =>
    importer()
      .then((m) => ({ Component: m.default }))
      .catch((error: unknown) => {
        if (error instanceof Error) throw error;
        throw new Error(
          typeof error === "string" ? error : "Failed to fetch dynamically imported module",
        );
      });
}

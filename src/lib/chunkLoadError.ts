/** Detect stale JS chunk failures after a new deployment (Vite / dynamic import). */
export function isChunkLoadError(error: unknown): boolean {
  if (error == null) return false;

  const message =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? error.message
        : typeof (error as { message?: unknown }).message === "string"
          ? (error as { message: string }).message
          : "";

  const normalized = message.toLowerCase();

  return (
    normalized.includes("failed to fetch dynamically imported module") ||
    normalized.includes("importing a module script failed") ||
    normalized.includes("error loading dynamically imported module") ||
    normalized.includes("failed to load module script") ||
    (typeof error === "object" &&
      error !== null &&
      "name" in error &&
      (error as { name: string }).name === "ChunkLoadError")
  );
}

/**
 * Blog CMS (Sanity) — read Vite env once. Pages should not branch on import.meta.env for CMS keys.
 */
const rawProjectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const rawDataset = import.meta.env.VITE_SANITY_DATASET;

export const sanityEnv = {
  projectId: typeof rawProjectId === "string" ? rawProjectId.trim() : "",
  dataset: typeof rawDataset === "string" ? rawDataset.trim() : "",
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION ?? "2024-05-01",
} as const;

export function isSanityConfigured(): boolean {
  return Boolean(sanityEnv.projectId && sanityEnv.dataset);
}

if (import.meta.env.DEV && !isSanityConfigured()) {
  console.warn(
    "[AspireGate Blog] Set VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET (see .env.example). Same values as your Sanity project / dataset.",
  );
}

import { createClient, type SanityClient } from "@sanity/client";
import { sanityEnv, isSanityConfigured } from "./sanityEnv";

function createSanityClient(): SanityClient {
  return createClient({
    projectId: sanityEnv.projectId || "",
    dataset: sanityEnv.dataset || "production",
    apiVersion: sanityEnv.apiVersion,
    useCdn: true,
  });
}

export const sanityClient = createSanityClient();

export { isSanityConfigured };

import imageUrlBuilder from "@sanity/image-url";

import { sanityClient } from "./sanityClient";
import type { SanityImageValue } from "@/types/blog";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageValue | null | undefined) {
  if (!source) return null;
  return builder.image(source);
}

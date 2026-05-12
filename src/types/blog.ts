import type { PortableTextBlock } from "@portabletext/types";

/** Sanity image reference / asset shape accepted by image-url builder */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SanityImageValue = any;

export interface BlogCategoryRef {
  title?: string;
  slug?: string | null;
  description?: string | null;
}

export interface BlogAuthorRef {
  name?: string;
  role?: string | null;
  image?: SanityImageValue | null;
}

export interface BlogPostCard {
  _id: string;
  title?: string;
  slug?: string | null;
  excerpt?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  featuredImage?: SanityImageValue | null;
  featuredImageAlt?: string | null;
  tags?: string[] | null;
  category?: BlogCategoryRef | null;
  author?: BlogAuthorRef | null;
}

export interface BlogPostDetail extends BlogPostCard {
  categoryRef?: string | null;
  body?: PortableTextBlock[] | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  focusKeyword?: string | null;
  ctaTitle?: string | null;
  ctaText?: string | null;
  ctaButtonText?: string | null;
  ctaButtonLink?: string | null;
}

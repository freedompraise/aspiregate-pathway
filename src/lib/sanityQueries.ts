/** Published posts visible on the marketing site */
export const publishedPostFilter = `_type == "blogPost" &&
  defined(slug.current) &&
  defined(publishedAt) &&
  publishedAt <= now()`;

const postCardFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  updatedAt,
  featuredImage,
  featuredImageAlt,
  tags,
  "category": category->{ title, "slug": slug.current },
  "author": author->{ name, role, image }
`;

export const allPublishedPostsQuery = `*[${publishedPostFilter}] | order(publishedAt desc) {
  ${postCardFields}
}`;

export const allCategoriesQuery = `*[_type == "category"] | order(title asc) {
  title,
  "slug": slug.current,
  description
}`;

export const postBySlugQuery = `*[${publishedPostFilter} && slug.current == $slug][0]{
  ${postCardFields},
  "categoryRef": category._ref,
  body,
  seoTitle,
  seoDescription,
  focusKeyword,
  ctaTitle,
  ctaText,
  ctaButtonText,
  ctaButtonLink
}`;

export const postsByCategorySlugQuery = `*[${publishedPostFilter} && category->slug.current == $categorySlug] | order(publishedAt desc) {
  ${postCardFields}
}`;

export const categoryBySlugQuery = `*[_type == "category" && slug.current == $categorySlug][0]{
  title,
  description,
  "slug": slug.current
}`;

export const relatedPostsQuery = `*[${publishedPostFilter} && slug.current != $slug && category._ref == $categoryRef] | order(publishedAt desc)[0...3] {
  ${postCardFields}
}`;

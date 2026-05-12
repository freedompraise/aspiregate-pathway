import { Helmet } from "react-helmet-async";

const siteUrl = "https://aspiregateservices.com";

export function BlogSeo({
  title,
  description,
  path,
  ogImageUrl,
  ogType = "website",
}: {
  title: string;
  description: string;
  path?: string;
  ogImageUrl?: string | null;
  ogType?: "website" | "article";
}) {
  const canonical = siteUrl && path ? `${siteUrl}${path}` : undefined;

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      {ogImageUrl ? <meta property="og:image" content={ogImageUrl} /> : null}
    </Helmet>
  );
}

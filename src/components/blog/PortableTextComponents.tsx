import { PortableText, mergeComponents, defaultComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { urlFor } from "@/lib/sanityImage";

const portableTextComponents = mergeComponents(defaultComponents, {
  block: {
    h2: ({ value, children }) => (
      <h2
        id={`h-${value._key}`}
        className="scroll-mt-28 mt-10 mb-4 text-2xl font-bold tracking-tight text-primary md:text-3xl"
      >
        {children}
      </h2>
    ),
    h3: ({ value, children }) => (
      <h3 id={`h-${value._key}`} className="scroll-mt-28 mt-8 mb-3 text-xl font-semibold text-primary">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 my-6 italic text-muted-foreground">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href?.trim() || "#";
      const external = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          className="font-medium text-accent underline-offset-4 hover:underline"
          {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const img = urlFor(value)?.width(900).quality(85).auto("format").url();
      if (!img) return null;
      return (
        <figure className="my-8">
          <img
            src={img}
            alt={typeof value.alt === "string" ? value.alt : ""}
            className="w-full rounded-2xl border border-border/60 shadow-card"
            loading="lazy"
          />
          {typeof value.caption === "string" && value.caption ? (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">{value.caption}</figcaption>
          ) : null}
        </figure>
      );
    },
  },
});

interface BlogPortableTextProps {
  value: PortableTextBlock[] | null | undefined;
}

export function BlogPortableText({ value }: BlogPortableTextProps) {
  if (!value?.length) return null;
  return <PortableText value={value} components={portableTextComponents} />;
}

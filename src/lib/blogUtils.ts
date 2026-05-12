import type { PortableTextBlock } from "@portabletext/types";

function plainTextFromSpans(block: PortableTextBlock): string {
  if (!block.children || !Array.isArray(block.children)) return "";
  return block.children
    .map((c) => (typeof (c as { text?: string }).text === "string" ? (c as { text?: string }).text : ""))
    .join("");
}

export function plainTextFromPortableText(blocks: unknown[] | undefined): string {
  if (!blocks?.length) return "";
  return blocks
    .map((block) => {
      if (!block || typeof block !== "object") return "";
      const b = block as PortableTextBlock & { _type?: string };
      if (b._type !== "block") return "";
      return plainTextFromSpans(b);
    })
    .join(" ")
    .trim();
}

export function estimateReadingMinutes(body: unknown[] | undefined): number {
  const words = plainTextFromPortableText(body).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export type TocEntry = { id: string; text: string; level: 2 | 3 };

export function extractTocFromPortableText(blocks: unknown[] | undefined): TocEntry[] {
  if (!blocks?.length) return [];
  const out: TocEntry[] = [];
  for (const block of blocks) {
    if (!block || typeof block !== "object") continue;
    const b = block as PortableTextBlock & { style?: string };
    if (b._type !== "block") continue;
    if (b.style !== "h2" && b.style !== "h3") continue;
    const text = plainTextFromSpans(b).trim();
    if (!text) continue;
    out.push({ id: `h-${b._key}`, text, level: b.style === "h2" ? 2 : 3 });
  }
  return out;
}

/** Split body for a mid-article CTA: after first H2, or after the first few blocks. */
export function splitBodyForMidCta(blocks: PortableTextBlock[] | undefined): [PortableTextBlock[], PortableTextBlock[]] {
  if (!blocks?.length) return [[], []];
  const firstH2 = blocks.findIndex((b) => b._type === "block" && (b as { style?: string }).style === "h2");
  let splitAt: number;
  if (firstH2 !== -1) splitAt = firstH2 + 1;
  else splitAt = Math.min(4, blocks.length);
  return [blocks.slice(0, splitAt), blocks.slice(splitAt)];
}

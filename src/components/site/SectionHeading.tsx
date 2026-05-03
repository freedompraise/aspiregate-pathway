const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) => (
  <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} mb-12`}>
    {eyebrow && (
      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-3">
        {eyebrow}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">{title}</h2>
    {description && <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{description}</p>}
  </div>
);

export default SectionHeading;
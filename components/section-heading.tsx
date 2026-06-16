import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  kicker?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({ kicker, title, description, className, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {kicker ? <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-parchment-600">{kicker}</p> : null}
      <h2 className="font-display text-3xl font-bold leading-tight text-temple-900 md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-700 md:text-lg">{description}</p> : null}
    </div>
  );
}


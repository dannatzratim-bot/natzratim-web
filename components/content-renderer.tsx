import Link from "next/link";
import type { ContentBlock } from "@/types/content";
import { cn } from "@/lib/utils";

type ContentRendererProps = {
  blocks: ContentBlock[];
};

export function ContentRenderer({ blocks }: ContentRendererProps) {
  if (!blocks.length) {
    return <p className="text-slate-700">No hay contenido disponible.</p>;
  }

  return (
    <div className="space-y-6">
      {blocks.map((block) => {
        if (block.type === "heading") {
          const Tag = `h${block.level}` as "h1" | "h2" | "h3" | "h4";
          return (
            <Tag key={block.id} className={cn("font-display font-bold text-temple-900", block.level === 1 && "text-3xl", block.level === 2 && "text-2xl", block.level === 3 && "text-xl", block.level === 4 && "text-lg")}>
              {block.text}
            </Tag>
          );
        }
        if (block.type === "paragraph") {
          return (
            <p key={block.id} className="text-[1.05rem] leading-8 text-slate-700">
              {block.text}
            </p>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={block.id} className="list-disc space-y-2 pl-6 text-slate-700">
              {block.items.map((item, index) => (
                <li key={`${block.id}-${index}`}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote key={block.id} className="rounded-2xl border-l-4 border-parchment-400 bg-parchment-50 p-5 italic text-temple-800">
              <p className="text-lg leading-8">{block.text}</p>
              {block.cite ? <footer className="mt-3 text-sm not-italic text-slate-500">{block.cite}</footer> : null}
            </blockquote>
          );
        }
        if (block.type === "verse") {
          return (
            <div key={block.id} className="rounded-2xl border border-temple-200 bg-temple-50 p-5 text-center">
              <p className="font-display text-2xl text-temple-900">{block.text}</p>
              {block.reference ? <p className="mt-2 text-sm tracking-[0.2em] text-temple-700">{block.reference}</p> : null}
            </div>
          );
        }
        if (block.type === "highlight") {
          return (
            <div key={block.id} className="rounded-2xl bg-temple-900 p-5 text-parchment-50 shadow-glow">
              <p className="text-base leading-7">{block.text}</p>
            </div>
          );
        }
        if (block.type === "image") {
          return (
            <figure key={block.id} className="overflow-hidden rounded-3xl border border-parchment-200 bg-white shadow-sm">
              <img src={block.src} alt={block.alt} className="h-80 w-full object-cover" />
              {block.caption ? <figcaption className="px-4 py-3 text-sm text-slate-500">{block.caption}</figcaption> : null}
            </figure>
          );
        }
        if (block.type === "link") {
          return (
            <p key={block.id} className="text-slate-700">
              <Link href={block.href} className="font-semibold text-temple-700 underline decoration-parchment-400 underline-offset-4">
                {block.text}
              </Link>
            </p>
          );
        }
        return <hr key={block.id} className="border-parchment-200" />;
      })}
    </div>
  );
}

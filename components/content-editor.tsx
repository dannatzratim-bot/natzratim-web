"use client";

import { useEffect, useMemo, useState } from "react";
import type { ContentBlock, ContentHeadingLevel } from "@/types/content";

type ContentEditorProps = {
  name: string;
  initialValue?: ContentBlock[];
};

const blockLabel: Record<ContentBlock["type"], string> = {
  heading: "Encabezado",
  paragraph: "Párrafo",
  list: "Lista",
  quote: "Cita",
  verse: "Versículo",
  highlight: "Destacado",
  image: "Imagen",
  link: "Enlace",
  separator: "Separador",
};

function createBlock(type: ContentBlock["type"]): ContentBlock {
  const id = `block-${Math.random().toString(36).slice(2, 10)}`;
  if (type === "heading") return { id, type, level: 2, text: "Nuevo encabezado" };
  if (type === "paragraph") return { id, type, text: "Escribe aquí el contenido..." };
  if (type === "list") return { id, type, items: ["Elemento 1", "Elemento 2"] };
  if (type === "quote") return { id, type, text: "Cita destacada", cite: "Referencia" };
  if (type === "verse") return { id, type, text: "Texto hebreo o cita", reference: "Referencia" };
  if (type === "highlight") return { id, type, text: "Bloque destacado" };
  if (type === "image") return { id, type, src: "/brand/natzratim-logo.jpg", alt: "Imagen descriptiva", caption: "Pie de foto" };
  if (type === "link") return { id, type, text: "Enlace", href: "https://example.com" };
  return { id, type };
}

export function ContentEditor({ name, initialValue = [] }: ContentEditorProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(initialValue);
  const serialized = useMemo(() => JSON.stringify(blocks), [blocks]);

  useEffect(() => {
    setBlocks(initialValue);
  }, [initialValue]);

  return (
    <div className="space-y-4">
      <input type="hidden" name={name} value={serialized} readOnly />
      <div className="flex flex-wrap gap-2 rounded-2xl border border-parchment-200 bg-parchment-50 p-3">
        {(Object.keys(blockLabel) as Array<ContentBlock["type"]>).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setBlocks((current) => [...current, createBlock(type)])}
            className="rounded-full border border-parchment-300 bg-white px-3 py-2 text-xs font-semibold text-temple-900 transition-colors hover:bg-parchment-100"
          >
            + {blockLabel[type]}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {blocks.length ? (
          blocks.map((block, index) => (
            <EditorBlock
              key={block.id}
              block={block}
              onChange={(next) => setBlocks((current) => current.map((item) => (item.id === block.id ? next : item)))}
              onRemove={() => setBlocks((current) => current.filter((item) => item.id !== block.id))}
              onMoveUp={() =>
                setBlocks((current) => {
                  if (index === 0) return current;
                  const copy = [...current];
                  [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
                  return copy;
                })
              }
              onMoveDown={() =>
                setBlocks((current) => {
                  if (index === current.length - 1) return current;
                  const copy = [...current];
                  [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]];
                  return copy;
                })
              }
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-parchment-300 bg-white p-8 text-center text-sm text-slate-500">
            Agrega bloques para construir el contenido.
          </div>
        )}
      </div>
    </div>
  );
}

function EditorBlock({
  block,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  block: ContentBlock;
  onChange: (value: ContentBlock) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  return (
    <div className="rounded-3xl border border-parchment-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-parchment-600">{blockLabel[block.type]}</p>
        <div className="flex gap-2">
          <button type="button" onClick={onMoveUp} className="rounded-full border border-parchment-300 px-3 py-1.5 text-xs font-semibold text-temple-900">
            Subir
          </button>
          <button type="button" onClick={onMoveDown} className="rounded-full border border-parchment-300 px-3 py-1.5 text-xs font-semibold text-temple-900">
            Bajar
          </button>
          <button type="button" onClick={onRemove} className="rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700">
            Eliminar
          </button>
        </div>
      </div>
      {block.type === "heading" ? (
        <div className="grid gap-3 md:grid-cols-[120px_1fr]">
          <select
            value={block.level}
            onChange={(event) => onChange({ ...block, level: Number(event.target.value) as ContentHeadingLevel })}
            className="rounded-2xl border border-parchment-200 bg-parchment-50 px-4 py-3 text-sm"
          >
            <option value={1}>H1</option>
            <option value={2}>H2</option>
            <option value={3}>H3</option>
            <option value={4}>H4</option>
          </select>
          <input
            value={block.text}
            onChange={(event) => onChange({ ...block, text: event.target.value })}
            className="rounded-2xl border border-parchment-200 px-4 py-3 text-sm"
            placeholder="Texto del encabezado"
          />
        </div>
      ) : null}
      {block.type === "paragraph" || block.type === "highlight" || block.type === "quote" || block.type === "verse" ? (
        <div className="space-y-3">
          <textarea
            rows={4}
            value={block.text}
            onChange={(event) => onChange({ ...block, text: event.target.value })}
            className="w-full rounded-2xl border border-parchment-200 px-4 py-3 text-sm"
            placeholder="Texto"
          />
          {"cite" in block ? (
            <input
              value={block.cite ?? ""}
              onChange={(event) => onChange({ ...block, cite: event.target.value })}
              className="w-full rounded-2xl border border-parchment-200 px-4 py-3 text-sm"
              placeholder="Referencia o cita"
            />
          ) : null}
          {"reference" in block ? (
            <input
              value={block.reference ?? ""}
              onChange={(event) => onChange({ ...block, reference: event.target.value })}
              className="w-full rounded-2xl border border-parchment-200 px-4 py-3 text-sm"
              placeholder="Referencia bíblica"
            />
          ) : null}
        </div>
      ) : null}
      {block.type === "list" ? (
        <textarea
          rows={4}
          value={block.items.join("\n")}
          onChange={(event) => onChange({ ...block, items: event.target.value.split("\n").filter(Boolean) })}
          className="w-full rounded-2xl border border-parchment-200 px-4 py-3 text-sm"
          placeholder="Un elemento por línea"
        />
      ) : null}
      {block.type === "image" ? (
        <div className="grid gap-3 md:grid-cols-2">
          <input
            value={block.src}
            onChange={(event) => onChange({ ...block, src: event.target.value })}
            className="rounded-2xl border border-parchment-200 px-4 py-3 text-sm"
            placeholder="URL de la imagen"
          />
          <input
            value={block.alt}
            onChange={(event) => onChange({ ...block, alt: event.target.value })}
            className="rounded-2xl border border-parchment-200 px-4 py-3 text-sm"
            placeholder="Texto alternativo"
          />
          <input
            value={block.caption ?? ""}
            onChange={(event) => onChange({ ...block, caption: event.target.value })}
            className="md:col-span-2 rounded-2xl border border-parchment-200 px-4 py-3 text-sm"
            placeholder="Pie de foto"
          />
        </div>
      ) : null}
      {block.type === "link" ? (
        <div className="grid gap-3 md:grid-cols-2">
          <input
            value={block.text}
            onChange={(event) => onChange({ ...block, text: event.target.value })}
            className="rounded-2xl border border-parchment-200 px-4 py-3 text-sm"
            placeholder="Texto del enlace"
          />
          <input
            value={block.href}
            onChange={(event) => onChange({ ...block, href: event.target.value })}
            className="rounded-2xl border border-parchment-200 px-4 py-3 text-sm"
            placeholder="https://"
          />
        </div>
      ) : null}
      {block.type === "separator" ? <div className="py-3 text-center text-xs tracking-[0.3em] text-parchment-500">Separador visual</div> : null}
    </div>
  );
}

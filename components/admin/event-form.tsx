import type { EventRecord } from "@/types/content";
import { Card } from "@/components/card";
import { ContentEditor } from "@/components/content-editor";
import { slugify } from "@/lib/utils";

export function EventForm({
  event,
  action,
}: {
  event: EventRecord | null;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <Card>
      <form action={action} className="space-y-6">
        <input type="hidden" name="id" value={event?.id ?? ""} />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Título" name="title" defaultValue={event?.title ?? ""} required />
          <Field label="Slug" name="slug" defaultValue={event?.slug ?? ""} placeholder={slugify(event?.title ?? "nuevo-evento")} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Extracto" name="excerpt" defaultValue={event?.excerpt ?? ""} as="textarea" rows={4} required />
          <Field label="Categoría" name="category" defaultValue={event?.category ?? ""} placeholder="Festividad, Estudio, Anuncio..." required />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <Field label="Fecha" name="event_date" defaultValue={event?.event_date.slice(0, 10) ?? ""} required />
          <Field label="Hora inicio" name="start_time" defaultValue={event?.start_time ?? ""} placeholder="18:30" />
          <Field label="Hora fin" name="end_time" defaultValue={event?.end_time ?? ""} placeholder="20:30" />
          <Field label="Lugar" name="location" defaultValue={event?.location ?? ""} />
        </div>
        <Field label="Etiqueta del lugar" name="location_label" defaultValue={event?.location_label ?? ""} />
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-temple-900">Estado</span>
            <select name="published" defaultValue={event?.published ? "published" : "draft"} className="w-full rounded-2xl border border-parchment-200 bg-white px-4 py-3 text-sm">
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </label>
          <Field label="SEO título" name="seo_title" defaultValue={event?.seo_title ?? ""} />
          <Field label="SEO descripción" name="seo_description" defaultValue={event?.seo_description ?? ""} />
        </div>
        <div className="space-y-2">
          <span className="text-sm font-semibold text-temple-900">Contenido</span>
          <ContentEditor name="content" initialValue={event?.content ?? []} />
        </div>
        <button className="rounded-full bg-temple-900 px-6 py-3 text-sm font-semibold text-white shadow-shrine">
          {event ? "Guardar cambios" : "Crear evento"}
        </button>
      </form>
    </Card>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  placeholder,
  as = "input",
  rows,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  as?: "input" | "textarea";
  rows?: number;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-semibold text-temple-900">{label}</span>
      {as === "textarea" ? (
        <textarea name={name} defaultValue={defaultValue} required={required} rows={rows ?? 4} placeholder={placeholder} className="w-full rounded-2xl border border-parchment-200 px-4 py-3 text-sm" />
      ) : (
        <input name={name} defaultValue={defaultValue} required={required} placeholder={placeholder} className="w-full rounded-2xl border border-parchment-200 px-4 py-3 text-sm" />
      )}
    </label>
  );
}


import type { VideoCategory, VideoRecord } from "@/types/content";
import { Card } from "@/components/card";
import { ContentEditor } from "@/components/content-editor";
import { youtubeIdFromUrl } from "@/lib/format";
import { slugify } from "@/lib/utils";

export function VideoForm({
  video,
  categories,
  action,
}: {
  video: VideoRecord | null;
  categories: VideoCategory[];
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <Card>
      <form action={action} className="space-y-6">
        <input type="hidden" name="id" value={video?.id ?? ""} />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Título" name="title" defaultValue={video?.title ?? ""} required />
          <Field label="Slug" name="slug" defaultValue={video?.slug ?? ""} placeholder={slugify(video?.title ?? "nuevo-video")} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="URL de YouTube" name="youtube_url" defaultValue={video?.youtube_url ?? ""} required />
          <Field label="ID de YouTube" name="youtube_id" defaultValue={video?.youtube_id ?? ""} placeholder={youtubeIdFromUrl(video?.youtube_url ?? "")} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Extracto" name="excerpt" defaultValue={video?.excerpt ?? ""} as="textarea" rows={4} required />
          <Field label="Miniatura" name="thumbnail_url" defaultValue={video?.thumbnail_url ?? ""} />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-temple-900">Categoría</span>
            <select name="category_id" defaultValue={video?.category_id ?? ""} className="w-full rounded-2xl border border-parchment-200 bg-white px-4 py-3 text-sm">
              <option value="">Sin categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-temple-900">Estado</span>
            <select name="published" defaultValue={video?.published ? "published" : "draft"} className="w-full rounded-2xl border border-parchment-200 bg-white px-4 py-3 text-sm">
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </label>
          <Field label="SEO título" name="seo_title" defaultValue={video?.seo_title ?? ""} />
        </div>
        <Field label="SEO descripción" name="seo_description" defaultValue={video?.seo_description ?? ""} />
        <div className="space-y-2">
          <span className="text-sm font-semibold text-temple-900">Notas / contenido</span>
          <ContentEditor name="content" initialValue={video?.content ?? []} />
        </div>
        <button className="rounded-full bg-temple-900 px-6 py-3 text-sm font-semibold text-white shadow-shrine">
          {video ? "Guardar cambios" : "Crear video"}
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


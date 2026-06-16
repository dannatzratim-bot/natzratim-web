import type { ArticleCategory, ArticleRecord } from "@/types/content";
import { ContentEditor } from "@/components/content-editor";
import { Card } from "@/components/card";
import { slugify } from "@/lib/utils";

export function ArticleForm({
  article,
  categories,
  action,
}: {
  article: ArticleRecord | null;
  categories: ArticleCategory[];
  action: (formData: FormData) => Promise<void>;
}) {
  const isNew = !article;

  return (
    <Card>
      <form action={action} className="space-y-6">
        <input type="hidden" name="id" value={article?.id ?? ""} />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Título" name="title" defaultValue={article?.title ?? ""} required />
          <Field label="Slug" name="slug" defaultValue={article?.slug ?? ""} placeholder={slugify(article?.title ?? "nuevo-articulo")} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Extracto" name="excerpt" defaultValue={article?.excerpt ?? ""} as="textarea" rows={4} required />
          <Field label="Autor" name="author_name" defaultValue={article?.author_name ?? ""} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Imagen destacada" name="featured_image_url" defaultValue={article?.featured_image_url ?? ""} />
          <Field label="Texto alternativo" name="featured_image_alt" defaultValue={article?.featured_image_alt ?? ""} />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-temple-900">Categoría</span>
            <select name="category_id" defaultValue={article?.category_id ?? ""} className="w-full rounded-2xl border border-parchment-200 bg-white px-4 py-3 text-sm">
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
            <select name="published" defaultValue={article?.published ? "published" : "draft"} className="w-full rounded-2xl border border-parchment-200 bg-white px-4 py-3 text-sm">
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </label>
          <Field label="Minutos de lectura" name="reading_time_minutes" defaultValue={article?.reading_time_minutes?.toString() ?? ""} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="SEO título" name="seo_title" defaultValue={article?.seo_title ?? ""} />
          <Field label="SEO descripción" name="seo_description" defaultValue={article?.seo_description ?? ""} />
        </div>
        <div className="space-y-2">
          <span className="text-sm font-semibold text-temple-900">Contenido</span>
          <ContentEditor name="content" initialValue={article?.content ?? []} />
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-full bg-temple-900 px-6 py-3 text-sm font-semibold text-white shadow-shrine">
            {isNew ? "Crear artículo" : "Guardar cambios"}
          </button>
        </div>
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
        <textarea
          name={name}
          defaultValue={defaultValue}
          required={required}
          rows={rows ?? 4}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-parchment-200 px-4 py-3 text-sm"
        />
      ) : (
        <input
          name={name}
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-parchment-200 px-4 py-3 text-sm"
        />
      )}
    </label>
  );
}


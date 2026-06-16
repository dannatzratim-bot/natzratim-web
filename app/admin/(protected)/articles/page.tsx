import Link from "next/link";
import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";
import { deleteArticleAction, toggleArticlePublishAction } from "@/app/admin/(protected)/articles/actions";
import { listArticles } from "@/lib/data";
import { formatDate } from "@/lib/format";

export default async function ArticlesAdminPage() {
  const articles = await listArticles({ includeDrafts: true });

  return (
    <div className="space-y-6">
      <SectionHeading kicker="Artículos" title="Gestión de publicaciones" description="Crear, editar, publicar y eliminar artículos." />
      <div className="flex justify-end">
        <Link href="/admin/articles/nuevo" className="rounded-full bg-temple-900 px-5 py-3 text-sm font-semibold text-white shadow-shrine">
          Nuevo artículo
        </Link>
      </div>
      <Card className="overflow-x-auto p-0">
        <table className="min-w-full divide-y divide-parchment-200 text-sm">
          <thead className="bg-parchment-50 text-left text-xs uppercase tracking-[0.22em] text-parchment-600">
            <tr>
              <th className="px-5 py-4">Título</th>
              <th className="px-5 py-4">Categoría</th>
              <th className="px-5 py-4">Estado</th>
              <th className="px-5 py-4">Fecha</th>
              <th className="px-5 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-parchment-200 bg-white">
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="px-5 py-4">
                  <div className="font-semibold text-temple-900">{article.title}</div>
                  <div className="text-xs text-slate-500">{article.slug}</div>
                </td>
                <td className="px-5 py-4 text-slate-700">{article.category?.name ?? "Sin categoría"}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${article.published ? "bg-emerald-100 text-emerald-700" : "bg-parchment-100 text-parchment-700"}`}>
                    {article.published ? "Publicado" : "Borrador"}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-700">{formatDate(article.published_at)}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/articles/${article.id}`} className="rounded-full border border-parchment-300 px-3 py-2 text-xs font-semibold text-temple-900">
                      Editar
                    </Link>
                    <form action={toggleArticlePublishAction}>
                      <input type="hidden" name="id" value={article.id} />
                      <input type="hidden" name="published" value={String(article.published)} />
                      <button className="rounded-full border border-parchment-300 px-3 py-2 text-xs font-semibold text-temple-900">
                        {article.published ? "Despublicar" : "Publicar"}
                      </button>
                    </form>
                    <form action={deleteArticleAction}>
                      <input type="hidden" name="id" value={article.id} />
                      <button className="rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700">
                        Eliminar
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

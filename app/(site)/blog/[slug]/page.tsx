import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/card";
import { ContentRenderer } from "@/components/content-renderer";
import { getArticleBySlug, listArticles } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { siteUrl } from "@/lib/config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Artículo no encontrado" };
  return {
    title: article.seo_title ?? article.title,
    description: article.seo_description ?? article.excerpt,
    openGraph: {
      title: article.seo_title ?? article.title,
      description: article.seo_description ?? article.excerpt,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = (await listArticles({ categorySlug: article.category?.slug, limit: 3 })).filter((item) => item.slug !== article.slug);
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(`${article.title} - ${article.excerpt}`)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${siteUrl}/blog/${article.slug}`)}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <article className="space-y-8">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-parchment-600">{article.category?.name ?? "Blog"}</p>
            <h1 className="font-display text-4xl font-bold leading-tight text-temple-900 md:text-5xl">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span>{article.author_name}</span>
              <span>{formatDate(article.published_at)}</span>
              {article.reading_time_minutes ? <span>{article.reading_time_minutes} min de lectura</span> : null}
            </div>
          </div>
          <Card className="overflow-hidden p-0">
            {article.featured_image_url ? (
              <img src={article.featured_image_url} alt={article.featured_image_alt ?? article.title} className="h-96 w-full object-cover" />
            ) : (
              <div className="flex h-64 items-center justify-center bg-temple-50 text-temple-700">Sin imagen destacada</div>
            )}
            <div className="p-6 md:p-8">
              <ContentRenderer blocks={article.content} />
            </div>
          </Card>
          <div className="flex flex-wrap gap-3">
            <a href={shareUrl} className="inline-flex items-center justify-center rounded-full border border-parchment-300 bg-white px-5 py-3 text-sm font-semibold text-temple-900 transition-colors hover:bg-parchment-100">
              Compartir en WhatsApp
            </a>
            <a href={facebookUrl} className="inline-flex items-center justify-center rounded-full border border-parchment-300 bg-white px-5 py-3 text-sm font-semibold text-temple-900 transition-colors hover:bg-parchment-100">
              Compartir en Facebook
            </a>
          </div>
        </article>
        <aside className="space-y-6">
          <Card>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-parchment-600">Artículos relacionados</p>
            <div className="mt-4 space-y-4">
              {related.map((item) => (
                <Link key={item.id} href={`/blog/${item.slug}`} className="block rounded-2xl border border-parchment-200 p-4 transition-colors hover:bg-parchment-50">
                  <h3 className="font-display text-lg font-semibold text-temple-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

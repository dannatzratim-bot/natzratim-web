import Link from "next/link";
import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";
import { LinkButton } from "@/components/button";
import { IconArrowRight, IconBook, IconSearch } from "@/components/icons";
import { getArticleCategories, listArticles } from "@/lib/data";
import { formatDate } from "@/lib/format";

type BlogPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

export async function generateMetadata({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  return {
    title: params.q ? `Blog - ${params.q}` : "Blog",
    description: "Publicaciones, estudios y reflexiones de la Comunidad Natzratim.",
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const [categories, articles] = await Promise.all([
    getArticleCategories(),
    listArticles({ search: params.q, categorySlug: params.category }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        kicker="Blog"
        title="Publicaciones y estudios"
        description="Explora artículos por categoría, autor y fecha."
      />

      <form className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto]">
        <label className="relative block">
          <span className="sr-only">Buscar</span>
          <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            name="q"
            defaultValue={params.q}
            placeholder="Buscar artículos"
            className="w-full rounded-full border border-parchment-300 bg-white/90 py-3 pl-12 pr-4 text-sm shadow-sm focus:border-temple-400 focus:outline-none focus:ring-2 focus:ring-temple-500/20"
          />
        </label>
        <button className="rounded-full bg-temple-900 px-5 py-3 text-sm font-semibold text-white shadow-shrine">Buscar</button>
      </form>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/blog"
          className="rounded-full border border-parchment-300 bg-white px-4 py-2 text-sm font-semibold text-temple-900"
        >
          Todas
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/blog?category=${category.slug}`}
            className="rounded-full border border-parchment-300 bg-white px-4 py-2 text-sm font-semibold text-temple-900"
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id} className="flex h-full flex-col">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-parchment-600">
              <IconBook className="h-4 w-4" />
              {article.category?.name ?? "Blog"}
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-temple-900">{article.title}</h3>
            <p className="mt-3 max-h-24 overflow-hidden text-sm leading-7 text-slate-700">{article.excerpt}</p>
            <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-500">
              <span>{article.author_name}</span>
              <span>{formatDate(article.published_at)}</span>
            </div>
            <div className="mt-auto pt-5">
              <LinkButton href={`/blog/${article.slug}`} variant="secondary">
                Leer artículo
                <IconArrowRight className="h-4 w-4" />
              </LinkButton>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

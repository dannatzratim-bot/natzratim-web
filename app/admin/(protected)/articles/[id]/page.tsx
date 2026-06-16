import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/section-heading";
import { ArticleForm } from "@/components/admin/article-form";
import { getArticleById, getArticleCategories } from "@/lib/data";
import { saveArticleAction } from "@/app/admin/(protected)/articles/actions";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  if (id === "nuevo") return { title: "Nuevo artículo" };
  const article = await getArticleById(id);
  if (!article) return { title: "Editar artículo" };
  return { title: `Editar: ${article.title}` };
}

export default async function ArticleEditorPage({ params }: PageProps) {
  const { id } = await params;
  const [categories, article] = await Promise.all([
    getArticleCategories(),
    id === "nuevo" ? Promise.resolve(null) : getArticleById(id),
  ]);

  if (id !== "nuevo" && !article) notFound();

  return (
    <div className="space-y-6">
      <SectionHeading kicker="Editor" title={id === "nuevo" ? "Crear artículo" : "Editar artículo"} description="Texto, bloques, metadatos y estado de publicación." />
      <ArticleForm article={article} categories={categories} action={saveArticleAction} />
    </div>
  );
}


"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function saveArticleAction(formData: FormData) {
  const session = await requireAdmin();
  if (!session.isAuthorized || !session.profile) redirect("/admin/login");

  const id = String(formData.get("id") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || slugify(title);
  const excerpt = String(formData.get("excerpt") || "").trim();
  const authorName = String(formData.get("author_name") || session.profile.full_name || "Administración Natzratim").trim();
  const featuredImageUrl = String(formData.get("featured_image_url") || "").trim() || null;
  const featuredImageAlt = String(formData.get("featured_image_alt") || "").trim() || null;
  const categoryId = String(formData.get("category_id") || "").trim() || null;
  const status = String(formData.get("published") || "draft");
  const published = status === "published";
  const readingTime = Number(String(formData.get("reading_time_minutes") || "").trim() || "0") || null;
  const seoTitle = String(formData.get("seo_title") || "").trim() || null;
  const seoDescription = String(formData.get("seo_description") || "").trim() || null;
  const content = JSON.parse(String(formData.get("content") || "[]"));
  const supabase = createSupabaseAdminClient();
  const payload = {
    title,
    slug,
    excerpt,
    content,
    author_name: authorName,
    author_id: session.profile.id,
    category_id: categoryId,
    featured_image_url: featuredImageUrl,
    featured_image_alt: featuredImageAlt,
    published,
    published_at: published ? new Date().toISOString() : null,
    seo_title: seoTitle,
    seo_description: seoDescription,
    reading_time_minutes: readingTime,
  };

  if (id) {
    await supabase.from("articles").update(payload).eq("id", id);
  } else {
    await supabase.from("articles").insert(payload);
  }

  revalidatePath("/admin/articles");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/articles");
}

export async function deleteArticleAction(formData: FormData) {
  const session = await requireAdmin();
  if (!session.isAuthorized) redirect("/admin/login");
  const id = String(formData.get("id") || "").trim();
  const supabase = createSupabaseAdminClient();
  await supabase.from("articles").delete().eq("id", id);
  revalidatePath("/admin/articles");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/articles");
}

export async function toggleArticlePublishAction(formData: FormData) {
  const session = await requireAdmin();
  if (!session.isAuthorized) redirect("/admin/login");
  const id = String(formData.get("id") || "").trim();
  const published = String(formData.get("published") || "false") === "true";
  const supabase = createSupabaseAdminClient();
  await supabase
    .from("articles")
    .update({ published: !published, published_at: !published ? new Date().toISOString() : null })
    .eq("id", id);
  revalidatePath("/admin/articles");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/articles");
}

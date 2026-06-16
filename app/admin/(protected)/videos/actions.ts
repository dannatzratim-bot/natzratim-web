"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { youtubeIdFromUrl } from "@/lib/format";

export async function saveVideoAction(formData: FormData) {
  const session = await requireAdmin();
  if (!session.isAuthorized || !session.profile) redirect("/admin/login");

  const id = String(formData.get("id") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || slugify(title);
  const excerpt = String(formData.get("excerpt") || "").trim();
  const youtubeUrl = String(formData.get("youtube_url") || "").trim();
  const youtubeId = String(formData.get("youtube_id") || "").trim() || youtubeIdFromUrl(youtubeUrl);
  const thumbnailUrl = String(formData.get("thumbnail_url") || "").trim() || null;
  const categoryId = String(formData.get("category_id") || "").trim() || null;
  const status = String(formData.get("published") || "draft");
  const published = status === "published";
  const seoTitle = String(formData.get("seo_title") || "").trim() || null;
  const seoDescription = String(formData.get("seo_description") || "").trim() || null;
  const content = JSON.parse(String(formData.get("content") || "[]"));
  const supabase = createSupabaseAdminClient();
  const payload = {
    title,
    slug,
    excerpt,
    youtube_url: youtubeUrl,
    youtube_id: youtubeId,
    thumbnail_url: thumbnailUrl,
    category_id: categoryId,
    published,
    published_at: published ? new Date().toISOString() : null,
    seo_title: seoTitle,
    seo_description: seoDescription,
    content,
  };

  if (id) await supabase.from("videos").update(payload).eq("id", id);
  else await supabase.from("videos").insert(payload);

  revalidatePath("/admin/videos");
  revalidatePath("/videos");
  revalidatePath("/");
  redirect("/admin/videos");
}

export async function deleteVideoAction(formData: FormData) {
  const session = await requireAdmin();
  if (!session.isAuthorized) redirect("/admin/login");
  const id = String(formData.get("id") || "").trim();
  const supabase = createSupabaseAdminClient();
  await supabase.from("videos").delete().eq("id", id);
  revalidatePath("/admin/videos");
  revalidatePath("/videos");
  revalidatePath("/");
  redirect("/admin/videos");
}

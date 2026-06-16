"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function saveEventAction(formData: FormData) {
  const session = await requireAdmin();
  if (!session.isAuthorized || !session.profile) redirect("/admin/login");

  const id = String(formData.get("id") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || slugify(title);
  const excerpt = String(formData.get("excerpt") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const eventDate = String(formData.get("event_date") || "").trim();
  const startTime = String(formData.get("start_time") || "").trim() || null;
  const endTime = String(formData.get("end_time") || "").trim() || null;
  const location = String(formData.get("location") || "").trim() || null;
  const locationLabel = String(formData.get("location_label") || "").trim() || null;
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
    category,
    event_date: eventDate,
    start_time: startTime,
    end_time: endTime,
    location,
    location_label: locationLabel,
    published,
    published_at: published ? new Date().toISOString() : null,
    seo_title: seoTitle,
    seo_description: seoDescription,
    content,
  };

  if (id) await supabase.from("events").update(payload).eq("id", id);
  else await supabase.from("events").insert(payload);

  revalidatePath("/admin/events");
  revalidatePath("/eventos");
  revalidatePath("/");
  redirect("/admin/events");
}

export async function deleteEventAction(formData: FormData) {
  const session = await requireAdmin();
  if (!session.isAuthorized) redirect("/admin/login");
  const id = String(formData.get("id") || "").trim();
  const supabase = createSupabaseAdminClient();
  await supabase.from("events").delete().eq("id", id);
  revalidatePath("/admin/events");
  revalidatePath("/eventos");
  revalidatePath("/");
  redirect("/admin/events");
}

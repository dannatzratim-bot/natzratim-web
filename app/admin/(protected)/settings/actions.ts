"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";

export async function saveSiteSettingsAction(formData: FormData) {
  const session = await requireAdmin();
  if (session.role !== "super_admin") redirect("/admin");

  const supabase = createSupabaseAdminClient();
  const id = String(formData.get("id") || "").trim();
  const payload = {
    site_name: String(formData.get("site_name") || "").trim(),
    tagline: String(formData.get("tagline") || "").trim(),
    welcome_text: String(formData.get("welcome_text") || "").trim(),
    hero_title: String(formData.get("hero_title") || "").trim(),
    hero_description: String(formData.get("hero_description") || "").trim(),
    logo_url: String(formData.get("logo_url") || "").trim(),
    banner_image_url: String(formData.get("banner_image_url") || "").trim(),
    contact_whatsapp: String(formData.get("contact_whatsapp") || "").trim(),
    contact_email: String(formData.get("contact_email") || "").trim(),
    contact_phone: String(formData.get("contact_phone") || "").trim() || null,
    address: String(formData.get("address") || "").trim() || null,
    facebook_url: String(formData.get("facebook_url") || "").trim() || null,
    instagram_url: String(formData.get("instagram_url") || "").trim() || null,
    youtube_url: String(formData.get("youtube_url") || "").trim() || null,
    youtube_channel: String(formData.get("youtube_channel") || "").trim() || null,
    primary_color: String(formData.get("primary_color") || "").trim() || null,
    accent_color: String(formData.get("accent_color") || "").trim() || null,
    support_cta: String(formData.get("support_cta") || "").trim() || null,
  };

  if (id) await supabase.from("site_settings").update(payload).eq("id", id);
  else await supabase.from("site_settings").insert(payload);

  revalidatePath("/");
  revalidatePath("/contacto");
  revalidatePath("/donaciones");
  revalidatePath("/admin/settings");
  redirect("/admin/settings");
}

export async function saveDonationsAction(formData: FormData) {
  const session = await requireAdmin();
  if (session.role !== "super_admin") redirect("/admin");

  const supabase = createSupabaseAdminClient();
  const id = String(formData.get("id") || "").trim();
  const payload = {
    title: String(formData.get("title") || "").trim(),
    subtitle: String(formData.get("subtitle") || "").trim(),
    body: String(formData.get("body") || "").trim(),
    bank_name: String(formData.get("bank_name") || "").trim() || null,
    bank_account: String(formData.get("bank_account") || "").trim() || null,
    bank_alias: String(formData.get("bank_alias") || "").trim() || null,
    bank_swift: String(formData.get("bank_swift") || "").trim() || null,
    qr_code_url: String(formData.get("qr_code_url") || "").trim() || null,
    donation_url: String(formData.get("donation_url") || "").trim() || null,
    notes: String(formData.get("notes") || "").trim() || null,
  };

  if (id) await supabase.from("donations_info").update(payload).eq("id", id);
  else await supabase.from("donations_info").insert(payload);

  revalidatePath("/");
  revalidatePath("/donaciones");
  revalidatePath("/admin/settings");
  redirect("/admin/settings");
}

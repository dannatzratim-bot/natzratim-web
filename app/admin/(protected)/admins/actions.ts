"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getRoles } from "@/lib/data";
import { requireAdmin } from "@/lib/auth";

export async function saveAdminAction(formData: FormData) {
  const session = await requireAdmin();
  if (session.role !== "super_admin") redirect("/admin");

  const id = String(formData.get("id") || "").trim();
  const fullName = String(formData.get("full_name") || "").trim();
  const username = String(formData.get("username") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const roleSlug = String(formData.get("role_slug") || "admin").trim();
  const avatarUrl = String(formData.get("avatar_url") || "").trim() || null;

  const supabase = createSupabaseAdminClient();
  const roles = await getRoles();
  const role = roles.find((item) => item.slug === roleSlug) ?? roles.find((item) => item.slug === "admin") ?? roles[0];

  if (id) {
    const { data: existing } = await supabase.from("users").select("*").eq("id", id).maybeSingle();
    if (!existing) redirect("/admin/admins");

    await supabase.auth.admin.updateUserById(existing.auth_user_id, {
      email,
      password: password || undefined,
      user_metadata: { full_name: fullName, username },
    });
    await supabase.from("users").update({ full_name: fullName, username, email, role_id: role.id, avatar_url: avatarUrl }).eq("id", id);
  } else {
    const { data: authUser, error } = await supabase.auth.admin.createUser({
      email,
      password: password || "ChangeMe123!",
      email_confirm: true,
      user_metadata: { full_name: fullName, username },
    });
    if (error || !authUser.user) {
      throw new Error(error?.message ?? "No se pudo crear el usuario.");
    }

    await supabase.from("users").insert({
      auth_user_id: authUser.user.id,
      username,
      full_name: fullName,
      email,
      role_id: role.id,
      avatar_url: avatarUrl,
    });
  }

  revalidatePath("/admin/admins");
  redirect("/admin/admins");
}

export async function deleteAdminAction(formData: FormData) {
  const session = await requireAdmin();
  if (session.role !== "super_admin") redirect("/admin");

  const id = String(formData.get("id") || "").trim();
  if (session.profile?.id === id) redirect("/admin/admins");

  const supabase = createSupabaseAdminClient();
  const { data } = await supabase.from("users").select("*").eq("id", id).maybeSingle();
  if (data) {
    await supabase.auth.admin.deleteUser(data.auth_user_id);
    await supabase.from("users").delete().eq("id", id);
  }
  revalidatePath("/admin/admins");
  redirect("/admin/admins");
}


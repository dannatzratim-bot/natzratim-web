"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";

export async function markMessageReadAction(formData: FormData) {
  const session = await requireAdmin();
  if (!session.isAuthorized) redirect("/admin/login");

  const id = String(formData.get("id") || "").trim();
  const supabase = createSupabaseAdminClient();
  await supabase.from("contact_messages").update({ read_at: new Date().toISOString() }).eq("id", id);
  revalidatePath("/admin/messages");
  redirect("/admin/messages");
}


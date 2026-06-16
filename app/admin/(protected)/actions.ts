"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signOutAction() {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function deleteByIdAction(resource: string, id: string) {
  const supabase = createSupabaseServerClient();
  await supabase.from(resource).delete().eq("id", id);
  revalidatePath(`/admin/${resource}`);
}


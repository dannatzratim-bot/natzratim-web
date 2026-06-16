"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function resolveEmail(identifier: string) {
  if (identifier.includes("@")) return identifier;
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.rpc("lookup_email_by_username", { username_input: identifier });
  if (error) throw new Error(error.message);
  return (data as string) || identifier;
}

export async function signInAction(formData: FormData) {
  const identifier = String(formData.get("identifier") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const email = await resolveEmail(identifier);

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin");
}


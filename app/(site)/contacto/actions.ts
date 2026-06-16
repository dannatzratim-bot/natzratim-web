"use server";

import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function submitContactMessage(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const supabase = createSupabaseAdminClient();
  await supabase.from("contact_messages").insert({
    name,
    email,
    phone: phone || null,
    subject,
    message,
  });

  redirect("/contacto?sent=1");
}


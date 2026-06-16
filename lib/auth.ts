import type { RoleSlug } from "@/types/content";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getSessionProfile() {
  const supabase = createSupabaseServerClient();
  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;
  if (!user) return { user: null, profile: null, role: null as RoleSlug | null };

  const { data: profile } = await supabase.from("users").select("*, role:roles(slug)").eq("auth_user_id", user.id).maybeSingle();
  const role = (profile?.role?.slug ?? null) as RoleSlug | null;

  return { user, profile, role };
}

export async function requireAdmin() {
  const session = await getSessionProfile();
  if (!session.user || !session.role) {
    return { ...session, isAuthorized: false };
  }

  const isAuthorized = session.role === "admin" || session.role === "super_admin";
  return { ...session, isAuthorized };
}

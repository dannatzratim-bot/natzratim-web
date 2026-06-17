import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export function createSupabaseServerClient() {
  const cookieStore = cookies();
  type CookieName = Parameters<typeof cookieStore.get>[0];
  type CookieValue = Parameters<typeof cookieStore.set>[1];
  type CookieOptions = Parameters<typeof cookieStore.set>[2];
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        get(name: CookieName) {
          return cookieStore.get(name)?.value;
        },
        set(name: CookieName, value: CookieValue, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: CookieName, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    },
  );
}

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export function createSupabaseServerClient() {
  type CookieStore = Awaited<ReturnType<typeof cookies>>;
  type CookieName = Parameters<CookieStore["get"]>[0];
  type CookieValue = Parameters<CookieStore["set"]>[1];
  type CookieOptions = Parameters<CookieStore["set"]>[2];
  const cookieStore = cookies() as unknown as CookieStore;
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

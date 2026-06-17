import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

type SupabaseCookieOptions = {
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
  priority?: "low" | "medium" | "high";
  partitioned?: boolean;
};

type SupabaseCookieStore = {
  get(name: string): { value?: string } | undefined;
  set(cookie: { name: string; value: string } & SupabaseCookieOptions): void;
};

export function createSupabaseServerClient() {
  const cookieStore = cookies() as unknown as SupabaseCookieStore;
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: SupabaseCookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: SupabaseCookieOptions) {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    },
  );
}

import { createClient } from "@supabase/supabase-js";

// Create Supabase client only in the browser to avoid requiring NEXT_PUBLIC_* env vars
// during server-side build/prerender. Server code should use the server client helpers.
let _supabase: ReturnType<typeof createClient> | null = null;

if (typeof window !== "undefined") {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Do not throw during build — warn instead.
    console.warn("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  } else {
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
}

// Export as `any` to avoid build-time type errors in server-side builds. The actual client
// is only available in the browser at runtime when NEXT_PUBLIC env vars are present.
export const supabase: any = _supabase;

import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only Supabase client. It uses the secret key, so every database call
// happens on the server (Server Components, Server Actions, API routes) and the
// key never reaches the browser.
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SECRET_KEY. Add them in Vercel → Settings → Environment Variables."
    );
  }

  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

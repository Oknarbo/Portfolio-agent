import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { config } from "./config";

let admin: SupabaseClient | null = null;

/**
 * Server-side Supabase client using the service role key.
 * NEVER import this into client components.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (!config.supabaseUrl || !config.supabaseServiceKey) {
    throw new Error("Supabase env vars are not set.");
  }
  if (!admin) {
    admin = createClient(config.supabaseUrl, config.supabaseServiceKey, {
      auth: { persistSession: false },
    });
  }
  return admin;
}

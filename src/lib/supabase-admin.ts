import { createClient, SupabaseClient } from "@supabase/supabase-js";

let adminClient: SupabaseClient | null = null;
let adminClientKey: string | null = null;

export function resetSupabaseAdmin(): void {
  adminClient = null;
  adminClientKey = null;
}

export function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL manquant");
  const key = serviceKey || anonKey;
  if (!key) throw new Error("Clé Supabase manquante");
  if (adminClient && adminClientKey === key) return adminClient;
  adminClientKey = key;
  adminClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return adminClient;
}

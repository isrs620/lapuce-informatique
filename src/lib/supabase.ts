import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RendezVous {
  id?: number;
  created_at?: string;
  nom: string;
  telephone: string;
  email: string;
  appareil: string;
  reparation: string;
  date_souhaitee: string;
  heure_souhaitee: string;
  message: string;
  statut: "nouveau" | "confirme" | "termine" | "annule";
}

export interface MessageContact {
  id?: number;
  created_at?: string;
  nom: string;
  email: string;
  telephone: string;
  sujet: string;
  message: string;
  lu: boolean;
}

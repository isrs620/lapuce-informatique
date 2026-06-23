import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { AdminAuthError, requireAdmin } from "@/lib/admin-auth";
import { upsertEnvVar, isValidServiceRoleKey, readEnvVar } from "@/lib/env-file";
import { resetSupabaseAdmin } from "@/lib/supabase-admin";

function unauthorized() {
  return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
}

export async function GET() {
  try {
    await requireAdmin();
    const configured = Boolean(
      process.env.SUPABASE_SERVICE_ROLE_KEY || readEnvVar("SUPABASE_SERVICE_ROLE_KEY")
    );
    return NextResponse.json({ configured });
  } catch (e) {
    if (e instanceof AdminAuthError) return unauthorized();
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const { serviceRoleKey } = await req.json();
    if (!serviceRoleKey || typeof serviceRoleKey !== "string" || serviceRoleKey.length < 20) {
      return NextResponse.json({ error: "Clé service_role invalide" }, { status: 400 });
    }
    if (!isValidServiceRoleKey(serviceRoleKey)) {
      return NextResponse.json({
        error: "Mauvaise clé : utilisez service_role (eyJ...), pas publishable (sb_publishable_...). Settings → API → Legacy → Reveal sur service_role.",
      }, { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!url) {
      return NextResponse.json({ error: "NEXT_PUBLIC_SUPABASE_URL manquant" }, { status: 500 });
    }

    const test = createClient(url, serviceRoleKey.trim(), {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { error: testError } = await test.from("produits").select("id").limit(1);
    if (testError && !testError.message.includes("0 rows")) {
      return NextResponse.json({
        error: `Clé refusée par Supabase : ${testError.message}`,
      }, { status: 400 });
    }

    upsertEnvVar("SUPABASE_SERVICE_ROLE_KEY", serviceRoleKey.trim());
    process.env.SUPABASE_SERVICE_ROLE_KEY = serviceRoleKey.trim();
    resetSupabaseAdmin();

    return NextResponse.json({
      ok: true,
      message: "Clé enregistrée. Redémarrez le serveur (Ctrl+C puis npm run dev) puis réessayez.",
    });
  } catch (e) {
    if (e instanceof AdminAuthError) return unauthorized();
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

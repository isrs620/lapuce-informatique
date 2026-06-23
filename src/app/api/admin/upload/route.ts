import { NextResponse } from "next/server";
import { AdminAuthError, requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

function unauthorized() {
  return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
}

const MAX_SIZE = 5 * 1024 * 1024; // 5 Mo
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: "Format non supporté (JPG, PNG, WebP, GIF)" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Fichier trop volumineux (max 5 Mo)" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (serviceKey) {
      const db = getSupabaseAdmin();
      const storagePath = `uploads/${filename}`;
      const { error } = await db.storage.from("produits").upload(storagePath, bytes, {
        contentType: file.type,
        upsert: false,
      });
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      const { data: pub } = db.storage.from("produits").getPublicUrl(storagePath);
      return NextResponse.json({ url: pub.publicUrl });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "produits");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), bytes);
    return NextResponse.json({ url: `/uploads/produits/${filename}` });
  } catch (e) {
    if (e instanceof AdminAuthError) return unauthorized();
    const msg = e instanceof Error ? e.message : "Erreur upload";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

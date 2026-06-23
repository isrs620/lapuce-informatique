import { NextResponse } from "next/server";
import { AdminAuthError, requireAdmin } from "@/lib/admin-auth";
import * as store from "@/lib/products-store";

function unauthorized() {
  return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
}

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: Request, ctx: Ctx) {
  try {
    await requireAdmin();
    const { id } = await ctx.params;
    const { url, ordre } = await req.json();
    if (!url) return NextResponse.json({ error: "URL manquante" }, { status: 400 });
    const photo = await store.addPhoto(id, url, ordre ?? 0);
    if (!photo) return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
    return NextResponse.json({ photo }, { status: 201 });
  } catch (e) {
    if (e instanceof AdminAuthError) return unauthorized();
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: Request, ctx: Ctx) {
  try {
    await requireAdmin();
    const { id: produitId } = await ctx.params;
    const { searchParams } = new URL(req.url);
    const photoId = searchParams.get("photoId");
    if (!photoId) return NextResponse.json({ error: "photoId manquant" }, { status: 400 });
    const ok = await store.deletePhoto(produitId, photoId);
    if (!ok) return NextResponse.json({ error: "Photo introuvable" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof AdminAuthError) return unauthorized();
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { AdminAuthError, requireAdmin } from "@/lib/admin-auth";
import * as store from "@/lib/products-store";

function unauthorized() {
  return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
}

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  try {
    await requireAdmin();
    const { id } = await ctx.params;
    const produit = await store.getProduit(id);
    if (!produit) return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
    return NextResponse.json({ produit });
  } catch (e) {
    if (e instanceof AdminAuthError) return unauthorized();
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: Request, ctx: Ctx) {
  try {
    await requireAdmin();
    const { id } = await ctx.params;
    const body = await req.json();
    const produit = await store.updateProduit(id, body);
    if (!produit) return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
    return NextResponse.json({ produit });
  } catch (e) {
    if (e instanceof AdminAuthError) return unauthorized();
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  try {
    await requireAdmin();
    const { id } = await ctx.params;
    const ok = await store.deleteProduit(id);
    if (!ok) return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof AdminAuthError) return unauthorized();
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

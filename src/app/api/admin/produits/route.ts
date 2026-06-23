import { NextResponse } from "next/server";
import { AdminAuthError, requireAdmin } from "@/lib/admin-auth";
import * as store from "@/lib/products-store";

function unauthorized() {
  return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
}

export async function GET(req: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() ?? "";
    const produits = await store.listProduits(q || undefined);
    return NextResponse.json({ produits });
  } catch (e) {
    if (e instanceof AdminAuthError) return unauthorized();
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = await req.json();
    if (!body.nom?.trim()) {
      return NextResponse.json({ error: "Le nom du produit est requis" }, { status: 400 });
    }
    const produit = await store.createProduit(body);
    return NextResponse.json({ produit }, { status: 201 });
  } catch (e) {
    if (e instanceof AdminAuthError) return unauthorized();
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

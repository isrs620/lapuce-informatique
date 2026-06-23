import { NextResponse } from "next/server";
import { AdminAuthError, requireAdmin } from "@/lib/admin-auth";
import {
  listAllRepairPrices,
  readRepairOverrides,
  updateRepairTierPrice,
} from "@/lib/repair-prices-store";

function unauthorized() {
  return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
}

export async function GET() {
  try {
    await requireAdmin();
    const overrides = await readRepairOverrides();
    return NextResponse.json({ rows: listAllRepairPrices(overrides) });
  } catch (e) {
    if (e instanceof AdminAuthError) return unauthorized();
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await requireAdmin();
    const { brandId, repairId, tierId, price } = await req.json();
    if (!brandId || !repairId || !tierId || price == null) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }
    await updateRepairTierPrice(brandId, repairId, tierId, Number(price));
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof AdminAuthError) return unauthorized();
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

import type { Produit } from "@/lib/types/produit";

export function labelAppareil(p: Pick<Produit, "marque" | "modele">): string {
  const parts = [p.marque, p.modele].filter(Boolean);
  return parts.join(" ").toUpperCase();
}

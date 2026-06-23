import type { Produit } from "@/lib/types/produit";
import { prixEffectif } from "@/lib/types/produit";

export interface CartItem {
  produitId: string;
  nom: string;
  marque: string;
  modele: string;
  prix: number;
  photo?: string | null;
  qty: number;
}

const KEY = "lapuce-panier";

export function lirePanier(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as CartItem[];
  } catch {
    return [];
  }
}

export function sauverPanier(items: CartItem[]): void {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function ajouterAuPanier(p: Produit): void {
  const items = lirePanier();
  const prix = prixEffectif(p);
  const existing = items.find((i) => i.produitId === p.id);
  if (existing) {
    existing.qty += 1;
  } else {
    items.push({
      produitId: p.id,
      nom: p.nom,
      marque: p.marque,
      modele: p.modele,
      prix,
      photo: p.photo_principale,
      qty: 1,
    });
  }
  sauverPanier(items);
}

export function retirerDuPanier(produitId: string): void {
  sauverPanier(lirePanier().filter((i) => i.produitId !== produitId));
}

export function viderPanier(): void {
  localStorage.removeItem(KEY);
}

export function totalPanier(items: CartItem[]): number {
  return items.reduce((s, i) => s + i.prix * i.qty, 0);
}

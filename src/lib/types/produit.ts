export interface ProduitPhoto {
  id: string;
  produit_id: string;
  url: string;
  ordre: number;
  created_at?: string;
}

export interface Produit {
  id: string;
  created_at?: string;
  updated_at?: string;
  nom: string;
  marque: string;
  modele: string;
  prix: number;
  prix_promo?: number | null;
  promotion_active: boolean;
  reduction_pct?: number | null;
  description: string;
  categorie: string;
  stock: number;
  publie?: boolean;
  photo_principale?: string | null;
  produit_photos?: ProduitPhoto[];
}

export type ProduitInput = Omit<Produit, "id" | "created_at" | "updated_at" | "produit_photos">;

export const CATEGORIES = [
  "Téléphone",
  "Tablette",
  "Ordinateur",
  "Montre",
  "Console",
  "Accessoire",
  "Pièce détachée",
  "Réparation",
  "Autre",
] as const;

export type Categorie = (typeof CATEGORIES)[number];

export function prixEffectif(p: Pick<Produit, "prix" | "prix_promo" | "promotion_active" | "reduction_pct">): number {
  if (p.promotion_active && p.prix_promo != null && p.prix_promo > 0) return p.prix_promo;
  if (p.promotion_active && p.reduction_pct != null && p.reduction_pct > 0) {
    return Math.round(p.prix * (1 - p.reduction_pct / 100) * 100) / 100;
  }
  return p.prix;
}

export function formatPrix(n: number): string {
  return new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD" }).format(n);
}

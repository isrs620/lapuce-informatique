import type { Produit } from "@/lib/types/produit";
import { listProduits } from "@/lib/products-store";
import { marqueVersBrand } from "@/lib/marque-brand";
import { labelAppareil } from "@/lib/produit-utils";

export { labelAppareil };

export function estPublie(p: Produit): boolean {
  return p.publie !== false;
}

function matchModele(p: Produit, modelName: string, modelId: string): boolean {
  const pm = p.modele.toLowerCase().trim();
  if (!pm) return false;
  const name = modelName.toLowerCase();
  const id = modelId.toLowerCase();
  return name.includes(pm) || id.includes(pm) || pm.includes(id);
}

export async function produitsPubliesTous(): Promise<Produit[]> {
  const all = await listProduits();
  return all.filter((p) => estPublie(p) && p.stock > 0);
}

export async function produitsPourPage(opts?: {
  brandId?: string;
  modelId?: string;
  modelName?: string;
}): Promise<Produit[]> {
  const all = await produitsPubliesTous();
  if (!opts?.brandId) return all;

  const pourCetAppareil: Produit[] = [];
  const autres: Produit[] = [];

  for (const p of all) {
    const sameBrand = marqueVersBrand(p.marque, p.categorie) === opts.brandId;
    const sameModel =
      Boolean(opts.modelId && opts.modelName) &&
      sameBrand &&
      matchModele(p, opts.modelName!, opts.modelId!);

    if (opts.modelId ? sameModel : sameBrand) pourCetAppareil.push(p);
    else autres.push(p);
  }

  return [...pourCetAppareil, ...autres];
}

export async function produitsAvecMiseEnAvant(opts?: {
  brandId?: string;
  modelId?: string;
  modelName?: string;
}): Promise<{ produits: Produit[]; misEnAvant: string[] }> {
  const produits = await produitsPourPage(opts);
  const misEnAvant = produits
    .filter((p) => {
      if (!opts?.brandId) return false;
      const sameBrand = marqueVersBrand(p.marque, p.categorie) === opts.brandId;
      if (!opts.modelId || !opts.modelName) return sameBrand;
      return sameBrand && matchModele(p, opts.modelName, opts.modelId);
    })
    .map((p) => p.id);
  return { produits, misEnAvant };
}

/** @deprecated use produitsPourPage */
export async function produitsPubliesPourBrand(brandId: string): Promise<Produit[]> {
  return produitsPourPage({ brandId });
}

/** @deprecated use produitsPourPage */
export async function produitsPubliesPourModele(
  brandId: string,
  modelId: string,
  modelName: string
): Promise<Produit[]> {
  return produitsPourPage({ brandId, modelId, modelName });
}

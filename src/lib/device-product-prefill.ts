import type { DeviceType } from "@/data/devices";

export function categorieFromDeviceType(type?: DeviceType): string {
  switch (type) {
    case "phone": return "Téléphone";
    case "tablet":
    case "ipad-mini":
    case "ipad-pro": return "Tablette";
    case "laptop": return "Ordinateur";
    case "watch": return "Montre";
    case "console": return "Console";
    default: return "Autre";
  }
}

export interface AddProductPrefill {
  marque: string;
  modele: string;
  nom: string;
  categorie: string;
  brand?: string;
  series?: string;
  model?: string;
}

export function buildAddProductUrl(opts: {
  brandId: string;
  brandName: string;
  modelName?: string;
  modelId?: string;
  seriesId?: string;
  deviceType?: DeviceType;
}): string {
  const params = new URLSearchParams();
  params.set("marque", opts.brandId);
  params.set("brand", opts.brandId);
  if (opts.modelName) {
    params.set("nom", opts.modelName);
    params.set("modele", opts.modelName);
  } else {
    params.set("nom", opts.brandName);
    params.set("modele", "");
  }
  if (opts.modelId) params.set("model", opts.modelId);
  if (opts.seriesId) params.set("series", opts.seriesId);
  params.set("categorie", categorieFromDeviceType(opts.deviceType));
  return `/admin/produits/nouveau?${params.toString()}`;
}

export function parsePrefillFromSearch(params: URLSearchParams): Partial<AddProductPrefill> {
  return {
    marque: params.get("marque") ?? params.get("brand") ?? "",
    modele: params.get("modele") ?? "",
    nom: params.get("nom") ?? "",
    categorie: params.get("categorie") ?? "Autre",
    brand: params.get("brand") ?? undefined,
    series: params.get("series") ?? undefined,
    model: params.get("model") ?? undefined,
  };
}

export function urlApresPublication(prefill: Partial<AddProductPrefill>): string | null {
  if (prefill.brand && prefill.series && prefill.model) {
    return `/reparation/${prefill.brand}/${prefill.series}/${prefill.model}`;
  }
  if (prefill.brand) return `/reparation/${prefill.brand}`;
  return null;
}

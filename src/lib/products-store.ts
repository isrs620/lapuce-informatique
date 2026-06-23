import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { Produit, ProduitPhoto } from "@/lib/types/produit";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "produits.json");

type Stored = Produit & { produit_photos: ProduitPhoto[] };

async function readAll(): Promise<Stored[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as Stored[];
  } catch {
    return [];
  }
}

async function writeAll(items: Stored[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
}

function matchQuery(p: Stored, q: string): boolean {
  const s = q.toLowerCase();
  return [p.nom, p.marque, p.modele, p.categorie].some((v) => v.toLowerCase().includes(s));
}

export async function listProduits(q?: string): Promise<Produit[]> {
  let items = await readAll();
  if (q) items = items.filter((p) => matchQuery(p, q));
  return items
    .sort((a, b) => (b.updated_at ?? "").localeCompare(a.updated_at ?? ""))
    .map(({ produit_photos, ...p }) => ({ ...p, produit_photos }));
}

export async function getProduit(id: string): Promise<Stored | null> {
  const items = await readAll();
  const p = items.find((x) => x.id === id);
  if (!p) return null;
  p.produit_photos.sort((a, b) => a.ordre - b.ordre);
  return p;
}

export async function createProduit(body: Record<string, unknown>): Promise<Stored> {
  const now = new Date().toISOString();
  const id = randomUUID();
  const gallery = (body.gallery as string[] | undefined) ?? [];
  const produit: Stored = {
    id,
    created_at: now,
    updated_at: now,
    nom: String(body.nom ?? ""),
    marque: String(body.marque ?? ""),
    modele: String(body.modele ?? ""),
    prix: Number(body.prix) || 0,
    prix_promo: body.prix_promo != null ? Number(body.prix_promo) : null,
    promotion_active: Boolean(body.promotion_active),
    reduction_pct: body.reduction_pct != null ? Number(body.reduction_pct) : null,
    description: String(body.description ?? ""),
    categorie: String(body.categorie ?? "Autre"),
    stock: Number(body.stock) || 0,
    publie: body.publie !== false,
    photo_principale: (body.photo_principale as string | null) ?? null,
    produit_photos: gallery.map((url, i) => ({
      id: randomUUID(),
      produit_id: id,
      url,
      ordre: i,
      created_at: now,
    })),
  };
  const items = await readAll();
  items.push(produit);
  await writeAll(items);
  return produit;
}

export async function updateProduit(id: string, body: Record<string, unknown>): Promise<Stored | null> {
  const items = await readAll();
  const idx = items.findIndex((x) => x.id === id);
  if (idx === -1) return null;

  const fields = [
    "nom", "marque", "modele", "prix", "prix_promo", "promotion_active",
    "reduction_pct", "description", "categorie", "stock", "photo_principale", "publie",
  ] as const;

  const current = items[idx];
  for (const f of fields) {
    if (body[f] !== undefined) {
      (current as unknown as Record<string, unknown>)[f] = body[f];
    }
  }
  current.updated_at = new Date().toISOString();

  if (Array.isArray(body.gallery)) {
    const now = new Date().toISOString();
    items[idx].produit_photos = (body.gallery as string[]).map((url, i) => ({
      id: randomUUID(),
      produit_id: id,
      url,
      ordre: i,
      created_at: now,
    }));
  }

  await writeAll(items);
  return items[idx];
}

export async function deleteProduit(id: string): Promise<boolean> {
  const items = await readAll();
  const next = items.filter((x) => x.id !== id);
  if (next.length === items.length) return false;
  await writeAll(next);
  return true;
}

export async function addPhoto(produitId: string, url: string, ordre: number): Promise<ProduitPhoto | null> {
  const items = await readAll();
  const p = items.find((x) => x.id === produitId);
  if (!p) return null;
  const photo: ProduitPhoto = {
    id: randomUUID(),
    produit_id: produitId,
    url,
    ordre,
    created_at: new Date().toISOString(),
  };
  p.produit_photos.push(photo);
  p.updated_at = new Date().toISOString();
  await writeAll(items);
  return photo;
}

export async function deletePhoto(produitId: string, photoId: string): Promise<boolean> {
  const items = await readAll();
  const p = items.find((x) => x.id === produitId);
  if (!p) return false;
  const before = p.produit_photos.length;
  p.produit_photos = p.produit_photos.filter((ph) => ph.id !== photoId);
  if (p.produit_photos.length === before) return false;
  p.updated_at = new Date().toISOString();
  await writeAll(items);
  return true;
}

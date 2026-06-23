import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { brands, repairsByBrand, type RepairOption } from "@/data/devices";

const DATA_FILE = path.join(process.cwd(), "data", "repair-prices.json");

export type RepairPriceOverrides = Record<string, Record<string, Record<string, number>>>;

export async function readRepairOverrides(): Promise<RepairPriceOverrides> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as RepairPriceOverrides;
  } catch {
    return {};
  }
}

export async function writeRepairOverrides(data: RepairPriceOverrides): Promise<void> {
  await mkdir(path.dirname(DATA_FILE), { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

export function applyRepairOverrides(
  brandId: string,
  repairs: RepairOption[],
  overrides: RepairPriceOverrides
): RepairOption[] {
  const brand = overrides[brandId];
  if (!brand) return repairs;
  return repairs.map((r) => ({
    ...r,
    tiers: r.tiers.map((t) => ({
      ...t,
      price: brand[r.id]?.[t.id] ?? t.price,
    })),
  }));
}

export interface RepairPriceRow {
  brandId: string;
  brandName: string;
  repairId: string;
  repairName: string;
  tierId: string;
  tierName: string;
  price: number;
  defaultPrice: number;
}

export function listAllRepairPrices(overrides: RepairPriceOverrides): RepairPriceRow[] {
  const rows: RepairPriceRow[] = [];
  for (const brand of Object.values(brands)) {
    const repairs = repairsByBrand[brand.id] ?? [];
    for (const repair of repairs) {
      for (const tier of repair.tiers) {
        const price = overrides[brand.id]?.[repair.id]?.[tier.id] ?? tier.price;
        rows.push({
          brandId: brand.id,
          brandName: brand.name,
          repairId: repair.id,
          repairName: repair.name,
          tierId: tier.id,
          tierName: tier.name,
          price,
          defaultPrice: tier.price,
        });
      }
    }
  }
  return rows;
}

export async function updateRepairTierPrice(
  brandId: string,
  repairId: string,
  tierId: string,
  price: number
): Promise<void> {
  const overrides = await readRepairOverrides();
  if (!overrides[brandId]) overrides[brandId] = {};
  if (!overrides[brandId][repairId]) overrides[brandId][repairId] = {};
  overrides[brandId][repairId][tierId] = price;
  await writeRepairOverrides(overrides);
}

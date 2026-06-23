import Link from "next/link";
import type { DeviceType } from "@/data/devices";
import { buildAddProductUrl } from "@/lib/device-product-prefill";

interface Props {
  brandId: string;
  brandName: string;
  modelName?: string;
  modelId?: string;
  seriesId?: string;
  deviceType?: DeviceType;
  variant?: "button" | "card";
}

export default function AdminProductLink({
  brandId,
  brandName,
  modelName,
  modelId,
  seriesId,
  deviceType,
  variant = "button",
}: Props) {
  const href = buildAddProductUrl({
    brandId,
    brandName,
    modelName,
    modelId,
    seriesId,
    deviceType,
  });

  const label = modelName ? `+ Produit — ${modelName}` : `+ Produit — ${brandName}`;

  if (variant === "card") {
    return (
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 px-3 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
      >
        <span className="text-base leading-none">+</span> Ajouter produit
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl text-sm shadow-md transition-colors"
    >
      <span className="text-lg leading-none">+</span>
      {label}
    </Link>
  );
}

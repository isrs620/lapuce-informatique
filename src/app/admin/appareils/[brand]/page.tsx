import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrand } from "@/data/devices";
import DeviceImage from "@/components/DeviceImage";
import AdminProductLink from "@/components/admin/AdminProductLink";

interface Props {
  params: Promise<{ brand: string }>;
}

export default async function AdminBrandAppareilsPage({ params }: Props) {
  const { brand: brandId } = await params;
  const brand = getBrand(brandId);
  if (!brand) notFound();

  return (
    <div>
      <Link href="/admin/appareils" className="text-sm text-sky-600 hover:underline">
        ← Tous les appareils
      </Link>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4 mb-2">
        {brand.emoji} {brand.name}
      </h1>
      <p className="text-slate-500 mb-8">Choisissez une gamme, puis le modèle pour ajouter un produit.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brand.series.map((series) => (
          <div
            key={series.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
          >
            <Link href={`/admin/appareils/${brandId}/${series.id}`} className="block group">
              <div className="bg-sky-50 h-36 flex items-center justify-center p-4">
                <DeviceImage
                  src={series.image}
                  alt={series.name}
                  deviceType={series.deviceType}
                  className="object-contain h-28 w-auto group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4 border-t border-slate-100">
                <h2 className="font-bold text-slate-900">{series.name}</h2>
                <p className="text-sky-600 text-sm mt-1">{series.models.length} modèles →</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-sky-50 border border-sky-200 rounded-xl">
        <p className="text-sm text-slate-600 mb-3">Produit pour toute la marque {brand.name} :</p>
        <AdminProductLink
          brandId={brandId}
          brandName={brand.name}
          deviceType={brand.series[0]?.deviceType}
        />
      </div>
    </div>
  );
}

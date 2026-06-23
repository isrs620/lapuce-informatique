import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrand, getSeries } from "@/data/devices";
import DeviceImage from "@/components/DeviceImage";
import AdminProductLink from "@/components/admin/AdminProductLink";

interface Props {
  params: Promise<{ brand: string; series: string }>;
}

export default async function AdminSeriesAppareilsPage({ params }: Props) {
  const { brand: brandId, series: seriesId } = await params;
  const brand = getBrand(brandId);
  const series = getSeries(brandId, seriesId);
  if (!brand || !series) notFound();

  return (
    <div>
      <Link href={`/admin/appareils/${brandId}`} className="text-sm text-sky-600 hover:underline">
        ← {brand.name}
      </Link>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4 mb-2">{series.name}</h1>
      <p className="text-slate-500 mb-8">
        Cliquez <strong>+ Ajouter produit</strong> sur le modèle voulu (ex: iPhone 18).
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {series.models.map((model) => (
          <div
            key={model.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col"
          >
            <div className="bg-sky-50 h-32 flex items-center justify-center p-3">
              <DeviceImage
                src={model.image}
                alt={model.name}
                deviceType={series.deviceType}
                className="object-contain h-24 w-auto"
              />
            </div>
            <div className="p-3 border-t border-slate-100 flex-1 flex flex-col">
              <p className="font-semibold text-slate-900 text-sm text-center leading-tight">{model.name}</p>
              {model.modelNumber && (
                <p className="text-slate-400 text-xs text-center mt-0.5">{model.modelNumber}</p>
              )}
              <div className="mt-3 flex justify-center">
                <AdminProductLink
                  variant="card"
                  brandId={brandId}
                  brandName={brand.name}
                  modelName={model.name}
                  modelId={model.id}
                  seriesId={seriesId}
                  deviceType={series.deviceType}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

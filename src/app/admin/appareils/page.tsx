import Link from "next/link";
import { brands } from "@/data/devices";
import DeviceImage from "@/components/DeviceImage";
import AdminProductLink from "@/components/admin/AdminProductLink";

export default function AdminAppareilsPage() {
  const list = Object.values(brands);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Produits par appareil</h1>
        <p className="text-slate-500 mt-1">
          Choisissez un appareil (iPhone, Samsung…) puis ajoutez un produit à vendre — réservé à l&apos;administration.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((brand) => (
          <div
            key={brand.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <Link href={`/admin/appareils/${brand.id}`} className="block">
              <div className="bg-sky-50 h-32 flex items-center justify-center text-5xl">
                {brand.emoji}
              </div>
              <div className="p-4">
                <h2 className="font-bold text-slate-900 text-lg">{brand.name}</h2>
                <p className="text-slate-500 text-sm mt-1">{brand.series.length} gammes</p>
              </div>
            </Link>
            <div className="px-4 pb-4">
              <AdminProductLink
                brandId={brand.id}
                brandName={brand.name}
                deviceType={brand.series[0]?.deviceType}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

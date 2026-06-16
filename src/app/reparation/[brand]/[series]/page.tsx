import { notFound } from "next/navigation";
import Link from "next/link";
import { getBrand, getSeries } from "@/data/devices";
import DeviceImage from "@/components/DeviceImage";

interface Props {
  params: Promise<{ brand: string; series: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { brand: brandId, series: seriesId } = await params;
  const series = getSeries(brandId, seriesId);
  if (!series) return { title: "Page non trouvée" };
  return {
    title: `${series.name} — TechRepairPro`,
    description: `Réparation ${series.name}. Sélectionnez votre modèle pour voir les réparations disponibles.`,
  };
}

export default async function SeriesPage({ params }: Props) {
  const { brand: brandId, series: seriesId } = await params;
  const brand = getBrand(brandId);
  const series = getSeries(brandId, seriesId);
  if (!brand || !series) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-500 to-blue-600 pt-14 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sky-200 text-sm mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href={`/reparation/${brandId}`} className="hover:text-white transition-colors">
              Réparations {brand.name}
            </Link>
            <span>/</span>
            <span className="text-white font-medium">{series.name}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Réparation <span className="text-sky-100">{series.name}</span>
          </h1>
          <p className="text-sky-200">
            Sélectionnez votre modèle pour voir les réparations disponibles et les prix.
          </p>
        </div>
      </section>

      {/* Models grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            {series.models.length} modèles disponibles
          </h2>
          <Link
            href={`/reparation/${brandId}`}
            className="text-sky-500 hover:text-sky-600 text-sm font-medium flex items-center gap-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux gammes
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {series.models.map((model) => (
            <Link
              key={model.id}
              href={`/reparation/${brandId}/${seriesId}/${model.id}`}
              className="group bg-white border border-sky-100 hover:border-sky-400 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:shadow-sky-100 transition-all duration-200"
            >
              {/* Photo */}
              <div className="bg-sky-50 flex items-center justify-center h-36 pt-4 pb-2 overflow-hidden">
                <DeviceImage
                  src={model.image}
                  alt={model.name}
                  deviceType={series.deviceType}
                  className="object-contain h-28 w-auto group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Name */}
              <div className="px-3 py-2.5 border-t border-sky-50">
                <p className="text-slate-800 text-sm font-semibold text-center leading-tight group-hover:text-sky-600 transition-colors">
                  {model.name}
                </p>
                {model.modelNumber && (
                  <p className="text-slate-400 text-xs text-center mt-0.5">{model.modelNumber}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Other series */}
      <section className="py-8 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-slate-700 font-semibold mb-4 text-sm">Autres gammes {brand.name}</h3>
          <div className="flex flex-wrap gap-3">
            {brand.series
              .filter((s) => s.id !== seriesId)
              .map((s) => (
                <Link
                  key={s.id}
                  href={`/reparation/${brandId}/${s.id}`}
                  className="px-4 py-2 bg-white border border-sky-200 hover:border-sky-400 rounded-full text-slate-600 hover:text-sky-600 text-sm transition-colors shadow-sm"
                >
                  {s.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

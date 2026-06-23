import { notFound } from "next/navigation";
import Link from "next/link";
import { getBrand, getSeries, getModel, getRepairs } from "@/data/devices";
import DeviceImage from "@/components/DeviceImage";
import ProduitsDisponibles from "@/components/ProduitsDisponibles";
import { produitsAvecMiseEnAvant } from "@/lib/products-public";

interface Props {
  params: Promise<{ brand: string; series: string; model: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { brand: brandId, model: modelId, series: seriesId } = await params;
  const model = getModel(brandId, seriesId, modelId);
  if (!model) return { title: "Page non trouvée" };
  return {
    title: `Réparation ${model.name} — TechRepairPro`,
    description: `Réparation ${model.name} : écran, batterie, caméra, connecteur. Diagnostic gratuit. Garantie 90 jours.`,
  };
}

export default async function ModelPage({ params }: Props) {
  const { brand: brandId, series: seriesId, model: modelId } = await params;
  const brand = getBrand(brandId);
  const series = getSeries(brandId, seriesId);
  const model = getModel(brandId, seriesId, modelId);
  if (!brand || !series || !model) notFound();

  const repairs = getRepairs(brandId);
  const { produits, misEnAvant } = await produitsAvecMiseEnAvant({
    brandId,
    modelId,
    modelName: model.name,
  });

  // Nearby models for navigation
  const currentIndex = series.models.findIndex((m) => m.id === modelId);
  const prevModel = currentIndex > 0 ? series.models[currentIndex - 1] : null;
  const nextModel = currentIndex < series.models.length - 1 ? series.models[currentIndex + 1] : null;

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
              {brand.name}
            </Link>
            <span>/</span>
            <Link href={`/reparation/${brandId}/${seriesId}`} className="hover:text-white transition-colors">
              {series.shortName}
            </Link>
            <span>/</span>
            <span className="text-white font-medium">{model.name}</span>
          </div>

          <div className="flex items-center gap-6">
            {/* Phone image */}
            <div className="shrink-0 bg-white/10 rounded-2xl p-3 border border-white/20 hidden sm:flex items-center justify-center">
              <DeviceImage
                src={model.image}
                alt={model.name}
                deviceType={series.deviceType}
                className="object-contain w-20 h-20"
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                Réparation <span className="text-sky-100">{model.name}</span>
              </h1>
              {model.modelNumber && (
                <p className="text-sky-200 text-sm mt-1">Modèle : {model.modelNumber}</p>
              )}
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  Diagnostic gratuit inclus
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white text-sm">
                  Garantie 90 jours
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Repair options */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Réparations disponibles — {model.name}
          </h2>
          <span className="text-slate-400 text-sm">
            Résultats 1 – {repairs.length} sur {repairs.length}.
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repairs.map((repair) => (
            <Link
              key={repair.id}
              href={`/reparation/${brandId}/${seriesId}/${modelId}/${repair.id}`}
              className="group bg-white border border-sky-100 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-100 rounded-2xl p-5 transition-all flex flex-col"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{repair.icon}</span>
                  <div>
                    <h3 className="text-slate-900 font-bold text-sm group-hover:text-sky-600 transition-colors">{repair.name}</h3>
                    <span className="inline-block px-2 py-0.5 bg-sky-100 text-sky-600 text-xs rounded-full mt-0.5">
                      En stock
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sky-600 font-bold text-sm">{repair.price}</p>
                  <p className="text-slate-400 text-xs">Main-d'œuvre incluse</p>
                </div>
              </div>

              <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2 flex-1">
                {repair.description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3 text-slate-400 text-xs">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {repair.duration}
                  </span>
                  <span className="flex items-center gap-1">🛡️ {repair.guarantee}</span>
                </div>
                <span className="px-4 py-1.5 bg-sky-500 group-hover:bg-sky-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm">
                  Voir →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-slate-400 text-xs mt-4 text-center">
          * Les prix sont indicatifs. Un diagnostic gratuit confirmera le devis exact.
        </p>
      </section>

      <ProduitsDisponibles
        produits={produits}
        misEnAvant={misEnAvant}
        titre="Produits disponibles"
        sousTitre="Tous les produits au même endroit — pièces pour cet appareil en premier, puis le reste de la boutique."
      />

      {/* Model navigation */}
      <section className="py-6 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {prevModel ? (
            <Link
              href={`/reparation/${brandId}/${seriesId}/${prevModel.id}`}
              className="flex items-center gap-3 bg-white border border-sky-100 hover:border-sky-300 rounded-xl px-4 py-3 transition-all group max-w-xs"
            >
              <svg className="w-5 h-5 text-sky-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div>
                <p className="text-slate-400 text-xs">Précédent</p>
                <p className="text-slate-700 font-medium text-sm group-hover:text-sky-600 transition-colors">{prevModel.name}</p>
              </div>
            </Link>
          ) : <div />}

          <Link
            href={`/reparation/${brandId}/${seriesId}`}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Tous les {series.shortName}
          </Link>

          {nextModel ? (
            <Link
              href={`/reparation/${brandId}/${seriesId}/${nextModel.id}`}
              className="flex items-center gap-3 bg-white border border-sky-100 hover:border-sky-300 rounded-xl px-4 py-3 transition-all group max-w-xs text-right"
            >
              <div>
                <p className="text-slate-400 text-xs">Suivant</p>
                <p className="text-slate-700 font-medium text-sm group-hover:text-sky-600 transition-colors">{nextModel.name}</p>
              </div>
              <svg className="w-5 h-5 text-sky-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* Other models in series */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-slate-700 font-bold mb-5">Autres modèles — {series.name}</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-3">
          {series.models.map((m) => (
            <Link
              key={m.id}
              href={`/reparation/${brandId}/${seriesId}/${m.id}`}
              className={`flex flex-col items-center gap-2 rounded-xl p-3 border text-center transition-all ${
                m.id === modelId
                  ? "bg-sky-500 border-sky-500 text-white"
                  : "bg-white border-sky-100 hover:border-sky-300 text-slate-600 hover:text-sky-600"
              }`}
            >
              <DeviceImage
                src={m.image}
                alt={m.name}
                deviceType={series.deviceType}
                className="object-contain w-10 h-10"
              />
              <p className="text-xs font-medium leading-tight">{m.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

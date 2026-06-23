import { notFound } from "next/navigation";
import Link from "next/link";
import { getBrand } from "@/data/devices";
import DeviceImage from "@/components/DeviceImage";
import ProduitsDisponibles from "@/components/ProduitsDisponibles";
import { produitsAvecMiseEnAvant } from "@/lib/products-public";

interface Props {
  params: Promise<{ brand: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { brand: brandId } = await params;
  const brand = getBrand(brandId);
  if (!brand) return { title: "Page non trouvée" };
  return {
    title: `Réparation ${brand.name} — TechRepairPro`,
    description: brand.description,
  };
}

export default async function BrandPage({ params }: Props) {
  const { brand: brandId } = await params;
  const brand = getBrand(brandId);
  if (!brand) notFound();

  const { produits, misEnAvant } = await produitsAvecMiseEnAvant({ brandId });

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-500 to-blue-600 pt-14 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sky-200 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white font-medium">Réparation {brand.name}</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{brand.emoji}</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                Réparation <span className="text-sky-100">{brand.name}</span>
              </h1>
              <p className="text-sky-200 mt-1">{brand.tagline}</p>
            </div>
          </div>
          <p className="text-sky-100 max-w-2xl">{brand.description}</p>
        </div>
      </section>

      {/* Series grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          Sélectionnez une gamme
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brand.series.map((series) => (
            <Link
              key={series.id}
              href={`/reparation/${brandId}/${series.id}`}
              className="group bg-white border border-sky-100 hover:border-sky-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-sky-100 transition-all duration-200"
            >
              <div className="bg-sky-50 flex items-center justify-center h-44 overflow-hidden">
                <DeviceImage
                  src={series.image}
                  alt={series.name}
                  deviceType={series.deviceType}
                  className="object-contain h-36 w-auto group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {series.name}
                </h3>
                <p className="text-sky-500 text-sm mt-1 flex items-center gap-1">
                  {series.models.length} modèles disponibles
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ProduitsDisponibles
        produits={produits}
        misEnAvant={misEnAvant}
        sousTitre="Tous nos produits ici — iPhone, Samsung, MacBook et plus. Les articles pour cette marque sont en premier."
      />

      {/* CTA */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-slate-900 font-bold text-xl mb-1">Vous ne trouvez pas votre modèle ?</h3>
            <p className="text-slate-500 text-sm">Contactez-nous directement — nous réparons presque tous les modèles.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/contact" className="px-5 py-2.5 bg-white border border-sky-200 hover:border-sky-400 text-slate-700 font-semibold rounded-xl text-sm transition-colors">
              Nous contacter
            </Link>
            <Link href="/rendez-vous" className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm">
              Rendez-vous
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

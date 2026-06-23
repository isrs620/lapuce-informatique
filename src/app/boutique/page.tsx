import ProduitsDisponibles from "@/components/ProduitsDisponibles";
import { produitsPubliesTous } from "@/lib/products-public";

export const metadata = {
  title: "Boutique — LaPuce Informatique",
  description: "Pièces, accessoires et produits pour iPhone, Samsung, MacBook et plus. Tous appareils au même endroit.",
};

export default async function BoutiquePage() {
  const produits = await produitsPubliesTous();

  return (
    <>
      <section className="bg-gradient-to-br from-sky-500 to-blue-600 pt-14 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Boutique</h1>
          <p className="text-sky-100 max-w-xl mx-auto">
            Tous nos produits — iPhone, Samsung, MacBook, accessoires — au même endroit. Pas besoin de chercher par marque.
          </p>
        </div>
      </section>

      {produits.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          Aucun produit en boutique pour l&apos;instant.
        </div>
      ) : (
        <ProduitsDisponibles
          produits={produits}
          titre="Tous les produits"
          sousTitre="Pièces et accessoires en stock — disponibles en boutique"
        />
      )}
    </>
  );
}

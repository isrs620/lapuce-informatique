"use client";

import { useEffect, useState } from "react";
import type { Produit } from "@/lib/types/produit";
import { formatPrix, prixEffectif } from "@/lib/types/produit";
import { labelAppareil } from "@/lib/produit-utils";
import { ajouterAuPanier } from "@/lib/cart";

interface Props {
  produits: Produit[];
  titre?: string;
  sousTitre?: string;
  /** IDs des produits pour cet appareil (badge « Pour vous ») */
  misEnAvant?: string[];
}

export default function ProduitsDisponibles({
  produits,
  titre = "Produits disponibles",
  sousTitre = "Pièces et accessoires en stock — tous appareils, une seule boutique",
  misEnAvant = [],
}: Props) {
  const [ajoute, setAjoute] = useState<string | null>(null);

  if (produits.length === 0) return null;

  const handlePanier = (p: Produit) => {
    ajouterAuPanier(p);
    setAjoute(p.id);
    setTimeout(() => setAjoute(null), 2000);
    window.dispatchEvent(new Event("panier-updated"));
  };

  return (
    <section className="py-12 bg-white border-t border-sky-100" id="produits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">{titre}</h2>
        <p className="text-slate-500 text-sm mb-8">{sousTitre}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produits.map((p) => {
            const prix = prixEffectif(p);
            const enAvant = misEnAvant.includes(p.id);
            return (
              <article
                key={p.id}
                className={`bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col ${
                  enAvant ? "border-sky-400 ring-2 ring-sky-100" : "border-sky-100"
                }`}
              >
                <div className="h-40 bg-gradient-to-b from-sky-50 to-white flex items-center justify-center p-4 relative">
                  {enAvant && (
                    <span className="absolute top-2 left-2 text-[10px] font-bold uppercase bg-sky-500 text-white px-2 py-0.5 rounded-full">
                      Pour cet appareil
                    </span>
                  )}
                  {p.photo_principale ? (
                    <img src={p.photo_principale} alt={p.nom} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-5xl text-sky-200">📦</span>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1 border-t border-sky-50">
                  <p className="text-[11px] text-sky-600 font-bold uppercase tracking-wider">
                    {labelAppareil(p)}
                  </p>
                  <h3 className="font-bold text-slate-900 mt-1.5 text-base leading-snug">{p.nom}</h3>
                  {p.description && (
                    <p className="text-slate-500 text-sm mt-2 line-clamp-2 flex-1">{p.description}</p>
                  )}

                  <div className="flex items-center justify-between mt-4 gap-2">
                    <div>
                      <p className="text-xl font-extrabold text-sky-600">{formatPrix(prix)}</p>
                      {p.promotion_active && prix < p.prix && (
                        <p className="text-xs text-slate-400 line-through">{formatPrix(p.prix)}</p>
                      )}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700 shrink-0">
                      En stock
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePanier(p)}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {ajoute === p.id ? "✓ Ajouté !" : "Ajouter au panier"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

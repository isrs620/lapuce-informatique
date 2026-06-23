"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrix } from "@/lib/types/produit";
import { lirePanier, retirerDuPanier, totalPanier, type CartItem } from "@/lib/cart";

export default function PanierPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  const refresh = () => setItems(lirePanier());

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener("panier-updated", handler);
    return () => window.removeEventListener("panier-updated", handler);
  }, []);

  const total = totalPanier(items);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Mon panier</h1>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-sky-50 rounded-2xl border border-sky-100">
          <p className="text-slate-500 mb-4">Votre panier est vide.</p>
          <Link href="/boutique" className="text-sky-600 font-semibold hover:underline">
            Voir la boutique →
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-4 mb-8">
            {items.map((item) => (
              <li key={item.produitId} className="flex gap-4 bg-white border border-sky-100 rounded-2xl p-4">
                <div className="w-16 h-16 bg-sky-50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                  {item.photo ? (
                    <img src={item.photo} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span>📦</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-sky-600 font-bold uppercase">
                    {[item.marque, item.modele].filter(Boolean).join(" ").toUpperCase()}
                  </p>
                  <p className="font-bold text-slate-900">{item.nom}</p>
                  <p className="text-sky-600 font-semibold mt-1">
                    {formatPrix(item.prix)} × {item.qty}
                  </p>
                </div>
                <button
                  onClick={() => {
                    retirerDuPanier(item.produitId);
                    refresh();
                    window.dispatchEvent(new Event("panier-updated"));
                  }}
                  className="text-red-500 text-sm hover:underline shrink-0"
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>

          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xl font-extrabold text-slate-900">
              Total : <span className="text-sky-600">{formatPrix(total)}</span>
            </p>
            <Link
              href="/rendez-vous"
              className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl shadow-md"
            >
              Passer commande en boutique
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

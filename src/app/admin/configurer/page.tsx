"use client";

import Link from "next/link";

export default function ConfigurerSupabasePage() {
  return (
    <div className="max-w-xl">
      <Link href="/admin/produits" className="text-sm text-sky-600 hover:underline">← Retour</Link>
      <h1 className="text-2xl font-extrabold text-slate-900 mt-4 mb-2">Stockage des produits</h1>

      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-sm text-green-800 space-y-3">
        <p className="font-bold text-base">✓ Tout est déjà configuré</p>
        <p>
          Les produits sont enregistrés localement dans <code>data/produits.json</code> et les photos dans{" "}
          <code>public/uploads/produits/</code>.
        </p>
        <p>
          Aucune clé Supabase n&apos;est nécessaire pour gérer les produits. La clé{" "}
          <code>sb_publishable_...</code> sert uniquement au site public (rendez-vous, messages).
        </p>
      </div>

      <Link
        href="/admin/produits/nouveau"
        className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl"
      >
        → Ajouter un produit
      </Link>
    </div>
  );
}

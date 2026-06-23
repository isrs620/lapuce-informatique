"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { formatPrix, prixEffectif, type Produit } from "@/lib/types/produit";
import Link from "next/link";

interface Props {
  produits: Produit[];
  onDelete: (id: string) => Promise<void>;
  onPriceChange: (id: string, data: Partial<Produit>) => Promise<void>;
  loading?: boolean;
}

export default function ProductTable({ produits, onDelete, onPriceChange, loading }: Props) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const handleDelete = async (id: string, nom: string) => {
    if (!confirm(`Supprimer « ${nom} » ?`)) return;
    setDeleting(id);
    await onDelete(id);
    setDeleting(null);
  };

  const showSaved = (id: string) => {
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  };

  if (loading) {
    return <div className="text-center py-16 text-slate-400">Chargement des produits...</div>;
  }

  if (produits.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
        <p className="text-slate-400 mb-4">Aucun produit trouvé.</p>
        <Link href="/admin/produits/nouveau" className="text-sky-600 font-semibold hover:underline">
          Ajouter le premier produit →
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-sky-50 text-left text-slate-600">
              <th className="px-4 py-3 font-semibold">Photo</th>
              <th className="px-4 py-3 font-semibold">Nom</th>
              <th className="px-4 py-3 font-semibold">Prix</th>
              <th className="px-4 py-3 font-semibold">Stock</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {produits.map((p) => (
              <ProductRow
                key={p.id}
                produit={p}
                deleting={deleting === p.id}
                saved={saved === p.id}
                onDelete={() => handleDelete(p.id, p.nom)}
                onPriceChange={async (data) => {
                  await onPriceChange(p.id, data);
                  showSaved(p.id);
                }}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {produits.map((p) => (
          <ProductCard
            key={p.id}
            produit={p}
            deleting={deleting === p.id}
            onDelete={() => handleDelete(p.id, p.nom)}
            onPriceChange={async (data) => {
              await onPriceChange(p.id, data);
              showSaved(p.id);
            }}
            saved={saved === p.id}
          />
        ))}
      </div>
    </>
  );
}

function ProductImage({ src, alt }: { src?: string | null; alt: string }) {
  return (
    <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-300 text-lg">📦</div>
      )}
    </div>
  );
}

function ProductRow({
  produit: p,
  deleting,
  saved,
  onDelete,
  onPriceChange,
}: {
  produit: Produit;
  deleting: boolean;
  saved: boolean;
  onDelete: () => void;
  onPriceChange: (data: Partial<Produit>) => Promise<void>;
}) {
  const effectif = prixEffectif(p);
  return (
    <tr className="hover:bg-slate-50/80 transition-colors">
      <td className="px-4 py-3">
        <ProductImage src={p.photo_principale} alt={p.nom} />
      </td>
      <td className="px-4 py-3">
        <p className="font-semibold text-slate-900">{p.nom}</p>
        <p className="text-xs text-slate-400">{p.marque} · {p.modele}</p>
        {p.promotion_active && (
          <span className="inline-block mt-1 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
            Promo
          </span>
        )}
      </td>
      <td className="px-4 py-3">
        <InlinePriceEditor produit={p} onSave={onPriceChange} />
        {p.promotion_active && effectif < p.prix && (
          <p className="text-xs text-green-600 mt-0.5">→ {formatPrix(effectif)}</p>
        )}
        {saved && <p className="text-xs text-green-500 mt-0.5">✓ Enregistré</p>}
      </td>
      <td className="px-4 py-3">
        <span className={`font-medium ${p.stock <= 0 ? "text-red-500" : p.stock < 5 ? "text-orange-500" : "text-slate-700"}`}>
          {p.stock}
        </span>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end gap-2">
          <Link
            href={`/admin/produits/${p.id}`}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100"
          >
            Modifier
          </Link>
          <button
            onClick={onDelete}
            disabled={deleting}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 disabled:opacity-50"
          >
            {deleting ? "..." : "Supprimer"}
          </button>
        </div>
      </td>
    </tr>
  );
}

function ProductCard({
  produit: p,
  deleting,
  saved,
  onDelete,
  onPriceChange,
}: {
  produit: Produit;
  deleting: boolean;
  saved: boolean;
  onDelete: () => void;
  onPriceChange: (data: Partial<Produit>) => Promise<void>;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <div className="flex gap-3">
        <ProductImage src={p.photo_principale} alt={p.nom} />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 truncate">{p.nom}</h3>
          <p className="text-xs text-slate-400">{p.marque} · Stock: {p.stock}</p>
          <InlinePriceEditor produit={p} onSave={onPriceChange} />
          {saved && <p className="text-xs text-green-500">✓ Enregistré</p>}
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <Link href={`/admin/produits/${p.id}`} className="flex-1 text-center py-2 text-sm font-semibold bg-sky-50 text-sky-700 rounded-lg border border-sky-200">
          Modifier
        </Link>
        <button onClick={onDelete} disabled={deleting} className="flex-1 py-2 text-sm font-semibold bg-red-50 text-red-600 rounded-lg border border-red-200 disabled:opacity-50">
          Supprimer
        </button>
      </div>
    </div>
  );
}

function InlinePriceEditor({
  produit,
  onSave,
}: {
  produit: Produit;
  onSave: (data: Partial<Produit>) => Promise<void>;
}) {
  const [prix, setPrix] = useState(String(produit.prix));
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setPrix(String(produit.prix));
  }, [produit.prix]);

  const scheduleSave = useCallback(
    (value: string) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(async () => {
        const num = parseFloat(value);
        if (!isNaN(num) && num !== produit.prix) {
          await onSave({ prix: num });
        }
      }, 800);
    },
    [onSave, produit.prix]
  );

  return (
    <div className="flex items-center gap-1">
      <input
        type="number"
        step="0.01"
        min="0"
        value={prix}
        onChange={(e) => {
          setPrix(e.target.value);
          scheduleSave(e.target.value);
        }}
        className="w-24 border border-slate-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-sky-400"
      />
      <span className="text-slate-400 text-xs">$</span>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { formatPrix, prixEffectif, type Produit } from "@/lib/types/produit";
import Link from "next/link";

export default function ProductPricesTable() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchProduits = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/produits");
    const data = await res.json();
    if (res.ok) setProduits(data.produits ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProduits();
  }, [fetchProduits]);

  const savePrice = async (id: string, patch: Partial<Produit>) => {
    await fetch(`/api/admin/produits/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    setProduits((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  };

  const filtered = produits.filter((p) => {
    if (!search.trim()) return true;
    const s = search.toLowerCase();
    return [p.nom, p.marque, p.modele, p.categorie].some((v) => v.toLowerCase().includes(s));
  });

  if (loading) return <div className="text-center py-16 text-slate-400">Chargement...</div>;

  if (produits.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
        <p className="text-slate-400 mb-4">Aucun produit.</p>
        <Link href="/admin/produits/nouveau" className="text-sky-600 font-semibold hover:underline">
          Ajouter un produit →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher un produit..."
        className="w-full max-w-md border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-400 bg-white"
      />

      <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="bg-sky-50 text-left text-slate-600">
              <th className="px-4 py-3 font-semibold">Produit</th>
              <th className="px-4 py-3 font-semibold">Prix ($)</th>
              <th className="px-4 py-3 font-semibold">Promo</th>
              <th className="px-4 py-3 font-semibold">Prix promo ($)</th>
              <th className="px-4 py-3 font-semibold">Réduction (%)</th>
              <th className="px-4 py-3 font-semibold">Prix final</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((p) => (
              <ProductPriceRow key={p.id} produit={p} onSave={savePrice} saved={saved === p.id} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-4">
        {filtered.map((p) => (
          <ProductPriceCard key={p.id} produit={p} onSave={savePrice} saved={saved === p.id} />
        ))}
      </div>
    </div>
  );
}

function ProductPriceRow({
  produit: p,
  onSave,
  saved,
}: {
  produit: Produit;
  onSave: (id: string, patch: Partial<Produit>) => Promise<void>;
  saved: boolean;
}) {
  return (
    <tr className="hover:bg-slate-50/80">
      <td className="px-4 py-3">
        <p className="font-semibold text-slate-900">{p.nom}</p>
        <p className="text-xs text-slate-400">{p.marque} · {p.modele}</p>
        {saved && <p className="text-xs text-green-500 mt-0.5">✓ Enregistré</p>}
      </td>
      <td className="px-4 py-3">
        <PriceInput value={p.prix} onSave={(v) => onSave(p.id, { prix: v })} />
      </td>
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={p.promotion_active}
          onChange={(e) => onSave(p.id, { promotion_active: e.target.checked })}
          className="w-4 h-4 rounded text-sky-500"
        />
      </td>
      <td className="px-4 py-3">
        <PriceInput
          value={p.prix_promo ?? 0}
          disabled={!p.promotion_active}
          onSave={(v) => onSave(p.id, { prix_promo: v || null })}
        />
      </td>
      <td className="px-4 py-3">
        <PriceInput
          value={p.reduction_pct ?? 0}
          disabled={!p.promotion_active}
          onSave={(v) => onSave(p.id, { reduction_pct: v || null })}
        />
      </td>
      <td className="px-4 py-3 font-bold text-sky-600">
        {formatPrix(prixEffectif(p))}
      </td>
    </tr>
  );
}

function ProductPriceCard({
  produit: p,
  onSave,
  saved,
}: {
  produit: Produit;
  onSave: (id: string, patch: Partial<Produit>) => Promise<void>;
  saved: boolean;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
      <div>
        <p className="font-bold">{p.nom}</p>
        <p className="text-xs text-slate-400">{p.marque} · {p.modele}</p>
        {saved && <p className="text-xs text-green-500">✓ Enregistré</p>}
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <label className="block">
          <span className="text-slate-500 text-xs">Prix</span>
          <PriceInput value={p.prix} onSave={(v) => onSave(p.id, { prix: v })} />
        </label>
        <label className="flex items-end gap-2 pb-2">
          <input
            type="checkbox"
            checked={p.promotion_active}
            onChange={(e) => onSave(p.id, { promotion_active: e.target.checked })}
          />
          <span className="text-xs">Promo</span>
        </label>
      </div>
      <p className="font-bold text-sky-600">Final : {formatPrix(prixEffectif(p))}</p>
    </div>
  );
}

function PriceInput({
  value,
  onSave,
  disabled,
}: {
  value: number;
  onSave: (v: number) => void;
  disabled?: boolean;
}) {
  const [local, setLocal] = useState(String(value));
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocal(String(value));
  }, [value]);

  const schedule = (v: string) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const n = parseFloat(v);
      if (!isNaN(n) && n !== value) onSave(n);
    }, 700);
  };

  return (
    <input
      type="number"
      step="0.01"
      min="0"
      disabled={disabled}
      value={local}
      onChange={(e) => {
        setLocal(e.target.value);
        schedule(e.target.value);
      }}
      className="w-24 border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-sky-400 disabled:opacity-40"
    />
  );
}

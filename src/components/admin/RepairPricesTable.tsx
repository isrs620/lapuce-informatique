"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { formatPrix } from "@/lib/types/produit";

interface Row {
  brandId: string;
  brandName: string;
  repairId: string;
  repairName: string;
  tierId: string;
  tierName: string;
  price: number;
  defaultPrice: number;
}

export default function RepairPricesTable() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState<string | null>(null);
  const [filterBrand, setFilterBrand] = useState("all");
  const [search, setSearch] = useState("");

  const fetchRows = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/prix/reparations");
    const data = await res.json();
    if (res.ok) setRows(data.rows ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const savePrice = async (row: Row, price: number) => {
    await fetch("/api/admin/prix/reparations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brandId: row.brandId,
        repairId: row.repairId,
        tierId: row.tierId,
        price,
      }),
    });
    const key = `${row.brandId}:${row.repairId}:${row.tierId}`;
    setRows((prev) =>
      prev.map((r) =>
        r.brandId === row.brandId && r.repairId === row.repairId && r.tierId === row.tierId
          ? { ...r, price }
          : r
      )
    );
    setSaved(key);
    setTimeout(() => setSaved(null), 2000);
  };

  const brands = [...new Set(rows.map((r) => r.brandId))];
  const brandNames = Object.fromEntries(
    rows.map((r) => [r.brandId, r.brandName]).filter((v, i, a) => a.findIndex((x) => x[0] === v[0]) === i)
  );

  const filtered = rows.filter((r) => {
    if (filterBrand !== "all" && r.brandId !== filterBrand) return false;
    if (!search.trim()) return true;
    const s = search.toLowerCase();
    return [r.repairName, r.tierName, r.brandName].some((v) => v.toLowerCase().includes(s));
  });

  if (loading) return <div className="text-center py-16 text-slate-400">Chargement des prix réparation...</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <select
          value={filterBrand}
          onChange={(e) => setFilterBrand(e.target.value)}
          className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-sky-400"
        >
          <option value="all">Toutes les marques</option>
          {brands.map((b) => (
            <option key={b} value={b}>{brandNames[b] ?? b}</option>
          ))}
        </select>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une réparation..."
          className="flex-1 min-w-[200px] border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-400 bg-white"
        />
      </div>

      <p className="text-xs text-slate-400">
        {filtered.length} tarif{filtered.length !== 1 ? "s" : ""} — modifications enregistrées automatiquement sur le site.
      </p>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="bg-sky-50 text-left text-slate-600">
              <th className="px-4 py-3 font-semibold">Marque</th>
              <th className="px-4 py-3 font-semibold">Réparation</th>
              <th className="px-4 py-3 font-semibold">Option</th>
              <th className="px-4 py-3 font-semibold">Prix ($)</th>
              <th className="px-4 py-3 font-semibold">Défaut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((r) => {
              const key = `${r.brandId}:${r.repairId}:${r.tierId}`;
              return (
                <tr key={key} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 text-slate-600">{r.brandName}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{r.repairName}</td>
                  <td className="px-4 py-3 text-slate-600">{r.tierName}</td>
                  <td className="px-4 py-3">
                    <RepairPriceInput value={r.price} onSave={(v) => savePrice(r, v)} />
                    {saved === key && <p className="text-xs text-green-500 mt-0.5">✓</p>}
                  </td>
                  <td className="px-4 py-3 text-slate-400">{formatPrix(r.defaultPrice)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RepairPriceInput({ value, onSave }: { value: number; onSave: (v: number) => void }) {
  const [local, setLocal] = useState(String(value));
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setLocal(String(value)), [value]);

  return (
    <input
      type="number"
      step="1"
      min="0"
      value={local}
      onChange={(e) => {
        setLocal(e.target.value);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          const n = parseFloat(e.target.value);
          if (!isNaN(n) && n !== value) onSave(n);
        }, 700);
      }}
      className="w-24 border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-sky-400"
    />
  );
}

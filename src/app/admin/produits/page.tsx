"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import ProductTable from "@/components/admin/ProductTable";
import type { Produit } from "@/lib/types/produit";

export default function AdminProduitsPage() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const fetchProduits = useCallback(async (q = "") => {
    setLoading(true);
    const url = q ? `/api/admin/produits?q=${encodeURIComponent(q)}` : "/api/admin/produits";
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) setProduits(data.produits ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProduits();
  }, [fetchProduits]);

  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(search);
      fetchProduits(search);
    }, 300);
    return () => clearTimeout(t);
  }, [search, fetchProduits]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/produits/${id}`, { method: "DELETE" });
    setProduits((prev) => prev.filter((p) => p.id !== id));
  };

  const handlePriceChange = async (id: string, data: Partial<Produit>) => {
    await fetch(`/api/admin/produits/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setProduits((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Gestion des produits</h1>
          <p className="text-slate-500 mt-1">{produits.length} produit{produits.length !== 1 ? "s" : ""}{query && ` — recherche « ${query} »`}</p>
        </div>
        <Link
          href="/admin/produits/nouveau"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-sky-200 hover:from-sky-600 hover:to-blue-700 transition-all"
        >
          ➕ Ajouter un produit
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom, marque, modèle..."
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 bg-white"
          />
        </div>
      </div>

      <ProductTable
        produits={produits}
        loading={loading}
        onDelete={handleDelete}
        onPriceChange={handlePriceChange}
      />
    </div>
  );
}

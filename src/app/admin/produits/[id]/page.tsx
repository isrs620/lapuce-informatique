"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProductForm, { type ProductFormData } from "@/components/admin/ProductForm";
import type { Produit } from "@/lib/types/produit";
import { urlReparation } from "@/lib/marque-brand";

export default function EditProduitPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [produit, setProduit] = useState<Produit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProduit = useCallback(async () => {
    const res = await fetch(`/api/admin/produits/${id}`);
    const data = await res.json();
    if (res.ok) {
      setProduit(data.produit);
    } else {
      setError(data.error || "Produit introuvable");
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchProduit();
  }, [fetchProduit]);

  const saveProduct = async (data: Partial<ProductFormData>) => {
    const res = await fetch(`/api/admin/produits/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error || "Erreur");
    }
    const json = await res.json();
    setProduit((prev) => prev ? { ...prev, ...json.produit } : json.produit);
  };

  const handleAutoSave = async (data: Partial<ProductFormData>) => {
    await saveProduct(data);
    await fetchProduit();
  };

  const handleSubmit = async (data: ProductFormData) => {
    await handleAutoSave(data);
    router.push("/admin/produits");
  };

  const handleDelete = async () => {
    if (!produit || !confirm(`Supprimer « ${produit.nom} » définitivement ?`)) return;
    await fetch(`/api/admin/produits/${id}`, { method: "DELETE" });
    router.push("/admin/produits");
  };

  const pagePublique = produit ? urlReparation(produit.marque, produit.categorie) : null;

  if (loading) return <div className="text-center py-20 text-slate-400">Chargement...</div>;
  if (error || !produit) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">{error}</p>
        <Link href="/admin/produits" className="text-sky-600 hover:underline">← Retour</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <Link href="/admin/produits" className="text-sm text-sky-600 hover:underline mb-2 inline-block">
            ← Retour aux produits
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Modifier — {produit.nom}</h1>
          <p className="text-slate-500 mt-1">Les modifications sont enregistrées automatiquement.</p>
          {produit.publie !== false && pagePublique && (
            <Link href={pagePublique} target="_blank" className="inline-block mt-2 text-sm text-sky-600 font-semibold hover:underline">
              Voir sur {pagePublique} →
            </Link>
          )}
        </div>
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 shrink-0"
        >
          Supprimer le produit
        </button>
      </div>

      <ProductForm
        initial={produit}
        onSubmit={handleSubmit}
        onAutoSave={handleAutoSave}
        autoSave
        submitLabel="Terminer et retourner à la liste"
      />
    </div>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import ProductForm, { type ProductFormData } from "@/components/admin/ProductForm";
import { parsePrefillFromSearch } from "@/lib/device-product-prefill";

function NouveauProduitContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefill = parsePrefillFromSearch(searchParams);

  const initial = {
    nom: prefill.nom ?? "",
    marque: prefill.marque ?? "",
    modele: prefill.modele ?? "",
    categorie: prefill.categorie ?? "Autre",
    publie: true,
  };

  const handleSubmit = async (data: ProductFormData) => {
    const res = await fetch("/api/admin/produits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, gallery: data.gallery }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Erreur lors de la création");
    router.push(`/admin/produits/${json.produit.id}`);
  };

  const contextLabel =
    prefill.model && prefill.nom
      ? `pour ${prefill.nom}`
      : prefill.marque
        ? `pour ${prefill.marque}`
        : "";

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/appareils" className="text-sm text-sky-600 hover:underline mb-2 inline-block">
          ← Choisir un autre appareil
        </Link>
        <Link href="/admin/produits" className="text-sm text-slate-400 hover:underline ml-4">
          Liste produits
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Ajouter un produit {contextLabel}
        </h1>
        <p className="text-slate-500 mt-1">
          Champs préremplis depuis la page appareil. Une fois publié, le produit apparaît sur la page réparation.
        </p>
      </div>
      <ProductForm initial={initial} onSubmit={handleSubmit} submitLabel="Publier le produit" />
    </div>
  );
}

export default function NouveauProduitPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-400">Chargement...</div>}>
      <NouveauProduitContent />
    </Suspense>
  );
}

"use client";

import { useState } from "react";
import ProductPricesTable from "@/components/admin/ProductPricesTable";
import RepairPricesTable from "@/components/admin/RepairPricesTable";

export default function AdminPrixPage() {
  const [tab, setTab] = useState<"produits" | "reparations">("produits");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Gestion des prix</h1>
        <p className="text-slate-500 mt-1">
          Modifiez tous les prix en un seul endroit — enregistrement automatique.
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("produits")}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            tab === "produits"
              ? "bg-sky-500 text-white shadow-md shadow-sky-200"
              : "bg-white border border-slate-200 text-slate-600 hover:border-sky-300"
          }`}
        >
          📦 Prix produits
        </button>
        <button
          onClick={() => setTab("reparations")}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            tab === "reparations"
              ? "bg-sky-500 text-white shadow-md shadow-sky-200"
              : "bg-white border border-slate-200 text-slate-600 hover:border-sky-300"
          }`}
        >
          🔧 Prix réparations
        </button>
      </div>

      {tab === "produits" ? <ProductPricesTable /> : <RepairPricesTable />}
    </div>
  );
}

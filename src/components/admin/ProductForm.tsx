"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CATEGORIES, formatPrix, prixEffectif, type Produit } from "@/lib/types/produit";
import { urlReparation } from "@/lib/marque-brand";
import PhotoManager from "./PhotoManager";

export interface ProductFormData {
  nom: string;
  marque: string;
  modele: string;
  prix: number;
  prix_promo: number | null;
  promotion_active: boolean;
  reduction_pct: number | null;
  description: string;
  categorie: string;
  stock: number;
  publie: boolean;
  photo_principale: string | null;
  gallery: string[];
}

const EMPTY: ProductFormData = {
  nom: "",
  marque: "",
  modele: "",
  prix: 0,
  prix_promo: null,
  promotion_active: false,
  reduction_pct: null,
  description: "",
  categorie: "Autre",
  stock: 0,
  publie: true,
  photo_principale: null,
  gallery: [],
};

interface Props {
  initial?: Partial<Produit> & { gallery?: string[] };
  onSubmit: (data: ProductFormData) => Promise<void>;
  onAutoSave?: (data: Partial<ProductFormData>) => Promise<void>;
  submitLabel?: string;
  autoSave?: boolean;
}

export default function ProductForm({
  initial,
  onSubmit,
  onAutoSave,
  submitLabel = "Enregistrer le produit",
  autoSave = false,
}: Props) {
  const [form, setForm] = useState<ProductFormData>(() => ({
    ...EMPTY,
    nom: initial?.nom ?? "",
    marque: initial?.marque ?? "",
    modele: initial?.modele ?? "",
    prix: initial?.prix ?? 0,
    prix_promo: initial?.prix_promo ?? null,
    promotion_active: initial?.promotion_active ?? false,
    reduction_pct: initial?.reduction_pct ?? null,
    description: initial?.description ?? "",
    categorie: initial?.categorie ?? "Autre",
    stock: initial?.stock ?? 0,
    publie: initial?.publie !== false,
    photo_principale: initial?.photo_principale ?? null,
    gallery: initial?.gallery ?? initial?.produit_photos?.map((p) => p.url) ?? [],
  }));
  const [saving, setSaving] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);
  const [error, setError] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstMount = useRef(true);

  const update = <K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const scheduleAutoSave = useCallback(
    (data: ProductFormData) => {
      if (!autoSave || !onAutoSave) return;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(async () => {
        await onAutoSave(data);
        setAutoSaved(true);
        setTimeout(() => setAutoSaved(false), 2000);
      }, 1000);
    },
    [autoSave, onAutoSave]
  );

  useEffect(() => {
    if (!autoSave) return;
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    scheduleAutoSave(form);
  }, [form, autoSave, scheduleAutoSave]);

  const uploadFile = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload échoué");
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom.trim()) {
      setError("Le nom du produit est requis.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSaving(false);
    }
  };

  const effectif = prixEffectif(form);
  const pageReparation = urlReparation(form.marque, form.categorie);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {autoSaved && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2 rounded-xl">
          ✓ Modifications enregistrées automatiquement
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-bold text-slate-900">Informations générales</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nom du produit *" value={form.nom} onChange={(v) => update("nom", v)} required />
          <Field label="Catégorie" value={form.categorie} onChange={(v) => update("categorie", v)} select options={[...CATEGORIES]} />
          <Field label="Marque" value={form.marque} onChange={(v) => update("marque", v)} placeholder="ex: iphone, samsung, ipad..." />
          <Field label="Modèle" value={form.modele} onChange={(v) => update("modele", v)} placeholder="ex: 14 Pro, Galaxy S24..." />
          <Field label="Stock disponible" value={String(form.stock)} onChange={(v) => update("stock", parseInt(v) || 0)} type="number" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={4}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 resize-y"
            placeholder="Description du produit..."
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Publication sur le site</h2>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.publie}
            onChange={(e) => update("publie", e.target.checked)}
            className="w-4 h-4 mt-1 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
          />
          <div>
            <span className="text-sm font-semibold text-slate-800">Publier sur la page réparation</span>
            <p className="text-xs text-slate-500 mt-1">
              Le produit apparaît sur la page réparation selon la marque (ex: marque &quot;iphone&quot; → /reparation/iphone).
            </p>
          </div>
        </label>
        {form.publie && pageReparation && (
          <p className="text-sm text-sky-600">
            → Visible sur{" "}
            <Link href={pageReparation} target="_blank" className="font-semibold underline">
              {pageReparation}
            </Link>
          </p>
        )}
        {form.publie && !pageReparation && form.marque && (
          <p className="text-sm text-orange-600">Marque non reconnue — utilisez: iphone, samsung, ipad, macbook, consoles...</p>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-bold text-slate-900">Prix et promotions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="Prix ($)" value={String(form.prix)} onChange={(v) => update("prix", parseFloat(v) || 0)} type="number" step="0.01" />
          <div className="flex items-center gap-3 sm:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.promotion_active}
                onChange={(e) => update("promotion_active", e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
              />
              <span className="text-sm font-medium text-slate-700">Promotion active</span>
            </label>
          </div>
          {form.promotion_active && (
            <>
              <Field
                label="Prix promotionnel ($)"
                value={form.prix_promo != null ? String(form.prix_promo) : ""}
                onChange={(v) => update("prix_promo", v ? parseFloat(v) : null)}
                type="number"
                step="0.01"
              />
              <Field
                label="Réduction (%)"
                value={form.reduction_pct != null ? String(form.reduction_pct) : ""}
                onChange={(v) => update("reduction_pct", v ? parseFloat(v) : null)}
                type="number"
                step="1"
              />
            </>
          )}
        </div>
        {form.promotion_active && (
          <p className="text-sm text-green-600 font-medium">
            Prix effectif : {formatPrix(effectif)}
            {effectif < form.prix && (
              <span className="text-slate-400 line-through ml-2">{formatPrix(form.prix)}</span>
            )}
          </p>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-5">Photos</h2>
        <PhotoManager
          mainPhoto={form.photo_principale}
          gallery={form.gallery}
          onMainPhotoChange={(url) => update("photo_principale", url)}
          onGalleryChange={(urls) => update("gallery", urls)}
          onUpload={uploadFile}
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p>{error}</p>
          {error.includes("RLS") && (
            <Link
              href="/admin/configurer"
              className="inline-block mt-3 px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600"
            >
              → Configurer Supabase maintenant
            </Link>
          )}
        </div>
      )}

      {!autoSave && (
        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-sky-200 hover:from-sky-600 hover:to-blue-700 disabled:opacity-60 transition-all"
        >
          {saving ? "Enregistrement..." : submitLabel}
        </button>
      )}
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  step,
  required,
  select,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  step?: string;
  required?: boolean;
  select?: boolean;
  options?: string[];
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
      {select && options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-400 bg-white"
        >
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          step={step}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-400"
        />
      )}
    </div>
  );
}

"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { use, useState } from "react";
import { getBrand, getSeries, getModel, getRepair, getRepairs } from "@/data/devices";
import DeviceImage from "@/components/DeviceImage";

interface Props {
  params: Promise<{ brand: string; series: string; model: string; repair: string }>;
}

export default function RepairDetailPage({ params }: Props) {
  const { brand: brandId, series: seriesId, model: modelId, repair: repairId } = use(params);

  const brand = getBrand(brandId);
  const series = getSeries(brandId, seriesId);
  const model = getModel(brandId, seriesId, modelId);
  const repair = getRepair(brandId, repairId);

  if (!brand || !series || !model || !repair) notFound();

  const defaultTier = repair.tiers.find((t) => t.badge === "Populaire" || t.badge === "Recommandé") ?? repair.tiers[0];
  const [selectedTier, setSelectedTier] = useState(defaultTier);
  const [serviceMode, setServiceMode] = useState<"magasin" | "colis">("magasin");

  const isFree = selectedTier.price === 0;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-sky-50 border-b border-sky-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 flex-wrap">
            <Link href="/" className="hover:text-sky-500 transition-colors">Accueil</Link>
            <span>/</span>
            <Link href={`/reparation/${brandId}`} className="hover:text-sky-500 transition-colors">{brand.name}</Link>
            <span>/</span>
            <Link href={`/reparation/${brandId}/${seriesId}`} className="hover:text-sky-500 transition-colors">{series.shortName}</Link>
            <span>/</span>
            <Link href={`/reparation/${brandId}/${seriesId}/${modelId}`} className="hover:text-sky-500 transition-colors">{model.name}</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">{repair.name}</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ─── Left — Device image ─── */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-sm bg-gradient-to-b from-sky-50 to-white rounded-3xl border border-sky-100 shadow-sm flex items-center justify-center p-10" style={{ minHeight: 380 }}>
              <DeviceImage
                src={model.image}
                alt={model.name}
                deviceType={series.deviceType}
                className="object-contain max-h-72 w-auto"
              />
              {/* Repair badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-2 bg-white border border-sky-200 shadow-md rounded-full px-4 py-2 text-sm font-semibold text-sky-700">
                  <span className="text-lg">{repair.icon}</span>
                  {repair.name}
                </span>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-3 gap-3 w-full max-w-sm">
              {[
                { icon: "🛡️", label: "Garantie", value: repair.guarantee },
                { icon: "⚡", label: "Durée", value: repair.duration },
                { icon: "🔍", label: "Diagnostic", value: "Gratuit" },
              ].map((b) => (
                <div key={b.label} className="bg-sky-50 border border-sky-100 rounded-2xl p-3 text-center">
                  <div className="text-xl mb-1">{b.icon}</div>
                  <div className="text-sky-600 font-bold text-sm">{b.value}</div>
                  <div className="text-slate-400 text-xs">{b.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Right — Repair detail ─── */}
          <div>
            <p className="text-sky-500 font-medium text-sm mb-2">{brand.name} · {series.shortName}</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
              {repair.name} <span className="text-sky-500">{model.name}</span>
            </h1>

            <p className="text-slate-500 leading-relaxed mb-1">{repair.description}</p>
            {repair.longDescription && (
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{repair.longDescription}</p>
            )}

            <div className="flex items-center gap-2 mb-6">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span className="text-slate-500 text-sm">4.9 · +2 700 avis Google</span>
            </div>

            {/* Tier selector */}
            {repair.tiers.length > 1 && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-700 mb-3">Choisissez votre option :</p>
                <div className="space-y-3">
                  {repair.tiers.map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTier(tier)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 transition-all ${
                        selectedTier.id === tier.id
                          ? "border-sky-500 bg-sky-50"
                          : "border-slate-200 bg-white hover:border-sky-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selectedTier.id === tier.id ? "border-sky-500" : "border-slate-300"
                        }`}>
                          {selectedTier.id === tier.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                          )}
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-800">{tier.name}</span>
                            {tier.badge && (
                              <span className="text-xs bg-sky-500 text-white px-2 py-0.5 rounded-full font-medium">{tier.badge}</span>
                            )}
                          </div>
                          {tier.detail && <p className="text-slate-400 text-xs mt-0.5">{tier.detail}</p>}
                        </div>
                      </div>
                      <span className="font-bold text-slate-900 shrink-0 ml-4">
                        {tier.price === 0 ? "Gratuit" : `${tier.price}$ CAD`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Service mode */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-700 mb-3">Mode de service :</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setServiceMode("magasin")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                    serviceMode === "magasin" ? "border-sky-500 bg-sky-50" : "border-slate-200 bg-white hover:border-sky-300"
                  }`}
                >
                  <span className="text-xl">🏪</span>
                  <div className="text-left">
                    <p className="font-semibold text-slate-800 text-sm">En magasin</p>
                    <p className="text-slate-400 text-xs">Saint-Laurent, Mtl</p>
                  </div>
                </button>
                <button
                  onClick={() => setServiceMode("colis")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                    serviceMode === "colis" ? "border-sky-500 bg-sky-50" : "border-slate-200 bg-white hover:border-sky-300"
                  }`}
                >
                  <span className="text-xl">📦</span>
                  <div className="text-left">
                    <p className="font-semibold text-slate-800 text-sm">Par colis</p>
                    <p className="text-slate-400 text-xs">Partout au Québec</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Price + CTA */}
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-500 text-sm">Pièces et main-d'œuvre incluses</span>
                <span className="text-xs text-sky-600 font-medium bg-sky-100 px-2 py-0.5 rounded-full">En stock</span>
              </div>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-extrabold text-slate-900">
                  {isFree ? "Gratuit" : `${selectedTier.price}$`}
                </span>
                {!isFree && <span className="text-slate-400 text-sm mb-1">CAD · taxes en sus</span>}
              </div>
              <Link
                href={`/rendez-vous?device=${encodeURIComponent(model.name)}&repair=${encodeURIComponent(repair.name)}&tier=${encodeURIComponent(selectedTier.name)}&mode=${serviceMode}`}
                className="block w-full text-center py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold text-lg rounded-xl transition-colors shadow-lg shadow-sky-200"
              >
                {isFree ? "Prendre rendez-vous — Gratuit" : `Réservez maintenant · ${selectedTier.price}$ CAD`}
              </Link>
            </div>

            <p className="text-slate-400 text-xs text-center">
              * Prix indicatif. Un diagnostic gratuit confirmera le devis exact à votre arrivée.
            </p>
          </div>
        </div>
      </section>

      {/* Other repairs */}
      <section className="py-10 bg-sky-50 border-t border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-slate-800 mb-5">Autres réparations — {model.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {getRepair(brandId, repairId) && getRepairs(brandId).filter((r) => r.id !== repairId).map((r) => (
              <Link
                key={r.id}
                href={`/reparation/${brandId}/${seriesId}/${modelId}/${r.id}`}
                className="bg-white border border-sky-100 hover:border-sky-400 rounded-xl p-4 text-center transition-all hover:shadow-md group"
              >
                <div className="text-2xl mb-2">{r.icon}</div>
                <p className="text-slate-700 text-xs font-semibold leading-tight group-hover:text-sky-600 transition-colors">{r.name}</p>
                <p className="text-sky-500 text-xs mt-1 font-medium">{r.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


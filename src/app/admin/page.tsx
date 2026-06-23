"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, type RendezVous, type MessageContact } from "@/lib/supabase";
import type { Produit } from "@/lib/types/produit";

const STATUT_LABELS: Record<string, { label: string; color: string }> = {
  nouveau:  { label: "Nouveau",  color: "bg-sky-100 text-sky-700" },
  confirme: { label: "Confirmé", color: "bg-green-100 text-green-700" },
  termine:  { label: "Terminé",  color: "bg-slate-100 text-slate-600" },
  annule:   { label: "Annulé",   color: "bg-red-100 text-red-600" },
};

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<"rdv" | "messages">("rdv");
  const [rdvs, setRdvs] = useState<RendezVous[]>([]);
  const [messages, setMessages] = useState<MessageContact[]>([]);
  const [produitCount, setProduitCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: rdvData }, { data: msgData }, produitsRes] = await Promise.all([
      supabase.from("rendez_vous").select("*").order("created_at", { ascending: false }),
      supabase.from("messages_contact").select("*").order("created_at", { ascending: false }),
      fetch("/api/admin/produits").then((r) => r.json()).catch(() => ({ produits: [] })),
    ]);
    setRdvs(rdvData ?? []);
    setMessages(msgData ?? []);
    setProduitCount((produitsRes.produits as Produit[] | undefined)?.length ?? 0);
    setLoading(false);
  };

  const updateStatut = async (id: number, statut: string) => {
    await supabase.from("rendez_vous").update({ statut }).eq("id", id);
    setRdvs((prev) => prev.map((r) => (r.id === id ? { ...r, statut: statut as RendezVous["statut"] } : r)));
  };

  const marquerLu = async (id: number) => {
    await supabase.from("messages_contact").update({ lu: true }).eq("id", id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, lu: true } : m)));
  };

  const nouveauxRdv = rdvs.filter((r) => r.statut === "nouveau").length;
  const messagesNonLus = messages.filter((m) => !m.lu).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Tableau de bord</h1>
        <p className="text-slate-500 mt-1">Vue d&apos;ensemble — LaPuce Informatique</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Produits", value: produitCount, color: "text-blue-600", href: "/admin/produits" },
          { label: "Rendez-vous", value: rdvs.length, color: "text-sky-600" },
          { label: "Nouveaux RDV", value: nouveauxRdv, color: "text-orange-500" },
          { label: "Messages", value: messages.length, color: "text-purple-600" },
          { label: "Non lus", value: messagesNonLus, color: "text-red-500" },
        ].map((s) => (
          s.href ? (
            <Link key={s.label} href={s.href} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-sky-300 hover:shadow-md transition-all">
              <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-slate-500 text-sm mt-1">{s.label} →</p>
            </Link>
          ) : (
            <div key={s.label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-slate-500 text-sm mt-1">{s.label}</p>
            </div>
          )
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setTab("rdv")}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            tab === "rdv" ? "bg-sky-500 text-white shadow-md shadow-sky-200" : "bg-white border border-slate-200 text-slate-600"
          }`}
        >
          Rendez-vous {nouveauxRdv > 0 && <span className="ml-1 bg-orange-400 text-white text-xs rounded-full px-1.5">{nouveauxRdv}</span>}
        </button>
        <button
          onClick={() => setTab("messages")}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            tab === "messages" ? "bg-sky-500 text-white shadow-md shadow-sky-200" : "bg-white border border-slate-200 text-slate-600"
          }`}
        >
          Messages {messagesNonLus > 0 && <span className="ml-1 bg-red-400 text-white text-xs rounded-full px-1.5">{messagesNonLus}</span>}
        </button>
        <button onClick={fetchAll} className="ml-auto px-4 py-2.5 text-sm font-medium text-sky-600 bg-sky-50 rounded-xl border border-sky-200 hover:bg-sky-100">
          ↻ Actualiser
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">Chargement...</div>
      ) : tab === "rdv" ? (
        <div className="space-y-4">
          {rdvs.length === 0 ? (
            <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border">Aucun rendez-vous.</div>
          ) : rdvs.map((r) => (
            <div key={r.id} className={`bg-white border rounded-2xl p-5 ${r.statut === "nouveau" ? "border-sky-300" : "border-slate-200"}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-slate-900">{r.nom}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUT_LABELS[r.statut]?.color}`}>
                      {STATUT_LABELS[r.statut]?.label}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-slate-500">
                    <span>📱 {r.appareil} — {r.reparation}</span>
                    <span>📅 {r.date_souhaitee} à {r.heure_souhaitee}</span>
                    <span>📞 {r.telephone}</span>
                    <span>✉️ {r.email}</span>
                  </div>
                  {r.message && <p className="mt-2 text-sm text-slate-400 italic">&quot;{r.message}&quot;</p>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(["nouveau", "confirme", "termine", "annule"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatut(r.id!, s)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border ${
                        r.statut === s ? STATUT_LABELS[s].color + " border-transparent" : "bg-white border-slate-200 text-slate-500"
                      }`}
                    >
                      {STATUT_LABELS[s].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border">Aucun message.</div>
          ) : messages.map((m) => (
            <div key={m.id} className={`bg-white border rounded-2xl p-5 ${!m.lu ? "border-sky-300" : "border-slate-200"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-900">{m.nom}</h3>
                  <p className="text-sm text-slate-500">{m.email} {m.telephone && `· ${m.telephone}`}</p>
                  <p className="text-sm font-medium mt-1">Sujet : {m.sujet}</p>
                  <p className="text-sm text-slate-600 mt-1">{m.message}</p>
                </div>
                {!m.lu && (
                  <button onClick={() => marquerLu(m.id!)} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-50 text-sky-600 border border-sky-200 shrink-0">
                    Marquer lu
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

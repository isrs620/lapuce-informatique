"use client";
import { useEffect, useState } from "react";
import { supabase, type RendezVous, type MessageContact } from "@/lib/supabase";

const STATUT_LABELS: Record<string, { label: string; color: string }> = {
  nouveau:    { label: "Nouveau",    color: "bg-sky-100 text-sky-700" },
  confirme:   { label: "Confirmé",   color: "bg-green-100 text-green-700" },
  termine:    { label: "Terminé",    color: "bg-slate-100 text-slate-600" },
  annule:     { label: "Annulé",     color: "bg-red-100 text-red-600" },
};

async function loadAdminData() {
  if (!supabase) {
    return { rdvData: [], msgData: [] };
  }

  const [{ data: rdvData }, { data: msgData }] = await Promise.all([
    supabase.from("rendez_vous").select("*").order("created_at", { ascending: false }),
    supabase.from("messages_contact").select("*").order("created_at", { ascending: false }),
  ]);

  return { rdvData: rdvData ?? [], msgData: msgData ?? [] };
}

export default function AdminPage() {
  const [tab, setTab] = useState<"rdv" | "messages">("rdv");
  const [rdvs, setRdvs] = useState<RendezVous[]>([]);
  const [messages, setMessages] = useState<MessageContact[]>([]);
  const [loading, setLoading] = useState(Boolean(supabase));

  async function fetchAll() {
    if (!supabase) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const { rdvData, msgData } = await loadAdminData();
    setRdvs(rdvData);
    setMessages(msgData);
    setLoading(false);
  }

  useEffect(() => {
    if (!supabase) return;

    let cancelled = false;

    void loadAdminData().then(({ rdvData, msgData }) => {
      if (cancelled) return;

      setRdvs(rdvData);
      setMessages(msgData);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const updateStatut = async (id: number, statut: string) => {
    if (!supabase) return;

    await supabase.from("rendez_vous").update({ statut }).eq("id", id);
    setRdvs((prev) => prev.map((r) => (r.id === id ? { ...r, statut: statut as RendezVous["statut"] } : r)));
  };

  const marquerLu = async (id: number) => {
    if (!supabase) return;

    await supabase.from("messages_contact").update({ lu: true }).eq("id", id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, lu: true } : m)));
  };

  const nouveauxRdv = rdvs.filter((r) => r.statut === "nouveau").length;
  const messagesNonLus = messages.filter((m) => !m.lu).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Tableau de bord — LaPuce Informatique</h1>
            <p className="text-sky-200 text-sm mt-0.5">Gestion des rendez-vous et messages</p>
          </div>
          <button
            onClick={fetchAll}
            disabled={!supabase}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 border border-white/20 rounded-xl text-sm font-medium transition-colors"
          >
            ↻ Actualiser
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {!supabase && (
          <div className="mb-6 rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4 text-sm text-orange-700">
            Supabase n&apos;est pas configuré. Ajoutez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY pour charger les rendez-vous et messages.
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total rendez-vous", value: rdvs.length, color: "text-sky-600" },
            { label: "Nouveaux", value: nouveauxRdv, color: "text-orange-500" },
            { label: "Messages reçus", value: messages.length, color: "text-purple-600" },
            { label: "Non lus", value: messagesNonLus, color: "text-red-500" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-slate-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("rdv")}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              tab === "rdv" ? "bg-sky-500 text-white shadow-md shadow-sky-200" : "bg-white border border-slate-200 text-slate-600 hover:border-sky-300"
            }`}
          >
            Rendez-vous {nouveauxRdv > 0 && <span className="ml-1.5 bg-orange-400 text-white text-xs rounded-full px-1.5 py-0.5">{nouveauxRdv}</span>}
          </button>
          <button
            onClick={() => setTab("messages")}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              tab === "messages" ? "bg-sky-500 text-white shadow-md shadow-sky-200" : "bg-white border border-slate-200 text-slate-600 hover:border-sky-300"
            }`}
          >
            Messages {messagesNonLus > 0 && <span className="ml-1.5 bg-red-400 text-white text-xs rounded-full px-1.5 py-0.5">{messagesNonLus}</span>}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400">Chargement...</div>
        ) : tab === "rdv" ? (
          /* ─── Rendez-vous ─── */
          <div className="space-y-4">
            {rdvs.length === 0 ? (
              <div className="text-center py-20 text-slate-400 bg-white rounded-2xl border border-slate-200">Aucun rendez-vous pour l&apos;instant.</div>
            ) : rdvs.map((r) => (
              <div key={r.id} className={`bg-white border rounded-2xl p-5 shadow-sm ${r.statut === "nouveau" ? "border-sky-300" : "border-slate-200"}`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-slate-900">{r.nom}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUT_LABELS[r.statut]?.color ?? "bg-slate-100 text-slate-600"}`}>
                        {STATUT_LABELS[r.statut]?.label ?? r.statut}
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-slate-500">
                      <span>📱 {r.appareil} — {r.reparation}</span>
                      <span>📅 {r.date_souhaitee} à {r.heure_souhaitee}</span>
                      <span>📞 {r.telephone}</span>
                      <span>✉️ {r.email}</span>
                    </div>
                    {r.message && (
                      <p className="mt-2 text-sm text-slate-400 italic">&quot;{r.message}&quot;</p>
                    )}
                    <p className="text-xs text-slate-300 mt-2">
                      Reçu le {r.created_at ? new Date(r.created_at).toLocaleString("fr-CA") : "—"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(["nouveau", "confirme", "termine", "annule"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatut(r.id!, s)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                          r.statut === s
                            ? `${STATUT_LABELS[s].color} border-transparent`
                            : "bg-white border-slate-200 text-slate-500 hover:border-sky-300"
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
          /* ─── Messages contact ─── */
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-20 text-slate-400 bg-white rounded-2xl border border-slate-200">Aucun message pour l&apos;instant.</div>
            ) : messages.map((m) => (
              <div key={m.id} className={`bg-white border rounded-2xl p-5 shadow-sm ${!m.lu ? "border-sky-300" : "border-slate-200"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-slate-900">{m.nom}</h3>
                      {!m.lu && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-100 text-sky-700">Nouveau</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 mb-1">📧 {m.email} {m.telephone && `· 📞 ${m.telephone}`}</p>
                    <p className="text-sm font-medium text-slate-700 mb-2">Sujet : {m.sujet}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{m.message}</p>
                    <p className="text-xs text-slate-300 mt-2">
                      Reçu le {m.created_at ? new Date(m.created_at).toLocaleString("fr-CA") : "—"}
                    </p>
                  </div>
                  {!m.lu && (
                    <button
                      onClick={() => marquerLu(m.id!)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-50 border border-sky-200 text-sky-600 hover:bg-sky-100 transition-colors shrink-0"
                    >
                      Marquer lu
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const deviceOptions = [
  "iPhone",
  "Samsung Galaxy",
  "iPad",
  "MacBook",
  "Apple Watch",
  "Console de jeux",
  "Autre",
];

const repairOptions: Record<string, string[]> = {
  iPhone: ["Remplacement d'écran", "Remplacement de batterie", "Réparation caméra", "Connecteur de charge", "Autre problème"],
  "Samsung Galaxy": ["Remplacement d'écran AMOLED", "Remplacement de batterie", "Réparation caméra", "Connecteur USB-C", "Autre problème"],
  iPad: ["Remplacement d'écran", "Remplacement de batterie", "Connecteur de charge", "Vitre tactile", "Autre problème"],
  MacBook: ["Remplacement d'écran", "Remplacement de batterie", "Clavier", "SSD", "Ventilateur", "Autre problème"],
  "Apple Watch": ["Remplacement de vitre", "Remplacement de batterie", "Couronne numérique", "Bracelet", "Autre problème"],
  "Console de jeux": ["Port HDMI", "Nettoyage", "Lecteur disque", "Alimentation", "Manette", "Autre problème"],
  Autre: ["Diagnostic général", "Autre problème"],
};

const timeSlots = ["9h00", "10h00", "11h00", "14h00", "15h00", "16h00", "17h00"];

export default function RendezVousPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    device: "",
    repair: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!isSupabaseConfigured || !supabase) {
        setError("La prise de rendez-vous en ligne n'est pas encore configurée. Veuillez nous appeler au (514) 382-0740 pour réserver.");
        return;
      }

      const { error: dbError } = await supabase.from("rendez_vous").insert([
        {
          nom: form.name,
          telephone: form.phone,
          email: form.email,
          appareil: form.device,
          reparation: form.repair,
          date_souhaitee: form.date,
          heure_souhaitee: form.time,
          message: form.notes,
          statut: "nouveau",
        },
      ]);
      if (dbError) throw dbError;
      setSubmitted(true);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer ou nous appeler au (514) 382-0740.");
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-sky-100 border border-sky-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Rendez-vous confirmé !</h2>
          <p className="text-slate-500 mb-2">
            Merci <span className="text-slate-800 font-medium">{form.name}</span> ! Votre rendez-vous pour le <strong className="text-sky-600">{form.date}</strong> à <strong className="text-sky-600">{form.time}</strong> est bien enregistré.
          </p>
          <p className="text-slate-400 text-sm mb-8">Vous recevrez une confirmation par courriel à <span className="text-slate-600">{form.email}</span>.</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-500 to-blue-600 pt-14 pb-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Prendre <span className="text-sky-100">rendez-vous</span>
          </h1>
          <p className="text-sky-100 text-lg">
            Réservez un créneau en quelques clics. Diagnostic gratuit inclus à votre arrivée.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6">
        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s
                    ? "bg-sky-500 text-white shadow-md shadow-sky-200"
                    : "bg-slate-100 border border-slate-200 text-slate-400"
                }`}
              >
                {step > s ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : s}
              </div>
              <span className={`text-sm hidden sm:block ${step >= s ? "text-slate-800 font-medium" : "text-slate-400"}`}>
                {s === 1 ? "Appareil" : s === 2 ? "Créneau" : "Vos coordonnées"}
              </span>
              {s < 3 && <div className={`w-8 h-px ${step > s ? "bg-sky-400" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1 — Device & repair */}
          {step === 1 && (
            <div className="bg-white border border-sky-100 rounded-2xl p-8 space-y-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Votre appareil</h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Type d&apos;appareil *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {deviceOptions.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => update("device", d)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                        form.device === d
                          ? "bg-sky-500 border-sky-500 text-white shadow-md shadow-sky-200"
                          : "bg-white border-slate-200 text-slate-600 hover:border-sky-300 hover:bg-sky-50"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {form.device && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Type de réparation *</label>
                  <select
                    value={form.repair}
                    onChange={(e) => update("repair", e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400"
                  >
                    <option value="">Sélectionnez une réparation</option>
                    {repairOptions[form.device]?.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Notes supplémentaires</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  rows={3}
                  placeholder="Décrivez brièvement le problème..."
                  className="w-full bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 resize-none placeholder-slate-400"
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!form.device || !form.repair}
                className="w-full py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-100 disabled:text-slate-400 text-white font-semibold rounded-xl transition-colors"
              >
                Continuer →
              </button>
            </div>
          )}

          {/* Step 2 — Date & Time */}
          {step === 2 && (
            <div className="bg-white border border-sky-100 rounded-2xl p-8 space-y-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Choisissez un créneau</h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date *</label>
                <input
                  type="date"
                  value={form.date}
                  min={getMinDate()}
                  onChange={(e) => update("date", e.target.value)}
                  className="w-full bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Heure *</label>
                <div className="grid grid-cols-4 gap-3">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => update("time", t)}
                      className={`py-2 rounded-xl text-sm font-medium border transition-all ${
                        form.time === t
                          ? "bg-sky-500 border-sky-500 text-white shadow-md shadow-sky-200"
                          : "bg-white border-slate-200 text-slate-600 hover:border-sky-300 hover:bg-sky-50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
                >
                  ← Retour
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!form.date || !form.time}
                  className="flex-1 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-100 disabled:text-slate-400 text-white font-semibold rounded-xl transition-colors"
                >
                  Continuer →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Contact info */}
          {step === 3 && (
            <div className="bg-white border border-sky-100 rounded-2xl p-8 space-y-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Vos coordonnées</h2>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nom complet *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Jean Dupont"
                    className="w-full bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 placeholder-slate-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Téléphone *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="(514) 000-0000"
                    className="w-full bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 placeholder-slate-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Courriel *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="jean@exemple.com"
                  className="w-full bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 placeholder-slate-400"
                  required
                />
              </div>

              {/* Summary */}
              <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 space-y-2 text-sm">
                <h3 className="text-slate-900 font-semibold mb-3">Récapitulatif de votre rendez-vous</h3>
                <div className="flex justify-between text-slate-600">
                  <span>Appareil</span>
                  <span className="text-slate-900 font-medium">{form.device}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Réparation</span>
                  <span className="text-slate-900 font-medium">{form.repair}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Date</span>
                  <span className="text-slate-900 font-medium">{form.date}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Heure</span>
                  <span className="text-slate-900 font-medium">{form.time}</span>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
                >
                  ← Retour
                </button>
                <button
                  type="submit"
                  disabled={!form.name || !form.phone || !form.email || loading}
                  className="flex-1 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-100 disabled:text-slate-400 text-white font-semibold rounded-xl transition-colors"
                >
                  {loading ? "Envoi en cours..." : "Confirmer le rendez-vous"}
                </button>
              </div>
            </div>
          )}
        </form>
      </section>
    </>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
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
        setError("Le formulaire de contact en ligne n'est pas encore configuré. Veuillez nous appeler au (514) 382-0740.");
        return;
      }

      const { error: dbError } = await supabase.from("messages_contact").insert([
        {
          nom: form.name,
          email: form.email,
          telephone: form.phone,
          sujet: form.subject,
          message: form.message,
          lu: false,
        },
      ]);
      if (dbError) throw dbError;
      setSent(true);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer ou nous appeler au (514) 382-0740.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-500 to-blue-600 pt-14 pb-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Nous <span className="text-sky-100">contacter</span>
          </h1>
          <p className="text-sky-100 text-lg">
            Une question ? Un problème avec votre appareil ? Notre équipe vous répond rapidement.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Nos informations</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-100 border border-sky-200 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-slate-900 font-semibold mb-1">Adresse</h3>
                  <p className="text-slate-500 text-sm">907 Bd Décarie<br />Saint-Laurent, QC H4L 3M3</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-100 border border-sky-200 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-slate-900 font-semibold mb-1">Téléphone</h3>
                  <p className="text-slate-500 text-sm">(514) 382-0740</p>
                  <p className="text-slate-400 text-xs mt-1">Lun–Ven : 9h–19h · Sam : 10h–17h</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-100 border border-sky-200 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-slate-900 font-semibold mb-1">Courriel</h3>
                  <p className="text-slate-500 text-sm">info@lapuceinformatique.ca</p>
                  <p className="text-slate-400 text-xs mt-1">Réponse sous 24h</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-100 border border-sky-200 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-slate-900 font-semibold mb-1">Heures d'ouverture</h3>
                  <div className="text-slate-500 text-sm space-y-0.5">
                    <p>Lundi – Vendredi : 9h00 – 19h00</p>
                    <p>Samedi : 10h00 – 17h00</p>
                    <p className="text-slate-400">Dimanche : Fermé</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-sky-200 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.123456789!2d-73.6878!3d45.5017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a541c64b70d%3A0x654e3138a6f44b37!2s907%20Bd%20D%C3%A9carie%2C%20Saint-Laurent%2C%20QC%20H4L%203M3!5e0!3m2!1sfr!2sca!4v1718000000000!5m2!1sfr!2sca"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LaPuce Informatique — 907 Bd Décarie, Saint-Laurent"
              />
            </div>

            <div className="mt-6 p-5 bg-sky-50 border border-sky-200 rounded-xl">
              <p className="text-sky-600 font-semibold text-sm mb-1">Besoin d'une réparation rapide ?</p>
              <p className="text-slate-500 text-sm mb-4">Réservez directement en ligne pour un créneau le jour même ou le lendemain.</p>
              <Link
                href="/rendez-vous"
                className="inline-block px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Prendre rendez-vous
              </Link>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="bg-white border border-sky-100 rounded-2xl p-10 text-center shadow-sm">
                <div className="w-16 h-16 bg-sky-100 border border-sky-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Message envoyé !</h3>
                <p className="text-slate-500 text-sm">Merci {form.name}. Nous vous répondrons sous 24h à {form.email}.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-sky-100 rounded-2xl p-8 space-y-5 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">Envoyez-nous un message</h2>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nom *</label>
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
                    <label className="block text-sm font-medium text-slate-700 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="(514) 000-0000"
                      className="w-full bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 placeholder-slate-400"
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

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Sujet *</label>
                  <select
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400"
                    required
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option>Demande d'information sur une réparation</option>
                    <option>Question sur un devis</option>
                    <option>Suivi de réparation</option>
                    <option>Problème avec une réparation effectuée</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={5}
                    placeholder="Décrivez votre situation ou votre question..."
                    className="w-full bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 resize-none placeholder-slate-400"
                    required
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-100 disabled:text-slate-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-sky-200"
                >
                  {loading ? "Envoi en cours..." : "Envoyer le message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";

interface RepairItem {
  name: string;
  price: string;
  duration: string;
}

interface Props {
  device: string;
  emoji: string;
  tagline: string;
  description: string;
  repairs: RepairItem[];
  models: string[];
}

export default function RepairPageTemplate({
  device,
  emoji,
  tagline,
  description,
  repairs,
  models,
}: Props) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-500 to-blue-600 pt-16 pb-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sky-200 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white">Réparation {device}</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-6xl mb-6">{emoji}</div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                Réparation <span className="text-sky-100">{device}</span>
              </h1>
              <p className="text-sky-200 font-medium mb-4">{tagline}</p>
              <p className="text-sky-100 text-lg leading-relaxed mb-8">{description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/rendez-vous"
                  className="px-6 py-3 bg-white hover:bg-sky-50 text-sky-600 font-semibold rounded-xl transition-all shadow-lg text-center"
                >
                  Prendre rendez-vous
                </Link>
                <Link
                  href="/diagnostic"
                  className="px-6 py-3 bg-sky-700/40 hover:bg-sky-700/60 text-white font-semibold rounded-xl transition-colors border border-white/30 text-center"
                >
                  Diagnostic gratuit
                </Link>
              </div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-white text-sm font-medium">Garantie 90 jours incluse</span>
              </div>
              <div className="space-y-3">
                {[
                  "Diagnostic gratuit avant toute réparation",
                  "Pièces certifiées de qualité",
                  "Techniciens certifiés et expérimentés",
                  "Réparation le jour même (selon disponibilité)",
                  "Devis transparent sans surprise",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-sky-200 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sky-100 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Repair List */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
          Réparations disponibles pour {device}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repairs.map((r) => (
            <div
              key={r.name}
              className="bg-white border border-sky-100 hover:border-sky-300 hover:shadow-md hover:shadow-sky-50 rounded-xl p-5 transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-slate-900 font-semibold">{r.name}</h3>
                <span className="text-sky-600 font-bold whitespace-nowrap">{r.price}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400 text-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {r.duration}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-400 text-sm mt-6">
          * Les prix sont indicatifs. Un diagnostic gratuit confirmera le devis exact.
        </p>
      </section>

      {/* Models */}
      <section className="py-12 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Modèles pris en charge</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {models.map((m) => (
              <span
                key={m}
                className="px-4 py-2 bg-white border border-sky-200 rounded-full text-slate-600 text-sm shadow-sm"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl p-10 shadow-xl shadow-sky-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Besoin d&apos;une réparation {device} ?
          </h2>
          <p className="text-sky-100 mb-8 max-w-lg mx-auto">
            Réservez un créneau dès maintenant. Notre équipe prend en charge votre appareil le jour même.
          </p>
          <Link
            href="/rendez-vous"
            className="inline-block px-8 py-4 bg-white hover:bg-sky-50 text-sky-600 font-semibold rounded-xl transition-all shadow-lg"
          >
            Réserver maintenant
          </Link>
        </div>
      </section>
    </>
  );
}

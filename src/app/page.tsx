import Link from "next/link";

const services = [
  {
    title: "iPhone",
    description: "Écran brisé, batterie, caméra, boutons — toutes réparations pour tous les modèles iPhone.",
    icon: "📱",
    href: "/reparation/iphone",
    color: "from-sky-50 to-white",
    border: "border-sky-200",
  },
  {
    title: "Samsung",
    description: "Galaxy S, A, Z Fold/Flip — réparation d'écran AMOLED, batterie et plus encore.",
    icon: "📲",
    href: "/reparation/samsung",
    color: "from-blue-50 to-white",
    border: "border-blue-200",
  },
  {
    title: "iPad",
    description: "Remplacement d'écran, vitre tactile, connecteur de charge pour tous les modèles iPad.",
    icon: "📋",
    href: "/reparation/ipad",
    color: "from-sky-50 to-white",
    border: "border-sky-200",
  },
  {
    title: "MacBook",
    description: "Clavier, écran, batterie, SSD — réparations professionnelles pour Mac.",
    icon: "💻",
    href: "/reparation/macbook",
    color: "from-slate-50 to-white",
    border: "border-slate-200",
  },
  {
    title: "Apple Watch",
    description: "Remplacement de vitre, batterie et bracelet pour toutes les séries Apple Watch.",
    icon: "⌚",
    href: "/reparation/apple-watch",
    color: "from-sky-50 to-white",
    border: "border-sky-200",
  },
  {
    title: "Consoles",
    description: "PS4, PS5, Xbox, Nintendo Switch — diagnostic et réparation de consoles de jeux.",
    icon: "🎮",
    href: "/reparation/consoles",
    color: "from-blue-50 to-white",
    border: "border-blue-200",
  },
];

const stats = [
  { value: "5 000+", label: "Appareils réparés" },
  { value: "48h", label: "Délai moyen" },
  { value: "90 jours", label: "Garantie pièces & main-d'œuvre" },
  { value: "98%", label: "Clients satisfaits" },
];

const steps = [
  {
    step: "01",
    title: "Prenez rendez-vous",
    description: "Choisissez un créneau en ligne ou appelez-nous directement.",
  },
  {
    step: "02",
    title: "Diagnostic gratuit",
    description: "Nos techniciens analysent votre appareil et vous donnent un devis précis.",
  },
  {
    step: "03",
    title: "Réparation rapide",
    description: "La plupart des réparations sont effectuées le jour même ou sous 48h.",
  },
  {
    step: "04",
    title: "Reprenez votre appareil",
    description: "Votre appareil repart avec une garantie de 90 jours sur la réparation.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-sky-500 to-blue-600 pt-20 pb-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-700/30 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/30 rounded-full text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Réparations rapides & garanties
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            LaPuce Informatique<br />
            <span className="text-sky-100">Saint-Laurent, Montréal</span>
          </h1>
          <p className="text-sky-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Spécialiste en réparation d&apos;iPhone, Samsung, iPad, MacBook, Apple Watch et consoles PS5/Xbox à Saint-Laurent. Diagnostic gratuit, devis transparent, garantie 90 jours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rendez-vous"
              className="px-8 py-4 bg-white hover:bg-sky-50 text-sky-600 font-semibold rounded-xl text-lg transition-all shadow-lg shadow-sky-900/20"
            >
              Prendre rendez-vous
            </Link>
            <Link
              href="/diagnostic"
              className="px-8 py-4 bg-sky-700/50 hover:bg-sky-700/70 text-white font-semibold rounded-xl text-lg transition-colors border border-white/30"
            >
              Diagnostic gratuit
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-sky-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-sky-500">{s.value}</div>
                <div className="text-slate-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Nos services de réparation</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Nous réparons tous les appareils électroniques courants avec des pièces certifiées et une garantie incluse.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className={`group relative bg-gradient-to-br ${service.color} border ${service.border} rounded-2xl p-6 hover:shadow-lg hover:shadow-sky-100 hover:scale-[1.02] transition-all duration-200`}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Réparation {service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{service.description}</p>
              <div className="flex items-center gap-1 text-sky-500 text-sm font-medium">
                En savoir plus
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Comment ça fonctionne ?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Simple, rapide et transparent.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-[-calc(50%-2rem)] h-px bg-sky-200" />
                )}
                <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-sky-200">
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="text-slate-900 font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl p-10 sm:p-14 text-center shadow-xl shadow-sky-200">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Votre appareil est en panne ?</h2>
          <p className="text-sky-100 max-w-xl mx-auto mb-8">
            Ne perdez plus de temps. Prenez rendez-vous maintenant — diagnostic gratuit, devis sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rendez-vous"
              className="px-8 py-4 bg-white hover:bg-sky-50 text-sky-600 font-semibold rounded-xl transition-all shadow-lg"
            >
              Réserver un rendez-vous
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-sky-700/40 hover:bg-sky-700/60 text-white font-semibold rounded-xl border border-white/30 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

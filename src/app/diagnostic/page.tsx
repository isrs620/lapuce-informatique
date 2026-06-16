import Link from "next/link";

export const metadata = {
  title: "Diagnostic gratuit — TechRepairPro",
  description: "Diagnostic gratuit de votre appareil. iPhone, Samsung, iPad, MacBook, Apple Watch, consoles. Nos techniciens identifient le problème sans frais.",
};

const deviceTypes = [
  { icon: "📱", label: "iPhone", href: "/reparation/iphone" },
  { icon: "📲", label: "Samsung", href: "/reparation/samsung" },
  { icon: "📋", label: "iPad", href: "/reparation/ipad" },
  { icon: "💻", label: "MacBook", href: "/reparation/macbook" },
  { icon: "⌚", label: "Apple Watch", href: "/reparation/apple-watch" },
  { icon: "🎮", label: "Console", href: "/reparation/consoles" },
];

const diagnosticSteps = [
  {
    number: "01",
    title: "Apportez votre appareil",
    description: "Amenez votre appareil à notre boutique ou prenez rendez-vous en ligne.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Inspection complète",
    description: "Nos techniciens effectuent une inspection matérielle et logicielle approfondie.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Rapport & devis",
    description: "Vous recevez un rapport détaillé et un devis clair sans engagement.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Décision à vous",
    description: "Vous décidez de procéder à la réparation ou non. Aucune obligation.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const commonIssues = [
  "Écran fissuré ou ne s'allume plus",
  "Batterie qui se décharge rapidement",
  "Appareil qui surchauffe",
  "Caméra floue ou ne fonctionne pas",
  "Boutons qui ne répondent plus",
  "Connecteur de charge endommagé",
  "Problèmes audio (haut-parleur, micro)",
  "Problèmes logiciels ou de démarrage",
  "Dégâts des eaux",
  "Données inaccessibles",
];

export default function DiagnosticPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-500 to-blue-600 pt-16 pb-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/30 rounded-full text-white text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            100% gratuit, sans engagement
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Diagnostic <span className="text-sky-100">gratuit</span>
          </h1>
          <p className="text-sky-100 text-lg max-w-2xl mx-auto mb-10">
            Vous ne savez pas ce qui ne va pas avec votre appareil ? Amenez-le chez nous. Nos techniciens l'analysent gratuitement et vous remettent un rapport complet avec un devis transparent.
          </p>
          <Link
            href="/rendez-vous"
            className="inline-block px-8 py-4 bg-white hover:bg-sky-50 text-sky-600 font-semibold rounded-xl text-lg transition-all shadow-lg"
          >
            Prendre rendez-vous pour un diagnostic
          </Link>
        </div>
      </section>

      {/* Device selector */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">
          Quel appareil souhaitez-vous faire diagnostiquer ?
        </h2>
        <p className="text-slate-500 text-center mb-10">Sélectionnez votre appareil pour voir les réparations disponibles.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {deviceTypes.map((d) => (
            <Link
              key={d.label}
              href={d.href}
              className="flex flex-col items-center gap-3 bg-white hover:bg-sky-50 border border-sky-100 hover:border-sky-300 rounded-2xl p-6 transition-all text-center group shadow-sm hover:shadow-md hover:shadow-sky-100"
            >
              <span className="text-4xl">{d.icon}</span>
              <span className="text-slate-700 font-medium text-sm group-hover:text-sky-600 transition-colors">{d.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* How diagnostic works */}
      <section className="py-16 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
            Comment se déroule le diagnostic ?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {diagnosticSteps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-md shadow-sky-200">
                  {step.icon}
                </div>
                <div className="text-sky-500 font-bold text-sm mb-2">{step.number}</div>
                <h3 className="text-slate-900 font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common issues */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Problèmes fréquemment diagnostiqués
            </h2>
            <p className="text-slate-500 mb-8">
              Nos techniciens diagnostiquent et réparent des centaines d'appareils chaque mois. Voici les problèmes les plus courants que nous traitons.
            </p>
            <div className="space-y-3">
              {commonIssues.map((issue) => (
                <div key={issue} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-sky-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-slate-600 text-sm">{issue}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl shadow-sky-200">
            <h3 className="font-bold text-xl mb-2">Le diagnostic, c'est gratuit</h3>
            <p className="text-sky-100 text-sm mb-6">
              Aucun frais, aucune obligation. Nous analysons votre appareil et vous donnons un devis clair. Vous êtes libre d'accepter ou non la réparation.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Inspection matérielle complète",
                "Test des composants internes",
                "Diagnostic logiciel",
                "Rapport écrit remis",
                "Devis sans surprise",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-sky-100">
                  <svg className="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/rendez-vous"
              className="block text-center px-6 py-3 bg-white hover:bg-sky-50 text-sky-600 font-semibold rounded-xl transition-all shadow-lg"
            >
              Réserver mon diagnostic gratuit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

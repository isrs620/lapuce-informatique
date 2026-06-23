import repairPriceOverrides from "../../data/repair-prices.json";

export interface RepairTier {
  id: string;
  name: string;
  price: number;
  badge?: string;
  detail?: string;
}

export interface RepairOption {
  id: string;
  name: string;
  icon: string;
  price: string;
  duration: string;
  guarantee: string;
  description: string;
  longDescription?: string;
  tiers: RepairTier[];
}

export interface DeviceModel {
  id: string;
  name: string;
  image: string;
  modelNumber: string;
}

export type DeviceType = "phone" | "tablet" | "ipad-mini" | "ipad-pro" | "laptop" | "watch" | "console";

export interface DeviceSeries {
  id: string;
  name: string;
  shortName: string;
  image: string;
  deviceType: DeviceType;
  models: DeviceModel[];
}

export interface Brand {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  series: DeviceSeries[];
}

// ─── Repair templates per brand ───────────────────────────────────────────────

export const repairsByBrand: Record<string, RepairOption[]> = {
  iphone: [
    {
      id: "ecran", name: "Réparation Écran", icon: "🖥️", price: "À partir de 79$", duration: "1h30", guarantee: "1 an",
      description: "Votre iPhone a subi un choc sévère ? Écran noir, lignes de couleur ou tactile défaillant — un remplacement complet est nécessaire.",
      longDescription: "Notre service utilise des pièces de haute qualité pour restaurer la fluidité et l'éclat original de votre iPhone. Retrouvez une expérience visuelle impeccable en un temps record.",
      tiers: [
        { id: "eco", name: "Économique", price: 79, detail: "Pièces compatibles certifiées" },
        { id: "premium", name: "Premium", price: 149, badge: "Populaire", detail: "Pièces haute qualité, couleurs fidèles" },
        { id: "origine", name: "Origine Apple", price: 249, detail: "Pièces officielles Apple" },
      ],
    },
    {
      id: "batterie", name: "Remplacement Batterie", icon: "🔋", price: "À partir de 49$", duration: "45 min", guarantee: "1 an",
      description: "Batterie qui se décharge trop vite ou iPhone qui s'éteint de manière aléatoire ? Remplacement rapide garanti.",
      tiers: [
        { id: "standard", name: "Standard", price: 49, detail: "Batterie compatible certifiée" },
        { id: "premium", name: "Premium", price: 89, badge: "Populaire", detail: "Batterie haute capacité OEM" },
      ],
    },
    {
      id: "camera-arriere", name: "Réparation Caméra Arrière", icon: "📸", price: "À partir de 89$", duration: "2h", guarantee: "6 mois",
      description: "Photos floues, caméra qui ne s'ouvre plus ou module endommagé ? Remplacement complet du module caméra arrière.",
      tiers: [
        { id: "standard", name: "Standard", price: 89, detail: "Module caméra compatible" },
        { id: "premium", name: "Premium", price: 149, badge: "Populaire", detail: "Module caméra haute fidélité" },
      ],
    },
    {
      id: "camera-avant", name: "Réparation Caméra Avant", icon: "🤳", price: "À partir de 59$", duration: "1h30", guarantee: "6 mois",
      description: "Selfies flous, Face ID défaillant ou caméra avant endommagée ? Remplacement de la caméra frontale.",
      tiers: [
        { id: "standard", name: "Standard", price: 59, detail: "Caméra frontale compatible" },
        { id: "premium", name: "Premium", price: 99, badge: "Populaire", detail: "Caméra haute qualité avec Face ID" },
      ],
    },
    {
      id: "connecteur", name: "Connecteur de Charge", icon: "⚡", price: "À partir de 69$", duration: "1h30", guarantee: "6 mois",
      description: "iPhone ne charge plus ou connecteur endommagé ? Remplacement du connecteur Lightning ou USB-C.",
      tiers: [
        { id: "standard", name: "Standard", price: 69, detail: "Connecteur compatible certifié" },
        { id: "premium", name: "Premium", price: 109, badge: "Populaire", detail: "Connecteur OEM haute qualité" },
      ],
    },
    {
      id: "haut-parleur", name: "Haut-parleur / Micro", icon: "🔊", price: "À partir de 55$", duration: "1h", guarantee: "6 mois",
      description: "Son faible, haut-parleur grésillant ou micro qui ne fonctionne plus ? Remplacement rapide.",
      tiers: [
        { id: "standard", name: "Standard", price: 55, detail: "Haut-parleur compatible" },
        { id: "premium", name: "Premium", price: 89, badge: "Populaire", detail: "Haut-parleur qualité OEM" },
      ],
    },
    {
      id: "diagnostic", name: "Diagnostic Complet", icon: "🔍", price: "Gratuit", duration: "30 min", guarantee: "—",
      description: "iPhone en panne ? Nous effectuons un diagnostic complet et gratuit pour identifier le problème précis.",
      tiers: [{ id: "gratuit", name: "Diagnostic gratuit", price: 0, detail: "100% gratuit, sans engagement" }],
    },
  ],
  samsung: [
    {
      id: "ecran", name: "Réparation Écran AMOLED", icon: "🖥️", price: "À partir de 89$", duration: "2h", guarantee: "1 an",
      description: "Écran AMOLED brisé, taches noires ou tactile non réactif ? Remplacement avec pièces certifiées Samsung.",
      tiers: [
        { id: "eco", name: "Économique", price: 89, detail: "Pièces compatibles certifiées" },
        { id: "premium", name: "Premium", price: 169, badge: "Populaire", detail: "Dalle AMOLED haute qualité" },
        { id: "origine", name: "Origine Samsung", price: 279, detail: "Pièces officielles Samsung" },
      ],
    },
    {
      id: "batterie", name: "Remplacement Batterie", icon: "🔋", price: "À partir de 49$", duration: "1h", guarantee: "1 an",
      description: "Batterie défaillante ou qui gonfle ? Remplacement par une pièce de qualité OEM.",
      tiers: [
        { id: "standard", name: "Standard", price: 49, detail: "Batterie compatible certifiée" },
        { id: "premium", name: "Premium", price: 89, badge: "Populaire", detail: "Batterie OEM haute capacité" },
      ],
    },
    {
      id: "camera", name: "Réparation Caméra", icon: "📸", price: "À partir de 79$", duration: "2h", guarantee: "6 mois",
      description: "Caméra floue, module endommagé ou photos noires ? Remplacement du module caméra arrière.",
      tiers: [
        { id: "standard", name: "Standard", price: 79, detail: "Module caméra compatible" },
        { id: "premium", name: "Premium", price: 139, badge: "Populaire", detail: "Module caméra haute fidélité" },
      ],
    },
    {
      id: "connecteur", name: "Connecteur USB-C", icon: "⚡", price: "À partir de 65$", duration: "1h30", guarantee: "6 mois",
      description: "Samsung ne charge plus ou connecteur USB-C endommagé ? Remplacement rapide.",
      tiers: [
        { id: "standard", name: "Standard", price: 65, detail: "Connecteur compatible certifié" },
        { id: "premium", name: "Premium", price: 99, badge: "Populaire", detail: "Connecteur OEM Samsung" },
      ],
    },
    {
      id: "vitre-arriere", name: "Vitre Arrière", icon: "🔲", price: "À partir de 79$", duration: "2h", guarantee: "6 mois",
      description: "Vitre arrière brisée ? Remplacement complet pour redonner un aspect neuf à votre Samsung.",
      tiers: [
        { id: "standard", name: "Standard", price: 79, detail: "Vitre compatible" },
        { id: "premium", name: "Premium", price: 129, badge: "Populaire", detail: "Vitre OEM Samsung" },
      ],
    },
    {
      id: "haut-parleur", name: "Haut-parleur / Micro", icon: "🔊", price: "À partir de 55$", duration: "1h", guarantee: "6 mois",
      description: "Problème audio ou microphone défaillant ? Remplacement du haut-parleur ou du microphone.",
      tiers: [
        { id: "standard", name: "Standard", price: 55, detail: "Haut-parleur compatible" },
        { id: "premium", name: "Premium", price: 89, badge: "Populaire", detail: "Qualité OEM Samsung" },
      ],
    },
    {
      id: "diagnostic", name: "Diagnostic Complet", icon: "🔍", price: "Gratuit", duration: "30 min", guarantee: "—",
      description: "Samsung en panne ? Diagnostic complet gratuit pour identifier le problème.",
      tiers: [{ id: "gratuit", name: "Diagnostic gratuit", price: 0, detail: "100% gratuit, sans engagement" }],
    },
  ],
  ipad: [
    {
      id: "ecran", name: "Réparation Écran LCD/Retina", icon: "🖥️", price: "À partir de 99$", duration: "3h", guarantee: "1 an",
      description: "Écran iPad fissuré, non fonctionnel ou tactile défaillant ? Remplacement complet de l'écran.",
      tiers: [
        { id: "eco", name: "Économique", price: 99, detail: "Pièces compatibles certifiées" },
        { id: "premium", name: "Premium", price: 179, badge: "Populaire", detail: "Dalle haute qualité fidèle à l'original" },
        { id: "origine", name: "Origine Apple", price: 299, detail: "Pièces officielles Apple" },
      ],
    },
    {
      id: "vitre", name: "Remplacement Vitre Tactile", icon: "👆", price: "À partir de 79$", duration: "2h", guarantee: "6 mois",
      description: "Vitre tactile brisée ? Remplacement en conservant l'écran original intact.",
      tiers: [
        { id: "standard", name: "Standard", price: 79, detail: "Vitre compatible certifiée" },
        { id: "premium", name: "Premium", price: 129, badge: "Populaire", detail: "Vitre haute sensibilité" },
      ],
    },
    {
      id: "batterie", name: "Remplacement Batterie", icon: "🔋", price: "À partir de 69$", duration: "1h30", guarantee: "1 an",
      description: "iPad qui ne tient plus la charge ? Remplacement de la batterie originale.",
      tiers: [
        { id: "standard", name: "Standard", price: 69, detail: "Batterie compatible certifiée" },
        { id: "premium", name: "Premium", price: 119, badge: "Populaire", detail: "Batterie haute capacité OEM" },
      ],
    },
    {
      id: "connecteur", name: "Connecteur Lightning/USB-C", icon: "⚡", price: "À partir de 79$", duration: "1h30", guarantee: "6 mois",
      description: "iPad ne charge plus ? Remplacement du connecteur de charge Lightning ou USB-C.",
      tiers: [
        { id: "standard", name: "Standard", price: 79, detail: "Connecteur compatible" },
        { id: "premium", name: "Premium", price: 119, badge: "Populaire", detail: "Connecteur OEM Apple" },
      ],
    },
    {
      id: "camera", name: "Réparation Caméra", icon: "📸", price: "À partir de 75$", duration: "2h", guarantee: "6 mois",
      description: "Caméra iPad défaillante ou module endommagé ? Remplacement du module caméra.",
      tiers: [
        { id: "standard", name: "Standard", price: 75, detail: "Module caméra compatible" },
        { id: "premium", name: "Premium", price: 129, badge: "Populaire", detail: "Module caméra haute qualité" },
      ],
    },
    {
      id: "diagnostic", name: "Diagnostic Complet", icon: "🔍", price: "Gratuit", duration: "30 min", guarantee: "—",
      description: "iPad en panne ? Diagnostic gratuit pour identifier le problème.",
      tiers: [{ id: "gratuit", name: "Diagnostic gratuit", price: 0, detail: "100% gratuit, sans engagement" }],
    },
  ],
  macbook: [
    {
      id: "ecran", name: "Remplacement Écran", icon: "🖥️", price: "À partir de 249$", duration: "4h", guarantee: "1 an",
      description: "Écran MacBook endommagé, fissuré ou rétroéclairage défaillant ? Remplacement avec dalle certifiée.",
      tiers: [
        { id: "compatible", name: "Compatible", price: 249, detail: "Dalle compatible certifiée" },
        { id: "premium", name: "Premium", price: 349, badge: "Populaire", detail: "Dalle haute fidélité Retina" },
        { id: "origine", name: "Origine Apple", price: 499, detail: "Dalle officielle Apple" },
      ],
    },
    {
      id: "batterie", name: "Remplacement Batterie", icon: "🔋", price: "À partir de 149$", duration: "2h", guarantee: "1 an",
      description: "MacBook ne tient plus la charge ou batterie gonflée ? Remplacement sécurisé.",
      tiers: [
        { id: "standard", name: "Standard", price: 149, detail: "Batterie compatible certifiée" },
        { id: "premium", name: "Premium", price: 229, badge: "Populaire", detail: "Batterie OEM Apple haute capacité" },
      ],
    },
    {
      id: "clavier", name: "Remplacement Clavier", icon: "⌨️", price: "À partir de 199$", duration: "4h", guarantee: "6 mois",
      description: "Touches coincées, clavier endommagé ou liquide renversé ? Remplacement complet du clavier.",
      tiers: [
        { id: "standard", name: "Standard", price: 199, detail: "Clavier compatible certifié" },
        { id: "premium", name: "Premium", price: 299, badge: "Populaire", detail: "Clavier OEM rétroéclairé" },
      ],
    },
    {
      id: "ssd", name: "Remplacement SSD", icon: "💾", price: "À partir de 129$", duration: "2h", guarantee: "1 an",
      description: "SSD défaillant ou manque d'espace ? Remplacement ou upgrade vers plus de stockage.",
      tiers: [
        { id: "256", name: "256 Go", price: 129, detail: "SSD NVMe compatible" },
        { id: "512", name: "512 Go", price: 189, badge: "Populaire", detail: "SSD NVMe haute vitesse" },
        { id: "1to", name: "1 To", price: 279, detail: "SSD NVMe 1 To haute vitesse" },
      ],
    },
    {
      id: "ventilateur", name: "Nettoyage / Ventilateur", icon: "🌀", price: "À partir de 89$", duration: "2h", guarantee: "3 mois",
      description: "MacBook qui surchauffe ou ventilateur bruyant ? Nettoyage interne + pâte thermique.",
      tiers: [
        { id: "nettoyage", name: "Nettoyage complet", price: 89, detail: "Dépoussiérage + pâte thermique" },
        { id: "ventilateur", name: "Nettoyage + Ventilateur", price: 149, badge: "Populaire", detail: "Remplacement ventilateur inclus" },
      ],
    },
    {
      id: "carte-mere", name: "Réparation Carte Mère", icon: "🔧", price: "Sur devis", duration: "3–7 jours", guarantee: "3 mois",
      description: "MacBook ne démarre plus ? Diagnostic et réparation microélectronique de la carte mère.",
      tiers: [
        { id: "diagnostic", name: "Diagnostic carte mère", price: 0, detail: "Gratuit — devis fourni ensuite" },
      ],
    },
    {
      id: "diagnostic", name: "Diagnostic Complet", icon: "🔍", price: "Gratuit", duration: "30 min", guarantee: "—",
      description: "MacBook en panne ? Diagnostic complet et gratuit.",
      tiers: [{ id: "gratuit", name: "Diagnostic gratuit", price: 0, detail: "100% gratuit, sans engagement" }],
    },
  ],
  "apple-watch": [
    {
      id: "vitre", name: "Remplacement Vitre/Écran", icon: "⌚", price: "À partir de 79$", duration: "1h30", guarantee: "6 mois",
      description: "Vitre Apple Watch fissurée ou écran endommagé ? Remplacement de la vitre OLED.",
      tiers: [
        { id: "standard", name: "Standard", price: 79, detail: "Vitre compatible certifiée" },
        { id: "premium", name: "Premium", price: 139, badge: "Populaire", detail: "Vitre OLED haute qualité" },
      ],
    },
    {
      id: "batterie", name: "Remplacement Batterie", icon: "🔋", price: "À partir de 59$", duration: "1h30", guarantee: "6 mois",
      description: "Apple Watch ne tient plus la charge ? Remplacement de la batterie.",
      tiers: [
        { id: "standard", name: "Standard", price: 59, detail: "Batterie compatible certifiée" },
        { id: "premium", name: "Premium", price: 99, badge: "Populaire", detail: "Batterie OEM haute capacité" },
      ],
    },
    {
      id: "couronne", name: "Réparation Digital Crown", icon: "🔘", price: "À partir de 89$", duration: "2h", guarantee: "6 mois",
      description: "Couronne numérique bloquée ou défaillante ? Réparation ou remplacement.",
      tiers: [
        { id: "reparation", name: "Réparation", price: 89, detail: "Nettoyage et remise en état" },
        { id: "remplacement", name: "Remplacement", price: 139, badge: "Recommandé", detail: "Nouvelle couronne OEM" },
      ],
    },
    {
      id: "bracelet", name: "Remplacement Bracelet", icon: "🔗", price: "À partir de 29$", duration: "30 min", guarantee: "3 mois",
      description: "Bracelet endommagé ou cassé ? Remplacement par un bracelet de qualité.",
      tiers: [
        { id: "sport", name: "Bracelet Sport", price: 29, detail: "Silicone haute qualité" },
        { id: "cuir", name: "Bracelet Cuir", price: 59, badge: "Populaire", detail: "Cuir véritable premium" },
      ],
    },
    {
      id: "diagnostic", name: "Diagnostic Complet", icon: "🔍", price: "Gratuit", duration: "30 min", guarantee: "—",
      description: "Apple Watch en panne ? Diagnostic gratuit.",
      tiers: [{ id: "gratuit", name: "Diagnostic gratuit", price: 0, detail: "100% gratuit, sans engagement" }],
    },
  ],
  consoles: [
    {
      id: "hdmi", name: "Réparation Port HDMI", icon: "🔌", price: "À partir de 79$", duration: "2h", guarantee: "6 mois",
      description: "Console sans image sur votre TV ? Remplacement du port HDMI endommagé.",
      tiers: [
        { id: "standard", name: "Standard", price: 79, detail: "Port HDMI compatible" },
        { id: "premium", name: "Premium", price: 119, badge: "Recommandé", detail: "Port HDMI renforcé haute qualité" },
      ],
    },
    {
      id: "nettoyage", name: "Nettoyage Complet", icon: "🧹", price: "À partir de 59$", duration: "1h30", guarantee: "3 mois",
      description: "Console qui surchauffe ou ventilateur bruyant ? Nettoyage complet + pâte thermique.",
      tiers: [
        { id: "basique", name: "Nettoyage basique", price: 59, detail: "Dépoussiérage externe et interne" },
        { id: "complet", name: "Nettoyage complet", price: 89, badge: "Recommandé", detail: "Nettoyage + pâte thermique + ventilateur" },
      ],
    },
    {
      id: "lecteur", name: "Remplacement Lecteur Disque", icon: "💿", price: "À partir de 99$", duration: "2h", guarantee: "6 mois",
      description: "Lecteur de disque qui ne lit plus ou qui fait du bruit ? Remplacement du lecteur.",
      tiers: [
        { id: "standard", name: "Standard", price: 99, detail: "Lecteur compatible certifié" },
        { id: "premium", name: "Premium", price: 149, badge: "Recommandé", detail: "Lecteur OEM qualité d'origine" },
      ],
    },
    {
      id: "alimentation", name: "Réparation Alimentation", icon: "⚡", price: "À partir de 89$", duration: "3h", guarantee: "6 mois",
      description: "Console qui ne démarre plus ? Réparation ou remplacement du module d'alimentation.",
      tiers: [
        { id: "reparation", name: "Réparation", price: 89, detail: "Diagnostic et soudure" },
        { id: "remplacement", name: "Remplacement", price: 149, badge: "Recommandé", detail: "Nouveau module d'alimentation" },
      ],
    },
    {
      id: "ssd", name: "Upgrade SSD/Disque Dur", icon: "💾", price: "À partir de 79$", duration: "1h30", guarantee: "1 an",
      description: "Manque d'espace ou disque défaillant ? Upgrade du stockage interne de votre console.",
      tiers: [
        { id: "1to", name: "1 To", price: 79, detail: "SSD NVMe compatible" },
        { id: "2to", name: "2 To", price: 139, badge: "Populaire", detail: "SSD NVMe 2 To haute vitesse" },
        { id: "4to", name: "4 To", price: 229, detail: "SSD NVMe 4 To haute vitesse" },
      ],
    },
    {
      id: "manette", name: "Réparation Manette (Drift)", icon: "🎮", price: "À partir de 39$", duration: "1h", guarantee: "6 mois",
      description: "Joystick qui dérive ou boutons défaillants ? Remplacement des sticks analogiques.",
      tiers: [
        { id: "un-stick", name: "1 stick analogique", price: 39, detail: "Remplacement d'un joystick" },
        { id: "deux-sticks", name: "2 sticks analogiques", price: 65, badge: "Recommandé", detail: "Remplacement des deux joysticks" },
      ],
    },
    {
      id: "diagnostic", name: "Diagnostic Complet", icon: "🔍", price: "Gratuit", duration: "45 min", guarantee: "—",
      description: "Console en panne ? Diagnostic gratuit pour identifier le problème.",
      tiers: [{ id: "gratuit", name: "Diagnostic gratuit", price: 0, detail: "100% gratuit, sans engagement" }],
    },
  ],
};

// ─── Brand data ────────────────────────────────────────────────────────────────

// GSMArena CDN — photos réelles de chaque appareil
const G = (slug: string) => `https://fdn2.gsmarena.com/vv/bigpic/${slug}.jpg`;

export const brands: Record<string, Brand> = {
  samsung: {
    id: "samsung",
    name: "Samsung",
    emoji: "📲",
    tagline: "Experts en réparation Samsung Galaxy",
    description: "Nos techniciens maîtrisent tous les modèles Samsung Galaxy — des classiques aux derniers pliables Galaxy Z.",
    series: [
      {
        id: "galaxy-a",
        name: "Galaxy A série",
        shortName: "Galaxy A",
        deviceType: "phone",
        image: G("samsung-galaxy-a55"),
        models: [
          { id: "galaxy-a55", name: "Galaxy A55 5G", image: G("samsung-galaxy-a55"), modelNumber: "SM-A556" },
          { id: "galaxy-a54", name: "Galaxy A54 5G", image: G("samsung-galaxy-a54"), modelNumber: "SM-A546" },
          { id: "galaxy-a53", name: "Galaxy A53 5G", image: G("samsung-galaxy-a53-5g-"), modelNumber: "SM-A536" },
          { id: "galaxy-a52s", name: "Galaxy A52s 5G", image: "/devices/galaxy-a52s.png", modelNumber: "SM-A528" },
          { id: "galaxy-a52", name: "Galaxy A52", image: "/devices/galaxy-a52.png", modelNumber: "SM-A525" },
          { id: "galaxy-a51", name: "Galaxy A51", image: "/devices/galaxy-a51.png", modelNumber: "SM-A515" },
          { id: "galaxy-a35", name: "Galaxy A35 5G", image: "/devices/galaxy-a35.png", modelNumber: "SM-A356" },
          { id: "galaxy-a34", name: "Galaxy A34 5G", image: G("samsung-galaxy-a34-5g-"), modelNumber: "SM-A346" },
          { id: "galaxy-a33", name: "Galaxy A33 5G", image: G("samsung-galaxy-a33-5g-"), modelNumber: "SM-A336" },
          { id: "galaxy-a32", name: "Galaxy A32", image: "/devices/galaxy-a32.png", modelNumber: "SM-A325" },
          { id: "galaxy-a31", name: "Galaxy A31", image: G("samsung-galaxy-a31-"), modelNumber: "SM-A315" },
          { id: "galaxy-a25", name: "Galaxy A25 5G", image: "/devices/galaxy-a25.png", modelNumber: "SM-A256" },
          { id: "galaxy-a24", name: "Galaxy A24 4G", image: "/devices/galaxy-a24.png", modelNumber: "SM-A245" },
          { id: "galaxy-a23", name: "Galaxy A23 5G", image: "/devices/galaxy-a23.png", modelNumber: "SM-A236" },
          { id: "galaxy-a22", name: "Galaxy A22 5G", image: G("samsung-galaxy-a22-5g-"), modelNumber: "SM-A226" },
          { id: "galaxy-a15", name: "Galaxy A15 5G", image: "/devices/galaxy-a15.png", modelNumber: "SM-A156" },
          { id: "galaxy-a14", name: "Galaxy A14 5G", image: "/devices/galaxy-a14.png", modelNumber: "SM-A146" },
          { id: "galaxy-a13", name: "Galaxy A13", image: "/devices/galaxy-a13.png", modelNumber: "SM-A135" },
          { id: "galaxy-a12", name: "Galaxy A12", image: "/devices/galaxy-a12.png", modelNumber: "SM-A125" },
          { id: "galaxy-a05s", name: "Galaxy A05s", image: "/devices/galaxy-a05s.png", modelNumber: "SM-A057" },
          { id: "galaxy-a04s", name: "Galaxy A04s", image: "/devices/galaxy-a04s.png", modelNumber: "SM-A047" },
          { id: "galaxy-a03s", name: "Galaxy A03s", image: "/devices/galaxy-a03s.png", modelNumber: "SM-A037" },
          { id: "galaxy-a03", name: "Galaxy A03", image: "/devices/galaxy-a03.png", modelNumber: "SM-A035" },
          { id: "galaxy-a02s", name: "Galaxy A02s", image: "/devices/galaxy-a02s.png", modelNumber: "SM-A025" },
          { id: "galaxy-a01", name: "Galaxy A01", image: "/devices/galaxy-a01.png", modelNumber: "SM-A015" },
        ],
      },
      {
        id: "galaxy-s",
        name: "Galaxy S série",
        shortName: "Galaxy S",
        deviceType: "phone",
        image: "/devices/galaxy-s25-ultra.png",
        models: [
          { id: "galaxy-s25-ultra", name: "Galaxy S25 Ultra", image: "/devices/galaxy-s25-ultra.png", modelNumber: "SM-S938" },
          { id: "galaxy-s25-plus", name: "Galaxy S25+", image: "/devices/galaxy-s25-plus.png", modelNumber: "SM-S936" },
          { id: "galaxy-s25", name: "Galaxy S25", image: "/devices/galaxy-s25.png", modelNumber: "SM-S931" },
          { id: "galaxy-s24-ultra", name: "Galaxy S24 Ultra", image: "/devices/galaxy-s24-ultra.png", modelNumber: "SM-S928" },
          { id: "galaxy-s24-plus", name: "Galaxy S24+", image: "/devices/galaxy-s24-plus.png", modelNumber: "SM-S926" },
          { id: "galaxy-s24", name: "Galaxy S24", image: G("samsung-galaxy-s24-5g-"), modelNumber: "SM-S921" },
          { id: "galaxy-s23-ultra", name: "Galaxy S23 Ultra", image: "/devices/galaxy-s23-ultra.png", modelNumber: "SM-S918" },
          { id: "galaxy-s23-plus", name: "Galaxy S23+", image: "/devices/galaxy-s23-plus.png", modelNumber: "SM-S916" },
          { id: "galaxy-s23", name: "Galaxy S23", image: "/devices/galaxy-s23.png", modelNumber: "SM-S911" },
          { id: "galaxy-s22-ultra", name: "Galaxy S22 Ultra", image: "/devices/galaxy-s22-ultra.png", modelNumber: "SM-S908" },
          { id: "galaxy-s22-plus", name: "Galaxy S22+", image: "/devices/galaxy-s22-plus.png", modelNumber: "SM-S906" },
          { id: "galaxy-s22", name: "Galaxy S22", image: "/devices/galaxy-s22.png", modelNumber: "SM-S901" },
          { id: "galaxy-s21-ultra", name: "Galaxy S21 Ultra", image: G("samsung-galaxy-s21-ultra-5g-"), modelNumber: "SM-G998" },
          { id: "galaxy-s21-plus", name: "Galaxy S21+", image: "/devices/galaxy-s21-plus.png", modelNumber: "SM-G996" },
          { id: "galaxy-s21", name: "Galaxy S21 5G", image: "/devices/galaxy-s21.png", modelNumber: "SM-G991" },
          { id: "galaxy-s20-ultra", name: "Galaxy S20 Ultra", image: "/devices/galaxy-s20-ultra.png", modelNumber: "SM-G988" },
          { id: "galaxy-s20-plus", name: "Galaxy S20+", image: "/devices/galaxy-s20-plus.png", modelNumber: "SM-G986" },
          { id: "galaxy-s20", name: "Galaxy S20", image: "/devices/galaxy-s20.png", modelNumber: "SM-G981" },
        ],
      },
      {
        id: "galaxy-z",
        name: "Galaxy Z série",
        shortName: "Galaxy Z",
        deviceType: "phone",
        image: G("samsung-galaxy-z-fold6"),
        models: [
          { id: "galaxy-z-fold6", name: "Galaxy Z Fold 6", image: "/devices/galaxy-z-fold6.png", modelNumber: "SM-F956" },
          { id: "galaxy-z-fold5", name: "Galaxy Z Fold 5", image: "/devices/galaxy-z-fold5.png", modelNumber: "SM-F946" },
          { id: "galaxy-z-fold4", name: "Galaxy Z Fold 4", image: "/devices/galaxy-z-fold4.png", modelNumber: "SM-F936" },
          { id: "galaxy-z-fold3", name: "Galaxy Z Fold 3", image: "/devices/galaxy-z-fold3.png", modelNumber: "SM-F926" },
          { id: "galaxy-z-flip6", name: "Galaxy Z Flip 6", image: "/devices/galaxy-z-flip6.png", modelNumber: "SM-F741" },
          { id: "galaxy-z-flip5", name: "Galaxy Z Flip 5", image: "/devices/galaxy-z-flip5.png", modelNumber: "SM-F731" },
          { id: "galaxy-z-flip4", name: "Galaxy Z Flip 4", image: "/devices/galaxy-z-flip4.png", modelNumber: "SM-F721" },
          { id: "galaxy-z-flip3", name: "Galaxy Z Flip 3", image: "/devices/galaxy-z-flip3.png", modelNumber: "SM-F711" },
        ],
      },
      {
        id: "galaxy-note",
        name: "Galaxy Note série",
        shortName: "Galaxy Note",
        deviceType: "phone",
        image: "/devices/galaxy-note-series.png",
        models: [
          { id: "galaxy-note20-ultra", name: "Galaxy Note 20 Ultra", image: "/devices/galaxy-note20-ultra.png", modelNumber: "SM-N986" },
          { id: "galaxy-note20", name: "Galaxy Note 20", image: "/devices/galaxy-note20.png", modelNumber: "SM-N981" },
          { id: "galaxy-note10-plus", name: "Galaxy Note 10+", image: "/devices/galaxy-note10-plus.png", modelNumber: "SM-N975" },
          { id: "galaxy-note10", name: "Galaxy Note 10", image: "/devices/galaxy-note10.png", modelNumber: "SM-N970" },
          { id: "galaxy-note9", name: "Galaxy Note 9", image: "/devices/galaxy-note9.png", modelNumber: "SM-N960" },
        ],
      },
    ],
  },

  iphone: {
    id: "iphone",
    name: "iPhone",
    emoji: "📱",
    tagline: "Réparation iPhone rapide et garantie",
    description: "Nos techniciens certifiés réparent tous les modèles iPhone avec des pièces de qualité et une garantie 90 jours.",
    series: [
      {
        id: "iphone-16",
        name: "iPhone 16 série",
        shortName: "iPhone 16",
        deviceType: "phone",
        image: G("apple-iphone-16-pro-max"),
        models: [
          { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max", image: G("apple-iphone-16-pro-max"), modelNumber: "A3293" },
          { id: "iphone-16-pro", name: "iPhone 16 Pro", image: G("apple-iphone-16-pro"), modelNumber: "A3292" },
          { id: "iphone-16-plus", name: "iPhone 16 Plus", image: G("apple-iphone-16-plus"), modelNumber: "A3287" },
          { id: "iphone-16", name: "iPhone 16", image: G("apple-iphone-16"), modelNumber: "A3290" },
        ],
      },
      {
        id: "iphone-15",
        name: "iPhone 15 série",
        shortName: "iPhone 15",
        deviceType: "phone",
        image: G("apple-iphone-15-pro-max"),
        models: [
          { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", image: G("apple-iphone-15-pro-max"), modelNumber: "A3105" },
          { id: "iphone-15-pro", name: "iPhone 15 Pro", image: G("apple-iphone-15-pro"), modelNumber: "A3101" },
          { id: "iphone-15-plus", name: "iPhone 15 Plus", image: "/devices/iphone-15-plus.png", modelNumber: "A3094" },
          { id: "iphone-15", name: "iPhone 15", image: G("apple-iphone-15"), modelNumber: "A3090" },
        ],
      },
      {
        id: "iphone-14",
        name: "iPhone 14 série",
        shortName: "iPhone 14",
        deviceType: "phone",
        image: "/devices/iphone-14-pro-max.png",
        models: [
          { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", image: "/devices/iphone-14-pro-max.png", modelNumber: "A2651" },
          { id: "iphone-14-pro", name: "iPhone 14 Pro", image: G("apple-iphone-14-pro"), modelNumber: "A2650" },
          { id: "iphone-14-plus", name: "iPhone 14 Plus", image: G("apple-iphone-14-plus"), modelNumber: "A2632" },
          { id: "iphone-14", name: "iPhone 14", image: G("apple-iphone-14"), modelNumber: "A2649" },
        ],
      },
      {
        id: "iphone-13",
        name: "iPhone 13 série",
        shortName: "iPhone 13",
        deviceType: "phone",
        image: G("apple-iphone-13-pro-max"),
        models: [
          { id: "iphone-13-pro-max", name: "iPhone 13 Pro Max", image: G("apple-iphone-13-pro-max"), modelNumber: "A2484" },
          { id: "iphone-13-pro", name: "iPhone 13 Pro", image: G("apple-iphone-13-pro"), modelNumber: "A2483" },
          { id: "iphone-13", name: "iPhone 13", image: G("apple-iphone-13"), modelNumber: "A2482" },
          { id: "iphone-13-mini", name: "iPhone 13 Mini", image: G("apple-iphone-13-mini"), modelNumber: "A2481" },
        ],
      },
      {
        id: "iphone-12",
        name: "iPhone 12 série",
        shortName: "iPhone 12",
        deviceType: "phone",
        image: G("apple-iphone-12-pro-max"),
        models: [
          { id: "iphone-12-pro-max", name: "iPhone 12 Pro Max", image: G("apple-iphone-12-pro-max"), modelNumber: "A2342" },
          { id: "iphone-12-pro", name: "iPhone 12 Pro", image: G("apple-iphone-12-pro"), modelNumber: "A2341" },
          { id: "iphone-12", name: "iPhone 12", image: G("apple-iphone-12"), modelNumber: "A2172" },
          { id: "iphone-12-mini", name: "iPhone 12 Mini", image: G("apple-iphone-12-mini"), modelNumber: "A2176" },
        ],
      },
      {
        id: "iphone-11",
        name: "iPhone 11 série",
        shortName: "iPhone 11",
        deviceType: "phone",
        image: "/devices/iphone-11-pro-max.png",
        models: [
          { id: "iphone-11-pro-max", name: "iPhone 11 Pro Max", image: "/devices/iphone-11-pro-max.png", modelNumber: "A2218" },
          { id: "iphone-11-pro", name: "iPhone 11 Pro", image: G("apple-iphone-11-pro"), modelNumber: "A2215" },
          { id: "iphone-11", name: "iPhone 11", image: G("apple-iphone-11"), modelNumber: "A2111" },
          { id: "iphone-xr", name: "iPhone XR", image: G("apple-iphone-xr"), modelNumber: "A1984" },
          { id: "iphone-xs-max", name: "iPhone XS Max", image: G("apple-iphone-xs-max"), modelNumber: "A1921" },
          { id: "iphone-xs", name: "iPhone XS", image: G("apple-iphone-xs"), modelNumber: "A1920" },
          { id: "iphone-x", name: "iPhone X", image: G("apple-iphone-x"), modelNumber: "A1865" },
        ],
      },
      {
        id: "iphone-se",
        name: "iPhone SE série",
        shortName: "iPhone SE",
        deviceType: "phone",
        image: G("apple-iphone-se-2022-"),
        models: [
          { id: "iphone-se-2022", name: "iPhone SE (2022)", image: G("apple-iphone-se-2022-"), modelNumber: "A2595" },
          { id: "iphone-se-2020", name: "iPhone SE (2020)", image: G("apple-iphone-se-2020-"), modelNumber: "A2296" },
          { id: "iphone-8-plus", name: "iPhone 8 Plus", image: G("apple-iphone-8-plus"), modelNumber: "A1864" },
          { id: "iphone-8", name: "iPhone 8", image: G("apple-iphone-8"), modelNumber: "A1863" },
        ],
      },
    ],
  },

  ipad: {
    id: "ipad",
    name: "iPad",
    emoji: "📋",
    tagline: "Réparation iPad Pro, Air, Mini et standard",
    description: "Nos techniciens réparent tous les modèles iPad — écran, batterie, connecteur et plus encore.",
    series: [
      {
        id: "ipad-pro",
        name: "iPad Pro série",
        shortName: "iPad Pro",
        deviceType: "ipad-pro",
        image: "/devices/ipad-pro-series.png",
        models: [
          { id: "ipad-pro-13-m4",   name: "iPad Pro 13\" (M4 2024)",    image: "/devices/ipad-pro-13-m4.png",    modelNumber: "A2925" },
          { id: "ipad-pro-11-m4",   name: "iPad Pro 11\" (M4 2024)",    image: "/devices/ipad-pro-11-m4.png",    modelNumber: "A2837" },
          { id: "ipad-pro-12-m2",   name: "iPad Pro 12.9\" (M2 2022)",  image: "/devices/ipad-pro-12-m2.png",  modelNumber: "A2764" },
          { id: "ipad-pro-11-m2",   name: "iPad Pro 11\" (M2 2022)",    image: "/devices/ipad-pro-11-m2.png",    modelNumber: "A2759" },
          { id: "ipad-pro-12-m1",   name: "iPad Pro 12.9\" (M1 2021)",  image: "/devices/ipad-pro-12-m1.png",  modelNumber: "A2378" },
          { id: "ipad-pro-11-m1",   name: "iPad Pro 11\" (M1 2021)",    image: "/devices/ipad-pro-11-m1.png",    modelNumber: "A2301" },
          { id: "ipad-pro-12-2020", name: "iPad Pro 12.9\" (2020)",     image: "/devices/ipad-pro-12-2020.png",  modelNumber: "A2229" },
          { id: "ipad-pro-11-2020", name: "iPad Pro 11\" (2020)",       image: "/devices/ipad-pro-11-2020.png",    modelNumber: "A2228" },
          { id: "ipad-pro-12-2018", name: "iPad Pro 12.9\" (2018)",     image: "/devices/ipad-pro-12-2018.png",  modelNumber: "A1876" },
          { id: "ipad-pro-11-2018", name: "iPad Pro 11\" (2018)",       image: "/devices/ipad-pro-11-2018.png",    modelNumber: "A1980" },
        ],
      },
      {
        id: "ipad-air",
        name: "iPad Air série",
        shortName: "iPad Air",
        deviceType: "tablet",
        image: "/devices/ipad-air-series.png",
        models: [
          { id: "ipad-air-13-2025",  name: "iPad Air 13\" (2025)",      image: "/devices/ipad-air-13-2025.png",  modelNumber: "A3399" },
          { id: "ipad-air-11-2025",  name: "iPad Air 11\" (2025)",      image: "/devices/ipad-air-11-2025.png",  modelNumber: "A3400" },
          { id: "ipad-air-13-m2",    name: "iPad Air 13\" (M2 2024)",   image: "/devices/ipad-air-13-m2.png",  modelNumber: "A2898" },
          { id: "ipad-air-11-m2",    name: "iPad Air 11\" (M2 2024)",   image: "/devices/ipad-air-11-m2.png",  modelNumber: "A2902" },
          { id: "ipad-air-5",        name: "iPad Air 5 (M1 2022)",      image: "/devices/ipad-air-5.png",     modelNumber: "A2588" },
          { id: "ipad-air-4",        name: "iPad Air 4 (2020)",         image: "/devices/ipad-air-4.png",     modelNumber: "A2316" },
          { id: "ipad-air-3",        name: "iPad Air 3 (2019)",         image: "/devices/ipad-air-3.png",     modelNumber: "A2152" },
          { id: "ipad-air-2",        name: "iPad Air 2",                image: "/devices/ipad-air-2.png",         modelNumber: "A1566" },
        ],
      },
      {
        id: "ipad-standard",
        name: "iPad (standard)",
        shortName: "iPad",
        deviceType: "tablet",
        image: "/devices/ipad-standard-series.png",
        models: [
          { id: "ipad-11",  name: "iPad 11 (2025)",       image: "/devices/ipad-11.png",          modelNumber: "A2757" },
          { id: "ipad-10",  name: "iPad 10 (2022)",       image: "/devices/ipad-10.png",          modelNumber: "A2696" },
          { id: "ipad-9",   name: "iPad 9 (2021)",        image: "/devices/ipad-9.png",  modelNumber: "A2602" },
          { id: "ipad-8",   name: "iPad 8 (2020)",        image: "/devices/ipad-8.png",  modelNumber: "A2270" },
          { id: "ipad-7",   name: "iPad 7 (2019)",        image: "/devices/ipad-7.png",  modelNumber: "A2197" },
          { id: "ipad-6",   name: "iPad 6 (2018)",        image: "/devices/ipad-6.png",          modelNumber: "A1893" },
          { id: "ipad-5",   name: "iPad 5 (2017)",        image: "/devices/ipad-5.png",          modelNumber: "A1822" },
        ],
      },
      {
        id: "ipad-mini",
        name: "iPad Mini série",
        shortName: "iPad Mini",
        deviceType: "ipad-mini",
        image: "/devices/ipad-mini-series.png",
        models: [
          { id: "ipad-mini-7", name: "iPad Mini 7 (2024)", image: "/devices/ipad-mini-7.png", modelNumber: "A3286" },
          { id: "ipad-mini-6", name: "iPad Mini 6 (2021)", image: "/devices/ipad-mini-6.png", modelNumber: "A2567" },
          { id: "ipad-mini-5", name: "iPad Mini 5 (2019)", image: "/devices/ipad-mini-5.png", modelNumber: "A2133" },
          { id: "ipad-mini-4", name: "iPad Mini 4 (2015)", image: G("apple-ipad-mini-4"),     modelNumber: "A1538" },
          { id: "ipad-mini-3", name: "iPad Mini 3",        image: "/devices/ipad-mini-3.png",     modelNumber: "A1599" },
        ],
      },
    ],
  },

  macbook: {
    id: "macbook",
    name: "MacBook",
    emoji: "💻",
    tagline: "Réparation MacBook Pro et Air",
    description: "Nos techniciens spécialisés en matériel Apple réparent tous les modèles MacBook avec des pièces certifiées.",
    series: [
      {
        id: "macbook-pro",
        name: "MacBook Pro série",
        shortName: "MacBook Pro",
        deviceType: "laptop",
        image: "/devices/macbook-pro-series.png",
        models: [
          { id: "macbook-pro-16-m4",   name: "MacBook Pro 16\" (M4 Pro 2024)", image: "/devices/macbook-pro-16-m4.png", modelNumber: "A3250" },
          { id: "macbook-pro-14-m4",   name: "MacBook Pro 14\" (M4 Pro 2024)", image: "/devices/macbook-pro-14-m4.png", modelNumber: "A3259" },
          { id: "macbook-pro-16-m3",   name: "MacBook Pro 16\" (M3 Pro 2023)", image: "/devices/macbook-pro-16-m3.png", modelNumber: "A2991" },
          { id: "macbook-pro-14-m3",   name: "MacBook Pro 14\" (M3 Pro 2023)", image: "/devices/macbook-pro-14-m3.png", modelNumber: "A2992" },
          { id: "macbook-pro-16-m2",   name: "MacBook Pro 16\" (M2 Pro 2023)", image: "/devices/macbook-pro-16-m2.png", modelNumber: "A2780" },
          { id: "macbook-pro-14-m2",   name: "MacBook Pro 14\" (M2 Pro 2023)", image: "/devices/macbook-pro-14-m2.png", modelNumber: "A2779" },
          { id: "macbook-pro-13-m2",   name: "MacBook Pro 13\" (M2 2022)",     image: "/devices/macbook-pro-13-m2.png",    modelNumber: "A2338" },
          { id: "macbook-pro-13-m1",   name: "MacBook Pro 13\" (M1 2020)",     image: "/devices/macbook-pro-13-m1.png",    modelNumber: "A2251" },
          { id: "macbook-pro-16-2019", name: "MacBook Pro 16\" (Intel 2019)",  image: "/devices/macbook-pro-16-2019.png",       modelNumber: "A2141" },
          { id: "macbook-pro-13-2020", name: "MacBook Pro 13\" (Intel 2020)",  image: "/devices/macbook-pro-13-2020.png",       modelNumber: "A2289" },
          { id: "macbook-pro-15-2019", name: "MacBook Pro 15\" (Intel 2019)",  image: "/devices/macbook-pro-15-2019.png",       modelNumber: "A1990" },
        ],
      },
      {
        id: "macbook-air",
        name: "MacBook Air série",
        shortName: "MacBook Air",
        deviceType: "laptop",
        image: "/devices/macbook-air-series.png",
        models: [
          { id: "macbook-air-15-m3",  name: "MacBook Air 15\" (M3 2024)", image: "/devices/macbook-air-15-m3.png", modelNumber: "A3114" },
          { id: "macbook-air-13-m3",  name: "MacBook Air 13\" (M3 2024)", image: "/devices/macbook-air-13-m3.png", modelNumber: "A3113" },
          { id: "macbook-air-15-m2",  name: "MacBook Air 15\" (M2 2023)", image: "/devices/macbook-air-15-m2.png", modelNumber: "A2941" },
          { id: "macbook-air-13-m2",  name: "MacBook Air 13\" (M2 2022)", image: "/devices/macbook-air-13-m2.png", modelNumber: "A2681" },
          { id: "macbook-air-m1",     name: "MacBook Air (M1 2020)",      image: "/devices/macbook-air-m1.png", modelNumber: "A2337" },
          { id: "macbook-air-2020",   name: "MacBook Air (Intel 2020)",   image: "/devices/macbook-air-2020.png",       modelNumber: "A2179" },
          { id: "macbook-air-2019",   name: "MacBook Air (2019)",         image: "/devices/macbook-air-2019.png",       modelNumber: "A1932" },
          { id: "macbook-air-2018",   name: "MacBook Air (2018)",         image: "/devices/macbook-air-2018.png",       modelNumber: "A1932" },
        ],
      },
    ],
  },

  "apple-watch": {
    id: "apple-watch",
    name: "Apple Watch",
    emoji: "⌚",
    tagline: "Réparation Apple Watch toutes séries",
    description: "Vitre fissurée, batterie défaillante ou couronne bloquée — nous réparons toutes les Apple Watch avec garantie.",
    series: [
      {
        id: "apple-watch-ultra",
        name: "Apple Watch Ultra",
        shortName: "Ultra",
        deviceType: "watch",
        image: "/devices/apple-watch-ultra-series.png",
        models: [
          { id: "apple-watch-ultra-2", name: "Apple Watch Ultra 2 (2023)", image: "/devices/apple-watch-ultra-2.png",  modelNumber: "A2986" },
          { id: "apple-watch-ultra-1", name: "Apple Watch Ultra (2022)",   image: G("apple-watch-ultra-"),   modelNumber: "A2622" },
        ],
      },
      {
        id: "apple-watch-series",
        name: "Apple Watch Series",
        shortName: "Series",
        deviceType: "watch",
        image: "/devices/apple-watch-s10.png",
        models: [
          { id: "apple-watch-s10", name: "Apple Watch Series 10 (2024)", image: "/devices/apple-watch-s10.png", modelNumber: "A3293" },
          { id: "apple-watch-s9",  name: "Apple Watch Series 9 (2023)",  image: "/devices/apple-watch-s9.png",  modelNumber: "A2978" },
          { id: "apple-watch-s8",  name: "Apple Watch Series 8 (2022)",  image: "/devices/apple-watch-s8.png",  modelNumber: "A2857" },
          { id: "apple-watch-s7",  name: "Apple Watch Series 7 (2021)",  image: "/devices/apple-watch-s7.png",  modelNumber: "A2473" },
          { id: "apple-watch-s6",  name: "Apple Watch Series 6 (2020)",  image: "/devices/apple-watch-s6.png",  modelNumber: "A2291" },
          { id: "apple-watch-s5",  name: "Apple Watch Series 5 (2019)",  image: "/devices/apple-watch-s5.png",  modelNumber: "A2093" },
          { id: "apple-watch-s4",  name: "Apple Watch Series 4 (2018)",  image: "/devices/apple-watch-s4.png",  modelNumber: "A1978" },
          { id: "apple-watch-s3",  name: "Apple Watch Series 3 (2017)",  image: "/devices/apple-watch-s3.png",  modelNumber: "A1858" },
        ],
      },
      {
        id: "apple-watch-se",
        name: "Apple Watch SE",
        shortName: "SE",
        deviceType: "watch",
        image: "/devices/apple-watch-se-series.png",
        models: [
          { id: "apple-watch-se2", name: "Apple Watch SE 2e gén. (2022)", image: "/devices/apple-watch-se2.png", modelNumber: "A2723" },
          { id: "apple-watch-se1", name: "Apple Watch SE 1re gén. (2020)", image: "/devices/apple-watch-se1.png", modelNumber: "A2351" },
        ],
      },
    ],
  },

  consoles: {
    id: "consoles",
    name: "Consoles",
    emoji: "🎮",
    tagline: "Réparation consoles PlayStation, Xbox & Nintendo",
    description: "Nos techniciens spécialisés réparent toutes les consoles de jeux — diagnostics gratuits et réparations garanties.",
    series: [
      {
        id: "playstation",
        name: "PlayStation",
        shortName: "PlayStation",
        deviceType: "console",
        image: "/devices/ps5.png",
        models: [
          { id: "ps5",      name: "PlayStation 5",        image: "/devices/ps5.png",      modelNumber: "CFI-1000" },
          { id: "ps5-slim", name: "PlayStation 5 Slim",   image: "/devices/ps5-slim.png", modelNumber: "CFI-2000" },
          { id: "ps4-pro",  name: "PlayStation 4 Pro",    image: "/devices/ps4-pro.png",  modelNumber: "CUH-7000" },
          { id: "ps4-slim", name: "PlayStation 4 Slim",   image: "/devices/ps4-slim.png", modelNumber: "CUH-2000" },
          { id: "ps4",      name: "PlayStation 4",        image: "/devices/ps4.png",      modelNumber: "CUH-1000" },
          { id: "ps3",      name: "PlayStation 3 Slim",   image: "/devices/ps3-slim.png", modelNumber: "CECH-2000" },
        ],
      },
      {
        id: "xbox",
        name: "Xbox",
        shortName: "Xbox",
        deviceType: "console",
        image: G("microsoft-xbox-series-x"),
        models: [
          { id: "xbox-series-x", name: "Xbox Series X",  image: G("microsoft-xbox-series-x"), modelNumber: "RRT-00001" },
          { id: "xbox-series-s", name: "Xbox Series S",  image: "/devices/xbox-series-s.png", modelNumber: "RRS-00001" },
          { id: "xbox-one-x",    name: "Xbox One X",     image: G("microsoft-xbox-one-x"),    modelNumber: "1787" },
          { id: "xbox-one-s",    name: "Xbox One S",     image: "/devices/xbox-one-s.png",    modelNumber: "1681" },
          { id: "xbox-one",      name: "Xbox One",       image: "/devices/xbox-one.png",      modelNumber: "1540" },
        ],
      },
      {
        id: "nintendo",
        name: "Nintendo Switch",
        shortName: "Nintendo",
        deviceType: "console",
        image: "/devices/nintendo-switch-oled.png",
        models: [
          { id: "switch-oled",  name: "Nintendo Switch OLED", image: "/devices/nintendo-switch-oled.png", modelNumber: "HEG-001" },
          { id: "switch-v2",    name: "Nintendo Switch V2",   image: G("nintendo-switch-v2"),         modelNumber: "HAC-001" },
          { id: "switch-lite",  name: "Nintendo Switch Lite", image: "/devices/nintendo-switch-lite.png",       modelNumber: "HDH-001" },
          { id: "steam-deck",   name: "Steam Deck OLED",      image: "/devices/steam-deck-oled.png",      modelNumber: "1030" },
        ],
      },
    ],
  },
};

export function getBrand(brandId: string): Brand | undefined {
  return brands[brandId];
}

export function getSeries(brandId: string, seriesId: string): DeviceSeries | undefined {
  return brands[brandId]?.series.find((s) => s.id === seriesId);
}

export function getModel(brandId: string, seriesId: string, modelId: string): DeviceModel | undefined {
  return getSeries(brandId, seriesId)?.models.find((m) => m.id === modelId);
}

export function getRepairs(brandId: string): RepairOption[] {
  const base = repairsByBrand[brandId] ?? repairsByBrand.samsung;
  const overrides = repairPriceOverrides as Record<string, Record<string, Record<string, number>>>;
  const brand = overrides[brandId];
  if (!brand) return base;
  return base.map((r) => ({
    ...r,
    tiers: r.tiers.map((t) => ({
      ...t,
      price: brand[r.id]?.[t.id] ?? t.price,
    })),
  }));
}

export function getRepair(brandId: string, repairId: string): RepairOption | undefined {
  return getRepairs(brandId).find((r) => r.id === repairId);
}

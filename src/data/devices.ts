export interface RepairOption {
  id: string;
  name: string;
  icon: string;
  price: string;
  duration: string;
  description: string;
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
    { id: "ecran", name: "Réparation Écran", icon: "🖥️", price: "À partir de 79$ CAD", duration: "1–2 heures", description: "Écran fissuré ou tactile défaillant ? Nous remplaçons l'écran OLED/LCD avec des pièces certifiées." },
    { id: "batterie", name: "Remplacement Batterie", icon: "🔋", price: "À partir de 49$ CAD", duration: "30–45 min", description: "Batterie qui se décharge rapidement ? Nous remplaçons la batterie originale Apple." },
    { id: "camera-arriere", name: "Réparation Caméra Arrière", icon: "📸", price: "À partir de 89$ CAD", duration: "2–3 heures", description: "Photos floues ou caméra qui ne s'ouvre plus ? Remplacement complet du module caméra." },
    { id: "camera-avant", name: "Réparation Caméra Avant", icon: "🤳", price: "À partir de 59$ CAD", duration: "1–2 heures", description: "Selfies flous ou Face ID défaillant ? Remplacement de la caméra frontale." },
    { id: "connecteur", name: "Connecteur de Charge", icon: "⚡", price: "À partir de 69$ CAD", duration: "1–2 heures", description: "iPhone ne charge plus ? Remplacement du connecteur Lightning ou USB-C." },
    { id: "haut-parleur", name: "Haut-parleur / Micro", icon: "🔊", price: "À partir de 55$ CAD", duration: "1 heure", description: "Son faible ou micro ne fonctionne plus ? Remplacement du haut-parleur ou micro." },
    { id: "diagnostic", name: "Diagnostic Complet", icon: "🔍", price: "0.00$ CAD", duration: "30 min", description: "Votre iPhone est en panne ? Nous effectuons un diagnostic complet pour identifier le problème." },
  ],
  samsung: [
    { id: "ecran", name: "Réparation Écran", icon: "🖥️", price: "À partir de 89$ CAD", duration: "1–3 heures", description: "Écran AMOLED brisé ou non réactif ? Remplacement avec pièces certifiées Samsung." },
    { id: "batterie", name: "Remplacement Batterie", icon: "🔋", price: "À partir de 49$ CAD", duration: "45 min–1h30", description: "Batterie défaillante ? Nous remplaçons la batterie par une pièce de qualité OEM." },
    { id: "camera", name: "Réparation Caméra", icon: "📸", price: "À partir de 79$ CAD", duration: "2–3 heures", description: "Caméra floue ou module endommagé ? Remplacement du module caméra arrière." },
    { id: "connecteur", name: "Connecteur USB-C", icon: "⚡", price: "À partir de 65$ CAD", duration: "1–2 heures", description: "Samsung ne charge plus ? Remplacement du connecteur USB-C." },
    { id: "vitre-arriere", name: "Vitre Arrière", icon: "🔲", price: "À partir de 79$ CAD", duration: "2–3 heures", description: "Vitre arrière brisée ? Remplacement complet de la vitre arrière." },
    { id: "haut-parleur", name: "Haut-parleur / Micro", icon: "🔊", price: "À partir de 55$ CAD", duration: "1 heure", description: "Problème audio ? Remplacement du haut-parleur ou du microphone." },
    { id: "diagnostic", name: "Diagnostic Complet", icon: "🔍", price: "0.00$ CAD", duration: "30 min", description: "Votre Samsung est en panne ? Nous effectuons un diagnostic complet gratuit." },
  ],
  ipad: [
    { id: "ecran", name: "Réparation Écran LCD/Retina", icon: "🖥️", price: "À partir de 99$ CAD", duration: "2–4 heures", description: "Écran fissuré ou non fonctionnel ? Remplacement complet de l'écran iPad." },
    { id: "vitre", name: "Remplacement Vitre Tactile", icon: "👆", price: "À partir de 79$ CAD", duration: "2–3 heures", description: "Vitre tactile brisée ? Remplacement de la vitre avec maintien de la qualité d'image." },
    { id: "batterie", name: "Remplacement Batterie", icon: "🔋", price: "À partir de 69$ CAD", duration: "1–2 heures", description: "iPad ne tient plus la charge ? Remplacement de la batterie originale." },
    { id: "connecteur", name: "Connecteur Lightning/USB-C", icon: "⚡", price: "À partir de 79$ CAD", duration: "1–2 heures", description: "iPad ne charge plus ? Remplacement du connecteur de charge." },
    { id: "camera", name: "Réparation Caméra", icon: "📸", price: "À partir de 75$ CAD", duration: "2–3 heures", description: "Caméra iPad défaillante ? Remplacement du module caméra." },
    { id: "diagnostic", name: "Diagnostic Complet", icon: "🔍", price: "0.00$ CAD", duration: "30 min", description: "Votre iPad est en panne ? Diagnostic gratuit pour identifier le problème." },
  ],
  macbook: [
    { id: "ecran", name: "Remplacement Écran", icon: "🖥️", price: "À partir de 249$ CAD", duration: "3–5 heures", description: "Écran MacBook endommagé ou fissuré ? Remplacement avec dalle certifiée." },
    { id: "batterie", name: "Remplacement Batterie", icon: "🔋", price: "À partir de 149$ CAD", duration: "2–3 heures", description: "MacBook ne tient plus la charge ? Remplacement de la batterie." },
    { id: "clavier", name: "Remplacement Clavier", icon: "⌨️", price: "À partir de 199$ CAD", duration: "3–5 heures", description: "Touches coincées ou clavier endommagé ? Remplacement complet du clavier." },
    { id: "ssd", name: "Remplacement SSD", icon: "💾", price: "À partir de 129$ CAD", duration: "2–3 heures", description: "SSD défaillant ou manque d'espace ? Remplacement ou upgrade du SSD." },
    { id: "ventilateur", name: "Nettoyage / Ventilateur", icon: "🌀", price: "À partir de 89$ CAD", duration: "2 heures", description: "MacBook qui surchauffe ? Nettoyage interne et remplacement de la pâte thermique." },
    { id: "carte-mere", name: "Réparation Carte Mère", icon: "🔧", price: "Sur devis", duration: "3–7 jours", description: "MacBook ne démarre plus ? Diagnostic et réparation de la carte mère." },
    { id: "diagnostic", name: "Diagnostic Complet", icon: "🔍", price: "0.00$ CAD", duration: "30 min", description: "MacBook en panne ? Diagnostic gratuit pour identifier le problème." },
  ],
  "apple-watch": [
    { id: "vitre", name: "Remplacement Vitre/Écran", icon: "⌚", price: "À partir de 79$ CAD", duration: "1–2 heures", description: "Vitre Apple Watch fissurée ? Remplacement de la vitre OLED." },
    { id: "batterie", name: "Remplacement Batterie", icon: "🔋", price: "À partir de 59$ CAD", duration: "1–2 heures", description: "Apple Watch ne tient plus la charge ? Remplacement de la batterie." },
    { id: "couronne", name: "Réparation Couronne Digital Crown", icon: "🔘", price: "À partir de 89$ CAD", duration: "2–3 heures", description: "Couronne numérique bloquée ou défaillante ? Réparation ou remplacement." },
    { id: "bracelet", name: "Remplacement Bracelet", icon: "🔗", price: "À partir de 29$ CAD", duration: "30 min", description: "Bracelet endommagé ? Remplacement par un bracelet de qualité." },
    { id: "diagnostic", name: "Diagnostic Complet", icon: "🔍", price: "0.00$ CAD", duration: "30 min", description: "Apple Watch en panne ? Diagnostic gratuit." },
  ],
  consoles: [
    { id: "hdmi", name: "Réparation Port HDMI", icon: "🔌", price: "À partir de 79$ CAD", duration: "2–3 heures", description: "Console sans image ? Remplacement du port HDMI endommagé." },
    { id: "nettoyage", name: "Nettoyage Complet", icon: "🧹", price: "À partir de 59$ CAD", duration: "1–2 heures", description: "Console qui surchauffe ou fait du bruit ? Nettoyage complet + pâte thermique." },
    { id: "lecteur", name: "Remplacement Lecteur Disque", icon: "💿", price: "À partir de 99$ CAD", duration: "2–3 heures", description: "Lecteur de disque qui ne lit plus ? Remplacement du lecteur." },
    { id: "alimentation", name: "Réparation Alimentation", icon: "⚡", price: "À partir de 89$ CAD", duration: "2–4 heures", description: "Console qui ne démarre plus ? Réparation du module d'alimentation." },
    { id: "ssd", name: "Remplacement SSD/Disque Dur", icon: "💾", price: "À partir de 79$ CAD", duration: "1–2 heures", description: "Manque d'espace ou disque défaillant ? Upgrade du stockage interne." },
    { id: "manette", name: "Réparation Manette (Drift)", icon: "🎮", price: "À partir de 39$ CAD", duration: "1 heure", description: "Joystick qui dérive ? Remplacement des sticks analogiques." },
    { id: "diagnostic", name: "Diagnostic Complet", icon: "🔍", price: "0.00$ CAD", duration: "45 min", description: "Console en panne ? Diagnostic gratuit pour identifier le problème." },
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
          { id: "galaxy-a53", name: "Galaxy A53 5G", image: G("samsung-galaxy-a53-5g"), modelNumber: "SM-A536" },
          { id: "galaxy-a52s", name: "Galaxy A52s 5G", image: G("samsung-galaxy-a52s-5g"), modelNumber: "SM-A528" },
          { id: "galaxy-a52", name: "Galaxy A52", image: G("samsung-galaxy-a52"), modelNumber: "SM-A525" },
          { id: "galaxy-a51", name: "Galaxy A51", image: G("samsung-galaxy-a51"), modelNumber: "SM-A515" },
          { id: "galaxy-a35", name: "Galaxy A35 5G", image: G("samsung-galaxy-a35"), modelNumber: "SM-A356" },
          { id: "galaxy-a34", name: "Galaxy A34 5G", image: G("samsung-galaxy-a34"), modelNumber: "SM-A346" },
          { id: "galaxy-a33", name: "Galaxy A33 5G", image: G("samsung-galaxy-a33-5g"), modelNumber: "SM-A336" },
          { id: "galaxy-a32", name: "Galaxy A32", image: G("samsung-galaxy-a32"), modelNumber: "SM-A325" },
          { id: "galaxy-a31", name: "Galaxy A31", image: G("samsung-galaxy-a31"), modelNumber: "SM-A315" },
          { id: "galaxy-a25", name: "Galaxy A25 5G", image: G("samsung-galaxy-a25"), modelNumber: "SM-A256" },
          { id: "galaxy-a24", name: "Galaxy A24 4G", image: G("samsung-galaxy-a24"), modelNumber: "SM-A245" },
          { id: "galaxy-a23", name: "Galaxy A23 5G", image: G("samsung-galaxy-a23-5g"), modelNumber: "SM-A236" },
          { id: "galaxy-a22", name: "Galaxy A22 5G", image: G("samsung-galaxy-a22-5g"), modelNumber: "SM-A226" },
          { id: "galaxy-a15", name: "Galaxy A15 5G", image: G("samsung-galaxy-a15-5g"), modelNumber: "SM-A156" },
          { id: "galaxy-a14", name: "Galaxy A14 5G", image: G("samsung-galaxy-a14-5g"), modelNumber: "SM-A146" },
          { id: "galaxy-a13", name: "Galaxy A13", image: G("samsung-galaxy-a13"), modelNumber: "SM-A135" },
          { id: "galaxy-a12", name: "Galaxy A12", image: G("samsung-galaxy-a12"), modelNumber: "SM-A125" },
          { id: "galaxy-a05s", name: "Galaxy A05s", image: G("samsung-galaxy-a05s"), modelNumber: "SM-A057" },
          { id: "galaxy-a04s", name: "Galaxy A04s", image: G("samsung-galaxy-a04s"), modelNumber: "SM-A047" },
          { id: "galaxy-a03s", name: "Galaxy A03s", image: G("samsung-galaxy-a03s"), modelNumber: "SM-A037" },
          { id: "galaxy-a03", name: "Galaxy A03", image: G("samsung-galaxy-a03"), modelNumber: "SM-A035" },
          { id: "galaxy-a02s", name: "Galaxy A02s", image: G("samsung-galaxy-a02s"), modelNumber: "SM-A025" },
          { id: "galaxy-a01", name: "Galaxy A01", image: G("samsung-galaxy-a01"), modelNumber: "SM-A015" },
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
          { id: "galaxy-s24-plus", name: "Galaxy S24+", image: G("samsung-galaxy-s24+"), modelNumber: "SM-S926" },
          { id: "galaxy-s24", name: "Galaxy S24", image: G("samsung-galaxy-s24"), modelNumber: "SM-S921" },
          { id: "galaxy-s23-ultra", name: "Galaxy S23 Ultra", image: G("samsung-galaxy-s23-ultra"), modelNumber: "SM-S918" },
          { id: "galaxy-s23-plus", name: "Galaxy S23+", image: G("samsung-galaxy-s23+"), modelNumber: "SM-S916" },
          { id: "galaxy-s23", name: "Galaxy S23", image: G("samsung-galaxy-s23"), modelNumber: "SM-S911" },
          { id: "galaxy-s22-ultra", name: "Galaxy S22 Ultra", image: G("samsung-galaxy-s22-ultra-5g"), modelNumber: "SM-S908" },
          { id: "galaxy-s22-plus", name: "Galaxy S22+", image: G("samsung-galaxy-s22+-5g"), modelNumber: "SM-S906" },
          { id: "galaxy-s22", name: "Galaxy S22", image: G("samsung-galaxy-s22-5g"), modelNumber: "SM-S901" },
          { id: "galaxy-s21-ultra", name: "Galaxy S21 Ultra", image: G("samsung-galaxy-s21-ultra-5g"), modelNumber: "SM-G998" },
          { id: "galaxy-s21-plus", name: "Galaxy S21+", image: G("samsung-galaxy-s21+-5g"), modelNumber: "SM-G996" },
          { id: "galaxy-s21", name: "Galaxy S21 5G", image: G("samsung-galaxy-s21-5g"), modelNumber: "SM-G991" },
          { id: "galaxy-s20-ultra", name: "Galaxy S20 Ultra", image: G("samsung-galaxy-s20-ultra"), modelNumber: "SM-G988" },
          { id: "galaxy-s20-plus", name: "Galaxy S20+", image: G("samsung-galaxy-s20+"), modelNumber: "SM-G986" },
          { id: "galaxy-s20", name: "Galaxy S20", image: G("samsung-galaxy-s20"), modelNumber: "SM-G981" },
        ],
      },
      {
        id: "galaxy-z",
        name: "Galaxy Z série",
        shortName: "Galaxy Z",
        deviceType: "phone",
        image: G("samsung-galaxy-z-fold6"),
        models: [
          { id: "galaxy-z-fold6", name: "Galaxy Z Fold 6", image: G("samsung-galaxy-z-fold6"), modelNumber: "SM-F956" },
          { id: "galaxy-z-fold5", name: "Galaxy Z Fold 5", image: G("samsung-galaxy-z-fold5"), modelNumber: "SM-F946" },
          { id: "galaxy-z-fold4", name: "Galaxy Z Fold 4", image: G("samsung-galaxy-z-fold4"), modelNumber: "SM-F936" },
          { id: "galaxy-z-fold3", name: "Galaxy Z Fold 3", image: G("samsung-galaxy-z-fold3-5g"), modelNumber: "SM-F926" },
          { id: "galaxy-z-flip6", name: "Galaxy Z Flip 6", image: G("samsung-galaxy-z-flip6"), modelNumber: "SM-F741" },
          { id: "galaxy-z-flip5", name: "Galaxy Z Flip 5", image: G("samsung-galaxy-z-flip5"), modelNumber: "SM-F731" },
          { id: "galaxy-z-flip4", name: "Galaxy Z Flip 4", image: G("samsung-galaxy-z-flip4"), modelNumber: "SM-F721" },
          { id: "galaxy-z-flip3", name: "Galaxy Z Flip 3", image: G("samsung-galaxy-z-flip3-5g"), modelNumber: "SM-F711" },
        ],
      },
      {
        id: "galaxy-note",
        name: "Galaxy Note série",
        shortName: "Galaxy Note",
        deviceType: "phone",
        image: G("samsung-galaxy-note20-ultra-5g"),
        models: [
          { id: "galaxy-note20-ultra", name: "Galaxy Note 20 Ultra", image: G("samsung-galaxy-note20-ultra-5g"), modelNumber: "SM-N986" },
          { id: "galaxy-note20", name: "Galaxy Note 20", image: G("samsung-galaxy-note20-5g"), modelNumber: "SM-N981" },
          { id: "galaxy-note10-plus", name: "Galaxy Note 10+", image: G("samsung-galaxy-note10+"), modelNumber: "SM-N975" },
          { id: "galaxy-note10", name: "Galaxy Note 10", image: G("samsung-galaxy-note10"), modelNumber: "SM-N970" },
          { id: "galaxy-note9", name: "Galaxy Note 9", image: G("samsung-galaxy-note9"), modelNumber: "SM-N960" },
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
          { id: "iphone-15-plus", name: "iPhone 15 Plus", image: G("apple-iphone-15-plus"), modelNumber: "A3094" },
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
        image: G("apple-ipad-pro-13-2024-"),
        models: [
          { id: "ipad-pro-13-m4",   name: "iPad Pro 13\" (M4 2024)",    image: G("apple-ipad-pro-13-2024-"),    modelNumber: "A2925" },
          { id: "ipad-pro-11-m4",   name: "iPad Pro 11\" (M4 2024)",    image: G("apple-ipad-pro-11-2024-"),    modelNumber: "A2837" },
          { id: "ipad-pro-12-m2",   name: "iPad Pro 12.9\" (M2 2022)",  image: G("apple-ipad-pro-12-9-2022-"),  modelNumber: "A2764" },
          { id: "ipad-pro-11-m2",   name: "iPad Pro 11\" (M2 2022)",    image: G("apple-ipad-pro-11-2022-"),    modelNumber: "A2759" },
          { id: "ipad-pro-12-m1",   name: "iPad Pro 12.9\" (M1 2021)",  image: G("apple-ipad-pro-12-9-2021-"),  modelNumber: "A2378" },
          { id: "ipad-pro-11-m1",   name: "iPad Pro 11\" (M1 2021)",    image: G("apple-ipad-pro-11-2021-"),    modelNumber: "A2301" },
          { id: "ipad-pro-12-2020", name: "iPad Pro 12.9\" (2020)",     image: G("apple-ipad-pro-12-9-2020-"),  modelNumber: "A2229" },
          { id: "ipad-pro-11-2020", name: "iPad Pro 11\" (2020)",       image: G("apple-ipad-pro-11-2020-"),    modelNumber: "A2228" },
          { id: "ipad-pro-12-2018", name: "iPad Pro 12.9\" (2018)",     image: G("apple-ipad-pro-12-9-2018-"),  modelNumber: "A1876" },
          { id: "ipad-pro-11-2018", name: "iPad Pro 11\" (2018)",       image: G("apple-ipad-pro-11-2018-"),    modelNumber: "A1980" },
        ],
      },
      {
        id: "ipad-air",
        name: "iPad Air série",
        shortName: "iPad Air",
        deviceType: "tablet",
        image: G("apple-ipad-air-13-2024-"),
        models: [
          { id: "ipad-air-13-2025",  name: "iPad Air 13\" (2025)",      image: G("apple-ipad-air-13-2025-"),  modelNumber: "A3399" },
          { id: "ipad-air-11-2025",  name: "iPad Air 11\" (2025)",      image: G("apple-ipad-air-11-2025-"),  modelNumber: "A3400" },
          { id: "ipad-air-13-m2",    name: "iPad Air 13\" (M2 2024)",   image: G("apple-ipad-air-13-2024-"),  modelNumber: "A2898" },
          { id: "ipad-air-11-m2",    name: "iPad Air 11\" (M2 2024)",   image: G("apple-ipad-air-11-2024-"),  modelNumber: "A2902" },
          { id: "ipad-air-5",        name: "iPad Air 5 (M1 2022)",      image: G("apple-ipad-air-2022-"),     modelNumber: "A2588" },
          { id: "ipad-air-4",        name: "iPad Air 4 (2020)",         image: G("apple-ipad-air-2020-"),     modelNumber: "A2316" },
          { id: "ipad-air-3",        name: "iPad Air 3 (2019)",         image: G("apple-ipad-air-2019-"),     modelNumber: "A2152" },
          { id: "ipad-air-2",        name: "iPad Air 2",                image: G("apple-ipad-air-2"),         modelNumber: "A1566" },
        ],
      },
      {
        id: "ipad-standard",
        name: "iPad (standard)",
        shortName: "iPad",
        deviceType: "tablet",
        image: G("apple-ipad-2022-"),
        models: [
          { id: "ipad-11",  name: "iPad 11 (2025)",       image: G("apple-ipad-2025-"),          modelNumber: "A2757" },
          { id: "ipad-10",  name: "iPad 10 (2022)",       image: G("apple-ipad-2022-"),          modelNumber: "A2696" },
          { id: "ipad-9",   name: "iPad 9 (2021)",        image: G("apple-ipad-9th-gen-2021-"),  modelNumber: "A2602" },
          { id: "ipad-8",   name: "iPad 8 (2020)",        image: G("apple-ipad-8th-gen-2020-"),  modelNumber: "A2270" },
          { id: "ipad-7",   name: "iPad 7 (2019)",        image: G("apple-ipad-7th-gen-2019-"),  modelNumber: "A2197" },
          { id: "ipad-6",   name: "iPad 6 (2018)",        image: G("apple-ipad-2018-"),          modelNumber: "A1893" },
          { id: "ipad-5",   name: "iPad 5 (2017)",        image: G("apple-ipad-2017-"),          modelNumber: "A1822" },
        ],
      },
      {
        id: "ipad-mini",
        name: "iPad Mini série",
        shortName: "iPad Mini",
        deviceType: "ipad-mini",
        image: G("apple-ipad-mini-2024-"),
        models: [
          { id: "ipad-mini-7", name: "iPad Mini 7 (2024)", image: G("apple-ipad-mini-2024-"), modelNumber: "A3286" },
          { id: "ipad-mini-6", name: "iPad Mini 6 (2021)", image: G("apple-ipad-mini-2021-"), modelNumber: "A2567" },
          { id: "ipad-mini-5", name: "iPad Mini 5 (2019)", image: G("apple-ipad-mini-2019-"), modelNumber: "A2133" },
          { id: "ipad-mini-4", name: "iPad Mini 4 (2015)", image: G("apple-ipad-mini-4"),     modelNumber: "A1538" },
          { id: "ipad-mini-3", name: "iPad Mini 3",        image: G("apple-ipad-mini-3"),     modelNumber: "A1599" },
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
        image: G("apple-macbook-pro-16-2023-m3-pro-"),
        models: [
          { id: "macbook-pro-16-m4",   name: "MacBook Pro 16\" (M4 Pro 2024)", image: G("apple-macbook-pro-16-2024-m4-pro-"), modelNumber: "A3250" },
          { id: "macbook-pro-14-m4",   name: "MacBook Pro 14\" (M4 Pro 2024)", image: G("apple-macbook-pro-14-2024-m4-pro-"), modelNumber: "A3259" },
          { id: "macbook-pro-16-m3",   name: "MacBook Pro 16\" (M3 Pro 2023)", image: G("apple-macbook-pro-16-2023-m3-pro-"), modelNumber: "A2991" },
          { id: "macbook-pro-14-m3",   name: "MacBook Pro 14\" (M3 Pro 2023)", image: G("apple-macbook-pro-14-2023-m3-pro-"), modelNumber: "A2992" },
          { id: "macbook-pro-16-m2",   name: "MacBook Pro 16\" (M2 Pro 2023)", image: G("apple-macbook-pro-16-2023-m2-pro-"), modelNumber: "A2780" },
          { id: "macbook-pro-14-m2",   name: "MacBook Pro 14\" (M2 Pro 2023)", image: G("apple-macbook-pro-14-2023-m2-pro-"), modelNumber: "A2779" },
          { id: "macbook-pro-13-m2",   name: "MacBook Pro 13\" (M2 2022)",     image: G("apple-macbook-pro-13-2022-m2-"),    modelNumber: "A2338" },
          { id: "macbook-pro-13-m1",   name: "MacBook Pro 13\" (M1 2020)",     image: G("apple-macbook-pro-13-2020-m1-"),    modelNumber: "A2251" },
          { id: "macbook-pro-16-2019", name: "MacBook Pro 16\" (Intel 2019)",  image: G("apple-macbook-pro-16-2019-"),       modelNumber: "A2141" },
          { id: "macbook-pro-13-2020", name: "MacBook Pro 13\" (Intel 2020)",  image: G("apple-macbook-pro-13-2020-"),       modelNumber: "A2289" },
          { id: "macbook-pro-15-2019", name: "MacBook Pro 15\" (Intel 2019)",  image: G("apple-macbook-pro-15-2019-"),       modelNumber: "A1990" },
        ],
      },
      {
        id: "macbook-air",
        name: "MacBook Air série",
        shortName: "MacBook Air",
        deviceType: "laptop",
        image: G("apple-macbook-air-13-2024-m3-"),
        models: [
          { id: "macbook-air-15-m3",  name: "MacBook Air 15\" (M3 2024)", image: G("apple-macbook-air-15-2024-m3-"), modelNumber: "A3114" },
          { id: "macbook-air-13-m3",  name: "MacBook Air 13\" (M3 2024)", image: G("apple-macbook-air-13-2024-m3-"), modelNumber: "A3113" },
          { id: "macbook-air-15-m2",  name: "MacBook Air 15\" (M2 2023)", image: G("apple-macbook-air-15-2023-m2-"), modelNumber: "A2941" },
          { id: "macbook-air-13-m2",  name: "MacBook Air 13\" (M2 2022)", image: G("apple-macbook-air-13-2022-m2-"), modelNumber: "A2681" },
          { id: "macbook-air-m1",     name: "MacBook Air (M1 2020)",      image: G("apple-macbook-air-13-2020-m1-"), modelNumber: "A2337" },
          { id: "macbook-air-2020",   name: "MacBook Air (Intel 2020)",   image: G("apple-macbook-air-2020-"),       modelNumber: "A2179" },
          { id: "macbook-air-2019",   name: "MacBook Air (2019)",         image: G("apple-macbook-air-2019-"),       modelNumber: "A1932" },
          { id: "macbook-air-2018",   name: "MacBook Air (2018)",         image: G("apple-macbook-air-2018-"),       modelNumber: "A1932" },
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
        image: G("apple-watch-ultra-2"),
        models: [
          { id: "apple-watch-ultra-2", name: "Apple Watch Ultra 2 (2023)", image: G("apple-watch-ultra-2"),  modelNumber: "A2986" },
          { id: "apple-watch-ultra-1", name: "Apple Watch Ultra (2022)",   image: G("apple-watch-ultra-"),   modelNumber: "A2622" },
        ],
      },
      {
        id: "apple-watch-series",
        name: "Apple Watch Series",
        shortName: "Series",
        deviceType: "watch",
        image: G("apple-watch-series-10-"),
        models: [
          { id: "apple-watch-s10", name: "Apple Watch Series 10 (2024)", image: G("apple-watch-series-10-"), modelNumber: "A3293" },
          { id: "apple-watch-s9",  name: "Apple Watch Series 9 (2023)",  image: G("apple-watch-series-9-"),  modelNumber: "A2978" },
          { id: "apple-watch-s8",  name: "Apple Watch Series 8 (2022)",  image: G("apple-watch-series-8-"),  modelNumber: "A2857" },
          { id: "apple-watch-s7",  name: "Apple Watch Series 7 (2021)",  image: G("apple-watch-series-7-"),  modelNumber: "A2473" },
          { id: "apple-watch-s6",  name: "Apple Watch Series 6 (2020)",  image: G("apple-watch-series-6-"),  modelNumber: "A2291" },
          { id: "apple-watch-s5",  name: "Apple Watch Series 5 (2019)",  image: G("apple-watch-series-5-"),  modelNumber: "A2093" },
          { id: "apple-watch-s4",  name: "Apple Watch Series 4 (2018)",  image: G("apple-watch-series-4-"),  modelNumber: "A1978" },
          { id: "apple-watch-s3",  name: "Apple Watch Series 3 (2017)",  image: G("apple-watch-series-3-"),  modelNumber: "A1858" },
        ],
      },
      {
        id: "apple-watch-se",
        name: "Apple Watch SE",
        shortName: "SE",
        deviceType: "watch",
        image: G("apple-watch-se-2022-"),
        models: [
          { id: "apple-watch-se2", name: "Apple Watch SE 2e gén. (2022)", image: G("apple-watch-se-2022-"), modelNumber: "A2723" },
          { id: "apple-watch-se1", name: "Apple Watch SE 1re gén. (2020)", image: G("apple-watch-se-2020-"), modelNumber: "A2351" },
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
        image: G("sony-playstation-5"),
        models: [
          { id: "ps5",      name: "PlayStation 5",        image: G("sony-playstation-5"),      modelNumber: "CFI-1000" },
          { id: "ps5-slim", name: "PlayStation 5 Slim",   image: G("sony-playstation-5-slim"), modelNumber: "CFI-2000" },
          { id: "ps4-pro",  name: "PlayStation 4 Pro",    image: G("sony-playstation-4-pro"),  modelNumber: "CUH-7000" },
          { id: "ps4-slim", name: "PlayStation 4 Slim",   image: G("sony-playstation-4-slim"), modelNumber: "CUH-2000" },
          { id: "ps4",      name: "PlayStation 4",        image: G("sony-playstation-4"),      modelNumber: "CUH-1000" },
          { id: "ps3",      name: "PlayStation 3 Slim",   image: G("sony-playstation-3-slim"), modelNumber: "CECH-2000" },
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
          { id: "xbox-series-s", name: "Xbox Series S",  image: G("microsoft-xbox-series-s"), modelNumber: "RRS-00001" },
          { id: "xbox-one-x",    name: "Xbox One X",     image: G("microsoft-xbox-one-x"),    modelNumber: "1787" },
          { id: "xbox-one-s",    name: "Xbox One S",     image: G("microsoft-xbox-one-s"),    modelNumber: "1681" },
          { id: "xbox-one",      name: "Xbox One",       image: G("microsoft-xbox-one"),      modelNumber: "1540" },
        ],
      },
      {
        id: "nintendo",
        name: "Nintendo Switch",
        shortName: "Nintendo",
        deviceType: "console",
        image: G("nintendo-switch-oled-model"),
        models: [
          { id: "switch-oled",  name: "Nintendo Switch OLED", image: G("nintendo-switch-oled-model"), modelNumber: "HEG-001" },
          { id: "switch-v2",    name: "Nintendo Switch V2",   image: G("nintendo-switch-v2"),         modelNumber: "HAC-001" },
          { id: "switch-lite",  name: "Nintendo Switch Lite", image: G("nintendo-switch-lite"),       modelNumber: "HDH-001" },
          { id: "steam-deck",   name: "Steam Deck OLED",      image: G("valve-steam-deck-oled"),      modelNumber: "1030" },
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
  return repairsByBrand[brandId] ?? repairsByBrand.samsung;
}

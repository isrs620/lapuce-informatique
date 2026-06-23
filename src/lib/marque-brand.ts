const MARQUE_BRAND: Record<string, string> = {
  iphone: "iphone",
  apple: "iphone",
  samsung: "samsung",
  galaxy: "samsung",
  ipad: "ipad",
  macbook: "macbook",
  mac: "macbook",
  "apple watch": "apple-watch",
  watch: "apple-watch",
  playstation: "consoles",
  ps5: "consoles",
  ps4: "consoles",
  ps3: "consoles",
  xbox: "consoles",
  nintendo: "consoles",
  switch: "consoles",
  console: "consoles",
};

export function marqueVersBrand(marque: string, categorie: string): string | null {
  const m = marque.toLowerCase().trim();
  if (MARQUE_BRAND[m]) return MARQUE_BRAND[m];
  for (const [key, brand] of Object.entries(MARQUE_BRAND)) {
    if (m.includes(key)) return brand;
  }
  switch (categorie) {
    case "Console": return "consoles";
    case "Montre": return "apple-watch";
    case "Tablette": return "ipad";
    case "Ordinateur": return "macbook";
    case "Téléphone":
      if (m.includes("samsung")) return "samsung";
      if (m.includes("iphone") || m.includes("apple")) return "iphone";
      break;
  }
  return null;
}

export function urlReparation(marque: string, categorie: string): string | null {
  const brand = marqueVersBrand(marque, categorie);
  return brand ? `/reparation/${brand}` : null;
}

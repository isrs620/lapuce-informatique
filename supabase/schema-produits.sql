-- ═══════════════════════════════════════════════════════════════════════════
-- LaPuce Informatique — Schéma produits (à exécuter dans Supabase SQL Editor)
-- ═══════════════════════════════════════════════════════════════════════════

-- Table principale des produits
CREATE TABLE IF NOT EXISTS produits (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  nom           TEXT NOT NULL,
  marque        TEXT NOT NULL DEFAULT '',
  modele        TEXT NOT NULL DEFAULT '',
  prix          NUMERIC(10,2) NOT NULL DEFAULT 0,
  prix_promo    NUMERIC(10,2),
  promotion_active BOOLEAN NOT NULL DEFAULT false,
  reduction_pct NUMERIC(5,2),
  description   TEXT NOT NULL DEFAULT '',
  categorie     TEXT NOT NULL DEFAULT 'Autre',
  stock         INTEGER NOT NULL DEFAULT 0,
  photo_principale TEXT
);

-- Galerie de photos par produit
CREATE TABLE IF NOT EXISTS produit_photos (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  produit_id UUID NOT NULL REFERENCES produits(id) ON DELETE CASCADE,
  url        TEXT NOT NULL,
  ordre      INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_produits_categorie ON produits(categorie);
CREATE INDEX IF NOT EXISTS idx_produits_nom ON produits(nom);
CREATE INDEX IF NOT EXISTS idx_produit_photos_produit ON produit_photos(produit_id);

-- Mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION update_produits_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_produits_updated_at ON produits;
CREATE TRIGGER trg_produits_updated_at
  BEFORE UPDATE ON produits
  FOR EACH ROW EXECUTE FUNCTION update_produits_updated_at();

-- Historique des modifications de prix (optionnel mais utile)
CREATE TABLE IF NOT EXISTS produit_prix_historique (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  produit_id UUID NOT NULL REFERENCES produits(id) ON DELETE CASCADE,
  ancien_prix NUMERIC(10,2),
  nouveau_prix NUMERIC(10,2) NOT NULL,
  ancien_prix_promo NUMERIC(10,2),
  nouveau_prix_promo NUMERIC(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Désactiver RLS pour simplifier l'accès via clé service (admin API)
ALTER TABLE produits DISABLE ROW LEVEL SECURITY;
ALTER TABLE produit_photos DISABLE ROW LEVEL SECURITY;
ALTER TABLE produit_prix_historique DISABLE ROW LEVEL SECURITY;

-- Bucket Storage pour les photos (créer aussi dans Dashboard > Storage)
-- Nom du bucket : produits
-- Public : oui
-- INSERT INTO storage.buckets (id, name, public) VALUES ('produits', 'produits', true)
--   ON CONFLICT DO NOTHING;

-- Corriger : "new row violates row-level security policy for table produits"
-- Exécuter dans Supabase → SQL Editor → Run

ALTER TABLE produits DISABLE ROW LEVEL SECURITY;
ALTER TABLE produit_photos DISABLE ROW LEVEL SECURITY;
ALTER TABLE produit_prix_historique DISABLE ROW LEVEL SECURITY;

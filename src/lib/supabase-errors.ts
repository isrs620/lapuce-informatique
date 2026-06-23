export function friendlySupabaseError(message: string): string {
    if (message.includes("row-level security")) {
      return "Accès refusé par Supabase (RLS). Allez sur /admin/configurer pour corriger en 1 clic.";
    }
  if (message.includes("Could not find the table")) {
    return "Table manquante dans Supabase. Exécutez supabase/schema-produits.sql dans le SQL Editor.";
  }
  return message;
}

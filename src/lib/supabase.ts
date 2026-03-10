import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL ou Clé Anon manquante. Veuillez configurer l'intégration Supabase.");
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);
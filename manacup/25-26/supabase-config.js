// =================================================================
// ManaCup — Configuració de Supabase
// Substitueix macroURL, idfull i idJSON del Google Apps Script.
//
// Substitueix els valors per les credencials del teu projecte:
//   Supabase Dashboard → Settings → API
// =================================================================

const SUPABASE_URL  = "https://XXXXXXXXXXXXXXXXXX.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.PLACEHOLDER";

// URL de l'Edge Function que retorna el JSON de dades complet
// (equivalent a: macroURL + "?page=JSON&idJSON=" + idJSON)
const DADES_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/get-dades`;

// Client de Supabase (carregat via CDN a index.html)
// Disponible globalment com a `supabase` un cop inicialitzat.
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
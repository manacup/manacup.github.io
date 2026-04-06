// =================================================================
// ManaCup — Configuració de Supabase
// Substitueix macroURL, idfull i idJSON del Google Apps Script.
//
// Substitueix els valors per les credencials del teu projecte:
//   Supabase Dashboard → Settings → API
// =================================================================

const SUPABASE_URL  = "https://tmivnprqgsqnsuhlmdfh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtaXZucHJxZ3NxbnN1aGxtZGZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNTcyMjIsImV4cCI6MjA5MDYzMzIyMn0.QXFvmKWuMxh5JBtFDXsswXoV5x8bHDhI5i57_FP-g4I";

// URL de l'Edge Function que retorna el JSON de dades complet
// (equivalent a: macroURL + "?page=JSON&idJSON=" + idJSON)
const DADES_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/get-dades`;

// El CDN de Supabase exposa window.supabase com a namespace.
// El sobreescrivim amb el client inicialitzat perquè la resta de
// fitxers puguin usar supabase.from(...) / supabase.storage etc.
window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
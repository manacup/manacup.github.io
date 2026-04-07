import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ADMIN_SECRET = Deno.env.get("ADMIN_SECRET") ?? "manacup-admin-2526";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-key",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Auth check
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== ADMIN_SECRET) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const op = body.op as string;

  try {
    let result: unknown;

    switch (op) {
      // ── JUGADORS ─────────────────────────────────────────────────────
      case "add-jugador": {
        const { nom, email, tel } = body as { nom: string; email?: string; tel?: string };
        const { data, error } = await supabase
          .from("jugadors")
          .insert({ nom, email: email ?? null, tel: tel ?? null, baixa: false })
          .select()
          .single();
        if (error) throw error;
        result = data;
        break;
      }

      case "update-jugador": {
        const { id, ...fields } = body as { id: number; [key: string]: unknown };
        const allowed = ["nom", "email", "tel", "iron_mark", "golden_mark", "diamond_mark", "baixa", "imatge"];
        const patch: Record<string, unknown> = {};
        for (const k of allowed) if (k in fields) patch[k] = fields[k];
        const { data, error } = await supabase
          .from("jugadors")
          .update(patch)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        result = data;
        break;
      }

      case "baixa-jugador": {
        const { id } = body as { id: number };
        const { data, error } = await supabase
          .from("jugadors")
          .update({ baixa: true })
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        result = data;
        break;
      }

      case "substituir-jugador": {
        // Replaces oldId with newId in all PENDING matches (puntuacio_1=0 AND puntuacio_2=0)
        // Old player is marked baixa=TRUE
        const { old_id, new_id } = body as { old_id: number; new_id: number };

        // Get new player name
        const { data: newJug, error: newJugErr } = await supabase
          .from("jugadors")
          .select("nom")
          .eq("id", new_id)
          .single();
        if (newJugErr) throw newJugErr;
        const newNom = (newJug as { nom: string }).nom;

        // Get old player name
        const { data: oldJug, error: oldJugErr } = await supabase
          .from("jugadors")
          .select("nom")
          .eq("id", old_id)
          .single();
        if (oldJugErr) throw oldJugErr;
        const oldNom = (oldJug as { nom: string }).nom;

        // Transfer pending matches where old player is jugador_1
        const { error: e1 } = await supabase
          .from("partides")
          .update({ id_jugador_1: new_id, jugador_1: newNom })
          .eq("id_jugador_1", old_id)
          .eq("puntuacio_1", 0)
          .eq("puntuacio_2", 0);
        if (e1) throw e1;

        // Transfer pending matches where old player is jugador_2
        const { error: e2 } = await supabase
          .from("partides")
          .update({ id_jugador_2: new_id, jugador_2: newNom })
          .eq("id_jugador_2", old_id)
          .eq("puntuacio_1", 0)
          .eq("puntuacio_2", 0);
        if (e2) throw e2;

        // Mark old player as baixa
        const { error: e3 } = await supabase
          .from("jugadors")
          .update({ baixa: true })
          .eq("id", old_id);
        if (e3) throw e3;

        result = { ok: true, substituted: { from: oldNom, to: newNom } };
        break;
      }

      // ── RONDES ───────────────────────────────────────────────────────
      case "update-ronda": {
        const { id, data: fields } = body as { id: number; data: Record<string, unknown> };
        const allowed = ["nom", "data_inici", "data_fi", "estat"];
        const patch: Record<string, unknown> = {};
        for (const k of allowed) if (k in fields) patch[k] = fields[k];
        const { data, error } = await supabase
          .from("rondes")
          .update(patch)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        result = data;
        break;
      }

      // ── TROBADES ─────────────────────────────────────────────────────
      case "add-trobada": {
        const { data: fields } = body as { data: Record<string, unknown> };
        const { data, error } = await supabase
          .from("trobades")
          .insert(fields)
          .select()
          .single();
        if (error) throw error;
        result = data;
        break;
      }

      case "update-trobada": {
        const { id, data: fields } = body as { id: number; data: Record<string, unknown> };
        const { data, error } = await supabase
          .from("trobades")
          .update(fields)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        result = data;
        break;
      }

      case "delete-trobada": {
        const { id } = body as { id: number };
        // Delete attendees first (FK)
        await supabase.from("assistents_trobada").delete().eq("id_trobada", id);
        const { error } = await supabase.from("trobades").delete().eq("id", id);
        if (error) throw error;
        result = { ok: true };
        break;
      }

      // ── APARELLAMENTS ─────────────────────────────────────────────────
      case "add-aparellament": {
        const { data: fields } = body as { data: Record<string, unknown> };
        // Ensure pending
        const row = { puntuacio_1: 0, puntuacio_2: 0, ...fields };
        const { data, error } = await supabase
          .from("partides")
          .insert(row)
          .select()
          .single();
        if (error) throw error;
        result = data;
        break;
      }

      case "update-aparellament": {
        const { id, data: fields } = body as { id: number; data: Record<string, unknown> };
        const allowed = ["id_jugador_1", "jugador_1", "id_jugador_2", "jugador_2",
          "puntuacio_1", "puntuacio_2", "id_ronda", "estat", "data_partida"];
        const patch: Record<string, unknown> = {};
        for (const k of allowed) if (k in fields) patch[k] = fields[k];
        const { data, error } = await supabase
          .from("partides")
          .update(patch)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        result = data;
        break;
      }

      case "delete-aparellament": {
        const { id } = body as { id: number };
        const { error } = await supabase.from("partides").delete().eq("id", id);
        if (error) throw error;
        result = { ok: true };
        break;
      }

      case "import-aparellaments": {
        // Batch upsert; expects array of match objects
        const { rows } = body as { rows: Record<string, unknown>[] };
        const normalized = rows.map((r) => ({
          puntuacio_1: 0,
          puntuacio_2: 0,
          ...r,
        }));
        const { data, error } = await supabase
          .from("partides")
          .upsert(normalized, { onConflict: "id" })
          .select();
        if (error) throw error;
        result = { upserted: (data as unknown[]).length };
        break;
      }

      default:
        return new Response(JSON.stringify({ error: `Unknown op: ${op}` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify({ ok: true, data: result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// =================================================================
// ManaCup — Edge Function: get-dades
// Substitueix la crida GET al Google Apps Script:
//   fetch(macroURL + "?page=JSON&idJSON=" + idJSON)
//
// Retorna el mateix format JSON que l'script antic per tal de
// mantenir la compatibilitat amb el frontend sense canvis.
// =================================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  // Preflight CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // -------------------------------------------------------
    // Fetch paral·lel de totes les taules necessàries
    // -------------------------------------------------------
    const [
      { data: campionatData },
      { data: jugadorsData },
      { data: rondesData },
      { data: partidesData },
      { data: trobadaData },
    ] = await Promise.all([
      supabase.from("campionat").select("*").limit(1).single(),
      supabase.from("jugadors").select("*").eq("baixa", false).order("id"),
      supabase.from("rondes").select("*").order("ronda"),
      supabase.from("partides").select("*").order("ronda").order("id"),
      supabase
        .from("trobades")
        .select("*, assistents_trobada(*)")
        .order("id", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

    const jugadors = jugadorsData ?? [];
    const partides = partidesData ?? [];
    const rondes = rondesData ?? [];

    // -------------------------------------------------------
    // Càlcul d'estadístiques per jugador
    // -------------------------------------------------------
    interface Partida {
      id: number;
      ronda: number;
      jugador1_id: number;
      jugador2_id: number;
      jugador1_nom: string;
      jugador2_nom: string;
      puntuacio_1: number | null;
      puntuacio_2: number | null;
      mot_1: string;
      puntsmot_1: number;
      scrabbles_1: number;
      mot_2: string;
      puntsmot_2: number;
      scrabbles_2: number;
      lletra_1: string;
      punts_lletra_1: number;
      lletra_2: string;
      punts_lletra_2: number;
      comentaris: string;
      full_img: string;
      tauler_img: string;
      data_partida: string;
      punts_social: number;
      lloc_partida: string;
      estat: string;
      taula: number | null;
      pos_conjunta: number | null;
      punts_velocitat: number;
    }

    interface Jugador {
      id: number;
      nom: string;
      malnom2: string;
      imatge: string;
      telefon: string;
      baixa: boolean;
      barruf: string;
      brf: string;
      barruf_r20: string;
      pos_brf: string;
      cat_brf: string;
      vd: string;
      atp: string;
      campionats: string;
      podis: string;
      diplomes: string;
      descripcio: string;
      etiqueta: string;
      semafor: string;
      grup: string;
    }

    const partidesActives = (partides as Partida[]).filter(
      (p) => p.estat !== "none",
    );

    const dades = (jugadors as Jugador[]).map((jug) => {
      // Partides on el jugador és jugador1 o jugador2
      const p1 = partidesActives.filter(
        (p) => p.jugador1_id === jug.id && p.puntuacio_1 != null,
      );
      const p2 = partidesActives.filter(
        (p) => p.jugador2_id === jug.id && p.puntuacio_2 != null,
      );

      let pFavor = 0,
        pContra = 0,
        victories = 0,
        scrabbles = 0,
        puntsSocial = 0,
        puntsVelocitat = 0;

      p1.forEach((p) => {
        pFavor += p.puntuacio_1 ?? 0;
        pContra += p.puntuacio_2 ?? 0;
        if ((p.puntuacio_1 ?? 0) > (p.puntuacio_2 ?? 0)) victories++;
        scrabbles += p.scrabbles_1 ?? 0;
        puntsSocial += p.punts_social ?? 0;
        puntsVelocitat += p.punts_velocitat ?? 0;
      });
      p2.forEach((p) => {
        pFavor += p.puntuacio_2 ?? 0;
        pContra += p.puntuacio_1 ?? 0;
        if ((p.puntuacio_2 ?? 0) > (p.puntuacio_1 ?? 0)) victories++;
        scrabbles += p.scrabbles_2 ?? 0;
        puntsSocial += p.punts_social ?? 0;
        puntsVelocitat += p.punts_velocitat ?? 0;
      });

      const n = p1.length + p2.length;
      const difP = pFavor - pContra;

      // Millor mot jugat (màxim puntsmot)
      const totsMotsJug1 = p1.map((p) => ({
        mot: p.mot_1,
        pts: p.puntsmot_1 ?? 0,
        adv: p.jugador2_nom,
      }));
      const totsMotsJug2 = p2.map((p) => ({
        mot: p.mot_2,
        pts: p.puntsmot_2 ?? 0,
        adv: p.jugador1_nom,
      }));
      const totsMots = [...totsMotsJug1, ...totsMotsJug2].filter(
        (m) => m.mot,
      );
      const millorMot = totsMots.reduce(
        (max, m) => (m.pts > max.pts ? m : max),
        { mot: "", pts: 0, adv: "" },
      );

      // Millor partida (màxima puntuació pròpia)
      const totsPts1 = p1.map((p) => ({
        pts: p.puntuacio_1 ?? 0,
        adv: p.jugador2_nom,
        conjunta: (p.puntuacio_1 ?? 0) + (p.puntuacio_2 ?? 0),
      }));
      const totsPts2 = p2.map((p) => ({
        pts: p.puntuacio_2 ?? 0,
        adv: p.jugador1_nom,
        conjunta: (p.puntuacio_1 ?? 0) + (p.puntuacio_2 ?? 0),
      }));
      const totsPts = [...totsPts1, ...totsPts2];
      const millorPartida = totsPts.reduce(
        (max, p) => (p.pts > max.pts ? p : max),
        { pts: 0, adv: "", conjunta: 0 },
      );

      // Millor partida conjunta
      const millorConjunta = totsPts.reduce(
        (max, p) => (p.conjunta > max.conjunta ? p : max),
        { pts: 0, adv: "", conjunta: 0 },
      );

      // Ronda pendent (última ronda on té partida sense resultat)
      const rondesPendents = partidesActives.filter(
        (p) =>
          (p.jugador1_id === jug.id || p.jugador2_id === jug.id) &&
          p.puntuacio_1 == null,
      ).length;

      // Last_Ronda
      const rondesJugades = [...p1, ...p2].map((p) => p.ronda);
      const lastRonda = rondesJugades.length > 0
        ? Math.max(...rondesJugades)
        : 0;

      return {
        ID: String(jug.id),
        Nom: jug.nom,
        Malnom2: jug.malnom2 ?? "",
        Imatge: jug.imatge ?? "",
        Telefon: jug.telefon ?? "",
        Baixa: jug.baixa ? "TRUE" : "FALSE",
        Barruf: jug.barruf ?? "",
        BRF: jug.brf ?? "",
        BarrufR20: jug.barruf_r20 ?? "",
        PosBRF: jug.pos_brf ?? "",
        CatBRF: jug.cat_brf ?? "",
        VD: jug.vd ?? "",
        ATP: jug.atp ?? "",
        Campionats: jug.campionats ?? "",
        Podis: jug.podis ?? "",
        Diplomes: jug.diplomes ?? "",
        Descripció: jug.descripcio ?? "",
        etiqueta: jug.etiqueta ?? "",
        Semafor: jug.semafor ?? "primary",
        grup: jug.grup ?? "",
        PartidesJugades: String(n),
        Victòries: String(victories),
        Punts: String(victories),
        PFavor: String(pFavor),
        PContra: String(pContra),
        Dif_P: String(difP),
        MitjanaDif: n > 0
          ? (difP / n).toFixed(2).replace(".", ",")
          : "0",
        MitjanaPFavor: n > 0
          ? (pFavor / n).toFixed(2).replace(".", ",")
          : "0",
        Scrabbles: String(scrabbles),
        mitjanaScrabbles: n > 0
          ? (scrabbles / n).toFixed(2).replace(".", ",")
          : "0",
        Punts_social: String(puntsSocial),
        Punts_velocitat: String(puntsVelocitat),
        Mot_jugada: millorMot.mot,
        Punts_mot_jugada: String(millorMot.pts),
        Adversari_jugada: millorMot.adv,
        Punts_Partida: String(millorPartida.pts),
        Adversari_partida: millorPartida.adv,
        Punts_Conjunta: String(millorConjunta.conjunta),
        Adversari_conjunta: millorConjunta.adv,
        Rondes_pendents: String(rondesPendents),
        Last_Ronda: String(lastRonda),
        // Camps calculats posteriorment (posicions)
        Posició: "0",
        rank: "0",
        posJugada: "0",
        movimentJugada: "",
        posScrabbles: "0",
        movimentScrabbles: "",
        posPartida: "0",
        movimentPartida: "",
        Pos_velocitat: "0",
        Pos_social: "0",
        Millor_posició: "0",
        Pitjor_posició: "0",
        // Camps de lletra especial (si no hi ha lògica específica, deixar buits)
        Lletra_especial: "",
        Punts_Lletra_especial: "0",
        Moviment_lletra_especial: "",
        Posició_lletra_especial: "",
        Adversari_lletra_especial: "",
        // Marks
        Golden_Mark: "",
        Diamond_Mark: "",
        Iron_Mark: "",
        "Expectativa partides": "",
      };
    });

    // -------------------------------------------------------
    // Assignació de posicions (ranking)
    // -------------------------------------------------------
    // Classificació: victòries DESC, després Dif_P DESC
    dades.sort((a, b) => {
      const ptsA = parseInt(a.Punts);
      const ptsB = parseInt(b.Punts);
      if (ptsB !== ptsA) return ptsB - ptsA;
      return parseInt(b.Dif_P) - parseInt(a.Dif_P);
    });
    dades.forEach((d, i) => {
      d.Posició = String(i + 1);
      d.rank = `${d.Punts}${d.Dif_P}${d.MitjanaPFavor}`;
    });

    // Posició millor jugada
    const byMot = [...dades].sort(
      (a, b) =>
        parseInt(b.Punts_mot_jugada) - parseInt(a.Punts_mot_jugada),
    );
    byMot.forEach((d, i) => {
      dades.find((x) => x.ID === d.ID)!.posJugada = String(i + 1);
    });

    // Posició scrabbles
    const byScrabbles = [...dades].sort(
      (a, b) => parseInt(b.Scrabbles) - parseInt(a.Scrabbles),
    );
    byScrabbles.forEach((d, i) => {
      dades.find((x) => x.ID === d.ID)!.posScrabbles = String(i + 1);
    });

    // Posició millor partida
    const byPartida = [...dades].sort(
      (a, b) => parseInt(b.Punts_Partida) - parseInt(a.Punts_Partida),
    );
    byPartida.forEach((d, i) => {
      dades.find((x) => x.ID === d.ID)!.posPartida = String(i + 1);
    });

    // Posició velocitat
    const byVelocitat = [...dades].sort(
      (a, b) => parseInt(b.Punts_velocitat) - parseInt(a.Punts_velocitat),
    );
    byVelocitat.forEach((d, i) => {
      dades.find((x) => x.ID === d.ID)!.Pos_velocitat = String(i + 1);
    });

    // Posició social
    const bySocial = [...dades].sort(
      (a, b) => parseInt(b.Punts_social) - parseInt(a.Punts_social),
    );
    bySocial.forEach((d, i) => {
      dades.find((x) => x.ID === d.ID)!.Pos_social = String(i + 1);
    });

    // -------------------------------------------------------
    // Format aparellaments (compatible amb el frontend actual)
    // -------------------------------------------------------
    const aparellaments = (partides as Partida[]).map((p) => ({
      ID: p.id,
      Ronda: p.ronda,
      idJug1: p.jugador1_id,
      idJug2: p.jugador2_id,
      Jugador1: p.jugador1_nom,
      Jugador2: p.jugador2_nom,
      Puntuacio_1: p.puntuacio_1,
      Puntuacio_2: p.puntuacio_2,
      Mot_1: p.mot_1 ?? "",
      Puntsmot_1: p.puntsmot_1 ?? 0,
      Scrabbles_1: p.scrabbles_1 ?? 0,
      Mot_2: p.mot_2 ?? "",
      Puntsmot_2: p.puntsmot_2 ?? 0,
      Scrabbles_2: p.scrabbles_2 ?? 0,
      Lletra_1: p.lletra_1 ?? "",
      Punts_lletra_1: p.punts_lletra_1 ?? "",
      Lletra_2: p.lletra_2 ?? "",
      Punts_lletra_2: p.punts_lletra_2 ?? "",
      Comentaris: p.comentaris ?? "",
      Full: p.full_img ?? "",
      Tauler: p.tauler_img ?? "",
      Suma_punts: (p.puntuacio_1 ?? 0) + (p.puntuacio_2 ?? 0),
      Data: p.data_partida ?? "",
      Punts_social: p.punts_social ?? 0,
      Lloc_partida: p.lloc_partida ?? "",
      Punts_1: (p.puntuacio_1 ?? 0) > (p.puntuacio_2 ?? 0) ? 1 : 0,
      Punts_2: (p.puntuacio_2 ?? 0) > (p.puntuacio_1 ?? 0) ? 1 : 0,
      Estat: p.estat ?? "",
      Nova: "",
      Pos_Conjunta: p.pos_conjunta ?? 0,
      Taula: p.taula ?? 0,
      Punts_velocitat: p.punts_velocitat ?? 0,
    }));

    // -------------------------------------------------------
    // Format partides per jugador (vista des de la perspectiva
    // de Jugador1 — el frontend les filtra per nom)
    // -------------------------------------------------------
    const partidesPerJugador = (partides as Partida[]).flatMap((p) => [
      {
        ID: String(p.id),
        Ronda: String(p.ronda),
        Jugador1: p.jugador1_nom,
        Jugador2: p.jugador2_nom,
        Puntuacio_1: String(p.puntuacio_1 ?? ""),
        Puntuacio_2: String(p.puntuacio_2 ?? ""),
        Punts_1: String(
          (p.puntuacio_1 ?? 0) > (p.puntuacio_2 ?? 0) ? 1 : 0,
        ),
        Mot_1: p.mot_1 ?? "",
        Puntsmot_1: String(p.puntsmot_1 ?? 0),
        Scrabbles_1: String(p.scrabbles_1 ?? 0),
        Suma_punts: String((p.puntuacio_1 ?? 0) + (p.puntuacio_2 ?? 0)),
        Estat: p.estat ?? "",
        Lletra_1: p.lletra_1 ?? "",
        Punts_lletra1: String(p.punts_lletra_1 ?? ""),
        Punts_velocitat: String(p.punts_velocitat ?? 0),
        Punts_social: String(p.punts_social ?? 0),
        Data: p.data_partida ?? "",
        Pos_Conjunta: String(p.pos_conjunta ?? 0),
        Full: p.full_img ?? "",
        Tauler: p.tauler_img ?? "",
        Lloc_partida: p.lloc_partida ?? "",
        Comentaris: p.comentaris ?? "",
      },
      // Vista des de Jugador2 (camps intercanviats)
      {
        ID: String(p.id),
        Ronda: String(p.ronda),
        Jugador1: p.jugador2_nom,
        Jugador2: p.jugador1_nom,
        Puntuacio_1: String(p.puntuacio_2 ?? ""),
        Puntuacio_2: String(p.puntuacio_1 ?? ""),
        Punts_1: String(
          (p.puntuacio_2 ?? 0) > (p.puntuacio_1 ?? 0) ? 1 : 0,
        ),
        Mot_1: p.mot_2 ?? "",
        Puntsmot_1: String(p.puntsmot_2 ?? 0),
        Scrabbles_1: String(p.scrabbles_2 ?? 0),
        Suma_punts: String((p.puntuacio_1 ?? 0) + (p.puntuacio_2 ?? 0)),
        Estat: p.estat ?? "",
        Lletra_1: p.lletra_2 ?? "",
        Punts_lletra1: String(p.punts_lletra_2 ?? ""),
        Punts_velocitat: String(p.punts_velocitat ?? 0),
        Punts_social: String(p.punts_social ?? 0),
        Data: p.data_partida ?? "",
        Pos_Conjunta: String(p.pos_conjunta ?? 0),
        Full: p.full_img ?? "",
        Tauler: p.tauler_img ?? "",
        Lloc_partida: p.lloc_partida ?? "",
        Comentaris: p.comentaris ?? "",
      },
    ]);

    // -------------------------------------------------------
    // Format trobada (compatible amb el frontend actual)
    // -------------------------------------------------------
    let trobadaFormatada: Record<string, unknown> = { Confirmat: "FALSE" };
    if (trobadaData) {
      const assistents = (
        (trobadaData as Record<string, unknown>)
          .assistents_trobada as Array<Record<string, unknown>>
      ) ?? [];
      trobadaFormatada = {
        max_ronda: String(
          (trobadaData as Record<string, unknown>).max_ronda ?? 0,
        ),
        Rondes_a_jugar: String(
          (trobadaData as Record<string, unknown>).rondes_a_jugar ?? 1,
        ),
        ID_trobada: String(
          (trobadaData as Record<string, unknown>).id ?? 0,
        ),
        Trobada: (trobadaData as Record<string, unknown>).trobada ?? "",
        DataHora: (trobadaData as Record<string, unknown>).data_hora ?? "",
        Data: (trobadaData as Record<string, unknown>).data_text ?? "",
        horautc: (trobadaData as Record<string, unknown>).hora_utc ?? "",
        Hora: (trobadaData as Record<string, unknown>).hora ?? "",
        Lloc: (trobadaData as Record<string, unknown>).lloc ?? "",
        adreça: (trobadaData as Record<string, unknown>).adreca ?? "",
        maps: (trobadaData as Record<string, unknown>).maps ?? "",
        Sopar: (trobadaData as Record<string, unknown>).sopar
          ? "TRUE"
          : "FALSE",
        Mostra: (trobadaData as Record<string, unknown>).mostra
          ? "TRUE"
          : "FALSE",
        Confirmat: (trobadaData as Record<string, unknown>).confirmat
          ? "TRUE"
          : "FALSE",
        telegram: (trobadaData as Record<string, unknown>).telegram ?? "",
        "enviat?": (trobadaData as Record<string, unknown>).enviat
          ? "TRUE"
          : "",
        assistents: assistents.map((a) => ({
          Nom: a.nom,
          ID_trobada: String(a.id_trobada),
          Assistencia: a.assistencia,
          Primera_partida: a.primera_partida ?? "",
          Adv1: a.adv1 ?? "",
          Segona_partida: a.segona_partida ?? "",
          Adv2: a.adv2 ?? "",
          Joc: a.joc ?? "",
          Sopar: a.sopar ?? "",
        })),
      };
    }

    // -------------------------------------------------------
    // Format calendari (compatible amb el frontend actual)
    // -------------------------------------------------------
    const calendari = (rondes as Array<Record<string, unknown>>).map((r) => ({
      ID: String(r.id),
      Ronda: String(r.ronda),
      Data_inici: r.data_inici ?? "",
      Data_fi: r.data_fi ?? "",
      Inici_Rnd: r.inici_rnd ? "TRUE" : "FALSE",
      Fi_Rnd: r.fi_rnd ? "TRUE" : "FALSE",
      Estat: r.estat ?? "",
      Programades: String(r.programades ?? 0),
      Jugades: String(r.jugades ?? 0),
      Varia: "FALSE",
      // Camps estadístics de la ronda (calculats a partir de partides)
      ...calcularEstatsRonda(
        (partides as Partida[]).filter(
          (p) => p.ronda === (r.ronda as number),
        ),
      ),
    }));

    // -------------------------------------------------------
    // Resposta final
    // -------------------------------------------------------
    const resposta = {
      status: 200,
      campionat: campionatData?.nom ?? "ManaCup",
      temporada: campionatData?.temporada ?? "",
      dades,
      calendari,
      aparellaments,
      trobades: trobadaFormatada,
      partides: partidesPerJugador,
    };

    return new Response(JSON.stringify(resposta), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

// -------------------------------------------------------
// Helpers
// -------------------------------------------------------

interface PartidaPlana {
  ronda: number;
  jugador1_nom: string;
  jugador2_nom: string;
  puntuacio_1: number | null;
  puntuacio_2: number | null;
  scrabbles_1: number;
  scrabbles_2: number;
  mot_1: string;
  puntsmot_1: number;
  mot_2: string;
  puntsmot_2: number;
  estat: string;
}

function calcularEstatsRonda(partidesRonda: PartidaPlana[]) {
  const jugades = partidesRonda.filter((p) => p.puntuacio_1 != null);
  if (jugades.length === 0) {
    return {
      Suma_punts: "0",
      Scrabbles: "0",
      "Mil·lenàries": "0",
      Centenàries: "0",
      Millor_Jugada: "0",
      Mots: "",
      Jug_Mots: "",
      Millor_Partida: "0",
      Jugador_Partida: "",
      Major_num_Scrabbles: "0",
      Jug_Scrabbles: "",
    };
  }

  const sumaPunts = jugades.reduce(
    (s, p) => s + (p.puntuacio_1 ?? 0) + (p.puntuacio_2 ?? 0),
    0,
  );
  const totalScrabbles = jugades.reduce(
    (s, p) => s + (p.scrabbles_1 ?? 0) + (p.scrabbles_2 ?? 0),
    0,
  );
  const millenaries = jugades.filter(
    (p) =>
      (p.puntuacio_1 ?? 0) >= 1000 || (p.puntuacio_2 ?? 0) >= 1000,
  ).length;
  const centenaries = jugades.filter(
    (p) =>
      (p.puntuacio_1 ?? 0) >= 600 || (p.puntuacio_2 ?? 0) >= 600,
  ).length;

  // Millor jugada (mot)
  let millorJugada = 0;
  let millorMot = "";
  let millorJugMot = "";
  jugades.forEach((p) => {
    if ((p.puntsmot_1 ?? 0) > millorJugada) {
      millorJugada = p.puntsmot_1 ?? 0;
      millorMot = p.mot_1 ?? "";
      millorJugMot = p.jugador1_nom;
    }
    if ((p.puntsmot_2 ?? 0) > millorJugada) {
      millorJugada = p.puntsmot_2 ?? 0;
      millorMot = p.mot_2 ?? "";
      millorJugMot = p.jugador2_nom;
    }
  });

  // Millor partida (màxima puntuació individual)
  let millorPartida = 0;
  let millorJugPartida = "";
  jugades.forEach((p) => {
    if ((p.puntuacio_1 ?? 0) > millorPartida) {
      millorPartida = p.puntuacio_1 ?? 0;
      millorJugPartida = p.jugador1_nom;
    }
    if ((p.puntuacio_2 ?? 0) > millorPartida) {
      millorPartida = p.puntuacio_2 ?? 0;
      millorJugPartida = p.jugador2_nom;
    }
  });

  // Major nombre de scrabbles en una partida
  let majorScrabbles = 0;
  let jugScrabbles = "";
  jugades.forEach((p) => {
    const tot = (p.scrabbles_1 ?? 0) + (p.scrabbles_2 ?? 0);
    if (tot > majorScrabbles) {
      majorScrabbles = tot;
      jugScrabbles = `${p.jugador1_nom}-${p.jugador2_nom}`;
    }
  });

  return {
    Suma_punts: String(sumaPunts),
    Scrabbles: String(totalScrabbles),
    "Mil·lenàries": String(millenaries),
    Centenàries: String(centenaries),
    Millor_Jugada: String(millorJugada),
    Mots: millorMot,
    Jug_Mots: millorJugMot,
    Millor_Partida: String(millorPartida),
    Jugador_Partida: millorJugPartida,
    Major_num_Scrabbles: String(majorScrabbles),
    Jug_Scrabbles: jugScrabbles,
  };
}

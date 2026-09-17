/**
 * Publica el JSON dels campionats a Firebase Realtime Database.
 *
 * El generador del JSON es compartit per totes les apps (ManaCup de cada
 * temporada, Xampions, i les que vinguin), o sigui que aquest fitxer ha de
 * saber a quin node va cada campionat. Ho resol la columna "ruta" del full
 * de campionats, la mateixa que ja fas servir per situar cada app.
 *
 * Estructura resultant:
 *
 *   /campionats
 *     /manacup
 *       /26-27
 *         /dades        <- el JSON sencer que ja generes
 *         /lastUpdate   <- marca de temps en ms
 *       /25-26
 *         ...
 *     /xampions
 *       /2026
 *         ...
 *
 * Cada app llegeix nomes el seu /dades.json, o sigui que afegir campionats
 * no afecta els que ja hi ha.
 *
 * --- Com s'integra -----------------------------------------------------------
 *
 * Nomes cal tocar updateJSON(), que es on es munta l'objecte i per on passen
 * tots els casos del doPost (partida, trobada, novaTrobada, actualitza) i
 * totes les apps. El doPost no s'ha de tocar.
 *
 * Substitueix la crida a enviarResposta(), que era justament el forat previst
 * per a aixo i avui no fa res:
 *
 *   -   // Enviar resposta immediatament
 *   -   enviarResposta(response);
 *   +   // Publica a Firebase, la font rapida que llegeix l'app.
 *   +   publicaFirebaseSiPot(response, idfull);
 *
 * Va abans del desat a Drive a proposit: com mes aviat hi siguin les dades,
 * abans les veuen els jugadors. saveAsJSON puja 1,2 MB i pot esperar.
 * Despres ja pots esborrar la funcio enviarResposta().
 *
 *     await Promise.all([
 *       saveAsJSON(response, idfull, idJSON),
 *     ]);
 *
 * Amb la variant SiPot, si Firebase falla el resultat es registra igualment i
 * l'app continua servint-se per l'Apps Script, nomes que mes lenta. Aixo vol
 * dir tambe que un campionat sense ruta al full deixa un avis al log i no
 * trenca res.
 *
 * --- Configuracio previa (un sol cop) ---------------------------------------
 *
 * 1. Crea un projecte a console.firebase.google.com i activa-hi la Realtime
 *    Database, en una regio europea.
 *
 * 2. Regles (Realtime Database > Rules). Lectura publica, escriptura tancada:
 *    el compte de servei te privilegis d'administrador i se les salta, o sigui
 *    que ningu mes hi pot escriure.
 *
 *      {
 *        "rules": {
 *          "campionats": { ".read": true, ".write": false }
 *        }
 *      }
 *
 * 3. Compte de servei: Configuracio del projecte > Comptes de servei >
 *    Genera una clau privada nova. Baixa el JSON.
 *
 * 4. Apps Script > Configuracio del projecte > Propietats del script:
 *      nom:   SA_JSON
 *      valor: el contingut sencer del fitxer del pas 3
 *    No enganxis mai la clau dins del codi: aquest fitxer es public.
 *
 * 5. Omple FIREBASE_DB aqui sota. El node de cada campionat surt del full,
 *    o sigui que no hi ha res mes a mantenir.
 */

// --- Configuracio ------------------------------------------------------------

const FIREBASE_DB =
  "https://EL-TEU-PROJECTE-default-rtdb.europe-west1.firebasedatabase.app";

/**
 * Excepcions: idfull -> node. Normalment ha d'estar buit.
 *
 * El node surt de la columna "ruta" del full de campionats, que es on ja
 * mantens aquesta informacio: "manacup/26-27/" -> node "manacup/26-27".
 * Aixi afegir una temporada es afegir-hi una fila, i no hi ha dues llistes
 * que es puguin desincronitzar.
 *
 * Nomes posa res aqui si algun campionat ha d'anar a un node diferent del
 * que diu la seva ruta. El que hi hagi aqui mana per damunt del full.
 */
const CAMPIONATS = {
  // "1ZB1IS18lNye3Vqi8g-7a22gXh46jhu0IZGGxoao9_lU": "manacup/26-27",
};

const ARREL = "campionats";

// --- API ---------------------------------------------------------------------

/**
 * Escriu les dades i, nomes si han anat be, la marca de temps.
 * L'ordre importa: lastUpdate no ha d'anunciar mai unes dades que encara
 * no hi son.
 *
 * @param {Object} dades El mateix objecte que ja retorna el web app.
 * @param {string} idfull Identificador del full del campionat.
 * @return {string} El node on s'ha publicat.
 */
function publicaFirebase(dades, idfull) {
  const node = nodeDe_(idfull);
  const base = FIREBASE_DB + "/" + ARREL + "/" + node;
  const capcaleres = { Authorization: "Bearer " + tokenFirebase_() };

  escriuNode_(base + "/dades.json", dades, capcaleres);
  escriuNode_(base + "/lastUpdate.json", Date.now(), capcaleres);

  console.log("Publicat a Firebase: " + node);
  return node;
}

/**
 * Variant que no atura el flux si Firebase falla. Es la recomanada al punt
 * d'enviament d'un resultat: val mes servir dades lentes que perdre el
 * resultat.
 */
function publicaFirebaseSiPot(dades, idfull) {
  try {
    return publicaFirebase(dades, idfull);
  } catch (e) {
    console.error("No s'ha pogut publicar a Firebase: " + e.message);
    return null;
  }
}

/**
 * Imprimeix la URL que ha de posar una app a firebaseURL.
 * Passa-li l'idfull del campionat.
 */
function urlApp(idfull) {
  const url = FIREBASE_DB + "/" + ARREL + "/" + nodeDe_(idfull) + "/dades.json";
  console.log(url);
  return url;
}

// --- Intern ------------------------------------------------------------------

/**
 * Node de Firebase d'un campionat, a partir de la seva ruta al full.
 * Si no se'n pot deduir cap, val mes un error clar que publicar a un node
 * inventat: unes dades en un lloc que cap app mira son molt mals de veure.
 */
function nodeDe_(idfull) {
  let node = CAMPIONATS[idfull];

  if (!node) {
    const fila = dadesCampionat(idfull);
    node = fila && fila.ruta;
  }
  if (!node) {
    throw new Error(
      "Campionat sense ruta: " + idfull +
        ". Omple la columna ruta al full de campionats."
    );
  }

  // "manacup/26-27/" -> "manacup/26-27"
  node = String(node).replace(/^\/+|\/+$/g, "");

  // Firebase no admet aquests caracters a les claus.
  if (/[.$#\[\]]/.test(node)) {
    throw new Error("Ruta no valida per a Firebase: " + node);
  }
  return node;
}

function escriuNode_(url, valor, capcaleres) {
  const resposta = UrlFetchApp.fetch(url, {
    method: "put",
    contentType: "application/json",
    headers: capcaleres,
    payload: JSON.stringify(valor),
    muteHttpExceptions: true,
  });
  const codi = resposta.getResponseCode();
  if (codi >= 300) {
    throw new Error(
      "Firebase " + codi + " a " + url + ": " + resposta.getContentText()
    );
  }
}

/**
 * Token OAuth2 del compte de servei. Es guarda a la cache perque dura una
 * hora i no cal demanar-ne un a cada publicacio.
 */
function tokenFirebase_() {
  const cache = CacheService.getScriptCache();
  const desat = cache.get("firebase_token");
  if (desat) return desat;

  const brut = PropertiesService.getScriptProperties().getProperty("SA_JSON");
  if (!brut) {
    throw new Error("Falta la propietat SA_JSON amb la clau del compte de servei.");
  }
  const sa = JSON.parse(brut);
  const ara = Math.floor(Date.now() / 1000);

  // El JWT va en base64 websafe i SENSE els '=' de farciment.
  const b64 = (o) =>
    Utilities.base64EncodeWebSafe(JSON.stringify(o)).replace(/=+$/, "");

  const capcalera = b64({ alg: "RS256", typ: "JWT" });
  const cos = b64({
    iss: sa.client_email,
    scope: [
      "https://www.googleapis.com/auth/firebase.database",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    aud: "https://oauth2.googleapis.com/token",
    iat: ara,
    exp: ara + 3600,
  });
  const signatura = Utilities.base64EncodeWebSafe(
    Utilities.computeRsaSha256Signature(capcalera + "." + cos, sa.private_key)
  ).replace(/=+$/, "");

  const resposta = UrlFetchApp.fetch("https://oauth2.googleapis.com/token", {
    method: "post",
    payload: {
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: capcalera + "." + cos + "." + signatura,
    },
    muteHttpExceptions: true,
  });
  if (resposta.getResponseCode() >= 300) {
    throw new Error("No s'ha pogut obtenir el token: " + resposta.getContentText());
  }

  const dades = JSON.parse(resposta.getContentText());
  // Un minut de marge perque no caduqui just en el moment d'usar-lo.
  cache.put("firebase_token", dades.access_token, dades.expires_in - 60);
  return dades.access_token;
}

/**
 * Comprovacio manual. Passa-li un idfull del full: ha de deixar un node de
 * prova a Firebase i dir-te quina URL ha de posar l'app.
 */
function provaFirebase(idfull) {
  const node = publicaFirebase(
    { dades: [], calendari: [], aparellaments: [], partides: [], prova: true },
    idfull
  );
  console.log("URL per a l'app: " + FIREBASE_DB + "/" + ARREL + "/" + node + "/dades.json");
}

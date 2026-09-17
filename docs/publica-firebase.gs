/**
 * Publica el JSON del campionat a Firebase Realtime Database.
 *
 * Es crida des del codi que ja genera el JSON, just despres de generar-lo:
 *
 *     const dades = generaJSON();     // el que ja fas ara
 *     publicaFirebase(dades);         // afegeix nomes aquesta linia
 *
 * L'app llegeix <FIREBASE_DB>/<FIREBASE_NODE>/dades.json i, si falla, cau
 * automaticament a l'Apps Script. Es pot desplegar aixo abans de tocar l'app.
 *
 * --- Configuracio previa (un sol cop) ---------------------------------------
 *
 * 1. Crea un projecte a console.firebase.google.com i activa-hi la Realtime
 *    Database. Tria una regio europea per baixar latencia.
 *
 * 2. Regles de la base de dades (Firebase > Realtime Database > Rules).
 *    Lectura publica, escriptura tancada: el compte de servei te privilegis
 *    d'administrador i se les salta, o sigui que ningu mes hi pot escriure.
 *
 *      {
 *        "rules": {
 *          "manacup": { ".read": true, ".write": false }
 *        }
 *      }
 *
 * 3. Compte de servei: Configuracio del projecte > Comptes de servei >
 *    Genera una clau privada nova. Baixa el JSON.
 *
 * 4. A l'editor d'Apps Script: Configuracio del projecte > Propietats del
 *    script > Afegeix propietat.
 *      nom:   SA_JSON
 *      valor: el contingut sencer del fitxer JSON del pas 3
 *    No enganxis mai la clau dins del codi: aquest fitxer es public.
 *
 * 5. Ajusta FIREBASE_DB i FIREBASE_NODE aqui sota.
 */

// --- Configuracio ------------------------------------------------------------

const FIREBASE_DB = "https://EL-TEU-PROJECTE-default-rtdb.europe-west1.firebasedatabase.app";
const FIREBASE_NODE = "manacup/26-27";

// --- API ---------------------------------------------------------------------

/**
 * Escriu les dades i, nomes si han anat be, la marca de temps.
 * L'ordre importa: lastUpdate no ha d'anunciar mai unes dades que encara
 * no hi son.
 *
 * @param {Object} dades El mateix objecte que ja retorna el web app.
 * @return {boolean} true si s'ha publicat.
 */
function publicaFirebase(dades) {
  const base = FIREBASE_DB + "/" + FIREBASE_NODE;
  const capcaleres = { Authorization: "Bearer " + tokenFirebase_() };

  escriuNode_(base + "/dades.json", dades, capcaleres);
  escriuNode_(base + "/lastUpdate.json", Date.now(), capcaleres);

  console.log("Publicat a Firebase: " + base);
  return true;
}

/**
 * Versio que no atura el flux si Firebase falla. Fes-la servir si prefereixes
 * que un problema de publicacio no bloquegi el registre del resultat: l'app
 * seguira funcionant per l'Apps Script, nomes que mes lenta.
 */
function publicaFirebaseSiPot(dades) {
  try {
    return publicaFirebase(dades);
  } catch (e) {
    console.error("No s'ha pogut publicar a Firebase: " + e.message);
    return false;
  }
}

// --- Intern ------------------------------------------------------------------

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
    throw new Error("Firebase " + codi + " a " + url + ": " + resposta.getContentText());
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
 * Comprovacio manual. Executa-la un cop configurat: ha de deixar un node de
 * prova a Firebase i imprimir l'URL que ha de posar l'app a firebaseURL.
 */
function provaFirebase() {
  publicaFirebase({ dades: [], calendari: [], aparellaments: [], partides: [], prova: true });
  console.log("URL per a l'app: " + FIREBASE_DB + "/" + FIREBASE_NODE + "/dades.json");
}

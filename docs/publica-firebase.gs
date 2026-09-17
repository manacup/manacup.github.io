/**
 * Publica el JSON dels campionats a Firebase Realtime Database.
 *
 * El generador del JSON es compartit per totes les apps (ManaCup de cada
 * temporada, Xampions, i les que vinguin), o sigui que aquest fitxer ha de
 * saber a quin node va cada campionat. Aixo ho resol el registre CAMPIONATS:
 * la clau es l'idfull (el full de calcul, que es el que identifica de veritat
 * un campionat) i el valor es el node dins de Firebase.
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
 * Al punt on el teu script ja ha generat el JSON, afegeix una linia:
 *
 *     const dades = generaJSON(idfull);   // el que ja fas ara
 *     publicaFirebaseSiPot(dades, idfull);
 *
 * Amb la variant SiPot, si Firebase falla el resultat es registra igualment i
 * l'app continua servint-se per l'Apps Script, nomes que mes lenta.
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
 * 5. Omple FIREBASE_DB i el registre CAMPIONATS aqui sota.
 */

// --- Configuracio ------------------------------------------------------------

const FIREBASE_DB =
  "https://EL-TEU-PROJECTE-default-rtdb.europe-west1.firebasedatabase.app";

/**
 * Registre de campionats: idfull -> node dins de /campionats.
 * Afegir una temporada nova es afegir una linia aqui i posar la URL
 * corresponent a firebaseURL de la seva index.html. Fes servir urlsApps()
 * per veure quines URL toquen.
 */
const CAMPIONATS = {
  // ManaCup
  "1ZB1IS18lNye3Vqi8g-7a22gXh46jhu0IZGGxoao9_lU": "manacup/26-27",
  "1rew2PMTgHI8YUYoS_B-qenV8hs8E6nGiW2gd6F7jnOY": "manacup/25-26",
  "1pj6G5pgDUAypPB7O9gkFduYAItopiQBYVR37eXalIvU": "manacup/24-25",
  // Xampions d'estiu: posa-hi els idfull que facin falta
  // "……": "xampions/2026",
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
 * Imprimeix la URL que ha de dur cada app a firebaseURL. Executa-la quan
 * afegeixis un campionat al registre.
 */
function urlsApps() {
  Object.keys(CAMPIONATS).forEach((idfull) => {
    console.log(
      CAMPIONATS[idfull] +
        "  ->  " +
        FIREBASE_DB + "/" + ARREL + "/" + CAMPIONATS[idfull] + "/dades.json"
    );
  });
}

// --- Intern ------------------------------------------------------------------

/**
 * Un campionat no registrat no es publica a un node inventat: l'app no el
 * sabria trobar. Val mes un error clar que unes dades en un lloc que ningu
 * llegeix.
 */
function nodeDe_(idfull) {
  const node = CAMPIONATS[idfull];
  if (!node) {
    throw new Error(
      "Campionat no registrat a CAMPIONATS: " + idfull +
        ". Afegeix-hi una linia amb el node que li toca."
    );
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
 * Comprovacio manual. Passa-li un idfull ja registrat: ha de deixar un node
 * de prova a Firebase i dir-te quina URL ha de posar l'app.
 */
function provaFirebase(idfull) {
  const node = publicaFirebase(
    { dades: [], calendari: [], aparellaments: [], partides: [], prova: true },
    idfull
  );
  console.log(
    "URL per a l'app: " + FIREBASE_DB + "/" + ARREL + "/" + node + "/dades.json"
  );
}

/**
 * Publicacio per seccions: cada formulari refa nomes el que ha canviat.
 *
 * Avui, enviar una assistencia regenera els 857 KB del campionat per canviar
 * els 995 bytes de "trobades", i fa cinc lectures completes del full.
 *
 * Repartiment (26-27, setembre):
 *
 *   partides        433.850 B   50,6%   canvia amb un resultat
 *   aparellaments   316.903 B   37,0%   canvia amb un resultat
 *   dades            96.829 B   11,3%   canvia amb un resultat
 *   calendari         8.721 B    1,0%   gairebe mai
 *   trobades            995 B    0,1%   canvia amb trobada/assistencia
 *   status+campionat+temporada   26 B   fixos tota la temporada
 *
 * El costat de lectura NO canvia: Firebase torna tot el subarbre en una sola
 * peticio, o sigui que /campionats/<ruta>/dades.json segueix donant el mateix
 * objecte que ara i l'app no s'ha de tocar.
 *
 * Estructura:
 *
 *   /campionats/manacup/26-27/
 *       dades/          status, campionat, temporada, dades[], calendari[],
 *                       aparellaments[], partides[], trobades{}
 *       lastUpdate      escalar, com fins ara
 *       seccions/       marca de temps per seccio
 */

// --- Les seccions i com es munta cadascuna ----------------------------------

const SECCIONS = {
  dades: function (idfull) { return getData(idfull); },
  calendari: function (idfull) { return recuperaCalendari(idfull); },
  aparellaments: function (idfull) { return recuperaAparellaments(idfull); },
  partides: function (idfull) { return recuperaPartides(idfull); },
  trobades: function (idfull) { return getTrobades(idfull); },
};

// Quines seccions toca cada accio del doPost. Confirmat amb l'autor del full:
// un resultat no toca trobades, i una assistencia no toca aparellaments,
// perque els emparellaments es fan a part.
const SECCIONS_PER_ACCIO = {
  partida: ["dades", "aparellaments", "partides"],
  trobada: ["trobades"],
  novaTrobada: ["trobades"],
};

// --- API --------------------------------------------------------------------

/**
 * Refa i publica nomes les seccions demanades.
 *
 * @param {string} idfull Identificador del full del campionat.
 * @param {Array<string>} noms Claus de SECCIONS.
 * @return {number} La marca de temps publicada.
 */
function publicaSeccions(idfull, noms) {
  const base = FIREBASE_DB + "/" + ARREL + "/" + nodeDe_(idfull);
  const capcaleres = { Authorization: "Bearer " + tokenFirebase_() };
  const ara = Date.now();

  const canvis = {};
  const marques = {};
  noms.forEach(function (nom) {
    if (!SECCIONS[nom]) throw new Error("Seccio desconeguda: " + nom);
    canvis[nom] = SECCIONS[nom](idfull);
    marques[nom] = ara;
  });

  // PATCH toca nomes les claus que li passam i deixa les altres com estaven.
  // Una sola peticio per a totes les seccions, en lloc d'una per seccio.
  patchNode_(base + "/dades.json", canvis, capcaleres);
  patchNode_(base + "/seccions.json", marques, capcaleres);

  // lastUpdate al final: no ha d'anunciar mai unes dades que encara no hi son.
  escriuNode_(base + "/lastUpdate.json", ara, capcaleres);

  console.log("Publicat " + noms.join(", ") + " a " + nodeDe_(idfull));
  return ara;
}

/**
 * Publica les seccions que corresponen a una accio del doPost, sense aturar
 * el flux si Firebase falla: val mes servir dades lentes que perdre el que
 * s'acaba d'enviar.
 */
function publicaPerAccioSiPot(idfull, accio) {
  try {
    const noms = SECCIONS_PER_ACCIO[accio];
    if (!noms) throw new Error("Accio sense seccions definides: " + accio);
    return publicaSeccions(idfull, noms);
  } catch (e) {
    console.error("No s'ha pogut publicar a Firebase: " + e.message);
    return null;
  }
}

/**
 * Refa tot el campionat. Es el que ha de fer el boto "actualitza", i tambe
 * la xarxa de seguretat si alguna seccio queda enrere.
 */
function publicaTotElCampionat(idfull) {
  const campionat = dadesCampionat(idfull);
  const base = FIREBASE_DB + "/" + ARREL + "/" + nodeDe_(idfull);
  const capcaleres = { Authorization: "Bearer " + tokenFirebase_() };

  // Els tres fixos: es podrien escriure un sol cop per temporada, pero son
  // 26 bytes i aixi un "actualitza" els deixa sempre correctes.
  patchNode_(base + "/dades.json", {
    status: 200,
    campionat: campionat.Campionat,
    temporada: campionat.Temporada,
  }, capcaleres);

  return publicaSeccions(idfull, Object.keys(SECCIONS));
}

// --- Intern -----------------------------------------------------------------

function patchNode_(url, valor, capcaleres) {
  const resposta = UrlFetchApp.fetch(url, {
    method: "patch",
    contentType: "application/json",
    headers: capcaleres,
    payload: JSON.stringify(valor),
    muteHttpExceptions: true,
  });
  if (resposta.getResponseCode() >= 300) {
    throw new Error(
      "Firebase " + resposta.getResponseCode() + " a " + url + ": " +
        resposta.getContentText()
    );
  }
}

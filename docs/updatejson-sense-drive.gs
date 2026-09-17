/**
 * Enviaments mes rapids: treu la copia a Drive del cami critic.
 *
 * ELS CALCULS NO ES MOUEN. El full segueix fent-los tots; aixo nomes canvia
 * d'on surt la copia que llegeix l'app:
 *
 *   1. nouResultat()  escriu el resultat al full
 *   2. el full        RECALCULA (formules, classificacions, tot igual)
 *   3. construeixJSON LLEGEIX el resultat ja calculat
 *   4. publicaFirebase el publica
 *   5. saveAsJSON     <- aixo es el que llevam
 *
 * saveAsJSON no calculava res: pujava 1,2 MB a Drive a cada enviament, i el
 * client esperava aquesta pujada abans de rebre resposta.
 *
 * --- Que se n'ha de fer del doGet ------------------------------------------
 *
 * La copia de GitHub NO en depen: updateGithubFile() rep l'objecte muntat, no
 * el fitxer de Drive. Segueix igual, i segueix sent l'arxiu de les temporades
 * tancades (24-25, 25-26, 23-24 llegeixen el JSON del repositori).
 *
 * doGet?page=JSON servia aquell fitxer de Drive. Si deixem d'actualitzar-lo
 * pero el seguim servint, el pla B respon dades velles, que es pitjor que no
 * respondre. Per aixo el doGet passa a refer el JSON llegint el full: mes
 * lent, pero sempre correcte i sense dependre de cap fitxer intermedi.
 *
 * L'app ja envia &idfull= a la crida de reserva. Si no hi arriba (una versio
 * antiga en cache d'algun usuari), es manté el comportament de sempre.
 */

// --- 1) Munta l'objecte, llegint el que el full ha calculat ------------------

function construeixJSON(idfull) {
  // dadesCampionat() es cridava dues vegades per treure'n dos camps.
  const campionat = dadesCampionat(idfull);

  return {
    status: 200,
    campionat: campionat.Campionat,
    temporada: campionat.Temporada,
    dades: getData(idfull),
    calendari: recuperaCalendari(idfull),
    aparellaments: recuperaAparellaments(idfull),
    trobades: getTrobades(idfull),
    partides: recuperaPartides(idfull),
  };
}

// --- 2) updateJSON: substitueix la teva -------------------------------------

/**
 * Es manté async i amb els dos parametres perque el doPost no s'hagi de tocar.
 * idJSON ja no s'usa.
 */
async function updateJSON(idfull, idJSON) {
  const response = construeixJSON(idfull);

  // Publica a Firebase, la font que llegeix l'app.
  publicaFirebaseSiPot(response, idfull);

  return response;
}

// --- 3) updateJSONGithub: substitueix la teva --------------------------------

/**
 * updateGithubFile() rep l'OBJECTE, no el fitxer de Drive, o sigui que llevar
 * saveAsJSON no afecta gens la copia de GitHub.
 *
 * Aquesta funcio repetia sencer el cos d'updateJSON per muntar el mateix
 * objecte; ara totes dues fan servir construeixJSON().
 *
 * Es manté el segon parametre perque el doPost no s'hagi de tocar.
 */
function updateJSONGithub(idfull, idJSON) {
  const response = construeixJSON(idfull);

  publicaFirebaseSiPot(response, idfull);
  updateGithubFile(idfull, response);

  return response;
}

// --- 4) El testimoni de GitHub fora del codi ---------------------------------

/**
 * updateGithubFile() i uploadGithubFile() duen el testimoni escrit dins del
 * codi. Qualsevol que vegi el projecte pot escriure al repositori, i un
 * testimoni escrit al codi s'acaba copiant a llocs on no toca.
 *
 * Desa'l a Propietats del script amb el nom GITHUB_TOKEN i, a les dues
 * funcions, canvia
 *
 *     const token = 'ghp_...';
 * per
 *     const token = tokenGithub_();
 */
function tokenGithub_() {
  const token = PropertiesService.getScriptProperties().getProperty("GITHUB_TOKEN");
  if (!token) {
    throw new Error("Falta la propietat GITHUB_TOKEN.");
  }
  return token;
}

// --- 5) doGet: canvia NOMES la branca page === "JSON" ------------------------
/*

  if (page === "JSON") {

    // Amb idfull refem el JSON del full: sempre al dia.
    if (idfull) {
      return sendJSON_(construeixJSON(idfull));
    }

    // Sense idfull, comportament antic (fitxer de Drive). Es pot llevar quan
    // cap usuari no arrossegui una versio antiga de l'app en cache.
    let file = DriveApp.getFileById(idJSON)
    let response = file.getBlob().getDataAsString()

    return ContentService
      .createTextOutput(response)
      .setMimeType(ContentService.MimeType.JSON);

  } else if (page === "jugadors") {

*/

// --- 6) Opcional: repassada de totes les temporades --------------------------

/**
 * Publica a Firebase tots els campionats registrats al full. Va be per
 * omplir-lo de cop la primera vegada, i tambe per als campionats tancats:
 * un cop publicats, les seves apps tambe van rapides.
 *
 * Passa-li la llista d'idfull del full de campionats.
 */
function publicaTot(idfulls) {
  idfulls.forEach(function (idfull) {
    try {
      const node = publicaFirebase(construeixJSON(idfull), idfull);
      console.log("OK    " + node);
    } catch (e) {
      console.error("FALLA " + idfull + ": " + e.message);
    }
  });
}

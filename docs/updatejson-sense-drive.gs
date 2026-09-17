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

// --- 3) doGet: canvia NOMES la branca page === "JSON" ------------------------
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

// --- 4) Opcional: repassada de totes les temporades --------------------------

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

/**
 * Copia a GitHub: periodica i independent de l'aplicacio.
 *
 * Fins ara la copia es feia des del boto "actualitza", refent el JSON del
 * full. Ara Firebase ja te les dades al dia, o sigui que la copia es pot fer
 * llegint-lo a ell: ZERO lectures del full, i ningu no espera.
 *
 * GitHub passa a ser un mirall de Firebase, i segueix fent d'arxiu de les
 * temporades tancades (24-25, 25-26 i 23-24 llegeixen el JSON del repositori)
 * i de tercer pla si Firebase i l'Apps Script fallessin alhora.
 *
 * Nomes fa commit si hi ha hagut canvis: si no, tindries un commit cada hora
 * encara que no s'hagues jugat res.
 *
 * --- Posada en marxa --------------------------------------------------------
 *
 * 1. Omple CAMPIONATS_ACTIUS amb els idfull que vols mirallar. Normalment
 *    nomes la temporada en curs: els campionats tancats ja no canvien i no
 *    val la pena repassar-los cada hora.
 * 2. Executa creaActivadorGithub() una vegada.
 *
 * Per aturar-ho: esborra l'activador a Activadors, al menu de l'esquerra.
 */

const CAMPIONATS_ACTIUS = [
  "1ZB1IS18lNye3Vqi8g-7a22gXh46jhu0IZGGxoao9_lU", // XIII ManaCup 26-27
];

// --- Activador ---------------------------------------------------------------

function creaActivadorGithub() {
  // Esborram els que ja hi hagi, que si no se n'acumulen un a cada execucio.
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === "mirallGithub") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("mirallGithub").timeBased().everyHours(1).create();
  console.log("Activador horari creat.");
}

// --- La feina ----------------------------------------------------------------

function mirallGithub() {
  const props = PropertiesService.getScriptProperties();

  CAMPIONATS_ACTIUS.forEach(function (idfull) {
    try {
      const node = nodeDe_(idfull);
      const base = FIREBASE_DB + "/" + ARREL + "/" + node;

      // Primer la marca de temps: son 20 bytes i ens estalvien baixar-ho tot
      // quan no hi ha hagut canvis.
      const marca = String(llegeixFirebase_(base + "/lastUpdate.json"));
      const clau = "github_" + node;
      if (marca === props.getProperty(clau)) {
        console.log("Sense canvis: " + node);
        return;
      }

      const dades = llegeixFirebase_(base + "/dades.json");
      if (!dades || !dades.campionat) {
        console.error("Node sense dades: " + node);
        return;
      }

      updateGithubFile(idfull, dades);
      props.setProperty(clau, marca);
      console.log("Mirallat: " + node);
    } catch (e) {
      // Un campionat que falla no ha d'aturar els altres.
      console.error("Error mirallant " + idfull + ": " + e.message);
    }
  });
}

/**
 * Empeny ara mateix, sense esperar l'activador. Va be despres de canviar
 * alguna cosa i per provar la posada en marxa.
 */
function mirallGithubAra() {
  PropertiesService.getScriptProperties()
    .getKeys()
    .filter(function (k) { return k.indexOf("github_") === 0; })
    .forEach(function (k) { PropertiesService.getScriptProperties().deleteProperty(k); });
  mirallGithub();
}

// --- Intern ------------------------------------------------------------------

function llegeixFirebase_(url) {
  const resposta = UrlFetchApp.fetch(url, {
    headers: { Authorization: "Bearer " + tokenFirebase_() },
    muteHttpExceptions: true,
  });
  if (resposta.getResponseCode() >= 300) {
    throw new Error(
      "Firebase " + resposta.getResponseCode() + " llegint " + url + ": " +
        resposta.getContentText()
    );
  }
  return JSON.parse(resposta.getContentText());
}

/**
 * doPost: cada cas demana nomes les seves seccions.
 *
 * Substitueix les crides a updateJSON(idfull, idJSON). La copia a GitHub
 * surt d'aqui: la fa l'activador horari (github-periodic.gs), llegint de
 * Firebase.
 */
/*

    switch (envia) {
      case 'partida':
        nouResultat(data.obj, idfull)
          .then(() => {
            publicaPerAccioSiPot(idfull, 'partida');   // dades, aparellaments, partides
          })
          .catch(error => console.error("nouResultat: " + error));
        break;

      case 'trobada':
        enviaTrobades(data.values, idfull)
          .then(() => {
            publicaPerAccioSiPot(idfull, 'trobada');   // nomes trobades: ~1 KB
          })
          .catch(error => console.error("enviaTrobades: " + error));
        break;

      case 'novaTrobada':
        desaTrobades(data.values, idfull, data.row)
          .then(() => {
            publicaPerAccioSiPot(idfull, 'novaTrobada');   // nomes trobades
            mistrobada(idfull);
          })
          .catch(error => console.error("desaTrobades: " + error));
        break;

      case 'imatge':
        // No toca cap seccio: la ruta de la imatge no canvia.
        uploadFilesImatge(data.nom, data.file, idfull)
          .catch(error => console.error("uploadFilesImatge: " + error));
        break;

      case 'actualitza':
        publicaTotElCampionat(idfull);
        break;

      default:
        console.log('Fórmula no reconeguda');
    }

*/

/**
 * updateJSON queda com a xarxa de seguretat: refa tot el campionat. Es manté
 * la signatura perque no s'hagi de tocar res mes que la cridi. idJSON ja no
 * s'usa: la copia de Drive ja no es fa.
 */
async function updateJSON(idfull, idJSON) {
  return publicaTotElCampionat(idfull);
}

/**
 * Comprovacio de la migracio. Publica tot un campionat i despres mira que el
 * node tingui totes les seccions amb contingut.
 *
 * Ull: Firebase no desa els arrays buits, els esborra. Si una llista es buida
 * de veritat, aqui sortira com a absent i no es cap error.
 */
function comprovaSeccions(idfull) {
  publicaTotElCampionat(idfull);

  const base = FIREBASE_DB + "/" + ARREL + "/" + nodeDe_(idfull);
  const dades = llegeixFirebase_(base + "/dades.json");

  ["status", "campionat", "temporada"].forEach(function (k) {
    console.log("  %s: %s", k, dades[k]);
  });
  Object.keys(SECCIONS).forEach(function (nom) {
    const v = dades[nom];
    const n = v == null ? "ABSENT (llista buida?)" : (v.length != null ? v.length : "objecte");
    console.log("  %s: %s", nom, n);
  });
  console.log("  seccions:", JSON.stringify(llegeixFirebase_(base + "/seccions.json")));
}

/**
 * doPost: cada cas publica nomes les seves seccions.
 *
 * Substitueix la teva funcio doPost sencera.
 *
 * Que canvia respecte de l'anterior:
 *
 *   - updateJSON(idfull, idJSON) -> publicaPerAccioSiPot(idfull, '<accio>'),
 *     que refa nomes les seccions que aquella accio toca.
 *   - updateJSONGithub ja no es crida des d'aqui: la copia a GitHub la fa
 *     l'activador horari de github-periodic.gs, llegint de Firebase.
 *   - Cada cas retorna la seva resposta de forma sincrona. Abans els
 *     return ContentService eren dins dels .then(), que es resolen quan
 *     doPost ja ha retornat undefined, o sigui que no arribaven enlloc.
 *   - Fora la variable headers, que no s'usava: ContentService no permet
 *     posar capcaleres, i els CORS els posa Google tot sol.
 *
 * Els .then() es mantenen perque nouResultat, enviaTrobades i desaTrobades
 * retornen promeses. El cos d'aquestes funcions es sincron (embolcallat amb
 * new Promise), o sigui que la publicacio s'executa dins la mateixa
 * execucio, abans que Apps Script tanqui.
 */

function doPost(e) {
  console.log(e);

  try {
    var data = JSON.parse(e.postData.contents);
    var envia = data.envia;
    var idfull = data.idfull;

    switch (envia) {
      case 'partida':
        nouResultat(data.obj, idfull)
          .then(function () {
            // dades, aparellaments, partides
            publicaPerAccioSiPot(idfull, 'partida');
          })
          .catch(function (error) {
            console.error("nouResultat: " + error);
          });
        return ContentService.createTextOutput("partida rebuda");

      case 'trobada':
        enviaTrobades(data.values, idfull)
          .then(function () {
            // nomes trobades: ~1 KB i una lectura del full
            publicaPerAccioSiPot(idfull, 'trobada');
          })
          .catch(function (error) {
            console.error("enviaTrobades: " + error);
          });
        return ContentService.createTextOutput("resposta trobada rebuda");

      case 'novaTrobada':
        desaTrobades(data.values, idfull, data.row)
          .then(function () {
            publicaPerAccioSiPot(idfull, 'novaTrobada');
            mistrobada(idfull);
          })
          .catch(function (error) {
            console.error("desaTrobades: " + error);
          });
        return ContentService.createTextOutput("trobada afegida/modificada");

      case 'imatge':
        // No toca cap seccio: la ruta de la imatge no canvia mai.
        uploadFilesImatge(data.nom, data.file, idfull)
          .catch(function (error) {
            console.error("uploadFilesImatge: " + error);
          });
        return ContentService.createTextOutput("imatge rebuda: " + data.nom);

      case 'actualitza':
        console.log("actualitzant...");
        publicaTotElCampionat(idfull);
        return ContentService.createTextOutput("actualització feta");

      default:
        console.log("Fórmula no reconeguda: " + envia);
        return ContentService.createTextOutput("Fórmula no reconeguda");
    }
  } catch (error) {
    console.error("doPost: " + error);
    return ContentService.createTextOutput("Error: " + error.toString());
  }
}

/**
 * Xarxa de seguretat: refa tot el campionat. Es manté la signatura perque no
 * s'hagi de tocar res mes que la cridi. idJSON ja no s'usa: la copia de Drive
 * ja no es fa.
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
    console.log("  " + k + ": " + dades[k]);
  });
  Object.keys(SECCIONS).forEach(function (nom) {
    const v = dades[nom];
    const n = v == null
      ? "ABSENT (llista buida?)"
      : (v.length != null ? v.length + " elements" : "objecte");
    console.log("  " + nom + ": " + n);
  });
  console.log("  seccions: " + JSON.stringify(llegeixFirebase_(base + "/seccions.json")));
}

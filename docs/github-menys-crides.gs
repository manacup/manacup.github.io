/**
 * Menys feina per enviament, a la banda de l'Apps Script.
 *
 * updateGithubFile() i uploadGithubFile() fan TRES crides a l'API de GitHub
 * per cada fitxer:
 *
 *   1. comprovar que la branca main existeix
 *   2. demanar el SHA del fitxer
 *   3. pujar-lo
 *
 * La primera no serveix de res: main sempre hi es, i si algun dia no hi fos,
 * el pas 3 fallaria igualment amb un missatge clar. Amb dues fotos per
 * partida aixo son dues crides de mes, cada una amb la seva latencia.
 *
 * A mes, totes dues funcions detecten els errors amb try/catch mirant si el
 * missatge conte "404". UrlFetchApp nomes llanca excepcio si no hi poses
 * muteHttpExceptions, i llavors el missatge depen del text que retorni
 * Google. Mirant el codi de resposta es mes curt i no es trenca.
 *
 * Aquestes dues funcions substitueixen les teves. createBranch() ja no cal.
 */

// --- Pujada d'un fitxer al repositori ---------------------------------------

function pujaAGithub_(filePath, contingutBase64, descripcio) {
  const token = tokenGithub_();
  const repoOwner = "manacup";
  const repoName = "manacup.github.io";
  const branch = "main";

  const url =
    "https://api.github.com/repos/" + repoOwner + "/" + repoName +
    "/contents/" + filePath;

  const headers = {
    Authorization: "token " + token,
    Accept: "application/vnd.github+json",
  };

  // Nomes dues crides: el SHA (cal per actualitzar) i la pujada.
  let sha = null;
  const actual = UrlFetchApp.fetch(url + "?ref=" + branch, {
    headers: headers,
    muteHttpExceptions: true,
  });
  if (actual.getResponseCode() === 200) {
    sha = JSON.parse(actual.getContentText()).sha;
  } else if (actual.getResponseCode() !== 404) {
    throw new Error(
      "GitHub " + actual.getResponseCode() + " llegint " + filePath + ": " +
        actual.getContentText()
    );
  }

  const payload = {
    message: (sha ? "Update " : "Create ") + descripcio,
    content: contingutBase64,
    branch: branch,
  };
  if (sha) payload.sha = sha;

  const resposta = UrlFetchApp.fetch(url, {
    method: "put",
    contentType: "application/json",
    headers: headers,
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });
  if (resposta.getResponseCode() >= 300) {
    throw new Error(
      "GitHub " + resposta.getResponseCode() + " pujant " + filePath + ": " +
        resposta.getContentText()
    );
  }
  return true;
}

// --- Les dues funcions que criden la resta del codi --------------------------

function updateGithubFile(idfull, response) {
  const campionat = dadesCampionat(idfull);
  return pujaAGithub_(
    campionat.ruta + campionat.JSON,
    Utilities.base64Encode(Utilities.newBlob(JSON.stringify(response)).getBytes()),
    "JSON file via Google Apps Script"
  );
}

function uploadGithubFile(urlData, nom, idfull) {
  const filePath =
    nom.split("-")[0] === "Imatge"
      ? "imatges_jugadors/" + nom
      : dadesCampionat(idfull).ruta + "imatges/" + nom;

  return pujaAGithub_(filePath, urlData, "file via Google Apps Script");
}

/**
 * El testimoni, a les propietats del script (GITHUB_TOKEN), mai al codi.
 */
function tokenGithub_() {
  const token = PropertiesService.getScriptProperties().getProperty("GITHUB_TOKEN");
  if (!token) {
    throw new Error("Falta la propietat GITHUB_TOKEN.");
  }
  return token;
}

/**
 * Imatges: nomes a GitHub. La copia de Drive ja no servia per a res.
 *
 * carregaimatge64() retornava {imatge, linkImatgeDrive}, i els dos llocs que
 * la criden fan servir NOMES .imatge, que es la ruta de GitHub:
 *
 *   nouResultat():      partida.full = carregaimatge64(...).imatge
 *   uploadFilesImatge(): la part que feia servir linkImatgeDrive esta comentada
 *
 * O sigui que per cada foto es feia tot aixo per llencar-ho:
 *
 *   - DriveApp.getFileById(idfull).getParents()   (lectura a Drive)
 *   - getFoldersByName("IMATGES")                 (lectura a Drive)
 *   - shareFolderAsReader()                       (ESCRIPTURA de permisos,
 *                                                  a cada imatge, i la
 *                                                  carpeta ja estava
 *                                                  compartida)
 *   - base64Decode + newBlob + createFile         (escriptura del fitxer)
 *
 * Amb dues fotos per partida son sis anades i vingudes a Drive per res.
 *
 * Aixo substitueix la teva carregaimatge64(). La resta no s'ha de tocar:
 * segueix retornant un objecte amb .imatge, i nouResultat continua igual.
 *
 * Nota: si algun dia descomentes la part d'uploadFilesImatge() que escriu al
 * full, veuras que fa servir newURL.linkImatgeDrive per a una segona columna.
 * Aquella columna ja no te sentit: posa-hi newURL.imatge o lleva-la.
 */

function carregaimatge64(urlData, nom, idfull) {
  nom = nom.split(" ").join("_");

  uploadGithubFile(urlData, nom, idfull);

  // La ruta de GitHub es previsible: la columna ruta del full mes el nom.
  // Es el que es desa al full i el que l'app mostra.
  const githuburl =
    nom.split("-")[0] === "Imatge"
      ? "/imatges_jugadors/" + nom
      : "/" + dadesCampionat(idfull).ruta + "imatges/" + nom;

  console.log(githuburl);

  return { imatge: githuburl };
}

/**
 * shareFolderAsReader() i la carpeta IMATGES de cada campionat ja no fan
 * falta per a les fotos noves. Les que hi ha no s'esborren: el full de les
 * temporades velles encara pot dur enllaços de Drive a les seves columnes.
 */

const queryString = window.location.search;
const urlParams = Object.fromEntries(new URLSearchParams(queryString));

let fases = [
/* "Fase prèvia", */
  "Eliminatòria",
  "Vuitens de final",
  "Quarts de final",
  "Semifinals",
  "Final",
];

const macroURL =
  "https://script.google.com/macros/s/AKfycbwDcFyPQFV3B0bzeRxGU9yaTWhbA3PyR3SQZOQ1KEE5cU08SJb5QaOOfuXxwfVnuASk/exec";
let parameterId = urlParams.id || "no";
let parameterVista = urlParams.vista;
let parameterOptions = urlParams.options;
let vistaPredet = { page: parameterVista, options: parameterOptions };
let idfull = urlParams.idfull || "1-ebxdooo-hYzCJZu8n_h09hCKFVEW7xfrvreWdGAE38";
let idJSON = urlParams.idJSON || "1JzRVlf9_V8IEyVXJDO_Cx_Mx7S3rk27S";
let mostrapestanyes = urlParams.mostrapestanyes || "no";
console.log(mostrapestanyes);
if (mostrapestanyes === "si") {
  console.log("mostrapestanyes=si");
  document.getElementById("collapsetabs").classList.add("show");
  document.getElementById("pestanyes").checked = true;
  setStoredPestanyes("true");
}
const imatgeFixa =
  "https://www.infobae.com/new-resizer/izGq0GB3EIUlIN4fdPOhc_rT54c=/arc-anglerfish-arc2-prod-infobae/public/IPZBXHKPUJAOVHO662LV25OEOM.jpg";
let dades = [];
let aparellaments = [];
let rondes = [];
var trobada;
let partides = [];
var carrega = 0;
var userImg;
//var tema = document.documentElement.setAttribute("data-bs-theme", urlParams.tema ||"light")

const urlApp = window.location.href.split("?")[0] + "?";
let jugadorDefault = {
  Nom: "",
  Malnom2: "",
  Imatge:
    "https://drive.google.com/thumbnail?id=1smxezxXK12OGMJ-1uBu68aVAwBGaYSnE",
  ID: "1",
};
let jugadorDesat = {};

const vistesGenerals = [
  "rondes",

  "scrabbles",
  "jugada",
  "partida",
  "conjunta",
  "classificacio",
  "social",
  "immediatesa",
  "trobades",
  "rondes",
];
let vistesPartides = [];
const vistesNoSwipe = ["imatge", "formulari", "assistencia"];

function isLocalStorageAvailable() {
  if (navigator.cookieEnabled) {
    // Las cookies están habilitadas en el navegador
    console.log("les Cookies estan habilitades");
    return true;
  } else {
    // Las cookies no están habilitadas en el navegador
    console.log("les Cookies no estan habilitades");
    return false;
  }
}
function carregaUsuari() {
  if (isLocalStorageAvailable()) {
    // available
    let jugadorDesatNom = localStorage.getItem("jugador");
    if (parameterId != "no") {
      jugadorDesat =
        dades.filter((j) => j.ID == parameterId)[0] || jugadorDefault;
    } else {
      var jugadorTrobat =
        dades.filter((j) => j.Nom == jugadorDesatNom)[0] ||
        // abans s'hi desava l'ID: si el que hi ha es un ID, el migram al nom
        dades.filter((j) => j.ID == jugadorDesatNom)[0];
      jugadorDesat = jugadorTrobat || jugadorDefault;
      if (jugadorTrobat && jugadorTrobat.Nom != jugadorDesatNom) {
        localStorage.setItem("jugador", jugadorTrobat.Nom);
      }
    }
    //console.log(jugadorDesat)
  } else {
    // unavailable
    jugadorDesat =
      dades.filter((j) => j.ID == parameterId)[0] || jugadorDefault;
  }
}
document.addEventListener("DOMContentLoaded", iniciJSON());

// --- Carrega de dades amb fallback -----------------------------------------
// Aquest bloc es identic a totes les apps: copiar la carpeta per a una
// temporada nova ja funciona, no s'hi ha de tocar cap URL.

const FIREBASE_DB =
  "https://manacup-b195e-default-rtdb.europe-west1.firebasedatabase.app";

// El node de Firebase surt del cami de l'app: /manacup/26-27/ dona
// "manacup/26-27", que es exactament la columna ruta del full de campionats.
// Per aixo no cal configurar res per app.
function urlFirebase() {
  if (typeof urlParams !== "undefined" && urlParams.firebase !== undefined) {
    return urlParams.firebase; // ?firebase= buit deixa nomes l'Apps Script
  }
  var ruta = window.location.pathname
    .replace(/[^/]*\.html$/, "")
    .replace(/^\/+|\/+$/g, "");
  return ruta ? FIREBASE_DB + "/campionats/" + ruta + "/dades.json" : "";
}

// Ordre de fonts: la primera que respongui amb dades valides guanya. Si falla
// (xarxa, HTTP, o una resposta que no son les dades esperades) es prova la
// seguent. Aixi la font rapida no es un punt unic de fallada.
function fontsDeDades(fitxerLocal) {
  if (fitxerLocal) {
    return [{ nom: "fitxer local", url: fitxerLocal }];
  }
  var fonts = [];
  var fb = urlFirebase();
  if (fb) {
    // Timeout curt: si la font rapida no ho es, millor caure a l'Apps Script
    // que no fer esperar l'usuari.
    fonts.push({ nom: "Firebase", url: fb, timeout: 6000 });
  }
  // Amb idfull, el doGet pot refer el JSON llegint el full en lloc de servir
  // una copia desada: el pla B deixa de dependre de cap fitxer intermedi i
  // no pot quedar desfasat. L'idJSON hi va per compatibilitat.
  var urlGAS = macroURL + "?page=JSON&idJSON=" + idJSON;
  if (typeof idfull !== "undefined" && idfull) {
    urlGAS += "&idfull=" + idfull;
  }
  fonts.push({ nom: "Apps Script", url: urlGAS, timeout: 45000 });
  return fonts;
}

// Comprova que la resposta son realment les dades del campionat.
// Ens basem en camps que hi son sempre: un node de Firebase que no existeix
// torna null, i una pagina d'error HTML ja peta abans al .json().
//
// No podem exigir que hi siguin les llistes: Firebase no desa els arrays
// buits, els esborra. Un campionat que comenca amb aparellaments buit no
// tornaria aquella clau i rebutjariem unes dades perfectament bones.
function dadesValides(data) {
  return (
    data != null &&
    typeof data === "object" &&
    !Array.isArray(data) &&
    typeof data.campionat === "string" &&
    data.campionat !== ""
  );
}

// Un array buit no torna de Firebase, i un amb forats torna com a objecte de
// claus numeriques. La resta de l'app fa .filter() sobre aquestes llistes
// sense comprovar res, o sigui que les reposem aqui.
function aArray(valor) {
  if (Array.isArray(valor)) return valor;
  if (valor == null) return [];
  if (typeof valor === "object") {
    return Object.keys(valor)
      .sort(function (a, b) {
        return a - b;
      })
      .map(function (clau) {
        return valor[clau];
      });
  }
  return [];
}

function normalitzaDades(data) {
  ["dades", "calendari", "aparellaments", "partides"].forEach(function (clau) {
    data[clau] = aArray(data[clau]);
  });
  // Sense trobada, false: es el mateix que envia el generador quan no n'hi ha
  // cap, i es el que la resta del codi ja sap tractar.
  if (data.trobades == null) data.trobades = false;
  return data;
}

function baixaJSON(url, timeout) {
  var controlador = new AbortController();
  var temporitzador = setTimeout(function () {
    controlador.abort();
  }, timeout || 45000);
  return fetch(url, { signal: controlador.signal })
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error("HTTP " + resposta.status);
      }
      return resposta.json();
    })
    .finally(function () {
      clearTimeout(temporitzador);
    });
}

function carregaDades(fitxerLocal) {
  return fontsDeDades(fitxerLocal).reduce(function (cadena, font) {
    return cadena.catch(function (motiu) {
      if (motiu) {
        console.warn("Font descartada:", font.nom, "->", motiu.message || motiu);
      }
      var inici = Date.now();
      return baixaJSON(font.url, font.timeout).then(function (data) {
        if (!dadesValides(data)) {
          throw new Error("resposta sense les dades esperades");
        }
        console.log("Dades de " + font.nom + " en " + (Date.now() - inici) + " ms");
        return normalitzaDades(data);
      });
    });
    // El motiu inicial es null: no es cap fallada, nomes arrenca la cadena.
  }, Promise.reject(null));
}

function iniciJSON(vista) {
  carregant();
  carrega = 0;
  // Crida a l'API del Google Apps Script
  carregaDades()
    .then((data) => {
      // Process dataTrobades, dataJugadors, etc.
      // ...
      // Example: Accessing data from the 'trobades' response
    trobada = data.trobades;
      if (trobada.Confirmat=="TRUE") {
        document.querySelectorAll(".trobades").forEach(t=>t.classList.remove("disabled"))
        var assistents = trobada.assistents;
        assistents.map((w) => {
          w.Primera_partida = w.Primera_partida + w.Adv1;
          w.Segona_partida = w.Segona_partida + w.Adv2;
        });
      }
      // Process 'trobades' data...

      // Example: Accessing data from the 'jugadors' response
      dades = data.dades;
      // Process 'jugadors' data...
      dades.forEach((jug) => {
        jug.partides = data.partides.filter((item)=>{ 
          item.Jugador1 === jug.Nom 
          && item.Estat != "none"           
        })
        var jugadorsOpt = document.getElementById("jugadors");
        jugadorsOpt.innerHTML += `<option value="${jug.ID}">${jug.Nom}</option>`;
      });
      document.getElementById("loaded").innerHTML = "<span>loaded2</span>";
console.log(dades)
      // Example: Accessing data from the 'aparellaments' response
      aparellaments = data.aparellaments.filter((p) => p.ID > 0);
      // Process 'aparellaments' data...

      // Example: Accessing data from the 'calendari' response
      rondes = data.calendari.filter((p) => p.Estat != "none");
      // Process 'calendari' data...

      // Example: Accessing data from the 'partides' response
      partides = data.partides;
      // Process 'partides' data...

      // Continue with your logic here..
      recuperaPartides();
      carregaUsuari();
      renderUserCard(jugadorDesat);
      swipe();
      loadPagina(vista);
    })
    .catch((error) => console.error("Error:", error));
}
function recuperaPartides() {
  //if ((carrega = 2)) {
    dades.forEach((jug) => {
      jug.partides = partides.filter((partida) => partida.Jugador1 == jug.Nom);
    });
  //}
}

function loadPagina(vista) {
 
  clearInterval(interval);
 // if (carrega == 2) {
    if (trobada.Confirmat=="TRUE" && vista === undefined) {
     
      loadContent(parameterVista ? vistaPredet : ["trobades"]);
      updateHistory(parameterVista ? vistaPredet : ["trobades"]);
    } else {
      loadContent(parameterVista ? vistaPredet : ["rondes"]);
      updateHistory(parameterVista ? vistaPredet : ["rondes"]);
    }
 // }
}

function preventFormSubmit() {
  var forms = document.querySelectorAll("form");
  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function (event) {
      event.preventDefault();
    });
  }
}

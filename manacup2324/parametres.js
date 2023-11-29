const queryString = window.location.search;
const urlParams = Object.fromEntries(new URLSearchParams(queryString));

const macroURL =
  "https://script.google.com/macros/s/AKfycbwDcFyPQFV3B0bzeRxGU9yaTWhbA3PyR3SQZOQ1KEE5cU08SJb5QaOOfuXxwfVnuASk/exec";
let parameterId = urlParams.id || "no";
let parameterVista = urlParams.vista;
let parameterOptions = urlParams.options;
let vistaPredet = { page: parameterVista, options: parameterOptions };
let idfull = urlParams.idfull;
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
    "https://drive.google.com/uc?export=download&id=1smxezxXK12OGMJ-1uBu68aVAwBGaYSnE",
  ID: "1",
};
let jugadorDesat = {};

const vistesGenerals = [
  "classificacio",
  "scrabbles",
  "jugada",
  "partida",
  "conjunta",
  "social",
  "immediatesa",
  "rondes",
  "trobades",
  "classificacio",
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
    let jugadorDesatId = JSON.parse(localStorage.getItem("jugador"));
    var jugid = parameterId != "no" ? parameterId : jugadorDesatId;
    //console.log(jugid,parameterId,jugadorDesatId)
    jugadorDesat = dades.filter((j) => j.ID == jugid)[0] || jugadorDefault;
    //console.log(jugadorDesat)
  } else {
    // unavailable
    jugadorDesat =
      dades.filter((j) => j.ID == parameterId)[0] || jugadorDefault;
  }
}
document.addEventListener("DOMContentLoaded", iniciJSON());

function iniciJSON(vista) {
  carregant();
  carrega = 0;
  // Crida a l'API del Google Apps Script
  fetch(macroURL + "?page=jugadors&idfull=" + idfull)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      dades = data.dades;
      recuperaPartides();
      carregaUsuari();
      renderUserCard(jugadorDesat);
      carrega++;

      loadPagina(vista);
      dades.forEach((jug) => {
        var jugadorsOpt = document.getElementById("jugadors");
        jugadorsOpt.innerHTML += `<option value="${jug.ID}">${jug.Nom}</option>`;
      });
      document.getElementById("loaded").innerHTML = "<span>loaded2</span>";
      swipe();
    })
    .catch((error) => console.error("Error:", error));
  fetch(macroURL + "?page=aparellaments&idfull=" + idfull)
    .then((response) => response.json())
    .then((data) => {
      aparellaments = data.aparellaments.filter((p) => p.ID > 0);
      // carrega++;
      loadPagina(vista);
    })
    .catch((error) => console.error("Error:", error));
  fetch(macroURL + "?page=calendari&idfull=" + idfull)
    .then((response) => response.json())
    .then((data) => {
      rondes = data.calendari.filter((p) => p.Estat != "none");
      //carrega++;
    })
    .catch((error) => console.error("Error:", error));
  fetch(macroURL + "?page=trobades&idfull=" + idfull)
    .then((response) => response.json())
    .then((data) => {
      trobada = data.trobades;
      carrega++;
      if (trobada) {
        vista="trobades"
        var assistents = trobada.assistents;
        assistents.map((w) => {
          w.Primera_partida = w.Primera_partida + w.Adv1;
          w.Segona_partida = w.Segona_partida + w.Adv2;
        });
      }
      loadPagina(vista);
    })
    .catch((error) => console.error("Error:", error));
  fetch(macroURL + "?page=partides&idfull=" + idfull)
    .then((response) => response.json())
    .then((data) => {
      partides = data.partides;
      recuperaPartides();
      loadPagina(vista);
    })
    .catch((error) => console.error("Error:", error));
}
function recuperaPartides() {
  if ((carrega = 2)) {
    dades.forEach((jug) => {
      jug.partides = partides.filter((partida) => partida.Jugador1 == jug.Nom);
    });
  }
}

function loadPagina(vista) {
  clearInterval(interval);
  if (carrega == 2) {
    if (vista || !trobada) {
      loadContent(parameterVista ? vistaPredet : ["classificacio"]);
      updateHistory(parameterVista ? vistaPredet : ["classificacio"]);
    } else {
      loadContent(parameterVista ? vistaPredet : ["trobades"]);
      updateHistory(parameterVista ? vistaPredet : ["trobades"]);
    }
  }
}

function preventFormSubmit() {
  var forms = document.querySelectorAll("form");
  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function (event) {
      event.preventDefault();
    });
  }
}

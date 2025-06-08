const queryString = window.location.search;
const urlParams = Object.fromEntries(new URLSearchParams(queryString));

let fases = [
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
let idfull = urlParams.idfull || "1b-Icl4KoOwiVY9rM1vxSUA7JLnqNAuM7AoTCwbotoCU";
let idJSON = urlParams.idJSON || "15F2avAHG-mszR32M1oMD-owJ0yDV097W";
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
  var myHeaders = new Headers();
  var myInit = {
    method: "GET",
    headers: myHeaders,
    mode: "no-cors",
    cache: "default",
  };
  Promise.all([
    fetch(macroURL + "?page=JSON&idJSON=" + idJSON),
    //fetch("xampions24.json"),
    
  ])
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then(([data]) => {
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
  console.log(!!trobada && vista === undefined);
  clearInterval(interval);
 // if (carrega == 2) {
    if (!!trobada && vista === undefined) {
      console.log("yeah");
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
const queryString = window.location.search;
//console.log(queryString);
const urlParams = Object.fromEntries(new URLSearchParams(queryString));
//console.log(urlParams);


const macroURL = "https://script.google.com/macros/s/AKfycbwDcFyPQFV3B0bzeRxGU9yaTWhbA3PyR3SQZOQ1KEE5cU08SJb5QaOOfuXxwfVnuASk/exec"
let parameterId = urlParams.id || "no"
let parameterVista = urlParams.vista
let parameterOptions = urlParams.options
let vistaPredet = { page: parameterVista, options: parameterOptions };
let idfull = urlParams.idfull
let plantilla = urlParams.plantilla || "d-none"
document.getElementById("collapsetabs").classList.add(plantilla)
const imatgeFixa =
  "https://www.infobae.com/new-resizer/izGq0GB3EIUlIN4fdPOhc_rT54c=/arc-anglerfish-arc2-prod-infobae/public/IPZBXHKPUJAOVHO662LV25OEOM.jpg";
let dades = [];
let aparellaments = [];
let rondes = [];
var trobada;
var carrega = 0;
var userImg 

const urlApp = window.location.href.split('?')[0] + "?";
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
    jugadorDesat = dades.filter((j) => j.ID == parameterId)[0] || jugadorDefault;
  }
}
document.addEventListener("DOMContentLoaded", iniciJSON());

function iniciJSON(vista) {
  carregant()
  carrega = 0;
  // Crida a l'API del Google Apps Script
  fetch(
    macroURL+"?page=JSON&idfull="+idfull
  )
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      dades = data.dades;
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

      aparellaments = data.aparellaments.filter((p) => p.ID > 0);
        carrega++;
        loadPagina(vista);

      rondes = data.calendari.filter((p) => p.Estat != "none");
      carrega++;

      trobada = data.trobades;
        carrega++;
        if (trobada) {
            var assistents = trobada.assistents;
            assistents.map((w) => {
            w.Primera_partida = w.Primera_partida + w.Adv1;
            w.Segona_partida = w.Segona_partida + w.Adv2;
            });
        }
      loadPagina(vista);

      // Obtenir el div per ID
      /*  var responseDiv = document.getElementById('responseDiv');
        
        // Convertir les dades JSON a cadena de text
        var jsonString = JSON.stringify(data, null, 2);

        // Afegir la cadena de text al contingut del div
        responseDiv.innerText = jsonString; */

      // Aquí pots fer altres coses amb les dades JSON
    })
    .catch((error) => console.error("Error:", error));
}

function loadPagina(vista) {
  if (carrega == 4) {
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
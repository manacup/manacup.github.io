let dades = [];
let aparellaments = [];
let rondes = [];
var trobada;
let partides = [];
var carrega = 0;
var userImg;

const urlApp = window.location.href.split("?")[0] + "?";
let jugadorDefault = {
  Nom: "jugador anònim",
  Malnom2: "",
  Imatge: "/icons/Imatge-default.jpg",
  ID: 0,
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
document.addEventListener("DOMContentLoaded", iniciJSON(false));

function iniciJSON(turbo,vista) {
  usaJSONfixe?turbo=true:""
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
    fetch(turbo ? JSONfixe : macroURL + "?page=JSON&idJSON=" + idJSON),    
  ])
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then(([data]) => {
      // Process dataTrobades, dataJugadors, etc.
      // ...
      // Example: Accessing data from the 'trobades' response
      trobada = data.trobades;
      if (trobada) {
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
        /*  jug.partides = data.partides.filter((item)=>{ 
          item.Jugador1 === jug.Nom 
          && item.Estat != "none"           
        }) */
        var jugadorsOpt = document.getElementById("jugadors");
        jugadorsOpt.innerHTML += `<option value="${jug.ID}">${jug.Nom}</option>`;
      });
      document.getElementById("loaded").innerHTML = "<span>loaded2</span>";
      console.log(dades);
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
      document.getElementById("nomcampionat").innerText = data.campionat;
      document.getElementById("temporada").innerText = data.temporada;
    })
    .catch((error) => console.error("Error:", error));
}
function recuperaPartides() {
  // if ((carrega == 2)) {
  dades.forEach((jug) => {
    jug.partides = partides
      .filter((partida) => partida.Jugador1 == jug.Nom)
      .sort((a, b) => a.Ronda - b.Ronda);
  });
  // }
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
    loadContent(parameterVista ? vistaPredet : ["classificacio"]);
    updateHistory(parameterVista ? vistaPredet : ["classificacio"]);
  }
  //}
}

function preventFormSubmit() {
  var forms = document.querySelectorAll("form");
  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function (event) {
      event.preventDefault();
    });
  }
}

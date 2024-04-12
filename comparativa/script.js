const macroURL =
  "https://script.google.com/macros/s/AKfycbzI7IQHgb4g4T_7KVuTwW8Wm-nYFKnUz8VZTNKCo-iQW7-Hf2di1db1c3DE55Jar_WTVA/exec";
var data = llistaJugadorsBarruf();
var dades = {};
const selectJugador = document.getElementById("jugador");
const selectAdversari = document.getElementById("adversari");
const selectCampionat = document.getElementById("campionats");
const llistaResposta = document.getElementById("resposta");
const text = document.getElementById("estadistica");
let partides = [];
let campionatsTotals = [];
let campionatsJugador = [];

function canvia() {
  spinner("");
  var jugador = selectJugador.value;
  //var adversari = selectAdversari.value;
  var adversari = "";
  llistaResposta.innerHTML = "";
  text.innerHTML = "";
  campionatsJugador = dades[jugador];
  document.getElementById("adv").classList.remove("d-none");
  document.getElementById("camp").classList.remove("d-none");

  iniciJSON(jugador, campionatsJugador);

  //spinner("d-none");
}

function mostraOK() {
  const optarr = selectAdversari.querySelectorAll("option");
  optarr.forEach((op) => op.classList.add("d-none"));
  optarr[0].classList.remove("d-none");

  const optarrcamp = selectCampionat.querySelectorAll("option");
  optarrcamp.forEach((op) => op.classList.add("d-none"));
  optarrcamp[0].classList.remove("d-none");

  console.log(partides);
  var campionat;
  var adversaris = [];

  partides.forEach((partida) => {
    if (partida.campionat != campionat) {
      campionat = partida.campionat;

      const campionattemplate = `
<li class="list-group-item d-flex  align-items-center active campionat" data-camp="${partida.campionat}" onclick="collapse('${partida.campionat}')">${partida.campionat}</li>
`;
      llistaResposta.innerHTML += campionattemplate;

      selectCampionat
        .querySelector("option[value='" + campionat + "']")
        .classList.remove("d-none");
    }
    const partidatemplate = `
<li class="list-group-item d-flex align-items-center partida" data-bs-toggle="modal" data-bs-target="#partidaModal" onclick="recuperaPartida('${partida.campionat}',${partida.row})" data-camp="${partida.campionat}">${partida.jugador} (${partida.puntsJugador}-${partida.puntsAdversari}) ${partida.adversari}</li>
`;
    llistaResposta.innerHTML += partidatemplate;
    adversaris.push(partida.adversari);

    selectAdversari
      .querySelector("option[value='" + partida.adversari + "']")
      .classList.remove("d-none");
  });

  mostraestadistica();
}
function mostraestadistica() {
  text.innerHTML = "";
  var partidesFiltrades;
  if (selectAdversari.value != "" || selectCampionat.value != "") {
    if (selectAdversari.value != "") {
      partidesFiltrades = partides.filter(
        (part) => part.adversari == selectAdversari.value
      );
    } else if (selectCampionat.value != "") {
      partidesFiltrades = partides.filter(
        (part) => part.campionat == selectCampionat.value
      );
    }
  } else {
    partidesFiltrades = partides;
  }
  var campionat;

  var scrabbles = 0;
  var mot = "";
  var puntsmot = 0;
  var puntsfavor = 0;
  var puntscontra = 0;
  var totalPartides = partidesFiltrades.length;
  var victories = 0;
  var campionats = 0;

  partidesFiltrades.forEach((partida) => {
    if (partida.scrabbles > 0) {
      scrabbles += partida.scrabbles;
    }
    if (partida.puntsMot > puntsmot) {
      puntsmot = partida.puntsMot;
      mot = partida.mot;
    }
    if (partida.puntsJugador > partida.puntsAdversari) {
      victories++;
    }
    puntsfavor += partida.puntsJugador;
    puntscontra += partida.puntsAdversari;
    if (partida.campionat != campionat) {
      campionat = partida.campionat;
      campionats++;
    }
  });
  text.innerHTML += `<li class="list-group-item d-flex align-items-center">${totalPartides} partides computades en ${campionats} competicions.</li>`;
  text.innerHTML += `<li class="list-group-item d-flex align-items-center">Victòries: ${victories}</li>`;
  text.innerHTML += `<li class="list-group-item d-flex align-items-center">Total punts a favor: ${puntsfavor}</li>`
  text.innerHTML += `<li class="list-group-item d-flex align-items-center">Mitjana punts a favor: ${(
    puntsfavor / totalPartides
  ).toFixed(2)}</li>`;
  text.innerHTML += `<li class="list-group-item d-flex align-items-center">Total punts en contra: ${puntscontra}</li>`
  text.innerHTML += `<li class="list-group-item d-flex align-items-center">Diferencial: ${puntsfavor-puntscontra}</li>`
  text.innerHTML += `<li class="list-group-item d-flex align-items-center">Mitjana del diferencial: ${(
    (puntsfavor - puntscontra) /
    totalPartides
  ).toFixed(2)}</li>`;
  text.innerHTML += `<li class="list-group-item d-flex align-items-center">Total Scrabbles computats: ${scrabbles}</li>`;
  text.innerHTML += `<li class="list-group-item d-flex align-items-center">Millor jugada computada: ${mot} ( ${puntsmot})</li>`;
}

function llistaJugadorsBarruf() {
  // Crida a l'API del Google Apps Script
  var myHeaders = new Headers();
  var myInit = {
    method: "GET",
    headers: myHeaders,
    mode: "no-cors",
    cache: "default",
  };
  Promise.all([fetch(macroURL + "?page=jugadors")])
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then(([data]) => {
      console.log(data);
      dades = data.dades;
      campionatsTotals = data.campionats;
      let jugadors = Object.keys(dades);
      document.querySelectorAll(".seljugadors").forEach((sel) => {
        for (index in jugadors) {
          sel.options[sel.options.length] = new Option(
            jugadors[index],
            jugadors[index]
          );
        }
        for (index in campionatsTotals) {
          selectCampionat.options[selectCampionat.options.length] = new Option(
            campionatsTotals[index],
            campionatsTotals[index]
          );
        }
      });
      spinner("d-none");
    })
    .catch((error) => console.error("Error:", error));
}

function iniciJSON(jugador, campionatsJugador) {
  console.log(campionatsJugador);
  // Crida a l'API del Google Apps Script

  /* const optarr = selectAdversari.querySelectorAll("option");
  optarr.forEach((op) => op.classList.add("d-none"));
  optarr[0].classList.remove("d-none"); */
  var myHeaders = new Headers();
  var myInit = {
    method: "GET",
    headers: myHeaders,
    mode: "no-cors",
    cache: "default",
  };
  var jugador = encodeURIComponent(jugador);
  var campionatsJugador = encodeURIComponent(JSON.stringify(campionatsJugador));
  console.log(campionatsJugador);

  Promise.all([
    fetch(
      macroURL +
        "?page=JSON&jugador=" +
        jugador +
        "&campionats=" +
        campionatsJugador
    ),
  ])
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then(([data]) => {
      // Process dataTrobades, dataJugadors, etc.
      // ...
      // Example: Accessing data from the 'trobades' response
      partides = data.dades;

      // Process 'trobades' data...

      // Example: Accessing data from the 'jugadors' response

      // Continue with your logic here..

      mostraOK();
      spinner("d-none");
    })
    .catch((error) => console.error("Error:", error));
}
function spinner(estat) {
  var spinner = document.getElementById("spinner");
  if (estat == "d-none") {
    spinner.classList.add("d-none");
  } else {
    spinner.classList.remove("d-none");
  }
}
function recuperaPartida(full, row) {
  spinner("");
  // Crida a l'API del Google Apps Script
  var myHeaders = new Headers();
  var myInit = {
    method: "GET",
    headers: myHeaders,
    mode: "no-cors",
    cache: "default",
  };
  Promise.all([
    fetch(macroURL + "?page=partida&full=" + encodeURI(full) + "&row=" + row),
  ])
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then(([data]) => {
      //console.log(data.dades)
      let partida = data.dades;
      partida.campionat = full;

      mostraPartida(partida);
    })
    .catch((error) => console.error("Error:", error));
}
function mostraPartida(partida) {
  var body = document.getElementById("partidaModalBody");
  document.getElementById("partidaModalTitol").innerHTML = partida.campionat;
  const partidaTemplate = `
    
      <div class="p-1">
        <div class="d-flex align-items-center p-2">
          <h1 class="flex-grow-1">Ronda ${partida.Ronda}</h1>        
        </div>
        <div class="card mb-4 ">
          <div class="text-center position-relative">
       
            <div class="d-flex justify-content-center">
              <div class="input-group mt-4 d-flex justify-content-center">
                <span class="input-group-text ${
                  partida.Puntuacio_1 > partida.Puntuacio_2
                    ? "bg-primary text-white"
                    : ""
                }">
                <span class="display-1">${partida.Puntuacio_1}</span>
                </span>
                <span class=" input-group-text  ${
                  partida.Puntuacio_2 > partida.Puntuacio_1
                    ? "bg-primary text-white"
                    : ""
                }">
                <span class="display-1">${partida.Puntuacio_2}</span>
                </span>
              </div>
            </div>
            <div class="text-muted mb-3">Suma: ${
              partida.Puntuacio_1 + partida.Puntuacio_2
            }</div>
            <div class="d-flex justify-content-center mb-4">
              <div class="col align-items-start">
                <h4 class="m-2 nom">${partida.Jugador1}</h4>
                <div class="d-flex flex-column align-items-center">
                  <div class="card m-2 p-2 w-75 bg-primary bg-opacity-25 rounded-4 ${
                    !partida.Mot_1 ? "d-none" : ""
                  }">
                    <small>Millor jugada</small>
                    <h6 class="m-2 mot">${partida.Mot_1 || "?"}</h6>
                    <h4>${partida.Puntsmot_1 || "?"}</h4>
                    <small class="text-muted">Punts</small>
                  </div>
                  <div class="card m-2 p-2 w-75 bg-primary bg-opacity-25 rounded-4 ${
                    !partida.Scrabbles_1 ? "d-none" : ""
                  }">
                    <small>Scrabbles</small>
                    <h4>${partida.Scrabbles_1 || "?"}</h4>
                  </div>
                </div>
              </div>
              <div class="vr"></div>
              <div class="col align-items-end">
                <h4 class="m-2 nom">${partida.Jugador2}</h4>
                <div class="d-flex flex-column align-items-center">
                  <div class="card m-2 p-2 w-75 bg-primary bg-opacity-25 rounded-4 ${
                    !partida.Mot_2 ? "d-none" : ""
                  }">
                    <small>Millor jugada</small>
                    <h6 class="m-2 mot">${partida.Mot_2 || "?"}</h6>
                    <h4>${partida.Puntsmot_2 || "?"}</h4>
                    <small class="text-muted">Punts</small>
                  </div>
                  <div class="card m-2 p-2 w-75 bg-primary bg-opacity-25 rounded-4 ${
                    !partida.Scrabbles_2 ? "d-none" : ""
                  }">
                    <small>Scrabbles</small>
                    <h4>${partida.Scrabbles_2 || "?"}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="carouselExampleControls" class="carousel slide mb-4" data-bs-ride="carousel">
          <div class="carousel-inner" >
            <div class="carousel-item active quadrat">
              <img src="${
                partida.Full || ""
              }" class="d-block  rounded cover img-fluid" onclick="loadContent(['imatge',this])">
            </div>
            <div class="carousel-item quadrat">
              <img src="${
                partida.Tauler || ""
              }" class="d-block rounded cover img-fluid" onclick="loadContent(['imatge',this])">
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
    <p class="${
      !partida.Data ? "d-none" : ""
    }">Resultats enviats el ${ExcelDateToJSDate(partida.Data || "?")}</p>
        <blockquote class="blockquote bg-danger bg-opacity-25 mb-4" style="border-left: 2px solid red;">
          <div class="mb-0 p-3 ${!partida.Comentaris ? "d-none" : ""}">${
    partida.Comentaris
  }</div>
        </blockquote>
   
      </div>
          
  `;

  body.innerHTML = partidaTemplate;
  spinner("d-none");
}
function ExcelDateToJSDate(serial) {
  var utc_days = Math.floor(serial - 25569);
  var utc_value = utc_days * 86400;
  var date_info = new Date(utc_value * 1000);

  var fractional_day = serial - Math.floor(serial) + 0.0000001;

  var total_seconds = Math.floor(86400 * fractional_day);

  var seconds = total_seconds % 60;

  total_seconds -= seconds;

  var hours = Math.floor(total_seconds / (60 * 60));
  var minutes = Math.floor(total_seconds / 60) % 60;
  var jsdate = new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds
  );
  return jsdate.toLocaleDateString();
}
selectJugador.addEventListener("change", () => {
  canvia();
  selectAdversari.selectedIndex = 0;
  selectCampionat.selectedIndex = 0;
  /* selectAdversari
    .querySelectorAll("option")
    .forEach((op) => op.classList.remove("d-none")); */
});
selectAdversari.addEventListener("change", (op) => {
  selectCampionat.selectedIndex = 0;
  var adv = op.target.value;
  var camp = [];
  llistaResposta.querySelectorAll(".partida").forEach((li) => {
    var index = li.innerHTML.indexOf(adv);
    if (index < 0) {
      li.classList.add("d-none");
    } else {
      li.classList.remove("d-none");
      camp.push(li.dataset.camp);
    }
  });
  console.log(camp);
  llistaResposta.querySelectorAll(".campionat").forEach((li) => {
    console.log(li.dataset.camp);
    if (camp.indexOf(li.dataset.camp) < 0) {
      li.classList.add("d-none");
    } else {
      li.classList.remove("d-none");
    }
  });
  mostraestadistica();
});
selectCampionat.addEventListener("change", (op) => {
  selectAdversari.selectedIndex = 0;
  var campi = op.target.value;
  
  llistaResposta.querySelectorAll("li").forEach((li) => {
    var index = li.dataset.camp.indexOf(campi);

    if (index < 0) {
      li.classList.add("d-none");
    } else {
      li.classList.remove("d-none");
    }
  });
  console.log(campi);

  mostraestadistica();
});
function collapse(campi){
  llistaResposta.querySelectorAll(".partida").forEach((li) => {
    var index = li.dataset.camp

    if (index == campi) {
      li.classList.toggle("d-none");
    }
  });
}
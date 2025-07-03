const pageHistory = [];
const partidesHistory = ["home"];
const validador = "https://diccionari.totescrable.cat/validador/";
const blog = "https://scrabblemanacor.wordpress.com/";
const rellotge = "https://manacup.github.io/rellotgeScrabble/index.html";

let currentPage = "home";

// Función para cargar contenido en la página
function loadContent(vista) {
  var tootltip = document.querySelector(".tooltip");
  if (tootltip) {
    tootltip.remove();
  }
  if (pageHistory.length != 0) {
    document.getElementById("botoEnrera").classList.remove("d-none");
  } else {
    document.getElementById("botoEnrera").classList.add("d-none");
  }
  ves("body");
  let page = vista.page || vista[0];
  let options = vista.options || vista[1];
  let contentDiv = document.getElementById("content");
  let navbarTitle = document.getElementById("navbar-title");
  contentDiv.innerHTML = "";
  switch (page) {
    case "actualitza":
      actualitzaJSON()
      break;
      case "editatrobada":
      navbarTitle.innerHTML = "Edita la trobada";
      editaTrobadaForm(trobada)
      break
    case "home":
      contentDiv.innerHTML =
        "<h1>Página d'inici</h1><p>Benvingut a la primera pàgina</p>";
      break;
    case "classificacio":
      navbarTitle.innerHTML = "Victòries";
      contentDiv.innerHTML += `<div class="p-1" id="ordenarBoto"><i id="icona" class="float-end bi bi-sort-numeric-down" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Ordena per victòries totals o de grup."></i></div>`;
      var div = document.createElement("div");
      div.id = "subcontent";
      /* div.classList.add("row-md-8");
      div.classList.add("justify-content-center"); */
      div.classList.add("p-0");
      contentDiv.appendChild(div);

      function ordreClassificacio(a, b) {
        var posicioordre = a.Posició - b.Posició;
        return posicioordre;
      }

      dades.sort(ordreClassificacio);

      var ordrejug = 1;
      dades.forEach((jugador) => {
        jugador.percentatgeVictories =
          parseInt(jugador.Punts) / parseInt(jugador.PartidesJugades);
        renderClassificacio(jugador);
      });
      var ordenada = false;
      var icona = document.getElementById("icona");
      document.getElementById("ordenarBoto").addEventListener("click", () => {
        // Llama a la función de ordenar la tabla por la segunda columna (Edad)
        if (!ordenada) {
          ordenarLlistaGrup();
          ordenada = true;
          icona.classList.add("bi-list-ol");
          icona.classList.remove("bi-sort-numeric-down");
        } else {
          ordenarLlistaPunts();
          ordenada = false;
          icona.classList.remove("bi-list-ol");
          icona.classList.add("bi-sort-numeric-down");
        }
      });
      contentDiv.querySelectorAll(".card").forEach((nom) => {
        var id = nom.dataset.id;
        //console.log(id)
        nom.addEventListener("click", () => {
          loadContent(["detall", id]);
          updateHistory(["detall", id]);
        });
      });

      break;
    case "conjunta":
      navbarTitle.innerHTML = `Partida conjunta`;
      contentDiv.innerHTML += `<div class="p-1" id="ordenarBoto"><i id="icona" class="float-end bi bi-calendar3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Ordena per data o per punts."></i></div>`;
      var div = document.createElement("div");
      div.id = "subcontent";
      //div.classList.add("row-md-8");
      //div.classList.add("justify-content-center");
      div.classList.add("p-0");
      contentDiv.appendChild(div);
      function ordreConjunta(a, b) {
        return b.Suma_punts - a.Suma_punts;
      }
      var aparellamentsordenats = aparellaments.sort(ordreConjunta);
      var partidesfilt = aparellamentsordenats.filter((j) => j.Suma_punts > 1);
      partidesfilt.forEach((jugador) => {
        renderConjunta(jugador);
      });
      var ordenada = false;
      var icona = document.getElementById("icona");
      document.getElementById("ordenarBoto").addEventListener("click", () => {
        // Llama a la función de ordenar la tabla por la segunda columna (Edad)
        if (!ordenada) {
          ordenarLlistaData();
          ordenada = true;
          icona.classList.add("bi-list-ol");
        } else {
          ordenarLlistaPunts();
          ordenada = false;
          icona.classList.remove("bi-list-ol");
        }
      });
      vistesPartides = aparellamentsordenats.map((ap) => ap.ID.toString());

      break;
    case "rondes":
      navbarTitle.innerHTML = "Fases";
      function ordreRondes(a, b) {
        return b.Ronda - a.Ronda;
      }
      rondes.sort(ordreRondes);

      rondes.forEach((ronda) => {
        renderRondes(ronda);
      });

      break;

    case "ronda":
      navbarTitle.innerHTML = fases[options - 1];

      /* function ordreConjunta(a, b) {
        return b.Suma_punts - a.Suma_punts;
      }
      aparellaments.sort(ordreConjunta); */

      var partidesfilt = aparellaments.filter((j) => j.Ronda == options);
      //console.log(partidesfilt)
      var partidesfiltagrupades = groupById(partidesfilt);
      //console.log(partidesfiltagrupades);
      var grup = "";
      partidesfiltagrupades.forEach((partida) => {
        if (
          dades.filter(
            (j) => j.Nom == partida.Jugador1 || j.Nom == partida.Jugador2
          )[0].Baixa != "TRUE"
        ) {
          if (partida.Grup != grup) {
            grup = partida.Grup;
            document.getElementById("content").innerHTML +=
              "<h6>Grup " + grup + "</h6>";
          }
          partida.totalPunts_1 =
            partida.resultats[0].Puntuacio_1 + partida.resultats[1].Puntuacio_1;
          partida.totalPunts_2 =
            partida.resultats[0].Puntuacio_2 + partida.resultats[1].Puntuacio_2;
          renderAparellaments(partida);
        }
      });
      vistesPartides = partidesfilt.map((ap) => ap.ID.toString());

      break;
    case "faseeliminatoria":
      navbarTitle.innerHTML = fases[options - 1];
      var partidesfilt = partides.filter((j) => j.Ronda == options);
      var partidesfiltagrupades = groupByJug(partidesfilt);
      console.log(partidesfiltagrupades);
      partidesfiltagrupades.map((j) => {
        j.guanyades1 = 0
          if( Number(j.resultats[0].Puntuacio_1)>Number(j.resultats[0].Puntuacio_2){
          j.guanyades1 ++
          }
        if( Number(j.resultats[1].Puntuacio_1)>Number(j.resultats[1].Puntuacio_2){
          j.guanyades1 ++
          }
         j.guanyades2 = 0
          if( Number(j.resultats[0].Puntuacio_1)<Number(j.resultats[0].Puntuacio_2){
          j.guanyades2 ++
          }
        if( Number(j.resultats[1].Puntuacio_1)<Number(j.resultats[1].Puntuacio_2){
          j.guanyades2 ++
          }
        j.totalPunts1 =
          Number(j.resultats[0].Puntuacio_1) +
          Number(j.resultats[1].Puntuacio_1);
        j.totalPunts2 =
          Number(j.resultats[0].Puntuacio_2) +
          Number(j.resultats[1].Puntuacio_2);
        if (j.totalPunts1 + j.totalPunts2 != 0) {
          j.puntsEliminatoria1 =
            j.totalPunts1 > j.totalPunts2
              ? 1
              : j.totalPunts1 == j.totalPunts2
              ? 0.5
              : 0;
          j.puntsEliminatoria2 =
            j.totalPunts2 > j.totalPunts1
              ? 1
              : j.totalPunts2 == j.totalPunts1
              ? 0.5
              : 0;
        } else {
          j.puntsEliminatoria1 = -1;
          j.puntsEliminatoria2 = -1;
        }
        j.difEliminatoria1 = j.totalPunts1 - j.totalPunts2;
        j.difEliminatoria2 = j.totalPunts2 - j.totalPunts1;
      });
/*       // ... (El teu codi existent fins a partidesfiltagrupades.map)

partidesfiltagrupades.map((j) => {
  j.totalPunts1 =
    Number(j.resultats[0].Puntuacio_1) + Number(j.resultats[1].Puntuacio_1);
  j.totalPunts2 =
    Number(j.resultats[0].Puntuacio_2) + Number(j.resultats[1].Puntuacio_2);

  // Calculem les victòries per a la primera parella de jugadors/equip
  const guanyadaAnada1 = Number(j.resultats[0].Puntuacio_1) > Number(j.resultats[0].Puntuacio_2);
  const guanyadaTornada1 = Number(j.resultats[1].Puntuacio_1) > Number(j.resultats[1].Puntuacio_2);

  // Calculem les victòries per a la segona parella de jugadors/equip
  const guanyadaAnada2 = Number(j.resultats[0].Puntuacio_2) > Number(j.resultats[0].Puntuacio_1);
  const guanyadaTornada2 = Number(j.resultats[1].Puntuacio_2) > Number(j.resultats[1].Puntuacio_1);

  j.victoriesAnadaTornada1 = (guanyadaAnada1 && guanyadaTornada1) ? 1 : 0;
  j.victoriesAnadaTornada2 = (guanyadaAnada2 && guanyadaTornada2) ? 1 : 0;

  j.victoriesUna1 = (!j.victoriesAnadaTornada1 && (guanyadaAnada1 || guanyadaTornada1)) ? 1 : 0;
  j.victoriesUna2 = (!j.victoriesAnadaTornada2 && (guanyadaAnada2 || guanyadaTornada2)) ? 1 : 0;

  // Calculant els punts i diferencials per a cada jugador/equip dins de la partida
  if (j.totalPunts1 + j.totalPunts2 != 0) {
    j.puntsEliminatoria1 =
      j.totalPunts1 > j.totalPunts2
        ? 1
        : j.totalPunts1 == j.totalPunts2
        ? 0.5
        : 0;
    j.puntsEliminatoria2 =
      j.totalPunts2 > j.totalPunts1
        ? 1
        : j.totalPunts2 == j.totalPunts1
        ? 0.5
        : 0;
  } else {
    j.puntsEliminatoria1 = -1; // O el valor que consideris per a partides no jugades
    j.puntsEliminatoria2 = -1; // O el valor que consideris per a partides no jugades
  }
  j.difEliminatoria1 = j.totalPunts1 - j.totalPunts2;
  j.difEliminatoria2 = j.totalPunts2 - j.totalPunts1;
}); */
      var grup = "";

      /////////////////////////
      function ordrePuntsJug(a, b) {
        var posicioordre = b.puntsEliminatoria1 - a.puntsEliminatoria1;
        return posicioordre;
      }
      function ordreDifJug(a, b) {
        var posicioordre = b.difEliminatoria1 - a.difEliminatoria1;
        return posicioordre;
      }
      function ordreGrup(a, b) {
        /*         const groupA = a.Grup.toUpperCase();
        const groupB = b.Grup.toUpperCase();

        if (groupA < groupB) {
          return -1;
        }
        if (groupA > groupB) {
          return 1;
        }

        return 0; */
        var posiciogrup = a.Grup.split("-")[0] - b.Grup.split("-")[0];
        return posiciogrup;
      }
      function ordreVicJug(a, b) {
        var posiciovictories = b.guanyades1 - a.guanyades1;
        return posiciovictories;
      }

      ////////////////////////////////////

      function ordenarClassificacio(a, b) {
  // 1. Criteri: Grup
  // Assumeix que 'a.Grup' i 'b.Grup' són strings com "Grup X-Y" o "X-Y"
  const grupA = a.Grup.split("-")[0];
  const grupB = b.Grup.split("-")[0];
  if (grupA !== grupB) {
    return Number(grupA) - Number(grupB); // Ordena numèricament pel número de grup
  }

  // Si els grups són iguals, passem al següent criteri
  // NOTA: Caldrà determinar si 'a' i 'b' són els resultats del Jugador1 o Jugador2 en la teva estructura actual.
  // Assumiré que 'a' i 'b' són ja objectes consolidats per cada jugador/equip.

  // 2. Criteri: Els que han guanyat anada i tornada per diferencial de punts
  // Aquí assumim que `a.victoriesAnadaTornada` i `b.victoriesAnadaTornada` són el nombre de vegades que han guanyat ambdós partits.
  if (b.victoriesAnadaTornada !== a.victoriesAnadaTornada) {
    return b.victoriesAnadaTornada - a.victoriesAnadaTornada; // Més victòries anada/tornada primer
  }
  // Si empaten en victòries anada/tornada, desempatar pel diferencial total
  if (b.diferencialTotal !== a.diferencialTotal) { // Assuming `diferencialTotal` exists on the player object
    return b.diferencialTotal - a.diferencialTotal;
  }


  // 3. Criteri: Després els que han guanyat una de les dues per diferencial
  // Assumirem que `a.victoriesUna` i `b.victoriesUna` són el nombre de vegades que han guanyat només un dels dos partits.
  if (b.victoriesUna !== a.victoriesUna) {
    return b.victoriesUna - a.victoriesUna; // Més victòries una primer
  }
  // Si empaten en victòries una, desempatar pel diferencial total
  if (b.diferencialTotal !== a.diferencialTotal) { // Assuming `diferencialTotal` exists on the player object
    return b.diferencialTotal - a.diferencialTotal;
  }

  // 4. Criteri: La resta per diferencial (si no s'ha desempatat abans)
  // Aquest seria el desempat final per diferencial de punts
  // Assumeixo que `a.difEliminatoria1` és el diferencial del jugador 'a' i 'b.difEliminatoria1' del jugador 'b'.
  return b.difEliminatoria1 - a.difEliminatoria1; // Major diferencial primer
}
console.log(partidesfiltagrupades);
      partidesfiltagrupades
        .sort(ordreDifJug)
        .sort(ordreVicJug)
        .sort(ordrePuntsJug)
        .sort(ordreGrup);
      //console.log(dades)
    /*   partidesfiltagrupades.sort(ordenarClassificacio); */

console.log(partidesfiltagrupades);

      var ordrejug = 1;
      partidesfiltagrupades.forEach((partida) => {
        partida.Posició = ordrejug;
        ordrejug++;
        if (partida.Grup != grup) {
          grup = partida.Grup;
          document.getElementById("content").innerHTML +=
            "<h6>Grup " + grup + "</h6>";
        }
        partida.Baixa = dades.filter((d) => d.Nom == partida.Jugador1)[0].Baixa;

        renderLlistaEliminatoria(partida);
      });
      vistesPartides = partidesfilt.map((ap) => ap.ID.toString());
      break;
    case "scrabbles":
      vistesPartides = [];

      navbarTitle.innerHTML = "Scrabbles";
      contentDiv.innerHTML += `<div class="p-1" id="ordenarBoto"><i id="icona" class="float-end bi bi-percent" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Ordena per mitjana de Scrabbles o per total."></i></div>`;
      var div = document.createElement("div");
      div.id = "subcontent";
      /* div.classList.add("row-md-8");
      div.classList.add("justify-content-center"); */
      div.classList.add("p-0");
      contentDiv.appendChild(div);

      function ordreScrabbles(a, b) {
        return a.posScrabbles - b.posScrabbles;
      }
      dades.sort(ordreScrabbles);
      //console.log(data)
      dades.forEach((jugador) => {
        if (jugador.PartidesJugades > 0) {
          renderScrabbles(jugador);
        }
      });
      //console.log(vistesPartides)
      var ordenada = false;
      var icona = document.getElementById("icona");
      document.getElementById("ordenarBoto").addEventListener("click", () => {
        // Llama a la función de ordenar la tabla por la segunda columna (Edad)
        if (!ordenada) {
          ordenarLlistaPercentatge();
          ordenada = true;
          icona.classList.add("bi-list-ol");
          icona.classList.remove("bi-percent");
        } else {
          ordenarLlistaPunts();
          ordenada = false;
          icona.classList.remove("bi-list-ol");
          icona.classList.add("bi-percent");
        }
      });

      break;
    case "partida":
      vistesPartides = [];
      navbarTitle.innerHTML = "Partida individual";
      function ordrePartida(a, b) {
        return a.posPartida - b.posPartida;
      }
      dades.sort(ordrePartida);
      //console.log(data)
      dades.forEach((jugador) => {
        if (jugador.PartidesJugades > 0) {
          renderPartida(jugador);
        }
      });

      break;
    case "jugada":
      vistesPartides = [];
      navbarTitle.innerHTML = "Millor jugada";
      function ordreJugada(a, b) {
        return a.posJugada - b.posJugada;
      }
      dades.sort(ordreJugada);
      //console.log(data)
      dades.forEach((jugador) => {
        if (jugador.PartidesJugades > 0) {
          renderJugada(jugador);
        }
      });

      break;
    case "social":
      vistesPartides = [];
      navbarTitle.innerHTML = "Participació social";
      function ordreParticipacio(a, b) {
        return a.Pos_social - b.Pos_social;
      }
      dades.sort(ordreParticipacio);
      //console.log(data)
      dades.forEach((jugador) => {
        if (jugador.Pos_social > 0) {
          renderSocial(jugador);
        }
      });

      break;
    case "immediatesa":
      vistesPartides = [];
      navbarTitle.innerHTML = "Cuitor en jugar";
      function ordreVelocitat(a, b) {
        return a.Pos_velocitat - b.Pos_velocitat;
      }
      dades.sort(ordreVelocitat);
      //console.log(data)
      dades.forEach((jugador) => {
        if (jugador.Pos_velocitat > 0) {
          renderVelocitat(jugador);
        }
      });

      break;
    case "detall":
      //console.log(data,options)
      var jugador = dades.filter((j) => j.ID === options)[0];
      console.log(jugador);
      navbarTitle.innerHTML = jugador.Nom;
      renderJugador(jugador);
      vistesPartides = jugador.partides.map((ap) => ap.ID.toString());

      break;

    case "detallpartida":
      navbarTitle.innerHTML = "Detall de la partida";
      var partida = aparellaments.filter((j) => j.ID == options)[0];
      //console.log(aparellaments);
      renderDetallPartida(partida);

      break;

    case "detallfase":
      navbarTitle.innerHTML = "Suma partides";
      var partidesfase = aparellaments.filter((j) => j.IDma == options);
      var partida = {};
      console.log(partidesfase);
      /* {
    "Ronda": 1,
    "idJug1": 1,
    "idJug2": 11,
    "Jugador1": "Lina Maria Riera",
    "Jugador2": "Antoni Nicolau",
    "ID": 120110,
    "Puntuacio_1": 477,
    "Puntuacio_2": 215,
    "Mot_1": "ESTRANYIN",
    "Puntsmot_1": 118,
    "Scrabbles_1": 3,
    "Mot_2": "QUIC",
    "Puntsmot_2": 29,
    "Scrabbles_2": 0,
    "Lletra_1": "",
    "Punts_lletra_1": "",
    "Lletra_2": "",
    "Punts_lletra_2": "",
    "Comentaris": "",
    "Full": "https://drive.google.com/thumbnail?id=1YBSXlyuEFsztCnlvlTvuVkX0wDE69wRa&sz=w1000",
    "Tauler": "",
    "Suma_punts": 692,
    "Data": 45476.81840304398,
    "Punts_social": 0,
    "Punts_1": 1,
    "Punts_2": 0,
    "Estat": "Ronda tancada",
    "Nova": "",
    "Pos_Conjunta": 30,
    "Taula": 1,
    "Punts_velocitat": 26,
    "GrupPosició": "1-32",
    "ma": 1,
    "IDma": 12011
} */
      partida.Estat = "Ronda tancada";
      partida.Jugador1 = partidesfase[0].Jugador1;
      partida.Jugador2 = partidesfase[0].Jugador2;
      partida.Ronda = partidesfase[0].Ronda;
      partida.Puntuacio_1 =
        partidesfase[0].Puntuacio_1 + partidesfase[1].Puntuacio_1;
      partida.Puntuacio_2 =
        partidesfase[0].Puntuacio_2 + partidesfase[1].Puntuacio_2;
      partida.Scrabbles_1 =
        partidesfase[0].Scrabbles_1 + partidesfase[1].Scrabbles_1;
      partida.Scrabbles_2 =
        partidesfase[0].Scrabbles_2 + partidesfase[1].Scrabbles_2;
      if (partides[0].Puntsmot_1 >= partidesfase[1].Puntsmot_1) {
        partida.Puntsmot_1 = partidesfase[0].Puntsmot_1;
        partida.Mot_1 = partidesfase[0].Mot_1;
      } else {
        partida.Puntsmot_1 = partidesfase[1].Puntsmot_1;
        partida.Mot_1 = partidesfase[1].Mot_1;
      }
      if (partides[0].Puntsmot_2 >= partidesfase[1].Puntsmot_2) {
        partida.Puntsmot_2 = partidesfase[0].Puntsmot_2;
        partida.Mot_2 = partidesfase[0].Mot_2;
      } else {
        partida.Puntsmot_2 = partidesfase[1].Puntsmot_2;
        partida.Mot_2 = partidesfase[1].Mot_2;
      }
      partida.Suma_punts = partida.Puntuacio_1 + partida.Puntuacio_2;
      partida.Punts_social =
        partidesfase[0].Punts_social + partidesfase[1].Punts_social;
      partida.Full = partidesfase[0].Full;
      partida.Tauler = partidesfase[1].Full;
      partida.ma = "1 + 2";
      partida.Comentaris =
        partidesfase[0].Comentaris + "<br>" + partidesfase[1].Comentaris;
      partida.Punts_velocitat = "x";
      console.log(partida);

      renderDetallPartida(partida);

      break;

    case "formulari":
      navbarTitle.innerHTML = "Envia el resultat";
      var partida = aparellaments.filter((j) => j.ID == options)[0];
      //console.log(partida)
      renderFormulari(partida);

      break;

    case "trobades":
      navbarTitle.innerHTML = "Trobades";
      //console.log(trobada)
      if (trobada) {
        renderTrobada(trobada);
      } else {
        contentDiv.innerHTML =
          "<h1>La següent trobada oficial encara no està confirmada.</h1><p>Tanmateix pots contactar amb els teus adversaris per jugar en poder...</p>";
      }
      break;

    case "assistencia":
      navbarTitle.innerHTML = "Assistència";

      //var trobada = trobada.filter(j=>j.Mostra=="TRUE")[0]
      //console.log(partida)
      //contentDiv.innerHTML =document.getElementById("trobades").innerHTML
      renderFormTrobada(trobada);
      document.getElementById("loaded").innerHTML = "<span>trobadesLoad</span>";

      break;

    case "imatge":
      navbarTitle.innerHTML = "Imatge";

      contentDiv.innerHTML = `
                        <figure class="zoom p-0" onclick="zoom(event)" style="background-image: url('${options.src}')">        
                          <img src="${options.src}" class="img-fluid" >
                        </figure>
                       
                        `;
      updateHistory(["imatge", options.src]);

      break;
    case "rellotge":
      navbarTitle.innerHTML = "Rellotge";
      window.open(rellotge);
      break;

    case "validador":
      navbarTitle.innerHTML = "Validador";
      window.open(validador);
      break;
    case "blog":
      navbarTitle.innerHTML = "Blog";
      window.open(blog);
      break;

    default:
      contentDiv.innerHTML =
        "<h1>Página no trobada</h1><p>La pàgina que cerques no existeix.</p>";
  }
  // updateHistory(page)
  //console.log(pageHistory,currentPage)
  cerca();
  afegeixEsdeveniments();
  tooltips();
}

function groupById(array) {
  return array.reduce((acc, current) => {
    const foundItem = acc.find((it) => it.IDma === current.IDma);

    if (foundItem) {
      foundItem.resultats = foundItem.resultats
        ? [...foundItem.resultats, current] //{ 'Puntuacio_1': current.Puntuacio_1, 'Puntuacio_2': current.Puntuacio_2, 'ID':current.ID }]
        : [current]; //{ 'Puntuacio_1': current.Puntuacio_1, 'Puntuacio_2': current.Puntuacio_2, 'ID':current.ID }];
    } else {
      acc.push({
        IDma: current.IDma,
        Jugador1: current.Jugador1,
        Jugador2: current.Jugador2,
        Estat: current.Estat,
        Grup: current.GrupPosició,
        resultats: [current], //{ 'Puntuacio_1': current.Puntuacio_1, 'Puntuacio_2': current.Puntuacio_2, 'ID':current.ID }]
      });
    }
    return acc;
  }, []);
}

function groupByJug(array) {
  return array.reduce((acc, current) => {
    const foundItem = acc.find((it) => it.Jugador1 === current.Jugador1);

    if (foundItem) {
      foundItem.resultats = foundItem.resultats
        ? [...foundItem.resultats, current] //{ 'Puntuacio_1': current.Puntuacio_1, 'Puntuacio_2': current.Puntuacio_2, 'ID':current.ID }]
        : [current]; //{ 'Puntuacio_1': current.Puntuacio_1, 'Puntuacio_2': current.Puntuacio_2, 'ID':current.ID }];
    } else {
      acc.push({
        ID: current.ID,
        Jugador1: current.Jugador1,
        Jugador2: current.Jugador2,
        Estat: current.Estat,
        Grup: current.GrupPosició,
        resultats: [current], //{ 'Puntuacio_1': current.Puntuacio_1, 'Puntuacio_2': current.Puntuacio_2, 'ID':current.ID }]
      });
    }
    return acc;
  }, []);
}

function afegeixEsdeveniments() {
  let contentDiv = document.getElementById("content");

  contentDiv.querySelectorAll(".detallpartida").forEach((partida) => {
    var id = partida.dataset.id;
    var estat = partida.dataset.estat;
    partidajugada(id);
    partida.addEventListener("click", () => {
      console.log(partida.dataset.id);
      if (partidajugada(id)) {
        loadContent(["detallpartida", id]);
        updateHistory(["detallpartida", id]);
        updatePartidaHistory(["detallpartida", id]);
      } else if (estat == "Nova ronda") {
        loadContent(["formulari", id]);
        updateHistory(["detallpartida", id]);
      }
    });
  });
  contentDiv.querySelectorAll(".detallfase").forEach((partida) => {
    var id = partida.dataset.id;

    partida.addEventListener("click", () => {
      console.log(partida.dataset.id);

      loadContent(["detallfase", id]);
      updateHistory(["detallfase", id]);
      updatePartidaHistory(["detallfase", id]);
    });
  });
  contentDiv.querySelectorAll(".detallronda").forEach((ronda) => {
    var id = ronda.dataset.id;
    //console.log(id)
    ronda.addEventListener("click", () => {
      loadContent(["ronda", id]);
      updateHistory(["ronda", id]);
    });
  });
  contentDiv.querySelectorAll(".detalleliminatoria").forEach((ronda) => {
    var id = ronda.dataset.id;
    //console.log(id)
    ronda.addEventListener("click", () => {
      loadContent(["faseeliminatoria", id]);
      updateHistory(["faseeliminatoria", id]);
    });
  });

  contentDiv.querySelectorAll(".zoomable").forEach((image) => {
    image.addEventListener("click", function () {
      if (image.classList.contains("zoomed")) {
        image.classList.remove("zoomed");
      } else {
        image.classList.add("zoomed");
      }
    });
  });
  contentDiv.querySelectorAll(".nom").forEach((nom) => {
    if (nom.hasChildNodes()) {
      let nomJugador = nom.innerHTML.trim();
      //console.log(nomJugador)
      let datafilter = dades.filter((j) => j.Nom === nomJugador)[0];
      if (typeof datafilter != "undefined") {
        let id = datafilter.ID;
        //console.log(id)

        nom.addEventListener("click", () => {
          var vista = ["detall", id];
          loadContent(vista);
          updateHistory(vista);
        });
      }
    }
  });
  contentDiv.querySelectorAll(".mot").forEach((mot) => {
    mot.addEventListener("click", () => {
      window.open(
        "http://diccionari.totescrable.cat/cercador/?mot=" + mot.innerHTML
      );
    });
  });
  contentDiv.querySelectorAll(".missatge").forEach((missatge) => {
    var nom = missatge.dataset.nom;
    let datafilter = dades.filter((j) => j.Nom === nom)[0];
    //console.log(datafilter)
    let telefon = datafilter.Telefon;
    missatge.innerHTML += '<i class="bi bi-whatsapp  ms-1"></i>';
    missatge.addEventListener("click", () => {
      window.open(
        "https://api.whatsapp.com/send/?phone=34" +
          telefon +
          "&text=Hola " +
          nom +
          ". Vols que juguem una partida al torn que tens disponible?" +
          "&type=phone_number&app_absent=0"
      );
    });
  });
}

function partidajugada(id) {
  var partida = aparellaments.filter((p) => p.ID == id)[0];
  if (partida.Suma_punts > 0) {
    return true;
  } else {
    return false;
  }
}

// Función para actualizar el historial personalizado
function updateHistory(page) {
  currentPage = page;
  pageHistory.push(page);
  history.pushState({ page: page[0], options: page[1] }, page[0]);
  //console.log(pageHistory)
}

function updatePartidaHistory(page) {
  currentPage = page;
  partidesHistory.push(page);
  //history.pushState({"page":page[0],"options":page[1]},page[0])
  //console.log(pageHistory,partidesHistory)
}

// Manejar eventos de clic en los enlaces de navegación
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    // navLinks.forEach(l=>{l.classList.remove("active")})
    event.preventDefault();
    const targetPage = this.getAttribute("href").substring(1);
    //link.classList.add("active")
    loadContent([targetPage]);
    updateHistory([targetPage]);
    //history.pushState({"page":targetPage,"options":""},targetPage)
  });
});

// Manejar clic en el enlace "Atrás"
const goBackLink = document.getElementById("goBack");
goBackLink.addEventListener("click", function () {
  if (pageHistory.length > 1) {
    pageHistory.pop();
    const previousPage = pageHistory[pageHistory.length - 1];
    loadContent(previousPage);
  }
});

window.onpopstate = function (event) {
  if (event.state && event.state.page) {
    //console.log(`location: ${document.location}, state: ${JSON.stringify(event.state)}`,event.state)

    loadContent(event.state);
  }
};

// Cargar la página de inicio por defecto

// defining the search_tool function with an Arrow expression, passing the Event Object from
// EventTarget.addEventListener() to the function body:
const search_tool = (evt) => {
  // Recuperar tots els elements .card:
  const cards = document.querySelectorAll(".entrada");
  // Recuperar el valor de l'input una sola vegada per comparació, sense espais en blanc iniciales/finals i convertir-ho a majúscules:
  const value = evt.currentTarget.value.trim().toUpperCase();
  let visibleCardCount = 0; // Reiniciar el comptador a zero per a cada cerca.

  // Iterar sobre les targetes:
  for (let card of cards) {
    const texts_to_search_for = [
      ...card.querySelectorAll(".card .nom, a, div,  span ,.card-header , li"),
    ];

    if (
      texts_to_search_for.some((txt) =>
        txt.textContent.toUpperCase().includes(value)
      )
    ) {
      card.style.display = "";
      visibleCardCount++; // Incrementar el comptador si la targeta és visible.
    } else {
      card.style.display = "none";
    }
  }
  document.getElementById("comptador").innerHTML =
    "Resultats: " + visibleCardCount;
  //console.log(`Número de targetes visibles: ${visibleCardCount}`);
};

// here we use EventTarget.addEventListener() to bind the search_tool() function (note the deliberate
// lack of parentheses) as the event-handler for the 'input' event:
function cerca() {
  document
    .querySelector(".search input")
    .removeEventListener("input", search_tool);
  document
    .querySelector(".search input")
    .addEventListener("input", search_tool);
}
//document.querySelector('.search input').addEventListener('input', search_tool);
function ves(id) {
  setTimeout(function () {
    var targetEle = document.getElementById(id);
    targetEle.scrollIntoView({ behavior: "smooth" });
  }, 50);
}
function tooltips() {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
}

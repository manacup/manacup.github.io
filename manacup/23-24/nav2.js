<<<<<<< HEAD
const pageHistory = [];
const partidesHistory = ["home"];
const validador = "https://diccionari.totescrable.cat/validador/";
const blog = "https://scrabblemanacor.wordpress.com/";
const rellotge = "https://manacup.github.io/rellotgeScrabble/index.html";

let currentPage = "home";

// Función para cargar contenido en la página
function loadContent(vista) {
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
    case "home":
      contentDiv.innerHTML =
        "<h1>Página d'inici</h1><p>Benvingut a la primera pàgina</p>";
      break;
    case "classificacio":
      navbarTitle.innerHTML = "Classificació";
      contentDiv.innerHTML += `<div class="col-md-8 p-1" id="ordenarBoto"><i id="icona" class="float-end bi bi-percent" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Ordena per percentatge de victòries o per punts."></i></div>`;
      var div = document.createElement("div");
      div.id = "subcontent";
      div.classList.add("row-md-8");
      div.classList.add("justify-content-center");
      div.classList.add("p-0");
      contentDiv.appendChild(div);

      function ordreClassificacio(a, b) {
        return a.Posició - b.Posició;
      }
      dades.sort(ordreClassificacio);
      //console.log(dades)
      dades.forEach((jugador) => {
        jugador.percentatgeVictories = parseInt(jugador.Punts)/parseInt(jugador.PartidesJugades)
        renderClassificacio(jugador);
      });
      var ordenada = false;
      var icona =  document.getElementById("icona")
      document.getElementById("ordenarBoto").addEventListener("click", () => {
        // Llama a la función de ordenar la tabla por la segunda columna (Edad)
        if (!ordenada) {
          ordenarLlistaPercentatge();
          ordenada = true;
          icona.classList.add("bi-list-ol")
          icona.classList.remove("bi-percent")
        } else {
          ordenarLlistaPunts();
          ordenada = false;
          icona.classList.remove("bi-list-ol")
          icona.classList.add("bi-percent")
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
      contentDiv.innerHTML += `<div class="col-md-8 p-1" id="ordenarBoto"><i id="icona" class="float-end bi bi-calendar3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Ordena per data o per punts."></i></div>`;
      var div = document.createElement("div");
      div.id = "subcontent";
      div.classList.add("row-md-8");
      div.classList.add("justify-content-center");
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
      var icona =  document.getElementById("icona")
      document.getElementById("ordenarBoto").addEventListener("click", () => {
        // Llama a la función de ordenar la tabla por la segunda columna (Edad)
        if (!ordenada) {
          ordenarLlistaData();
          ordenada = true;
          icona.classList.add("bi-list-ol")
        } else {
          ordenarLlistaPunts();
          ordenada = false;
          icona.classList.remove("bi-list-ol")
        }
      });
      vistesPartides = aparellamentsordenats.map((ap) => ap.ID.toString());

      break;
    case "rondes":
      navbarTitle.innerHTML = "Rondes";
      function ordreRondes(a, b) {
        return a.Ronda - b.Ronda;
      }
      rondes.sort(ordreRondes);

      rondes.forEach((ronda) => {
        renderRondes(ronda);
      });

      break;
    case "ronda":
      navbarTitle.innerHTML = "Ronda " + options;

      function ordreConjunta(a, b) {
        return b.Suma_punts - a.Suma_punts;
      }
      aparellaments.sort(ordreConjunta);

      var partidesfilt = aparellaments.filter((j) => j.Ronda == options);
      partidesfilt.forEach((partida) => {
        renderAparellaments(partida);
      });
      vistesPartides = partidesfilt.map((ap) => ap.ID.toString());

      break;
    case "scrabbles":
      vistesPartides = [];

      navbarTitle.innerHTML = "Scrabbles";
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
      //console.log(jugador)
      navbarTitle.innerHTML = jugador.Nom;
      renderJugador(jugador);
      vistesPartides = jugador.partides.map((ap) => ap.ID.toString());

      break;

    case "detallpartida":
      navbarTitle.innerHTML = "Detall de la partida";
      var partida = aparellaments.filter((j) => j.ID == options)[0];
      //console.log(partida)
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

function afegeixEsdeveniments() {
  let contentDiv = document.getElementById("content");

  contentDiv.querySelectorAll(".detallpartida").forEach((partida) => {
    var id = partida.dataset.id;
    var estat = partida.dataset.estat;
    partidajugada(id);
    partida.addEventListener("click", () => {
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
  contentDiv.querySelectorAll(".detallronda").forEach((ronda) => {
    var id = ronda.dataset.id;
    //console.log(id)
    ronda.addEventListener("click", () => {
      loadContent(["ronda", id]);
      updateHistory(["ronda", id]);
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
=======
const pageHistory = [];
const partidesHistory = ["home"];
const validador = "https://diccionari.totescrable.cat/validador/";
const blog = "https://scrabblemanacor.wordpress.com/";
const rellotge = "https://manacup.github.io/rellotgeScrabble/index.html";

let currentPage = "home";

// Función para cargar contenido en la página
function loadContent(vista) {
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
    case "home":
      contentDiv.innerHTML =
        "<h1>Página d'inici</h1><p>Benvingut a la primera pàgina</p>";
      break;
    case "classificacio":
      navbarTitle.innerHTML = "Classificació";
      contentDiv.innerHTML += `<div class="col-md-8 p-1" id="ordenarBoto"><i id="icona" class="float-end bi bi-percent" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Ordena per percentatge de victòries o per punts."></i></div>`;
      var div = document.createElement("div");
      div.id = "subcontent";
      div.classList.add("row-md-8");
      div.classList.add("justify-content-center");
      div.classList.add("p-0");
      contentDiv.appendChild(div);

      function ordreClassificacio(a, b) {
        return a.Posició - b.Posició;
      }
      dades.sort(ordreClassificacio);
      //console.log(dades)
      dades.forEach((jugador) => {
        jugador.percentatgeVictories = parseInt(jugador.Punts)/parseInt(jugador.PartidesJugades)
        renderClassificacio(jugador);
      });
      var ordenada = false;
      var icona =  document.getElementById("icona")
      document.getElementById("ordenarBoto").addEventListener("click", () => {
        // Llama a la función de ordenar la tabla por la segunda columna (Edad)
        if (!ordenada) {
          ordenarLlistaPercentatge();
          ordenada = true;
          icona.classList.add("bi-list-ol")
          icona.classList.remove("bi-percent")
        } else {
          ordenarLlistaPunts();
          ordenada = false;
          icona.classList.remove("bi-list-ol")
          icona.classList.add("bi-percent")
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
      contentDiv.innerHTML += `<div class="col-md-8 p-1" id="ordenarBoto"><i id="icona" class="float-end bi bi-calendar3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Ordena per data o per punts."></i></div>`;
      var div = document.createElement("div");
      div.id = "subcontent";
      div.classList.add("row-md-8");
      div.classList.add("justify-content-center");
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
      var icona =  document.getElementById("icona")
      document.getElementById("ordenarBoto").addEventListener("click", () => {
        // Llama a la función de ordenar la tabla por la segunda columna (Edad)
        if (!ordenada) {
          ordenarLlistaData();
          ordenada = true;
          icona.classList.add("bi-list-ol")
        } else {
          ordenarLlistaPunts();
          ordenada = false;
          icona.classList.remove("bi-list-ol")
        }
      });
      vistesPartides = aparellamentsordenats.map((ap) => ap.ID.toString());

      break;
    case "rondes":
      navbarTitle.innerHTML = "Rondes";
      function ordreRondes(a, b) {
        return a.Ronda - b.Ronda;
      }
      rondes.sort(ordreRondes);

      rondes.forEach((ronda) => {
        renderRondes(ronda);
      });

      break;
    case "ronda":
      navbarTitle.innerHTML = "Ronda " + options;

      function ordreConjunta(a, b) {
        return b.Suma_punts - a.Suma_punts;
      }
      aparellaments.sort(ordreConjunta);

      var partidesfilt = aparellaments.filter((j) => j.Ronda == options);
      partidesfilt.forEach((partida) => {
        renderAparellaments(partida);
      });
      vistesPartides = partidesfilt.map((ap) => ap.ID.toString());

      break;
    case "scrabbles":
      vistesPartides = [];

      navbarTitle.innerHTML = "Scrabbles";
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
      //console.log(jugador)
      navbarTitle.innerHTML = jugador.Nom;
      renderJugador(jugador);
      vistesPartides = jugador.partides.map((ap) => ap.ID.toString());

      break;

    case "detallpartida":
      navbarTitle.innerHTML = "Detall de la partida";
      var partida = aparellaments.filter((j) => j.ID == options)[0];
      //console.log(partida)
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

function afegeixEsdeveniments() {
  let contentDiv = document.getElementById("content");

  contentDiv.querySelectorAll(".detallpartida").forEach((partida) => {
    var id = partida.dataset.id;
    var estat = partida.dataset.estat;
    partidajugada(id);
    partida.addEventListener("click", () => {
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
  contentDiv.querySelectorAll(".detallronda").forEach((ronda) => {
    var id = ronda.dataset.id;
    //console.log(id)
    ronda.addEventListener("click", () => {
      loadContent(["ronda", id]);
      updateHistory(["ronda", id]);
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
>>>>>>> fb121be910205e5f6ca7bef6a2a2d60db7ef3306

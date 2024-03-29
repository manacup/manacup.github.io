/* import "./styles.css";
import "./dndPolyfill";
 */
/* DnD events:
 *         dragstart, drag, dragenter, dragleave, dragover, drop, dragend
 *
 *  Most mobile devices do not listen to the drag events that are bound to the DOM, instead of use:
 *         touchstart, touchend, touchenter, touchcancel, touchleave, touchmove
 *  Dragging properties:
 *    dataTransfer.effectAllowed = none, copy, copyLink, copyMove, link, linkMove, move, all, uninitialized
 *    dataTransfer.dropEffect = none, copy, link, move
 *    e.dataTransfer.setDragImage(imgElement, x, y)
 *
 */
const queryString = window.location.search;
const urlParams = Object.fromEntries(new URLSearchParams(queryString));

let faristol = urlParams.faristol || false;
let nouFaristol = [];
var partidaDesada = localStorage.getItem("anagram") || false;
let partidaObj = JSON.parse(partidaDesada);
if (!faristol) {
  if (partidaDesada) {
    faristol = partidaObj.faristol;
    paraulesUsades = partidaObj.jugades;
  }
} else {
  if (partidaDesada) {
    if (faristol.toUpperCase() == partidaObj.faristol.toUpperCase()) {
      paraulesUsades = partidaObj.jugades;
    }
  }
}
let totalParaules = 0;
const DnD = {
  dragEl: null,
  onDragStart: function (e) {
    this.classList.add("drag--moving");
    if (this.classList.contains("comodi")) {
      e.dataTransfer.setData("class", "comodi");
    }

    DnD.dragEl = this;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
  },
  onDragOver: function (e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = "move";
    return false;
  },
  onDragEnter: function (e) {
    this.classList.add("drag--hover");
  },
  onDragLeave: function (e) {
    this.classList.remove("drag--hover");
  },
  onDrop: function (e) {
    if (e.stopPropagation) e.stopPropagation();
    DnD.dragEl.innerHTML = this.innerHTML;
    var content = e.dataTransfer.getData("text/html");
    var classcomodi = e.dataTransfer.getData("class");
    if (classcomodi != "comodi") {
      this.innerHTML = content;
      if (this.classList.contains("comodi")) {
        this.classList.remove("comodi");
        DnD.dragEl.classList.add("comodi");
      }
    } else {
      obrirModal(this);
      this.classList.add("comodi");
      if (DnD.dragEl != this) {
        DnD.dragEl.classList.remove("comodi");
      }
    }

    return false;
  },
  onDragEnd: function (e) {
    this.classList.remove("drag--moving");

    [].forEach.call(boxes, function (box) {
      box.classList.remove("drag--hover");
    });
  },
};

function obtenerFichasAleatorias(distribucion) {
  const letrasDisponibles = distribucion.slice();

  // Función auxiliar para obtener un elemento aleatorio y actualizar la distribución
  function obtenerLetraAleatoria() {
    const indexAleatori = Math.floor(Math.random() * letrasDisponibles.length);
    const letra = letrasDisponibles[indexAleatori];
    letrasDisponibles.splice(indexAleatori, 1);
    //distribucion[letra].cantidad--;

    // Eliminar letras agotadas de la lista
    /*   if (distribucion[letra].cantidad === 0) {
      const index = letrasDisponibles.indexOf(letra);
      letrasDisponibles.splice(index, 1);
    }*/

    return letra;
  }

  let noufichasAleatorias = ["", "", "", "", "", "", ""];

  if (faristol) {
    let lletres = faristol
      .toUpperCase()
      .split("-")
      .map((l) =>
        l === "Q" || l === "QU" || l === "q" || l === "qu" ? "Qu" : l
      );

    lletres.forEach((lletra) => {
      noufichasAleatorias.push(lletra);
    });
  } else {
    for (let i = 0; i < 7; i++) {
      const letraAleatoria = obtenerLetraAleatoria();
      noufichasAleatorias.push(letraAleatoria);
    }
  }

  console.log(noufichasAleatorias);
  nouFaristol = noufichasAleatorias.filter((al) => al != "");
  return noufichasAleatorias;
}

const arrayRepetido = Object.entries(distribucionScrabbleCatala).flatMap(
  ([letra, { cantidad }]) => Array(cantidad).fill(letra)
);

const arrayLletres = Object.keys(distribucionScrabbleCatala).map((key) => key);
arrayLletres.pop();

console.log(arrayLletres);

var fichasAleatorias; //= obtenerFichasAleatorias(arrayRepetido);
console.log(fichasAleatorias);

const boxes = document.querySelectorAll(".grid-item[draggable]");
function inici() {
  [].forEach.call(boxes, function (box, index) {
    box.textContent = fichasAleatorias[index];
  });
  netejaClasses("scrabbleBoard");
}

function reinici() {
  //faristol = ""
  if (faristol) {
    window.location = window.location.href.split("?")[0];
    localStorage.removeItem("anagram");
  }
  fichasAleatorias = obtenerFichasAleatorias(arrayRepetido);
  console.log(fichasAleatorias);
  [].forEach.call(boxes, function (box, index) {
    box.textContent = fichasAleatorias[index];
  });
  netejaClasses("scrabbleBoard");
  netejaClasses("rack");
  paraulesUsades = [];
  comptador = 0;
  updateScoreDisplay();
  sendRequest(nouFaristol);
}

[].forEach.call(boxes, function (box, index) {
  //box.textContent = randomNumsArray[index];

  box.addEventListener("dragstart", DnD.onDragStart, false);
  box.addEventListener("dragenter", DnD.onDragEnter, false);
  box.addEventListener("dragover", DnD.onDragOver, false);
  box.addEventListener("dragleave", DnD.onDragLeave, false);
  box.addEventListener("drop", DnD.onDrop, false);
  box.addEventListener("dragend", DnD.onDragEnd, false);
});

function updateWordInput() {
  var board = document.getElementById("scrabbleBoard");
  var tiles = board.getElementsByClassName("grid-item");
  var wordInput = document.getElementById("word-input");
  var word = "";
  for (var i = 0; i < tiles.length; i++) {
    word += tiles[i].innerText;
  }
  wordInput.value = word;
}
$("#barreja").click(barreja);
$("#retorna").click(inici);
$("#reinicia").click(reinici);

function netejaClasses(node) {
  var board = document.getElementById(node);
  board
    .querySelectorAll(".grid-item")
    .forEach((t) => t.classList.remove("comodi"));
  console.log("kk");
}

function barreja() {
  const miDiv = document.getElementById("rack");
  const elementos = Array.from(miDiv.querySelectorAll(".grid-item"));

  // Función para reordenar aleatoriamente un array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Reordenar aleatoriamente los elementos
  shuffleArray(elementos);

  // Vaciar el div
  miDiv.innerHTML = "";

  // Agregar los elementos reordenados al div
  elementos.forEach(function (elemento) {
    miDiv.appendChild(elemento);
  });
}

function actualitzarClasses() {
  var elements = document.querySelectorAll(".grid-item");

  elements.forEach(function (element) {
    if (element.textContent.trim() !== "") {
      element.classList.remove("grid-buit");
    } else {
      element.classList.add("grid-buit");
    }
    if (element.textContent.trim() == "?") {
      element.classList.add("escarras");
      element.classList.add("comodi");
    } else {
      element.classList.remove("escarras");
    }
  });
}

// Rastrejar tots els div amb la classe "item"
actualitzarClasses();

// Crear una observació de les mutations
var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    // Si la mutació afecta al `textContent`, actualitza les classes
    if (
      mutation.type === "childList" &&
      mutation.target.classList.contains("grid-item")
    ) {
      actualitzarClasses();
    }
  });
});

// Observar els canvis en el contingut dels divs amb la classe "item"
var config = { childList: true, subtree: true };
var elementsToObserve = document.querySelectorAll(".grid-item");
elementsToObserve.forEach(function (element) {
  observer.observe(element, config);
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("comodi")) {
    obrirModal(e.target);
  }
});

function obrirModal(element) {
  const modal = document.getElementById("modallletres");
  const lletraGrid = document.getElementById("lletra-grid");

  // Afegir les lletres al grid del modal
  arrayLletres.forEach((lletra) => {
    const lletraElement = document.createElement("div");
    lletraElement.classList.add("lletra");
    lletraElement.textContent = lletra;
    lletraElement.addEventListener("click", () => {
      element.textContent = lletra;
      tancarModal(lletra);
    });
    lletraGrid.appendChild(lletraElement);
  });

  modal.style.display = "flex";
}

function tancarModal(lletra) {
  const modal = document.getElementById("modallletres");
  const lletraGrid = document.getElementById("lletra-grid");

  // Eliminar les lletres del grid abans de tancar el modal
  lletraGrid.innerHTML = "";

  modal.style.display = "none";

  // Retornar la lletra
  console.log("Lletra premuda:", lletra);
}
function desaPartida() {
  partida = {
    faristol: nouFaristol.join("-"),
    jugades: paraulesUsades,
  };
  localStorage.setItem("anagram", JSON.stringify(partida));
}

window.addEventListener("DOMContentLoaded", function () {
  fichasAleatorias = obtenerFichasAleatorias(arrayRepetido);
  //console.log(permutacions(nouFaristol),totalParaules);

  updateScoreDisplay();
  sendRequest(nouFaristol);
  inici();
});

var wdVer = "1.2.15";
var wwwDir = "";
var wwwLang = "/buscarparaules";
var req_lang = "ca";
var req_key = "H4DbmQYCH23qiUWkrmihRGYiC";
var req_key = "H4DbmQYCH23qiUWkrmihRGYiC";
var req_recaptchaKey = "6LfSgA8TAAAAAJ8TMvW_HEYNrSL4-3KVg4PRozcF";

function sendRequest(faristolArray) {
  let faristol = faristolArray.join("").toUpperCase().replace(/\?/g, "*");
  (wsrv = "https://vuto-m.worder.cat/get_words.php"), //$("#wsrv").val()), //"https://vuto-m.worder.cat/get_words.php"
    "default" == wsrv && (wsrv = wwwDir + "/get_words.php"),
    $.ajax({
      url: "https://vuto-m.worder.cat/get_words.php",
      data: {
        lg: req_lang,
        dicc: "disc",
        lttr: faristol, //.toUpperCase(), //faristol
        pttn: "", //$("#p").val().toUpperCase(), //patro
        key: req_key,
        ver: wdVer,
      },
      type: "GET",
      dataType: "jsonp",
      jsonp: "cb",
      jsonpCallback: "wdrp",
      timeout: 25e3,
      success: function (e) {
        void 0 !== e.wsrv
          ? ($("#wsrv").val(e.wsrv), sendRequest(t))
          : (console.log(e),
            gestionaTotals(e),
            void 0 !== e.gsjs && $.getScript(wwwDir + "/js/" + e.gsjs),
            e.err < 10);
      },
      error: function () {
        var e = {
          err: 60,
          err_msg: "UNKNOWN ERROR",
          err_info: "UNKNOWN_FROM_CLIENT",
        };
        showResult(e), rmCookie("wdSrv"), $("#wsrv").val("default");
      },
    });
}
function gestionaTotals(e) {
  if (e.err == 0) {
    totalParaules = e.words.total;
    document.getElementById("totalWorder").innerHTML =
      " de " + totalParaules + " possibles.";
  } else if (e.err == 2) {
    totalParaules = e.words.total;
    document.getElementById("totalWorder").innerHTML =
      " de més de" + totalParaules + " possibles.";
  }
}

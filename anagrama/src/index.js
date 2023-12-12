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

const DnD = {
  dragEl: null,
  onDragStart: function(e) {
    this.classList.add("drag--moving");
    DnD.dragEl = this;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
  },
  onDragOver: function(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = "move";
    return false;
  },
  onDragEnter: function(e) {
    this.classList.add("drag--hover");
  },
  onDragLeave: function(e) {
    this.classList.remove("drag--hover");
  },
  onDrop: function(e) {
    if (e.stopPropagation) e.stopPropagation();
    DnD.dragEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
    return false;
  },
  onDragEnd: function(e) {
    this.classList.remove("drag--moving");
    [].forEach.call(boxes, function(box) {
      box.classList.remove("drag--hover");
    });
  }
  
};
const randomNumsArray = ["","","","","","",""];

function obtenerFichasAleatorias(distribucion) {
  const letrasDisponibles = distribucion

  // Función auxiliar para obtener un elemento aleatorio y actualizar la distribución
  function obtenerLetraAleatoria() {
    const letra = letrasDisponibles[Math.floor(Math.random() * letrasDisponibles.length)];
    //distribucion[letra].cantidad--;

    // Eliminar letras agotadas de la lista
  /*   if (distribucion[letra].cantidad === 0) {
      const index = letrasDisponibles.indexOf(letra);
      letrasDisponibles.splice(index, 1);
    }*/

    return letra; 
  }

  const fichasAleatorias = randomNumsArray;
  for (let i = 0; i < 7; i++) {
    const letraAleatoria = obtenerLetraAleatoria();
    fichasAleatorias.push(letraAleatoria);
  }

  return fichasAleatorias;
}

// Ejemplo de uso con la distribución de Scrabble en catalán
const distribucionScrabbleCatala = {
  'A': { cantidad: 12, valor: 1 },
  'B': { cantidad: 2, valor: 3 },
  'C': { cantidad: 3, valor: 3 },
  'D': { cantidad: 3, valor: 2 },
  'E': { cantidad: 13, valor: 1 },
  'F': { cantidad: 1, valor: 4 },
  'G': { cantidad: 2, valor: 2 },
  'H': { cantidad: 1, valor: 4 },
  'I': { cantidad: 8, valor: 1 },
  'J': { cantidad: 1, valor: 8 },
  'L': { cantidad: 4, valor: 1 },
  'M': { cantidad: 3, valor: 3 },
  'N': { cantidad: 6, valor: 1 },
  'O': { cantidad: 5, valor: 1 },
  'P': { cantidad: 2, valor: 3 },
  'Qu': { cantidad: 1, valor: 8 },
  'R': { cantidad: 8, valor: 1 },
  'S': { cantidad: 8, valor: 1 },
  'T': { cantidad: 5, valor: 1 },
  'U': { cantidad: 4, valor: 1 },
  'V': { cantidad: 1, valor: 4 },
  'X': { cantidad: 1, valor: 8 },
  
  'Z': { cantidad: 1, valor: 10 },
  'Ç': { cantidad: 1, valor: 4 },
  'L·L': { cantidad: 1, valor: 8 },
  'NY': { cantidad: 1, valor: 8 },
  
};
const arrayRepetido = Object.entries(distribucionScrabbleCatala)
  .flatMap(([letra, { cantidad }]) => Array(cantidad).fill(letra));

console.log(arrayRepetido);

let fichasAleatorias = obtenerFichasAleatorias(arrayRepetido);
console.log(fichasAleatorias);




const boxes = document.querySelectorAll(".grid-item[draggable]");
function inici(){
  [].forEach.call(boxes, function(box, index) {
    box.textContent = fichasAleatorias[index]; })
}


[].forEach.call(boxes, function(box, index) {
  //box.textContent = randomNumsArray[index];

  box.addEventListener("dragstart", DnD.onDragStart, false);
  box.addEventListener("dragenter", DnD.onDragEnter, false);
  box.addEventListener("dragover", DnD.onDragOver, false);
  box.addEventListener("dragleave", DnD.onDragLeave, false);
  box.addEventListener("drop", DnD.onDrop, false);
  box.addEventListener("dragend", DnD.onDragEnd, false);
  
});

inici()
function updateWordInput() {
  var board = document.getElementById("scrabble-board");
  var tiles = board.getElementsByClassName("grid-item");
  var wordInput = document.getElementById("word-input");
  var word = "";

  for (var i = 0; i < tiles.length; i++) {
      word += tiles[i].innerText;
  }

  wordInput.value = word;
}
/* document.addEventListener("DOMContentLoaded", function() {
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
  elementos.forEach(function(elemento) {
    miDiv.appendChild(elemento);
  });
}); */
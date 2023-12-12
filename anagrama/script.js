function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var tile = document.getElementById(data);
    
    // Obtener las coordenadas del evento de soltar
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    // Crear la ficha en el tablero y establecer su posición
    var board = document.getElementById("scrabble-board");
    var rect = board.getBoundingClientRect();
    var x = mouseX - rect.left;
    var y = mouseY - rect.top;

    // Insertar la ficha en la posición adecuada en el tablero
    var tiles = board.getElementsByClassName("tile");
    var inserted = false;

    for (var i = 0; i < tiles.length; i++) {
        var tileX = tiles[i].offsetLeft;
        if (x < tileX) {
            // Insertar la nueva ficha a la izquierda de la ficha actual
            board.insertBefore(tile, tiles[i]);
            inserted = true;
            break;
        }
    }

    // Si no se ha insertado aún, añadir al final
    if (!inserted) {
        board.appendChild(tile);
    }

    // Actualizar el input de la palabra
    updateWordInput();
}

function dropToRack(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var tile = document.getElementById(data);
    var rack = document.getElementById("tile-rack");

    // Restablecer la posición de la ficha en el tile-rack
    tile.style.position = "static";

    // Añadir la ficha de nuevo al tile-rack
    rack.appendChild(tile);

    // Actualizar el input de la palabra
    updateWordInput();
}

var touchStartX, touchStartY;

function touchStart(event, tileId) {
    event.preventDefault();
    var tile = document.getElementById(tileId);
    var touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;

    // Configurar un temporizador breve para detectar si es un toque después de soltar
    setTimeout(function () {
        tile.style.backgroundColor = "lightblue"; // Cambiar el color de fondo al tocar
    }, 300); // Puedes ajustar la duración del temporizador según tus necesidades
}

function touchMove(event) {
    event.preventDefault();
    var data = event.target.id;
    var tile = document.getElementById(data);
    var touch = event.touches[0];
    tile.style.left = touch.clientX - tile.offsetWidth / 2 + "px";
    tile.style.top = touch.clientY - tile.offsetHeight / 2 + "px";
}

function touchEnd(event) {
    event.preventDefault();
    var data = event.target.id;
    var tile = document.getElementById(data);

    tile.style.backgroundColor = ""; // Restablecer el color de fondo

    // Verificar si es un toque después de soltar
    if (Math.abs(touchStartX - event.changedTouches[0].clientX) < 5 &&
        Math.abs(touchStartY - event.changedTouches[0].clientY) < 5) {
        // Acciones específicas para el toque después de soltar
        console.log("Toque después de soltar");
    } else {
        // Acciones para el arrastre después de soltar
        console.log("Arrastre después de soltar");
    }
}




function updateWordInput() {
    var board = document.getElementById("scrabble-board");
    var tiles = board.getElementsByClassName("tile");
    var wordInput = document.getElementById("word-input");
    var word = "";

    for (var i = 0; i < tiles.length; i++) {
        word += tiles[i].innerText;
    }

    wordInput.value = word;
}

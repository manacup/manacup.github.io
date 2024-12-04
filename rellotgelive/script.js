// Configuració del projecte Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Configuració de Firebase (substitueix amb les dades del teu projecte)
const firebaseConfig = {
    apiKey: "AIzaSyBDeC21hIyFhCD_j3hWdpgvfbZ1zjZyFvc",
    authDomain: "provatempsreal.firebaseapp.com",
    databaseURL: "https://provatempsreal-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "provatempsreal",
    storageBucket: "provatempsreal.firebasestorage.app",
    messagingSenderId: "269372325034",
    appId: "1:269372325034:web:619f20a3c0ebbee24864d3",
};

// Inicialitza Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Funció per actualitzar el marcador en temps real
function sincronitzarMarcador(jugador, elementId) {
  const marcadorRef = ref(db, `marcadors/${jugador}`);
  const marcadorDiv = document.getElementById(elementId);

  // Escolta els canvis en temps real
  onValue(marcadorRef, (snapshot) => {
    marcadorDiv.textContent = snapshot.val() || 0;
  });
}

// Sincronitza els marcadors dels jugadors
sincronitzarMarcador('jugador1', 'marcador1');
sincronitzarMarcador('jugador2', 'marcador2');

// Funció per incrementar el marcador d'un jugador
function incrementar(jugador) {
  const marcadorRef = ref(db, `marcadors/${jugador}`);
  const marcadorDiv = document.getElementById(`marcador${jugador === 'jugador1' ? 1 : 2}`);
  const valorActual = parseInt(marcadorDiv.textContent);
  set(marcadorRef, valorActual + 1);
}

// Funció per reiniciar el marcador d'un jugador
function reset(jugador) {
  const marcadorRef = ref(db, `marcadors/${jugador}`);
  set(marcadorRef, 0);
}

// Configuració del projecte Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBDeC21hIyFhCD_j3hWdpgvfbZ1zjZyFvc",
    authDomain: "provatempsreal.firebaseapp.com",
    databaseURL: "https://provatempsreal-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "provatempsreal",
    storageBucket: "provatempsreal.firebasestorage.app",
    messagingSenderId: "269372325034",
    appId: "1:269372325034:web:619f20a3c0ebbee24864d3"
  };
  
  // Inicialitza Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  // Funció per sincronitzar el marcador i l'input
  function sincronitzarMarcador(jugador, marcadorId, inputId) {
    const marcadorRef = db.ref(`marcadors/${jugador}/valor`);
    const inputRef = db.ref(`marcadors/${jugador}/nom`);
    const marcadorDiv = document.getElementById(marcadorId);
    const input = document.getElementById(inputId);
  
    // Sincronitza el marcador
    marcadorRef.on('value', (snapshot) => {
      marcadorDiv.textContent = snapshot.val() || 0;
    });
  
    // Sincronitza l'input
    inputRef.on('value', (snapshot) => {
      input.value = snapshot.val() || '';
    });
  }
  
  // Sincronitza jugador 1 i jugador 2
  sincronitzarMarcador('jugador1', 'marcador1', 'input1');
  sincronitzarMarcador('jugador2', 'marcador2', 'input2');
  
  // Funció per incrementar el marcador d'un jugador
  function incrementar(jugador) {
    const marcadorRef = db.ref(`marcadors/${jugador}/valor`);
    marcadorRef.once('value').then((snapshot) => {
      const valorActual = snapshot.val() || 0;
      marcadorRef.set(valorActual + 1);
    });
  }
  
  // Funció per restar punts al marcador d'un jugador
  function restar(jugador) {
    const marcadorRef = db.ref(`marcadors/${jugador}/valor`);
    marcadorRef.once('value').then((snapshot) => {
      const valorActual = snapshot.val() || 0;
      marcadorRef.set(valorActual > 0 ? valorActual - 1 : 0); // Evita valors negatius
    });
  }
  
  // Funció per reiniciar el marcador d'un jugador
  function reset(jugador) {
    const marcadorRef = db.ref(`marcadors/${jugador}/valor`);
    marcadorRef.set(0);
  }
  
  // Funció per actualitzar el valor de l'input
  function actualitzarInput(jugador, valor) {
    const inputRef = db.ref(`marcadors/${jugador}/nom`);
    inputRef.set(valor);
  }
  
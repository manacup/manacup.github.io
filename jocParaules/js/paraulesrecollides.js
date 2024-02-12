
var paraulesConsultades
//const url = "https://script.google.com/macros/s/AKfycbzN6ZwJ3q46WzSnrHNg053WcXtsGxsGyuakqg1dbTg4IKTEvS_bqwhe408tbOLYwBjE/exec";

async function fetchJSON(url) {
  const response = await fetch(url);
  const jsonData = await response.json();
  paraulesConsultades = jsonData.paraules; // Selecciona el camp `paraules` del JSON
  return 
}

fetchJSON("https://script.google.com/macros/s/AKfycbzN6ZwJ3q46WzSnrHNg053WcXtsGxsGyuakqg1dbTg4IKTEvS_bqwhe408tbOLYwBjE/exec")




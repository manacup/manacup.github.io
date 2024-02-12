
async function fetchJSON(url) {
  const response = await fetch(url);
  const jsonData = await response.json();
  const constantValue = jsonData.paraules; // Selecciona el camp `paraules` del JSON
  return constantValue;
}
const url = "https://script.google.com/macros/s/AKfycbzN6ZwJ3q46WzSnrHNg053WcXtsGxsGyuakqg1dbTg4IKTEvS_bqwhe408tbOLYwBjE/exec";

const paraulesConsultades = await fetchJSON(url);

console.log(paraules); // Mostra el valor del camp `paraules`

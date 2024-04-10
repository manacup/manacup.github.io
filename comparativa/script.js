const macroURL = "https://script.google.com/macros/s/AKfycbzI7IQHgb4g4T_7KVuTwW8Wm-nYFKnUz8VZTNKCo-iQW7-Hf2di1db1c3DE55Jar_WTVA/exec"
    var data = llistaJugadorsBarruf()
    function canvia(){
      spinner("")
    var jugador = document.getElementById("jugador").value;
    var adversari = document.getElementById("adversari").value;
    document.getElementById("resposta").innerHTML="" 
    
    iniciJSON(jugador,adversari)
    
  }
  
  function mostraOK(partides) {
    console.log(partides)
 var campionat    
    partides.forEach(partida=>{

if(partida.campionat!=campionat){
  campionat=partida.campionat
  const campionattemplate = `
<li class="list-group-item d-flex  align-items-center active">${partida.campionat}</li>
`
document.getElementById("resposta").innerHTML+=campionattemplate
}


const partidatemplate = `
<li class="list-group-item d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#partidaModal" onclick="recuperaPartida('${partida.campionat}',${partida.row})">${partida.jugador} (${partida.puntsJugador}-${partida.puntsAdversari}) ${partida.adversari}</li>
`
document.getElementById("resposta").innerHTML+=partidatemplate

    })
   spinner("d-none")  
  }



function llistaJugadorsBarruf(){
   // Crida a l'API del Google Apps Script
  var myHeaders = new Headers();
  var myInit = {
  method: "GET",
  headers: myHeaders,
  mode: "no-cors",
  cache: "default",
};
  Promise.all([    
    fetch(macroURL + "?page=jugadors"),
     
  ])
  .then(responses => Promise.all(responses.map(response => response.json())))
  .then(([data]) => {

      
       let jugadors = data.dades
    document.querySelectorAll(".seljugadors").forEach(sel=>{
for(index in jugadors) {
    sel.options[sel.options.length] = new Option(jugadors[index], jugadors[index]);
}
    })
spinner("d-none")
  })
  .catch(error => console.error("Error:", error));
}    
function iniciJSON(jugador,adversari) { 

  // Crida a l'API del Google Apps Script
  var myHeaders = new Headers();
  var myInit = {
  method: "GET",
  headers: myHeaders,
  mode: "no-cors",
  cache: "default",
};
  var jugador=encodeURIComponent(jugador)
var adversari=encodeURIComponent(adversari)
  
  Promise.all([    
    fetch(macroURL + "?page=JSON&jugador="+jugador+"&adversari="+adversari),
     
  ])
  .then(responses => Promise.all(responses.map(response => response.json())))
  .then(([data]) => {
    // Process dataTrobades, dataJugadors, etc.
    // ...
       // Example: Accessing data from the 'trobades' response
       let partides = data.dades
      
       // Process 'trobades' data...
   
       // Example: Accessing data from the 'jugadors' response
       
   
       // Continue with your logic here..
  mostraOK(partides)
  })
  .catch(error => console.error("Error:", error));
}
    function spinner(estat){
  var spinner = document.getElementById("spinner")
  if(estat=="d-none"){
    spinner.classList.add("d-none")
  }else{
    spinner.classList.remove("d-none")
  }
}
function recuperaPartida(full,row){
    spinner("")
   // Crida a l'API del Google Apps Script
  var myHeaders = new Headers();
  var myInit = {
  method: "GET",
  headers: myHeaders,
  mode: "no-cors",
  cache: "default",
};
  Promise.all([    
    fetch(macroURL + "?page=partida&full="+full+"&row="+row),
     
  ])
  .then(responses => Promise.all(responses.map(response => response.json())))
  .then(([data]) => {

      console.log(data.dades)
       let partida = data.dades
      partida.campionat=full
      
    
mostraPartida(partida)
  })
  .catch(error => console.error("Error:", error));
}   
function mostraPartida(partida){
var body = document.getElementById("partidaModalBody")
var titol = document.getElementById("partidaModalTitol")=partida.campionat
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
            <div class="text-muted mb-3">Suma: ${partida.Suma_punts}</div>
            <div class="d-flex justify-content-center mb-4">
              <div class="col align-items-start">
                <h4 class="m-2 nom">${partida.Jugador1}</h4>
                <div class="d-flex flex-column align-items-center">
                  <div class="card m-2 p-2 w-75 bg-primary bg-opacity-25 rounded-4">
                    <small>Millor jugada</small>
                    <h6 class="m-2 mot">${partida.Mot_1}</h6>
                    <h4>${partida.Puntsmot_1}</h4>
                    <small class="text-muted">Punts</small>
                  </div>
                  <div class="card m-2 p-2 w-75 bg-primary bg-opacity-25 rounded-4">
                    <small>Scrabbles</small>
                    <h4>${partida.Scrabbles_1}</h4>
                  </div>
                </div>
              </div>
              <div class="vr"></div>
              <div class="col align-items-end">
                <h4 class="m-2 nom">${partida.Jugador2}</h4>
                <div class="d-flex flex-column align-items-center">
                  <div class="card m-2 p-2 w-75 bg-primary bg-opacity-25 rounded-4">
                    <small>Millor jugada</small>
                    <h6 class="m-2 mot">${partida.Mot_2}</h6>
                    <h4>${partida.Puntsmot_2}</h4>
                    <small class="text-muted">Punts</small>
                  </div>
                  <div class="card m-2 p-2 w-75 bg-primary bg-opacity-25 rounded-4">
                    <small>Scrabbles</small>
                    <h4>${partida.Scrabbles_2}</h4>
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
                partida.Full
              }" class="d-block  rounded cover img-fluid" onclick="loadContent(['imatge',this])">
            </div>
            <div class="carousel-item quadrat">
              <img src="${
                partida.Tauler
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
    <p>Resultats enviats el ${ExcelDateToJSDate(partida.Data)}</p>
        <blockquote class="blockquote bg-danger bg-opacity-25 mb-4" style="border-left: 2px solid red;">
          <div class="mb-0 p-3 ${!partida.Comentaris ? "d-none" : ""}">${
    partida.Comentaris
  }</div>
        </blockquote>
   
      </div>
          
  `;
 
  body.innerHTML = partidaTemplate;
 spinner("d-none")
}
function ExcelDateToJSDate(serial) {
   var utc_days  = Math.floor(serial - 25569);
   var utc_value = utc_days * 86400;                                        
   var date_info = new Date(utc_value * 1000);

   var fractional_day = serial - Math.floor(serial) + 0.0000001;

   var total_seconds = Math.floor(86400 * fractional_day);

   var seconds = total_seconds % 60;

   total_seconds -= seconds;

   var hours = Math.floor(total_seconds / (60 * 60));
   var minutes = Math.floor(total_seconds / 60) % 60;
var jsdate = new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds)
   return jsdate.toLocaleDateString();
}

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
<li class="list-group-item d-flex align-items-center">${partida.jugador} (${partida.puntsJugador}-${partida.puntsAdversari}) ${partida.adversari}</li>
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

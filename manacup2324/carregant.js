 function elimina(el){
     el.style.color="red"
     el.classList.add("desapareixdreta")
     setTimeOut((el)=>{
         el.remove()},100)
 }
let interval = ""
function carregant(){
    const template = `
        <div class="p-1">
          <div class="card " onclick="elimina(this);">
            <div class="card-body">
              <div class="row ">
                <div class="col-2">
                  <h1 class="card-title placeholder-glow"><span class="placeholder col-6"></span></h1>
                </div>
                <div class="col-10">
                  <h5 class="card-title placeholder-glow"><span class="placeholder col-6"></span></h5>
                  <p class="card-text card-text placeholder-glow">
                    <span class="placeholder col-3"></span>
                  </p>
                  <p class="card-text card-text placeholder-glow">
                    <span class="placeholder col-4"></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        `

    
    function escribirCadaSegundo() {
      //let content = document.getElementById("content")
        content.innerHTML=""
        let contador = 0;
      
        const intervalo = setInterval(() => {
          // Acción que se ejecutará cada segundo
          var div = document.createElement("div")
          div.innerHTML = template
          content.appendChild(div)
          contador++;
      
          if (contador === 6) {
            // Reinicia el contador después de imprimir todas las letras del alfabeto
            contador = 0;
            content.innerHTML=""
          }
        }, 500); // Intervalo de 1000 milisegundos (1 segundo)
        return intervalo;
        
      }
      
      // Llamamos a la función para iniciar el proceso
      interval = escribirCadaSegundo();
}

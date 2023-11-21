let interval = ""
function carregant(){
    const template = `
        <div class="col-md-8 p-1">
          <div class="card ">
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
        var content = document.getElementById("content")
        function repetir(n){
            for (let i = 0; i < n; i++) {
                setTimeout(function(){
            content.innerHTML += template
        },1000)
        }
    }
    repetir(5)  
    
    function escribirCadaSegundo() {
        content.innerHTML=""
        let contador = 0;
      
        const intervalo = setInterval(() => {
          // Acción que se ejecutará cada segundo
          content.innerHTML += template
          contador++;
      
          if (contador === 5) {
            // Reinicia el contador después de imprimir todas las letras del alfabeto
            contador = 0;
            content.innerHTML=""
          }
        }, 1000); // Intervalo de 1000 milisegundos (1 segundo)
      
        
      }
      
      // Llamamos a la función para iniciar el proceso
      interval = escribirCadaSegundo();
}

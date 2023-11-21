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
        },1000,)
        }
    }
    repetir(5)    
}

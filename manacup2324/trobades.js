function renderTrobada(trobada) {
  //console.log(trobada)

  if (trobada === false) {
    //document.getElementById("tabTrobades").classList.add("disabled")
  } else {
    let sopar = "";
    let assistents = trobada.assistents;
    if (trobada.Sopar == "TRUE") {
      sopar =
        "Quedaran a sopar " +
        assistents.filter((as) => as.Sopar == "Quedaré a sopar").length +
        " persones.";
    }

    const trobadaListTemplate = `
      <div >
          <div class="card mb-3"> <!-- Replace with Bootstrap list group -->
              <div class="card-body">
                  <div class="row">
                     <div class="mb-3 text-center">
                      <div class="h5 mb-3">${trobada.Trobada}</div>
                      <button id="botoAssisteix" class="btn btn-lg btn-danger ${
                        jugadorDesat.Nom == "" ? "d-none" : ""
                      }" onclick="loadContent(['assistencia']);updateHistory(['assistencia']);">
                          <i class="bi bi-hand-index"></i>
                          Confirma l'assistència
                      </button>
                      <button id="botoAssisteix2" class="btn btn-lg btn-danger ${
                        jugadorDesat.Nom != "" ? "d-none" : ""
                      }" data-bs-toggle="modal" data-bs-target="#desajug" aria-expanded="false"
              aria-controls="desajug">
                          <i class="bi bi-hand-index"></i>
                          Confirma l'assistència
                      </button>
              </div>
                      <p class="mb-2">${trobada.Data} a les ${trobada.Hora}</p>
                      <p><i class="mb-2">${trobada.Lloc}</i></p>
                  </div>
                  <p>Assistiran ${
                    assistents.filter((as) => as.Assistencia == "si").length
                  } dels ${assistents.length - 1} que han avisat.</p>
                  <p>${sopar ?? ""}</p>
              </div>
          </div>
      </div>
      <div>       
          <div id="assistents-list">           
              <div>
                  <ul id="ulListAssist" class="list-group"></ul>
              </div>
          </div>
      </div>  
    `;
    document.getElementById("content").innerHTML += trobadaListTemplate;
    assistents.sort(function (a, b) {
      var nameA = a.Assistencia.toUpperCase(); // ignore upper and lowercase
      var nameB = b.Assistencia.toUpperCase(); // ignore upper and lowercase
      if (nameA > nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    assistents.forEach((assistent) => {
      const assistentsTemplate = `
    <li id="itemAssistents" class="list-group-item">
              <h5 class="nom ${
                assistent.Assistencia != "si" ? " text-secondary" : ""
              }">${assistent.Nom}</h5>
              <span class="badge text-bg-${
                assistent.Primera_partida === "1a Partida disponible"
                  ? "success missatge"
                  : "primary"
              } ${
        assistent.Primera_partida.toString() === "NaN" ? "d-none" : ""
      }" data-nom="${assistent.Nom}">${assistent.Primera_partida}</span>
              <span class="badge text-bg-${
                assistent.Segona_partida === "2a Partida disponible"
                  ? "success missatge"
                  : "primary"
              } ${
        assistent.Segona_partida.toString() === "NaN" ? "d-none" : ""
      }" data-nom="${assistent.Nom}">${assistent.Segona_partida}</span>
              <span class="badge text-bg-info ${
                assistent.Joc != "Joc" ? "d-none" : ""
              }">${assistent.Joc}</span>
              <span class="badge text-bg-secondary ${
                assistent.Sopar != "Quedaré a sopar" ? "d-none" : ""
              }">${assistent.Sopar}</span>
          </li>
    `;
      document.getElementById("ulListAssist").innerHTML += assistentsTemplate;
    });
  }
}

function renderFormTrobada(trobada) {
  const ronda1 = trobada.max_ronda - trobada.Rondes_a_jugar + 1;
  const ronda2 = trobada.max_ronda - trobada.Rondes_a_jugar + 2;
  //console.log(ronda1,ronda2,trobada)

  const trobadaTemplate = `
  <form id="trobadaForm">
      <input type="hidden" value="${
        trobada.ID_trobada
      }" name="ID_trobada" readonly />
  
      <div class="row">
        <div class="col-12">
          <div class="mb-3">
            
            <input type="search" class="form-control llistajugadorsform" name="Nom" id="jugAssistencia" required data-datalist="jugadors" value="${
              jugadorDesat.Nom || ""
            }" placeholder="Comença a escriure el nom i tria de la llista">
            
          </div>
        </div>
      </div>
  
      <div class="row">
        <div class="col-10 mb-3">Assistiré a la trobada</div>
        <div class="col-2 text-end">
          <div class="form-check form-switch">
            <input class="form-check-input" name="Assistencia" type="checkbox" role="switch" id="siAssistire"  value="si" data-bs-toggle="collapse" data-bs-target="#assisteix" onchange="this.checked?document.getElementById('noAssistire').checked=false:document.getElementById('noAssistire').checked=true">
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input visually-hidden" name="Assistencia" type="checkbox" role="switch" id="noAssistire"  value="no" checked>        
           
          </div>
        </div>
      </div>
  
      <div id="assisteix" class="collapse">
        <div class="row">
          <div class="col-12">
            
  
            <div id="partida1" class="card mb-4">  
            <div class="card-body">        
              <h6 class="card-title">Primera partida <span id="ronda1"></span></h6>
              <div class="row">
                <div class="col-10 mb-3">He pactat la ronda amb el meu adversari <span id="adv1">${
               jugadorDesat.partides.filter((p) => p.Ronda == ronda1)?
                   jugadorDesat.partides.filter((p) => p.Ronda == ronda1)[0].Jugador2:
                  ""
                }</span></div>
                <div class="col-2 text-end">
                  <div class="form-check form-switch">
                    <input class="form-check-input ch1" type="radio" role="switch" name="Primera_partida" id="Primera_partida" value="1a Partida oficial amb " onchange="this.checked?document.getElementById('jugPacte1').value='${
                   jugadorDesat.partides.filter((p) => p.Ronda == ronda1)[0].Jugador2    
                    }':''">
                   
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-10 mb-3">He pactat una altra partida</div>
                <div class="col-2 text-end">
                  <div class="form-check form-switch">
                    <input class="form-check-input ch1" type="radio" role="switch" name="Primera_partida" id="partida_disp_pacte1" value="1a Partida pactada amb " data-bs-toggle="collapse" data-bs-target="#adversaripacte1">
                    
                  </div>
                </div>
                <div class="collapse mb-3" id="adversaripacte1" >
                  <div class="">
                    
                    <input type="search" class=" form-control llistajugadorstrobada" id="jugPacte1"  name="Adv1" data-datalist="jugadors" placeholder="Comença a escriure el nom i tria de la llista">
                    
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-10 mb-3">Estic disponible per una partida</div>
                <div class="col-2 text-end">
                  <div class="form-check form-switch">
                    <input class="form-check-input ch1" type="radio" role="switch" name="Primera_partida" id="Primera_partida_disp"  value="1a Partida " data-bs-config='{"hide":true}' data-bs-target="#adversaripacte1" onchange="this.checked?document.getElementById('jugPacte1').value='disponible':''">
                    
                  </div>
                </div>
              </div>
             
            </div>
            </div>
  
  
            <!-- Second Game Content (partida2) -->
            <div id="partida2" class="card mb-4 ${
              trobada.Rondes_a_jugar == 1 ? "d-none" : ""
            }">
            <div class="card-body">    
              <h6 class="card-title">Segona partida <span id="ronda2"></span></h6>
              <div class="row">
                <div class="col-10 mb-3">He pactat la ronda amb el meu adversari <span id="adv2">${
                jugadorDesat.partides.filter((p) => p.Ronda == ronda2)[0].Jugador2 
                }</span></div>
                <div class="col-2 text-end">
                  <div class="form-check form-switch">
                    <input class="form-check-input ch2" type="radio" role="switch" name="Segona_partida" id="Segona_partida" value="2a Partida oficial amb " onchange="this.checked?document.getElementById('jugPacte2').value='${
                      jugadorDesat.partides.filter((p) => p.Ronda == ronda2)[0].Jugador2 
                    }':''">
                   
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-10 mb-3">He pactat una altra partida</div>
                <div class="col-2 text-end">
                  <div class="form-check form-switch">
                    <input class="form-check-input ch2" type="radio" role="switch" name="Segona_partida" id="partida_disp_pacte2" value="2a Partida pactada amb " data-bs-toggle="collapse" data-bs-target="#adversaripacte2">
                   
                  </div>
                </div>
                <div class="collapse mb-3" id="adversaripacte2" >
                  <div class="">
                   
                    <input type="search" class="form-control llistajugadorstrobada" id="jugPacte2"  name="Adv2" data-datalist="jugadors" placeholder="Comença a escriure el nom i tria de la llista">
                  
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-10 mb-3">Estic disponible per una partida</div>
                <div class="col-2 text-end">
                  <div class="form-check form-switch">
                    <input class="form-check-input ch2" type="radio" role="switch" name="Segona_partida" id="Segona_partida_disp" value="2a Partida "  onchange="this.checked?document.getElementById('jugPacte2').value='disponible':''">
                   
                  </div>
                </div>
              </div>
              </div>
            </div>
  
            <!-- 'joc' Section -->
            <div id="joc">
              <div class="row">
                <div class="col-10 mb-3">Duré un joc</div>
                <div class="col-2 text-end">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="ducJoc" value="Joc" name="Joc">
                   
                  </div>
                </div>
              </div>
             
            </div>
  
            <!-- 'sopar' Section -->
            <div id="sopar" class="${trobada.Sopar != "TRUE" ? "d-none" : ""}">
              <div class="row">
                <div class="col-10 mb-3">Quedaré a sopar</div>
                <div class="col-2 text-end">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="sopare" value="Quedaré a sopar" name="Sopar">
                   
                  </div>
                </div>
              </div>
            </div>      
  
  
          </div>
        </div>
      </div>
  <input type="hidden" value="${new Date().toLocaleString()}" name="Data" class="visually-hidden">
  
  
      <div class="row mt-4">
        <div class="col-12 text-end">
          <button id="enviaAssistencia" class="btn btn-primary" type="submit" onclick="main()">
             <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true" id="spnbtn3"></span>
             Envia la resposta
          </button>
           
        </div>
      </div>
    </form>
    `;

  document.getElementById("content").innerHTML += trobadaTemplate;
}

async function main() {
  preventFormSubmit();
  let form = document.getElementById("trobadaForm");
  //const obj = await ParseFormObjectForGAS(form); // Heare, this library is used.
  const dataform = new FormData(form);
  const values = Object.fromEntries(dataform.entries());
  /*      values.Primera_partida=values.Primera_partida+values.Adv1
            values.Segona_partida=values.Segona_partida+values.Adv2            
      console.log(values)          
      trobada.assistents.push(values)  */

  document.getElementById("enviaAssistencia").disabled = true;
  document.getElementById("spnbtn3").classList.remove("d-none");
  fetch(macroURL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      envia: 'trobada', 
      values: values, 
      idfull: idfull,
    }),
  })
  .then(response => response.text())
  .then(data => {
    console.log('Resposta del servidor:', data);
    setTimeout(iniciJSON("trobades"), 2000)
  })
  .catch(error => console.error('Error:', error));
/*   google.script.run
    .withFailureHandler((err) => console.log(err.message))
    .withSuccessHandler(function () {
      setTimeout(funcioInici("trobades"), 2000);
    })
    .enviaTrobades(values, idfull); // The form object parsed by this library is used here. */
}

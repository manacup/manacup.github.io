var  timezone, startTime, endTime, title, description, venueName, address, city, state
Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}
function renderTrobada(trobada) {
  startTime = new Date(ExcelDateToJSDate(parseFloat(trobada.horautc.replace(/,/g, '.')),true)).addHours(-2)
  endTime = new Date(ExcelDateToJSDate(parseFloat(trobada.horautc.replace(/,/g, '.')),true)).addHours(1)
  title = trobada.Trobada + " xàmpions"
  address = trobada.adreça
  venueName = trobada.Lloc

  console.log(trobada.horautc,startTime,endTime)

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
      <div>
          <div class="card mb-3"> 
              <div class="card-body">
                  <div class="row">
                     <div class="mb-3 text-center">
                     <a class=" position-absolute top-10 end-0 translate-middle pt-2 pe-1" id="downloadICS" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Afegeix l'esdeveniment al teu calendari">
                    <i class="bi bi-calendar-plus"></i>
                  </a>
                      <div class="h5 mb-3">${trobada.Trobada}</div>
                      <button id="botoAssisteix" class="btn btn-lg btn-danger ${
                        jugadorDesat.ID == 0 ? "d-none" : ""
                      }" onclick="loadContent(['assistencia']);updateHistory(['assistencia']);">
                          <i class="bi bi-hand-index"></i>
                          Confirma l'assistència
                      </button>
                      <button id="botoAssisteix2" class="btn btn-lg btn-danger ${
                        jugadorDesat.ID != 0 ? "d-none" : ""
                      }" data-bs-toggle="modal" data-bs-target="#desajug" aria-expanded="false"
              aria-controls="desajug">
                          <i class="bi bi-hand-index"></i>
                          Confirma l'assistència
                      </button>
                    </div>                   
                       <div class="d-flex">
                        <div class="p-2 flex-shrink-1">
                          <i class="bi bi-calendar-event"></i>
                        </div>
                        <div class="p-2 w-100">
                          ${trobada.Data}
                        </div>
                      </div>
                       <div class="d-flex">
                        <div class="p-2 flex-shrink-1">
                          <i class="bi bi-clock"></i>
                        </div>
                        <div class="p-2 w-100">
                          ${trobada.Hora}
                        </div>
                      </div>
                       <div class="d-flex">
                        <div class="p-2 flex-shrink-1">
                          <i class="bi bi-geo-alt"></i>
                        </div>
                        <div class="p-2 w-100">
                          <span class="fs-4">${trobada.Lloc}</span>
                        </div>
                      </div>
                      <div class="d-flex">
                        <div class="p-2 flex-shrink-1">
                          <i class="bi bi-map"></i>
                        </div>
                        <div class="p-2 w-100">
                          <a href="${trobada.maps}">${trobada.adreça}</a>
                        </div>
                      </div>                     
                  </div>
                  </div>
                  </div>
                  <div class="card mb-3"> 
              <div class="card-body">
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
  
  document.getElementById('downloadICS').addEventListener('click', () => {
    createDownloadICSFile(
      'Europe/Madrid',
      startTime,
      endTime,
      title,
      '',
      venueName,
      address,
      '',
      ''
    );  
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
          <div class="input-group mb-3">
            
            <input type="search" class="form-control llistajugadorsform" name="Nom" id="jugAssistencia" required readonly  value="${
              jugadorDesat.Nom || ""
            }" placeholder="Comença a escriure el nom i tria de la llista" >
             <button class="btn btn-primary" type="button" id="button-addon2" data-bs-toggle="modal" data-bs-target="#desajug" aria-expanded="false"
              aria-controls="desajug" onclick="loadContent(['trobades'])">Canvia</button>
          </div>
        </div>
      </div>
  
      <div class="row">
        
        <div class="col-12 mb-3">
        <select class="form-select" name="Assistencia" id="Assistencia">
          <option selected disabled>Selecciona del desplegable</option>
          <option value="si">Assistiré a la trobada</option>
          <option value="no">No assistiré a la trobada</option>
          
        </select>
          
        </div>
      </div>
  
      <div id="assisteix" class="collapse">
        <div class="row">
          <div class="col-12">
            
  
            <div id="partida1" class="card mb-4">  
            <div class="card-body">        
              <h6 class="card-title">Primera partida <span id="ronda1"></span></h6>
              <div class="row">
                <div class="col-10 mb-3">He pactat la ronda amb el meu adversari <span id="adv1" class="nom">${
                  jugadorDesat.partides.filter((p) => p.Ronda == ronda1)[0] !=
                  undefined
                    ? jugadorDesat.partides.filter((p) => p.Ronda == ronda1)[0]
                        .Jugador2
                    : "(no tenc adversari definit en aquesta ronda)"
                }</span></div>
                <div class="col-2 text-end">
                  <div class="form-check form-switch">
                    <input class="form-check-input ch1" type="radio" role="switch" name="Primera_partida" id="Primera_partida" value="1a Partida oficial amb " onchange="this.checked?document.getElementById('jugPacte1').value='${
                      jugadorDesat.partides.filter(
                        (p) => p.Ronda == ronda1
                      )[0] != undefined
                        ? jugadorDesat.partides.filter(
                            (p) => p.Ronda == ronda1
                          )[0].Jugador2
                        : "(no tenc adversari definit en aquesta ronda)"
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
                <div class="col-10 mb-3">He pactat la ronda amb el meu adversari <span id="adv2" class="nom">${
                  jugadorDesat.partides.filter((p) => p.Ronda == ronda2)[0] !=
                  undefined
                    ? jugadorDesat.partides.filter((p) => p.Ronda == ronda2)[0]
                        .Jugador2
                    : "(no tenc adversari definit en aquesta ronda)"
                }</span></div>
                <div class="col-2 text-end">
                  <div class="form-check form-switch">
                    <input class="form-check-input ch2" type="radio" role="switch" name="Segona_partida" id="Segona_partida" value="2a Partida oficial amb " onchange="this.checked?document.getElementById('jugPacte2').value='${
                      jugadorDesat.partides.filter(
                        (p) => p.Ronda == ronda2
                      )[0] != undefined
                        ? jugadorDesat.partides.filter(
                            (p) => p.Ronda == ronda2
                          )[0].Jugador2
                        : "(no tenc adversari definit en aquesta ronda)"
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
          <button id="enviaAssistencia" class="btn btn-primary" type="submit" onclick="main()" disabled>
             <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true" id="spnbtn3"></span>
             Envia la resposta
          </button>
           
        </div>
      </div>
    </form>
    `;

  document.getElementById("content").innerHTML += trobadaTemplate;
  let assistencia = document.getElementById("Assistencia");
  assistencia.addEventListener("change", () => {
    assistencia.value == "si"
      ? document.getElementById("assisteix").classList.add("show")
      : document.getElementById("assisteix").classList.remove("show");
    assistencia.value!=""
    ?document.getElementById("enviaAssistencia").disabled=false
    :document.getElementById("enviaAssistencia").disabled=true
  });
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
  console.log(JSON.stringify({
      envia: 'trobada', 
      values: values, 
      idfull: idfull,
      idJSON: idJSON,
    }))
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
      idJSON: idJSON,
    }),
  })
  .then(response => {
    response.text()
      console.log(response.text())})
  .then(data => {
    console.log('Resposta del servidor:', data);
    setTimeout(iniciJSON(false,"trobades"), 500)
  })
  .catch(error => console.error('Error:', error));

}

/**
* Create and download a file on click
* @params {string} filename - The name of the file with the ending
* @params {string} filebody - The contents of the file
*/
function download(filename, fileBody) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(fileBody));
  element.setAttribute('download', filename);

  //element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


/**
* Returns a date/time in ICS format
* @params {Object} dateTime - A date object you want to get the ICS format for.
* @returns {string} String with the date in ICS format
*/
function convertToICSDate(dateTime) {
  const year = dateTime.getFullYear().toString();
  const month = (dateTime.getMonth() + 1) < 10 ? "0" + (dateTime.getMonth() + 1).toString() : (dateTime.getMonth() + 1).toString();
  const day = dateTime.getDate() < 10 ? "0" + dateTime.getDate().toString() : dateTime.getDate().toString();
  const hours = dateTime.getHours() < 10 ? "0" + dateTime.getHours().toString() : dateTime.getHours().toString();
  const minutes = dateTime.getMinutes() < 10 ? "0" +dateTime.getMinutes().toString() : dateTime.getMinutes().toString();

  return year + month + day + "T" + hours + minutes + "00";
}


/**
* Creates and downloads an ICS file
* @params {string} timeZone - In the format America/New_York
* @params {object} startTime - Vaild JS Date object in the event timezone
* @params {object} endTime - Vaild JS Date object in the event timezone
* @params {string} title
* @params {string} description
* @params {string} venueName
* @params {string} address
* @params {string} city
* @params {string} state
*/
function createDownloadICSFile(timezone, startTime, endTime, title, description, venueName, address, city, state) {
const icsBody = 'BEGIN:VCALENDAR\n' +
'VERSION:2.0\n' +
'PRODID:Calendar\n' +
'CALSCALE:GREGORIAN\n' +
'METHOD:PUBLISH\n' +
'BEGIN:VTIMEZONE\n' +
'TZID:' + timezone + '\n' +
'END:VTIMEZONE\n' +
'BEGIN:VEVENT\n' +
'SUMMARY:' + title + '\n' +
'UID:@Default\n' +
'SEQUENCE:0\n' +
'STATUS:CONFIRMED\n' +
'TRANSP:TRANSPARENT\n' +
'DTSTART;TZID=' + timezone + ':' + convertToICSDate(startTime) + '\n' +
'DTEND;TZID=' + timezone + ':' + convertToICSDate(endTime)+ '\n' +
'DTSTAMP:'+ convertToICSDate(new Date()) + '\n' +
'LOCATION:' + venueName + '\\n' + address + ', ' + city + ', ' + state + '\n' +
'DESCRIPTION:' + description + '\n' +
'END:VEVENT\n' +
'END:VCALENDAR\n';

download(title + '.ics', icsBody);
}


/* document.getElementById('downloadICS').addEventListener('click', () => {
createDownloadICSFile(
  'Europe/Madrid',
  startTime,
  startTime,
  title,
  '',
  venueName,
  address,
  '',
  ''
);  
});
 */

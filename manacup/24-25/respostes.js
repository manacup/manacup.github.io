function renderFormulari(partida) {
  const formulariTemplate = `
    <div class="">
    <form id="myForm" onsubmit="handleFormSubmit(this)">
      <div class="">
       <input  type="hidden" name="idPartida" value="${
         partida.ID
       }" id="idPartida" readonly >
        <input type="hidden" name="ronda" value="${
          partida.Ronda
        }" id="ronda" readonly >      
  
        <div id="resultats" class="d-flex flex-column  mb-4">
          <div id="resultatsJug1" class="card">
            <div class="card-body">
              <div class="col">
                <div class="d-flex align-items-center mb-3">
                  <span class="h5 me-1"><i class="bi bi-person-circle"></i></span>
                  <input type="text" name="jugador1" id="jugador1" value="${
                    partida.Jugador1
                  }" readonly class="h5" style="border:none;width:100%;" >
                </div>
              </div>
  
              <div class="row mb-3">
                <div class="col">
  
                  <div class="form-group">
                    <label for="ptsJugador1">Puntuació final:</label>
                    <input id="ptsJugador1" type="number" name="ptsJugador1" required max="9999" class="form-control" value="${
                      partida.Puntuacio_1
                    }">
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="scrabbles1"> Scrabbles:</label>
                    <input id="scrabbles1" type="number" name="scrabbles1" required class="form-control" value="${
                      partida.Scrabbles_1
                    }">
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-8">
                  <div class="form-group">
                    <label for="mot1"> Mot de la millor jugada:</label>
                    <input id="mot1" type="text" name="mot1" required class="form-control" value="${
                      partida.Mot_1
                    }">
                  </div>
                </div>
  
                <div class="col">
                  <div class="form-group">
                    <label for="ptsJugada1"> Punts:</label>
                    <input id="ptsJugada1" type="number" name="ptsJugada1" required class="form-control" value="${
                      partida.Puntsmot_1
                    }">
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          <div class="row text-center m-3" id="swap">
  <span class="">
          <i class="bi bi-arrow-down-up"></i>
        </span></div>
          <div id="resultatsJug2" class="card">
            <div class="card-body">
              <div class="col">
                <div class="d-flex align-items-center mb-3">
                  <span class="h5 me-1"><i class="bi bi-person-circle"></i></span>
                  <input type="text" name="jugador2" id="jugador1" value="${
                    partida.Jugador2
                  }" readonly class="h5" style="border:none;width:100%;" >
                </div>
              </div>
              <div class="row mb-3">
                <div class="col">
  
                  <div class="form-group">
                    <label for="ptsJugador2">Puntuació final:</label>
                    <input id="ptsJugador2" type="number" name="ptsJugador2" required max="9999" class="form-control"  value="${
                      partida.Puntuacio_2
                    }">
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="scrabbles2"> Scrabbles:</label>
                    <input id="scrabbles2" type="number" name="scrabbles2" required class="form-control"  value="${
                      partida.Scrabbles_2
                    }">
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-8">
                  <div class="form-group">
                    <label for="mot2"> Mot de la millor jugada:</label>
                    <input id="mot2" type="text" name="mot2" required class="form-control"  value="${
                      partida.Mot_2
                    }">
                  </div>
                </div>
  
                <div class="col">
                  <div class="form-group">
                    <label for="ptsJugada2"> Punts:</label>
                    <input id="ptsJugada2" type="number" name="ptsJugada2" required class="form-control"  value="${
                      partida.Puntsmot_2
                    }">
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
  
     
  
        <div class="col-md-12">
          <div class="card center-align mb-4">
            <div class="card-body">
              
              <div class="text-center" onchange="carregaFull(event)">
              <img id="imgFull" src="${
                partida.Full || ""
              }" width="100%" height="auto"  class="rounded-3 mb-3">
                <div >
                  <label for="Full" class="btn btn-primary">
                    <span >
                      <i class="bi bi-camera"></i>
                      Imatge del full d'anotacions
                    </span>
                  </label>
                  <input id="Full" type="file" class="visually-hidden" accept="image/*">
                  <input name="full" id="Fullamagat" type="hidden">
                </div>
                
              </div>
            </div>
          </div>
        </div>
  
        <div class="col-md-12">
          <div class="card center-align blue-grey lighten-5 mb-4">
            <div class="card-body">
  
            <div class="text-center" onchange="carregaTauler(event)">
              <img id="imgTauler" src="${
                partida.Tauler || ""
              }" width="100%" height="auto" class="rounded-3 mb-3">
                <div>
                  <label for="Tauler" class="btn btn-primary">
                    <span>
                      <i class="bi bi-camera"></i>
                      Imatge del tauler
                    </span>
                  </label>
                  <input id="Tauler" type="file" class="visually-hidden" accept="image/*">
                  <input name="tauler" id="Tauleramagat" type="hidden">
                </div>              
              </div> 
            </div>
          </div>
        </div>
   <label for="trobadaoficial" class="form-label">Partida jugada a una trobada oficial?</label>
  <div class="form-check">
          <input type="radio" name="trobadaoficial" id="trobadaoficial" required class="form-check-input" ${
            partida.Punts_social > 0 ? "checked" : ""
          }>
          <label class="form-check-label" for="trobadaoficial">Sí</label>
        </div>
        <div class="form-check">
          <input type="radio" name="trobadaoficial" class="form-check-input" ${
            partida.Punts_social == 0 ? "checked" : ""
          }>
          <label class="form-check-label">No</label>
        </div>
  
  
        <div class="mb-3">
    <label for="comentaris" class="form-label">Comentaris</label>
    <textarea class="form-control" name="comentaris" id="comentaris" rows="3" value="${
      partida.Comentaris
    }">${partida.Comentaris}</textarea>
  </div>
    <div>
          <button type="submit" class="btn btn-primary mb-4" id="submitbtn2">
          <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true" id="spnbtn2"></span>
            Envia el resultat
          </button>
        </div>      
      </div>
      <input name="fullAntic" type="hidden" value="${partida.Full || ""}">
      <input name="taulerAntic" type="hidden" value="${partida.Tauler || ""}">
    </form>
  </div>
  `;
  document.getElementById("content").innerHTML += formulariTemplate;
  preventFormSubmit();

  let swap = document.getElementById("swap");
  swap.addEventListener("click", function () {
    var elemj1 = document
      .getElementById("resultatsJug1")
      .classList.toggle("order-3");
    var elemj2 = document
      .getElementById("resultatsJug2")
      .classList.toggle("order-1");
    swap.classList.toggle("order-2");
  });

  let imgInputFull = document.getElementById("Full");
  imgInputFull.addEventListener("change", function (e) {
    if (e.target.files) {
      let imageFile = e.target.files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = document.createElement("img");
        img.onload = function (event) {
          // Dynamically create a canvas element
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");

          ctx.drawImage(img, 0, 0);

          var MAX_WIDTH = 600;
          var MAX_HEIGHT = 600;
          var width = img.width;
          var height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          var dataurl = canvas.toDataURL("image/png");

          var finalUrl = dataurl.replace(/^data:image\/(png|jpg);base64,/, "");
          document.getElementById("Fullamagat").value = finalUrl;
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(imageFile);
    }
  });

  let imgInputTauler = document.getElementById("Tauler");
  imgInputTauler.addEventListener("change", function (e) {
    if (e.target.files) {
      let imageFile = e.target.files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = document.createElement("img");
        img.onload = function (event) {
          // Dynamically create a canvas element
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");

          ctx.drawImage(img, 0, 0);

          var MAX_WIDTH = 600;
          var MAX_HEIGHT = 600;
          var width = img.width;
          var height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          var dataurl = canvas.toDataURL("image/png");

          var finalUrl = dataurl.replace(/^data:image\/(png|jpg);base64,/, "");
          document.getElementById("Tauleramagat").value = finalUrl;
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(imageFile);
    }
  });
}
function post() {
  const obj = { key: "value" };
  fetch("https://script.google.com/macros/s/AKfycbxFhc6reXG6f2yG1Nss3_vMlHV0V08MtJrjNUeD2zkAvITZaZdAA927H9btgIJDEsFGeA/exec",
    { method: "POST", body: JSON.stringify(obj) })
    .then((res) => {
      console.log(res.status);
      return res.text();
    })
    .then((res) => console.log(res));
}
async function handleFormSubmit(formObject) {
  // Modified
  //console.log(formObject)

  var obj = await parseValues(formObject); // Added

  if (document.getElementById("trobadaoficial").checked) {
    obj.jugtrobadaoficial = "1";
  } else {
    obj.jugtrobadaoficial = "0";
  }
  //console.log(obj)
  document.getElementById("submitbtn2").disabled = true;
  document.getElementById("spnbtn2").classList.remove("d-none");


  console.log(JSON.stringify({
    envia: 'partida', 
    obj: obj, 
    idfull: idfull,
    idJSON: idJSON,
  }))
  

  fetch(macroURL, {
    method: 'POST',
    //mode: 'no-cors',
    //headers: {
    //  'Content-Type': 'application/json',
    //},
    body: JSON.stringify({
      envia: 'partida', 
      obj: obj, 
      idfull: idfull,
      idJSON: idJSON,
    }),
  })
  .then((response) => {
    
    console.log(response.status)
    return response.text()
  })

  .then(data => {
    console.log('Resposta del servidor:', data);
    setTimeout(iniciJSON(false,"classificacions"), 2000)
  })
  .catch(error => console.error('Error:', error));
  /* google.script.run
    .withSuccessHandler(function () {
      setTimeout(funcioInici("classificacions"), 2000);
    })
    .nouResultat(obj, idfull); */
}

var carregaFull = function (event) {
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById("imgFull");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
};

var carregaTauler = function (event) {
  var reader2 = new FileReader();
  reader2.onload = function () {
    var output2 = document.getElementById("imgTauler");
    output2.src = reader2.result;
  };
  reader2.readAsDataURL(event.target.files[0]);
};
// Prevent forms from submitting.

//HANDLE FORM SUBMISSION
// I added below function. This is from https://gist.github.com/tanaikech/58d96c023468fc1922d67764251b25e0
const parseValues = async (e) =>
  Object.assign(
    ...(await Promise.all(
      [...e].map(
        (obj) =>
          new Promise(async (res) => {
            const temp = { [obj.name]: "" };
            if (obj.type == "file") {
              const files = obj.files;
              temp[obj.name] = await (async (files) => {
                return await Promise.all(
                  [...files].map(
                    (file) =>
                      new Promise((resolve, reject) => {
                        const fr = new FileReader();
                        fr.onload = (f) =>
                          resolve({
                            filename: file.name,
                            mimeType: file.type,
                            bytes: [...new Int8Array(f.target.result)],
                          });
                        fr.onerror = (err) => reject(err);
                        fr.readAsArrayBuffer(file);
                      })
                  )
                );
              })(files).catch((err) => console.log(err));
            } else {
              temp[obj.name] = obj.value;
            }
            res(temp);
          })
      )
    ))
  );
  function actualitzaJSON(){
    carregant();   
   fetch(macroURL, {
     method: 'POST',
     mode: 'no-cors',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       envia: 'actualitza', 
       idfull: idfull,
        idJSON: idJSON,
       
     }),
   })
   .then(response => response.text())
   .then(data => {
     console.log('Resposta del servidor: JSON actualitzat!', data);
     clearInterval(interval)
     setTimeout(iniciJSON(false,"classificacions"), 2000)
   })
   .catch(error => console.error('Error:', error));
 }

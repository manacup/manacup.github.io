function renderUserCard(jugadorDesat) {
  const menuTemplate = `
     <a id="linkuserpref" class=" position-absolute top-10 end-0 translate-middle  pt-2" href="${
       urlApp + "&id=" + jugadorDesat.ID + "&mostrapestanyes=no"
     }" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Enllaç a l'app amb el jugador actual per defecte.">
                    <i class="bi bi-share-fill"></i>
                  </a>
            <div class="d-flex justify-content-center">
            <div class="imgedit"  ${
              jugadorDesat.Nom
                ? "data-bs-toggle='modal' data-bs-target='#desaimatge' aria-expanded='false'"
                : ""
            }  aria-controls="desaimatge">
              <div class="mt-3 mb-4 imatge-cercle ">
                <img src="${jugadorDesat.Imatge }" class="userImg" onerror="this.src='/icons/Imatge-default.jpg'">              
              </div>
                <div class="edit ${
                  !jugadorDesat.Nom ? "d-none" : ""
                }"><div class="icon" aria-hidden="true"><i class="bi bi-pencil"></i></div></div>
            </div>
            </div>
            <h4 class="mb-2">Uep! com va, ${jugadorDesat.Nom}?</h4>
            <p class="text-muted p-4">${jugadorDesat.Malnom2}</p>
            <div class="mb-4 pb-2">
              <button type="button" class="btn btn-primary btn-rounded btn-lg ${
                !jugadorDesat.Nom ? "d-none" : ""
              }" id="btnInfo">
                <i class="bi bi-bar-chart-line me-2"></i>Informació
              </button>
              <button type="button" class="btn btn-primary btn-rounded btn-lg ${
                jugadorDesat.Nom ? "d-none" : ""
              }" data-bs-toggle="modal" data-bs-target="#desajug" aria-expanded="false"
            aria-controls="desajug">
                <i class="bi bi-person-check me-2"></i>Identifica't
              </button>  
            </div>          
            `;

  document.querySelectorAll(".userImg").forEach((im) => {
    im.src = "" + jugadorDesat.Imatge || '/icons/Imatge-default.jpg';
  });
  document.getElementById("userCard").innerHTML = "";
  document.getElementById("userCard").innerHTML += menuTemplate;
  document.getElementById("btnInfo").addEventListener("click", () => {
    document.getElementById("menuJugador").classList.remove("show");
    loadContent(["detall", jugadorDesat.ID]);
    updateHistory(["detall", jugadorDesat.ID]);
  });
}

function renderJugador(jugador) {
  //console.log(jugador)
  var campionats = jugador.Campionats.split(/\n/);
  var podis = jugador.Podis.split(/\n/);
  var diplomes = jugador.Diplomes.split(/\n/);
  var posConjuntaArray = jugador.partides
    .map((p) => parseInt(p.Pos_Conjunta))
    .filter((pa) => !Number.isNaN(pa));

  const jugadorTemplate = `
              <div class=" p-1">
                <div class="card" >
                  <div class="card-body text-center position-relative">
                  <a class=" position-absolute top-10 end-0 translate-middle pt-2 pe-1" href="${
                    urlApp + "&vista=detall&options=" + jugador.ID
                  }" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Enllaç a la vista actual">
                    <i class="bi bi-share-fill"></i>
                  </a>
                  
                  
                  <div class="d-flex justify-content-center imatge-container">
                    <div class="mt-3 mb-4 imatge-cercle img">
                      <img src="${
                        jugador.ID == jugadorDesat.ID
                          ? userImg || jugador.Imatge
                          : jugador.Imatge
                      }"
                         onerror="this.src='/icons/Imatge-default.jpg'">
                    </div>
                    </div>
                    <h4 class="mb-2">${jugador.Nom}</h4>
                    <p class="text-muted mb-4">${jugador.Malnom2}</p>
                    <div class="mb-4 pb-2">
                    <div class="d-flex justify-content-center text-center">
                    <div data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Campionats: ${
                      campionats.join(", ") ||
                      "Encara no ha guanyat cap campionat."
                    }">
                    <span class="h1 material-symbols-outlined">trophy</span>
                    <p class="text-muted ">${
                      jugador.Campionats != "" ? campionats.length : "0"
                    }</p>
                    </div>
                    <div data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Podis: ${
                      podis.join(", ") || "Encara no ha fet cap podi."
                    }">
                    <span class="h1 material-symbols-outlined">leaderboard</span>
                    <p class="text-muted ">${
                      jugador.Podis != "" ? podis.length : "0"
                    }</p>
                    </div>
                    <div data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Diplomes olímpics: ${
                      diplomes.join(", ") ||
                      "Encara no ha aconseguit cap diploma olímpic."
                    }">
                    <span class="h1 material-symbols-outlined">school</span>
                    <p class="text-muted ">${
                      jugador.Diplomes != "" ? diplomes.length : "0"
                    }</p>
                    </div>
                    </div>
                    <button type="button" class="btn btn-primary btn-rounded btn-lg " onclick="window.open('https://wa.me/34${
                      jugador.Telefon
                    }');">
                      <i class="bi bi-whatsapp  me-2"></i>Missatge
                    </button>
                    <div class="row align-items-end text-center mt-5 mb-2">
                      <div class="col">
                        <p class="mb-2 h5">${jugador.BRF}
                        <br>Núm. ${jugador.PosBRF}
                        <br>${jugador.CatBRF}
                        </p>
                        <p class="text-muted ">Barruf</p>
                      </div>
                      <div class="col">
                        <p class="mb-2 h5">${jugador.VD}</p>
                        <p class="text-muted ">Victòries / Derrotes</p>
                      </div>
                      <div class="col">
                        <p class="mb-2 h5">${jugador.ATP}</p>
                        <p class="text-muted ">Posició ATP</p>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
           
            <div class=" p-1">
                <div class="card">
                <div class="card-header">Un per un</div>
                  <div class="card-body">
                    <div class="card-text">${jugador.Descripció}</div>
                  </div>
              </div>
            </div>
            <div class=" p-1 ">
              <div class="card">
                <div class="card-header d-flex align-items-center">
                <span class="flex-fill">Classificació general ${
                  jugador.Baixa == "TRUE" ? "(Baixa)" : ""
                }</span>
                <span class="badge rounded-pill bg-secondary">Posició: ${
                  jugador.Posició
                }</span>
                </div>
                  <div class="card-body ">
                    <ul class="list-group list-group-flush rounded-4">
                   

    
                      <li class="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="collapse" data-bs-target="#collapseResum${
                        jugador.ID
                      }">
                        <div class="dropdown-toggle flex-grow-1">Posició</div>
                        <div class="">${jugador.Posició}</div>             
                      </li>
                        <div id="collapseResum${
                          jugador.ID
                        }" class="collapse bg-light">
                          <div class="ms-5">
                            <div>${jugador.Millor_posició}</div>
                            <div>${jugador.Pitjor_posició}</div>
                          </div>
                        </div>
                      
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="">Partides jugades:</div>
                        <div class="">${jugador.PartidesJugades}</div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="">Partides pendents:</div>
                        <div class="">${jugador.Rondes_pendents}</div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="">Punts:</div>
                        <div class="">${jugador.Punts}</div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="">Victòries:</div>
                        <div class="">${jugador.Victòries}</div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="">Suma de punts a favor:</div>
                        <div class="">${jugador.PFavor}</div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="">Mitjana de punts a favor:</div>
                        <div class="">${jugador.MitjanaPFavor}</div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="">Suma de punts en contra:</div>
                        <div class="">${jugador.PContra}</div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="">Diferencial:</div>
                        <div class="">${jugador.Dif_P}</div>
                      </li>
                      
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="">Mitjana del diferencial:</div>
                        <div class="">${jugador.MitjanaDif}</div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="">Insígnies:</div>
                        <div class="">
                          <span class="${
                            jugador.Diamond_Mark == "FALSE" ? "d-none" : ""
                          }" >
                        <span  data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Diamond Mark: top500, mitjana de 3 bingos per matx, una partida de 600, 2 jugades centenàries i 1 partida conjunta mil·lenària">
                          <i class="bi bi-gem text-primary h1"></i>
                        </span>
                      </span>  
                      <span class="${
                        jugador.Golden_Mark == "FALSE" ? "d-none" : ""
                      }">
                        <span  data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Golden Mark: top400, mitjana de 2 bingos per matx, una partida de 500, 1 jugada centenària i 1 partida conjunta nou-centenària">
                          <i class="bi bi-bookmark-star-fill text-warning h1"></i>                        
                        </span>
                      </span>
                        
                      <span class="${
                        jugador.Iron_Mark == "FALSE" ? "d-none" : ""
                      }">
                        <span  data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Iron Mark: top300, mitjana de 1 bingos per matx, una partida de 400, 1 jugada +70 punts i 1 partida conjunta vuit-centenària">
                          <i class="bi bi-gear-fill text-secondary h1"></i>                        
                        </span>
                      </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class=" p-1 ">
              <div class="card">
                <div class="card-header d-flex align-items-center">
                <span class="flex-fill">Scrabbles</span>
                <span class="badge rounded-pill bg-secondary">Posició: ${
                  jugador.posScrabbles
                }</span>
                </div>
                  <div class="card-body ">
                    <ul class="list-group list-group-flush rounded-4">
  
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="">Nombre total de Scrabbles:</div>
                        <div class="">${jugador.Scrabbles}</div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="">Mitjana de Scrabbles per partida	:</div>
                        <div class="">${jugador.mitjanaScrabbles}</div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="collapse" data-bs-target="#collapseScrabbles${
                        jugador.ID
                      }">
                        <div class="dropdown-toggle">Llista completa</div>                      
                      </li>                                     
                    </ul>
                  </div> 
                  <div class="collapse" id="collapseScrabbles${jugador.ID}">
                        <table class="table">
                            <tr>
                                <td></td>
                                <td><small>Total Scrabbles</small></td>
                                <td><small>Adversari</small></td>
                                 <td></td>
                            </tr>
                            <tbody>
                                ${ompleTaulaScrabbles(jugador.partides)}
                            </tbody>
                        </table>
                      </div>
                </div>
              </div>
            </div>
            <div class=" p-1 ">
              <div class="card">
                <div class="card-header d-flex align-items-center">
                <span class="flex-fill">Millor partida individual</span>
                <span class="badge rounded-pill bg-secondary">Posició: ${
                  jugador.posPartida
                }</span>
                </div>
                  <div class="card-body ">
                    <ul class="list-group list-group-flush rounded-4">
  
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="">Punts de la millor partida:</div>
                        <div class="">${jugador.Punts_Partida}</div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-top">
                        <div class="">Adversari de la millor partida:</div>
                        <div>${jugador.Adversari_partida.split("-")
                          .map((nom) => '<div class="nom">' + nom + "</div>")
                          .join("")}</div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="collapse" data-bs-target="#collapsePindividual${
                        jugador.ID
                      }">
                        <div class="dropdown-toggle">Llista completa</div>                      
                      </li>                                     
                    </ul>
                  </div>
                  <div class="collapse" id="collapsePindividual${jugador.ID}">
                        <table class="table">
                            <tr>
                                <td></td>
                                <td><small>Punts</small></td>
                                <td><small>Adversari</small></td>
                                 <td></td>
                            </tr>
                            <tbody>
                                ${ompleTaulaPartida(jugador.partides)}
                            </tbody>
                        </table>
                      </div> 
                </div>
              </div>
            </div>
            <div class=" p-1 ">
              <div class="card">
                <div class="card-header d-flex align-items-center">
                <span class="flex-fill">Millor partida conjunta</span>
                <span class="badge rounded-pill bg-secondary">Posició: ${Math.min(
                  ...posConjuntaArray
                )}</span>
                </div>
                  <div class="card-body ">
                    <ul class="list-group list-group-flush rounded-4">
  
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="">Punts de la millor partida conjunta:</div>
                        <div class="">${jugador.Punts_Conjunta}</div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-top">
                        <div class="">Adversari de la millor conjunta:</div>
                        <div>${jugador.Adversari_conjunta.split("-")
                          .map((nom) => '<div class="nom">' + nom + "</div>")
                          .join("")}</div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="collapse" data-bs-target="#collapsePconjunta${
                        jugador.ID
                      }">
                        <div class="dropdown-toggle">Llista completa</div>                      
                      </li>                                      
                    </ul>
                  </div>
                  <div class="collapse" id="collapsePconjunta${jugador.ID}">
                        <table class="table">
                            <tr>
                                <td></td>
                                <td><small>Punts</small></td>
                                <td><small>Adversari</small></td>
                                 <td></td>
                            </tr>
                            <tbody>
                                ${ompleTaulaConjunta(jugador.partides)}
                            </tbody>
                        </table>
                      </div>
                </div>
              </div>
            </div>
            <div class=" p-1 ">
              <div class="card">
                <div class="card-header d-flex align-items-center">
                <span class="flex-fill">Millor jugada</span>
                <span class="badge rounded-pill bg-secondary">Posició: ${
                  jugador.posJugada
                }</span>
                </div>
                  <div class="card-body ">
                    <ul class="list-group list-group-flush rounded-4">
  
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="">Punts de la millor jugada:</div>
                        <div class="">${jugador.Punts_mot_jugada}</div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-top">
                        <div class="">Mot de la millor jugada:</div>
                        <div>${jugador.Mot_jugada.split("-")
                          .map((mot) => '<div class="mot">' + mot + "</div>")
                          .join("")}</div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-top">
                        <div>Adversari de la millor jugada:</div>
                        <div>${jugador.Adversari_jugada.split("-")
                          .map((nom) => '<div class="nom">' + nom + "</div>")
                          .join("")}</div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="collapse" data-bs-target="#collapseJugada${
                        jugador.ID
                      }">
                        <div class="dropdown-toggle">Llista completa</div>                      
                      </li>                                   
                    </ul>
                  </div>
                   <div class="collapse" id="collapseJugada${jugador.ID}">
                        <table class="table">
                            <tr>
                                <td></td>
                                <td><small>Punts</small></td>
                                <td><small>Jugada</small></td>
                                <td><small>Adversari</small></td>
                                 <td></td>
                            </tr>
                            <tbody>
                                ${ompleTaulaJugada(jugador.partides)}
                            </tbody>
                        </table>
                      </div>  
                </div>
              </div>
            </div>
            <div class=" p-1 ">
              <div class="card">
                
                <div class="card-header d-flex align-items-center">
                <span class="flex-fill">Velocitat en l'enviament de la partida</span>
                <span class="badge rounded-pill bg-secondary">Posició: ${
                  jugador.Pos_velocitat
                }</span>
                </div>
                  <div class="card-body ">
                    <ul class="list-group list-group-flush rounded-4">
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="">Punts per immediatesa:</div>
                        <div class="">${jugador.Punts_velocitat}</div>
                      </li> 
                      <li class="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="collapse" data-bs-target="#collapseVelocitat${
                        jugador.ID
                      }">
                        <div class="dropdown-toggle">Llista completa</div>                      
                      </li>               
                    </ul>
                  </div>
                  <div class="collapse" id="collapseVelocitat${jugador.ID}">
                  <table class="table">
                      <tr>
                          <td></td>
                          <td><small>Punts immediatesa</small></td>
                          
                          <td><small>Adversari</small></td>
                          <td></td>
                      </tr>
                      <tbody>
                          ${ompleTaulaVelocitat(jugador.partides)}
                      </tbody>
                  </table>
              </div>
                </div>
              </div>
            </div>
            <div class=" p-1 ">
              <div class="card">
                <div class="card-header d-flex align-items-center">
                  <span class="flex-fill">Partides a trobades oficials</span>
                  <span class="badge rounded-pill bg-secondary">Posició: ${
                    jugador.Pos_social
                  }</span>
                </div>
                  <div class="card-body ">
                    <ul class="list-group list-group-flush rounded-4">
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="">Total partides:</div>
                        <div class="">${jugador.Punts_social}</div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center" data-bs-toggle="collapse" data-bs-target="#collapseSocial${
                        jugador.ID
                      }">
                        <div class="dropdown-toggle">Llista completa</div>                      
                      </li>               
                    </ul>
                  </div>
                  <div class="collapse" id="collapseSocial${jugador.ID}">
                  <table class="table">
                      <tr>
                          <td></td>
                          <td><small>Punts socials</small></td>
                          
                          <td><small>Adversari</small></td>
                          <td></td>
                      </tr>
                      <tbody>
                          ${ompleTaulaSocial(
                            jugador.partides.filter((p) => p.Punts_social > 0)
                          )}
                      </tbody>
                  </table>
              </div>
                </div>
              </div>
            </div>
            <div class=" p-1 ">
              <div class="card">
                <div class="card-header d-flex"><span class="flex-fill">Partides pendents i disputades</span><i class="bi bi-calendar3" id="ordenarBoton" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Ordena per número de ronda o per ordre de les partides jugades per veure la ratxa."></i></div>
                  <div class="">
                    <ul class="list-group list-group-flush rounded-4">
  
      
                        <table class="table" id="miTabla">
                            
                            <tbody id="tbodyordre">
                                ${ompleTaulaRonda(jugador.partides)}
                            </tbody>
                        </table>
                                       
                    </ul>
                  </div>
                </div>
              </div>
            </div>
              `;

  document.getElementById("content").innerHTML += jugadorTemplate;
  const imatgeContainer = document.querySelectorAll(".imatge-container");
  imatgeContainer.forEach((el) => {
    el.addEventListener("click", function () {
      const imatge = el.querySelector(".img");
      imatge.classList.toggle("imatge-completa");
    });
  });
  // Agregar evento al botón de ordenar

  var ordenada = false;
  document.getElementById("ordenarBoton").addEventListener("click", () => {
    // Llama a la función de ordenar la tabla por la segunda columna (Edad)
    if (!ordenada) {
      ordenarTabla(0);
      ordenada = true;
      afegeixEsdeveniments();
    } else {
      var tbody = document.getElementById("tbodyordre");
      tbody.innerHTML = "";
      tbody.innerHTML += ompleTaulaRonda(jugador.partides);
      ordenada = false;
      afegeixEsdeveniments();
    }
  });
}

function renderDetallPartida(partida) {
  const partidaTemplate = `
    
      <div class="p-1">
        <div class="d-flex align-items-center p-2">
          <h1 class="flex-grow-1">Ronda ${partida.Ronda}</h1>
          <div class=" position-relative me-4" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Jugada a trobada oficial">
            <span class="h1 material-symbols-outlined">diversity_3</span>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success ${
              partida.Punts_social == 0 ? "d-none" : ""
            }"><i class="bi bi-check-lg"></i></span>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ${
              partida.Punts_social == 1 ? "d-none" : ""
            }"><i class="bi bi-x-lg"></i></span>
          </div>
          <div class=" position-relative me-4" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Cuitor en jugar la partida">
            <span class="h1 material-symbols-outlined">speed</span>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">+${
              partida.Punts_velocitat
            }</span>
          </div>
        </div>
        <div class="card mb-4 ">
          <div class="text-center position-relative">
          <a class="position-absolute top-10 end-0 translate-middle-x pt-2 pe-1" href="${
            urlApp + "&vista=detallpartida&options=" + partida.ID
          }" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Enllaç a la vista actual">
                    <i class="bi bi-share-fill"></i>
                  </a>
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
         <div class="text-center">
          <div class="d-flex justify-content-center mb-4">
              <a href="${
                partida.Full || "/icons/IconaFull.png"
              }" target="_blank" class="col align-items-start"><img src="${
    partida.Full || "/icons/IconaFull.png"
  }" class="rounded m-2 p-2" width="90%" height="auto">
              <a href="${
                partida.Tauler || "/icons/IconaTauler.png"
              }" target="_blank" class="col align-items-end"><img src="${
    partida.Tauler || "/icons/IconaTauler.png"
  }" class="rounded m-2 p-2" width="90%" height="auto"></a>
          </div>
        </div>
        <!---  <div id="carouselExampleControls" class="carousel slide mb-4" data-bs-ride="carousel">
          <div class="carousel-inner" >
            <div class="carousel-item active quadrat">
              <img src="${
                partida.Full || imatgeFixa
              }" class="d-block  rounded cover img-fluid" onclick="loadContent(['imatge',this])">
            </div>
            <div class="carousel-item quadrat">
              <img src="${
                partida.Tauler || imatgeFixa
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
        </div> --!>
    <p>Resultats enviats el ${ExcelDateToJSDate(partida.Data)}</p>
        <blockquote class="blockquote bg-danger bg-opacity-25 mb-4" style="border-left: 2px solid red;">
          <div class="mb-0 p-3 ${!partida.Comentaris ? "d-none" : ""}">${
    partida.Comentaris
  }</div>
        </blockquote>
        ${
          partida.Estat == "Ronda tancada"
            ? ""
            : `<button type="button" class="btn btn-primary mb-4" onclick="loadContent(['formulari',${partida.ID}]);updateHistory(['formulari',${partida.ID}]);">Edita</button>`
        }      
      </div>
          
  `;
  var cardpart = document.createElement("div");
  cardpart.innerHTML = partidaTemplate;
  document.getElementById("content").appendChild(cardpart);
  //document.getElementById("content").innerHTML += partidaTemplate;
}

function renderClassificacio(jugador) {
  const jugadorTemplate = `
           <div class="p-1 entrada">
           <div class="card click ${
             jugador.Posició <= 3
               ? "border-danger"
               : jugador.Posició <= 8
               ? "border-primary"
               : ""
           }" data-id="${jugador.ID}">
           <div class="card-body">
              <div class="row ">
                  <div class="col-2">
                      <div class="circle ${
                        jugador.Baixa == "TRUE" ? "bg-danger" : ""
                      }">${jugador.Posició}</div>
                  </div>
                  <div class="col-10">
                      <div class="d-flex align-items-center">
                        <div class="h5 ">
                          <span class="h6 ${
                            jugador.Diamond_Mark == "FALSE" ? "d-none" : ""
                          }" >
                            <i class="bi bi-gem text-primary"></i>
                          </span>  
                          <span class="h6 ${
                            jugador.Golden_Mark == "FALSE" ||
                            jugador.Diamond_Mark == "TRUE"
                              ? "d-none"
                              : ""
                          }">
                            <i class="bi bi-bookmark-star-fill text-warning"></i>
                          </span>
                           <span class="h6 ${
                             jugador.Iron_Mark == "FALSE" ||
                             jugador.Golden_Mark == "TRUE"
                               ? "d-none"
                               : ""
                           }">
                            <i class="bi bi-gear-fill text-secondary"></i>
                          </span>
                                                          
                          ${jugador.Nom}
                        </div>
                        <div  class="flex-grow-1">
                        </div>
                        <span class="badge text-bg-secondary me-1 ${
                          jugador.grup != "" ? "" : "d-none"
                        }">
                        <span class="visually-hidden-focusable">grup${
                          jugador.grup
                        }</span>
                          ${jugador.grup}
                        </span>                        
                        <span class="badge text-bg-${
                          jugador.Semafor
                        } percent" data-percent="${
    jugador.percentatgeVictories
  }">
                          ${jugador.Rondes_pendents}/${
    jugador.partides.filter((p) => p.Estat != "none").length
  }
                        </span>  
                      </div>
                      
                      <div class="row">
                          <div class="col">
                              <div class="d-flex align-items-start flex-column">
                                  <small>Punts:</small>
                                  <div>${
                                    jugador.Punts
                                  } <small class="badge text-primary">${parseFloat(
    jugador.percentatgeVictories * 100
  ).toFixed(1)}%</small></div>
                              </div>
                          </div>
                           <div class="col">
                              <div class="d-flex align-items-start flex-column">
                                  <small>Diferencial:</small>
                                  <div>${jugador.Dif_P}</div>
                              </div>
                          </div>
                          <div class="col">
                              <div class="d-flex align-items-start flex-column">
                                  <small>Mitjana favor:</small>
                                  <div>${jugador.MitjanaPFavor}</div>
                              </div>
                          </div>
                         
                      </div>
                  </div>
              </div>   
            </div>
          </div>   
          </div>      
          
            `;
  var cardjug = document.createElement("div");
  cardjug.innerHTML = jugadorTemplate;
  document.getElementById("subcontent").appendChild(cardjug);
  //document.getElementById("subcontent").innerHTML += jugadorTemplate;
}
function ordenarLlistaPercentatge() {
  const llista = document.getElementById("subcontent");
  const filas = Array.from(llista.querySelectorAll(".entrada"));

  filas.sort((a, b) => {
    const textA = a.querySelector(".percent").dataset.percent;
    const textB = b.querySelector(".percent").dataset.percent;
    //console.log(textA,textB)
    return textB - textA;
  });

  while (llista.firstChild) {
    llista.removeChild(llista.firstChild);
  }

  filas.forEach((fila) => {
    llista.appendChild(fila);
  });
}
function renderScrabbles(jugador) {
  const jugadorTemplate = `
      <div class="p-1 entrada">
          <div class="card
          ${
            parseFloat(jugador.mitjanaScrabbles) >= 3
              ? "border-danger"
              : parseFloat(jugador.mitjanaScrabbles) >= 2
              ? "border-primary"
              : ""
          }" >
               <div class="card-body desplega">
                  <div class="row ">
                      <div class="col-2 btndesplega" data-bs-toggle="collapse" data-bs-target="#collapse${jugador.ID}">
                          <div class="circle">${jugador.posScrabbles}</div>
                      </div>
                      <div class="col-10">
                          <div class="d-flex align-items-center">
                              <div class="h5 nom">${jugador.Nom}</div>
                              <div  class="flex-grow-1"></div>
                              <span class="badge text-bg-primary ${
                                jugador.movimentScrabbles > 0 ? "" : "d-none"
                              } percent" data-percent="${parseFloat(
    jugador.mitjanaScrabbles.replace(",", ".")
  )}">+${jugador.movimentScrabbles}</span>
                          </div>
                          <div class="row">
                              <div class="col">
                                  <div class="d-flex align-items-start flex-column">
                                      <small>Total Scrabbles:</small>
                                      <div>${jugador.Scrabbles}</div>
                                  </div>
                              </div>
                              <div class="col">
                                  <div class="d-flex align-items-start flex-column">
                                      <small>Mitjana:</small>
                                      <div>${jugador.mitjanaScrabbles}</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="collapse" id="collapse${jugador.ID}">
                  <table class="table">
                      <tr>
                          <td></td>
                          <td><small>Total Scrabbles</small></td>
                          <td><small>Adversari</small></td>
                          <td></td>
                      </tr>
                      <tbody>
                          ${ompleTaulaScrabbles(jugador.partides)}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
          `;
  var cardjug = document.createElement("div");
  cardjug.classList.add("p-0");
  cardjug.innerHTML = jugadorTemplate;
  document.getElementById("subcontent").appendChild(cardjug);
  //document.getElementById("content").innerHTML += jugadorTemplate;

  vistesPartides.push(
    ...jugador.partides.filter((p) => p.Suma_punts > 0).map((ap) => ap.ID)
  );
}
function ompleTaulaScrabbles(partides) {
  var taula = "";
  partides.sort((a, b) => b.Scrabbles_1 - a.Scrabbles_1);
  partides.forEach((partida) => {
    const llistaTemplate = ` 
            <tr>              
              <td><small>Ronda ${partida.Ronda}</small></td>              
              <td>${partida.Scrabbles_1}</td>              
              <td><span class="nom">${partida.Jugador2}</span></td>
              <td  class="detallpartida" data-id="${partida.ID}"><i class="bi bi-chevron-right"></i></td>
                    
            </tr>          
            `;
    if (partida.Suma_punts > 2) {
      taula += llistaTemplate;
    }
  });
  return taula;
}
function renderPartida(jugador) {
  const jugadorTemplate = `
      <div class="p-1 entrada">
          <div class="card ${
            jugador.Punts_Partida >= 600
              ? " border-danger"
              : jugador.Punts_Partida >= 500
              ? "border-primary"
              : ""
          }">
              <div class="card-body desplega">
                  <div class="row ">
                      <div class="col-2 btndesplega" data-bs-toggle="collapse" data-bs-target="#collapse${jugador.ID}">
                          <div class="circle">${jugador.posPartida}</div>
                      </div>
                      <div class="col-10">
                          <div class="d-flex align-items-center">
                              <div class="h5 nom">${jugador.Nom}</div>
                              <div  class="flex-grow-1"></div>
                              <span class="badge text-bg-primary ${
                                jugador.movimentPartida != "" ? "" : "d-none"
                              }">${jugador.movimentPartida}</span>
                          </div>
                          <div class="row">
                              <div class="col">
                                  <div class="d-flex align-items-start flex-column">
                                      <small>Total Punts:</small>
                                      <div>${jugador.Punts_Partida}</div>
                                  </div>
                              </div>
                              <div class="col">
                                  <div class="d-flex align-items-start flex-column">
                                      <small>Adversari:</small>
                                      <div>${jugador.Adversari_partida}</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="collapse" id="collapse${jugador.ID}">
                  <table class="table">
                      <tr>
                          <td></td>
                          <td><small>Punts</small></td>
                          <td><small>Adversari</small></td>
                          <td></td>
                      </tr>
                      <tbody>
                          ${ompleTaulaPartida(jugador.partides)}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
          `;
  var cardjug = document.createElement("div");
  cardjug.classList.add("p-0");
  cardjug.innerHTML = jugadorTemplate;
  document.getElementById("content").appendChild(cardjug);
  //document.getElementById("content").innerHTML += jugadorTemplate;
  vistesPartides.push(
    ...jugador.partides.filter((p) => p.Suma_punts > 0).map((ap) => ap.ID)
  );
}

function ompleTaulaPartida(partides) {
  //console.log(partides)
  var taula = "";
  partides.sort((a, b) => b.Puntuacio_1 - a.Puntuacio_1);
  partides.forEach((partida) => {
    const llistaTemplate = ` 
            <tr>              
              <td><small>Ronda ${partida.Ronda}</small></td>              
              <td>${partida.Puntuacio_1}</td>              
              <td><span class="nom">${partida.Jugador2}</span></td>
              <td  class="detallpartida" data-id="${partida.ID}"><i class="bi bi-chevron-right"></i></td>      
            </tr>          
            `;
    if (partida.Suma_punts > 2) {
      taula += llistaTemplate;
    }
  });
  return taula;
}

function ompleTaulaConjunta(partides) {
  //console.log(partides)
  var taula = "";
  partides.sort((a, b) => b.Suma_punts - a.Suma_punts);
  partides.forEach((partida) => {
    const llistaTemplate = ` 
            <tr>              
              <td><small>Ronda ${partida.Ronda}</small></td>              
              <td>${partida.Suma_punts}</td>              
              <td><span class="nom">${partida.Jugador2}</span></td>
              <td  class="detallpartida" data-id="${partida.ID}"><i class="bi bi-chevron-right"></i></td>      
            </tr>          
            `;
    if (partida.Suma_punts > 2) {
      taula += llistaTemplate;
    }
  });
  return taula;
}

function renderJugada(jugador) {
  const jugadorTemplate = `
      <div class="p-1 entrada">
          <div class="card ${
            jugador.Punts_mot_jugada >= 100 ? "border-danger" : ""
          }">
              <div class="card-body desplega">
                  <div class="row ">
                      <div class="col-2 btndesplega" data-bs-toggle="collapse" data-bs-target="#collapse${jugador.ID}">
                          <div class="circle">${jugador.posJugada}</div>
                      </div>
                      <div class="col-10">
                          <div class="d-flex align-items-center">
                              <div class="h5  nom">${jugador.Nom}</div>
                              <div  class="flex-grow-1"></div>
                              <span class="badge text-bg-primary ${
                                jugador.movimentJugada != "" ? "" : "d-none"
                              }">${
    jugador.movimentJugada
  }</span>                            
                          </div>
                          <div>${jugador.Mot_jugada.split("-")
                            .map((mot) => '<div class="mot">' + mot + "</div>")
                            .join("")}</div>                        
                          <div class="row">                        
                              <div class="col">
                                  <div class="d-flex align-items-start flex-column">
                                      <small>Total Punts:</small>
                                      <div>${jugador.Punts_mot_jugada}</div>
                                  </div>
                              </div>
                              <div class="col">
                                  <div class="d-flex align-items-start flex-column">
                                      <small>Adversari:</small>
                                      <div>${jugador.Adversari_jugada.split("-")
                                        .map(
                                          (nom) =>
                                            '<div class="nom">' + nom + "</div>"
                                        )
                                        .join("")}</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="collapse" id="collapse${jugador.ID}">
                  <table class="table">
                      <tr>
                          <td></td>
                          <td><small>Punts</small></td>
                          <td><small>Jugada</small></td>
                          <td><small>Adversari</small></td>
                          <td></td>
                      </tr>
                      <tbody>
                          ${ompleTaulaJugada(jugador.partides)}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
          `;
  var cardjug = document.createElement("div");
  cardjug.classList.add("p-0");
  cardjug.innerHTML = jugadorTemplate;
  document.getElementById("content").appendChild(cardjug);
  //document.getElementById("content").innerHTML += jugadorTemplate;
  vistesPartides.push(
    ...jugador.partides.filter((p) => p.Suma_punts > 0).map((ap) => ap.ID)
  );
}

function ompleTaulaJugada(partides) {
  //console.log(partides)
  var taula = "";
  partides.sort((a, b) => b.Puntsmot_1 - a.Puntsmot_1);
  partides.forEach((partida) => {
    const llistaTemplate = ` 
            <tr>              
              <td><small>Ronda ${partida.Ronda}</small></td>              
              <td>${partida.Puntsmot_1}</td>
              <td class="mot">${partida.Mot_1}</td>              
              <td><span class="nom">${partida.Jugador2}</span></td>
              <td  class="detallpartida" data-id="${partida.ID}"><i class="bi bi-chevron-right"></i></td>      
            </tr>          
            `;
    if (partida.Suma_punts > 2) {
      taula += llistaTemplate;
    }
  });
  return taula;
}

function renderSocial(jugador) {
  const jugadorTemplate = `
      <div class="p-1 entrada">
          <div class="card  desplega">
              <div class="card-body">
                  <div class="row ">
                      <div class="col-2 btndesplega" data-bs-toggle="collapse" data-bs-target="#collapse${jugador.ID}">
                          <div class="circle">${jugador.Pos_social}</div>
                      </div>
                      <div class="col-10">
                          <div class="d-flex align-items-center">
                              <div class="h5 nom">${jugador.Nom}</div>
                              <div  class="flex-grow-1"></div>                           
                          </div>                        
                          <div class="row">
                          
                              <div class="col">
                                  <div class="d-flex align-items-start flex-column">
                                      <small>Total Punts:</small>
                                      <div>${jugador.Punts_social}</div>
                                  </div>
                              </div>
                              
                          </div>
                      </div>
                  </div>
              </div>
              <div class="collapse" id="collapse${jugador.ID}">
                  <table class="table">
                      <tr>
                          <td></td>
                          <td><small>Punts socials</small></td>
                          
                          <td><small>Adversari</small></td>
                          <td></td>
                      </tr>
                      <tbody>
                          ${ompleTaulaSocial(jugador.partides)}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
          `;
  var cardsocial = document.createElement("div");
  cardsocial.classList.add("p-0");
  cardsocial.innerHTML = jugadorTemplate;
  document.getElementById("content").appendChild(cardsocial);
  vistesPartides.push(
    ...jugador.partides.filter((p) => p.Suma_punts > 0).map((ap) => ap.ID)
  );
}

function ompleTaulaSocial(partides) {
  //console.log(partides)
  var taula = "";
  partides.sort((a, b) => b.Punts_social - a.Punts_social);
  partides.forEach((partida) => {
    const llistaTemplate = ` 
            <tr>              
              <td><small>Ronda ${partida.Ronda}</small></td>              
              <td>${partida.Punts_social}</td>                         
              <td><span class="nom">${partida.Jugador2}</span></td>
              <td  class="detallpartida" data-id="${partida.ID}"><i class="bi bi-chevron-right"></i></td>      
            </tr>          
            `;
    if (partida.Suma_punts > 2) {
      taula += llistaTemplate;
    }
  });
  return taula;
}
function renderVelocitat(jugador) {
  const jugadorTemplate = `
      <div class="p-1 entrada">
          <div class="card  desplega">
              <div class="card-body">
                  <div class="row ">
                      <div class="col-2 btndesplega" data-bs-toggle="collapse" data-bs-target="#collapse${jugador.ID}">
                          <div class="circle">${jugador.Pos_velocitat}</div>
                      </div>
                      <div class="col-10">
                          <div class="d-flex align-items-center">
                              <div class="h5 nom">${jugador.Nom}</div>
                              <div  class="flex-grow-1"></div>                           
                          </div>                        
                          <div class="row">
                          
                              <div class="col">
                                  <div class="d-flex align-items-start flex-column">
                                      <small>Total Punts:</small>
                                      <div>${jugador.Punts_velocitat}</div>
                                  </div>
                              </div>
                              
                          </div>
                      </div>
                  </div>
              </div>
              <div class="collapse" id="collapse${jugador.ID}">
                  <table class="table">
                      <tr>
                          <td></td>
                          <td><small>Punts immediatesa</small></td>
                          
                          <td><small>Adversari</small></td>
                          <td></td>
                      </tr>
                      <tbody>
                          ${ompleTaulaVelocitat(jugador.partides)}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
          `;
  var cardvel = document.createElement("div");
  cardvel.classList.add("p-0");
  cardvel.innerHTML = jugadorTemplate;
  document.getElementById("content").appendChild(cardvel);
  vistesPartides.push(
    ...jugador.partides.filter((p) => p.Suma_punts > 0).map((ap) => ap.ID)
  );
}

function ompleTaulaVelocitat(partides) {
  //console.log(partides)
  var taula = "";
  partides.sort((a, b) => b.Punts_velocitat - a.Punts_velocitat);
  partides.forEach((partida) => {
    const llistaTemplate = `
            <tr>              
              <td><small>Ronda ${partida.Ronda}</small></td>              
              <td>${partida.Punts_velocitat.toString()}</td>                         
              <td class="nom">${partida.Jugador2}</td>
              <td  class="detallpartida" data-id="${
                partida.ID
              }"><i class="bi bi-chevron-right"></i></td>      
            </tr>          
             `;
    if (partida.Suma_punts > 2) {
      taula += llistaTemplate;
    }
  });
  return taula;
}
function renderConjunta(partida) {
  const mesos = [
    "gener",
    "febrer",
    "març",
    "abril",
    "maig",
    "juny",
    "juliol",
    "agost",
    "setembre",
    "octubre",
    "novembre",
    "desembre",
  ];
  const mesosNum = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  var data = new Date(partida.Data * 86400000 - 2209161600000);
  var datareduida =
    data.getDate() + "/" + mesosNum[data.getMonth()] + "/" + data.getFullYear();
  var ara = new Date();
  var difereciaMS = ara - data;
  var dies = convertMiliseconds(difereciaMS, "d");

  const partidaTemplate = `
      <div class="p-1 entrada">
      
          <div class="card ${
            partida.Suma_punts >= 1000
              ? "border-danger"
              : partida.Suma_punts >= 900
              ? "border-primary"
              : ""
          } detallpartida" data-id="${partida.ID}">
              <div class="card-body">
                  <div class="row ">
                      <div class="col-2">
                          <div class="circle">${partida.Pos_Conjunta}</div>
                      </div>
                      <div class="col-10">
                          <div class="d-flex align-items-center">
                              <div class="h5 flex-grow-1">Suma: ${
                                partida.Suma_punts
                              }</div>                      
                          <span class="badge text-bg-primary ${
                            partida.Nova != "" ? "" : "d-none"
                          }">${partida.Nova}</span>
                          <span class="dataPartida badge text-bg-${
                            dies <= 14 ? "primary" : "secondary"
                          }" data-dia="${data.getTime()}">${datareduida}</span>
                          <span class="visually-hidden-focusable">${
                            dies <= 14 ? "noves" : "anteriors"
                          }</span>
                          </div>
                          <div class="row">
                              <div class="col">
                                  <div class="d-flex align-items-start flex-column">
                                      <small>Puntuació: ${
                                        partida.Puntuacio_1
                                      }</small>
                                      <div class="nom">${partida.Jugador1}</div>
                                  </div>
                              </div>
                              <div class="col">
                                  <div class="d-flex align-items-start flex-column">
                                      <small>Puntuació: ${
                                        partida.Puntuacio_2
                                      }</small>
                                      <div class="nom">${partida.Jugador2}</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
         `;
  var cardconjunta = document.createElement("div");
  cardconjunta.innerHTML = partidaTemplate;
  document.getElementById("subcontent").appendChild(cardconjunta);
}
function convertMiliseconds(miliseconds, format) {
  var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

  total_seconds = parseInt(Math.floor(miliseconds / 1000));
  total_minutes = parseInt(Math.floor(total_seconds / 60));
  total_hours = parseInt(Math.floor(total_minutes / 60));
  days = parseInt(Math.floor(total_hours / 24));

  seconds = parseInt(total_seconds % 60);
  minutes = parseInt(total_minutes % 60);
  hours = parseInt(total_hours % 24);

  switch (format) {
    case "s":
      return total_seconds;
    case "m":
      return total_minutes;
    case "h":
      return total_hours;
    case "d":
      return days;
    default:
      return { d: days, h: hours, m: minutes, s: seconds };
  }
}
function ordenarLlistaData() {
  const llista = document.getElementById("subcontent");
  const filas = Array.from(llista.querySelectorAll(".entrada"));

  filas.sort((a, b) => {
    const textA = a.querySelector(".dataPartida").dataset.dia;
    const textB = b.querySelector(".dataPartida").dataset.dia;
    //console.log(textA,textB)
    return textB - textA;
  });

  while (llista.firstChild) {
    llista.removeChild(llista.firstChild);
  }

  filas.forEach((fila) => {
    llista.appendChild(fila);
  });
}
function ordenarLlistaPunts() {
  const llista = document.getElementById("subcontent");
  const filas = Array.from(llista.querySelectorAll(".entrada"));

  filas.sort((a, b) => {
    const textA = parseInt(a.querySelector(".circle").textContent);
    const textB = parseInt(b.querySelector(".circle").textContent);
    //console.log(textA,textB)
    return textA - textB;
  });

  while (llista.firstChild) {
    llista.removeChild(llista.firstChild);
  }

  filas.forEach((fila) => {
    llista.appendChild(fila);
  });
}

function renderRondes(ronda) {
  var partidesRonda = aparellaments.filter((p) => p.Ronda == ronda.Ronda);
  const rondaTemplate = `
      <div class="p-1 entrada">
          <div class="card  ${
            ronda.Estat == "Ronda tancada" ? "border-danger" : ""
          }" >
              <div class="card-body">
                  <div class="row detallronda" data-id="${
                    ronda.Ronda
                  }">                    
                      <div class="d-flex align-items-center">
                          <div class="h5  flex-grow-1" >Ronda ${
                            ronda.Ronda
                          }</div>
                          <span class="badge text-bg-${
                            ronda.Estat == "Ronda tancada"
                              ? "danger"
                              : "primary"
                          } ${ronda.Estat != "none" ? "" : "d-none"}">${
    ronda.Estat
  }</span>
                      </div>
                      <p><i>Data límit per enviar el resultat: ${
                        ronda.Data_fi
                      }</i></p>
                      <p>${ronda.Jugades} partides jugades de ${
    ronda.Programades
  }</p>                        
                  </div>
                  <div class="row">
                    <div class="dropdown-toggle" data-bs-target="#collapseronda${
                      ronda.Ronda
                    }" data-bs-toggle="collapse">Estadístiques</div>
                  </div>
              </div>             
              <div class="collapse" id="collapseronda${ronda.Ronda}">
                  <ul class="list-group list-group-flush rounded-4">
                    <li class="list-group-item d-flex justify-content-between align-items-top">
                      <div>Partides mil·lenàries:</div>
                      <div>${ronda.Mil·lenàries}</div>                    	
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-top">
                      <div>Jugades centenàries:</div>
                      <div>${ronda.Centenàries}</div>                    	
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-top">
                      <div>Puntuació de la millor jugada:</div>
                      <div>${ronda.Millor_Jugada}</div>                    	
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-top">
                      <div>Mot de la millor jugada:</div>
                      <div>${ronda.Mots.split("-")
                        .map((mot) => '<div class="mot">' + mot + "</div>")
                        .join("")}</div>                    	
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-top">
                      <div>Jugador de la millor jugada:</div>
                      <div>${ronda.Jug_Mots.split("-")
                        .map((nom) => '<div class="nom">' + nom + "</div>")
                        .join("")}</div>                    	
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-top">
                      <div>Puntuació de la millor partida:</div>
                      <div>${ronda.Millor_Partida}</div>                    	
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-top">
                      <div>Jugador de la millor partida:</div>
                      <div>${ronda.Jugador_Partida.split("-")
                        .map((nom) => '<div class="nom">' + nom + "</div>")
                        .join("")}</div>                    	
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-top">
                      <div>Major número de Scrabbles:</div>
                      <div>${
                        ronda.Major_num_Scrabbles
                      }</div>                    	
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-top">
                      <div>Jugador amb major núm. de Scrabbles:</div>
                      <div>${ronda.Jug_Scrabbles.split("-")
                        .map((nom) => '<div class="nom">' + nom + "</div>")
                        .join("")}</div>                    	
                    </li>
                  </ul>
            </div>    
          </div>
      </div>
  
      `;
  document.getElementById("content").innerHTML += rondaTemplate;
}

function ompleTaulaRonda(partidesRonda) {
  // console.log(partidesRonda)
  const datesAsObjects = partidesRonda.map((date) => {
    const parts = date.Data.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
  });
  function compareDates(a, b) {
    const parts1 = a.Data.split("/");
    var data1 = new Date(parts1[2], parts1[1] - 1, parts1[0]);
    const parts2 = b.Data.split("/");
    var data2 = new Date(parts2[2], parts2[1] - 1, parts2[0]);

    return data1.getTime() - data2.getTime();
  }
  partidesRonda.sort(compareDates);
  var taula = "";
  function ordreRondes(a, b) {
    return a.Ronda - b.Ronda;
  }
  var nojugades = partidesRonda
    .filter((p) => p.Suma_punts == "")
    .sort(ordreRondes);
  partidesRonda.forEach((obj, index) => {
    if (obj.Suma_punts == "") {
      partidesRonda[index] = nojugades.shift();
    }
  });
  partidesRonda.forEach((partida) => {
    const llistaTemplate = ` 
  
            <tr class="${
              parseInt(partida.Puntuacio_1) > parseInt(partida.Puntuacio_2)
                ? "table-success"
                : parseInt(partida.Puntuacio_2) > parseInt(partida.Puntuacio_1)
                ? "table-danger"
                : ""
            }">              
              <td>
                <div class="${
                  partida.Estat == "Ronda tancada" ? "text-danger" : ""
                }">
                  <small>Ronda ${partida.Ronda}</small>                
                </div>
              </td>              
              <td>
                <div>
                  
                  <span class="text-primary ${
                    parseInt(partida.Puntuacio_1) >
                    parseInt(partida.Puntuacio_2)
                      ? "fw-bold"
                      : partida.Suma_punts > 0
                      ? ""
                      : "d-none"
                  }">${partida.Puntuacio_1}</span>
  <span class="vr"></span>
                  <span class="text-primary ${
                    parseInt(partida.Puntuacio_2) >
                    parseInt(partida.Puntuacio_1)
                      ? "fw-bold"
                      : partida.Suma_punts > 0
                      ? ""
                      : "d-none"
                  }">${partida.Puntuacio_2}</span>
                </div>
              </td>              
              <td>
                <div class="">
                  <div class="nom">${partida.Jugador2}</div>
                  
                </div>
              </td>  
              <td  class="detallpartida" data-id="${partida.ID}" data-estat="${
      partida.Estat
    }"><i class="bi bi-chevron-right"></i></td>     
            </tr>             
            `;
    taula += llistaTemplate;
  });
  //document.getElementById(id).innerHTML=taula
  return taula;
}
// Función para ordenar la tabla por una columna específica
function ordenarTabla(columna) {
  const table = document
    .getElementById("miTabla")
    .getElementsByTagName("tbody")[0];
  const filas = Array.from(table.getElementsByTagName("tr"));

  filas.sort((a, b) => {
    const textA = parseInt(
      a.getElementsByTagName("td")[columna].textContent.match(/\d+/)[0]
    );
    const textB = parseInt(
      b.getElementsByTagName("td")[columna].textContent.match(/\d+/)[0]
    );
    return textA - textB;
  });

  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  filas.forEach((fila) => {
    table.appendChild(fila);
  });
}

// Función para desordenar la tabla (restaurar el orden original)
function desordenarTabla() {
  const table = document
    .getElementById("miTabla")
    .getElementsByTagName("tbody")[0];
  const filas = Array.from(table.getElementsByTagName("tr"));

  filas.sort((a, b) => filas.indexOf(a) - filas.indexOf(b));

  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  filas.forEach((fila) => {
    table.appendChild(fila);
  });
}

function renderAparellaments(partida) {
  const aparellamentsTemplate = `
        <div class="p-1 entrada">
          <div class="card ${
            partida.Suma_punts > 0
              ? "border-success"
              : partida.Suma_punts == 0 && partida.Estat == "Ronda tancada"
              ? "border-danger"
              : ""
          } detallpartida" data-id="${partida.ID}" data-estat="${
    partida.Estat
  }">
              <div class="card-body">
                  <div class="row">
                      <div class="row">
                          <div class="d-flex align-items-center">
                              <div class="h6  flex-grow-1 "><span  class="nom">${
                                partida.Jugador1
                              }</span></div>
                              <small class="text-primary ${
                                partida.Puntuacio_1 > partida.Puntuacio_2
                                  ? "fw-bold"
                                  : ""
                              }">Puntuació: ${partida.Puntuacio_1}</small>
                          </div>
                          <div class="d-flex align-items-center">
                              <div class="h6  flex-grow-1"><span  class="nom">${
                                partida.Jugador2
                              }</span></div>
                              <small class="text-primary ${
                                partida.Puntuacio_2 > partida.Puntuacio_1
                                  ? "fw-bold"
                                  : ""
                              }">Puntuació: ${partida.Puntuacio_2}</small>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    `;
  document.getElementById("content").innerHTML += aparellamentsTemplate;
}

function showToast(obj) {
  let toast = document.getElementById("toast");
  toast.querySelector(".toast-body").innerHTML = obj;
  let toastBootstrap = new bootstrap.Toast(toast);

  toastBootstrap.show();
}

function tancaCollapse() {
  const collapseElementList = document.querySelectorAll(".collapse");
  const collapseList = [...collapseElementList].map(
    (collapseEl) => new bootstrap.Collapse(collapseEl)
  );
}
var zoomState = 0; // 0 representa el primer nivell de zoom, 1 el segon nivell
function zoom(e) {
  var zoomer = e.currentTarget;

  var zoomLevels = [1, 2, 4, 2]; // Defineix els nivells de zoom
  e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.touches[0].pageX);
  e.offsetY ? (offsetY = e.offsetY) : (offsetX = e.touches[0].pageX);
  x = (offsetX / zoomer.offsetWidth) * 100;
  y = (offsetY / zoomer.offsetHeight) * 100;
  zoomer.style.backgroundPosition = x + "% " + y + "%";

  zoomState = (zoomState + 1) % zoomLevels.length; // Alterna entre els nivells de zoom
  zoomer.style.backgroundSize = zoomLevels[zoomState] * 100 + "%";
}
function ExcelDateToJSDate(serial) {
  var utc_days = Math.floor(serial - 25569);
  var utc_value = utc_days * 86400;
  var date_info = new Date(utc_value * 1000);

  var fractional_day = serial - Math.floor(serial) + 0.0000001;

  var total_seconds = Math.floor(86400 * fractional_day);

  var seconds = total_seconds % 60;

  total_seconds -= seconds;

  var hours = Math.floor(total_seconds / (60 * 60));
  var minutes = Math.floor(total_seconds / 60) % 60;
  var jsdate = new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds
  );
  return jsdate.toLocaleDateString();
}

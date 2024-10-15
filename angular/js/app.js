

const firebaseConfig = {
    // Tus claves de configuración de Firebase
    apiKey: "AIzaSyDn0v_QEsAdWAMN0cLe8teNkDiHe6hIXwc",
        authDomain: "manacup-b195e.firebaseapp.com",
        databaseURL: "https://manacup-b195e-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "manacup-b195e",
        storageBucket: "manacup-b195e.appspot.com",
        messagingSenderId: "548487419691",
        appId: "1:548487419691:web:fba0488c532503b132176e"
  }
  firebase.initializeApp(firebaseConfig);
const db = firebase.database();

  var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/classificacio.html",
            controller: "classificacioCtrl"
        })
        .when("/classificacio", {
            templateUrl: "views/classificacio.html",
            controller: "classificacioCtrl"
        })
        .when("/scrabbles", {
            templateUrl: "views/scrabbles.html",
            controller: "scrabblesCtrl"
        })
        .when("/jugada", {
            templateUrl: "views/jugada.html",
            controller: "jugadaCtrl"
        })
        .when("/partida", {
            templateUrl: "views/partida.html",
            controller: "partidaCtrl"
        })
        .when("/social", {
            templateUrl: "views/social.html",
            controller: "socialCtrl"
        })
        .when("/immediatesa", {
            templateUrl: "views/immediatesa.html",
            controller: "immediatesaCtrl"
        })
        .when("/conjunta", {
            templateUrl: "views/conjunta.html",
            controller: "conjuntaCtrl"
        }).when("/detalljugador", {
            templateUrl: "views/detalljugador.html",
            controller: "detallJugadorCtrl"
        });
});

/* app.controller("recopiladades", function ($scope, $rootScope) { // Use firebase instead of $http for Firebase communication

  // Assuming your Firebase database structure:
  // dades: { ... } (data for jugadors)
  // calendari: { ... } (data for calendari)
  // aparellaments: { ... } (data for aparellaments with Jugador1.ID and Jugador2.ID)

  //const db = firebase.database(); // Access Firebase database using firebase service

  // Fetch jugadors data
  const jugadorsRef = db.ref("dades");
  jugadorsRef.on("value", (snapshot) => {
    $scope.jugadors = transformArray(snapshot.val());
    // Add initial empty 'partides' property for each jugador
    Object.values($scope.jugadors).forEach(jugador => {
      jugador.partides = [];
    });
  });

  // Fetch calendari data
  const calendariRef = db.ref("calendari");
  calendariRef.on("value", (snapshot) => {
    $scope.calendari = transformArray(snapshot.val());
  });

  // Fetch aparellaments data
  const aparellamentsRef = db.ref("aparellaments");
    console.log(aparellamentsRef)
  aparellamentsRef.on("value", (snapshot) => {
    const aparellaments = transformArray(snapshot.val());
console.log(aparellaments)
    aparellaments.forEach((ap) => {
      const jugador1Id = ap.Jugador1.ID;
      const jugador2Id = ap.Jugador2.ID;

      if ($scope.jugadors[jugador1Id]) {
        $scope.jugadors[jugador1Id].partides.push(ap);
      } else {
        console.warn(`Jugador with ID ${jugador1Id} not found in jugadors data.`);
      }

      if ($scope.jugadors[jugador2Id]) {
        $scope.jugadors[jugador2Id].partides.push(ap);
      } else {
        console.warn(`Jugador with ID ${jugador2Id} not found in jugadors data.`);
      }
    });
  }); 

$scope.$apply()*/
 app.controller("recopiladades", function($scope, $http, $rootScope) {


const fetchDades = db.ref("dades");
fetchDades.on("value", function (snapshot) {
  $scope.jugadors = transformArray(snapshot.val());

/*   Object.values($scope.jugadors).forEach(jugador => {
    jugador.partides = []; // Initialize empty array

    // Assuming 'partides' collection references player IDs
    const aparellaments= db.ref('aparellaments')
      aparellaments.orderByChild('Jugador1/ID')
      .equalTo(jugador.ID) // Use actual player ID
      .on('value', (snapshot) => {
        const playerMatches1 = snapshot.val() || []; // Handle potential null value
        jugador.partides = playerMatches1; // Update partidas after data retrieval
          console.log(jugador)
      });
      aparellaments.orderByChild('Jugador2/ID')
      .equalTo(jugador.ID) // Use actual player ID
      .on('value', (snapshot) => {
        const playerMatches2 = snapshot.val() || []; // Handle potential null value
        jugador.partides =  Object.values({ ...jugador.partides, ...playerMatches2 }); // Update partidas after data retrieval
          console.log(jugador)
      });
  }); */

  $scope.$apply();
}); 
    const fetchcalendari = db.ref("calendari");
    fetchcalendari.on("value", function (snapshot) { 
        $scope.calendari = transformArray(snapshot.val());
        $scope.$apply();
    });
    const fetchaparellaments = db.ref("aparellaments");
    fetchaparellaments.on("value", function (snapshot) { 
        $scope.aparellaments = Object.values(snapshot.val())
     
         $scope.$apply() 
    });
   /*     aparellaments.forEach((ap) => {
      const jugador1Id = ap.Jugador1.ID;
      const jugador2Id = ap.Jugador2.ID;

      if ($scope.jugadors[jugador1Id]) {
        $scope.jugadors[jugador1Id].partides.push(ap);
      } else {
        console.warn(`Jugador with ID ${jugador1Id} not found in jugadors data.`);
      }

      if ($scope.jugadors[jugador2Id]) {
        $scope.jugadors[jugador2Id].partides.push(ap);
      } else {
        console.warn(`Jugador with ID ${jugador2Id} not found in jugadors data.`);
      }
           
    });   */
      

  
function transformarObjeto(objetoOriginal) {
  const nuevoObjeto = {};

  // Copiar propiedades comunes
  const propiedadesComunes = ['Ronda', 'ID', 'Data', 'Comentaris','Full','Tauler','Suma_punts','Punts_social','Estat','Nova','Pos_Conjunta','Taula','Punts_velocitat'];
  propiedadesComunes.forEach(prop => {
    nuevoObjeto[prop] = objetoOriginal[prop];
  });

  // Crear objetos para cada jugador
  nuevoObjeto.Jugador1 = {
      ID :objetoOriginal.idJug1,
    Jugador: objetoOriginal.Jugador1,
    Puntuaciones: {
      Puntuacio: objetoOriginal.Puntuacio_1,
      Puntsmot: objetoOriginal.Puntsmot_1,
      Scrabbles: objetoOriginal.Scrabbles_1,
        Punts:objetoOriginal.Punts_1
      // ... otras puntuaciones
    }
  };

  nuevoObjeto.Jugador2 = {
      ID : objetoOriginal.idJug2,
    Jugador: objetoOriginal.Jugador2,
    Puntuaciones: {
      Puntuacio: objetoOriginal.Puntuacio_2,
      Puntsmot: objetoOriginal.Puntsmot_2,
      Scrabbles: objetoOriginal.Scrabbles_2,
        Punts:objetoOriginal.Punts_2
      // ... otras puntuaciones
    }
  };

  return nuevoObjeto;
}
    function transformArray(array) {
        return array.map(obj => {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    obj[key] = isNaN(parseInt(obj[key], 10)) ? obj[key] : parseInt(obj[key], 10);
                    obj[key] = (obj[key] === "TRUE") ? true : (obj[key] === "FALSE") ? false : obj[key];
                }
            }
            return obj;
        });
    }

    // Watch for changes in $rootScope.pagina and update $scope.page
    $scope.$watch(function() {
        return $rootScope.pagina;
    }, function(newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.page = newVal;
        }
    });
});


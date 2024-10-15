

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
        });
});

app.controller("recopiladades", function ($scope, firebase) { // Use firebase instead of $http for Firebase communication

  // Assuming your Firebase database structure:
  // - dades (contains player data)
  // - calendari (contains calendar data)
  // - aparellaments (contains fixture/match data with Jugador1.ID and Jugador2.ID references)

  //const db = firebase.database(); // Get a Firebase database reference

  // Fetch player data
  db.ref("dades").once("value").then((snapshot) => {
    $scope.jugadors = transformArray(snapshot.val());
    // Add an empty `partides` array to each player object for matches
    $scope.jugadors.forEach(jugador => jugador.partides = []);
  }).catch((error) => {
    console.error("Error fetching players:", error);
  });

  // Fetch calendar data (optional, modify if needed)
  db.ref("calendari").once("value").then((snapshot) => {
    $scope.calendari = transformArray(snapshot.val());
  }).catch((error) => {
    console.error("Error fetching calendar:", error);
  });

  // Fetch fixture data and update players' `partides`
  db.ref("aparellaments").once("value").then((snapshot) => {
    const aparellaments = transformArray(snapshot.val());
    aparellaments.forEach((ap) => {
      if ($scope.jugadors[ap.Jugador1.ID]) {
        $scope.jugadors[ap.Jugador1.ID].partides.push(ap);
      }
      if ($scope.jugadors[ap.Jugador2.ID]) {
        $scope.jugadors[ap.Jugador2.ID].partides.push(ap);
      }
    });
  }).catch((error) => {
    console.error("Error fetching fixtures:", error);
  });

  // Implement your `transformArray` and `transformarObjeto` functions here,
  // ensuring they handle your specific data structure and requirements
});

/* app.controller("recopiladades", function($scope, $http, $rootScope) {


const fetchDades = db.ref("dades");
fetchDades.on("value", function (snapshot) { 
$scope.jugadors = transformArray(snapshot.val());
    $scope.$apply();

    });    
    const fetchcalendari = db.ref("calendari");
    fetchcalendari.on("value", function (snapshot) { 
        $scope.calendari = transformArray(snapshot.val());
        $scope.$apply();
    });
    const fetchaparellaments = db.ref("aparellaments");
    fetchaparellaments.on("value", function (snapshot) { 
        $scope.aparellaments = transformArray(snapshot.val()).map(ap=>{
            transformarObjeto(ap)
     
        });
        $scope.aparellaments.forEach(a=>{
          &scope.jugadors[ap.Jugador1.ID].partides.push(ap)
            &scope.jugadors[ap.Jugador2.ID].partides.push(ap)  
        })
        $scope.$apply();
        
    }); */
function transformarObjeto(objetoOriginal) {
  const nuevoObjeto = {};

  // Copiar propiedades comunes
  const propiedadesComunes = ['Ronda', 'ID', 'Data', 'Comentaris','Full','Tauler',Suma_punts','Punts_social','Estat','Nova','Pos_Conjunta','Taula','Punts_velocitat'];
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


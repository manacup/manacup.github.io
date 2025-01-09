

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
            controller: "detallJugadorCtrl",
            controllerAs: 'vm',
            resolve: {
              // I will cause a 1 second delay
              dades: function() {                
                return 
              }
            }
        });
});


 app.controller("recopiladades", function($scope, $location, $rootScope) {


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
        $scope.aparellaments = Object.values(snapshot.val())
     
         $scope.$apply() 
    });
      $rootScope.$broadcast('dadesRecuperades');
      $rootScope.$on('dadesRecuperades',function(){
          console.log("broadcasting...")
      })
      $scope.goToPage = function(idjug) {
        $location.path('/detalljugador?id='+ idjug);
      };
      $scope.findID = function(nom){
        return $jugadors.filter(ju=>ju.Nom==nom)[0].ID
      }
  
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


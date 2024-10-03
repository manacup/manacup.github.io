var app = angular.module("myApp", ["ngRoute",'firebase']);
app  .config(['$firebaseProvider', function($firebaseProvider) {
    // Configuración de Firebase
    $firebaseProvider.init({
      // Tus claves de configuración de Firebase
      apiKey: "AIzaSyDn0v_QEsAdWAMN0cLe8teNkDiHe6hIXwc",
          authDomain: "manacup-b195e.firebaseapp.com",
          databaseURL: "https://manacup-b195e-default-rtdb.europe-west1.firebasedatabase.app",
          projectId: "manacup-b195e",
          storageBucket: "manacup-b195e.appspot.com",
          messagingSenderId: "548487419691",
          appId: "1:548487419691:web:fba0488c532503b132176e"
    });
  }])
app .controller('recopiladades', ['$scope',  function($scope) {
    // Obtener una referencia a una colección en Firebase
    var ref = new Firebase('https://manacup-b195e-default-rtdb.europe-west1.firebasedatabase.app/');

    // Sincronizar los datos de Firebase con un array en AngularJS
    $scope.jugadors = transformArray(response.data.dades);
    $scope.calendari = transformArray(response.data.calendari);
    $scope.partides = transformArray(response.data.aparellaments);
  }]);


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

/* app.controller("recopiladades", function($scope, $http, $rootScope) {
    const macroURL = "https://script.google.com/macros/s/AKfycbwDcFyPQFV3B0bzeRxGU9yaTWhbA3PyR3SQZOQ1KEE5cU08SJb5QaOOfuXxwfVnuASk/exec";
    const idfull = "1HDQ6YdsA5FnzHaHFeOlYXPEIDCLRpq34rm078oFqRMU";
    const idJSON = "1JxO5a-iFwM3pvVRFWW71-vV1whC3fNIS";

    $http.get(`${macroURL}?page=JSON&idfull=${idfull}&idJSON=${idJSON}`).then(function(response) {
        $scope.jugadors = transformArray(response.data.dades);
        $scope.calendari = transformArray(response.data.calendari);
        $scope.partides = transformArray(response.data.aparellaments);
    });
 */
    function transformArray(array) {
        return array.map(obj => {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    obj[key] = isNaN(parseInt(obj[key], 10)) ? obj[key] : parseInt(obj[key], 10);
                    obj[key] = (obj[key] === "TRUE") ? true : (obj[key] === "FALSE") ? false : obj[key];
                }
            }
            obj.Posicio = obj.Posició;
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

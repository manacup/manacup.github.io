

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
console.log(db)
const fetchDades = db.ref("dades");
console.log(fetchChat)



// check for new messages using the onChildAdded event listener
fetchDades.on("value", function (snapshot) {
 
let  jugadors = snapshot.val();

    

console.log(jugadors)
  var app = angular.module("myApp", ["ngRoute"]);
/* // app.module.js
app.controller("recopiladades", function($scope, $firebaseObject) {
    var ref = firebase.database().ref().child("data");
    // download the data into a local object
  var syncObject = $firebaseObject(ref);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  $scope.jugadors = transformArray(firebase.database().ref().child("dades"));
    $scope.calendari = transformArray(firebase.database().ref().child("calendari"));
    $scope.partides = transformArray(firebase.database().ref().child("aparellaments"));
  syncObject.$bindTo($scope, "data");
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
  }); */


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

app.controller("recopiladades", function($scope, $http, $rootScope) {
    const macroURL = "https://script.google.com/macros/s/AKfycbwDcFyPQFV3B0bzeRxGU9yaTWhbA3PyR3SQZOQ1KEE5cU08SJb5QaOOfuXxwfVnuASk/exec";
    const idfull = "1HDQ6YdsA5FnzHaHFeOlYXPEIDCLRpq34rm078oFqRMU";
    const idJSON = "1JxO5a-iFwM3pvVRFWW71-vV1whC3fNIS";

    $http.get(`${macroURL}?page=JSON&idfull=${idfull}&idJSON=${idJSON}`).then(function(response) {
        $scope.jugadors = jugadors 
        $scope.calendari = transformArray(response.data.calendari);
        $scope.partides = transformArray(response.data.aparellaments);
    });

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
});

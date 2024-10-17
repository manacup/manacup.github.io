app.controller("detallJugadorCtrl", function($scope, $rootScope,$routeParams) {    
    $rootScope.pagina = "Detall";
  var vm = this;
    vm.id = $routeParams.id;
$rootScope.$on('dadesRecuperades', function() {
    console.log('iniciant dades del jugador');
     $scope.resumJugador = $scope.jugadors[vm.id]
    $scope.partidesJugador = Object.values($scope.aparellaments).filter(ap=>ap.Jugador1.ID == vm.id || ap.Jugador2.ID == vm.id)
  });
});

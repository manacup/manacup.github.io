app.controller("detallJugadorCtrl", function($scope, $rootScope,$routeParams) {
    $rootScope.pagina = "Detall";
  var vm = this;
    vm.id = $routeParams.id;
    console.log(vm.id)
    console.log($scope.aparellaments)
     console.log($scope.jugadors)
    $scope.resumJugador = $scope.jugadors[vm.id]
    $scope.partidesJugador = $scope.aparellaments.filter((ap)=>{ap.Jugador1.ID == vm.id && ap.Jugador2.ID == vm.id})
   
});

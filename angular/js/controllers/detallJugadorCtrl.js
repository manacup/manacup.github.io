app.controller("detallJugadorCtrl", function($scope, $rootScope,$routeParams) {
    $rootScope.pagina = "Detall";
  var vm = this;
    vm.id = $routeParams.id;
  $scope.resumJugador = $scope.jugadors[vm.id]
});

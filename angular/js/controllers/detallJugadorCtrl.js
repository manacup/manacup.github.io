app.controller("detallJugadorCtrl", function($scope, $rootScope,$location) {
    $rootScope.pagina = "Detall";
  var vm = this;
    vm.id = $location.search().id;
  $scope.resumJugador = $scope.jugadors[vm.id]
});

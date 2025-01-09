app.controller("detallJugadorCtrl", function ($scope, $rootScope, $routeParams) {
  var vm = this;
  vm.id = $routeParams.id;
  $rootScope.pagina = $scope.jugadors[vm.id].Nom;
  //$rootScope.$on('dadesRecuperades', function() {
  console.log('iniciant dades del jugador');
  $scope.resumJugador = $scope.jugadors[vm.id]
  $scope.partidesJugador = Object.values($scope.aparellaments).filter(ap => ap.Jugador1.ID == vm.id || ap.Jugador2.ID == vm.id)
  $scope.campionats = $scope.resumJugador.Campionats.split(/\n/);
  $scope.podis = $scope.resumJugador.Podis.split(/\n/);
  $scope.diplomes = $scope.resumJugador.Diplomes.split(/\n/);
 /*  $scope.posConjuntaArray = $scope.partidesJugador
    .map((p) => parseInt(p.Pos_Conjunta))
    .filter((pa) => !Number.isNaN(pa)); */
  //  });
});

app.controller("detallJugadorCtrl", function ($scope, $rootScope, $routeParams) {
  var vm = this;
  vm.id = $routeParams.id;
  $rootScope.pagina = $scope.jugadors[vm.id].Nom;
  //$rootScope.$on('dadesRecuperades', function() {
  console.log('iniciant dades del jugador');
  $scope.resumJugador = $scope.jugadors[vm.id]
  $scope.partidesJugador = Object.values($scope.aparellaments).filter(ap => ap.Jugador1.ID == vm.id || ap.Jugador2.ID == vm.id)
  $scope.campionats = jugador.Campionats.split(/\n/);
  $scope.podis = jugador.Podis.split(/\n/);
  $scope.diplomes = jugador.Diplomes.split(/\n/);
  $scope.posConjuntaArray = jugador.partides
    .map((p) => parseInt(p.Pos_Conjunta))
    .filter((pa) => !Number.isNaN(pa));
  //  });
});

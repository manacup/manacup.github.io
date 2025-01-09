app.controller("detallJugadorCtrl", function ($scope, $rootScope, $routeParams) {
  var vm = this;
  vm.id = $routeParams.id;
  $rootScope.pagina = $scope.jugadors[vm.id].Nom;
  //$rootScope.$on('dadesRecuperades', function() {
  console.log('iniciant dades del jugador');
  $scope.resumJugador = $scope.jugadors[vm.id]
  $scope.partidesJugador = Object.values($scope.aparellaments).filter(ap => ap.Jugador1.ID == vm.id || ap.Jugador2.ID == vm.id)
  $scope.campionats = jugador.Campionats.split(/\n/).join(", ") || "Encara no ha guanyat cap campionat.";
  $scope.podis = jugador.Podis.split(/\n/).join(", ") || "Encara no ha fet cap podi.";
  $scope.diplomes = jugador.Diplomes.split(/\n/).join(", ") ||
  "Encara no ha aconseguit cap diploma olímpic.";
  $scope.posConjuntaArray = jugador.partides
    .map((p) => parseInt(p.Pos_Conjunta))
    .filter((pa) => !Number.isNaN(pa));
  //  });
});

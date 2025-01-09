app.controller("detallJugadorCtrl", function ($scope, $rootScope, $routeParams) {
  var vm = this;
  vm.id = $routeParams.id;
  $rootScope.pagina = $scope.jugadors[vm.id].Nom;
  //$rootScope.$on('dadesRecuperades', function() {
  console.log('iniciant dades del jugador');
  $scope.resumJugador = $scope.jugadors[vm.id]
  $scope.partidesJugador = Object.values($scope.aparellaments).filter(ap => ap.Jugador1.ID == vm.id || ap.Jugador2.ID == vm.id)
  $scope.partidesJugador.forEach((partidaJug)=>{
    partidaJug.JugadorObj = partidaJug.Jugador1.ID == vm.id? partidaJug.Jugador1 : partidaJug.Jugador2
    partidaJug.JugadorAdv = partidaJug.Jugador1.ID != vm.id? partidaJug.Jugador1 : partidaJug.Jugador2
})
$scope.majorZero = function(key) {
  return function(partida) {
    // Accedeix al valor dinàmicament utilitzant la key
    var value = key.split('.').reduce(function(obj, k) {
      return obj && obj[k];
    }, partida);
    
    // Filtra només si el valor és més gran que 0
    return value > 0;
  };
};
  $scope.campionats = $scope.resumJugador.Campionats.split(/\n/);
  $scope.podis = $scope.resumJugador.Podis.split(/\n/);
  $scope.diplomes = $scope.resumJugador.Diplomes.split(/\n/);
  $scope.posConjuntaArray = $scope.partidesJugador
    .map((p) => parseInt(p.Pos_Conjunta))
    .filter((pa) => !Number.isNaN(pa));
  $scope.minFromArray = function(array) {
      return Math.min(...array);
    };
  $scope.posConjunta = $scope.minFromArray($scope.posConjuntaArray)
  $scope.imatgeGran =  function(element) {    
    element.classList.toggle("imatge-completa");}
  $scope.advConjunta = $scope.resumJugador.Adversari_conjunta.split("-")  
  $scope.mots = $scope.resumJugador.Mot_jugada.split("-")  
  $scope.advJugada = $scope.resumJugador.Adversari_jugada.split("-")
  
  //  });
});
// ToolTipApp is the ng-app application in your web app
app.directive('tooltip', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      new bootstrap.Tooltip(element[0], {delay: {"show": 1000, "hide": 100 } });
    }
  };
});

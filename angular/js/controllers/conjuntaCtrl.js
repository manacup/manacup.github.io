app.controller("conjuntaCtrl", function($scope, $rootScope) {
    $rootScope.pagina = "Partida conjunta";
    $scope.ordre = "-Suma_punts"
    $scope.ordreConjunta = function(){
      
$scope.ordre == "-Suma_punts"
?$scope.ordre = "-Data"

:$scope.ordre = "-Suma_punts"
    }
    
    $scope.combinedFilter = function(partida) {
        var searchTermMatch = (!$scope.cerca || partida.Jugador1.toLowerCase().includes($scope.cerca.toLowerCase()) || partida.Jugador2.toLowerCase().includes($scope.cerca.toLowerCase()));
        var blankCategoryMatch = (partida.Suma_punts > 0);
        
        return searchTermMatch && blankCategoryMatch;
        
    };
    const mesos = ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"];
    const mesosNum = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    $scope.data = function(d) {
        return new Date(d * 86400000 - 2209161600000);
    };

    $scope.datareduida = function(d) {
        var date = $scope.data(d);
        return date.getDate() + "/" + mesosNum[date.getMonth()] + "/" + date.getFullYear();
    };

    $scope.dies = function(d) {
        var ara = new Date();
        var partidaData = $scope.data(d);
        var difereciaMS = ara - partidaData;
        return convertMiliseconds(difereciaMS, "d");
    };

    function convertMiliseconds(milliseconds, returnUnit) {
        var days, hours, minutes, seconds;

        seconds = Math.floor(milliseconds / 1000);
        minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        days = Math.floor(hours / 24);
        hours = hours % 24;

        switch (returnUnit) {
            case "d":
                return days;
            case "h":
                return hours;
            case "m":
                return minutes;
            case "s":
                return seconds;
            default:
                return { d: days, h: hours, m: minutes, s: seconds };
        }
    }
});
var mlbApp = angular.module('mlbApp', ['ngMaterial']);

mlbApp.controller('MatchupController', function MatchupController($scope, $http) {
    $http.get('/matchups')
        .success(function(data) {
            $scope.matchups = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});

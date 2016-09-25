
angular
.module('app', ['ngMaterial'] ) // Include app dependency on ngMaterial
.controller('mainController', function($scope, $mdMedia, $mdSidenav) {

    $scope.$mdMedia = $mdMedia; // https://github.com/angular/material/issues/2341#issuecomment-93680762

    // Handle Sidenav toggle button click
    $scope.toggleLeftSidenav = function() { // http://jsfiddle.net/qo1gmrrr/
        $mdSidenav('left').toggle();
    }
});

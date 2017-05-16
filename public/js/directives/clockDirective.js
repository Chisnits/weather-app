angular.module('weatherApp').directive('clockDirective', function(){

    return{
        restrict: 'E',
        templateUrl: './views/directives/clockDirective.html',
        controller: 'clockCtrl'
    }


})
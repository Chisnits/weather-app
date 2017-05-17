angular.module('weatherApp').directive('fiveDayDirective', function(){
       return{
        restrict: 'E',
        templateUrl: './views/directives/fiveTmpl.html',
        controller: 'clockCtrl'
    }

});
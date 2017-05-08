// angular.module('weatherApp',[]);
var app = angular.module('weatherApp',['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: './views/home.html',
            controller: 'weatherCtrl',
            resolve: {
                pic: function(weatherService){
                    return weatherService.getBackground();
                }
            }
        })
        .state('fiveDayForecast', {
            url: '/five',
            templateUrl: './views/fiveDayForecast.html',
        });

        $urlRouterProvider.when('','/');
        
        });
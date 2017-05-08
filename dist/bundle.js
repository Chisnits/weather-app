// angular.module('weatherApp',[]);
var app = angular.module('weatherApp',['ui.router']).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: './views/home.html',
            controller: 'weatherCtrl',
            resolve: {
                pic: ["weatherService", function(weatherService){
                    return weatherService.getBackground();
                }]
            }
        })
        .state('fiveDayForecast', {
            url: '/five',
            templateUrl: './views/fiveDayForecast.html',
        });

        $urlRouterProvider.when('','/');
        
        }]);
angular.module('weatherApp').controller('weatherCtrl', ["$scope", "weatherService", "pic", function($scope, weatherService, pic){
    $scope.pictures = pic.url;
    $scope.lat = location.lat;
    $scope.lon = location.lon;

    $scope.currentTime = moment().format('LT');

weatherService.getCurrentLocation().then(function(location){
    $scope.location = location;
    console.log(location)
    $scope.lat = location.lat;
    $scope.lon = location.lon;



    weatherService.getWeather($scope.lat, $scope.lon).then(function(weather){
        $scope.weather = weather;
        console.log(weather)
        var weatherObj = weather.weather.pop()
        var currentWeather = weatherObj.main;
        $scope.currentWeather = currentWeather;
        var iconBaseUrl = 'http://openweathermap.org/img/w/'
        var weatherIcon = weatherObj.icon;
        $scope.weatherIcon = iconBaseUrl + weatherIcon + ".png"
        console.log($scope.weatherIcon)
        
        var currentTemp = weather.main.temp;
        $scope.currentTemp = Math.round(currentTemp);

        var maxTemp = weather.main.temp_max;
        $scope.maxTemp = Math.round(maxTemp);

        var minTemp = weather.main.temp_min;
        $scope.minTemp = Math.round(minTemp);
    })

    var date = new Date()
    var format = 'LLLL'
    var results = moment(date).format(format);
    console.log(results)
    $scope.results = results;


});
}]);
angular.module('weatherApp').directive('clockDirective', function(){

    return{
        restrict: 'E',
        templateUrl: './views/directives/clockDirective.html'
    }


})
angular.module('weatherApp').service('weatherService', ["$http", function($http){
    
    var baseUrl = "http://api.openweathermap.org/data/2.5/"
    var apiKey = "8a22a16e9c88b36888875591e135bd0d"
    this.getWeather = function(lat,lon){
        console.log(lat, lon);
        return $http({
            method: 'GET',
            url: baseUrl + "weather?" + "mode=json&units=imperial&" + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
    }).then(function(response){
        if(response.status === 200){
            return response.data
        }
            return "Something Went Wrong"
        })
    }
    this.getCurrentLocation = function(){
        return $http({
            method: 'GET',
            url: 'http://ip-api.com/json'
    }).then(function(response){
        // console.log(response.data)
        if(response.status === 200){
            return response.data
        }
            return "Something Went Wrong"
        })
    }
    var unsplash = "https://unsplash.it/2000/1500/?random";
    this.getBackground = function(){
        return $http({
            method: 'GET',
            url: unsplash
    }).then(function(response){
        // console.log(response.config.url)
        if(response.status === 200){
            console.log(response.config.url)
            return response.config
        }
            return "Something Went Wrong"
        })
    }


}]);
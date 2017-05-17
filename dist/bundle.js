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
angular.module('weatherApp').controller('clockCtrl', ["$scope", function($scope){


const secondHand = document.querySelector('.second-hand')
  const minsHand = document.querySelector('.min-hand')
  const hourHand = document.querySelector('.hour-hand')
  function setDate(){
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    // console.log(seconds);
    const mins = now.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;
    
    const hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  }
  setInterval(setDate, 1000);

  }])
angular.module('weatherApp').controller('weatherCtrl', ["$scope", "weatherService", "pic", function($scope, weatherService, pic){
    $scope.pictures = pic.url;
    $scope.lat = location.lat;
    $scope.lon = location.lon;
    var date = new Date()
    var format = 'LLLL'
    var results = moment(date).format(format);
    console.log(results)
    $scope.results = results;

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

//                                     //
//                5-DAY                //
//                                     //

    weatherService.getFiveDayForecast($scope.lat, $scope.lon).then(function(fiveDayWeather){
        $scope.fiveDayWeather = fiveDayWeather;
        console.log(fiveDayWeather);
        
        // var weatherObj = weather.weather.pop()
        // var currentWeather = weatherObj.main;
        // $scope.currentWeather = currentWeather;
        // var iconBaseUrl = 'http://openweathermap.org/img/w/'
        // var weatherIcon = weatherObj.icon;
        // $scope.weatherIcon = iconBaseUrl + weatherIcon + ".png"
        // console.log($scope.weatherIcon)
        
        // var currentTemp = weather.main.temp;
        // $scope.currentTemp = Math.round(currentTemp);

        // var maxTemp = weather.main.temp_max;
        // $scope.maxTemp = Math.round(maxTemp);

        // var minTemp = weather.main.temp_min;
        // $scope.minTemp = Math.round(minTemp);
    })

    


    });
}]);
angular.module('weatherApp').directive('clockDirective', function(){

    return{
        restrict: 'E',
        templateUrl: './views/directives/clockDirective.html',
        controller: 'clockCtrl'
    }


})
angular.module('weatherApp').directive('fiveDayDirective', function(){
       return{
        restrict: 'E',
        templateUrl: './views/directives/fiveTmpl.html',
        controller: 'clockCtrl'
    }

});
angular.module('weatherApp').service('weatherService', ["$http", function($http){
    
    var baseUrl = "http://api.openweathermap.org/data/2.5/"
    var apiKey = "8a22a16e9c88b36888875591e135bd0d"
    this.getWeather = function(lat,lon){
        console.log(lat, lon);
        return $http({
            method: 'GET',
            url: baseUrl + "weather?" + "mode=json&units=imperial&" + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
    }).then(function(response){
        // console.log(response.data)
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

//                                     //
//                5-DAY                //
//                                     //
    var fiveDayBase="http://api.openweathermap.org/data/2.5/forecast?"
    var fiveDayKey="2eb41514978692779797c3e8f93cb385"
    this.getFiveDayForecast = function(lat,lon){
        // console.log(lat, lon);
        return $http({
            method: 'GET',
            url: fiveDayBase + "mode=json&units=imperial&lat=" + lat + "&lon=" + lon  + "&appid=" + fiveDayKey
    }).then(function(response){``
        console.log(response.data);
        if(response.status === 200){
            return response.data
        }
            return "Something Went Wrong"
        })
    }
}]);
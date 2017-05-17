angular.module('weatherApp').service('weatherService', function($http){
    
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
});
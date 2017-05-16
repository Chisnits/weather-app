angular.module('weatherApp').controller('weatherCtrl', function($scope, weatherService, pic){
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

    weatherService.getFiveDayForecast($scope.lat, $scope.lon).then(function(fiveDayWeather){
        $scope.fiveDayWeather = fiveDayWeather;
        console.log(fiveDayWeather);
    })

    


});

//                                     //
//                5-DAY                //
//                                     //

});
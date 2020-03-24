
var searchHistory = [];

for (var i = 0; i < localStorage.length; i++) {
    searchHistory.push(localStorage.getItem(i));
}

for (var i = 0; i < searchHistory.length; i++) {
    var historyContainer = $("<div>");
    historyContainer.addClass("userHistory");
    historyContainer.data("city", searchHistory[i]);
    historyContainer.text(searchHistory[i]);
    $(".recentSearches").prepend(searchHistory);
}

$('#userSearch').submit(function (event) {
    // alert('Handler for .submit() called.');
    event.preventDefault();


    fetchWeather()
});
var fetchWeather = function (e) { // e is short for event

    var userCity = $("#cityInput").val() // grabs user-input value
    var city = userCity || 'richmond'; // if user doesn't provide city, default to 'Richmond'


    var currentURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city},{state}us&appid=26b725bced630f42f77f9f97edf3d53a`;
    $.ajax({
        url: currentURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response)

        $('#cityDisplay').empty()
        var cityName = response.name;
        $('#cityDisplay').append(cityName);

        // for (var i = 0; i < weatherData.length; i++)
        var currentDate = moment().format("MMM Do YYYY");
        var weatherContainer = $('<div>').addClass('currentForecast')
        var currentDay = $('<h5>').text(currentDate).append('<img id="icon" src=http://openweathermap.org/img/w/' + response.weather[0].icon + '.png>')
        var currentTemp = $('<h5>').text('Current Temperature: ' + response.main.temp + ' ' + '°F')
        var currentHumidity = $('<h5>').text('Current Humidity: ' + response.main.humidity + ' ' + '%')
        var currentWindSpeed = $('<h5>').text('Wind Speed: ' + response.wind.speed + ' MPH')
        // var currentUv = 
        
        $('#searchResultCurrent').append(currentDay, currentTemp, currentHumidity, currentWindSpeed);
    })


    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${city},{state}us&appid=26b725bced630f42f77f9f97edf3d53a`;
    $.ajax({
        url: forecastURL,
        method: 'GET'
    }).then(function (response) {
        // console.log(response)
        
        
        $('.futureForecast').remove()

        var forecastData = [response.list[2], response.list[10], response.list[18], response.list[26], response.list[34]]
        // console.log(forecastData)

        for (var i = 0; i < forecastData.length; i++) {

            var forecastContainer = $('<div>').addClass('futureForecast')
            var day = $('<h5>').text(forecastData[i].dt_txt.split(' ')[0]).append('<img id="icon" src=http://openweathermap.org/img/w/' + forecastData[i].weather[0].icon + '.png>')
            var temp = $('<h5>').text('Temperature: ' + forecastData[i].main.temp + ' ' + '°F')
            var humidity = $('<h5>').text('Humidity: ' + forecastData[i].main.humidity + ' ' + '%')
            forecastContainer.append(day, temp, humidity)
          
            $('#searchResultFuture').append(forecastContainer)
        }


        // console.log(cityName)

    })
}
// var coinImage = $('<img>').attr('src', response[i].image)
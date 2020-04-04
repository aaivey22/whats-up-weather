var future = $('.futureForecast')
var current = $('.currentForecast')

$('#userSearch').submit(function (event) {
    // alert('Handler for .submit() called.');
    event.preventDefault();

    if (future) {
        (future).remove();
    }

    fetchWeather()
});

var fetchWeather = function (e) { // e is short for event

    var userCity = $("#cityInput").val().trim() // grabs user-input value
    var city = userCity || 'richmond'; // if user doesn't provide city, default to 'Richmond'
    var pastCities = JSON.parse(localStorage.getItem('cities'))
    pastCities.push(city)
    //remove duplicates, String interplation
    localStorage.setItem('cities', JSON.stringify(pastCities))
    $('#recentSearches').empty()
    for (var i = 0; i < pastCities; i++) {
        $('#recentSearches').append(`<button>${pastCities[i]}</button>`)
    }

    getAllWeatherData(city)
}
var getAllWeatherData = function (city) {
    var currentURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city},{state}us&appid=26b725bced630f42f77f9f97edf3d53a`;
    $.ajax({
        url: currentURL,
        method: 'GET'
    }).then(function (response) {
        renderWeather(response)
    })

    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${city},{state}us&appid=26b725bced630f42f77f9f97edf3d53a`;
    $.ajax({
        url: forecastURL,
        method: 'GET'
    }).then(function (response) {
        // console.log(response) 
        renderForecast(response)
    })
}
var renderWeather = function (response) {
    $('#cityDisplay').empty()
    var cityName = response.name;
    $('#cityDisplay').append(cityName);

    $('.currentForecast').remove()
    // for (var i = 0; i < weatherData.length; i++)
    var currentDate = moment().format("MMM Do YYYY");
    var weatherContainer = $('<div>').addClass('currentForecast')
    var currentDay = $('<h5>').text(currentDate).append('<img id="icon" src=http://openweathermap.org/img/w/' + response.weather[0].icon + '.png>')
    var currentTemp = $('<h5>').text('Current Temperature: ' + response.main.temp + ' ' + '°F')
    var currentHumidity = $('<h5>').text('Current Humidity: ' + response.main.humidity + ' ' + '%')
    var currentWindSpeed = $('<h5>').text('Wind Speed: ' + response.wind.speed + ' MPH')
    // var currentUv =     
    weatherContainer.append(currentDay, currentTemp, currentHumidity, currentWindSpeed)
    $('#searchResultCurrent').append(weatherContainer)
}

var renderForecast = function (response) {
    $('.futureForecast').remove()

    var forecastData = [response.list[2], response.list[10], response.list[18], response.list[26], response.list[34]]
    // console.log(forecastData)
    for (var i = 0; i < forecastData.length; i++) {

        var forecastContainer = $('<div>').addClass('futureForecast card-body')
        var day = $('<h5>').addClass('card-title').text(forecastData[i].dt_txt.split(' ')[0]).append('<img id="icon" src=http://openweathermap.org/img/w/' + forecastData[i].weather[0].icon + '.png>')
        var temp = $('<h5>').addClass('card-text').text('Temp: ' + forecastData[i].main.temp + ' ' + '°F')
        var humidity = $('<h5>').addClass('card-text').text('Humidity: ' + forecastData[i].main.humidity + ' ' + '%')
        forecastContainer.append(day, temp, humidity)

        $('#searchResultFuture').append(forecastContainer)
    }
}

$(document).ready(function () {
    var pastCities = localStorage.getItem('cities')
    pastCities = JSON.parse(pastCities)
    console.log(pastCities)
    if (pastCities !== null && pastCities.length) {
        for (var i = 0; i < pastCities.length; i++) {
            var button = $(`<button>${pastCities[i]}</button>`).addClass('btn btn-secondary mr-2');
            button.click(function () {
                getAllWeatherData($(this).text())
            })
            $("#recentSearches").append(button)
        }
    } else {
        pastCities = []
        localStorage.setItem('cities', JSON.stringify(pastCities))
    }
})
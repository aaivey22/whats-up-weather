
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
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${city},{state}us&appid=26b725bced630f42f77f9f97edf3d53a`;
    // var currentURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city},{state}us&appid=26b725bced630f42f77f9f97edf3d53a`;
    $.ajax({
        url: forecastURL,
        method: 'GET'
    }).then(function (response) {
        // console.log(response)
        $('#title').empty()
        $('.futureForecast').remove()

        var forecastData = [response.list[2], response.list[10], response.list[18], response.list[26], response.list[34]]
        // console.log(forecastData)

        var cityName = response.city.name;
        $('#title').append(cityName);


        // let temperature = $('<p>').attr('id', 'temperature').text('Temperature: ' + res.main.temp + ' ' +  'F')

        for (var i = 0; i < forecastData.length; i++) {

            var weatherItem = $('<div>').addClass('futureForecast')
            var day = $('<h5>').text(forecastData[i].dt_txt.split(' ')[0])
            var temp = $('<h5>').text('Temperature: ' + forecastData[i].main.temp + ' ' + 'F')
            var humidity = $('<h5>').text('Humidity: ' + forecastData[i].main.humidity + ' ' + '%')
            var weatherIcon = $('<h5>').prepend('<img id="icon" src=http://openweathermap.org/img/w/' + forecastData[i].weather[0].icon + '.png>')
            weatherItem.append(day, weatherIcon, temp, humidity)
          
            $('#searchResultFuture').append(weatherItem)
        }


        // console.log(cityName)

    })
}
// var coinImage = $('<img>').attr('src', response[i].image)
$('#userSearch').submit(function (event) {
    // alert('Handler for .submit() called.');
    event.preventDefault();
    fetchWeather()
});
var fetchWeather = function () { // e is short for event
    // console.log("test")

    var userCity = $("#cityInput").val() // grabs input value

    var city = userCity || 'richmond'; // if user doesn't provide city, default to 'Richmond'
    var queryURL = `http://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${city},us&appid=26b725bced630f42f77f9f97edf3d53a`;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response)
            
        var weatherData = [response.list[2], response.list[10], response.list[18], response.list[26], response.list[34]]
        console.log(weatherData)


            var cityName = response.city.name;
            $('#searchResult').append(cityName);


            for (var i = 0; i < weatherData.length; i++) {
                var weatherItem = $('<div>').addClass('futureForecast')
                var day = $('<h5>').text(weatherData[i].dt_txt.split(' ')[0])
                var temp = $('<h5>').text(weatherData[i].main.temp)
                var humidity = $('<h5>').text(weatherData[i].main.humidity)
                // var weatherIcon = $('<i>').attr('id', weatherData[i].weather[0].icon)
                
                weatherItem.append(day, temp, humidity)
                $('#searchResult').append(weatherItem)
            }


            // console.log(cityName)
           
    })
}
// var coinImage = $('<img>').attr('src', response[i].image)
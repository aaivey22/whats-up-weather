$('#userSearch').submit(function (event) {
    // alert('Handler for .submit() called.');
    event.preventDefault();
    fetchWeather()
});
var fetchWeather = function () { // e is short for event
    // console.log("test")

    var userCity = $("#cityInput").val() // grabs input value

    var city = userCity || 'richmond'; // if user doesn't provide city, default to 'Richmond'
    var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city},us&appid=26b725bced630f42f77f9f97edf3d53a`;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response)
        // $('#searchResult').text(response.city);

        // for (var i = 0; i < response.length; i++) {
        //     // var coinImage = $('<img>').attr('src', response[i].image)
        //     var cityName = $('<p>').text(response[i].name);
        //     console.log(cityName)
        //     $('#searchResult').text(cityName);
        // }
    });
}
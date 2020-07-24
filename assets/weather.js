var dateLocation = moment().format("d");
console.log(dateLocation);

var yourZip = 30047;

function getWeather () {
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?zip=" + yourZip + "&appid=b2cb9091c77c412d1dede93b0ba6839c";
$.ajax({
    url: queryUrl,
    method: "Get"
}).then (function (response) {
    console.log(response);
    var lat = response.city.coord.lat;
    var lon = response.city.coord.lon;
    secondQueryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=b2cb9091c77c412d1dede93b0ba6839c"
})
};

getWeather();
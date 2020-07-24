var headerNameEl = $("#headerName");
var sundayEl = $("#0");
var mondayEl = $("#1");
var tuesdayEl = $("#2");
var wednesdayEl = $("#3");
var thursdayEl = $("#4");
var fridayEl = $("#5");
var saturdayEl = $("#6");

var dateLocation = moment().format("d");
console.log(dateLocation);

var yourZip = 30047;
var lat = 0;
var lon = 0;

function getWeather () {
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?zip=" + yourZip + "&appid=b2cb9091c77c412d1dede93b0ba6839c";
$.ajax({
    url: queryUrl,
    method: "Get"
}).then (function (response) {
    console.log(response);
    lat = response.city.coord.lat;
    lon = response.city.coord.lon;
    secondQueryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=b2cb9091c77c412d1dede93b0ba6839c"
})
};

function getWeatherHistory () {
    v
}
getWeather();
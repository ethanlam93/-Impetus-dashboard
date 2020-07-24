var headerNameEl = $("#headerName");
var userNameEl = $("#userName");
var zipCodeEl = $("#zipCode");
var sundayEl = $("#0");
var mondayEl = $("#1");
var tuesdayEl = $("#2");
var wednesdayEl = $("#3");
var thursdayEl = $("#4");
var fridayEl = $("#5");
var saturdayEl = $("#6");

var dateLocation = moment().format("d");
console.log(dateLocation);
var d = new Date();
d.setDate(d.getDate()-7);
console.log(d);

var yourZip = 30047;
var lat = 0;
var lon = 0;
var dt = 0;

// Check to see if values previous entry of username and zipcode.  
var dashboardUserName = JSON.parse(localStorage.getItem("dun"));
var dashboardUserZip = JSON.parse(localStorage.getItem("duz"));

// Validate if storage exist, if proceed to dashboard. 
if (dashboardUserName !== null && dashboardUserZip !== null) {
    previousCitiesSearched = storedCities;
    $("#currentCityWeather").empty();
    cityToSearch = previousCitiesSearched[0];
    createCityButtons();
    mainWeatherHeader();
} else {
    previousCitiesSearched = [];
};

function getWeather() {
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?zip=" + yourZip + "&appid=b2cb9091c77c412d1dede93b0ba6839c";
    $.ajax({
        url: queryUrl,
        method: "Get"
    }).then(function (response) {
        console.log(response);
        lat = response.city.coord.lat;
        lon = response.city.coord.lon;
        secondQueryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=b2cb9091c77c412d1dede93b0ba6839c";
        getFiveDayForecast();
    })
};

function getFiveDayForecast() {
    $.ajax({
        url: secondQueryUrl,
        method: "Get"
    }).then (function (response) {
        console.log(response);
        dt = response.current.dt;
        getWeatherHistory();
    })
};

function getWeatherHistory() {
    var historyQuery = "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" + lat + "&lon=" + lon + "&dt=" + dt + "&units=imperial&appid=b2cb9091c77c412d1dede93b0ba6839c";
    $.ajax({
        url: historyQuery,
        method: "Get"
    }).then (function (response) {
        console.log(response);
    })
};

function setUserName() {
    user
};

// Click Event to submit form data.
$(".#submitBtn").on("click", function (event) {
    event.preventDefault();
    // $("").removeClass("d-none");
    setUserName();
    getWeather();
});

// keypress event added to enter key within text input
$(document).keypress(function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        // $("").removeClass("d-none");
        setUserName();
        getWeather();
    }
});
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

var userName = "";
var userZip = 0;
var lat = 0;
var lon = 0;
var dt = 0;

// Check to see if values previous entry of username and zipcode.  
var dashboardUserName = JSON.parse(localStorage.getItem("dun"));
var dashboardUserZip = JSON.parse(localStorage.getItem("duz"));

// Validate if storage exist, if it does proceed to dashboard. 
if (dashboardUserName !== null && dashboardUserZip !== null) {
    userName = dashboardUserName;
    userZip = dashboardUserZip;
    // go straight to quote;

} else {
    // display form field;
};

function getWeather() {
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?zip=" + userZip + "&appid=b2cb9091c77c412d1dede93b0ba6839c";
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
    if (userNameEl.val() == "") {
        return;
    } else {
        $("#headerName").empty();
        userName = $("#userName").val();
        localStorage.setItem("dun", JSON.stringify(userName));
        $("#headerName").html("Welcome " + userName);
    };
};

function setUserZip() {
    if (zipCodeEl.val() == "") {
        return;
    } else {
        userZip = $("#zipCode").val();
        localStorage.setItem("duz", JSON.stringify(userZip));
    };
};

// Click Event to submit form data.
$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    console.log(event);
    // $("").removeClass("d-none");
    setUserName();
    setUserZip();
    getWeather();
});

// keypress event added to enter key within text input
$(document).keypress(function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        console.log(event);
        // $("").removeClass("d-none");
        setUserName();
        setUserZip();
        getWeather();
    };
});
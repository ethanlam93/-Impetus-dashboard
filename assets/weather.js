var headerNameEl = $("#headerName");
var userNameEl = $("#userName");
var zipCodeEl = $("#zipCode");

var currentDate = moment().format("MM-DD-YY");
var currentDOW = moment().format("dddd");

if (currentDate !== "" && currentDOW !== "") {
  for (var j = 0; j < 7; j++) {
    $("#" + j).empty();
    var displayDOW = moment().add(j, "day").format("dddd");
    var displayDate = moment().add(j, "day").format("MM-DD-YY");
    var dayEl = $("<h3>");
    dayEl.addClass("day").text(displayDOW);
    var dateEl = $("<h4>");
    dateEl.addClass("date").text(displayDate);
    $("#" + j).append(dayEl, dateEl);
  }
}

var userName = "";
var userZip = 0;
var lat = 0;
var lon = 0;

// $.ajax({
//     url: "https://api.forismatic.com/api/1.0/",
//     jsonp: "jsonp",
//     dataType: "jsonp",
//     data: {
//       method: "getQuote",
//       lang: "en",
//       format: "jsonp"
//     }
//   }).then(function(response) {
//     console.log(response);
// })



// Check to see if values previous entry of username and zipcode.  
var dashboardUserName = JSON.parse(localStorage.getItem("dun"));
var dashboardUserZip = JSON.parse(localStorage.getItem("duz"));

// Validate if storage exist, if it does proceed to dashboard.
if (dashboardUserName !== null && dashboardUserZip !== null) {
  userName = dashboardUserName;
  userZip = dashboardUserZip;
  setUserName();
  getWeather();
  // go straight to quote;
} else {
  // display form field;
}

function getQuote() {
  $.ajax({
    url: "https://favqs.com/api/qotd",
    method: "Get",
  }).then(function (response) {
    console.log(response);
    $("#mainQuote").empty();
    $("#mainQuote").html(
      "<div class='quoteBody'>" +
        response.quote.body +
        "</div> <div class='quoteAuthor'>" +
        response.quote.author +
        "</div>"
    );
    $("#headerQuote").empty();
    $("#headerQuote").html(
      "<div class='quoteBody'>" +
        response.quote.body +
        "</div> <div class='quoteAuthor'>" +
        response.quote.author +
        "</div>"
    );
  });
}

function getWeather() {
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/forecast?zip=" +
    userZip +
    "&appid=b2cb9091c77c412d1dede93b0ba6839c";
  $.ajax({
    url: queryUrl,
    method: "Get",
  }).then(function (response) {
    console.log(response);
    lat = response.city.coord.lat;
    lon = response.city.coord.lon;
    secondQueryUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial&appid=b2cb9091c77c412d1dede93b0ba6839c";
    getFiveDayForecast();
  });
}

function getFiveDayForecast() {
  getQuote();
  $.ajax({
    url: secondQueryUrl,
    method: "Get",
  }).then(function (response) {
    console.log(response);
    for (var i = 0; i < 7; i++) {
      var weatherImg = $("<img>");
      weatherImg.addClass("weatherImg");
      weatherImg.attr(
        "src",
        "https://openweathermap.org/img/w/" +
          response.daily[i].weather[0].icon +
          ".png"
      );
      var hiLoTemp = $("<p>");
      hiLoTemp.addClass("temperature");
      hiLoTemp.html(
        "Hi- " +
          response.daily[i].temp.max +
          " &#8457; <br>Lo- " +
          response.daily[i].temp.morn +
          " &#8457;"
      );
      $("#" + i).append(weatherImg, hiLoTemp);
    }

    // getWeatherHistory();
  });
}

function getWeatherHistory() {
  var historyQuery =
    "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" +
    lat +
    "&lon=" +
    lon +
    "&dt=" +
    dt +
    "&units=imperial&appid=b2cb9091c77c412d1dede93b0ba6839c";
  $.ajax({
    url: historyQuery,
    method: "Get",
  }).then(function (response) {
    console.log(response);
  });
}
// added comment
function setUserName() {
  if (userNameEl.val() == "" && dashboardUserName == null) {
    return;
  } else if (userNameEl.val() == "" && dashboardUserName !== null) {
    $("#headerName").empty();
    $("#headerName").html("Welcome " + userName);
  } else {
    $("#headerName").empty();
    userName = $("#userName").val();
    localStorage.setItem("dun", JSON.stringify(userName));
    $("#headerName").html("Welcome " + userName);
  }
}

function setUserZip() {
  if (zipCodeEl.val() == "") {
    return;
  } else {
    userZip = $("#zipCode").val();
    localStorage.setItem("duz", JSON.stringify(userZip));
  }
}

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
  }
});

var headerNameEl = $("#headerName");
var userNameEl = $("#userName");
var zipCodeEl = $("#zipCode");
var userName = "";
var userZip = 0;
var lat = 0;
var lon = 0;

// Check to see if values previous entry of username and zipcode.
var dashboardUserName = JSON.parse(localStorage.getItem("dun"));
var dashboardUserZip = JSON.parse(localStorage.getItem("duz"));

// Validate if storage exist, if it does proceed to dashboard.
if (dashboardUserName !== null && dashboardUserZip !== null) {
  userName = dashboardUserName;
  userZip = dashboardUserZip;
  getQuote();
  setUserName();
  getWeather();
  switchDisplay();
} else {
  $("#mainDashboard").css("display", "none");
  $("#quoteElement").css("display", "none");
}

// Function to generate ajax request for quote and populate html elements
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

// First function to get weather from zipcode in order to obtain lat and lon coordinates
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
    $(".cityName").text(response.city.name.toUpperCase())
    getFiveDayForecast();
  });
}

// Function to pull five day forecast based on lat and lon coordinates generated above to populate html.
function getFiveDayForecast() {
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
  });
}

// Function to take input value from name field and place in local storage and html
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

// Function to take input value from zip code field and place in local storage and global variables for forecast.
function setUserZip() {
  if (zipCodeEl.val() == "") {
    return;
  } else {
    userZip = $("#zipCode").val();
    localStorage.setItem("duz", JSON.stringify(userZip));
  }
}

// Function to switch display class at timed interval for quote and main dashboard on field submit
function switchDisplay() {
  $(".startPage, #mainDashboard").css("display", "none");
  $("#quoteElement").css("display", "block");
  //display slow animation transition
  gsap.from("#quoteElement", { opacity: 0, duration: 2, y: 50, ease: "sine.in" });
  //Animation for the dashboard
  var tl = gsap.timeline({ duration: 6, ease: "Sine.easeOut" })
  tl
    .from("#dateDisplay", { opacity: 0, y: -50 })
    .from("#headerName", { opacity: 0, y: -50 })
    .from(".quote", { opacity: 0, y: -50 })
    .from(".cityName", { opacity: 0, y: -50 })
    .from(".sun", { opacity: 0, y: -50 },'-=0.5')
    .from(".mon", { opacity: 0, y: -50 },'-=0.5')
    .from(".tues", { opacity: 0, y: -50 },'-=0.3')
    .from(".wed", { opacity: 0, y: -50 },'-=0.3')
    .from(".thurs", { opacity: 0, y: -50 },'-=0.2')
    .from(".fri", { opacity: 0, y: -50 },'-=0.2')
    .from(".sat", { opacity: 0, y: -50 },'-=0.2')
    .from(".apiRow", { opacity: 0, y: -50, })
  setTimeout(function () {
    $("#quoteElement").css("display", "none");
    $("#mainDashboard").css("display", "block");
  }, 6000);

}

// Click Event to submit form data.
$("#submitBtn").on("click", function (event) {
  event.preventDefault();
  console.log(event);
  getQuote();
  setUserName();
  setUserZip();
  getWeather();
  switchDisplay();
});

// keypress event added to enter key within text input
$("#username,#zipCode").keypress(function (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    console.log(event);
    getQuote();
    setUserName();
    setUserZip();
    getWeather();
    switchDisplay();
  }
});

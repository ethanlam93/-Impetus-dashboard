var headerNameEl = $("#headerName");
var userNameEl = $("#userName");
var zipCodeEl = $("#zipCode");
var userName = "";
var userZip = 0;
var lat = 0;
var lon = 0;

var eventStartDate = "&datetime_local.gte=" + moment().format("YYYY-MM-DD");
var eventEndDate = "&datetime_local.lt=" + moment().add(7, "day").format("YYYY-MM-DD");


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
  getEvents();
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
      "<div class='quoteBody title is-1'>" +
        response.quote.body +
        "</div> <div class='quoteAuthor title is-2 is-italic'>" +
        response.quote.author +
        "</div>"
    );
    $("#headerQuote").empty();
    $("#headerQuote").html(
      "<div class='quoteBody title is-4'>" +
        response.quote.body +
        "</div> <div class='quoteAuthor title is-5 is-italic'>" +
        response.quote.author +
        "</div>"
    );
  });
}

// Function to retrieve local events using zip code and date range
function getEvents() {
  var eventQuery = "https://api.seatgeek.com/2/events?client_id=MjEyMzc4NzN8MTU5NTg5NDE2Ny42NA&geoip=" + userZip + "&range=30mi" + eventStartDate + eventEndDate;
  console.log(eventQuery);
  $.ajax({
    url: eventQuery,
    method: "Get"
  }).then (function(response) {
    console.log(response);
    for ( var x = 0; x < response.events.length; x++) {
      var eventEl = $("<div>");
      eventEl.addClass("eventCard column has-text-centered");
      eventEl.attr("id", "x" + x);
      var dateStr = response.events[x].datetime_local;
      var eventDate = moment(dateStr);
      var eventDateDsp = eventDate.utc().format("dddd <br> M-D");
      var dateEl = $("<div>");
      dateEl.addClass("eventDate is-size-4 has-text-weight-bold");
      dateEl.html(eventDateDsp);
      var titleEl = $("<div>");
      titleEl.addClass("eventTitle is-size-6 has-text-weight-semibold");
      titleEl.html(response.events[x].title);
      var locationEl = $("<div>");
      locationEl.addClass("eventLoc is-size-6 is-italic");
      locationEl.html("Venue: <br>" + response.events[x].venue.name);
      eventEl.append(dateEl, titleEl, locationEl);
      $(".eventRow").append(eventEl);

    }

  })
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
        "<strong>Hi-</strong> " +
        response.daily[i].temp.max +
        " &#8457; <br> <strong>Lo-</strong> " +
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
    getEvents();
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
    .from(".eventLabel", { opacity: 0, y: -50 },'-=0.2')
    .from(".eventRow", { opacity: 0, y: -50 },'-=0.2')
    .from(".apiRow", { opacity: 0, y: -50, })
  setTimeout(function () {
    $("#quoteElement").css("display", "none");
    $("#mainDashboard").css("display", "block");
  },1000);

}

// Click Event to submit form data.
$("#submitBtn").on("click", function (event) {
  if(!$("#userName").val() || !$("#zipCode").val()){
    $(".modal").addClass("is-active")}
  else{
    event.preventDefault();
    console.log(event);
    getQuote();
    setUserName();
    setUserZip();
    getWeather();
    switchDisplay();}
});

$(".modal-background").click(function(){$(".modal").removeClass("is-active")});

$(".modalBtn").click(function(){$(".modal").removeClass("is-active")});

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

var currentBackground;
var imageArray = [
  [
    "./assets/images/day_clear.jpg",
    "./assets/images/day_rain.jpg",
    "./assets/images/day_snow.jpg",
    "./assets/images/day_storms.jpg",
    "./assets/images/day_clouds.jpg",
  ],
  [
    "./assets/images/night_clear.jpg",
    "./assets/images/night_rain.jpg",
    "./assets/images/night_snow.jpg",
    "./assets/images/night_storms.jpg",
  ],
];
function localWeather() {
  var userZip = JSON.parse(localStorage.getItem("duz"));
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?zip=" +
    userZip +
    "&appid=b2cb9091c77c412d1dede93b0ba6839c";
  $.ajax({
    url: queryUrl,
    method: "Get",
  }).then(function (response) {
    var currentWeather = response.weather[0].main;
    console.log(currentWeather);
    var currentTime = moment().format("X");
    var currentSunrise = response.sys.sunrise;
    var currentSunset = response.sys.sunset;
    if (currentTime > currentSunrise && currentTime < currentSunset) {
      //daytime logic
      if (currentWeather === "Clouds") {
        currentBackground = imageArray[0][4];
      } else if (currentWeather === "Thunderstorm") {
        currentBackground = imageArray[0][3];
      } else if (currentWeather === "Rain") {
        currentBackground = imageArray[0][1];
      } else if (currentWeather === "Snow") {
        currentBackground = imageArray[0][2];
      } else {
        currentBackground = imageArray[0][0];
      }
    } else {
      //nighttime logic
      if (currentWeather === "Thunderstorm") {
        currentBackground = imageArray[1][3];
      } else if (currentWeather === "Rain") {
        currentBackground = imageArray[1][1];
      } else if (currentWeather === "Snow") {
        currentBackground = imageArray[1][2];
      } else {
        currentBackground = imageArray[1][0];
      }
    }
    $("body").css("background-image", "url(" + currentBackground + ")");
  });
}
localWeather();

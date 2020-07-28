$(document).ready(function () {
  var beer = "https://api.punkapi.com/v2/beers/random";
  $.ajax({
    url: beer,
    method: "GET",
  }).then(function (data) {
    console.log(data);
    console.log(data[0].name);
    console.log(data[0].tagline);
    console.log(data[0].description);
    console.log(data[0].image_url);
    $("#name").text(data[0].name).css({
      fontSize: " 20px",
      color: "black",
      fontWeight: "bold",
    });
    $("#description")
      .text("Description: " + data[0].description)
      .css({
        fontSize: "12px",
        color: "black",
      });
    $("#image").attr("src", data[0].image_url).height(100);
  });
});


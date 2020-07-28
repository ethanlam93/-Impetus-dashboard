// gets current date and day and then creates elements in html if
var currentDate = moment().format("MM-DD-YY");
var currentDOW = moment().format("dddd");
for (var j = 0; j < 7; j++) {
  $("#" + j).empty();
  var displayDOW = moment().add(j, "day").format("dddd");
  var displayDate = moment().add(j, "day").format("MM-DD-YY");
  var dayEl = $("<h3>");
  dayEl.addClass("day is-size-4 has-text-weight-bold").text(displayDOW);
  var dateEl = $("<h4>");
  dateEl.addClass("date is-size-5 has-text-weight-bold").text(displayDate);
  $("#" + j).append(dayEl, dateEl);
}

setInterval(function () {
  $("#dateDisplay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));
}, 1000);

gsap.from(".firstPage", {opacity:0, duration: 2.7, y:-50, ease: "sine.in"})

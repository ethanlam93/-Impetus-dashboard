// API Key for Google Books AIzaSyCGDQmqkLhwEgc5Zav3Uezlzh1qXFBdbuA

var searchTerm = "self help";
$.ajax({
  url:
    "https://www.googleapis.com/books/v1/volumes?q=subject:" +
    searchTerm +
    "&download=epub&key=AIzaSyCGDQmqkLhwEgc5Zav3Uezlzh1qXFBdbuA",
  method: "GET",
}).then(function (response) {
  randNum = Math.floor(Math.random() * 10);
  console.log(response);
  console.log(response.items[randNum].volumeInfo.title);
  $("#bookTitle").text(response.items[randNum].volumeInfo.title);
  $("#bookCover").attr(
    "src",
    response.items[randNum].volumeInfo.imageLinks.thumbnail
  );
  $("#bookLink").attr(
    "href",
    response.items[randNum].volumeInfo.canonicalVolumeLink
  );
});

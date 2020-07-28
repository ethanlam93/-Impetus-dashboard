var searchTerm = localStorage.getItem("bookSearch");
if (searchTerm === null) {
  searchTerm = "positivity";
}
// Click handler for book search submit button

$(document).on("click", "#bookSearchSubmit", function () {
  var inputField = $("#bookSearchbar").val();
  searchTerm = inputField;
  localStorage.setItem("bookSearch", searchTerm);
  gsap.fromTo(
    "#bookCover",
    { autoAlpha: 1 },
    { autoAlpha: 0, duration: 1, x: 100, onComplete: getBook }
  );
});

// Function for making ajax call and displaying book info

function getBook() {
  $.ajax({
    url:
      "https://www.googleapis.com/books/v1/volumes?q=" +
      searchTerm +
      "&langRestrict=en&download=epub&key=AIzaSyCGDQmqkLhwEgc5Zav3Uezlzh1qXFBdbuA",
    method: "GET",
  }).then(function (response) {
    randNum = Math.floor(Math.random() * 10);
    $("#bookTitle").text(response.items[randNum].volumeInfo.title);
    gsap.fromTo("#bookTitle", { autoAlpha: 0 }, { autoAlpha: 1, duration: 3 });
    $("#bookCover").attr(
      "src",
      response.items[randNum].volumeInfo.imageLinks.thumbnail
    );
    $("#bookLink").attr(
      "href",
      response.items[randNum].volumeInfo.canonicalVolumeLink
    );
  });
  gsap.fromTo(
    "#bookCover",
    { autoAlpha: 0, x: -100 },
    { autoAlpha: 1, duration: 1, x: 0 }
  );
}
getBook();

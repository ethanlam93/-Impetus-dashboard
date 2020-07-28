function giveMeme() {
  $.ajax({
    url: "https://meme-api.herokuapp.com/gimme",
    method: "GET",
  }).then(function (response) {
    $("#meme").attr({
      src: response.url,
      width: 400,
      heigh: 400,
    });
    gsap.fromTo(
      "#meme",
      { autoAlpha: 0, x: -100 },
      { autoAlpha: 1, duration: 2, x: 0 }
    );
  });
}
giveMeme();

$("#giveMeMore").click(function () {
  gsap.fromTo(
    "#meme",
    { autoAlpha: 1 },
    { autoAlpha: 0, duration: 2, x: 100, onComplete: giveMeme }
  );
});

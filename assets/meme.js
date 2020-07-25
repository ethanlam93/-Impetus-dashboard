


function giveMeme() {
$.ajax({
    url: "https://meme-api.herokuapp.com/gimme",
    method: "GET"
}).then(function(response){
    $("#meme").attr({
        "src" :response.url,
        "width" : 400,
        "heigh": 400,
    })
})}
giveMeme()

$("#giveMeMore").click(giveMeme)
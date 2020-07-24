



$.ajax({
    url: "https://meme-api.herokuapp.com/gimme",
    method: "GET"
}).then(function(response){
    $("#meme").attr({
        "src" :response.url,
        "width" : 100,
        "heigh": 100,
    })
})

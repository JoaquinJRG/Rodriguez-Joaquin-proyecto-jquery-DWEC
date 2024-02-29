
//Variables
const APIKEY = "live_UvqIX8Gi0IMK58RK5YRAwMnVLleLHYeyPt7PeHvk9iuo2M9Cec9f6kJti7GoYb4A";
const CAT_FACT = "https://catfact.ninja/fact";
const params = new URLSearchParams(window.location.search);
const breedId = params.get("breed"); 
const API_CAT = `https://api.thecatapi.com/v1/images/search?&breed_ids=${breedId}&api_key=${APIKEY}`; 

$(() => {

    //Añadir iconos
    feather.replace();

    //Añadir dato random 
    addRandomFact(); 

    //Añadir datos
    $.get(API_CAT)
    .done((res) => {
        console.log(res); 
        $("#breedName").html(res[0].breeds[0].name); 
        $("#breed").html(res[0].breeds[0].name)
        $("#images").html(`<img src='${res[0].url}' class='w-80 h-auto'/>`); 
        $("#description").append(`<p>${res[0].breeds[0].description}</p>`); 
        $("#temperament").append(`<p>${res[0].breeds[0].temperament}</p>`);
        $("#origin").append(`<p>${res[0].breeds[0].origin}</p>`);
    })
    .fail(() => {
      console.log("error");
    });


})


function addRandomFact() {
    $.get(CAT_FACT)
    .done((res) => {
        $("#fact").html(res.fact); 
    })
    .fail(() => {
      console.log("error")
    });
}
//Variables
let page = 0; 
const URL_CAT_BREEDS = "https://catfact.ninja/breeds";
const APIKEY = "live_UvqIX8Gi0IMK58RK5YRAwMnVLleLHYeyPt7PeHvk9iuo2M9Cec9f6kJti7GoYb4A";
const CATAPI = `https://api.thecatapi.com/v1/images/search?limit=10&page=0&has_breeds=1&api_key=${APIKEY}`;

$(() => {
  $("#btnMostrar").on("click", () => {

    $.get(CATAPI, function (respuesta, estado, xmlh) {

      if (estado == "success") {
        $("#lista").html(""); 
        respuesta.forEach(obj => {
          $("#lista").append(`
            <li class="flex flex-row p-5 bg-white border-2 border-purple-400 rounded-md">
              <img class="w-40 h-auto" src="${obj.url}">
              <p>${obj.id}</p>
            </li>
          `); 
        });

      } else {
        console.log("error"); 
      }

    });
    
  }); 
});



/*
function mostrartabla() {}
function cargarMasDatos() {}
*/
/*
$(() => {
  $("#btn").on("click", () => {
    $.get(URL_CAT_BREEDS, function (respuesta, estado, xmlh) {
      console.log(respuesta.data);
    });
  });

  $("#btn2").on("click", () => {
    $.get(CATAPI, function (respuesta, estado, xmlh) {
      console.log(respuesta);
    });
  });
});
*/

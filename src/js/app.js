//Constantes
const URL_CAT_BREEDS = "https://catfact.ninja/breeds";
const APIKEY =
  "live_UvqIX8Gi0IMK58RK5YRAwMnVLleLHYeyPt7PeHvk9iuo2M9Cec9f6kJti7GoYb4A";
const CATAPI = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=${APIKEY}`;

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

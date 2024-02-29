//Variables
let page = 0;
let likeCount = 0;
let disLikeCount = 0;
let favoriteCount = 0;
let isLoading = false;
let order = "ASC";
let layout = "list";

const APIKEY = "live_UvqIX8Gi0IMK58RK5YRAwMnVLleLHYeyPt7PeHvk9iuo2M9Cec9f6kJti7GoYb4A";

$(() => {

  //Cargar datos al inicio
  loadData();

  //Evento ordenar
  $("#order").on("change", () => {
    order = $("#order").val();
    loadData();
  });

  //Elegir layout
  $("#listLayout").on("click", () => {
    layout = "list"; 
    loadData();
  });

  $("#tableLayout").on("click", () => {
    layout = "table";
    loadData(); 
  });


  //Evento Scroll infinito 
  $(window).on("scroll", () => {
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
      loadMoreData();
    }
  });


  //Evento click like
  $("#data-container").on("click", "[name='like']", function () {

    if ($(this).hasClass("liked")) {
      likeCount--;
      $("#likeCounter").html(likeCount);
      $(this).toggleClass("liked");
    } else {
      likeCount++;
      $("#likeCounter").html(likeCount);
      $(this).toggleClass("liked");
    }

  });

  //Evento click dislike
  $("#data-container").on("click", "[name='dislike']", function () {

    if ($(this).hasClass("disliked")) {
      disLikeCount--;
      $("#dislikeCounter").html(disLikeCount);
      $(this).toggleClass("disliked");
    } else {
      disLikeCount++;
      $("#dislikeCounter").html(disLikeCount);
      $(this).toggleClass("disliked");
    }

  });

  //Evento click favorite
  $("#data-container").on("click", "[name='favorite']", function () {

    if ($(this).hasClass("favorite")) {
      favoriteCount--;
      $("#favoriteCounter").html(favoriteCount);
      $(this).toggleClass("favorite");
    } else {
      favoriteCount++;
      $("#favoriteCounter").html(favoriteCount);
      $(this).toggleClass("favorite");
    }

  });

});

function loadData() {

  page = 0; 

  $.get(`https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&order=${order}&page=${page}&api_key=${APIKEY}`)
    .done((res) => {

      //Eliminar elementos de la lista
      $("#list").html("");
      $("#table").html(""); 

      //Mostrar datos
      if (layout == "list") {
        showDataList(res); 
      } else {
        showDataTable(res); 
      }

    })
    .fail(() => {
      console.log("error")
    });
}


function loadMoreData() {

  //Next page
  page++;

  if (!isLoading) {
    isLoading = true;

    $.get(`https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&order=${order}&page=${page}&api_key=${APIKEY}`)
      .done((res) => {
        
        if (layout == "list") {
          showDataList(res); 
        } else {
          showDataTable(res); 
        }

      })
      .fail(() => {
        console.error("error al cargar elementos");
      })
      .always(() => {
        isLoading = false;
      });
  }
}


function showDataList(res) {

  //Crear elementos de la lista 
  res.forEach(obj => {

    $("#list").append(`
          <li class="flex flex-col gap-3 p-5 bg-white rounded-md shadow-md m-2">
            <img class="w-80 h-auto" src="${obj.url}">
            <div class='flex items-center justify-between'>
              <p>Raza: ${obj.breeds[0].name}</p>
              <a href='datos.html?breed=${obj.breeds[0].id}' class='rounded-md p-1 text-white bg-black hover:scale-110 transition cursor-pointer' >
                Datos
              </a>
            </div>
            <div class="flex gap-2 items-center justify-center">
              <button  name="like">
                <i data-feather="thumbs-up" class="cursor-pointer hover:scale-110 "></i>
              </button>
              <button name="dislike">
                <i data-feather="thumbs-down" class="cursor-pointer hover:scale-110"></i>
              </button>
              <button name="favorite">
                <i data-feather="star" class="cursor-pointer hover:scale-110 "></i>
              </button>
            </div>
          </li>
        `);

  });

  //Añadir iconos
  feather.replace();
}


function showDataTable(res) {

  res.forEach(obj => {
    $("#table").append(
      `<div class="flex flex-col gap-3 p-5 bg-white rounded-md shadow-md m-2">
        <img class="w-80 h-auto" src="${obj.url}">
        <div class='flex items-center justify-between'>
          <p>Raza: ${obj.breeds[0].name}</p>
          <a href='datos.html?breed=${obj.breeds[0].name}' class=' rounded-md p-1 text-white bg-black hover:scale-110 transition cursor-pointer' >
            Datos
          </a>
        </div>
        <div class="flex gap-2 items-center justify-center">
          <button name="like">
            <i data-feather="thumbs-up" class="cursor-pointer hover:scale-110 "></i>
          </button>
          <button name="dislike">
            <i data-feather="thumbs-down" class="cursor-pointer hover:scale-110"></i>
          </button>
          <button name="favorite">
            <i data-feather="star" class="cursor-pointer hover:scale-110 "></i>
          </button>
        </div>
      </div>`
    );
  });

  //Añadir iconos
  feather.replace();

}


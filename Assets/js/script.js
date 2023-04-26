// 1e0d39e436290f026426eeaa2621c35a   - APIKEY
var searchInput = document.querySelector(".form-input");
var searchButton = document.querySelector(".searchButton");
var weatherList = document.querySelector(".listGroup");

var cityTitle = document.querySelector(".subtitle");
var listItem1 = document.querySelector(".listItem1");
var listItem2 = document.querySelector(".listItem2");
var listItem3 = document.querySelector(".listItem3");

var buttonSection = document.querySelector(".buttonSection");

var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = searchInput.value.trim();
  
  if (city) {
    getAPI(city);

    weatherList.textContent = '';
    searchInput.value = '';
  } else {
    alert('Please enter a city');
  }
};


function getAPI(city) {
    var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=1e0d39e436290f026426eeaa2621c35a';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var date = data.list[0].dt_txt;
        console.log(data);
        // console.log(data.city.name);
        cityTitle.textContent = (data.city.name);
        listItem1.textContent = ("Temp: " + data.list[0].main.temp);
        listItem2.textContent = ("wind: " + data.list[0].main.humidity);
        listItem3.textContent = ("humidity: " + data.list[1].wind.speed + "mph");
        localStorage.setItem(city, JSON.stringify(data.city.name));
        buttonSection.replaceChildren();
        generateButtons();
    });
}

function generateButtons(){
  for (var i = 0; i < localStorage.length; i++){
    //figure out how to add buttons for each item in local storage. then add event listener calling tis funcion that will be called generate history
    const btn = document.createElement("BUTTON");
    btn.setAttribute("class", "historyButtons btn btn-primary col-12 mb-2");
    btn.innerHTML = localStorage.getItem(localStorage.key(i));
    buttonSection.appendChild(btn);
  }
}

generateButtons();
searchButton.addEventListener('click', formSubmitHandler);

var historyButtons = document.querySelector(".historyButtons")
console.log(historyButtons);
// for (var i = 0; i < )

// document.addEventListener("click", function(e){
//   const target = e.target.closest(".historyButtons"); // Or any other selector.

//   if(target){
//     console.log(target.val());
//   }
// });

$(".historybuttons").click(function() {
  var fired_button = $(this).val();
  alert(fired_button);
});

// 1e0d39e436290f026426eeaa2621c35a   - APIKEY

// query selections for all sections and buttons
var searchInput = document.querySelector(".form-input");
var searchButton = document.querySelector(".searchButton");
var weatherList = document.querySelector(".listGroup");

var cityTitle = document.querySelector(".subtitle");
var listItem1 = document.querySelector(".listItem1");
var listItem2 = document.querySelector(".listItem2");
var listItem3 = document.querySelector(".listItem3");
var listItem4 = document.querySelector(".listItem4");

var buttonSection = document.querySelector(".buttonSection");
var historyButtons = document.querySelector(".historyButtons");


// this function takes users input and calls an getAPI function with users input as perameter 
var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = searchInput.value.trim();

// if a city was provided call the api then clears search box
  if (city) {
    getAPI(city);
    weatherList.textContent = '';
    searchInput.value = '';
  } else {
    alert('Please enter a city');
  }
};

//this function is used to fetch api and do some following operations
function getAPI(city) {
    var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=1e0d39e436290f026426eeaa2621c35a';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var date = data.list[0].dt_txt;
        var city = JSON.stringify(data.city.name);
        city.charAt(0).toUpperCase(); 
        console.log(data);

        //sets text content for todays weather section and stores in local storage for history retrieval, also calls generate button for each item in local storage 
        cityTitle.textContent = (data.city.name);
        listItem1.textContent = ("Temp: " + data.list[0].main.temp + "\u00B0" + "F" + data.list[0].weather[0].icon);
        listItem2.textContent = ("Wind: " + data.list[1].wind.speed + " mph");
        listItem3.textContent = ("humidity: " + data.list[0].main.humidity + "%");
        localStorage.setItem(city, city);
        buttonSection.replaceChildren();
        generateButtons();
    });
}

//this function creates a button element for each item in local storage and sets button text to the city stored.
function generateButtons(){
  for (var i = 0; i < localStorage.length; i++){
    //figure out how to add buttons for each item in local storage. then add event listener calling tis funcion that will be called generate history
    const btn = document.createElement("BUTTON");
    btn.setAttribute("class", "historyButtons btn btn-primary col-12 mb-2");
    btn.innerHTML = JSON.parse(localStorage.getItem(localStorage.key(i)));
    buttonSection.appendChild(btn);
  }
}

//generates history buttons upon page startup
generateButtons();
searchButton.addEventListener('click', formSubmitHandler);

// this function ties an api call to each city history button 
$(".buttonSection").click(function(event) {
  // checks if anything in the container is clicked other than a button. If not button do nothing else call api
  if (event.target.classList.contains('buttonSection')){
    return;
  }
  else {
  var city = event.target.textContent;
  if (city) {
    getAPI(city);
    weatherList.textContent = '';
    searchInput.value = '';
  }}
});


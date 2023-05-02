// query selections for all sections and buttons
var todaysWeather = document.querySelector(".mainStats");
var weatherSection = document.querySelector(".weatherWindowSection")

var cityTitle = document.querySelector(".subtitle");
var listItem1 = document.querySelector(".listItem1");
var listItem2 = document.querySelector(".listItem2");
var listItem3 = document.querySelector(".listItem3");
var iconImg   = document.querySelector(".iconImg");

var searchInput  = document.querySelector(".form-input");
var searchButton = document.querySelector(".searchButton");

var buttonSection  = document.querySelector(".buttonSection");
var historyButtons = document.querySelector(".historyButtons");

//weather windows query selectors
//could combine temp,wind,and humidity to one stats <p> tag to simplify query selectors(future task)
var card1Title = document.querySelector(".card1-title");
var card1Temp = document.querySelector(".card1-temp");
var card1Wind = document.querySelector(".card1-wind");
var card1Humidity = document.querySelector(".card1-humidity");
var card1Icon = document.querySelector(".card1Icon");

var card2Title = document.querySelector(".card2-title");
var card2Temp = document.querySelector(".card2-temp");
var card2Wind = document.querySelector(".card2-wind");
var card2Humidity = document.querySelector(".card2-humidity");
var card2Icon = document.querySelector(".card2Icon");

var card3Title = document.querySelector(".card3-title");
var card3Temp = document.querySelector(".card3-temp");
var card3Wind = document.querySelector(".card3-wind");
var card3Humidity = document.querySelector(".card3-humidity");
var card3Icon = document.querySelector(".card3Icon");

var card4Title = document.querySelector(".card4-title");
var card4Temp = document.querySelector(".card4-temp");
var card4Wind = document.querySelector(".card4-wind");
var card4Humidity = document.querySelector(".card4-humidity");
var card4Icon = document.querySelector(".card4Icon");

var card5Title = document.querySelector(".card5-title");
var card5Temp = document.querySelector(".card5-temp");
var card5Wind = document.querySelector(".card5-wind");
var card5Humidity = document.querySelector(".card5-humidity");
var card5Icon = document.querySelector(".card5Icon");

// this function takes users input and calls an getAPI function with users input as perameter 
var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = searchInput.value.trim();

// if a city was provided call the api then clears search box
  if (city) {
    getAPI(city);
    searchInput.value = city;
  } else {
    alert('Please enter a city');
  }
};

//this function is used to fetch api and do some following operations
function getAPI(city) {
    var requestUrl = ('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=1e0d39e436290f026426eeaa2621c35a');
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var date = data.list[0].dt_txt.slice(0, -9);
        
        var city = JSON.stringify(data.city.name);
        var generatedSrc = ('https://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png');

        iconImg.src = generatedSrc;

        city.charAt(0).toUpperCase(); 
        console.log(data);

        //sets text content for todays weather section and stores in local storage for history retrieval, also calls generate button for each item in local storage 
        cityTitle.textContent = (data.city.name + " " + "(" + date + ")");
        card1Icon.src = ('https://openweathermap.org/img/w/' + data.list[1].weather[0].icon + '.png');
        listItem1.textContent = ("Temp: " + data.list[0].main.temp + "\u00B0" + "F");
        listItem2.textContent = ("Wind: " + data.list[0].wind.speed + " mph");
        listItem3.textContent = ("humidity: " + data.list[0].main.humidity + "%");

        // sets all stats for the next 5 weather windows
        card1Title.textContent = (data.list[1].dt_txt.slice(0, -9));
        card2Icon.src = ('https://openweathermap.org/img/w/' + data.list[1].weather[0].icon + '.png');
        card1Temp.textContent = ("Temp: " + data.list[1].main.temp + "\u00B0" + "F");
        card1Wind.textContent = ("Wind: " + data.list[1].wind.speed + " mph");
        card1Humidity.textContent = ("humidity: " + data.list[1].main.humidity + "%");

        card2Title.textContent = (data.list[9].dt_txt.slice(0, -9));
        card1Icon.src = ('https://openweathermap.org/img/w/' + data.list[9].weather[0].icon + '.png');
        card2Temp.textContent = ("Temp: " + data.list[9].main.temp + "\u00B0" + "F");
        card2Wind.textContent = ("Wind: " + data.list[9].wind.speed + " mph");
        card2Humidity.textContent = ("humidity: " + data.list[9].main.humidity + "%");

        card3Title.textContent = (data.list[17].dt_txt.slice(0, -9));
        card3Icon.src = ('https://openweathermap.org/img/w/' + data.list[17].weather[0].icon + '.png');
        card3Temp.textContent = ("Temp: " + data.list[17].main.temp + "\u00B0" + "F");
        card3Wind.textContent = ("Wind: " + data.list[17].wind.speed + " mph");
        card3Humidity.textContent = ("humidity: " + data.list[17].main.humidity + "%");

        card4Title.textContent = (data.list[25].dt_txt.slice(0, -9));
        card4Icon.src = ('https://openweathermap.org/img/w/' + data.list[25].weather[0].icon + '.png');
        card4Temp.textContent = ("Temp: " + data.list[25].main.temp + "\u00B0" + "F");
        card4Wind.textContent = ("Wind: " + data.list[25].wind.speed + " mph");
        card4Humidity.textContent = ("humidity: " + data.list[25].main.humidity + "%");

        card5Title.textContent = (data.list[33].dt_txt.slice(0, -9));
        card5Icon.src = ('https://openweathermap.org/img/w/' + data.list[33].weather[0].icon + '.png');
        card5Temp.textContent = ("Temp: " + data.list[33].main.temp + "\u00B0" + "F");
        card5Wind.textContent = ("Wind: " + data.list[33].wind.speed + " mph");
        card5Humidity.textContent = ("humidity: " + data.list[33].main.humidity + "%");

        // stores city search into local storage for retrieval
        // resets buttons to ensure history button adds once searched
        localStorage.setItem(city, city);
        buttonSection.replaceChildren();
        
        // sets weather windows to visable and generates all search history buttons
        weatherSection.style.visibility="visible";
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

//generates history buttons upon page startup and adds listener to search button
generateButtons();
searchButton.addEventListener('click', formSubmitHandler);

// this function ties an api call to each city history button 
$(".buttonSection").click(function(event) {
  // checks if anything in the container is clicked other than a button. If not button do nothing else call api
  if (event.target.classList.contains('buttonSection')){
    return;
  }
  else {
  // call api based on which search history button was clicked
  var city = event.target.textContent;
  if (city) {
    getAPI(city);
    searchInput.value = event.target.textContent;
  }}
});


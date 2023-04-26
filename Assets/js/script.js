// 1e0d39e436290f026426eeaa2621c35a   - APIKEY
var searchInput = document.querySelector(".form-input");
var searchButton = document.querySelector(".searchButton");
var weatherList = document.querySelector(".listGroup");

var cityTitle = document.querySelector(".subtitle");
var listItem1 = document.querySelector(".listItem1");
var listItem2 = document.querySelector(".listItem2");
var listItem3 = document.querySelector(".listItem3");


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

    // console.log(city);
    
    var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=1e0d39e436290f026426eeaa2621c35a';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log(data.city.name);
        cityTitle.textContent = data.city.name;
        listItem1.textContent = ("Temp: " + data.list[0].main.temp);
        listItem2.textContent = ("humidity: " + data.list[0].main.humidity);

    });
}

searchButton.addEventListener('click', formSubmitHandler);
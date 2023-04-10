
var APIKey = "854256a8ee62109d903e838391cff6d6";
var searchBtn = document.getElementById ("searchBtn");

var listOfCities =[];
 if(localStorage.getItem("history")){
  listOfCities= JSON.parse(localStorage.getItem("history"))
 }

function performSearch () {
  var inputValue = document.getElementById("cityToSearch").ariaValueMax.trim();
  listOfCities.push(inputValue)
  localStorage.setItem('history', JSON.stringify(listOfCities));
  weatherSearch(inputValue)
  forecastSearch(inputValue)
}

function weatherSearch(city) {
  var queryURL ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;
  fetch(queryURL)
}









searchHistory(),

//FIRST USER SEARCH//

("#citySearchbtn").on("click", function(event) {
  event.preventDefault();
  let citySearched = $("#citySearchText").val();
  $("#citySearchText").val("");
  getCurrentWeatherConditions(citySearched);
  getWeeklyForecast(citySearched);
});



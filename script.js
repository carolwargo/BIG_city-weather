
var APIKey = "854256a8ee62109d903e838391cff6d6";
var searchBtn = document.getElementById ("searchBtn");

var listOfCities =[];
 if(localStorage.getItem("history")){
  listOfCities= JSON.parse(localStorage.getItem("history"))
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



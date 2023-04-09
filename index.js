const FORECAST_API_KEY = '854256a8ee62109d903e838391cff6d6';
const GEO_API_KEY = '149c3e7d1f47798841a7a33c9b0f9dec';
searchHistory(),

//FIRST USER SEARCH//

("#citySearchbtn").on("click", function(event) {
  event.preventDefault();
  let citySearched = $("#citySearchText").val();
  $("#citySearchText").val("");
  getCurrentWeatherConditions(citySearched);
  getWeeklyForecast(citySearched);
});



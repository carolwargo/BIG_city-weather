// STORE input value
let city = $("#searchTerm").val();
// STORE API KEY 
const apiKey = "&appid=7ad91ac6ba800a72ceddff377184d9ed";


//DECLARE current date
let date = new Date();

//SEARCH event keypress
$("#searchTerm").keypress(function(event) { 
	
	if (event.keyCode === 13) { 
		event.preventDefault();
		$("#searchBtn").click(); 
	} 
});

//SEARCH event on click
$("#searchBtn").on("click", function() {
  $('#forecastH5').addClass('show');

  // GET input from user
  city = $("#searchTerm").val();

  localStorage.setItem("searchTerm", city);

  // CLEAR input box  
  $("#searchTerm").val("");  
  
  
  // CALL api
  const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

  $.ajax({
    url: queryUrl,
    method: "GET"
  })
  .then(function (response){
    
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    getCurrentConditions(response);
    getCurrentForecast(response);
    makeList(city);

    })
  });

  //ADD SEARCH to page
  function makeList(city) {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list-group").append(listItem);
  }

  function getCurrentConditions (response) {
    // GET & CONVERT temperature to fahrenheit 
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#currentCity').empty();

    // GET content 
    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("<h4>").addClass("card-title").text(response.name);
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // ADD to page
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card)
   
  }
  //GET current forecast by date
  function getCurrentForecast () {
    let date = new Date(); 
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
      method: "GET"
    }).then(function (response){
  
      $('#forecast').empty();
  
      // VAR HOLD RESPONSE
      let results = response.list;
  
      // DECLARE start/end date to check against
      let startDate = new Date();
      startDate.setDate(startDate.getDate() + 1);
      startDate.setHours(0,0,0,0);
  
      let endDate = new Date();
      endDate.setDate(startDate.getDate() + 5);
      endDate.setHours(0,0,0,0);
  
      for (let i = 0; i < results.length; i++) {
        let datetime = new Date(results[i].dt_txt);
        if(datetime >= startDate && datetime <= endDate && datetime.getHours() === 12) {
          //GET date format
          let day = datetime.toLocaleDateString('en-US', {weekday: 'short'});
          let date = datetime.toLocaleDateString('en-US', {month: 'numeric', day: 'numeric'});
          // GET the temperature and convert to Fahrenheit 
          let temp = (results[i].main.temp - 273.15) * 1.80 + 32;
          let tempF = Math.floor(temp);
  
          // DISPLAY forecast data
          const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
          const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
          const cityDate = $("<h4>").addClass("card-title").text(day + " " + date);
          const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
          const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");
          const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")
  
          // APPEND to forecast display
          cardBody.append(cityDate, image, temperature, humidity);
          card.append(cardBody);
          $("#forecast").append(card);
        }
      }
    });
  }
  
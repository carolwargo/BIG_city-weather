
 // INPUT VALUE
let city = $("#searchTerm").val();

// API KEY-IMPERIAL UNITS
const apiKey = "800d61ffcfdff2fe560ccf581209adaa";

// IMPORT DAY.JS
let date = dayjs(); 

// LOCAL STORAGE
let cities = JSON.parse(localStorage.getItem("cities")) || [];

// LIST SAVE CITIES
for (let i = 0; i < cities.length; i++) {
  let listItem = $("<li>").addClass("list-group-item").text(cities[i]);
  $(".list").append(listItem);
}

$("#searchBtn").on("click", function() {
  // UPDATE DATE .pn click
  date = dayjs().format("MMM DD, YYYY");
});

//CLICK ENTER TO SEARCH
$("#searchTerm").keypress(function(event) { 
  if (event.keyCode === 13) { 
    event.preventDefault();
    $("#searchBtn").click(); 
  } 
});
//CLICK SEARCH BUTTON TO SEARCH
$("#searchBtn").on("click", function() {
  $('#forecastH5').addClass('show');

  // USER INPUT VALUE
  city = $("#searchTerm").val();
  
  // CLEAR INPUT
  $("#searchTerm").val("");  

  // API CALL URL RETRIEVES WEATHER DATA
  const queryUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=57&lon=-2.15&appid=";
  $.ajax({
    url: queryUrl,
    method: "GET"
  })
  // PASS THROUGH .done arg
  .done(function (response) {
    console.log(response)
    console.log(response.name)
    console.log(response.weather[0].icon)
  
    console.log(response.main.humidity)
    console.log(response.main.temp)
    console.log(response.wind.speed)
  
    getCurrentConditions(response);
    getCurrentForecast(response);
    makeList();
  })
  //FAIL FUNCTION
  .fail(function (jqXHR, textStatus, errorThrown) {
    console.log("Error: " + textStatus + " - " + errorThrown);
    alert("Sorry, there was an error retrieving the weather information. Please try again later.");
  })
  .always(function () {
    console.log("API request completed.");
  });
  
});
// DISPLAY SEARCH HISTORY LIST 
function makeList() {
  let listItem = $("<li>").addClass("list-group-item").text(city);
  $(".list").append(listItem);
  cities.push(city); // ADD CITY TO ARRAY
  localStorage.setItem("cities", JSON.stringify(cities)); // STORE ARRAY IN LOCAL STORAGE
}

function getCurrentConditions (response) {
  $('#currentCity').empty();
// GET CONTENT
const card = $("<div>").addClass("card");
const cardBody = $("<div>").addClass("card-body");
const city = $("<h4>").addClass("card-title").text(response.name);
const cityDate = $("<h4>").addClass("card-title").text(date.format('MMM DD, YYYY'));
const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + response.main.temp + " °F");
const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
//WEATHER ICON
const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

  // ADD TO PAGE
  city.append(cityDate, image);
  cardBody.append(city, temperature, humidity, wind);
  card.append(cardBody);
  $("#currentCity").append(card);
}

 // DECLARE START, CHECK AGAINST END
function getCurrentForecast (response, city) {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate());
};

  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?lat=57&lon=-2.15&appid=",
    method: "GET"
  }).then(function (response){

    console.log(response)
    console.log(response.dt)

    // HTML #forecast ELEMENT EMPTIED
    $('#forecast').empty();

    // HOLD RESPONSE
    // LIST PROPERTY ASSIGNED TO RESULTS VARIABLE
    let results = response.list;
    console.log(results)

    // RESULTS ARRAY FOR LOOP 
    for (let i = 0; i < results.length; i++) {
    
    // RESULTS ARRAY SPLIT TO DAY & HOUR VARIABLES
      let day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
      let hour = results[i].dt_txt.split('-')[2].split(' ')[1];
      console.log(day);
      console.log(hour);
    
     //CODE EXECUTED IF... CREATING A NEW forecast <div> 
      if(results[i].dt_txt.indexOf("12:00:00") !== -1){
L      
        const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
        const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
        const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
        const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + results[i].main.temp + " °F");
        const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");
        //WEATHER ICON
        const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")
      
        // ADD DATE, TEMP & HUMIDITY
        cardBody.append(cityDate, image, temperature, humidity);
        card.append(cardBody);
        $("#forecast").append(card);

      }
    }
  });



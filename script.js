//STORE INPUT VALS
let city = $("#searchTerm").val();
//API KEY
var APIKey = "854256a8ee62109d903e838391cff6d6";
//SEARCH BUTTON
var searchBtn = document.getElementById ("searchBtn");

let date= new Date();

$("searchTerm").keypress(function(event){
  if (event.keyCode ===13) {
    event.preventDefault();
    $("searchBtn").click();
  }
});

$("#searchBtn").on("click", function() {
  $('#foreast5').addClass('show');

  //GET USER INPUT VAL
  city= $("#seachTerm").val();

  //RESET
  $("searchTerm").val("");

})
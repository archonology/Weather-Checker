var APIKey = "b5794a08ba88b4d36fef7769417b2041";
var displayCity = $("#displayCity");
var temp = $("#temp");
var wind = $("#wind");
var humidity = $("#humidity");
var conditions = $("#conditions");
var weatherIcon = $("#weatherIcon");
var forcast1 = $("#forecast1");
var forcast2 = $("#forecast2");
var forcast3 = $("#forecast3");
var forcast4 = $("#forecast4");
var forcast5 = $("#forecast5");
var citySearchInputEl = document.querySelector("#city-search-input");
var cityHistoryBtns = document.querySelector("#city-history");
var featuredCityCard = document.querySelector("#featuredCityCard");
var userFormEl = document.querySelector("#user-form");
// var conditionsURL = "https://openweathermap.org/img/wn/" + cityCond + "@2x.png"

var searchHistory = [];

//handle the form
var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityWeather = citySearchInputEl.value.trim();
  console.log(cityWeather);
  //variable for the API
  var queryURL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    cityWeather +
    "&cnt=6&appid=" +
    APIKey +
    //imperial units sets to degrees F and MPH
    "&units=imperial";

  //upcoming days via moment.js
  $("#forecast1").text(moment().add(1, "day").format("MM/DD/YYYY"));
  $("#forecast2").text(moment().add(2, "day").format("MM/DD/YYYY"));
  $("#forecast3").text(moment().add(3, "day").format("MM/DD/YYYY"));
  $("#forecast4").text(moment().add(4, "day").format("MM/DD/YYYY"));
  $("#forecast5").text(moment().add(5, "day").format("MM/DD/YYYY"));

  if (cityWeather) {
    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            console.log(data.list[0].weather[0].icon);
            //apply data to the current weather card
            displayCity.text(data.city.name);
            temp.text("Current Temp: " + data.list[0].main.temp + " F");
            wind.text("Wind: " + data.list[0].wind.speed + " mph");
            humidity.text("Humidity: " + data.list[0].main.humidity + " %");
            conditions.text(
              "Conditions: " + data.list[0].weather[0].description
            );

            //apply data to the forecast cards
            $("#image1").html(
              "<img src='https://openweathermap.org/img/wn/" +
                data.list[1].weather[0].icon +
                "@2x.png'>"
            );
            $("#forecast1").text(data.list[1].timezone);
            $("#forTemp1").text("Temp: " + data.list[1].main.temp);
            $("#forWind1").text("Wind: " + data.list[1].wind.speed + " mph");
            $("#forHumid1").text(
              "Humidity: " + data.list[1].main.humidity + " %"
            );

            $("#image2").html(
              "<img src='https://openweathermap.org/img/wn/" +
                data.list[2].weather[0].icon +
                "@2x.png'>"
            );
            $("#forTemp2").text("Temp: " + data.list[2].main.temp);
            $("#forWind2").text("Wind: " + data.list[2].wind.speed + " mph");
            $("#forHumid2").text(
              "Humidity: " + data.list[2].main.humidity + " %"
            );

            $("#image3").html(
              "<img src='https://openweathermap.org/img/wn/" +
                data.list[3].weather[0].icon +
                "@2x.png'>"
            );
            $("#forTemp3").text("Temp: " + data.list[3].main.temp);
            $("#forWind3").text("Wind: " + data.list[3].wind.speed + " mph");
            $("#forHumid3").text(
              "Humidity: " + data.list[3].main.humidity + " %"
            );

            $("#image4").html(
              "<img src='https://openweathermap.org/img/wn/" +
                data.list[4].weather[0].icon +
                "@2x.png'>"
            );
            $("#forTemp4").text("Temp: " + data.list[4].main.temp);
            $("#forWind4").text("Wind: " + data.list[4].wind.speed + " mph");
            $("#forHumid4").text(
              "Humidity: " + data.list[4].main.humidity + " %"
            );

            $("#image5").html(
              "<img src='https://openweathermap.org/img/wn/" +
                data.list[5].weather[0].icon +
                "@2x.png'>"
            );
            $("#forTemp5").text("Temp: " + data.list[5].main.temp);
            $("#forWind5").text("Wind: " + data.list[5].wind.speed + " mph");
            $("#forHumid5").text(
              "Humidity: " + data.list[5].main.humidity + " %"
            );

            localStorage.setItem("city", cityWeather);
            renderSearchHistory();
            //add new city to the city array, clear the input
            searchHistory.push(cityWeather);
            cityWeather.val = "";

            //store updates and re-render the list
            storedCities();
            renderSearchHistory();
          });
        } else {
          alert(
            "Error: check spelling or input format(City name only or City, State initials, USA)"
          );
        }
      })
      .catch(function (error) {
        alert("Unable to connect to OpenWeatherMap");
      });
  }
};
//to create the buttons for past city searches
function renderSearchHistory() {
  //render a new line for each search
  for (var i = 0; i < searchHistory.length; i++) {
    var city = searchHistory[i];
    console.log(searchHistory);
    var btn = document.createElement("p");
    // btn.type = "submit";
    btn.innerHTML = city;
    btn.className = "resultCity";
    btn.id = "resultCity";
    //where to put the buttons
    var container = document.getElementById("user-form");
    container.appendChild(btn);
    btn.setAttribute("data-index", i);
  }
}

function init() {
  //get stored cities from localStorage
  var storedCities = JSON.parse(localStorage.getItem("city"));

  // if cities were retrieved from storage, update the cities to the array
  if (storedCities !== null) {
    searchHistory = storedCities;
  }

  //then use render to get the cities to the DOM
  renderSearchHistory();
}

function storedCities() {
  //stringify and set ket in local storage array
  localStorage.setItem("city", JSON.stringify(searchHistory));
}

//gets the click for the submit button
userFormEl.addEventListener("submit", formSubmitHandler);
//calls init to retriev data and render it to teh page on load
init();

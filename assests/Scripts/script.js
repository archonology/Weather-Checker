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

var searchHistory = [];

//handle the form
var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityWeather = citySearchInputEl.value.trim();
  //variable for the API
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityWeather +
    "&cnt=6&appid=" +
    APIKey +
    //imperial units sets to degrees F and MPH
    "&units=imperial";

  //upcoming days via moment.js
  for(var index = 1; index < 6; index++){
    $(`#forecast${index}`).text(moment().add(index, "day").format("M/DD/YYYY"));
  }

  if (cityWeather) {
    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {

            //apply data to the current weather card -- utilizing jquery form and standard
            displayCity.text(data.city.name + "(" + (moment().format("M/DD/YYYY")) + ")");
            temp.text("Current Temp: " + data.list[0].main.temp + " °F");
            wind.text("Wind: " + data.list[0].wind.speed + " mph");
            humidity.text("Humidity: " + data.list[0].main.humidity + "%");
            conditions.text(
              "Conditions: " + data.list[0].weather[0].description
            );
            $("#featuredImage").html(
                "<img src='https://openweathermap.org/img/wn/" +
                  data.list[0].weather[0].icon +
                  "@2x.png'>"
              );

            //apply data to the forecast cards
            $("#image1").html(
              "<img src='https://openweathermap.org/img/wn/" +
                data.list[1].weather[0].icon +
                "@2x.png'>"
            );
            $("#forecast1").text(data.list[1].timezone);
            $("#forTemp1").text(`Temp:${data.list[1].main.temp}`+ " °F");
            $("#forWind1").text("Wind: " + data.list[1].wind.speed + " mph");
            $("#forHumid1").text(
              "Humidity: " + data.list[1].main.humidity + "%"
            );

            $("#image2").html(
              "<img src='https://openweathermap.org/img/wn/" +
                data.list[2].weather[0].icon +
                "@2x.png'>"
            );
            $("#forTemp2").text("Temp: " + data.list[2].main.temp + " °F");
            $("#forWind2").text("Wind: " + data.list[2].wind.speed + " mph");
            $("#forHumid2").text(
              "Humidity: " + data.list[2].main.humidity + "%"
            );

            $("#image3").html(
              "<img src='https://openweathermap.org/img/wn/" +
                data.list[3].weather[0].icon +
                "@2x.png'>"
            );
            $("#forTemp3").text("Temp: " + data.list[3].main.temp + " °F");
            $("#forWind3").text("Wind: " + data.list[3].wind.speed + " mph");
            $("#forHumid3").text(
              "Humidity: " + data.list[3].main.humidity + "%"
            );

            $("#image4").html(
              "<img src='https://openweathermap.org/img/wn/" +
                data.list[4].weather[0].icon +
                "@2x.png'>"
            );
            $("#forTemp4").text("Temp: " + data.list[4].main.temp + " °F");
            $("#forWind4").text("Wind: " + data.list[4].wind.speed + " mph");
            $("#forHumid4").text(
              "Humidity: " + data.list[4].main.humidity + "%"
            );

            $("#image5").html(
              "<img src='https://openweathermap.org/img/wn/" +
                data.list[5].weather[0].icon +
                "@2x.png'>"
            );
            $("#forTemp5").text("Temp: " + data.list[5].main.temp + " °F");
            $("#forWind5").text("Wind: " + data.list[5].wind.speed + " mph");
            $("#forHumid5").text(
              "Humidity: " + data.list[5].main.humidity + "%"
            );
    
            localStorage.setItem("city", cityWeather);
            //add new city to the city array
            searchHistory.unshift(cityWeather);
            

            //store updates 
            storedCities();
            addNewCityButton();
          });
        } else {
          alert(
            "Error: check spelling or input format: \n City name ONLY or City, State, USA"
          );
        }
      })
      .catch(function (error) {
        alert("Unable to connect to OpenWeatherMap");
      });
  }
};

function addNewCityButton() {
  var city = searchHistory[0];
  var lastCity = document.createElement("p");
  lastCity.innerHTML = city;
  lastCity.className = "resultCity";
  lastCity.id = "resultCity";

    //where the history goes in the html
    var container = document.getElementById("searchCities");
    container.appendChild(lastCity);

  //set up the click event
  lastCity.onclick = function(event){
    //get the city info for the history buttons
    city = event.target.textContent;
    
  //now do the fetch for each search history on the click
          var historyURL =
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&cnt=6&appid=" +
          APIKey +
          //imperial units sets to degrees F and MPH
          "&units=imperial";

        //upcoming days via moment.js
        for(var index = 1; index < 6; index++){
          $(`#forecast${index}`).text(moment().add(index, "day").format("M/DD/YYYY"));
        }
      
        if (city) {
          fetch(historyURL)
            .then(function (response) {
              if (response.ok) {
                response.json().then(function (data) {
      
                  //apply data to the current weather card
                  displayCity.text(data.city.name + "(" + (moment().format("M/DD/YYYY")) + ")");
                  temp.text("Current Temp: " + data.list[0].main.temp + " °F");
                  wind.text("Wind: " + data.list[0].wind.speed + " mph");
                  humidity.text("Humidity: " + data.list[0].main.humidity + "%");
                  conditions.text(
                    "Conditions: " + data.list[0].weather[0].description
                  );
                  $("#featuredImage").html(
                      "<img src='https://openweathermap.org/img/wn/" +
                        data.list[0].weather[0].icon +
                        "@2x.png'>"
                    );
      
                  //apply data to the forecast cards
                  $("#image1").html(
                    "<img src='https://openweathermap.org/img/wn/" +
                      data.list[1].weather[0].icon +
                      "@2x.png'>"
                  );
                  $("#forecast1").text(data.list[1].timezone);
                  $("#forTemp1").text("Temp: " + data.list[1].main.temp + " °F");
                  $("#forWind1").text("Wind: " + data.list[1].wind.speed + " mph");
                  $("#forHumid1").text(
                    "Humidity: " + data.list[1].main.humidity + "%"
                  );
      
                  $("#image2").html(
                    "<img src='https://openweathermap.org/img/wn/" +
                      data.list[2].weather[0].icon +
                      "@2x.png'>"
                  );
                  $("#forTemp2").text("Temp: " + data.list[2].main.temp + " °F");
                  $("#forWind2").text("Wind: " + data.list[2].wind.speed + " mph");
                  $("#forHumid2").text(
                    "Humidity: " + data.list[2].main.humidity + "%"
                  );
      
                  $("#image3").html(
                    "<img src='https://openweathermap.org/img/wn/" +
                      data.list[3].weather[0].icon +
                      "@2x.png'>"
                  );
                  $("#forTemp3").text("Temp: " + data.list[3].main.temp + " °F");
                  $("#forWind3").text("Wind: " + data.list[3].wind.speed + " mph");
                  $("#forHumid3").text(
                    "Humidity: " + data.list[3].main.humidity + "%"
                  );
      
                  $("#image4").html(
                    "<img src='https://openweathermap.org/img/wn/" +
                      data.list[4].weather[0].icon +
                      "@2x.png'>"
                  );
                  $("#forTemp4").text("Temp: " + data.list[4].main.temp + " °F");
                  $("#forWind4").text("Wind: " + data.list[4].wind.speed + " mph");
                  $("#forHumid4").text(
                    "Humidity: " + data.list[4].main.humidity + "%"
                  );
      
                  $("#image5").html(
                    "<img src='https://openweathermap.org/img/wn/" +
                      data.list[5].weather[0].icon +
                      "@2x.png'>"
                  );
                  $("#forTemp5").text("Temp: " + data.list[5].main.temp + " °F");
                  $("#forWind5").text("Wind: " + data.list[5].wind.speed + " mph");
                  $("#forHumid5").text(
                    "Humidity: " + data.list[5].main.humidity + "%"
                );
                });
              };
          });
        }
      }
    }
//to create the buttons for past city searches
function renderSearchHistory() {
  //render a new line for each search
  for (var i = 0; i < searchHistory.length; i++) {
    var city = searchHistory[i];
    var lastCity = document.createElement("p");
    lastCity.innerHTML = city;
    lastCity.className = "resultCity";
    lastCity.id = "resultCity";

      //where the history goes in the html
      var container = document.getElementById("searchCities");
      container.appendChild(lastCity);

    //set up the click event
    lastCity.onclick = function(event){
      //get the city info for the history buttons
      city = event.target.textContent
      
    //now do the fetch for each search history on the click
            var historyURL =
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
            city +
            "&cnt=6&appid=" +
            APIKey +
            //imperial units sets to degrees F and MPH
            "&units=imperial";

          //upcoming days via moment.js
          for(var index = 1; index < 6; index++){
            $(`#forecast${index}`).text(moment().add(index, "day").format("M/DD/YYYY"));
          }
        
          if (city) {
            fetch(historyURL)
              .then(function (response) {
                if (response.ok) {
                  response.json().then(function (data) {
        
                    //apply data to the current weather card
                    displayCity.text(data.city.name + "(" + (moment().format("M/DD/YYYY")) + ")");
                    temp.text("Current Temp: " + data.list[0].main.temp + " °F");
                    wind.text("Wind: " + data.list[0].wind.speed + " mph");
                    humidity.text("Humidity: " + data.list[0].main.humidity + "%");
                    conditions.text(
                      "Conditions: " + data.list[0].weather[0].description
                    );
                    $("#featuredImage").html(
                        "<img src='https://openweathermap.org/img/wn/" +
                          data.list[0].weather[0].icon +
                          "@2x.png'>"
                      );
        
                    //apply data to the forecast cards
                    $("#image1").html(
                      "<img src='https://openweathermap.org/img/wn/" +
                        data.list[1].weather[0].icon +
                        "@2x.png'>"
                    );
                    $("#forecast1").text(data.list[1].timezone);
                    $("#forTemp1").text("Temp: " + data.list[1].main.temp + " °F");
                    $("#forWind1").text("Wind: " + data.list[1].wind.speed + " mph");
                    $("#forHumid1").text(
                      "Humidity: " + data.list[1].main.humidity + "%"
                    );
        
                    $("#image2").html(
                      "<img src='https://openweathermap.org/img/wn/" +
                        data.list[2].weather[0].icon +
                        "@2x.png'>"
                    );
                    $("#forTemp2").text("Temp: " + data.list[2].main.temp + " °F");
                    $("#forWind2").text("Wind: " + data.list[2].wind.speed + " mph");
                    $("#forHumid2").text(
                      "Humidity: " + data.list[2].main.humidity + "%"
                    );
        
                    $("#image3").html(
                      "<img src='https://openweathermap.org/img/wn/" +
                        data.list[3].weather[0].icon +
                        "@2x.png'>"
                    );
                    $("#forTemp3").text("Temp: " + data.list[3].main.temp + " °F");
                    $("#forWind3").text("Wind: " + data.list[3].wind.speed + " mph");
                    $("#forHumid3").text(
                      "Humidity: " + data.list[3].main.humidity + "%"
                    );
        
                    $("#image4").html(
                      "<img src='https://openweathermap.org/img/wn/" +
                        data.list[4].weather[0].icon +
                        "@2x.png'>"
                    );
                    $("#forTemp4").text("Temp: " + data.list[4].main.temp + " °F");
                    $("#forWind4").text("Wind: " + data.list[4].wind.speed + " mph");
                    $("#forHumid4").text(
                      "Humidity: " + data.list[4].main.humidity + "%"
                    );
        
                    $("#image5").html(
                      "<img src='https://openweathermap.org/img/wn/" +
                        data.list[5].weather[0].icon +
                        "@2x.png'>"
                    );
                    $("#forTemp5").text("Temp: " + data.list[5].main.temp + " °F");
                    $("#forWind5").text("Wind: " + data.list[5].wind.speed + " mph");
                    $("#forHumid5").text(
                      "Humidity: " + data.list[5].main.humidity + "%"
                    );
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
    }
  }
  function defaultCity() {
    var city = "Paris";
    var lastCity = document.createElement("p");
    lastCity.innerHTML = city;
    lastCity.className = "resultCity";
    lastCity.id = "resultCity";
  
      //where the history goes in the html
      var container = document.getElementById("searchCities");
      container.appendChild(lastCity);
       //set up the click event
  // lastCity.onclick = function(event){
  //   city = "Paris";
    //now do the fetch for each search history on the click
            var historyURL =
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
            city +
            "&cnt=6&appid=" +
            APIKey +
            //imperial units sets to degrees F and MPH
            "&units=imperial";
  
          //upcoming days via moment.js
          for(var index = 1; index < 6; index++){
            $(`#forecast${index}`).text(moment().add(index, "day").format("M/DD/YYYY"));
          }
        
          if (city) {
            fetch(historyURL)
              .then(function (response) {
                if (response.ok) {
                  response.json().then(function (data) {
        
                    //apply data to the current weather card
                    displayCity.text(data.city.name + "(" + (moment().format("M/DD/YYYY")) + ")");
                    temp.text("Current Temp: " + data.list[0].main.temp + " °F");
                    wind.text("Wind: " + data.list[0].wind.speed + " mph");
                    humidity.text("Humidity: " + data.list[0].main.humidity + "%");
                    conditions.text(
                      "Conditions: " + data.list[0].weather[0].description
                    );
                    $("#featuredImage").html(
                        "<img src='https://openweathermap.org/img/wn/" +
                          data.list[0].weather[0].icon +
                          "@2x.png'>"
                      );
        
                    //apply data to the forecast cards
                    $("#image1").html(
                      "<img src='https://openweathermap.org/img/wn/" +
                        data.list[1].weather[0].icon +
                        "@2x.png'>"
                    );
                    $("#forecast1").text(data.list[1].timezone);
                    $("#forTemp1").text("Temp: " + data.list[1].main.temp + " °F");
                    $("#forWind1").text("Wind: " + data.list[1].wind.speed + " mph");
                    $("#forHumid1").text(
                      "Humidity: " + data.list[1].main.humidity + "%"
                    );
        
                    $("#image2").html(
                      "<img src='https://openweathermap.org/img/wn/" +
                        data.list[2].weather[0].icon +
                        "@2x.png'>"
                    );
                    $("#forTemp2").text("Temp: " + data.list[2].main.temp + " °F");
                    $("#forWind2").text("Wind: " + data.list[2].wind.speed + " mph");
                    $("#forHumid2").text(
                      "Humidity: " + data.list[2].main.humidity + "%"
                    );
        
                    $("#image3").html(
                      "<img src='https://openweathermap.org/img/wn/" +
                        data.list[3].weather[0].icon +
                        "@2x.png'>"
                    );
                    $("#forTemp3").text("Temp: " + data.list[3].main.temp + " °F");
                    $("#forWind3").text("Wind: " + data.list[3].wind.speed + " mph");
                    $("#forHumid3").text(
                      "Humidity: " + data.list[3].main.humidity + "%"
                    );
        
                    $("#image4").html(
                      "<img src='https://openweathermap.org/img/wn/" +
                        data.list[4].weather[0].icon +
                        "@2x.png'>"
                    );
                    $("#forTemp4").text("Temp: " + data.list[4].main.temp + " °F");
                    $("#forWind4").text("Wind: " + data.list[4].wind.speed + " mph");
                    $("#forHumid4").text(
                      "Humidity: " + data.list[4].main.humidity + "%"
                    );
        
                    $("#image5").html(
                      "<img src='https://openweathermap.org/img/wn/" +
                        data.list[5].weather[0].icon +
                        "@2x.png'>"
                    );
                    $("#forTemp5").text("Temp: " + data.list[5].main.temp + " °F");
                    $("#forWind5").text("Wind: " + data.list[5].wind.speed + " mph");
                    $("#forHumid5").text(
                      "Humidity: " + data.list[5].main.humidity + "%"
                  );
                  });
                };
            });
          }
        }
      // }
  //to create the buttons for past city searches
  function renderSearchHistory() {
    for (var i = 0; i < searchHistory.length; i++) {
      var city = searchHistory[i];
      var lastCity = document.createElement("p");
      lastCity.innerHTML = city;
      lastCity.className = "resultCity";
      lastCity.id = "resultCity";
  
        //where the history goes in the html
        var container = document.getElementById("searchCities");
        container.appendChild(lastCity);
  
      //set up the click event
      lastCity.onclick = function(event){
        //get the city info for the history buttons
        city = event.target.textContent
        
      //now do the fetch for each search history on the click
              var historyURL =
              "https://api.openweathermap.org/data/2.5/forecast?q=" +
              city +
              "&cnt=6&appid=" +
              APIKey +
              //imperial units sets to degrees F and MPH
              "&units=imperial";
  
            //upcoming days via moment.js
            for(var index = 1; index < 6; index++){
              $(`#forecast${index}`).text(moment().add(index, "day").format("M/DD/YYYY"));
            }
          
            if (city) {
              fetch(historyURL)
                .then(function (response) {
                  if (response.ok) {
                    response.json().then(function (data) {
          
                      //apply data to the current weather card
                      displayCity.text(data.city.name + "(" + (moment().format("M/DD/YYYY")) + ")");
                      temp.text("Current Temp: " + data.list[0].main.temp + " °F");
                      wind.text("Wind: " + data.list[0].wind.speed + " mph");
                      humidity.text("Humidity: " + data.list[0].main.humidity + "%");
                      conditions.text(
                        "Conditions: " + data.list[0].weather[0].description
                      );
                      $("#featuredImage").html(
                          "<img src='https://openweathermap.org/img/wn/" +
                            data.list[0].weather[0].icon +
                            "@2x.png'>"
                        );
          
                      //apply data to the forecast cards
                      $("#image1").html(
                        "<img src='https://openweathermap.org/img/wn/" +
                          data.list[1].weather[0].icon +
                          "@2x.png'>"
                      );
                      $("#forecast1").text(data.list[1].timezone);
                      $("#forTemp1").text("Temp: " + data.list[1].main.temp + " °F");
                      $("#forWind1").text("Wind: " + data.list[1].wind.speed + " mph");
                      $("#forHumid1").text(
                        "Humidity: " + data.list[1].main.humidity + "%"
                      );
          
                      $("#image2").html(
                        "<img src='https://openweathermap.org/img/wn/" +
                          data.list[2].weather[0].icon +
                          "@2x.png'>"
                      );
                      $("#forTemp2").text("Temp: " + data.list[2].main.temp + " °F");
                      $("#forWind2").text("Wind: " + data.list[2].wind.speed + " mph");
                      $("#forHumid2").text(
                        "Humidity: " + data.list[2].main.humidity + "%"
                      );
          
                      $("#image3").html(
                        "<img src='https://openweathermap.org/img/wn/" +
                          data.list[3].weather[0].icon +
                          "@2x.png'>"
                      );
                      $("#forTemp3").text("Temp: " + data.list[3].main.temp + " °F");
                      $("#forWind3").text("Wind: " + data.list[3].wind.speed + " mph");
                      $("#forHumid3").text(
                        "Humidity: " + data.list[3].main.humidity + "%"
                      );
          
                      $("#image4").html(
                        "<img src='https://openweathermap.org/img/wn/" +
                          data.list[4].weather[0].icon +
                          "@2x.png'>"
                      );
                      $("#forTemp4").text("Temp: " + data.list[4].main.temp + " °F");
                      $("#forWind4").text("Wind: " + data.list[4].wind.speed + " mph");
                      $("#forHumid4").text(
                        "Humidity: " + data.list[4].main.humidity + "%"
                      );
          
                      $("#image5").html(
                        "<img src='https://openweathermap.org/img/wn/" +
                          data.list[5].weather[0].icon +
                          "@2x.png'>"
                      );
                      $("#forTemp5").text("Temp: " + data.list[5].main.temp + " °F");
                      $("#forWind5").text("Wind: " + data.list[5].wind.speed + " mph");
                      $("#forHumid5").text(
                        "Humidity: " + data.list[5].main.humidity + "%"
                      );
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
  defaultCity();
}

function storedCities() {
  //stringify and set ket in local storage array
  localStorage.setItem("city", JSON.stringify(searchHistory));
}

//gets the click for the submit button
userFormEl.addEventListener("submit", formSubmitHandler);
//calls init to retriev data and render it to teh page on load
init()
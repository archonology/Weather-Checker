var APIKey = "b5794a08ba88b4d36fef7769417b2041";
// var city = "San Francisco";
// // var queryURL =
// //   "http://api.openweathermap.org/data/2.5/weather?q=" +
// //   city +
// //   "&appid=" +
// //   APIKey +
// //   "&units=imperial";
//   var forecastURL =
//   "http://api.openweathermap.org/data/2.5/forecast?q=" +
//   city +
//   "&appid=" +
//   "568880a53d3ee3d17ad821c8259d4d0c" +
//   "&units=imperial";
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
var featuredCityCard = document.querySelector("#featuredCityCard")
var userFormEl =  document.querySelector('#user-form');

// var forcastDates = 
// getting the data to use in the functions
// fetch(forecastURL).then(function (response) {
//   console.log(response);
//   response.json().then(function (data) {
//     console.log(data);
    // var weatherData = [
    //   data.name +
    //     "," +
    //     data.main.temp +
    //     "," +
    //     data.wind.speed +
    //     "," +
    //     data.main.humidity +
    //     "," +
    //     data.weather[0].description, +
    //     "," + 
    //     data.weather[0].id
    // ];
    // console.log(weatherData);
    //display featured city weather
    // displayCity.text(data.name);
    // temp.text("Current Temp: " + data.main.temp + " F");
    // wind.text("Wind: " + data.wind.speed + " mph");
    // humidity.text("Humidity: " + data.main.humidity + " %");
    // conditions.text("Conditions: " + data.weather[0].description);
    // weatherIcon.text(data.weather[0].icon);
//   });
// });
//need a form submit handler
var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityWeather = citySearchInputEl.value.trim();
    console.log(cityWeather);

    var queryURL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    cityWeather +
    "&cnt=6&appid=" +
    APIKey +
    "&units=imperial";

    if (cityWeather) {
        fetch(queryURL).then(function (response) {
            if(response.ok) {
            console.log(response)
            response.json().then(function (data) {
              console.log(data);
              //apply data to the current weather card
              displayCity.text(data.city.name);
              temp.text("Current Temp: " + data.list[0].main.temp + " F");
              wind.text("Wind: " + data.list[0].wind.speed + " mph");
              humidity.text("Humidity: " + data.list[0].main.humidity + " %");
              conditions.text("Conditions: " + data.list[0].weather[0].description);
              weatherIcon.text(data.list[0].weather[0].icon);
              //apply data to the forecast cards
              var forecast = data.list
            //   for(var i = 0; i < forecast.length; i++);
            //Next 5 Day
                $("#forecast1").text(data.list[1].timezone);
                $("#forTemp1").text("Temp: " + data.list[1].main.temp);
                $("#forWind1").text("Wind: " + data.list[1].wind.speed + " mph");
                $("#forHumid1").text("Humidity: " + data.list[1].main.humidity + " %");
            
                $("#forTemp2").text("Temp: " + data.list[2].main.temp);
                $("#forWind2").text("Wind: " + data.list[2].wind.speed + " mph");
                $("#forHumid2").text("Humidity: " + data.list[2].main.humidity + " %");

                $("#forTemp3").text("Temp: " + data.list[3].main.temp);
                $("#forWind3").text("Wind: " + data.list[3].wind.speed + " mph");
                $("#forHumid3").text("Humidity: " + data.list[3].main.humidity + " %");

                $("#forTemp4").text("Temp: " + data.list[4].main.temp);
                $("#forWind4").text("Wind: " + data.list[4].wind.speed + " mph");
                $("#forHumid4").text("Humidity: " + data.list[4].main.humidity + " %");

                $("#forTemp5").text("Temp: " + data.list[5].main.temp);
                $("#forWind5").text("Wind: " + data.list[5].wind.speed + " mph");
                $("#forHumid5").text("Humidity: " + data.list[5].main.humidity + " %");
                console.log(data.city.timezone);

            //   var weatherData = [
            //     data.name +
            //       "," +
            //       data.main.temp +
            //       "," +
            //       data.wind.speed +
            //       "," +
            //       data.main.humidity +
            //       "," +
            //       data.weather[0].description, +
            //       "," + 
            //       data.weather[0].id
            //   ];
            //   for(var i = 0; i < weatherData.length; i++);
            });
        }else{
            alert("Error: check spelling");
        }
    })
    .catch(function(error){
        alert("Unable to connect to OpenWeatherMap");
    });
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);


//need this for the icons
//  creatImageEl()

// https://openweathermap.org/weather-conditions to get the weather codes

var APIKey = "b5794a08ba88b4d36fef7769417b2041";
var city = "Atlanta, GA, USA"
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";

fetch(queryURL)

.then(function (response){
    return response.json();
})
.then(function (data) {
    console.log(data)
});

//Backup API key for n2yo.com
// https://www.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/70/18/&apiKey=589P8Q-SDRYX8-L842ZD-5Z9


//blank document.ready function
$(document).ready(function () {

})

//Don't worry about this
// $('body').on("click", ".saveBtn", function (event) {
// event.preventDefault();
// })


//When I use the website, I can search for satellite passing by my location
//When I want to search for satellite, I can choose by my current location or 
//I can choose a city
//When I search, I can filter sattelite by their categories
//When I have chosen location and category, then click the Search Button
//Then it will display satellite by name, with a list on the bottom left
//Then it will display satellite picture by category, on the bottom right
//When I click on each satellite by name, then it will display info of each satellite
//bellow the satellite picture
//When I do a search, it will save my search history into a table on the right side
//of the search menu


//Declaration of global variables



//Function to pull a location from my 


//API to pick a city THEN pull long and lat info
//Category filter

//Search button



//Display list of satellites


//Display of image


//Display of satellite info


///Display of search history


//Function to find sattelite info based on long and lat
//When clicked, get API parse queryURL which contains the API link and API key from n2yo.com to pull sattelite info
$("#find-me").on("click", function (event) {
    event.preventDefault();
    //queryURL explained: 
    //after above/lat/long/70 degree/category 1/api key
    var queryURL = 
    "https://www.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/70/1/&apiKey=WWZP6Q-SXMAX7-WBLGBK-4EVN";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
  });


// TANNER - Added API for Open Weather to get Longitude and Latitude
var cityName = "Minneapolis";

var apiKey = "630e27fa306f06f51bd9ecbb54aae081";
var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiIdURL = "&appid="
var openCurrWeatherAPI = currentURL + cityName + apiIdURL + apiKey;

console.log(openCurrWeatherAPI);

$.ajax({
url: openCurrWeatherAPI,
method: "GET"
}).then(function(response1) {

console.log(response1);
console.log(response1.coord.lon);
console.log(response1.coord.lat);

var cityLon = response1.coord.lon;
var cityLat = response1.coord.lat;
});
//End of Open Weather API

//Function to find my current longtitude and latitude
//copy pasted from mozzilla geolocation API
//GET GEO LOCATION ON CLICK
function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');

    mapLink.href = '';
    mapLink.textContent = '';

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.textContent = '';
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }

}

document.querySelector('#find-me').addEventListener('click', geoFindMe);
//END OF GEO LOCATION ON CLICK

//Raw notes from last meeting
//Drop menu to choose: current Geo location OR search by cities
//if choose current 

//Line 21 after above/is lat and long
//Need a button to display results when searched by current lat/long

//Need an input form in html to accept lat and long by cities
//when click searched by cities, display results
//Need an api to parse lat and long into chosen city
//add openweather api to seach for city long and lat

//when I input name into the search form, and hit seach
//Then the form will search the query via openweather api
//then it will return the long/lat info
//then it will parse the long/lat into javascript
//then it will display list of Satellite

//In search form: define category (drop down menu)
//ISS id=2, 1 , 15 , 52



//In search form: define angle


//We'll keep both button (current location) and form on html


https://www.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/70/18/&apiKey=589P8Q-SDRYX8-L842ZD-5Z9

$(document).ready(function () {



})

// $('body').on("click", ".saveBtn", function (event) {
// event.preventDefault();
// })



$("#find-me").on("click", function (event) {
    event.preventDefault();
    var queryURL = 
    "https://www.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/70/18/&apiKey=WWZP6Q-SXMAX7-WBLGBK-4EVN";
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

//copy pasted from mozzilla geolocation API
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
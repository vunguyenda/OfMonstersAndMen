
//Backup API key for n2yo.com
// https://www.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/70/18/&apiKey=589P8Q-SDRYX8-L842ZD-5Z9


//blank document.ready function
$(document).ready(function () {

})

//Don't worry about this
// $('body').on("click", ".saveBtn", function (event) {
// event.preventDefault();
// })


//When clicked, get API parse queryURL which contains the API link and API key from n2yo.com to pull sattelite info
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
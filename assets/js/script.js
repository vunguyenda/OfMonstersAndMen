//Backup API key for n2yo.com
// https://www.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/70/18/&apiKey=589P8Q-SDRYX8-L842ZD-5Z9

//picture of ISS from NASA site. free to use https://images.nasa.gov/
// "NASA should be acknowledged as the source of the material.""
//pic of ISS
//https://images-assets.nasa.gov/image/0701891/0701891~orig.jpg

// pic of progress spacecraft
// https://images-assets.nasa.gov/image/iss023e030445/iss023e030445~orig.jpg

//endless loop pic in the assets folder is from u/metrolinaszabi on reddit r/astrophotography

$(document).ready(function () {
    // flag to turn off or on Console.log
    let test = true;

    $('select').formSelect();  
    function showPosition(position) {
        $("#lat").text("Lat: " + position.coords.latitude);
        $("#lon").text("Lon: " + position.coords.longitude);
        var apiKey = "630e27fa306f06f51bd9ecbb54aae081";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=imperial";
        // Anitha - Added AJAX request to get current city
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function (response) {
            $("#current-city").text("City : " + response.name);
          });
      }
    
      $("#current-location").on("click", function() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        }     
      });

    var cityName = "";
    var category = 0;
    console.log("city selected is: " + cityName);
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        var cityLon = 0;
        var cityLat = 0;
        // Added API for Open Weather to get Longitude and Latitude
        cityName = $("#city").val();
        console.log("button was clicked");
        console.log("city selected is: " + cityName);
        console.log("Selected dropdown is", $("#satellite-category").val());
        category = $("#satellite-category").val();

        console.log(cityName);
        var apiKey = "630e27fa306f06f51bd9ecbb54aae081";
        var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=";
        var apiIdURL = "&appid=";
        var openCurrWeatherAPI = currentURL + cityName + apiIdURL + apiKey;
        $.ajax({
            url: openCurrWeatherAPI,
            method: "GET"
        }).then(function (response1) {
            console.log(response1);
            console.log("lon " + response1.coord.lon + "lat " + response1.coord.lat);
            cityLon = response1.coord.lon;
            cityLat = response1.coord.lat;
            var queryURL =
                "https://www.n2yo.com/rest/v1/satellite/above/" +
                cityLat +
                "/" +
                cityLon +
                "/0/70/" +
                category +
                "/&apiKey=WWZP6Q-SXMAX7-WBLGBK-4EVN";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
            });
        });
        //End of Open Weather API
    });
});

//this stores the sat category on change to satCat
$("#satellite-category").on("change", function () {
    console.log($(this).val());
    satCat = $(this).val();
    console.log("satcat is " + satCat);
});

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

// document.querySelector('#find-me').addEventListener('click', geoFindMe);
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
  // Collect requested location
  $('#submitBtn,#past-cities').on('click', function () {
    // get location from user input box
    let e = $(event.target)[0];
    let location = "";
    if (e.id === "getSatellites") {
      location = $('#city-search').val().trim().toUpperCase();
    } 
      else if ( e.className === ("cityList") ) {
        location = e.innerText;
    }
    if (location == "") return;
    updateCityStore(location);
    getCurSatellites(location);
   });
  
  function getCurLocation() {
    // Set location current location to null
    let location = {};
    
    // if successful Navigator, load location
    function success(position) {
      // Get
      location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        success: true
      }
      if (test) { console.log(" success location", location); }
      getCurSatellites(location);
    }

    // if unsuccessful Navigator function, load error
    function error() {
      location = { success: false }
      console.log('Could not get location');
      return location;
    }

    // Use HTML Geolocation to get longitude and latitude
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  function getCurSatellites(loc) {
    // STUB, reder History should load in GetCurSatellites call
    renderHistory();
    // clear search field
    $('#city-search').val("");
    if (typeof loc === "object") {
      city = `lat=${loc.latitude}&lon=${loc.longitude}`;
    } else {
      city = `q=${loc}`;
    }
  };

  function updateCityStore(city) {
    // Update local storage with searched City's
    let cityList = JSON.parse(localStorage.getItem("cityList")) || [];
    cityList.push(city); 
    // sort into alphabetical order
    cityList.sort();
    // removes dulicate cities
    for (let i=1; i<cityList.length; i++) {
       if (cityList[i] === cityList[i-1]) cityList.splice(i,1);
    }
    
    //stores in local storage
    localStorage.setItem('cityList', JSON.stringify(cityList));
  };

  function renderHistory() {
    // function to pull city history from local memory
    let cityList = JSON.parse(localStorage.getItem("cityList")) || [];

    $('#past-cities').empty();
    cityList.forEach ( function (city) {
      let cityNameDiv = $('<div>');
      cityNameDiv.addClass("cityList");
      cityNameDiv.attr("value",city);
      cityNameDiv.text(city);
      $('#past-cities').append(cityNameDiv);
    });
  };

  // will get location when page initializes
  const location = getCurLocation();
});
//Backup API key for n2yo.com
// https://www.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/70/18/&apiKey=589P8Q-SDRYX8-L842ZD-5Z9

//picture of ISS from NASA site. free to use https://images.nasa.gov/
// "NASA should be acknowledged as the source of the material.""
//pic of ISS
//https://images-assets.nasa.gov/image/0701891/0701891~orig.jpg

// pic of progress spacecraft
// https://images-assets.nasa.gov/image/iss023e030445/iss023e030445~orig.jpg

//endless loop pic in the assets folder is from u/metrolinaszabi on reddit r/astrophotography

// response1 is the openweather response
// response is the n2y0 ABOUT response

var cityLat = 0;
var cityLon = 0;
var cityName = "";

$(document).ready(function () {
    $("#error-message").hide();
    $(".card-sat-info").hide();
    $('select').formSelect();
    function showPosition(position) {
        $("#lat").text("Lat: " + position.coords.latitude);
        $("#lon").text("Lon: " + position.coords.longitude);
        cityLat = position.coords.latitude;
        cityLon = position.coords.longitude;
        var apiKey = "630e27fa306f06f51bd9ecbb54aae081";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=imperial";
        // Anitha - Added AJAX request to get current city
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#current-city").text("City : " + response.name);
            $("#city").val(response.name);
            $('#city').focus();
            cityName = response.name;
        });
    }
    $("#current-location").on("click", function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    });

    var cityName = "";
    var category = 0;
    console.log("city selected is: " + cityName);
    renderHistory();

    $("#submitBtn,#past-cities").on("click", function (event) {
        event.preventDefault();

        $(".card-sat-info").hide();
         // get location from user input box or from history list
        let e = $(event.target)[0];
        let cityName = "";
        if (e.id === "submitBtn") {
            cityName = $('#city').val().trim().toUpperCase();
        }
        else if (e.className === ("cityList")) {
            cityName = e.innerText;
        }
        if (cityName == "") {
            $("#error-message").show();
            return;
        }
        $("#error-message").hide();

        updateCityStore(cityName);
        renderHistory();

        //this empties the sat list and says calculating while waiting for API to repond
        $("#satList ul").empty();
        $("#satList ul").append("<li>Calculating...</li>");

        //TODO tim tanner, make this a prepending list, with a max of 5? 10?
        $("#cityNameSpan").text(cityName);

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
            console.log("lat " + response1.coord.lat + "lon " + response1.coord.lon);
            //Parse City Name into top header
            $("#current-city").text("City : " + cityName);
            $("#city").val(cityName);
            $('#city').focus();
            $("#lat").text("Lat: " + cityLat);
            $("#lon").text("Lon: " + cityLon);
            // if (cityLat != 0 || cityLon != 0) {

                cityLat = response1.coord.lat;
                cityLon = response1.coord.lon;

            //End of Open Weather API
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

                console.log("response");
                console.log(response);

                //Currently untested, idea being that if response above is empty, error is displayed
                if (!response.above) {
                    console.log("no sats found");
                    $("#satList ul li").text("No sats found");
                } else {
                    console.log("response.above");

                    console.log(response.above);
                    console.log("satname 0 is " + response.above[0].satname);
                    console.log("for loop starting");
                    //emptying the sat list before populating it
                    $("#satList ul").empty();
                    $(".card-sat-info").show();
                    //this loop populates the list of sats above location
                    for (var i = 0; i < response.above.length; i++) {
                        console.log("i is " + i + " " + response.above[i].satname + "Satellite ID :" + response.above[i].satid);
                        //$("#sat"+i).text(response.above[i].satname);
                        $("#satList ul").append("<li class='tab satListClass' value = '" + i + "'><a>"
                            + response.above[i].satname + "</a></li>");
                        try {
                            $('.tabs').tabs();
                        } catch (e) { }
                    }

                    //Populating data that will not change regardless of sat clicked
                    //TODO add weather viewing conditions 
                    console.log("sunset" + response1.sys.sunset);
                    console.log("sunrise" + response1.sys.sunrise);
                    //TODO code that calcs if the current city in any part of the world is at night time
                    // https://openweathermap.org/current
                    $("#nightTime").text("#nightTime");
                    console.log("conditions" + response1.weather[0].description);
                    $("#Conditions").text(response1.weather[0].description);
                    $("#Category").text(category);
                    //populating card with the first sat retrieved
                    //ONLY what is below is what will change if different Sat is clicked. 
                    $("#satName").text(response.above[0].satname);
                    $("#satID").text(response.above[0].satid);
                    $("#Direction").text("Calculating...");
                    $("#Elevation").text("Calculating...");
                    //TODO retrieve NORAD sat id, use the other api to display viewing direction and elevation

                    var NoradID = response.above[0].satid
                    elevationAzimuth(NoradID, cityLat, cityLon);

                    $(".satListClass").on("click", function () {
                        var clickedIndex = $(this).attr("value");
                        console.log("sat clicked index of " + clickedIndex);
                        $("#satName").text(response.above[clickedIndex].satname);
                        $("#satID").text(response.above[clickedIndex].satid)
                        $("#Direction").text("Calculating...");
                        $("#Elevation").text("Calculating...");
                        var NoradID = response.above[clickedIndex].satid
                        elevationAzimuth(NoradID, cityLat, cityLon);
                    });

                }
            });
        });

    });

    function updateCityStore(city) {

        console.log('updateCityStore');

        // Update local storage with searched City's
        let cityList = JSON.parse(localStorage.getItem("cityList")) || [];
        cityList.unshift(city);
        // // sort into alphabetical order
        // cityList.sort();
        // removes dulicate cities
        for (let i = 1; i < cityList.length; i++) {
            if (cityList[i] === cityList[i - 1]) {
                cityList.splice(i, 1);
            }
        }
        if (cityList.length > 5) {
            cityList.length = 5;
        }

        //stores in local storage
        localStorage.setItem('cityList', JSON.stringify(cityList));
    };

    function renderHistory() {
        // function to pull city history from local memory
        console.log('renderHistory');

        let cityList = JSON.parse(localStorage.getItem("cityList")) || [];

        $('#past-cities').empty();

        cityList.forEach(function (city) {
            let cityNameDiv = $('<div>');
            cityNameDiv.addClass("cityList");
            cityNameDiv.attr("value", city);
            cityNameDiv.text(city);
            $('#past-cities').append(cityNameDiv);
        });
    };

    //this stores the sat category on change to satCat
    $("#satellite-category").on("change", function () {
        console.log($(this).val());
        satCat = $(this).val();
        console.log("satcat is " + satCat);
    });


});

function elevationAzimuth(NoradID, cityLat, cityLon) {
    var queryURLElevation =
        "https://www.n2yo.com/rest/v1/satellite/positions/" +
        NoradID + "/" +
        cityLat +
        "/" +
        cityLon +
        "/0/1/" +
        "&apiKey=WWZP6Q-SXMAX7-WBLGBK-4EVN";
    console.log("queryURLElevation" + queryURLElevation)
    $.ajax({
        url: queryURLElevation,
        method: "GET"
    }).then(function (elevationAzimuthresponse) {
        console.log("elevationAzimuthresponse");
        console.log(elevationAzimuthresponse);
        var elevationAzimuthObject = {
            elevation: elevationAzimuthresponse.positions[0].elevation,
            azimuth: elevationAzimuthresponse.positions[0].azimuth,
        }
        console.log("object" + elevationAzimuthObject);
        console.log("elevation " + elevationAzimuthObject.elevation);
        console.log("azimuth " + elevationAzimuthObject.azimuth);
        $("#Direction").text(elevationAzimuthObject.azimuth);
        $("#Elevation").text(elevationAzimuthObject.elevation);
    });
}



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


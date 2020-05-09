
$(document).ready(function () {
  $('select').formSelect();
  function showPosition(position) {
    $("#lat").text("Latitude: " + position.coords.latitude);
    $("#lon").text("Longitude: " + position.coords.longitude);
  }

  $("#current-location").on("click", function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } 

  });


});
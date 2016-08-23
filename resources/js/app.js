//Model 
var database = {
weatherObj: {}
};

var control = {

};

var view = {
	userLat: null,
	userLong: null,
	initMap: function() {
		var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            view.userLat = position.coords.latitude;
            view.userLong = position.coords.longitude;

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            view.handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          view.handleLocationError(false, infoWindow, map.getCenter());
        }
	},
	handleLocationError: function(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
        					  'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
	},

  weatherFetch:function (lat, long, apiKey){
      $.ajax({
          url:"https://api.forecast.io/forecast/"+ apiKey+ "/"+lat+ "," + long,
          dataType: "jsonp",

          success: function(response){
              weatherObj.appTemp = response.currently.apparentTemperature;
              weatherObj.cldCvr = response.currently.cloudCover;
              weatherObj.pressure = response.currently.pressure + " mBar";
              weatherObj.summary = response.currently.summary;
              weatherObj.windSpeed = response.currently.windSpeed;
              weatherObj.humidity = response.currently.humidity;
              weatherObj.apparentTemperatureMax = response.daily.data[0].apparentTemperatureMax;
              weatherObj.apparentTemperatureMin = response.daily.data[0].apparentTemperatureMin;
              //console.log(weatherObj);
              //console.log(response);

          }
      });
  }
  //weatherFetch(lat,long,apiKey);
}
view.initMap();
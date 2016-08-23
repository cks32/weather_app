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

  weatherFetch:function (apiKey){
      $.ajax({
          url:"https://api.forecast.io/forecast/"+ apiKey+ "/"+userLat+ "," + userLong,
          dataType: "jsonp",

          success: function(response){
              database.weatherObj.appTemp = response.currently.apparentTemperature;
              database.weatherObj.cldCvr = response.currently.cloudCover;
              database.weatherObj.pressure = response.currently.pressure + " mBar";
              database.weatherObj.summary = response.currently.summary;
              database.weatherObj.windSpeed = response.currently.windSpeed;
              database.weatherObj.humidity = response.currently.humidity;
              database.weatherObj.apparentTemperatureMax = response.daily.data[0].apparentTemperatureMax;
              database.weatherObj.apparentTemperatureMin = response.daily.data[0].apparentTemperatureMin;
              //console.log(weatherObj);
              //console.log(response);

          }
      });
  }
  //weatherFetch(lat,long,apiKey);
}
view.initMap();
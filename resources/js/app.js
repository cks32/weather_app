//Model 
var database = {

}

var control = {

}

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
	}
}
view.initMap();
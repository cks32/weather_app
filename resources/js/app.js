var view = {
	userLat: null,
	userLong: null,
	initMap: function() {
		var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 10,
          disableDefaultUI: true
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
            view.weatherFetch();
            view.reverseGeoLocator();
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
  reverseGeoLocator: function(callback) {
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + view.userLat + "," + view.userLong + "&key=AIzaSyBtrwkoXTYmDWwQJfUxM1IdDvZfnNZzGiQ",
      dataType: "json",
      success: function(response) {
        var city = response.results[0].address_components[3].long_name;
        view.cityAssign(city);
        }
    });
  },
  cityAssign: function(city) {
      userCity = city;
      $("#cityTitle").text(userCity + "\'s Current Weather Conditions");
  },
  weatherFetch: function(){
    $.ajax({
      url:"https://api.forecast.io/forecast/871ab11d035adf7442dfa8a03179ecda/" + view.userLat+ "," + view.userLong,
      dataType: "jsonp",
      success: function(response) {
        var summary, currentTemp, dailyTemperatureMax, dailyTemperatureMin, cldCvr, windSpeed,humidity, pressure;
        
        summary = response.daily.summary;
        currentTemp = Math.round(response.currently.apparentTemperature);
        dailyTemperatureMax = Math.round(response.daily.data[0].apparentTemperatureMax);
        dailyTemperatureMin = Math.round(response.daily.data[0].apparentTemperatureMin);
        cldCvr = Math.floor(response.currently.cloudCover * 100);
        windSpeed = Math.floor(response.currently.windSpeed);
        humidity = Math.floor(response.currently.humidity * 100);
        pressure = Math.floor(response.currently.pressure) + " mBar";
              
        $("#earth").append("<li>Local Forecast: " + summary + "</li>");
        $("#earth").append("<li>'Feel's Like' Temperature: " + currentTemp + "&deg;F</li>");
        $("#earth").append("<li>Today's Temperature Max: " + dailyTemperatureMax + "&deg;F</li>");
        $("#earth").append("<li>Today's Temperature Min: " + dailyTemperatureMin + "&deg;F</li>");
        $("#earth").append("<li>Cloud Cover: " + cldCvr + "%</li>");
        $("#earth").append("<li>Wind Speed: " + windSpeed + " mph</li>");
        $("#earth").append("<li>Humidity: " + humidity + "% </li>");
        $("#earth").append("<li>Atmospheric Pressure: " + pressure +"</li>");
      }
    });
  },
  marsWeatherFetch: function(){
    $.ajax({
      url:"http://marsweather.ingenology.com/v1/latest/?format=jsonp",
      dataType: "jsonp",
      success: function(response) {
        var atmosphere_opacity, max_temp_fahrenheit, min_temp_fahrenheit, pressure,  season, terrestrial_date, sol;
              
        atmosphere_opacity = response.report.atmo_opacity;
        max_temp_fahrenheit = Math.round(response.report.max_temp_fahrenheit);
        min_temp_fahrenheit = Math.round(response.report.min_temp_fahrenheit);
        pressure = Math.floor(response.report.pressure / 100) + " mBar";
        season = response.report.season;
        terrestrial_date = new Date(response.report.terrestrial_date);
        sol = response.report.sol;
          
        $("#mars").append("<li>Atmospheric Conditions: " + atmosphere_opacity + "</li>");
        $("#mars").append("<li>Sol's Maximum Temperature: " + max_temp_fahrenheit+ "&deg;F</li>");
        $("#mars").append("<li>Sol's Minimum Temperature: " + min_temp_fahrenheit + "&deg;F</li>");
        $("#mars").append("<li>Atmoshperic Pressure: " + pressure + "</li>");
        $("#mars").append("<li>Current Mars Season: " + season + "</li>");
        $("#mars").append("<li>Last Update (Terrestrial Date): " + terrestrial_date + "</li>");
        $("#mars").append("<li>Last Update in Sol's (Curiosity Rover Sol count) : " + sol + "</li>");   
      }
    });
  }
};
view.initMap();
view.marsWeatherFetch();
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
            view.weatherFetch();
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
  weatherFetch: function(){
    console.log(view.userLat);
    console.log(view.userLong);
    $.ajax({
      url:"https://api.forecast.io/forecast/871ab11d035adf7442dfa8a03179ecda/"+view.userLat+ "," + view.userLong,
      dataType: "jsonp",
      success: function(response){
        var summary, appTemp, dailyTemperatureMax, dailyTemperatureMin, cldCvr, windSpeed,humidity, pressure;
        
        summary=response.daily.summary;
        appTemp=response.currently.apparentTemperature;
        dailyTemperatureMax=response.daily.data[0].apparentTemperatureMax;
        dailyTemperatureMin=response.daily.data[0].apparentTemperatureMin;
        cldCvr=Math.floor(response.currently.cloudCover * 100);
        windSpeed=Math.floor(response.currently.windSpeed);
        humidity=Math.floor(response.currently.humidity * 100);
        pressure=Math.floor(response.currently.pressure)+" mBar";
              
        $("#earth").append("<li>Local Forecast: " + summary +"</li>");
        $("#earth").append("<li>'Feel's Like' Temperature: " + appTemp +"&deg;F</li>");
        $("#earth").append("<li>Today's Temperature Max: " + dailyTemperatureMax +"&deg;F</li>");
        $("#earth").append("<li>Today's Temperature Min: " + dailyTemperatureMin +"&deg;F</li>");
        $("#earth").append("<li>Cloud Cover: " + cldCvr +"%</li>");
        $("#earth").append("<li>Wind Speed: " + windSpeed + " mph</li>");
        $("#earth").append("<li>Humidity: " + humidity +"% </li>");
        $("#earth").append("<li>Atmospheric Pressure: " + pressure +"</li>");
      }
    });
  },
  // marsWeatherFetch: function(){
  //   $.ajax({
  //     url:"http://marsweather.ingenology.com/v1/latest/?format=jsonp",
  //     dataType: "jsonp",
  //     success: function(response){
  //       var atmosphere_opacity, max_temp_fahrenheit, min_temp_fahrenheit, pressure,  season, terrestrial_date, sol;
              
  //       atmosphere_opacity = response.report.atmo_opacity;
  //       max_temp_fahrenheit = response.report.max_temp_fahrenheit;
  //       min_temp_fahrenheit = response.report.min_temp_fahrenheit;
  //       pressure = Math.floor(response.report.pressure / 100) + " mBar";
  //       season = response.report.season;
  //       terrestrial_date = new Date(response.report.terrestrial_date);
  //       sol = response.report.sol;
          
  //       $("#mars").append("<li>Atmospheric Conditions: " + atmosphere_opacity + "</li>");
  //       $("#mars").append("<li>Sol's Maximum Temperature: " + max_temp_fahrenheit+ "&deg;F</li>");
  //       $("#mars").append("<li>Sol's Minimum Temperature: " + min_temp_fahrenheit + "&deg;F</li>");
  //       $("#mars").append("<li>Atmoshperic Pressure: " + pressure + "</li>");
  //       $("#mars").append("<li>Current Season on Mars: " + season + "</li>");
  //       $("#mars").append("<li>Last Update (Earth Date): " + terrestrial_date + "</li>");
  //       $("#mars").append("<li>Last Update in Sol's (based on Curiosity's Sol count) : " + sol + "</li>"); 
            
  //     }
  //   });
  // }
};

//view.marsWeatherFetch(); //asynchronous
view.initMap(); //synchronous
//view.weatherFetch(); 

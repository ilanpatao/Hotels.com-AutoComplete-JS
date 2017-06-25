/////////////////////////////
// Written by: Ilan Patao //
// ilan@dangerstudio.com //
//////////////////////////

// Request function to fire on textbox input change
jQuery('#hotelpicker').on('input', function() {
// Clear the search results for a new search
$("#searchresults").empty();
// Store search term in variable
var hotelterm = $("#hotelpicker").val();
// Build the request
var proxifyer = "https://proxifyer.herokuapp.com/";
var url = proxifyer + "https://lookup.hotels.com/resolve/v1.3/json?query="+hotelterm+"&locale=en_US&boostConfig=config-boost-2&resolutionConfig=config-resolve-1";
		// Request the data
		$.get(url, function (hoteldata) {
		// Store the data in a new variable
		var data = hoteldata;
		// Go through the data and return results back to the searchdata div
		$.each(data.entities, function(i, obj) {
		// Store the data in seperate variables
		var caption = data.entities[i].caption;
		var destinationId = data.entities[i].destinationId;
		var geoId = data.entities[i].geoId;
		var landmarkCityDestinationId = data.entities[i].landmarkCityDestinationId;
		var latitude = data.entities[i].latitude;
		var longitude = data.entities[i].longitude;
		var name = data.entities[i].name;
		var redirectPage = data.entities[i].redirectPage;
		var type = data.entities[i].type;
		// Define icons for search results
		if (type == "CITY"){
			var icon = '<i class="fa fa-building-o" aria-hidden="true"></i>&nbsp;';
		} else if (type == "LANDMARK"){
			var icon = '<i class="fa fa-university" aria-hidden="true"></i>&nbsp;';
		} else if (type == "HOTEL"){
			var icon = '<i class="fa fa-bed" aria-hidden="true"></i>&nbsp;';
		} else if (type == "NEIGHBORHOOD"){
			var icon = '<i class="fa fa-map-o" aria-hidden="true"></i>&nbsp;';
		} else if (type == "REGION"){
			var icon = '<i class="fa fa-globe" aria-hidden="true"></i>&nbsp;';
		} else if (type == "AIRPORT"){
			var icon = '<i class="fa fa-plane" aria-hidden="true"></i>&nbsp;';
		} else {
			var icon = '<i class="fa fa-location-arrow" aria-hidden="true"></i>&nbsp;';
		}
		// Append results to the list
		$("#searchresults").append('<li style="margin: 10px 0;"><h4 style="display:inline;">' + icon + '<a href="#" data-toggle="popover" data-placement="top" data-trigger="hover" title="' + name + '" data-content="Data returned for: ' + caption + ' a ' + type + ' with a latitude of: ' + latitude + ' and a longtitude of ' + longitude + '. The geoId for this result is: ' + geoId +'">' + name + '<span class="pull-right"><i class="fa fa-info-circle text-info" aria-hidden="true"></i></span></a></h4></li>');
		});
		// Initialize popoever
		$('[data-toggle="popover"]').popover(); 
		// Output Json Preview
    	var json = JSON.stringify(data);
		$("#jsonresults").val(json);
	});
});
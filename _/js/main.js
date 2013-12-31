/**
  	BASIC FUNCTIONALITY
	-----------------------------------
	- Make map with custom CRS
	- Load CSV data for land plot polygons
	- Load CSV data for land circles
	- Load CSV marker data on hover
	- Color code CSV data based on use
 */

// var tileJSON = $.get('http://api.tiles.mapbox.com/v1/castavridis.ghee5le5');

/* CONSTANTS ***************************/
var TILE_JSON = "http://a.tiles.mapbox.com/v1/castavridis.ghee5le5.json"; //TMS Tile system.

//NOTE: Need custom CRS?

//Instantiate map
var map = L.mapbox.map('map-view',TILE_JSON, {
	minZoom:12,
	maxZoom:17,
	maxBounds:[[38.5322,-90.4188],[38.7425,-90.0728]]
});

//Add bubble features
$.get('_/php/bubbles.php', function(data){
	//Add feature group to map.
	var featureGroup = L.featureGroup().addTo(map);
	
	var circle_options = {
		stroke: false,
		fillColor: '#F90', 
		fillOpacity: 0.125
	  };

	for (var i = data.length - 1; i >= 0; i--) {
		var bubble = data[i],
			id = bubble['id'],
			x = bubble['x'],
			y = bubble['y'],
			a = 100;//bubble['landarea']/100;

		L.circle([y, x], a, circle_options).addTo(featureGroup);
	};
});

//Add parcel features
$.get('_/php/parcels.php', function(data){
	//Add feature group to map.
	var featureGroup = L.featureGroup().addTo(map);
	
	var circle_options = {
		stroke: false,
		fillColor: '#F90', 
		fillOpacity: 0.125
	  };

	for (var i = data.length - 1; i >= 0; i--) {
		var parcel = data[i],
			id = parcel['id'],
			polygon = parcel['polygon'],
			handle = parcel['handle'],
			parcel_id= parcel['parcel_id'];

		//Parse polygon
		//"POLYGON ((-90.195754044233894 38.615683089233187,-90.195755023849316 38.615680224945422,-90.196278510863394 38.615811462047404,-90.196277360645027 38.615814287020591,-90.195754044233894 38.615683089233187))"
		//L.circle([y, x], frontage, circle_options).addTo(featureGroup);
	};
});
